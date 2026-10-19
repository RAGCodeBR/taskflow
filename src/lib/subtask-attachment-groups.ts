import type { OfflineOperation } from "@/lib/offline-sync";

/** Combines saved files with this browser's pending offline changes. */
export function groupSubtaskAttachments<T extends { id: string; subtask_id: string }>(
  subtaskIds: readonly string[],
  saved: readonly T[],
  pending: readonly OfflineOperation[],
): Record<string, T[]> {
  const grouped: Record<string, T[]> = Object.fromEntries(subtaskIds.map((id) => [id, []]));
  for (const attachment of saved) {
    if (grouped[attachment.subtask_id]) grouped[attachment.subtask_id].push(attachment);
  }
  for (const operation of pending) {
    if (operation.entity === "attachment" && operation.action === "create" &&
        operation.payload.table === "subtask_attachments") {
      const attachment = operation.payload.attachment as T | undefined;
      if (attachment && grouped[attachment.subtask_id] &&
          !grouped[attachment.subtask_id].some((file) => file.id === attachment.id))
        grouped[attachment.subtask_id].push(attachment);
    }
    if (operation.entity === "record" && operation.action === "delete" &&
        operation.payload.table === "subtask_attachments") {
      for (const files of Object.values(grouped)) {
        const index = files.findIndex((file) => file.id === operation.entityId);
        if (index !== -1) files.splice(index, 1);
      }
    }
  }
  return grouped;
}
