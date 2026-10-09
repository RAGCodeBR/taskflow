import type { Task } from "@/hooks/use-data";

export type CalendarCompletionDecision =
  | "already-completed"
  | "draft"
  | "pending-subtasks"
  | "choose-date"
  | "complete";

/** Keep the calendar's quick completion rules aligned with the Kanban card. */
export function calendarCompletionDecision(
  task: Pick<Task, "is_draft" | "status" | "completed_at" | "due_date">,
  hasPendingSubtasks: boolean,
  today: string,
): CalendarCompletionDecision {
  if (task.status === "done" || task.completed_at) return "already-completed";
  if (task.is_draft) return "draft";
  if (hasPendingSubtasks) return "pending-subtasks";
  if (task.due_date?.slice(0, 10) && task.due_date.slice(0, 10) < today) return "choose-date";
  return "complete";
}
