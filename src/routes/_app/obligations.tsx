/* eslint-disable @typescript-eslint/no-explicit-any -- Supabase types are regenerated after the migration is applied. */
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  AlertTriangle,
  CalendarCheck2,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Loader2,
  Pause,
  Pencil,
  Play,
  Plus,
  Search,
  Settings2,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import {
  useClients,
  useAssignableProfiles,
  useColumns,
  useProfiles,
  useTaskStatuses,
  type Client,
  type KanbanColumn,
  type Profile,
  type Task,
  type TaskStatus,
} from "@/hooks/use-data";
import { useWorkspaceTasks } from "@/hooks/use-workspace-tasks";
import {
  useObligationOccurrences,
  useObligations,
  type Obligation,
  type ObligationOccurrence,
} from "@/hooks/use-obligations";
import { ObligationDialog } from "@/components/ObligationDialog";
import { RichTextEditor } from "@/components/RichTextEditor";
import { TaskDialog } from "@/components/TaskDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_app/obligations")({ component: ObligationsPage });

const todayKey = () => format(new Date(), "yyyy-MM-dd");

type DeleteTarget =
  | { scope: "occurrences"; occurrences: ObligationOccurrence[] }
  | { scope: "series"; obligation: Obligation }
  | { scope: "series-batch"; obligations: Obligation[] }
  | { scope: "all" };

type BulkTaskUpdates = {
  title?: string;
  description?: string | null;
  status?: Task["status"];
  status_id?: string | null;
  completed_at?: string | null;
  column_id?: string | null;
  client_id?: string | null;
  assignee_id?: string | null;
  priority?: Task["priority"];
  due_date?: string | null;
  due_time?: string | null;
};

type BulkTaskChanges = {
  updates: BulkTaskUpdates;
  collaboratorIds?: string[];
  dueDateReason?: string;
};

function ObligationsPage() {
  const { hasPermission, loading, activeWorkspace, user, isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const {
    data: obligations = [],
    isLoading: loadingObligations,
    error: obligationsError,
  } = useObligations();
  const {
    data: occurrences = [],
    isLoading: loadingOccurrences,
    error: occurrencesError,
  } = useObligationOccurrences();
  const { data: clients = [] } = useClients();
  const { data: profiles = [] } = useProfiles();
  const { data: assignableProfiles = [] } = useAssignableProfiles();
  const { data: columns = [] } = useColumns();
  const { data: taskStatuses = [] } = useTaskStatuses();
  const { data: tasks = [] } = useWorkspaceTasks();
  const materializedWorkspace = useRef<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingObligation, setEditingObligation] = useState<Obligation | null>(null);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");
  const [clientFilter, setClientFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [calendarCursor, setCalendarCursor] = useState(new Date());
  const [workingOccurrenceId, setWorkingOccurrenceId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [selectedOccurrenceIds, setSelectedOccurrenceIds] = useState<string[]>([]);
  const [bulkEditOccurrenceIds, setBulkEditOccurrenceIds] = useState<string[]>([]);
  const [bulkEditOpen, setBulkEditOpen] = useState(false);
  const [clientLogoUrls, setClientLogoUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!activeWorkspace?.id || materializedWorkspace.current === activeWorkspace.id) return;
    materializedWorkspace.current = activeWorkspace.id;
    void (async () => {
      const { error } = await (supabase as any).rpc("materialize_obligations", {
        p_horizon_days: 365,
      });
      if (error) {
        materializedWorkspace.current = null;
        toast.error(`Não foi possível atualizar os próximos vencimentos: ${error.message}`);
        return;
      }
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["obligation-occurrences"] }),
        queryClient.invalidateQueries({ queryKey: ["tasks"] }),
      ]);
    })();
  }, [activeWorkspace?.id, queryClient]);

  useEffect(() => {
    let cancelled = false;
    const clientsWithLogo = clients.filter((client) => client.avatar_path);
    if (clientsWithLogo.length === 0) {
      setClientLogoUrls({});
      return;
    }

    void (async () => {
      const paths = Object.fromEntries(
        clientsWithLogo.map((client) => [client.id, client.avatar_path!]),
      );
      let cached: Record<string, { url: string; expiresAt: number; path?: string }> = {};
      try {
        cached = JSON.parse(window.sessionStorage.getItem("taskflow-client-avatar-urls") ?? "{}");
      } catch {
        cached = {};
      }

      const now = Date.now();
      const visibleCached = Object.fromEntries(
        clientsWithLogo
          .filter((client) => {
            const entry = cached[client.id];
            return entry?.url && entry.expiresAt > now && entry.path === client.avatar_path;
          })
          .map((client) => [client.id, cached[client.id].url]),
      );
      const missing = clientsWithLogo.filter((client) => !visibleCached[client.id]);
      if (!cancelled) setClientLogoUrls(visibleCached);
      if (missing.length === 0) return;

      const { data } = await supabase.storage.from("task-attachments").createSignedUrls(
        missing.map((client) => client.avatar_path!),
        3600,
      );
      const urlByPath = new Map(
        (data ?? []).map((item: { path: string | null; signedUrl: string | null }) => [
          item.path,
          item.signedUrl,
        ]),
      );
      const loaded = Object.fromEntries(
        missing
          .map((client) => [client.id, urlByPath.get(client.avatar_path!)])
          .filter((entry): entry is [string, string] => Boolean(entry[1])),
      );
      if (cancelled) return;

      const expiresAt = Date.now() + 50 * 60 * 1000;
      Object.entries(loaded).forEach(([clientId, url]) => {
        cached[clientId] = { url, expiresAt, path: paths[clientId] };
      });
      try {
        window.sessionStorage.setItem("taskflow-client-avatar-urls", JSON.stringify(cached));
      } catch {
        // A lista continua funcional quando o armazenamento do navegador está bloqueado.
      }
      setClientLogoUrls({ ...visibleCached, ...loaded });
    })();

    return () => {
      cancelled = true;
    };
  }, [clients]);

  const obligationById = useMemo(
    () => new Map(obligations.map((obligation) => [obligation.id, obligation])),
    [obligations],
  );
  const clientById = useMemo(
    () => new Map(clients.map((client) => [client.id, client])),
    [clients],
  );
  const profileById = useMemo(
    () => new Map(profiles.map((profile) => [profile.id, profile])),
    [profiles],
  );
  const taskById = useMemo(() => new Map(tasks.map((task) => [task.id, task])), [tasks]);

  const activeOccurrences = useMemo(
    () =>
      occurrences.filter((occurrence) => {
        if (occurrence.status === "skipped") return false;
        const obligation = obligationById.get(occurrence.obligation_id);
        if (!obligation) return false;
        if (clientFilter !== "all" && obligation.client_id !== clientFilter) return false;
        if (assigneeFilter !== "all" && obligation.assignee_id !== assigneeFilter) return false;
        const term = search.trim().toLocaleLowerCase("pt-BR");
        if (!term) return true;
        const client = clientById.get(obligation.client_id ?? "");
        return `${obligation.title} ${client?.name ?? ""}`
          .toLocaleLowerCase("pt-BR")
          .includes(term);
      }),
    [assigneeFilter, clientById, clientFilter, obligationById, occurrences, search],
  );

  const today = todayKey();
  const nextWeek = format(addDays(new Date(), 7), "yyyy-MM-dd");
  const pendingOccurrences = activeOccurrences.filter(
    (occurrence) => occurrence.status !== "completed" && occurrence.status !== "skipped",
  );
  const pendingGroups = useMemo(() => {
    const groups = new Map<
      string,
      Array<{ occurrence: ObligationOccurrence; obligation: Obligation }>
    >();
    pendingOccurrences.forEach((occurrence) => {
      const obligation = obligationById.get(occurrence.obligation_id);
      if (!obligation) return;
      const key = obligation.client_id ?? "without-client";
      const group = groups.get(key) ?? [];
      group.push({ occurrence, obligation });
      groups.set(key, group);
    });
    return [...groups.entries()]
      .map(([clientId, items]) => ({
        clientId,
        client: clientById.get(clientId) ?? null,
        items,
      }))
      .sort((a, b) =>
        (a.client?.name ?? "Sem cliente").localeCompare(b.client?.name ?? "Sem cliente", "pt-BR"),
      );
  }, [clientById, obligationById, pendingOccurrences]);
  const obligationGroups = useMemo(() => {
    const groups = new Map<string, Obligation[]>();
    obligations.forEach((obligation) => {
      const key = obligation.client_id ?? "without-client";
      const group = groups.get(key) ?? [];
      group.push(obligation);
      groups.set(key, group);
    });
    return [...groups.entries()]
      .map(([clientId, items]) => ({
        clientId,
        client: clientById.get(clientId) ?? null,
        items,
      }))
      .sort((a, b) =>
        (a.client?.name ?? "Sem cliente").localeCompare(b.client?.name ?? "Sem cliente", "pt-BR"),
      );
  }, [clientById, obligations]);
  const overdueCount = pendingOccurrences.filter(
    (occurrence) => occurrence.due_date < today,
  ).length;
  const todayCount = pendingOccurrences.filter(
    (occurrence) => occurrence.due_date === today,
  ).length;
  const weekCount = pendingOccurrences.filter(
    (occurrence) => occurrence.due_date > today && occurrence.due_date <= nextWeek,
  ).length;
  const completedMonthCount = activeOccurrences.filter(
    (occurrence) =>
      occurrence.status === "completed" &&
      occurrence.completed_at &&
      isSameMonth(new Date(occurrence.completed_at), new Date()),
  ).length;

  const openTask = (occurrence: ObligationOccurrence) => {
    const task = occurrence.task_id ? taskById.get(occurrence.task_id) : null;
    if (!task) return toast.error("A tarefa desta ocorrência ainda não foi criada.");
    setEditingTask(task);
    setTaskDialogOpen(true);
  };

  const createTaskNow = async (occurrence: ObligationOccurrence) => {
    const restoringDeletedTask = Boolean(occurrence.task_id && !taskById.has(occurrence.task_id));
    setWorkingOccurrenceId(occurrence.id);
    const { data, error } = await (supabase as any).rpc("create_obligation_task", {
      target_occurrence_id: occurrence.id,
    });
    setWorkingOccurrenceId(null);
    if (error) return toast.error(error.message);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["obligation-occurrences"] }),
      queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    ]);
    toast.success(restoringDeletedTask ? "Tarefa restaurada" : "Tarefa criada");
    const { data: refreshedTask } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", data as string)
      .maybeSingle();
    if (refreshedTask) {
      setEditingTask(refreshedTask as Task);
      setTaskDialogOpen(true);
    }
  };

  const completeOccurrence = async (occurrence: ObligationOccurrence) => {
    setWorkingOccurrenceId(occurrence.id);
    const { error } = await (supabase as any).rpc("complete_obligation_occurrence", {
      target_occurrence_id: occurrence.id,
    });
    setWorkingOccurrenceId(null);
    if (error) return toast.error(error.message);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["obligation-occurrences"] }),
      queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    ]);
    toast.success("Obrigação concluída neste período");
  };

  const toggleOccurrenceSelection = (occurrenceId: string) => {
    setSelectedOccurrenceIds((current) =>
      current.includes(occurrenceId)
        ? current.filter((id) => id !== occurrenceId)
        : [...current, occurrenceId],
    );
  };

  const selectClientOccurrences = (occurrenceIds: string[], selected: boolean) => {
    setSelectedOccurrenceIds((current) => {
      const next = new Set(current);
      occurrenceIds.forEach((id) => (selected ? next.add(id) : next.delete(id)));
      return [...next];
    });
  };

  const saveBulkTaskChanges = async ({
    updates,
    collaboratorIds,
    dueDateReason,
  }: BulkTaskChanges) => {
    const selectedOccurrences = bulkEditOccurrenceIds
      .map((id) => occurrences.find((occurrence) => occurrence.id === id))
      .filter((occurrence): occurrence is ObligationOccurrence => Boolean(occurrence));
    const existingTaskIds = selectedOccurrences
      .map((occurrence) => occurrence.task_id)
      .filter((taskId): taskId is string => Boolean(taskId && taskById.has(taskId)));
    const occurrencesToMaterialize = selectedOccurrences.filter(
      (occurrence) => !occurrence.task_id || !taskById.has(occurrence.task_id),
    );

    const creationResults = await Promise.all(
      occurrencesToMaterialize.map((occurrence) =>
        (supabase as any).rpc("create_obligation_task", {
          target_occurrence_id: occurrence.id,
        }),
      ),
    );
    const creationError = creationResults.find((result) => result.error)?.error;
    if (creationError) {
      toast.error(`Não foi possível preparar todas as tarefas: ${creationError.message}`);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["obligation-occurrences"] }),
        queryClient.invalidateQueries({ queryKey: ["tasks"] }),
      ]);
      return false;
    }

    const taskIds = [
      ...new Set([
        ...existingTaskIds,
        ...creationResults
          .map((result) => result.data)
          .filter((taskId): taskId is string => typeof taskId === "string"),
      ]),
    ];
    if (taskIds.length === 0) {
      toast.error("Nenhuma tarefa disponível para editar.");
      return false;
    }

    const { data: currentTasks, error: currentTasksError } = await supabase
      .from("tasks")
      .select("id, due_date, created_by, assignee_id")
      .in("id", taskIds);
    if (currentTasksError) {
      toast.error(currentTasksError.message);
      return false;
    }

    if (
      collaboratorIds &&
      !isAdmin &&
      (currentTasks ?? []).some(
        (task: { created_by: string | null; assignee_id: string | null }) =>
          task.created_by !== user?.id && task.assignee_id !== user?.id,
      )
    ) {
      toast.error(
        "Você precisa ser criador ou responsável por todas as tarefas para substituir os participantes.",
      );
      return false;
    }

    if (updates.status === "done") {
      const { data: incompleteSubtasks, error: subtasksError } = await supabase
        .from("subtasks")
        .select("id")
        .in("task_id", taskIds)
        .eq("done", false)
        .limit(1);
      if (subtasksError) {
        toast.error(subtasksError.message);
        return false;
      }
      if (incompleteSubtasks?.length) {
        toast.error("Conclua as subtarefas pendentes antes de concluir as tarefas selecionadas.");
        return false;
      }
    }

    if (Object.keys(updates).length > 0) {
      const { error } = await supabase.from("tasks").update(updates).in("id", taskIds);
      if (error) {
        toast.error(error.message);
        return false;
      }
    }

    if (collaboratorIds) {
      const { error: deleteCollaboratorsError } = await (supabase.from("task_collaborators") as any)
        .delete()
        .in("task_id", taskIds);
      if (deleteCollaboratorsError) {
        toast.error(deleteCollaboratorsError.message);
        return false;
      }
      if (collaboratorIds.length > 0) {
        const { error: insertCollaboratorsError } = await (
          supabase.from("task_collaborators") as any
        ).insert(
          taskIds.flatMap((taskId) =>
            collaboratorIds.map((collaboratorId) => ({
              task_id: taskId,
              collaborator_id: collaboratorId,
              added_by: user?.id ?? null,
            })),
          ),
        );
        if (insertCollaboratorsError) {
          toast.error(insertCollaboratorsError.message);
          return false;
        }
      }
    }

    if ("due_date" in updates && user?.id && dueDateReason) {
      const changedDeadlines = (currentTasks ?? []).filter(
        (task: { id: string; due_date: string | null }) =>
          task.due_date && task.due_date !== updates.due_date,
      );
      if (changedDeadlines.length > 0) {
        const { error: deadlineHistoryError } = await supabase.from("task_due_date_changes").insert(
          changedDeadlines.map((task: { id: string; due_date: string | null }) => ({
            task_id: task.id,
            user_id: user.id,
            old_due_date: task.due_date,
            new_due_date: updates.due_date ?? null,
            reason: dueDateReason,
          })),
        );
        if (deadlineHistoryError) {
          toast.warning("Prazos atualizados, mas não foi possível registrar a justificativa.");
        }
      }
    }
    if (user?.id) {
      const { error: historyError } = await supabase.from("task_history").insert(
        taskIds.map((taskId) => ({
          task_id: taskId,
          user_id: user.id,
          action: "updated",
          details: {
            source: "obligations_bulk_edit",
            fields: [...Object.keys(updates), ...(collaboratorIds ? ["collaborators"] : [])],
          },
        })),
      );
      if (historyError) console.error("Não foi possível registrar a edição em lote", historyError);
    }

    setSelectedOccurrenceIds((current) =>
      current.filter((id) => !bulkEditOccurrenceIds.includes(id)),
    );
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["obligation-occurrences"] }),
      queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    ]);
    toast.success(`${taskIds.length} tarefa${taskIds.length === 1 ? " editada" : "s editadas"}`);
    return true;
  };

  const setObligationActive = async (obligation: Obligation, isActive: boolean) => {
    const { error } = await (supabase.from("obligations" as any) as any)
      .update({ is_active: isActive })
      .eq("id", obligation.id);
    if (error) return toast.error(error.message);
    if (isActive) {
      const { error: refreshError } = await (supabase as any).rpc("refresh_obligation", {
        target_obligation_id: obligation.id,
      });
      if (refreshError) {
        return toast.error(
          `Obrigação ativada, mas os próximos prazos não foram gerados: ${refreshError.message}`,
        );
      }
    }
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["obligations"] }),
      queryClient.invalidateQueries({ queryKey: ["obligation-occurrences"] }),
    ]);
    toast.success(isActive ? "Obrigação ativada" : "Obrigação pausada");
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    let error: { message: string } | null = null;

    if (deleteTarget.scope === "occurrences") {
      const result = await (supabase.from("obligation_occurrences" as any) as any)
        .update({ status: "skipped" })
        .in(
          "id",
          deleteTarget.occurrences.map((occurrence) => occurrence.id),
        );
      error = result.error;
    } else if (deleteTarget.scope === "series") {
      const result = await (supabase.from("obligations" as any) as any)
        .delete()
        .eq("id", deleteTarget.obligation.id);
      error = result.error;
    } else if (deleteTarget.scope === "series-batch") {
      const result = await (supabase.from("obligations" as any) as any).delete().in(
        "id",
        deleteTarget.obligations.map((obligation) => obligation.id),
      );
      error = result.error;
    } else if (deleteTarget.scope === "all" && activeWorkspace?.id) {
      const result = await (supabase.from("obligations" as any) as any)
        .delete()
        .eq("workspace_id", activeWorkspace.id);
      error = result.error;
    }

    setDeleting(false);
    if (error) return toast.error(error.message);
    const scope = deleteTarget.scope;
    if (scope === "occurrences") {
      const deletedIds = new Set(deleteTarget.occurrences.map((occurrence) => occurrence.id));
      setSelectedOccurrenceIds((current) => current.filter((id) => !deletedIds.has(id)));
    } else if (scope === "series") {
      const deletedOccurrenceIds = new Set(
        occurrences
          .filter((occurrence) => occurrence.obligation_id === deleteTarget.obligation.id)
          .map((occurrence) => occurrence.id),
      );
      setSelectedOccurrenceIds((current) => current.filter((id) => !deletedOccurrenceIds.has(id)));
    } else if (scope === "series-batch") {
      const deletedObligationIds = new Set(
        deleteTarget.obligations.map((obligation) => obligation.id),
      );
      const deletedOccurrenceIds = new Set(
        occurrences
          .filter((occurrence) => deletedObligationIds.has(occurrence.obligation_id))
          .map((occurrence) => occurrence.id),
      );
      setSelectedOccurrenceIds((current) => current.filter((id) => !deletedOccurrenceIds.has(id)));
    } else {
      setSelectedOccurrenceIds([]);
    }
    setDeleteTarget(null);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["obligations"] }),
      queryClient.invalidateQueries({ queryKey: ["obligation-occurrences"] }),
    ]);
    toast.success(
      scope === "occurrences"
        ? "Vencimentos selecionados excluídos"
        : scope === "series"
          ? "Obrigação e seus vencimentos foram excluídos"
          : scope === "series-batch"
            ? "Obrigação e todos os seus vencimentos foram excluídos"
            : "Todas as obrigações foram excluídas",
    );
  };

  if (loading) return <div className="p-6 text-sm text-muted-foreground">Carregando...</div>;
  if (!hasPermission("obligations")) return <Navigate to="/dashboard" />;

  const pageError = obligationsError || occurrencesError;

  return (
    <div className="space-y-5 p-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarClock className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold tracking-tight">Obrigações</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Controle compromissos recorrentes dos clientes e gere tarefas no momento certo.
          </p>
        </div>
        <Button
          className="h-9 rounded-full px-4 shadow-sm"
          onClick={() => {
            setEditingObligation(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Nova obrigação
        </Button>
      </header>

      {pageError ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Não foi possível carregar as obrigações: {(pageError as Error).message}
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Atrasadas"
          value={overdueCount}
          icon={AlertTriangle}
          tone="destructive"
        />
        <MetricCard label="Vencem hoje" value={todayCount} icon={Clock3} tone="warning" />
        <MetricCard
          label="Próximos 7 dias"
          value={weekCount}
          icon={CalendarCheck2}
          tone="primary"
        />
        <MetricCard
          label="Concluídas no mês"
          value={completedMonthCount}
          icon={CheckCircle2}
          tone="success"
        />
      </div>

      <div className="flex flex-wrap gap-2 rounded-xl border bg-card p-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar obrigação ou cliente..."
            className="pl-9"
          />
        </div>
        <Select value={clientFilter} onValueChange={setClientFilter}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Todos os clientes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os clientes</SelectItem>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Todos os responsáveis" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os responsáveis</SelectItem>
            {profiles.map((profile) => (
              <SelectItem key={profile.id} value={profile.id}>
                {profile.full_name || profile.email || "Usuário"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Próximas</TabsTrigger>
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-4">
          {loadingObligations || loadingOccurrences ? (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Carregando vencimentos...
            </div>
          ) : pendingOccurrences.length === 0 ? (
            <EmptyState
              title="Nenhum vencimento pendente"
              description="Crie uma obrigação para começar a acompanhar os próximos prazos."
            />
          ) : (
            <div className="space-y-3">
              {pendingGroups.map(({ clientId, client, items }, index) => {
                const occurrenceIds = items.map((item) => item.occurrence.id);
                const selectedItems = items.filter((item) =>
                  selectedOccurrenceIds.includes(item.occurrence.id),
                );
                const selectedIds = selectedItems.map((item) => item.occurrence.id);
                const selectedObligations = [
                  ...new Map(
                    selectedItems.map((item) => [item.obligation.id, item.obligation]),
                  ).values(),
                ];
                const allSelected =
                  occurrenceIds.length > 0 && selectedIds.length === occurrenceIds.length;
                return (
                  <ClientSection
                    key={clientId}
                    client={client}
                    logoUrl={client ? clientLogoUrls[client.id] : undefined}
                    subtitle={`${new Set(items.map((item) => item.obligation.id)).size} obrigação(ões) · ${items.length} vencimento(s)`}
                    defaultOpen={index === 0}
                    actions={
                      <div className="flex shrink-0 items-center gap-2">
                        <label className="hidden cursor-pointer items-center gap-2 text-xs text-muted-foreground sm:flex">
                          <Checkbox
                            checked={
                              allSelected ? true : selectedIds.length > 0 ? "indeterminate" : false
                            }
                            onCheckedChange={(checked) =>
                              selectClientOccurrences(occurrenceIds, checked === true)
                            }
                          />
                          Todas
                        </label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={selectedIds.length === 0}
                          onClick={() => {
                            setBulkEditOccurrenceIds(selectedIds);
                            setBulkEditOpen(true);
                          }}
                        >
                          <Pencil className="mr-1.5 h-3.5 w-3.5" />
                          Editar selecionadas
                          {selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              disabled={selectedIds.length === 0}
                              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                              Excluir
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() =>
                                setDeleteTarget({
                                  scope: "occurrences",
                                  occurrences: selectedItems.map((item) => item.occurrence),
                                })
                              }
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir somente os vencimentos selecionados
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() =>
                                setDeleteTarget({
                                  scope: "series-batch",
                                  obligations: selectedObligations,
                                })
                              }
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir obrigação
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    }
                  >
                    {items.map(({ occurrence, obligation }) => {
                      const task = occurrence.task_id
                        ? (taskById.get(occurrence.task_id) ?? null)
                        : null;
                      return (
                        <OccurrenceRow
                          key={occurrence.id}
                          occurrence={occurrence}
                          obligation={obligation}
                          task={task}
                          client={client}
                          assignee={
                            profileById.get(task?.assignee_id ?? obligation.assignee_id ?? "") ??
                            null
                          }
                          selected={selectedOccurrenceIds.includes(occurrence.id)}
                          working={workingOccurrenceId === occurrence.id}
                          onSelectedChange={() => toggleOccurrenceSelection(occurrence.id)}
                          onOpenTask={() => openTask(occurrence)}
                          onCreateTask={() => void createTaskNow(occurrence)}
                          onComplete={() => void completeOccurrence(occurrence)}
                        />
                      );
                    })}
                  </ClientSection>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <ObligationsCalendar
            cursor={calendarCursor}
            onCursorChange={setCalendarCursor}
            occurrences={activeOccurrences}
            obligationById={obligationById}
            clientById={clientById}
            onOccurrenceClick={(occurrence) => {
              if (occurrence.task_id && taskById.has(occurrence.task_id)) openTask(occurrence);
              else void createTaskNow(occurrence);
            }}
          />
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          {obligations.length === 0 ? (
            <EmptyState
              title="Nenhuma obrigação configurada"
              description="Cadastre a primeira regra recorrente de um cliente."
            />
          ) : (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-3">
                <p className="text-sm text-muted-foreground">
                  {obligations.length} obrigação(ões) configurada(s) neste ambiente
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => setDeleteTarget({ scope: "all" })}
                >
                  <Trash2 className="mr-1.5 h-4 w-4" />
                  Excluir todas
                </Button>
              </div>
              <div className="space-y-3">
                {obligationGroups.map(({ clientId, client, items }, index) => (
                  <ClientSection
                    key={clientId}
                    client={client}
                    logoUrl={client ? clientLogoUrls[client.id] : undefined}
                    subtitle={`${items.length} obrigação(ões) configurada(s)`}
                    defaultOpen={index === 0}
                  >
                    <div className="grid gap-3 lg:grid-cols-2">
                      {items.map((obligation) => {
                        const assignee = profileById.get(obligation.assignee_id ?? "");
                        const nextOccurrence = occurrences.find(
                          (occurrence) =>
                            occurrence.obligation_id === obligation.id &&
                            occurrence.status !== "completed" &&
                            occurrence.status !== "skipped" &&
                            occurrence.due_date >= today,
                        );
                        return (
                          <Card key={obligation.id} className="p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span
                                    className="h-3 w-3 shrink-0 rounded-sm"
                                    style={{ backgroundColor: client?.color || "#64748b" }}
                                  />
                                  <h3 className="truncate font-semibold">{obligation.title}</h3>
                                  {!obligation.is_active && (
                                    <Badge variant="outline">Pausada</Badge>
                                  )}
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">
                                  {client?.name || "Sem cliente"} · {formatRecurrence(obligation)}
                                </p>
                              </div>
                              <div className="flex shrink-0 gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  title="Editar"
                                  onClick={() => {
                                    setEditingObligation(obligation);
                                    setDialogOpen(true);
                                  }}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                  title="Excluir obrigação"
                                  onClick={() => setDeleteTarget({ scope: "series", obligation })}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  title={obligation.is_active ? "Pausar" : "Ativar"}
                                  onClick={() =>
                                    void setObligationActive(obligation, !obligation.is_active)
                                  }
                                >
                                  {obligation.is_active ? (
                                    <Pause className="h-4 w-4" />
                                  ) : (
                                    <Play className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-3 text-xs">
                              <div>
                                <span className="block text-muted-foreground">Responsável</span>
                                <span className="mt-1 block font-medium">
                                  {assignee?.full_name || assignee?.email || "Sem responsável"}
                                </span>
                              </div>
                              <div>
                                <span className="block text-muted-foreground">
                                  Próximo vencimento
                                </span>
                                <span className="mt-1 block font-medium">
                                  {nextOccurrence
                                    ? formatDate(nextOccurrence.due_date)
                                    : "Sem data futura"}
                                </span>
                              </div>
                              <div>
                                <span className="block text-muted-foreground">
                                  Criação da tarefa
                                </span>
                                <span className="mt-1 block font-medium">
                                  {obligation.create_before_days === 0
                                    ? "No vencimento"
                                    : `${obligation.create_before_days} dia(s) antes`}
                                </span>
                              </div>
                              <div>
                                <span className="block text-muted-foreground">Período</span>
                                <span className="mt-1 block font-medium">
                                  Desde {formatDate(obligation.start_date)}
                                  {obligation.end_date
                                    ? ` até ${formatDate(obligation.end_date)}`
                                    : " · sem término"}
                                </span>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </ClientSection>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <ObligationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        obligation={editingObligation}
      />
      <TaskDialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen} task={editingTask} />
      <BulkTaskEditDialog
        open={bulkEditOpen}
        onOpenChange={setBulkEditOpen}
        taskCount={bulkEditOccurrenceIds.length}
        profiles={assignableProfiles}
        clients={clients}
        columns={columns}
        statuses={taskStatuses}
        onSave={saveBulkTaskChanges}
      />
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open && !deleting) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{deleteDialogTitle(deleteTarget)}</AlertDialogTitle>
            <AlertDialogDescription>{deleteDialogDescription(deleteTarget)}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(event) => {
                event.preventDefault();
                void confirmDelete();
              }}
            >
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {deleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  icon: typeof AlertTriangle;
  tone: "destructive" | "warning" | "primary" | "success";
}) {
  const colors = {
    destructive: "bg-destructive/10 text-destructive",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    primary: "bg-primary/10 text-primary",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  };
  return (
    <Card className="flex items-center gap-3 p-4">
      <span className={`grid h-10 w-10 place-items-center rounded-xl ${colors[tone]}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-2xl font-semibold leading-none">{value}</span>
        <span className="mt-1 block text-xs text-muted-foreground">{label}</span>
      </span>
    </Card>
  );
}

function BulkTaskEditDialog({
  open,
  onOpenChange,
  taskCount,
  profiles,
  clients,
  columns,
  statuses,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskCount: number;
  profiles: Profile[];
  clients: Client[];
  columns: KanbanColumn[];
  statuses: TaskStatus[];
  onSave: (changes: BulkTaskChanges) => Promise<boolean>;
}) {
  const [applyTitle, setApplyTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [applyDescription, setApplyDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("unchanged");
  const [priority, setPriority] = useState("unchanged");
  const [status, setStatus] = useState("unchanged");
  const [client, setClient] = useState("unchanged");
  const [applyCollaborators, setApplyCollaborators] = useState(false);
  const [collaboratorIds, setCollaboratorIds] = useState<string[]>([]);
  const [applyDeadline, setApplyDeadline] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [dueDateReason, setDueDateReason] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setApplyTitle(false);
    setTitle("");
    setApplyDescription(false);
    setDescription("");
    setAssignee("unchanged");
    setPriority("unchanged");
    setStatus("unchanged");
    setClient("unchanged");
    setApplyCollaborators(false);
    setCollaboratorIds([]);
    setApplyDeadline(false);
    setDueDate("");
    setDueTime("");
    setDueDateReason("");
  }, [open]);

  const toggleCollaborator = (profileId: string) => {
    setCollaboratorIds((current) =>
      current.includes(profileId)
        ? current.filter((id) => id !== profileId)
        : [...current, profileId],
    );
  };

  const save = async () => {
    const updates: BulkTaskUpdates = {};
    if (applyTitle) {
      if (!title.trim()) {
        toast.error("Informe o novo título das tarefas.");
        return;
      }
      updates.title = title.trim();
    }
    if (applyDescription) updates.description = description.trim() || null;
    if (assignee !== "unchanged") {
      updates.assignee_id = assignee === "none" ? null : assignee;
    }
    if (priority !== "unchanged") {
      updates.priority = priority === "none" ? null : (priority as NonNullable<Task["priority"]>);
    }
    if (client !== "unchanged") {
      updates.client_id = client === "none" ? null : client;
    }
    if (status !== "unchanged") {
      if (status === "completed") {
        updates.status = "done";
        updates.status_id = statuses.find((item) => item.is_completed)?.id ?? null;
        updates.completed_at = new Date().toISOString();
      } else {
        updates.status = "todo";
        updates.status_id = statuses.find((item) => !item.is_completed)?.id ?? null;
        updates.completed_at = null;
        updates.column_id = status === "none" ? null : status.replace(/^column:/, "");
      }
    }
    if (applyDeadline) {
      if (!dueDateReason.trim()) {
        toast.error("Informe a justificativa para alterar os prazos.");
        return;
      }
      updates.due_date = dueDate ? new Date(`${dueDate}T12:00:00`).toISOString() : null;
      updates.due_time = dueDate ? dueTime || null : null;
    }
    if (Object.keys(updates).length === 0 && !applyCollaborators) {
      toast.error("Escolha ao menos um campo para alterar.");
      return;
    }

    setSaving(true);
    try {
      if (
        await onSave({
          updates,
          collaboratorIds: applyCollaborators ? collaboratorIds : undefined,
          dueDateReason: applyDeadline ? dueDateReason.trim() : undefined,
        })
      ) {
        onOpenChange(false);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !saving && onOpenChange(nextOpen)}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Editar tarefas selecionadas</DialogTitle>
          <DialogDescription>
            As alterações serão aplicadas a {taskCount} tarefa{taskCount === 1 ? "" : "s"}. Os
            vencimentos ainda previstos serão transformados em tarefas. Ative somente os campos que
            deseja substituir em todas elas.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5 py-2">
          <section className="grid gap-4 rounded-xl border p-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                <Checkbox
                  checked={applyTitle}
                  onCheckedChange={(checked) => setApplyTitle(checked === true)}
                  disabled={saving}
                />
                Alterar título
              </label>
              <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                disabled={!applyTitle || saving}
                placeholder="Novo título para todas as tarefas"
              />
            </div>
            <div className="space-y-2">
              <Label>Responsável</Label>
              <Select value={assignee} onValueChange={setAssignee} disabled={saving}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unchanged">Não alterar</SelectItem>
                  <SelectItem value="none">Sem responsável</SelectItem>
                  {profiles.map((profile) => (
                    <SelectItem key={profile.id} value={profile.id}>
                      {profile.full_name || profile.email || "Usuário"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Prioridade</Label>
              <Select value={priority} onValueChange={setPriority} disabled={saving}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unchanged">Não alterar</SelectItem>
                  <SelectItem value="none">Sem prioridade</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus} disabled={saving}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unchanged">Não alterar</SelectItem>
                  <SelectItem value="none">Sem coluna</SelectItem>
                  {columns.map((column) => (
                    <SelectItem key={column.id} value={`column:${column.id}`}>
                      {column.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="completed">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Cliente</Label>
              <Select value={client} onValueChange={setClient} disabled={saving}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unchanged">Não alterar</SelectItem>
                  <SelectItem value="none">Sem cliente</SelectItem>
                  {clients
                    .filter((item) => item.is_active)
                    .map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </section>

          <section className="space-y-3 rounded-xl border p-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
              <Checkbox
                checked={applyCollaborators}
                onCheckedChange={(checked) => setApplyCollaborators(checked === true)}
                disabled={saving}
              />
              Substituir participantes
            </label>
            <p className="text-xs text-muted-foreground">
              Ao ativar, a lista escolhida substituirá os participantes atuais de todas as tarefas.
            </p>
            {applyCollaborators && (
              <div className="grid max-h-40 gap-1 overflow-y-auto rounded-md border p-2 sm:grid-cols-2">
                {profiles.map((profile) => (
                  <label
                    key={profile.id}
                    className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted"
                  >
                    <Checkbox
                      checked={collaboratorIds.includes(profile.id)}
                      onCheckedChange={() => toggleCollaborator(profile.id)}
                      disabled={saving}
                    />
                    <span className="truncate">
                      {profile.full_name || profile.email || "Usuário"}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-3 rounded-xl border p-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
              <Checkbox
                checked={applyDeadline}
                onCheckedChange={(checked) => setApplyDeadline(checked === true)}
                disabled={saving}
              />
              Alterar prazo e horário
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Prazo</Label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  disabled={!applyDeadline || saving}
                />
              </div>
              <div className="space-y-2">
                <Label>Horário opcional</Label>
                <Input
                  type="time"
                  value={dueTime}
                  onChange={(event) => setDueTime(event.target.value)}
                  disabled={!applyDeadline || !dueDate || saving}
                />
              </div>
              {applyDeadline && (
                <div className="space-y-2 sm:col-span-2">
                  <Label>
                    Justificativa da alteração <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    value={dueDateReason}
                    onChange={(event) => setDueDateReason(event.target.value)}
                    placeholder="Explique o motivo da alteração do prazo"
                    disabled={saving}
                  />
                </div>
              )}
            </div>
          </section>

          <section className="space-y-3 rounded-xl border p-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
              <Checkbox
                checked={applyDescription}
                onCheckedChange={(checked) => setApplyDescription(checked === true)}
                disabled={saving}
              />
              Alterar descrição
            </label>
            {applyDescription ? (
              <RichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Nova descrição para todas as tarefas..."
                minHeight={100}
              />
            ) : (
              <p className="text-xs text-muted-foreground">
                As descrições atuais serão preservadas.
              </p>
            )}
          </section>
        </div>
        <DialogFooter>
          <Button variant="outline" disabled={saving} onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button disabled={saving} onClick={() => void save()}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {saving ? "Aplicando..." : "Aplicar alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ClientSection({
  client,
  logoUrl,
  subtitle,
  defaultOpen,
  actions,
  children,
}: {
  client: Client | null;
  logoUrl?: string;
  subtitle: string;
  defaultOpen: boolean;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const clientName = client?.name ?? "Sem cliente";
  const initials = clientName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 transition hover:bg-muted/40">
          <CollapsibleTrigger asChild>
            <button type="button" className="flex min-w-0 flex-1 items-center gap-3 text-left">
              <Avatar className="h-11 w-11 shrink-0 rounded-xl border bg-background">
                <AvatarImage
                  src={logoUrl}
                  alt={`Logo ${clientName}`}
                  className="object-contain p-1"
                />
                <AvatarFallback
                  className="rounded-xl text-xs font-semibold text-white"
                  style={{ backgroundColor: client?.color || "#64748b" }}
                >
                  {initials || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-semibold">{clientName}</h2>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              </div>
              {!actions && (
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
                />
              )}
            </button>
          </CollapsibleTrigger>
          {actions}
          {actions && (
            <CollapsibleTrigger asChild>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
                />
              </Button>
            </CollapsibleTrigger>
          )}
        </div>
        <CollapsibleContent>
          <div className="space-y-2 border-t bg-muted/15 p-3">{children}</div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

function OccurrenceRow({
  occurrence,
  obligation,
  task,
  client,
  assignee,
  selected,
  working,
  onSelectedChange,
  onOpenTask,
  onCreateTask,
  onComplete,
}: {
  occurrence: ObligationOccurrence;
  obligation: Obligation;
  task: Task | null;
  client: Client | null;
  assignee: Profile | null;
  selected: boolean;
  working: boolean;
  onSelectedChange: () => void;
  onOpenTask: () => void;
  onCreateTask: () => void;
  onComplete: () => void;
}) {
  const today = todayKey();
  const overdue = occurrence.due_date < today;
  const dueToday = occurrence.due_date === today;
  const taskAvailable = Boolean(task);
  const displayTitle = task?.title ?? obligation.title;
  const assigneeName = assignee?.full_name || assignee?.email || "Sem responsável";
  const initials = assignee
    ? assigneeName
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "?";
  return (
    <Card
      className={`flex flex-wrap items-center gap-3 p-3 ${selected ? "ring-2 ring-primary/30" : ""} ${overdue ? "border-destructive/40" : dueToday ? "border-amber-500/50" : ""}`}
    >
      <Checkbox
        checked={selected}
        onCheckedChange={onSelectedChange}
        aria-label={`Selecionar ${displayTitle} de ${formatDate(occurrence.due_date)}`}
      />
      <div
        className="grid h-12 w-14 shrink-0 place-items-center rounded-xl text-center text-white"
        style={{ backgroundColor: client?.color || "#64748b" }}
      >
        <span>
          <span className="block text-lg font-bold leading-none">
            {format(new Date(`${occurrence.due_date}T12:00:00`), "dd")}
          </span>
          <span className="text-[9px] font-semibold uppercase">
            {format(new Date(`${occurrence.due_date}T12:00:00`), "MMM", { locale: ptBR })}
          </span>
        </span>
      </div>
      <Avatar className="h-9 w-9 shrink-0">
        <AvatarImage src={assignee?.avatar_url || undefined} alt={assigneeName} />
        <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
      </Avatar>
      <div className="min-w-[180px] flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-medium">{displayTitle}</h3>
          {overdue ? (
            <Badge variant="destructive">Atrasada</Badge>
          ) : dueToday ? (
            <Badge className="bg-amber-500 text-white">Hoje</Badge>
          ) : taskAvailable ? (
            <Badge variant="secondary">Tarefa criada</Badge>
          ) : (
            <Badge variant="outline">Prevista</Badge>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {client?.name || "Sem cliente"} · {assigneeName} · {formatRecurrence(obligation)}
          {occurrence.due_time ? ` · ${occurrence.due_time.slice(0, 5)}` : ""}
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
        {taskAvailable ? (
          <Button variant="outline" size="sm" onClick={onOpenTask}>
            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
            Abrir tarefa
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled={working} onClick={onCreateTask}>
            {working ? (
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
            ) : (
              <Plus className="mr-1.5 h-3.5 w-3.5" />
            )}
            Criar tarefa
          </Button>
        )}
        <Button size="sm" disabled={working} onClick={onComplete}>
          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
          Concluir
        </Button>
      </div>
    </Card>
  );
}

function ObligationsCalendar({
  cursor,
  onCursorChange,
  occurrences,
  obligationById,
  clientById,
  onOccurrenceClick,
}: {
  cursor: Date;
  onCursorChange: (date: Date) => void;
  occurrences: ObligationOccurrence[];
  obligationById: Map<string, Obligation>;
  clientById: Map<string, Client>;
  onOccurrenceClick: (occurrence: ObligationOccurrence) => void;
}) {
  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 }),
        end: endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 }),
      }),
    [cursor],
  );
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onCursorChange(subMonths(cursor, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onCursorChange(addMonths(cursor, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onCursorChange(new Date())}>
            Hoje
          </Button>
        </div>
        <h3 className="font-semibold capitalize">
          {format(cursor, "MMMM yyyy", { locale: ptBR })}
        </h3>
      </div>
      <div className="grid grid-cols-7 border-b bg-muted/40 text-center text-[10px] font-medium uppercase text-muted-foreground">
        {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (
          <div key={day} className="p-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const items = occurrences.filter((occurrence) =>
            isSameDay(new Date(`${occurrence.due_date}T12:00:00`), day),
          );
          return (
            <div
              key={day.toISOString()}
              className={`min-h-28 border-b border-r p-1.5 ${isSameMonth(day, cursor) ? "" : "bg-muted/20 text-muted-foreground"}`}
            >
              <span
                className={`inline-grid h-6 min-w-6 place-items-center rounded-full text-xs ${isSameDay(day, new Date()) ? "bg-primary font-semibold text-primary-foreground" : ""}`}
              >
                {format(day, "d")}
              </span>
              <div className="mt-1 space-y-1">
                {items.slice(0, 4).map((occurrence) => {
                  const obligation = obligationById.get(occurrence.obligation_id);
                  if (!obligation) return null;
                  const client = clientById.get(obligation.client_id ?? "");
                  return (
                    <button
                      key={occurrence.id}
                      type="button"
                      onClick={() => onOccurrenceClick(occurrence)}
                      className="block w-full truncate rounded px-1.5 py-1 text-left text-[10px] font-medium text-white shadow-sm hover:brightness-105"
                      style={{ backgroundColor: client?.color || "#64748b" }}
                      title={obligation.title}
                    >
                      {obligation.title}
                    </button>
                  );
                })}
                {items.length > 4 ? (
                  <span className="block text-[10px] font-medium text-primary">
                    +{items.length - 4} mais
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="grid place-items-center px-6 py-16 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Settings2 className="h-6 w-6" />
      </span>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}

function formatDate(value: string) {
  return format(new Date(`${value.slice(0, 10)}T12:00:00`), "dd/MM/yyyy");
}

function formatRecurrence(obligation: Obligation) {
  if (obligation.frequency === "daily")
    return obligation.interval_count === 1
      ? obligation.business_days_only
        ? "Todos os dias úteis"
        : "Todos os dias"
      : `A cada ${obligation.interval_count} dias`;
  if (obligation.frequency === "weekly") {
    const labels = ["", "seg", "ter", "qua", "qui", "sex", "sáb", "dom"];
    return `${obligation.interval_count === 1 ? "Semanal" : `A cada ${obligation.interval_count} semanas`} · ${obligation.days_of_week.map((day) => labels[day]).join(", ")}`;
  }
  if (obligation.month_rule === "last_day")
    return obligation.interval_count === 1
      ? "Último dia do mês"
      : `Último dia a cada ${obligation.interval_count} meses`;
  if (obligation.month_rule === "last_business_day")
    return obligation.interval_count === 1
      ? "Último dia útil do mês"
      : `Último dia útil a cada ${obligation.interval_count} meses`;
  return `${obligation.interval_count === 1 ? "Mensal" : `A cada ${obligation.interval_count} meses`} · dia${obligation.days_of_month.length > 1 ? "s" : ""} ${obligation.days_of_month.join(" e ")}`;
}

function deleteDialogTitle(target: DeleteTarget | null) {
  if (target?.scope === "occurrences") return "Excluir os vencimentos selecionados?";
  if (target?.scope === "series") return "Excluir toda esta obrigação?";
  if (target?.scope === "series-batch") {
    return target.obligations.length === 1
      ? "Excluir a obrigação inteira?"
      : "Excluir as obrigações inteiras?";
  }
  if (target?.scope === "all") return "Excluir todas as obrigações?";
  return "Excluir obrigação?";
}

function deleteDialogDescription(target: DeleteTarget | null) {
  if (target?.scope === "occurrences") {
    return `${target.occurrences.length} vencimento(s) selecionado(s) serão removidos. Os demais vencimentos das séries continuarão normalmente.`;
  }
  if (target?.scope === "series") {
    return `A obrigação “${target.obligation.title}” e todos os vencimentos dela serão excluídos. Tarefas que já foram geradas serão preservadas.`;
  }
  if (target?.scope === "series-batch") {
    return target.obligations.length === 1
      ? `A obrigação “${target.obligations[0].title}” e todos os vencimentos dela serão excluídos. Tarefas que já foram geradas serão preservadas.`
      : `${target.obligations.length} obrigações envolvidas na seleção e todos os vencimentos delas serão excluídos. Tarefas que já foram geradas serão preservadas.`;
  }
  return "Todas as obrigações e seus vencimentos serão excluídos deste ambiente. Tarefas que já foram geradas serão preservadas.";
}
