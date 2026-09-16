import type { QueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Task } from "@/hooks/use-data";
import { enqueueOfflineOperation, isOffline } from "@/lib/offline-sync";

type TaskPatch = Partial<Task>;

function updateLocalTask(queryClient: QueryClient, taskId: string, patch: TaskPatch) {
  queryClient.setQueryData<Task[]>(["tasks"], (current = []) =>
    current.map((item) => (item.id === taskId ? ({ ...item, ...patch } as Task) : item)),
  );
}

/**
 * Persiste uma edição de tarefa ou a mantém na fila local quando não há rede.
 * `baseValues` é guardado para que a sincronização posterior possa unir campos
 * diferentes alterados em aparelhos distintos.
 */
export async function updateTaskWithOfflineSupport({
  userId,
  task,
  patch,
  queryClient,
  forceQueue = false,
}: {
  userId: string;
  task: Task;
  patch: TaskPatch;
  queryClient: QueryClient;
  forceQueue?: boolean;
}) {
  if (!forceQueue && !isOffline()) {
    const { error } = await supabase.from("tasks").update(patch).eq("id", task.id);
    if (error) throw error;
    return { queued: false };
  }

  updateLocalTask(queryClient, task.id, patch);
  const baseValues = Object.fromEntries(Object.keys(patch).map((key) => [key, task[key as keyof Task]]));
  await enqueueOfflineOperation({
    userId,
    entity: "task",
    action: "update",
    entityId: task.id,
    payload: { patch },
    baseUpdatedAt: task.updated_at ?? null,
    baseValues,
  });
  return { queued: true };
}

export async function deleteTaskWithOfflineSupport({
  userId,
  task,
  queryClient,
}: {
  userId: string;
  task: Task;
  queryClient: QueryClient;
}) {
  if (!isOffline()) {
    const { error } = await supabase.from("tasks").delete().eq("id", task.id);
    if (error) throw error;
    return { queued: false };
  }

  queryClient.setQueryData<Task[]>(["tasks"], (current = []) => current.filter((item) => item.id !== task.id));
  await enqueueOfflineOperation({
    userId,
    entity: "task",
    action: "delete",
    entityId: task.id,
    payload: { task },
    baseUpdatedAt: task.updated_at ?? null,
  });
  return { queued: true };
}

export async function createTaskWithOfflineSupport({
  userId,
  task,
  queryClient,
}: {
  userId: string;
  task: Task;
  queryClient: QueryClient;
}) {
  queryClient.setQueryData<Task[]>(["tasks"], (current = []) => [...current, task]);
  await enqueueOfflineOperation({
    userId,
    entity: "task",
    action: "create",
    entityId: task.id,
    payload: { task },
  });
}

export async function createSubtaskWithOfflineSupport({
  userId,
  subtask,
  queryClient,
}: {
  userId: string;
  subtask: Record<string, unknown>;
  queryClient: QueryClient;
}) {
  queryClient.setQueryData<Record<string, unknown>[]>(["subtasks"], (current = []) => [...current, subtask]);
  await enqueueOfflineOperation({
    userId,
    entity: "subtask",
    action: "create",
    entityId: String(subtask.id),
    payload: { subtask },
  });
}
