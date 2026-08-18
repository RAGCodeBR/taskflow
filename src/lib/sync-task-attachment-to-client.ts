import { supabase } from "@/integrations/supabase/client";

export interface SyncedClientFile {
  id: string;
  storagePath: string;
}

export const taskAttachmentIdFromClientFilePath = (storagePath: string) =>
  storagePath.match(/\/attachment-([^/]+)\//)?.[1] ?? null;

const safeFileName = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .replace(/_+/g, "_")
    .slice(-120) || "arquivo";

/**
 * Copies a task attachment into the client's file area when the task has a client.
 * Both records stay linked by the copy's storage path, so no database migration is required.
 */
export async function syncTaskAttachmentToClient({
  file,
  taskId,
  sourceAttachmentId,
  uploadedBy,
  contentType = file.type || "application/octet-stream",
}: {
  file: File;
  taskId: string;
  sourceAttachmentId: string;
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

  const storagePath = `clients/${task.client_id}/files/task-${taskId}/attachment-${sourceAttachmentId}/${Date.now()}-${crypto.randomUUID()}-${safeFileName(file.name)}`;
  const { error: uploadError } = await supabase.storage
    .from("task-attachments")
    .upload(storagePath, file, { contentType, upsert: false });
  if (uploadError) throw uploadError;

  const { data, error: insertError } = await supabase
    .from("client_files")
    .insert({
      client_id: task.client_id,
      title: file.name,
      file_name: file.name,
      storage_path: storagePath,
      mime_type: contentType,
      size_bytes: file.size,
      uploaded_by: uploadedBy,
    })
    .select("id")
    .single();

  if (insertError) {
    await supabase.storage.from("task-attachments").remove([storagePath]);
    throw insertError;
  }

  return { id: data.id, storagePath };
}

export async function removeSyncedClientFile(file: SyncedClientFile | null) {
  if (!file) return;
  await supabase.from("client_files").delete().eq("id", file.id);
  await supabase.storage.from("task-attachments").remove([file.storagePath]);
}

export async function removeTaskAttachmentAndClientCopy(attachmentId: string) {
  const [
    { data: attachment, error: attachmentError },
    { data: clientFiles, error: clientFilesError },
  ] = await Promise.all([
    supabase
      .from("attachments")
      .select("storage_path, mime_type")
      .eq("id", attachmentId)
      .maybeSingle(),
    supabase
      .from("client_files")
      .select("id, storage_path")
      .like("storage_path", `%/attachment-${attachmentId}/%`),
  ]);
  if (attachmentError) throw attachmentError;
  if (clientFilesError) throw clientFilesError;

  const clientFileIds = (clientFiles ?? []).map((file: { id: string }) => file.id);
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
    ...(clientFiles ?? []).map((file: { storage_path: string }) => file.storage_path),
  ];
  if (storagePaths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("task-attachments")
      .remove(storagePaths);
    if (storageError) console.error("Could not remove attachment objects after deleting their records", storageError);
  }
}
