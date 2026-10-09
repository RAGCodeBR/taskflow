import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowDown, ArrowUp, Check, CheckCircle2, ChevronDown, Copy, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useTasks,
  useClients,
  useColumns,
  useProfiles,
  useSubtasks,
  useTaskStatuses,
  useTaskCollaborators,
  type Task,
} from "@/hooks/use-data";
import { useAuth } from "@/hooks/use-auth";
import { useTeamTaskVisibility } from "@/hooks/use-team-task-visibility";
import { teamSubtaskAssigneeTaskIds } from "@/lib/team-task-visibility";
import { TaskFilters, applyTaskFilters, type TaskFilterValue } from "@/components/TaskFilters";
import { WorkspaceTaskFilter } from "@/components/WorkspaceTaskFilter";
import { TaskDialog } from "@/components/TaskDialog";
import { TaskPinButton } from "@/components/TaskCardActivity";
import { usePersonalTaskPins } from "@/hooks/use-task-card-activity";
import { CompletionDateDialog } from "@/components/CompletionDateDialog";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { priorityColors, priorityLabels, dueUrgencyState, dueUrgencyTextClass } from "@/lib/task-utils";
import { matchDateFilter, type DateFilter } from "@/lib/task-utils";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { duplicateTask as duplicateTaskWithContents } from "@/lib/duplicate-task";
import { updateTaskWithOfflineSupport } from "@/lib/offline-task-mutations";
import { LinkedText } from "@/components/LinkedText";
import { completedSubtaskFilterTask, completedSubtaskHistory, openSubtaskTaskIdsForUser } from "@/lib/task-participation";

export const Route = createFileRoute("/_app/tasks/list")({
  component: ListPage,
  validateSearch: (s: Record<string, unknown>) => ({
    task: typeof s.task === "string" ? s.task : undefined,
    mine: s.mine === "1" || s.mine === true || s.mine === "true" ? true : undefined,
  }),
});

function ListPage() {
  const teamVisibilityWorkspaceId = useTeamTaskVisibility();
  const search = Route.useSearch();
  const [filters, setFilters] = useState<TaskFilterValue>(() =>
    search.mine ? { scope: "mine" } : {},
  );
  const viewedWorkspaceId = filters.workspace;
  const { data: tasks = [] } = useTasks(viewedWorkspaceId);
  const { data: clients = [] } = useClients(viewedWorkspaceId);
  const { data: columns = [] } = useColumns(viewedWorkspaceId);
  const { data: profiles = [] } = useProfiles();
  const { data: subtasks = [] } = useSubtasks();
  const { data: statuses = [] } = useTaskStatuses(viewedWorkspaceId);
  const { data: collaborators = [] } = useTaskCollaborators();
  const queryClient = useQueryClient();
  const { user, isCollaborator, workspaces } = useAuth();
  const navigate = useNavigate();
  const didApplyDefaultAssignee = useRef(false);
  const [open, setOpen] = useState(false);
  const { pins } = usePersonalTaskPins();
  const pinnedIds = useMemo(() => new Set(pins.filter(pin => pin.is_pinned).map(pin => pin.task_id)), [pins]);
  const [completedOpen, setCompletedOpen] = useState(false);
  const [edit, setEdit] = useState<Task | null>(null);
  const [dueDateSortDirection, setDueDateSortDirection] = useState<"asc" | "desc">("asc");
  const [duplicateTaskTarget, setDuplicateTaskTarget] = useState<Task | null>(null);
  const [duplicateDueDate, setDuplicateDueDate] = useState("");
  const [duplicatingTask, setDuplicatingTask] = useState(false);
  const [completionTaskTarget, setCompletionTaskTarget] = useState<Task | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    if (isCollaborator) {
      if (!teamVisibilityWorkspaceId) setFilters((current) =>
        current.assignee ? { ...current, assignee: undefined } : current,
      );
      return;
    }
    if (didApplyDefaultAssignee.current) return;
    setFilters((current) => ({ ...current, assignee: current.assignee ?? user.id }));
    didApplyDefaultAssignee.current = true;
  }, [user?.id, isCollaborator, teamVisibilityWorkspaceId]);

  // Auto-open a task when arriving with ?task=<id>
  useEffect(() => {
    if (!search.task) return;
    const t = tasks.find((x) => x.id === search.task);
    if (t) {
      setEdit(t);
      setOpen(true);
      navigate({
        to: "/tasks/list",
        search: (p: any) => ({ ...p, task: undefined }),
        replace: true,
      });
    }
  }, [search.task, tasks, navigate]);

  const subtaskAssigneeTaskIds = useMemo(
    () => openSubtaskTaskIdsForUser(subtasks, user?.id),
    [subtasks, user?.id],
  );

  const subtaskAssigneeTaskIdsByUser = useMemo(
    () => teamSubtaskAssigneeTaskIds(subtasks, tasks, teamVisibilityWorkspaceId),
    [subtasks, tasks, teamVisibilityWorkspaceId],
  );

  const subtaskDateFilterTaskIds = useMemo(() => {
    const dateFilter = filters.date;
    if (!dateFilter || dateFilter === "all") return new Set<string>();
    return new Set(
      (subtasks as any[])
        .filter((subtask) =>
          matchDateFilter(
            {
              due_date: subtask.due_date,
              status: subtask.done ? "done" : null,
              completed_at: subtask.completed_at,
            },
            dateFilter as DateFilter,
          ),
        )
        .map((subtask) => subtask.task_id),
    );
  }, [subtasks, filters.date]);

  const collaboratorTaskIds = useMemo(
    () => new Set(collaborators.filter((collaborator) => collaborator.collaborator_id === user?.id).map((collaborator) => collaborator.task_id)),
    [collaborators, user?.id],
  );

  const duplicateTask = async () => {
    if (!user || !duplicateTaskTarget || !duplicateDueDate) return;
    setDuplicatingTask(true);
    try {
      await duplicateTaskWithContents(duplicateTaskTarget, duplicateDueDate, user.id);
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      await queryClient.invalidateQueries({ queryKey: ["subtasks"] });
      setDuplicateTaskTarget(null);
      setDuplicateDueDate("");
      toast.success("Tarefa duplicada");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setDuplicatingTask(false);
    }
  };

  const list = useMemo(() => {
    const r = applyTaskFilters(tasks, filters, {
      userId: user?.id ?? null,
      subtaskAssigneeTaskIds,
      collaboratorTaskIds,
      subtaskAssigneeTaskIdsByUser,
      subtaskDateFilterTaskIds,
      restrictToCurrentUserParticipation: isCollaborator,
      teamVisibilityWorkspaceId,
    });
    const getDueTimestamp = (task: Task) => {
      if (!task.due_date) return null;
      const dueDate = new Date(task.due_date);
      if (!task.due_time) return dueDate.getTime();

      const [hours, minutes] = task.due_time.split(":").map(Number);
      dueDate.setHours(hours, minutes, 0, 0);
      return dueDate.getTime();
    };

    return [...r].sort((a, b) => {
      const aIsCompleted = a.status === "done" || !!a.completed_at;
      const bIsCompleted = b.status === "done" || !!b.completed_at;

      // Keep the completed section and its original order intact.
      if (aIsCompleted && bIsCompleted) return 0;
      if (aIsCompleted) return 1;
      if (bIsCompleted) return -1;
      const pinOrder = Number(pinnedIds.has(b.id)) - Number(pinnedIds.has(a.id));
      if (pinOrder) return pinOrder;

      const aDueTimestamp = getDueTimestamp(a);
      const bDueTimestamp = getDueTimestamp(b);
      if (aDueTimestamp === null && bDueTimestamp === null) return 0;
      if (aDueTimestamp === null) return 1;
      if (bDueTimestamp === null) return -1;
      const dueDateDifference = aDueTimestamp - bDueTimestamp;
      return dueDateSortDirection === "asc" ? dueDateDifference : -dueDateDifference;
    });
  }, [tasks, filters, user?.id, isCollaborator, teamVisibilityWorkspaceId, subtaskAssigneeTaskIds, collaboratorTaskIds, subtaskAssigneeTaskIdsByUser, subtaskDateFilterTaskIds, dueDateSortDirection, pinnedIds]);

  const completedParts = useMemo(() => {
    if (!user?.id) return [];
    return completedSubtaskHistory(tasks, subtasks, user.id, collaboratorTaskIds, viewedWorkspaceId)
      .filter(({ subtask, parent }) =>
        applyTaskFilters([completedSubtaskFilterTask(parent, subtask, user.id)], filters, {
          userId: user.id,
          restrictToCurrentUserParticipation: isCollaborator,
        }).length > 0,
      );
  }, [tasks, subtasks, user?.id, collaboratorTaskIds, viewedWorkspaceId, filters, isCollaborator]);
  const hasCompletedTasks = list.some((task) => task.status === "done" || !!task.completed_at);

  const completeTask = async (taskId: string, completionDate: string) => {
    const completedStatus = statuses.find((status) => status.is_completed);

    if (!completedStatus) {
      toast.error("Cadastre um status marcado como concluído.");
      return;
    }
    if (subtasks.some((subtask) => subtask.task_id === taskId && !subtask.done)) {
      toast.error("Conclua todas as subtarefas antes de concluir a tarefa.");
      return;
    }

    const task = tasks.find((item) => item.id === taskId);
    if (!user || !task) return;
    let queued = false;
    let error: any = null;
    try {
      ({ queued } = await updateTaskWithOfflineSupport({
        userId: user.id,
        task,
        patch: { status: "done", status_id: completedStatus.id, completed_at: new Date(`${completionDate}T12:00:00`).toISOString() },
        queryClient,
      }));
    } catch (cause: any) {
      error = cause;
    }

    if (error) {
      toast.error(error.message);
      return;
    }

    if (!queued) await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    setCompletionTaskTarget(null);
    toast.success("Tarefa concluída.");
  };

  const startCompletion = (task: Task) => {
    const today = format(new Date(), "yyyy-MM-dd");
    // Só perguntamos a data quando a tarefa já venceu e pode estar sendo
    // registrada retroativamente. Conclusões normais são gravadas no dia atual.
    if (task.due_date?.slice(0, 10) && task.due_date.slice(0, 10) < today) {
      setCompletionTaskTarget(task);
      return;
    }
    void completeTask(task.id, today);
  };

  return (
    <div className="space-y-4 p-6">
      <header className="flex items-center justify-end gap-3 flex-wrap">
        <Button
          onClick={() => {
            setEdit(null);
            setOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova tarefa
        </Button>
      </header>
      <TaskFilters
        filters={filters}
        onChange={setFilters}
        hideAssignee={isCollaborator && !teamVisibilityWorkspaceId}
        sections={{
          category: workspaces.length > 1 ? (
            <WorkspaceTaskFilter
              value={filters.workspace}
              onChange={(workspace) => setFilters({ ...filters, workspace })}
            />
          ) : undefined,
        }}
      />

      <div className="overflow-hidden rounded-lg border bg-card">
        <table className="w-full table-fixed border-collapse text-xs">
          <thead className="border-b bg-muted/50 text-left text-[10px] uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="w-[29%] border-r px-2 py-2">Tarefa</th>
              <th className="w-[11%] border-r px-2 py-2">Cliente</th>
              <th className="w-[13%] border-r px-2 py-2">Responsável</th>
              <th className="w-[12%] border-r px-2 py-2">Colaboradores</th>
              <th className="w-[10%] border-r px-2 py-2">Status</th>
              <th className="w-[10%] border-r px-2 py-2">Prioridade</th>
              <th className="w-[10%] border-r px-2 py-2">
                <button
                  type="button"
                  className="flex items-center gap-1 transition-colors hover:text-foreground"
                  onClick={() =>
                    setDueDateSortDirection((current) => (current === "asc" ? "desc" : "asc"))
                  }
                  title={`Ordenar prazos em ordem ${dueDateSortDirection === "asc" ? "decrescente" : "crescente"}`}
                  aria-label={`Ordenar prazos em ordem ${dueDateSortDirection === "asc" ? "decrescente" : "crescente"}`}
                >
                  Prazo
                  {dueDateSortDirection === "asc" ? (
                    <ArrowUp className="h-3 w-3" aria-hidden="true" />
                  ) : (
                    <ArrowDown className="h-3 w-3" aria-hidden="true" />
                  )}
                </button>
              </th>
              <th className="w-[5%] px-1 py-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && completedParts.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-muted-foreground">
                  Nenhuma tarefa
                </td>
              </tr>
            ) : list.map((t, index) => {
              const client = clients.find((c) => c.id === t.client_id);
              const assignee = profiles.find((p) => p.id === t.assignee_id);
              const isCompleted = t.status === "done" || !!t.completed_at;
              const previousTask = list[index - 1];
              const startsCompletedSection =
                isCompleted &&
                (!previousTask || (previousTask.status !== "done" && !previousTask.completed_at));
              const currentColumn = columns.find((column) => column.id === t.column_id);
              const completedStatus = statuses.find((status) => status.is_completed);
              const storedStatus = statuses.find((status) => status.id === t.status_id);
              // The Kanban card's current state is its column. Only completed
              // tasks use the dedicated completion status instead of the column.
              const displayStatus = isCompleted
                ? {
                    name: completedStatus?.name ?? "Concluída",
                    color: completedStatus?.color ?? "#22c55e",
                  }
                : currentColumn
                  ? { name: currentColumn.name, color: currentColumn.color || "#64748b" }
                  : storedStatus
                    ? {
                        name: storedStatus.name,
                        color: storedStatus.color,
                      }
                    : null;
              const dueTextClass = dueUrgencyTextClass[dueUrgencyState(t)];
              const taskCollaborators = collaborators.filter((collaborator) => collaborator.task_id === t.id).map((collaborator) => profiles.find((profile) => profile.id === collaborator.collaborator_id)).filter(Boolean);

              return (
                <Fragment key={t.id}>
                {startsCompletedSection && (
                  <tr aria-label="Concluídas">
                    <td colSpan={8} className="px-2 py-2">
                      <button type="button" onClick={() => setCompletedOpen((current) => !current)} className="flex w-full items-center gap-3 border-t border-dashed border-muted-foreground/45 pt-2 text-left">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Concluídas</span>
                        <span className="h-px flex-1 border-t border-dashed border-muted-foreground/30" />
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${completedOpen ? "" : "-rotate-90"}`} />
                      </button>
                    </td>
                  </tr>
                )}
                {isCompleted && !completedOpen ? null :
                <tr
                  className={`cursor-pointer border-t transition-colors hover:bg-muted/30 ${
                    isCompleted ? "opacity-60 grayscale-[0.2]" : ""
                  }`}
                  onClick={() => {
                    setEdit(t);
                    setOpen(true);
                  }}
                >
                  <td className="border-r px-2 py-2 font-medium"><div className="flex items-center gap-1"><TaskPinButton task={t} compact /><span className="block truncate"><LinkedText text={t.title} /></span></div>{t.is_draft && <span className="text-[10px] font-semibold text-amber-700">Em elaboração</span>}</td>
                  <td className="border-r px-2 py-2">
                    {client ? (
                      <Badge variant="outline" style={{ borderColor: client.color ?? undefined }}>
                        {client.name}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="border-r px-2 py-2 text-muted-foreground">
                    {assignee?.full_name || assignee?.email || "—"}
                  </td>
                  <td className="border-r px-2 py-2">
                    {taskCollaborators.length > 0 ? (
                      <div className="flex -space-x-1" title={taskCollaborators.map((p: any) => p.full_name || p.email).join(", ")}>
                        {taskCollaborators.slice(0, 3).map((person: any) => {
                          const name = person.full_name || person.email || "Usuário";
                          return <Avatar key={person.id} className="h-5 w-5 border border-background"><AvatarImage src={person.avatar_url || undefined} alt={name} /><AvatarFallback className="text-[8px]">{name.slice(0, 1).toUpperCase()}</AvatarFallback></Avatar>;
                        })}
                        {taskCollaborators.length > 3 ? <span className="ml-1 text-[10px] text-muted-foreground">+{taskCollaborators.length - 3}</span> : null}
                      </div>
                    ) : <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="border-r px-2 py-2">
                    {displayStatus ? (
                      <Badge variant="outline" className="max-w-full truncate" style={{ borderColor: displayStatus.color, color: displayStatus.color }}>
                        {displayStatus.name}
                      </Badge>
                    ) : <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="border-r px-2 py-2">
                    {t.priority ? (
                      <Badge
                        variant="outline"
                        style={{
                          borderColor: priorityColors[t.priority],
                          color: priorityColors[t.priority],
                        }}
                      >
                        {priorityLabels[t.priority]}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className={`border-r px-2 py-2 whitespace-nowrap ${dueTextClass}`}>
                    {t.due_date
                      ? `${format(new Date(t.due_date), "dd MMM yyyy", { locale: ptBR })}${t.due_time ? ` · ${t.due_time.slice(0, 5)}` : ""}`
                      : "—"}
                  </td>
                  <td className="px-1 py-2 text-center">
                    <div className="flex items-center justify-center gap-0.5">
                      <Button
                        size="icon"
                        variant="ghost"
                        title="Duplicar tarefa"
                        onClick={(event) => {
                          event.stopPropagation();
                          setDuplicateTaskTarget(t);
                          setDuplicateDueDate("");
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        title="Concluir tarefa"
                        disabled={t.completed_at !== null}
                        onClick={(event) => {
                          event.stopPropagation();
                          startCompletion(t);
                        }}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
                }
                </Fragment>
              );
            })}
            {completedParts.length > 0 && (
              <>
                {!hasCompletedTasks && (
                  <tr aria-label="Concluídas">
                    <td colSpan={8} className="px-2 py-2">
                      <button
                        type="button"
                        onClick={() => setCompletedOpen((current) => !current)}
                        className="flex w-full items-center gap-3 border-t border-dashed border-muted-foreground/45 pt-2 text-left"
                      >
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Concluídas</span>
                        <span className="h-px flex-1 border-t border-dashed border-muted-foreground/30" />
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${completedOpen ? "" : "-rotate-90"}`} />
                      </button>
                    </td>
                  </tr>
                )}
                {completedOpen && completedParts.map(({ subtask, parent }) => {
                  const client = clients.find((item) => item.id === parent.client_id);
                  const ownProfile = profiles.find((profile) => profile.id === user?.id);
                  const dueDate = subtask.due_date ?? parent.due_date;
                  return (
                    <tr
                      key={`subtask:${subtask.id}`}
                      className="cursor-pointer border-t bg-emerald-50/30 transition-colors hover:bg-emerald-50/70 dark:bg-emerald-950/10 dark:hover:bg-emerald-950/20"
                      onClick={() => { setEdit(parent); setOpen(true); }}
                    >
                      <td className="border-r px-2 py-2">
                        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span className="truncate font-medium line-through">{subtask.title}</span>
                        </div>
                        <span className="pl-5 text-[10px] text-muted-foreground">Subtarefa de {parent.title}</span>
                      </td>
                      <td className="border-r px-2 py-2">{client ? <Badge variant="outline" style={{ borderColor: client.color ?? undefined }}>{client.name}</Badge> : "—"}</td>
                      <td className="border-r px-2 py-2 text-muted-foreground">{ownProfile?.full_name || ownProfile?.email || "—"}</td>
                      <td className="border-r px-2 py-2 text-muted-foreground">—</td>
                      <td className="border-r px-2 py-2"><Badge variant="outline" className="border-emerald-500 text-emerald-700 dark:text-emerald-400">Concluída</Badge></td>
                      <td className="border-r px-2 py-2 text-muted-foreground">—</td>
                      <td className="border-r px-2 py-2 text-muted-foreground">{dueDate ? format(new Date(dueDate), "dd MMM yyyy", { locale: ptBR }) : "—"}</td>
                      <td className="px-1 py-2 text-center text-muted-foreground">—</td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
      <TaskDialog open={open} onOpenChange={setOpen} task={edit} />
      <CompletionDateDialog
        open={!!completionTaskTarget}
        onOpenChange={(isOpen) => !isOpen && setCompletionTaskTarget(null)}
        onConfirm={(completionDate) =>
          completionTaskTarget ? completeTask(completionTaskTarget.id, completionDate) : undefined
        }
      />
      <Dialog open={!!duplicateTaskTarget} onOpenChange={(isOpen) => !isOpen && !duplicatingTask && setDuplicateTaskTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Duplicar tarefa</DialogTitle></DialogHeader>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Defina o novo prazo para a cópia de “{duplicateTaskTarget?.title}”.</p>
            <Input type="date" value={duplicateDueDate} onChange={(event) => setDuplicateDueDate(event.target.value)} required />
          </div>
          <DialogFooter>
            <Button variant="outline" disabled={duplicatingTask} onClick={() => setDuplicateTaskTarget(null)}>Cancelar</Button>
            <Button disabled={!duplicateDueDate || duplicatingTask} onClick={() => void duplicateTask()}>{duplicatingTask ? "Duplicando…" : "Duplicar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
