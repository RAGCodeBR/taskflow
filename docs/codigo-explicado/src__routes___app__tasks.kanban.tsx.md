# src/routes/_app/tasks.kanban.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createFileRoute } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `  useEffect,` | Executa efeito React quando o componente carrega ou quando dependencias mudam. |
| 4 | `  useLayoutEffect,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 5 | `  useMemo,` | Memoriza um valor calculado para evitar processamento desnecessario. |
| 6 | `  useRef,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `  useState,` | Cria estado React para armazenar valores que mudam na tela. |
| 8 | `  type CSSProperties,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 9 | `  type ReactNode,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 10 | `} from "react";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `  DndContext,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `  type CollisionDetection,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 14 | `  type DragEndEvent,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 15 | `  PointerSensor,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  TouchSensor,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  useSensor,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  useSensors,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  DragOverlay,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  useDroppable,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `  closestCenter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `  getFirstCollision,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `  pointerWithin,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  rectIntersection,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `} from "@dnd-kit/core";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 27 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 28 | `  SortableContext,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `  useSortable,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  horizontalListSortingStrategy,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `  verticalListSortingStrategy,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `  arrayMove,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `} from "@dnd-kit/sortable";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `import { CSS } from "@dnd-kit/utilities";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 35 | `import { useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 36 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 37 | `  Plus,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `  MoreVertical,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `  Pencil,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `  Trash2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `  GripVertical,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `  FolderOpen,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `  ArrowUp,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `  ArrowDown,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  FileDown,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `  Rows,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `  Columns,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `  PanelTop,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `  PanelsTopLeft,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `  ChevronDown,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `} from "lucide-react";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 53 | `  Select,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `  SelectContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 55 | `  SelectItem,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 56 | `  SelectTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 57 | `  SelectValue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 58 | `} from "@/components/ui/select";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 59 | `import { ClientFilesSheet } from "@/components/ClientFilesSheet";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 60 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 61 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 62 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 63 | `  DropdownMenu,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `  DropdownMenuContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `  DropdownMenuItem,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `  DropdownMenuTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `} from "@/components/ui/dropdown-menu";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 69 | `  Dialog,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `  DialogContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `  DialogHeader,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 72 | `  DialogTitle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `  DialogFooter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `} from "@/components/ui/dialog";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 75 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 76 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 77 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 78 | `  useTasks,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `  useColumns,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `  useClients,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 81 | `  useProfiles,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `  useTaskTags,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `  useTaskStatuses,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `  useTaskTagLinks,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `  useTaskCollaborators,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `  useUserColumnOrder,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `  useUserTaskOrder,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `  useSubtasks,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `  type Task,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 90 | `  type KanbanColumn,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 91 | `} from "@/hooks/use-data";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `import { TaskCard } from "@/components/TaskCard";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 93 | `import { duplicateTask as duplicateTaskWithContents } from "@/lib/duplicate-task";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 94 | `import { TaskDialog } from "@/components/TaskDialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 95 | `import { TagManagerDialog } from "@/components/TagManagerDialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 96 | `import { TaskFilters, applyTaskFilters, type TaskFilterValue } from "@/components/TaskFilters";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 97 | `import { WorkspaceTaskFilter } from "@/components/WorkspaceTaskFilter";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 98 | `import { CardFieldsPopover } from "@/components/CardFieldsPopover";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 99 | `import { useBoardPreferences, useUpdateBoardPreferences } from "@/hooks/use-board-preferences";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 100 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 101 | `import { format } from "date-fns";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 102 | `import { matchDateFilter, normalizeTasksWithOpenSubtasks, type DateFilter } from "@/lib/task-utils";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 103 | `import { isTaskFromAnotherWorkspace, splitTasksByWorkspace } from "@/lib/workspace-tasks";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 104 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 105 | `export const Route = createFileRoute("/_app/tasks/kanban")({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 106 | `  component: KanbanPage,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 108 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 109 | `function SortableTaskCard({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 110 | `  task,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `  colId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `  onEdit,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `  onDuplicate,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `  clients,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `  profiles,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 116 | `  columns,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `  tags,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `  statuses,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `  collaborators,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 120 | `  orientation,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `  minimal,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `  disabled,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `}: any) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `  // Tarefa espelhada de outro ambiente aparece na coluna normal, mas não` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 125 | `  // arrasta: a coluna de destino seria deste quadro, e a tarefa mora no outro.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 126 | `  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 127 | `    id: task.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `    data: { type: "task", colId: colId ?? task.column_id },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `    animateLayoutChanges: () => false,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 130 | `    disabled,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 132 | `  const style = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 133 | `    transform: CSS.Translate.toString(transform),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `    transition: transition ?? "transform 180ms cubic-bezier(0.2, 0, 0, 1)",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 135 | `    opacity: isDragging ? 0.4 : 1,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 136 | `    willChange: "transform",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `  } as CSSProperties;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 139 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 140 | `    <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 141 | `      ref={setNodeRef}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 142 | `      style={style}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 143 | `      className={` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 144 | `        minimal` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 145 | `          ? "w-[clamp(15rem,18vw,19rem)] max-w-full min-w-0 shrink-0"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 146 | `          : "w-72 max-w-full min-w-0 shrink-0"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 147 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 148 | `    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `      <TaskCard` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 150 | `        task={task}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 151 | `        columns={columns}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `        clients={clients}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 153 | `        profiles={profiles}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `        tags={tags}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 155 | `        statuses={statuses}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `        collaborators={collaborators}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 157 | `        onEdit={onEdit}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 158 | `        onDuplicate={onDuplicate}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `        minimal={minimal}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 160 | `        dragHandleProps={disabled ? undefined : { ...attributes, ...listeners }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 163 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 164 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 165 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 166 | `const COMPLETED_COL_ID = "__completed__";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 167 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 168 | `type SortField = "position" | "due_date" | "created_at" | "tag" | "priority" | "status";` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 169 | `type SortDirection = "asc" | "desc";` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 170 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 171 | `function CompletedColumn({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 172 | `  taskIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 173 | `  count,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `  children,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 175 | `  orientation,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 176 | `  minimal,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 177 | `  open,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `  onOpenChange,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 179 | `}: any) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 180 | `  const { setNodeRef, isOver } = useDroppable({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 181 | `    id: \`drop:${COMPLETED_COL_ID}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 182 | `    data: { type: "column-drop", colId: COMPLETED_COL_ID },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 183 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 184 | `  const isH = orientation === "horizontal";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 185 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 186 | `    <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 187 | `      className={` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 188 | `        isH` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 189 | `          ? minimal` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 190 | `            ? "flex w-[clamp(15rem,18vw,19rem)] shrink-0 flex-col"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 191 | `            : "flex w-72 shrink-0 flex-col"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 192 | `          : "flex w-full flex-col"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 193 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 194 | `    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 195 | `      <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 196 | `        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 197 | `        onClick={onOpenChange}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `        className="mb-2 flex w-full items-center gap-1.5 rounded px-1 text-left hover:bg-muted/50"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 199 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 200 | `        <span className="h-3 w-3 rounded-full bg-emerald-500 dark:bg-emerald-400 dark:ring-2 dark:ring-emerald-200/40 dark:shadow-[0_0_12px_rgba(74,222,128,0.7)]" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 201 | `        <h3 className="font-semibold">Concluídas</h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 202 | `        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-900 dark:bg-emerald-400/25 dark:text-emerald-100 dark:ring-1 dark:ring-emerald-200/45 dark:shadow-[0_0_10px_rgba(74,222,128,0.32)]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 203 | `          {count}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 204 | `        </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 205 | `        {!isH && open && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 206 | `          <span className="ml-2 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 207 | `            Arraste tarefas aqui para concluir` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 208 | `          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 209 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 210 | `        <ChevronDown` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 211 | `          className={\`ml-auto h-4 w-4 text-muted-foreground transition-transform ${open ? "" : "-rotate-90"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 212 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 213 | `      </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 214 | `      <SortableContext` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 215 | `        items={taskIds}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 216 | `        strategy={isH ? verticalListSortingStrategy : horizontalListSortingStrategy}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 217 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 218 | `        <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 219 | `          ref={setNodeRef}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 220 | `          className={\`rounded-lg border-2 border-solid p-2 transition ${` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 221 | `            open` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 222 | `              ? isH` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 223 | `                ? "flex flex-col gap-2"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 224 | `                : "flex flex-nowrap items-start gap-2 overflow-x-auto pb-2"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 225 | `              : "flex items-center justify-center"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 226 | `          } ${isOver ? "border-emerald-500 bg-emerald-500/10" : "border-emerald-500/30 bg-emerald-500/5"}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 227 | `          style={{ minHeight: open ? (isH ? 200 : 120) : 42 }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 228 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 229 | `          {open ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 230 | `            children` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 231 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 232 | `            <span className="text-xs font-medium text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 233 | `              Arraste aqui para concluir` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 234 | `            </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 235 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 236 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 237 | `      </SortableContext>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 238 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 239 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 240 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 241 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 242 | `function SortableColumn({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 243 | `  col,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 244 | `  taskIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 245 | `  count,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 246 | `  children,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 247 | `  onEdit,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 248 | `  onDelete,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 249 | `  onAdd,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 250 | `  orientation,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 251 | `  minimal,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 252 | `  canManage,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 253 | `}: any) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 254 | `  const sortable = useSortable({ id: \`col:${col.id}\`, data: { type: "column", colId: col.id } });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 255 | `  const {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 256 | `    setNodeRef: setSortRef,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 257 | `    attributes,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 258 | `    listeners,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 259 | `    transform,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 260 | `    transition,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 261 | `    isDragging,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 262 | `  } = sortable;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 263 | `  const { setNodeRef: setDropRef, isOver } = useDroppable({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 264 | `    id: \`drop:${col.id}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 265 | `    data: { type: "column-drop", colId: col.id },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 266 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 267 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 268 | `  const style = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 269 | `    transform: CSS.Transform.toString(transform),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 270 | `    transition,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 271 | `    opacity: isDragging ? 0.5 : 1,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 272 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 273 | `  const isH = orientation === "horizontal";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 274 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 275 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 276 | `    <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 277 | `      ref={setSortRef}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 278 | `      style={style}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 279 | `      className={` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 280 | `        isH` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 281 | `          ? minimal` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 282 | `            ? "flex w-[clamp(15rem,18vw,19rem)] shrink-0 flex-col"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 283 | `            : "flex w-fit min-w-72 shrink-0 flex-col"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 284 | `          : "flex w-full flex-col"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 285 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 286 | `    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 287 | `      <div className="mb-2 flex items-center justify-between px-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 288 | `        <div className="flex items-center gap-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 289 | `          {canManage && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 290 | `            <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 291 | `              {...attributes}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 292 | `              {...listeners}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 293 | `              className="inline-flex h-6 w-6 cursor-grab items-center justify-center rounded-md text-muted-foreground hover:bg-muted active:cursor-grabbing dark:text-slate-100 dark:hover:bg-white/10"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 294 | `              title="Arrastar coluna"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 295 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 296 | `              <GripVertical className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 297 | `            </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 298 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 299 | `          <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 300 | `            className="h-3 w-3 rounded-full dark:ring-2 dark:ring-white/45 dark:shadow-[0_0_12px_rgba(255,255,255,0.32)]"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 301 | `            style={{ background: col.color || "#1e3a8a" }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 302 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 303 | `          <h3 className="font-semibold">{col.name}</h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 304 | `          <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 305 | `            className="rounded-full px-2 py-0.5 text-xs font-semibold dark:ring-1 dark:ring-white/45 dark:shadow-[0_0_10px_rgba(255,255,255,0.2)]"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 306 | `            style={{` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 307 | `              color: "var(--foreground)",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 308 | `              backgroundColor: \`${col.color || "#1e3a8a"}40\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 309 | `            }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 310 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 311 | `            {count}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 312 | `          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 313 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 314 | `        <div className="flex items-center gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 315 | `          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 316 | `            size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 317 | `            variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 318 | `            className="h-7 w-7 dark:text-slate-100 dark:hover:bg-white/10"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 319 | `            onClick={onAdd}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 320 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 321 | `            <Plus className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 322 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 323 | `          {canManage && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 324 | `            <DropdownMenu>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 325 | `              <DropdownMenuTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 326 | `                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 327 | `                  size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 328 | `                  variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 329 | `                  className="h-7 w-7 dark:text-slate-100 dark:hover:bg-white/10"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 330 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 331 | `                  <MoreVertical className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 332 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 333 | `              </DropdownMenuTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 334 | `              <DropdownMenuContent align="end">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 335 | `                <DropdownMenuItem onClick={onEdit}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 336 | `                  <Pencil className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 337 | `                  Editar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 338 | `                </DropdownMenuItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 339 | `                <DropdownMenuItem onClick={onDelete} className="text-destructive">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 340 | `                  <Trash2 className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 341 | `                  Excluir` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 342 | `                </DropdownMenuItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 343 | `              </DropdownMenuContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 344 | `            </DropdownMenu>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 345 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 346 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 347 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 348 | `      <SortableContext` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 349 | `        items={taskIds}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 350 | `        strategy={isH ? verticalListSortingStrategy : horizontalListSortingStrategy}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 351 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 352 | `        <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 353 | `          ref={setDropRef}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 354 | `          className={\`rounded-lg border-2 border-solid border-l-4 p-2 transition ${` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 355 | `            isH ? "flex flex-col gap-3" : "flex flex-nowrap items-start gap-4 overflow-x-auto pb-2"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 356 | `          } ${isOver ? "border-primary bg-primary/5" : "border-transparent bg-muted/40"}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 357 | `          style={{` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 358 | `            minHeight: isH ? 200 : 120,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 359 | `            borderLeftColor: col.color || "#1e3a8a",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 360 | `          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 361 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 362 | `          {children}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 363 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 364 | `      </SortableContext>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 365 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 366 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 367 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 368 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 369 | `function KanbanPage() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 370 | `  const qc = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 371 | `  const { user, isAdmin, isCollaborator, activeWorkspace } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 372 | `  const { data: tasks = [] } = useTasks();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 373 | `  const { data: rawColumns = [] } = useColumns();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 374 | `  const { data: userColOrder = [] } = useUserColumnOrder();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 375 | `  const { data: userTaskOrder = [] } = useUserTaskOrder();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 376 | `  const { data: clients = [] } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 377 | `  const { data: profiles = [] } = useProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 378 | `  const { data: tags = [] } = useTaskTags();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 379 | `  const { data: statuses = [] } = useTaskStatuses();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 380 | `  const { data: collaborators = [] } = useTaskCollaborators();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 381 | `  const collaboratorTaskIds = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 382 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 383 | `      new Set(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 384 | `        collaborators` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 385 | `          .filter((collaborator) => collaborator.collaborator_id === user?.id)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 386 | `          .map((collaborator) => collaborator.task_id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 387 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 388 | `    [collaborators, user?.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 389 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 390 | `  const { data: boardPrefs } = useBoardPreferences();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 391 | `  const { data: allSubtasks = [] } = useSubtasks();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 392 | `  const updatePrefs = useUpdateBoardPreferences();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 393 | `  const orientation = boardPrefs?.kanban_orientation ?? "vertical";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 394 | `  const minimalCardsStorageKey = \`kanban-minimal-cards:${user?.id ?? "anonymous"}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 395 | `  const [minimalCards, setMinimalCards] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 396 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 397 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 398 | `    if (typeof window === "undefined") return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 399 | `    setMinimalCards(window.localStorage.getItem(minimalCardsStorageKey) === "true");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 400 | `  }, [minimalCardsStorageKey]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 401 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 402 | `  const toggleMinimalCards = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 403 | `    const next = !minimalCards;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 404 | `    setMinimalCards(next);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 405 | `    if (typeof window !== "undefined")` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 406 | `      window.localStorage.setItem(minimalCardsStorageKey, String(next));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 407 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 408 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 409 | `  const switchOrientation = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 410 | `    if (updatePrefs.isPending) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 411 | `    // A troca de estratégia do dnd-kit durante um arraste pode manter uma` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 412 | `    // medição antiga de coluna. Cancelamos o overlay antes de remontar o quadro.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 413 | `    setActiveTask(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 414 | `    updatePrefs.mutate({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 415 | `      kanban_orientation: orientation === "horizontal" ? "vertical" : "horizontal",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 416 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 417 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 418 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 419 | `  const subtaskAssigneeTaskIds = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 420 | `    const s = new Set<string>();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 421 | `    if (!user?.id) return s;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 422 | `    for (const st of allSubtasks as any[])` | Inicia uma repeticao sobre dados ou condicoes. |
| 423 | `      if (st.assignee_id === user.id && !st.done && st.task_id) s.add(st.task_id);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 424 | `    return s;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 425 | `  }, [allSubtasks, user?.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 426 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 427 | `  const subtaskAssigneeTaskIdsByUser = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 428 | `    const map = new Map<string, Set<string>>();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 429 | `    for (const st of allSubtasks as any[]) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 430 | `      if (!st.assignee_id || st.done || !st.task_id) continue;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 431 | `      const set = map.get(st.assignee_id) ?? new Set<string>();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 432 | `      set.add(st.task_id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 433 | `      map.set(st.assignee_id, set);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 434 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 435 | `    return map;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 436 | `  }, [allSubtasks]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 437 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 438 | `  const [filters, setFilters] = useState<TaskFilterValue>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 439 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 440 | `  const subtaskDateFilterTaskIds = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 441 | `    const dateFilter = filters.date;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 442 | `    if (!dateFilter || dateFilter === "all") return new Set<string>();` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 443 | `    return new Set(` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 444 | `      (allSubtasks as any[])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 445 | `        .filter((subtask) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 446 | `          matchDateFilter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 447 | `            {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 448 | `              due_date: subtask.due_date,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 449 | `              status: subtask.done ? "done" : null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 450 | `              completed_at: subtask.completed_at,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 451 | `            },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 452 | `            dateFilter as DateFilter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 453 | `          ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 454 | `        )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 455 | `        .map((subtask) => subtask.task_id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 456 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 457 | `  }, [allSubtasks, filters.date]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 458 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 459 | `  // Apply per-user column ordering (fallback to global position)` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 460 | `  const columns = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 461 | `    const ord = new Map(userColOrder.map((u) => [u.column_id, u.position]));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 462 | `    return [...rawColumns].sort((a, b) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 463 | `      const ap = ord.has(a.id) ? (ord.get(a.id) as number) : a.position + 10000;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 464 | `      const bp = ord.has(b.id) ? (ord.get(b.id) as number) : b.position + 10000;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 465 | `      return ap - bp;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 466 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 467 | `  }, [rawColumns, userColOrder]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 468 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 469 | `  // Per-user task position map (fallback to task.position)` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 470 | `  const userTaskPos = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 471 | `    const m = new Map<string, number>();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 472 | `    userTaskOrder.forEach((u) => m.set(u.task_id, u.position));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 473 | `    return m;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 474 | `  }, [userTaskOrder]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 475 | `  const didApplyDefaultAssignee = useRef(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 476 | `  const [sort, setSort] = useState<{ field: SortField; direction: SortDirection }>({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 477 | `    field: "due_date",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 478 | `    direction: "asc",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 479 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 480 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 481 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 482 | `    if (!user?.id) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 483 | `    if (isCollaborator) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 484 | `      setFilters((current) => (current.assignee ? { ...current, assignee: undefined } : current));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 485 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 486 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 487 | `    if (didApplyDefaultAssignee.current) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 488 | `    setFilters((current) => ({ ...current, assignee: current.assignee ?? user.id }));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 489 | `    didApplyDefaultAssignee.current = true;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 490 | `  }, [user?.id, isCollaborator]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 491 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 492 | `  const [activeTask, setActiveTask] = useState<Task | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 493 | `  const [dialogOpen, setDialogOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 494 | `  const [editTask, setEditTask] = useState<Task | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 495 | `  const [defaultCol, setDefaultCol] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 496 | `  const [duplicateTaskTarget, setDuplicateTaskTarget] = useState<Task | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 497 | `  const [duplicateDueDate, setDuplicateDueDate] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 498 | `  const [duplicatingTask, setDuplicatingTask] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 499 | `  const [tagsOpen, setTagsOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 500 | `  const [filesOpen, setFilesOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 501 | `  const [exportingPdf, setExportingPdf] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 502 | `  const [completedRange, setCompletedRange] = useState<{ start: string; end: string }>({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 503 | `    start: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 504 | `    end: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 505 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 506 | `  const [completedOpen, setCompletedOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 507 | `  const [columnEditor, setColumnEditor] = useState<{` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 508 | `    open: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 509 | `    id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 510 | `    name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 511 | `    color: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 512 | `  }>({ open: false, id: null, name: "", color: "#1e3a8a" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 513 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 514 | `  const completedStatus = useMemo(() => statuses.find((s) => s.is_completed) ?? null, [statuses]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 515 | `  const fallbackStatus = useMemo(() => statuses.find((s) => !s.is_completed) ?? null, [statuses]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 516 | `  const openSubtaskTaskIds = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 517 | `    () => new Set(allSubtasks.filter((subtask) => !subtask.done).map((subtask) => subtask.task_id)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 518 | `    [allSubtasks],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 519 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 520 | `  // Keep legacy parent tasks with pending subtasks in the active board. The` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 521 | `  // calendar already exposes their pending dates, so hiding their parent card` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 522 | `  // in Kanban made the two views disagree.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 523 | `  const taskView = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 524 | `    () => normalizeTasksWithOpenSubtasks(tasks, openSubtaskTaskIds, fallbackStatus?.id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 525 | `    [tasks, openSubtaskTaskIds, fallbackStatus?.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 526 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 527 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 528 | `  const { data: tagLinks = [] } = useTaskTagLinks();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 529 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 530 | `  const tagNameForTask = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 531 | `    const map = new Map<string, string>();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 532 | `    const linksByTask = new Map<string, string[]>();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 533 | `    tagLinks.forEach((l) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 534 | `      if (!linksByTask.has(l.task_id)) linksByTask.set(l.task_id, []);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 535 | `      linksByTask.get(l.task_id)!.push(l.tag_id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 536 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 537 | `    tasks.forEach((t) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 538 | `      const linkIds = linksByTask.get(t.id) ?? [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 539 | `      if (t.tag_id) linkIds.push(t.tag_id);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 540 | `      const uniqueIds = [...new Set(linkIds)];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 541 | `      const names = uniqueIds` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 542 | `        .map((id) => tags.find((tag) => tag.id === id)?.name ?? "")` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 543 | `        .filter(Boolean)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 544 | `        .sort();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 545 | `      map.set(t.id, names[0] ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 546 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 547 | `    return map;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 548 | `  }, [tagLinks, tags, tasks]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 549 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 550 | `  const completedTasks = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 551 | `    const startToday = new Date();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 552 | `    startToday.setHours(0, 0, 0, 0);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 553 | `    const endToday = new Date();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 554 | `    endToday.setHours(23, 59, 59, 999);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 555 | `    const hasRange = !!(completedRange.start || completedRange.end);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 556 | `    let all = taskView.filter((t) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 557 | `      if (isTaskFromAnotherWorkspace(t, activeWorkspace?.id)) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 558 | `      if (t.status !== "done" && !t.completed_at) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 559 | `      const ref = t.completed_at ? new Date(t.completed_at) : new Date(t.updated_at);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 560 | `      if (hasRange) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 561 | `        const start = completedRange.start ? new Date(\`${completedRange.start}T00:00:00\`) : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 562 | `        const end = completedRange.end ? new Date(\`${completedRange.end}T23:59:59\`) : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 563 | `        return (!start || ref >= start) && (!end || ref <= end);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 564 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 565 | `      // Padrão: apenas as concluídas de hoje` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 566 | `      return ref >= startToday && ref <= endToday;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 567 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 568 | `    all = applyTaskFilters(all, filters, {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 569 | `      userId: user?.id ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 570 | `      subtaskAssigneeTaskIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 571 | `      collaboratorTaskIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 572 | `      subtaskAssigneeTaskIdsByUser,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 573 | `      subtaskDateFilterTaskIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 574 | `      restrictToCurrentUserParticipation: isCollaborator,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 575 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 576 | `    all.sort((a, b) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 577 | `      let cmp = 0;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 578 | `      switch (sort.field) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 579 | `        case "due_date": {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 580 | `          if (!a.due_date && !b.due_date) cmp = 0;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 581 | `          else if (!a.due_date) cmp = 1;` | Define o caminho alternativo da condicao anterior. |
| 582 | `          else if (!b.due_date) cmp = -1;` | Define o caminho alternativo da condicao anterior. |
| 583 | `          else cmp = new Date(a.due_date).getTime() - new Date(b.due_date).getTime();` | Define o caminho alternativo da condicao anterior. |
| 584 | `          break;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 585 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 586 | `        case "created_at": {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 587 | `          cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 588 | `          break;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 589 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 590 | `        case "tag": {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 591 | `          cmp = (tagNameForTask.get(a.id) ?? "").localeCompare(tagNameForTask.get(b.id) ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 592 | `          break;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 593 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 594 | `        case "priority": {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 595 | `          const order: Record<string, number> = { low: 1, medium: 2, high: 3, urgent: 4 };` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 596 | `          cmp = (order[a.priority ?? ""] || 0) - (order[b.priority ?? ""] || 0);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 597 | `          break;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 598 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 599 | `        case "status": {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 600 | `          const sa = statuses.find((s) => s.id === a.status_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 601 | `          const sb = statuses.find((s) => s.id === b.status_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 602 | `          const ap = sa ? sa.position : 9999;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 603 | `          const bp = sb ? sb.position : 9999;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 604 | `          cmp = ap - bp;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 605 | `          break;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 606 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 607 | `        case "position":` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 608 | `        default: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 609 | `          cmp = (b.completed_at ?? b.updated_at ?? "").localeCompare(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 610 | `            a.completed_at ?? a.updated_at ?? "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 611 | `          );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 612 | `          break;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 613 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 614 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 615 | `      if (cmp === 0)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 616 | `        cmp = (b.completed_at ?? b.updated_at ?? "").localeCompare(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 617 | `          a.completed_at ?? a.updated_at ?? "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 618 | `        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 619 | `      return sort.direction === "asc" ? cmp : -cmp;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 620 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 621 | `    return all;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 622 | `  }, [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 623 | `    taskView,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 624 | `    activeWorkspace?.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 625 | `    filters,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 626 | `    sort,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 627 | `    tagNameForTask,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 628 | `    completedRange,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 629 | `    statuses,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 630 | `    user?.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 631 | `    subtaskAssigneeTaskIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 632 | `    collaboratorTaskIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 633 | `    subtaskAssigneeTaskIdsByUser,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 634 | `    subtaskDateFilterTaskIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 635 | `    isCollaborator,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 636 | `  ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 637 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 638 | `  const sensors = useSensors(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 639 | `    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 640 | `    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 641 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 642 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 643 | `  const filtered = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 644 | `    let r = taskView.filter((t) => t.status !== "done" && !t.completed_at);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 645 | `    r = applyTaskFilters(r, filters, {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 646 | `      userId: user?.id ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 647 | `      subtaskAssigneeTaskIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 648 | `      collaboratorTaskIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 649 | `      subtaskAssigneeTaskIdsByUser,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 650 | `      subtaskDateFilterTaskIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 651 | `      restrictToCurrentUserParticipation: isCollaborator,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 652 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 653 | `    return r;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 654 | `  }, [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 655 | `    taskView,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 656 | `    activeWorkspace?.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 657 | `    filters,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 658 | `    user?.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 659 | `    subtaskAssigneeTaskIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 660 | `    collaboratorTaskIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 661 | `    subtaskAssigneeTaskIdsByUser,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 662 | `    subtaskDateFilterTaskIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 663 | `    isCollaborator,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 664 | `  ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 665 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 666 | `  const sortedTasks = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 667 | `    const r = [...filtered];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 668 | `    r.sort((a, b) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 669 | `      // Na ordenação padrão, tarefas recebidas de outro usuário vêm primeiro,` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 670 | `      // sempre da maior prioridade para a menor.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 671 | `      if (sort.field === "position" && sort.direction === "asc" && user?.id) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 672 | `        const wasAssignedToCurrentUser = (task: Task) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 673 | `          task.assignee_id === user.id && !!task.assigned_by && task.assigned_by !== user.id;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 674 | `        const aWasAssigned = wasAssignedToCurrentUser(a);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 675 | `        const bWasAssigned = wasAssignedToCurrentUser(b);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 676 | `        if (aWasAssigned !== bWasAssigned) return aWasAssigned ? -1 : 1;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 677 | `        if (aWasAssigned && bWasAssigned) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 678 | `          const priorityOrder: Record<string, number> = { low: 1, medium: 2, high: 3, urgent: 4 };` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 679 | `          const priorityComparison =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 680 | `            (priorityOrder[b.priority ?? ""] || 0) - (priorityOrder[a.priority ?? ""] || 0);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 681 | `          if (priorityComparison !== 0) return priorityComparison;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 682 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 683 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 684 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 685 | `      let cmp = 0;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 686 | `      switch (sort.field) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 687 | `        case "due_date": {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 688 | `          if (!a.due_date && !b.due_date) cmp = 0;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 689 | `          else if (!a.due_date) cmp = 1;` | Define o caminho alternativo da condicao anterior. |
| 690 | `          else if (!b.due_date) cmp = -1;` | Define o caminho alternativo da condicao anterior. |
| 691 | `          else cmp = new Date(a.due_date).getTime() - new Date(b.due_date).getTime();` | Define o caminho alternativo da condicao anterior. |
| 692 | `          break;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 693 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 694 | `        case "created_at": {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 695 | `          cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 696 | `          break;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 697 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 698 | `        case "tag": {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 699 | `          cmp = (tagNameForTask.get(a.id) ?? "").localeCompare(tagNameForTask.get(b.id) ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 700 | `          break;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 701 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 702 | `        case "priority": {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 703 | `          const order: Record<string, number> = { low: 1, medium: 2, high: 3, urgent: 4 };` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 704 | `          cmp = (order[a.priority ?? ""] || 0) - (order[b.priority ?? ""] || 0);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 705 | `          break;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 706 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 707 | `        case "status": {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 708 | `          const sa = statuses.find((s) => s.id === a.status_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 709 | `          const sb = statuses.find((s) => s.id === b.status_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 710 | `          const ap = sa ? sa.position : 9999;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 711 | `          const bp = sb ? sb.position : 9999;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 712 | `          cmp = ap - bp;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 713 | `          break;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 714 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 715 | `        case "position":` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 716 | `        default: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 717 | `          const ap = userTaskPos.has(a.id)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 718 | `            ? (userTaskPos.get(a.id) as number)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 719 | `            : (a.position ?? 0) + 100000;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 720 | `          const bp = userTaskPos.has(b.id)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 721 | `            ? (userTaskPos.get(b.id) as number)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 722 | `            : (b.position ?? 0) + 100000;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 723 | `          cmp = ap - bp;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 724 | `          break;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 725 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 726 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 727 | `      if (cmp === 0) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 728 | `        const ap = userTaskPos.has(a.id)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 729 | `          ? (userTaskPos.get(a.id) as number)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 730 | `          : (a.position ?? 0) + 100000;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 731 | `        const bp = userTaskPos.has(b.id)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 732 | `          ? (userTaskPos.get(b.id) as number)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 733 | `          : (b.position ?? 0) + 100000;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 734 | `        cmp = ap - bp;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 735 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 736 | `      return sort.direction === "asc" ? cmp : -cmp;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 737 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 738 | `    return r;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 739 | `  }, [filtered, sort, tagNameForTask, userTaskPos, statuses, user?.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 740 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 741 | `  // Tarefas que você lançou para o outro ambiente entram no quadro junto das` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 742 | `  // demais. Elas caem na primeira coluna, porque a coluna real delas pertence` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 743 | `  // ao outro quadro — por isso ficam sem arrastar.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 744 | `  const sharedTaskIds = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 745 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 746 | `      new Set(splitTasksByWorkspace(taskView, activeWorkspace?.id).shared.map((task) => task.id)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 747 | `    [taskView, activeWorkspace?.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 748 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 749 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 750 | `  const tasksByCol = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 751 | `    const map = new Map<string, Task[]>();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 752 | `    columns.forEach((c) => map.set(c.id, []));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 753 | `    const firstColId = columns[0]?.id;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 754 | `    sortedTasks.forEach((t) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 755 | `      if (t.column_id && map.has(t.column_id)) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 756 | `        map.get(t.column_id)!.push(t);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 757 | `        return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 758 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 759 | `      if (firstColId && map.has(firstColId)) map.get(firstColId)!.push(t);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 760 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 761 | `    return map;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 762 | `  }, [sortedTasks, columns]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 763 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 764 | `  const columnIds = useMemo(() => columns.map((c) => \`col:${c.id}\`), [columns]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 765 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 766 | `  const collisionDetectionStrategy: CollisionDetection = (args) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 767 | `    const activeType = args.active.data.current?.type;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 768 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 769 | `    if (activeType === "column") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 770 | `      return closestCenter({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 771 | `        ...args,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 772 | `        droppableContainers: args.droppableContainers.filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 773 | `          (container) => container.data.current?.type === "column",` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 774 | `        ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 775 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 776 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 777 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 778 | `    const pointerIntersections = pointerWithin(args);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 779 | `    const intersections =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 780 | `      pointerIntersections.length > 0 ? pointerIntersections : rectIntersection(args);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 781 | `    const overId = getFirstCollision(intersections, "id");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 782 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 783 | `    if (overId) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 784 | `      const matchedColumn = columns.find(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 785 | `        (column) => \`drop:${column.id}\` === overId || \`col:${column.id}\` === overId,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 786 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 787 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 788 | `      if (matchedColumn) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 789 | `        const taskIds = (tasksByCol.get(matchedColumn.id) ?? []).map((task) => task.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 790 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 791 | `        if (taskIds.length > 0) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 792 | `          const taskCollisions = closestCenter({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 793 | `            ...args,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 794 | `            droppableContainers: args.droppableContainers.filter((container) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 795 | `              taskIds.includes(String(container.id)),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 796 | `            ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 797 | `          });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 798 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 799 | `          if (taskCollisions.length > 0) return taskCollisions;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 800 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 801 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 802 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 803 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 804 | `    if (intersections.length > 0) return intersections;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 805 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 806 | `    return closestCenter({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 807 | `      ...args,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 808 | `      droppableContainers: args.droppableContainers.filter((container) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 809 | `        const type = container.data.current?.type;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 810 | `        return type === "task" || type === "column-drop" || type === "column";` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 811 | `      }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 812 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 813 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 814 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 815 | `  const onDragEnd = async (e: DragEndEvent) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 816 | `    setActiveTask(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 817 | `    const activeType = e.active.data.current?.type;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 818 | `    if (!e.over) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 819 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 820 | `    if (activeType === "column") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 821 | `      if (!isAdmin) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 822 | `        toast.error("Apenas administradores podem reordenar as colunas");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 823 | `        return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 824 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 825 | `      const overType = e.over.data.current?.type;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 826 | `      if (overType !== "column") return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 827 | `      const oldIndex = columns.findIndex((c) => \`col:${c.id}\` === e.active.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 828 | `      const newIndex = columns.findIndex((c) => \`col:${c.id}\` === e.over!.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 829 | `      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 830 | `      if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 831 | `      const next = arrayMove(columns, oldIndex, newIndex);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 832 | `      // Optimistic local order: refresh user_column_order cache so columns memo recomputes` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 833 | `      qc.setQueryData(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 834 | `        ["user_column_order"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 835 | `        next.map((c, i) => ({ column_id: c.id, position: i })),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 836 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 837 | `      // Persist per-user ordering only (does NOT affect other users)` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 838 | `      const rows = next.map((c, i) => ({ user_id: user.id, column_id: c.id, position: i }));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 839 | `      const { error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 840 | `        .from("user_column_order")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 841 | `        .upsert(rows, { onConflict: "user_id,column_id" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 842 | `      if (error) toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 843 | `      qc.invalidateQueries({ queryKey: ["user_column_order"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 844 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 845 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 846 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 847 | `    // task drag` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 848 | `    const taskId = e.active.id as string;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 849 | `    const overData = e.over.data.current as any;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 850 | `    const overId = e.over.id as string;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 851 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 852 | `    const task = taskView.find((t) => t.id === taskId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 853 | `    if (!task) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 854 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 855 | `    let targetCol: string | null = null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 856 | `    let targetIndex = -1;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 857 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 858 | `    if (overData?.type === "task") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 859 | `      targetCol = overData.colId as string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 860 | `      const colTasks = tasksByCol.get(targetCol) ?? [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 861 | `      targetIndex = colTasks.findIndex((t) => t.id === overId);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 862 | `    } else if (overData?.type === "column-drop") {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 863 | `      targetCol = overData.colId as string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 864 | `      const colTasks = tasksByCol.get(targetCol) ?? [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 865 | `      targetIndex = colTasks.length;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 866 | `    } else if (overData?.type === "column") {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 867 | `      // Hit the column header/sortable wrapper — treat as drop at end of that column` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 868 | `      targetCol = overData.colId as string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 869 | `      const colTasks = tasksByCol.get(targetCol) ?? [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 870 | `      targetIndex = colTasks.length;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 871 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 872 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 873 | `    if (!targetCol) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 874 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 875 | `    const wasCompleted = !!task.completed_at || task.status === "done";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 876 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 877 | `    // Drop into the "Concluídas" lane` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 878 | `    if (targetCol === COMPLETED_COL_ID) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 879 | `      if (wasCompleted) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 880 | `      if (openSubtaskTaskIds.has(task.id)) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 881 | `        toast.error("Conclua todas as subtarefas antes de concluir a tarefa.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 882 | `        return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 883 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 884 | `      const patch: Partial<Task> = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 885 | `        status: "done",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 886 | `        completed_at: new Date().toISOString(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 887 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 888 | `      if (completedStatus?.id) patch.status_id = completedStatus.id;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 889 | `      qc.setQueryData<Task[]>(["tasks"], (curr = []) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 890 | `        curr.map((t) => (t.id === taskId ? ({ ...t, ...patch } as Task) : t)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 891 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 892 | `      const { error } = await supabase.from("tasks").update(patch).eq("id", taskId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 893 | `      if (error) toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 894 | `      qc.invalidateQueries({ queryKey: ["tasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 895 | `      toast.success("Tarefa concluída");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 896 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 897 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 898 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 899 | `    // Drag out of "Concluídas" back into a normal column → restore` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 900 | `    if (wasCompleted) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 901 | `      const patch: Partial<Task> = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 902 | `        status: "todo",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 903 | `        completed_at: null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 904 | `        column_id: targetCol,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 905 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 906 | `      if (fallbackStatus?.id) patch.status_id = fallbackStatus.id;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 907 | `      else patch.status_id = null;` | Define o caminho alternativo da condicao anterior. |
| 908 | `      qc.setQueryData<Task[]>(["tasks"], (curr = []) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 909 | `        curr.map((t) => (t.id === taskId ? ({ ...t, ...patch } as Task) : t)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 910 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 911 | `      const { error } = await supabase.from("tasks").update(patch).eq("id", taskId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 912 | `      if (error) toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 913 | `      qc.invalidateQueries({ queryKey: ["tasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 914 | `      toast.success("Tarefa restaurada");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 915 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 916 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 917 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 918 | `    const sourceCol = task.column_id;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 919 | `    const sourceList = sourceCol ? (tasksByCol.get(sourceCol) ?? []) : [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 920 | `    const targetList = tasksByCol.get(targetCol) ?? [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 921 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 922 | `    let nextTargetList: Task[];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 923 | `    if (sourceCol === targetCol) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 924 | `      const oldIdx = sourceList.findIndex((t) => t.id === taskId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 925 | `      if (oldIdx === -1 || oldIdx === targetIndex) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 926 | `      nextTargetList = arrayMove(sourceList, oldIdx, targetIndex);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 927 | `    } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 928 | `      nextTargetList = [...targetList];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 929 | `      const insertAt = targetIndex === -1 ? nextTargetList.length : targetIndex;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 930 | `      nextTargetList.splice(insertAt, 0, { ...task, column_id: targetCol });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 931 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 932 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 933 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 934 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 935 | `    // Optimistic local: update task.column_id if it changed` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 936 | `    if (sourceCol !== targetCol) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 937 | `      qc.setQueryData<Task[]>(["tasks"], (curr = []) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 938 | `        curr.map((t) => (t.id === taskId ? ({ ...t, column_id: targetCol! } as Task) : t)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 939 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 940 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 941 | `    // Optimistic per-user ordering for the target column` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 942 | `    qc.setQueryData<{ task_id: string; position: number }[]>(["user_task_order"], (curr = []) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 943 | `      const filteredOrder = curr.filter((u) => !nextTargetList.some((t) => t.id === u.task_id));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 944 | `      const newOrders = nextTargetList.map((t, i) => ({ task_id: t.id, position: i }));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 945 | `      return [...filteredOrder, ...newOrders];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 946 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 947 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 948 | `    // Persist: column change is GLOBAL; ordering is PER-USER` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 949 | `    if (sourceCol !== targetCol) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 950 | `      const persistedTask = tasks.find((item) => item.id === taskId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 951 | `      const reopenParent =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 952 | `        openSubtaskTaskIds.has(taskId) &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 953 | `        (persistedTask?.status === "done" || !!persistedTask?.completed_at);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 954 | `      const { error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 955 | `        .from("tasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 956 | `        .update({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 957 | `          column_id: targetCol,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 958 | `          ...(reopenParent` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 959 | `            ? { status: "todo", completed_at: null, status_id: fallbackStatus?.id ?? null }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 960 | `            : {}),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 961 | `        })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 962 | `        .eq("id", taskId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 963 | `      if (error) toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 964 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 965 | `    const rows = nextTargetList.map((t, i) => ({ user_id: user.id, task_id: t.id, position: i }));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 966 | `    const { error: ordErr } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 967 | `      .from("user_task_order")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 968 | `      .upsert(rows, { onConflict: "user_id,task_id" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 969 | `    if (ordErr) toast.error(ordErr.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 970 | `    qc.invalidateQueries({ queryKey: ["tasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 971 | `    qc.invalidateQueries({ queryKey: ["user_task_order"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 972 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 973 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 974 | `  const addColumn = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 975 | `    if (!isAdmin) return toast.error("Apenas administradores podem criar colunas");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 976 | `    setColumnEditor({ open: true, id: null, name: "", color: "#1e3a8a" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 977 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 978 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 979 | `  const renameColumn = (col: KanbanColumn) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 980 | `    setColumnEditor({ open: true, id: col.id, name: col.name, color: col.color || "#1e3a8a" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 981 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 982 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 983 | `  const saveColumn = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 984 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 985 | `    const name = columnEditor.name.trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 986 | `    if (!name) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 987 | `      toast.error("Informe um nome");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 988 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 989 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 990 | `    const color = /^#[0-9a-fA-F]{6}$/.test(columnEditor.color) ? columnEditor.color : "#1e3a8a";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 991 | `    if (columnEditor.id) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 992 | `      const { error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 993 | `        .from("kanban_columns")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 994 | `        .update({ name, color })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 995 | `        .eq("id", columnEditor.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 996 | `      if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 997 | `    } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 998 | `      const { error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 999 | `        .from("kanban_columns")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1000 | `        .insert({ name, color, position: columns.length, created_by: user.id });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1001 | `      if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1002 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1003 | `    setColumnEditor({ open: false, id: null, name: "", color: "#1e3a8a" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1004 | `    qc.invalidateQueries({ queryKey: ["columns"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1005 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1006 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1007 | `  const deleteColumn = async (col: KanbanColumn) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1008 | `    if (!confirm(\`Excluir coluna "${col.name}"? As tarefas ficarão sem coluna.\`)) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1009 | `    const { error } = await supabase.from("kanban_columns").delete().eq("id", col.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1010 | `    if (error) toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1011 | `    qc.invalidateQueries({ queryKey: ["columns"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1012 | `    qc.invalidateQueries({ queryKey: ["tasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1013 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1014 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1015 | `  const duplicateTask = async (task: Task, dueDate: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1016 | `    if (!user || !dueDate) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1017 | `    setDuplicatingTask(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1018 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 1019 | `      await duplicateTaskWithContents(task, dueDate, user.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 1020 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1021 | `      qc.invalidateQueries({ queryKey: ["tasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1022 | `      setDuplicateTaskTarget(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1023 | `      setDuplicateDueDate("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1024 | `      toast.success("Tarefa duplicada");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1025 | `    } catch (e) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1026 | `      toast.error((e as Error).message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1027 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1028 | `      setDuplicatingTask(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1029 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1030 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1031 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1032 | `  const exportPdf = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1033 | `    setExportingPdf(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1034 | `    const esc = (s: string) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1035 | `      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1036 | `    const prioLabel: Record<string, string> = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1037 | `      low: "Baixa",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1038 | `      medium: "Média",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1039 | `      high: "Alta",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1040 | `      urgent: "Urgente",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1041 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1042 | `    const prioColor: Record<string, string> = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1043 | `      low: "#64748b",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1044 | `      medium: "#2563eb",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1045 | `      high: "#f59e0b",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1046 | `      urgent: "#dc2626",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1047 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1048 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1049 | `    const tagsByTask = new Map<string, { name: string; color: string }[]>();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1050 | `    tagLinks.forEach((l) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1051 | `      const tag = tags.find((t) => t.id === l.tag_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1052 | `      if (!tag) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1053 | `      if (!tagsByTask.has(l.task_id)) tagsByTask.set(l.task_id, []);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1054 | `      tagsByTask.get(l.task_id)!.push({ name: tag.name, color: tag.color });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1055 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1056 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1057 | `    const renderTask = (t: Task) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1058 | `      const client = clients.find((c) => c.id === t.client_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1059 | `      const assignee = profiles.find((p) => p.id === t.assignee_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1060 | `      const taskTags = tagsByTask.get(t.id) ?? [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1061 | `      const due = t.due_date ? format(new Date(t.due_date), "dd/MM/yyyy") : "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1062 | `      return \`` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1063 | `        <div class="task" style="border-left:4px solid ${t.color || "#1e3a8a"}">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1064 | `          <div class="task-title">${esc(t.title)}</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1065 | `          ${t.description ? \`<div class="task-desc">${esc(t.description)}</div>\` : ""}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1066 | `          <div class="task-meta">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1067 | `            <span class="prio" style="background:${prioColor[t.priority ?? "medium"]}">${prioLabel[t.priority ?? "medium"]}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1068 | `            ${due ? \`<span class="meta-item">📅 ${due}</span>\` : ""}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1069 | `            ${client ? \`<span class="meta-item">🏢 ${esc(client.name)}</span>\` : ""}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1070 | `            ${assignee ? \`<span class="meta-item">👤 ${esc(assignee.full_name || assignee.email || "")}</span>\` : ""}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1071 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1072 | `          ${` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1073 | `            taskTags.length` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1074 | `              ? \`<div class="tags">${taskTags` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1075 | `                  .map(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1076 | `                    (tg) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1077 | `                      \`<span class="tag" style="background:${tg.color}20;color:${tg.color};border-color:${tg.color}55">${esc(tg.name)}</span>\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1078 | `                  )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1079 | `                  .join("")}</div>\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1080 | `              : ""` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1081 | `          }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1082 | `        </div>\`;` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1083 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1084 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1085 | `    const renderCol = (name: string, color: string, items: Task[]) => \`` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1086 | `      <section class="col">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1087 | `        <h2 style="border-color:${color}"><span class="dot" style="background:${color}"></span>${esc(name)} <span class="count">${items.length}</span></h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1088 | `        <div class="col-body">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1089 | `          ${items.length === 0 ? '<div class="empty">Nenhuma tarefa</div>' : items.map(renderTask).join("")}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1090 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1091 | `      </section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1092 | `    \`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1093 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1094 | `    const colsHtml = columns` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1095 | `      .map((c) => renderCol(c.name, c.color || "#1e3a8a", tasksByCol.get(c.id) ?? []))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1096 | `      .join("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1097 | `    const completedLabel =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1098 | `      completedRange.start || completedRange.end` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1099 | `        ? "Concluídas no período"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1100 | `        : filters.date === "completed"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1101 | `          ? "Concluídas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1102 | `          : filters.date === "this_month"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1103 | `            ? "Concluídas no mês"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1104 | `            : "Concluídas hoje";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1105 | `    const completedHtml = renderCol(completedLabel, "#10b981", completedTasks);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1106 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1107 | `    const html = \`<style>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1108 | `  *{box-sizing:border-box}` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 1109 | `  .kanban-pdf-root{width:1800px;font-family:Arial,Helvetica,sans-serif;padding:28px;color:#0f172a;background:#fff}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1110 | `  .kanban-pdf-root header{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #0f172a;padding-bottom:8px;margin-bottom:16px}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1111 | `  .kanban-pdf-root header h1{margin:0;font-size:22px}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1112 | `  .kanban-pdf-root header .meta{font-size:12px;color:#64748b}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1113 | `  .board{display:flex;flex-direction:column;gap:14px}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1114 | `  .col{border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;break-inside:avoid;padding:10px}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1115 | `  .col h2{font-size:14px;margin:0 0 8px;padding-bottom:6px;border-bottom:2px solid #cbd5e1;display:flex;align-items:center;gap:6px}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1116 | `  .col .dot{width:10px;height:10px;border-radius:999px;display:inline-block}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1117 | `  .col .count{margin-left:auto;font-size:11px;background:#e2e8f0;padding:2px 8px;border-radius:999px;color:#475569}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1118 | `  .col-body{display:flex;align-items:flex-start;flex-wrap:wrap;gap:8px;min-height:70px}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1119 | `  .task{width:260px;flex:0 0 260px;background:#fff;border:1px solid #e2e8f0;border-radius:6px;padding:8px;font-size:12px;break-inside:avoid}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1120 | `  .task-title{font-weight:600;font-size:13px;margin-bottom:4px}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1121 | `  .task-desc{color:#475569;font-size:11px;margin-bottom:6px;white-space:pre-wrap}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1122 | `  .task-meta{display:flex;flex-wrap:wrap;gap:4px;font-size:10px;color:#475569}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1123 | `  .meta-item{background:#f1f5f9;padding:2px 6px;border-radius:4px}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1124 | `  .prio{color:#fff;padding:2px 6px;border-radius:4px;font-weight:600}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1125 | `  .tags{margin-top:6px;display:flex;flex-wrap:wrap;gap:4px}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1126 | `  .tag{padding:1px 6px;border-radius:999px;font-size:10px;border:1px solid}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1127 | `  .empty{color:#94a3b8;font-size:11px;font-style:italic;text-align:center;padding:12px 0}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1128 | `</style>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1129 | `<div class="kanban-pdf-root">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1130 | `  <header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1131 | `    <h1>Relatório Kanban</h1>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1132 | `    <div class="meta">${format(new Date(), "dd/MM/yyyy 'às' HH:mm")}</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1133 | `  </header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1134 | `  <div class="board">${colsHtml}${completedHtml}</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1135 | `  </div>\`;` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1136 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1137 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 1138 | `      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1139 | `        import("html2canvas"),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1140 | `        import("jspdf"),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1141 | `      ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1142 | `      const wrapper = document.createElement("div");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1143 | `      wrapper.style.position = "fixed";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1144 | `      wrapper.style.left = "-10000px";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1145 | `      wrapper.style.top = "0";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1146 | `      wrapper.innerHTML = html;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1147 | `      document.body.appendChild(wrapper);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1148 | `      const target = wrapper.querySelector(".kanban-pdf-root") as HTMLElement;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1149 | `      const canvas = await html2canvas(target, {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1150 | `        backgroundColor: "#ffffff",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1151 | `        scale: 2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1152 | `        logging: false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1153 | `        useCORS: true,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1154 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1155 | `      wrapper.remove();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1156 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1157 | `      const pdf = new jsPDF("landscape", "mm", "a4");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1158 | `      const pageWidth = pdf.internal.pageSize.getWidth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1159 | `      const pageHeight = pdf.internal.pageSize.getHeight();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1160 | `      const margin = 8;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1161 | `      const imgWidth = pageWidth - margin * 2;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1162 | `      const imgHeight = (canvas.height * imgWidth) / canvas.width;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1163 | `      const imgData = canvas.toDataURL("image/png");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1164 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1165 | `      let y = margin;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1166 | `      let heightLeft = imgHeight;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1167 | `      pdf.addImage(imgData, "PNG", margin, y, imgWidth, imgHeight);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1168 | `      heightLeft -= pageHeight - margin * 2;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1169 | `      while (heightLeft > 0) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 1170 | `        pdf.addPage();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1171 | `        y = margin - (imgHeight - heightLeft);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1172 | `        pdf.addImage(imgData, "PNG", margin, y, imgWidth, imgHeight);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1173 | `        heightLeft -= pageHeight - margin * 2;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1174 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1175 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1176 | `      pdf.save(\`relatorio-kanban-${format(new Date(), "yyyy-MM-dd-HHmm")}.pdf\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1177 | `      toast.success("PDF gerado");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1178 | `    } catch (e) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1179 | `      toast.error((e as Error).message || "Não foi possível gerar o PDF");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1180 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1181 | `      setExportingPdf(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1182 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1183 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1184 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1185 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1186 | `    <div className="flex h-full min-h-0 flex-col">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1187 | `      <header className="shrink-0 border-b bg-background px-3 py-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1188 | `        <div className="flex items-center justify-end gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1189 | `          <div className="flex flex-wrap gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1190 | `            <Button variant="outline" className="rounded-full" onClick={() => setFilesOpen(true)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1191 | `              <FolderOpen className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1192 | `              Arquivos Cliente` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1193 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1194 | `            <Button variant="outline" className="rounded-full" onClick={() => setTagsOpen(true)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1195 | `              Etiquetas` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1196 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1197 | `            {isAdmin && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1198 | `              <Button variant="outline" className="rounded-full" onClick={addColumn}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1199 | `                <Plus className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1200 | `                Coluna` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1201 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1202 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1203 | `            <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1204 | `              className="h-9 rounded-full px-5 shadow-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1205 | `              onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1206 | `                setEditTask(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1207 | `                setDefaultCol(columns[0]?.id ?? null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1208 | `                setDialogOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1209 | `              }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1210 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1211 | `              <Plus className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1212 | `              Tarefa` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1213 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1214 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1215 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1216 | `        <div className="mt-2 space-y-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1217 | `          <TaskFilters filters={filters} onChange={setFilters} hideAssignee={isCollaborator}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1218 | `            <div className="flex flex-wrap items-center justify-end gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1219 | `              <WorkspaceTaskFilter` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1220 | `                value={filters.workspace}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1221 | `                onChange={(workspace) => setFilters({ ...filters, workspace })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1222 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1223 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1224 | `                size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1225 | `                variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1226 | `                className="h-7 gap-1 rounded-full"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1227 | `                onClick={switchOrientation}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1228 | `                disabled={updatePrefs.isPending}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1229 | `                title={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1230 | `                  orientation === "horizontal" ? "Mudar para vertical" : "Mudar para horizontal"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1231 | `                }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1232 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1233 | `                {orientation === "horizontal" ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1234 | `                  <Rows className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1235 | `                ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1236 | `                  <Columns className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1237 | `                )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1238 | `                {orientation === "horizontal" ? "Vertical" : "Horizontal"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1239 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1240 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1241 | `                size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1242 | `                variant={minimalCards ? "default" : "outline"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1243 | `                className="h-7 gap-1 rounded-full"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1244 | `                onClick={toggleMinimalCards}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1245 | `                title={minimalCards ? "Exibir cards completos" : "Exibir cards minimalistas"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1246 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1247 | `                {minimalCards ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1248 | `                  <PanelsTopLeft className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1249 | `                ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1250 | `                  <PanelTop className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1251 | `                )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1252 | `                {minimalCards ? "Completo" : "Minimalista"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1253 | `              </Button>{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1254 | `              <CardFieldsPopover />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1255 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1256 | `            <div className="mr-3 inline-flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1257 | `              <span className="font-medium text-foreground">Concluídas no período</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1258 | `              <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1259 | `                type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1260 | `                value={completedRange.start}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1261 | `                onChange={(e) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1262 | `                  setCompletedRange((range) => ({ ...range, start: e.target.value }))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1263 | `                }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1264 | `                className="h-7 w-36 rounded-full"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1265 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1266 | `              <span>até</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1267 | `              <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1268 | `                type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1269 | `                value={completedRange.end}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1270 | `                onChange={(e) => setCompletedRange((range) => ({ ...range, end: e.target.value }))}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1271 | `                className="h-7 w-36 rounded-full"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1272 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1273 | `              {completedRange.start || completedRange.end ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1274 | `                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1275 | `                  variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1276 | `                  size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1277 | `                  className="h-7"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1278 | `                  onClick={() => setCompletedRange({ start: "", end: "" })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1279 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1280 | `                  Limpar período` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1281 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1282 | `              ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1283 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1284 | `            <div className="inline-flex items-center gap-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1285 | `              <span className="text-xs font-medium text-muted-foreground">Ordenar por</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1286 | `              <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1287 | `                value={sort.field}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1288 | `                onValueChange={(v) => setSort((s) => ({ ...s, field: v as SortField }))}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1289 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1290 | `                <SelectTrigger className="h-7 w-40 rounded-full">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1291 | `                  <SelectValue placeholder="Escolher critério" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1292 | `                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1293 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1294 | `                  <SelectItem value="due_date">Prazo</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1295 | `                  <SelectItem value="priority">Prioridade</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1296 | `                  <SelectItem value="created_at">Data de criação</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1297 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1298 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1299 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1300 | `                variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1301 | `                size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1302 | `                className="h-7 rounded-full"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1303 | `                onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1304 | `                  setSort((s) => ({ ...s, direction: s.direction === "asc" ? "desc" : "asc" }))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1305 | `                }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1306 | `                title={sort.direction === "asc" ? "Ordem crescente" : "Ordem decrescente"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1307 | `                aria-label={sort.direction === "asc" ? "Ordem crescente" : "Ordem decrescente"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1308 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1309 | `                {sort.direction === "asc" ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1310 | `                  <ArrowUp className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1311 | `                ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1312 | `                  <ArrowDown className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1313 | `                )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1314 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1315 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1316 | `          </TaskFilters>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1317 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1318 | `      </header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1319 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1320 | `      <KanbanScrollArea orientation={orientation}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1321 | `        <DndContext` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1322 | `          key={orientation}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1323 | `          sensors={sensors}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1324 | `          collisionDetection={collisionDetectionStrategy}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1325 | `          autoScroll={{ layoutShiftCompensation: false, threshold: { x: 0.15, y: 0.15 } }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1326 | `          onDragStart={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1327 | `            if (e.active.data.current?.type === "task") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1328 | `              setActiveTask(tasks.find((t) => t.id === e.active.id) ?? null);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1329 | `            }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1330 | `          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1331 | `          onDragEnd={onDragEnd}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1332 | `          onDragCancel={() => setActiveTask(null)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1333 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1334 | `          <SortableContext` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1335 | `            items={columnIds}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1336 | `            strategy={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1337 | `              orientation === "horizontal"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1338 | `                ? horizontalListSortingStrategy` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1339 | `                : verticalListSortingStrategy` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1340 | `            }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1341 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1342 | `            <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1343 | `              className={` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1344 | `                orientation === "horizontal"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1345 | `                  ? "flex flex-row items-start gap-4"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1346 | `                  : "flex flex-col gap-4"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1347 | `              }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1348 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1349 | `              {columns.map((col) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1350 | `                const colTasks = tasksByCol.get(col.id) ?? [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1351 | `                return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1352 | `                  <SortableColumn` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1353 | `                    key={col.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1354 | `                    col={col}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1355 | `                    orientation={orientation}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1356 | `                    minimal={minimalCards}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1357 | `                    taskIds={colTasks.map((t) => t.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1358 | `                    count={colTasks.length}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1359 | `                    onAdd={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1360 | `                      setEditTask(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1361 | `                      setDefaultCol(col.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1362 | `                      setDialogOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1363 | `                    }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1364 | `                    onEdit={() => renameColumn(col)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1365 | `                    onDelete={() => deleteColumn(col)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1366 | `                    canManage={isAdmin}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1367 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1368 | `                    {colTasks.map((t) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1369 | `                      <SortableTaskCard` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1370 | `                        key={t.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1371 | `                        task={t}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1372 | `                        orientation={orientation}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1373 | `                        disabled={sharedTaskIds.has(t.id)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1374 | `                        clients={clients}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1375 | `                        profiles={profiles}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1376 | `                        columns={columns}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1377 | `                        tags={tags}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1378 | `                        statuses={statuses}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1379 | `                        collaborators={collaborators}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1380 | `                        minimal={minimalCards}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1381 | `                        onEdit={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1382 | `                          setEditTask(t);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1383 | `                          setDialogOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1384 | `                        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1385 | `                        onDuplicate={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1386 | `                          setDuplicateTaskTarget(t);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1387 | `                          setDuplicateDueDate("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1388 | `                        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1389 | `                      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1390 | `                    ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1391 | `                  </SortableColumn>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1392 | `                );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1393 | `              })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1394 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1395 | `              <CompletedColumn` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1396 | `                count={completedTasks.length}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1397 | `                orientation={orientation}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1398 | `                minimal={minimalCards}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1399 | `                open={completedOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1400 | `                onOpenChange={() => setCompletedOpen((current) => !current)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1401 | `                taskIds={completedTasks.map((t) => t.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1402 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1403 | `                {completedTasks.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1404 | `                  <div className="flex w-full items-center justify-center text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1405 | `                    Nenhuma tarefa concluída ainda.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1406 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1407 | `                ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1408 | `                  completedTasks.map((t) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1409 | `                    <SortableTaskCard` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1410 | `                      key={t.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1411 | `                      task={t}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1412 | `                      colId={COMPLETED_COL_ID}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1413 | `                      orientation={orientation}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1414 | `                      clients={clients}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1415 | `                      profiles={profiles}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1416 | `                      columns={columns}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1417 | `                      tags={tags}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1418 | `                      statuses={statuses}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1419 | `                      collaborators={collaborators}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1420 | `                      minimal={minimalCards}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1421 | `                      onEdit={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1422 | `                        setEditTask(t);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1423 | `                        setDialogOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1424 | `                      }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1425 | `                      onDuplicate={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1426 | `                        setDuplicateTaskTarget(t);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1427 | `                        setDuplicateDueDate("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1428 | `                      }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1429 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1430 | `                  ))` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1431 | `                )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1432 | `              </CompletedColumn>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1433 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1434 | `          </SortableContext>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1435 | `          <DragOverlay>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1436 | `            {activeTask && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1437 | `              <div className="rotate-2 opacity-90">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1438 | `                <TaskCard` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1439 | `                  task={activeTask}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1440 | `                  clients={clients}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1441 | `                  profiles={profiles}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1442 | `                  columns={columns}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1443 | `                  tags={tags}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1444 | `                  statuses={statuses}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1445 | `                  collaborators={collaborators}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1446 | `                  minimal={minimalCards}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1447 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1448 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1449 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1450 | `          </DragOverlay>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1451 | `        </DndContext>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1452 | `      </KanbanScrollArea>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1453 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1454 | `      <TaskDialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1455 | `        open={dialogOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1456 | `        onOpenChange={setDialogOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1457 | `        task={editTask}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1458 | `        defaultColumnId={defaultCol}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1459 | `      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1460 | `      <Dialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1461 | `        open={!!duplicateTaskTarget}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1462 | `        onOpenChange={(open) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1463 | `          if (!open && !duplicatingTask) setDuplicateTaskTarget(null);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1464 | `        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1465 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1466 | `        <DialogContent className="max-w-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1467 | `          <DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1468 | `            <DialogTitle>Duplicar tarefa</DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1469 | `          </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1470 | `          <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1471 | `            <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1472 | `              Defina o novo prazo para a cópia de “{duplicateTaskTarget?.title}”.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1473 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1474 | `            <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1475 | `              type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1476 | `              value={duplicateDueDate}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1477 | `              onChange={(event) => setDuplicateDueDate(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1478 | `              required` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1479 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1480 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1481 | `          <DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1482 | `            <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1483 | `              variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1484 | `              disabled={duplicatingTask}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1485 | `              onClick={() => setDuplicateTaskTarget(null)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1486 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1487 | `              Cancelar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1488 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1489 | `            <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1490 | `              disabled={!duplicateDueDate || duplicatingTask}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1491 | `              onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1492 | `                duplicateTaskTarget && void duplicateTask(duplicateTaskTarget, duplicateDueDate)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1493 | `              }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1494 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1495 | `              {duplicatingTask ? "Duplicando…" : "Duplicar"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1496 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1497 | `          </DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1498 | `        </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1499 | `      </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1500 | `      <TagManagerDialog open={tagsOpen} onOpenChange={setTagsOpen} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1501 | `      <ClientFilesSheet open={filesOpen} onOpenChange={setFilesOpen} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1502 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1503 | `      <Dialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1504 | `        open={columnEditor.open}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1505 | `        onOpenChange={(o) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1506 | `          if (!o) setColumnEditor((c) => ({ ...c, open: false }));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1507 | `        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1508 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1509 | `        <DialogContent className="max-w-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1510 | `          <DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1511 | `            <DialogTitle>{columnEditor.id ? "Editar coluna" : "Nova coluna"}</DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1512 | `          </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1513 | `          <div className="space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1514 | `            <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1515 | `              <label className="mb-1 block text-xs font-medium text-muted-foreground">Nome</label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1516 | `              <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1517 | `                value={columnEditor.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1518 | `                onChange={(e) => setColumnEditor((c) => ({ ...c, name: e.target.value }))}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1519 | `                placeholder="Ex.: Em revisão"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1520 | `                autoFocus` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1521 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1522 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1523 | `            <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1524 | `              <label className="mb-1 block text-xs font-medium text-muted-foreground">Cor</label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1525 | `              <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1526 | `                <input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1527 | `                  type="color"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1528 | `                  value={columnEditor.color}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1529 | `                  onChange={(e) => setColumnEditor((c) => ({ ...c, color: e.target.value }))}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1530 | `                  className="h-9 w-14 cursor-pointer rounded border bg-transparent"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1531 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1532 | `                <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1533 | `                  value={columnEditor.color}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1534 | `                  onChange={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1535 | `                    const v = e.target.value;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1536 | `                    if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setColumnEditor((c) => ({ ...c, color: v }));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1537 | `                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1538 | `                  className="flex-1"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1539 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1540 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1541 | `              <div className="mt-2 flex flex-wrap gap-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1542 | `                {[` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1543 | `                  "#1e3a8a",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1544 | `                  "#0ea5e9",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1545 | `                  "#10b981",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1546 | `                  "#f59e0b",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1547 | `                  "#ef4444",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1548 | `                  "#a855f7",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1549 | `                  "#ec4899",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1550 | `                  "#64748b",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1551 | `                ].map((c) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1552 | `                  <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1553 | `                    key={c}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1554 | `                    type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1555 | `                    onClick={() => setColumnEditor((cur) => ({ ...cur, color: c }))}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1556 | `                    className="h-6 w-6 rounded-full border border-border shadow-sm transition hover:scale-110"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1557 | `                    style={{ background: c }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1558 | `                    title={c}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1559 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1560 | `                ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1561 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1562 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1563 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1564 | `          <DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1565 | `            <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1566 | `              variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1567 | `              onClick={() => setColumnEditor((c) => ({ ...c, open: false }))}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1568 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1569 | `              Cancelar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1570 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1571 | `            <Button onClick={() => void saveColumn()}>Salvar</Button>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1572 | `          </DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1573 | `        </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1574 | `      </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1575 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1576 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1577 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1578 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1579 | `function KanbanScrollArea({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1580 | `  orientation,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1581 | `  children,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1582 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1583 | `  orientation: "horizontal" | "vertical";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1584 | `  children: React.ReactNode;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1585 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1586 | `  const mainRef = useRef<HTMLDivElement>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1587 | `  const topScrollRef = useRef<HTMLDivElement>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1588 | `  const topScrollContentRef = useRef<HTMLDivElement>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1589 | `  const previousOrientationRef = useRef(orientation);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1590 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1591 | `  // Cada orientação usa dimensões e estratégias de ordenação diferentes.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 1592 | `  // Ao voltar para a lista vertical, elimina uma posição horizontal residual` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 1593 | `  // antes da pintura para evitar cortes ou colunas parcialmente fora da tela.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 1594 | `  useLayoutEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1595 | `    const main = mainRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1596 | `    const previousOrientation = previousOrientationRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1597 | `    previousOrientationRef.current = orientation;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1598 | `    if (!main || previousOrientation === orientation) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1599 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1600 | `    main.scrollLeft = 0;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1601 | `    if (orientation === "vertical") main.scrollTop = 0;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1602 | `  }, [orientation]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1603 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1604 | `  // A barra nativa do navegador sempre fica no rodapé do elemento rolável.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 1605 | `  // Esta área auxiliar, acima do quadro, mantém uma barra superior sincronizada.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 1606 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1607 | `    const main = mainRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1608 | `    const topScroll = topScrollRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1609 | `    const topScrollContent = topScrollContentRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1610 | `    if (!main || !topScroll || !topScrollContent || orientation !== "horizontal") return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1611 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1612 | `    const updateTopScrollbar = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1613 | `      topScrollContent.style.width = \`${main.scrollWidth}px\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1614 | `      topScroll.scrollLeft = main.scrollLeft;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1615 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1616 | `    const syncFromMain = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1617 | `      topScroll.scrollLeft = main.scrollLeft;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1618 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1619 | `    const syncFromTop = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1620 | `      main.scrollLeft = topScroll.scrollLeft;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1621 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1622 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1623 | `    updateTopScrollbar();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1624 | `    main.addEventListener("scroll", syncFromMain);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1625 | `    topScroll.addEventListener("scroll", syncFromTop);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1626 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1627 | `    const resizeObserver = new ResizeObserver(updateTopScrollbar);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1628 | `    resizeObserver.observe(main);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1629 | `    if (main.firstElementChild) resizeObserver.observe(main.firstElementChild);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1630 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1631 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1632 | `      main.removeEventListener("scroll", syncFromMain);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1633 | `      topScroll.removeEventListener("scroll", syncFromTop);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1634 | `      resizeObserver.disconnect();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1635 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1636 | `  }, [orientation]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1637 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1638 | `  // Wheel vertical → scroll horizontal quando estiver no modo horizontal` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 1639 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1640 | `    const el = mainRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1641 | `    if (!el || orientation !== "horizontal") return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1642 | `    const onWheel = (e: WheelEvent) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1643 | `      // se não há overflow horizontal, ignora` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 1644 | `      if (el.scrollWidth <= el.clientWidth) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1645 | `      // ignora se o alvo está dentro de uma coluna que tem rolagem vertical útil` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 1646 | `      const target = e.target as HTMLElement | null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1647 | `      const column = target?.closest(".kanban-scroll");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1648 | `      if (` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1649 | `        column &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1650 | `        column !== el &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1651 | `        (column as HTMLElement).scrollHeight > (column as HTMLElement).clientHeight + 1` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1652 | `      ) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1653 | `        return; // deixa o navegador rolar a coluna` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1654 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1655 | `      if (e.shiftKey && e.deltaY !== 0 && e.deltaX === 0) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1656 | `        e.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1657 | `        el.scrollLeft += e.deltaY;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1658 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1659 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1660 | `    el.addEventListener("wheel", onWheel, { passive: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1661 | `    return () => el.removeEventListener("wheel", onWheel);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1662 | `  }, [orientation]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1663 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1664 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1665 | `    <div className="flex min-h-0 flex-1 flex-col">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1666 | `      {orientation === "horizontal" && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1667 | `        <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1668 | `          ref={topScrollRef}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1669 | `          className="kanban-top-scroll shrink-0 overflow-x-scroll overflow-y-hidden"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1670 | `          aria-label="Rolagem horizontal do Kanban"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1671 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1672 | `          <div ref={topScrollContentRef} className="h-px" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1673 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1674 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1675 | `      <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1676 | `        ref={mainRef}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1677 | `        className={\`kanban-scroll min-h-0 flex-1 overflow-y-auto p-4 ${` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1678 | `          orientation === "horizontal" ? "overflow-x-auto" : "overflow-x-hidden"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1679 | `        }\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1680 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1681 | `        {children}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1682 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1683 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1684 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1685 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1686 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
