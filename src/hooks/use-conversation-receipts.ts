import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProfiles } from "@/hooks/use-data";

export interface ConversationParticipant {
  id: string;
  name: string;
  avatarUrl: string | null;
  /** Última vez que essa pessoa abriu a conversa — null se nunca abriu. */
  lastReadAt: string | null;
}

/**
 * Quem participa da conversa de uma tarefa (responsável, criador,
 * colaboradores) e quando cada um leu por último — a base do "visto por" em
 * cada mensagem. Depende da RLS de `task_conversation_reads` enxergar a linha
 * dos outros participantes, não só a própria (migration
 * 20260914200000_conversation_read_receipts_rls.sql).
 */
export function useConversationParticipants(taskId: string) {
  const { data: profiles = [] } = useProfiles();

  const task = useQuery({
    queryKey: ["conversation_receipts_task", taskId],
    enabled: !!taskId,
    queryFn: async () => {
      const { data, error } = await (supabase.from("tasks") as any)
        .select("id, assignee_id, created_by")
        .eq("id", taskId)
        .single();
      if (error) throw error;
      return data as { id: string; assignee_id: string | null; created_by: string | null };
    },
  });

  const collaborators = useQuery({
    queryKey: ["conversation_receipts_collaborators", taskId],
    enabled: !!taskId,
    queryFn: async () => {
      const { data, error } = await (supabase.from("task_collaborators") as any)
        .select("collaborator_id")
        .eq("task_id", taskId);
      if (error) throw error;
      return (data ?? []) as { collaborator_id: string }[];
    },
  });

  const reads = useQuery({
    queryKey: ["conversation_receipts_reads", taskId],
    enabled: !!taskId,
    queryFn: async () => {
      const { data, error } = await (supabase.from("task_conversation_reads") as any)
        .select("user_id, last_read_at")
        .eq("task_id", taskId);
      if (error) throw error;
      return (data ?? []) as { user_id: string; last_read_at: string }[];
    },
  });

  const participants = useMemo<ConversationParticipant[]>(() => {
    if (!task.data) return [];
    const ids = new Set<string>();
    if (task.data.assignee_id) ids.add(task.data.assignee_id);
    if (task.data.created_by) ids.add(task.data.created_by);
    (collaborators.data ?? []).forEach((row) => ids.add(row.collaborator_id));
    const lastReadByUser = new Map(
      (reads.data ?? []).map((row) => [row.user_id, row.last_read_at]),
    );
    return Array.from(ids).map((id) => {
      const profile = profiles.find((item) => item.id === id);
      return {
        id,
        name: profile?.full_name || profile?.email || "Alguém",
        avatarUrl: profile?.avatar_url ?? null,
        lastReadAt: lastReadByUser.get(id) ?? null,
      };
    });
  }, [task.data, collaborators.data, reads.data, profiles]);

  return {
    participants,
    isLoading: task.isLoading || collaborators.isLoading || reads.isLoading,
  };
}

/**
 * Horário (não "há Xh") da última vez que a pessoa abriu a conversa — pro
 * rodapé fixo de presença. Hoje mostra hora:minuto; se não foi hoje, mostra
 * também a data.
 */
export function formatSeenAt(lastReadAt: string | null, now: Date = new Date()): string {
  if (!lastReadAt) return "Ainda não entrou";
  const date = new Date(lastReadAt);
  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();
  const time = date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  if (sameDay) return time;
  const day = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  return `${day} às ${time}`;
}

/** Quem, entre os participantes (menos o autor), já viu esta mensagem. */
export function whoSawMessage(
  participants: ConversationParticipant[],
  authorId: string | null,
  messageCreatedAt: string,
) {
  const others = participants.filter((p) => p.id !== authorId);
  const seen = others
    .filter((p) => p.lastReadAt && p.lastReadAt >= messageCreatedAt)
    .sort((a, b) => (a.lastReadAt as string).localeCompare(b.lastReadAt as string));
  const notSeen = others.filter((p) => !p.lastReadAt || p.lastReadAt < messageCreatedAt);
  return { seen, notSeen, totalRecipients: others.length };
}
