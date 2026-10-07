import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

/**
 * Alternador de ambiente das tarefas.
 *
 * Quem pertence a um único ambiente não vê o controle.
 */
export function WorkspaceTaskFilter({
  value,
  onChange,
}: {
  value?: string;
  onChange: (workspaceId?: string) => void;
}) {
  const { workspaces } = useAuth();
  if (workspaces.length < 2) return null;

  const opcoes: Array<{ id?: string; name: string }> = [
    { id: undefined, name: "Todos" },
    ...workspaces.map((workspace) => ({ id: workspace.id, name: workspace.name })),
  ];

  return (
    <div className="inline-flex shrink-0 items-center gap-0.5 rounded-full border bg-muted/40 p-0.5">
      {opcoes.map((opcao) => {
        const ativo = value === opcao.id;
        return (
          <button
            key={opcao.id ?? "todos"}
            type="button"
            onClick={() => onChange(opcao.id)}
            aria-pressed={ativo}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition",
              ativo
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {opcao.name}
          </button>
        );
      })}
    </div>
  );
}
