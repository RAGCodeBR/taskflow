import { isTaskCompleted, matchDateFilter, type DateFilter, type TaskLike } from "./task-utils";

export type DashboardStatusFilter = "all" | "pending" | "completed";
export type DashboardAssigneeFilter = "all" | "unassigned" | (string & {});
export type DashboardCustomPeriod = { start: string; end: string } | null;

type FilterableTask = TaskLike & { assignee_id: string | null };

export function applyDashboardFilters<T extends FilterableTask>(
  tasks: readonly T[],
  options: {
    period: DateFilter;
    customPeriod: DashboardCustomPeriod;
    status: DashboardStatusFilter;
    assignee: DashboardAssigneeFilter;
  },
): T[] {
  const { period, customPeriod, status, assignee } = options;
  return tasks.filter((task) => {
    // Completed work is counted on its completion date; open work uses its due date.
    const referenceDate = customPeriod
      ? (isTaskCompleted(task) ? task.completed_at : task.due_date)?.slice(0, 10)
      : null;
    const matchesPeriod = customPeriod
      ? Boolean(
          referenceDate && referenceDate >= customPeriod.start && referenceDate <= customPeriod.end,
        )
      : matchDateFilter(task, period);
    if (!matchesPeriod) return false;
    if (status === "completed" && !isTaskCompleted(task)) return false;
    if (status === "pending" && isTaskCompleted(task)) return false;
    if (assignee === "unassigned") return !task.assignee_id;
    if (assignee !== "all") return task.assignee_id === assignee;
    return true;
  });
}
