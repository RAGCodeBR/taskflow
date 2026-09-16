import { createStore, del, get, set } from "idb-keyval";

export type OfflineEntity =
  | "task"
  | "task_order"
  | "record"
  | "subtask"
  | "client"
  | "comment"
  | "attachment"
  | "tag"
  | "column"
  | "obligation"
  | "mural"
  | "reaction";

export type OfflineAction = "create" | "update" | "delete";

export type OfflineOperation = {
  id: string;
  userId: string;
  entity: OfflineEntity;
  action: OfflineAction;
  entityId: string;
  payload: Record<string, unknown>;
  /** Valores conhecidos dos campos alterados; permitem mesclar edições independentes. */
  baseValues?: Record<string, unknown>;
  /** Versão conhecida antes da edição; base para detectar conflito no servidor. */
  baseUpdatedAt?: string | null;
  createdAt: string;
  attempts: number;
};

export type OfflineConflict = {
  id: string;
  operationId: string;
  userId: string;
  entity: OfflineEntity;
  entityId: string;
  field: string;
  serverValue: unknown;
  localValue: unknown;
  serverUpdatedAt?: string | null;
  createdAt: string;
};

const store = createStore("taskflow-offline", "sync");
const operationsKey = (userId: string) => `operations:${userId}`;
const conflictsKey = (userId: string) => `conflicts:${userId}`;
const localWriteLocks = new Map<string, Promise<void>>();

function makeId() {
  return crypto.randomUUID();
}

async function withLocalWriteLock<T>(userId: string, callback: () => Promise<T>): Promise<T> {
  const previous = localWriteLocks.get(userId) ?? Promise.resolve();
  let release: () => void = () => undefined;
  const current = new Promise<void>((resolve) => {
    release = resolve;
  });
  const tail = previous.then(() => current);
  localWriteLocks.set(userId, tail);

  await previous;
  try {
    return await callback();
  } finally {
    release();
    if (localWriteLocks.get(userId) === tail) localWriteLocks.delete(userId);
  }
}

async function withOfflineWriteLock<T>(userId: string, callback: () => Promise<T>): Promise<T> {
  if (typeof navigator !== "undefined" && navigator.locks) {
    return navigator.locks.request(`taskflow-offline-queue:${userId}`, callback);
  }
  return withLocalWriteLock(userId, callback);
}

async function mutateOfflineOperations(
  userId: string,
  mutate: (current: OfflineOperation[]) => OfflineOperation[],
) {
  return withOfflineWriteLock(userId, async () => {
    const key = operationsKey(userId);
    const current = (await get<OfflineOperation[]>(key, store)) ?? [];
    const next = mutate(current);
    await set(key, next, store);
    return next;
  });
}

function notifyQueueChanged(userId: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("taskflow:offline-queue-changed", { detail: { userId } }));
}

export async function listOfflineOperations(userId: string) {
  return (await get<OfflineOperation[]>(operationsKey(userId), store)) ?? [];
}

export async function enqueueOfflineOperation(
  input: Omit<OfflineOperation, "id" | "createdAt" | "attempts">,
) {
  const operation: OfflineOperation = {
    ...input,
    id: makeId(),
    createdAt: new Date().toISOString(),
    attempts: 0,
  };
  await mutateOfflineOperations(operation.userId, (current) => [...current, operation]);
  notifyQueueChanged(operation.userId);
  return operation;
}

export async function replaceOfflineOperation(operation: OfflineOperation) {
  await mutateOfflineOperations(
    operation.userId,
    (current) => current.map((item) => (item.id === operation.id ? operation : item)),
  );
}

export async function removeOfflineOperation(userId: string, operationId: string) {
  await mutateOfflineOperations(
    userId,
    (current) => current.filter((item) => item.id !== operationId),
  );
}

export async function listOfflineConflicts(userId: string) {
  return (await get<OfflineConflict[]>(conflictsKey(userId), store)) ?? [];
}

export async function addOfflineConflict(conflict: Omit<OfflineConflict, "id" | "createdAt">) {
  const item: OfflineConflict = {
    ...conflict,
    id: makeId(),
    createdAt: new Date().toISOString(),
  };
  const current = await listOfflineConflicts(item.userId);
  await set(conflictsKey(item.userId), [...current, item], store);
  return item;
}

export async function removeOfflineConflict(userId: string, conflictId: string) {
  const current = await listOfflineConflicts(userId);
  await set(
    conflictsKey(userId),
    current.filter((item) => item.id !== conflictId),
    store,
  );
}

/** Remove somente os dados locais da pessoa que saiu da conta. */
export async function clearOfflineSyncData(userId: string) {
  await Promise.all([del(operationsKey(userId), store), del(conflictsKey(userId), store)]);
}

export function isOffline() {
  return typeof navigator !== "undefined" && !navigator.onLine;
}

/**
 * `navigator.onLine` indica apenas se o navegador enxerga uma interface de rede.
 * Wi-Fi sem internet, DevTools Offline e a transição de reconexão podem produzir
 * uma falha real de `fetch` enquanto esse sinal ainda está `true`.
 */
export function isNetworkFailure(error: unknown) {
  const message =
    error instanceof Error
      ? `${error.name}: ${error.message}`
      : typeof error === "object" && error && "message" in error
        ? String((error as { message?: unknown }).message)
        : String(error ?? "");

  return /failed to fetch|fetch failed|networkerror|network request failed|load failed|err_internet_disconnected|connection.*(closed|reset)|offline/i.test(
    message,
  );
}
