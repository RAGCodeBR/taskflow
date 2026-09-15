import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { listOfflineConflicts, removeOfflineConflict, type OfflineConflict } from "@/lib/offline-sync";

const fieldNames: Record<string, string> = {
  title: "título",
  description: "descrição",
  status: "status",
  status_id: "status",
  priority: "prioridade",
  due_date: "prazo",
  due_time: "horário",
  assignee_id: "responsável",
  client_id: "cliente",
  column_id: "coluna",
  completed_at: "conclusão",
};

function display(value: unknown) {
  if (value === null || value === undefined || value === "") return "Sem informação";
  if (typeof value === "boolean") return value ? "Sim" : "Não";
  if (typeof value === "object") return "Tarefa excluída neste aparelho";
  return String(value);
}

export function OfflineConflictDialog() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [conflicts, setConflicts] = useState<OfflineConflict[]>([]);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!user) return setConflicts([]);
    setConflicts(await listOfflineConflicts(user.id));
  }, [user]);

  useEffect(() => {
    void load();
    window.addEventListener("taskflow:offline-conflicts", load);
    return () => window.removeEventListener("taskflow:offline-conflicts", load);
  }, [load]);

  const resolve = async (choice: "server" | "local" | "delete" | "recover") => {
    const conflict = conflicts[0];
    if (!user || !conflict) return;
    setSaving(true);
    try {
      if (choice === "local" && conflict.field !== "__deleted") {
        const { error } = await (supabase.from("tasks") as any)
          .update({ [conflict.field]: conflict.localValue })
          .eq("id", conflict.entityId);
        if (error) throw error;
      }
      if (choice === "delete") {
        const { error } = await supabase.from("tasks").delete().eq("id", conflict.entityId);
        if (error) throw error;
      }
      if (choice === "recover") {
        const original = (conflict.localValue ?? {}) as Record<string, unknown>;
        const now = new Date().toISOString();
        const recovered = {
          ...original,
          id: crypto.randomUUID(),
          title: `${String(original.title ?? "Tarefa")} (recuperada)`,
          created_at: now,
          updated_at: now,
          deleted_at: null,
          deleted_by: null,
        };
        const { error } = await (supabase.from("tasks") as any).insert(recovered);
        if (error) throw error;
      }
      await removeOfflineConflict(user.id, conflict.id);
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      await load();
      toast.success("Conflito resolvido.");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const conflict = conflicts[0];
  const isDeletion = conflict?.field === "__deleted";
  return (
    <Dialog open={Boolean(conflict)}>
      <DialogContent className="max-w-lg" onPointerDownOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Revisar alteração sincronizada</DialogTitle>
          <DialogDescription>
            Esta tarefa foi alterada em outro aparelho enquanto você estava sem internet. Escolha qual versão manter.
          </DialogDescription>
        </DialogHeader>
        {conflict && !isDeletion && (
          <div className="space-y-3 rounded-lg border bg-muted/30 p-4 text-sm">
            <p><strong>Informação:</strong> {fieldNames[conflict.field] ?? conflict.field}</p>
            <div><span className="text-muted-foreground">No servidor:</span><p className="mt-1 break-words">{display(conflict.serverValue)}</p></div>
            <div><span className="text-muted-foreground">Neste aparelho:</span><p className="mt-1 break-words">{display(conflict.localValue)}</p></div>
          </div>
        )}
        {isDeletion && (
          <p className="rounded-lg border bg-muted/30 p-4 text-sm">
            A tarefa foi alterada em outro aparelho, mas foi excluída neste. Para evitar perda de dados, escolha se deseja mantê-la, excluí-la mesmo assim ou recuperar uma cópia.
          </p>
        )}
        <div className="flex flex-wrap justify-end gap-2">
          {isDeletion ? <>
            <Button variant="outline" disabled={saving} onClick={() => void resolve("server")}>Manter no servidor</Button>
            <Button variant="outline" disabled={saving} onClick={() => void resolve("recover")}>Criar cópia</Button>
            <Button variant="destructive" disabled={saving} onClick={() => void resolve("delete")}>Excluir mesmo assim</Button>
          </> : <>
            <Button variant="outline" disabled={saving} onClick={() => void resolve("server")}>Manter servidor</Button>
            <Button disabled={saving} onClick={() => void resolve("local")}>Manter minha alteração</Button>
          </>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
