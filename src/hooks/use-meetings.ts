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
  /** Dias de antecedência do aviso aos participantes. */
  reminder_days_before: number;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface RecurringMeetingDepartment {
  id: string;
  workspace_id: string;
  name: string;
  description: string | null;
  color: string;
  position: number;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
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

export interface DepartmentMember {
  department_id: string;
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
        { event: "*", schema: "public", table: "recurring_meeting_departments" },
        () => void queryClient.invalidateQueries({ queryKey: ["recurringMeeting-departments"] }),
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
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [activeWorkspace?.id, queryClient]);
}

export function useRecurringMeetingDepartments() {
  const { user, activeWorkspace } = useAuth();
  return useQuery({
    queryKey: ["recurringMeeting-departments", activeWorkspace?.id],
    enabled: !!user && !!activeWorkspace?.id,
    queryFn: async () => {
      const { data, error } = await (supabase.from("recurring_meeting_departments" as any) as any)
        .select("*")
        .eq("is_active", true)
        .order("position")
        .order("name");
      if (error) throw error;
      return (data ?? []) as RecurringMeetingDepartment[];
    },
  });
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

/** Itens das pautas já copiadas para as reuniões (últimos 90 dias em diante). */
export function useRecurringMeetingAgendaItems() {
  const { user, activeWorkspace } = useAuth();
  return useQuery({
    queryKey: ["recurringMeeting-agenda-items", activeWorkspace?.id],
    enabled: !!user && !!activeWorkspace?.id,
    queryFn: async () => {
      const from = new Date();
      from.setDate(from.getDate() - 90);
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

export function useRecurringMeetingDepartmentMembers() {
  const { user, activeWorkspace } = useAuth();
  return useQuery({
    queryKey: ["recurringMeeting-department-members", activeWorkspace?.id],
    enabled: !!user && !!activeWorkspace?.id,
    queryFn: async () => {
      const { data, error } = await (
        supabase.from("recurring_meeting_department_members" as any) as any
      ).select("department_id, user_id");
      if (error) throw error;
      return (data ?? []) as DepartmentMember[];
    },
  });
}
