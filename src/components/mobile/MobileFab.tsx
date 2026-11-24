import { Plus } from "lucide-react";

/** Botão flutuante "Nova tarefa" das telas de tarefas no celular. */
export function MobileFab({ onClick }: { onClick(): void }) {
  return (
    <button
      type="button"
      aria-label="Nova tarefa"
      onClick={onClick}
      className="fixed right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform active:scale-95 md:hidden"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <Plus className="h-6 w-6" strokeWidth={2.5} />
    </button>
  );
}
