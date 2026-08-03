import { i as isBefore, s as startOfDay, b as isWithinInterval, e as endOfMonth, c as startOfMonth, d as endOfWeek, g as startOfWeek, h as addDays, j as endOfDay } from "../_libs/date-fns.mjs";
const dateFilterLabels = {
  all: "Todas",
  today: "Hoje",
  due_today: "Vence hoje",
  tomorrow: "Amanhã",
  this_week: "Semana",
  this_month: "Mês",
  overdue: "Atrasadas",
  no_due: "Sem prazo",
  completed: "Concluídas",
  pending: "Pendentes"
};
function matchDateFilter(task, filter) {
  const now = /* @__PURE__ */ new Date();
  const due = task.due_date ? new Date(task.due_date) : null;
  const isDone = task.status === "done" || !!task.completed_at;
  switch (filter) {
    case "all":
      return true;
    case "today":
      if (!due) return false;
      return isWithinInterval(due, { start: startOfDay(now), end: endOfDay(now) });
    case "due_today":
      if (!due || isDone) return false;
      return isWithinInterval(due, { start: startOfDay(now), end: endOfDay(now) });
    case "tomorrow":
      if (!due) return false;
      const t = addDays(now, 1);
      return isWithinInterval(due, { start: startOfDay(t), end: endOfDay(t) });
    case "this_week":
      if (!due) return false;
      return isWithinInterval(due, {
        start: startOfWeek(now, { weekStartsOn: 1 }),
        end: endOfWeek(now, { weekStartsOn: 1 })
      });
    case "this_month":
      if (!due) return false;
      return isWithinInterval(due, { start: startOfMonth(now), end: endOfMonth(now) });
    case "overdue":
      if (!due || isDone) return false;
      return isBefore(due, startOfDay(now));
    case "no_due":
      return !due;
    case "completed":
      return isDone;
    case "pending":
      return !isDone;
  }
}
const priorityLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  urgent: "Urgente"
};
const priorityColors = {
  low: "#64748b",
  medium: "#2563eb",
  high: "#f59e0b",
  urgent: "#dc2626"
};
export {
  priorityColors as a,
  dateFilterLabels as d,
  matchDateFilter as m,
  priorityLabels as p
};
