import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  calendarSubtasksDefault,
  calendarSubtasksPreferenceKey,
  readCalendarSubtasksPreference,
} from "@/lib/calendar-subtask-preference";

export function useCalendarSubtasks(workspaceId?: string | null) {
  const { user } = useAuth();
  const userId = user?.id;
  const key = userId ? calendarSubtasksPreferenceKey(userId, workspaceId) : null;
  const [preference, setPreference] = useState<{ key: string; enabled: boolean } | null>(null);
  const enabled = preference?.key === key ? preference.enabled : calendarSubtasksDefault(user?.id);
  useEffect(() => {
    if (!userId || !key) return;
    setPreference({ key, enabled: readCalendarSubtasksPreference(userId, workspaceId) });
  }, [key, userId, workspaceId]);
  const setEnabled = (next: boolean) => {
    if (!key) return;
    setPreference({ key, enabled: next });
    try {
      localStorage.setItem(key, String(next));
    } catch {
      /* Keep the selection for this session. */
    }
  };
  return { enabled, setEnabled };
}
