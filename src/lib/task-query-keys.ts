/** Subtask rows follow the authenticated user's active workspace RLS scope. */
export const subtasksQueryKey = (userId?: string | null, workspaceId?: string | null) =>
  ["subtasks", userId ?? null, workspaceId ?? null] as const;
