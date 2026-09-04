# src/routes/_app/dashboard.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createFileRoute } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useMemo, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `  type Task,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 5 | `  useClients,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 6 | `  useAssignableProfiles,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `  useColumns,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `  useSubtasks,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `} from "@/hooks/use-data";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `import { useWorkspaceTasks } from "@/hooks/use-workspace-tasks";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `import { DateFilterBar } from "@/components/DateFilterBar";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `import { matchDateFilter, priorityLabels, statusLabels, type DateFilter } from "@/lib/task-utils";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 13 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 14 | `  countCompletedSubtasks,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  subtaskStatus,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  subtaskStatusLabels,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  type SubtaskStatus,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 18 | `} from "@/lib/subtask-status";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `import { Card } from "@/components/ui/card";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 20 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 21 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 22 | `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 23 | `import { RichTextView } from "@/components/RichTextEditor";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 24 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 25 | `  Dialog,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `  DialogContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `  DialogDescription,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `  DialogHeader,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `  DialogTitle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `} from "@/components/ui/dialog";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 32 | `  BarChart,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  Bar,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `  XAxis,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `  YAxis,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `  CartesianGrid,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `  Tooltip,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `  ResponsiveContainer,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `  Legend,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `} from "recharts";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 42 | `  CheckCircle2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `  ListTodo,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `  AlertTriangle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  Clock,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `  X,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `  CalendarDays,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `  CircleCheck,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `  Flag,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `  UserRound,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `} from "lucide-react";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 53 | `import { format, parseISO } from "date-fns";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 54 | `import { ptBR } from "date-fns/locale";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 55 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 56 | `export const Route = createFileRoute("/_app/dashboard")({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 57 | `  component: Dashboard,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 58 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 59 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 60 | `type DashboardMetric = "total" | "done" | "pending" | "overdue" | "today" | "week" | "month";` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 61 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 62 | `type Detail = {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 63 | `  label: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `  description: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `  tasks: Task[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `  accent: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `  prioritizeOpen?: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 69 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 70 | `const isTaskDone = (task: Task) => task.status === "done" || !!task.completed_at;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 71 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 72 | `const SUBTASK_DOT: Record<SubtaskStatus, string> = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 73 | `  concluida: "bg-emerald-500",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `  atrasada: "bg-rose-500",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 75 | `  sem_prazo: "bg-slate-400",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `  pendente: "bg-amber-500",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 78 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 79 | `const SUBTASK_BADGE: Record<SubtaskStatus, string> = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 80 | `  concluida: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/35 dark:text-emerald-300",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 81 | `  atrasada: "bg-rose-50 text-rose-700 dark:bg-rose-950/35 dark:text-rose-300",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `  sem_prazo: "bg-muted text-muted-foreground",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `  pendente: "bg-amber-50 text-amber-800 dark:bg-amber-950/35 dark:text-amber-300",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 85 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 86 | `function TaskPreviewDialog({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 87 | `  task,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `  clientsById,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `  profilesById,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `  onOpenChange,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `  task: Task | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 93 | `  clientsById: Map<string, string>;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `  profilesById: Map<string, string>;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 95 | `  onOpenChange: (open: boolean) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 96 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 97 | `  const { data: allSubtasks } = useSubtasks();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 98 | `  // O hook fica acima do early return de propósito: chamá-lo depois mudaria a` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 99 | `  // quantidade de hooks entre um render e outro quando o diálogo fecha.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 100 | `  const subtasks = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 101 | `    () => (allSubtasks ?? []).filter((subtask) => subtask.task_id === task?.id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 102 | `    [allSubtasks, task?.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 104 | `  const contagem = countCompletedSubtasks(subtasks);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 105 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 106 | `  if (!task) return null;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 107 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 108 | `  const done = isTaskDone(task);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 109 | `  const clientName = task.client_id ? clientsById.get(task.client_id) : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 110 | `  const assigneeName = task.assignee_id ? profilesById.get(task.assignee_id) : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 111 | `  const formatDate = (value: string | null) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 112 | `    value ? format(parseISO(value), "dd/MM/yyyy", { locale: ptBR }) : "—";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 114 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 115 | `    <Dialog open={Boolean(task)} onOpenChange={onOpenChange}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 116 | `      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 117 | `        <DialogHeader className="border-b pb-4 pr-7">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 118 | `          <div className="flex flex-wrap items-start gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 119 | `            <DialogTitle className="mr-auto text-xl leading-snug">{task.title}</DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 120 | `            {task.priority && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `              <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 122 | `                {priorityLabels[task.priority]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `              </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 124 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `            <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 126 | `              className={\`rounded-full px-2.5 py-1 text-xs ${done ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/35 dark:text-emerald-300" : "bg-muted text-muted-foreground"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 127 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `              {done ? "Concluída" : statusLabels[task.status ?? "todo"]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `            </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 130 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 131 | `          <DialogDescription>Visualização da tarefa no Dashboard.</DialogDescription>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 132 | `        </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 133 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 134 | `        <div className="grid gap-5 sm:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 135 | `          <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 136 | `            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 137 | `              <UserRound className="h-3.5 w-3.5" /> Consultor responsável` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 138 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 139 | `            <p className="mt-1.5 font-medium">{assigneeName || "Sem consultor responsável"}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 140 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 141 | `          <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 142 | `            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 143 | `              Cliente` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 144 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 145 | `            <p className="mt-1.5 font-medium">{clientName || "Sem cliente vinculado"}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 146 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 147 | `          <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 148 | `            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 149 | `              <CalendarDays className="h-3.5 w-3.5" /> Prazo` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 150 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 151 | `            <p className="mt-1.5 font-medium">{formatDate(task.due_date)}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 152 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 153 | `          <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 154 | `            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 155 | `              <CircleCheck className="h-3.5 w-3.5" /> Conclusão` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 156 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 157 | `            <p className="mt-1.5 font-medium">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 158 | `              {done ? formatDate(task.completed_at) : "Ainda não concluída"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 160 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 161 | `          <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 162 | `            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 163 | `              <Flag className="h-3.5 w-3.5" /> Criada em` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 164 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 165 | `            <p className="mt-1.5 font-medium">{formatDate(task.created_at)}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 166 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 167 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 168 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 169 | `        <div className="border-t pt-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 170 | `          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 171 | `            Descrição` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 172 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 173 | `          {task.description?.trim() ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `            <RichTextView html={task.description} className="mt-2 text-sm leading-6 [&_p]:my-2" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 175 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 176 | `            <p className="mt-2 text-sm text-muted-foreground">Esta tarefa não possui descrição.</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 177 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 179 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 180 | `        <div className="border-t pt-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 181 | `          <p className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 182 | `            Subtarefas` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 183 | `            {subtasks.length > 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 184 | `              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium normal-case tracking-normal">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 185 | `                {contagem.done} de {contagem.total} concluídas` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 186 | `              </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 187 | `            ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 188 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 189 | `          {subtasks.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 190 | `            <p className="mt-2 text-sm text-muted-foreground">Esta tarefa não possui subtarefas.</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 191 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 192 | `            <ul className="mt-3 space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 193 | `              {subtasks.map((subtask) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 194 | `                const situacao = subtaskStatus(subtask);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 195 | `                const responsavel = subtask.assignee_id` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 196 | `                  ? profilesById.get(subtask.assignee_id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 197 | `                  : null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `                return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 199 | `                  <li` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 200 | `                    key={subtask.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 201 | `                    className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md border bg-muted/20 px-3 py-2"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 202 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 203 | `                    <span className={\`h-2 w-2 shrink-0 rounded-full ${SUBTASK_DOT[situacao]}\`} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 204 | `                    <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 205 | `                      className={\`min-w-0 flex-1 break-words text-sm ${` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 206 | `                        subtask.done ? "text-muted-foreground line-through" : ""` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 207 | `                      }\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 208 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 209 | `                      {subtask.title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 210 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 211 | `                    <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 212 | `                      className={\`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${SUBTASK_BADGE[situacao]}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 213 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 214 | `                      {subtaskStatusLabels[situacao]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 215 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 216 | `                    {subtask.due_date ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 217 | `                      <span className="shrink-0 text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 218 | `                        {formatDate(subtask.due_date)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 219 | `                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 220 | `                    ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 221 | `                    {responsavel ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 222 | `                      <span className="shrink-0 text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 223 | `                        {responsavel}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 224 | `                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 225 | `                    ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 226 | `                  </li>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 227 | `                );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 228 | `              })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 229 | `            </ul>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 230 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 231 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 232 | `      </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 233 | `    </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 234 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 235 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 236 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 237 | `function Stat({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 238 | `  label,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 239 | `  value,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 240 | `  icon: Icon,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 241 | `  color,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 242 | `  active = false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 243 | `  onClick,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 244 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 245 | `  label: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 246 | `  value: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 247 | `  icon: typeof Clock;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 248 | `  color: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 249 | `  active?: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 250 | `  onClick?: () => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 251 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 252 | `  const card = (` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 253 | `    <Card className="p-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 254 | `      <div className="flex items-center justify-between">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 255 | `        <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 256 | `          <p className="text-sm text-muted-foreground">{label}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 257 | `          <p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 258 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 259 | `        <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 260 | `          className="grid h-12 w-12 place-items-center rounded-xl"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 261 | `          style={{ background: \`${color}20\`, color }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 262 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 263 | `          <Icon className="h-5 w-5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 264 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 265 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 266 | `    </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 267 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 268 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 269 | `  if (!onClick) return card;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 270 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 271 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 272 | `    <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 273 | `      type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 274 | `      onClick={onClick}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 275 | `      aria-pressed={active}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 276 | `      className={\`w-full rounded-xl text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 277 | `        active ? "ring-2 ring-primary ring-offset-2" : "hover:-translate-y-0.5 hover:shadow-md"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 278 | `      }\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 279 | `      title={\`Ver detalhamento: ${label}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 280 | `    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 281 | `      {card}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 282 | `    </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 283 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 284 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 285 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 286 | `function TaskDetailPanel({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 287 | `  detail,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 288 | `  clientsById,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 289 | `  profilesById,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 290 | `  onClose,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 291 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 292 | `  detail: Detail;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 293 | `  clientsById: Map<string, string>;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 294 | `  profilesById: Map<string, string>;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 295 | `  onClose: () => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 296 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 297 | `  const [previewTask, setPreviewTask] = useState<Task | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 298 | `  const orderedTasks = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 299 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 300 | `      [...detail.tasks].sort((a, b) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 301 | `        if (detail.prioritizeOpen) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 302 | `          const openOrder = Number(isTaskDone(a)) - Number(isTaskDone(b));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 303 | `          if (openOrder !== 0) return openOrder;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 304 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 305 | `        return b.created_at.localeCompare(a.created_at);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 306 | `      }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 307 | `    [detail.tasks],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 308 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 309 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 310 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 311 | `    <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 312 | `      <Card className="overflow-hidden border-primary/20">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 313 | `        <div className="flex flex-wrap items-start justify-between gap-3 border-b bg-muted/20 px-5 py-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 314 | `          <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 315 | `            <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 316 | `              <span className="h-2.5 w-2.5 rounded-full" style={{ background: detail.accent }} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 317 | `              <h2 className="font-semibold">{detail.label}</h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 318 | `              <span className="rounded-full bg-background px-2 py-0.5 text-xs font-semibold text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 319 | `                {detail.tasks.length}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 320 | `              </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 321 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 322 | `            <p className="mt-1 text-sm text-muted-foreground">{detail.description}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 323 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 324 | `          <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 325 | `            type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 326 | `            onClick={onClose}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 327 | `            className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 328 | `            title="Fechar detalhamento"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 329 | `            aria-label="Fechar detalhamento"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 330 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 331 | `            <X className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 332 | `          </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 333 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 334 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 335 | `        {orderedTasks.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 336 | `          <p className="p-5 text-sm text-muted-foreground">Nenhuma tarefa neste recorte.</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 337 | `        ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 338 | `          <div className="max-h-[26rem] divide-y overflow-y-auto">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 339 | `            {orderedTasks.map((task) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 340 | `              const clientName = task.client_id ? clientsById.get(task.client_id) : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 341 | `              const assigneeName = task.assignee_id ? profilesById.get(task.assignee_id) : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 342 | `              const done = isTaskDone(task);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 343 | `              const date = done ? task.completed_at : task.due_date;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 344 | `              return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 345 | `                <div key={task.id} className="text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 346 | `                  <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 347 | `                    type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 348 | `                    onClick={() => setPreviewTask(task)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 349 | `                    className="flex w-full flex-wrap items-center justify-between gap-x-5 gap-y-2 px-5 py-3 text-left transition hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 350 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 351 | `                    <div className="min-w-0 flex-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 352 | `                      <p className="truncate font-medium">{task.title}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 353 | `                      <p className="mt-0.5 truncate text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 354 | `                        {[clientName, assigneeName].filter(Boolean).join(" · ") ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 355 | `                          "Sem cliente ou responsável"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 356 | `                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 357 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 358 | `                    <div className="flex shrink-0 items-center gap-2 text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 359 | `                      {task.priority && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 360 | `                        <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 361 | `                          {priorityLabels[task.priority]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 362 | `                        </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 363 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 364 | `                      <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 365 | `                        className={\`rounded-full px-2 py-1 ${done ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/35 dark:text-emerald-300" : "bg-muted text-muted-foreground"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 366 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 367 | `                        {done ? "Concluída" : statusLabels[task.status ?? "todo"]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 368 | `                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 369 | `                      {date && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 370 | `                        <span className={done ? "text-muted-foreground" : "text-foreground"}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 371 | `                          {done ? "Concluída " : "Prazo "}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 372 | `                          {format(parseISO(date), "dd/MM/yyyy", { locale: ptBR })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 373 | `                        </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 374 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 375 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 376 | `                  </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 377 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 378 | `              );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 379 | `            })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 380 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 381 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 382 | `      </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 383 | `      <TaskPreviewDialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 384 | `        task={previewTask}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 385 | `        clientsById={clientsById}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 386 | `        profilesById={profilesById}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 387 | `        onOpenChange={(open) => !open && setPreviewTask(null)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 388 | `      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 389 | `    </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 390 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 391 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 392 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 393 | `function Dashboard() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 394 | `  const { profile, user, isAdmin } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 395 | `  const { data: tasks = [] } = useWorkspaceTasks();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 396 | `  const { data: clients = [] } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 397 | `  // The chart only includes users eligible to receive tasks (admins and collaborators).` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 398 | `  // The database query excludes client accounts, including future ones.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 399 | `  const { data: assignableProfiles = [] } = useAssignableProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 400 | `  useColumns();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 401 | `  const [filter, setFilter] = useState<DateFilter>("this_month");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 402 | `  const [periodOpen, setPeriodOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 403 | `  const [periodStart, setPeriodStart] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 404 | `  const [periodEnd, setPeriodEnd] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 405 | `  const [customPeriod, setCustomPeriod] = useState<{ start: string; end: string } | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 406 | `  const [selectedMetric, setSelectedMetric] = useState<DashboardMetric | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 407 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 408 | `  const greetingName = profile?.full_name?.split(" ")[0] || user?.email?.split("@")[0];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 409 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 410 | `  // Hooks MUST run unconditionally for both admin and member views.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 411 | `  const filtered = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 412 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 413 | `      customPeriod` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 414 | `        ? tasks.filter((task) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 415 | `            const dueDate = task.due_date?.slice(0, 10);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 416 | `            return Boolean(dueDate && dueDate >= customPeriod.start && dueDate <= customPeriod.end);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 417 | `          })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 418 | `        : tasks.filter((task) => matchDateFilter(task, filter)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 419 | `    [tasks, filter, customPeriod],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 420 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 421 | `  const stats = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 422 | `    const total = filtered.length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 423 | `    const done = filtered.filter(isTaskDone).length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 424 | `    const pending = total - done;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 425 | `    const overdue = filtered.filter((t) => matchDateFilter(t, "overdue")).length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 426 | `    const today = filtered.filter((t) => matchDateFilter(t, "today")).length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 427 | `    const week = filtered.filter((t) => matchDateFilter(t, "this_week")).length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 428 | `    const month = filtered.filter((t) => matchDateFilter(t, "this_month")).length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 429 | `    return { total, done, pending, overdue, today, week, month };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 430 | `  }, [filtered]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 431 | `  const currentScopeLabel = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 432 | `    if (customPeriod) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 433 | `      return \`período de ${format(parseISO(customPeriod.start), "dd/MM/yyyy", { locale: ptBR })} até ${format(parseISO(customPeriod.end), "dd/MM/yyyy", { locale: ptBR })}\`;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 434 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 435 | `    if (filter === "this_month")` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 436 | `      return \`mês vigente: ${format(new Date(), "MMMM 'de' yyyy", { locale: ptBR })}\`;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 437 | `    if (filter === "this_week") return "semana vigente";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 438 | `    if (filter === "all") return "todo o histórico";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 439 | `    return filter === "completed"` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 440 | `      ? "tarefas concluídas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 441 | `      : filter === "pending"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 442 | `        ? "tarefas pendentes"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 443 | `        : "filtro selecionado";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 444 | `  }, [filter, customPeriod]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 445 | `  const byClient = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 446 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 447 | `      clients` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 448 | `        .map((client) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 449 | `          const clientTasks = filtered.filter((task) => task.client_id === client.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 450 | `          const concluded = clientTasks.filter(isTaskDone).length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 451 | `          const overdue = clientTasks.filter((task) => matchDateFilter(task, "overdue")).length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 452 | `          return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 453 | `            name: client.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 454 | `            concluídas: concluded,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 455 | `            emAberto: clientTasks.length - concluded - overdue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 456 | `            atrasadas: overdue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 457 | `            total: clientTasks.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 458 | `          };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 459 | `        })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 460 | `        .filter((client) => client.total > 0)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 461 | `        .sort((a, b) => b.total - a.total),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 462 | `    [clients, filtered],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 463 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 464 | `  const byUser = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 465 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 466 | `      assignableProfiles.map((p) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 467 | `        name: (p.full_name || p.email || "?").slice(0, 12),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 468 | `        feitas: filtered.filter((t) => t.assignee_id === p.id && isTaskDone(t)).length,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 469 | `        pendentes: filtered.filter((t) => t.assignee_id === p.id && !isTaskDone(t)).length,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 470 | `      })),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 471 | `    [assignableProfiles, filtered],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 472 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 473 | `  const clientsById = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 474 | `    () => new Map(clients.map((client) => [client.id, client.name])),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 475 | `    [clients],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 476 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 477 | `  const profilesById = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 478 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 479 | `      new Map(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 480 | `        assignableProfiles.map((profile) => [` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 481 | `          profile.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 482 | `          profile.full_name || profile.email || "Sem responsável",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 483 | `        ]),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 484 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 485 | `    [assignableProfiles],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 486 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 487 | `  const details = useMemo<Record<DashboardMetric, Detail>>(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 488 | `    () => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 489 | `      total: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 490 | `        label: "Total de tarefas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 491 | `        description: customPeriod` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 492 | `          ? \`Tarefas com prazo de ${format(parseISO(customPeriod.start), "dd/MM/yyyy", { locale: ptBR })} até ${format(parseISO(customPeriod.end), "dd/MM/yyyy", { locale: ptBR })}.\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 493 | `          : filter === "this_month"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 494 | `            ? "Tarefas com prazo no mês vigente."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 495 | `            : "Todas as tarefas do filtro selecionado.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 496 | `        tasks: filtered,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 497 | `        accent: "#2563eb",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 498 | `        prioritizeOpen: true,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 499 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 500 | `      done: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 501 | `        label: "Concluídas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 502 | `        description: "Tarefas já finalizadas no período selecionado.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 503 | `        tasks: filtered.filter(isTaskDone),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 504 | `        accent: "#059669",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 505 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 506 | `      pending: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 507 | `        label: "Pendentes",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 508 | `        description: "Tarefas que ainda precisam de andamento ou conclusão.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 509 | `        tasks: filtered.filter((task) => !isTaskDone(task)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 510 | `        accent: "#f59e0b",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 511 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 512 | `      overdue: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 513 | `        label: "Atrasadas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 514 | `        description: "Tarefas abertas cujo prazo já passou.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 515 | `        tasks: filtered.filter((task) => matchDateFilter(task, "overdue")),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 516 | `        accent: "#dc2626",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 517 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 518 | `      today: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 519 | `        label: "Hoje",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 520 | `        description: "Tarefas com prazo para hoje.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 521 | `        tasks: filtered.filter((task) => matchDateFilter(task, "today")),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 522 | `        accent: "#1e3a8a",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 523 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 524 | `      week: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 525 | `        label: "Esta semana",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 526 | `        description: "Tarefas com prazo até o fim desta semana.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 527 | `        tasks: filtered.filter((task) => matchDateFilter(task, "this_week")),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 528 | `        accent: "#7c3aed",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 529 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 530 | `      month: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 531 | `        label: "Este mês",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 532 | `        description: "Tarefas com prazo neste mês.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 533 | `        tasks: filtered.filter((task) => matchDateFilter(task, "this_month")),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 534 | `        accent: "#0891b2",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 535 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 536 | `    }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 537 | `    [filtered],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 538 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 539 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 540 | `  const toggleDetail = (metric: DashboardMetric) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 541 | `    setSelectedMetric((current) => (current === metric ? null : metric));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 542 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 543 | `  const memberTasks = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 544 | `    () => filtered.filter((task) => task.assignee_id === user?.id || task.created_by === user?.id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 545 | `    [filtered, user?.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 546 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 547 | `  const memberDetails = useMemo<Record<DashboardMetric, Detail>>(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 548 | `    () => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 549 | `      total: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 550 | `        label: "Minhas tarefas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 551 | `        description: "Todas as tarefas vinculadas a você.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 552 | `        tasks: memberTasks,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 553 | `        accent: "#2563eb",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 554 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 555 | `      done: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 556 | `        label: "Minhas concluídas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 557 | `        description: "Tarefas suas já finalizadas.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 558 | `        tasks: memberTasks.filter(isTaskDone),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 559 | `        accent: "#059669",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 560 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 561 | `      pending: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 562 | `        label: "Minhas pendentes",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 563 | `        description: "Tarefas suas que ainda precisam de andamento ou conclusão.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 564 | `        tasks: memberTasks.filter((task) => !isTaskDone(task)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 565 | `        accent: "#f59e0b",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 566 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 567 | `      overdue: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 568 | `        label: "Minhas atrasadas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 569 | `        description: "Tarefas suas abertas cujo prazo já passou.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 570 | `        tasks: memberTasks.filter((task) => matchDateFilter(task, "overdue")),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 571 | `        accent: "#dc2626",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 572 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 573 | `      today: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 574 | `        label: "Para hoje",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 575 | `        description: "Tarefas suas com prazo para hoje.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 576 | `        tasks: memberTasks.filter((task) => matchDateFilter(task, "today")),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 577 | `        accent: "#1e3a8a",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 578 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 579 | `      week: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 580 | `        label: "Esta semana",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 581 | `        description: "Tarefas suas com prazo até o fim da semana.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 582 | `        tasks: memberTasks.filter((task) => matchDateFilter(task, "this_week")),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 583 | `        accent: "#7c3aed",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 584 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 585 | `      month: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 586 | `        label: "Este mês",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 587 | `        description: "Tarefas suas com prazo neste mês.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 588 | `        tasks: memberTasks.filter((task) => matchDateFilter(task, "this_month")),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 589 | `        accent: "#0891b2",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 590 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 591 | `    }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 592 | `    [memberTasks],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 593 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 594 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 595 | `  // Member dashboard — only own pending/overdue tasks` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 596 | `  if (!isAdmin) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 597 | `    const myPending = memberDetails.pending.tasks;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 598 | `    const myOverdue = memberDetails.overdue.tasks;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 599 | `    const myToday = memberDetails.today.tasks;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 600 | `    const myWeek = memberDetails.week.tasks;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 601 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 602 | `    return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 603 | `      <div className="space-y-6 p-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 604 | `        <header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 605 | `          <h1 className="text-3xl font-bold tracking-tight">Olá, {greetingName}</h1>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 606 | `          <p className="text-muted-foreground">Suas tarefas pendentes e atrasadas</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 607 | `        </header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 608 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 609 | `        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 610 | `          <Stat` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 611 | `            label="Minhas pendentes"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 612 | `            value={myPending.length}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 613 | `            icon={Clock}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 614 | `            color="#f59e0b"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 615 | `            active={selectedMetric === "pending"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 616 | `            onClick={() => toggleDetail("pending")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 617 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 618 | `          <Stat` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 619 | `            label="Atrasadas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 620 | `            value={myOverdue.length}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 621 | `            icon={AlertTriangle}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 622 | `            color="#dc2626"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 623 | `            active={selectedMetric === "overdue"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 624 | `            onClick={() => toggleDetail("overdue")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 625 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 626 | `          <Stat` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 627 | `            label="Para hoje"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 628 | `            value={myToday.length}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 629 | `            icon={Clock}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 630 | `            color="#1e3a8a"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 631 | `            active={selectedMetric === "today"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 632 | `            onClick={() => toggleDetail("today")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 633 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 634 | `          <Stat` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 635 | `            label="Esta semana"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 636 | `            value={myWeek.length}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 637 | `            icon={Clock}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 638 | `            color="#7c3aed"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 639 | `            active={selectedMetric === "week"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 640 | `            onClick={() => toggleDetail("week")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 641 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 642 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 643 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 644 | `        {selectedMetric && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 645 | `          <TaskDetailPanel` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 646 | `            detail={memberDetails[selectedMetric]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 647 | `            clientsById={clientsById}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 648 | `            profilesById={profilesById}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 649 | `            onClose={() => setSelectedMetric(null)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 650 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 651 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 652 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 653 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 654 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 655 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 656 | `  // Admin dashboard — global view (hooks must run for all users to satisfy Rules of Hooks)` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 657 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 658 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 659 | `    <div className="space-y-6 p-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 660 | `      <header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 661 | `        <h1 className="text-3xl font-bold tracking-tight">Olá, {greetingName}</h1>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 662 | `        <p className="text-muted-foreground">Visão geral da produtividade da equipe</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 663 | `        <p className="mt-2 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 664 | `          Exibindo <span className="font-medium text-foreground">{currentScopeLabel}</span> — o` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 665 | `          total inclui tarefas concluídas e em aberto.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 666 | `        </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 667 | `      </header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 668 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 669 | `      <div className="flex flex-wrap items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 670 | `        <DateFilterBar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 671 | `          value={filter}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 672 | `          onChange={(nextFilter) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 673 | `            setFilter(nextFilter);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 674 | `            setCustomPeriod(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 675 | `          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 676 | `          hideToday` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 677 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 678 | `        <div className="flex items-center gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 679 | `          <Popover open={periodOpen} onOpenChange={setPeriodOpen}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 680 | `            <PopoverTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 681 | `              <Button type="button" size="sm" variant="outline" title="Escolher período">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 682 | `                <CalendarDays className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 683 | `                {customPeriod` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 684 | `                  ? \`${format(parseISO(customPeriod.start), "dd/MM/yy", { locale: ptBR })} — ${format(parseISO(customPeriod.end), "dd/MM/yy", { locale: ptBR })}\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 685 | `                  : "Escolher período"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 686 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 687 | `            </PopoverTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 688 | `            <PopoverContent` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 689 | `              align="start"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 690 | `              sideOffset={8}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 691 | `              className="w-[22rem] overflow-hidden rounded-[1.25rem] p-0"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 692 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 693 | `              <div className="border-b bg-muted/35 px-5 py-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 694 | `                <p className="font-semibold">Filtrar por período</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 695 | `                <p className="mt-1 text-xs leading-5 text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 696 | `                  Exibe tarefas cujo prazo esteja entre as datas escolhidas.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 697 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 698 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 699 | `              <div className="grid gap-4 px-5 py-4 sm:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 700 | `                <label className="space-y-2 text-sm font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 701 | `                  Data inicial` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 702 | `                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 703 | `                    type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 704 | `                    value={periodStart}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 705 | `                    onChange={(event) => setPeriodStart(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 706 | `                    max={periodEnd || undefined}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 707 | `                    className="h-10 bg-background text-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 708 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 709 | `                </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 710 | `                <label className="space-y-2 text-sm font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 711 | `                  Data final` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 712 | `                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 713 | `                    type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 714 | `                    value={periodEnd}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 715 | `                    onChange={(event) => setPeriodEnd(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 716 | `                    min={periodStart || undefined}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 717 | `                    className="h-10 bg-background text-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 718 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 719 | `                </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 720 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 721 | `              <div className="flex items-center justify-between gap-3 border-t bg-muted/20 px-5 py-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 722 | `                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 723 | `                  type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 724 | `                  size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 725 | `                  variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 726 | `                  onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 727 | `                    setPeriodStart("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 728 | `                    setPeriodEnd("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 729 | `                    setCustomPeriod(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 730 | `                    setPeriodOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 731 | `                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 732 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 733 | `                  Limpar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 734 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 735 | `                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 736 | `                  type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 737 | `                  size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 738 | `                  disabled={!periodStart || !periodEnd}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 739 | `                  onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 740 | `                    setCustomPeriod({ start: periodStart, end: periodEnd });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 741 | `                    setPeriodOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 742 | `                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 743 | `                  className="px-4"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 744 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 745 | `                  Aplicar período` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 746 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 747 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 748 | `            </PopoverContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 749 | `          </Popover>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 750 | `          {customPeriod && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 751 | `            <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 752 | `              type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 753 | `              size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 754 | `              variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 755 | `              className="h-8 w-8"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 756 | `              onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 757 | `                setCustomPeriod(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 758 | `                setPeriodStart("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 759 | `                setPeriodEnd("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 760 | `              }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 761 | `              title="Limpar período escolhido"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 762 | `              aria-label="Limpar período escolhido"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 763 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 764 | `              <X className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 765 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 766 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 767 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 768 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 769 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 770 | `      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 771 | `        <Stat` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 772 | `          label="Total de tarefas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 773 | `          value={stats.total}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 774 | `          icon={ListTodo}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 775 | `          color="#2563eb"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 776 | `          active={selectedMetric === "total"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 777 | `          onClick={() => toggleDetail("total")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 778 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 779 | `        <Stat` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 780 | `          label="Concluídas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 781 | `          value={stats.done}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 782 | `          icon={CheckCircle2}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 783 | `          color="#059669"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 784 | `          active={selectedMetric === "done"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 785 | `          onClick={() => toggleDetail("done")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 786 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 787 | `        <Stat` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 788 | `          label="Pendentes"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 789 | `          value={stats.pending}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 790 | `          icon={Clock}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 791 | `          color="#f59e0b"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 792 | `          active={selectedMetric === "pending"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 793 | `          onClick={() => toggleDetail("pending")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 794 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 795 | `        <Stat` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 796 | `          label="Atrasadas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 797 | `          value={stats.overdue}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 798 | `          icon={AlertTriangle}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 799 | `          color="#dc2626"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 800 | `          active={selectedMetric === "overdue"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 801 | `          onClick={() => toggleDetail("overdue")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 802 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 803 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 804 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 805 | `      <div className="grid gap-4 sm:grid-cols-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 806 | `        <Stat` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 807 | `          label="Hoje"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 808 | `          value={stats.today}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 809 | `          icon={Clock}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 810 | `          color="#1e3a8a"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 811 | `          active={selectedMetric === "today"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 812 | `          onClick={() => toggleDetail("today")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 813 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 814 | `        <Stat` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 815 | `          label="Esta semana"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 816 | `          value={stats.week}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 817 | `          icon={Clock}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 818 | `          color="#7c3aed"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 819 | `          active={selectedMetric === "week"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 820 | `          onClick={() => toggleDetail("week")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 821 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 822 | `        <Stat` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 823 | `          label="Este mês"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 824 | `          value={stats.month}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 825 | `          icon={Clock}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 826 | `          color="#0891b2"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 827 | `          active={selectedMetric === "month"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 828 | `          onClick={() => toggleDetail("month")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 829 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 830 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 831 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 832 | `      {selectedMetric && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 833 | `        <TaskDetailPanel` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 834 | `          detail={details[selectedMetric]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 835 | `          clientsById={clientsById}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 836 | `          profilesById={profilesById}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 837 | `          onClose={() => setSelectedMetric(null)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 838 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 839 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 840 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 841 | `      <div className="grid gap-4 lg:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 842 | `        <Card className="p-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 843 | `          <h3 className="mb-4 font-semibold">Tarefas por usuário</h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 844 | `          <div className="h-64">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 845 | `            <ResponsiveContainer width="100%" height="100%">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 846 | `              <BarChart data={byUser}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 847 | `                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 848 | `                <XAxis dataKey="name" fontSize={12} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 849 | `                <YAxis fontSize={12} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 850 | `                <Tooltip />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 851 | `                <Bar dataKey="feitas" stackId="a" fill="#059669" radius={[0, 0, 0, 0]} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 852 | `                <Bar dataKey="pendentes" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 853 | `              </BarChart>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 854 | `            </ResponsiveContainer>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 855 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 856 | `        </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 857 | `        <Card className="p-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 858 | `          <div className="mb-1 flex items-baseline justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 859 | `            <h3 className="font-semibold">Panorama das atividades por cliente</h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 860 | `            <span className="text-xs text-muted-foreground">Conclusão × pendências</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 861 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 862 | `          <p className="mb-3 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 863 | `            Veja onde a equipe está avançando e quais clientes concentram atrasos.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 864 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 865 | `          <div className="h-72">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 866 | `            {byClient.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 867 | `              <div className="grid h-full place-items-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 868 | `                Nenhum cliente com tarefas ainda` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 869 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 870 | `            ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 871 | `              <ResponsiveContainer width="100%" height="100%">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 872 | `                <BarChart` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 873 | `                  data={byClient}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 874 | `                  layout="vertical"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 875 | `                  margin={{ top: 4, right: 12, left: 10, bottom: 0 }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 876 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 877 | `                  <CartesianGrid` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 878 | `                    horizontal={false}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 879 | `                    strokeDasharray="3 3"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 880 | `                    stroke="hsl(var(--border))"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 881 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 882 | `                  <XAxis type="number" allowDecimals={false} fontSize={11} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 883 | `                  <YAxis type="category" dataKey="name" width={112} tick={{ fontSize: 11 }} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 884 | `                  <Tooltip cursor={{ fill: "hsl(var(--muted))", fillOpacity: 0.45 }} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 885 | `                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 886 | `                  <Bar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 887 | `                    dataKey="concluídas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 888 | `                    name="Concluídas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 889 | `                    stackId="atividade"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 890 | `                    fill="#059669"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 891 | `                    radius={[0, 0, 0, 0]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 892 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 893 | `                  <Bar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 894 | `                    dataKey="emAberto"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 895 | `                    name="Em aberto"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 896 | `                    stackId="atividade"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 897 | `                    fill="#2563eb"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 898 | `                    radius={[0, 0, 0, 0]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 899 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 900 | `                  <Bar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 901 | `                    dataKey="atrasadas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 902 | `                    name="Atrasadas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 903 | `                    stackId="atividade"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 904 | `                    fill="#dc2626"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 905 | `                    radius={[0, 4, 4, 0]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 906 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 907 | `                </BarChart>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 908 | `              </ResponsiveContainer>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 909 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 910 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 911 | `        </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 912 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 913 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 914 | `      <Card className="p-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 915 | `        <h3 className="mb-2 font-semibold">Resultado do filtro</h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 916 | `        <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 917 | `          {filtered.length} tarefas correspondem ao filtro selecionado.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 918 | `        </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 919 | `      </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 920 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 921 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 922 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 923 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
