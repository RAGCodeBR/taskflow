import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
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
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTasks, useClients, useSubtasks, useTaskCollaborators, type Task } from "@/hooks/use-data";
import { useAuth } from "@/hooks/use-auth";
import { TaskFilters, applyTaskFilters, type TaskFilterValue } from "@/components/TaskFilters";
import { TaskDialog } from "@/components/TaskDialog";

export const Route = createFileRoute("/_app/tasks/calendar")({
  component: CalendarPage,
});

function CalendarPage() {
  const { data: tasks = [] } = useTasks();
  const { data: clients = [] } = useClients();
  const { data: subtasks = [] } = useSubtasks();
  const { data: collaborators = [] } = useTaskCollaborators();
  const { user } = useAuth();
  const [cursor, setCursor] = useState(new Date());
  const [filters, setFilters] = useState<TaskFilterValue>({});
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Task | null>(null);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [cursor]);

  const subtaskAssigneeTaskIds = useMemo(() => {
    const s = new Set<string>();
    if (!user?.id) return s;
    for (const st of subtasks as any[])
      if (st.assignee_id === user.id && st.task_id) s.add(st.task_id);
    return s;
  }, [subtasks, user?.id]);

  const subtaskAssigneeTaskIdsByUser = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const st of subtasks as any[]) {
      if (!st.assignee_id || !st.task_id) continue;
      const set = map.get(st.assignee_id) ?? new Set<string>();
      set.add(st.task_id);
      map.set(st.assignee_id, set);
    }
    return map;
  }, [subtasks]);

  const collaboratorTaskIds = useMemo(
    () => new Set(collaborators.filter((collaborator) => collaborator.collaborator_id === user?.id).map((collaborator) => collaborator.task_id)),
    [collaborators, user?.id],
  );

  const visible = useMemo(
    () =>
      applyTaskFilters(tasks, filters, {
        userId: user?.id ?? null,
        subtaskAssigneeTaskIds,
        collaboratorTaskIds,
        subtaskAssigneeTaskIdsByUser,
      }),
    [tasks, filters, user?.id, subtaskAssigneeTaskIds, collaboratorTaskIds, subtaskAssigneeTaskIdsByUser],
  );

  const subtaskDueDatesByTask = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const st of subtasks) {
      if (!st.task_id || !st.due_date) continue;
      const list = map.get(st.task_id) ?? [];
      list.push(st.due_date);
      map.set(st.task_id, list);
    }
    return map;
  }, [subtasks]);

  const dayTasks = (day: Date) =>
    visible.filter((t) => {
      if (t.due_date && isSameDay(new Date(t.due_date), day)) return true;
      return (subtaskDueDatesByTask.get(t.id) ?? []).some((due) => isSameDay(new Date(due), day));
    });

  return (
    <div className="space-y-4 p-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium capitalize">
            {format(cursor, "MMMM yyyy", { locale: ptBR })}
          </span>
          <div className="flex gap-1">
            <Button size="icon" variant="outline" onClick={() => setCursor(subMonths(cursor, 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={() => setCursor(addMonths(cursor, 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" onClick={() => setCursor(new Date())}>
              Hoje
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
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
      <TaskFilters filters={filters} onChange={setFilters} />

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
            const inMonth = isSameMonth(day, cursor);
            const today = isSameDay(day, new Date());
            const ts = dayTasks(day);
            return (
              <div
                key={day.toISOString()}
                className={`min-h-28 border-b border-r p-2 ${inMonth ? "" : "bg-muted/20 text-muted-foreground"}`}
              >
                <div
                  className={`mb-1 inline-grid h-6 min-w-6 place-items-center rounded-full text-xs ${today ? "bg-primary text-primary-foreground font-semibold" : ""}`}
                >
                  {format(day, "d")}
                </div>
                <div className="space-y-1">
                  {ts.slice(0, 3).map((t) => {
                    const client = clients.find((c) => c.id === t.client_id);
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setEdit(t);
                          setOpen(true);
                        }}
                        className="block w-full truncate rounded px-1.5 py-0.5 text-left text-[11px] hover:opacity-80"
                        style={{
                          background: (client?.color || t.color || "#1e3a8a") + "22",
                          color: client?.color || t.color || "#1e3a8a",
                        }}
                      >
                        {t.due_time ? `${t.due_time.slice(0, 5)} · ${t.title}` : t.title}
                      </button>
                    );
                  })}
                  {ts.length > 3 && (
                    <div className="text-[10px] text-muted-foreground">+{ts.length - 3} mais</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <TaskDialog open={open} onOpenChange={setOpen} task={edit} />
    </div>
  );
}
