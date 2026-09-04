import { isBefore, startOfDay } from "date-fns";

/**
 * Situação de uma subtarefa, do jeito que ela é lida no Dashboard.
 *
 * A regra de "atrasada" é a mesma que `matchDateFilter` usa para tarefas
 * (`isBefore(due, startOfDay(now))`), de propósito: se o Kanban e os filtros
 * consideram atrasado o que venceu antes de hoje, o Dashboard não pode
 * discordar sobre a mesma subtarefa.
 */
export type SubtaskStatus = "concluida" | "atrasada" | "sem_prazo" | "pendente";

export interface SubtaskLike {
  done: boolean;
  due_date: string | null;
}

export const subtaskStatusLabels: Record<SubtaskStatus, string> = {
  concluida: "Concluída",
  atrasada: "Atrasada",
  sem_prazo: "Sem prazo",
  pendente: "Pendente",
};

/**
 * Concluída vence qualquer outra leitura: uma subtarefa entregue com atraso
 * está entregue, e mostrá-la como atrasada mandaria a pessoa procurar um
 * trabalho que já acabou.
 */
export function subtaskStatus(subtask: SubtaskLike, now: Date = new Date()): SubtaskStatus {
  if (subtask.done) return "concluida";
  if (!subtask.due_date) return "sem_prazo";
  return isBefore(new Date(subtask.due_date), startOfDay(now)) ? "atrasada" : "pendente";
}

/** Quantas de quantas, para o cabeçalho da seção. */
export function countCompletedSubtasks(subtasks: SubtaskLike[]) {
  return { done: subtasks.filter((subtask) => subtask.done).length, total: subtasks.length };
}
