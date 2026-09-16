import type { Task } from "@/hooks/use-data";
import type { OfflineOperation } from "@/lib/offline-sync";

/** Mantem na tela o estado local enquanto o servidor ainda nao confirmou a fila. */
export function overlayPendingTaskOperations(serverTasks: Task[], operations: OfflineOperation[]) {
  const tasks = new Map(serverTasks.map((task) => [task.id, task]));

  for (const operation of operations) {
    if (operation.entity !== "task") continue;

    if (operation.action === "delete") {
      tasks.delete(operation.entityId);
      continue;
    }

    if (operation.action === "create") {
      const localTask = operation.payload.task as Task | undefined;
      if (localTask) tasks.set(operation.entityId, localTask);
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

  return Array.from(tasks.values());
}
