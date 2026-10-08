import type { QueryClient } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { Task } from "@/hooks/use-data";
import {
  addOfflineConflict,
  enqueueOfflineOperation,
  replaceOfflineOperation,
  type OfflineOperation,
} from "@/lib/offline-sync";

export type CalendarDueDateChange = {
  id: string;
  task_id: string;
  user_id: string;
  old_due_date: string | null;
  new_due_date: string;
  reason: string;
  created_at: string;
};

/** Uses the same local noon convention as the task editor, without changing due_time. */
export function calendarDeadline(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Data de destino inválida.");
  const value = new Date(`${date}T12:00:00`);
  const [year, month, day] = date.split("-").map(Number);
  if (
    !Number.isFinite(value.getTime()) ||
    value.getFullYear() !== year ||
    value.getMonth() + 1 !== month ||
    value.getDate() !== day
  )
    throw new Error("Data de destino inválida.");
  return value.toISOString();
}

const sameDate = (first: unknown, second: unknown) =>
  first === second ||
  (typeof first === "string" &&
    typeof second === "string" &&
    new Date(first).getTime() === new Date(second).getTime());

/** The deadline and its required reason are a single durable queue entry. */
export async function queueCalendarTaskReschedule({
  userId,
  task,
  date,
  reason,
  queryClient,
  history,
}: {
  userId: string;
  task: Pick<Task, "id" | "due_date" | "updated_at">;
  date: string;
  reason: string;
  queryClient: QueryClient;
  history?: { id: string; created_at: string };
}) {
  if (!userId || (!task.due_date && !history))
    throw new Error("Não foi possível localizar o prazo da tarefa.");
  if (!reason.trim()) throw new Error("Informe a justificativa para alterar o prazo da tarefa.");
  const next = calendarDeadline(date);
  const previous = task.due_date ? new Date(task.due_date) : null;
  const destination = new Date(next);
  if (
    !history &&
    previous &&
    previous.getFullYear() === destination.getFullYear() &&
    previous.getMonth() === destination.getMonth() &&
    previous.getDate() === destination.getDate()
  )
    throw new Error("Escolha uma data diferente do prazo atual.");
  const change: CalendarDueDateChange = {
    id: history?.id ?? crypto.randomUUID(),
    task_id: task.id,
    user_id: userId,
    old_due_date: task.due_date,
    new_due_date: next,
    reason: reason.trim(),
    created_at: history?.created_at ?? new Date().toISOString(),
  };
  await enqueueOfflineOperation({
    userId,
    entity: "task",
    action: "update",
    entityId: task.id,
    payload: { patch: { due_date: next }, calendarDueDateChange: change },
    baseUpdatedAt: task.updated_at,
    baseValues: { due_date: task.due_date },
  });
  // Update every existing scoped task cache, never create an unscoped empty list.
  queryClient.setQueriesData<Task[]>({ queryKey: ["tasks"] }, (current) =>
    Array.isArray(current)
      ? current.map((item) => (item.id === task.id ? { ...item, due_date: next } : item))
      : current,
  );
}

/** Only calendar operations use this path; existing task mutations are unchanged. */
export async function syncCalendarTaskReschedule(
  client: Pick<SupabaseClient<Database>, "from">,
  operation: OfflineOperation,
) {
  const change = operation.payload.calendarDueDateChange as CalendarDueDateChange;
  if (
    !change?.reason?.trim() ||
    change.task_id !== operation.entityId ||
    change.user_id !== operation.userId
  ) {
    throw new Error("Alteração de prazo sem justificativa válida.");
  }
  if (!operation.payload.calendarDueDateApplied) {
    const { data: server, error } = await client
      .from("tasks")
      .select("due_date, updated_at, deleted_at, archived_at")
      .eq("id", operation.entityId)
      .single();
    if (error) throw error;
    if (server.deleted_at || server.archived_at)
      throw new Error("A tarefa foi excluída ou arquivada.");
    if (
      !sameDate(server.due_date, change.old_due_date) &&
      !sameDate(server.due_date, change.new_due_date)
    ) {
      await addOfflineConflict({
        operationId: operation.id,
        userId: operation.userId,
        entity: "task",
        entityId: operation.entityId,
        field: "due_date",
        serverValue: server.due_date,
        localValue: change.new_due_date,
        serverUpdatedAt: server.updated_at,
        dueDateChange: { id: change.id, reason: change.reason, created_at: change.created_at },
      });
      return true;
    }
    if (!sameDate(server.due_date, change.new_due_date)) {
      // A concurrent deadline change must not be overwritten between read and write.
      let update = client
        .from("tasks")
        .update({ due_date: change.new_due_date })
        .eq("id", operation.entityId)
        .is("deleted_at", null)
        .is("archived_at", null);
      update = server.due_date
        ? update.eq("due_date", server.due_date)
        : update.is("due_date", null);
      const { error: updateError } = await update.select("id").single();
      if (updateError) throw updateError;
    }
    // Remember a completed write before recording history, so an audit retry
    // cannot move the task back after a later legitimate deadline change.
    await replaceOfflineOperation({
      ...operation,
      payload: { ...operation.payload, patch: {}, calendarDueDateApplied: true },
    });
  }
  const { error: historyError } = await client
    .from("task_due_date_changes")
    .upsert(change, { onConflict: "id", ignoreDuplicates: true });
  if (historyError) throw historyError;
  return false;
}
