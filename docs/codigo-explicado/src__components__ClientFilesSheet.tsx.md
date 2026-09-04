# src/components/ClientFilesSheet.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { useEffect, useMemo, useRef, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `  Sheet,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 4 | `  SheetContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 5 | `  SheetHeader,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 6 | `  SheetTitle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `  SheetDescription,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `} from "@/components/ui/sheet";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `import { Checkbox } from "@/components/ui/checkbox";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 13 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 14 | `  Select,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  SelectContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  SelectItem,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  SelectTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  SelectValue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `} from "@/components/ui/select";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 21 | `  ArrowDown,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `  ArrowUp,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `  ChevronDown,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  ExternalLink,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `  FileText,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `  Paperclip,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `  Trash2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `} from "lucide-react";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 30 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 31 | `import { useClients, useProfiles } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 32 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 33 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 34 | `  AttachmentPreviewDialog,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `  type PreviewableAttachment,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 36 | `} from "@/components/AttachmentPreviewDialog";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `import { FileDropZone } from "@/components/FileDropZone";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 38 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 39 | `  removeTaskAttachmentAndClientCopy,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `  taskAttachmentIdFromClientFilePath,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `} from "@/lib/sync-task-attachment-to-client";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 43 | `const PREVIEWABLE_MIME_RE = /^(image\/|video\/|audio\/|text\/)|application\/pdf|json/i;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 44 | `const sb = supabase as any;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 45 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 46 | `interface ClientFile {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 47 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `  client_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `  title: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `  file_name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `  storage_path: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `  mime_type: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `  size_bytes: number | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `  position: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 55 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 56 | `  uploaded_by: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 57 | `  source_attachment_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 58 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 59 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 60 | `export function ClientFilesSheet({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 61 | `  open,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `  onOpenChange,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 63 | `  initialClientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `  open: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `  onOpenChange: (v: boolean) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 67 | `  initialClientId?: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `  const { user, isAdmin } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 70 | `  const { data: clients = [] } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 71 | `  const { data: profiles = [] } = useProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 72 | `  const [clientId, setClientId] = useState<string | null>(initialClientId ?? null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 73 | `  const [selectedUploaderIds, setSelectedUploaderIds] = useState<string[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 74 | `  const [files, setFiles] = useState<ClientFile[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 75 | `  const [urls, setUrls] = useState<Record<string, string>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 76 | `  const [uploading, setUploading] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 77 | `  const [preview, setPreview] = useState<PreviewableAttachment | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 78 | `  const loadRequestRef = useRef(0);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 79 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 80 | `  const filterableProfiles = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 81 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 82 | `      [...profiles].sort((first, second) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 83 | `        if (first.id === user?.id) return -1;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 84 | `        if (second.id === user?.id) return 1;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 85 | `        return 0;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 86 | `      }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `    [profiles, user?.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 89 | `  const profilesById = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 90 | `    () => new Map(profiles.map((profile) => [profile.id, profile])),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 91 | `    [profiles],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 93 | `  const selectedProfiles = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 94 | `    () => filterableProfiles.filter((profile) => selectedUploaderIds.includes(profile.id)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 95 | `    [filterableProfiles, selectedUploaderIds],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 96 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 97 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 98 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 99 | `    if (initialClientId) setClientId(initialClientId);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 100 | `  }, [initialClientId]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 101 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 102 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 103 | `    if (open && !clientId && clients[0]) setClientId(clients[0].id);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 104 | `  }, [open, clients, clientId]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 105 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 106 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 107 | `    if (open && isAdmin && user?.id) setSelectedUploaderIds([user.id]);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 108 | `  }, [open, isAdmin, user?.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 110 | `  const load = async (cid: string, uploaderIds: string[]) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 111 | `    const requestId = ++loadRequestRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 112 | `    let query = sb` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 113 | `      .from("client_files")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `      .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `      .eq("client_id", cid)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 116 | `      .order("position", { ascending: true })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `      .order("created_at", { ascending: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `    if (isAdmin) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 119 | `      if (!uploaderIds.length) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 120 | `      query = query.in("uploaded_by", uploaderIds);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `    } else if (user?.id) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `      query = query.eq("uploaded_by", user.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 124 | `    const { data, error } = await query;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 125 | `    if (requestId !== loadRequestRef.current) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 126 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 127 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 129 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 130 | `    const list = (data ?? []) as ClientFile[];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 131 | `    setFiles(list);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `    const next: Record<string, string> = {};` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 133 | `    await Promise.all(` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 134 | `      list.map(async (f) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 135 | `        const { data: signed } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 136 | `          .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `          .createSignedUrl(f.storage_path, 3600);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `        if (signed) next[f.id] = signed.signedUrl;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 139 | `      }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 141 | `    if (requestId !== loadRequestRef.current) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 142 | `    setUrls(next);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 143 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 144 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 145 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 146 | `    if (open && clientId && (!isAdmin || selectedUploaderIds.length)) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 147 | `      void load(clientId, selectedUploaderIds);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 148 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 149 | `  }, [open, clientId, isAdmin, selectedUploaderIds, user?.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 150 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 151 | `  const toggleUploader = (uploaderId: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 152 | `    setSelectedUploaderIds((current) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 153 | `      if (!current.includes(uploaderId)) return [...current, uploaderId];` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 154 | `      if (current.length === 1) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 155 | `        toast.error("Selecione ao menos um usuário.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `        return current;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 157 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 158 | `      return current.filter((id) => id !== uploaderId);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 159 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 160 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 161 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 162 | `  const selectedUploaderLabel = selectedProfiles` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 163 | `    .map((profile) => profile.full_name || profile.email || "Usuário sem nome")` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 164 | `    .join(", ");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 165 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 166 | `  const onUpload = async (fl: FileList | null) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 167 | `    if (!fl || !fl.length || !user || !clientId) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 168 | `    setUploading(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 169 | `    const startPos = files.length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 170 | `    let i = 0;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 171 | `    for (const file of Array.from(fl)) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 172 | `      const safe = file.name` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 173 | `        .normalize("NFD")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `        .replace(/[\u0300-\u036f]/g, "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 175 | `        .replace(/[^a-zA-Z0-9._-]+/g, "_");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 176 | `      const path = \`clients/${clientId}/${Date.now()}_${safe}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 177 | `      const { error: upErr } = await supabase.storage.from("task-attachments").upload(path, file);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 178 | `      if (upErr) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 179 | `        toast.error(upErr.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 180 | `        continue;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 181 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 182 | `      const { error: insErr } = await sb.from("client_files").insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 183 | `        client_id: clientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 184 | `        title: file.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 185 | `        file_name: file.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 186 | `        storage_path: path,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 187 | `        mime_type: file.type,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 188 | `        size_bytes: file.size,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 189 | `        uploaded_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 190 | `        position: startPos + i,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 191 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 192 | `      if (insErr) toast.error(insErr.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 193 | `      i++;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 194 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 195 | `    setUploading(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 196 | `    const nextUploaderIds =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 197 | `      isAdmin && !selectedUploaderIds.includes(user.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `        ? [...selectedUploaderIds, user.id]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 199 | `        : selectedUploaderIds;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 200 | `    if (nextUploaderIds !== selectedUploaderIds) setSelectedUploaderIds(nextUploaderIds);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 201 | `    else if (clientId) void load(clientId, nextUploaderIds);` | Define o caminho alternativo da condicao anterior. |
| 202 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 203 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 204 | `  const updateTitle = async (id: string, title: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 205 | `    setFiles((curr) => curr.map((f) => (f.id === id ? { ...f, title } : f)));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 206 | `    const { error } = await sb.from("client_files").update({ title }).eq("id", id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 207 | `    if (error) toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 208 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 209 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 210 | `  const remove = async (f: ClientFile) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 211 | `    if (!confirm(\`Excluir "${f.title || f.file_name}"?\`)) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 212 | `    const sourceAttachmentId =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 213 | `      f.source_attachment_id ?? taskAttachmentIdFromClientFilePath(f.storage_path);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 214 | `    if (sourceAttachmentId) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 215 | `      try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 216 | `        await removeTaskAttachmentAndClientCopy(sourceAttachmentId);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 217 | `      } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 218 | `        toast.error(error instanceof Error ? error.message : "Não foi possível excluir o arquivo.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 219 | `        return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 220 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 221 | `      if (clientId) void load(clientId, selectedUploaderIds);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 222 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 223 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 224 | `    await supabase.storage.from("task-attachments").remove([f.storage_path]);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 225 | `    await sb.from("client_files").delete().eq("id", f.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 226 | `    if (clientId) void load(clientId, selectedUploaderIds);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 227 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 228 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 229 | `  const move = async (id: string, dir: -1 | 1) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 230 | `    const idx = files.findIndex((f) => f.id === id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 231 | `    const swap = idx + dir;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 232 | `    if (idx < 0 || swap < 0 || swap >= files.length) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 233 | `    const next = [...files];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 234 | `    [next[idx], next[swap]] = [next[swap], next[idx]];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 235 | `    const reIndexed = next.map((f, i) => ({ ...f, position: i }));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 236 | `    setFiles(reIndexed);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 237 | `    await Promise.all(` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 238 | `      reIndexed.map((f) => sb.from("client_files").update({ position: f.position }).eq("id", f.id)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 239 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 240 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 241 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 242 | `  const openFile = (f: ClientFile) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 243 | `    const canPreview = PREVIEWABLE_MIME_RE.test(f.mime_type ?? "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 244 | `    if (canPreview) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 245 | `      setPreview({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 246 | `        file_name: f.title || f.file_name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 247 | `        storage_path: f.storage_path,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 248 | `        mime_type: f.mime_type,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 249 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 250 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 251 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 252 | `    const u = urls[f.id];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 253 | `    if (u) window.open(u, "_blank", "noopener,noreferrer");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 254 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 255 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 256 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 257 | `    <Sheet open={open} onOpenChange={onOpenChange}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 258 | `      <SheetContent side="right" className="flex w-full max-w-2xl flex-col p-0 sm:max-w-2xl">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 259 | `        <SheetHeader className="border-b px-4 py-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 260 | `          <SheetTitle className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 261 | `            <Paperclip className="h-4 w-4" /> Arquivos do cliente` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 262 | `          </SheetTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 263 | `          <SheetDescription>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 264 | `            Apenas arquivos. Defina título e reordene com as setas. Aceita qualquer tipo.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 265 | `          </SheetDescription>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 266 | `        </SheetHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 267 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 268 | `        <FileDropZone` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 269 | `          onFiles={(uploadedFiles) => void onUpload(uploadedFiles)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 270 | `          disabled={!clientId || uploading}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 271 | `          className="border-b px-4 py-3"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 272 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 273 | `          <div className="flex flex-wrap items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 274 | `            <Select value={clientId ?? undefined} onValueChange={(v) => setClientId(v)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 275 | `              <SelectTrigger className="w-[260px]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 276 | `                <SelectValue placeholder="Selecione um cliente" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 277 | `              </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 278 | `              <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 279 | `                {clients.map((c) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 280 | `                  <SelectItem key={c.id} value={c.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 281 | `                    {c.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 282 | `                  </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 283 | `                ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 284 | `              </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 285 | `            </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 286 | `            {isAdmin && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 287 | `              <Popover>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 288 | `                <PopoverTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 289 | `                  <Button variant="outline" className="w-[220px] justify-between font-normal">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 290 | `                    <span className="truncate text-left">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 291 | `                      {selectedProfiles.length === 0 && selectedUploaderIds.length === 1` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 292 | `                        ? "Meu usuário"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 293 | `                        : selectedProfiles.length === 1` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 294 | `                          ? selectedUploaderLabel` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 295 | `                          : \`${selectedProfiles.length} usuários selecionados\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 296 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 297 | `                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 298 | `                  </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 299 | `                </PopoverTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 300 | `                <PopoverContent` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 301 | `                  align="start"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 302 | `                  className="w-[var(--radix-popover-trigger-width)] p-2"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 303 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 304 | `                  <div className="mb-2 flex items-center justify-between gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 305 | `                    <span className="px-1 text-xs font-medium">Usuários</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 306 | `                    <div className="flex items-center gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 307 | `                      <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 308 | `                        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 309 | `                        variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 310 | `                        size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 311 | `                        className="h-7 px-2 text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 312 | `                        onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 313 | `                          setSelectedUploaderIds(filterableProfiles.map((profile) => profile.id))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 314 | `                        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 315 | `                        disabled={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 316 | `                          !filterableProfiles.length ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 317 | `                          selectedUploaderIds.length === filterableProfiles.length` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 318 | `                        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 319 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 320 | `                        Todos` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 321 | `                      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 322 | `                      <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 323 | `                        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 324 | `                        variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 325 | `                        size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 326 | `                        className="h-7 px-2 text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 327 | `                        onClick={() => user?.id && setSelectedUploaderIds([user.id])}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 328 | `                        disabled={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 329 | `                          selectedUploaderIds.length === 1 && selectedUploaderIds[0] === user?.id` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 330 | `                        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 331 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 332 | `                        Somente eu` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 333 | `                      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 334 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 335 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 336 | `                  <div className="max-h-64 space-y-1 overflow-y-auto">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 337 | `                    {filterableProfiles.map((profile) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 338 | `                      <label` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 339 | `                        key={profile.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 340 | `                        className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 341 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 342 | `                        <Checkbox` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 343 | `                          checked={selectedUploaderIds.includes(profile.id)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 344 | `                          onCheckedChange={() => toggleUploader(profile.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 345 | `                        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 346 | `                        <span className="truncate">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 347 | `                          {profile.id === user?.id` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 348 | `                            ? \`${profile.full_name || profile.email || "Meu usuário"} (você)\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 349 | `                            : \`${profile.full_name || profile.email || "Usuário sem nome"}${profile.is_active === false ? " (inativo)" : ""}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 350 | `                        </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 351 | `                      </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 352 | `                    ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 353 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 354 | `                </PopoverContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 355 | `              </Popover>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 356 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 357 | `            <label className="cursor-pointer">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 358 | `              <input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 359 | `                type="file"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 360 | `                multiple` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 361 | `                accept="*/*"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 362 | `                className="hidden"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 363 | `                onChange={(e) => void onUpload(e.target.files)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 364 | `                disabled={!clientId || uploading}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 365 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 366 | `              <span className="inline-flex items-center rounded-md border bg-background px-3 py-1.5 text-sm hover:bg-muted">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 367 | `                {uploading ? "Enviando…" : "+ Adicionar arquivo"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 368 | `              </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 369 | `            </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 370 | `            {clientId && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 371 | `              <p className="ml-auto text-xs text-muted-foreground">{files.length} arquivo(s)</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 372 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 373 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 374 | `        </FileDropZone>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 375 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 376 | `        <div className="flex-1 overflow-y-auto p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 377 | `          {!clientId ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 378 | `            <p className="rounded border border-dashed p-6 text-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 379 | `              Selecione um cliente para ver e gerenciar arquivos.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 380 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 381 | `          ) : files.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 382 | `            <p className="rounded border border-dashed p-6 text-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 383 | `              Nenhum arquivo enviado para este cliente.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 384 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 385 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 386 | `            <ul className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 387 | `              {files.map((f, i) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 388 | `                const isImage = f.mime_type?.startsWith("image/");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 389 | `                const canPreview = PREVIEWABLE_MIME_RE.test(f.mime_type ?? "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 390 | `                return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 391 | `                  <li key={f.id} className="flex items-center gap-3 rounded-lg border bg-card p-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 392 | `                    <div className="flex flex-col">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 393 | `                      <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 394 | `                        size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 395 | `                        variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 396 | `                        className="h-6 w-6"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 397 | `                        onClick={() => void move(f.id, -1)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 398 | `                        disabled={i === 0}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 399 | `                        title="Mover para cima"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 400 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 401 | `                        <ArrowUp className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 402 | `                      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 403 | `                      <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 404 | `                        size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 405 | `                        variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 406 | `                        className="h-6 w-6"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 407 | `                        onClick={() => void move(f.id, 1)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 408 | `                        disabled={i === files.length - 1}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 409 | `                        title="Mover para baixo"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 410 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 411 | `                        <ArrowDown className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 412 | `                      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 413 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 414 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 415 | `                    <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 416 | `                      type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 417 | `                      onClick={() => openFile(f)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 418 | `                      className="h-14 w-14 shrink-0 overflow-hidden rounded border bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 419 | `                      title={f.file_name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 420 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 421 | `                      {isImage && urls[f.id] ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 422 | `                        <img` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 423 | `                          src={urls[f.id]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 424 | `                          alt={f.file_name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 425 | `                          className="h-full w-full object-cover"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 426 | `                        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 427 | `                      ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 428 | `                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 429 | `                          {canPreview ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 430 | `                            <FileText className="h-5 w-5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 431 | `                          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 432 | `                            <ExternalLink className="h-5 w-5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 433 | `                          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 434 | `                        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 435 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 436 | `                    </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 437 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 438 | `                    <div className="flex min-w-0 flex-1 flex-col gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 439 | `                      <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 440 | `                        value={f.title ?? ""}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 441 | `                        onChange={(e) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 442 | `                          setFiles((curr) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 443 | `                            curr.map((x) => (x.id === f.id ? { ...x, title: e.target.value } : x)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 444 | `                          )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 445 | `                        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 446 | `                        onBlur={(e) => void updateTitle(f.id, e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 447 | `                        placeholder="Título do arquivo"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 448 | `                        className="h-7 text-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 449 | `                      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 450 | `                      <p className="truncate text-[11px] text-muted-foreground" title={f.file_name}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 451 | `                        {f.file_name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 452 | `                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 453 | `                      {isAdmin && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 454 | `                        <p className="truncate text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 455 | `                          Enviado por{" "}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 456 | `                          {profilesById.get(f.uploaded_by ?? "")?.full_name || "Usuário"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 457 | `                        </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 458 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 459 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 460 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 461 | `                    <Button size="sm" variant="ghost" onClick={() => openFile(f)} title="Abrir">` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 462 | `                      Abrir` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 463 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 464 | `                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 465 | `                      size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 466 | `                      variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 467 | `                      className="h-8 w-8 text-destructive"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 468 | `                      onClick={() => void remove(f)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 469 | `                      title="Excluir"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 470 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 471 | `                      <Trash2 className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 472 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 473 | `                  </li>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 474 | `                );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 475 | `              })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 476 | `            </ul>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 477 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 478 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 479 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 480 | `        <AttachmentPreviewDialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 481 | `          open={!!preview}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 482 | `          onOpenChange={(o) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 483 | `            if (!o) setPreview(null);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 484 | `          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 485 | `          attachment={preview}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 486 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 487 | `      </SheetContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 488 | `    </Sheet>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 489 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 490 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 491 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
