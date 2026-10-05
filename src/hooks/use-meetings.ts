/* eslint-disable @typescript-eslint/no-explicit-any -- Supabase types are regenerated after the migration is applied. */
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export type RecurringMeetingFrequency = "daily" | "weekly" | "monthly";
export type RecurringMeetingMonthRule = "specific_days" | "last_day" | "last_business_day";

export interface RecurringMeeting {
  id: string;
  workspace_id: string;
  title: string;
  description: string | null;
  client_id: string | null;
  assignee_id: string | null;
  frequency: RecurringMeetingFrequency;
  interval_count: number;
  days_of_week: number[];
  days_of_month: number[];
  month_rule: RecurringMeetingMonthRule;
  business_days_only: boolean;
  start_date: string;
  end_date: string | null;
  create_before_days: number;
  due_time: string | null;
  priority: "low" | "medium" | "high" | "urgent";
  column_id: string | null;
  status_id: string | null;
  department_id: string | null;
  meeting_mode: boolean;
  /** False para uma reunião única; true para uma rotina recorrente. */
  is_recurring: boolean;
  add_to_calendar: boolean;
  create_google_meet: boolean;
  auto_smart_notes: boolean;
  auto_transcription: boolean;
  google_calendar_id: string | null;
  duration_minutes: number;
  meeting_location: string | null;
  meeting_attendee_emails: string[];
  manual_meeting_url: string | null;
  /** Dias de antecedência do aviso aos participantes. */
  reminder_days_before: number;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface MeetingCalendarEvent {
  id: string;
  created_by: string;
  updated_by: string | null;
  recurring_meeting_occurrence_id: string;
  meeting_url: string | null;
  starts_at: string;
  ends_at: string;
  sync_status: "not_configured" | "pending" | "synced" | "error";
  sync_error: string | null;
  auto_smart_notes: boolean;
  auto_transcription: boolean;
}

export function useMeetingCalendarEvents() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["meeting-calendar-events", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await (supabase.from("calendar_events" as any) as any)
        .select(
          "id, created_by, updated_by, recurring_meeting_occurrence_id, meeting_url, starts_at, ends_at, sync_status, sync_error, auto_smart_notes, auto_transcription",
        )
        .not("recurring_meeting_occurrence_id", "is", null)
        .is("deleted_at", null);
      if (error) throw error;
      return (data ?? []) as MeetingCalendarEvent[];
    },
  });
}

/** Em quais reuniões um item da pauta padrão entra. */
export type AgendaCadence = "every" | "biweekly" | "first_of_month" | "last_of_month" | "until_day";

/** Item da pauta padrão: é copiado para as reuniões conforme a periodicidade. */
export interface RecurringMeetingTaskTemplate {
  id: string;
  recurring_meeting_id: string;
  title: string;
  description: string | null;
  assignee_id: string | null;
  priority: RecurringMeeting["priority"] | null;
  position: number;
  cadence: AgendaCadence;
  cadence_day: number | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type RecurringMeetingOccurrenceStatus = "scheduled" | "open" | "completed" | "skipped";

/** Uma reunião gerada pela recorrência. */
export interface RecurringMeetingOccurrence {
  id: string;
  workspace_id: string;
  recurring_meeting_id: string;
  due_date: string;
  due_time: string | null;
  status: RecurringMeetingOccurrenceStatus;
  task_id: string | null;
  completed_at: string | null;
  completed_by: string | null;
  /** Quando a pauta foi copiada para a reunião; antes disso ela segue a pauta padrão. */
  agenda_prepared_at: string | null;
  reminded_at: string | null;
  rescheduled_at: string | null;
  calendar_event_disabled: boolean;
  created_at: string;
  updated_at: string;
}

export type AgendaItemResult = "done" | "task";

/** Item da pauta de uma reunião específica. */
export interface RecurringMeetingAgendaItem {
  id: string;
  occurrence_id: string;
  template_id: string | null;
  title: string;
  position: number;
  result: AgendaItemResult | null;
  resolved_by: string | null;
  resolved_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

/** Pauta prevista de uma reunião que ainda não teve a pauta copiada. */
export interface AgendaPreviewItem {
  template_id: string;
  title: string;
  position: number;
}

export interface RecurringMeetingParticipant {
  recurring_meeting_id: string;
  user_id: string;
}

function useRecurringMeetingRealtime() {
  const queryClient = useQueryClient();
  const { activeWorkspace } = useAuth();

  useEffect(() => {
    if (!activeWorkspace?.id) return;
    const channel = supabase
      .channel(`recurring_meetings-${activeWorkspace.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "recurring_meetings" },
        () => void queryClient.invalidateQueries({ queryKey: ["recurring_meetings"] }),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "recurring_meeting_occurrences" },
        () => void queryClient.invalidateQueries({ queryKey: ["recurringMeeting-occurrences"] }),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "recurring_meeting_agenda_items" },
        () => {
          void queryClient.invalidateQueries({ queryKey: ["recurringMeeting-agenda-items"] });
          void queryClient.invalidateQueries({ queryKey: ["recurringMeeting-agenda-preview"] });
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "calendar_events" },
        () => void queryClient.invalidateQueries({ queryKey: ["meeting-calendar-events"] }),
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [activeWorkspace?.id, queryClient]);
}

export function useRecurringMeetingTaskTemplates(recurringMeetingId: string | null | undefined) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["recurringMeeting-task-templates", recurringMeetingId],
    enabled: !!user && !!recurringMeetingId,
    queryFn: async () => {
      const { data, error } = await (
        supabase.from("recurring_meeting_agenda_templates" as any) as any
      )
        .select("*")
        .eq("recurring_meeting_id", recurringMeetingId)
        .order("position")
        .order("created_at");
      if (error) throw error;
      return (data ?? []) as RecurringMeetingTaskTemplate[];
    },
  });
}

/** Pautas fixas de todas as rotinas do ambiente, para exibir em cada reunião. */
export function useAllRecurringMeetingTaskTemplates() {
  const { user, activeWorkspace } = useAuth();
  return useQuery({
    queryKey: ["recurringMeeting-task-templates", "all", activeWorkspace?.id],
    enabled: !!user && !!activeWorkspace?.id,
    queryFn: async () => {
      const { data, error } = await (
        supabase.from("recurring_meeting_agenda_templates" as any) as any
      )
        .select("*")
        .order("position")
        .order("created_at");
      if (error) throw error;
      return (data ?? []) as RecurringMeetingTaskTemplate[];
    },
  });
}

export function useRecurringMeetings() {
  const { user, activeWorkspace } = useAuth();
  useRecurringMeetingRealtime();
  return useQuery({
    queryKey: ["recurring_meetings", activeWorkspace?.id],
    enabled: !!user && !!activeWorkspace?.id,
    queryFn: async () => {
      const { data, error } = await (supabase.from("recurring_meetings" as any) as any)
        .select("*")
        .order("title", { ascending: true });
      if (error) throw error;
      return (data ?? []) as RecurringMeeting[];
    },
  });
}

/** Reuniões de um ano para trás até seis meses à frente. */
export function useRecurringMeetingOccurrences() {
  const { user, activeWorkspace } = useAuth();
  return useQuery({
    queryKey: ["recurringMeeting-occurrences", activeWorkspace?.id],
    enabled: !!user && !!activeWorkspace?.id,
    queryFn: async () => {
      const from = new Date();
      from.setFullYear(from.getFullYear() - 1);
      const until = new Date();
      until.setMonth(until.getMonth() + 7);
      const { data, error } = await (supabase.from("recurring_meeting_occurrences" as any) as any)
        .select("*")
        .gte("due_date", from.toISOString().slice(0, 10))
        .lte("due_date", until.toISOString().slice(0, 10))
        .order("due_date", { ascending: true });
      if (error) throw error;
      return (data ?? []) as RecurringMeetingOccurrence[];
    },
  });
}

/** Itens das pautas já copiadas para todas as reuniões exibidas na tela. */
export function useRecurringMeetingAgendaItems() {
  const { user, activeWorkspace } = useAuth();
  return useQuery({
    queryKey: ["recurringMeeting-agenda-items", activeWorkspace?.id],
    enabled: !!user && !!activeWorkspace?.id,
    queryFn: async () => {
      const from = new Date();
      from.setFullYear(from.getFullYear() - 1);
      const { data, error } = await (supabase.from("recurring_meeting_agenda_items" as any) as any)
        .select("*, recurring_meeting_occurrences!inner(due_date)")
        .gte("recurring_meeting_occurrences.due_date", from.toISOString().slice(0, 10))
        .order("position")
        .order("created_at");
      if (error) throw error;
      return (
        (data ?? []) as Array<
          RecurringMeetingAgendaItem & { recurring_meeting_occurrences?: unknown }
        >
      ).map(
        ({ recurring_meeting_occurrences: _occurrence, ...item }) =>
          item as RecurringMeetingAgendaItem,
      );
    },
  });
}

/** Pauta prevista (calculada no banco a partir da pauta padrão e da periodicidade). */
export function useRecurringMeetingAgendaPreview(occurrenceId: string | null | undefined) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["recurringMeeting-agenda-preview", occurrenceId],
    enabled: !!user && !!occurrenceId,
    queryFn: async () => {
      const { data, error } = await (supabase as any).rpc("recurring_meeting_agenda_preview", {
        target_occurrence_id: occurrenceId,
      });
      if (error) throw error;
      return (data ?? []) as AgendaPreviewItem[];
    },
  });
}

export function useRecurringMeetingParticipants() {
  const { user, activeWorkspace } = useAuth();
  return useQuery({
    queryKey: ["recurringMeeting-participants", activeWorkspace?.id],
    enabled: !!user && !!activeWorkspace?.id,
    queryFn: async () => {
      const { data, error } = await (
        supabase.from("recurring_meeting_participants" as any) as any
      ).select("recurring_meeting_id, user_id");
      if (error) throw error;
      return (data ?? []) as RecurringMeetingParticipant[];
    },
  });
}

/** Also exposes Meetings to people invited in another active workspace. */
export function useHasInvitedMeeting() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["has-invited-meeting", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data: invitations, error: invitationError } = await (
        supabase.from("recurring_meeting_participants" as any) as any
      )
        .select("recurring_meeting_id")
        .eq("user_id", user!.id)
        .limit(1);
      if (invitationError) throw invitationError;
      if (invitations?.length) return true;
      const { data: assigned, error: assignedError } = await (
        supabase.from("recurring_meetings" as any) as any
      )
        .select("id")
        .eq("assignee_id", user!.id)
        .limit(1);
      if (assignedError) throw assignedError;
      return Boolean(assigned?.length);
    },
  });
}
