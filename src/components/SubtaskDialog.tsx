import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAssignableProfiles } from "@/hooks/use-data";
import { useQueryClient } from "@tanstack/react-query";

export interface EditableSubtask {
  id: string;
  title: string;
  done: boolean;
  position: number;
  due_date: string | null;
  assignee_id: string | null;
  notes: string | null;
  completed_at: string | null;
}

interface SubtaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId: string | null;
  subtask?: EditableSubtask | null;
  position: number;
  defaults?: {
    title?: string;
    dueDate?: string;
    assigneeId?: string;
  };
  onSaved: (subtask: EditableSubtask) => void;
}

const toDateInputValue = (value: string | null | undefined) =>
  value ? value.slice(0, 10) : "";

const dueDateToIso = (value: string) =>
  value ? new Date(`${value}T12:00:00`).toISOString() : null;

const formatCompletionDate = (value: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

export function SubtaskDialog({
  open,
  onOpenChange,
  taskId,
  subtask,
  position,
  defaults,
  onSaved,
}: SubtaskDialogProps) {
  const qc = useQueryClient();
  const { data: assignableProfiles = [] } = useAssignableProfiles();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const defaultTitle = defaults?.title ?? "";
  const defaultDueDate = defaults?.dueDate ?? "";
  const defaultAssigneeId = defaults?.assigneeId ?? "";

  useEffect(() => {
    if (!open) return;
    setTitle(subtask?.title ?? defaultTitle);
    setDueDate(toDateInputValue(subtask?.due_date) || defaultDueDate);
    setAssigneeId(subtask?.assignee_id ?? defaultAssigneeId);
    setNotes(subtask?.notes ?? "");
    setDone(subtask?.done ?? false);
  }, [open, subtask, defaultTitle, defaultDueDate, defaultAssigneeId]);

  const save = async () => {
    if (!taskId) {
      toast.error("Salve a tarefa antes de criar uma subtarefa.");
      return;
    }
    if (!title.trim()) {
      toast.error("Informe o título da subtarefa.");
      return;
    }

    setSaving(true);
    const payload = {
      title: title.trim(),
      due_date: dueDateToIso(dueDate),
      assignee_id: assigneeId || null,
      notes: notes.trim() || null,
      done,
    };

    const request = subtask
      ? (supabase.from("subtasks") as any)
          .update(payload)
          .eq("id", subtask.id)
          .select("id, title, done, position, due_date, assignee_id, notes, completed_at")
          .single()
      : (supabase.from("subtasks") as any)
          .insert({ ...payload, task_id: taskId, position })
          .select("id, title, done, position, due_date, assignee_id, notes, completed_at")
          .single();
    const { data, error } = await request;
    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    onSaved(data as EditableSubtask);
    await Promise.all([
      qc.invalidateQueries({ queryKey: ["tasks"] }),
      qc.invalidateQueries({ queryKey: ["subtasks"] }),
    ]);
    toast.success(subtask ? "Subtarefa atualizada" : "Subtarefa criada");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-5 p-6 sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle>{subtask ? "Editar subtarefa" : "Nova subtarefa"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subtask-title">Título *</Label>
            <Input
              id="subtask-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Descreva a subtarefa"
              autoFocus
            />
          </div>

          <div className="grid gap-4 rounded-xl border bg-muted/20 p-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Responsável</Label>
              <Select value={assigneeId || "none"} onValueChange={(value) => setAssigneeId(value === "none" ? "" : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sem responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem responsável</SelectItem>
                  {assignableProfiles.map((profile) => (
                    <SelectItem key={profile.id} value={profile.id}>
                      {profile.full_name || profile.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtask-due-date">Prazo</Label>
              <Input
                id="subtask-due-date"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
              />
            </div>
            {subtask && (
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <Checkbox checked={done} onCheckedChange={(value) => setDone(value === true)} />
                Concluída
                {subtask.done && subtask.completed_at ? (
                  <span className="text-xs text-muted-foreground">
                    em {formatCompletionDate(subtask.completed_at)}
                  </span>
                ) : null}
              </label>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtask-notes">Descrição</Label>
            <Textarea
              id="subtask-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Descreva a subtarefa..."
              rows={6}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={save} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
