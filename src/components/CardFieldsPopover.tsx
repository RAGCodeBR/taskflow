import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Eye, EyeOff, GripVertical, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  ALL_FIELDS,
  FIELD_LABELS,
  type CardField,
  useBoardPreferences,
  useUpdateBoardPreferences,
} from "@/hooks/use-board-preferences";
import { cn } from "@/lib/utils";

function SortableRow({
  field,
  hidden,
  onToggle,
}: {
  field: CardField;
  hidden: boolean;
  onToggle: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "flex items-center gap-2 rounded-md border bg-card px-2 py-1.5",
        isDragging && "z-10 shadow",
        hidden && "opacity-50",
      )}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none rounded p-1 text-muted-foreground hover:bg-muted"
        aria-label="Arrastar"
      >
        <GripVertical className="h-3.5 w-3.5" />
      </button>
      <span className="flex-1 text-xs">{FIELD_LABELS[field]}</span>
      <button
        type="button"
        onClick={onToggle}
        className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        title={hidden ? "Mostrar" : "Ocultar"}
      >
        {hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

export function CardFieldsPopover() {
  const [open, setOpen] = useState(false);
  const { data: prefs } = useBoardPreferences();
  const update = useUpdateBoardPreferences();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const order = prefs?.field_order ?? [...ALL_FIELDS];
  const hidden = prefs?.hidden_fields ?? [];

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = order.indexOf(active.id as CardField);
    const newIndex = order.indexOf(over.id as CardField);
    if (oldIndex < 0 || newIndex < 0) return;
    update.mutate({ field_order: arrayMove(order, oldIndex, newIndex) });
  }

  function toggle(field: CardField) {
    const next = hidden.includes(field) ? hidden.filter((f) => f !== field) : [...hidden, field];
    update.mutate({ hidden_fields: next });
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 rounded-full">
          <Settings2 className="h-3.5 w-3.5" />
          Configurar card
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3" align="end">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Campos do card</span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => update.mutate({ hidden_fields: [] })}
              className="text-[10px] text-primary hover:underline"
            >
              Mostrar tudo
            </button>
            <span className="text-[10px] text-muted-foreground">·</span>
            <button
              type="button"
              onClick={() => update.mutate({ hidden_fields: [...ALL_FIELDS] })}
              className="text-[10px] text-primary hover:underline"
            >
              Ocultar tudo
            </button>
          </div>
        </div>
        <p className="mb-2 text-[10px] text-muted-foreground">
          Arraste para reordenar. Clique no olho para mostrar/ocultar. A configuração vale para todos os cards do quadro.
        </p>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={order} strategy={verticalListSortingStrategy}>
            <div className="space-y-1">
              {order.map((field) => (
                <SortableRow
                  key={field}
                  field={field}
                  hidden={hidden.includes(field)}
                  onToggle={() => toggle(field)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

      </PopoverContent>
    </Popover>
  );
}
