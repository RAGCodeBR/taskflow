import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useTasks, useProfiles, useClients, useTaskStatuses } from "@/hooks/use-data";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateFilterBar } from "@/components/DateFilterBar";
import { matchDateFilter, type DateFilter } from "@/lib/task-utils";
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
  ShieldCheck,
  User as UserIcon,
  ListChecks,
  Flame,
  ShieldAlert,
  Swords,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { isAfter, parseISO } from "date-fns";

export const Route = createFileRoute("/_app/reports")({
  component: ReportsPage,
});

function Kpi({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number | string;
  icon: typeof Clock;
  color: string;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
        </div>
        <div
          className="grid h-10 w-10 place-items-center rounded-lg"
          style={{ background: `${color}20`, color }}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </Card>
  );
}

type ClientPerformance = {
  id: string;
  name: string;
  people: number;
  total: number;
  done: number;
  pending: number;
  overdue: number;
  unassigned: number;
  onTimeRate: number;
  score: number;
  strongPoint: string;
  blocker: string;
};

const battleColors = ["#167c80", "#2d5c91", "#53739e", "#7a91ad", "#a4b3c5", "#c6d1de"];

function ClientBattlePanel({ clients }: { clients: ClientPerformance[] }) {
  const [activeClient, setActiveClient] = useState<string | null>(clients[0]?.id ?? null);
  const activeIndex = Math.max(
    0,
    clients.findIndex((client) => client.id === activeClient),
  );
  const selectClientAt = (index: number) => setActiveClient(clients[index]?.id ?? clients[0].id);

  if (clients.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-5">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <Swords className="h-5 w-5 text-[#167c80]" /> Desempenho dos clientes
        </h2>
        <p className="text-sm text-muted-foreground">
          Score composto de entregas, prazo e pendências — evita que só o volume distorça a leitura.
        </p>
      </div>

      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b bg-muted/20 px-5 py-3">
        <button
          type="button"
          onClick={() => selectClientAt((activeIndex - 1 + clients.length) % clients.length)}
          className="grid h-9 w-9 place-items-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Cliente anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <Select value={activeClient ?? undefined} onValueChange={setActiveClient}>
          <SelectTrigger className="h-9 w-full bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client, index) => (
              <SelectItem key={client.id} value={client.id}>
                {index + 1}. {client.name} · {client.score}/100
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <button
          type="button"
          onClick={() => selectClientAt((activeIndex + 1) % clients.length)}
          className="grid h-9 w-9 place-items-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Próximo cliente"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="divide-y px-5">
        {clients
          .filter((client) => client.id === activeClient)
          .map((client) => {
            const index = clients.findIndex((item) => item.id === client.id);
            const color = battleColors[index] ?? "#c6d1de";
            return (
              <article key={client.id} className="py-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {index === 0 ? (
                      <Trophy className="h-5 w-5 text-[#f59e0b]" />
                    ) : (
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-muted text-[11px] font-semibold text-muted-foreground">
                        {index + 1}
                      </span>
                    )}
                    <h3 className="text-lg font-semibold">{client.name}</h3>
                    <span className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
                      {client.people} {client.people === 1 ? "pessoa" : "pessoas"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-medium text-[#167c80]">
                      {client.onTimeRate}% no prazo
                    </span>
                    <span className="text-lg font-bold tabular-nums">{client.score}/100</span>
                  </div>
                </div>
                <div className="h-5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-[width]"
                    style={{ width: `${Math.max(client.score, 1)}%`, backgroundColor: color }}
                  />
                </div>
                <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <p>
                    <Flame className="mr-1 inline h-4 w-4 text-emerald-600" />
                    <span className="font-semibold text-emerald-600">Ponto forte:</span>{" "}
                    {client.strongPoint}
                  </p>
                  <p>
                    <ShieldAlert className="mr-1 inline h-4 w-4 text-rose-500" />
                    <span className="font-semibold text-rose-500">O que travou:</span>{" "}
                    {client.blocker}
                  </p>
                </div>
              </article>
            );
          })}
      </div>
    </section>
  );
}

function ReportsPage() {
  const { isAdmin, hasPermission, loading } = useAuth();
  const { data: tasks = [] } = useTasks();
  const { data: profiles = [] } = useProfiles();
  const { data: clients = [] } = useClients();
  useTaskStatuses();
  const { data: subtasks = [] } = useQuery({
    queryKey: ["subtasks_all"],
    queryFn: async () => {
      const { data, error } = await supabase.from("subtasks").select("id, task_id, done");
      if (error) throw error;
      return data ?? [];
    },
  });
  const { data: roles = [] } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => (await supabase.from("user_roles").select("user_id, role")).data ?? [],
  });

  const [filter, setFilter] = useState<DateFilter>("all");
  const [userFilter, setUserFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("active");
  const [reportView, setReportView] = useState<"summary" | "clients" | "team" | "risk">("clients");

  if (loading) return <div className="p-6 text-sm text-muted-foreground">Carregando…</div>;
  if (!hasPermission("reports")) return <Navigate to="/mural" />;

  const matchesStatus = (p: any) => {
    const active = p.is_active !== false;
    return statusFilter === "all" || (statusFilter === "active" ? active : !active);
  };
  // Client accounts can access the portal, but are never collaborators and
  // therefore must not be included in user report filters, charts or tables.
  const clientUserIds = new Set(
    roles
      .filter((role: { role: string }) => role.role === "client")
      .map((role: { user_id: string }) => role.user_id),
  );
  const visibleProfiles = profiles
    .filter(matchesStatus)
    .filter((profile) => !clientUserIds.has(profile.id));
  const visibleIds = new Set(visibleProfiles.map((p) => p.id));

  const filteredTasks = tasks
    .filter((t) => matchDateFilter(t, filter))
    .filter((t) => userFilter === "all" || t.assignee_id === userFilter)
    .filter((t) => !t.assignee_id || visibleIds.has(t.assignee_id));

  const subtasksByTask = (() => {
    const m = new Map<string, { total: number; done: number }>();
    subtasks.forEach((s: any) => {
      const cur = m.get(s.task_id) ?? { total: 0, done: 0 };
      cur.total += 1;
      if (s.done) cur.done += 1;
      m.set(s.task_id, cur);
    });
    return m;
  })();

  const sumSubtasks = (taskList: any[]) => {
    let total = 0,
      done = 0;
    taskList.forEach((t: { id: string }) => {
      const s = subtasksByTask.get(t.id);
      if (s) {
        total += s.total;
        done += s.done;
      }
    });
    return { total, done };
  };

  const totals = {
    total: filteredTasks.length,
    done: filteredTasks.filter((t) => t.status === "done").length,
    pending: filteredTasks.filter((t) => t.status !== "done").length,
    overdue: filteredTasks.filter((t) => matchDateFilter(t, "overdue")).length,
    subtasks: sumSubtasks(filteredTasks),
  };

  const perUser = visibleProfiles.map((p) => {
    const userTasks = tasks
      .filter((t) => t.assignee_id === p.id)
      .filter((t) => matchDateFilter(t, filter));
    const done = userTasks.filter((t) => t.status === "done");
    const overdue = userTasks.filter((t) => matchDateFilter(t, "overdue"));
    const onTime = done.filter(
      (t) =>
        t.due_date && t.completed_at && !isAfter(parseISO(t.completed_at), parseISO(t.due_date)),
    ).length;
    const isAdminRole = roles.some(
      (r: { user_id: string; role: string }) => r.user_id === p.id && r.role === "admin",
    );
    const sub = sumSubtasks(userTasks);
    return {
      id: p.id,
      name: (p.full_name || p.email || "?").slice(0, 14),
      fullName: p.full_name || p.email,
      isAdmin: isAdminRole,
      isActive: (p as any).is_active !== false,
      total: userTasks.length,
      done: done.length,
      pending: userTasks.length - done.length,
      overdue: overdue.length,
      onTime,
      onTimeRate: done.length ? Math.round((onTime / done.length) * 100) : 0,
      subtasksDone: sub.done,
      subtasksTotal: sub.total,
    };
  });

  const byClient = clients
    .map((client) => {
      const clientTasks = filteredTasks.filter((task) => task.client_id === client.id);
      const concluded = clientTasks.filter((task) => task.status === "done").length;
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
    .sort((a, b) => b.total - a.total);

  const clientPerformance: ClientPerformance[] = clients
    .map((client) => {
      const clientTasks = filteredTasks.filter((task) => task.client_id === client.id);
      if (clientTasks.length === 0) return null;

      const doneTasks = clientTasks.filter((task) => task.status === "done");
      const overdue = clientTasks.filter((task) => matchDateFilter(task, "overdue")).length;
      const unassigned = clientTasks.filter((task) => !task.assignee_id).length;
      const people = new Set(clientTasks.map((task) => task.assignee_id).filter(Boolean)).size;
      const onTime = doneTasks.filter(
        (task) =>
          task.due_date &&
          task.completed_at &&
          !isAfter(parseISO(task.completed_at), parseISO(task.due_date)),
      ).length;
      const onTimeRate = doneTasks.length ? Math.round((onTime / doneTasks.length) * 100) : 0;
      const completionRate = Math.round((doneTasks.length / clientTasks.length) * 100);
      const score = Math.max(
        0,
        Math.min(
          100,
          Math.round(
            completionRate * 0.55 +
              onTimeRate * 0.3 +
              Math.min(15, clientTasks.length * 3) -
              overdue * 5,
          ),
        ),
      );
      const pending = clientTasks.length - doneTasks.length;
      const strongPoint = doneTasks.length
        ? `${doneTasks.length} ${doneTasks.length === 1 ? "tarefa concluída" : "tarefas concluídas"}, ${onTimeRate}% das entregas no prazo.`
        : `${clientTasks.length} ${clientTasks.length === 1 ? "tarefa acompanhada" : "tarefas acompanhadas"} no período.`;
      const blocker = overdue
        ? `${overdue} ${overdue === 1 ? "tarefa atrasada" : "tarefas atrasadas"}.`
        : unassigned
          ? `${unassigned} ${unassigned === 1 ? "tarefa sem responsável" : "tarefas sem responsável"}.`
          : pending
            ? `${pending} ${pending === 1 ? "tarefa pendente" : "tarefas pendentes"}.`
            : "Nenhum bloqueio identificado no período.";

      return {
        id: client.id,
        name: client.name,
        people: people || 1,
        total: clientTasks.length,
        done: doneTasks.length,
        pending,
        overdue,
        unassigned,
        onTimeRate,
        score,
        strongPoint,
        blocker,
      };
    })
    .filter((client): client is ClientPerformance => Boolean(client))
    .sort((a, b) => b.score - a.score || b.total - a.total);

  const admins = perUser.filter((u) => u.isAdmin);
  const members = perUser.filter((u) => !u.isAdmin);

  const unassignedTasks = filteredTasks.filter((t) => !t.assignee_id);
  const unassignedRow =
    unassignedTasks.length > 0
      ? {
          id: "__unassigned__",
          name: "Sem responsável",
          fullName: "Sem responsável",
          isAdmin: false,
          isActive: true,
          total: unassignedTasks.length,
          done: unassignedTasks.filter((t) => t.status === "done").length,
          pending: unassignedTasks.filter((t) => t.status !== "done").length,
          overdue: unassignedTasks.filter((t) => matchDateFilter(t, "overdue")).length,
          onTime: 0,
          onTimeRate: 0,
        }
      : null;

  return (
    <div className="space-y-6 p-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-sm text-muted-foreground">
            Indicadores detalhados por usuário e papel
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Somente ativos</SelectItem>
              <SelectItem value="inactive">Somente inativos</SelectItem>
              <SelectItem value="all">Ativos + inativos</SelectItem>
            </SelectContent>
          </Select>
          <Select value={userFilter} onValueChange={setUserFilter}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Filtrar por usuário" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os usuários</SelectItem>
              {visibleProfiles.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.full_name || p.email}
                  {(p as any).is_active === false ? " (inativo)" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <DateFilterBar value={filter} onChange={setFilter} />

      <div
        className="flex max-w-full overflow-x-auto border-b"
        role="tablist"
        aria-label="Visões dos relatórios"
      >
        {[
          ["summary", "Resumo"],
          ["clients", "Desempenho dos clientes"],
          ["team", "Ranking da equipe"],
          ["risk", "Pessoas em risco"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={reportView === id}
            onClick={() => setReportView(id as typeof reportView)}
            className={`relative shrink-0 px-4 py-3 text-sm font-medium ${reportView === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {label}
            {reportView === id && (
              <span className="absolute inset-x-3 bottom-0 h-0.5 bg-[#167c80]" />
            )}
          </button>
        ))}
      </div>

      <div
        className={reportView === "summary" ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-6" : "hidden"}
      >
        <Kpi label="Total" value={totals.total} icon={ListTodo} color="#2563eb" />
        <Kpi label="Concluídas" value={totals.done} icon={CheckCircle2} color="#059669" />
        <Kpi label="Pendentes" value={totals.pending} icon={Clock} color="#f59e0b" />
        <Kpi label="Atrasadas" value={totals.overdue} icon={AlertTriangle} color="#dc2626" />
        <Kpi
          label="Subtarefas"
          value={`${totals.subtasks.done}/${totals.subtasks.total}`}
          icon={ListChecks}
          color="#0ea5e9"
        />
      </div>

      <div className={reportView === "clients" ? "block" : "hidden"}>
        <ClientBattlePanel clients={clientPerformance} />
      </div>

      <div className={reportView === "summary" ? "grid gap-4 lg:grid-cols-2" : "hidden"}>
        <Card className="p-4">
          <h3 className="mb-3 font-semibold">Comparativo por usuário</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={perUser}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Legend />
                <Bar dataKey="done" name="Concluídas" stackId="a" fill="#059669" />
                <Bar dataKey="pending" name="Pendentes" stackId="a" fill="#f59e0b" />
                <Bar dataKey="overdue" name="Atrasadas" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-4">
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <h3 className="font-semibold">Atividades por cliente</h3>
            <span className="text-xs text-muted-foreground">Conclusão × pendências</span>
          </div>
          <p className="mb-3 text-xs text-muted-foreground">
            Comparativo de atividades concluídas, em aberto e atrasadas para cada cliente.
          </p>
          <div className="h-72">
            {byClient.length === 0 ? (
              <div className="grid h-full place-items-center text-sm text-muted-foreground">
                Sem dados no período
              </div>
            ) : (
              <ResponsiveContainer>
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

      <div className={reportView === "team" ? "space-y-4" : "hidden"}>
        <UserTable title="Administradores" icon={ShieldCheck} rows={admins} />
        <UserTable title="Colaboradores" rows={members} icon={UserIcon} />
      </div>

      <div className={reportView === "risk" ? "block" : "hidden"}>
        {unassignedRow ? (
          <Card className="p-4">
            <h3 className="mb-3 font-semibold text-amber-700">Tarefas sem responsável</h3>
            <p className="mb-2 text-xs text-muted-foreground">
              Existem {unassignedRow.total} tarefa(s) sem responsável atribuído (
              {unassignedRow.done} concluída(s), {unassignedRow.pending} pendente(s)). Atribua um
              responsável para que apareçam nos relatórios por usuário.
            </p>
          </Card>
        ) : (
          <Card className="p-4 text-sm text-muted-foreground">
            Nenhuma tarefa sem responsável no período.
          </Card>
        )}
      </div>

      <div className={reportView === "summary" ? "block" : "hidden"}>
        <ClientByUserTable clients={clients} users={perUser} tasks={filteredTasks} />
      </div>
    </div>
  );
}

function UserTable({
  title,
  icon: Icon,
  rows,
}: {
  title: string;
  icon: typeof UserIcon;
  rows: any[];
}) {
  return (
    <Card className="p-4">
      <h3 className="mb-3 flex items-center gap-2 font-semibold">
        <Icon className="h-4 w-4" /> {title}{" "}
        <span className="text-xs text-muted-foreground">({rows.length})</span>
      </h3>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum usuário neste grupo.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                <th className="py-2">Usuário</th>
                <th className="py-2 text-center">Total</th>
                <th className="py-2 text-center">Concluídas</th>
                <th className="py-2 text-center">Pendentes</th>
                <th className="py-2 text-center">Atrasadas</th>
                <th className="py-2 text-center">Subtarefas</th>
                <th className="py-2 text-center">No prazo</th>
                <th className="py-2 text-center">% prazo</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const subPct = r.subtasksTotal
                  ? Math.round((r.subtasksDone / r.subtasksTotal) * 100)
                  : 0;
                return (
                  <tr key={r.id} className="border-b last:border-b-0">
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <span>{r.fullName}</span>
                        {!r.isActive && (
                          <Badge variant="outline" className="text-xs">
                            Desativado
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-2 text-center font-medium">{r.total}</td>
                    <td className="py-2 text-center text-emerald-600">{r.done}</td>
                    <td className="py-2 text-center text-amber-600">{r.pending}</td>
                    <td className="py-2 text-center text-red-600">{r.overdue}</td>
                    <td className="py-2 text-center text-sky-600">
                      {r.subtasksTotal ? `${r.subtasksDone}/${r.subtasksTotal} (${subPct}%)` : "—"}
                    </td>
                    <td className="py-2 text-center">{r.onTime}</td>
                    <td className="py-2 text-center">{r.onTimeRate}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function ClientByUserTable({
  clients,
  users,
  tasks,
}: {
  clients: any[];
  users: any[];
  tasks: any[];
}) {
  const activeClients = clients.filter((c) => tasks.some((t) => t.client_id === c.id));
  if (activeClients.length === 0) {
    return (
      <Card className="p-4">
        <h3 className="mb-2 font-semibold">Demandas por cliente × usuário</h3>
        <p className="text-sm text-muted-foreground">Sem demandas com cliente no período.</p>
      </Card>
    );
  }
  return (
    <Card className="p-4">
      <h3 className="mb-3 font-semibold">Demandas por cliente × usuário</h3>
      <p className="mb-3 text-xs text-muted-foreground">
        Quantidade de tarefas atribuídas a cada usuário, agrupadas por cliente. "Concl." =
        concluídas.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase text-muted-foreground">
              <th className="py-2 pr-3">Cliente</th>
              {users.map((u) => (
                <th key={u.id} className="py-2 px-2 text-center">
                  <div className="flex flex-col items-center">
                    <span>{u.name}</span>
                    <span className="text-[10px] font-normal text-muted-foreground">
                      {u.isAdmin ? "admin" : "colaborador"}
                    </span>
                  </div>
                </th>
              ))}
              <th className="py-2 px-2 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {activeClients.map((c) => {
              const clientTasks = tasks.filter((t) => t.client_id === c.id);
              return (
                <tr key={c.id} className="border-b last:border-b-0">
                  <td className="py-2 pr-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: c.color || "#1e3a8a" }}
                      />
                      <span className="font-medium">{c.name}</span>
                    </div>
                  </td>
                  {users.map((u) => {
                    const ut = clientTasks.filter((t) => t.assignee_id === u.id);
                    const done = ut.filter((t) => t.status === "done").length;
                    return (
                      <td key={u.id} className="py-2 px-2 text-center">
                        {ut.length === 0 ? (
                          <span className="text-muted-foreground">—</span>
                        ) : (
                          <span>
                            <span className="font-medium">{ut.length}</span>
                            <span className="ml-1 text-xs text-emerald-600">({done} concl.)</span>
                          </span>
                        )}
                      </td>
                    );
                  })}
                  <td className="py-2 px-2 text-center font-semibold">{clientTasks.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
