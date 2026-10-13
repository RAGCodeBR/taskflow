import { openSubtaskTaskIdsByUser } from "./task-participation";

const CAROL_USER_ID = "3a93e438-1f3f-42f9-aea4-d22d227e1ea1";
const ELOISA_USER_ID = "0463e2ec-c7fe-4ba3-8df1-1f1ee0093e79";
const AMANDA_USER_ID = "0140bc01-2798-4616-9903-50bc191ce9ef";

/** Personal default for team viewers; clearing it still exposes their authorized team. */
export function defaultsToOwnAssignee(userId?: string | null, teamWorkspaceId?: string | null) {
  return Boolean(teamWorkspaceId) && (userId === CAROL_USER_ID || userId === ELOISA_USER_ID);
}

/** Amanda keeps her current permissions; the personal scope is only an initial filter. */
export function defaultsToOwnScope(userId?: string | null) {
  return userId === AMANDA_USER_ID;
}

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
