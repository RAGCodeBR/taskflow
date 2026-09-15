import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Save, Zap, CheckCircle2, GripVertical } from "lucide-react";
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useTaskStatuses, type TaskStatus } from "@/hooks/use-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { enqueueOfflineOperation, isOffline } from "@/lib/offline-sync";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

const PALETTE = [
  "#64748b", "#3b82f6", "#6366f1", "#8b5cf6", "#ec4899",
  "#ef4444", "#f59e0b", "#eab308", "#22c55e", "#06b6d4",
];

export function StatusManagerDialog({ open, onOpenChange }: Props) {
  const qc = useQueryClient();
  const { user, isAdmin } = useAuth();
  const { data: statuses = [] } = useTaskStatuses();
  const [name, setName] = useState("");
  const [color, setColor] = useState(PALETTE[1]);
  const [isActive, setIsActive] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const create = async () => {
    if (!name.trim() || !user) return;
    if (isOffline()) {
      const status = { id: crypto.randomUUID(), name: name.trim(), color, is_active: isActive, is_completed: false, position: statuses.length };
      await enqueueOfflineOperation({ userId: user.id, entity: "record", action: "create", entityId: status.id, payload: { table: "task_statuses", record: { ...status, created_by: user.id } } });
      qc.setQueryData<TaskStatus[]>(["task_statuses"], (current = []) => [...current, status]);
      setName(""); setIsActive(false);
      toast.success("Status salvo neste aparelho. SerÃ¡ sincronizado ao reconectar.");
      return;
    }
    const { error } = await supabase.from("task_statuses").insert({
      name: name.trim(),
      color,
      is_active: isActive,
      is_completed: false,
      position: statuses.length,
      created_by: user.id,
    });
    if (error) return toast.error(error.message);
    setName("");
    setIsActive(false);
    qc.invalidateQueries({ queryKey: ["task_statuses"] });
    toast.success("Status criado");
  };

  const update = async (s: TaskStatus, patch: Partial<TaskStatus>) => {
    if (user && isOffline()) {
      await enqueueOfflineOperation({ userId: user.id, entity: "record", action: "update", entityId: s.id, payload: { table: "task_statuses", patch } });
      qc.setQueryData<TaskStatus[]>(["task_statuses"], (current = []) => current.map((item) => item.id === s.id ? { ...item, ...patch } : item));
      return;
    }
    const { error } = await supabase.from("task_statuses").update(patch).eq("id", s.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["task_statuses"] });
    qc.invalidateQueries({ queryKey: ["tasks"] });
  };

  const remove = async (s: TaskStatus) => {
    if (!confirm(`Excluir status "${s.name}"?`)) return;
    if (user && isOffline()) {
      await enqueueOfflineOperation({ userId: user.id, entity: "record", action: "delete", entityId: s.id, payload: { table: "task_statuses" } });
      qc.setQueryData<TaskStatus[]>(["task_statuses"], (current = []) => current.filter((item) => item.id !== s.id));
      toast.success("ExclusÃ£o salva neste aparelho. SerÃ¡ sincronizada ao reconectar.");
      return;
    }
    const { error } = await supabase.from("task_statuses").delete().eq("id", s.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["task_statuses"] });
    qc.invalidateQueries({ queryKey: ["tasks"] });
    toast.success("Status excluído");
  };

  const onDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = statuses.findIndex((s) => s.id === active.id);
    const newIndex = statuses.findIndex((s) => s.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const reordered = arrayMove(statuses, oldIndex, newIndex);
    qc.setQueryData(["task_statuses"], reordered.map((s, i) => ({ ...s, position: i })));
    if (user && isOffline()) {
      await Promise.all(reordered.map((status, position) => enqueueOfflineOperation({ userId: user.id, entity: "record", action: "update", entityId: status.id, payload: { table: "task_statuses", patch: { position } } })));
      return;
    }
    await Promise.all(
      reordered.map((s, i) =>
        supabase.from("task_statuses").update({ position: i }).eq("id", s.id),
      ),
    );
    qc.invalidateQueries({ queryKey: ["task_statuses"] });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Gerenciar status</DialogTitle>
          <DialogDescription>
            Crie status com cor própria. Marque <b>Em execução</b> para destacar o card no kanban.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {!isAdmin && (
            <p className="rounded-md border bg-muted/40 p-2 text-xs text-muted-foreground">
              Apenas administradores podem criar, editar, reordenar ou excluir status. Estes status são globais.
            </p>
          )}
          {isAdmin && (
            <div className="rounded-md border p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Novo status</div>
              <div className="flex gap-2">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Aguardando aprovação"
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
              <label className="mt-3 flex cursor-pointer items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-3.5 w-3.5"
                />
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                Em execução (destaca o card no kanban)
              </label>
            </div>
          )}

          {isAdmin && (
            <p className="text-[11px] text-muted-foreground">Arraste pelo ícone <GripVertical className="inline h-3 w-3 -mt-0.5" /> para reordenar.</p>
          )}

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={isAdmin ? onDragEnd : () => {}}>
            <SortableContext items={statuses.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              <div className="max-h-96 space-y-2 overflow-y-auto">
                {statuses.length === 0 && (
                  <p className="py-4 text-center text-xs text-muted-foreground">Nenhum status ainda</p>
                )}
                {statuses.map((s) => (
                  <StatusRow key={s.id} status={s} onUpdate={update} onDelete={remove} canManage={isAdmin} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StatusRow({
  status, onUpdate, onDelete, canManage,
}: { status: TaskStatus; onUpdate: (s: TaskStatus, p: Partial<TaskStatus>) => void; onDelete: (s: TaskStatus) => void; canManage: boolean }) {
  const [name, setName] = useState(status.name);
  const [color, setColor] = useState(status.color);
  const dirty = name !== status.name || color !== status.color;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: status.id, disabled: !canManage });
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
        {name || "status"}
      </span>
      <span
        title={status.is_active ? "Em execução (destaque ativo)" : "Não em execução"}
        className={`flex h-7 w-7 items-center justify-center rounded ${status.is_active ? "bg-amber-500/15 text-amber-600" : "text-muted-foreground"} ${canManage ? "cursor-pointer hover:bg-muted" : ""}`}
        onClick={() => canManage && onUpdate(status, { is_active: !status.is_active })}
      >
        <Zap className="h-3.5 w-3.5" />
      </span>
      <span
        title={status.is_completed ? "Status de conclusão" : "Não é conclusão"}
        className={`flex h-7 w-7 items-center justify-center rounded ${status.is_completed ? "bg-emerald-500/15 text-emerald-600" : "text-muted-foreground"} ${canManage ? "cursor-pointer hover:bg-muted" : ""}`}
        onClick={() => canManage && onUpdate(status, { is_completed: !status.is_completed })}
      >
        <CheckCircle2 className="h-3.5 w-3.5" />
      </span>
      {canManage && dirty && (
        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => onUpdate(status, { name, color })}>
          <Save className="h-3.5 w-3.5" />
        </Button>
      )}
      {canManage && (
        <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => onDelete(status)}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}
