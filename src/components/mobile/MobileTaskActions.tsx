import { ArrowRightLeft, Copy, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Column = { id: string; name: string };

export function moveTargets<C extends Column>(
  columns: C[],
  task: { column_id: string | null },
): C[] {
  return columns.filter((column) => column.id !== task.column_id);
}

/** Menu ⋯ do cartão no celular. Mover por menu porque arrastar no toque falha. */
export function MobileTaskActions({
  task,
  columns,
  canDelete,
  onMove,
  onDuplicate,
  onDelete,
}: {
  task: { title: string; column_id: string | null };
  columns: Column[];
  canDelete?: boolean;
  onMove(columnId: string): void;
  onDuplicate?(): void;
  onDelete?(): void;
}) {
  const targets = moveTargets(columns, task);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="grid h-11 w-9 place-items-center rounded-md text-muted-foreground active:bg-muted"
        aria-label={`Ações da tarefa ${task.title}`}
      >
        <MoreHorizontal className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {targets.length > 0 && (
          <>
            <DropdownMenuLabel className="flex items-center gap-2 text-xs text-muted-foreground">
              <ArrowRightLeft className="h-3.5 w-3.5" /> Mover para…
            </DropdownMenuLabel>
            {targets.map((column) => (
              <DropdownMenuItem
                key={column.id}
                className="min-h-11"
                onSelect={() => onMove(column.id)}
              >
                {column.name}
              </DropdownMenuItem>
            ))}
          </>
        )}
        {(onDuplicate || (canDelete && onDelete)) && targets.length > 0 && (
          <DropdownMenuSeparator />
        )}
        {onDuplicate && (
          <DropdownMenuItem className="min-h-11" onSelect={onDuplicate}>
            <Copy className="mr-2 h-4 w-4" /> Duplicar
          </DropdownMenuItem>
        )}
        {canDelete && onDelete && (
          <DropdownMenuItem
            className="min-h-11 text-destructive focus:text-destructive"
            onSelect={onDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Mover para a lixeira
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
