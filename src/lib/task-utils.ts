import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  isAfter,
  isBefore,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfWeek,
  addDays,
} from "date-fns";

export type DateFilter =
  | "all"
  | "today"
  | "due_today"
  | "tomorrow"
  | "this_week"
  | "this_month"
  | "overdue"
  | "no_due"
  | "completed"
  | "pending";

export const dateFilterLabels: Record<DateFilter, string> = {
  all: "Todas",
  today: "Hoje",
  due_today: "Vence hoje",
  tomorrow: "Amanhã",
  this_week: "Semana",
  this_month: "Mês",
  overdue: "Atrasadas",
  no_due: "Sem prazo",
  completed: "Concluídas",
  pending: "Pendentes",
};

export interface TaskLike {
  id?: string;
  due_date: string | null;
  status: string | null;
  completed_at: string | null;
}

/**
 * A parent task cannot be considered concluded while it still has an open
 * subtask.  This also repairs the display of legacy records that were marked
 * as done before every subtask was completed.
 */
export function normalizeTasksWithOpenSubtasks<
  T extends TaskLike & { id: string; status_id?: string | null },
>(tasks: T[], openSubtaskTaskIds: Set<string>, openStatusId?: string | null): T[] {
  return tasks.map((task) => {
    const markedDone = task.status === "done" || !!task.completed_at;
    if (!markedDone || !openSubtaskTaskIds.has(task.id)) return task;

    return {
      ...task,
      status: "todo",
      completed_at: null,
      ...("status_id" in task ? { status_id: openStatusId ?? null } : {}),
    } as T;
  });
}

export function matchDateFilter(task: TaskLike, filter: DateFilter): boolean {
  const now = new Date();
  const due = task.due_date ? new Date(task.due_date) : null;
  const isDone = task.status === "done" || !!task.completed_at;

  switch (filter) {
    case "all":
      return true;
    case "today":
      if (!due) return false;
      return isWithinInterval(due, { start: startOfDay(now), end: endOfDay(now) });
    case "due_today":
      if (!due || isDone) return false;
      return isWithinInterval(due, { start: startOfDay(now), end: endOfDay(now) });
    case "tomorrow":
      if (!due) return false;
      const t = addDays(now, 1);
      return isWithinInterval(due, { start: startOfDay(t), end: endOfDay(t) });
    case "this_week":
      if (!due) return false;
      return isWithinInterval(due, {
        start: startOfWeek(now, { weekStartsOn: 1 }),
        end: endOfWeek(now, { weekStartsOn: 1 }),
      });
    case "this_month":
      if (!due) return false;
      return isWithinInterval(due, { start: startOfMonth(now), end: endOfMonth(now) });
    case "overdue":
      if (!due || isDone) return false;
      return isBefore(due, startOfDay(now));
    case "no_due":
      return !due;
    case "completed":
      return isDone;
    case "pending":
      return !isDone;
  }
}

export function taskUrgency(task: TaskLike): "overdue" | "due_today" | "due_soon" | "ok" {
  if (!task.due_date) return "ok";
  if (task.status === "done") return "ok";
  const due = new Date(task.due_date);
  const now = new Date();
  if (isWithinInterval(due, { start: startOfDay(now), end: endOfDay(now) })) return "due_today";
  if (isBefore(due, startOfDay(now))) return "overdue";
  if (isAfter(due, now) && isBefore(due, addDays(now, 2))) return "due_soon";
  return "ok";
}

export const priorityLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  urgent: "Urgente",
} as const;

export const priorityColors: Record<string, string> = {
  low: "#64748b",
  medium: "#2563eb",
  high: "#f59e0b",
  urgent: "#dc2626",
};

export const statusLabels = {
  todo: "A Fazer",
  in_progress: "Em Andamento",
  review: "Em Revisão",
  done: "Concluído",
} as const;
