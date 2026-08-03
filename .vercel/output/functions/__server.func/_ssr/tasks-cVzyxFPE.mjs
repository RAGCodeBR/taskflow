import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useRouterState, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { ai as SquareKanban, V as List, J as Calendar } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function TasksLayout() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname
  });
  const views = [{
    to: "/tasks/kanban",
    label: "Kanban",
    icon: SquareKanban
  }, {
    to: "/tasks/list",
    label: "Lista",
    icon: List
  }, {
    to: "/tasks/calendar",
    label: "Calendário",
    icon: Calendar
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-30 flex items-center gap-2 border-b bg-background/95 px-6 py-3 backdrop-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2 text-sm font-medium text-muted-foreground", children: "Visualizar como:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex rounded-lg border bg-muted/40 p-1", children: views.map((v) => {
        const active = pathname === v.to || pathname.startsWith(v.to + "/");
        const Icon = v.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: v.to, className: `flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition ${active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
          v.label
        ] }, v.to);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] });
}
export {
  TasksLayout as component
};
