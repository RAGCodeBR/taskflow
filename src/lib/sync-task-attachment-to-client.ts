import { supabase } from "@/integrations/supabase/client";

export interface SyncedClientFile {
  id: string;
  storagePath: string;
}

export const taskAttachmentIdFromClientFilePath = (storagePath: string) =>
  storagePath.match(/\/attachment-([^/]+)\//)?.[1] ?? null;

/**
 * Exposes a task attachment in the client's file area when the task has a client.
 * Both records reference the same Storage object and are linked by source_attachment_id.
 */
export async function syncTaskAttachmentToClient({
  file,
  taskId,
  sourceAttachmentId,
  sourceStoragePath,
  uploadedBy,
  contentType = file.type || "application/octet-stream",
}: {
  file: File;
  taskId: string;
  sourceAttachmentId: string;
  sourceStoragePath: string;
  uploadedBy: string;
  contentType?: string;
}): Promise<SyncedClientFile | null> {
  const { data: task, error: taskError } = await supabase
    .from("tasks")
    .select("client_id")
    .eq("id", taskId)
    .single();
  if (taskError) throw taskError;
  if (!task.client_id) return null;

  const { data, error: insertError } = await supabase
    .from("client_files")
    .insert({
      client_id: task.client_id,
      title: file.name,
      file_name: file.name,
      storage_path: sourceStoragePath,
      mime_type: contentType,
      size_bytes: file.size,
      uploaded_by: uploadedBy,
      source_attachment_id: sourceAttachmentId,
    })
    .select("id")
    .single();

  if (insertError) throw insertError;

  return { id: data.id, storagePath: sourceStoragePath };
}

export async function removeSyncedClientFile(file: SyncedClientFile | null) {
  if (!file) return;
  await supabase.from("client_files").delete().eq("id", file.id);
}

export async function removeTaskAttachmentAndClientCopy(attachmentId: string) {
  const [
    { data: attachment, error: attachmentError },
    { data: linkedClientFiles, error: linkedClientFilesError },
    { data: legacyClientFiles, error: legacyClientFilesError },
  ] = await Promise.all([
    supabase
      .from("attachments")
      .select("storage_path, mime_type")
      .eq("id", attachmentId)
      .maybeSingle(),
    supabase
      .from("client_files")
      .select("id, storage_path")
      .eq("source_attachment_id", attachmentId),
    supabase
      .from("client_files")
      .select("id, storage_path")
      .like("storage_path", `%/attachment-${attachmentId}/%`),
  ]);
  if (attachmentError) throw attachmentError;
  if (linkedClientFilesError) throw linkedClientFilesError;
  if (legacyClientFilesError) throw legacyClientFilesError;

  const clientFiles = [...(linkedClientFiles ?? []), ...(legacyClientFiles ?? [])].filter(
    (file, index, allFiles) =>
      allFiles.findIndex((candidate) => candidate.id === file.id) === index,
  );

  const clientFileIds = clientFiles.map((file: { id: string }) => file.id);
  if (clientFileIds.length > 0) {
    const { error: clientFileDeleteError } = await supabase
      .from("client_files")
      .delete()
      .in("id", clientFileIds);
    if (clientFileDeleteError) throw clientFileDeleteError;
  }

  if (attachment) {
    const { error: attachmentDeleteError } = await supabase
      .from("attachments")
      .delete()
      .eq("id", attachmentId);
    if (attachmentDeleteError) throw attachmentDeleteError;
  }

  const storagePaths = [
    ...(attachment?.mime_type === "text/uri-list" || !attachment ? [] : [attachment.storage_path]),
    ...clientFiles.map((file: { storage_path: string }) => file.storage_path),
  ];
  const uniqueStoragePaths = [...new Set(storagePaths)];
  if (uniqueStoragePaths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("task-attachments")
      .remove(uniqueStoragePaths);
    if (storageError)
      console.error(
        "Could not remove attachment objects after deleting their records",
        storageError,
      );
  }
}
