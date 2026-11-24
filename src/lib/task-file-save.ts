import { supabase } from "@/integrations/supabase/client";
import { enqueueOfflineOperation } from "./offline-sync";
import { syncTaskAttachmentToClient } from "./sync-task-attachment-to-client";

type FileTarget = { taskId: string; subtaskId?: string; userId: string };

function newAttachment(file: File, { taskId, subtaskId, userId }: FileTarget) {
  const id = crypto.randomUUID();
  const folder = subtaskId ? `${taskId}/subtasks/${subtaskId}` : taskId;
  return {
    id,
    task_id: taskId,
    ...(subtaskId ? { subtask_id: subtaskId } : {}),
    storage_path: `${folder}/arquivo-${id}`,
    file_name: file.name,
    mime_type: file.type || null,
    size_bytes: file.size,
    uploaded_by: userId,
    created_at: new Date().toISOString(),
  };
}

export function createTaskFileSaver() {
  const pending = new WeakMap<File, {
    attachment: ReturnType<typeof newAttachment>;
    stored: boolean;
    linked: boolean;
  }>();

  return async (file: File, target: FileTarget, offline: boolean) => {
    let progress = pending.get(file);
    if (!progress || progress.attachment.task_id !== target.taskId ||
        progress.attachment.uploaded_by !== target.userId ||
        progress.attachment.subtask_id !== target.subtaskId) {
      progress = { attachment: newAttachment(file, target), stored: false, linked: false };
      pending.set(file, progress);
    }

    const { attachment } = progress;
    const bucket = "task-attachments";
    const table = target.subtaskId ? "subtask_attachments" : "attachments";
    if (offline) {
      await enqueueOfflineOperation({
        userId: target.userId, entity: "attachment", action: "create", entityId: attachment.id,
        payload: { table, bucket, blob: file, attachment, syncClientFile: !target.subtaskId },
      });
    } else {
      if (!progress.stored) {
        const { error } = await supabase.storage.from(bucket).upload(attachment.storage_path, file);
        // A retry uses the same random object path if the server stored the file
        // before the browser received the acknowledgement.
        if (error && !/duplicate|already exists/i.test(error.message)) throw error;
        progress.stored = true;
      }
      if (!progress.linked) {
        const { error } = await supabase.from(table).upsert(attachment, {
          onConflict: "id", ignoreDuplicates: true,
        });
        if (error) throw error;
        progress.linked = true;
      }
      if (!target.subtaskId) {
        await syncTaskAttachmentToClient({
          file, taskId: target.taskId, sourceAttachmentId: attachment.id,
          sourceStoragePath: attachment.storage_path, uploadedBy: target.userId,
        });
      }
    }
    pending.delete(file);
    return attachment;
  };
}
