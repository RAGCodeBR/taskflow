import { del } from "idb-keyval";
import { clearOfflineSyncData } from "@/lib/offline-sync";

export const OFFLINE_QUERY_CACHE_VERSION = "offline-cache-v2";

export function offlineQueryCacheKey(userId: string) {
  return `taskflow-query-cache:${OFFLINE_QUERY_CACHE_VERSION}:${userId}`;
}

export function offlineTaskCacheKey(userId: string) {
  return `taskflow-offline-tasks-v1:${userId}`;
}

export function offlineAccessKey(userId: string) {
  return `taskflow-offline-access-v1:${userId}`;
}

/**
 * Limpa dados locais somente quando a pessoa solicita sair da conta.
 * Uma perda temporaria de sessao durante a reconexao nunca deve apagar a fila.
 */
export async function clearOfflineUserData(userId: string) {
  if (typeof localStorage !== "undefined") localStorage.removeItem(offlineAccessKey(userId));
  await Promise.all([
    del(offlineQueryCacheKey(userId)),
    del(offlineTaskCacheKey(userId)),
    clearOfflineSyncData(userId),
  ]);
}
