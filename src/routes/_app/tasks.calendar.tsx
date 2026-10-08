import { createFileRoute } from "@tanstack/react-router";
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
import { CheckCircle2, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { queueCalendarTaskReschedule } from "@/lib/calendar-task-reschedule";
import { isOffline } from "@/lib/offline-sync";
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

export const Route = createFileRoute("/_app/tasks/calendar")({
  component: CalendarPage,
});

function CalendarPage() {
  const { user, isCollaborator, isClient, activeWorkspace, workspaces } = useAuth();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<TaskFilterValue>({});
  // O calendário acompanha o ambiente escolhido no filtro sem trocar o
  // ambiente ativo da sessão administrativa.
  const viewedWorkspaceId = filters.workspace;
  const { data: tasks = [] } = useTasks(viewedWorkspaceId);
  const { data: clients = [] } = useClients(viewedWorkspaceId);
  const { data: columns = [] } = useColumns(viewedWorkspaceId);
  const { data: subtasks = [] } = useSubtasks();
  const { data: statuses = [] } = useTaskStatuses(viewedWorkspaceId);
  const { data: profiles = [] } = useProfiles();
  const { data: collaborators = [] } = useTaskCollaborators();
  const [cursor, setCursor] = useState(new Date());
  const [calendarView, setCalendarView] = useState<"week" | "month">("month");
  const didApplyDefaultAssignee = useRef(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Task | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [dayListOpen, setDayListOpen] = useState(false);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [reschedule, setReschedule] = useState<{ task: Task; date: string } | null>(null);
  const [reason, setReason] = useState("");
  const [savingDate, setSavingDate] = useState(false);
  const submittingDate = useRef(false);
  // Cross-workspace administrative previews are read-only. Switching the active
  // workspace still allows rescheduling in either environment as usual.
  const canReschedule = Boolean(
    user && !isClient && (!viewedWorkspaceId || viewedWorkspaceId === activeWorkspace?.id),
  );
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: calendarKeyboardCoordinates }),
  );

  useEffect(() => {
    setDraggedTask(null);
    setReschedule(null);
    setReason("");
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
    if (!user?.id) return;
    if (isCollaborator) {
      setFilters((current) => (current.assignee ? { ...current, assignee: undefined } : current));
      return;
    }
    if (didApplyDefaultAssignee.current) return;
    setFilters((current) => ({ ...current, assignee: current.assignee ?? user.id }));
    didApplyDefaultAssignee.current = true;
  }, [user?.id, isCollaborator]);

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

  const subtaskAssigneeTaskIds = useMemo(() => {
    const s = new Set<string>();
    if (!user?.id) return s;
    for (const st of subtasks as any[])
      if (st.assignee_id === user.id && !st.done && st.task_id) s.add(st.task_id);
    return s;
  }, [subtasks, user?.id]);

  const subtaskAssigneeTaskIdsByUser = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const st of subtasks as any[]) {
      if (!st.assignee_id || st.done || !st.task_id) continue;
      const set = map.get(st.assignee_id) ?? new Set<string>();
      set.add(st.task_id);
      map.set(st.assignee_id, set);
    }
    return map;
  }, [subtasks]);

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
  const taskView = useMemo(
    () => normalizeTasksWithOpenSubtasks(tasks, openSubtaskTaskIds, openStatusId),
    [tasks, openSubtaskTaskIds, openStatusId],
  );

  const visible = useMemo(
    () =>
      applyTaskFilters(taskView, filters, {
        userId: user?.id ?? null,
        subtaskAssigneeTaskIds,
        collaboratorTaskIds,
        subtaskAssigneeTaskIdsByUser,
        restrictToCurrentUserParticipation: isCollaborator,
      }),
    [
      taskView,
      filters,
      user?.id,
      isCollaborator,
      subtaskAssigneeTaskIds,
      collaboratorTaskIds,
      subtaskAssigneeTaskIdsByUser,
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

  // Somente tarefas principais entram no calendário, no próprio prazo.
  // Subtarefas continuam participando dos filtros e dos detalhes da tarefa.
  const dayEntries = (day: Date) =>
    visible.filter((task) => task.due_date && isSameDay(new Date(task.due_date), day));

  const selectedDayEntries = selectedDay ? dayEntries(selectedDay) : [];

  return (
    <div className="space-y-4 p-6">
      <header className="flex items-center justify-between">
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
        <div className="flex items-center gap-2">
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
            onClick={() => {
              setEdit(null);
              setOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Tarefa
          </Button>
        </div>
      </header>
      <TaskFilters
        filters={filters}
        onChange={setFilters}
        hideAssignee={isCollaborator}
        sections={{
          category: workspaces.length > 1 ? (
            <WorkspaceTaskFilter
              value={filters.workspace}
              onChange={(workspace) => setFilters({ ...filters, workspace })}
            />
          ) : undefined,
        }}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={calendarCollisionDetection}
        onDragStart={({ active }) =>
          setDraggedTask(tasks.find((task) => task.id === active.data.current?.taskId) ?? null)
        }
        onDragCancel={() => setDraggedTask(null)}
        onDragEnd={finishDrag}
      >
        <div className="overflow-hidden rounded-lg border bg-card">
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
              return (
                <CalendarDay
                  key={day.toISOString()}
                  day={day}
                  disabled={!canReschedule || Boolean(reschedule) || savingDate}
                  className={`${calendarView === "week" ? "min-h-[26rem]" : "min-h-28"} border-b border-r p-2 ${inMonth ? "" : "bg-muted/20 text-muted-foreground"}`}
                >
                  <div
                    className={`mb-1 inline-grid h-6 min-w-6 place-items-center rounded-full text-xs ${today ? "bg-primary text-primary-foreground font-semibold" : ""}`}
                  >
                    {format(day, "d")}
                  </div>
                  <div className="space-y-1">
                    {entries.slice(0, 3).map((task) => {
                      const status = statusById.get(task.status_id ?? "");
                      const assignee = profileById.get(task.assignee_id ?? "") ?? null;
                      const clientColor = clientById.get(task.client_id ?? "")?.color || "#475569";
                      const onClick = () => {
                        setEdit(task);
                        setOpen(true);
                      };
                      return (
                        <DraggableCalendarTaskItem
                          key={task.id}
                          disabled={!canReschedule || Boolean(reschedule) || savingDate}
                          task={task}
                          assignee={assignee}
                          statusName={status?.name ?? stageNameByTaskId.get(task.id) ?? "A fazer"}
                          completed={task.status === "done" || Boolean(status?.is_completed)}
                          statusColor={status?.color || "#64748b"}
                          backgroundColor={clientColor}
                          onClick={onClick}
                        />
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
        {typeof document !== "undefined" &&
          createPortal(
            <DragOverlay dropAnimation={null} className="pointer-events-none">
              {draggedTask ? (
                <CalendarTaskItem
                  task={draggedTask}
                  assignee={profileById.get(draggedTask.assignee_id ?? "") ?? null}
                  statusName={statusById.get(draggedTask.status_id ?? "")?.name ?? "A fazer"}
                  completed={
                    draggedTask.status === "done" ||
                    Boolean(statusById.get(draggedTask.status_id ?? "")?.is_completed)
                  }
                  statusColor={statusById.get(draggedTask.status_id ?? "")?.color || "#64748b"}
                  backgroundColor={clientById.get(draggedTask.client_id ?? "")?.color || "#475569"}
                  onClick={() => undefined}
                />
              ) : null}
            </DragOverlay>,
            document.body,
          )}
      </DndContext>
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
              Tarefas de {selectedDay ? format(selectedDay, "d 'de' MMMM", { locale: ptBR }) : ""}
            </DialogTitle>
            <DialogDescription>
              {selectedDayEntries.length} tarefa{selectedDayEntries.length === 1 ? "" : "s"} neste
              dia.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[55vh] space-y-2 overflow-y-auto pr-1">
            {selectedDayEntries.map((task) => {
              const status = statusById.get(task.status_id ?? "");
              const assignee = profileById.get(task.assignee_id ?? "") ?? null;
              const clientColor = clientById.get(task.client_id ?? "")?.color || "#475569";
              const onClick = () => {
                setDayListOpen(false);
                setEdit(task);
                setOpen(true);
              };
              return (
                <CalendarTaskItem
                  key={task.id}
                  task={task}
                  assignee={assignee}
                  statusName={status?.name ?? stageNameByTaskId.get(task.id) ?? "A fazer"}
                  completed={task.status === "done" || Boolean(status?.is_completed)}
                  statusColor={status?.color || "#64748b"}
                  backgroundColor={clientColor}
                  expanded
                  onClick={onClick}
                />
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
      <TaskDialog open={open} onOpenChange={setOpen} task={edit} />
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
  disabled,
  className,
  children,
}: {
  day: Date;
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
  return (
    <div
      ref={setNodeRef}
      data-calendar-date={date}
      className={`${className} ${isOver ? "bg-primary/10 ring-2 ring-inset ring-primary/60" : ""}`}
    >
      {children}
    </div>
  );
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
  assignee,
  statusName,
  completed,
  statusColor,
  backgroundColor,
  expanded = false,
  onClick,
  drag,
}: {
  task: Task;
  assignee: Profile | null;
  statusName: string;
  completed: boolean;
  statusColor: string;
  backgroundColor: string;
  expanded?: boolean;
  onClick: () => void;
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

  return (
    <button
      type="button"
      ref={drag?.setNodeRef}
      {...drag?.attributes}
      {...drag?.listeners}
      onClick={onClick}
      className={`flex w-full min-w-0 items-center gap-1.5 rounded-md border text-left shadow-sm transition hover:-translate-y-px hover:shadow ${
        expanded ? "px-2 py-2" : "px-1 py-1"
      } ${drag ? "cursor-grab active:cursor-grabbing touch-manipulation" : ""} ${drag?.isDragging ? "opacity-35" : ""} ${completed ? "border-emerald-500 bg-emerald-100 text-emerald-950 ring-1 ring-emerald-300/80" : "hover:brightness-105"}`}
      style={
        completed
          ? undefined
          : {
              backgroundColor,
              borderColor: backgroundColor,
              color: textColor,
            }
      }
      title={`${task.is_draft ? "Em elaboração" : completed ? "Concluída" : statusName} · ${assigneeName} · ${task.title}`}
    >
      <Avatar
        className={`${expanded ? "h-7 w-7" : "h-5 w-5"} shrink-0 border border-white/70 shadow-sm`}
      >
        <AvatarImage src={assignee?.avatar_url || undefined} alt={assigneeName} />
        <AvatarFallback
          className="bg-white/85 text-[8px] font-semibold text-slate-800"
          title={assigneeName}
        >
          {initials}
        </AvatarFallback>
      </Avatar>
      {completed ? (
        <CheckCircle2
          className={`${expanded ? "h-4 w-4" : "h-3.5 w-3.5"} shrink-0 text-emerald-700`}
          aria-label="Tarefa concluída"
        />
      ) : null}
      <span
        className={`min-w-0 flex-1 truncate font-semibold ${expanded ? "text-sm" : "text-[11px]"} ${completed ? "line-through decoration-2 decoration-emerald-700/80" : ""}`}
      >
        {task.is_draft ? "Em elaboração · " : ""}
        {task.title}
      </span>
      <span
        className={`${expanded ? "h-3 w-3" : "h-2.5 w-2.5"} shrink-0 rounded-[2px] border border-black/25 shadow-sm`}
        style={{ backgroundColor: statusColor }}
        title={`Status: ${statusName}`}
        aria-label={`Status: ${statusName}`}
      />
      {task.due_time ? (
        <span className="shrink-0 text-[9px] opacity-80">{task.due_time.slice(0, 5)}</span>
      ) : null}
    </button>
  );
}
