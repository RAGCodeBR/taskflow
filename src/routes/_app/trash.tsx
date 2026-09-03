import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useClients, useProfiles } from "@/hooks/use-data";
import { useWorkspaceDeletedTasks } from "@/hooks/use-workspace-tasks";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_app/trash")({
  component: TrashPage,
});

function TrashPage() {
  const qc = useQueryClient();
  const { data: tasks = [], isLoading } = useWorkspaceDeletedTasks();
  const { data: clients = [] } = useClients();
  const { data: profiles = [] } = useProfiles();
  const { user, isAdmin } = useAuth();
  const canDeleteTask = (task: (typeof tasks)[number]) =>
    !!isAdmin || task.created_by === user?.id;
  const deletableTasks = tasks.filter(canDeleteTask);

  const restore = async (id: string) => {
    const { error } = await supabase
      .from("tasks")
      .update({ deleted_at: null, deleted_by: null })
      .eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Tarefa restaurada");
    qc.invalidateQueries({ queryKey: ["tasks"] });
  };

  const purge = async (id: string) => {
    if (!confirm("Excluir esta tarefa permanentemente? Esta ação não pode ser desfeita.")) return;
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Tarefa excluída permanentemente");
    qc.invalidateQueries({ queryKey: ["tasks", "deleted"] });
  };

  const purgeAll = async () => {
    if (!deletableTasks.length) return;
    if (!confirm(`Excluir permanentemente ${deletableTasks.length} tarefa(s) da lixeira?`)) return;
    const ids = deletableTasks.map((t) => t.id);
    const { error } = await supabase.from("tasks").delete().in("id", ids);
    if (error) return toast.error(error.message);
    toast.success("Lixeira esvaziada");
    qc.invalidateQueries({ queryKey: ["tasks", "deleted"] });
  };

  return (
    <div className="p-6">
      <header className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lixeira</h1>
          <p className="text-sm text-muted-foreground">
            Tarefas excluídas. Restaure ou apague permanentemente.
          </p>
        </div>
        {deletableTasks.length > 0 && (
          <Button variant="destructive" onClick={purgeAll}>
            <Trash2 className="mr-2 h-4 w-4" />Esvaziar lixeira
          </Button>
        )}
      </header>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando…</p>
      ) : tasks.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center text-sm text-muted-foreground">
          A lixeira está vazia.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left">Título</th>
                <th className="px-3 py-2 text-left">Cliente</th>
                <th className="px-3 py-2 text-left">Responsável</th>
                <th className="px-3 py-2 text-left">Excluída em</th>
                <th className="px-3 py-2 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => {
                const c = clients.find((x) => x.id === t.client_id);
                const a = profiles.find((p) => p.id === t.assignee_id);
                return (
                  <tr key={t.id} className="border-t">
                    <td className="px-3 py-2 font-medium">{t.title}</td>
                    <td className="px-3 py-2 text-muted-foreground">{c?.name ?? "—"}</td>
                    <td className="px-3 py-2 text-muted-foreground">{a?.full_name ?? a?.email ?? "—"}</td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {t.deleted_at ? format(new Date(t.deleted_at), "dd/MM/yyyy HH:mm") : "—"}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex justify-end gap-1">
                        {canDeleteTask(t) && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => restore(t.id)}>
                              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />Restaurar
                            </Button>
                            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => purge(t.id)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
