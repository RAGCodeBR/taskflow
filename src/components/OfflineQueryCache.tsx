import { useEffect, useRef, useState, type ReactNode } from "react";
import type { QueryClient } from "@tanstack/react-query";
import {
  persistQueryClientRestore,
  persistQueryClientSubscribe,
} from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { del, get, set } from "idb-keyval";
import { useAuth } from "@/hooks/use-auth";
import { clearOfflineSyncData } from "@/lib/offline-sync";

const CACHE_VERSION = "offline-cache-v1";
const CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

// Agenda e integrações Google deliberadamente ficam fora da primeira etapa offline.
const OFFLINE_QUERY_ROOTS = new Set([
  "tasks",
  "columns",
  "clients",
  "related-clients",
  "profiles",
  "assignable-profiles",
  "user_roles",
  "task_collaborators",
  "task_tags",
  "task_tag_links",
  "subtasks",
  "task_statuses",
  "user_column_order",
  "user_task_order",
  "board_preferences",
  "task-conversation-rooms",
  "task-conversation-messages",
  "task-conversation-reads",
  "obligations",
  "obligation-occurrences",
  "mural_posts",
  "mural_post_attachments",
  "mural_post_reactions",
  "service_requests",
  "service_request_messages",
  "service_request_activity",
  "service_request_participants",
  "service_request_assignees",
  "service_request_attachments",
]);

function storageKey(userId: string) {
  return `taskflow-query-cache:${CACHE_VERSION}:${userId}`;
}

function shouldPersistQuery(query: { queryKey: readonly unknown[]; state: { status: string } }) {
  return (
    query.state.status === "success" &&
    typeof query.queryKey[0] === "string" &&
    OFFLINE_QUERY_ROOTS.has(query.queryKey[0])
  );
}

type Props = {
  queryClient: QueryClient;
  children: ReactNode;
};

/**
 * Persiste dados já vistos em IndexedDB, separados por usuário. Não envia
 * alterações nem toca no Supabase: a fila de sincronização é uma etapa própria.
 */
export function OfflineQueryCache({ queryClient, children }: Props) {
  const { user, loading } = useAuth();
  const [restoredFor, setRestoredFor] = useState<string | null>(null);
  const previousKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const userId = user?.id;
    if (!userId) {
      queryClient.clear();
      const previousKey = previousKeyRef.current;
      const previousUserId = previousKey?.split(":").at(-1);
      previousKeyRef.current = null;
      setRestoredFor(null);
      if (previousKey) void del(previousKey);
      if (previousUserId) void clearOfflineSyncData(previousUserId);
      return;
    }

    let active = true;
    let unsubscribe: (() => void) | undefined;
    const key = storageKey(userId);
    previousKeyRef.current = key;
    setRestoredFor(null);

    const persister = createAsyncStoragePersister({
      key,
      throttleTime: 1_000,
      storage: {
        getItem: (itemKey) => get<string>(itemKey),
        setItem: (itemKey, value) => set(itemKey, value),
        removeItem: (itemKey) => del(itemKey),
      },
    });

    void persistQueryClientRestore({
      queryClient,
      persister,
      buster: CACHE_VERSION,
      maxAge: CACHE_MAX_AGE,
    })
      .catch(() => {
        // A falha do cache local nunca bloqueia o uso online do sistema.
      })
      .finally(() => {
        if (!active) return;
        unsubscribe = persistQueryClientSubscribe({
          queryClient,
          persister,
          buster: CACHE_VERSION,
          dehydrateOptions: { shouldDehydrateQuery },
        });
        setRestoredFor(userId);
      });

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [queryClient, user?.id]);

  if (loading || (!!user && restoredFor !== user.id)) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-6 text-center text-sm text-muted-foreground">
        Preparando dados locais…
      </div>
    );
  }

  return <>{children}</>;
}
