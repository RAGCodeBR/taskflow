import type { QueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Task } from "@/hooks/use-data";
import { enqueueOfflineOperation, isOffline } from "@/lib/offline-sync";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { persistTaskEdit } from "@/lib/task-edit";

type TaskPatch = Partial<Task>;

function updateLocalTask(queryClient: QueryClient, taskId: string, patch: TaskPatch) {
  queryClient.setQueriesData<Task[]>({ queryKey: ["tasks"] }, (current) =>
    Array.isArray(current) ? current.map((item) => (item.id === taskId ? ({ ...item, ...patch } as Task) : item)) : current,
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
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    if (!session?.access_token || session.user.id !== userId) {
      throw new Error("Sua sessão expirou. Entre novamente para salvar a tarefa.");
    }
    const client = createClient<Database>(
      import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY,
      { auth: { persistSession: false, autoRefreshToken: false }, global: { headers: { Authorization: `Bearer ${session.access_token}` } } },
    );
    await persistTaskEdit(client, task.id, patch, queryClient);
    return { queued: false };
  }

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
  updateLocalTask(queryClient, task.id, patch);
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
  const wasOffline = isOffline();
  const patch: TaskPatch = {
    deleted_at: new Date().toISOString(),
    deleted_by: userId,
  };
  queryClient.setQueryData<Task[]>(["tasks"], (current = []) => current.filter((item) => item.id !== task.id));
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
  return { queued: wasOffline };
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
