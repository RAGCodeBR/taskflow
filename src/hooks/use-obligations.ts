/* eslint-disable @typescript-eslint/no-explicit-any -- Supabase types are regenerated after the migration is applied. */
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export type ObligationFrequency = "daily" | "weekly" | "monthly";
export type ObligationMonthRule = "specific_days" | "last_day" | "last_business_day";
export type ObligationOccurrenceStatus = "scheduled" | "open" | "completed" | "skipped";

export interface Obligation {
  id: string;
  workspace_id: string;
  title: string;
  description: string | null;
  client_id: string | null;
  assignee_id: string | null;
  frequency: ObligationFrequency;
  interval_count: number;
  days_of_week: number[];
  days_of_month: number[];
  month_rule: ObligationMonthRule;
  business_days_only: boolean;
  start_date: string;
  end_date: string | null;
  create_before_days: number;
  due_time: string | null;
  priority: "low" | "medium" | "high" | "urgent";
  column_id: string | null;
  status_id: string | null;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ObligationOccurrence {
  id: string;
  workspace_id: string;
  obligation_id: string;
  due_date: string;
  due_time: string | null;
  status: ObligationOccurrenceStatus;
  task_id: string | null;
  completed_at: string | null;
  completed_by: string | null;
  created_at: string;
  updated_at: string;
}

function useObligationRealtime() {
  const queryClient = useQueryClient();
  const { activeWorkspace } = useAuth();

  useEffect(() => {
    if (!activeWorkspace?.id) return;
    const channel = supabase
      .channel(`obligations-${activeWorkspace.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "obligations" },
        () => void queryClient.invalidateQueries({ queryKey: ["obligations"] }),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "obligation_occurrences" },
        () => {
          void queryClient.invalidateQueries({ queryKey: ["obligation-occurrences"] });
          void queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [activeWorkspace?.id, queryClient]);
}

export function useObligations() {
  const { user, activeWorkspace } = useAuth();
  useObligationRealtime();
  return useQuery({
    queryKey: ["obligations", activeWorkspace?.id],
    enabled: !!user && !!activeWorkspace?.id,
    queryFn: async () => {
      const { data, error } = await (supabase.from("obligations" as any) as any)
        .select("*")
        .order("title", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Obligation[];
    },
  });
}

export function useObligationOccurrences() {
  const { user, activeWorkspace } = useAuth();
  return useQuery({
    queryKey: ["obligation-occurrences", activeWorkspace?.id],
    enabled: !!user && !!activeWorkspace?.id,
    queryFn: async () => {
      const today = new Date();
      const from = new Date(today);
      from.setFullYear(from.getFullYear() - 1);
      const until = new Date(today);
      until.setFullYear(until.getFullYear() + 2);
      const { data, error } = await (supabase.from("obligation_occurrences" as any) as any)
        .select("*")
        .gte("due_date", from.toISOString().slice(0, 10))
        .lte("due_date", until.toISOString().slice(0, 10))
        .order("due_date", { ascending: true });
      if (error) throw error;
      return (data ?? []) as ObligationOccurrence[];
    },
  });
}
