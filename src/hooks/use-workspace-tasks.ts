import { useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useDeletedTasks, useTasks } from "@/hooks/use-data";
import { isTaskFromAnotherWorkspace } from "@/lib/workspace-tasks";

/**
 * Tarefas do ambiente ativo, e somente delas.
 *
 * `useTasks()` devolve também as tarefas que você lançou para o outro ambiente:
 * elas são espelhadas de propósito, para você não perdê-las de vista. Mas
 * número é outra conversa — relatório, dashboard, obrigações e contagem por
 * cliente não podem somar trabalho do Marketing ao da Consultoria.
 *
 * A regra da casa passa a ser: quem **conta** usa este hook; quem apenas
 * **mostra** (quadro, lista, calendário) usa `useTasks()` e marca a origem.
 */
export function useWorkspaceTasks() {
  const { activeWorkspace } = useAuth();
  const { data, isLoading } = useTasks();
  const tasks = useMemo(
    () => (data ?? []).filter((task) => !isTaskFromAnotherWorkspace(task, activeWorkspace?.id)),
    [data, activeWorkspace?.id],
  );
  return { data: tasks, isLoading };
}

/** Mesma regra para a lixeira: você não restaura o que é do outro ambiente. */
export function useWorkspaceDeletedTasks() {
  const { activeWorkspace } = useAuth();
  const { data, isLoading } = useDeletedTasks();
  const tasks = useMemo(
    () => (data ?? []).filter((task) => !isTaskFromAnotherWorkspace(task, activeWorkspace?.id)),
    [data, activeWorkspace?.id],
  );
  return { data: tasks, isLoading };
}
