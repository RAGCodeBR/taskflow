import { Button } from "@/components/ui/button";
import { dateFilterLabels, type DateFilter } from "@/lib/task-utils";
import { CalendarDays, Clock, AlertTriangle, CheckSquare, ListTodo, CalendarRange, CalendarX, Sparkles } from "lucide-react";

const items: { value: DateFilter; icon: typeof Clock }[] = [
  { value: "all", icon: Sparkles },
  { value: "today", icon: Clock },
  { value: "due_today", icon: AlertTriangle },
  { value: "tomorrow", icon: CalendarDays },
  { value: "this_week", icon: CalendarRange },
  { value: "this_month", icon: CalendarRange },
  { value: "overdue", icon: AlertTriangle },
  { value: "no_due", icon: CalendarX },
  { value: "pending", icon: ListTodo },
  { value: "completed", icon: CheckSquare },
];

export function DateFilterBar({
  value,
  onChange,
  hideToday = false,
}: {
  value: DateFilter;
  onChange: (v: DateFilter) => void;
  hideToday?: boolean;
}) {
  const visibleItems = hideToday ? items.filter((it) => it.value !== "today") : items;

  return (
    <div className="flex flex-wrap gap-2">
      {visibleItems.map((it) => {
        const Icon = it.icon;
        const active = value === it.value;
        return (
          <Button
            key={it.value}
            size="sm"
            variant={active ? "default" : "outline"}
            onClick={() => onChange(it.value)}
            className="h-8"
          >
            <Icon className="mr-1.5 h-3.5 w-3.5" />
            {dateFilterLabels[it.value]}
          </Button>
        );
      })}
    </div>
  );
}
