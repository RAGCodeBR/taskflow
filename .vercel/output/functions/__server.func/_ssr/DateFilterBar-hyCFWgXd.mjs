import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Button } from "./router-ZM7179_C.mjs";
import { d as dateFilterLabels } from "./task-utils-DZ472SbJ.mjs";
import { a as Sparkles, a2 as Clock, a3 as TriangleAlert, a5 as CalendarDays, a6 as CalendarRange, a7 as CalendarX, a4 as ListTodo, a8 as SquareCheckBig } from "../_libs/lucide-react.mjs";
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
