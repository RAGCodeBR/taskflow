import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAuth, f as useTasks, e as useClients, g as useProfiles, h as useColumns, C as Card } from "./router-DXKzFnT6.mjs";
import { D as DateFilterBar } from "./DateFilterBar-CyJBayK-.mjs";
import { m as matchDateFilter } from "./task-utils-DZ472SbJ.mjs";
import "../_libs/sonner.mjs";
import { G as Clock, J as TriangleAlert, K as ListTodo, A as CircleCheck } from "../_libs/lucide-react.mjs";
import { a as format, p as ptBR, k as parseISO } from "../_libs/date-fns.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, P as PieChart, b as Pie, c as Cell } from "../_libs/recharts.mjs";

import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/unenv.mjs";


import "../_libs/seroval-plugins.mjs";


import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "./client-Bh9iiLf9.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
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
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
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
function Stat({
  label,
  value,
  icon: Icon,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-3xl font-bold tracking-tight", children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-xl", style: {
      background: `${color}20`,
      color
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) })
  ] }) });
}
function Dashboard() {
  const {
    profile,
    user,
    isAdmin
  } = useAuth();
  const {
    data: tasks = []
  } = useTasks();
  const {
    data: clients = []
  } = useClients();
  const {
    data: profiles = []
  } = useProfiles();
  useColumns();
  const [filter, setFilter] = reactExports.useState("all");
  const greetingName = profile?.full_name?.split(" ")[0] || user?.email?.split("@")[0];
  const filtered = reactExports.useMemo(() => tasks.filter((t) => matchDateFilter(t, filter)), [tasks, filter]);
  const stats = reactExports.useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "done").length;
    const pending = total - done;
    const overdue = tasks.filter((t) => matchDateFilter(t, "overdue")).length;
    const today = tasks.filter((t) => matchDateFilter(t, "today")).length;
    const week = tasks.filter((t) => matchDateFilter(t, "this_week")).length;
    const month = tasks.filter((t) => matchDateFilter(t, "this_month")).length;
    return {
      total,
      done,
      pending,
      overdue,
      today,
      week,
      month
    };
  }, [tasks]);
  const byClient = reactExports.useMemo(() => clients.map((c) => ({
    name: c.name,
    value: tasks.filter((t) => t.client_id === c.id).length,
    color: c.color || "#1e3a8a"
  })).filter((c) => c.value > 0), [clients, tasks]);
  const byUser = reactExports.useMemo(() => profiles.map((p) => ({
    name: (p.full_name || p.email || "?").slice(0, 12),
    feitas: tasks.filter((t) => t.assignee_id === p.id && t.status === "done").length,
    pendentes: tasks.filter((t) => t.assignee_id === p.id && t.status !== "done").length
  })), [profiles, tasks]);
  if (!isAdmin) {
    const myTasks = tasks.filter((t) => t.assignee_id === user?.id || t.created_by === user?.id);
    const myPending = myTasks.filter((t) => t.status !== "done");
    const myOverdue = myTasks.filter((t) => matchDateFilter(t, "overdue"));
    const myToday = myTasks.filter((t) => matchDateFilter(t, "today"));
    const myWeek = myTasks.filter((t) => matchDateFilter(t, "this_week"));
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold tracking-tight", children: [
          "Olá, ",
          greetingName
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Suas tarefas pendentes e atrasadas" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Minhas pendentes", value: myPending.length, icon: Clock, color: "#f59e0b" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Atrasadas", value: myOverdue.length, icon: TriangleAlert, color: "#dc2626" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Para hoje", value: myToday.length, icon: Clock, color: "#1e3a8a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Esta semana", value: myWeek.length, icon: Clock, color: "#7c3aed" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-3 font-semibold text-red-600", children: [
          "Atrasadas (",
          myOverdue.length,
          ")"
        ] }),
        myOverdue.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Nada atrasado. 🎉" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: myOverdue.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between rounded border border-red-200 bg-red-50 p-2 text-sm dark:bg-red-950/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: t.title }),
          t.due_date && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-red-600", children: format(parseISO(t.due_date), "dd/MM", {
            locale: ptBR
          }) })
        ] }, t.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-3 font-semibold", children: [
          "Pendentes (",
          myPending.length,
          ")"
        ] }),
        myPending.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sem tarefas pendentes." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: myPending.slice(0, 20).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between rounded border bg-muted/30 p-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: t.title }),
          t.due_date && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: format(parseISO(t.due_date), "dd/MM", {
            locale: ptBR
          }) })
        ] }, t.id)) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold tracking-tight", children: [
        "Olá, ",
        greetingName
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Visão geral da produtividade da equipe" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DateFilterBar, { value: filter, onChange: setFilter }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Total de tarefas", value: stats.total, icon: ListTodo, color: "#2563eb" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Concluídas", value: stats.done, icon: CircleCheck, color: "#059669" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Pendentes", value: stats.pending, icon: Clock, color: "#f59e0b" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Atrasadas", value: stats.overdue, icon: TriangleAlert, color: "#dc2626" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Hoje", value: stats.today, icon: Clock, color: "#1e3a8a" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Esta semana", value: stats.week, icon: Clock, color: "#7c3aed" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Este mês", value: stats.month, icon: Clock, color: "#0891b2" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 font-semibold", children: "Tarefas por usuário" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: byUser, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "feitas", stackId: "a", fill: "#059669", radius: [0, 0, 0, 0] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "pendentes", stackId: "a", fill: "#f59e0b", radius: [4, 4, 0, 0] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 font-semibold", children: "Atividades por cliente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: byClient.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full place-items-center text-sm text-muted-foreground", children: "Nenhum cliente com tarefas ainda" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: byClient, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 80, label: true, children: byClient.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: c.color }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {})
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 font-semibold", children: "Resultado do filtro" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        filtered.length,
        " tarefas correspondem ao filtro selecionado."
      ] })
    ] })
  ] });
}
export {
  Dashboard as component
};
