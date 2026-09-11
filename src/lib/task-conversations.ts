/**
 * Regras puras da tela de Conversas por tarefa. Sem React, sem Supabase — só a
 * decisão de o que aparece e o que conta como não lido, para poder testar.
 */

export interface ConversationTaskLike {
  id: string;
  completed_at: string | null;
  status: string | null;
  deleted_at?: string | null;
}

export interface ConversationMessageLike {
  task_id: string;
  author_id: string | null;
  created_at: string;
}

/**
 * Uma tarefa vira "sala" na lista quando: não está concluída, não está na
 * lixeira, e já tem pelo menos uma mensagem. A participação (sou responsável,
 * colaborador, etc.) é garantida antes, pela RLS/consulta — aqui só o estado.
 */
export function isConversationRoom(task: ConversationTaskLike, hasMessages: boolean): boolean {
  if (!hasMessages) return false;
  if (task.deleted_at) return false;
  return !task.completed_at && task.status !== "done";
}

/**
 * Ordena as salas pela mensagem mais recente (desc). Tarefas sem mensagem ficam
 * no fim, mas na prática `isConversationRoom` já as filtrou.
 */
export function sortRoomsByLastMessage<T extends { id: string }>(
  tasks: T[],
  lastMessageAtByTask: Map<string, string>,
): T[] {
  return [...tasks].sort((a, b) => {
    const ta = lastMessageAtByTask.get(a.id) ?? "";
    const tb = lastMessageAtByTask.get(b.id) ?? "";
    return tb.localeCompare(ta);
  });
}

/**
 * Não lidas de UMA sala: mensagens de outra pessoa criadas depois do meu
 * último `last_read_at` naquela tarefa. Sem registro de leitura, tudo do outro
 * conta como não lido.
 */
export function unreadInRoom(
  messages: ConversationMessageLike[],
  taskId: string,
  myUserId: string,
  lastReadAt: string | null | undefined,
): number {
  const cutoff = lastReadAt ? Date.parse(lastReadAt) : 0;
  return messages.filter(
    (m) => m.task_id === taskId && m.author_id !== myUserId && Date.parse(m.created_at) > cutoff,
  ).length;
}

/**
 * Quantas SALAS têm mensagem não lida — é o número do badge do menu, não a
 * soma de mensagens.
 */
export function unreadRoomCount(
  messages: ConversationMessageLike[],
  roomTaskIds: string[],
  myUserId: string,
  lastReadByTask: Map<string, string>,
): number {
  return roomTaskIds.reduce((count, taskId) => {
    const unread = unreadInRoom(messages, taskId, myUserId, lastReadByTask.get(taskId));
    return count + (unread > 0 ? 1 : 0);
  }, 0);
}

/** Total de mensagens de outras pessoas ainda não lidas nas salas acessíveis. */
export function unreadMessageCount(
  messages: ConversationMessageLike[],
  roomTaskIds: string[],
  myUserId: string,
  lastReadByTask: Map<string, string>,
): number {
  return roomTaskIds.reduce(
    (count, taskId) => count + unreadInRoom(messages, taskId, myUserId, lastReadByTask.get(taskId)),
    0,
  );
}
