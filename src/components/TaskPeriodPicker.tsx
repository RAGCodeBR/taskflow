import { Button } from "@/components/ui/button";
import type { DateFilter } from "@/lib/task-utils";

const periods: Array<{ value: DateFilter; label: string }> = [
  { value: "all", label: "Todas" },
  { value: "today", label: "Hoje" },
  { value: "this_week", label: "Semana" },
  { value: "this_month", label: "Mês" },
];

export function TaskPeriodPicker({ value, onChange }: { value?: DateFilter; onChange: (value: DateFilter) => void }) {
  return <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Período das tarefas">
    <span className="mr-1 text-xs text-muted-foreground">Prazo:</span>
    {periods.map((period) => <Button key={period.value} type="button" size="sm" variant={(value ?? "all") === period.value ? "secondary" : "ghost"} className="h-7 rounded-full px-2.5 text-xs" onClick={() => onChange(period.value)}>{period.label}</Button>)}
  </div>;
}
