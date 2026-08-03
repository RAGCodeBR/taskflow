import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navigate } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, f as useTasks, g as useProfiles, e as useClients, j as useTaskStatuses, C as Card } from "./router-DXKzFnT6.mjs";
import { s as supabase } from "./client-Bh9iiLf9.mjs";
import { B as Badge } from "./badge-BTBDGtvX.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DM4Ewr_J.mjs";
import { D as DateFilterBar } from "./DateFilterBar-CyJBayK-.mjs";
import { m as matchDateFilter } from "./task-utils-DZ472SbJ.mjs";
import "../_libs/sonner.mjs";
import { l as isAfter, k as parseISO } from "../_libs/date-fns.mjs";
import { K as ListTodo, A as CircleCheck, G as Clock, J as TriangleAlert, aa as Zap, c as ListChecks, ab as ShieldCheck, ac as User } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, L as Legend, a as Bar, P as PieChart, b as Pie, c as Cell } from "../_libs/recharts.mjs";

import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/unenv.mjs";


import "../_libs/seroval-plugins.mjs";


import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/tslib.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function Kpi({
  label,
  value,
  icon: Icon,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-2xl font-bold tracking-tight", children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-lg", style: {
      background: `${color}20`,
      color
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) })
  ] }) });
}
function ReportsPage() {
  const {
    isAdmin,
    loading
  } = useAuth();
  const {
    data: tasks = []
  } = useTasks();
  const {
    data: profiles = []
  } = useProfiles();
  const {
    data: clients = []
  } = useClients();
  useTaskStatuses();
  const {
    data: interruptions = []
  } = useQuery({
    queryKey: ["task_interruptions_all"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("task_interruptions").select("id, task_id, user_id, reason, created_at");
      if (error) throw error;
      return data ?? [];
    }
  });
  const {
    data: subtasks = []
  } = useQuery({
    queryKey: ["subtasks_all"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("subtasks").select("id, task_id, done");
      if (error) throw error;
      return data ?? [];
    }
  });
  const {
    data: roles = []
  } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => (await supabase.from("user_roles").select("user_id, role")).data ?? []
  });
  const [filter, setFilter] = reactExports.useState("all");
  const [userFilter, setUserFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("active");
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-sm text-muted-foreground", children: "Carregando…" });
  if (!isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/dashboard" });
  const matchesStatus = (p) => {
    const active = p.is_active !== false;
    return statusFilter === "all" || (statusFilter === "active" ? active : !active);
  };
  const visibleProfiles = profiles.filter(matchesStatus);
  const visibleIds = new Set(visibleProfiles.map((p) => p.id));
  const filteredTasks = tasks.filter((t) => matchDateFilter(t, filter)).filter((t) => userFilter === "all" || t.assignee_id === userFilter).filter((t) => !t.assignee_id || visibleIds.has(t.assignee_id));
  const subtasksByTask = (() => {
    const m = /* @__PURE__ */ new Map();
    subtasks.forEach((s) => {
      const cur = m.get(s.task_id) ?? {
        total: 0,
        done: 0
      };
      cur.total += 1;
      if (s.done) cur.done += 1;
      m.set(s.task_id, cur);
    });
    return m;
  })();
  const sumSubtasks = (taskList) => {
    let total = 0, done = 0;
    taskList.forEach((t) => {
      const s = subtasksByTask.get(t.id);
      if (s) {
        total += s.total;
        done += s.done;
      }
    });
    return {
      total,
      done
    };
  };
  const totals = {
    total: filteredTasks.length,
    done: filteredTasks.filter((t) => t.status === "done").length,
    pending: filteredTasks.filter((t) => t.status !== "done").length,
    overdue: filteredTasks.filter((t) => matchDateFilter(t, "overdue")).length,
    interruptions: interruptions.filter((i) => userFilter === "all" || i.user_id === userFilter).length,
    subtasks: sumSubtasks(filteredTasks)
  };
  const perUser = visibleProfiles.map((p) => {
    const userTasks = tasks.filter((t) => t.assignee_id === p.id).filter((t) => matchDateFilter(t, filter));
    const done = userTasks.filter((t) => t.status === "done");
    const overdue = userTasks.filter((t) => matchDateFilter(t, "overdue"));
    const userInter = interruptions.filter((i) => i.user_id === p.id);
    const onTime = done.filter((t) => t.due_date && t.completed_at && !isAfter(parseISO(t.completed_at), parseISO(t.due_date))).length;
    const isAdminRole = roles.some((r) => r.user_id === p.id && r.role === "admin");
    const sub = sumSubtasks(userTasks);
    return {
      id: p.id,
      name: (p.full_name || p.email || "?").slice(0, 14),
      fullName: p.full_name || p.email,
      isAdmin: isAdminRole,
      isActive: p.is_active !== false,
      total: userTasks.length,
      done: done.length,
      pending: userTasks.length - done.length,
      overdue: overdue.length,
      interruptions: userInter.length,
      onTime,
      onTimeRate: done.length ? Math.round(onTime / done.length * 100) : 0,
      subtasksDone: sub.done,
      subtasksTotal: sub.total
    };
  });
  const byClient = clients.map((c) => ({
    name: c.name,
    value: filteredTasks.filter((t) => t.client_id === c.id).length,
    color: c.color || "#1e3a8a"
  })).filter((x) => x.value > 0);
  const admins = perUser.filter((u) => u.isAdmin);
  const members = perUser.filter((u) => !u.isAdmin);
  const unassignedTasks = filteredTasks.filter((t) => !t.assignee_id);
  const unassignedRow = unassignedTasks.length > 0 ? {
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
    onTimeRate: 0
  } : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Relatórios" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Indicadores detalhados por usuário e papel" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: (v) => setStatusFilter(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Somente ativos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inactive", children: "Somente inativos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Ativos + inativos" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: userFilter, onValueChange: setUserFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filtrar por usuário" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Todos os usuários" }),
            visibleProfiles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: p.id, children: [
              p.full_name || p.email,
              p.is_active === false ? " (inativo)" : ""
            ] }, p.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DateFilterBar, { value: filter, onChange: setFilter }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Total", value: totals.total, icon: ListTodo, color: "#2563eb" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Concluídas", value: totals.done, icon: CircleCheck, color: "#059669" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Pendentes", value: totals.pending, icon: Clock, color: "#f59e0b" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Atrasadas", value: totals.overdue, icon: TriangleAlert, color: "#dc2626" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Interrupções", value: totals.interruptions, icon: Zap, color: "#a855f7" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Subtarefas", value: `${totals.subtasks.done}/${totals.subtasks.total}`, icon: ListChecks, color: "#0ea5e9" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 font-semibold", children: "Comparativo por usuário" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: perUser, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", fontSize: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { fontSize: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "done", name: "Concluídas", stackId: "a", fill: "#059669" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "pending", name: "Pendentes", stackId: "a", fill: "#f59e0b" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "overdue", name: "Atrasadas", fill: "#dc2626" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "interruptions", name: "Interrupções", fill: "#a855f7" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 font-semibold", children: "Distribuição por cliente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72", children: byClient.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full place-items-center text-sm text-muted-foreground", children: "Sem dados no período" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: byClient, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 90, label: true, children: byClient.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: c.color }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {})
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UserTable, { title: "Administradores", icon: ShieldCheck, rows: admins }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UserTable, { title: "Colaboradores", rows: members, icon: User }),
    unassignedRow && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 font-semibold text-amber-700", children: "Tarefas sem responsável" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 text-xs text-muted-foreground", children: [
        "Existem ",
        unassignedRow.total,
        " tarefa(s) sem responsável atribuído (",
        unassignedRow.done,
        " concluída(s), ",
        unassignedRow.pending,
        " pendente(s)). Atribua um responsável para que apareçam nos relatórios por usuário."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ClientByUserTable, { clients, users: perUser, tasks: filteredTasks })
  ] });
}
function UserTable({
  title,
  icon: Icon,
  rows
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-3 flex items-center gap-2 font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
      " ",
      title,
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        "(",
        rows.length,
        ")"
      ] })
    ] }),
    rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Nenhum usuário neste grupo." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b text-left text-xs uppercase text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2", children: "Usuário" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-center", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-center", children: "Concluídas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-center", children: "Pendentes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-center", children: "Atrasadas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-center", children: "Interrupções" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-center", children: "Subtarefas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-center", children: "No prazo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-center", children: "% prazo" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((r) => {
        const subPct = r.subtasksTotal ? Math.round(r.subtasksDone / r.subtasksTotal * 100) : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b last:border-b-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r.fullName }),
            !r.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "Desativado" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-center font-medium", children: r.total }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-center text-emerald-600", children: r.done }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-center text-amber-600", children: r.pending }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-center text-red-600", children: r.overdue }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-center text-purple-600", children: r.interruptions }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-center text-sky-600", children: r.subtasksTotal ? `${r.subtasksDone}/${r.subtasksTotal} (${subPct}%)` : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-center", children: r.onTime }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-center", children: [
            r.onTimeRate,
            "%"
          ] })
        ] }, r.id);
      }) })
    ] }) })
  ] });
}
function ClientByUserTable({
  clients,
  users,
  tasks
}) {
  const activeClients = clients.filter((c) => tasks.some((t) => t.client_id === c.id));
  if (activeClients.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 font-semibold", children: "Demandas por cliente × usuário" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sem demandas com cliente no período." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 font-semibold", children: "Demandas por cliente × usuário" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs text-muted-foreground", children: 'Quantidade de tarefas atribuídas a cada usuário, agrupadas por cliente. "Concl." = concluídas.' }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b text-left text-xs uppercase text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 pr-3", children: "Cliente" }),
        users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: u.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-normal text-muted-foreground", children: u.isAdmin ? "admin" : "colaborador" })
        ] }) }, u.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-2 text-center", children: "Total" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: activeClients.map((c) => {
        const clientTasks = tasks.filter((t) => t.client_id === c.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b last:border-b-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full", style: {
              background: c.color || "#1e3a8a"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: c.name })
          ] }) }),
          users.map((u) => {
            const ut = clientTasks.filter((t) => t.assignee_id === u.id);
            const done = ut.filter((t) => t.status === "done").length;
            return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-2 text-center", children: ut.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: ut.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-xs text-emerald-600", children: [
                "(",
                done,
                " concl.)"
              ] })
            ] }) }, u.id);
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-2 text-center font-semibold", children: clientTasks.length })
        ] }, c.id);
      }) })
    ] }) })
  ] });
}
export {
  ReportsPage as component
};
