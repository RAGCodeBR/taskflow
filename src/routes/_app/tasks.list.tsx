import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowDown, ArrowUp, Check, ChevronDown, Copy, Plus } from "lucide-react";
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
import { TaskFilters, applyTaskFilters, type TaskFilterValue } from "@/components/TaskFilters";
import { WorkspaceTaskFilter } from "@/components/WorkspaceTaskFilter";
import { TaskDialog } from "@/components/TaskDialog";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { priorityColors, priorityLabels } from "@/lib/task-utils";
import { matchDateFilter, type DateFilter } from "@/lib/task-utils";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { duplicateTask as duplicateTaskWithContents } from "@/lib/duplicate-task";

export const Route = createFileRoute("/_app/tasks/list")({
  component: ListPage,
  validateSearch: (s: Record<string, unknown>) => ({
    task: typeof s.task === "string" ? s.task : undefined,
    mine: s.mine === "1" || s.mine === true || s.mine === "true" ? true : undefined,
  }),
});

function ListPage() {
  const { data: tasks = [] } = useTasks();
  const { data: clients = [] } = useClients();
  const { data: columns = [] } = useColumns();
  const { data: profiles = [] } = useProfiles();
  const { data: subtasks = [] } = useSubtasks();
  const { data: statuses = [] } = useTaskStatuses();
  const { data: collaborators = [] } = useTaskCollaborators();
  const queryClient = useQueryClient();
  const { user, isCollaborator } = useAuth();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<TaskFilterValue>(() =>
    search.mine ? { scope: "mine" } : {},
  );
  const didApplyDefaultAssignee = useRef(false);
  const [open, setOpen] = useState(false);
  const [completedOpen, setCompletedOpen] = useState(false);
  const [edit, setEdit] = useState<Task | null>(null);
  const [dueDateSortDirection, setDueDateSortDirection] = useState<"asc" | "desc">("asc");
  const [duplicateTaskTarget, setDuplicateTaskTarget] = useState<Task | null>(null);
  const [duplicateDueDate, setDuplicateDueDate] = useState("");
  const [duplicatingTask, setDuplicatingTask] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    if (isCollaborator) {
      setFilters((current) =>
        current.assignee ? { ...current, assignee: undefined } : current,
      );
      return;
    }
    if (didApplyDefaultAssignee.current) return;
    setFilters((current) => ({ ...current, assignee: current.assignee ?? user.id }));
    didApplyDefaultAssignee.current = true;
  }, [user?.id, isCollaborator]);

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

      const aDueTimestamp = getDueTimestamp(a);
      const bDueTimestamp = getDueTimestamp(b);
      if (aDueTimestamp === null && bDueTimestamp === null) return 0;
      if (aDueTimestamp === null) return 1;
      if (bDueTimestamp === null) return -1;
      const dueDateDifference = aDueTimestamp - bDueTimestamp;
      return dueDateSortDirection === "asc" ? dueDateDifference : -dueDateDifference;
    });
  }, [tasks, filters, user?.id, isCollaborator, subtaskAssigneeTaskIds, collaboratorTaskIds, subtaskAssigneeTaskIdsByUser, subtaskDateFilterTaskIds, dueDateSortDirection]);

  const completeTask = async (taskId: string) => {
    const completedStatus = statuses.find((status) => status.is_completed);

    if (!completedStatus) {
      toast.error("Cadastre um status marcado como concluído.");
      return;
    }
    if (subtasks.some((subtask) => subtask.task_id === taskId && !subtask.done)) {
      toast.error("Conclua todas as subtarefas antes de concluir a tarefa.");
      return;
    }

    const { error } = await supabase
      .from("tasks")
      .update({
        status: "done",
        status_id: completedStatus.id,
        completed_at: new Date().toISOString(),
      })
      .eq("id", taskId);

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    toast.success("Tarefa concluída.");
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
      <WorkspaceTaskFilter
        value={filters.workspace}
        onChange={(workspace) => setFilters({ ...filters, workspace })}
      />
      <TaskFilters filters={filters} onChange={setFilters} hideAssignee={isCollaborator} />

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
            {list.length === 0 ? (
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
              const overdue = t.due_date && isPast(new Date(t.due_date)) && t.status !== "done";
              const taskCollaborators = collaborators.filter((collaborator) => collaborator.task_id === t.id).map((collaborator) => profiles.find((profile) => profile.id === collaborator.collaborator_id)).filter(Boolean);

              return (
                <Fragment key={t.id}>
                {startsCompletedSection && (
                  <tr aria-label="Tarefas concluídas">
                    <td colSpan={8} className="px-2 py-2">
                      <button type="button" onClick={() => setCompletedOpen((current) => !current)} className="flex w-full items-center gap-3 border-t border-dashed border-muted-foreground/45 pt-2 text-left">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Tarefas concluídas</span>
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
                  <td className="border-r px-2 py-2 font-medium"><span className="block truncate">{t.title}</span></td>
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
                  <td className={`border-r px-2 py-2 whitespace-nowrap ${overdue ? "font-medium text-destructive" : "text-muted-foreground"}`}>
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
                          void completeTask(t.id);
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
          </tbody>
        </table>
      </div>
      <TaskDialog open={open} onOpenChange={setOpen} task={edit} />
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
