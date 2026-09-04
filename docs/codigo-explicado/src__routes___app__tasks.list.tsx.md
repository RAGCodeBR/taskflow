# src/routes/_app/tasks.list.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createFileRoute, useNavigate } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { Fragment, useEffect, useMemo, useRef, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { format, isPast } from "date-fns";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { ptBR } from "date-fns/locale";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { ArrowDown, ArrowUp, Check, ChevronDown, Copy, Plus } from "lucide-react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `import { Badge } from "@/components/ui/badge";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 8 | `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 9 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `  useTasks,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `  useClients,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `  useColumns,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `  useProfiles,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  useSubtasks,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  useTaskStatuses,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  useTaskCollaborators,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  type Task,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 18 | `} from "@/hooks/use-data";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 20 | `import { TaskFilters, applyTaskFilters, type TaskFilterValue } from "@/components/TaskFilters";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 21 | `import { WorkspaceTaskFilter } from "@/components/WorkspaceTaskFilter";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 22 | `import { TaskDialog } from "@/components/TaskDialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 23 | `import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 24 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 25 | `import { priorityColors, priorityLabels } from "@/lib/task-utils";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 26 | `import { matchDateFilter, type DateFilter } from "@/lib/task-utils";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 27 | `import { useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 28 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 29 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 30 | `import { duplicateTask as duplicateTaskWithContents } from "@/lib/duplicate-task";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 31 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 32 | `export const Route = createFileRoute("/_app/tasks/list")({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 33 | `  component: ListPage,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `  validateSearch: (s: Record<string, unknown>) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 35 | `    task: typeof s.task === "string" ? s.task : undefined,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `    mine: s.mine === "1" || s.mine === true || s.mine === "true" ? true : undefined,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `  }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 39 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 40 | `function ListPage() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 41 | `  const { data: tasks = [] } = useTasks();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 42 | `  const { data: clients = [] } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 43 | `  const { data: columns = [] } = useColumns();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 44 | `  const { data: profiles = [] } = useProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 45 | `  const { data: subtasks = [] } = useSubtasks();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 46 | `  const { data: statuses = [] } = useTaskStatuses();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 47 | `  const { data: collaborators = [] } = useTaskCollaborators();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 48 | `  const queryClient = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 49 | `  const { user, isCollaborator } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 50 | `  const search = Route.useSearch();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 51 | `  const navigate = useNavigate();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 52 | `  const [filters, setFilters] = useState<TaskFilterValue>(() =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 53 | `    search.mine ? { scope: "mine" } : {},` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 55 | `  const didApplyDefaultAssignee = useRef(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 56 | `  const [open, setOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 57 | `  const [completedOpen, setCompletedOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 58 | `  const [edit, setEdit] = useState<Task | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 59 | `  const [dueDateSortDirection, setDueDateSortDirection] = useState<"asc" | "desc">("asc");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 60 | `  const [duplicateTaskTarget, setDuplicateTaskTarget] = useState<Task | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 61 | `  const [duplicateDueDate, setDuplicateDueDate] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 62 | `  const [duplicatingTask, setDuplicatingTask] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 63 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 64 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 65 | `    if (!user?.id) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 66 | `    if (isCollaborator) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 67 | `      setFilters((current) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 68 | `        current.assignee ? { ...current, assignee: undefined } : current,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 70 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 71 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 72 | `    if (didApplyDefaultAssignee.current) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 73 | `    setFilters((current) => ({ ...current, assignee: current.assignee ?? user.id }));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 74 | `    didApplyDefaultAssignee.current = true;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 75 | `  }, [user?.id, isCollaborator]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 77 | `  // Auto-open a task when arriving with ?task=<id>` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 78 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 79 | `    if (!search.task) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 80 | `    const t = tasks.find((x) => x.id === search.task);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 81 | `    if (t) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 82 | `      setEdit(t);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `      setOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `      navigate({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `        to: "/tasks/list",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `        search: (p: any) => ({ ...p, task: undefined }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 87 | `        replace: true,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 89 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 90 | `  }, [search.task, tasks, navigate]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 92 | `  const subtaskAssigneeTaskIds = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 93 | `    const s = new Set<string>();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 94 | `    if (!user?.id) return s;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 95 | `    for (const st of subtasks as any[])` | Inicia uma repeticao sobre dados ou condicoes. |
| 96 | `      if (st.assignee_id === user.id && !st.done && st.task_id) s.add(st.task_id);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 97 | `    return s;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 98 | `  }, [subtasks, user?.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 100 | `  const subtaskAssigneeTaskIdsByUser = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 101 | `    const map = new Map<string, Set<string>>();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 102 | `    for (const st of subtasks as any[]) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 103 | `      if (!st.assignee_id || st.done || !st.task_id) continue;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 104 | `      const set = map.get(st.assignee_id) ?? new Set<string>();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 105 | `      set.add(st.task_id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `      map.set(st.assignee_id, set);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 108 | `    return map;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 109 | `  }, [subtasks]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 111 | `  const subtaskDateFilterTaskIds = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 112 | `    const dateFilter = filters.date;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 113 | `    if (!dateFilter || dateFilter === "all") return new Set<string>();` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 114 | `    return new Set(` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 115 | `      (subtasks as any[])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 116 | `        .filter((subtask) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 117 | `          matchDateFilter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `            {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `              due_date: subtask.due_date,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 120 | `              status: subtask.done ? "done" : null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `              completed_at: subtask.completed_at,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `            },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 123 | `            dateFilter as DateFilter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `          ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `        )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `        .map((subtask) => subtask.task_id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 127 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 128 | `  }, [subtasks, filters.date]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 130 | `  const collaboratorTaskIds = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 131 | `    () => new Set(collaborators.filter((collaborator) => collaborator.collaborator_id === user?.id).map((collaborator) => collaborator.task_id)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 132 | `    [collaborators, user?.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 133 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 134 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 135 | `  const duplicateTask = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 136 | `    if (!user || !duplicateTaskTarget || !duplicateDueDate) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 137 | `    setDuplicatingTask(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 139 | `      await duplicateTaskWithContents(duplicateTaskTarget, duplicateDueDate, user.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 140 | `      await queryClient.invalidateQueries({ queryKey: ["tasks"] });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 141 | `      await queryClient.invalidateQueries({ queryKey: ["subtasks"] });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 142 | `      setDuplicateTaskTarget(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 143 | `      setDuplicateDueDate("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 144 | `      toast.success("Tarefa duplicada");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 145 | `    } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 146 | `      toast.error((error as Error).message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 147 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 148 | `      setDuplicatingTask(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 150 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 151 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 152 | `  const list = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 153 | `    const r = applyTaskFilters(tasks, filters, {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 154 | `      userId: user?.id ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 155 | `      subtaskAssigneeTaskIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `      collaboratorTaskIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 157 | `      subtaskAssigneeTaskIdsByUser,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 158 | `      subtaskDateFilterTaskIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `      restrictToCurrentUserParticipation: isCollaborator,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 160 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 161 | `    const getDueTimestamp = (task: Task) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 162 | `      if (!task.due_date) return null;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 163 | `      const dueDate = new Date(task.due_date);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 164 | `      if (!task.due_time) return dueDate.getTime();` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 165 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 166 | `      const [hours, minutes] = task.due_time.split(":").map(Number);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 167 | `      dueDate.setHours(hours, minutes, 0, 0);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 168 | `      return dueDate.getTime();` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 169 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 170 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 171 | `    return [...r].sort((a, b) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 172 | `      const aIsCompleted = a.status === "done" || !!a.completed_at;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 173 | `      const bIsCompleted = b.status === "done" || !!b.completed_at;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 174 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 175 | `      // Keep the completed section and its original order intact.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 176 | `      if (aIsCompleted && bIsCompleted) return 0;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 177 | `      if (aIsCompleted) return 1;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 178 | `      if (bIsCompleted) return -1;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 179 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 180 | `      const aDueTimestamp = getDueTimestamp(a);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 181 | `      const bDueTimestamp = getDueTimestamp(b);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 182 | `      if (aDueTimestamp === null && bDueTimestamp === null) return 0;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 183 | `      if (aDueTimestamp === null) return 1;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 184 | `      if (bDueTimestamp === null) return -1;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 185 | `      const dueDateDifference = aDueTimestamp - bDueTimestamp;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 186 | `      return dueDateSortDirection === "asc" ? dueDateDifference : -dueDateDifference;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 187 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 188 | `  }, [tasks, filters, user?.id, isCollaborator, subtaskAssigneeTaskIds, collaboratorTaskIds, subtaskAssigneeTaskIdsByUser, subtaskDateFilterTaskIds, dueDateSortDirection]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 189 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 190 | `  const completeTask = async (taskId: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 191 | `    const completedStatus = statuses.find((status) => status.is_completed);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 192 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 193 | `    if (!completedStatus) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 194 | `      toast.error("Cadastre um status marcado como concluído.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 195 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 196 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 197 | `    if (subtasks.some((subtask) => subtask.task_id === taskId && !subtask.done)) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 198 | `      toast.error("Conclua todas as subtarefas antes de concluir a tarefa.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 199 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 200 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 201 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 202 | `    const { error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 203 | `      .from("tasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 204 | `      .update({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 205 | `        status: "done",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 206 | `        status_id: completedStatus.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 207 | `        completed_at: new Date().toISOString(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 208 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 209 | `      .eq("id", taskId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 210 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 211 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 212 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 213 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 214 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 215 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 216 | `    await queryClient.invalidateQueries({ queryKey: ["tasks"] });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 217 | `    toast.success("Tarefa concluída.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 218 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 219 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 220 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 221 | `    <div className="space-y-4 p-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 222 | `      <header className="flex items-center justify-end gap-3 flex-wrap">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 223 | `        <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 224 | `          onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 225 | `            setEdit(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 226 | `            setOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 227 | `          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 228 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 229 | `          <Plus className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 230 | `          Nova tarefa` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 231 | `        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 232 | `      </header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 233 | `      <WorkspaceTaskFilter` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 234 | `        value={filters.workspace}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 235 | `        onChange={(workspace) => setFilters({ ...filters, workspace })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 236 | `      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 237 | `      <TaskFilters filters={filters} onChange={setFilters} hideAssignee={isCollaborator} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 238 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 239 | `      <div className="overflow-hidden rounded-lg border bg-card">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 240 | `        <table className="w-full table-fixed border-collapse text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 241 | `          <thead className="border-b bg-muted/50 text-left text-[10px] uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 242 | `            <tr>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 243 | `              <th className="w-[29%] border-r px-2 py-2">Tarefa</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 244 | `              <th className="w-[11%] border-r px-2 py-2">Cliente</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 245 | `              <th className="w-[13%] border-r px-2 py-2">Responsável</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 246 | `              <th className="w-[12%] border-r px-2 py-2">Colaboradores</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 247 | `              <th className="w-[10%] border-r px-2 py-2">Status</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 248 | `              <th className="w-[10%] border-r px-2 py-2">Prioridade</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 249 | `              <th className="w-[10%] border-r px-2 py-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 250 | `                <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 251 | `                  type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 252 | `                  className="flex items-center gap-1 transition-colors hover:text-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 253 | `                  onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 254 | `                    setDueDateSortDirection((current) => (current === "asc" ? "desc" : "asc"))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 255 | `                  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 256 | `                  title={\`Ordenar prazos em ordem ${dueDateSortDirection === "asc" ? "decrescente" : "crescente"}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 257 | `                  aria-label={\`Ordenar prazos em ordem ${dueDateSortDirection === "asc" ? "decrescente" : "crescente"}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 258 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 259 | `                  Prazo` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 260 | `                  {dueDateSortDirection === "asc" ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 261 | `                    <ArrowUp className="h-3 w-3" aria-hidden="true" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 262 | `                  ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 263 | `                    <ArrowDown className="h-3 w-3" aria-hidden="true" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 264 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 265 | `                </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 266 | `              </th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 267 | `              <th className="w-[5%] px-1 py-2 text-center">Ações</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 268 | `            </tr>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 269 | `          </thead>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 270 | `          <tbody>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 271 | `            {list.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 272 | `              <tr>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 273 | `                <td colSpan={8} className="py-10 text-center text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 274 | `                  Nenhuma tarefa` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 275 | `                </td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 276 | `              </tr>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 277 | `            ) : list.map((t, index) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 278 | `              const client = clients.find((c) => c.id === t.client_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 279 | `              const assignee = profiles.find((p) => p.id === t.assignee_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 280 | `              const isCompleted = t.status === "done" || !!t.completed_at;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 281 | `              const previousTask = list[index - 1];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 282 | `              const startsCompletedSection =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 283 | `                isCompleted &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 284 | `                (!previousTask || (previousTask.status !== "done" && !previousTask.completed_at));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 285 | `              const currentColumn = columns.find((column) => column.id === t.column_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 286 | `              const completedStatus = statuses.find((status) => status.is_completed);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 287 | `              const storedStatus = statuses.find((status) => status.id === t.status_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 288 | `              // The Kanban card's current state is its column. Only completed` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 289 | `              // tasks use the dedicated completion status instead of the column.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 290 | `              const displayStatus = isCompleted` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 291 | `                ? {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 292 | `                    name: completedStatus?.name ?? "Concluída",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 293 | `                    color: completedStatus?.color ?? "#22c55e",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 294 | `                  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 295 | `                : currentColumn` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 296 | `                  ? { name: currentColumn.name, color: currentColumn.color || "#64748b" }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 297 | `                  : storedStatus` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 298 | `                    ? {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 299 | `                        name: storedStatus.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 300 | `                        color: storedStatus.color,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 301 | `                      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 302 | `                    : null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 303 | `              const overdue = t.due_date && isPast(new Date(t.due_date)) && t.status !== "done";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 304 | `              const taskCollaborators = collaborators.filter((collaborator) => collaborator.task_id === t.id).map((collaborator) => profiles.find((profile) => profile.id === collaborator.collaborator_id)).filter(Boolean);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 305 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 306 | `              return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 307 | `                <Fragment key={t.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 308 | `                {startsCompletedSection && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 309 | `                  <tr aria-label="Tarefas concluídas">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 310 | `                    <td colSpan={8} className="px-2 py-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 311 | `                      <button type="button" onClick={() => setCompletedOpen((current) => !current)} className="flex w-full items-center gap-3 border-t border-dashed border-muted-foreground/45 pt-2 text-left">` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 312 | `                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Tarefas concluídas</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 313 | `                        <span className="h-px flex-1 border-t border-dashed border-muted-foreground/30" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 314 | `                        <ChevronDown className={\`h-4 w-4 text-muted-foreground transition-transform ${completedOpen ? "" : "-rotate-90"}\`} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 315 | `                      </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 316 | `                    </td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 317 | `                  </tr>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 318 | `                )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 319 | `                {isCompleted && !completedOpen ? null :` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 320 | `                <tr` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 321 | `                  className={\`cursor-pointer border-t transition-colors hover:bg-muted/30 ${` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 322 | `                    isCompleted ? "opacity-60 grayscale-[0.2]" : ""` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 323 | `                  }\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 324 | `                  onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 325 | `                    setEdit(t);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 326 | `                    setOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 327 | `                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 328 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 329 | `                  <td className="border-r px-2 py-2 font-medium"><span className="block truncate">{t.title}</span></td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 330 | `                  <td className="border-r px-2 py-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 331 | `                    {client ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 332 | `                      <Badge variant="outline" style={{ borderColor: client.color ?? undefined }}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 333 | `                        {client.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 334 | `                      </Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 335 | `                    ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 336 | `                      <span className="text-muted-foreground">—</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 337 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 338 | `                  </td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 339 | `                  <td className="border-r px-2 py-2 text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 340 | `                    {assignee?.full_name || assignee?.email || "—"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 341 | `                  </td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 342 | `                  <td className="border-r px-2 py-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 343 | `                    {taskCollaborators.length > 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 344 | `                      <div className="flex -space-x-1" title={taskCollaborators.map((p: any) => p.full_name || p.email).join(", ")}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 345 | `                        {taskCollaborators.slice(0, 3).map((person: any) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 346 | `                          const name = person.full_name || person.email || "Usuário";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 347 | `                          return <Avatar key={person.id} className="h-5 w-5 border border-background"><AvatarImage src={person.avatar_url || undefined} alt={name} /><AvatarFallback className="text-[8px]">{name.slice(0, 1).toUpperCase()}</AvatarFallback></Avatar>;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 348 | `                        })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 349 | `                        {taskCollaborators.length > 3 ? <span className="ml-1 text-[10px] text-muted-foreground">+{taskCollaborators.length - 3}</span> : null}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 350 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 351 | `                    ) : <span className="text-muted-foreground">—</span>}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 352 | `                  </td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 353 | `                  <td className="border-r px-2 py-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 354 | `                    {displayStatus ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 355 | `                      <Badge variant="outline" className="max-w-full truncate" style={{ borderColor: displayStatus.color, color: displayStatus.color }}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 356 | `                        {displayStatus.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 357 | `                      </Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 358 | `                    ) : <span className="text-muted-foreground">—</span>}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 359 | `                  </td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 360 | `                  <td className="border-r px-2 py-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 361 | `                    {t.priority ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 362 | `                      <Badge` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 363 | `                        variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 364 | `                        style={{` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 365 | `                          borderColor: priorityColors[t.priority],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 366 | `                          color: priorityColors[t.priority],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 367 | `                        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 368 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 369 | `                        {priorityLabels[t.priority]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 370 | `                      </Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 371 | `                    ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 372 | `                      <span className="text-muted-foreground">—</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 373 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 374 | `                  </td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 375 | `                  <td className={\`border-r px-2 py-2 whitespace-nowrap ${overdue ? "font-medium text-destructive" : "text-muted-foreground"}\`}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 376 | `                    {t.due_date` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 377 | `                      ? \`${format(new Date(t.due_date), "dd MMM yyyy", { locale: ptBR })}${t.due_time ? \` · ${t.due_time.slice(0, 5)}\` : ""}\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 378 | `                      : "—"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 379 | `                  </td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 380 | `                  <td className="px-1 py-2 text-center">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 381 | `                    <div className="flex items-center justify-center gap-0.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 382 | `                      <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 383 | `                        size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 384 | `                        variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 385 | `                        title="Duplicar tarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 386 | `                        onClick={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 387 | `                          event.stopPropagation();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 388 | `                          setDuplicateTaskTarget(t);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 389 | `                          setDuplicateDueDate("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 390 | `                        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 391 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 392 | `                        <Copy className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 393 | `                      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 394 | `                      <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 395 | `                        size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 396 | `                        variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 397 | `                        title="Concluir tarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 398 | `                        disabled={t.completed_at !== null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 399 | `                        onClick={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 400 | `                          event.stopPropagation();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 401 | `                          void completeTask(t.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 402 | `                        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 403 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 404 | `                        <Check className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 405 | `                      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 406 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 407 | `                  </td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 408 | `                </tr>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 409 | `                }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 410 | `                </Fragment>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 411 | `              );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 412 | `            })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 413 | `          </tbody>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 414 | `        </table>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 415 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 416 | `      <TaskDialog open={open} onOpenChange={setOpen} task={edit} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 417 | `      <Dialog open={!!duplicateTaskTarget} onOpenChange={(isOpen) => !isOpen && !duplicatingTask && setDuplicateTaskTarget(null)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 418 | `        <DialogContent className="max-w-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 419 | `          <DialogHeader><DialogTitle>Duplicar tarefa</DialogTitle></DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 420 | `          <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 421 | `            <p className="text-sm text-muted-foreground">Defina o novo prazo para a cópia de “{duplicateTaskTarget?.title}”.</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 422 | `            <Input type="date" value={duplicateDueDate} onChange={(event) => setDuplicateDueDate(event.target.value)} required />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 423 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 424 | `          <DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 425 | `            <Button variant="outline" disabled={duplicatingTask} onClick={() => setDuplicateTaskTarget(null)}>Cancelar</Button>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 426 | `            <Button disabled={!duplicateDueDate || duplicatingTask} onClick={() => void duplicateTask()}>{duplicatingTask ? "Duplicando…" : "Duplicar"}</Button>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 427 | `          </DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 428 | `        </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 429 | `      </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 430 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 431 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 432 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 433 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
