import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import type { Profile, Task } from "@/hooks/use-data";
import { MobileTaskCard } from "./MobileTaskCard";
import { MobileTaskActions } from "./MobileTaskActions";

type Column = { id: string; name: string; color?: string | null };

export type MobileKanbanProps = {
  columns: Column[];
  tasksByColumn: Map<string, Task[]>;
  isDone(task: Task): boolean;
  clientNames: Map<string, string>;
  profiles: Map<string, Profile>;
  pendingTaskIds?: Set<string>;
  onOpen(task: Task): void;
  onToggleDone(task: Task): void;
  onMove(task: Task, columnId: string): void;
  onCreateInColumn(columnId: string): void;
  /** Coluna sem botão de adicionar (ex.: Concluídas). */
  readOnlyColumnIds?: Set<string>;
  onActiveColumnChange?(columnId: string): void;
};

/** Kanban do celular: uma coluna por tela, abas no topo e troca por deslize. */
export function MobileKanban({
  columns,
  tasksByColumn,
  isDone,
  clientNames,
  profiles,
  pendingTaskIds,
  onOpen,
  onToggleDone,
  onMove,
  onCreateInColumn,
  readOnlyColumnIds,
  onActiveColumnChange,
}: MobileKanbanProps) {
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = Math.min(active, Math.max(columns.length - 1, 0));

  useEffect(() => {
    const element = scroller.current;
    if (!element) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const index = Math.round(element.scrollLeft / Math.max(element.clientWidth, 1));
        setActive((current) => (current === index ? current : index));
      });
    };
    element.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    tabs.current[activeIndex]?.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: "smooth",
    });
    const column = columns[activeIndex];
    if (column) onActiveColumnChange?.(column.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, columns[activeIndex]?.id]);

  const goTo = (index: number) => {
    const element = scroller.current;
    setActive(index);
    element?.scrollTo({ left: index * element.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        role="tablist"
        aria-label="Colunas"
        className="flex shrink-0 gap-1 overflow-x-auto border-b px-3 [scrollbar-width:none]"
      >
        {columns.map((column, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={column.id}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              type="button"
              role="tab"
              aria-selected={selected}
              className={`flex min-h-11 shrink-0 items-center gap-1.5 border-b-2 px-3 text-sm font-medium transition-colors ${
                selected
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground"
              }`}
              onClick={() => goTo(index)}
            >
              {column.color && (
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ background: column.color }}
                />
              )}
              {column.name}
              <span className="rounded-full bg-muted px-1.5 text-xs text-muted-foreground">
                {tasksByColumn.get(column.id)?.length ?? 0}
              </span>
            </button>
          );
        })}
      </div>
      <div
        ref={scroller}
        className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none]"
      >
        {columns.map((column) => {
          const items = tasksByColumn.get(column.id) ?? [];
          return (
            <section
              key={column.id}
              aria-label={column.name}
              className="w-full shrink-0 snap-start overflow-y-auto px-3 pb-28 pt-3"
            >
              <ul className="space-y-2">
                {items.map((task) => (
                  <li key={task.id}>
                    <MobileTaskCard
                      task={task}
                      clientName={clientNames.get(task.client_id ?? "")}
                      assignee={profiles.get(task.assignee_id ?? "")}
                      isDone={isDone(task)}
                      pending={pendingTaskIds?.has(task.id)}
                      onOpen={() => onOpen(task)}
                      onToggleDone={() => onToggleDone(task)}
                      actions={
                        <MobileTaskActions
                          task={{ title: task.title, column_id: column.id }}
                          columns={columns}
                          onMove={(columnId) => onMove(task, columnId)}
                        />
                      }
                    />
                  </li>
                ))}
              </ul>
              {items.length === 0 && (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  Nenhuma tarefa nesta coluna
                </p>
              )}
              {!readOnlyColumnIds?.has(column.id) && (
                <button
                  type="button"
                  className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed text-sm text-muted-foreground active:bg-muted"
                  aria-label={`Adicionar tarefa em ${column.name}`}
                  onClick={() => onCreateInColumn(column.id)}
                >
                  <Plus className="h-4 w-4" /> Adicionar tarefa
                </button>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
