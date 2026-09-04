# src/components/InlineTaskEditor.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { useEffect, useRef, useState, type HTMLAttributes, type KeyboardEvent as ReactKeyboardEvent } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { CheckCircle2, Download, ExternalLink, GripVertical, Image as ImageIcon, Link2, Paperclip, Pencil, RotateCcw, Save, Trash2, X } from "lucide-react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { AttachmentPreviewDialog } from "@/components/AttachmentPreviewDialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import { FileDropZone } from "@/components/FileDropZone";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 8 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 9 | `import { Label } from "@/components/ui/label";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `import { Textarea } from "@/components/ui/textarea";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 13 | `import { useAssignableProfiles, type Client, type KanbanColumn, type Profile, type Task, type TaskTag } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 14 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 15 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 16 | `interface Attachment {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 17 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  task_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  file_name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  storage_path: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `  mime_type: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `  size_bytes: number | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `  uploaded_by: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 26 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 27 | `const LINK_MIME = "text/uri-list";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 28 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 29 | `interface Props {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 30 | `  task: Task;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `  clients: Client[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `  profiles: Profile[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  columns: KanbanColumn[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `  tags: TaskTag[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `  onClose?: () => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 36 | `  onOpenFull?: () => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 37 | `  compact?: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `  dragHandleProps?: HTMLAttributes<HTMLSpanElement>;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 41 | `function toLocalInput(value: string | null) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 42 | `  if (!value) return "";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 43 | `  const date = new Date(value);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 44 | `  return \`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}\`;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 45 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 46 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 47 | `const deadlineToIso = (date: string) => date ? new Date(\`${date}T12:00:00\`).toISOString() : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 48 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 49 | `export function InlineTaskEditor({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 50 | `  task,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `  clients,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `  profiles,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `  columns,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `  tags,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 55 | `  onClose,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 56 | `  onOpenFull,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 57 | `  compact = false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 58 | `  dragHandleProps,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 59 | `}: Props) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `  const qc = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 61 | `  const { user, isAdmin } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 62 | `  const { data: assignableProfiles = [] } = useAssignableProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 63 | `  const fileInputRef = useRef<HTMLInputElement>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 64 | `  const [form, setForm] = useState({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 65 | `    title: task.title,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `    description: task.description ?? "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `    priority: task.priority,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `    status: task.status,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `    due_date: toLocalInput(task.due_date),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `    client_id: task.client_id ?? "none",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `    assignee_id: task.assignee_id ?? "none",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 72 | `    column_id: task.column_id ?? "none",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `    tag_id: task.tag_id ?? "none",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `    color: task.color ?? "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 75 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 76 | `  const [saving, setSaving] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 77 | `  const [attachments, setAttachments] = useState<Attachment[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 78 | `  const [previews, setPreviews] = useState<Record<string, string>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 79 | `  const canDeleteTask = !!isAdmin || task.created_by === user?.id;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 80 | `  const [linkUrl, setLinkUrl] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 81 | `  const [linkLabel, setLinkLabel] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 82 | `  const [previewAttachment, setPreviewAttachment] = useState<Attachment | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 83 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 84 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 85 | `    let cancelled = false;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 86 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 87 | `    async function loadAttachments() {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `      const { data } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 89 | `        .from("attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `        .eq("task_id", task.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `        .order("created_at", { ascending: true });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 93 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 94 | `      if (cancelled) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 95 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 96 | `      const list = (data ?? []) as Attachment[];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 97 | `      setAttachments(list);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 98 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 99 | `      const next: Record<string, string> = {};` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 100 | `      await Promise.all(` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 101 | `        list` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `          .filter((attachment) => attachment.mime_type !== LINK_MIME && (attachment.mime_type?.startsWith("image/") ?? false))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 103 | `          .map(async (attachment) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 104 | `            const { data: signed } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 105 | `              .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `              .createSignedUrl(attachment.storage_path, 3600);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `            if (signed) next[attachment.id] = signed.signedUrl;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 108 | `          }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 110 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 111 | `      if (!cancelled) setPreviews(next);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 112 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 113 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 114 | `    void loadAttachments();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 116 | `      cancelled = true;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 118 | `  }, [task.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 120 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 121 | `    setForm({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `      title: task.title,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `      description: task.description ?? "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `      priority: task.priority,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `      status: task.status,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `      due_date: toLocalInput(task.due_date),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `      client_id: task.client_id ?? "none",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `      assignee_id: task.assignee_id ?? "none",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `      column_id: task.column_id ?? "none",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 130 | `      tag_id: task.tag_id ?? "none",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `      color: task.color ?? "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 133 | `  }, [task]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 135 | `  const save = async (overrides: Partial<typeof form> = {}) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 136 | `    setSaving(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `    const merged = { ...form, ...overrides };` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 138 | `    const payload = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 139 | `      title: merged.title.trim() || "Sem título",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `      description: merged.description || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 141 | `      priority: merged.priority,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 142 | `      status: merged.status,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 143 | `      due_date: deadlineToIso(merged.due_date),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 144 | `      client_id: merged.client_id === "none" ? null : merged.client_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 145 | `      assignee_id: merged.assignee_id === "none" ? null : merged.assignee_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 146 | `      column_id: merged.column_id === "none" ? null : merged.column_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 147 | `      tag_id: merged.tag_id === "none" ? null : merged.tag_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 148 | `      color: merged.color || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `      completed_at: merged.status === "done" ? task.completed_at ?? new Date().toISOString() : null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 150 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 151 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 152 | `    const { error } = await supabase.from("tasks").update(payload).eq("id", task.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 153 | `    setSaving(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 155 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 156 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 157 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 158 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 159 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 160 | `    toast.success("Alterações salvas");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `    void qc.invalidateQueries({ queryKey: ["tasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 163 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 164 | `  const remove = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 165 | `    if (!confirm("Excluir esta tarefa?")) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 166 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 167 | `    const { error } = await supabase.from("tasks").delete().eq("id", task.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 168 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 169 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 170 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 171 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 172 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 173 | `    toast.success("Tarefa excluída");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `    void qc.invalidateQueries({ queryKey: ["tasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 175 | `    onClose?.();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 176 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 177 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 178 | `  const toggleDone = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 179 | `    const nextStatus: Task["status"] = form.status === "done" ? "in_progress" : "done";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 180 | `    setForm((current) => ({ ...current, status: nextStatus }));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 181 | `    await save({ status: nextStatus });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 182 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 183 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 184 | `  const uploadFile = async (file: File) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 185 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 186 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 187 | `    const safeName =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 188 | `      file.name` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 189 | `        .normalize("NFD")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 190 | `        .replace(/[\u0300-\u036f]/g, "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 191 | `        .replace(/[^a-zA-Z0-9._-]+/g, "_")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 192 | `        .replace(/_+/g, "_")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 193 | `        .slice(-120) || "arquivo";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 194 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 195 | `    const path = \`${task.id}/${Date.now()}-${safeName}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 196 | `    const contentType = file.type || "application/octet-stream";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 197 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 198 | `    const { error: uploadError } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 199 | `      .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 200 | `      .upload(path, file, { contentType, upsert: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 201 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 202 | `    if (uploadError) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 203 | `      toast.error(\`Falha no upload: ${uploadError.message}\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 204 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 205 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 206 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 207 | `    const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 208 | `      .from("attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 209 | `      .insert({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 210 | `        task_id: task.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 211 | `        file_name: file.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 212 | `        storage_path: path,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 213 | `        mime_type: contentType,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 214 | `        size_bytes: file.size,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 215 | `        uploaded_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 216 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 217 | `      .select()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 218 | `      .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 219 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 220 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 221 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 222 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 223 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 224 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 225 | `    const attachment = data as Attachment;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 226 | `    setAttachments((current) => [...current, attachment]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 227 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 228 | `    if (attachment.mime_type?.startsWith("image/")) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 229 | `      const { data: signed } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 230 | `        .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 231 | `        .createSignedUrl(attachment.storage_path, 3600);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 232 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 233 | `      if (signed) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 234 | `        setPreviews((current) => ({ ...current, [attachment.id]: signed.signedUrl }));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 235 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 236 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 237 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 238 | `    toast.success("Arquivo enviado");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 239 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 240 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 241 | `  const addLink = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 242 | `    if (!user || !linkUrl.trim()) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 243 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 244 | `    let url = linkUrl.trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 245 | `    if (!/^https?:\/\//i.test(url)) url = \`https://${url}\`;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 246 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 247 | `    const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 248 | `      .from("attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 249 | `      .insert({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 250 | `        task_id: task.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 251 | `        file_name: linkLabel.trim() || url,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 252 | `        storage_path: url,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 253 | `        mime_type: LINK_MIME,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 254 | `        uploaded_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 255 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 256 | `      .select()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 257 | `      .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 258 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 259 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 260 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 261 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 262 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 263 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 264 | `    setAttachments((current) => [...current, data as Attachment]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 265 | `    setLinkUrl("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 266 | `    setLinkLabel("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 267 | `    toast.success("Link adicionado");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 268 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 269 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 270 | `  const openAttachment = (attachment: Attachment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 271 | `    if (attachment.mime_type === LINK_MIME) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 272 | `      window.open(attachment.storage_path, "_blank", "noopener,noreferrer");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 273 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 274 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 275 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 276 | `    setPreviewAttachment(attachment);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 277 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 278 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 279 | `  const downloadAttachment = async (attachment: Attachment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 280 | `    if (attachment.mime_type === LINK_MIME) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 281 | `      openAttachment(attachment);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 282 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 283 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 284 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 285 | `    const { data, error } = await supabase.storage.from("task-attachments").download(attachment.storage_path);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 286 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 287 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 288 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 289 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 290 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 291 | `    const blobUrl = URL.createObjectURL(data);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 292 | `    const anchor = document.createElement("a");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 293 | `    anchor.href = blobUrl;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 294 | `    anchor.download = attachment.file_name;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 295 | `    document.body.appendChild(anchor);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 296 | `    anchor.click();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 297 | `    anchor.remove();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 298 | `    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 30_000);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 299 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 300 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 301 | `  const deleteAttachment = async (attachment: Attachment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 302 | `    if (attachment.mime_type !== LINK_MIME) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 303 | `      await supabase.storage.from("task-attachments").remove([attachment.storage_path]);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 304 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 305 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 306 | `    await supabase.from("attachments").delete().eq("id", attachment.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 307 | `    setAttachments((current) => current.filter((item) => item.id !== attachment.id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 308 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 309 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 310 | `  const handleSaveOnEnter = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 311 | `    if (event.key === "Enter" && !event.shiftKey) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 312 | `      event.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 313 | `      void save();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 314 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 315 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 316 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 317 | `  const selectTriggerClass = compact ? "h-8 text-xs" : "h-7 text-xs";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 318 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 319 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 320 | `    <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 321 | `      <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 322 | `        className={compact ? "rounded-lg border bg-card p-3 shadow-sm" : "max-h-[75vh] overflow-y-auto rounded-lg border bg-card p-3 shadow-md ring-2 ring-primary/40"}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 323 | `        onClick={(event) => event.stopPropagation()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 324 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 325 | `        <div className="mb-3 flex items-start justify-between gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 326 | `          <div className="flex min-w-0 items-center gap-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 327 | `            {compact && dragHandleProps ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 328 | `              <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 329 | `                {...dragHandleProps}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 330 | `                onClick={(event) => event.stopPropagation()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 331 | `                className="inline-flex h-7 w-7 shrink-0 cursor-grab items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground active:cursor-grabbing"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 332 | `                title="Arrastar tarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 333 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 334 | `                <GripVertical className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 335 | `              </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 336 | `            ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 337 | `            <span className="truncate text-[10px] uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 338 | `              {compact ? "Inline" : "Editando"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 339 | `            </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 340 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 341 | `          <div className="flex shrink-0 items-center gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 342 | `            {onOpenFull ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 343 | `              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onOpenFull} title="Tela cheia">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 344 | `                <Pencil className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 345 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 346 | `            ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 347 | `            {!compact && onClose ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 348 | `              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onClose} title="Fechar">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 349 | `                <X className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 350 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 351 | `            ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 352 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 353 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 354 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 355 | `        <div className="space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 356 | `          <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 357 | `            <Label className="text-[10px] text-muted-foreground">Nome</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 358 | `            <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 359 | `              value={form.title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 360 | `              onChange={(event) => setForm({ ...form, title: event.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 361 | `              onKeyDown={handleSaveOnEnter}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 362 | `              placeholder="Nome da tarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 363 | `              className="mt-1 min-h-[54px] resize-none overflow-hidden text-sm font-medium leading-snug [overflow-wrap:anywhere]"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 364 | `              autoFocus={!compact}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 365 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 366 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 367 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 368 | `          <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 369 | `            <Label className="text-[10px] text-muted-foreground">Observação</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 370 | `            <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 371 | `              value={form.description}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 372 | `              onChange={(event) => setForm({ ...form, description: event.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 373 | `              onKeyDown={handleSaveOnEnter}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 374 | `              placeholder="Observações da tarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 375 | `              className="mt-1 min-h-[88px] resize-y text-xs leading-relaxed [overflow-wrap:anywhere]"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 376 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 377 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 378 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 379 | `          <div className="grid grid-cols-2 gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 380 | `            <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 381 | `              <Label className="text-[10px] text-muted-foreground">Tag</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 382 | `              <Select value={form.tag_id} onValueChange={(value) => setForm({ ...form, tag_id: value })}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 383 | `                <SelectTrigger className={selectTriggerClass}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 384 | `                  <SelectValue placeholder="Sem tag" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 385 | `                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 386 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 387 | `                  <SelectItem value="none">Sem tag</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 388 | `                  {tags.map((tag) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 389 | `                    <SelectItem key={tag.id} value={tag.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 390 | `                      <span className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 391 | `                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: tag.color }} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 392 | `                        {tag.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 393 | `                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 394 | `                    </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 395 | `                  ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 396 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 397 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 398 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 399 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 400 | `            <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 401 | `              <Label className="text-[10px] text-muted-foreground">Status</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 402 | `              <Select value={form.status ?? "none"} onValueChange={(value) => setForm({ ...form, status: value === "none" ? null : (value as Task["status"]) })}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 403 | `                <SelectTrigger className={selectTriggerClass}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 404 | `                  <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 405 | `                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 406 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 407 | `                  <SelectItem value="none">Sem status</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 408 | `                  <SelectItem value="todo">A fazer</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 409 | `                  <SelectItem value="in_progress">Em andamento</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 410 | `                  <SelectItem value="review">Em revisão</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 411 | `                  <SelectItem value="done">Concluída</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 412 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 413 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 414 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 415 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 416 | `            <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 417 | `              <Label className="text-[10px] text-muted-foreground">Prioridade</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 418 | `              <Select value={form.priority ?? "none"} onValueChange={(value) => setForm({ ...form, priority: value === "none" ? null : (value as Task["priority"]) })}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 419 | `                <SelectTrigger className={selectTriggerClass}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 420 | `                  <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 421 | `                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 422 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 423 | `                  <SelectItem value="none">Sem prioridade</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 424 | `                  <SelectItem value="low">Baixa</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 425 | `                  <SelectItem value="medium">Média</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 426 | `                  <SelectItem value="high">Alta</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 427 | `                  <SelectItem value="urgent">Urgente</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 428 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 429 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 430 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 431 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 432 | `            <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 433 | `              <Label className="text-[10px] text-muted-foreground">Cliente</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 434 | `              <Select value={form.client_id} onValueChange={(value) => setForm({ ...form, client_id: value })}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 435 | `                <SelectTrigger className={selectTriggerClass}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 436 | `                  <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 437 | `                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 438 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 439 | `                  <SelectItem value="none">Nenhum</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 440 | `                  {clients.map((client) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 441 | `                    <SelectItem key={client.id} value={client.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 442 | `                      {client.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 443 | `                    </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 444 | `                  ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 445 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 446 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 447 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 448 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 449 | `            <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 450 | `              <Label className="text-[10px] text-muted-foreground">Responsável</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 451 | `              <Select value={form.assignee_id} onValueChange={(value) => setForm({ ...form, assignee_id: value })}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 452 | `                <SelectTrigger className={selectTriggerClass}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 453 | `                  <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 454 | `                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 455 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 456 | `                  <SelectItem value="none">Sem responsável</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 457 | `                  {assignableProfiles.map((profile) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 458 | `                    <SelectItem key={profile.id} value={profile.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 459 | `                      {profile.full_name || profile.email}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 460 | `                    </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 461 | `                  ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 462 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 463 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 464 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 465 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 466 | `            <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 467 | `              <Label className="text-[10px] text-muted-foreground">Prazo</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 468 | `              <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 469 | `                type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 470 | `                value={form.due_date}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 471 | `                onChange={(event) => setForm({ ...form, due_date: event.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 472 | `                className={selectTriggerClass}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 473 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 474 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 475 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 476 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 477 | `          {!compact ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 478 | `            <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 479 | `              <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 480 | `                <Label className="text-[10px] text-muted-foreground">Coluna</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 481 | `                <Select value={form.column_id} onValueChange={(value) => setForm({ ...form, column_id: value })}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 482 | `                  <SelectTrigger className={selectTriggerClass}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 483 | `                    <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 484 | `                  </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 485 | `                  <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 486 | `                    <SelectItem value="none">Sem coluna</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 487 | `                    {columns.map((column) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 488 | `                      <SelectItem key={column.id} value={column.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 489 | `                        {column.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 490 | `                      </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 491 | `                    ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 492 | `                  </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 493 | `                </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 494 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 495 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 496 | `              <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 497 | `                <Label className="text-[10px] text-muted-foreground">Cor</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 498 | `                <input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 499 | `                  type="color"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 500 | `                  value={form.color || "#1e3a8a"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 501 | `                  onChange={(event) => setForm({ ...form, color: event.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 502 | `                  className="h-7 w-10 cursor-pointer rounded border bg-transparent"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 503 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 504 | `                {form.color ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 505 | `                  <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px]" onClick={() => setForm({ ...form, color: "" })}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 506 | `                    Limpar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 507 | `                  </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 508 | `                ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 509 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 510 | `            </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 511 | `          ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 512 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 513 | `          <FileDropZone` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 514 | `            onFiles={(files) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 515 | `              const file = files.item(0);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 516 | `              if (file) void uploadFile(file);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 517 | `            }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 518 | `            className="space-y-2 rounded-md border border-dashed p-2"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 519 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 520 | `            <div className="flex items-center justify-between gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 521 | `              <Label className="flex items-center gap-1 text-[10px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 522 | `                <Paperclip className="h-3 w-3" />Arquivos` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 523 | `              </Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 524 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 525 | `                type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 526 | `                size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 527 | `                variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 528 | `                className="h-6 px-2 text-[10px]"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 529 | `                onClick={() => fileInputRef.current?.click()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 530 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 531 | `                <ImageIcon className="mr-1 h-3 w-3" />Enviar arquivo` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 532 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 533 | `              <input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 534 | `                ref={fileInputRef}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 535 | `                type="file"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 536 | `                accept="*/*"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 537 | `                hidden` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 538 | `                onChange={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 539 | `                  const file = event.target.files?.[0];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 540 | `                  if (file) void uploadFile(file);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 541 | `                  event.target.value = "";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 542 | `                }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 543 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 544 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 545 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 546 | `            {attachments.length > 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 547 | `              <ul className="space-y-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 548 | `                {attachments.map((attachment) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 549 | `                  const isLink = attachment.mime_type === LINK_MIME;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 550 | `                  const isImage = !isLink && attachment.mime_type?.startsWith("image/");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 551 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 552 | `                  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 553 | `                    <li key={attachment.id} className="rounded border bg-muted/30 p-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 554 | `                      <div className="flex items-start gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 555 | `                        {isImage && previews[attachment.id] ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 556 | `                          <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 557 | `                            type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 558 | `                            onClick={() => openAttachment(attachment)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 559 | `                            className="h-10 w-10 shrink-0 overflow-hidden rounded border"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 560 | `                            title="Visualizar"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 561 | `                          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 562 | `                            <img src={previews[attachment.id]} alt={attachment.file_name} className="h-full w-full object-cover" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 563 | `                          </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 564 | `                        ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 565 | `                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border bg-background text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 566 | `                            {isLink ? <Link2 className="h-4 w-4" /> : <Paperclip className="h-4 w-4" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 567 | `                          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 568 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 569 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 570 | `                        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 571 | `                          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 572 | `                          onClick={() => openAttachment(attachment)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 573 | `                          className="min-w-0 flex-1 text-left text-xs leading-snug text-foreground transition hover:underline [overflow-wrap:anywhere]"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 574 | `                          title={isLink ? attachment.storage_path : attachment.file_name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 575 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 576 | `                          {attachment.file_name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 577 | `                        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 578 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 579 | `                        <div className="flex shrink-0 items-center gap-0.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 580 | `                          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => openAttachment(attachment)} title="Abrir">` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 581 | `                            <ExternalLink className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 582 | `                          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 583 | `                          {!isLink ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 584 | `                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => downloadAttachment(attachment)} title="Baixar">` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 585 | `                              <Download className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 586 | `                            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 587 | `                          ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 588 | `                          <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive" onClick={() => void deleteAttachment(attachment)} title="Remover">` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 589 | `                            <X className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 590 | `                          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 591 | `                        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 592 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 593 | `                    </li>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 594 | `                  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 595 | `                })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 596 | `              </ul>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 597 | `            ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 598 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 599 | `            <div className="flex flex-col gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 600 | `              <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 601 | `                value={linkLabel}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 602 | `                onChange={(event) => setLinkLabel(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 603 | `                placeholder="Rótulo do link (opcional)"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 604 | `                className="h-7 text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 605 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 606 | `              <div className="flex gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 607 | `                <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 608 | `                  value={linkUrl}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 609 | `                  onChange={(event) => setLinkUrl(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 610 | `                  placeholder="https://..."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 611 | `                  className="h-7 text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 612 | `                  onKeyDown={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 613 | `                    if (event.key === "Enter") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 614 | `                      event.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 615 | `                      void addLink();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 616 | `                    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 617 | `                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 618 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 619 | `                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => void addLink()} disabled={!linkUrl.trim()}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 620 | `                  <Link2 className="mr-1 h-3 w-3" />Adicionar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 621 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 622 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 623 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 624 | `          </FileDropZone>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 625 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 626 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 627 | `        <div className="mt-3 flex items-center justify-between gap-2 border-t pt-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 628 | `          {canDeleteTask && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 629 | `            <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive" onClick={() => void remove()}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 630 | `              <Trash2 className="mr-1 h-3 w-3" />Excluir` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 631 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 632 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 633 | `          <div className="flex items-center gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 634 | `            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => void toggleDone()}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 635 | `              {form.status === "done" ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 636 | `                <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 637 | `                  <RotateCcw className="mr-1 h-3 w-3" />Reabrir` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 638 | `                </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 639 | `              ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 640 | `                <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 641 | `                  <CheckCircle2 className="mr-1 h-3 w-3" />Concluir` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 642 | `                </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 643 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 644 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 645 | `            <Button size="sm" className="h-7 text-xs" onClick={() => void save()} disabled={saving}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 646 | `              <Save className="mr-1 h-3 w-3" />Salvar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 647 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 648 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 649 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 650 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 651 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 652 | `      <AttachmentPreviewDialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 653 | `        open={!!previewAttachment}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 654 | `        onOpenChange={(open) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 655 | `          if (!open) setPreviewAttachment(null);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 656 | `        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 657 | `        attachment={previewAttachment}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 658 | `      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 659 | `    </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 660 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 661 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 662 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
