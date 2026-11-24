import type { ReactNode } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Check, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Profile, Task } from "@/hooks/use-data";
import { dueUrgencyState, dueUrgencyTextClass, priorityColors } from "@/lib/task-utils";

export type MobileTaskCardProps = {
  task: Task;
  clientName?: string;
  assignee?: Profile;
  isDone: boolean;
  pending?: boolean;
  onOpen(): void;
  onToggleDone(): void;
  /** Menu de ações (⋯) exibido à direita, ex.: "Mover para…". */
  actions?: ReactNode;
};

function dueLabel(task: Task) {
  if (!task.due_date) return null;
  const state = dueUrgencyState(task);
  const date = new Date(task.due_date);
  const text =
    state === "today"
      ? "Hoje"
      : state === "tomorrow"
        ? "Amanhã"
        : format(date, "dd MMM", { locale: ptBR });
  return {
    text: task.due_time ? `${text} · ${task.due_time.slice(0, 5)}` : text,
    className: dueUrgencyTextClass[state],
  };
}

function initials(profile?: Profile) {
  const name = profile?.full_name || profile?.email || "";
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/** Cartão de tarefa das telas de celular (Lista, Kanban e Calendário). */
export function MobileTaskCard({
  task,
  clientName,
  assignee,
  isDone,
  pending,
  onOpen,
  onToggleDone,
  actions,
}: MobileTaskCardProps) {
  const due = dueLabel(task);
  return (
    <div
      className={`relative flex min-w-0 items-start gap-1 overflow-hidden rounded-xl border bg-card py-1.5 pl-1 pr-1 shadow-sm ${isDone ? "opacity-70" : ""}`}
      aria-busy={pending || undefined}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1"
        style={{ background: priorityColors[task.priority ?? "medium"] ?? priorityColors.medium }}
      />
      <button
        type="button"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full disabled:cursor-default"
        aria-label={isDone ? "Tarefa concluída" : `Concluir tarefa ${task.title}`}
        disabled={isDone || pending}
        onClick={(event) => {
          event.stopPropagation();
          onToggleDone();
        }}
      >
        <span
          className={`grid h-6 w-6 place-items-center rounded-full border-2 transition-colors ${
            isDone
              ? "border-emerald-600 bg-emerald-600 text-white"
              : "border-muted-foreground/50 active:bg-muted"
          }`}
        >
          {isDone && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </span>
      </button>
      <button
        type="button"
        className="min-w-0 flex-1 py-1.5 text-left"
        aria-label={`Abrir tarefa ${task.title}`}
        onClick={onOpen}
      >
        <span
          className={`line-clamp-2 text-[15px] font-medium leading-snug ${isDone ? "line-through decoration-2" : ""}`}
        >
          {task.title}
        </span>
        <span className="mt-1 flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
          {due && (
            <span className={`inline-flex shrink-0 items-center gap-1 ${due.className}`}>
              <Clock className="h-3 w-3" aria-hidden="true" />
              {due.text}
            </span>
          )}
          {clientName && <span className="min-w-0 truncate">{clientName}</span>}
          {pending && <span className="shrink-0">Salvando…</span>}
        </span>
      </button>
      {assignee && (
        <Avatar
          className="mt-2.5 h-7 w-7 shrink-0"
          title={assignee.full_name || assignee.email || undefined}
        >
          {assignee.avatar_url && <AvatarImage src={assignee.avatar_url} alt="" />}
          <AvatarFallback className="text-[10px]">{initials(assignee)}</AvatarFallback>
        </Avatar>
      )}
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
