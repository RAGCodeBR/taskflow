import { isWithinInterval, parseISO } from "date-fns";
import type { Subtask, Task } from "@/hooks/use-data";

export type ReportSubtask = Subtask & { parentTitle: string };

/** Subtasks use their own assignee and dates; the parent only defines report scope. */
export function reportSubtasksInPeriod(
  tasks: readonly Pick<Task, "id" | "title">[],
  subtasks: readonly Subtask[],
  start: Date,
  end: Date,
): ReportSubtask[] {
  const parents = new Map(tasks.map((task) => [task.id, task.title]));
  return subtasks.flatMap((subtask) => {
    const parentTitle = parents.get(subtask.task_id);
    if (parentTitle === undefined) return [];
    const relevantDate = subtask.done ? subtask.completed_at : subtask.due_date;
    if (!relevantDate || !isWithinInterval(parseISO(relevantDate), { start, end })) return [];
    return [{ ...subtask, parentTitle }];
  });
}

/** Inherit only the reporting dimensions of the parent, never its owner or progress. */
export function reportSubtaskActivities(
  tasks: readonly Task[],
  subtasks: readonly ReportSubtask[],
): Task[] {
  const parentById = new Map(tasks.map((task) => [task.id, task]));
  return subtasks.flatMap((subtask) => {
    const parent = parentById.get(subtask.task_id);
    if (!parent) return [];
    return [{
      ...parent,
      id: subtask.id,
      title: subtask.title,
      assignee_id: subtask.assignee_id,
      due_date: subtask.due_date,
      completed_at: subtask.completed_at,
      status: subtask.done ? "done" : "todo",
    }];
  });
}
