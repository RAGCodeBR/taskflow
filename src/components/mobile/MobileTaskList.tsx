import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { Profile, Task } from "@/hooks/use-data";
import { groupTasksByDue } from "@/lib/mobile-task-groups";
import { MobileTaskCard } from "./MobileTaskCard";

export type MobileTaskListProps = {
  tasks: Task[];
  isDone(task: Task): boolean;
  clientNames: Map<string, string>;
  profiles: Map<string, Profile>;
  pendingTaskIds?: Set<string>;
  onOpen(task: Task): void;
  onToggleDone(task: Task): void;
  renderActions?(task: Task): ReactNode;
  /** Só para testes; padrão é agora. */
  now?: Date;
  /** Conteúdo extra no fim (ex.: subtarefas concluídas hoje). */
  footer?: ReactNode;
};

/** Lista de tarefas do celular: cartões agrupados por prazo. */
export function MobileTaskList({
  tasks,
  isDone,
  clientNames,
  profiles,
  pendingTaskIds,
  onOpen,
  onToggleDone,
  renderActions,
  now,
  footer,
}: MobileTaskListProps) {
  const groups = groupTasksByDue(tasks, now, isDone);
  if (groups.length === 0 && !footer) {
    return (
      <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
        Nenhuma tarefa por aqui
      </p>
    );
  }
  return (
    <div className="space-y-3 pb-24">
      {groups.map((group) => (
        <details key={group.key} open={group.key !== "done"} className="group/section">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 px-1 text-sm font-semibold [&::-webkit-details-marker]:hidden">
            <span className={group.key === "overdue" ? "text-destructive" : undefined}>
              {group.label}
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {group.tasks.length}
            </span>
            <ChevronDown
              className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-open/section:rotate-0 -rotate-90"
              aria-hidden="true"
            />
          </summary>
          <ul className="space-y-2">
            {group.tasks.map((task) => (
              <li key={task.id}>
                <MobileTaskCard
                  task={task}
                  clientName={clientNames.get(task.client_id ?? "")}
                  assignee={profiles.get(task.assignee_id ?? "")}
                  isDone={isDone(task)}
                  pending={pendingTaskIds?.has(task.id)}
                  onOpen={() => onOpen(task)}
                  onToggleDone={() => onToggleDone(task)}
                  actions={renderActions?.(task)}
                />
              </li>
            ))}
          </ul>
        </details>
      ))}
      {footer}
    </div>
  );
}
