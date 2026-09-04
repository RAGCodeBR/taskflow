# src/lib/subtask-status.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { isBefore, startOfDay } from "date-fns";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 3 | `/**` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 4 | ` * Situação de uma subtarefa, do jeito que ela é lida no Dashboard.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 5 | ` *` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 6 | ` * A regra de "atrasada" é a mesma que \`matchDateFilter\` usa para tarefas` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 7 | ` * (\`isBefore(due, startOfDay(now))\`), de propósito: se o Kanban e os filtros` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 8 | ` * consideram atrasado o que venceu antes de hoje, o Dashboard não pode` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 9 | ` * discordar sobre a mesma subtarefa.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 10 | ` */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 11 | `export type SubtaskStatus = "concluida" | "atrasada" | "sem_prazo" | "pendente";` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 12 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 13 | `export interface SubtaskLike {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 14 | `  done: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  due_date: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 17 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 18 | `export const subtaskStatusLabels: Record<SubtaskStatus, string> = {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 19 | `  concluida: "Concluída",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  atrasada: "Atrasada",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `  sem_prazo: "Sem prazo",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `  pendente: "Pendente",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 24 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 25 | `/**` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 26 | ` * Concluída vence qualquer outra leitura: uma subtarefa entregue com atraso` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 27 | ` * está entregue, e mostrá-la como atrasada mandaria a pessoa procurar um` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 28 | ` * trabalho que já acabou.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 29 | ` */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 30 | `export function subtaskStatus(subtask: SubtaskLike, now: Date = new Date()): SubtaskStatus {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 31 | `  if (subtask.done) return "concluida";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 32 | `  if (!subtask.due_date) return "sem_prazo";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 33 | `  return isBefore(new Date(subtask.due_date), startOfDay(now)) ? "atrasada" : "pendente";` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 34 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 35 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 36 | `/** Quantas de quantas, para o cabeçalho da seção. */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 37 | `export function countCompletedSubtasks(subtasks: SubtaskLike[]) {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 38 | `  return { done: subtasks.filter((subtask) => subtask.done).length, total: subtasks.length };` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 39 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
