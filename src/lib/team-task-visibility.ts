import { openSubtaskTaskIdsByUser } from "./task-participation";

const AMANDA_USER_ID = "0140bc01-2798-4616-9903-50bc191ce9ef";

/** Open the personal queue first in the task workspaces, while keeping "Todas" selectable. */
export function defaultsToOwnScope(
  userId?: string | null,
  teamWorkspaceId?: string | null,
  workspaceSlug?: string | null,
) {
  return Boolean(userId && (teamWorkspaceId || workspaceSlug === "consultoria")) || userId === AMANDA_USER_ID;
}

export function teamTaskVisibilityWorkspace(access: {
  isCollaborator: boolean;
  isAdmin?: boolean;
  isClient: boolean;
  workspace?: { id: string; slug: string; canViewAllTasks?: boolean } | null;
}): string | null {
  if (
    (!access.isCollaborator && !access.isAdmin) ||
    access.isClient ||
    access.workspace?.slug !== "marketing"
  )
    return null;
  return access.workspace.id;
}

export function teamSubtaskAssigneeTaskIds(
  subtasks: { task_id: string; assignee_id: string | null; done: boolean }[],
) {
  // A completed child remains in personal history, never in the owner's work queue.
  return openSubtaskTaskIdsByUser(subtasks);
}
