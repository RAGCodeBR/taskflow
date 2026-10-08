import type { Task } from "@/hooks/use-data";
import type { OfflineOperation } from "@/lib/offline-sync";

export type TaskCardOpen = {
  task_id: string;
  user_id: string;
  first_opened_at: string;
  last_opened_at: string;
};
export type TaskPersonalPin = {
  task_id: string;
  user_id: string;
  is_pinned: boolean;
  changed_at: string;
};

export function overlayPersonalPins(
  rows: TaskPersonalPin[],
  operations: OfflineOperation[],
  userId: string,
) {
  const pins = new Map(
    rows.filter((row) => row.user_id === userId).map((row) => [row.task_id, row]),
  );
  for (const operation of operations) {
    if (operation.entity !== "task_pin" || operation.userId !== userId) continue;
    pins.set(operation.entityId, {
      task_id: operation.entityId,
      user_id: userId,
      is_pinned: operation.payload.pinned === true,
      changed_at: String(operation.payload.changed_at),
    });
  }
  return [...pins.values()];
}

export function mergeCardOpen(
  rows: TaskCardOpen[],
  taskId: string,
  userId: string,
  openedAt: string,
) {
  const current = rows.find((row) => row.task_id === taskId && row.user_id === userId);
  const opening = {
    task_id: taskId,
    user_id: userId,
    first_opened_at:
      current && Date.parse(current.first_opened_at) < Date.parse(openedAt) ? current.first_opened_at : openedAt,
    last_opened_at:
      current && Date.parse(current.last_opened_at) > Date.parse(openedAt) ? current.last_opened_at : openedAt,
  };
  return [...rows.filter((row) => row.task_id !== taskId || row.user_id !== userId), opening];
}

export function pendingPersonalPriorities(tasks: Task[], pins: TaskPersonalPin[]) {
  const ids = new Set(pins.filter((pin) => pin.is_pinned).map((pin) => pin.task_id));
  return tasks.filter(
    (task) =>
      ids.has(task.id) &&
      task.status !== "done" &&
      !task.completed_at &&
      !task.deleted_at &&
      !task.archived_at,
  );
}

export async function syncTaskCardActivity(
  client: { rpc: (name: string, args: Record<string, unknown>) => PromiseLike<{ error: unknown }> },
  operation: OfflineOperation,
) {
  const pin = operation.entity === "task_pin";
  const timestamp = operation.payload[pin ? "changed_at" : "opened_at"];
  if (
    typeof timestamp !== "string" ||
    !Number.isFinite(Date.parse(timestamp)) ||
    (pin && typeof operation.payload.pinned !== "boolean")
  )
    throw new Error("Registro de atividade da tarefa inválido.");
  const { error } = await client.rpc(pin ? "set_task_personal_pin" : "record_task_card_open", {
    target_task_id: operation.entityId,
    ...(pin
      ? { pinned: operation.payload.pinned, changed_at: timestamp }
      : { opened_at: timestamp }),
  });
  if (error) throw error;
  return false;
}
