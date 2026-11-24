import { useEffect, useMemo, useRef } from "react";
import { useMutationState, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, set } from "idb-keyval";
import { offlineTaskCacheKey } from "@/lib/offline-user-storage";
import { subtasksQueryKey } from "@/lib/task-query-keys";
import { isNetworkFailure, isOffline, listOfflineOperations } from "@/lib/offline-sync";
import { overlayPendingSubtasks, overlayPendingTaskOperations } from "@/lib/offline-task-overlay";
import { fetchAllRows } from "@/lib/fetch-all-rows";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useTaskReadUpdates } from "@/hooks/use-task-read-updates";
import { useAuth } from "@/hooks/use-auth";

/**
 * Data access layer for the TaskFlow screens.
 *
 * Most pages should read data through these hooks instead of calling Supabase directly.
 * That keeps cache keys, filters and real-time invalidation in one place. When this clean
 * copy points to a new database, the table names must still match the migrations under
 * supabase/migrations.
 */
export interface Task {
  id: string;
  is_draft?: boolean;
  title: string;
  description: string | null;
  status: "todo" | "in_progress" | "review" | "done" | null;
  status_id: string | null;
  priority: "low" | "medium" | "high" | "urgent" | null;
  due_date: string | null;
  due_time: string | null;
  assignee_id: string | null;
  assigned_by: string | null;
  assigned_at: string | null;
  client_id: string | null;
  secondary_client_id?: string | null;
  additional_client_ids?: string[];
  column_id: string | null;
  position: number;
  color: string | null;
  completed_at: string | null;
  created_by: string | null;
  tag_id: string | null;
  objective_id: string | null;
  deleted_at: string | null;
  deleted_by: string | null;
  archived_at: string | null;
  archived_reason: "client_inactive" | "manual" | null;
  created_at: string;
  updated_at: string;
  card_width: number | null;
  conversation_closed_at?: string | null;
  /** Item de pauta que originou ou recebeu esta tarefa. */
  recurring_meeting_agenda_item_id?: string | null;
  recurring_meeting_occurrence_id?: string | null;
  recurring_meeting_agenda_template_id?: string | null;
  origin_workspace_id?: string | null;
  /** Ambiente dono da tarefa. Diverge do ativo quando ela chega por participação. */
  workspace_id?: string | null;
}
export interface TaskStatus {
  id: string;
  name: string;
  color: string;
  position: number;
  is_completed: boolean;
  is_active: boolean;
}
export interface TaskTag {
  id: string;
  name: string;
  color: string;
  position: number;
}
export interface TaskObjective {
  id: string;
  name: string;
  color: string;
  position: number;
}
export interface KanbanColumn {
  id: string;
  name: string;
  color: string | null;
  position: number;
  client_id: string | null;
}
export interface Client {
  id: string;
  workspace_id?: string | null;
  name: string;
  color: string | null;
  description: string | null;
  cnpj: string | null;
  legal_name: string | null;
  trade_name: string | null;
  state_registration: string | null;
  municipal_registration: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  responsible: string | null;
  avatar_path: string | null;
  is_active: boolean;
}
export interface ClientDepartment {
  id: string;
  client_id: string;
  name: string;
  description: string | null;
  position: number;
  created_at: string;
}
export interface ClientDepartmentEmployee {
  id: string;
  department_id: string;
  person_type: "individual" | "company";
  full_name: string;
  document: string | null;
  cbo: string | null;
  role: string | null;
  salary: number | null;
  salary_extrafolha: number | null;
  activities: string | null;
  avatar_path: string | null;
  created_at: string;
}
export interface ClientSystemAccess {
  id: string;
  client_id: string;
  title: string;
  login: string;
  password: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
export interface ClientBranch {
  id: string;
  client_id: string;
  name: string;
  cnpj: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  is_active?: boolean;
  /** Slugs dos ambientes da pessoa; só vem de list_task_assignees. */
  workspace_slugs?: string[];
}

export interface AgendaEvent {
  id: string;
  recurring_meeting_occurrence_id?: string | null;
  title: string;
  description: string | null;
  starts_at: string;
  ends_at: string;
  is_all_day: boolean;
  location: string | null;
  meeting_url: string | null;
  attendee_emails?: string[];
  create_google_meet?: boolean;
  auto_smart_notes?: boolean;
  auto_transcription?: boolean;
  color: string;
  created_by: string;
  updated_by: string | null;
  source: "taskflow" | "google";
  google_event_id: string | null;
  google_calendar_id?: string | null;
  sync_status: "not_configured" | "pending" | "synced" | "error";
  created_at: string;
  updated_at: string;
}

export interface AgendaCalendarSource {
  google_calendar_id: string;
  name: string;
  color: string;
  is_shared: boolean;
  is_visible: boolean;
}

export interface GoogleCalendarConnection {
  id: string;
  google_email: string;
  granted_scopes: string;
  connected_at: string;
  updated_at: string;
}

const googleMeetScopes = [
  "https://www.googleapis.com/auth/meetings.space.created",
  "https://www.googleapis.com/auth/meetings.space.settings",
];

export function hasGoogleMeetPermissions(connection: GoogleCalendarConnection | null | undefined) {
  if (!connection) return false;
  const granted = new Set((connection.granted_scopes ?? "").split(/\s+/));
  return googleMeetScopes.every((scope) => granted.has(scope));
}

export function hasGoogleMeetFilePermission(
  connection: GoogleCalendarConnection | null | undefined,
) {
  return Boolean(
    connection?.granted_scopes
      ?.split(/\s+/)
      .includes("https://www.googleapis.com/auth/drive.readonly"),
  );
}

export function useGoogleCalendarConnection() {
  return useQuery({
    queryKey: ["google_calendar_connection"],
    queryFn: async () => {
      const { data, error } = await (supabase.from("calendar_google_connections" as any) as any)
        .select("id, google_email, granted_scopes, connected_at, updated_at")
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as GoogleCalendarConnection | null;
    },
  });
}

export function useAgendaEvents(rangeStart?: string, rangeEnd?: string) {
  const qc = useQueryClient();
  const { user, loading: loadingAuth } = useAuth();

  useEffect(() => {
    if (!user) return;
    let refreshTimer: ReturnType<typeof setTimeout> | undefined;
    const channel = supabase
      .channel(`agenda-events-${Math.random().toString(36).slice(2)}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "calendar_events" }, () => {
        if (refreshTimer) clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => {
          void qc.invalidateQueries({ queryKey: ["agenda_events"] });
        }, 750);
      })
      .subscribe();
    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      void supabase.removeChannel(channel);
    };
  }, [qc, user?.id]);

  return useQuery({
    queryKey: ["agenda_events", rangeStart, rangeEnd],
    queryFn: async () => {
      // Read through the authenticated client so the active workspace RLS
      // policy is enforced. Google sync remains an explicit server action.
      let query = (supabase.from("calendar_events" as any) as any)
        .select("*")
        .is("deleted_at", null)
        .is("hidden_at", null)
        .order("starts_at");
      if (rangeStart) query = query.gte("starts_at", rangeStart);
      if (rangeEnd) query = query.lte("starts_at", rangeEnd);
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as AgendaEvent[];
    },
    enabled: !loadingAuth && !!user,
    refetchOnMount: "always",
  });
}

export function useAgendaCalendarSources() {
  const { user, loading: loadingAuth } = useAuth();
  return useQuery({
    queryKey: ["agenda_calendar_sources", user?.id],
    enabled: !loadingAuth && !!user,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("google-calendar-sync", {
        // Calendar filters have their own lightweight endpoint. Do not load
        // an event range just to render the filter list.
        body: { action: "list_sources" },
      });
      if (error) throw error;
      if (!data?.ok) throw new Error(data?.error ?? "Não foi possível carregar as agendas.");
      return (data.sources ?? []) as AgendaCalendarSource[];
    },
  });
}

export interface TaskCollaborator {
  task_id: string;
  collaborator_id: string;
  added_by: string | null;
  created_at: string;
}

export interface ClientInvoice {
  id: string;
  client_id: string;
  description: string;
  amount: number;
  due_date: string;
  status: "open" | "paid";
  paid_at: string | null;
  payment_method: "pix" | "boleto" | "link";
  payment_link: string | null;
  pix_key: string | null;
  boleto_file_name: string | null;
  boleto_storage_path: string | null;
  boleto_mime_type: string | null;
  invoice_file_name: string | null;
  invoice_storage_path: string | null;
  invoice_mime_type: string | null;
  created_at: string;
}

export function useClientInvoices() {
  return useQuery({
    queryKey: ["client_invoices"],
    queryFn: async () => {
      // The generated Supabase types are refreshed separately; this cast keeps the
      // new migration usable immediately in the application.
      const { data, error } = await (supabase.from("client_invoices") as any)
        .select("*")
        .order("due_date", { ascending: true });
      if (error) throw error;
      return (data ?? []) as ClientInvoice[];
    },
  });
}

export function useTasks(targetWorkspaceId?: string | null) {
  const { user, activeWorkspace } = useAuth();
  const qc = useQueryClient();
  const userId = user?.id;
  const activeWorkspaceId = activeWorkspace?.id ?? null;
  const workspaceId = targetWorkspaceId ?? activeWorkspaceId;
  const isAdminPreview = Boolean(
    targetWorkspaceId && activeWorkspaceId && targetWorkspaceId !== activeWorkspaceId,
  );
  const offlineKey = userId && activeWorkspaceId && workspaceId
    ? offlineTaskCacheKey(userId, activeWorkspaceId, workspaceId)
    : null;
  useTaskReadUpdates();
  const query = useQuery({
    // RLS resolves tasks from both the authenticated person and the active
    // workspace. Keep both in the cache key so an account/environment change
    // cannot briefly reuse another scope's task list.
    queryKey: ["tasks", userId ?? null, activeWorkspaceId, targetWorkspaceId ?? null],
    // Executa a função também no modo avião para que ela possa devolver o
    // espelho local, em vez de deixar a consulta pausada e o Kanban vazio.
    enabled: !!offlineKey,
    networkMode: "always",
    // Realtime can miss an event while the browser sleeps or reconnects.
    staleTime: 30_000,
    refetchInterval: () => isOffline() ? false : 60_000,
    refetchOnWindowFocus: "always",
    queryFn: async () => {
      if (!offlineKey || !userId || !workspaceId) return [] as Task[];
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        return (await get<Task[]>(offlineKey)) ??
          qc.getQueryData<Task[]>(["tasks", userId, activeWorkspaceId, targetWorkspaceId ?? null]) ?? [];
      }
      // Read through the current verified session. Without an explicit bearer
      // token, a stale browser auth state can make RLS return an empty task list.
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user.id !== userId) throw new Error("Aguarde a reconexão da sua sessão.");
      const url = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
      const publishableKey =
        import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
      const taskClient =
        session && url && publishableKey
          ? createClient<Database>(url, publishableKey, {
              auth: { persistSession: false, autoRefreshToken: false },
              global: { headers: { Authorization: `Bearer ${session.access_token}` } },
            })
          : supabase;
      // A visualização administrativa de outro ambiente não altera o ambiente
      // ativo. Ela usa uma RPC que só libera leitura para administradores
      // associados ao ambiente escolhido.
      // A API corta cada resposta em um lote (1000 linhas). Sem ler todas as
      // páginas, um ambiente com muitas tarefas perdia cards de forma
      // intermitente. O id no fim da ordenação impede empates entre páginas.
      const { data, error } = await fetchAllRows<Task>(
        (from, to) =>
          (isAdminPreview
            ? (taskClient.rpc as any)(
                "list_workspace_tasks_for_admin_preview",
                { target_workspace_id: workspaceId },
              )
            : taskClient.from("tasks").select("*").is("deleted_at", null)
          )
            .order("position", { ascending: true })
            .order("created_at", { ascending: false })
            .order("id", { ascending: true })
            .range(from, to),
        { rowKey: (task) => task.id },
      );
      if (error) {
        if (isNetworkFailure(error)) {
          const cached = await get<Task[]>(offlineKey);
          if (cached) return cached;
        }
        throw error;
      }
      const serverTasks = ((data ?? []) as Task[]).filter((task) => !task.archived_at);
      // A leitura remota pode terminar antes do sincronizador. Sobrepor a fila
      // evita que um card local suma durante essa pequena janela ou numa falha
      // temporaria de envio.
      const pendingOperations = await listOfflineOperations(userId);
      const tasks = overlayPendingTaskOperations(serverTasks, pendingOperations, workspaceId, !isAdminPreview);
      return tasks;
    },
  });
  // Também registra alterações otimistas feitas offline (criação, edição,
  // exclusão) antes que exista uma nova resposta do servidor.
  useEffect(() => {
    if (offlineKey && query.data) void set(offlineKey, query.data);
  }, [offlineKey, query.data]);
  return query;
}

/** Pending cards are local to the board/list. Reports, offline storage and
 * other consumers see confirmed records or writes saved in the offline queue. */
export function useBoardTasks(targetWorkspaceId?: string | null) {
  const query = useTasks(targetWorkspaceId);
  const { user, activeWorkspace } = useAuth();
  const userId = user?.id;
  const activeWorkspaceId = activeWorkspace?.id ?? null;
  const workspaceId = targetWorkspaceId ?? activeWorkspaceId;
  const isAdminPreview = workspaceId !== activeWorkspaceId;
  const pending = useMutationState({
    filters: { mutationKey: ["create-task", userId, activeWorkspaceId], status: "pending", exact: true },
    select: (mutation) => (mutation.state.variables as { preview: Task }).preview,
  });
  const visibleTasks = useMemo(() => {
    if (!pending.length) return query.data;
    const rows = query.data ?? [];
    const additions = pending.filter((task) => task.created_by === userId &&
      (task.workspace_id === workspaceId || (!isAdminPreview && task.origin_workspace_id === workspaceId)) &&
      !rows.some((row) => row.id === task.id));
    return additions.length ? [...rows, ...additions] : query.data;
  }, [query.data, pending, userId, workspaceId, isAdminPreview]);
  return { data: visibleTasks, pendingTaskIds: useMemo(() => new Set(pending.map((task) => task.id)), [pending]) };
}

export function useArchivedClientTasks(clientId: string, includeLegacyClientTasks = false) {
  return useQuery({
    queryKey: ["tasks", "archived", clientId, includeLegacyClientTasks],
    enabled: !!clientId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("client_id", clientId)
        .is("deleted_at", null)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return ((data ?? []) as Task[])
        .filter((task) => includeLegacyClientTasks || !!task.archived_at)
        .sort((a, b) => (b.archived_at ?? "").localeCompare(a.archived_at ?? ""));
    },
  });
}

export function useDeletedTasks() {
  return useQuery({
    queryKey: ["tasks", "deleted"],
    queryFn: async () => {
      // Trash page uses the opposite filter so records can be restored later.
      const { data, error } = await fetchAllRows<Task>(
        (from, to) =>
          (supabase.from("tasks") as any)
            .select("*")
            .not("deleted_at", "is", null)
            .order("deleted_at", { ascending: false })
            .order("id", { ascending: true })
            .range(from, to),
        { rowKey: (task) => task.id },
      );
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useColumns(targetWorkspaceId?: string | null) {
  const { activeWorkspace } = useAuth();
  const isAdminPreview = Boolean(
    targetWorkspaceId && activeWorkspace?.id && targetWorkspaceId !== activeWorkspace.id,
  );
  return useQuery({
    queryKey: ["columns", targetWorkspaceId ?? activeWorkspace?.id ?? null],
    queryFn: async () => {
      // Kanban columns are global unless client_id is filled for client-specific boards.
      const result = isAdminPreview
        ? await (supabase.rpc("list_workspace_columns_for_admin_preview", {
            target_workspace_id: targetWorkspaceId,
          }) as any)
        : await supabase.from("kanban_columns").select("*").order("position");
      const { data, error } = result;
      if (error) throw error;
      return (data ?? []) as KanbanColumn[];
    },
  });
}

export interface UserColumnOrder {
  column_id: string;
  position: number;
}
export function useUserColumnOrder() {
  const { user } = useAuth();
  const uid = user?.id;
  return useQuery({
    queryKey: ["user_column_order", uid],
    enabled: !!uid,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_column_order")
        .select("column_id, position")
        .eq("user_id", uid!);
      if (error) throw error;
      return (data ?? []) as UserColumnOrder[];
    },
  });
}

export interface UserTaskOrder {
  task_id: string;
  position: number;
}
export function useUserTaskOrder() {
  const { user } = useAuth();
  const uid = user?.id;
  return useQuery({
    queryKey: ["user_task_order", uid],
    enabled: !!uid,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_task_order")
        .select("task_id, position")
        .eq("user_id", uid!);
      if (error) throw error;
      return (data ?? []) as UserTaskOrder[];
    },
  });
}

/**
 * Nome e cor dos clientes de todos os ambientes a que a pessoa pertence.
 * Serve apenas para exibição: uma tarefa lançada para o outro ambiente aponta
 * para o cliente de lá, que useClients() — restrito ao ambiente ativo — não
 * alcança. Os seletores continuam usando useClients(), de propósito.
 */
export function useRelatedClients() {
  return useQuery({
    queryKey: ["related-clients"],
    queryFn: async () => {
      const { data, error } = await (supabase.rpc("list_related_client_names") as any);
      if (error) throw error;
      return (data ?? []) as Array<{ id: string; name: string; color: string | null }>;
    },
  });
}

export function useClients(targetWorkspaceId?: string | null) {
  const { activeWorkspace } = useAuth();
  const isAdminPreview = Boolean(
    targetWorkspaceId && activeWorkspace?.id && targetWorkspaceId !== activeWorkspace.id,
  );
  return useQuery({
    queryKey: ["clients", targetWorkspaceId ?? activeWorkspace?.id ?? null],
    queryFn: async () => {
      const result = isAdminPreview
        ? await (supabase.rpc("list_workspace_clients_for_admin_preview", {
            target_workspace_id: targetWorkspaceId,
          }) as any)
        : await supabase.from("clients").select("*").order("name");
      const { data, error } = result;
      if (error) throw error;
      return (data ?? []) as Client[];
    },
  });
}

export function useProfiles() {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await (supabase.from("profiles") as any).select(
        "id, full_name, avatar_url, is_active",
      );
      if (error) throw error;
      return [...((data ?? []) as Profile[])].sort((a, b) =>
        (a.full_name ?? "").localeCompare(b.full_name ?? "", "pt-BR", {
          sensitivity: "base",
        }),
      );
    },
  });
}

export interface UserRole {
  user_id: string;
  role: "admin" | "collaborator" | "client";
}

export function useUserRoles() {
  return useQuery({
    queryKey: ["user_roles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("user_id, role");
      if (error) throw error;
      return (data ?? []) as UserRole[];
    },
  });
}

export function useAssignableProfiles(targetWorkspaceId?: string | null) {
  const { user, activeWorkspace } = useAuth();
  return useQuery({
    enabled: !!user?.id && !!activeWorkspace?.id,
    queryKey: ["assignable-profiles", user?.id, targetWorkspaceId ?? activeWorkspace?.id],
    queryFn: async () => {
      // A versão de list_task_assignees que aceita ambiente só passa a existir
      // com a migration 20260903122000. Enquanto ela não for aplicada, chamar
      // com argumento devolve erro de função inexistente e a tela ficaria sem
      // nome nenhum — então a chamada sem argumento é a rede de proteção.
      let rows: Profile[] | null = null;
      if (targetWorkspaceId) {
        const scoped = await (supabase.rpc("list_task_assignees", {
          target_workspace_id: targetWorkspaceId,
        }) as any);
        if (!scoped.error) rows = (scoped.data ?? []) as Profile[];
        else if (scoped.error.code !== "PGRST202" || targetWorkspaceId !== activeWorkspace?.id) throw scoped.error;
      }
      if (rows === null) {
        const { data, error } = await (supabase.rpc("list_task_assignees") as any);
        if (error) throw error;
        rows = (data ?? []) as Profile[];
      }
      return [...rows].sort((a, b) =>
        (a.full_name ?? "").localeCompare(b.full_name ?? "", "pt-BR", {
          sensitivity: "base",
        }),
      );
    },
  });
}

export function useTaskCollaborators() {
  useTaskReadUpdates();
  const { user, activeWorkspace } = useAuth();
  const qc = useQueryClient();
  const previousOwnTasks = useRef<{ scope: string; ids: string } | null>(null);
  const query = useQuery({
    // This list feeds the "Atribuídas a mim" filter. Scope it exactly like
    // tasks so collaborator-only assignments are never read from a stale user
    // or workspace cache.
    queryKey: ["task_collaborators", user?.id ?? null, activeWorkspace?.id ?? null],
    enabled: !!user?.id,
    // Outra pessoa pode adicionar/remover um participante enquanto esta aba
    // permanece aberta. Atualize sem exigir recarga manual.
    staleTime: 30_000,
    refetchInterval: () => isOffline() ? false : 60_000,
    refetchOnWindowFocus: "always",
    queryFn: async () => {
      // Lista inteira, em páginas: é ela que decide o que entra em
      // "Atribuídas a mim". Um corte aqui escondia tarefas da própria pessoa.
      const { data, error } = await fetchAllRows<TaskCollaborator>(
        (from, to) =>
          (supabase.from("task_collaborators") as any)
            .select("task_id, collaborator_id, added_by, created_at")
            .order("task_id", { ascending: true })
            .order("collaborator_id", { ascending: true })
            .range(from, to),
        { rowKey: (item) => `${item.task_id}:${item.collaborator_id}` },
      );
      if (error) throw error;
      return data ?? [];
    },
  });

  useEffect(() => {
    if (!user?.id || !query.data) return;
    const scope = `${user.id}:${activeWorkspace?.id ?? ""}`;
    const ids = query.data
      .filter((item) => item.collaborator_id === user.id)
      .map((item) => item.task_id)
      .sort()
      .join("|");
    const previous = previousOwnTasks.current;
    previousOwnTasks.current = { scope, ids };
    // Novos vínculos podem liberar tarefas antes invisíveis pela RLS. Releia
    // também os cards, além da lista de participantes, quando isso acontecer.
    if (previous?.scope === scope && previous.ids !== ids) {
      void qc.invalidateQueries({ queryKey: ["tasks", user.id] });
    }
  }, [activeWorkspace?.id, qc, query.data, user?.id]);

  return query;
}

export function useTaskTags(workspaceId?: string | null) {
  const { activeWorkspace } = useAuth();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspace?.id ?? null;
  const isAdminPreview = Boolean(
    workspaceId && activeWorkspace?.id && workspaceId !== activeWorkspace.id,
  );
  return useQuery({
    queryKey: ["task_tags", resolvedWorkspaceId],
    enabled: !!resolvedWorkspaceId,
    queryFn: async () => {
      const result = isAdminPreview
        ? await (supabase.rpc("list_workspace_tags_for_admin_preview", {
            target_workspace_id: resolvedWorkspaceId,
          }) as any)
        : await supabase
            .from("task_tags")
            .select("*")
            .eq("workspace_id", resolvedWorkspaceId!)
            .order("position", { ascending: true })
            .order("name", { ascending: true });
      const { data, error } = result;
      if (error) throw error;
      return (data ?? []) as TaskTag[];
    },
  });
}

export function useTaskObjectives() {
  const { activeWorkspace } = useAuth();
  return useQuery({
    queryKey: ["task_objectives", activeWorkspace?.id ?? null],
    enabled: activeWorkspace?.slug === "marketing",
    queryFn: async () => {
      const { data, error } = await (supabase.from("task_objectives") as any)
        .select("*")
        .order("position", { ascending: true })
        .order("name", { ascending: true });
      if (error) throw error;
      return (data ?? []) as TaskObjective[];
    },
  });
}

export interface TaskTagLink {
  task_id: string;
  tag_id: string;
}
export function useTaskTagLinks() {
  return useQuery({
    queryKey: ["task_tag_links"],
    queryFn: async () => {
      const { data, error } = await fetchAllRows<TaskTagLink>(
        (from, to) =>
          (supabase.from("task_tag_links") as any)
            .select("task_id, tag_id")
            .order("task_id", { ascending: true })
            .order("tag_id", { ascending: true })
            .range(from, to),
        { rowKey: (link) => `${link.task_id}:${link.tag_id}` },
      );
      if (error) throw error;
      return data ?? [];
    },
  });
}

export interface Subtask {
  notes?: string | null;
  id: string;
  task_id: string;
  title: string;
  done: boolean;
  position: number;
  assignee_id: string | null;
  due_date: string | null;
  completed_at: string | null;
}
export function useSubtasks() {
  const { user, activeWorkspace } = useAuth();
  const qc = useQueryClient();

  useTaskReadUpdates();
  return useQuery({
    queryKey: subtasksQueryKey(user?.id, activeWorkspace?.id),
    enabled: !!user?.id && !!activeWorkspace?.id,
    staleTime: 30_000,
    refetchInterval: () => isOffline() ? false : 60_000,
    refetchOnWindowFocus: "always",
    queryFn: async () => {
      // A posição só ordena dentro de cada tarefa, então quase todas as
      // linhas empatam. Sem o id como desempate, cada releitura devolvia um
      // lote diferente e as tarefas ligadas às subtarefas apareciam e sumiam.
      const { data, error } = await fetchAllRows<Subtask>(
        (from, to) =>
          (supabase.from("subtasks") as any)
            .select("id, task_id, title, done, position, assignee_id, due_date, completed_at")
            .order("position", { ascending: true })
            .order("id", { ascending: true })
            .range(from, to),
        { rowKey: (subtask) => subtask.id },
      );
      if (error) throw error;
      const operations = await listOfflineOperations(user!.id);
      if (!operations.some((op) => op.entity === "subtask")) return data ?? [];
      const scope = activeWorkspace!.id;
      const parents = qc.getQueryData<Task[]>(["tasks", user!.id, scope, null]) ?? [];
      return overlayPendingSubtasks(data ?? [], operations, new Set(parents.map((task) => task.id)), scope);
    },
  });
}

export function useTaskStatuses(targetWorkspaceId?: string | null) {
  const { activeWorkspace } = useAuth();
  const isAdminPreview = Boolean(
    targetWorkspaceId && activeWorkspace?.id && targetWorkspaceId !== activeWorkspace.id,
  );
  return useQuery({
    queryKey: ["task_statuses", targetWorkspaceId ?? activeWorkspace?.id ?? null],
    queryFn: async () => {
      const result = isAdminPreview
        ? await (supabase.rpc("list_workspace_statuses_for_admin_preview", {
            target_workspace_id: targetWorkspaceId,
          }) as any)
        : await supabase.from("task_statuses").select("*").order("position");
      const { data, error } = result;
      if (error) throw error;
      return (data ?? []) as TaskStatus[];
    },
  });
}
