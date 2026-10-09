import type { Subtask, Task } from "@/hooks/use-data";

export type CalendarTaskEntry =
  | { kind: "task"; task: Task; subtasks: Subtask[] }
  | { kind: "subtask"; task: Task; subtask: Subtask };

/** Keep children with the parent only when their deadline is the same (or absent). */
export function calendarTaskEntriesForDay(
  tasks: Task[],
  subtasksByTaskId: Map<string, Subtask[]>,
  day: string,
  showSubtasks: boolean,
): CalendarTaskEntry[] {
  const entries: CalendarTaskEntry[] = [];
  for (const task of tasks) {
    const parentDay = task.due_date?.slice(0, 10);
    const children = showSubtasks ? (subtasksByTaskId.get(task.id) ?? []) : [];
    if (parentDay === day) {
      entries.push({
        kind: "task",
        task,
        subtasks: children.filter(
          (subtask) => !subtask.due_date || subtask.due_date.slice(0, 10) === day,
        ),
      });
    }
    for (const subtask of children) {
      if (subtask.due_date?.slice(0, 10) === day && parentDay !== day) {
        entries.push({ kind: "subtask", task, subtask });
      }
    }
  }
  return entries;
}
