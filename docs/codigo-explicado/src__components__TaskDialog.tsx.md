# src/components/TaskDialog.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { useEffect, useMemo, useRef, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { createClient } from "@supabase/supabase-js";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `  Dialog,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 5 | `  DialogContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 6 | `  DialogFooter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `  DialogHeader,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `  DialogTitle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `} from "@/components/ui/dialog";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `import { Label } from "@/components/ui/label";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 13 | `import { Textarea } from "@/components/ui/textarea";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 14 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 15 | `  Select,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  SelectContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  SelectItem,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  SelectTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  SelectValue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `} from "@/components/ui/select";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `import { Checkbox } from "@/components/ui/checkbox";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 22 | `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 23 | `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 24 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 25 | `import type { Database } from "@/integrations/supabase/types";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 26 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 27 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 28 | `  useAssignableProfiles,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `  useClients,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  useColumns,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `  useProfiles,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `  useTaskStatuses,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  type Task,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 34 | `} from "@/hooks/use-data";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `import { useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 36 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 37 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 38 | `  Trash2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `  Paperclip,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `  Send,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `  Download,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `  ExternalLink,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `  X,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `  Plus,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  Link2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `  ChevronDown,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `  ChevronRight,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `  Clock3,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `  SmilePlus,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `  Pencil,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `} from "lucide-react";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `import { format } from "date-fns";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 53 | `import { AttachmentPreviewDialog } from "@/components/AttachmentPreviewDialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 54 | `import { FileDropZone } from "@/components/FileDropZone";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 55 | `import { isTaskAttachmentTooLarge, MAX_TASK_ATTACHMENT_LABEL } from "@/lib/attachment-limits";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 56 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 57 | `  removeTaskAttachmentAndClientCopy,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 58 | `  syncTaskAttachmentToClient,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 59 | `} from "@/lib/sync-task-attachment-to-client";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `import { RichTextEditor } from "@/components/RichTextEditor";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 61 | `import { SubtaskDialog, type EditableSubtask } from "@/components/SubtaskDialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 62 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 63 | `interface Props {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 64 | `  open: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `  onOpenChange: (o: boolean) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 66 | `  task?: Task | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `  defaultColumnId?: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 69 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 70 | `interface Subtask extends EditableSubtask {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 71 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 72 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `  done: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `  position: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 75 | `  due_date: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `  assignee_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `  notes: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `  completed_at: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 80 | `interface SubtaskAttachment {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 81 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `  subtask_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `  file_name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `  storage_path: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `  mime_type: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `  size_bytes: number | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 88 | `interface SubtaskDueChange {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 89 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `  subtask_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `  old_due_date: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `  new_due_date: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 93 | `  reason: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 95 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 96 | `interface Comment {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 97 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 98 | `  title: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `  body: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 100 | `  author_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 101 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 103 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 104 | `const DEFAULT_DEADLINE_TIME = "12:00";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 105 | `const deadlineToIso = (date: string) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 106 | `  date ? new Date(\`${date}T${DEFAULT_DEADLINE_TIME}:00\`).toISOString() : null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `const hasDueDateChanged = (previousDueDate: string | null | undefined, nextDueDate: string) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 108 | `  previousDueDate` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `    ? format(new Date(previousDueDate), "yyyy-MM-dd") !== nextDueDate` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `    : Boolean(nextDueDate);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `const normalizeDueTime = (time: string | null) => time?.slice(0, 5) ?? "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 112 | `interface Attachment {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 113 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `  file_name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `  storage_path: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 116 | `  mime_type: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `  size_bytes: number | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 119 | `const LINK_MIME = "text/uri-list";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 120 | `const COMPLETED_STATUS_VALUE = "__completed__";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 121 | `const MESSAGE_EMOJIS = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 122 | `  "\u{1F600}",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `  "\u{1F602}",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `  "\u{1F44B}",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `  "\u{1F680}",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `  "\u{1F4A1}",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `  "\u{2764}\u{FE0F}",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `  "\u{1F389}",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `  "\u{1F44F}",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 130 | `];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `const storageObjectName = () => \`arquivo-${Date.now()}-${crypto.randomUUID()}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 132 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 133 | `const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 134 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 135 | `/**` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 136 | ` * Nome da pessoa nos seletores de atribuição. A lista já vem filtrada pelo` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 137 | ` * ambiente escolhido, então marcar a origem de cada nome seria repetir a mesma` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 138 | ` * informação em todas as linhas.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 139 | ` */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 140 | `function AssigneeOption({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 141 | `  profile,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 142 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 143 | `  profile: { full_name: string | null; email: string | null };` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 144 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 145 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 146 | `    <span className="min-w-0 truncate">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 147 | `      {profile.full_name || profile.email || "Usuário sem nome"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 148 | `    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 149 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 150 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 151 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 152 | `export function TaskDialog({ open, onOpenChange, task, defaultColumnId }: Props) {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 153 | `  const qc = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 154 | `  const { user, profile, isAdmin, activeWorkspace, workspaces } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 155 | `  const { data: cols } = useColumns();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 156 | `  const { data: clients } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 157 | `  const { data: profiles } = useProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 158 | `  const [targetWorkspaceId, setTargetWorkspaceId] = useState<string>("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 159 | `  // Ao lançar a tarefa em outro ambiente, só as pessoas de lá podem assumi-la.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 160 | `  const { data: assignableProfiles = [] } = useAssignableProfiles(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 161 | `    targetWorkspaceId || activeWorkspace?.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 163 | `  const { data: statuses = [] } = useTaskStatuses();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 164 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 165 | `  const [title, setTitle] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 166 | `  const [description, setDescription] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 167 | `  const [status, setStatus] = useState<Task["status"]>("todo");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 168 | `  const [priority, setPriority] = useState<Task["priority"]>("medium");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 169 | `  const [columnId, setColumnId] = useState<string>("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 170 | `  const [clientId, setClientId] = useState<string>("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 171 | `  const [clientPickerOpen, setClientPickerOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 172 | `  const [clientSearch, setClientSearch] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 173 | `  const [assigneeId, setAssigneeId] = useState<string>("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 174 | `  const [collaboratorIds, setCollaboratorIds] = useState<string[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 175 | `  const [collaboratorPickerOpen, setCollaboratorPickerOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 176 | `  const [dueDate, setDueDate] = useState<string>("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 177 | `  const [dueTime, setDueTime] = useState<string>("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 178 | `  const [dueDateChangeReason, setDueDateChangeReason] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 179 | `  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 180 | `  const currentTaskIdRef = useRef<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 181 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 182 | `  const [subtasks, setSubtasks] = useState<Subtask[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 183 | `  const [newSubtask, setNewSubtask] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 184 | `  const [newSubtaskDue, setNewSubtaskDue] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 185 | `  const [newSubtaskAssignee, setNewSubtaskAssignee] = useState<string>("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 186 | `  const [subtaskDialogOpen, setSubtaskDialogOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 187 | `  const [subtaskInDialog, setSubtaskInDialog] = useState<Subtask | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 188 | `  const [editingSubtaskId, setEditingSubtaskId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 189 | `  const [subtaskTitleDraft, setSubtaskTitleDraft] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 190 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 191 | `  const [subDueChanges, setSubDueChanges] = useState<Record<string, SubtaskDueChange[]>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 192 | `  const [subDueOpen, setSubDueOpen] = useState<Record<string, boolean>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 193 | `  const [subDueReason, setSubDueReason] = useState<{` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 194 | `    open: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 195 | `    subtask: Subtask | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 196 | `    next: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 197 | `    reason: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `  }>({ open: false, subtask: null, next: null, reason: "" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 199 | `  const [subDueSaving, setSubDueSaving] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 200 | `  const [subExpanded, setSubExpanded] = useState<Record<string, boolean>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 201 | `  const [subAttachments, setSubAttachments] = useState<Record<string, SubtaskAttachment[]>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 202 | `  const [comments, setComments] = useState<Comment[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 203 | `  const [newComment, setNewComment] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 204 | `  const [attachments, setAttachments] = useState<Attachment[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 205 | `  const [fileUploadProgress, setFileUploadProgress] = useState<{` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 206 | `    current: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 207 | `    total: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 208 | `  } | null>(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 209 | `  const [saving, setSaving] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 210 | `  const [previewAttachment, setPreviewAttachment] = useState<Attachment | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 211 | `  const canDeleteTask = !!currentTaskId && (!!isAdmin || !task || task.created_by === user?.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 212 | `  // A participant can update a task, but only its creator, responsible person` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 213 | `  // or an administrator may change the list of other participants.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 214 | `  const canManageCollaborators =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 215 | `    !task || !!isAdmin || task.created_by === user?.id || task.assignee_id === user?.id;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 216 | `  const canDeleteSubtask = (subtask: Subtask) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 217 | `    !!isAdmin || subtask.assignee_id !== user?.id || task?.created_by === user?.id;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 218 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 219 | `  const filteredClients = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 220 | `    const term = clientSearch.trim().toLocaleLowerCase("pt-BR");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 221 | `    const activeClients = (clients ?? []).filter((client) => client.is_active);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 222 | `    return term` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 223 | `      ? activeClients.filter((client) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 224 | `          client.name.toLocaleLowerCase("pt-BR").includes(term),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 225 | `        )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 226 | `      : activeClients;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 227 | `  }, [clients, clientSearch]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 228 | `  const selectedClient = clients?.find((client) => client.id === clientId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 229 | `  const mentionableProfiles = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 230 | `    () => (profiles ?? []).filter((candidate) => candidate.is_active !== false),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 231 | `    [profiles],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 232 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 233 | `  const mentionQuery = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 234 | `    const match = newComment.match(/(?:^|\s)@([^\n@]*)$/);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 235 | `    return match ? match[1].trim().toLocaleLowerCase("pt-BR") : null;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 236 | `  }, [newComment]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 237 | `  const mentionCandidates = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 238 | `    if (mentionQuery === null) return [];` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 239 | `    return mentionableProfiles` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 240 | `      .filter((candidate) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 241 | `        const label = (candidate.full_name || candidate.email || "").toLocaleLowerCase("pt-BR");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 242 | `        return label.includes(mentionQuery);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 243 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 244 | `      .slice(0, 5);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 245 | `  }, [mentionQuery, mentionableProfiles]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 246 | `  const taskCreator = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 247 | `    () => profiles?.find((profile) => profile.id === task?.created_by) ?? null,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 248 | `    [profiles, task?.created_by],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 249 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 250 | `  const taskCreatorName =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 251 | `    taskCreator?.full_name ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 252 | `    taskCreator?.email ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 253 | `    (task?.created_by === user?.id ? profile?.full_name || user?.email : null) ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 254 | `    "Usuário não identificado";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 255 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 256 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 257 | `    if (!open) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 258 | `    setClientPickerOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 259 | `    setClientSearch("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 260 | `    setEditingSubtaskId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 261 | `    setSubtaskTitleDraft("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 262 | `    if (task) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 263 | `      setTitle(task.title);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 264 | `      setDescription(task.description ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 265 | `      setStatus(task.status === "done" || task.completed_at ? "done" : (task.status ?? "todo"));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 266 | `      setPriority(task.priority);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 267 | `      setColumnId(task.column_id ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 268 | `      setTargetWorkspaceId(task.workspace_id ?? activeWorkspace?.id ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 269 | `      setClientId(task.client_id ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 270 | `      setAssigneeId(task.assignee_id ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 271 | `      void loadCollaborators(task.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 272 | `      setDueDate(task.due_date ? format(new Date(task.due_date), "yyyy-MM-dd") : "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 273 | `      setDueTime(normalizeDueTime(task.due_time));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 274 | `      setDueDateChangeReason("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 275 | `      currentTaskIdRef.current = task.id;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 276 | `      setCurrentTaskId(task.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 277 | `      setNewSubtask("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 278 | `      setNewSubtaskDue("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 279 | `      setNewSubtaskAssignee("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 280 | `      loadRelated(task.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 281 | `    } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 282 | `      setTitle("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 283 | `      setDescription("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 284 | `      setStatus("todo");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 285 | `      setPriority("medium");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 286 | `      setColumnId(defaultColumnId ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 287 | `      setTargetWorkspaceId(activeWorkspace?.id ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 288 | `      setClientId("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 289 | `      setAssigneeId(user?.id ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 290 | `      setCollaboratorIds([]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 291 | `      setDueDate("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 292 | `      setDueTime("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 293 | `      setDueDateChangeReason("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 294 | `      currentTaskIdRef.current = null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 295 | `      setCurrentTaskId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 296 | `      setSubtasks([]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 297 | `      setComments([]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 298 | `      setAttachments([]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 299 | `      setNewComment("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 300 | `      setNewSubtask("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 301 | `      setNewSubtaskDue("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 302 | `      setNewSubtaskAssignee("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 303 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 304 | `  }, [open, task, defaultColumnId, user?.id, activeWorkspace?.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 305 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 306 | `  const loadRelated = async (taskId: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 307 | `    const [s, c, a] = await Promise.all([` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 308 | `      supabase.from("subtasks").select("*").eq("task_id", taskId).order("position"),` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 309 | `      supabase.from("comments").select("*").eq("task_id", taskId).order("created_at"),` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 310 | `      supabase.from("attachments").select("*").eq("task_id", taskId).order("created_at"),` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 311 | `    ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 312 | `    setSubtasks((s.data ?? []) as Subtask[]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 313 | `    const nextComments = (c.data ?? []) as Comment[];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 314 | `    setComments(nextComments);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 315 | `    setAttachments((a.data ?? []) as Attachment[]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 316 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 317 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 318 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 319 | `    if (!open || !currentTaskId) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 320 | `    const channel = supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 321 | `      .channel(\`task-comments-${currentTaskId}-${Math.random().toString(36).slice(2)}\`)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 322 | `      .on(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 323 | `        "postgres_changes",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 324 | `        {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 325 | `          event: "INSERT",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 326 | `          schema: "public",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 327 | `          table: "comments",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 328 | `          filter: \`task_id=eq.${currentTaskId}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 329 | `        },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 330 | `        ({ new: comment }: { new: Record<string, unknown> }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 331 | `          setComments((existing) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 332 | `            existing.some((item) => item.id === comment.id)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 333 | `              ? existing` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 334 | `              : [...existing, comment as unknown as Comment],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 335 | `          );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 336 | `        },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 337 | `      )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 338 | `      .on(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 339 | `        "postgres_changes",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 340 | `        {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 341 | `          event: "DELETE",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 342 | `          schema: "public",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 343 | `          table: "comments",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 344 | `          filter: \`task_id=eq.${currentTaskId}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 345 | `        },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 346 | `        ({ old: comment }: { old: { id: string } }) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 347 | `          setComments((existing) => existing.filter((item) => item.id !== comment.id)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 348 | `      )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 349 | `      .subscribe();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 350 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 351 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 352 | `      supabase.removeChannel(channel);` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 353 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 354 | `  }, [open, currentTaskId]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 355 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 356 | `  const loadCollaborators = async (taskId: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 357 | `    const { data, error } = await (supabase.from("task_collaborators") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 358 | `      .select("collaborator_id")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 359 | `      .eq("task_id", taskId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 360 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 361 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 362 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 363 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 364 | `    setCollaboratorIds(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 365 | `      (data ?? []).map((collaborator: { collaborator_id: string }) => collaborator.collaborator_id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 366 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 367 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 368 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 369 | `  const syncCollaborators = async (taskId: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 370 | `    if (!canManageCollaborators) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 371 | `    const { error: deleteError } = await (supabase.from("task_collaborators") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 372 | `      .delete()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 373 | `      .eq("task_id", taskId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 374 | `    if (deleteError) throw deleteError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 375 | `    if (collaboratorIds.length === 0) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 376 | `    const { error: insertError } = await (supabase.from("task_collaborators") as any).insert(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 377 | `      collaboratorIds.map((collaboratorId) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 378 | `        task_id: taskId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 379 | `        collaborator_id: collaboratorId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 380 | `        added_by: user?.id ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 381 | `      })),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 382 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 383 | `    if (insertError) throw insertError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 384 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 385 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 386 | `  const toggleCollaborator = (collaboratorId: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 387 | `    setCollaboratorIds((current) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 388 | `      current.includes(collaboratorId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 389 | `        ? current.filter((id) => id !== collaboratorId)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 390 | `        : [...current, collaboratorId],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 391 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 392 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 393 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 394 | `  // Trocar o ambiente troca o elenco disponível. Em vez de limpar tudo na hora,` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 395 | `  // espera a lista do novo ambiente chegar e descarta apenas quem não existe` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 396 | `  // lá — assim você não perde a si mesmo como responsável ao lançar numa` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 397 | `  // equipe da qual também faz parte. Só vale na criação: numa tarefa que já` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 398 | `  // existe, um responsável fora da lista (inativo, por exemplo) é preservado.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 399 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 400 | `    if (task || !open || assignableProfiles.length === 0) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 401 | `    const disponiveis = new Set(assignableProfiles.map((profile) => profile.id));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 402 | `    setAssigneeId((atual) => (atual && !disponiveis.has(atual) ? "" : atual));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 403 | `    setCollaboratorIds((atuais) => atuais.filter((id) => disponiveis.has(id)));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 404 | `  }, [assignableProfiles, task, open]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 405 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 406 | `  const buildPayload = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 407 | `    const matchingStatus = statuses.find((item) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 408 | `      status === "done" ? item.is_completed : !item.is_completed,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 409 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 410 | `    return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 411 | `      title: title.trim() || "Sem título",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 412 | `      description: description || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 413 | `      status,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 414 | `      status_id: matchingStatus?.id ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 415 | `      priority,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 416 | `      column_id: columnId || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 417 | `      client_id: clientId || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 418 | `      assignee_id: assigneeId || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 419 | `      due_date: deadlineToIso(dueDate),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 420 | `      due_time: dueDate ? dueTime || null : null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 421 | `      completed_at: status === "done" ? (task?.completed_at ?? new Date().toISOString()) : null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 422 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 423 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 424 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 425 | `  // React can retain the previous user while Supabase refreshes or clears an` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 426 | `  // expired token. Database writes must use the live session so they are sent` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 427 | `  // as \`authenticated\`, not \`anon\` (which RLS correctly rejects).` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 428 | `  const getAuthenticatedUser = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 429 | `    const {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 430 | `      data: { session },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 431 | `    } = await supabase.auth.getSession();` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 432 | `    if (!session?.user) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 433 | `      toast.error("Sua sessão expirou. Entre novamente para criar uma tarefa.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 434 | `      return null;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 435 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 436 | `    const {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 437 | `      data: { user: authenticatedUser },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 438 | `      error,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 439 | `    } = await supabase.auth.getUser();` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 440 | `    if (error || !authenticatedUser) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 441 | `      toast.error("Não foi possível validar sua sessão. Entre novamente para criar uma tarefa.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 442 | `      return null;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 443 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 444 | `    const url = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 445 | `    const publishableKey =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 446 | `      import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 447 | `    if (!url || !publishableKey) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 448 | `      toast.error("A conexão com o Supabase não está configurada.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 449 | `      return null;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 450 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 451 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 452 | `    // Use the verified access token explicitly for task creation. This avoids a` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 453 | `    // stale internal auth state causing PostgREST to receive the request as anon.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 454 | `    const authenticatedClient = createClient<Database>(url, publishableKey, {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 455 | `      auth: { persistSession: false, autoRefreshToken: false },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 456 | `      global: { headers: { Authorization: \`Bearer ${session.access_token}\` } },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 457 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 458 | `    return { user: authenticatedUser, client: authenticatedClient };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 459 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 460 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 461 | `  // Ensures a task row exists so sub-features (subtasks/comments/files) can attach.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 462 | `  // Auto-creates a draft when the dialog is in "new task" mode.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 463 | `  const ensureTask = async (): Promise<string | null> => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 464 | `    const existingId = currentTaskIdRef.current ?? currentTaskId;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 465 | `    if (existingId) return existingId;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 466 | `    const authenticated = await getAuthenticatedUser();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 467 | `    if (!authenticated) return null;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 468 | `    if (!title.trim()) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 469 | `      toast.error("Defina um título antes de adicionar itens");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 470 | `      return null;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 471 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 472 | `    if (!dueDate) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 473 | `      toast.error("Defina um prazo antes de criar a tarefa");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 474 | `      return null;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 475 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 476 | `    // Do not use INSERT ... RETURNING here. The tasks SELECT policy checks` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 477 | `    // visibility through can_view_task(), which cannot see a just-inserted row` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 478 | `    // from inside the same RETURNING statement. A client UUID lets us continue` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 479 | `    // with the new task without that second RLS evaluation.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 480 | `    const taskId = crypto.randomUUID();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 481 | `    const { error } = await authenticated.client.from("tasks").insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 482 | `      id: taskId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 483 | `      ...buildPayload(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 484 | `      workspace_id: targetWorkspaceId || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 485 | `      created_by: authenticated.user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 486 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 487 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 488 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 489 | `      return null;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 490 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 491 | `    currentTaskIdRef.current = taskId;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 492 | `    setCurrentTaskId(taskId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 493 | `    await syncCollaborators(taskId);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 494 | `    await supabase` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 495 | `      .from("task_history")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 496 | `      .insert({ task_id: taskId, user_id: authenticated.user.id, action: "created" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 497 | `    qc.invalidateQueries({ queryKey: ["tasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 498 | `    return taskId;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 499 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 500 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 501 | `  const commitPendingSubtask = async (taskId: string): Promise<boolean> => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 502 | `    const title = newSubtask.trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 503 | `    if (!title) return true;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 504 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 505 | `    const due = newSubtaskDue;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 506 | `    const assignee = newSubtaskAssignee;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 507 | `    const position = subtasks.length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 508 | `    const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 509 | `      .from("subtasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 510 | `      .insert({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 511 | `        task_id: taskId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 512 | `        title,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 513 | `        position,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 514 | `        due_date: deadlineToIso(due),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 515 | `        assignee_id: assignee || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 516 | `      } as any)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 517 | `      .select("id, title, done, position, due_date, assignee_id, notes, completed_at")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 518 | `      .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 519 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 520 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 521 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 522 | `      return false;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 523 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 524 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 525 | `    setSubtasks((prev) => [...prev, data as Subtask]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 526 | `    setNewSubtask("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 527 | `    setNewSubtaskDue("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 528 | `    setNewSubtaskAssignee("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 529 | `    await Promise.all([` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 530 | `      qc.invalidateQueries({ queryKey: ["tasks"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 531 | `      qc.invalidateQueries({ queryKey: ["subtasks"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 532 | `    ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 533 | `    return true;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 534 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 535 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 536 | `  const save = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 537 | `    if (!title.trim()) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 538 | `      toast.error("Título é obrigatório");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 539 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 540 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 541 | `    if (` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 542 | `      status === "done" &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 543 | `      (subtasks.some((subtask) => !subtask.done) || Boolean(newSubtask.trim()))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 544 | `    ) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 545 | `      toast.error("Conclua todas as subtarefas antes de concluir a tarefa.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 546 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 547 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 548 | `    const authenticated = await getAuthenticatedUser();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 549 | `    if (!authenticated) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 550 | `    const existingTaskId = currentTaskIdRef.current ?? currentTaskId;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 551 | `    if (!existingTaskId && !dueDate) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 552 | `      toast.error("Prazo é obrigatório para criar uma tarefa");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 553 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 554 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 555 | `    setSaving(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 556 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 557 | `      const payload = buildPayload();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 558 | `      if (existingTaskId) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 559 | `        const previousDueDate = task?.due_date ?? null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 560 | `        const dueDateChanged = hasDueDateChanged(previousDueDate, dueDate);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 561 | `        // Definir o primeiro prazo não é uma alteração. A justificativa só é` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 562 | `        // obrigatória a partir da segunda definição/alteração do prazo.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 563 | `        const dueChangeReason =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 564 | `          dueDateChanged && previousDueDate ? dueDateChangeReason.trim() : null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 565 | `        if (dueDateChanged && previousDueDate && !dueChangeReason) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 566 | `          toast.error("Informe a justificativa para alterar o prazo da tarefa.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 567 | `          return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 568 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 569 | `        const { error } = await supabase.from("tasks").update(payload).eq("id", existingTaskId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 570 | `        if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 571 | `        if (dueDateChanged && previousDueDate) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 572 | `          const { error: historyError } = await supabase.from("task_due_date_changes").insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 573 | `            task_id: existingTaskId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 574 | `            user_id: authenticated.user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 575 | `            old_due_date: previousDueDate,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 576 | `            new_due_date: payload.due_date,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 577 | `            reason: dueChangeReason,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 578 | `          });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 579 | `          if (historyError) throw historyError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 580 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 581 | `        await syncCollaborators(existingTaskId);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 582 | `        await supabase` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 583 | `          .from("task_history")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 584 | `          .insert({ task_id: existingTaskId, user_id: authenticated.user.id, action: "updated" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 585 | `        if (!(await commitPendingSubtask(existingTaskId))) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 586 | `      } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 587 | `        const taskId = crypto.randomUUID();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 588 | `        const { error } = await authenticated.client.from("tasks").insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 589 | `          id: taskId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 590 | `          ...payload,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 591 | `          workspace_id: targetWorkspaceId || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 592 | `          created_by: authenticated.user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 593 | `        });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 594 | `        if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 595 | `        await supabase` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 596 | `          .from("task_history")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 597 | `          .insert({ task_id: taskId, user_id: authenticated.user.id, action: "created" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 598 | `        currentTaskIdRef.current = taskId;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 599 | `        setCurrentTaskId(taskId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 600 | `        await syncCollaborators(taskId);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 601 | `        if (!(await commitPendingSubtask(taskId))) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 602 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 603 | `      toast.success(currentTaskId || task ? "Tarefa atualizada" : "Tarefa criada");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 604 | `      await Promise.all([` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 605 | `        qc.invalidateQueries({ queryKey: ["tasks"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 606 | `        qc.invalidateQueries({ queryKey: ["subtasks"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 607 | `        qc.invalidateQueries({ queryKey: ["task_collaborators"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 608 | `      ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 609 | `      onOpenChange(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 610 | `    } catch (e) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 611 | `      toast.error((e as Error).message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 612 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 613 | `      setSaving(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 614 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 615 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 616 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 617 | `  const remove = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 618 | `    if (!currentTaskId) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 619 | `    if (!confirm("Mover esta tarefa para a lixeira? Você pode restaurá-la depois.")) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 620 | `    const { error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 621 | `      .from("tasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 622 | `      .update({ deleted_at: new Date().toISOString() })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 623 | `      .eq("id", currentTaskId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 624 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 625 | `    toast.success("Tarefa movida para a lixeira");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 626 | `    qc.invalidateQueries({ queryKey: ["tasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 627 | `    onOpenChange(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 628 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 629 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 630 | `  // Subtasks` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 631 | `  const addSubtask = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 632 | `    if (!newSubtask.trim()) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 633 | `    const tid = await ensureTask();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 634 | `    if (!tid) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 635 | `    await commitPendingSubtask(tid);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 636 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 637 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 638 | `  const openNewSubtaskDialog = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 639 | `    const tid = await ensureTask();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 640 | `    if (!tid) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 641 | `    setSubtaskInDialog(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 642 | `    setSubtaskDialogOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 643 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 644 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 645 | `  const openSubtaskDialog = (subtask: Subtask) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 646 | `    setSubtaskInDialog(subtask);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 647 | `    setSubtaskDialogOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 648 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 649 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 650 | `  const handleSubtaskDialogSaved = (savedSubtask: EditableSubtask) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 651 | `    setSubtasks((current) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 652 | `      const exists = current.some((subtask) => subtask.id === savedSubtask.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 653 | `      return exists` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 654 | `        ? current.map((subtask) => (subtask.id === savedSubtask.id ? savedSubtask : subtask))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 655 | `        : [...current, savedSubtask];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 656 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 657 | `    setNewSubtask("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 658 | `    setNewSubtaskDue("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 659 | `    setNewSubtaskAssignee("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 660 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 661 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 662 | `  const toggleSubtask = async (st: Subtask) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 663 | `    await supabase.from("subtasks").update({ done: !st.done }).eq("id", st.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 664 | `    setSubtasks(subtasks.map((s) => (s.id === st.id ? { ...s, done: !s.done } : s)));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 665 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 666 | `  const deleteSubtask = async (id: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 667 | `    await supabase.from("subtasks").delete().eq("id", id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 668 | `    setSubtasks(subtasks.filter((s) => s.id !== id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 669 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 670 | `  const startEditingSubtaskTitle = (subtask: Subtask) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 671 | `    setEditingSubtaskId(subtask.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 672 | `    setSubtaskTitleDraft(subtask.title);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 673 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 674 | `  const saveSubtaskTitle = async (subtask: Subtask) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 675 | `    const nextTitle = subtaskTitleDraft.trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 676 | `    if (!nextTitle) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 677 | `      toast.error("O título da subtarefa não pode ficar vazio.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 678 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 679 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 680 | `    if (nextTitle === subtask.title) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 681 | `      setEditingSubtaskId((current) => (current === subtask.id ? null : current));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 682 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 683 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 684 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 685 | `    const { error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 686 | `      .from("subtasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 687 | `      .update({ title: nextTitle })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 688 | `      .eq("id", subtask.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 689 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 690 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 691 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 692 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 693 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 694 | `    setSubtasks((current) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 695 | `      current.map((item) => (item.id === subtask.id ? { ...item, title: nextTitle } : item)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 696 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 697 | `    setEditingSubtaskId((current) => (current === subtask.id ? null : current));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 698 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 699 | `  const applySubtaskDue = async (st: Subtask, next: string | null, reason?: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 700 | `    const prev = st.due_date;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 701 | `    setSubDueSaving(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 702 | `    const { error } = await supabase.from("subtasks").update({ due_date: next }).eq("id", st.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 703 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 704 | `      setSubDueSaving(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 705 | `      toast.error(\`Não foi possível salvar o prazo: ${error.message}\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 706 | `      return false;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 707 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 708 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 709 | `    setSubtasks((current) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 710 | `      current.map((subtask) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 711 | `        subtask.id === st.id ? { ...subtask, due_date: next } : subtask,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 712 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 713 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 714 | `    if (user) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 715 | `      const { error: historyError } = await supabase.from("subtask_due_date_changes").insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 716 | `        subtask_id: st.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 717 | `        old_due_date: prev,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 718 | `        new_due_date: next,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 719 | `        reason: reason?.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 720 | `        user_id: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 721 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 722 | `      if (historyError) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 723 | `        toast.warning("Prazo atualizado, mas não foi possível registrar a justificativa.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 724 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 725 | `      if (subDueOpen[st.id]) void loadSubDueChanges(st.id);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 726 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 727 | `    setSubDueSaving(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 728 | `    void qc.invalidateQueries({ queryKey: ["subtasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 729 | `    toast.success("Prazo da subtarefa atualizado");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 730 | `    return true;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 731 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 732 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 733 | `  const updateSubtaskDue = async (st: Subtask, isoOrEmpty: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 734 | `    const next = deadlineToIso(isoOrEmpty);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 735 | `    const prev = st.due_date;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 736 | `    if (next === prev) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 737 | `    if (!prev) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 738 | `      await applySubtaskDue(st, next);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 739 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 740 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 741 | `    setSubDueReason({ open: true, subtask: st, next, reason: "" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 742 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 743 | `  const loadSubDueChanges = async (subtaskId: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 744 | `    const { data } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 745 | `      .from("subtask_due_date_changes")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 746 | `      .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 747 | `      .eq("subtask_id", subtaskId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 748 | `      .order("created_at", { ascending: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 749 | `    setSubDueChanges((prev) => ({ ...prev, [subtaskId]: (data ?? []) as SubtaskDueChange[] }));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 750 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 751 | `  const toggleSubDueHistory = async (subtaskId: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 752 | `    const willOpen = !subDueOpen[subtaskId];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 753 | `    setSubDueOpen((prev) => ({ ...prev, [subtaskId]: willOpen }));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 754 | `    if (willOpen && !subDueChanges[subtaskId]) await loadSubDueChanges(subtaskId);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 755 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 756 | `  const updateSubtaskAssignee = async (st: Subtask, value: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 757 | `    const next = value === "none" ? null : value;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 758 | `    const { error } = await (supabase.from("subtasks") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 759 | `      .update({ assignee_id: next })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 760 | `      .eq("id", st.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 761 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 762 | `    setSubtasks(subtasks.map((s) => (s.id === st.id ? { ...s, assignee_id: next } : s)));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 763 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 764 | `  const updateSubtaskNotes = async (st: Subtask, notes: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 765 | `    const { error } = await (supabase.from("subtasks") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 766 | `      .update({ notes: notes || null })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 767 | `      .eq("id", st.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 768 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 769 | `    setSubtasks(subtasks.map((s) => (s.id === st.id ? { ...s, notes: notes || null } : s)));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 770 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 771 | `  const loadSubAttachments = async (subtaskId: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 772 | `    const { data } = await (supabase.from("subtask_attachments") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 773 | `      .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 774 | `      .eq("subtask_id", subtaskId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 775 | `      .order("created_at");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 776 | `    setSubAttachments((prev) => ({ ...prev, [subtaskId]: (data ?? []) as SubtaskAttachment[] }));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 777 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 778 | `  const toggleSubExpanded = async (id: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 779 | `    const willOpen = !subExpanded[id];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 780 | `    setSubExpanded((prev) => ({ ...prev, [id]: willOpen }));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 781 | `    if (willOpen && !subAttachments[id]) await loadSubAttachments(id);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 782 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 783 | `  const uploadSubFile = async (st: Subtask, file: File) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 784 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 785 | `    const tid = currentTaskId ?? (await ensureTask());` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 786 | `    if (!tid) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 787 | `    const path = \`${tid}/subtasks/${st.id}/${storageObjectName()}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 788 | `    const { error: upErr } = await supabase.storage.from("task-attachments").upload(path, file);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 789 | `    if (upErr) return toast.error(upErr.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 790 | `    const { data, error } = await (supabase.from("subtask_attachments") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 791 | `      .insert({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 792 | `        subtask_id: st.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 793 | `        task_id: tid,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 794 | `        file_name: file.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 795 | `        storage_path: path,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 796 | `        mime_type: file.type,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 797 | `        size_bytes: file.size,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 798 | `        uploaded_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 799 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 800 | `      .select()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 801 | `      .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 802 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 803 | `    setSubAttachments((prev) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 804 | `      ...prev,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 805 | `      [st.id]: [...(prev[st.id] ?? []), data as SubtaskAttachment],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 806 | `    }));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 807 | `    toast.success("Arquivo enviado");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 808 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 809 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 810 | `  const downloadSubFile = async (att: SubtaskAttachment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 811 | `    const { data, error } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 812 | `      .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 813 | `      .download(att.storage_path);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 814 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 815 | `    const url = URL.createObjectURL(data);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 816 | `    const a = document.createElement("a");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 817 | `    a.href = url;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 818 | `    a.download = att.file_name;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 819 | `    document.body.appendChild(a);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 820 | `    a.click();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 821 | `    a.remove();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 822 | `    window.setTimeout(() => URL.revokeObjectURL(url), 30_000);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 823 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 824 | `  const deleteSubFile = async (att: SubtaskAttachment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 825 | `    await supabase.storage.from("task-attachments").remove([att.storage_path]);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 826 | `    await (supabase.from("subtask_attachments") as any).delete().eq("id", att.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 827 | `    setSubAttachments((prev) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 828 | `      ...prev,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 829 | `      [att.subtask_id]: (prev[att.subtask_id] ?? []).filter((x) => x.id !== att.id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 830 | `    }));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 831 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 832 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 833 | `  // Comments` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 834 | `  const insertMention = (mentionedProfile: { full_name: string | null; email: string | null }) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 835 | `    const name = mentionedProfile.full_name || mentionedProfile.email;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 836 | `    if (!name) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 837 | `    setNewComment((current) => current.replace(/(^|\s)@[^\n@]*$/, \`$1@${name} \`));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 838 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 839 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 840 | `  const mentionedProfileIds = (body: string) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 841 | `    mentionableProfiles` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 842 | `      .filter((candidate) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 843 | `        const name = candidate.full_name || candidate.email;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 844 | `        if (!name) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 845 | `        return new RegExp(\`(^|\\s)@${escapeRegExp(name)}(?=$|[\\s.,!?:;])\`, "i").test(body);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 846 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 847 | `      .map((candidate) => candidate.id);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 848 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 849 | `  const addComment = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 850 | `    if (!newComment.trim() || !user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 851 | `    const tid = await ensureTask();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 852 | `    if (!tid) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 853 | `    const body = newComment.trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 854 | `    const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 855 | `      .from("comments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 856 | `      .insert({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 857 | `        task_id: tid,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 858 | `        author_id: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 859 | `        body,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 860 | `        title: null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 861 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 862 | `      .select()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 863 | `      .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 864 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 865 | `    const mentionIds = mentionedProfileIds(body).filter((id) => id !== user.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 866 | `    if (mentionIds.length) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 867 | `      const { error: mentionError } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 868 | `        .from("comment_mentions")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 869 | `        .insert(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 870 | `          mentionIds.map((mentionedUserId) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 871 | `            comment_id: data.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 872 | `            mentioned_user_id: mentionedUserId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 873 | `          })),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 874 | `        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 875 | `      if (mentionError)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 876 | `        toast.error(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 877 | `          \`Comentário enviado, mas não foi possível notificar as menções: ${mentionError.message}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 878 | `        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 879 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 880 | `    setComments((existing) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 881 | `      existing.some((comment) => comment.id === data.id)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 882 | `        ? existing` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 883 | `        : [...existing, data as Comment],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 884 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 885 | `    setNewComment("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 886 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 887 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 888 | `  const deleteComment = async (id: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 889 | `    const { error } = await supabase.from("comments").delete().eq("id", id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 890 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 891 | `    setComments(comments.filter((c) => c.id !== id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 892 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 893 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 894 | `  // Attachments` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 895 | `  const uploadFile = async (file: File, taskId?: string): Promise<boolean> => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 896 | `    if (!user) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 897 | `    if (isTaskAttachmentTooLarge(file)) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 898 | `      toast.error(\`${file.name} ultrapassa o limite de ${MAX_TASK_ATTACHMENT_LABEL} por arquivo.\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 899 | `      return false;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 900 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 901 | `    const tid = taskId ?? (await ensureTask());` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 902 | `    if (!tid) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 903 | `    const path = \`${tid}/${storageObjectName()}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 904 | `    const { error: upErr } = await supabase.storage.from("task-attachments").upload(path, file);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 905 | `    if (upErr) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 906 | `      toast.error(\`${file.name}: ${upErr.message}\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 907 | `      return false;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 908 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 909 | `    const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 910 | `      .from("attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 911 | `      .insert({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 912 | `        task_id: tid,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 913 | `        file_name: file.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 914 | `        storage_path: path,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 915 | `        mime_type: file.type,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 916 | `        size_bytes: file.size,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 917 | `        uploaded_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 918 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 919 | `      .select()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 920 | `      .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 921 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 922 | `      await supabase.storage.from("task-attachments").remove([path]);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 923 | `      toast.error(\`${file.name}: ${error.message}\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 924 | `      return false;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 925 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 926 | `    const attachment = data as Attachment;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 927 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 928 | `      await syncTaskAttachmentToClient({` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 929 | `        file,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 930 | `        taskId: tid,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 931 | `        sourceAttachmentId: attachment.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 932 | `        sourceStoragePath: path,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 933 | `        uploadedBy: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 934 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 935 | `    } catch (syncError) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 936 | `      await supabase.from("attachments").delete().eq("id", attachment.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 937 | `      await supabase.storage.from("task-attachments").remove([path]);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 938 | `      toast.error(\`${file.name}: não foi possível salvar o arquivo do cliente.\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 939 | `      console.error("Could not sync task attachment to client files", syncError);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 940 | `      return false;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 941 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 942 | `    setAttachments((current) => [...current, attachment]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 943 | `    return true;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 944 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 945 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 946 | `  const uploadFiles = async (files: FileList) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 947 | `    const selectedFiles = Array.from(files);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 948 | `    if (!selectedFiles.length || fileUploadProgress) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 949 | `    const oversizedFiles = selectedFiles.filter(isTaskAttachmentTooLarge);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 950 | `    if (oversizedFiles.length) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 951 | `      toast.error(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 952 | `        \`${oversizedFiles.length} ${oversizedFiles.length === 1 ? "arquivo ultrapassa" : "arquivos ultrapassam"} o limite de ${MAX_TASK_ATTACHMENT_LABEL} por arquivo.\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 953 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 954 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 955 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 956 | `    const taskId = await ensureTask();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 957 | `    if (!taskId) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 958 | `    let uploaded = 0;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 959 | `    setFileUploadProgress({ current: 0, total: selectedFiles.length });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 960 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 961 | `      for (const [index, file] of selectedFiles.entries()) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 962 | `        setFileUploadProgress({ current: index + 1, total: selectedFiles.length });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 963 | `        if (await uploadFile(file, taskId)) uploaded += 1;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 964 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 965 | `      if (uploaded === selectedFiles.length) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 966 | `        toast.success(\`${uploaded} ${uploaded === 1 ? "arquivo enviado" : "arquivos enviados"}\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 967 | `      } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 968 | `        toast.error(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 969 | `          \`${uploaded} de ${selectedFiles.length} arquivos foram enviados. Tente novamente os restantes.\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 970 | `        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 971 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 972 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 973 | `      setFileUploadProgress(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 974 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 975 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 976 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 977 | `  const openAttachment = async (att: Attachment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 978 | `    if (att.mime_type === LINK_MIME) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 979 | `      window.open(att.storage_path, "_blank", "noopener,noreferrer");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 980 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 981 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 982 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 983 | `    setPreviewAttachment(att);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 984 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 985 | `  const downloadAttachment = async (att: Attachment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 986 | `    if (att.mime_type === LINK_MIME) return openAttachment(att);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 987 | `    const { data, error } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 988 | `      .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 989 | `      .download(att.storage_path);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 990 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 991 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 992 | `    const blobUrl = URL.createObjectURL(data);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 993 | `    const a = document.createElement("a");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 994 | `    a.href = blobUrl;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 995 | `    a.download = att.file_name;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 996 | `    document.body.appendChild(a);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 997 | `    a.click();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 998 | `    a.remove();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 999 | `    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 30_000);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1000 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1001 | `  const deleteAttachment = async (att: Attachment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1002 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 1003 | `      await removeTaskAttachmentAndClientCopy(att.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 1004 | `      setAttachments(attachments.filter((a) => a.id !== att.id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1005 | `    } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1006 | `      toast.error(error instanceof Error ? error.message : "Não foi possível excluir o arquivo.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1007 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1008 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1009 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1010 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1011 | `    <Dialog open={open} onOpenChange={onOpenChange}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1012 | `      <DialogContent className="max-h-[90vh] max-w-4xl gap-0 overflow-y-auto rounded-lg p-0 shadow-2xl">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1013 | `        <DialogHeader className="border-b bg-muted/20 px-6 py-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1014 | `          <DialogTitle className="text-xl">{task ? "Editar tarefa" : "Nova tarefa"}</DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1015 | `        </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1016 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1017 | `        <div className="space-y-5 px-6 py-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1018 | `          <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1019 | `            <Label>Título *</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1020 | `            <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1021 | `              value={title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1022 | `              onChange={(e) => setTitle(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1023 | `              placeholder="O que precisa ser feito?"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1024 | `              className="h-11 text-base"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1025 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1026 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1027 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1028 | `          {!task && isAdmin && workspaces.length > 1 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1029 | `            <div className="space-y-2 rounded-md border border-amber-300/70 bg-amber-50/60 p-3 dark:border-amber-800/60 dark:bg-amber-950/25">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1030 | `              <Label className="text-xs">Ambiente</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1031 | `              <Select value={targetWorkspaceId} onValueChange={setTargetWorkspaceId}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1032 | `                <SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1033 | `                  <SelectValue placeholder="Selecione o ambiente" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1034 | `                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1035 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1036 | `                  {workspaces.map((workspace) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1037 | `                    <SelectItem key={workspace.id} value={workspace.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1038 | `                      {workspace.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1039 | `                    </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1040 | `                  ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1041 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1042 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1043 | `              <p className="text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1044 | `                A tarefa é lançada neste ambiente. Ao trocar, a lista passa a mostrar apenas as` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1045 | `                pessoas de lá, e quem já estava escolhido só é removido se não existir no destino.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1046 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1047 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1048 | `          ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1049 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1050 | `          <div className="grid grid-cols-1 gap-3 rounded-md border bg-muted/15 p-4 sm:grid-cols-2 md:grid-cols-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1051 | `            <div className="order-1 space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1052 | `              <Label className="text-xs">Prioridade</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1053 | `              <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1054 | `                value={priority ?? "none"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1055 | `                onValueChange={(v) => setPriority(v === "none" ? null : (v as Task["priority"]))}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1056 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1057 | `                <SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1058 | `                  <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1059 | `                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1060 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1061 | `                  <SelectItem value="none">Sem prioridade</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1062 | `                  <SelectItem value="low">Baixa</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1063 | `                  <SelectItem value="medium">Média</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1064 | `                  <SelectItem value="high">Alta</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1065 | `                  <SelectItem value="urgent">Urgente</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1066 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1067 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1068 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1069 | `            <div className="order-6 space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1070 | `              <Label className="text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1071 | `                Prazo {!task ? <span className="text-destructive">*</span> : null}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1072 | `              </Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1073 | `              <div className="rounded-md border bg-muted/30 p-1.5 shadow-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1074 | `                <div className="flex items-center gap-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1075 | `                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1076 | `                    type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1077 | `                    value={dueDate}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1078 | `                    onChange={(e) => setDueDate(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1079 | `                    className="task-deadline-date h-9 flex-1 border-0 bg-transparent px-2 shadow-none focus-visible:ring-0"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1080 | `                    required={!task}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1081 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1082 | `                  {dueDate && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1083 | `                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1084 | `                      type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1085 | `                      size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1086 | `                      variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1087 | `                      className="h-8 w-8 shrink-0"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1088 | `                      onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1089 | `                        setDueDate("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1090 | `                        setDueTime("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1091 | `                      }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1092 | `                      title="Sem prazo"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1093 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1094 | `                      <X className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1095 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1096 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1097 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1098 | `                <div className="mt-1 flex items-center gap-2 border-t px-1.5 pt-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1099 | `                  <Clock3 className="h-3.5 w-3.5 text-primary" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1100 | `                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1101 | `                    type="time"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1102 | `                    value={dueTime}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1103 | `                    onChange={(e) => setDueTime(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1104 | `                    className="h-7 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1105 | `                    step="300"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1106 | `                    disabled={!dueDate}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1107 | `                    aria-label="Hora do prazo (opcional)"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1108 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1109 | `                  <span className="whitespace-nowrap text-[10px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1110 | `                    Opcional` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1111 | `                  </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1112 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1113 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1114 | `              {task && hasDueDateChanged(task.due_date, dueDate) && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1115 | `                <div className="space-y-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1116 | `                  <Label htmlFor="due-date-change-reason" className="text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1117 | `                    Justificativa da alteração de prazo <span className="text-destructive">*</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1118 | `                  </Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1119 | `                  <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1120 | `                    id="due-date-change-reason"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1121 | `                    value={dueDateChangeReason}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1122 | `                    onChange={(event) => setDueDateChangeReason(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1123 | `                    placeholder="Explique o motivo da alteração"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1124 | `                    className="min-h-16 text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1125 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1126 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1127 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1128 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1129 | `            <div className="order-5 space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1130 | `              <Label className="text-xs">Colaboradores</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1131 | `              <Popover open={collaboratorPickerOpen} onOpenChange={setCollaboratorPickerOpen}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1132 | `                <PopoverTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1133 | `                  <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1134 | `                    variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1135 | `                    className="w-full justify-between font-normal"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1136 | `                    disabled={!canManageCollaborators}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1137 | `                    title={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1138 | `                      canManageCollaborators` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1139 | `                        ? undefined` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1140 | `                        : "Somente o criador ou responsável pode alterar colaboradores"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1141 | `                    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1142 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1143 | `                    <span className="truncate">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1144 | `                      {collaboratorIds.length === 0` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1145 | `                        ? "Selecionar nomes"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1146 | `                        : \`${collaboratorIds.length} selecionado${collaboratorIds.length === 1 ? "" : "s"}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1147 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1148 | `                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1149 | `                  </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1150 | `                </PopoverTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1151 | `                <PopoverContent align="start" className="w-64 p-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1152 | `                  <div className="max-h-56 space-y-0.5 overflow-y-auto overscroll-contain pr-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1153 | `                    {assignableProfiles.map((profile) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1154 | `                      const selected = collaboratorIds.includes(profile.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1155 | `                      return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1156 | `                        <label` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1157 | `                          key={profile.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1158 | `                          className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1159 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1160 | `                          <Checkbox` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1161 | `                            checked={selected}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1162 | `                            onCheckedChange={() => toggleCollaborator(profile.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1163 | `                          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1164 | `                          <AssigneeOption profile={profile} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1165 | `                        </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1166 | `                      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1167 | `                    })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1168 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1169 | `                </PopoverContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1170 | `              </Popover>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1171 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1172 | `            <div className="order-2 space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1173 | `              <Label className="text-xs">Status</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1174 | `              <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1175 | `                value={status === "done" ? COMPLETED_STATUS_VALUE : columnId || "none"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1176 | `                onValueChange={(value) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1177 | `                  if (value === COMPLETED_STATUS_VALUE) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1178 | `                    setStatus("done");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1179 | `                    return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1180 | `                  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1181 | `                  setStatus("todo");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1182 | `                  setColumnId(value === "none" ? "" : value);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1183 | `                }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1184 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1185 | `                <SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1186 | `                  <SelectValue placeholder="Nenhuma" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1187 | `                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1188 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1189 | `                  <SelectItem value="none">Nenhuma</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1190 | `                  {cols?.map((c) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1191 | `                    <SelectItem key={c.id} value={c.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1192 | `                      {c.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1193 | `                    </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1194 | `                  ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1195 | `                  <SelectItem value={COMPLETED_STATUS_VALUE}>Concluído</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1196 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1197 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1198 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1199 | `            <div className="order-3 space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1200 | `              <Label className="text-xs">Cliente</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1201 | `              <Popover open={clientPickerOpen} onOpenChange={setClientPickerOpen}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1202 | `                <PopoverTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1203 | `                  <Button variant="outline" className="w-full justify-between font-normal">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1204 | `                    <span className="truncate">{selectedClient?.name ?? "Nenhum"}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1205 | `                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1206 | `                  </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1207 | `                </PopoverTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1208 | `                <PopoverContent` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1209 | `                  align="start"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1210 | `                  className="w-[var(--radix-popover-trigger-width)] p-2"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1211 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1212 | `                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1213 | `                    autoFocus` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1214 | `                    value={clientSearch}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1215 | `                    onChange={(event) => setClientSearch(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1216 | `                    placeholder="Pesquisar cliente..."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1217 | `                    className="mb-2 h-8 text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1218 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1219 | `                  <div className="max-h-56 space-y-1 overflow-y-auto pr-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1220 | `                    <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1221 | `                      type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1222 | `                      onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1223 | `                        setClientId("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1224 | `                        setClientPickerOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1225 | `                      }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1226 | `                      className={\`flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted ${!clientId ? "bg-muted font-medium" : ""}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1227 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1228 | `                      Nenhum` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1229 | `                    </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1230 | `                    {filteredClients.map((client) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1231 | `                      <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1232 | `                        key={client.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1233 | `                        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1234 | `                        onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1235 | `                          setClientId(client.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1236 | `                          setClientPickerOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1237 | `                        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1238 | `                        className={\`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted ${clientId === client.id ? "bg-muted font-medium" : ""}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1239 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1240 | `                        <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1241 | `                          className="h-2 w-2 shrink-0 rounded-full"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1242 | `                          style={{ backgroundColor: client.color ?? "#94a3b8" }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1243 | `                        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1244 | `                        <span className="truncate">{client.name}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1245 | `                      </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1246 | `                    ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1247 | `                    {filteredClients.length === 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1248 | `                      <p className="px-2 py-2 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1249 | `                        Nenhum cliente encontrado.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1250 | `                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1251 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1252 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1253 | `                </PopoverContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1254 | `              </Popover>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1255 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1256 | `            <div className="order-4 space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1257 | `              <Label className="text-xs">Responsável</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1258 | `              <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1259 | `                value={assigneeId || "none"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1260 | `                onValueChange={(v) => setAssigneeId(v === "none" ? "" : v)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1261 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1262 | `                <SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1263 | `                  <SelectValue placeholder="Ninguém" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1264 | `                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1265 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1266 | `                  <SelectItem value="none">Ninguém</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1267 | `                  {assignableProfiles.map((p) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1268 | `                    <SelectItem key={p.id} value={p.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1269 | `                      <AssigneeOption profile={p} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1270 | `                    </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1271 | `                  ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1272 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1273 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1274 | `              {task && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1275 | `                <div className="pt-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1276 | `                  <Label className="text-xs text-muted-foreground">Criada por</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1277 | `                  <p className="mt-1 text-sm font-medium">{taskCreatorName}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1278 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1279 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1280 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1281 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1282 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1283 | `          <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1284 | `            <Label>Descrição</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1285 | `            <RichTextEditor` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1286 | `              value={description}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1287 | `              onChange={setDescription}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1288 | `              placeholder="Descreva a tarefa..."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1289 | `              minHeight={100}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1290 | `              copyable` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1291 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1292 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1293 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1294 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1295 | `            <Tabs defaultValue="subtasks">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1296 | `              <TabsList>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1297 | `                <TabsTrigger value="subtasks">Subtarefas ({subtasks.length})</TabsTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1298 | `                <TabsTrigger value="comments">Conversa ({comments.length})</TabsTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1299 | `                <TabsTrigger value="files">Arquivos ({attachments.length})</TabsTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1300 | `              </TabsList>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1301 | `              <TabsContent value="subtasks" className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1302 | `                {subtasks.map((s) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1303 | `                  const dueStr = s.due_date ? format(new Date(s.due_date), "yyyy-MM-dd") : "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1304 | `                  const historyOpen = subDueOpen[s.id];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1305 | `                  const history = subDueChanges[s.id] ?? [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1306 | `                  const expanded = subExpanded[s.id];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1307 | `                  const files = subAttachments[s.id] ?? [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1308 | `                  const assignee = profiles?.find((p) => p.id === s.assignee_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1309 | `                  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1310 | `                    <div key={s.id} className="space-y-1.5 rounded-md border bg-muted/30 px-3 py-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1311 | `                      <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1312 | `                        <Checkbox checked={s.done} onCheckedChange={() => toggleSubtask(s)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1313 | `                        {editingSubtaskId === s.id ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1314 | `                          <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1315 | `                            value={subtaskTitleDraft}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1316 | `                            onChange={(event) => setSubtaskTitleDraft(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1317 | `                            onBlur={() => void saveSubtaskTitle(s)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1318 | `                            onKeyDown={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1319 | `                              if (event.key === "Enter") event.currentTarget.blur();` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1320 | `                              if (event.key === "Escape") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1321 | `                                setEditingSubtaskId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1322 | `                                setSubtaskTitleDraft(s.title);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1323 | `                              }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1324 | `                            }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1325 | `                            autoFocus` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1326 | `                            aria-label="Título da subtarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1327 | `                            className="h-7 flex-1 text-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1328 | `                          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1329 | `                        ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1330 | `                          <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1331 | `                            type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1332 | `                            onClick={() => startEditingSubtaskTitle(s)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1333 | `                            className={\`min-w-0 flex-1 truncate text-left text-sm hover:text-primary ${s.done ? "line-through text-muted-foreground" : ""}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1334 | `                            title={\`${s.title} — clique para editar\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1335 | `                          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1336 | `                            {s.title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1337 | `                          </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1338 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1339 | `                        {editingSubtaskId !== s.id && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1340 | `                          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1341 | `                            type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1342 | `                            size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1343 | `                            variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1344 | `                            className="h-7 w-7"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1345 | `                            onClick={() => startEditingSubtaskTitle(s)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1346 | `                            title="Editar título"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1347 | `                          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1348 | `                            <Pencil className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1349 | `                          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1350 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1351 | `                        {assignee && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1352 | `                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1353 | `                            {assignee.full_name || assignee.email}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1354 | `                          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1355 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1356 | `                        <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1357 | `                          size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1358 | `                          variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1359 | `                          className="h-7 w-7"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1360 | `                          onClick={() => toggleSubExpanded(s.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1361 | `                          title="Detalhes"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1362 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1363 | `                          {expanded ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1364 | `                            <ChevronDown className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1365 | `                          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1366 | `                            <ChevronRight className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1367 | `                          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1368 | `                        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1369 | `                        {canDeleteSubtask(s) && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1370 | `                          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1371 | `                            size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1372 | `                            variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1373 | `                            className="h-7 w-7"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1374 | `                            onClick={() => deleteSubtask(s.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1375 | `                          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1376 | `                            <X className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1377 | `                          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1378 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1379 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1380 | `                      <div className="flex flex-wrap items-center gap-2 pl-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1381 | `                        <Label className="text-[10px] text-muted-foreground">Prazo</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1382 | `                        <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1383 | `                          type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1384 | `                          value={dueStr}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1385 | `                          onChange={(e) => updateSubtaskDue(s, e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1386 | `                          className="h-7 w-52 text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1387 | `                        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1388 | `                        {s.due_date && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1389 | `                          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1390 | `                            type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1391 | `                            size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1392 | `                            variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1393 | `                            className="h-7 px-2 text-xs text-muted-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1394 | `                            onClick={() => void updateSubtaskDue(s, "")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1395 | `                          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1396 | `                            Indefinido` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1397 | `                          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1398 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1399 | `                        <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1400 | `                          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1401 | `                          size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1402 | `                          variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1403 | `                          className="h-7 px-2 text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1404 | `                          onClick={() => toggleSubDueHistory(s.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1405 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1406 | `                          {historyOpen ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1407 | `                            <ChevronDown className="mr-1 h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1408 | `                          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1409 | `                            <ChevronRight className="mr-1 h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1410 | `                          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1411 | `                          Alterações` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1412 | `                        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1413 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1414 | `                      {historyOpen && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1415 | `                        <div className="ml-6 space-y-1 border-l pl-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1416 | `                          {history.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1417 | `                            <p className="text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1418 | `                              Sem alterações registradas.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1419 | `                            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1420 | `                          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1421 | `                            history.map((h) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1422 | `                              <div key={h.id} className="text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1423 | `                                <span className="font-medium text-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1424 | `                                  {h.old_due_date` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1425 | `                                    ? format(new Date(h.old_due_date), "dd/MM/yyyy")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1426 | `                                    : "sem prazo"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1427 | `                                </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1428 | `                                {" → "}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1429 | `                                <span className="font-medium text-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1430 | `                                  {h.new_due_date` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1431 | `                                    ? format(new Date(h.new_due_date), "dd/MM/yyyy")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1432 | `                                    : "sem prazo"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1433 | `                                </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1434 | `                                {h.reason ? <> — {h.reason}</> : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1435 | `                                <span className="ml-2 opacity-60">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1436 | `                                  {format(new Date(h.created_at), "dd/MM/yyyy")}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1437 | `                                </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1438 | `                              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1439 | `                            ))` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1440 | `                          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1441 | `                        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1442 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1443 | `                      {expanded && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1444 | `                        <div className="ml-6 space-y-2 border-l pl-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1445 | `                          <div className="space-y-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1446 | `                            <Label className="text-[10px] text-muted-foreground">Responsável</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1447 | `                            <div className="flex gap-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1448 | `                              <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1449 | `                                value={s.assignee_id || "none"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1450 | `                                onValueChange={(v) => updateSubtaskAssignee(s, v)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1451 | `                              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1452 | `                                <SelectTrigger className="h-8">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1453 | `                                  <SelectValue placeholder="Ninguém" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1454 | `                                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1455 | `                                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1456 | `                                  <SelectItem value="none">Ninguém</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1457 | `                                  {assignableProfiles.map((p) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1458 | `                                    <SelectItem key={p.id} value={p.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1459 | `                                      <AssigneeOption profile={p} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1460 | `                                    </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1461 | `                                  ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1462 | `                                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1463 | `                              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1464 | `                              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1465 | `                                type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1466 | `                                variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1467 | `                                size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1468 | `                                className="h-8 w-8 shrink-0"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1469 | `                                title="Abrir subtarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1470 | `                                onClick={() => openSubtaskDialog(s)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1471 | `                              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1472 | `                                <Pencil className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1473 | `                                <span className="sr-only">Abrir subtarefa</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1474 | `                              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1475 | `                            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1476 | `                          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1477 | `                          <div className="space-y-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1478 | `                            <Label className="text-[10px] text-muted-foreground">Anotações</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1479 | `                            <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1480 | `                              rows={2}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1481 | `                              defaultValue={s.notes ?? ""}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1482 | `                              onBlur={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1483 | `                                if ((e.target.value || "") !== (s.notes ?? ""))` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1484 | `                                  void updateSubtaskNotes(s, e.target.value);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1485 | `                              }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1486 | `                              placeholder="Notas desta subtarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1487 | `                              className="text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1488 | `                            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1489 | `                          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1490 | `                          <div className="space-y-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1491 | `                            <Label className="text-[10px] text-muted-foreground">Arquivos</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1492 | `                            {files.map((a) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1493 | `                              <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1494 | `                                key={a.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1495 | `                                className="flex items-center gap-2 rounded border bg-background px-2 py-1 text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1496 | `                              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1497 | `                                <Paperclip className="h-3 w-3 text-muted-foreground" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1498 | `                                <span className="flex-1 truncate">{a.file_name}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1499 | `                                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1500 | `                                  size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1501 | `                                  variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1502 | `                                  className="h-6 w-6"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1503 | `                                  onClick={() => downloadSubFile(a)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1504 | `                                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1505 | `                                  <Download className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1506 | `                                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1507 | `                                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1508 | `                                  size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1509 | `                                  variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1510 | `                                  className="h-6 w-6"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1511 | `                                  onClick={() => deleteSubFile(a)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1512 | `                                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1513 | `                                  <X className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1514 | `                                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1515 | `                              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1516 | `                            ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1517 | `                            <FileDropZone` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1518 | `                              onFiles={async (files) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1519 | `                                for (const file of Array.from(files)) await uploadSubFile(s, file);` | Inicia uma repeticao sobre dados ou condicoes. |
| 1520 | `                              }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1521 | `                            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1522 | `                              <label className="flex cursor-pointer items-center justify-center gap-2 rounded border border-dashed py-1.5 text-[11px] text-muted-foreground hover:bg-muted/40">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1523 | `                                <Paperclip className="h-3 w-3" /> Anexar arquivo` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1524 | `                                <input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1525 | `                                  type="file"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1526 | `                                  multiple` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1527 | `                                  className="hidden"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1528 | `                                  onChange={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1529 | `                                    const files = e.target.files;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1530 | `                                    if (files)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1531 | `                                      void (async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1532 | `                                        for (const file of Array.from(files))` | Inicia uma repeticao sobre dados ou condicoes. |
| 1533 | `                                          await uploadSubFile(s, file);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 1534 | `                                      })();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1535 | `                                    e.target.value = "";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1536 | `                                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1537 | `                                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1538 | `                              </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1539 | `                            </FileDropZone>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1540 | `                          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1541 | `                        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1542 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1543 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1544 | `                  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1545 | `                })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1546 | `                <div className="flex flex-wrap gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1547 | `                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1548 | `                    placeholder="Nova subtarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1549 | `                    value={newSubtask}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1550 | `                    onChange={(e) => setNewSubtask(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1551 | `                    onKeyDown={(e) => e.key === "Enter" && addSubtask()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1552 | `                    className="min-w-[180px] flex-1"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1553 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1554 | `                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1555 | `                    type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1556 | `                    value={newSubtaskDue}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1557 | `                    onChange={(e) => setNewSubtaskDue(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1558 | `                    className="w-52"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1559 | `                    title="Prazo (opcional)"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1560 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1561 | `                  <div className="flex gap-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1562 | `                    <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1563 | `                      value={newSubtaskAssignee || "none"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1564 | `                      onValueChange={(v) => setNewSubtaskAssignee(v === "none" ? "" : v)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1565 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1566 | `                      <SelectTrigger className="w-44" title="Responsável (opcional)">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1567 | `                        <SelectValue placeholder="Responsável" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1568 | `                      </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1569 | `                      <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1570 | `                        <SelectItem value="none">Sem responsável</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1571 | `                        {assignableProfiles.map((p) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1572 | `                          <SelectItem key={p.id} value={p.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1573 | `                            <AssigneeOption profile={p} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1574 | `                          </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1575 | `                        ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1576 | `                      </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1577 | `                    </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1578 | `                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1579 | `                      type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1580 | `                      variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1581 | `                      size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1582 | `                      className="shrink-0"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1583 | `                      title="Abrir editor completo da subtarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1584 | `                      onClick={() => void openNewSubtaskDialog()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1585 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1586 | `                      <Pencil className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1587 | `                      <span className="sr-only">Abrir editor completo da subtarefa</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1588 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1589 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1590 | `                  <Button onClick={addSubtask} size="icon">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1591 | `                    <Plus className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1592 | `                  </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1593 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1594 | `                <p className="text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1595 | `                  Defina responsável e prazo já ao criar. Use a seta para editar anotações e anexar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1596 | `                  arquivos.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1597 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1598 | `              </TabsContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1599 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1600 | `              <TabsContent value="comments" className="space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1601 | `                <div className="max-h-80 space-y-3 overflow-y-auto rounded-md border bg-muted/10 p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1602 | `                  {comments.length === 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1603 | `                    <p className="py-6 text-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1604 | `                      Ainda não há mensagens nesta tarefa.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1605 | `                    </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1606 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1607 | `                  {comments.map((comment) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1608 | `                    const author = profiles?.find(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1609 | `                      (candidate) => candidate.id === comment.author_id,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1610 | `                    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1611 | `                    const authorName = author?.full_name || author?.email || "Usuário";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1612 | `                    const isOwnComment = comment.author_id === user?.id;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1613 | `                    const mentionNames = mentionableProfiles` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1614 | `                      .map((candidate) => candidate.full_name || candidate.email)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1615 | `                      .filter((name): name is string => Boolean(name));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1616 | `                    const mentionParts = mentionNames.length` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1617 | `                      ? comment.body.split(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1618 | `                          new RegExp(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1619 | `                            \`(${mentionNames.map((name) => \`@${escapeRegExp(name)}\`).join("|")})\`,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1620 | `                            "gi",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1621 | `                          ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1622 | `                        )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1623 | `                      : [comment.body];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1624 | `                    return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1625 | `                      <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1626 | `                        key={comment.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1627 | `                        className={\`flex gap-2 ${isOwnComment ? "justify-end" : "justify-start"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1628 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1629 | `                        {!isOwnComment && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1630 | `                          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1631 | `                            {authorName.slice(0, 2).toUpperCase()}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1632 | `                          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1633 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1634 | `                        <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1635 | `                          className={\`group max-w-[85%] rounded-lg px-3 py-2 text-sm ${isOwnComment ? "bg-primary text-primary-foreground" : "bg-muted"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1636 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1637 | `                          <div className="mb-1 flex items-center gap-2 text-[11px] opacity-75">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1638 | `                            <span className="font-medium">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1639 | `                              {isOwnComment ? "Você" : authorName}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1640 | `                            </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1641 | `                            <span>{format(new Date(comment.created_at), "dd/MM HH:mm")}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1642 | `                            {(isOwnComment || isAdmin) && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1643 | `                              <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1644 | `                                type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1645 | `                                className="ml-auto opacity-0 transition-opacity group-hover:opacity-100"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1646 | `                                onClick={() => deleteComment(comment.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1647 | `                                title="Excluir mensagem"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1648 | `                              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1649 | `                                <X className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1650 | `                              </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1651 | `                            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1652 | `                          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1653 | `                          <p className="whitespace-pre-wrap break-words">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1654 | `                            {mentionParts.map((part, index) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1655 | `                              part.startsWith("@") ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1656 | `                                <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1657 | `                                  key={index}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1658 | `                                  className={` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1659 | `                                    isOwnComment` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1660 | `                                      ? "font-semibold underline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1661 | `                                      : "font-semibold text-primary"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1662 | `                                  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1663 | `                                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1664 | `                                  {part}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1665 | `                                </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1666 | `                              ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1667 | `                                part` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1668 | `                              ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1669 | `                            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1670 | `                          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1671 | `                        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1672 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1673 | `                    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1674 | `                  })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1675 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1676 | `                <div className="relative rounded-md border bg-background p-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1677 | `                  <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1678 | `                    rows={3}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1679 | `                    placeholder="Escreva uma mensagem… Use @ para marcar alguém."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1680 | `                    value={newComment}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1681 | `                    onChange={(event) => setNewComment(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1682 | `                    onKeyDown={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1683 | `                      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1684 | `                        event.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1685 | `                        void addComment();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1686 | `                      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1687 | `                    }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1688 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1689 | `                  {mentionCandidates.length > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1690 | `                    <div className="absolute bottom-[calc(100%+4px)] left-2 z-10 w-64 overflow-hidden rounded-md border bg-popover p-1 shadow-md">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1691 | `                      {mentionCandidates.map((candidate) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1692 | `                        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1693 | `                          key={candidate.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1694 | `                          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1695 | `                          className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1696 | `                          onMouseDown={(event) => event.preventDefault()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1697 | `                          onClick={() => insertMention(candidate)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1698 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1699 | `                          <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-[9px] font-semibold text-primary">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1700 | `                            {(candidate.full_name || candidate.email || "U")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1701 | `                              .slice(0, 2)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1702 | `                              .toUpperCase()}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1703 | `                          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1704 | `                          <span className="truncate">{candidate.full_name || candidate.email}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1705 | `                        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1706 | `                      ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1707 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1708 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1709 | `                  <div className="mt-2 flex flex-nowrap items-center justify-between gap-2 overflow-x-auto">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1710 | `                    <div className="flex shrink-0 items-center gap-1 whitespace-nowrap">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1711 | `                      <SmilePlus className="h-4 w-4 text-muted-foreground" aria-hidden="true" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1712 | `                      {MESSAGE_EMOJIS.map((emoji) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1713 | `                        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1714 | `                          key={emoji}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1715 | `                          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1716 | `                          className="rounded p-1 text-base leading-none hover:bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1717 | `                          onClick={() => setNewComment((current) => \`${current}${emoji}\`)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1718 | `                          title={\`Adicionar ${emoji}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1719 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1720 | `                          {emoji}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1721 | `                        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1722 | `                      ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1723 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1724 | `                    <span className="text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1725 | `                      Use @ para marcar alguém · Ctrl/⌘ + Enter para enviar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1726 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1727 | `                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1728 | `                      onClick={() => void addComment()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1729 | `                      size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1730 | `                      disabled={!newComment.trim()}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1731 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1732 | `                      <Send className="mr-1 h-4 w-4" /> Enviar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1733 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1734 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1735 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1736 | `              </TabsContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1737 | `              <TabsContent value="files" className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1738 | `                {attachments.map((a) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1739 | `                  <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1740 | `                    key={a.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1741 | `                    className="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1742 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1743 | `                    {a.mime_type === LINK_MIME ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1744 | `                      <Link2 className="h-4 w-4 text-muted-foreground" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1745 | `                    ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1746 | `                      <Paperclip className="h-4 w-4 text-muted-foreground" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1747 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1748 | `                    <span className="flex-1 truncate text-sm">{a.file_name}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1749 | `                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1750 | `                      size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1751 | `                      variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1752 | `                      className="h-7 w-7"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1753 | `                      onClick={() => openAttachment(a)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1754 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1755 | `                      <ExternalLink className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1756 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1757 | `                    {a.mime_type !== LINK_MIME && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1758 | `                      <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1759 | `                        size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1760 | `                        variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1761 | `                        className="h-7 w-7"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1762 | `                        onClick={() => downloadAttachment(a)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1763 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1764 | `                        <Download className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1765 | `                      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1766 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1767 | `                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1768 | `                      size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1769 | `                      variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1770 | `                      className="h-7 w-7"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1771 | `                      onClick={() => deleteAttachment(a)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1772 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1773 | `                      <X className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1774 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1775 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1776 | `                ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1777 | `                <FileDropZone onFiles={uploadFiles} disabled={!!fileUploadProgress}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1778 | `                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed py-3 text-sm text-muted-foreground hover:bg-muted/40">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1779 | `                    <Paperclip className="h-4 w-4" />{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1780 | `                    {fileUploadProgress` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1781 | `                      ? \`Enviando ${fileUploadProgress.current}/${fileUploadProgress.total}…\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1782 | `                      : \`Anexar arquivos (até ${MAX_TASK_ATTACHMENT_LABEL} cada)\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1783 | `                    <input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1784 | `                      type="file"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1785 | `                      multiple` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1786 | `                      className="hidden"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1787 | `                      disabled={!!fileUploadProgress}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1788 | `                      onChange={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1789 | `                        const files = e.target.files;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1790 | `                        if (files) void uploadFiles(files);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1791 | `                        e.target.value = "";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1792 | `                      }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1793 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1794 | `                  </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1795 | `                </FileDropZone>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1796 | `              </TabsContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1797 | `            </Tabs>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1798 | `          }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1799 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1800 | `          <div className="flex justify-between gap-2 pt-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1801 | `            <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1802 | `              {currentTaskId && canDeleteTask && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1803 | `                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1804 | `                  variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1805 | `                  onClick={remove}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1806 | `                  className="text-destructive hover:text-destructive"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1807 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1808 | `                  <Trash2 className="mr-2 h-4 w-4" /> Excluir` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1809 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1810 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1811 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1812 | `            <div className="flex gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1813 | `              <Button variant="outline" onClick={() => onOpenChange(false)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1814 | `                Cancelar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1815 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1816 | `              <Button onClick={save} disabled={saving}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1817 | `                {saving ? "Salvando…" : "Salvar"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1818 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1819 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1820 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1821 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1822 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1823 | `        <AttachmentPreviewDialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1824 | `          open={!!previewAttachment}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1825 | `          onOpenChange={(open) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1826 | `            if (!open) setPreviewAttachment(null);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1827 | `          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1828 | `          attachment={previewAttachment}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1829 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1830 | `        <SubtaskDialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1831 | `          open={subtaskDialogOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1832 | `          onOpenChange={setSubtaskDialogOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1833 | `          taskId={currentTaskId}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1834 | `          workspaceId={targetWorkspaceId || activeWorkspace?.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1835 | `          subtask={subtaskInDialog}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1836 | `          position={subtasks.length}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1837 | `          defaults={{` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1838 | `            title: newSubtask,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1839 | `            dueDate: newSubtaskDue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1840 | `            assigneeId: newSubtaskAssignee,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1841 | `          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1842 | `          onSaved={handleSubtaskDialogSaved}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1843 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1844 | `        <Dialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1845 | `          open={subDueReason.open}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1846 | `          onOpenChange={(nextOpen) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1847 | `            if (!nextOpen && !subDueSaving) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1848 | `              setSubDueReason({ open: false, subtask: null, next: null, reason: "" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1849 | `            }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1850 | `          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1851 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1852 | `          <DialogContent className="max-w-md">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1853 | `            <DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1854 | `              <DialogTitle>Justificar alteração do prazo</DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1855 | `            </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1856 | `            <div className="space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1857 | `              <div className="rounded-md border bg-muted/40 p-3 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1858 | `                <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1859 | `                  <strong>Prazo anterior:</strong>{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1860 | `                  {subDueReason.subtask?.due_date` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1861 | `                    ? format(new Date(subDueReason.subtask.due_date), "dd/MM/yyyy")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1862 | `                    : "sem prazo"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1863 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1864 | `                <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1865 | `                  <strong>Novo prazo:</strong>{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1866 | `                  {subDueReason.next` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1867 | `                    ? format(new Date(subDueReason.next), "dd/MM/yyyy")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1868 | `                    : "sem prazo"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1869 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1870 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1871 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1872 | `                <Label htmlFor="subtask-due-reason">Justificativa *</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1873 | `                <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1874 | `                  id="subtask-due-reason"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1875 | `                  value={subDueReason.reason}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1876 | `                  onChange={(event) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1877 | `                    setSubDueReason((current) => ({ ...current, reason: event.target.value }))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1878 | `                  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1879 | `                  placeholder="Explique o motivo da alteração"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1880 | `                  rows={3}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1881 | `                  autoFocus` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1882 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1883 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1884 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1885 | `            <DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1886 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1887 | `                type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1888 | `                variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1889 | `                disabled={subDueSaving}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1890 | `                onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1891 | `                  setSubDueReason({ open: false, subtask: null, next: null, reason: "" })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1892 | `                }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1893 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1894 | `                Cancelar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1895 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1896 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1897 | `                type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1898 | `                disabled={subDueSaving || !subDueReason.reason.trim()}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1899 | `                onClick={async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1900 | `                  const subtask = subDueReason.subtask;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1901 | `                  if (!subtask) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1902 | `                  const saved = await applySubtaskDue(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1903 | `                    subtask,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1904 | `                    subDueReason.next,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1905 | `                    subDueReason.reason,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1906 | `                  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1907 | `                  if (saved) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1908 | `                    setSubDueReason({ open: false, subtask: null, next: null, reason: "" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1909 | `                  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1910 | `                }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1911 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1912 | `                {subDueSaving ? "Salvando..." : "Salvar alteração"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1913 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1914 | `            </DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1915 | `          </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1916 | `        </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1917 | `      </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1918 | `    </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1919 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1920 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1921 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
