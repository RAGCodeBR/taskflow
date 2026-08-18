import { supabase } from "@/integrations/supabase/client";
import type { Task } from "@/hooks/use-data";
import { syncTaskAttachmentToClient } from "@/lib/sync-task-attachment-to-client";

type CopiedSubtask = {
  title: string;
  position: number;
  assignee_id: string | null;
  due_date: string | null;
};

type CopiedComment = { body: string; author_id: string };
type CopiedTagLink = { tag_id: string };

/** Copies the task context that makes sense for a new activity. */
export async function duplicateTask(task: Task, dueDate: string, userId: string) {
  const newTaskId = crypto.randomUUID();
  const { error: taskError } = await supabase.from("tasks").insert({
    id: newTaskId,
    title: `${task.title} (cópia)`,
    description: task.description,
    status: task.status === "done" ? "todo" : task.status,
    priority: task.priority,
    column_id: task.column_id,
    client_id: task.client_id,
    assignee_id: task.assignee_id,
    due_date: new Date(`${dueDate}T12:00:00`).toISOString(),
    color: task.color,
    status_id: task.status_id,
    completed_at: null,
    created_by: userId,
    position: 9999,
  });
  if (taskError) throw taskError;

  const { data: subtasks } = await supabase
    .from("subtasks")
    .select("title, position, assignee_id, due_date")
    .eq("task_id", task.id);
  if (subtasks?.length) {
    await supabase.from("subtasks").insert(
      subtasks.map((subtask: CopiedSubtask) => ({
        task_id: newTaskId,
        title: subtask.title,
        done: false,
        position: subtask.position,
        assignee_id: subtask.assignee_id,
        due_date: subtask.due_date,
      })),
    );
  }

  const { data: comments } = await supabase
    .from("comments")
    .select("body, author_id")
    .eq("task_id", task.id);
  if (comments?.length) {
    await supabase
      .from("comments")
      .insert(comments.map((comment: CopiedComment) => ({ task_id: newTaskId, body: comment.body, author_id: comment.author_id })));
  }

  const { data: tagLinks } = await supabase
    .from("task_tag_links")
    .select("tag_id")
    .eq("task_id", task.id);
  if (tagLinks?.length) {
    await supabase
      .from("task_tag_links")
      .insert(tagLinks.map((tagLink: CopiedTagLink) => ({ task_id: newTaskId, tag_id: tagLink.tag_id })));
  }

  const { data: attachments } = await supabase
    .from("attachments")
    .select("file_name, storage_path, mime_type, size_bytes, uploaded_by")
    .eq("task_id", task.id);
  for (const attachment of attachments ?? []) {
    if (attachment.mime_type === "text/uri-list") {
      await supabase.from("attachments").insert({ ...attachment, task_id: newTaskId });
      continue;
    }
    try {
      const { data: fileData, error: downloadError } = await supabase.storage
        .from("task-attachments")
        .download(attachment.storage_path);
      if (downloadError || !fileData) continue;
      const storagePath = `${newTaskId}/${Date.now()}-${attachment.file_name}`;
      const { error: uploadError } = await supabase.storage.from("task-attachments").upload(storagePath, fileData, {
        contentType: attachment.mime_type || "application/octet-stream",
      });
      if (uploadError) continue;
      const { data: duplicatedAttachment, error: duplicateAttachmentError } = await supabase
        .from("attachments")
        .insert({ ...attachment, task_id: newTaskId, storage_path: storagePath, uploaded_by: userId })
        .select("id")
        .single();
      if (duplicateAttachmentError || !duplicatedAttachment) continue;

      try {
        await syncTaskAttachmentToClient({
          file: new File([fileData], attachment.file_name, {
            type: attachment.mime_type || "application/octet-stream",
          }),
          taskId: newTaskId,
          sourceAttachmentId: duplicatedAttachment.id,
          uploadedBy: userId,
          contentType: attachment.mime_type || "application/octet-stream",
        });
      } catch {
        await supabase.from("attachments").delete().eq("id", duplicatedAttachment.id);
        await supabase.storage.from("task-attachments").remove([storagePath]);
      }
    } catch {
      // An attachment failure must not prevent the task copy from being created.
    }
  }
}
