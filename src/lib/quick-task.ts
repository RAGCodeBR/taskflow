import type { QueryClient } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import type { Task } from "@/hooks/use-data";
import { addCachedTask } from "./query-cache";
import { isOffline } from "./offline-sync";
import { createTaskWithOfflineSupport } from "./offline-task-mutations";

export type QuickTaskInput = {
  id: string;
  title: string;
  clientId: string | null;
  assigneeId: string | null;
  /** `YYYY-MM-DD` */
  dueDate: string | null;
  columnId: string | null;
  statusId: string | null;
  workspaceId: string | null;
  userId: string;
  now: string;
};

/** Mesmo horário padrão de prazo do formulário completo (TaskDialog). */
const DEFAULT_DEADLINE_TIME = "12:00";

/** Tarefa mínima criada pelo "+" do celular. */
export function buildQuickTask(input: QuickTaskInput): Task {
  const title = input.title.trim();
  if (!title) throw new Error("Informe o título da tarefa.");
  // Mesma regra do formulário completo: toda tarefa nasce com prazo.
  if (!input.dueDate) throw new Error("Defina um prazo antes de criar a tarefa.");
  return {
    id: input.id,
    title,
    description: null,
    status: "todo",
    status_id: input.statusId,
    priority: "medium",
    due_date: new Date(`${input.dueDate}T${DEFAULT_DEADLINE_TIME}:00`).toISOString(),
    due_time: null,
    assignee_id: input.assigneeId,
    assigned_by: null,
    assigned_at: null,
    client_id: input.clientId,
    column_id: input.columnId,
    position: 0,
    color: null,
    completed_at: null,
    created_by: input.userId,
    tag_id: null,
    objective_id: null,
    deleted_at: null,
    deleted_by: null,
    archived_at: null,
    archived_reason: null,
    created_at: input.now,
    updated_at: input.now,
    card_width: null,
    workspace_id: input.workspaceId,
    origin_workspace_id: input.workspaceId,
    is_draft: false,
  };
}

/**
 * Grava a tarefa rápida. Online usa a sessão atual (RLS como `authenticated`),
 * igual à criação rápida do calendário; sem rede, entra na fila offline.
 */
export async function createQuickTask(
  input: QuickTaskInput,
  queryClient: QueryClient,
): Promise<{ queued: boolean; task: Task }> {
  const task = buildQuickTask(input);
  if (isOffline()) {
    await createTaskWithOfflineSupport({ userId: input.userId, task, queryClient });
    return { queued: true, task };
  }
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.access_token || session.user.id !== input.userId) {
    throw new Error("Sua sessão expirou. Entre novamente para criar a tarefa.");
  }
  const url = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("A conexão com o Supabase não está configurada.");
  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${session.access_token}` } },
  });
  const { error } = await client.from("tasks").insert({
    id: task.id,
    title: task.title,
    due_date: task.due_date,
    workspace_id: task.workspace_id,
    created_by: input.userId,
    assignee_id: task.assignee_id,
    client_id: task.client_id,
    column_id: task.column_id,
    status: "todo",
    status_id: task.status_id,
    priority: "medium",
    is_draft: false,
  });
  if (error) throw error;
  addCachedTask(queryClient, task);
  await client
    .from("task_history")
    .insert({ task_id: task.id, user_id: input.userId, action: "created" });
  void queryClient.invalidateQueries({ queryKey: ["tasks"] });
  return { queued: false, task };
}
