import type { Subtask, Task } from "@/hooks/use-data";

type AssignedSubtask = Pick<Subtask, "task_id" | "assignee_id" | "done">;

/** A subtask-only participant follows the parent while at least one assigned part is open. */
export function openSubtaskTaskIdsForUser(subtasks: AssignedSubtask[], userId?: string | null) {
  const ids = new Set<string>();
  if (!userId) return ids;
  for (const subtask of subtasks) {
    if (subtask.assignee_id === userId && !subtask.done) ids.add(subtask.task_id);
  }
  return ids;
}

export function openSubtaskTaskIdsByUser(subtasks: AssignedSubtask[]) {
  const idsByUser = new Map<string, Set<string>>();
  for (const subtask of subtasks) {
    if (!subtask.assignee_id || subtask.done) continue;
    const ids = idsByUser.get(subtask.assignee_id) ?? new Set<string>();
    ids.add(subtask.task_id);
    idsByUser.set(subtask.assignee_id, ids);
  }
  return idsByUser;
}

export function completedSubtasksForUser(
  tasks: Task[],
  subtasks: Subtask[],
  userId?: string | null,
  workspaceId?: string | null,
) {
  if (!userId) return [];
  const parentById = new Map(tasks.map((task) => [task.id, task]));
  return subtasks
    .flatMap((subtask) => {
      if (subtask.assignee_id !== userId || !subtask.done) return [];
      const parent = parentById.get(subtask.task_id);
      if (!parent || (workspaceId && parent.workspace_id !== workspaceId)) return [];
      return [{ subtask, parent }];
    })
    .sort((a, b) => (b.subtask.completed_at ?? "").localeCompare(a.subtask.completed_at ?? ""));
}

export function completedSubtaskHistory(
  tasks: Task[],
  subtasks: Subtask[],
  userId?: string | null,
  collaboratorTaskIds?: Set<string>,
  workspaceId?: string | null,
) {
  const stillAssigned = openSubtaskTaskIdsForUser(subtasks, userId);
  return completedSubtasksForUser(tasks, subtasks, userId, workspaceId).filter(
    ({ subtask, parent }) =>
      !stillAssigned.has(subtask.task_id) &&
      parent.assignee_id !== userId &&
      !collaboratorTaskIds?.has(parent.id),
  );
}

/** A completed child can use the task filters without being mistaken for its parent card. */
export function completedSubtaskFilterTask(parent: Task, subtask: Subtask, userId: string): Task {
  return {
    ...parent,
    id: subtask.id,
    title: subtask.title,
    assignee_id: userId,
    due_date: subtask.due_date ?? parent.due_date,
    status: "done",
    completed_at: subtask.completed_at ?? parent.updated_at,
  };
}
