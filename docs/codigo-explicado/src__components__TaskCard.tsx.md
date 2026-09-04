# src/components/TaskCard.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { useEffect, useMemo, useRef, useState, type HTMLAttributes } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useQuery, useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `  AlignLeft,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 5 | `  ArrowDown,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 6 | `  ArrowUp,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `  Calendar as CalendarIcon,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `  Clock3,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `  ChevronDown,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `  ChevronRight,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `  Check,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `  CheckCircle2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `  Copy,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  FileText,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  Flag,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  Image as ImageIcon,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  Link2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  History,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  ListChecks,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  MessageCircle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `  MoreHorizontal,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `  Paperclip,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `  Pencil,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  Plus,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `  Tag as TagIcon,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `  Trash2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `  Upload,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `  User as UserIcon,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `  Users,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  X,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `} from "lucide-react";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `import { format } from "date-fns";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 33 | `import { ptBR } from "date-fns/locale";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 34 | `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 35 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 36 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 37 | `import { Label } from "@/components/ui/label";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 38 | `import { Textarea } from "@/components/ui/textarea";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 39 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 40 | `  Dialog,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `  DialogContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `  DialogHeader,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `  DialogTitle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `  DialogFooter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `} from "@/components/ui/dialog";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 47 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 48 | `  Select,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `  SelectContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `  SelectItem,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `  SelectTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `  SelectValue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `} from "@/components/ui/select";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `import { AttachmentPreviewDialog } from "@/components/AttachmentPreviewDialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 55 | `import { FileDropZone } from "@/components/FileDropZone";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 56 | `import { isTaskAttachmentTooLarge, MAX_TASK_ATTACHMENT_LABEL } from "@/lib/attachment-limits";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 57 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 58 | `  removeTaskAttachmentAndClientCopy,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 59 | `  syncTaskAttachmentToClient,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `} from "@/lib/sync-task-attachment-to-client";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 62 | `import { RichTextEditor, RichTextView } from "@/components/RichTextEditor";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 63 | `import { SubtaskDialog, type EditableSubtask } from "@/components/SubtaskDialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 64 | `import { CommentAttachments } from "@/components/CommentAttachments";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 65 | `import { TaskConversationDialog } from "@/components/TaskConversationDialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 66 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 67 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 68 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 69 | `  useAssignableProfiles,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `  useRelatedClients,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `  type Client,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 72 | `  type KanbanColumn,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 73 | `  type Profile,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 74 | `  type Task,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 75 | `  type TaskCollaborator,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 76 | `  type TaskStatus,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 77 | `  type TaskTag,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 78 | `} from "@/hooks/use-data";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `import { useBoardPreferences, type CardField } from "@/hooks/use-board-preferences";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 80 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 81 | `import { cn } from "@/lib/utils";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 82 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 83 | `interface Attachment {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 84 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `  task_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `  file_name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `  storage_path: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `  mime_type: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `  size_bytes: number | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 92 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 93 | `interface Subtask {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 94 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 95 | `  task_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 96 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 97 | `  done: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 98 | `  position: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `  comment_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 100 | `  due_date: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 101 | `  completed_at: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `  assignee_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `  notes: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 104 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 105 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 106 | `interface CardComment {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 107 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 108 | `  task_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `  title: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `  body: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `  position: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 114 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 115 | `const LINK_MIME = "text/uri-list";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 116 | `const DESCRIPTION_COLLAPSED_LIMIT = 140;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 117 | `const DEFAULT_DEADLINE_TIME = "12:00";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 118 | `const formatDueTime = (time: string | null) => time?.slice(0, 5) ?? null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 119 | `const hasExplicitDueTime = (time: string | null) => Boolean(formatDueTime(time));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 120 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 121 | `interface Props {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 122 | `  task: Task;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `  columns?: KanbanColumn[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `  clients?: Client[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `  profiles?: Profile[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `  tags?: TaskTag[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `  statuses?: TaskStatus[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `  collaborators?: TaskCollaborator[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `  onEdit?: () => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 130 | `  onDuplicate?: () => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 131 | `  dragHandleProps?: HTMLAttributes<HTMLDivElement>;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `  minimal?: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 133 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 134 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 135 | `const PRIORITY_LABELS: Record<NonNullable<Task["priority"]>, { label: string; color: string }> = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 136 | `  low: { label: "Baixa", color: "#64748b" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `  medium: { label: "Média", color: "#3b82f6" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `  high: { label: "Alta", color: "#f59e0b" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 139 | `  urgent: { label: "Urgente", color: "#ef4444" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 141 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 142 | `function stop(e: { stopPropagation: () => void }) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 143 | `  e.stopPropagation();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 144 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 145 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 146 | `/* Contrast helper — returns white or black depending on bg brightness */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 147 | `function readableText(hex: string) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 148 | `  const m = hex.replace("#", "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 149 | `  const full =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 150 | `    m.length === 3` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 151 | `      ? m` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `          .split("")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 153 | `          .map((c) => c + c)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 154 | `          .join("")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 155 | `      : m;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `  const r = parseInt(full.slice(0, 2), 16);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 157 | `  const g = parseInt(full.slice(2, 4), 16);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 158 | `  const b = parseInt(full.slice(4, 6), 16);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 159 | `  const yiq = (r * 299 + g * 587 + b * 114) / 1000;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 160 | `  return yiq >= 160 ? "#0a0a0a" : "#ffffff";` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 161 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 162 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 163 | `export function TaskCard({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 164 | `  task,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 165 | `  columns = [],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 166 | `  clients = [],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 167 | `  profiles = [],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 168 | `  tags = [],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 169 | `  statuses = [],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 170 | `  collaborators = [],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 171 | `  onEdit,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 172 | `  onDuplicate,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 173 | `  dragHandleProps,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `  minimal = false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 175 | `}: Props) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 176 | `  const qc = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 177 | `  const { user, profile, isAdmin } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 178 | `  const fileRef = useRef<HTMLInputElement>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 179 | `  const descTextareaRef = useRef<HTMLTextAreaElement>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 180 | `  const [attachments, setAttachments] = useState<Attachment[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 181 | `  const [fileUploadProgress, setFileUploadProgress] = useState<{` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 182 | `    current: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 183 | `    total: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 184 | `  } | null>(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 185 | `  const [thumbs, setThumbs] = useState<Record<string, string>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 186 | `  const [titleEditing, setTitleEditing] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 187 | `  const [titleDraft, setTitleDraft] = useState(task.title);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 188 | `  const [descEditing, setDescEditing] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 189 | `  const [descDraft, setDescDraft] = useState(task.description ?? "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 190 | `  const [descriptionExpanded, setDescriptionExpanded] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 191 | `  const [collaboratorsOpen, setCollaboratorsOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 192 | `  const [previewAttachment, setPreviewAttachment] = useState<Attachment | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 193 | `  const { data: assignableProfiles = [] } = useAssignableProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 194 | `  const [tagIds, setTagIds] = useState<string[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 195 | `  const [subtasks, setSubtasks] = useState<Subtask[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 196 | `  const [comments, setComments] = useState<CardComment[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 197 | `  const [conversationOpen, setConversationOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 198 | `  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 199 | `  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 200 | `  const [commentDraft, setCommentDraft] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 201 | `  const [editingSubtaskId, setEditingSubtaskId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 202 | `  const [subtaskDraft, setSubtaskDraft] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 203 | `  const [subtaskDialogOpen, setSubtaskDialogOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 204 | `  const [subtaskInDialog, setSubtaskInDialog] = useState<Subtask | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 205 | `  const canDeleteSubtask = (subtask: Subtask) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 206 | `    !!isAdmin || subtask.assignee_id !== user?.id || task.created_by === user?.id;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 207 | `  const [newSubtask, setNewSubtask] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 208 | `  const [addingSubtask, setAddingSubtask] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 209 | `  const [commentSubtaskDraft, setCommentSubtaskDraft] = useState<Record<string, string>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 210 | `  const [dueChange, setDueChange] = useState<{` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 211 | `    open: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 212 | `    pending: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 213 | `    pendingTime: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 214 | `    reason: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 215 | `  }>({ open: false, pending: null, pendingTime: null, reason: "" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 216 | `  const [historyOpen, setHistoryOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 217 | `  const { data: dueHistory = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 218 | `    queryKey: ["task_due_date_changes", task.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 219 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 220 | `      const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 221 | `        .from("task_due_date_changes")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 222 | `        .select("id, old_due_date, new_due_date, reason, created_at, user_id")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 223 | `        .eq("task_id", task.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 224 | `        .order("created_at", { ascending: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 225 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 226 | `      return (data ?? []) as Array<{` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 227 | `        id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 228 | `        old_due_date: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 229 | `        new_due_date: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 230 | `        reason: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 231 | `        created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 232 | `        user_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 233 | `      }>;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 234 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 235 | `    enabled: historyOpen,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 236 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 237 | `  const { data: prefs } = useBoardPreferences();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 238 | `  const hiddenFields = prefs?.hidden_fields ?? [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 239 | `  const fieldOrder = prefs?.field_order ?? [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 240 | `  const isVisible = (f: CardField) => !hiddenFields.includes(f);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 241 | `  const orderOf = (f: CardField) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 242 | `    const idx = fieldOrder.indexOf(f);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 243 | `    return idx === -1 ? 999 : idx;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 244 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 245 | `  const subtasksTitleKey = \`subtasks-title:${task.id}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 246 | `  const subtasksOpenKey = \`subtasks-open:${task.id}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 247 | `  const [subtasksTitle, setSubtasksTitle] = useState<string>(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 248 | `    if (typeof window === "undefined") return "Subtarefas";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 249 | `    return window.localStorage.getItem(subtasksTitleKey) || "Subtarefas";` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 250 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 251 | `  const [subtasksOpen, setSubtasksOpen] = useState<boolean>(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 252 | `    if (typeof window === "undefined") return true;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 253 | `    const v = window.localStorage.getItem(subtasksOpenKey);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 254 | `    return v === null ? true : v === "1";` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 255 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 256 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 257 | `    if (typeof window !== "undefined")` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 258 | `      window.localStorage.setItem(subtasksOpenKey, subtasksOpen ? "1" : "0");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 259 | `  }, [subtasksOpen, subtasksOpenKey]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 260 | `  const renameSubtasksTitle = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 261 | `    const next = window.prompt("Título da seção de subtarefas", subtasksTitle)?.trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 262 | `    if (!next) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 263 | `    setSubtasksTitle(next);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 264 | `    if (typeof window !== "undefined") window.localStorage.setItem(subtasksTitleKey, next);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 265 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 266 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 267 | `  useEffect(() => setTitleDraft(task.title), [task.title]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 268 | `  useEffect(() => setDescDraft(task.description ?? ""), [task.description]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 269 | `  // A expansão é local ao card: ao trocar/sair da tarefa ou recarregar, volta fechada.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 270 | `  useEffect(() => setDescriptionExpanded(false), [task.id]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 271 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 272 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 273 | `    let cancelled = false;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 274 | `    (async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 275 | `      const { data } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 276 | `        .from("attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 277 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 278 | `        .eq("task_id", task.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 279 | `        .order("created_at", { ascending: true });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 280 | `      if (cancelled) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 281 | `      const list = (data ?? []) as Attachment[];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 282 | `      setAttachments(list);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 283 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 284 | `      const next: Record<string, string> = {};` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 285 | `      await Promise.all(` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 286 | `        list` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 287 | `          .filter((a) => a.mime_type !== LINK_MIME && (a.mime_type?.startsWith("image/") ?? false))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 288 | `          .map(async (a) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 289 | `            const { data: signed } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 290 | `              .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 291 | `              .createSignedUrl(a.storage_path, 3600);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 292 | `            if (signed) next[a.id] = signed.signedUrl;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 293 | `          }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 294 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 295 | `      if (!cancelled) setThumbs(next);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 296 | `    })();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 297 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 298 | `      cancelled = true;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 299 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 300 | `  }, [task.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 301 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 302 | `  const [subsRefreshTick, setSubsRefreshTick] = useState(0);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 303 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 304 | `    const cache = qc.getQueryCache();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 305 | `    const unsub = cache.subscribe((event: any) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 306 | `      if (event?.type !== "updated") return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 307 | `      const key = event.query?.queryKey?.[0];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 308 | `      if (key === "subtasks" || key === "tasks") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 309 | `        setSubsRefreshTick((n) => n + 1);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 310 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 311 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 312 | `    return () => unsub();` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 313 | `  }, [qc]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 314 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 315 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 316 | `    let cancelled = false;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 317 | `    (async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 318 | `      const [{ data: links }, { data: subs }, { data: notes }] = await Promise.all([` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 319 | `        supabase.from("task_tag_links").select("tag_id").eq("task_id", task.id),` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 320 | `        supabase` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 321 | `          .from("subtasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 322 | `          .select(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 323 | `            "id, task_id, title, done, position, comment_id, due_date, completed_at, assignee_id, notes",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 324 | `          )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 325 | `          .eq("task_id", task.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 326 | `          .order("position"),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 327 | `        supabase` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 328 | `          .from("comments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 329 | `          .select("id, task_id, title, body, created_at, position")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 330 | `          .eq("task_id", task.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 331 | `          .order("position", { ascending: true })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 332 | `          .order("created_at", { ascending: true }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 333 | `      ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 334 | `      if (cancelled) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 335 | `      setTagIds(((links ?? []) as { tag_id: string }[]).map((l) => l.tag_id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 336 | `      setSubtasks((subs ?? []) as Subtask[]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 337 | `      setComments((notes ?? []) as CardComment[]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 338 | `    })();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 339 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 340 | `      cancelled = true;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 341 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 342 | `  }, [task.id, subsRefreshTick]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 343 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 344 | `  const selectedTags = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 345 | `    () => tagIds.map((id) => tags.find((t) => t.id === id)).filter(Boolean) as TaskTag[],` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 346 | `    [tagIds, tags],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 347 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 348 | `  // O cliente pode ser do outro ambiente, quando a tarefa foi lançada para lá.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 349 | `  // Nesse caso ele não está na lista do ambiente ativo, e o nome vem da consulta` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 350 | `  // de exibição.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 351 | `  const { data: relatedClients } = useRelatedClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 352 | `  const client = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 353 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 354 | `      clients.find((c) => c.id === task.client_id) ??` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 355 | `      relatedClients?.find((c) => c.id === task.client_id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 356 | `    [clients, relatedClients, task.client_id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 357 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 358 | `  const assignee = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 359 | `    () => profiles.find((p) => p.id === task.assignee_id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 360 | `    [profiles, task.assignee_id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 361 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 362 | `  const taskCollaborators = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 363 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 364 | `      collaborators` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 365 | `        .filter((collaborator) => collaborator.task_id === task.id)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 366 | `        .map((collaborator) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 367 | `          profiles.find((profile) => profile.id === collaborator.collaborator_id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 368 | `        )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 369 | `        .filter((profile): profile is Profile => Boolean(profile))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 370 | `        .filter((profile) => assignableProfiles.some((assignable) => assignable.id === profile.id)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 371 | `    [assignableProfiles, collaborators, profiles, task.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 372 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 373 | `  const taskPeople = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 374 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 375 | `      [assignee, ...taskCollaborators].filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 376 | `        (profile, index, people): profile is Profile =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 377 | `          Boolean(profile) && people.findIndex((person) => person?.id === profile?.id) === index,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 378 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 379 | `    [assignee, taskCollaborators],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 380 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 381 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 382 | `  const toggleCollaborator = async (collaboratorId: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 383 | `    const existing = collaborators.find(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 384 | `      (collaborator) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 385 | `        collaborator.task_id === task.id && collaborator.collaborator_id === collaboratorId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 386 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 387 | `    const queryKey = ["task_collaborators"];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 388 | `    if (existing) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 389 | `      const { error } = await (supabase.from("task_collaborators") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 390 | `        .delete()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 391 | `        .eq("task_id", task.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 392 | `        .eq("collaborator_id", collaboratorId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 393 | `      if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 394 | `      qc.setQueryData<TaskCollaborator[]>(queryKey, (current = []) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 395 | `        current.filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 396 | `          (collaborator) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 397 | `            !(collaborator.task_id === task.id && collaborator.collaborator_id === collaboratorId),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 398 | `        ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 399 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 400 | `    } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 401 | `      const { data, error } = await (supabase.from("task_collaborators") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 402 | `        .insert({ task_id: task.id, collaborator_id: collaboratorId, added_by: user?.id ?? null })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 403 | `        .select("task_id, collaborator_id, added_by, created_at")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 404 | `        .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 405 | `      if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 406 | `      qc.setQueryData<TaskCollaborator[]>(queryKey, (current = []) => [` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 407 | `        ...current,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 408 | `        data as TaskCollaborator,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 409 | `      ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 410 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 411 | `    qc.invalidateQueries({ queryKey });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 412 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 413 | `  const creator = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 414 | `    () => profiles.find((p) => p.id === task.created_by),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 415 | `    [profiles, task.created_by],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 416 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 417 | `  const creatorName =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 418 | `    creator?.full_name ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 419 | `    creator?.email ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 420 | `    (task.created_by === user?.id ? profile?.full_name || user.email : null) ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 421 | `    "Usuário não identificado";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 422 | `  const assigner = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 423 | `    () => profiles.find((p) => p.id === task.assigned_by),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 424 | `    [profiles, task.assigned_by],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 425 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 426 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 427 | `  const update = async (patch: Partial<Task>) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 428 | `    const { error } = await supabase.from("tasks").update(patch).eq("id", task.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 429 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 430 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 431 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 432 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 433 | `    void qc.invalidateQueries({ queryKey: ["tasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 434 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 435 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 436 | `  const saveTitle = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 437 | `    const next = titleDraft.trim() || "Sem título";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 438 | `    setTitleEditing(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 439 | `    if (next === task.title) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 440 | `    await update({ title: next });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 441 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 442 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 443 | `  const saveDesc = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 444 | `    setDescEditing(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 445 | `    const next = descDraft.trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 446 | `    const current = task.description ?? "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 447 | `    if (next === current) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 448 | `    await update({ description: next || null });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 449 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 450 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 451 | `  const foldSelectedDescription = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 452 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 453 | `    const el = descTextareaRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 454 | `    const start = el?.selectionStart ?? 0;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 455 | `    const end = el?.selectionEnd ?? 0;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 456 | `    const selected = descDraft.slice(start, end).trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 457 | `    if (!selected || start === end) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 458 | `      toast.error("Selecione o texto que deseja transformar em seção dobrável");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 459 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 460 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 461 | `    const suggested = selected.split("\n").find(Boolean)?.slice(0, 60) ?? "Anotação";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 462 | `    const title = window.prompt("Título da seção dobrável", suggested)?.trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 463 | `    if (!title) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 464 | `    const nextDescription = \`${descDraft.slice(0, start)}${descDraft.slice(end)}\`.trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 465 | `    const nextPos = comments.reduce((m, c) => Math.max(m, c.position ?? 0), -1) + 1;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 466 | `    const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 467 | `      .from("comments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 468 | `      .insert({ task_id: task.id, author_id: user.id, title, body: selected, position: nextPos })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 469 | `      .select("id, task_id, title, body, created_at, position")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 470 | `      .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 471 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 472 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 473 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 474 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 475 | `    setComments((current) => [...current, data as CardComment]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 476 | `    setOpenComments((current) => ({ ...current, [(data as CardComment).id]: true }));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 477 | `    setDescDraft(nextDescription);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 478 | `    await update({ description: nextDescription || null });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 479 | `    setDescEditing(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 480 | `    toast.success("Seção dobrável criada");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 481 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 482 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 483 | `  const uploadFile = async (file: File): Promise<boolean> => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 484 | `    if (!user) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 485 | `    if (isTaskAttachmentTooLarge(file)) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 486 | `      toast.error(\`${file.name} ultrapassa o limite de ${MAX_TASK_ATTACHMENT_LABEL} por arquivo.\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 487 | `      return false;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 488 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 489 | `    const safe =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 490 | `      file.name` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 491 | `        .normalize("NFD")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 492 | `        .replace(/[\u0300-\u036f]/g, "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 493 | `        .replace(/[^a-zA-Z0-9._-]+/g, "_")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 494 | `        .replace(/_+/g, "_")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 495 | `        .slice(-120) || "arquivo";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 496 | `    const path = \`${task.id}/${Date.now()}-${safe}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 497 | `    const contentType = file.type || "application/octet-stream";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 498 | `    const { error: upErr } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 499 | `      .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 500 | `      .upload(path, file, { contentType, upsert: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 501 | `    if (upErr) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 502 | `      toast.error(\`${file.name}: ${upErr.message}\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 503 | `      return false;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 504 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 505 | `    const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 506 | `      .from("attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 507 | `      .insert({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 508 | `        task_id: task.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 509 | `        file_name: file.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 510 | `        storage_path: path,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 511 | `        mime_type: contentType,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 512 | `        size_bytes: file.size,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 513 | `        uploaded_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 514 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 515 | `      .select()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 516 | `      .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 517 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 518 | `      await supabase.storage.from("task-attachments").remove([path]);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 519 | `      toast.error(\`${file.name}: ${error.message}\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 520 | `      return false;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 521 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 522 | `    const att = data as Attachment;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 523 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 524 | `      await syncTaskAttachmentToClient({` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 525 | `        file,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 526 | `        taskId: task.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 527 | `        sourceAttachmentId: att.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 528 | `        sourceStoragePath: path,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 529 | `        uploadedBy: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 530 | `        contentType,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 531 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 532 | `    } catch (syncError) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 533 | `      await supabase.from("attachments").delete().eq("id", att.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 534 | `      await supabase.storage.from("task-attachments").remove([path]);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 535 | `      toast.error(\`${file.name}: não foi possível salvar o arquivo do cliente.\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 536 | `      console.error("Could not sync task attachment to client files", syncError);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 537 | `      return false;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 538 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 539 | `    setAttachments((c) => [...c, att]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 540 | `    if (att.mime_type?.startsWith("image/")) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 541 | `      const { data: signed } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 542 | `        .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 543 | `        .createSignedUrl(att.storage_path, 3600);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 544 | `      if (signed) setThumbs((c) => ({ ...c, [att.id]: signed.signedUrl }));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 545 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 546 | `    return true;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 547 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 548 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 549 | `  const uploadFiles = async (files: FileList) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 550 | `    const selectedFiles = Array.from(files);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 551 | `    if (!selectedFiles.length || fileUploadProgress) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 552 | `    const oversizedFiles = selectedFiles.filter(isTaskAttachmentTooLarge);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 553 | `    if (oversizedFiles.length) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 554 | `      toast.error(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 555 | `        \`${oversizedFiles.length} ${oversizedFiles.length === 1 ? "arquivo ultrapassa" : "arquivos ultrapassam"} o limite de ${MAX_TASK_ATTACHMENT_LABEL} por arquivo.\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 556 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 557 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 558 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 559 | `    let uploaded = 0;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 560 | `    setFileUploadProgress({ current: 0, total: selectedFiles.length });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 561 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 562 | `      for (const [index, file] of selectedFiles.entries()) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 563 | `        setFileUploadProgress({ current: index + 1, total: selectedFiles.length });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 564 | `        if (await uploadFile(file)) uploaded += 1;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 565 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 566 | `      if (uploaded === selectedFiles.length) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 567 | `        toast.success(\`${uploaded} ${uploaded === 1 ? "arquivo enviado" : "arquivos enviados"}\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 568 | `      } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 569 | `        toast.error(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 570 | `          \`${uploaded} de ${selectedFiles.length} arquivos foram enviados. Tente novamente os restantes.\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 571 | `        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 572 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 573 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 574 | `      setFileUploadProgress(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 575 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 576 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 577 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 578 | `  const deleteAttachment = async (a: Attachment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 579 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 580 | `      await removeTaskAttachmentAndClientCopy(a.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 581 | `      setAttachments((c) => c.filter((x) => x.id !== a.id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 582 | `    } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 583 | `      toast.error(error instanceof Error ? error.message : "Não foi possível excluir o arquivo.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 584 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 585 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 586 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 587 | `  const openAttachment = (a: Attachment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 588 | `    if (a.mime_type === LINK_MIME) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 589 | `      window.open(a.storage_path, "_blank", "noopener,noreferrer");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 590 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 591 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 592 | `    setPreviewAttachment(a);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 593 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 594 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 595 | `  const dueDate = task.due_date ? new Date(task.due_date) : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 596 | `  const dueTime = formatDueTime(task.due_time);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 597 | `  const dueHasTime = Boolean(dueTime);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 598 | `  const dueMoment =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 599 | `    dueDate && dueTime ? new Date(\`${format(dueDate, "yyyy-MM-dd")}T${dueTime}:00\`) : dueDate;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 600 | `  const dueLabel = dueDate` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 601 | `    ? \`${format(dueDate, "dd MMM", { locale: ptBR })}${dueHasTime ? \` · ${dueTime}\` : ""}\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 602 | `    : null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 603 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 604 | `  const dueMeta = (() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 605 | `    if (!dueDate || task.status === "done") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 606 | `      return { state: "none" as const, label: "Prazo", days: 0, subtext: dueLabel ?? "Definir" };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 607 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 608 | `    const now = new Date();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 609 | `    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 610 | `    const startOfDue = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 611 | `    const diffMs = startOfDue.getTime() - startOfToday.getTime();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 612 | `    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 613 | `    if (diffDays < 0) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 614 | `      const overdueDays = Math.abs(diffDays);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 615 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 616 | `        state: "overdue" as const,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 617 | `        label: overdueDays === 1 ? "Atrasado 1 dia" : \`Atrasado ${overdueDays} dias\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 618 | `        days: overdueDays,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 619 | `        subtext: dueLabel,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 620 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 621 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 622 | `    if (diffDays === 0) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 623 | `      if (dueHasTime) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 624 | `        if (dueMoment && dueMoment.getTime() < now.getTime()) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 625 | `          const overdueMinutes = Math.max(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 626 | `            1,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 627 | `            Math.floor((now.getTime() - dueMoment.getTime()) / 60_000),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 628 | `          );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 629 | `          const overdueHours = Math.floor(overdueMinutes / 60);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 630 | `          const remainingMinutes = overdueMinutes % 60;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 631 | `          const overdueLabel =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 632 | `            overdueHours === 0` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 633 | `              ? \`Atrasado h\u00e1 ${overdueMinutes} min\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 634 | `              : \`Atrasado h\u00e1 ${overdueHours}h${remainingMinutes ? \` ${remainingMinutes} min\` : ""}\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 635 | `          return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 636 | `            state: "overdue" as const,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 637 | `            label: overdueLabel,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 638 | `            days: 0,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 639 | `            subtext: dueLabel,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 640 | `          };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 641 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 642 | `        return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 643 | `          state: "today" as const,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 644 | `          label: \`Vence às ${dueTime}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 645 | `          days: 0,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 646 | `          subtext: dueLabel,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 647 | `        };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 648 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 649 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 650 | `        state: "today" as const,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 651 | `        label: "Vence hoje",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 652 | `        days: 0,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 653 | `        subtext: dueLabel,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 654 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 655 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 656 | `    if (diffDays === 1) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 657 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 658 | `        state: "tomorrow" as const,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 659 | `        label: "Vence amanhã",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 660 | `        days: 1,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 661 | `        subtext: dueLabel,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 662 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 663 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 664 | `    if (diffDays <= 7) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 665 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 666 | `        state: "soon" as const,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 667 | `        label: \`Vence em ${diffDays} dias\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 668 | `        days: diffDays,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 669 | `        subtext: dueLabel,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 670 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 671 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 672 | `    return { state: "future" as const, label: "Prazo", days: diffDays, subtext: dueLabel };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 673 | `  })();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 674 | `  const dueState = dueMeta.state;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 675 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 676 | `  const dueChipClass = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 677 | `    overdue:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 678 | `      "bg-destructive text-destructive-foreground font-bold shadow-sm ring-1 ring-destructive/40",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 679 | `    today:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 680 | `      "bg-destructive/90 text-destructive-foreground font-semibold shadow-sm ring-1 ring-destructive/30",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 681 | `    tomorrow: "bg-amber-500 text-amber-950 font-semibold shadow-sm ring-1 ring-amber-500/40",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 682 | `    soon: "bg-amber-500/90 text-amber-950 font-semibold shadow-sm ring-1 ring-amber-500/30",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 683 | `    future: "bg-blue-500/15 text-blue-700 dark:text-blue-300 font-medium ring-1 ring-blue-500/30",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 684 | `    none: "bg-muted text-muted-foreground",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 685 | `  }[dueState];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 686 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 687 | `  const computeSubtaskDue = (iso: string | null, done: boolean) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 688 | `    if (!iso)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 689 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 690 | `        label: "Sem prazo",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 691 | `        cls: "bg-muted/60 text-muted-foreground border border-dashed border-muted-foreground/30",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 692 | `        state: "none" as const,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 693 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 694 | `    const d = new Date(iso);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 695 | `    const dateLabel = format(d, "dd MMM", { locale: ptBR });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 696 | `    if (done)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 697 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 698 | `        label: dateLabel,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 699 | `        cls: "bg-muted text-muted-foreground line-through",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 700 | `        state: "done" as const,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 701 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 702 | `    const now = new Date();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 703 | `    const s0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 704 | `    const s1 = new Date(d.getFullYear(), d.getMonth(), d.getDate());` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 705 | `    const diff = Math.round((s1.getTime() - s0.getTime()) / 86400000);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 706 | `    if (diff < 0) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 707 | `      const n = Math.abs(diff);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 708 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 709 | `        label: n === 1 ? "Atrasado 1 dia" : \`Atrasado ${n} dias\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 710 | `        cls: "bg-destructive text-destructive-foreground font-semibold ring-1 ring-destructive/40",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 711 | `        state: "overdue" as const,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 712 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 713 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 714 | `    if (diff === 0)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 715 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 716 | `        label: "Vence hoje",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 717 | `        cls: "bg-destructive/90 text-destructive-foreground font-semibold ring-1 ring-destructive/30",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 718 | `        state: "today" as const,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 719 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 720 | `    if (diff === 1)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 721 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 722 | `        label: "Vence amanhã",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 723 | `        cls: "bg-amber-500 text-amber-950 font-semibold ring-1 ring-amber-500/40",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 724 | `        state: "tomorrow" as const,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 725 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 726 | `    if (diff <= 7)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 727 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 728 | `        label: \`Vence em ${diff} dias\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 729 | `        cls: "bg-amber-500/90 text-amber-950 font-semibold ring-1 ring-amber-500/30",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 730 | `        state: "soon" as const,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 731 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 732 | `    return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 733 | `      label: dateLabel,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 734 | `      cls: "bg-blue-500/15 text-blue-700 dark:text-blue-300 font-medium ring-1 ring-blue-500/30",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 735 | `      state: "future" as const,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 736 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 737 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 738 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 739 | `  const priority = task.priority ? PRIORITY_LABELS[task.priority] : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 740 | `  const clientText = client?.color ? readableText(client.color) : "#fff";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 741 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 742 | `  const toggleTag = async (tagId: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 743 | `    const has = tagIds.includes(tagId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 744 | `    if (has) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 745 | `      const next = tagIds.filter((id) => id !== tagId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 746 | `      setTagIds(next);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 747 | `      await supabase.from("task_tag_links").delete().eq("task_id", task.id).eq("tag_id", tagId);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 748 | `      if (task.tag_id === tagId) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 749 | `        await update({ tag_id: next[0] ?? null });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 750 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 751 | `    } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 752 | `      const next = [...tagIds, tagId];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 753 | `      setTagIds(next);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 754 | `      await supabase.from("task_tag_links").insert({ task_id: task.id, tag_id: tagId });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 755 | `      if (!task.tag_id) await update({ tag_id: tagId });` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 756 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 757 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 758 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 759 | `  const addSubtask = async (` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 760 | `    commentId: string | null = null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 761 | `    titleOverride?: string,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 762 | `    dueOverride?: string | null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 763 | `  ) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 764 | `    const title = (titleOverride ?? newSubtask).trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 765 | `    if (!title) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 766 | `      setAddingSubtask(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 767 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 768 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 769 | `    const siblings = subtasks.filter((s) => (s.comment_id ?? null) === commentId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 770 | `    const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 771 | `      .from("subtasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 772 | `      .insert({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 773 | `        task_id: task.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 774 | `        title,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 775 | `        position: siblings.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 776 | `        comment_id: commentId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 777 | `        due_date: dueOverride ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 778 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 779 | `      .select("id, task_id, title, done, position, comment_id, due_date, completed_at, assignee_id, notes")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 780 | `      .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 781 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 782 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 783 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 784 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 785 | `    setSubtasks((c) => [...c, data as Subtask]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 786 | `    if (commentId === null) setNewSubtask("");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 787 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 788 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 789 | `  const toggleSubtask = async (s: Subtask) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 790 | `    const nextDone = !s.done;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 791 | `    const nextCompleted = nextDone ? new Date().toISOString() : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 792 | `    setSubtasks((c) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 793 | `      c.map((x) => (x.id === s.id ? { ...x, done: nextDone, completed_at: nextCompleted } : x)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 794 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 795 | `    const { error } = await supabase.from("subtasks").update({ done: nextDone }).eq("id", s.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 796 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 797 | `      setSubtasks((c) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 798 | `        c.map((x) => (x.id === s.id ? { ...x, done: s.done, completed_at: s.completed_at } : x)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 799 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 800 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 801 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 802 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 803 | `    void qc.invalidateQueries({ queryKey: ["subtasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 804 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 805 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 806 | `  const deleteSubtask = async (id: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 807 | `    setSubtasks((c) => c.filter((x) => x.id !== id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 808 | `    await supabase.from("subtasks").delete().eq("id", id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 809 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 810 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 811 | `  const duplicateSubtask = async (subtask: Subtask) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 812 | `    const siblings = subtasks.filter((item) => !item.comment_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 813 | `    const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 814 | `      .from("subtasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 815 | `      .insert({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 816 | `        task_id: task.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 817 | `        title: \`${subtask.title} (cópia)\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 818 | `        done: false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 819 | `        position: siblings.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 820 | `        due_date: subtask.due_date,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 821 | `        assignee_id: subtask.assignee_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 822 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 823 | `      .select("id, task_id, title, done, position, comment_id, due_date, completed_at, assignee_id, notes")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 824 | `      .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 825 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 826 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 827 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 828 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 829 | `    setSubtasks((current) => [...current, data as Subtask]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 830 | `    toast.success("Subtarefa duplicada");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 831 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 832 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 833 | `  const startEditSubtask = (s: Subtask) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 834 | `    setEditingSubtaskId(s.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 835 | `    setSubtaskDraft(s.title.replace(/<[^>]*>/g, ""));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 836 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 837 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 838 | `  const openSubtaskDialog = (subtask: Subtask) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 839 | `    setSubtaskInDialog(subtask);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 840 | `    setSubtaskDialogOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 841 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 842 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 843 | `  const handleSubtaskDialogSaved = (savedSubtask: EditableSubtask) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 844 | `    setSubtasks((current) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 845 | `      current.map((subtask) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 846 | `        subtask.id === savedSubtask.id ? { ...subtask, ...savedSubtask } : subtask,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 847 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 848 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 849 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 850 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 851 | `  const saveSubtaskTitle = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 852 | `    const id = editingSubtaskId;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 853 | `    if (!id) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 854 | `    const next = subtaskDraft.trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 855 | `    setEditingSubtaskId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 856 | `    if (!next) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 857 | `    setSubtasks((c) => c.map((x) => (x.id === id ? { ...x, title: next } : x)));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 858 | `    const { error } = await supabase.from("subtasks").update({ title: next }).eq("id", id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 859 | `    if (error) toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 860 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 861 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 862 | `  const [subDueReason, setSubDueReason] = useState<{` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 863 | `    open: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 864 | `    subtask: Subtask | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 865 | `    prev: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 866 | `    next: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 867 | `    reason: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 868 | `  }>({ open: false, subtask: null, prev: null, next: null, reason: "" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 869 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 870 | `  const applySubtaskDue = async (s: Subtask, nextIso: string | null, reason?: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 871 | `    const prev = s.due_date;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 872 | `    if (nextIso === prev) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 873 | `    const { error } = await supabase.from("subtasks").update({ due_date: nextIso }).eq("id", s.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 874 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 875 | `      toast.error(\`Não foi possível salvar o prazo: ${error.message}\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 876 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 877 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 878 | `    setSubtasks((current) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 879 | `      current.map((subtask) => (subtask.id === s.id ? { ...subtask, due_date: nextIso } : subtask)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 880 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 881 | `    if (user) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 882 | `      const { error: historyError } = await supabase.from("subtask_due_date_changes").insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 883 | `        subtask_id: s.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 884 | `        old_due_date: prev,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 885 | `        new_due_date: nextIso,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 886 | `        reason: reason?.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 887 | `        user_id: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 888 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 889 | `      if (historyError) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 890 | `        toast.warning("Prazo atualizado, mas não foi possível registrar a justificativa.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 891 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 892 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 893 | `    void qc.invalidateQueries({ queryKey: ["subtasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 894 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 895 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 896 | `  const updateSubtaskDue = async (s: Subtask, isoOrEmpty: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 897 | `    const next = isoOrEmpty ? new Date(\`${isoOrEmpty}T12:00:00\`).toISOString() : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 898 | `    if (next === s.due_date) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 899 | `    if (!s.due_date) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 900 | `      await applySubtaskDue(s, next);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 901 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 902 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 903 | `    setSubDueReason({ open: true, subtask: s, prev: s.due_date, next, reason: "" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 904 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 905 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 906 | `  const updateSubtaskAssignee = async (s: Subtask, value: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 907 | `    const next = value === "none" ? null : value;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 908 | `    if (next === s.assignee_id) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 909 | `    setSubtasks((c) => c.map((x) => (x.id === s.id ? { ...x, assignee_id: next } : x)));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 910 | `    const { error } = await supabase.from("subtasks").update({ assignee_id: next }).eq("id", s.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 911 | `    if (error) toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 912 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 913 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 914 | `  const moveSubtaskInScope = async (id: string, dir: -1 | 1, commentId: string | null) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 915 | `    const scope = subtasks` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 916 | `      .filter((s) => (s.comment_id ?? null) === commentId)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 917 | `      .sort((a, b) => a.position - b.position);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 918 | `    const idx = scope.findIndex((s) => s.id === id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 919 | `    const target = idx + dir;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 920 | `    if (idx < 0 || target < 0 || target >= scope.length) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 921 | `    const reordered = [...scope];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 922 | `    [reordered[idx], reordered[target]] = [reordered[target], reordered[idx]];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 923 | `    const reindexed = reordered.map((s, i) => ({ ...s, position: i }));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 924 | `    setSubtasks((c) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 925 | `      c.map((s) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 926 | `        const upd = reindexed.find((r) => r.id === s.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 927 | `        return upd ? { ...s, position: upd.position } : s;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 928 | `      }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 929 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 930 | `    await Promise.all(` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 931 | `      reindexed.map((s) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 932 | `        supabase.from("subtasks").update({ position: s.position }).eq("id", s.id),` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 933 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 934 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 935 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 936 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 937 | `  const startEditCommentBody = (c: CardComment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 938 | `    setEditingCommentId(c.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 939 | `    setCommentDraft(c.body);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 940 | `    setOpenComments((cur) => ({ ...cur, [c.id]: true }));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 941 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 942 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 943 | `  const saveCommentBody = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 944 | `    const id = editingCommentId;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 945 | `    if (!id) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 946 | `    const next = commentDraft;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 947 | `    setEditingCommentId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 948 | `    setComments((cs) => cs.map((x) => (x.id === id ? { ...x, body: next } : x)));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 949 | `    const { error } = await supabase.from("comments").update({ body: next }).eq("id", id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 950 | `    if (error) toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 951 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 952 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 953 | `  const renameComment = async (c: CardComment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 954 | `    const current = c.title ?? "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 955 | `    const next = window.prompt("Renomear seção", current)?.trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 956 | `    if (next === undefined) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 957 | `    const value = next || null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 958 | `    setComments((cs) => cs.map((x) => (x.id === c.id ? { ...x, title: value } : x)));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 959 | `    const { error } = await supabase.from("comments").update({ title: value }).eq("id", c.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 960 | `    if (error) toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 961 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 962 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 963 | `  const deleteComment = async (id: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 964 | `    setComments((cs) => cs.filter((x) => x.id !== id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 965 | `    const { error } = await supabase.from("comments").delete().eq("id", id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 966 | `    if (error) toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 967 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 968 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 969 | `  const moveComment = async (id: string, dir: -1 | 1) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 970 | `    const idx = comments.findIndex((c) => c.id === id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 971 | `    const target = idx + dir;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 972 | `    if (idx < 0 || target < 0 || target >= comments.length) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 973 | `    const next = [...comments];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 974 | `    [next[idx], next[target]] = [next[target], next[idx]];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 975 | `    const reindexed = next.map((c, i) => ({ ...c, position: i }));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 976 | `    setComments(reindexed);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 977 | `    await Promise.all(` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 978 | `      reindexed.map((c) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 979 | `        supabase.from("comments").update({ position: c.position }).eq("id", c.id),` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 980 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 981 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 982 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 983 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 984 | `  const completedStatus = useMemo(() => statuses.find((s) => s.is_completed) ?? null, [statuses]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 985 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 986 | `  const completeTask = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 987 | `    if (subtasks.some((subtask) => !subtask.done)) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 988 | `      toast.error("Conclua as subtarefas pendentes antes de concluir esta tarefa.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 989 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 990 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 991 | `    await update({` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 992 | `      status: "done",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 993 | `      status_id: completedStatus?.id ?? task.status_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 994 | `      completed_at: new Date().toISOString(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 995 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 996 | `    toast.success("Tarefa concluída");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 997 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 998 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 999 | `  const openDueChange = ({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1000 | `    dueDate: nextIso,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1001 | `    dueTime,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1002 | `  }: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1003 | `    dueDate: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1004 | `    dueTime: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1005 | `  }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1006 | `    const oldIso = task.due_date ?? null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1007 | `    if (oldIso === nextIso && (task.due_time ?? null) === dueTime) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1008 | `    if (!oldIso) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1009 | `      void update({ due_date: nextIso, due_time: dueTime });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1010 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1011 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1012 | `    setDueChange({ open: true, pending: nextIso, pendingTime: dueTime, reason: "" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1013 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1014 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1015 | `  const confirmDueChange = async (skipReason = false) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1016 | `    if (!skipReason && !dueChange.reason.trim()) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1017 | `      toast.error("Informe a justificativa da mudança de prazo.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1018 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1019 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1020 | `    const nextIso = dueChange.pending;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1021 | `    const oldIso = task.due_date ?? null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1022 | `    setDueChange({ open: false, pending: null, pendingTime: null, reason: "" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1023 | `    // registra histórico (só quando havia algum prazo antes ou passa a ter)` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 1024 | `    if (user && (oldIso || nextIso)) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1025 | `      await supabase.from("task_due_date_changes").insert({` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 1026 | `        task_id: task.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1027 | `        user_id: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1028 | `        old_due_date: oldIso,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1029 | `        new_due_date: nextIso,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1030 | `        reason: skipReason ? null : dueChange.reason.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1031 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1032 | `      void qc.invalidateQueries({ queryKey: ["task_due_date_changes", task.id] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1033 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1034 | `    await update({ due_date: nextIso, due_time: dueChange.pendingTime });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 1035 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1036 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1037 | `  if (minimal) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1038 | `    return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1039 | `      <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1040 | `        {...dragHandleProps}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1041 | `        className="group flex min-h-[132px] w-full cursor-grab touch-none flex-col overflow-hidden rounded-[0.75rem] border bg-card shadow-sm transition hover:border-primary/40 hover:shadow active:cursor-grabbing"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1042 | `        title={task.title || "Sem título"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1043 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1044 | `        <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1045 | `          className="flex min-h-7 items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1046 | `          style={client?.color ? { background: client.color, color: clientText } : undefined}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1047 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1048 | `          <Users className="h-3 w-3 shrink-0" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1049 | `          <span className="truncate">{client?.name || "Sem cliente"}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1050 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1051 | `        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1052 | `          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1053 | `          onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1054 | `          onClick={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1055 | `            stop(event);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1056 | `            onEdit?.();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1057 | `          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1058 | `          className="min-h-0 flex-1 px-2 py-1.5 text-left text-sm font-medium leading-snug [overflow-wrap:anywhere] hover:text-primary"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1059 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1060 | `          {task.title || <span className="text-muted-foreground">Sem título</span>}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1061 | `        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1062 | `        <div className="flex items-center gap-1 border-t px-1.5 py-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1063 | `          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1064 | `            size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1065 | `            variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1066 | `            className="h-6 w-6 shrink-0 text-success"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1067 | `            onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1068 | `            onClick={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1069 | `              stop(event);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1070 | `              void completeTask();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1071 | `            }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1072 | `            title="Concluir tarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1073 | `            aria-label="Concluir tarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1074 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1075 | `            <CheckCircle2 className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1076 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1077 | `          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1078 | `            size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1079 | `            variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1080 | `            className="h-6 w-6 shrink-0"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1081 | `            onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1082 | `            onClick={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1083 | `              stop(event);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1084 | `              onDuplicate?.();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1085 | `            }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1086 | `            title="Duplicar tarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1087 | `            aria-label="Duplicar tarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1088 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1089 | `            <Copy className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1090 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1091 | `          {taskPeople.length > 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1092 | `            <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1093 | `              className="ml-0.5 flex min-w-0 flex-1 -space-x-1.5"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1094 | `              title="Responsável e colaboradores"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1095 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1096 | `              {taskPeople.slice(0, 3).map((person) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1097 | `                const name = person.full_name || person.email || "Usuário";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1098 | `                return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1099 | `                  <Avatar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1100 | `                    key={person.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1101 | `                    className="h-6 w-6 border-2 border-card text-[8px]"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1102 | `                    title={name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1103 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1104 | `                    <AvatarImage src={person.avatar_url || undefined} alt={name} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1105 | `                    <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1106 | `                  </Avatar>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1107 | `                );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1108 | `              })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1109 | `              {taskPeople.length > 3 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1110 | `                <span className="ml-1 self-center text-[10px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1111 | `                  +{taskPeople.length - 3}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1112 | `                </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1113 | `              ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1114 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1115 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1116 | `            <span className="flex-1" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1117 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1118 | `          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1119 | `            size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1120 | `            variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1121 | `            className="h-6 w-6 shrink-0"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1122 | `            onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1123 | `            onClick={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1124 | `              stop(event);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1125 | `              onEdit?.();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1126 | `            }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1127 | `            title="Editar tarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1128 | `            aria-label="Editar tarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1129 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1130 | `            <MoreHorizontal className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1131 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1132 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1133 | `        <div className={cn("flex items-center gap-1 border-t px-2 py-1 text-[11px]", dueChipClass)}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1134 | `          {dueHasTime ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1135 | `            <Clock3 className="h-3 w-3 shrink-0" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1136 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1137 | `            <CalendarIcon className="h-3 w-3 shrink-0" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1138 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1139 | `          <span className="truncate">{dueLabel ? \`Prazo: ${dueLabel}\` : "Sem prazo"}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1140 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1141 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1142 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1143 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1144 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1145 | `    <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1146 | `      <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1147 | `        {...dragHandleProps}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1148 | `        className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1149 | `          "group relative flex min-h-[420px] w-full cursor-grab touch-none flex-col overflow-visible rounded-[0.75rem] border bg-card shadow-sm transition hover:border-primary/40 hover:shadow active:cursor-grabbing",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1150 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1151 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1152 | `        {/* Client color strip at top */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1153 | `        {client?.color ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1154 | `          <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1155 | `            className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1156 | `              "flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1157 | `              "rounded-t-[0.75rem]",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1158 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1159 | `            style={{ background: client.color, color: clientText }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1160 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1161 | `            <Users className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1162 | `            <span className="truncate">{client.name}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1163 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1164 | `        ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1165 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1166 | `        <div className="min-h-0 flex-1 overflow-visible p-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1167 | `          <div className="flex flex-col gap-0.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1168 | `            {/* Tags — multiple, click chip to manage */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1169 | `            {isVisible("tags") ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1170 | `              <div className="mb-2 -mx-1" style={{ order: orderOf("tags") }}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1171 | `                <ChipPopover` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1172 | `                  value={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1173 | `                    selectedTags.length > 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1174 | `                      <span className="flex flex-wrap items-center gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1175 | `                        {selectedTags.map((t) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1176 | `                          <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1177 | `                            key={t.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1178 | `                            className="inline-flex items-center rounded-md px-2 py-1 text-[11px] font-bold uppercase tracking-wider shadow-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1179 | `                            style={{` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1180 | `                              background: t.color,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1181 | `                              color: readableText(t.color),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1182 | `                              boxShadow: \`0 2px 8px -2px ${t.color}80\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1183 | `                            }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1184 | `                          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1185 | `                            {t.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1186 | `                          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1187 | `                        ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1188 | `                        <span className="inline-flex items-center gap-1 rounded-md border border-dashed px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1189 | `                          <Plus className="h-2.5 w-2.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1190 | `                        </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1191 | `                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1192 | `                    ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1193 | `                      <span className="inline-flex items-center gap-1 rounded-md border border-dashed px-2 py-0.5 text-[10px] text-muted-foreground hover:bg-muted">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1194 | `                        <TagIcon className="h-2.5 w-2.5" /> Adicionar etiquetas` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1195 | `                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1196 | `                    )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1197 | `                  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1198 | `                  render={() => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1199 | `                    <PopoverField label="Etiquetas">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1200 | `                      <div className="max-h-56 space-y-0.5 overflow-y-auto">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1201 | `                        {tags.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1202 | `                          <p className="px-1 py-1 text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1203 | `                            Nenhuma etiqueta criada` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1204 | `                          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1205 | `                        ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1206 | `                          tags.map((t) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1207 | `                            const checked = tagIds.includes(t.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1208 | `                            return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1209 | `                              <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1210 | `                                key={t.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1211 | `                                type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1212 | `                                onClick={() => void toggleTag(t.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1213 | `                                className="flex w-full items-center gap-2 rounded px-1.5 py-1 text-left text-xs hover:bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1214 | `                              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1215 | `                                <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1216 | `                                  className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1217 | `                                    "flex h-4 w-4 items-center justify-center rounded border",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1218 | `                                    checked` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1219 | `                                      ? "border-primary bg-primary text-primary-foreground"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1220 | `                                      : "border-muted-foreground/40",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1221 | `                                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1222 | `                                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1223 | `                                  {checked ? <Check className="h-3 w-3" /> : null}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1224 | `                                </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1225 | `                                <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1226 | `                                  className="h-2 w-2 rounded-full"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1227 | `                                  style={{ background: t.color }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1228 | `                                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1229 | `                                <span className="truncate">{t.name}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1230 | `                              </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1231 | `                            );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1232 | `                          })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1233 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1234 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1235 | `                    </PopoverField>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1236 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1237 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1238 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1239 | `            ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1240 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1241 | `            {/* Title row */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1242 | `            <div className="mb-1 flex items-start justify-between gap-1" style={{ order: -1 }}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1243 | `              {titleEditing ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1244 | `                <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1245 | `                  value={titleDraft}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1246 | `                  autoFocus` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1247 | `                  onChange={(e) => setTitleDraft(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1248 | `                  onBlur={() => void saveTitle()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1249 | `                  onKeyDown={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1250 | `                    if (e.key === "Enter" && !e.shiftKey) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1251 | `                      e.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1252 | `                      void saveTitle();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1253 | `                    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1254 | `                    if (e.key === "Escape") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1255 | `                      setTitleDraft(task.title);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1256 | `                      setTitleEditing(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1257 | `                    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1258 | `                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1259 | `                  onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1260 | `                  onClick={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1261 | `                  className="min-h-[28px] resize-none border-none bg-transparent p-0 text-sm font-medium leading-snug shadow-none focus-visible:ring-0 md:text-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1262 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1263 | `              ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1264 | `                <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1265 | `                  type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1266 | `                  onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1267 | `                  onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1268 | `                    stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1269 | `                    setTitleEditing(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1270 | `                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1271 | `                  className="min-w-0 flex-1 text-left text-sm font-medium leading-snug [overflow-wrap:anywhere] hover:text-primary"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1272 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1273 | `                  {task.title || <span className="text-muted-foreground">Sem título</span>}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1274 | `                </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1275 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1276 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1277 | `                size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1278 | `                variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1279 | `                className="h-6 w-6 shrink-0 text-success opacity-0 transition group-hover:opacity-100"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1280 | `                onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1281 | `                onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1282 | `                  stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1283 | `                  void completeTask();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1284 | `                }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1285 | `                title="Concluir tarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1286 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1287 | `                <CheckCircle2 className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1288 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1289 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1290 | `                size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1291 | `                variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1292 | `                className="h-6 w-6 shrink-0 opacity-0 transition group-hover:opacity-100"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1293 | `                onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1294 | `                onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1295 | `                  stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1296 | `                  onDuplicate?.();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1297 | `                }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1298 | `                title="Duplicar tarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1299 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1300 | `                <Copy className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1301 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1302 | `              {false && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1303 | `                <Popover>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1304 | `                  <PopoverTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1305 | `                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1306 | `                      size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1307 | `                      variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1308 | `                      className="hidden"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1309 | `                      onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1310 | `                      onClick={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1311 | `                      title="Largura do card"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1312 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1313 | `                      {null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1314 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1315 | `                  </PopoverTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1316 | `                  <PopoverContent` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1317 | `                    className="w-56 p-2"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1318 | `                    align="end"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1319 | `                    onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1320 | `                    onClick={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1321 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1322 | `                    <div className="mb-1.5 px-1 text-xs font-semibold">Largura do card</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1323 | `                    <div className="grid grid-cols-2 gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1324 | `                      {[` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1325 | `                        { label: "Padrão", value: null },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1326 | `                        { label: "Médio", value: 360 },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1327 | `                        { label: "Grande", value: 480 },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1328 | `                        { label: "Extra", value: 640 },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1329 | `                      ].map((p) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1330 | `                        const active = (task.card_width ?? null) === p.value;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1331 | `                        return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1332 | `                          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1333 | `                            key={p.label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1334 | `                            size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1335 | `                            variant={active ? "default" : "outline"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1336 | `                            className="h-8 text-[11px]"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1337 | `                            onClick={() => void update({ card_width: p.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1338 | `                          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1339 | `                            {p.label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1340 | `                          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1341 | `                        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1342 | `                      })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1343 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1344 | `                  </PopoverContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1345 | `                </Popover>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1346 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1347 | `              {taskPeople.length > 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1348 | `                <div className="flex -space-x-1.5" title="Responsável e colaboradores">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1349 | `                  {taskPeople.slice(0, 4).map((person) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1350 | `                    const name = person.full_name || person.email || "Usuário";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1351 | `                    return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1352 | `                      <Avatar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1353 | `                        key={person.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1354 | `                        className="h-6 w-6 border-2 border-card text-[8px]"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1355 | `                        title={name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1356 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1357 | `                        <AvatarImage src={person.avatar_url || undefined} alt={name} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1358 | `                        <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1359 | `                      </Avatar>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1360 | `                    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1361 | `                  })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1362 | `                  {taskPeople.length > 4 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1363 | `                    <span className="ml-1 self-center text-[10px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1364 | `                      +{taskPeople.length - 4}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1365 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1366 | `                  ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1367 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1368 | `              ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1369 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1370 | `                size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1371 | `                variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1372 | `                className="h-6 w-6 shrink-0 opacity-0 transition group-hover:opacity-100"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1373 | `                onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1374 | `                onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1375 | `                  stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1376 | `                  onEdit?.();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1377 | `                }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1378 | `                title="Editar tarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1379 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1380 | `                <MoreHorizontal className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1381 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1382 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1383 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1384 | `            {/* Description — inline editable */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1385 | `            {isVisible("description") ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1386 | `              <div style={{ order: orderOf("description") }}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1387 | `                {descEditing ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1388 | `                  <div className="mb-2" onPointerDown={stop} onClick={stop}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1389 | `                    <RichTextEditor` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1390 | `                      value={descDraft}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1391 | `                      autoFocus` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1392 | `                      minHeight={72}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1393 | `                      placeholder="Observações..."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1394 | `                      className="text-sm leading-snug md:text-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1395 | `                      onChange={setDescDraft}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1396 | `                      onBlur={() => void saveDesc()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1397 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1398 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1399 | `                ) : task.description ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1400 | `                  <div className="mb-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1401 | `                    <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1402 | `                      onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1403 | `                      onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1404 | `                        stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1405 | `                        setDescEditing(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1406 | `                      }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1407 | `                      className="cursor-text whitespace-pre-wrap rounded text-sm leading-snug text-muted-foreground [overflow-wrap:anywhere] hover:bg-muted/40"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1408 | `                      style={{` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1409 | `                        maxHeight: descriptionExpanded` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1410 | `                          ? "min(18rem, max(8rem, calc(100vh - 22rem)))"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1411 | `                          : "7.5rem",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1412 | `                        overflowY: descriptionExpanded ? "auto" : "hidden",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1413 | `                      }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1414 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1415 | `                      <RichTextView` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1416 | `                        html={task.description}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1417 | `                        className="text-sm text-muted-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1418 | `                      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1419 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1420 | `                    {task.description.length > DESCRIPTION_COLLAPSED_LIMIT ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1421 | `                      <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1422 | `                        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1423 | `                        onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1424 | `                        onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1425 | `                          stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1426 | `                          setDescriptionExpanded((expanded) => !expanded);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1427 | `                        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1428 | `                        className="mt-1 text-xs font-medium text-primary hover:underline"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1429 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1430 | `                        {descriptionExpanded ? "Ver menos" : "Ver mais"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1431 | `                      </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1432 | `                    ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1433 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1434 | `                ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1435 | `                  <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1436 | `                    type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1437 | `                    onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1438 | `                    onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1439 | `                      stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1440 | `                      setDescEditing(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1441 | `                    }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1442 | `                    className="mb-2 mt-1 flex w-full items-center gap-1.5 rounded px-1 py-1 text-left text-[11px] text-muted-foreground/70 hover:bg-muted hover:text-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1443 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1444 | `                    <AlignLeft className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1445 | `                    <span>Adicionar observação</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1446 | `                  </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1447 | `                )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1448 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1449 | `            ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1450 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1451 | `            {/* Seções dobráveis de observações foram removidas — use o campo Observações acima. */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1452 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1453 | `            {/* Subtasks — collapsible com título editável */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1454 | `            {isVisible("subtasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1455 | `              ? (() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1456 | `                  const rootSubs = subtasks.filter((s) => !s.comment_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1457 | `                  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1458 | `                    <div style={{ order: orderOf("subtasks") }}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1459 | `                      {rootSubs.length > 0 || addingSubtask ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1460 | `                        <Collapsible` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1461 | `                          open={subtasksOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1462 | `                          onOpenChange={setSubtasksOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1463 | `                          className="mb-2 rounded-md border bg-muted/20"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1464 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1465 | `                          <div className="flex w-full items-center gap-0.5 pr-1 hover:bg-muted/40">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1466 | `                            <CollapsibleTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1467 | `                              <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1468 | `                                type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1469 | `                                onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1470 | `                                onClick={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1471 | `                                className="flex min-w-0 flex-1 items-center gap-1.5 px-2 py-1.5 text-left text-xs font-medium"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1472 | `                              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1473 | `                                {subtasksOpen ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1474 | `                                  <ChevronDown className="h-3.5 w-3.5 shrink-0" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1475 | `                                ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1476 | `                                  <ChevronRight className="h-3.5 w-3.5 shrink-0" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1477 | `                                )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1478 | `                                <ListChecks className="h-3 w-3 shrink-0 text-muted-foreground" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1479 | `                                <span className="min-w-0 flex-1 truncate">{subtasksTitle}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1480 | `                                {rootSubs.length > 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1481 | `                                  <span className="shrink-0 text-[10px] font-normal text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1482 | `                                    {rootSubs.filter((s) => s.done).length}/{rootSubs.length}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1483 | `                                  </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1484 | `                                ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1485 | `                              </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1486 | `                            </CollapsibleTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1487 | `                            <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1488 | `                              type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1489 | `                              title="Renomear seção"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1490 | `                              onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1491 | `                              onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1492 | `                                stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1493 | `                                renameSubtasksTitle();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1494 | `                              }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1495 | `                              className="rounded p-0.5 opacity-0 transition group-hover:opacity-100 hover:bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1496 | `                            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1497 | `                              <Pencil className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1498 | `                            </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1499 | `                          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1500 | `                          <CollapsibleContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1501 | `                            <div className="space-y-0.5 border-t p-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1502 | `                              {rootSubs.map((s, sIdx) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1503 | `                                const dueInfo = computeSubtaskDue(s.due_date, s.done);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1504 | `                                return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1505 | `                                  <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1506 | `                                    key={s.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1507 | `                                    className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1508 | `                                      "group/sub rounded px-1 py-1 transition-colors",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1509 | `                                      s.done` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1510 | `                                        ? "bg-emerald-500/10 ring-1 ring-emerald-500/30 hover:bg-emerald-500/15"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1511 | `                                        : "hover:bg-muted/40",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1512 | `                                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1513 | `                                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1514 | `                                    <div className="flex items-start gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1515 | `                                      <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1516 | `                                        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1517 | `                                        onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1518 | `                                        onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1519 | `                                          stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1520 | `                                          void toggleSubtask(s);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1521 | `                                        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1522 | `                                        className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1523 | `                                          "mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1524 | `                                          s.done` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1525 | `                                            ? "border-primary bg-primary text-primary-foreground"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1526 | `                                            : "border-muted-foreground/40",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1527 | `                                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1528 | `                                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1529 | `                                        {s.done ? <Check className="h-2.5 w-2.5" /> : null}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1530 | `                                      </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1531 | `                                      {editingSubtaskId === s.id ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1532 | `                                        <div className="min-w-0 flex-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1533 | `                                          <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1534 | `                                            value={subtaskDraft}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1535 | `                                            onChange={(event) => setSubtaskDraft(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1536 | `                                            onBlur={() => void saveSubtaskTitle()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1537 | `                                            onKeyDown={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1538 | `                                              if (event.key === "Enter") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1539 | `                                                event.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1540 | `                                                void saveSubtaskTitle();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1541 | `                                              }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1542 | `                                              if (event.key === "Escape") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1543 | `                                                setEditingSubtaskId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1544 | `                                                setSubtaskDraft("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1545 | `                                              }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1546 | `                                            }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1547 | `                                            autoFocus` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1548 | `                                            placeholder="Título da subtarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1549 | `                                            className="h-7 px-1.5 text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1550 | `                                          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1551 | `                                        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1552 | `                                      ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1553 | `                                        <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1554 | `                                          onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1555 | `                                          onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1556 | `                                            stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1557 | `                                            startEditSubtask(s);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1558 | `                                          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1559 | `                                          className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1560 | `                                            "min-w-0 flex-1 cursor-text break-words text-left hover:text-primary",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1561 | `                                            s.done && "text-muted-foreground line-through",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1562 | `                                          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1563 | `                                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1564 | `                                          <RichTextView html={s.title} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1565 | `                                        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1566 | `                                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1567 | `                                      <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition group-hover/sub:opacity-100">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1568 | `                                        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1569 | `                                          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1570 | `                                          title="Mover para cima"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1571 | `                                          disabled={sIdx === 0}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1572 | `                                          onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1573 | `                                          onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1574 | `                                            stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1575 | `                                            void moveSubtaskInScope(s.id, -1, null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1576 | `                                          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1577 | `                                          className="rounded p-0.5 hover:bg-muted disabled:opacity-30"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1578 | `                                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1579 | `                                          <ArrowUp className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1580 | `                                        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1581 | `                                        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1582 | `                                          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1583 | `                                          title="Mover para baixo"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1584 | `                                          disabled={sIdx === rootSubs.length - 1}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1585 | `                                          onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1586 | `                                          onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1587 | `                                            stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1588 | `                                            void moveSubtaskInScope(s.id, 1, null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1589 | `                                          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1590 | `                                          className="rounded p-0.5 hover:bg-muted disabled:opacity-30"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1591 | `                                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1592 | `                                          <ArrowDown className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1593 | `                                        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1594 | `                                        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1595 | `                                          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1596 | `                                          title="Renomear título"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1597 | `                                          onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1598 | `                                          onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1599 | `                                            stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1600 | `                                            startEditSubtask(s);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1601 | `                                          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1602 | `                                          className="rounded p-0.5 hover:bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1603 | `                                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1604 | `                                          <Pencil className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1605 | `                                        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1606 | `                                        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1607 | `                                          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1608 | `                                          title="Abrir detalhes da subtarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1609 | `                                          onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1610 | `                                          onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1611 | `                                            stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1612 | `                                            openSubtaskDialog(s);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1613 | `                                          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1614 | `                                          className="rounded p-0.5 hover:bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1615 | `                                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1616 | `                                          <FileText className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1617 | `                                        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1618 | `                                        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1619 | `                                          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1620 | `                                          title="Duplicar subtarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1621 | `                                          onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1622 | `                                          onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1623 | `                                            stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1624 | `                                            void duplicateSubtask(s);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1625 | `                                          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1626 | `                                          className="rounded p-0.5 hover:bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1627 | `                                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1628 | `                                          <Copy className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1629 | `                                        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1630 | `                                        {canDeleteSubtask(s) && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1631 | `                                          <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1632 | `                                            type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1633 | `                                            onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1634 | `                                            onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1635 | `                                              stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1636 | `                                              void deleteSubtask(s.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1637 | `                                            }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1638 | `                                            title="Remover"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1639 | `                                            className="rounded p-0.5 text-destructive hover:bg-destructive/10"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1640 | `                                          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1641 | `                                            <Trash2 className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1642 | `                                          </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1643 | `                                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1644 | `                                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1645 | `                                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1646 | `                                    <div className="mt-1 flex flex-wrap items-center gap-1 pl-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1647 | `                                      {s.done && s.completed_at ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1648 | `                                        <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1649 | `                                          className="inline-flex shrink-0 items-center gap-1 rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium leading-none text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-300"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1650 | `                                          title={format(new Date(s.completed_at), "PPPp", {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1651 | `                                            locale: ptBR,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1652 | `                                          })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1653 | `                                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1654 | `                                          <CheckCircle2 className="h-2.5 w-2.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1655 | `                                          {format(new Date(s.completed_at), "dd/MM/yyyy", {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1656 | `                                            locale: ptBR,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1657 | `                                          })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1658 | `                                        </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1659 | `                                      ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1660 | `                                      <SubtaskDuePopover` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1661 | `                                        dueIso={s.due_date}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1662 | `                                        dueInfo={dueInfo}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1663 | `                                        onApply={(iso) => void updateSubtaskDue(s, iso)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1664 | `                                        onClear={() => void updateSubtaskDue(s, "")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1665 | `                                      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1666 | `                                      <SubtaskAssigneePopover` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1667 | `                                        profiles={assignableProfiles}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1668 | `                                        value={s.assignee_id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1669 | `                                        onChange={(v) => void updateSubtaskAssignee(s, v)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1670 | `                                      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1671 | `                                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1672 | `                                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1673 | `                                );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1674 | `                              })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1675 | `                              {addingSubtask ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1676 | `                                <div className="flex px-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1677 | `                                  <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1678 | `                                    value={newSubtask}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1679 | `                                    autoFocus` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1680 | `                                    ref={(el) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1681 | `                                      if (el) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1682 | `                                        el.style.height = "auto";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1683 | `                                        el.style.height = \`${el.scrollHeight}px\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1684 | `                                      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1685 | `                                    }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1686 | `                                    onChange={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1687 | `                                      setNewSubtask(e.target.value);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1688 | `                                      const el = e.currentTarget;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1689 | `                                      el.style.height = "auto";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1690 | `                                      el.style.height = \`${el.scrollHeight}px\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1691 | `                                    }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1692 | `                                    onBlur={() => void addSubtask()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1693 | `                                    onKeyDown={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1694 | `                                      if (e.key === "Enter" && !e.shiftKey) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1695 | `                                        e.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1696 | `                                        void addSubtask();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1697 | `                                      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1698 | `                                      if (e.key === "Escape") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1699 | `                                        setNewSubtask("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1700 | `                                        setAddingSubtask(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1701 | `                                      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1702 | `                                    }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1703 | `                                    onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1704 | `                                    onClick={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1705 | `                                    placeholder="Nova subtarefa (Enter para salvar)"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1706 | `                                    className="min-h-[24px] min-w-0 flex-1 resize-none overflow-hidden whitespace-pre-wrap border-none bg-transparent px-1 py-0 text-xs leading-snug shadow-none focus-visible:ring-0"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1707 | `                                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1708 | `                                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1709 | `                              ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1710 | `                                <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1711 | `                                  type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1712 | `                                  onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1713 | `                                  onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1714 | `                                    stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1715 | `                                    setAddingSubtask(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1716 | `                                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1717 | `                                  className="flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left text-[11px] text-muted-foreground/70 hover:bg-muted hover:text-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1718 | `                                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1719 | `                                  <Plus className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1720 | `                                  <span>Adicionar subtarefa</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1721 | `                                </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1722 | `                              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1723 | `                            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1724 | `                          </CollapsibleContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1725 | `                        </Collapsible>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1726 | `                      ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1727 | `                        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1728 | `                          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1729 | `                          onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1730 | `                          onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1731 | `                            stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1732 | `                            setAddingSubtask(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1733 | `                            setSubtasksOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1734 | `                          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1735 | `                          className="flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left text-[11px] text-muted-foreground/70 hover:bg-muted hover:text-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1736 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1737 | `                          <Plus className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1738 | `                          <span>Adicionar subtarefa</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1739 | `                        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1740 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1741 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1742 | `                  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1743 | `                })()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1744 | `              : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1745 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1746 | `            {/* Attachment thumbnails grid */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1747 | `            {isVisible("attachments") ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1748 | `              <div className="" style={{ order: orderOf("attachments") }}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1749 | `                {attachments.length > 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1750 | `                  <div className="grid grid-cols-3 gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1751 | `                    {attachments.slice(0, 6).map((a) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1752 | `                      const isLink = a.mime_type === LINK_MIME;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1753 | `                      const isImage = !isLink && a.mime_type?.startsWith("image/");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1754 | `                      return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1755 | `                        <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1756 | `                          key={a.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1757 | `                          className="group/att relative aspect-square overflow-hidden rounded border bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1758 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1759 | `                          {isImage && thumbs[a.id] ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1760 | `                            <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1761 | `                              type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1762 | `                              onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1763 | `                              onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1764 | `                                stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1765 | `                                openAttachment(a);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1766 | `                              }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1767 | `                              className="block h-full w-full"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1768 | `                            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1769 | `                              <img` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1770 | `                                src={thumbs[a.id]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1771 | `                                alt={a.file_name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1772 | `                                className="h-full w-full object-cover"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1773 | `                              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1774 | `                            </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1775 | `                          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1776 | `                            <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1777 | `                              type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1778 | `                              onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1779 | `                              onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1780 | `                                stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1781 | `                                openAttachment(a);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1782 | `                              }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1783 | `                              className="flex h-full w-full flex-col items-center justify-center gap-0.5 p-1 text-muted-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1784 | `                              title={a.file_name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1785 | `                            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1786 | `                              {isLink ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1787 | `                                <Link2 className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1788 | `                              ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1789 | `                                <FileText className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1790 | `                              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1791 | `                              <span className="line-clamp-1 w-full break-all text-center text-[8px] leading-tight">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1792 | `                                {a.file_name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1793 | `                              </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1794 | `                            </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1795 | `                          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1796 | `                          <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1797 | `                            type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1798 | `                            onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1799 | `                            onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1800 | `                              stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1801 | `                              void deleteAttachment(a);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1802 | `                            }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1803 | `                            className="absolute right-0.5 top-0.5 rounded-full bg-background/80 p-0.5 opacity-0 transition group-hover/att:opacity-100"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1804 | `                            title="Remover"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1805 | `                          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1806 | `                            <X className="h-2.5 w-2.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1807 | `                          </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1808 | `                        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1809 | `                      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1810 | `                    })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1811 | `                    {attachments.length > 6 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1812 | `                      <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1813 | `                        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1814 | `                        onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1815 | `                        onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1816 | `                          stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1817 | `                          onEdit?.();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1818 | `                        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1819 | `                        className="flex aspect-square items-center justify-center rounded border bg-muted text-[10px] font-medium text-muted-foreground hover:bg-muted/60"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1820 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1821 | `                        +{attachments.length - 6}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1822 | `                      </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1823 | `                    ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1824 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1825 | `                ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1826 | `                <FileDropZone` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1827 | `                  onFiles={uploadFiles}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1828 | `                  disabled={!!fileUploadProgress}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1829 | `                  className="w-full"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1830 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1831 | `                  <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1832 | `                    type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1833 | `                    onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1834 | `                    onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1835 | `                      stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1836 | `                      fileRef.current?.click();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1837 | `                    }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1838 | `                    className="flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left text-[11px] text-muted-foreground/70 hover:bg-muted hover:text-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1839 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1840 | `                    <Upload className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1841 | `                    <span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1842 | `                      {fileUploadProgress` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1843 | `                        ? \`Enviando ${fileUploadProgress.current}/${fileUploadProgress.total}…\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1844 | `                        : \`Adicionar arquivos (até ${MAX_TASK_ATTACHMENT_LABEL})\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1845 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1846 | `                  </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1847 | `                  <input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1848 | `                    ref={fileRef}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1849 | `                    type="file"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1850 | `                    multiple` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1851 | `                    hidden` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1852 | `                    disabled={!!fileUploadProgress}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1853 | `                    onChange={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1854 | `                      const files = e.target.files;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1855 | `                      if (files) void uploadFiles(files);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1856 | `                      e.target.value = "";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1857 | `                    }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1858 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1859 | `                </FileDropZone>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1860 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1861 | `            ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1862 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1863 | `            {/* Prioridade — bloco próprio */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1864 | `            {isVisible("priority") ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1865 | `              <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1866 | `                className="flex flex-wrap items-center gap-1"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1867 | `                style={{ order: orderOf("priority") }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1868 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1869 | `                <ChipPopover` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1870 | `                  value={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1871 | `                    priority ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1872 | `                      <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1873 | `                        className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1874 | `                        style={{ background: \`${priority.color}22\`, color: priority.color }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1875 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1876 | `                        <Flag className="h-2.5 w-2.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1877 | `                        {priority.label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1878 | `                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1879 | `                    ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1880 | `                      <span className="inline-flex items-center gap-1 rounded border border-dashed px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1881 | `                        <Flag className="h-2.5 w-2.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1882 | `                        Definir prioridade` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1883 | `                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1884 | `                    )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1885 | `                  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1886 | `                  render={(close) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1887 | `                    <PopoverField label="Prioridade">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1888 | `                      <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1889 | `                        value={task.priority ?? "none"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1890 | `                        onValueChange={(v) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1891 | `                          void update({ priority: v === "none" ? null : (v as Task["priority"]) });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1892 | `                          close();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1893 | `                        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1894 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1895 | `                        <SelectTrigger className="h-8 text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1896 | `                          <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1897 | `                        </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1898 | `                        <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1899 | `                          <SelectItem value="none">Sem prioridade</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1900 | `                          <SelectItem value="low">Baixa</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1901 | `                          <SelectItem value="medium">Média</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1902 | `                          <SelectItem value="high">Alta</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1903 | `                          <SelectItem value="urgent">Urgente</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1904 | `                        </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1905 | `                      </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1906 | `                    </PopoverField>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1907 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1908 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1909 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1910 | `            ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1911 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1912 | `            {isVisible("meta") ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1913 | `              <Collapsible` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1914 | `                open={collaboratorsOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1915 | `                onOpenChange={setCollaboratorsOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1916 | `                className="rounded-md border"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1917 | `                style={{ order: orderOf("meta") }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1918 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1919 | `                <CollapsibleTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1920 | `                  <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1921 | `                    type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1922 | `                    onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1923 | `                    className="flex w-full items-center gap-1.5 px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted/60"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1924 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1925 | `                    <ChevronRight` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1926 | `                      className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1927 | `                        "h-3.5 w-3.5 transition-transform",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1928 | `                        collaboratorsOpen && "rotate-90",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1929 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1930 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1931 | `                    <Users className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1932 | `                    <span className="font-medium text-foreground">Colaboradores</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1933 | `                    <span className="ml-auto text-[10px]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1934 | `                      {taskCollaborators.length === 0 ? "Nenhum" : taskCollaborators.length}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1935 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1936 | `                  </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1937 | `                </CollapsibleTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1938 | `                <CollapsibleContent className="border-t p-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1939 | `                  <div className="max-h-56 space-y-0.5 overflow-y-auto">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1940 | `                    {assignableProfiles.map((profile) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1941 | `                      const checked = taskCollaborators.some(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1942 | `                        (collaborator) => collaborator.id === profile.id,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1943 | `                      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1944 | `                      return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1945 | `                        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1946 | `                          key={profile.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1947 | `                          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1948 | `                          onClick={() => void toggleCollaborator(profile.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1949 | `                          className="flex w-full items-center gap-2 rounded px-1.5 py-1 text-left text-xs hover:bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1950 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1951 | `                          <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1952 | `                            className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1953 | `                              "flex h-4 w-4 items-center justify-center rounded border",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1954 | `                              checked` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1955 | `                                ? "border-primary bg-primary text-primary-foreground"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1956 | `                                : "border-muted-foreground/40",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1957 | `                            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1958 | `                          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1959 | `                            {checked ? <Check className="h-3 w-3" /> : null}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1960 | `                          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1961 | `                          <span className="truncate">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1962 | `                            {profile.full_name || profile.email || "Usuário sem nome"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1963 | `                          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1964 | `                        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1965 | `                      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1966 | `                    })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1967 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1968 | `                </CollapsibleContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1969 | `              </Collapsible>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1970 | `            ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1971 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1972 | `            {/* Prazo — bloco próprio */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1973 | `            {isVisible("due") ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1974 | `              <div className="flex flex-wrap items-center gap-1" style={{ order: orderOf("due") }}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1975 | `                <ChipPopover` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1976 | `                  value={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1977 | `                    <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1978 | `                      className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1979 | `                        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-xs shadow-sm",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1980 | `                        dueChipClass,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1981 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1982 | `                      title={dueMeta.label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1983 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1984 | `                      {dueHasTime ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1985 | `                        <Clock3 className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1986 | `                      ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1987 | `                        <CalendarIcon className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1988 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1989 | `                      <span className="flex items-center gap-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1990 | `                        <span className="text-[10px] font-medium opacity-90">{dueMeta.label}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1991 | `                        <span className="font-semibold">{dueMeta.subtext}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1992 | `                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1993 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1994 | `                  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1995 | `                  render={(close) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1996 | `                    <DueDateEditor` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1997 | `                      task={task}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1998 | `                      onChange={(v) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1999 | `                        openDueChange(v);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2000 | `                        close();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2001 | `                      }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2002 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2003 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2004 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2005 | `                {dueLabel ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2006 | `                  <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2007 | `                    type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2008 | `                    onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2009 | `                    onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2010 | `                      stop(e);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2011 | `                      setHistoryOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2012 | `                    }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2013 | `                    title="Histórico de mudanças de prazo"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2014 | `                    className="inline-flex items-center rounded-sm border border-dashed px-1 py-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2015 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2016 | `                    <History className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2017 | `                  </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2018 | `                ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2019 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2020 | `            ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2021 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2022 | `            {/* Data de criação — bloco próprio */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2023 | `            {isVisible("createdAt") ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2024 | `              <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2025 | `                className="flex flex-wrap items-center gap-1"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2026 | `                style={{ order: orderOf("createdAt") }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2027 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2028 | `                <ChipPopover` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2029 | `                  value={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2030 | `                    <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2031 | `                      className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2032 | `                      title={\`Criada em ${format(new Date(task.created_at), "dd/MM/yyyy", { locale: ptBR })}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2033 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2034 | `                      <CalendarIcon className="h-2.5 w-2.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2035 | `                      Criada · {format(new Date(task.created_at), "dd MMM", { locale: ptBR })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2036 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2037 | `                  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2038 | `                  render={(close) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2039 | `                    <CreatedAtEditor` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2040 | `                      value={task.created_at}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2041 | `                      onChange={(v) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2042 | `                        void update({ created_at: v } as Partial<Task>);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2043 | `                        close();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2044 | `                      }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2045 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2046 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2047 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2048 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2049 | `            ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2050 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2051 | `            {task.completed_at ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2052 | `              <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2053 | `                className="flex flex-wrap items-center gap-1"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2054 | `                style={{ order: orderOf("createdAt") + 0.1 }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2055 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2056 | `                <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2057 | `                  className="inline-flex items-center gap-1 rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-300"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2058 | `                  title={\`Concluída em ${format(new Date(task.completed_at), "dd/MM/yyyy", { locale: ptBR })}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2059 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2060 | `                  <CheckCircle2 className="h-2.5 w-2.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2061 | `                  Concluída · {format(new Date(task.completed_at), "dd MMM", { locale: ptBR })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2062 | `                </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2063 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2064 | `            ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2065 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2066 | `            {isVisible("meta") ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2067 | `              <div className="space-y-0" style={{ order: orderOf("meta") }}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2068 | `                <div className="flex items-center gap-1.5 px-1 py-0.5 text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2069 | `                  <UserIcon className="h-3 w-3 shrink-0" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2070 | `                  <span className="truncate">Criada por: {creatorName}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2071 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2072 | `                {task.assignee_id && task.assigned_by ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2073 | `                  <div className="flex items-center gap-1.5 px-1 py-0.5 text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2074 | `                    <Users className="h-3 w-3 shrink-0" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2075 | `                    <span className="truncate">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2076 | `                      Atribuída por:{" "}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2077 | `                      {assigner?.full_name || assigner?.email || "Usuário não identificado"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2078 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2079 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2080 | `                ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2081 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2082 | `            ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2083 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2084 | `            {/* Meta rows (empty fields) */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2085 | `            {isVisible("meta") ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2086 | `              <div className="space-y-0" style={{ order: orderOf("meta") }}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2087 | `                <CompactRow` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2088 | `                  icon={<UserIcon className="h-3 w-3" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2089 | `                  empty={!assignee}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2090 | `                  label={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2091 | `                    assignee` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2092 | `                      ? assignee.full_name || assignee.email || "Sem nome"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2093 | `                      : "Adicionar responsável"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2094 | `                  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2095 | `                  render={(close) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2096 | `                    <PopoverField label="Responsável">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2097 | `                      <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2098 | `                        value={task.assignee_id ?? "none"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2099 | `                        onValueChange={(v) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2100 | `                          void update({ assignee_id: v === "none" ? null : v });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2101 | `                          close();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2102 | `                        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2103 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2104 | `                        <SelectTrigger className="h-8 text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2105 | `                          <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2106 | `                        </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2107 | `                        <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2108 | `                          <SelectItem value="none">Sem responsável</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2109 | `                          {assignableProfiles.map((p) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2110 | `                            <SelectItem key={p.id} value={p.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2111 | `                              {p.full_name || p.email}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2112 | `                            </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2113 | `                          ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2114 | `                        </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2115 | `                      </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2116 | `                    </PopoverField>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2117 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2118 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2119 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2120 | `                {!client ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2121 | `                  <CompactRow` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2122 | `                    icon={<Users className="h-3 w-3" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2123 | `                    empty` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2124 | `                    label="Adicionar cliente"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2125 | `                    render={(close) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2126 | `                      <PopoverField label="Cliente">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2127 | `                        <ClientPicker` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2128 | `                          clients={clients}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2129 | `                          value={task.client_id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2130 | `                          onChange={(clientId) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2131 | `                            void update({ client_id: clientId });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2132 | `                            close();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2133 | `                          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2134 | `                        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2135 | `                      </PopoverField>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2136 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2137 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2138 | `                ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2139 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2140 | `                <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2141 | `                  type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2142 | `                  onClick={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2143 | `                    stop(event);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2144 | `                    setConversationOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2145 | `                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2146 | `                  className="flex w-full items-center gap-1.5 rounded px-1 py-1 text-left text-[11px] text-primary transition hover:bg-primary/10"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2147 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2148 | `                  <MessageCircle className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2149 | `                  <span>Conversa</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2150 | `                </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2151 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2152 | `            ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2153 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2154 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2155 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2156 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2157 | `      <AttachmentPreviewDialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2158 | `        open={!!previewAttachment}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2159 | `        onOpenChange={(o) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2160 | `          if (!o) setPreviewAttachment(null);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 2161 | `        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2162 | `        attachment={previewAttachment}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2163 | `      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2164 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2165 | `      <TaskConversationDialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2166 | `        open={conversationOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2167 | `        onOpenChange={setConversationOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2168 | `        task={task}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2169 | `      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2170 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2171 | `      <SubtaskDialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2172 | `        open={subtaskDialogOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2173 | `        onOpenChange={setSubtaskDialogOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2174 | `        taskId={task.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2175 | `        subtask={subtaskInDialog}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2176 | `        position={subtaskInDialog?.position ?? subtasks.length}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2177 | `        onSaved={handleSubtaskDialogSaved}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2178 | `      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2179 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2180 | `      {/* Diálogo de justificativa ao mudar prazo */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2181 | `      <Dialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2182 | `        open={dueChange.open}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2183 | `        onOpenChange={(o) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2184 | `          if (!o) setDueChange({ open: false, pending: null, pendingTime: null, reason: "" });` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 2185 | `        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2186 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2187 | `        <DialogContent onPointerDown={stop} onClick={stop} className="max-w-md">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2188 | `          <DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2189 | `            <DialogTitle className="text-sm">Justificar mudança de prazo</DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2190 | `          </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2191 | `          <div className="space-y-2 text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2192 | `            <div className="rounded border bg-muted/50 p-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2193 | `              <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2194 | `                <strong>Prazo anterior:</strong>{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2195 | `                {task.due_date` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2196 | `                  ? format(new Date(task.due_date), "dd/MM/yyyy", { locale: ptBR })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2197 | `                  : "—"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2198 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2199 | `              <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2200 | `                <strong>Novo prazo:</strong>{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2201 | `                {dueChange.pending` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2202 | `                  ? format(new Date(dueChange.pending), "dd/MM/yyyy", { locale: ptBR })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2203 | `                  : "—"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2204 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2205 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2206 | `            <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2207 | `              autoFocus` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2208 | `              value={dueChange.reason}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2209 | `              onChange={(e) => setDueChange((c) => ({ ...c, reason: e.target.value }))}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2210 | `              placeholder="Justificativa obrigatória"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2211 | `              className="min-h-[80px] text-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2212 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2213 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2214 | `          <DialogFooter className="gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2215 | `            <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2216 | `              variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2217 | `              size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2218 | `              onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2219 | `                setDueChange({ open: false, pending: null, pendingTime: null, reason: "" })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2220 | `              }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2221 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2222 | `              Cancelar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2223 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2224 | `            <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2225 | `              size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2226 | `              disabled={!dueChange.reason.trim()}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2227 | `              onClick={() => void confirmDueChange(false)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2228 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2229 | `              Salvar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2230 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2231 | `          </DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2232 | `        </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2233 | `      </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2234 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2235 | `      {/* Justificativa mudança prazo subtarefa */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2236 | `      <Dialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2237 | `        open={subDueReason.open}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2238 | `        onOpenChange={(o) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2239 | `          if (!o)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 2240 | `            setSubDueReason({ open: false, subtask: null, prev: null, next: null, reason: "" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2241 | `        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2242 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2243 | `        <DialogContent onPointerDown={stop} onClick={stop} className="max-w-md">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2244 | `          <DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2245 | `            <DialogTitle className="text-sm">Mudança de prazo da subtarefa</DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2246 | `          </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2247 | `          <div className="space-y-2 text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2248 | `            <div className="rounded border bg-muted/50 p-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2249 | `              <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2250 | `                <strong>Subtarefa:</strong>{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2251 | `                <span dangerouslySetInnerHTML={{ __html: subDueReason.subtask?.title ?? "" }} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2252 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2253 | `              <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2254 | `                <strong>Prazo anterior:</strong>{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2255 | `                {subDueReason.prev` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2256 | `                  ? format(new Date(subDueReason.prev), "dd/MM/yyyy", { locale: ptBR })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2257 | `                  : "sem prazo"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2258 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2259 | `              <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2260 | `                <strong>Novo prazo:</strong>{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2261 | `                {subDueReason.next` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2262 | `                  ? format(new Date(subDueReason.next), "dd/MM/yyyy", { locale: ptBR })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2263 | `                  : "sem prazo"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2264 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2265 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2266 | `            <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2267 | `              autoFocus` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2268 | `              value={subDueReason.reason}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2269 | `              onChange={(e) => setSubDueReason((c) => ({ ...c, reason: e.target.value }))}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2270 | `              placeholder="Justificativa obrigatória — aparece no relatório do cliente"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2271 | `              className="min-h-[80px] text-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2272 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2273 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2274 | `          <DialogFooter className="gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2275 | `            <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2276 | `              variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2277 | `              size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2278 | `              onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2279 | `                setSubDueReason({ open: false, subtask: null, prev: null, next: null, reason: "" })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2280 | `              }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2281 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2282 | `              Cancelar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2283 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2284 | `            <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2285 | `              size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2286 | `              disabled={!subDueReason.reason.trim()}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2287 | `              onClick={async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2288 | `                const st = subDueReason.subtask;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2289 | `                if (!st) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 2290 | `                const nx = subDueReason.next;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2291 | `                const r = subDueReason.reason;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2292 | `                if (!r.trim()) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 2293 | `                setSubDueReason({ open: false, subtask: null, prev: null, next: null, reason: "" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2294 | `                await applySubtaskDue(st, nx, r);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 2295 | `              }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2296 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2297 | `              Salvar com motivo` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2298 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2299 | `          </DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2300 | `        </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2301 | `      </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2302 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2303 | `      {/* Histórico de mudanças de prazo */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2304 | `      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2305 | `        <DialogContent onPointerDown={stop} onClick={stop} className="max-w-lg">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2306 | `          <DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2307 | `            <DialogTitle className="flex items-center gap-2 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2308 | `              <History className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2309 | `              Histórico de prazos` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2310 | `            </DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2311 | `          </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2312 | `          {dueHistory.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2313 | `            <p className="py-4 text-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2314 | `              Nenhuma mudança de prazo registrada.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2315 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2316 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2317 | `            <ul className="max-h-[60vh] space-y-2 overflow-y-auto">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2318 | `              {dueHistory.map((h) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2319 | `                <li key={h.id} className="rounded border p-2 text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2320 | `                  <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2321 | `                    <span>{format(new Date(h.created_at), "dd/MM/yyyy", { locale: ptBR })}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2322 | `                    {h.user_id ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2323 | `                      <span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2324 | `                        por {profiles.find((p) => p.id === h.user_id)?.full_name ?? "usuário"}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2325 | `                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2326 | `                    ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2327 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2328 | `                  <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2329 | `                    <span className="text-muted-foreground">De:</span>{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2330 | `                    <strong>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2331 | `                      {h.old_due_date` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2332 | `                        ? format(new Date(h.old_due_date), "dd/MM/yyyy", { locale: ptBR })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2333 | `                        : "sem prazo"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2334 | `                    </strong>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2335 | `                  </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2336 | `                  <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2337 | `                    <span className="text-muted-foreground">Para:</span>{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2338 | `                    <strong>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2339 | `                      {h.new_due_date` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2340 | `                        ? format(new Date(h.new_due_date), "dd/MM/yyyy", { locale: ptBR })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2341 | `                        : "sem prazo"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2342 | `                    </strong>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2343 | `                  </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2344 | `                  <p className="mt-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2345 | `                    <span className="text-muted-foreground">Motivo: </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2346 | `                    {h.reason ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2347 | `                      <span>{h.reason}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2348 | `                    ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2349 | `                      <em className="text-muted-foreground">não justificado</em>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2350 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2351 | `                  </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2352 | `                </li>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2353 | `              ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2354 | `            </ul>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2355 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2356 | `        </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2357 | `      </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2358 | `    </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2359 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2360 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2361 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2362 | `function statusLabel(s: Task["status"]) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2363 | `  if (!s) return "Sem status";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 2364 | `  return { todo: "A fazer", in_progress: "Em andamento", review: "Em revisão", done: "Concluída" }[` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2365 | `    s` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2366 | `  ];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2367 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2368 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2369 | `function ChipPopover({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2370 | `  value,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2371 | `  render,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2372 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2373 | `  value: React.ReactNode;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2374 | `  render: (close: () => void) => React.ReactNode;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2375 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2376 | `  const [open, setOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2377 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2378 | `    <Popover open={open} onOpenChange={setOpen}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2379 | `      <PopoverTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2380 | `        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2381 | `          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2382 | `          onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2383 | `          onClick={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2384 | `          className="inline-flex items-center"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2385 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2386 | `          {value}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2387 | `        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2388 | `      </PopoverTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2389 | `      <PopoverContent className="w-64 p-3" onPointerDown={stop} onClick={stop}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2390 | `        {render(() => setOpen(false))}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2391 | `      </PopoverContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2392 | `    </Popover>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2393 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2394 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2395 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2396 | `function CompactRow({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2397 | `  icon,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2398 | `  label,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2399 | `  empty,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2400 | `  render,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2401 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2402 | `  icon: React.ReactNode;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2403 | `  label: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2404 | `  empty?: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2405 | `  render: (close: () => void) => React.ReactNode;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2406 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2407 | `  const [open, setOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2408 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2409 | `    <Popover open={open} onOpenChange={setOpen}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2410 | `      <PopoverTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2411 | `        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2412 | `          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2413 | `          onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2414 | `          onClick={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2415 | `          className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2416 | `            "flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left text-[11px] hover:bg-muted",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2417 | `            empty ? "text-muted-foreground/70" : "text-foreground",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2418 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2419 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2420 | `          <span className="text-muted-foreground">{icon}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2421 | `          <span className="truncate">{label}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2422 | `        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2423 | `      </PopoverTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2424 | `      <PopoverContent className="w-64 p-3" onPointerDown={stop} onClick={stop}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2425 | `        {render(() => setOpen(false))}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2426 | `      </PopoverContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2427 | `    </Popover>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2428 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2429 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2430 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2431 | `function PopoverField({ label, children }: { label: string; children: React.ReactNode }) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2432 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2433 | `    <div className="space-y-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2434 | `      <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2435 | `        {label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2436 | `      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2437 | `      {children}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2438 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2439 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2440 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2441 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2442 | `function ClientPicker({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2443 | `  clients,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2444 | `  value,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2445 | `  onChange,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2446 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2447 | `  clients: Client[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2448 | `  value: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2449 | `  onChange: (clientId: string | null) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2450 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2451 | `  const [search, setSearch] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2452 | `  const filteredClients = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2453 | `    const term = search.trim().toLocaleLowerCase("pt-BR");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2454 | `    return term` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2455 | `      ? clients.filter((client) => client.name.toLocaleLowerCase("pt-BR").includes(term))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2456 | `      : clients;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2457 | `  }, [clients, search]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2458 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2459 | `    <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2460 | `      <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2461 | `        autoFocus` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2462 | `        value={search}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2463 | `        onChange={(event) => setSearch(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2464 | `        placeholder="Pesquisar cliente..."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2465 | `        className="h-8 text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2466 | `      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2467 | `      <div className="max-h-56 space-y-1 overflow-y-auto pr-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2468 | `        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2469 | `          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2470 | `          onClick={() => onChange(null)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2471 | `          className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2472 | `            "flex w-full items-center rounded-md px-2 py-1.5 text-left text-xs hover:bg-muted",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2473 | `            !value && "bg-muted font-medium",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2474 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2475 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2476 | `          Nenhum` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2477 | `        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2478 | `        {filteredClients.map((client) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2479 | `          <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2480 | `            key={client.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2481 | `            type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2482 | `            onClick={() => onChange(client.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2483 | `            className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2484 | `              "flex w-full items-center rounded-md px-2 py-1.5 text-left text-xs hover:bg-muted",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2485 | `              value === client.id && "bg-muted font-medium",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2486 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2487 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2488 | `            <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2489 | `              className="mr-2 h-2 w-2 shrink-0 rounded-full"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2490 | `              style={{ backgroundColor: client.color ?? "#94a3b8" }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2491 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2492 | `            <span className="truncate">{client.name}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2493 | `          </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2494 | `        ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2495 | `        {filteredClients.length === 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2496 | `          <p className="px-2 py-2 text-xs text-muted-foreground">Nenhum cliente encontrado.</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2497 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2498 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2499 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2500 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2501 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2502 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2503 | `function SubtaskAssigneePopover({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2504 | `  profiles,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2505 | `  value,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2506 | `  onChange,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2507 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2508 | `  profiles: Profile[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2509 | `  value: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2510 | `  onChange: (v: string) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2511 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2512 | `  const [open, setOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2513 | `  const current = profiles.find((p) => p.id === value) ?? null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2514 | `  const label = current ? current.full_name || current.email || "Responsável" : "Atribuir";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2515 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2516 | `    <Popover open={open} onOpenChange={setOpen}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2517 | `      <PopoverTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2518 | `        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2519 | `          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2520 | `          onPointerDown={(e) => e.stopPropagation()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2521 | `          onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2522 | `            e.stopPropagation();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2523 | `            setOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2524 | `          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2525 | `          className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2526 | `            "inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium leading-none ring-1 transition",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2527 | `            current` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2528 | `              ? "bg-primary/10 text-primary ring-primary/30 hover:bg-primary/15"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2529 | `              : "bg-muted text-muted-foreground ring-border hover:bg-muted/70",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2530 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2531 | `          title={current ? \`Responsável: ${label}\` : "Atribuir responsável"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2532 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2533 | `          <UserIcon className="h-2.5 w-2.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2534 | `          <span className="max-w-[100px] truncate">{label}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2535 | `        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2536 | `      </PopoverTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2537 | `      <PopoverContent` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2538 | `        className="w-56 p-1"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2539 | `        onPointerDown={(e) => e.stopPropagation()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2540 | `        onClick={(e) => e.stopPropagation()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2541 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2542 | `        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2543 | `          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2544 | `          onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2545 | `            onChange("none");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2546 | `            setOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2547 | `          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2548 | `          className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2549 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2550 | `          <span className="grid h-5 w-5 place-items-center rounded-full bg-muted text-[10px]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2551 | `            —` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2552 | `          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2553 | `          Ninguém` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2554 | `        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2555 | `        <div className="my-1 h-px bg-border" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2556 | `        <div className="max-h-56 overflow-y-auto">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2557 | `          {profiles.map((p) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2558 | `            <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2559 | `              key={p.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2560 | `              type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2561 | `              onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2562 | `                onChange(p.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2563 | `                setOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2564 | `              }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2565 | `              className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2566 | `                "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-muted",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2567 | `                value === p.id && "bg-primary/10 text-primary",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2568 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2569 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2570 | `              <Avatar className="h-5 w-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2571 | `                <AvatarImage` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2572 | `                  src={p.avatar_url || undefined}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2573 | `                  alt={p.full_name || p.email || "Usuário"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2574 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2575 | `                <AvatarFallback className="text-[9px]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2576 | `                  {(p.full_name || p.email || "?").slice(0, 1).toUpperCase()}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2577 | `                </AvatarFallback>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2578 | `              </Avatar>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2579 | `              <span className="min-w-0 flex-1 truncate">{p.full_name || p.email}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2580 | `            </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2581 | `          ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2582 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2583 | `      </PopoverContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2584 | `    </Popover>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2585 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2586 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2587 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2588 | `function SubtaskDuePopover({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2589 | `  dueIso,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2590 | `  dueInfo,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2591 | `  onApply,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2592 | `  onClear,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2593 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2594 | `  dueIso: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2595 | `  dueInfo: { label: string; cls: string };` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2596 | `  onApply: (iso: string) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2597 | `  onClear: () => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2598 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2599 | `  const [open, setOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2600 | `  const [dateStr, setDateStr] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2601 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2602 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2603 | `    if (!open) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 2604 | `    setDateStr(dueIso ? format(new Date(dueIso), "yyyy-MM-dd") : "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2605 | `  }, [open, dueIso]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2606 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2607 | `  const save = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2608 | `    if (!dateStr) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 2609 | `      onClear();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2610 | `      setOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2611 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2612 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2613 | `    onApply(new Date(\`${dateStr}T12:00:00\`).toISOString());` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2614 | `    setOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2615 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2616 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2617 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2618 | `    <Popover open={open} onOpenChange={setOpen}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2619 | `      <PopoverTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2620 | `        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2621 | `          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2622 | `          onPointerDown={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2623 | `          onClick={stop}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2624 | `          className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2625 | `            "inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] leading-none transition hover:opacity-90",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2626 | `            dueInfo.cls,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2627 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2628 | `          title="Editar prazo"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2629 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2630 | `          <CalendarIcon className="h-2.5 w-2.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2631 | `          <span>{dueInfo.label}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2632 | `        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2633 | `      </PopoverTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2634 | `      <PopoverContent className="w-64 p-2" onPointerDown={stop} onClick={stop}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2635 | `        <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2636 | `          Prazo da subtarefa` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2637 | `        </Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2638 | `        <div className="mt-1 flex gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2639 | `          <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2640 | `            type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2641 | `            value={dateStr}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2642 | `            onChange={(e) => setDateStr(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2643 | `            className="h-8 flex-1 text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2644 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2645 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2646 | `        <div className="mt-2 flex gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2647 | `          <Button type="button" size="sm" onClick={save} className="h-7 flex-1 text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2648 | `            Salvar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2649 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2650 | `          {dueIso ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2651 | `            <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2652 | `              type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2653 | `              variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2654 | `              size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2655 | `              onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2656 | `                onClear();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2657 | `                setOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2658 | `              }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2659 | `              className="h-7 text-xs text-muted-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2660 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2661 | `              Indefinido` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2662 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2663 | `          ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2664 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2665 | `      </PopoverContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2666 | `    </Popover>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2667 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2668 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2669 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2670 | `function DueDateEditor({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2671 | `  task,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2672 | `  onChange,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2673 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2674 | `  task: Task;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2675 | `  onChange: (v: { dueDate: string | null; dueTime: string | null }) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2676 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2677 | `  const [dateStr, setDateStr] = useState(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2678 | `    task.due_date ? format(new Date(task.due_date), "yyyy-MM-dd") : "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2679 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2680 | `  const [timeStr, setTimeStr] = useState(formatDueTime(task.due_time) ?? "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2681 | `  const commit = () =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2682 | `    onChange({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2683 | `      dueDate: dateStr ? new Date(\`${dateStr}T${DEFAULT_DEADLINE_TIME}:00\`).toISOString() : null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2684 | `      dueTime: dateStr ? timeStr || null : null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2685 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2686 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2687 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2688 | `    <PopoverField label="Prazo">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2689 | `      <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2690 | `        <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2691 | `          type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2692 | `          value={dateStr}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2693 | `          onChange={(e) => setDateStr(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2694 | `          className="h-8 text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2695 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2696 | `        <div className="flex items-center gap-2 rounded-md border bg-muted/30 px-2 py-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2697 | `          <Clock3 className="h-3.5 w-3.5 text-primary" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2698 | `          <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2699 | `            type="time"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2700 | `            step="300"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2701 | `            value={timeStr}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2702 | `            onChange={(e) => setTimeStr(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2703 | `            className="h-7 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2704 | `            aria-label="Hora do prazo (opcional)"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2705 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2706 | `          <span className="text-[10px] text-muted-foreground">Opcional</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2707 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2708 | `        <div className="flex items-center justify-between gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2709 | `          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2710 | `            size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2711 | `            variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2712 | `            className="h-7 text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2713 | `            onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2714 | `              setDateStr("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2715 | `              setTimeStr("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2716 | `              onChange({ dueDate: null, dueTime: null });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2717 | `            }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2718 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2719 | `            Limpar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2720 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2721 | `          <Button size="sm" className="h-7 text-xs" onClick={commit}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2722 | `            Salvar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2723 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2724 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2725 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2726 | `    </PopoverField>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2727 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2728 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2729 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2730 | `function CreatedAtEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2731 | `  const [v, setV] = useState(format(new Date(value), "yyyy-MM-dd"));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2732 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2733 | `    <PopoverField label="Data de criação">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2734 | `      <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2735 | `        <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2736 | `          type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2737 | `          value={v}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2738 | `          onChange={(e) => setV(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2739 | `          className="h-8 text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2740 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2741 | `        <div className="flex justify-end">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2742 | `          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2743 | `            size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2744 | `            className="h-7 text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2745 | `            onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2746 | `              if (v) onChange(new Date(\`${v}T12:00:00\`).toISOString());` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 2747 | `            }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2748 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2749 | `            Salvar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2750 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2751 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2752 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2753 | `    </PopoverField>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2754 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2755 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2756 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2757 | `function DescriptionEditor({ initial, onSave }: { initial: string; onSave: (v: string) => void }) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2758 | `  const [v, setV] = useState(initial);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2759 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2760 | `    <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2761 | `      <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2762 | `        value={v}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2763 | `        onChange={(e) => setV(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2764 | `        placeholder="Observações..."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2765 | `        className="min-h-[120px] text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2766 | `        autoFocus` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2767 | `      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2768 | `      <div className="flex justify-end">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2769 | `        <Button size="sm" className="h-7 text-xs" onClick={() => onSave(v)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2770 | `          Salvar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2771 | `        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2772 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2773 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2774 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2775 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2776 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
