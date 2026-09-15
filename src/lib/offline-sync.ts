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

function makeId() {
  return crypto.randomUUID();
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
  const current = await listOfflineOperations(operation.userId);
  await set(operationsKey(operation.userId), [...current, operation], store);
  return operation;
}

export async function replaceOfflineOperation(operation: OfflineOperation) {
  const current = await listOfflineOperations(operation.userId);
  await set(
    operationsKey(operation.userId),
    current.map((item) => (item.id === operation.id ? operation : item)),
    store,
  );
}

export async function removeOfflineOperation(userId: string, operationId: string) {
  const current = await listOfflineOperations(userId);
  await set(
    operationsKey(userId),
    current.filter((item) => item.id !== operationId),
    store,
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
