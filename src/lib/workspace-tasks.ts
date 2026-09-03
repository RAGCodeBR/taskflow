/**
 * Uma tarefa pertence a um ambiente e nunca sai dele. Ela alcança o quadro de
 * outro ambiente apenas por participação — quando a pessoa é a responsável, é
 * colaboradora da tarefa ou é dona de uma subtarefa dela.
 *
 * Como o `workspace_id` da tarefa continua sendo o do ambiente dono, é a
 * divergência contra o ambiente ativo que identifica uma tarefa compartilhada.
 */

export interface WorkspaceScopedTask {
  workspace_id?: string | null;
}

/**
 * Uma tarefa vinda de outro ambiente. Sem ambiente ativo conhecido, ou sem
 * `workspace_id` na linha, a resposta é `false`: na dúvida a tarefa é tratada
 * como local, que é o comportamento que o sistema sempre teve.
 */
export function isTaskFromAnotherWorkspace<T extends WorkspaceScopedTask>(
  task: T,
  activeWorkspaceId: string | null | undefined,
): boolean {
  if (!activeWorkspaceId || !task.workspace_id) return false;
  return task.workspace_id !== activeWorkspaceId;
}

/**
 * Separa o que é do quadro do que veio de outro ambiente, preservando a ordem
 * original em cada lado.
 */
export function splitTasksByWorkspace<T extends WorkspaceScopedTask>(
  tasks: T[],
  activeWorkspaceId: string | null | undefined,
): { own: T[]; shared: T[] } {
  const own: T[] = [];
  const shared: T[] = [];
  for (const task of tasks) {
    if (isTaskFromAnotherWorkspace(task, activeWorkspaceId)) shared.push(task);
    else own.push(task);
  }
  return { own, shared };
}
