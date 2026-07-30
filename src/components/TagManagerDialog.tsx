import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Save, GripVertical } from "lucide-react";
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useTaskTags, type TaskTag } from "@/hooks/use-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

const PALETTE = [
  "#6366f1", "#8b5cf6", "#ec4899", "#ef4444", "#f59e0b",
  "#10b981", "#06b6d4", "#3b82f6", "#64748b", "#a855f7",
];

export function TagManagerDialog({ open, onOpenChange }: Props) {
  const qc = useQueryClient();
  const { user, isAdmin, isCollaborator } = useAuth();
  const canManageTags = isAdmin || isCollaborator;
  const { data: tags = [] } = useTaskTags();
  const [name, setName] = useState("");
  const [color, setColor] = useState(PALETTE[0]);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const create = async () => {
    if (!name.trim() || !user) return;
    const { error } = await supabase.from("task_tags").insert({
      name: name.trim(), color, created_by: user.id, position: tags.length,
    });
    if (error) return toast.error(error.message);
    setName("");
    qc.invalidateQueries({ queryKey: ["task_tags"] });
    toast.success("Tag criada");
  };

  const update = async (tag: TaskTag, patch: Partial<TaskTag>) => {
    const { error } = await supabase.from("task_tags").update(patch).eq("id", tag.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["task_tags"] });
  };

  const remove = async (tag: TaskTag) => {
    if (!confirm(`Excluir tag "${tag.name}"?`)) return;
    const { error } = await supabase.from("task_tags").delete().eq("id", tag.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["task_tags"] });
    qc.invalidateQueries({ queryKey: ["tasks"] });
    toast.success("Tag excluída");
  };

  const onDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = tags.findIndex((t) => t.id === active.id);
    const newIndex = tags.findIndex((t) => t.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const reordered = arrayMove(tags, oldIndex, newIndex);
    qc.setQueryData(["task_tags"], reordered.map((t, i) => ({ ...t, position: i })));
    await Promise.all(
      reordered.map((t, i) =>
        supabase.from("task_tags").update({ position: i }).eq("id", t.id),
      ),
    );
    qc.invalidateQueries({ queryKey: ["task_tags"] });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Gerenciar tags</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {!canManageTags && (
            <p className="rounded-md border bg-muted/40 p-2 text-xs text-muted-foreground">
              Apenas administradores podem criar, editar, reordenar ou excluir tags. Estas tags são globais.
            </p>
          )}
          {canManageTags && (
            <div className="rounded-md border p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Nova tag</div>
              <div className="flex gap-2">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Aguardando retorno do cliente"
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); create(); } }}
                />
                <Button size="sm" onClick={create} disabled={!name.trim()}>
                  <Plus className="mr-1 h-3.5 w-3.5" />Criar
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {PALETTE.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`h-6 w-6 rounded-full border-2 transition ${
                      color === c ? "border-foreground scale-110" : "border-transparent"
                    }`}
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>
          )}

          {canManageTags && (
            <p className="text-[11px] text-muted-foreground">Arraste pelo ícone <GripVertical className="inline h-3 w-3 -mt-0.5" /> para reordenar.</p>
          )}

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={canManageTags ? onDragEnd : () => {}}>
            <SortableContext items={tags.map((t) => t.id)} strategy={verticalListSortingStrategy}>
              <div className="max-h-80 space-y-2 overflow-y-auto">
                {tags.length === 0 && (
                  <p className="text-center text-xs text-muted-foreground py-4">Nenhuma tag ainda</p>
                )}
                {tags.map((tag) => (
                  <TagRow key={tag.id} tag={tag} onUpdate={update} onDelete={remove} canManage={canManageTags} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TagRow({
  tag, onUpdate, onDelete, canManage,
}: { tag: TaskTag; onUpdate: (t: TaskTag, p: Partial<TaskTag>) => void; onDelete: (t: TaskTag) => void; canManage: boolean }) {
  const [name, setName] = useState(tag.name);
  const [color, setColor] = useState(tag.color);
  const dirty = name !== tag.name || color !== tag.color;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tag.id, disabled: !canManage });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 rounded-md border p-2 bg-background">
      {canManage && (
        <button type="button" className="cursor-grab touch-none text-muted-foreground hover:text-foreground" {...attributes} {...listeners}>
          <GripVertical className="h-4 w-4" />
        </button>
      )}
      <input
        type="color"
        value={color}
        onChange={(e) => canManage && setColor(e.target.value)}
        disabled={!canManage}
        className="h-7 w-9 cursor-pointer rounded border bg-transparent disabled:cursor-not-allowed disabled:opacity-60"
      />
      <Input
        value={name}
        onChange={(e) => canManage && setName(e.target.value)}
        disabled={!canManage}
        className="h-8 flex-1 text-sm"
      />
      <span
        className="rounded px-2 py-0.5 text-[11px] font-semibold"
        style={{ background: color, color: "#fff" }}
      >
        {name || "tag"}
      </span>
      {canManage && dirty && (
        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => onUpdate(tag, { name, color })}>
          <Save className="h-3.5 w-3.5" />
        </Button>
      )}
      {canManage && (
        <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => onDelete(tag)}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}
