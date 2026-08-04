import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTasks, useClients, useAssignableProfiles, useColumns } from "@/hooks/use-data";
import { DateFilterBar } from "@/components/DateFilterBar";
import { matchDateFilter, type DateFilter } from "@/lib/task-utils";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CheckCircle2, ListTodo, AlertTriangle, Clock } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

function Stat({ label, value, icon: Icon, color }: { label: string; value: number; icon: typeof Clock; color: string }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: `${color}20`, color }}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

function Dashboard() {
  const { profile, user, isAdmin } = useAuth();
  const { data: tasks = [] } = useTasks();
  const { data: clients = [] } = useClients();
  // The chart only includes users eligible to receive tasks (admins and collaborators).
  // The database query excludes client accounts, including future ones.
  const { data: assignableProfiles = [] } = useAssignableProfiles();
  useColumns();
  const [filter, setFilter] = useState<DateFilter>("all");

  const greetingName = profile?.full_name?.split(" ")[0] || user?.email?.split("@")[0];

  // Hooks MUST run unconditionally for both admin and member views.
  const filtered = useMemo(() => tasks.filter(t => matchDateFilter(t, filter)), [tasks, filter]);
  const stats = useMemo(() => {
    const total = filtered.length;
    const done = filtered.filter(t => t.status === "done").length;
    const pending = total - done;
    const overdue = filtered.filter(t => matchDateFilter(t, "overdue")).length;
    const today = filtered.filter(t => matchDateFilter(t, "today")).length;
    const week = filtered.filter(t => matchDateFilter(t, "this_week")).length;
    const month = filtered.filter(t => matchDateFilter(t, "this_month")).length;
    return { total, done, pending, overdue, today, week, month };
  }, [filtered]);
  const byClient = useMemo(() => clients.map(c => ({
    name: c.name,
    value: filtered.filter(t => t.client_id === c.id).length,
    color: c.color || "#1e3a8a",
  })).filter(c => c.value > 0), [clients, filtered]);
  const byUser = useMemo(() => assignableProfiles.map(p => ({
    name: (p.full_name || p.email || "?").slice(0, 12),
    feitas: filtered.filter(t => t.assignee_id === p.id && t.status === "done").length,
    pendentes: filtered.filter(t => t.assignee_id === p.id && t.status !== "done").length,
  })), [assignableProfiles, filtered]);


  // Member dashboard — only own pending/overdue tasks
  if (!isAdmin) {
    const myTasks = tasks.filter(t => t.assignee_id === user?.id || t.created_by === user?.id);
    const myPending = myTasks.filter(t => t.status !== "done");
    const myOverdue = myTasks.filter(t => matchDateFilter(t, "overdue"));
    const myToday = myTasks.filter(t => matchDateFilter(t, "today"));
    const myWeek = myTasks.filter(t => matchDateFilter(t, "this_week"));

    return (
      <div className="space-y-6 p-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Olá, {greetingName}</h1>
          <p className="text-muted-foreground">Suas tarefas pendentes e atrasadas</p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Minhas pendentes" value={myPending.length} icon={Clock} color="#f59e0b" />
          <Stat label="Atrasadas" value={myOverdue.length} icon={AlertTriangle} color="#dc2626" />
          <Stat label="Para hoje" value={myToday.length} icon={Clock} color="#1e3a8a" />
          <Stat label="Esta semana" value={myWeek.length} icon={Clock} color="#7c3aed" />
        </div>

        <Card className="p-5">
          <h3 className="mb-3 font-semibold text-red-600">Atrasadas ({myOverdue.length})</h3>
          {myOverdue.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nada atrasado. 🎉</p>
          ) : (
            <ul className="space-y-2">
              {myOverdue.map(t => (
                <li key={t.id} className="flex items-center justify-between rounded border border-red-200 bg-red-50 p-2 text-sm dark:bg-red-950/30">
                  <span className="truncate">{t.title}</span>
                  {t.due_date && <span className="text-xs text-red-600">{format(parseISO(t.due_date), "dd/MM", { locale: ptBR })}</span>}
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <h3 className="mb-3 font-semibold">Pendentes ({myPending.length})</h3>
          {myPending.length === 0 ? (
            <p className="text-sm text-muted-foreground">Sem tarefas pendentes.</p>
          ) : (
            <ul className="space-y-2">
              {myPending.slice(0, 20).map(t => (
                <li key={t.id} className="flex items-center justify-between rounded border bg-muted/30 p-2 text-sm">
                  <span className="truncate">{t.title}</span>
                  {t.due_date && <span className="text-xs text-muted-foreground">{format(parseISO(t.due_date), "dd/MM", { locale: ptBR })}</span>}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    );
  }

  // Admin dashboard — global view (hooks must run for all users to satisfy Rules of Hooks)

  return (
    <div className="space-y-6 p-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Olá, {greetingName}</h1>
        <p className="text-muted-foreground">Visão geral da produtividade da equipe</p>
      </header>

      <DateFilterBar value={filter} onChange={setFilter} hideToday />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total de tarefas" value={stats.total} icon={ListTodo} color="#2563eb" />
        <Stat label="Concluídas" value={stats.done} icon={CheckCircle2} color="#059669" />
        <Stat label="Pendentes" value={stats.pending} icon={Clock} color="#f59e0b" />
        <Stat label="Atrasadas" value={stats.overdue} icon={AlertTriangle} color="#dc2626" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Hoje" value={stats.today} icon={Clock} color="#1e3a8a" />
        <Stat label="Esta semana" value={stats.week} icon={Clock} color="#7c3aed" />
        <Stat label="Este mês" value={stats.month} icon={Clock} color="#0891b2" />
      </div>

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
          <h3 className="mb-4 font-semibold">Atividades por cliente</h3>
          <div className="h-64">
            {byClient.length === 0 ? (
              <div className="grid h-full place-items-center text-sm text-muted-foreground">Nenhum cliente com tarefas ainda</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byClient} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {byClient.map((c, i) => <Cell key={i} fill={c.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="mb-2 font-semibold">Resultado do filtro</h3>
        <p className="text-sm text-muted-foreground">{filtered.length} tarefas correspondem ao filtro selecionado.</p>
      </Card>
    </div>
  );
}
