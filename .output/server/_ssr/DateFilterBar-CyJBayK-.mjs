import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Button } from "./router-DXKzFnT6.mjs";
import { d as dateFilterLabels } from "./task-utils-DZ472SbJ.mjs";
import { a as Sparkles, G as Clock, J as TriangleAlert, O as CalendarDays, V as CalendarRange, W as CalendarX, K as ListTodo, Y as SquareCheckBig } from "../_libs/lucide-react.mjs";
const items = [
  { value: "all", icon: Sparkles },
  { value: "today", icon: Clock },
  { value: "due_today", icon: TriangleAlert },
  { value: "tomorrow", icon: CalendarDays },
  { value: "this_week", icon: CalendarRange },
  { value: "this_month", icon: CalendarRange },
  { value: "overdue", icon: TriangleAlert },
  { value: "no_due", icon: CalendarX },
  { value: "pending", icon: ListTodo },
  { value: "completed", icon: SquareCheckBig }
];
function DateFilterBar({
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: items.map((it) => {
    const Icon = it.icon;
    const active = value === it.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        size: "sm",
        variant: active ? "default" : "outline",
        onClick: () => onChange(it.value),
        className: "h-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "mr-1.5 h-3.5 w-3.5" }),
          dateFilterLabels[it.value]
        ]
      },
      it.value
    );
  }) });
}
export {
  DateFilterBar as D
};
