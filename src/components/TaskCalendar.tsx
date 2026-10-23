import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  pointerWithin,
  rectIntersection,
  type CollisionDetection,
  type DragEndEvent,
  type KeyboardCoordinateGetter,
} from "@dnd-kit/core";
import { useQueryClient } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import {
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { Check, CheckCircle2, ChevronLeft, ChevronRight, Plus, Pin } from "lucide-react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { usePersonalTaskPins } from "@/hooks/use-task-card-activity";
import { pendingPersonalPriorities } from "@/lib/task-card-activity";
import { CalendarTaskPin } from "@/components/CalendarTaskPin";
import { CalendarOccasionMarkers } from "@/components/CalendarOccasionMarkers";
import { calendarOccasionsForDay } from "@/lib/calendar-occasions";
import { useClientImportantDates } from "@/hooks/use-client-important-dates";
import { CalendarSubtaskItem, CalendarTaskGroup } from "@/components/CalendarTaskGroup";
import { calendarTaskEntriesForDay, completedPersonalSubtaskEntriesForDay } from "@/lib/calendar-task-entries";
import { completedSubtasksForUser, openSubtaskTaskIdsForUser } from "@/lib/task-participation";
import { useCalendarSubtasks } from "@/hooks/use-calendar-subtasks";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { taskEditError } from "@/lib/task-edit";
import { calendarCompletionDecision } from "@/lib/calendar-task-completion";
import { CompletionDateDialog } from "@/components/CompletionDateDialog";
import { updateTaskWithOfflineSupport } from "@/lib/offline-task-mutations";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { queueCalendarTaskReschedule } from "@/lib/calendar-task-reschedule";
import { isOffline } from "@/lib/offline-sync";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import {
  useTasks,
  useClients,
  useColumns,
  useSubtasks,
  useTaskCollaborators,
  useProfiles,
  useTaskStatuses,
  type Task,
  type Profile,
} from "@/hooks/use-data";
import { useAuth } from "@/hooks/use-auth";
import { hasMarketingTaskExperience } from "@/lib/environment-access";
import { useTeamTaskVisibility } from "@/hooks/use-team-task-visibility";
import { defaultsToOwnAssignee, defaultsToOwnScope, teamSubtaskAssigneeTaskIds } from "@/lib/team-task-visibility";
import { TaskFilters, applyTaskFilters, type TaskFilterValue } from "@/components/TaskFilters";
import { WorkspaceTaskFilter } from "@/components/WorkspaceTaskFilter";
import { TaskDialog } from "@/components/TaskDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { normalizeTasksWithOpenSubtasks } from "@/lib/task-utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CalendarPage({ clientCalendar = false, clientId }: { clientCalendar?: boolean; clientId?: string } = {}) {
  const teamVisibilityWorkspaceId = useTeamTaskVisibility();
  const { user, isCollaborator, isClient, activeWorkspace, workspaces } = useAuth();
  const queryClient = useQueryClient();
  const [viewFilters, setFilters] = useState<TaskFilterValue>(() =>
    clientCalendar ? {} : defaultsToOwnScope(user?.id)
      ? { scope: "mine" }
      : defaultsToOwnAssignee(user?.id, teamVisibilityWorkspaceId)
        ? { assignee: user!.id }
        : {},
  );
  const filters = useMemo<TaskFilterValue>(() => clientCalendar
    ? { ...viewFilters, client: clientId, clients: undefined }
    : viewFilters, [clientCalendar, clientId, viewFilters]);
  // O calendário acompanha o ambiente escolhido no filtro sem trocar o
  // ambiente ativo da sessão administrativa.
  const viewedWorkspaceId = filters.workspace;
  const marketingCalendar = hasMarketingTaskExperience(
    (workspaces.find((workspace) => workspace.id === (viewedWorkspaceId ?? activeWorkspace?.id)) ?? activeWorkspace)?.slug,
    user?.email,
  );
  const { enabled: savedShowSubtasks, setEnabled: setShowSubtasks } = useCalendarSubtasks(viewedWorkspaceId ?? activeWorkspace?.id);
  const showSubtasks = !clientCalendar && savedShowSubtasks;
  const { data: tasks = [] } = useTasks(viewedWorkspaceId);
  const { data: clients = [] } = useClients(viewedWorkspaceId);
  const clientAvailable = !clientCalendar || !clientId || clients.some(client => client.id === clientId);
  const { data: importantDates = [] } = useClientImportantDates(viewedWorkspaceId);
  const clientNames = useMemo(() => new Map(clients.map((client) => [client.id, client.name])), [clients]);
  const { data: columns = [] } = useColumns(viewedWorkspaceId);
  const { data: subtasks = [], isLoading: subtasksLoading, isError: subtasksError } = useSubtasks();
  const subtasksByTaskId = useMemo(() => {
    const map = new Map<string, typeof subtasks>();
    for (const subtask of subtasks) {
      const group = map.get(subtask.task_id) ?? [];
      group.push(subtask);
      map.set(subtask.task_id, group);
    }
    for (const group of map.values()) group.sort((first, second) => first.position - second.position);
    return map;
  }, [subtasks]);
  const { data: statuses = [] } = useTaskStatuses(viewedWorkspaceId);
  const { data: profiles = [] } = useProfiles();
  const { data: collaborators = [] } = useTaskCollaborators();
  const [cursor, setCursor] = useState(new Date());
  const [calendarView, setCalendarView] = useState<"week" | "month">("month");
  const didApplyDefaultAssignee = useRef(false);
  const [open, setOpen] = useState(false);
  const [newTaskDay, setNewTaskDay] = useState<string | undefined>();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [quickCreateDay, setQuickCreateDay] = useState<string | null>(null);
  const [quickCreateTitle, setQuickCreateTitle] = useState("");
  const [quickCreating, setQuickCreating] = useState(false);
  const [pendingQuickTaskId, setPendingQuickTaskId] = useState<string | null>(null);
  const quickCreatingRef = useRef(false);
  const { pins, setPinned, canPin } = usePersonalTaskPins();
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  const pinnedIds = useMemo(() => new Set(pins.filter(pin => pin.is_pinned).map(pin => pin.task_id)), [pins]);
  const [edit, setEdit] = useState<Task | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [dayListOpen, setDayListOpen] = useState(false);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [reschedule, setReschedule] = useState<{ task: Task; date: string } | null>(null);
  const [completionTask, setCompletionTask] = useState<Task | null>(null);
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);
  const completingTask = useRef(false);
  const [reason, setReason] = useState("");
  const [savingDate, setSavingDate] = useState(false);
  const submittingDate = useRef(false);
  // Cross-workspace administrative previews are read-only. Switching the active
  // workspace still allows rescheduling in either environment as usual.
  const canReschedule = Boolean(
    user && !isClient && clientAvailable && (!viewedWorkspaceId || viewedWorkspaceId === activeWorkspace?.id),
  );
  const canComplete = canReschedule && !subtasksLoading && !subtasksError;
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: calendarKeyboardCoordinates }),
  );

  useEffect(() => {
    setDraggedTask(null);
    setReschedule(null);
    setReason("");
    setCompletionTask(null);
  }, [activeWorkspace?.id, viewedWorkspaceId]);

  const finishDrag = ({ active, over }: DragEndEvent) => {
    setDraggedTask(null);
    if (!canReschedule || reschedule || savingDate) return;
    const task = tasks.find((item) => item.id === active.data.current?.taskId);
    const date = over?.data.current?.date as string | undefined;
    if (!task?.due_date || !date || format(new Date(task.due_date), "yyyy-MM-dd") === date) return;
    setReason("");
    setReschedule({ task, date });
  };

  const cancelReschedule = () => {
    if (submittingDate.current) return;
    setReschedule(null);
    setReason("");
  };

  const confirmReschedule = async () => {
    if (!reschedule || !user || submittingDate.current) return;
    if (!reason.trim()) {
      toast.error("Informe a justificativa para alterar o prazo da tarefa.");
      return;
    }
    const task = tasks.find((item) => item.id === reschedule.task.id);
    if (
      !canReschedule ||
      !task ||
      task.deleted_at ||
      task.archived_at ||
      task.due_date !== reschedule.task.due_date
    ) {
      toast.error("A tarefa foi atualizada. Arraste novamente para alterar o prazo.");
      cancelReschedule();
      return;
    }
    submittingDate.current = true;
    setSavingDate(true);
    try {
      await queueCalendarTaskReschedule({
        userId: user.id,
        task,
        date: reschedule.date,
        reason,
        queryClient,
      });
      setReschedule(null);
      setReason("");
      toast.success(
        isOffline()
          ? "Prazo salvo neste aparelho. Será sincronizado ao reconectar."
          : "Alteração de prazo salva. Sincronizando com o servidor.",
      );
      void queryClient.invalidateQueries({ queryKey: ["task_due_date_changes", task.id] });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Não foi possível salvar a alteração de prazo.",
      );
    } finally {
      submittingDate.current = false;
      setSavingDate(false);
    }
  };

  useEffect(() => {
    if (!user?.id || clientCalendar) return;
    if (defaultsToOwnScope(user.id)) {
      if (!didApplyDefaultAssignee.current) {
        setFilters((current) => ({ ...current, scope: current.scope ?? "mine" }));
        didApplyDefaultAssignee.current = true;
      }
      return;
    }
    if (isCollaborator && !defaultsToOwnAssignee(user.id, teamVisibilityWorkspaceId)) {
      if (!teamVisibilityWorkspaceId) {
        didApplyDefaultAssignee.current = false;
        setFilters((current) => (current.assignee ? { ...current, assignee: undefined } : current));
      }
      return;
    }
    if (didApplyDefaultAssignee.current) return;
    setFilters((current) => ({ ...current, assignee: current.assignee ?? user.id }));
    didApplyDefaultAssignee.current = true;
  }, [user?.id, isCollaborator, teamVisibilityWorkspaceId, clientCalendar]);

  const days = useMemo(() => {
    const start =
      calendarView === "week"
        ? startOfWeek(cursor, { weekStartsOn: 1 })
        : startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 });
    const end =
      calendarView === "week"
        ? endOfWeek(cursor, { weekStartsOn: 1 })
        : endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [calendarView, cursor]);

  const calendarLabel = useMemo(() => {
    if (calendarView === "month") return format(cursor, "MMMM yyyy", { locale: ptBR });
    const start = startOfWeek(cursor, { weekStartsOn: 1 });
    const end = endOfWeek(cursor, { weekStartsOn: 1 });
    return `${format(start, "d 'de' MMM", { locale: ptBR })} a ${format(end, "d 'de' MMM", { locale: ptBR })}`;
  }, [calendarView, cursor]);

  const moveCursor = (direction: -1 | 1) => {
    setCursor((current) =>
      calendarView === "week"
        ? direction === -1
          ? subWeeks(current, 1)
          : addWeeks(current, 1)
        : direction === -1
          ? subMonths(current, 1)
          : addMonths(current, 1),
    );
  };

  const subtaskAssigneeTaskIds = useMemo(
    () => openSubtaskTaskIdsForUser(subtasks, user?.id),
    [subtasks, user?.id],
  );

  const subtaskAssigneeTaskIdsByUser = useMemo(
    () => teamSubtaskAssigneeTaskIds(subtasks, tasks, teamVisibilityWorkspaceId),
    [subtasks, tasks, teamVisibilityWorkspaceId],
  );

  const collaboratorTaskIds = useMemo(
    () =>
      new Set(
        collaborators
          .filter((collaborator) => collaborator.collaborator_id === user?.id)
          .map((collaborator) => collaborator.task_id),
      ),
    [collaborators, user?.id],
  );

  const openSubtaskTaskIds = useMemo(
    () => new Set(subtasks.filter((subtask) => !subtask.done).map((subtask) => subtask.task_id)),
    [subtasks],
  );
  const openStatusId = useMemo(
    () => statuses.find((status) => !status.is_completed)?.id ?? null,
    [statuses],
  );
  const completedStatusId = useMemo(
    () => statuses.find((status) => status.is_completed)?.id ?? null,
    [statuses],
  );
  const taskView = useMemo(
    () => normalizeTasksWithOpenSubtasks(tasks, openSubtaskTaskIds, openStatusId),
    [tasks, openSubtaskTaskIds, openStatusId],
  );

  const visible = useMemo(
    () =>
      applyTaskFilters(clientCalendar ? taskView.filter(task => task.client_id && clients.some(client => client.id === task.client_id)) : taskView, filters, {
        userId: user?.id ?? null,
        subtaskAssigneeTaskIds,
        collaboratorTaskIds,
        subtaskAssigneeTaskIdsByUser,
        restrictToCurrentUserParticipation: isCollaborator,
        teamVisibilityWorkspaceId,
      }),
    [
      taskView,
      filters,
      user?.id,
      isCollaborator,
      teamVisibilityWorkspaceId,
      subtaskAssigneeTaskIds,
      collaboratorTaskIds,
      subtaskAssigneeTaskIdsByUser,
      clientCalendar,
      clients,
    ],
  );

  const stageNameByTaskId = useMemo(() => {
    const columnsById = new Map(columns.map((column) => [column.id, column]));
    const statusesById = new Map(statuses.map((status) => [status.id, status]));
    return new Map(
      taskView.map((task) => [
        task.id,
        columnsById.get(task.column_id ?? "")?.name ||
          statusesById.get(task.status_id ?? "")?.name ||
          "A fazer",
      ]),
    );
  }, [columns, statuses, taskView]);

  const statusById = useMemo(
    () => new Map(statuses.map((status) => [status.id, status])),
    [statuses],
  );
  const profileById = useMemo(
    () => new Map(profiles.map((profile) => [profile.id, profile])),
    [profiles],
  );
  const clientById = useMemo(
    () => new Map(clients.map((client) => [client.id, client])),
    [clients],
  );

  const personalCompletedSubtasks = useMemo(() => {
    if (!user?.id || clientCalendar) return [];
    return completedSubtasksForUser(tasks, subtasks, user.id, viewedWorkspaceId)
      .filter(({ subtask, parent }) => {
        const displayDate = subtask.due_date ?? subtask.completed_at ?? parent.due_date;
        if (!displayDate) return false;
        const calendarSubtask = {
          ...parent,
          id: subtask.id,
          assignee_id: user.id,
          due_date: displayDate,
          status: "done" as const,
          completed_at: subtask.completed_at ?? displayDate,
        };
        return applyTaskFilters([calendarSubtask], filters, {
          userId: user.id,
          restrictToCurrentUserParticipation: isCollaborator,
        }).length > 0;
      });
  }, [tasks, subtasks, user?.id, viewedWorkspaceId, filters, isCollaborator, clientCalendar]);

  const pendingPinnedIds = new Set(pendingPersonalPriorities(taskView, pins).map(task => task.id));
  const dayEntries = (day: Date) => {
    const date = format(day, "yyyy-MM-dd");
    const regularEntries = calendarTaskEntriesForDay(
      visible.filter((task) => !showPinnedOnly || pendingPinnedIds.has(task.id)),
      subtasksByTaskId,
      date,
      showSubtasks,
    );
    const displayedSubtaskIds = new Set(
      regularEntries.flatMap((entry) =>
        entry.kind === "subtask" ? [entry.subtask.id] : entry.subtasks.map((subtask) => subtask.id),
      ),
    );
    const completedEntries = showPinnedOnly
      ? []
      : completedPersonalSubtaskEntriesForDay(personalCompletedSubtasks, date).filter(
          (entry) => entry.kind === "subtask" && !displayedSubtaskIds.has(entry.subtask.id),
        );
    return [...regularEntries, ...completedEntries].sort(
      (a, b) => Number(pinnedIds.has(b.task.id)) - Number(pinnedIds.has(a.task.id)),
    );
  };
  const createOnDay = (day: Date) => {
    if (quickCreatingRef.current) return;
    if (marketingCalendar) {
      setQuickCreateDay(format(day, "yyyy-MM-dd"));
      setQuickCreateTitle("");
      return;
    }
    setNewTaskDay(format(day, "yyyy-MM-dd"));
    setNewTaskTitle("");
    setEdit(null);
    setOpen(true);
  };

  const createQuickTask = async () => {
    const title = quickCreateTitle.trim();
    const day = quickCreateDay;
    if (!title || !day || !user || quickCreatingRef.current) return;
    if (isOffline()) {
      setNewTaskDay(day);
      setNewTaskTitle(title);
      setEdit(null);
      setQuickCreateDay(null);
      setQuickCreateTitle("");
      setOpen(true);
      return;
    }
    const workspaceId = viewedWorkspaceId || activeWorkspace?.id;
    if (!workspaceId) {
      toast.error("Selecione o ambiente antes de criar a tarefa.");
      return;
    }
    quickCreatingRef.current = true;
    setQuickCreating(true);
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const taskQueryKey = ["tasks", user.id, activeWorkspace?.id ?? null, viewedWorkspaceId ?? null] as const;
    const optimisticTask: Task = {
      id,
      title,
      description: null,
      status: "todo",
      status_id: statuses.find((status) => !status.is_completed)?.id ?? null,
      priority: "medium",
      due_date: new Date(`${day}T12:00:00`).toISOString(),
      due_time: null,
      assignee_id: user.id,
      assigned_by: null,
      assigned_at: null,
      client_id: clientCalendar ? clientId ?? null : null,
      column_id: null,
      position: 0,
      color: null,
      completed_at: null,
      created_by: user.id,
      tag_id: null,
      objective_id: null,
      deleted_at: null,
      deleted_by: null,
      archived_at: null,
      archived_reason: null,
      created_at: now,
      updated_at: now,
      card_width: null,
      workspace_id: workspaceId,
      is_draft: false,
    };
    try {
      await queryClient.cancelQueries({ queryKey: taskQueryKey });
      queryClient.setQueryData<Task[]>(taskQueryKey, (current = []) => [optimisticTask, ...current]);
      setPendingQuickTaskId(id);
      setQuickCreateDay(null);
      setQuickCreateTitle("");
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token || session.user.id !== user.id) throw new Error("Sua sessão expirou. Entre novamente para criar a tarefa.");
      const url = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
      if (!url || !key) throw new Error("A conexão com o Supabase não está configurada.");
      const client = createClient<Database>(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { headers: { Authorization: `Bearer ${session.access_token}` } },
      });
      const { data: saved, error } = await client.from("tasks").insert({
        id,
        title,
        due_date: optimisticTask.due_date,
        workspace_id: workspaceId,
        created_by: user.id,
        assignee_id: user.id,
        client_id: clientCalendar ? clientId ?? null : null,
        status: "todo",
        status_id: optimisticTask.status_id,
        priority: "medium",
        is_draft: false,
      }).select("*").single();
      if (error) throw error;
      if (!saved) throw new Error("Não foi possível carregar a tarefa criada.");
      queryClient.setQueryData<Task[]>(taskQueryKey, (current = []) =>
        current.some((task) => task.id === id)
          ? current.map((task) => task.id === id ? saved as Task : task)
          : [saved as Task, ...current],
      );
      void queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setEdit(saved as Task);
      setOpen(true);
    } catch (error) {
      queryClient.setQueryData<Task[]>(taskQueryKey, (current = []) =>
        current.filter((task) => task.id !== id),
      );
      setQuickCreateDay(day);
      setQuickCreateTitle(title);
      toast.error(error instanceof Error ? error.message : "Não foi possível criar a tarefa.");
    } finally {
      quickCreatingRef.current = false;
      setQuickCreating(false);
      setPendingQuickTaskId(null);
    }
  };

  const completeTask = async (selectedTask: Task, completionDate: string) => {
    if (!user || completingTask.current) return;
    const latestTask = tasks.find((task) => task.id === selectedTask.id);
    const today = format(new Date(), "yyyy-MM-dd");
    if (!canComplete || !latestTask || latestTask.deleted_at || latestTask.archived_at) {
      toast.error("Esta tarefa não está disponível para conclusão neste ambiente.");
      setCompletionTask(null);
      return;
    }
    const decision = calendarCompletionDecision(latestTask, openSubtaskTaskIds.has(latestTask.id), today);
    if (decision === "already-completed") {
      setCompletionTask(null);
      return;
    }
    if (decision === "draft" || decision === "pending-subtasks") {
      toast.error(decision === "draft"
        ? "Finalize a tarefa em elaboração antes de concluí-la."
        : "Conclua as subtarefas pendentes antes de concluir esta tarefa.");
      setCompletionTask(null);
      return;
    }
    if (!completionDate || completionDate > today) {
      toast.error("Informe uma data de conclusão válida.");
      return;
    }
    completingTask.current = true;
    setCompletingTaskId(latestTask.id);
    try {
      const { queued } = await updateTaskWithOfflineSupport({
        userId: user.id,
        task: latestTask,
        patch: {
          status: "done",
          status_id: completedStatusId ?? latestTask.status_id,
          completed_at: new Date(`${completionDate}T12:00:00`).toISOString(),
        },
        queryClient,
      });
      setCompletionTask(null);
      toast.success(queued
        ? "Tarefa concluída neste aparelho. Será sincronizada ao reconectar."
        : "Tarefa concluída");
      if (!queued) void queryClient.invalidateQueries({ queryKey: ["tasks"] });
    } catch (error) {
      toast.error(taskEditError(error, "Não foi possível concluir a tarefa."));
    } finally {
      completingTask.current = false;
      setCompletingTaskId(null);
    }
  };

  const startCompletion = (task: Task) => {
    if (!canComplete || completingTask.current) return;
    const latestTask = tasks.find((item) => item.id === task.id);
    if (!latestTask) return;
    const decision = calendarCompletionDecision(
      latestTask,
      openSubtaskTaskIds.has(latestTask.id),
      format(new Date(), "yyyy-MM-dd"),
    );
    if (decision === "draft" || decision === "pending-subtasks") {
      toast.error(decision === "draft"
        ? "Finalize a tarefa em elaboração antes de concluí-la."
        : "Conclua as subtarefas pendentes antes de concluir esta tarefa.");
      return;
    }
    if (decision === "already-completed") return;
    if (decision === "choose-date") {
      setCompletionTask(latestTask);
      return;
    }
    void completeTask(latestTask, format(new Date(), "yyyy-MM-dd"));
  };

  const selectedDayEntries = selectedDay ? dayEntries(selectedDay) : [];

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium capitalize">{calendarLabel}</span>
          <div className="flex gap-1">
            <Button size="icon" variant="outline" onClick={() => moveCursor(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={() => moveCursor(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" onClick={() => setCursor(new Date())}>
              Hoje
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {!clientCalendar && canPin && <Button size="sm" variant={showPinnedOnly ? "secondary" : "outline"} aria-pressed={showPinnedOnly}
            title="Mostrar somente tarefas fixadas no período do calendário"
            onClick={() => setShowPinnedOnly(current => !current)}><Pin className="mr-1 h-3.5 w-3.5" />Fixadas</Button>}
          <div
            className="flex rounded-md border bg-muted/30 p-0.5"
            role="group"
            aria-label="Visão do calendário"
          >
            <Button
              size="sm"
              variant={calendarView === "week" ? "secondary" : "ghost"}
              className="h-7 px-2.5 text-xs"
              onClick={() => setCalendarView("week")}
            >
              Semana
            </Button>
            <Button
              size="sm"
              variant={calendarView === "month" ? "secondary" : "ghost"}
              className="h-7 px-2.5 text-xs"
              onClick={() => setCalendarView("month")}
            >
              Mês
            </Button>
          </div>
          <Button
            disabled={!clientAvailable}
            onClick={() => {
              setNewTaskDay(undefined);
              setEdit(null);
              setOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Tarefa
          </Button>
        </div>
      </header>
      {!clientCalendar && <TaskFilters
        filters={filters}
        onChange={setFilters}
        hideAssignee={isCollaborator && !teamVisibilityWorkspaceId}
        extraActiveChips={showSubtasks ? [{ key: "calendar-subtasks", label: "Subtarefas", clear: () => setShowSubtasks(false) }] : []}
        sections={{
          visualization: <label className="flex cursor-pointer items-center gap-2 rounded-md border bg-background px-2.5 py-1.5 text-xs" htmlFor="calendar-show-subtasks"><Checkbox id="calendar-show-subtasks" checked={showSubtasks} onCheckedChange={checked => setShowSubtasks(checked === true)} />Subtarefas</label>,
          category: workspaces.length > 1 ? (
            <WorkspaceTaskFilter
              value={filters.workspace}
              onChange={(workspace) => setFilters({ ...filters, workspace })}
            />
          ) : undefined,
        }}
      />}

      {clientCalendar && <p className="text-xs text-muted-foreground sm:hidden">Deslize o calendário para os lados para ler os títulos.</p>}
      <DndContext
        sensors={sensors}
        collisionDetection={calendarCollisionDetection}
        onDragStart={({ active }) =>
          setDraggedTask(tasks.find((task) => task.id === active.data.current?.taskId) ?? null)
        }
        onDragCancel={() => setDraggedTask(null)}
        onDragEnd={finishDrag}
      >
        <div className={`${showSubtasks || clientCalendar ? "overflow-x-auto" : "overflow-hidden"} rounded-lg border bg-card`}>
          <div className={clientCalendar ? "min-w-[42rem]" : showSubtasks ? "min-w-[56rem]" : undefined}>
          <div className="grid grid-cols-7 border-b bg-muted/40 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d) => (
              <div key={d} className="p-2 text-center">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day) => {
              const inMonth = calendarView === "week" || isSameMonth(day, cursor);
              const today = isSameDay(day, new Date());
              const entries = dayEntries(day);
              const selectedClientIds = filters.clients?.length ? filters.clients : filters.client ? [filters.client] : null;
              const visibleDates = selectedClientIds
                ? importantDates.filter((date) => selectedClientIds.includes(date.client_id))
                : importantDates;
              return (
                <CalendarDay
                  key={day.toISOString()}
                  day={day}
                  onCreate={canReschedule ? () => createOnDay(day) : undefined}
                  clickToCreate={marketingCalendar}
                  disabled={!canReschedule || Boolean(reschedule) || savingDate}
                  className={`${calendarView === "week" ? "min-h-[26rem]" : "min-h-28"} border-b border-r p-2 ${inMonth ? "" : "bg-muted/20 text-muted-foreground"}`}
                >
                  <div className="mb-1 flex min-w-0 flex-wrap items-center gap-1">
                    <div
                      className={`inline-grid h-6 min-w-6 shrink-0 place-items-center rounded-full text-xs ${today ? "bg-primary text-primary-foreground font-semibold" : ""}`}
                    >
                      {format(day, "d")}
                    </div>
                    <CalendarOccasionMarkers occasions={calendarOccasionsForDay(day, visibleDates, clientNames)} />
                    {marketingCalendar && canReschedule && <button type="button" className="ml-auto grid h-6 w-6 place-items-center rounded text-muted-foreground hover:bg-primary/10 hover:text-primary" title={`Criar tarefa em ${format(day, "dd/MM/yyyy")}`} aria-label={`Criar tarefa em ${format(day, "dd/MM/yyyy")}`} onClick={() => createOnDay(day)}><Plus className="h-3.5 w-3.5" /></button>}
                  </div>
                  {marketingCalendar && quickCreateDay === format(day, "yyyy-MM-dd") && (
                    <input
                      autoFocus
                      value={quickCreateTitle}
                      disabled={quickCreating}
                      onChange={(event) => setQuickCreateTitle(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") { event.preventDefault(); void createQuickTask(); }
                        if (event.key === "Escape") { event.preventDefault(); setQuickCreateDay(null); setQuickCreateTitle(""); }
                      }}
                      onClick={(event) => event.stopPropagation()}
                      placeholder={quickCreating ? "Criando…" : "Nome da tarefa ↵"}
                      aria-label={`Nome da nova tarefa em ${format(day, "dd/MM/yyyy")}`}
                      className="mb-1 w-full rounded border border-primary bg-background px-2 py-1 text-xs outline-none ring-2 ring-primary/20"
                    />
                  )}
                  <div className="space-y-1">
                    {entries.slice(0, 3).map((entry) => {
                      const task = entry.task;
                      const savingQuickTask = task.id === pendingQuickTaskId;
                      const status = statusById.get(task.status_id ?? "");
                      const assignee = profileById.get(task.assignee_id ?? "") ?? null;
                      const clientColor = clientById.get(task.client_id ?? "")?.color || (marketingCalendar ? (task.client_id ? "#e2e8f0" : "#ffffff") : "#475569");
                      const onClick = () => {
                        if (savingQuickTask) return;
                        setEdit(task);
                        setOpen(true);
                      };
                      return entry.kind === "subtask" ? (
                        <CalendarSubtaskItem key={entry.subtask.id} task={task} subtask={entry.subtask} profiles={profileById} onOpen={onClick} standalone marketingStyle={marketingCalendar} />
                      ) : (
                        <CalendarTaskGroup key={task.id} task={task} subtasks={entry.subtasks} profiles={profileById} onOpen={onClick} marketingStyle={marketingCalendar}>
                        <DraggableCalendarTaskItem
                          titleOnly={clientCalendar}
                          disabled={!canReschedule || Boolean(reschedule) || savingDate || savingQuickTask}
                          task={task}
                          saving={savingQuickTask}
                          marketingStyle={marketingCalendar}
                          pinned={pinnedIds.has(task.id)}
                          onCreate={canReschedule ? () => createOnDay(day) : undefined}
                          onTogglePin={canPin && !savingQuickTask ? () => setPinned(task.id, !pinnedIds.has(task.id)) : undefined}
                          assignee={assignee}
                          statusName={status?.name ?? stageNameByTaskId.get(task.id) ?? "A fazer"}
                          completed={task.status === "done" || Boolean(status?.is_completed)}
                          statusColor={status?.color || "#64748b"}
                          backgroundColor={clientColor}
                          onClick={onClick}
                          onComplete={canComplete && !savingQuickTask && !completingTaskId && !reschedule ? () => startCompletion(task) : undefined}
                        />
                        </CalendarTaskGroup>
                      );
                    })}
                    {entries.length > 3 && (
                      <button
                        type="button"
                        className="text-[10px] font-medium text-primary hover:underline"
                        onClick={() => {
                          setSelectedDay(day);
                          setDayListOpen(true);
                        }}
                      >
                        +{entries.length - 3} mais
                      </button>
                    )}
                  </div>
                </CalendarDay>
              );
            })}
          </div>
          </div>
        </div>
        {typeof document !== "undefined" &&
          createPortal(
            <DragOverlay dropAnimation={null} className="pointer-events-none">
              {draggedTask ? (
                <CalendarTaskItem
                  titleOnly={clientCalendar}
                  task={draggedTask}
                  marketingStyle={marketingCalendar}
                  pinned={pinnedIds.has(draggedTask.id)}
                  assignee={profileById.get(draggedTask.assignee_id ?? "") ?? null}
                  statusName={statusById.get(draggedTask.status_id ?? "")?.name ?? "A fazer"}
                  completed={
                    draggedTask.status === "done" ||
                    Boolean(statusById.get(draggedTask.status_id ?? "")?.is_completed)
                  }
                  statusColor={statusById.get(draggedTask.status_id ?? "")?.color || "#64748b"}
                  backgroundColor={clientById.get(draggedTask.client_id ?? "")?.color || (marketingCalendar ? (draggedTask.client_id ? "#e2e8f0" : "#ffffff") : "#475569")}
                  onClick={() => undefined}
                />
              ) : null}
            </DragOverlay>,
            document.body,
          )}
      </DndContext>
      {clientCalendar && visible.some(task => !task.due_date) && <details className="rounded-xl border bg-card p-4">
        <summary className="cursor-pointer text-sm font-medium">Sem prazo ({visible.filter(task => !task.due_date).length})</summary>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{visible.filter(task => !task.due_date).map(task => <CalendarTaskItem key={task.id} titleOnly task={task}
          assignee={profileById.get(task.assignee_id ?? '') ?? null} statusName={statusById.get(task.status_id ?? '')?.name ?? 'A fazer'}
          completed={task.status === 'done' || Boolean(task.completed_at)} statusColor={statusById.get(task.status_id ?? '')?.color ?? '#64748b'}
          backgroundColor={clientById.get(task.client_id ?? '')?.color ?? '#475569'} onClick={() => { setEdit(task); setOpen(true); }} />)}</div>
      </details>}
      <Dialog
        open={Boolean(reschedule)}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) cancelReschedule();
        }}
      >
        <DialogContent
          className="max-w-[calc(100%-2rem)] gap-3 rounded-xl p-4 sm:max-w-sm"
          onEscapeKeyDown={(event) => {
            if (savingDate) event.preventDefault();
          }}
          onPointerDownOutside={(event) => {
            if (savingDate) event.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className="pr-6 text-base">Alterar prazo</DialogTitle>
            <DialogDescription className="space-y-1 text-xs">
              <span className="block truncate">{reschedule?.task.title}</span>
              <span className="block">
                {reschedule?.task.due_date
                  ? format(new Date(reschedule.task.due_date), "dd/MM/yyyy")
                  : ""}
                {" → "}
                {reschedule ? format(new Date(`${reschedule.date}T12:00:00`), "dd/MM/yyyy") : ""}
              </span>
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              void confirmReschedule();
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="calendar-due-date-reason" className="text-xs">
                Justificativa da alteração de prazo <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="calendar-due-date-reason"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Explique o motivo da alteração"
                className="min-h-16 text-xs"
                rows={2}
                required
                autoFocus
                disabled={savingDate}
              />
            </div>
            <DialogFooter className="flex-row justify-end gap-2 sm:space-x-0">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={cancelReschedule}
                disabled={savingDate}
              >
                Cancelar
              </Button>
              <Button type="submit" size="sm" disabled={savingDate || !reason.trim()}>
                {savingDate ? "Salvando…" : "Confirmar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={dayListOpen} onOpenChange={setDayListOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {showSubtasks ? "Tarefas e subtarefas" : "Tarefas"} de {selectedDay ? format(selectedDay, "d 'de' MMMM", { locale: ptBR }) : ""}
            </DialogTitle>
            <DialogDescription>
              {selectedDayEntries.length} item{selectedDayEntries.length === 1 ? "" : "s"} neste
              dia.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[55vh] space-y-2 overflow-y-auto pr-1">
            {selectedDayEntries.map((entry) => {
              const task = entry.task;
              const savingQuickTask = task.id === pendingQuickTaskId;
              const status = statusById.get(task.status_id ?? "");
              const assignee = profileById.get(task.assignee_id ?? "") ?? null;
              const clientColor = clientById.get(task.client_id ?? "")?.color || (marketingCalendar ? (task.client_id ? "#e2e8f0" : "#ffffff") : "#475569");
              const onClick = () => {
                if (savingQuickTask) return;
                setDayListOpen(false);
                setEdit(task);
                setOpen(true);
              };
              return entry.kind === "subtask" ? (
                <CalendarSubtaskItem key={entry.subtask.id} task={task} subtask={entry.subtask} profiles={profileById} onOpen={onClick} expanded standalone marketingStyle={marketingCalendar} />
              ) : (
                <CalendarTaskGroup key={task.id} task={task} subtasks={entry.subtasks} profiles={profileById} onOpen={onClick} expanded marketingStyle={marketingCalendar}>
                <CalendarTaskItem
                  titleOnly={clientCalendar}
                  task={task}
                  saving={savingQuickTask}
                  marketingStyle={marketingCalendar}
                  pinned={pinnedIds.has(task.id)}
                  onCreate={canReschedule && selectedDay ? () => { setDayListOpen(false); createOnDay(selectedDay); } : undefined}
                  onTogglePin={canPin ? () => setPinned(task.id, !pinnedIds.has(task.id)) : undefined}
                  assignee={assignee}
                  statusName={status?.name ?? stageNameByTaskId.get(task.id) ?? "A fazer"}
                  completed={task.status === "done" || Boolean(status?.is_completed)}
                  statusColor={status?.color || "#64748b"}
                  backgroundColor={clientColor}
                  expanded
                  onClick={onClick}
                  onComplete={canComplete && !savingQuickTask && !completingTaskId && !reschedule ? () => {
                    setDayListOpen(false);
                    startCompletion(task);
                  } : undefined}
                />
                </CalendarTaskGroup>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
      <CompletionDateDialog
        open={Boolean(completionTask)}
        onOpenChange={(nextOpen) => { if (!nextOpen && !completingTask.current) setCompletionTask(null); }}
        onConfirm={(date) => completionTask ? completeTask(completionTask, date) : undefined}
      />
      <TaskDialog open={open} onOpenChange={setOpen} task={edit} defaultWorkspaceId={viewedWorkspaceId} defaults={{ title: newTaskTitle, dueDate: newTaskDay, clientId: clientCalendar ? clientId : undefined }} />
    </div>
  );
}

function readableTextColor(color: string) {
  const hex = color.trim().replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return "#ffffff";
  const red = Number.parseInt(hex.slice(0, 2), 16);
  const green = Number.parseInt(hex.slice(2, 4), 16);
  const blue = Number.parseInt(hex.slice(4, 6), 16);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;
  return luminance > 155 ? "#172033" : "#ffffff";
}

const calendarCollisionDetection: CollisionDetection = (args) =>
  args.pointerCoordinates ? pointerWithin(args) : rectIntersection(args);

const calendarKeyboardCoordinates: KeyboardCoordinateGetter = (
  event,
  { context, currentCoordinates },
) => {
  const offset = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 }[event.code];
  if (!offset || !context.collisionRect) return undefined;
  event.preventDefault();
  const days = context.droppableContainers.getEnabled();
  const current = context.over?.id ?? `calendar-day:${context.active?.data.current?.date}`;
  const index = days.findIndex((day) => day.id === current);
  if (index < 0) return undefined;
  const target = days[index + offset];
  if (!target) return undefined;
  const rect = context.droppableRects.get(target.id);
  if (!rect) return undefined;
  return {
    x:
      currentCoordinates.x +
      rect.left +
      rect.width / 2 -
      context.collisionRect.left -
      context.collisionRect.width / 2,
    y:
      currentCoordinates.y +
      rect.top +
      rect.height / 2 -
      context.collisionRect.top -
      context.collisionRect.height / 2,
  };
};

function CalendarDay({
  day,
  onCreate,
  clickToCreate,
  disabled,
  className,
  children,
}: {
  day: Date;
  onCreate?: () => void;
  clickToCreate?: boolean;
  disabled: boolean;
  className: string;
  children: ReactNode;
}) {
  const date = format(day, "yyyy-MM-dd");
  const { setNodeRef, isOver } = useDroppable({
    id: `calendar-day:${date}`,
    data: { date },
    disabled,
  });
  const content = (
    <div
      ref={setNodeRef}
      data-calendar-date={date}
      onClick={clickToCreate && onCreate ? (event) => {
        if (!(event.target instanceof Element) || event.target.closest("button, a, input, select, textarea, [role='button']")) return;
        onCreate();
      } : undefined}
      title={clickToCreate && onCreate ? "Clique no espaço vazio para criar uma tarefa" : undefined}
      className={`${className} ${isOver ? "bg-primary/10 ring-2 ring-inset ring-primary/60" : ""}`}
    >
      {children}
    </div>
  );
  if (!onCreate) return content;
  return <ContextMenu><ContextMenuTrigger asChild>{content}</ContextMenuTrigger><ContextMenuContent><ContextMenuItem className="cursor-pointer" onSelect={onCreate}><Plus className="mr-2 h-4 w-4" />Nova tarefa</ContextMenuItem></ContextMenuContent></ContextMenu>;
}

function DraggableCalendarTaskItem({
  disabled,
  ...props
}: Parameters<typeof CalendarTaskItem>[0] & { disabled: boolean }) {
  const drag = useDraggable({
    id: `calendar-task:${props.task.id}`,
    data: {
      taskId: props.task.id,
      date: props.task.due_date ? format(new Date(props.task.due_date), "yyyy-MM-dd") : null,
    },
    disabled,
  });
  return <CalendarTaskItem {...props} drag={disabled ? undefined : drag} />;
}

function CalendarTaskItem({
  task,
  saving = false,
  marketingStyle = false,
  titleOnly = false,
  pinned = false,
  assignee,
  statusName,
  completed,
  statusColor,
  backgroundColor,
  expanded = false,
  onClick,
  onComplete,
  onCreate,
  onTogglePin,
  drag,
}: {
  task: Task;
  saving?: boolean;
  marketingStyle?: boolean;
  titleOnly?: boolean;
  pinned?: boolean;
  assignee: Profile | null;
  statusName: string;
  completed: boolean;
  statusColor: string;
  backgroundColor: string;
  expanded?: boolean;
  onClick: () => void;
  onComplete?: () => void;
  onCreate?: () => void;
  onTogglePin?: () => Promise<void>;
  drag?: ReturnType<typeof useDraggable>;
}) {
  const assigneeName = assignee?.full_name || assignee?.email || "Sem responsável";
  const initials = assignee
    ? assigneeName
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "?";
  const textColor = readableTextColor(backgroundColor);

  const [pinSaving, setPinSaving] = useState(false);
  const button = (
    <button
      type="button"
      ref={drag?.setNodeRef}
      {...drag?.attributes}
      {...drag?.listeners}
      onClick={onClick}
      aria-busy={saving}
      className={`relative flex w-full min-w-0 items-center gap-1.5 border text-left transition ${
        marketingStyle
          ? `rounded-full pl-8 pr-2 shadow-sm saturate-125 hover:-translate-y-px hover:brightness-110 hover:saturate-150 hover:shadow-md group-hover/calendar-complete:-translate-y-px group-hover/calendar-complete:brightness-110 group-hover/calendar-complete:saturate-150 group-hover/calendar-complete:shadow-md ${expanded ? "min-h-9 py-1" : "h-9 py-0"}`
          : `rounded-md shadow-sm hover:-translate-y-px hover:shadow ${expanded ? "px-2 py-2" : "px-1 py-1"}`
      } ${!marketingStyle && onComplete && !completed && !titleOnly ? "pr-7" : ""} ${marketingStyle && !task.client_id && !completed ? "border-2 border-dashed" : ""} ${drag ? "cursor-grab active:cursor-grabbing touch-manipulation" : ""} ${drag?.isDragging ? "opacity-35" : ""} ${completed ? marketingStyle ? "border-emerald-500 bg-emerald-200 text-emerald-950 ring-1 ring-emerald-400/80" : "border-emerald-500 bg-emerald-100 text-emerald-950 ring-1 ring-emerald-300/80" : marketingStyle ? "" : "hover:brightness-105"}`}
      style={
        completed
          ? undefined
          : {
              backgroundColor,
              borderColor: marketingStyle && !task.client_id ? "#94a3b8" : backgroundColor,
              color: textColor,
            }
      }
      title={`${saving ? "Salvando" : task.is_draft ? "Em elaboração" : completed ? "Concluída" : statusName} · ${assigneeName} · ${task.title}`}
    >
      {!titleOnly && pinned && !completed && <CalendarTaskPin />}
      {!titleOnly && !marketingStyle && <Avatar
        className={`${expanded ? "h-7 w-7" : "h-5 w-5"} shrink-0 border border-white/70 shadow-sm`}
      >
        <AvatarImage src={assignee?.avatar_url || undefined} alt={assigneeName} />
        <AvatarFallback
          className="bg-white/85 text-[8px] font-semibold text-slate-800"
          title={assigneeName}
        >
          {initials}
        </AvatarFallback>
      </Avatar>}
      {!titleOnly && completed ? (
        <CheckCircle2
          className={`${marketingStyle ? "absolute left-2 h-4 w-4" : expanded ? "h-4 w-4" : "h-3.5 w-3.5"} shrink-0 text-emerald-700`}
          aria-label="Tarefa concluída"
        />
      ) : null}
      <span
        className={`min-w-0 flex-1 ${marketingStyle ? "line-clamp-2 text-xs font-semibold leading-[14px]" : "truncate font-semibold"} ${expanded && !marketingStyle ? "text-sm" : !marketingStyle ? "text-[11px]" : ""} ${completed ? "line-through decoration-2 decoration-emerald-700/80" : ""}`}
      >
        {!titleOnly && task.is_draft ? "Em elaboração · " : ""}
        {task.title}
      </span>
      {!titleOnly && <span
        className={`${expanded ? "h-3 w-3" : "h-2.5 w-2.5"} shrink-0 rounded-[2px] border border-black/25 shadow-sm`}
        style={{ backgroundColor: statusColor }}
        title={`Status: ${statusName}`}
        aria-label={`Status: ${statusName}`}
      />}
      {!titleOnly && task.due_time ? (
        <span className="shrink-0 text-[9px] opacity-80">{task.due_time.slice(0, 5)}</span>
      ) : null}
    </button>
  );
  const card = !onCreate && !onTogglePin ? button : (
    <ContextMenu>
      <ContextMenuTrigger asChild onContextMenu={event => event.stopPropagation()}>{button}</ContextMenuTrigger>
      <ContextMenuContent>
        {onCreate && <ContextMenuItem className="cursor-pointer" onSelect={onCreate}><Plus className="mr-2 h-4 w-4" />Nova tarefa</ContextMenuItem>}
        {onTogglePin && <ContextMenuItem className="cursor-pointer" disabled={pinSaving || (!pinned && completed)} onSelect={() => {
          setPinSaving(true);
          void onTogglePin().catch(error => toast.error(taskEditError(error, "Não foi possível fixar a tarefa."))).finally(() => setPinSaving(false));
        }}><Pin className="mr-2 h-4 w-4" />{pinned ? "Desfixar tarefa" : "Fixar tarefa"}</ContextMenuItem>}
      </ContextMenuContent>
    </ContextMenu>
  );
  if (!onComplete || completed || titleOnly) return card;
  const completeControl = (
    <button
        type="button"
        aria-label={`Concluir tarefa ${task.title}`}
        title={marketingStyle ? undefined : "Concluir tarefa"}
        className={`${marketingStyle ? `left-1.5 h-5 w-5 border-transparent bg-transparent opacity-70 group-hover/calendar-complete:scale-110 group-hover/calendar-complete:border-emerald-600 group-hover/calendar-complete:bg-emerald-500 group-hover/calendar-complete:text-white group-hover/calendar-complete:opacity-100 group-hover/calendar-complete:shadow-md focus:border-emerald-600 focus:bg-emerald-500 focus:text-white ${textColor === "#ffffff" ? "text-white/80" : "text-slate-800/70"}` : "right-1 h-5 w-5 border-emerald-300 bg-emerald-50 text-emerald-700 opacity-0 shadow-sm hover:bg-emerald-100 group-hover/calendar-complete:opacity-100 [@media(hover:none)]:opacity-100"} absolute top-1/2 z-10 grid -translate-y-1/2 place-items-center rounded-full border transition-all focus:opacity-100`}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation();
          onComplete();
        }}
      >
        {marketingStyle ? <Check className="h-4 w-4" strokeWidth={2.5} /> : <CheckCircle2 className="h-3.5 w-3.5" />}
      </button>
  );
  return (
    <div className="group/calendar-complete relative min-w-0">
      {card}
      {marketingStyle ? <TooltipProvider delayDuration={150}><Tooltip><TooltipTrigger asChild>{completeControl}</TooltipTrigger><TooltipContent side="top" className="bg-zinc-900 text-white">Marcar a tarefa concluída</TooltipContent></Tooltip></TooltipProvider> : completeControl}
    </div>
  );
}
