import type { ReactNode } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import type { Profile, Subtask, Task } from "@/hooks/use-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/** Children sharing the parent's deadline remain attached to it. */
export function CalendarTaskGroup({
  task,
  subtasks,
  profiles,
  children,
  onOpen,
  expanded = false,
}: {
  task: Task;
  subtasks: Subtask[];
  profiles: Map<string, Profile>;
  children: ReactNode;
  onOpen: () => void;
  expanded?: boolean;
}) {
  return (
    <div className="min-w-0" data-calendar-task-group={task.id}>
      {children}
      {subtasks.length > 0 && (
        <div
          aria-label={`Subtarefas de ${task.title}`}
          className="ml-1 mt-1 max-h-56 space-y-1 overflow-y-auto border-l-2 border-primary/20 pl-1.5 pr-0.5"
        >
          {subtasks.map((subtask) => (
            <CalendarSubtaskItem
              key={subtask.id}
              task={task}
              subtask={subtask}
              profiles={profiles}
              onOpen={onOpen}
              expanded={expanded}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CalendarSubtaskItem({
  task,
  subtask,
  profiles,
  onOpen,
  expanded = false,
  standalone = false,
}: {
  task: Task;
  subtask: Subtask;
  profiles: Map<string, Profile>;
  onOpen: () => void;
  expanded?: boolean;
  standalone?: boolean;
}) {
  const assignee = profiles.get(subtask.assignee_id ?? "");
  const name = assignee?.full_name || assignee?.email || "Sem responsável";
  const Status = subtask.done ? CheckCircle2 : Circle;
  return (
    <button
      type="button"
      data-calendar-subtask={subtask.id}
      className={`flex w-full min-w-0 items-center gap-1 rounded-md border px-1.5 py-1 text-left ${expanded ? "text-xs" : "text-[10px]"} transition hover:border-primary/35 hover:bg-primary/5 ${subtask.done ? "border-emerald-200/70 bg-emerald-50/60 text-muted-foreground dark:border-emerald-900 dark:bg-emerald-950/20" : "border-border bg-background text-foreground"} ${standalone ? "border-l-[3px] border-l-primary" : ""}`}
      title={`${subtask.title} · ${name} · ${subtask.done ? "Concluída" : "Pendente"} · Tarefa principal: ${task.title}`}
      onClick={onOpen}
    >
      <Status
        className={`h-3 w-3 shrink-0 ${subtask.done ? "text-emerald-600" : "text-muted-foreground"}`}
        aria-label={subtask.done ? "Subtarefa concluída" : "Subtarefa pendente"}
      />
      <span className="min-w-0 flex-1">
        <span className={`block truncate ${subtask.done ? "line-through" : ""}`}>
          {subtask.title}
        </span>
        {standalone && (
          <span className="block truncate text-[9px] text-muted-foreground">
            Subtarefa de {task.title}
          </span>
        )}
      </span>
      {assignee && (
        <Avatar className="h-4 w-4 shrink-0 text-[7px]" title={name}>
          <AvatarImage src={assignee.avatar_url || undefined} alt={name} />
          <AvatarFallback>
            {name
              .split(/\s+/)
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
    </button>
  );
}
