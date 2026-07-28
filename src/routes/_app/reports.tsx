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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  CheckCircle2,
  ListTodo,
  AlertTriangle,
  Clock,
  Zap,
  ShieldCheck,
  User as UserIcon,
  ListChecks,
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

function ReportsPage() {
  const { isAdmin, hasPermission, loading } = useAuth();
  const { data: tasks = [] } = useTasks();
  const { data: profiles = [] } = useProfiles();
  const { data: clients = [] } = useClients();
  useTaskStatuses();
  const { data: interruptions = [] } = useQuery({
    queryKey: ["task_interruptions_all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("task_interruptions")
        .select("id, task_id, user_id, reason, created_at");
      if (error) throw error;
      return data ?? [];
    },
  });
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

  if (loading) return <div className="p-6 text-sm text-muted-foreground">Carregando…</div>;
  if (!hasPermission("reports")) return <Navigate to="/dashboard" />;

  const matchesStatus = (p: any) => {
    const active = p.is_active !== false;
    return statusFilter === "all" || (statusFilter === "active" ? active : !active);
  };
  // Client accounts can access the portal, but are never collaborators and
  // therefore must not be included in user report filters, charts or tables.
  const clientUserIds = new Set(
    roles.filter((role) => role.role === "client").map((role) => role.user_id),
  );
  const visibleProfiles = profiles.filter(matchesStatus).filter((profile) => !clientUserIds.has(profile.id));
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
    taskList.forEach((t) => {
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
    interruptions: interruptions.filter((i) => userFilter === "all" || i.user_id === userFilter)
      .length,
    subtasks: sumSubtasks(filteredTasks),
  };

  const perUser = visibleProfiles.map((p) => {
    const userTasks = tasks
      .filter((t) => t.assignee_id === p.id)
      .filter((t) => matchDateFilter(t, filter));
    const done = userTasks.filter((t) => t.status === "done");
    const overdue = userTasks.filter((t) => matchDateFilter(t, "overdue"));
    const userInter = interruptions.filter((i) => i.user_id === p.id);
    const onTime = done.filter(
      (t) =>
        t.due_date && t.completed_at && !isAfter(parseISO(t.completed_at), parseISO(t.due_date)),
    ).length;
    const isAdminRole = roles.some((r) => r.user_id === p.id && r.role === "admin");
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
      interruptions: userInter.length,
      onTime,
      onTimeRate: done.length ? Math.round((onTime / done.length) * 100) : 0,
      subtasksDone: sub.done,
      subtasksTotal: sub.total,
    };
  });

  const byClient = clients
    .map((c) => ({
      name: c.name,
      value: filteredTasks.filter((t) => t.client_id === c.id).length,
      color: c.color || "#1e3a8a",
    }))
    .filter((x) => x.value > 0);

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
          interruptions: 0,
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

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <Kpi label="Total" value={totals.total} icon={ListTodo} color="#2563eb" />
        <Kpi label="Concluídas" value={totals.done} icon={CheckCircle2} color="#059669" />
        <Kpi label="Pendentes" value={totals.pending} icon={Clock} color="#f59e0b" />
        <Kpi label="Atrasadas" value={totals.overdue} icon={AlertTriangle} color="#dc2626" />
        <Kpi label="Interrupções" value={totals.interruptions} icon={Zap} color="#a855f7" />
        <Kpi
          label="Subtarefas"
          value={`${totals.subtasks.done}/${totals.subtasks.total}`}
          icon={ListChecks}
          color="#0ea5e9"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
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
                <Bar dataKey="interruptions" name="Interrupções" fill="#a855f7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="mb-3 font-semibold">Distribuição por cliente</h3>
          <div className="h-72">
            {byClient.length === 0 ? (
              <div className="grid h-full place-items-center text-sm text-muted-foreground">
                Sem dados no período
              </div>
            ) : (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={byClient}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {byClient.map((c, i) => (
                      <Cell key={i} fill={c.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>

      <UserTable title="Administradores" icon={ShieldCheck} rows={admins} />
      <UserTable title="Colaboradores" rows={members} icon={UserIcon} />

      {unassignedRow && (
        <Card className="p-4">
          <h3 className="mb-3 font-semibold text-amber-700">Tarefas sem responsável</h3>
          <p className="mb-2 text-xs text-muted-foreground">
            Existem {unassignedRow.total} tarefa(s) sem responsável atribuído ({unassignedRow.done}{" "}
            concluída(s), {unassignedRow.pending} pendente(s)). Atribua um responsável para que
            apareçam nos relatórios por usuário.
          </p>
        </Card>
      )}

      <ClientByUserTable clients={clients} users={perUser} tasks={filteredTasks} />
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
                <th className="py-2 text-center">Interrupções</th>
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
                    <td className="py-2 text-center text-purple-600">{r.interruptions}</td>
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
