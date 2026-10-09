import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckCircle2 } from "lucide-react";
import type { Subtask, Task } from "@/hooks/use-data";

export function CompletedSubtaskCard({
  subtask,
  parent,
  orientation,
  onOpen,
}: {
  subtask: Subtask;
  parent: Task;
  orientation: "horizontal" | "vertical";
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`min-w-0 rounded-xl border border-emerald-200 bg-card p-3 text-left shadow-sm transition hover:border-emerald-400 hover:shadow-md dark:border-emerald-900 ${orientation === "horizontal" ? "w-full" : "w-72 shrink-0"}`}
      aria-label={`Subtarefa concluída: ${subtask.title}`}
    >
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
        Subtarefa concluída
      </div>
      <p className="mt-2 break-words text-sm font-medium text-muted-foreground line-through">
        {subtask.title}
      </p>
      <p className="mt-1 truncate text-xs text-muted-foreground">Na tarefa: {parent.title}</p>
      {subtask.completed_at && (
        <p className="mt-2 text-[10px] text-emerald-700 dark:text-emerald-400">
          Concluída em {format(parseISO(subtask.completed_at), "dd MMM yyyy", { locale: ptBR })}
        </p>
      )}
    </button>
  );
}
