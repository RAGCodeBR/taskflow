import type { QueryClient } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { Task } from "@/hooks/use-data";
import { format } from "date-fns";

const day = (value: string | null | undefined) =>
  value ? format(new Date(value), "yyyy-MM-dd") : "";
const descriptionText = (value: string | null | undefined) =>
  (value ?? "").replace(
    /<img\b[^>]*(?:data-taskflow-pending-id|data-task-attachment-id|src="taskflow-attachment:\/\/)[^>]*>/gi,
    "",
  );

/** A description edit must not resend the old deadline (or other untouched fields). */
export function taskEditPatch(original: Task, form: Partial<Task>): Partial<Task> {
  const patch: Partial<Task> = {};
  const originalStatus = original.completed_at ? "done" : (original.status ?? "todo");
  for (const key of Object.keys(form) as (keyof Task)[]) {
    let unchanged = form[key] === original[key];
    if (key === "description")
      unchanged = descriptionText(form.description) === descriptionText(original.description);
    if (key === "due_date" || key === "completed_at")
      unchanged = day(form[key]) === day(original[key]);
    if (key === "due_time")
      unchanged = (form.due_time ?? "").slice(0, 5) === (original.due_time ?? "").slice(0, 5);
    if (key === "status") unchanged = form.status === originalStatus;
    // The form groups open statuses together; editing text must not select a different one.
    if (key === "status_id" && form.status === originalStatus) unchanged = true;
    if (!unchanged) Object.assign(patch, { [key]: form[key] });
  }
  return patch;
}

export function taskEditError(
  error: unknown,
  fallback = "Não foi possível salvar a tarefa. Tente novamente.",
) {
  const message = typeof error === "object" && error && "message" in error ? error.message : null;
  return typeof message === "string" && message.trim() ? message : fallback;
}

/** Require a returned row: an UPDATE affecting zero rows is not a successful save. */
export async function persistTaskEdit(
  client: Pick<SupabaseClient<Database>, "from">,
  taskId: string,
  patch: Partial<Task>,
  queryClient: QueryClient,
) {
  const { data, error } = await client
    .from("tasks")
    .update(patch as Database["public"]["Tables"]["tasks"]["Update"])
    .eq("id", taskId)
    .select("*")
    .single();
  if (error) throw new Error(taskEditError(error));
  if (!data || data.id !== taskId)
    throw new Error("A alteração não foi confirmada. Reabra a tarefa e tente novamente.");
  // Cancel older reads before publishing the confirmed row to scoped task lists.
  await queryClient.cancelQueries({ queryKey: ["tasks"] });
  queryClient.setQueriesData<Task[]>({ queryKey: ["tasks"] }, (current) =>
    Array.isArray(current)
      ? current.map((task) => (task.id === taskId ? ({ ...task, ...data } as Task) : task))
      : current,
  );
  return data as Task;
}
