import { useRef, type ReactNode } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Profile, Task } from "@/hooks/use-data";
import { dayKey, tasksOnDay, weekDaysAround } from "@/lib/mobile-task-groups";
import { MobileTaskCard } from "./MobileTaskCard";

const WEEKDAY_LETTERS = ["S", "T", "Q", "Q", "S", "S", "D"];
const WEEK_MS = 7 * 86_400_000;

export function shiftWeek(day: Date, direction: -1 | 1): Date {
  return new Date(day.getTime() + direction * WEEK_MS);
}

export type MobileDayAgendaProps = {
  tasks: Task[];
  selectedDay: Date;
  onSelectDay(day: Date): void;
  isDone(task: Task): boolean;
  clientNames: Map<string, string>;
  profiles: Map<string, Profile>;
  onOpen(task: Task): void;
  onToggleDone(task: Task): void;
  /** Só para testes; padrão é agora. */
  today?: Date;
  /** Ações extras ao lado do mês (ex.: filtro "Fixadas"). */
  toolbar?: ReactNode;
};

/** Calendário do celular: faixa da semana + tarefas do dia escolhido. */
export function MobileDayAgenda({
  tasks,
  selectedDay,
  onSelectDay,
  isDone,
  clientNames,
  profiles,
  onOpen,
  onToggleDone,
  today = new Date(),
  toolbar,
}: MobileDayAgendaProps) {
  const days = weekDaysAround(selectedDay);
  const selectedKey = dayKey(selectedDay);
  const todayKey = dayKey(today);
  const dayTasks = tasksOnDay(tasks, selectedDay).sort(
    (a, b) =>
      Number(isDone(a)) - Number(isDone(b)) ||
      new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime(),
  );
  const touchStart = useRef<number | null>(null);

  return (
    <div className="space-y-3 pb-24">
      <div className="flex items-center gap-1">
        <span className="mr-auto text-base font-semibold capitalize">
          {format(selectedDay, "MMMM yyyy", { locale: ptBR })}
        </span>
        {toolbar}
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full active:bg-muted"
          aria-label="Semana anterior"
          onClick={() => onSelectDay(shiftWeek(selectedDay, -1))}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="h-11 rounded-full px-3 text-sm font-medium active:bg-muted"
          onClick={() => onSelectDay(today)}
        >
          Hoje
        </button>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full active:bg-muted"
          aria-label="Próxima semana"
          onClick={() => onSelectDay(shiftWeek(selectedDay, 1))}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div
        className="grid grid-cols-7 gap-1 rounded-2xl border bg-card p-1.5"
        onTouchStart={(event) => {
          touchStart.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          touchStart.current = null;
          const end = event.changedTouches[0]?.clientX;
          if (start === null || end === undefined || Math.abs(end - start) < 50) return;
          onSelectDay(shiftWeek(selectedDay, end < start ? 1 : -1));
        }}
      >
        {days.map((day, index) => {
          const key = dayKey(day);
          const selected = key === selectedKey;
          const isToday = key === todayKey;
          const hasTasks = tasksOnDay(tasks, day).some((task) => !isDone(task));
          return (
            <button
              key={key}
              type="button"
              data-day={key}
              data-has-tasks={hasTasks ? "true" : "false"}
              aria-pressed={selected}
              aria-label={format(day, "EEEE, d 'de' MMMM", { locale: ptBR })}
              className={`flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl text-xs transition-colors ${
                selected
                  ? "bg-primary text-primary-foreground"
                  : isToday
                    ? "text-primary"
                    : "text-foreground active:bg-muted"
              }`}
              onClick={() => onSelectDay(day)}
            >
              <span className={selected ? "opacity-80" : "text-muted-foreground"}>
                {WEEKDAY_LETTERS[index]}
              </span>
              <span className={`text-base ${isToday || selected ? "font-bold" : "font-medium"}`}>
                {key.slice(8)}
              </span>
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${hasTasks ? (selected ? "bg-primary-foreground" : "bg-primary") : "bg-transparent"}`}
              />
            </button>
          );
        })}
      </div>
      <h2 className="px-1 text-sm font-semibold text-muted-foreground first-letter:uppercase">
        {selectedKey === todayKey
          ? "Hoje"
          : format(selectedDay, "EEEE, d 'de' MMMM", { locale: ptBR })}
      </h2>
      {dayTasks.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          Nada para este dia
        </p>
      ) : (
        <ul className="space-y-2">
          {dayTasks.map((task) => (
            <li key={task.id}>
              <MobileTaskCard
                task={task}
                clientName={clientNames.get(task.client_id ?? "")}
                assignee={profiles.get(task.assignee_id ?? "")}
                isDone={isDone(task)}
                onOpen={() => onOpen(task)}
                onToggleDone={() => onToggleDone(task)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
