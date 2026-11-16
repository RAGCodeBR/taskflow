/**
 * Quem pode mover uma tarefa para a Lixeira: quem a criou ou um administrador.
 *
 * É a mesma regra do editor de tarefas e do banco, que recusa a exclusão feita
 * pelo responsável que não criou a tarefa (`prevent_assignee_task_cancellation`).
 * Mostrar o botão a quem não pode excluir fazia a tarefa sumir só na tela da
 * pessoa, enquanto o servidor recusava a exclusão.
 */
export function canDeleteTask(
  task: { created_by: string | null },
  access: { userId?: string | null; isAdmin?: boolean },
) {
  if (access.isAdmin) return true;
  return !!access.userId && task.created_by === access.userId;
}

type RejectableOperation = {
  entity: string;
  action: string;
  payload: Record<string, unknown>;
};

/**
 * Uma exclusão (envio à Lixeira) guardada na fila que o servidor recusou por
 * regra de negócio. Repetir o envio nunca mudaria a resposta, então ela deve
 * sair da fila e a tarefa voltar à tela, em vez de ficar escondida para sempre.
 *
 * Só o código `P0001` conta: é o que o banco devolve quando uma regra recusa a
 * operação. Falhas de rede, de sessão ou de ambiente continuam sendo repetidas.
 */
export function isRejectedTaskRemoval(operation: RejectableOperation, error: unknown) {
  if (operation.entity !== "task" || operation.action !== "update") return false;
  const patch = operation.payload.patch as Record<string, unknown> | undefined;
  if (!patch || !patch.deleted_at) return false;
  const code = typeof error === "object" && error ? (error as { code?: unknown }).code : null;
  return code === "P0001";
}

export function rejectionMessage(error: unknown) {
  const message =
    typeof error === "object" && error ? (error as { message?: unknown }).message : null;
  return typeof message === "string" && message.trim()
    ? message.trim()
    : "O servidor não aceitou a exclusão.";
}
