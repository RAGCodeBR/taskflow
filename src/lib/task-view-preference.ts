export type TaskView = "kanban" | "list" | "calendar";

const key = (userId: string, workspaceId: string) => `taskflow:task-view:${userId}:${workspaceId}`;

export function preferredTaskView(userId?: string, workspaceId?: string): TaskView {
  if (!userId || !workspaceId || typeof window === "undefined") return "kanban";
  try {
    const value = window.localStorage.getItem(key(userId, workspaceId));
    return value === "list" || value === "calendar" ? value : "kanban";
  } catch {
    return "kanban";
  }
}

export function rememberTaskView(view: TaskView, userId?: string, workspaceId?: string): void {
  if (!userId || !workspaceId || typeof window === "undefined") return;
  try { window.localStorage.setItem(key(userId, workspaceId), view); } catch { /* private storage */ }
}
