import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  type Task,
  useClients,
  useAssignableProfiles,
  useColumns,
} from "@/hooks/use-data";
import { useWorkspaceTasks } from "@/hooks/use-workspace-tasks";
import { DateFilterBar } from "@/components/DateFilterBar";
import { matchDateFilter, priorityLabels, statusLabels, type DateFilter } from "@/lib/task-utils";
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
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

type DashboardMetric = "total" | "done" | "pending" | "overdue" | "today" | "week" | "month";

type Detail = {
  label: string;
  description: string;
  tasks: Task[];
  accent: string;
  prioritizeOpen?: boolean;
};

const isTaskDone = (task: Task) => task.status === "done" || !!task.completed_at;

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
}: {
  detail: Detail;
  clientsById: Map<string, string>;
  profilesById: Map<string, string>;
  onClose: () => void;
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
                    onClick={() => setPreviewTask(task)}
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
  const { profile, user, isAdmin } = useAuth();
  const { data: tasks = [] } = useWorkspaceTasks();
  const { data: clients = [] } = useClients();
  // The chart only includes users eligible to receive tasks (admins and collaborators).
  // The database query excludes client accounts, including future ones.
  const { data: assignableProfiles = [] } = useAssignableProfiles();
  useColumns();
  const [filter, setFilter] = useState<DateFilter>("this_month");
  const [periodOpen, setPeriodOpen] = useState(false);
  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");
  const [customPeriod, setCustomPeriod] = useState<{ start: string; end: string } | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<DashboardMetric | null>(null);

  const greetingName = profile?.full_name?.split(" ")[0] || user?.email?.split("@")[0];

  // Hooks MUST run unconditionally for both admin and member views.
  const filtered = useMemo(
    () =>
      customPeriod
        ? tasks.filter((task) => {
            const dueDate = task.due_date?.slice(0, 10);
            return Boolean(dueDate && dueDate >= customPeriod.start && dueDate <= customPeriod.end);
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
    return { total, done, pending, overdue, today, week, month };
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
        name: (p.full_name || p.email || "?").slice(0, 12),
        feitas: filtered.filter((t) => t.assignee_id === p.id && isTaskDone(t)).length,
        pendentes: filtered.filter((t) => t.assignee_id === p.id && !isTaskDone(t)).length,
      })),
    [assignableProfiles, filtered],
  );
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
    }),
    [filtered],
  );

  const toggleDetail = (metric: DashboardMetric) => {
    setSelectedMetric((current) => (current === metric ? null : metric));
  };
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
    }),
    [memberTasks],
  );

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
          />
        )}
      </div>
    );
  }

  // Admin dashboard — global view (hooks must run for all users to satisfy Rules of Hooks)

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

      {selectedMetric && (
        <TaskDetailPanel
          detail={details[selectedMetric]}
          clientsById={clientsById}
          profilesById={profilesById}
          onClose={() => setSelectedMetric(null)}
        />
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 font-semibold">Tarefas por usuário</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byUser}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="feitas" stackId="a" fill="#059669" radius={[0, 0, 0, 0]} />
                <Bar dataKey="pendentes" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <h3 className="font-semibold">Panorama das atividades por cliente</h3>
            <span className="text-xs text-muted-foreground">Conclusão × pendências</span>
          </div>
          <p className="mb-3 text-xs text-muted-foreground">
            Veja onde a equipe está avançando e quais clientes concentram atrasos.
          </p>
          <div className="h-72">
            {byClient.length === 0 ? (
              <div className="grid h-full place-items-center text-sm text-muted-foreground">
                Nenhum cliente com tarefas ainda
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={byClient}
                  layout="vertical"
                  margin={{ top: 4, right: 12, left: 10, bottom: 0 }}
                >
                  <CartesianGrid
                    horizontal={false}
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis type="number" allowDecimals={false} fontSize={11} />
                  <YAxis type="category" dataKey="name" width={112} tick={{ fontSize: 11 }} />
                  <Tooltip cursor={{ fill: "hsl(var(--muted))", fillOpacity: 0.45 }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                  <Bar
                    dataKey="concluídas"
                    name="Concluídas"
                    stackId="atividade"
                    fill="#059669"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="emAberto"
                    name="Em aberto"
                    stackId="atividade"
                    fill="#2563eb"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="atrasadas"
                    name="Atrasadas"
                    stackId="atividade"
                    fill="#dc2626"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="mb-2 font-semibold">Resultado do filtro</h3>
        <p className="text-sm text-muted-foreground">
          {filtered.length} tarefas correspondem ao filtro selecionado.
        </p>
      </Card>
    </div>
  );
}
