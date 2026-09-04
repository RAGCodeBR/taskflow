# src/lib/task-utils.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `  endOfDay,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 3 | `  endOfMonth,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 4 | `  endOfWeek,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 5 | `  isAfter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 6 | `  isBefore,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `  isWithinInterval,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `  startOfDay,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `  startOfMonth,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `  startOfWeek,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `  addDays,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `} from "date-fns";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 14 | `export type DateFilter =` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 15 | `  | "all"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  | "today"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  | "due_today"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  | "tomorrow"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  | "this_week"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  | "this_month"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `  | "overdue"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `  | "no_due"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `  | "completed"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  | "pending";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 26 | `export const dateFilterLabels: Record<DateFilter, string> = {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 27 | `  all: "Todas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `  today: "Hoje",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `  due_today: "Vence hoje",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  tomorrow: "Amanhã",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `  this_week: "Semana",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `  this_month: "Mês",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  overdue: "Atrasadas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `  no_due: "Sem prazo",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `  completed: "Concluídas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `  pending: "Pendentes",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 38 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 39 | `export interface TaskLike {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 40 | `  id?: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `  due_date: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `  status: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `  completed_at: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 45 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 46 | `/**` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 47 | ` * A parent task cannot be considered concluded while it still has an open` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 48 | ` * subtask.  This also repairs the display of legacy records that were marked` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 49 | ` * as done before every subtask was completed.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 50 | ` */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 51 | `export function normalizeTasksWithOpenSubtasks<` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 52 | `  T extends TaskLike & { id: string; status_id?: string | null },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `>(tasks: T[], openSubtaskTaskIds: Set<string>, openStatusId?: string | null): T[] {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `  return tasks.map((task) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 55 | `    const markedDone = task.status === "done" || !!task.completed_at;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 56 | `    if (!markedDone || !openSubtaskTaskIds.has(task.id)) return task;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 57 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 58 | `    return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 59 | `      ...task,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `      status: "todo",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `      completed_at: null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `      ...("status_id" in task ? { status_id: openStatusId ?? null } : {}),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 63 | `    } as T;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 65 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 66 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 67 | `export function matchDateFilter(task: TaskLike, filter: DateFilter): boolean {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 68 | `  const now = new Date();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 69 | `  const due = task.due_date ? new Date(task.due_date) : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 70 | `  const isDone = task.status === "done" || !!task.completed_at;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 71 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 72 | `  switch (filter) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `    case "all":` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `      return true;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 75 | `    case "today":` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `      if (!due) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 77 | `      return isWithinInterval(due, { start: startOfDay(now), end: endOfDay(now) });` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 78 | `    case "due_today":` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `      if (!due || isDone) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 80 | `      return isWithinInterval(due, { start: startOfDay(now), end: endOfDay(now) });` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 81 | `    case "tomorrow":` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `      if (!due) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 83 | `      const t = addDays(now, 1);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 84 | `      return isWithinInterval(due, { start: startOfDay(t), end: endOfDay(t) });` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 85 | `    case "this_week":` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `      if (!due) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 87 | `      return isWithinInterval(due, {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 88 | `        start: startOfWeek(now, { weekStartsOn: 1 }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `        end: endOfWeek(now, { weekStartsOn: 1 }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 91 | `    case "this_month":` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `      if (!due) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 93 | `      return isWithinInterval(due, { start: startOfMonth(now), end: endOfMonth(now) });` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 94 | `    case "overdue":` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 95 | `      if (!due || isDone) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 96 | `      return isBefore(due, startOfDay(now));` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 97 | `    case "no_due":` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 98 | `      return !due;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 99 | `    case "completed":` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 100 | `      return isDone;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 101 | `    case "pending":` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `      return !isDone;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 103 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 104 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 105 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 106 | `export function taskUrgency(task: TaskLike): "overdue" | "due_today" | "due_soon" | "ok" {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 107 | `  if (!task.due_date) return "ok";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 108 | `  if (task.status === "done") return "ok";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 109 | `  const due = new Date(task.due_date);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 110 | `  const now = new Date();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 111 | `  if (isWithinInterval(due, { start: startOfDay(now), end: endOfDay(now) })) return "due_today";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 112 | `  if (isBefore(due, startOfDay(now))) return "overdue";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 113 | `  if (isAfter(due, now) && isBefore(due, addDays(now, 2))) return "due_soon";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 114 | `  return "ok";` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 115 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 116 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 117 | `export const priorityLabels = {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 118 | `  low: "Baixa",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `  medium: "Média",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 120 | `  high: "Alta",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `  urgent: "Urgente",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `} as const;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 124 | `export const priorityColors: Record<string, string> = {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 125 | `  low: "#64748b",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `  medium: "#2563eb",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `  high: "#f59e0b",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `  urgent: "#dc2626",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 130 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 131 | `export const statusLabels = {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 132 | `  todo: "A Fazer",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 133 | `  in_progress: "Em Andamento",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `  review: "Em Revisão",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 135 | `  done: "Concluído",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 136 | `} as const;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
