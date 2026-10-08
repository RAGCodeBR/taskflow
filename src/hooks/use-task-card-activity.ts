import { useCallback, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { enqueueOfflineOperation, isOffline, listOfflineOperations } from "@/lib/offline-sync";
import {
  mergeCardOpen,
  overlayPersonalPins,
  type TaskCardOpen,
  type TaskPersonalPin,
} from "@/lib/task-card-activity";

export function usePersonalTaskPins() {
  const { user, isClient, activeWorkspace } = useAuth();
  const qc = useQueryClient();
  const key = ["task_personal_pins", user?.id ?? null, activeWorkspace?.id ?? null];
  const query = useQuery({
    queryKey: key,
    enabled: !!user && !isClient,
    networkMode: "always",
    queryFn: async () => {
      if (!user) return [];
      const cached = qc.getQueryData<TaskPersonalPin[]>(key);
      let rows = cached ?? [];
      if (!isOffline()) {
        const { data, error } = await supabase
          .from("task_personal_pins" as never)
          .select("*")
          .eq("user_id", user.id)
          .eq("is_pinned", true);
        if (error && !cached) throw error;
        if (!error) rows = (data ?? []) as unknown as TaskPersonalPin[];
      }
      return overlayPersonalPins(rows, await listOfflineOperations(user.id), user.id);
    },
  });
  const setPinned = async (taskId: string, pinned: boolean) => {
    if (!user || isClient) throw new Error("Entre no sistema para fixar uma tarefa.");
    const changedAt = new Date().toISOString();
    await enqueueOfflineOperation({
      userId: user.id,
      entity: "task_pin",
      action: "update",
      entityId: taskId,
      payload: { pinned, changed_at: changedAt },
    });
    await qc.cancelQueries({ queryKey: ["task_personal_pins", user.id] });
    qc.setQueriesData<TaskPersonalPin[]>(
      { queryKey: ["task_personal_pins", user.id] },
      (current = []) => [
        ...current.filter((pin) => pin.task_id !== taskId),
        { task_id: taskId, user_id: user.id, is_pinned: pinned, changed_at: changedAt },
      ],
    );
  };
  return { ...query, pins: query.data ?? [], setPinned, canPin: !!user && !isClient };
}

export function useTaskCardOpens(taskId: string, enabled = true) {
  const { user, isClient } = useAuth();
  const qc = useQueryClient();
  const key = ["task_card_opens", user?.id ?? null, taskId];
  return useQuery({
    queryKey: key,
    enabled: enabled && !!taskId && !!user && !isClient,
    networkMode: "always",
    staleTime: 0,
    refetchInterval: enabled && !isOffline() ? 30_000 : false,
    queryFn: async () => {
      if (!user) return [];
      const cached = qc.getQueryData<TaskCardOpen[]>(key);
      let rows = cached ?? [];
      if (!isOffline()) {
        const { data, error } = await supabase
          .from("task_card_opens" as never)
          .select("*")
          .eq("task_id", taskId);
        if (error && !cached) throw error;
        if (!error) rows = (data ?? []) as unknown as TaskCardOpen[];
      }
      for (const operation of await listOfflineOperations(user.id)) {
        if (operation.entity === "task_open" && operation.entityId === taskId)
          rows = mergeCardOpen(rows, taskId, user.id, String(operation.payload.opened_at));
      }
      return rows;
    },
  });
}

/** Only an intentional opening of an existing task counts, not rendering its card in a board. */
export function useRecordTaskCardOpen(open: boolean, taskId?: string | null) {
  const { user, isClient } = useAuth();
  const qc = useQueryClient();
  const recorded = useRef<string | null>(null);
  const record = useCallback(
    async (id: string, userId: string) => {
      const openedAt = new Date().toISOString();
      await enqueueOfflineOperation({
        userId,
        entity: "task_open",
        action: "create",
        entityId: id,
        payload: { opened_at: openedAt },
      });
      const key = ["task_card_opens", userId, id];
      qc.setQueryData<TaskCardOpen[]>(key, (rows = []) =>
        mergeCardOpen(rows, id, userId, openedAt),
      );
    },
    [qc],
  );
  useEffect(() => {
    if (!open) {
      recorded.current = null;
      return;
    }
    if (!taskId || !user || isClient) return;
    const marker = `${user.id}:${taskId}`;
    if (recorded.current === marker) return;
    recorded.current = marker;
    void record(taskId, user.id).catch((error) => {
      recorded.current = null;
      console.warn("[task opening] Não foi possível guardar a abertura do card.", error);
    });
  }, [open, taskId, user, isClient, record]);
}
