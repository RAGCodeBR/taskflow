import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  type Task,
  useClients,
  useAssignableProfiles,
  useColumns,
  useSubtasks,
} from "@/hooks/use-data";
import { useWorkspaceTasks } from "@/hooks/use-workspace-tasks";
import { DateFilterBar } from "@/components/DateFilterBar";
import { isTaskCompleted, matchDateFilter, priorityLabels, statusLabels, type DateFilter } from "@/lib/task-utils";
import {
  countCompletedSubtasks,
  subtaskStatus,
  subtaskStatusLabels,
  type SubtaskStatus,
} from "@/lib/subtask-status";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RichTextView } from "@/components/RichTextEditor";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  CheckCircle2,
  ListTodo,
  AlertTriangle,
  Clock,
  X,
  CalendarDays,
  CircleCheck,
  Flag,
  UserRound,
  ArrowUpRight,
  Building2,
  Gauge,
  UserX,
  UsersRound,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

type DashboardMetric =
  | "total"
  | "done"
  | "pending"
  | "overdue"
  | "today"
  | "week"
  | "month"
  | "unassigned"
  | "urgent";

type Detail = {
  label: string;
  description: string;
  tasks: Task[];
  accent: string;
  prioritizeOpen?: boolean;
};

const isTaskDone = (task: Task) => isTaskCompleted(task);

const SUBTASK_DOT: Record<SubtaskStatus, string> = {
  concluida: "bg-emerald-500",
  atrasada: "bg-rose-500",
  sem_prazo: "bg-slate-400",
  pendente: "bg-amber-500",
};

const SUBTASK_BADGE: Record<SubtaskStatus, string> = {
  concluida: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/35 dark:text-emerald-300",
  atrasada: "bg-rose-50 text-rose-700 dark:bg-rose-950/35 dark:text-rose-300",
  sem_prazo: "bg-muted text-muted-foreground",
  pendente: "bg-amber-50 text-amber-800 dark:bg-amber-950/35 dark:text-amber-300",
};

function TaskPreviewDialog({
  task,
  clientsById,
  profilesById,
  onOpenChange,
}: {
  task: Task | null;
  clientsById: Map<string, string>;
  profilesById: Map<string, string>;
  onOpenChange: (open: boolean) => void;
}) {
  const { data: allSubtasks } = useSubtasks();
  // O hook fica acima do early return de propósito: chamá-lo depois mudaria a
  // quantidade de hooks entre um render e outro quando o diálogo fecha.
  const subtasks = useMemo(
    () => (allSubtasks ?? []).filter((subtask) => subtask.task_id === task?.id),
    [allSubtasks, task?.id],
  );
  const contagem = countCompletedSubtasks(subtasks);

  if (!task) return null;

  const done = isTaskDone(task);
  const clientName = task.client_id ? clientsById.get(task.client_id) : null;
  const assigneeName = task.assignee_id ? profilesById.get(task.assignee_id) : null;
  const formatDate = (value: string | null) =>
    value ? format(parseISO(value), "dd/MM/yyyy", { locale: ptBR }) : "—";

  return (
    <Dialog open={Boolean(task)} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader className="border-b pb-4 pr-7">
          <div className="flex flex-wrap items-start gap-2">
            <DialogTitle className="mr-auto text-xl leading-snug">{task.title}</DialogTitle>
            {task.priority && (
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                {priorityLabels[task.priority]}
              </span>
            )}
            <span
              className={`rounded-full px-2.5 py-1 text-xs ${done ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/35 dark:text-emerald-300" : "bg-muted text-muted-foreground"}`}
            >
              {done ? "Concluída" : statusLabels[task.status ?? "todo"]}
            </span>
          </div>
          <DialogDescription>Visualização da tarefa no Dashboard.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <UserRound className="h-3.5 w-3.5" /> Consultor responsável
            </p>
            <p className="mt-1.5 font-medium">{assigneeName || "Sem consultor responsável"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Cliente
            </p>
            <p className="mt-1.5 font-medium">{clientName || "Sem cliente vinculado"}</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" /> Prazo
            </p>
            <p className="mt-1.5 font-medium">{formatDate(task.due_date)}</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <CircleCheck className="h-3.5 w-3.5" /> Conclusão
            </p>
            <p className="mt-1.5 font-medium">
              {done ? formatDate(task.completed_at) : "Ainda não concluída"}
            </p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Flag className="h-3.5 w-3.5" /> Criada em
            </p>
            <p className="mt-1.5 font-medium">{formatDate(task.created_at)}</p>
          </div>
        </div>

        <div className="border-t pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Descrição
          </p>
          {task.description?.trim() ? (
            <RichTextView html={task.description} className="mt-2 text-sm leading-6 [&_p]:my-2" />
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">Esta tarefa não possui descrição.</p>
          )}
        </div>

        <div className="border-t pt-5">
          <p className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Subtarefas
            {subtasks.length > 0 ? (
              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium normal-case tracking-normal">
                {contagem.done} de {contagem.total} concluídas
              </span>
            ) : null}
          </p>
          {subtasks.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">Esta tarefa não possui subtarefas.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {subtasks.map((subtask) => {
                const situacao = subtaskStatus(subtask);
                const responsavel = subtask.assignee_id
                  ? profilesById.get(subtask.assignee_id)
                  : null;
                return (
                  <li
                    key={subtask.id}
                    className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md border bg-muted/20 px-3 py-2"
                  >
                    <span className={`h-2 w-2 shrink-0 rounded-full ${SUBTASK_DOT[situacao]}`} />
                    <span
                      className={`min-w-0 flex-1 break-words text-sm ${
                        subtask.done ? "text-muted-foreground line-through" : ""
                      }`}
                    >
                      {subtask.title}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${SUBTASK_BADGE[situacao]}`}
                    >
                      {subtaskStatusLabels[situacao]}
                    </span>
                    {subtask.due_date ? (
                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        {formatDate(subtask.due_date)}
                      </span>
                    ) : null}
                    {responsavel ? (
                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        {responsavel}
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  color,
  active = false,
  onClick,
}: {
  label: string;
  value: number;
  icon: typeof Clock;
  color: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const card = (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
        </div>
        <div
          className="grid h-12 w-12 place-items-center rounded-xl"
          style={{ background: `${color}20`, color }}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );

  if (!onClick) return card;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`w-full rounded-xl text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        active ? "ring-2 ring-primary ring-offset-2" : "hover:-translate-y-0.5 hover:shadow-md"
      }`}
      title={`Ver detalhamento: ${label}`}
    >
      {card}
    </button>
  );
}

function TaskDetailPanel({
  detail,
  clientsById,
  profilesById,
  onClose,
  onOpenTask,
}: {
  detail: Detail;
  clientsById: Map<string, string>;
  profilesById: Map<string, string>;
  onClose: () => void;
  onOpenTask?: (task: Task) => void;
}) {
  const [previewTask, setPreviewTask] = useState<Task | null>(null);
  const orderedTasks = useMemo(
    () =>
      [...detail.tasks].sort((a, b) => {
        if (detail.prioritizeOpen) {
          const openOrder = Number(isTaskDone(a)) - Number(isTaskDone(b));
          if (openOrder !== 0) return openOrder;
        }
        return b.created_at.localeCompare(a.created_at);
      }),
    [detail.tasks],
  );

  return (
    <>
      <Card className="overflow-hidden border-primary/20">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b bg-muted/20 px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: detail.accent }} />
              <h2 className="font-semibold">{detail.label}</h2>
              <span className="rounded-full bg-background px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                {detail.tasks.length}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{detail.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
            title="Fechar detalhamento"
            aria-label="Fechar detalhamento"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {orderedTasks.length === 0 ? (
          <p className="p-5 text-sm text-muted-foreground">Nenhuma tarefa neste recorte.</p>
        ) : (
          <div className="max-h-[26rem] divide-y overflow-y-auto">
            {orderedTasks.map((task) => {
              const clientName = task.client_id ? clientsById.get(task.client_id) : null;
              const assigneeName = task.assignee_id ? profilesById.get(task.assignee_id) : null;
              const done = isTaskDone(task);
              const date = done ? task.completed_at : task.due_date;
              return (
                <div key={task.id} className="text-sm">
                  <button
                    type="button"
                    onClick={() => (onOpenTask ? onOpenTask(task) : setPreviewTask(task))}
                    className="flex w-full flex-wrap items-center justify-between gap-x-5 gap-y-2 px-5 py-3 text-left transition hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{task.title}</p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {[clientName, assigneeName].filter(Boolean).join(" · ") ||
                          "Sem cliente ou responsável"}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 text-xs">
                      {task.priority && (
                        <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground">
                          {priorityLabels[task.priority]}
                        </span>
                      )}
                      <span
                        className={`rounded-full px-2 py-1 ${done ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/35 dark:text-emerald-300" : "bg-muted text-muted-foreground"}`}
                      >
                        {done ? "Concluída" : statusLabels[task.status ?? "todo"]}
                      </span>
                      {date && (
                        <span className={done ? "text-muted-foreground" : "text-foreground"}>
                          {done ? "Concluída " : "Prazo "}
                          {format(parseISO(date), "dd/MM/yyyy", { locale: ptBR })}
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </Card>
      <TaskPreviewDialog
        task={previewTask}
        clientsById={clientsById}
        profilesById={profilesById}
        onOpenChange={(open) => !open && setPreviewTask(null)}
      />
    </>
  );
}

function Dashboard() {
  const { profile, user, isAdmin, activeWorkspace, isWorkspaceTransitioning, finishWorkspaceTransition } = useAuth();
  const tasksQuery = useWorkspaceTasks();
  const clientsQuery = useClients();
  // The chart only includes users eligible to receive tasks (admins and collaborators).
  // The database query excludes client accounts, including future ones.
  const assignableProfilesQuery = useAssignableProfiles();
  const columnsQuery = useColumns();
  const tasks = tasksQuery.data ?? [];
  const clients = clientsQuery.data ?? [];
  const assignableProfiles = assignableProfilesQuery.data ?? [];
  // O painel sempre começa no mês vigente. A própria opção "Todas" permite
  // consultar o histórico quando necessário.
  const [filter, setFilter] = useState<DateFilter>("this_month");
  const [periodOpen, setPeriodOpen] = useState(false);
  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");
  const [customPeriod, setCustomPeriod] = useState<{ start: string; end: string } | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<DashboardMetric | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<Detail | null>(null);
  const detailSectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      isWorkspaceTransitioning &&
      !tasksQuery.isLoading &&
      !clientsQuery.isLoading &&
      !assignableProfilesQuery.isLoading &&
      !columnsQuery.isLoading
    ) {
      finishWorkspaceTransition();
    }
  }, [
    assignableProfilesQuery.isLoading,
    clientsQuery.isLoading,
    columnsQuery.isLoading,
    finishWorkspaceTransition,
    isWorkspaceTransitioning,
    tasksQuery.isLoading,
  ]);

  const greetingName = profile?.full_name?.split(" ")[0] || user?.email?.split("@")[0];

  // Hooks MUST run unconditionally for both admin and member views.
  const filtered = useMemo(
    () =>
      customPeriod
        ? tasks.filter((task) => {
            // A closed delivery belongs to the period in which it was delivered;
            // open work remains grouped by its due date.
            const referenceDate = (isTaskDone(task) ? task.completed_at : task.due_date)?.slice(0, 10);
            return Boolean(
              referenceDate && referenceDate >= customPeriod.start && referenceDate <= customPeriod.end,
            );
          })
        : tasks.filter((task) => matchDateFilter(task, filter)),
    [tasks, filter, customPeriod],
  );
  const stats = useMemo(() => {
    const total = filtered.length;
    const done = filtered.filter(isTaskDone).length;
    const pending = total - done;
    const overdue = filtered.filter((t) => matchDateFilter(t, "overdue")).length;
    const today = filtered.filter((t) => matchDateFilter(t, "today")).length;
    const week = filtered.filter((t) => matchDateFilter(t, "this_week")).length;
    const month = filtered.filter((t) => matchDateFilter(t, "this_month")).length;
    const unassigned = filtered.filter((task) => !task.assignee_id && !isTaskDone(task)).length;
    const urgent = filtered.filter((task) => !isTaskDone(task) && task.priority === "urgent").length;
    return { total, done, pending, overdue, today, week, month, unassigned, urgent };
  }, [filtered]);
  const currentScopeLabel = useMemo(() => {
    if (customPeriod) {
      return `período de ${format(parseISO(customPeriod.start), "dd/MM/yyyy", { locale: ptBR })} até ${format(parseISO(customPeriod.end), "dd/MM/yyyy", { locale: ptBR })}`;
    }
    if (filter === "this_month")
      return `mês vigente: ${format(new Date(), "MMMM 'de' yyyy", { locale: ptBR })}`;
    if (filter === "this_week") return "semana vigente";
    if (filter === "all") return "todo o histórico";
    return filter === "completed"
      ? "tarefas concluídas"
      : filter === "pending"
        ? "tarefas pendentes"
        : "filtro selecionado";
  }, [filter, customPeriod]);
  const byClient = useMemo(
    () =>
      clients
        .map((client) => {
          const clientTasks = filtered.filter((task) => task.client_id === client.id);
          const concluded = clientTasks.filter(isTaskDone).length;
          const overdue = clientTasks.filter((task) => matchDateFilter(task, "overdue")).length;
          return {
            id: client.id,
            name: client.name,
            concluídas: concluded,
            emAberto: clientTasks.length - concluded - overdue,
            atrasadas: overdue,
            total: clientTasks.length,
          };
        })
        .filter((client) => client.total > 0)
        .sort((a, b) => b.total - a.total),
    [clients, filtered],
  );
  const byUser = useMemo(
    () =>
      assignableProfiles.map((p) => ({
        id: p.id,
        name: (p.full_name || p.email || "?").slice(0, 12),
        feitas: filtered.filter((t) => t.assignee_id === p.id && isTaskDone(t)).length,
        pendentes: filtered.filter((t) => t.assignee_id === p.id && !isTaskDone(t)).length,
      })),
    [assignableProfiles, filtered],
  );
  const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;
  const clientChartHeight = Math.max(440, byClient.length * 68);
  const leadingClient = byClient[0] ?? null;
  const clientsById = useMemo(
    () => new Map(clients.map((client) => [client.id, client.name])),
    [clients],
  );
  const profilesById = useMemo(
    () =>
      new Map(
        assignableProfiles.map((profile) => [
          profile.id,
          profile.full_name || profile.email || "Sem responsável",
        ]),
      ),
    [assignableProfiles],
  );
  const details = useMemo<Record<DashboardMetric, Detail>>(
    () => ({
      total: {
        label: "Total de tarefas",
        description: customPeriod
          ? `Tarefas com prazo de ${format(parseISO(customPeriod.start), "dd/MM/yyyy", { locale: ptBR })} até ${format(parseISO(customPeriod.end), "dd/MM/yyyy", { locale: ptBR })}.`
          : filter === "this_month"
            ? "Tarefas com prazo no mês vigente."
            : "Todas as tarefas do filtro selecionado.",
        tasks: filtered,
        accent: "#2563eb",
        prioritizeOpen: true,
      },
      done: {
        label: "Concluídas",
        description: "Tarefas já finalizadas no período selecionado.",
        tasks: filtered.filter(isTaskDone),
        accent: "#059669",
      },
      pending: {
        label: "Pendentes",
        description: "Tarefas que ainda precisam de andamento ou conclusão.",
        tasks: filtered.filter((task) => !isTaskDone(task)),
        accent: "#f59e0b",
      },
      overdue: {
        label: "Atrasadas",
        description: "Tarefas abertas cujo prazo já passou.",
        tasks: filtered.filter((task) => matchDateFilter(task, "overdue")),
        accent: "#dc2626",
      },
      today: {
        label: "Hoje",
        description: "Tarefas com prazo para hoje.",
        tasks: filtered.filter((task) => matchDateFilter(task, "today")),
        accent: "#1e3a8a",
      },
      week: {
        label: "Esta semana",
        description: "Tarefas com prazo até o fim desta semana.",
        tasks: filtered.filter((task) => matchDateFilter(task, "this_week")),
        accent: "#7c3aed",
      },
      month: {
        label: "Este mês",
        description: "Tarefas com prazo neste mês.",
        tasks: filtered.filter((task) => matchDateFilter(task, "this_month")),
        accent: "#0891b2",
      },
      unassigned: {
        label: "Sem responsável",
        description: "Tarefas abertas que ainda não têm uma pessoa responsável.",
        tasks: filtered.filter((task) => !task.assignee_id && !isTaskDone(task)),
        accent: "#64748b",
        prioritizeOpen: true,
      },
      urgent: {
        label: "Prioridade urgente",
        description: "Tarefas abertas marcadas como urgentes.",
        tasks: filtered.filter((task) => !isTaskDone(task) && task.priority === "urgent"),
        accent: "#dc2626",
        prioritizeOpen: true,
      },
    }),
    [filtered],
  );

  const toggleDetail = (metric: DashboardMetric) => {
    setSelectedMetric((current) => (current === metric ? null : metric));
    setSelectedInsight(null);
  };
  useEffect(() => {
    if (!selectedMetric && !selectedInsight) return;
    const animationFrame = requestAnimationFrame(() => {
      detailSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(animationFrame);
  }, [selectedMetric, selectedInsight]);
  const memberTasks = useMemo(
    () => filtered.filter((task) => task.assignee_id === user?.id || task.created_by === user?.id),
    [filtered, user?.id],
  );
  const memberDetails = useMemo<Record<DashboardMetric, Detail>>(
    () => ({
      total: {
        label: "Minhas tarefas",
        description: "Todas as tarefas vinculadas a você.",
        tasks: memberTasks,
        accent: "#2563eb",
      },
      done: {
        label: "Minhas concluídas",
        description: "Tarefas suas já finalizadas.",
        tasks: memberTasks.filter(isTaskDone),
        accent: "#059669",
      },
      pending: {
        label: "Minhas pendentes",
        description: "Tarefas suas que ainda precisam de andamento ou conclusão.",
        tasks: memberTasks.filter((task) => !isTaskDone(task)),
        accent: "#f59e0b",
      },
      overdue: {
        label: "Minhas atrasadas",
        description: "Tarefas suas abertas cujo prazo já passou.",
        tasks: memberTasks.filter((task) => matchDateFilter(task, "overdue")),
        accent: "#dc2626",
      },
      today: {
        label: "Para hoje",
        description: "Tarefas suas com prazo para hoje.",
        tasks: memberTasks.filter((task) => matchDateFilter(task, "today")),
        accent: "#1e3a8a",
      },
      week: {
        label: "Esta semana",
        description: "Tarefas suas com prazo até o fim da semana.",
        tasks: memberTasks.filter((task) => matchDateFilter(task, "this_week")),
        accent: "#7c3aed",
      },
      month: {
        label: "Este mês",
        description: "Tarefas suas com prazo neste mês.",
        tasks: memberTasks.filter((task) => matchDateFilter(task, "this_month")),
        accent: "#0891b2",
      },
      unassigned: {
        label: "Sem responsável",
        description: "Tarefas abertas sem pessoa responsável.",
        tasks: memberTasks.filter((task) => !task.assignee_id && !isTaskDone(task)),
        accent: "#64748b",
      },
      urgent: {
        label: "Prioridade urgente",
        description: "Tarefas abertas marcadas como urgentes.",
        tasks: memberTasks.filter((task) => !isTaskDone(task) && task.priority === "urgent"),
        accent: "#dc2626",
      },
    }),
    [memberTasks],
  );

  const openTask = (task: Task) => {
    navigate({ to: "/tasks/list", search: { task: task.id } });
  };

  // Member dashboard — only own pending/overdue tasks
  if (!isAdmin) {
    const myPending = memberDetails.pending.tasks;
    const myOverdue = memberDetails.overdue.tasks;
    const myToday = memberDetails.today.tasks;
    const myWeek = memberDetails.week.tasks;

    return (
      <div className="space-y-6 p-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Olá, {greetingName}</h1>
          <p className="text-muted-foreground">Suas tarefas pendentes e atrasadas</p>
        </header>


      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Minhas pendentes"
            value={myPending.length}
            icon={Clock}
            color="#f59e0b"
            active={selectedMetric === "pending"}
            onClick={() => toggleDetail("pending")}
          />
          <Stat
            label="Atrasadas"
            value={myOverdue.length}
            icon={AlertTriangle}
            color="#dc2626"
            active={selectedMetric === "overdue"}
            onClick={() => toggleDetail("overdue")}
          />
          <Stat
            label="Para hoje"
            value={myToday.length}
            icon={Clock}
            color="#1e3a8a"
            active={selectedMetric === "today"}
            onClick={() => toggleDetail("today")}
          />
          <Stat
            label="Esta semana"
            value={myWeek.length}
            icon={Clock}
            color="#7c3aed"
            active={selectedMetric === "week"}
            onClick={() => toggleDetail("week")}
          />
        </div>

        {selectedMetric && (
          <TaskDetailPanel
            detail={memberDetails[selectedMetric]}
            clientsById={clientsById}
            profilesById={profilesById}
            onClose={() => setSelectedMetric(null)}
            onOpenTask={openTask}
          />
        )}
      </div>
    );
  }

  // Admin dashboard — global view (hooks must run for all users to satisfy Rules of Hooks)

  const openClientInsight = (clientId: string) => {
    const client = clients.find((item) => item.id === clientId);
    if (!client) return;
    const clientTasks = filtered.filter((task) => task.client_id === clientId);
    setSelectedInsight({
      label: `Tarefas — ${client.name}`,
      description: "Clique em uma tarefa para abri-la na lista e fazer a gestão.",
      tasks: clientTasks,
      accent: client.color || "#2563eb",
      prioritizeOpen: true,
    });
    setSelectedMetric(null);
  };

  const openUserInsight = (userId: string) => {
    const profile = assignableProfiles.find((item) => item.id === userId);
    if (!profile) return;
    const name = profile.full_name || profile.email || "Responsável";
    setSelectedInsight({
      label: `Tarefas — ${name}`,
      description: "Clique em uma tarefa para abri-la na lista e fazer a gestão.",
      tasks: filtered.filter((task) => task.assignee_id === userId),
      accent: "#f59e0b",
      prioritizeOpen: true,
    });
    setSelectedMetric(null);
  };

  return (
    <div className="space-y-6 p-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Olá, {greetingName}</h1>
        <p className="text-muted-foreground">Visão geral da produtividade da equipe</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Exibindo <span className="font-medium text-foreground">{currentScopeLabel}</span> — o
          total inclui tarefas concluídas e em aberto.
        </p>
      </header>


      <div className="flex flex-wrap items-center gap-2">
        <DateFilterBar
          value={filter}
          onChange={(nextFilter) => {
            setFilter(nextFilter);
            setCustomPeriod(null);
          }}
          hideToday
        />
        <div className="flex items-center gap-1">
          <Popover open={periodOpen} onOpenChange={setPeriodOpen}>
            <PopoverTrigger asChild>
              <Button type="button" size="sm" variant="outline" title="Escolher período">
                <CalendarDays className="h-3.5 w-3.5" />
                {customPeriod
                  ? `${format(parseISO(customPeriod.start), "dd/MM/yy", { locale: ptBR })} — ${format(parseISO(customPeriod.end), "dd/MM/yy", { locale: ptBR })}`
                  : "Escolher período"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={8}
              className="w-[22rem] overflow-hidden rounded-[1.25rem] p-0"
            >
              <div className="border-b bg-muted/35 px-5 py-4">
                <p className="font-semibold">Filtrar por período</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Exibe tarefas cujo prazo esteja entre as datas escolhidas.
                </p>
              </div>
              <div className="grid gap-4 px-5 py-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold">
                  Data inicial
                  <Input
                    type="date"
                    value={periodStart}
                    onChange={(event) => setPeriodStart(event.target.value)}
                    max={periodEnd || undefined}
                    className="h-10 bg-background text-sm"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold">
                  Data final
                  <Input
                    type="date"
                    value={periodEnd}
                    onChange={(event) => setPeriodEnd(event.target.value)}
                    min={periodStart || undefined}
                    className="h-10 bg-background text-sm"
                  />
                </label>
              </div>
              <div className="flex items-center justify-between gap-3 border-t bg-muted/20 px-5 py-3">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setPeriodStart("");
                    setPeriodEnd("");
                    setCustomPeriod(null);
                    setPeriodOpen(false);
                  }}
                >
                  Limpar
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={!periodStart || !periodEnd}
                  onClick={() => {
                    setCustomPeriod({ start: periodStart, end: periodEnd });
                    setPeriodOpen(false);
                  }}
                  className="px-4"
                >
                  Aplicar período
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          {customPeriod && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => {
                setCustomPeriod(null);
                setPeriodStart("");
                setPeriodEnd("");
              }}
              title="Limpar período escolhido"
              aria-label="Limpar período escolhido"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Total de tarefas"
          value={stats.total}
          icon={ListTodo}
          color="#2563eb"
          active={selectedMetric === "total"}
          onClick={() => toggleDetail("total")}
        />
        <Stat
          label="Concluídas"
          value={stats.done}
          icon={CheckCircle2}
          color="#059669"
          active={selectedMetric === "done"}
          onClick={() => toggleDetail("done")}
        />
        <Stat
          label="Pendentes"
          value={stats.pending}
          icon={Clock}
          color="#f59e0b"
          active={selectedMetric === "pending"}
          onClick={() => toggleDetail("pending")}
        />
        <Stat
          label="Atrasadas"
          value={stats.overdue}
          icon={AlertTriangle}
          color="#dc2626"
          active={selectedMetric === "overdue"}
          onClick={() => toggleDetail("overdue")}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat
          label="Hoje"
          value={stats.today}
          icon={Clock}
          color="#1e3a8a"
          active={selectedMetric === "today"}
          onClick={() => toggleDetail("today")}
        />
        <Stat
          label="Esta semana"
          value={stats.week}
          icon={Clock}
          color="#7c3aed"
          active={selectedMetric === "week"}
          onClick={() => toggleDetail("week")}
        />
        <Stat
          label="Este mês"
          value={stats.month}
          icon={Clock}
          color="#0891b2"
          active={selectedMetric === "month"}
          onClick={() => toggleDetail("month")}
        />
      </div>

      <div className="grid gap-6">
        <Card className="p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <UsersRound className="h-5 w-5 text-amber-500" />
                <h2 className="font-semibold">Distribuição da equipe</h2>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Clique na barra de uma pessoa para abrir a carga dela.</p>
            </div>
          </div>
          <div className="h-[26rem] lg:h-[30rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byUser} margin={{ top: 10, right: 12, left: 0, bottom: 14 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" fontSize={12} interval={0} />
                <YAxis allowDecimals={false} fontSize={12} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="feitas" name="Concluídas" stackId="equipe" fill="#059669" onClick={(data: any) => openUserInsight(data.id)} />
                <Bar dataKey="pendentes" name="Em aberto" stackId="equipe" fill="#f59e0b" radius={[5, 5, 0, 0]} onClick={(data: any) => openUserInsight(data.id)} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 border-t pt-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold">Explorar tarefas por cliente</p>
              <p className="text-xs text-muted-foreground">Clique para abrir as tarefas</p>
            </div>
              <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                {byClient.map((client) => (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => openClientInsight(client.id)}
                    className="group flex items-center justify-between gap-3 rounded-xl border bg-background px-3 py-2.5 text-left transition hover:border-primary/40 hover:bg-primary/[0.03]"
                  >
                    <span className="min-w-0 truncate text-sm font-medium">{client.name}</span>
                    <span className="shrink-0 rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                      {client.total}
                    </span>
                  </button>
                ))}
              </div>
          </div>
        </Card>
        <Card className="p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-emerald-600" />
            <h2 className="font-semibold">Ritmo do período</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Acompanhe os próximos passos sem sair do dashboard.</p>
          <div className="mt-6 rounded-2xl bg-emerald-500/[0.09] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Conclusão</p>
            <p className="mt-2 text-4xl font-bold tracking-tight">{completionRate}%</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-emerald-950/10">
              <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${completionRate}%` }} />
            </div>
            <button type="button" onClick={() => toggleDetail("done")} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-300">
              Ver concluídas <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => toggleDetail("pending")} className="rounded-xl border p-3 text-left transition hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/15">
              <p className="text-2xl font-bold">{stats.pending}</p>
              <p className="mt-1 text-xs text-muted-foreground">em aberto</p>
            </button>
            <button type="button" onClick={() => toggleDetail("week")} className="rounded-xl border p-3 text-left transition hover:border-primary/40 hover:bg-primary/[0.03]">
              <p className="text-2xl font-bold">{stats.week}</p>
              <p className="mt-1 text-xs text-muted-foreground">na semana</p>
            </button>
          </div>
        </Card>
      </div>

      {(selectedMetric || selectedInsight) && (
        <div ref={detailSectionRef} className="scroll-mt-6">
          {selectedMetric && (
            <TaskDetailPanel
              detail={details[selectedMetric]}
              clientsById={clientsById}
              profilesById={profilesById}
              onClose={() => setSelectedMetric(null)}
              onOpenTask={openTask}
            />
          )}
          {selectedInsight && (
            <TaskDetailPanel
              detail={selectedInsight}
              clientsById={clientsById}
              profilesById={profilesById}
              onClose={() => setSelectedInsight(null)}
              onOpenTask={openTask}
            />
          )}
        </div>
      )}

      <Card className="overflow-hidden border-primary/15 bg-gradient-to-br from-primary/[0.07] via-background to-emerald-500/[0.06]">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b bg-background/45 px-5 py-5 sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Painel de execução</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Indicadores de ação rápida. Clique para abrir as tarefas correspondentes.
            </p>
          </div>
          <div className="rounded-full border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            {completionRate}% concluído no período
          </div>
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-4">
          <button
            type="button"
            onClick={() => toggleDetail("unassigned")}
            className="group bg-background p-5 text-left transition hover:bg-slate-50 dark:hover:bg-slate-950/30"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium">Sem responsável</span>
              <UserX className="h-5 w-5 text-slate-500" />
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight">{stats.unassigned}</p>
            <p className="mt-1 text-xs text-muted-foreground">Distribua antes de perder o prazo</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
              Ver tarefas <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => toggleDetail("urgent")}
            className="group bg-background p-5 text-left transition hover:bg-rose-50/40 dark:hover:bg-rose-950/15"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium">Prioridade urgente</span>
              <AlertTriangle className="h-5 w-5 text-rose-600" />
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight">{stats.urgent}</p>
            <p className="mt-1 text-xs text-muted-foreground">Itens que pedem atenção imediata</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
              Ver tarefas <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => toggleDetail("overdue")}
            className="group bg-background p-5 text-left transition hover:bg-amber-50/50 dark:hover:bg-amber-950/15"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium">Risco de prazo</span>
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight">{stats.overdue}</p>
            <p className="mt-1 text-xs text-muted-foreground">Tarefas vencidas ainda em aberto</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
              Revisar agora <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => leadingClient && openClientInsight(leadingClient.id)}
            disabled={!leadingClient}
            className="group bg-background p-5 text-left transition hover:bg-primary/[0.04] disabled:cursor-default"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium">Maior volume</span>
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <p className="mt-3 truncate text-xl font-bold tracking-tight">{leadingClient?.name || "—"}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {leadingClient ? `${leadingClient.total} tarefa(s) no período` : "Sem tarefas no período"}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
              Ver cliente <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="mb-2 font-semibold">Resultado do filtro</h3>
        <p className="text-sm text-muted-foreground">
          {filtered.length} tarefas correspondem ao filtro selecionado.
        </p>
      </Card>

      <div className="pt-5">
        <Card className="overflow-hidden shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b px-5 py-5 sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Mapa de execução por cliente</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Uma leitura ampliada da carteira. Clique em uma barra ou cliente para abrir as tarefas.
            </p>
          </div>
          <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
            {byClient.length} cliente(s) com atividade
          </span>
        </div>
        <div className="p-4 sm:p-6">
          {byClient.length === 0 ? (
            <div className="grid h-80 place-items-center text-sm text-muted-foreground">
              Nenhum cliente com tarefas ainda
            </div>
          ) : (
            <>
              <div style={{ height: clientChartHeight }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={byClient}
                    layout="vertical"
                    margin={{ top: 8, right: 28, left: 16, bottom: 8 }}
                  >
                    <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" allowDecimals={false} fontSize={12} />
                    <YAxis type="category" dataKey="name" width={172} tick={{ fontSize: 12 }} />
                    <Tooltip cursor={{ fill: "hsl(var(--muted))", fillOpacity: 0.55 }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                    <Bar dataKey="concluídas" name="Concluídas" stackId="atividade" fill="#059669" onClick={(data: any) => openClientInsight(data.id)} />
                    <Bar dataKey="emAberto" name="Em aberto" stackId="atividade" fill="#2563eb" onClick={(data: any) => openClientInsight(data.id)} />
                    <Bar dataKey="atrasadas" name="Atrasadas" stackId="atividade" fill="#dc2626" radius={[0, 5, 5, 0]} onClick={(data: any) => openClientInsight(data.id)} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </>
          )}
        </div>
        </Card>
      </div>
    </div>
  );
}
