/* eslint-disable @typescript-eslint/no-explicit-any -- Supabase types are regenerated after the migration is applied. */
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarClock } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type RecurringMeetingReminder = {
  id: string;
  title: string;
  body: string | null;
  recurring_meeting_occurrence_id: string | null;
};

const DISMISSED_KEY = "taskflow:recurring-meeting-reminders-dismissed";

function readDismissed(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(DISMISSED_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

/**
 * Pop-up com os avisos de reunião ainda não vistos (os mesmos do sininho).
 * "Depois" esconde até a próxima sessão; abrir a pauta marca o aviso como lido.
 */
export function RecurringMeetingReminderPopup() {
  const { user, activeWorkspace } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [dismissed, setDismissed] = useState<string[]>(readDismissed);

  const { data: reminders = [] } = useQuery({
    queryKey: ["meeting-reminders", user?.id, activeWorkspace?.id],
    enabled: !!user?.id && !!activeWorkspace?.id,
    refetchInterval: 60_000,
    queryFn: async () => {
      const { data, error } = await (supabase.from("notifications") as any)
        .select(
          "id, title, body, recurring_meeting_occurrence_id, recurring_meeting_occurrences!inner(workspace_id)",
        )
        .eq("user_id", user!.id)
        .eq("type", "recurring_meeting_reminder")
        .eq("recurring_meeting_occurrences.workspace_id", activeWorkspace!.id)
        .eq("is_read", false)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return (data ?? []) as RecurringMeetingReminder[];
    },
  });

  const visible = reminders.filter((reminder) => !dismissed.includes(reminder.id));

  const markRead = async (ids: string[]) => {
    if (ids.length === 0) return;
    await (supabase.from("notifications") as any).update({ is_read: true }).in("id", ids);
    await queryClient.invalidateQueries({ queryKey: ["meeting-reminders"] });
  };

  const later = () => {
    const next = [...new Set([...dismissed, ...visible.map((reminder) => reminder.id)])];
    setDismissed(next);
    try {
      sessionStorage.setItem(DISMISSED_KEY, JSON.stringify(next));
    } catch {
      // Sem armazenamento da sessão, o pop-up apenas volta a aparecer depois.
    }
  };

  const review = async (reminder: RecurringMeetingReminder) => {
    await markRead([reminder.id]);
    if (reminder.recurring_meeting_occurrence_id) {
      void navigate({
        to: "/meetings",
        search: { meeting: reminder.recurring_meeting_occurrence_id },
      });
    }
  };

  return (
    <Dialog open={visible.length > 0} onOpenChange={(open) => !open && later()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-primary" />
            {visible.length === 1 ? "Reunião se aproximando" : "Reuniões se aproximando"}
          </DialogTitle>
          <DialogDescription>
            Revise a pauta e inclua novos assuntos antes da reunião.
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-2">
          {visible.map((reminder) => (
            <li
              key={reminder.id}
              className="flex items-center justify-between gap-3 rounded-lg border p-3"
            >
              <span className="min-w-0 text-sm font-medium">{reminder.title}</span>
              <Button size="sm" className="shrink-0" onClick={() => void review(reminder)}>
                Revisar pauta
              </Button>
            </li>
          ))}
        </ul>
        <DialogFooter className="gap-2">
          <Button
            variant="ghost"
            onClick={() => void markRead(visible.map((reminder) => reminder.id))}
          >
            Marcar como vistos
          </Button>
          <Button variant="outline" onClick={later}>
            Depois
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
