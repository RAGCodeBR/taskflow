import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useClients, u as useAuth, f as useTasks, C as Card, S as Select, n as SelectTrigger, o as SelectValue, p as SelectContent, q as SelectItem, I as Input, B as Button, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./router-ZM7179_C.mjs";
import "../_libs/sonner.mjs";
import "../_libs/marked.mjs";
import "../_libs/seroval.mjs";
import { f as format, m as eachDayOfInterval, g as endOfWeek, e as endOfMonth, h as startOfWeek, d as startOfMonth, p as ptBR, n as subMonths, o as addMonths, q as isSameMonth } from "../_libs/date-fns.mjs";
import { ao as ChevronLeft, ap as ChevronRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./client-Bh9iiLf9.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "./server-DJ8sPH9h.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-CTknNXUw.mjs";
function ClientDeliveriesPage() {
  const {
    data: clients = []
  } = useClients();
  const {
    isClient,
    clientId: linkedClientId
  } = useAuth();
  const {
    data: tasks = []
  } = useTasks();
  const [clientId, setClientId] = reactExports.useState("");
  const [month, setMonth] = reactExports.useState(/* @__PURE__ */ new Date());
  const [selectedDate, setSelectedDate] = reactExports.useState(() => format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"));
  const [selectedTask, setSelectedTask] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (isClient) setClientId(linkedClientId ?? "");
    else if (!clientId && clients[0]) setClientId(clients[0].id);
  }, [clientId, clients, isClient, linkedClientId]);
  const selectDate = (value) => {
    setSelectedDate(value);
    if (value) setMonth(/* @__PURE__ */ new Date(`${value}T12:00:00`));
  };
  const client = clients.find((item) => item.id === clientId);
  const deliveries = reactExports.useMemo(() => tasks.filter((task) => task.client_id === clientId && task.due_date), [clientId, tasks]);
  const deliveriesByDay = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    deliveries.forEach((task) => {
      const key = format(new Date(task.due_date), "yyyy-MM-dd");
      map.set(key, [...map.get(key) ?? [], task]);
    });
    return map;
  }, [deliveries]);
  const days = reactExports.useMemo(() => eachDayOfInterval({
    start: startOfWeek(startOfMonth(month), {
      weekStartsOn: 1
    }),
    end: endOfWeek(endOfMonth(month), {
      weekStartsOn: 1
    })
  }), [month]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-6 p-4 sm:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary", children: "Portal do Cliente" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Calendário de Entregas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Veja a quantidade de tarefas e os prazos de entrega por cliente." })
    ] }),
    isClient ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Cliente vinculado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-semibold", children: client?.name ?? "Cliente não vinculado" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-sm font-medium", children: "Cliente" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: clientId, onValueChange: setClientId, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecione o cliente" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: clients.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: item.id, children: item.name }, item.id)) })
      ] })
    ] }),
    !clientId ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { text: "Cadastre ou selecione um cliente para ver o calendário." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold", children: [
            "Entregas de ",
            client?.name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm capitalize text-muted-foreground", children: format(month, "MMMM 'de' yyyy", {
            locale: ptBR
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "sr-only", htmlFor: "delivery-date", children: "Escolher data" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "delivery-date", type: "date", value: selectedDate, onChange: (event) => selectDate(event.target.value), className: "h-9 w-[150px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "outline", "aria-label": "Mês anterior", onClick: () => setMonth((current) => subMonths(current)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => {
            const today = /* @__PURE__ */ new Date();
            setMonth(today);
            setSelectedDate(format(today, "yyyy-MM-dd"));
          }, children: "Hoje" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "outline", "aria-label": "Próximo mês", onClick: () => setMonth((current) => addMonths(current, 1)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 border-b bg-muted/40 text-center text-[10px] font-semibold uppercase text-muted-foreground sm:text-xs", children: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((label) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: label }, label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7", children: days.map((day) => {
        const key = format(day, "yyyy-MM-dd");
        const items = deliveriesByDay.get(key) ?? [];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `min-h-28 border-b border-r p-1.5 sm:min-h-36 sm:p-2 ${isSameMonth(day, month) ? "" : "bg-muted/20 text-muted-foreground"} ${key === selectedDate ? "bg-primary/5 ring-1 ring-inset ring-primary" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: format(day, "d") }),
            items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground", children: items.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            items.slice(0, 2).map((task) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSelectedTask(task), className: "block w-full truncate rounded px-1 py-0.5 text-left text-[10px] text-foreground hover:bg-muted sm:text-xs", title: `Ver ${task.title}`, children: task.title }, task.id)),
            items.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
              "+",
              items.length - 2,
              " tarefas"
            ] })
          ] })
        ] }, key);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selectedTask, onOpenChange: (open) => !open && setSelectedTask(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: selectedTask?.title }) }),
      selectedTask?.due_date && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Prazo: ",
        format(new Date(selectedTask.due_date), "dd/MM/yyyy")
      ] })
    ] }) })
  ] });
}
function Empty({
  text
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-10 text-center text-sm text-muted-foreground", children: text });
}
export {
  ClientDeliveriesPage as component
};
