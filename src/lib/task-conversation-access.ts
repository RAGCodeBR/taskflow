type TaskSnapshot = {
  id: string;
  assignee_id: string | null;
  created_by: string | null;
};

type SubtaskSnapshot = {
  task_id: string;
  assignee_id: string | null;
};

/** Offline comments remain available only when cached participation is known. */
export function canWriteCachedTaskConversation({
  taskId,
  userId,
  task,
  collaboratorTaskId,
  collaboratorIds,
  subtasks,
}: {
  taskId: string | null;
  userId: string | null | undefined;
  task?: TaskSnapshot | null;
  collaboratorTaskId?: string | null;
  collaboratorIds: readonly string[];
  subtasks: readonly SubtaskSnapshot[];
}) {
  if (!taskId || !userId || task?.id !== taskId) return false;
  return task.assignee_id === userId ||
    task.created_by === userId ||
    (collaboratorTaskId === taskId && collaboratorIds.includes(userId)) ||
    subtasks.some((subtask) => subtask.task_id === taskId && subtask.assignee_id === userId);
}
