import { isTaskCompleted } from "./task-utils";

/** Agrupamento por prazo usado nas telas de tarefas do celular. */
export type DueGroupKey = "overdue" | "today" | "tomorrow" | "week" | "later" | "none" | "done";

export const DUE_GROUP_LABELS: Record<DueGroupKey, string> = {
  overdue: "Atrasadas",
  today: "Hoje",
  tomorrow: "Amanhã",
  week: "Esta semana",
  later: "Depois",
  none: "Sem prazo",
  done: "Concluídas",
};

const ORDER: DueGroupKey[] = ["overdue", "today", "tomorrow", "week", "later", "none", "done"];
const DAY_MS = 86_400_000;
const keyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Sao_Paulo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Dia civil em Brasília (`YYYY-MM-DD`), independente do fuso do aparelho. */
export function dayKey(date: Date): string {
  return keyFormatter.format(date);
}

function keyToNoon(key: string): Date {
  return new Date(`${key}T12:00:00-03:00`);
}

function daysBetween(fromKey: string, toKey: string): number {
  return Math.round((keyToNoon(toKey).getTime() - keyToNoon(fromKey).getTime()) / DAY_MS);
}

type DueTask = { due_date: string | null; completed_at?: string | null; status?: string | null };

export function groupTasksByDue<T extends DueTask>(
  tasks: T[],
  now: Date = new Date(),
  isDone: (task: T) => boolean = (task) => isTaskCompleted(task),
): { key: DueGroupKey; label: string; tasks: T[] }[] {
  const todayKey = dayKey(now);
  const buckets = new Map<DueGroupKey, T[]>();
  for (const task of tasks) {
    let key: DueGroupKey;
    if (isDone(task)) key = "done";
    else if (!task.due_date) key = "none";
    else {
      const diff = daysBetween(todayKey, dayKey(new Date(task.due_date)));
      key =
        diff < 0
          ? "overdue"
          : diff === 0
            ? "today"
            : diff === 1
              ? "tomorrow"
              : diff <= 7
                ? "week"
                : "later";
    }
    const list = buckets.get(key) ?? [];
    list.push(task);
    buckets.set(key, list);
  }
  const time = (task: T) =>
    task.due_date ? new Date(task.due_date).getTime() : Number.POSITIVE_INFINITY;
  return ORDER.filter((key) => buckets.has(key)).map((key) => ({
    key,
    label: DUE_GROUP_LABELS[key],
    tasks: [...buckets.get(key)!].sort((a, b) =>
      key === "done" ? time(b) - time(a) : time(a) - time(b),
    ),
  }));
}

/** Segunda a domingo da semana de `anchor`, cada dia ao meio-dia de Brasília. */
export function weekDaysAround(anchor: Date): Date[] {
  const noon = keyToNoon(dayKey(anchor));
  const weekday = noon.getUTCDay(); // meio-dia BRT = 15h UTC, mesmo dia
  const monday = new Date(noon.getTime() - ((weekday + 6) % 7) * DAY_MS);
  return Array.from({ length: 7 }, (_, index) => new Date(monday.getTime() + index * DAY_MS));
}

export function tasksOnDay<T extends { due_date: string | null }>(tasks: T[], day: Date): T[] {
  const key = dayKey(day);
  return tasks.filter((task) => task.due_date && dayKey(new Date(task.due_date)) === key);
}
