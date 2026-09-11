import { useEffect, useMemo, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useProfiles, useTaskCollaborators } from "@/hooks/use-data";
import { activityToast } from "@/lib/activity-toast";
import { isConversationRoom, unreadMessageCount } from "@/lib/task-conversations";

type RoomTask = {
  id: string;
  title: string;
  completed_at: string | null;
  status: string | null;
  deleted_at: string | null;
  assignee_id: string | null;
  created_by: string | null;
  client_id: string | null;
};
type Message = {
  id: string;
  task_id: string;
  author_id: string | null;
  body: string;
  created_at: string;
};
type Read = { task_id: string; last_read_at: string };

const roomsKey = ["task-conversation-rooms"] as const;
const messagesKey = ["task-conversation-messages"] as const;
const readsKey = (userId?: string) => ["task-conversation-reads", userId] as const;

/**
 * As "salas" da tela de Conversas: tarefas que a pessoa pode ver (a RLS de
 * `comments` recorta por ambiente/participação — e, para admin, deixa ver também
 * as conversas do próprio ambiente em que ele não participa), que não estão
 * concluídas e têm ao menos uma mensagem. Traz mensagens, ponteiro de leitura e
 * o conjunto `myRoomIds` — as salas em que a pessoa participa de fato
 * (responsável, criador ou colaborador), que é o que separa "Minhas conversas"
 * de "Outras conversas".
 */
export function useTaskConversations() {
  const { user } = useAuth();
  const { data: collaborations = [] } = useTaskCollaborators();

  const messages = useQuery({
    queryKey: messagesKey,
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await (supabase.from("comments") as any)
        .select("id, task_id, author_id, body, created_at")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Message[];
    },
  });

  const taskIds = useMemo(
    () => Array.from(new Set((messages.data ?? []).map((m) => m.task_id))),
    [messages.data],
  );

  const rooms = useQuery({
    queryKey: [...roomsKey, taskIds],
    enabled: !!user?.id && taskIds.length > 0,
    queryFn: async () => {
      const { data, error } = await (supabase.from("tasks") as any)
        .select("id, title, completed_at, status, deleted_at, assignee_id, created_by, client_id")
        .in("id", taskIds);
      if (error) throw error;
      return (data ?? []) as RoomTask[];
    },
  });

  const reads = useQuery({
    queryKey: readsKey(user?.id),
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await (supabase.from("task_conversation_reads") as any)
        .select("task_id, last_read_at")
        .eq("user_id", user!.id);
      if (error) throw error;
      return (data ?? []) as Read[];
    },
  });

  const messagesByTask = useMemo(() => {
    const map = new Map<string, Message[]>();
    (messages.data ?? []).forEach((m) => {
      const list = map.get(m.task_id) ?? [];
      list.push(m);
      map.set(m.task_id, list);
    });
    return map;
  }, [messages.data]);

  const lastReadByTask = useMemo(() => {
    const map = new Map<string, string>();
    (reads.data ?? []).forEach((r) => map.set(r.task_id, r.last_read_at));
    return map;
  }, [reads.data]);

  const roomTasks = useMemo(
    () =>
      (rooms.data ?? []).filter((task) => isConversationRoom(task, messagesByTask.has(task.id))),
    [rooms.data, messagesByTask],
  );

  // Salas em que a pessoa participa de fato — o mesmo vínculo que a RLS usa em
  // can_access_task_conversation (responsável, criador, colaborador).
  const myRoomIds = useMemo(() => {
    const ids = new Set<string>();
    if (!user?.id) return ids;
    const collabTasks = new Set(
      collaborations.filter((c) => c.collaborator_id === user.id).map((c) => c.task_id),
    );
    roomTasks.forEach((task) => {
      if (task.assignee_id === user.id || task.created_by === user.id || collabTasks.has(task.id)) {
        ids.add(task.id);
      }
    });
    return ids;
  }, [roomTasks, collaborations, user?.id]);

  return {
    roomTasks,
    myRoomIds,
    messagesByTask,
    lastReadByTask,
    allMessages: messages.data ?? [],
    isLoading: messages.isLoading || rooms.isLoading,
  };
}

/** Marca a conversa como lida e força o badge a recalcular na hora. */
export function useMarkConversationRead() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return async (taskId: string) => {
    if (!user?.id) return;
    await (supabase.from("task_conversation_reads") as any).upsert(
      { user_id: user.id, task_id: taskId, last_read_at: new Date().toISOString() },
      { onConflict: "user_id,task_id" },
    );
    await qc.invalidateQueries({ queryKey: readsKey(user.id) });
  };
}

/** Número de mensagens de conversa não lidas para o badge do menu. */
export function useTaskConversationsUnread() {
  const { user } = useAuth();
  const { myRoomIds, allMessages, lastReadByTask } = useTaskConversations();
  return useMemo(() => {
    if (!user?.id) return 0;
    return unreadMessageCount(allMessages, Array.from(myRoomIds), user.id, lastReadByTask);
  }, [user?.id, myRoomIds, allMessages, lastReadByTask]);
}

/**
 * Atividade de conversa ao vivo em qualquer tela: mantém o cache fresco e mostra
 * um toast discreto quando OUTRA pessoa manda mensagem numa tarefa que a pessoa
 * acompanha. Só para as salas próprias — nunca para as próprias mensagens, nem
 * para as conversas que o admin apenas fiscaliza.
 */
export function useTaskConversationRealtime() {
  const { user } = useAuth();
  const { data: profiles = [] } = useProfiles();
  const { myRoomIds } = useTaskConversations();
  const qc = useQueryClient();
  const userIdRef = useRef(user?.id);
  userIdRef.current = user?.id;
  const myRoomIdsRef = useRef(myRoomIds);
  myRoomIdsRef.current = myRoomIds;

  useEffect(() => {
    if (!user?.id) return;

    const nameOf = (id: string | null | undefined) => {
      const p = profiles.find((item) => item.id === id);
      return p?.full_name || p?.email || "Alguém";
    };
    const titleOf = (taskId: string) => {
      const rooms = (qc.getQueryData([...roomsKey, undefined]) ?? []) as RoomTask[];
      const fromCache = (qc.getQueriesData({ queryKey: roomsKey })[0]?.[1] ?? []) as RoomTask[];
      const list = rooms.length ? rooms : fromCache;
      return list.find((t) => t.id === taskId)?.title || "uma tarefa";
    };

    const channel = supabase
      .channel(`task-conversations-global-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comments" },
        (payload: any) => {
          void qc.invalidateQueries({ queryKey: messagesKey });
          if (payload.eventType !== "INSERT") return;
          const actor = payload.new?.author_id;
          if (!actor || actor === userIdRef.current) return;
          if (!myRoomIdsRef.current.has(payload.new.task_id)) return;
          activityToast(`${nameOf(actor)} comentou em "${titleOf(payload.new.task_id)}"`);
        },
      )
      .subscribe((status: string, err?: Error) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || err) {
          console.warn("[conversas realtime] canal não conectou:", status, err);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc, user?.id, profiles]);
}
