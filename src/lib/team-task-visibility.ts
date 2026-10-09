import { openSubtaskTaskIdsByUser } from "./task-participation";

export function teamTaskVisibilityWorkspace(access: {
  isCollaborator: boolean;
  isClient: boolean;
  workspace?: { id: string; slug: string; canViewAllTasks?: boolean } | null;
}): string | null {
  if (
    !access.isCollaborator ||
    access.isClient ||
    access.workspace?.slug !== "marketing" ||
    access.workspace.canViewAllTasks !== true
  )
    return null;
  return access.workspace.id;
}

export function teamSubtaskAssigneeTaskIds(
  subtasks: { task_id: string; assignee_id: string | null; done: boolean }[],
  tasks: { id: string; workspace_id?: string | null }[],
  teamWorkspaceId: string | null,
) {
  const byUser = openSubtaskTaskIdsByUser(subtasks);
  if (!teamWorkspaceId) return byUser;
  const allowedParents = new Set(
    tasks.filter((task) => task.workspace_id === teamWorkspaceId).map((task) => task.id),
  );
  for (const subtask of subtasks) {
    if (!subtask.done || !subtask.assignee_id || !allowedParents.has(subtask.task_id)) continue;
    const parents = byUser.get(subtask.assignee_id) ?? new Set<string>();
    parents.add(subtask.task_id);
    byUser.set(subtask.assignee_id, parents);
  }
  return byUser;
}
