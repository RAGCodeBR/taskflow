// Account IDs make the defaults independent from spelling/name changes.
const DEFAULT_SUBTASK_VIEW_USERS = new Set([
  "b64c44c4-4bf1-41f0-92cb-9a06d0905f03", // Luiz Alvares
  "7b0fccc4-3008-4983-b435-37af85edcd85", // Isabella Domingues
]);

export function calendarSubtasksDefault(userId?: string | null) {
  return !!userId && DEFAULT_SUBTASK_VIEW_USERS.has(userId);
}

export function calendarSubtasksPreferenceKey(userId: string, workspaceId?: string | null) {
  return `taskflow:calendar-subtasks:${userId}:${workspaceId ?? "default"}`;
}

export function readCalendarSubtasksPreference(userId: string, workspaceId?: string | null) {
  try {
    const stored =
      typeof localStorage !== "undefined"
        ? localStorage.getItem(calendarSubtasksPreferenceKey(userId, workspaceId))
        : null;
    if (stored === "true" || stored === "false") return stored === "true";
  } catch {
    /* Storage may be unavailable in a restricted browser. */
  }
  return calendarSubtasksDefault(userId);
}
