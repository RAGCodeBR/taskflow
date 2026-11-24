import type { Subtask, Task } from "@/hooks/use-data";
import type { OfflineOperation } from "@/lib/offline-sync";

/** Mantem na tela o estado local enquanto o servidor ainda nao confirmou a fila. */
export function overlayPendingTaskOperations(serverTasks: Task[], operations: OfflineOperation[], workspaceId?: string, includeOrigin = false) {
  const tasks = new Map(serverTasks.map((task) => [task.id, task]));

  for (const operation of operations) {
    if (operation.entity !== "task") continue;

    if (operation.action === "delete") {
      tasks.delete(operation.entityId);
      continue;
    }

    if (operation.action === "create") {
      const localTask = operation.payload.task as Task | undefined;
      if (localTask && (!workspaceId || localTask.workspace_id === workspaceId ||
          (includeOrigin && localTask.origin_workspace_id === workspaceId && localTask.created_by === operation.userId) || tasks.has(operation.entityId))) {
        tasks.set(operation.entityId, localTask);
      }
      continue;
    }

    const current = tasks.get(operation.entityId);
    if (current) {
      tasks.set(operation.entityId, {
        ...current,
        ...(operation.payload.patch as Partial<Task> | undefined),
      });
    }
  }

  return Array.from(tasks.values()).filter((task) => !task.deleted_at && !task.archived_at);
}

export function overlayPendingSubtasks(
  serverRows: Subtask[], operations: OfflineOperation[], knownTaskIds: Set<string>, workspaceId?: string,
) {
  const rows = new Map(serverRows.map((row) => [row.id, row]));
  for (const op of operations) {
    if (op.entity !== "subtask") continue;
    const current = rows.get(op.entityId);
    if (op.action === "delete") rows.delete(op.entityId);
    if (op.action === "update" && current) {
      const patch = op.payload.patch as Partial<Subtask>;
      const next = { ...current, ...patch };
      if (patch.done !== undefined && patch.completed_at === undefined) {
        next.completed_at = patch.done ? current.completed_at ?? op.createdAt : null;
      }
      rows.set(op.entityId, next);
    }
    if (op.action === "create" && !current) {
      const row = op.payload.subtask as Subtask;
      if (row && (knownTaskIds.has(row.task_id) || (workspaceId !== undefined && op.payload.workspaceId === workspaceId))) {
        rows.set(row.id, row);
      }
    }
  }
  return [...rows.values()];
}
