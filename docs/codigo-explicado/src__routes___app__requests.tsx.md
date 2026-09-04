# src/routes/_app/requests.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createFileRoute } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useEffect, useMemo, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { format } from "date-fns";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `  ArrowLeft,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `  Check,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `  Clock3,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `  FileText,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `  MessageCircle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `  Paperclip,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `  Plus,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `  Search,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  Send,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  Trash2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  UserPlus,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `} from "lucide-react";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 19 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 20 | `import { useAssignableProfiles, useClients, useProfiles } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 21 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 22 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 23 | `import { Label } from "@/components/ui/label";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 24 | `import { Textarea } from "@/components/ui/textarea";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 25 | `import { Badge } from "@/components/ui/badge";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 26 | `import { Checkbox } from "@/components/ui/checkbox";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 27 | `import { ScrollArea } from "@/components/ui/scroll-area";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 28 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 29 | `  Select,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  SelectContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `  SelectItem,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `  SelectTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  SelectValue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `} from "@/components/ui/select";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 36 | `  Dialog,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `  DialogContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `  DialogFooter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `  DialogHeader,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `  DialogTitle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `} from "@/components/ui/dialog";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 43 | `  AlertDialog,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `  AlertDialogAction,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  AlertDialogCancel,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `  AlertDialogContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `  AlertDialogDescription,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `  AlertDialogFooter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `  AlertDialogHeader,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `  AlertDialogTitle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `  AlertDialogTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `} from "@/components/ui/alert-dialog";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 54 | `import { MAX_TASK_ATTACHMENT_BYTES } from "@/lib/attachment-limits";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 55 | `import { requestUnreadKey } from "@/hooks/use-request-unread";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 56 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 57 | `export const Route = createFileRoute("/_app/requests")({ component: RequestsPage });` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 58 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 59 | `type Status = "new" | "in_progress" | "resolved";` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 60 | `type Request = {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 61 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 63 | `  description: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `  status: Status;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `  priority: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `  client_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `  due_date: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `  created_by: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `  updated_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 72 | `type Message = {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 73 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `  request_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 75 | `  body: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `  author_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 79 | `type Activity = {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 80 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 81 | `  request_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `  actor_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `  kind: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `  details: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 87 | `type Attachment = {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 88 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `  request_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `  file_name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `  storage_path: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `  uploaded_by: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 93 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 95 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 96 | `const statusLabel: Record<Status, string> = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 97 | `  new: "Nova",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 98 | `  in_progress: "Resolvendo",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `  resolved: "Finalizada",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 100 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 101 | `const priorityLabel: Record<string, string> = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 102 | `  low: "Baixa",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `  medium: "Média",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 104 | `  high: "Alta",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 105 | `  urgent: "Urgente",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 107 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 108 | `const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 109 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 110 | `function RequestsPage() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 111 | `  const { user, isAdmin } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 112 | `  const { data: profiles = [] } = useProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 113 | `  const { data: mentionProfiles = [] } = useAssignableProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 114 | `  const { data: clients = [] } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 115 | `  const qc = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 116 | `  const [selectedId, setSelectedId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 117 | `  const [statusFilters, setStatusFilters] = useState<Status[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 118 | `  const [clientFilter, setClientFilter] = useState("all");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 119 | `  const [assigneeFilter, setAssigneeFilter] = useState("all");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 120 | `  const [search, setSearch] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 121 | `  const [dialogOpen, setDialogOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 122 | `  const [message, setMessage] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 123 | `  const [isUploading, setIsUploading] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 124 | `  const [form, setForm] = useState({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 125 | `    title: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `    description: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `    clientId: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `    priority: "medium",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `    dueDate: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 130 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 131 | `  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 132 | `  const { data: requests = [], isLoading } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 133 | `    queryKey: ["service_requests"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 135 | `      const { data, error } = await (supabase.from("service_requests") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 136 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `        .order("updated_at", { ascending: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 139 | `      return (data ?? []) as Request[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 140 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 141 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 142 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 143 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 144 | `    void (async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 145 | `      const { error } = await (supabase.from("notifications") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 146 | `        .update({ is_read: true })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 147 | `        .eq("user_id", user.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 148 | `        .eq("type", "service_request")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `        .eq("is_read", false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 150 | `      if (!error) void qc.invalidateQueries({ queryKey: requestUnreadKey(user.id) });` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 151 | `    })();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `  }, [qc, user?.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 153 | `  const selected = selectedId` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 154 | `    ? (requests.find((request) => request.id === selectedId) ?? null)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 155 | `    : null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `  const { data: messages = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 157 | `    queryKey: ["service_request_messages", selected?.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 158 | `    enabled: !!selected,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 160 | `      const { data, error } = await (supabase.from("service_request_messages") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 161 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `        .eq("request_id", selected!.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 163 | `        .order("created_at");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 164 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 165 | `      return (data ?? []) as Message[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 166 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 167 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 168 | `  const { data: activity = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 169 | `    queryKey: ["service_request_activity", selected?.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 170 | `    enabled: !!selected,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 171 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 172 | `      const { data, error } = await (supabase.from("service_request_activity") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 173 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `        .eq("request_id", selected!.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 175 | `        .order("created_at");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 176 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 177 | `      return (data ?? []) as Activity[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 178 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 179 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 180 | `  const { data: participants = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 181 | `    queryKey: ["service_request_participants", selected?.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 182 | `    enabled: !!selected,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 183 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 184 | `      const { data, error } = await (supabase.from("service_request_participants") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 185 | `        .select("user_id")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 186 | `        .eq("request_id", selected!.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 187 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 188 | `      return (data ?? []) as { user_id: string }[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 189 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 190 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 191 | `  const { data: assignees = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 192 | `    queryKey: ["service_request_assignees", selected?.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 193 | `    enabled: !!selected,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 194 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 195 | `      const { data, error } = await (supabase.from("service_request_assignees") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 196 | `        .select("user_id")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 197 | `        .eq("request_id", selected!.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 199 | `      return (data ?? []) as { user_id: string }[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 200 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 201 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 202 | `  const { data: allAssignees = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 203 | `    queryKey: ["service_request_assignees", "all"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 204 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 205 | `      const { data, error } = await (supabase.from("service_request_assignees") as any).select(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 206 | `        "request_id, user_id",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 207 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 208 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 209 | `      return (data ?? []) as { request_id: string; user_id: string }[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 210 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 211 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 212 | `  const { data: allParticipants = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 213 | `    queryKey: ["service_request_participants", "all"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 214 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 215 | `      const { data, error } = await (supabase.from("service_request_participants") as any).select(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 216 | `        "request_id, user_id",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 217 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 218 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 219 | `      return (data ?? []) as { request_id: string; user_id: string }[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 220 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 221 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 222 | `  const { data: attachments = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 223 | `    queryKey: ["service_request_attachments", selected?.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 224 | `    enabled: !!selected,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 225 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 226 | `      const { data, error } = await (supabase.from("service_request_attachments") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 227 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 228 | `        .eq("request_id", selected!.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 229 | `        .order("created_at");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 230 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 231 | `      return (data ?? []) as Attachment[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 232 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 233 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 234 | `  const nameOf = (id: string | null) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 235 | `    profiles.find((profile) => profile.id === id)?.full_name ||` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 236 | `    profiles.find((profile) => profile.id === id)?.email ||` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 237 | `    "Usuário";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 238 | `  const mentionableProfiles = useMemo(() => mentionProfiles, [mentionProfiles]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 239 | `  const mentionQuery = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 240 | `    const match = message.match(/(?:^|\s)@([^\n@]*)$/);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 241 | `    return match ? match[1].trim().toLocaleLowerCase("pt-BR") : null;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 242 | `  }, [message]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 243 | `  const mentionCandidates = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 244 | `    if (mentionQuery === null) return [];` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 245 | `    return mentionableProfiles` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 246 | `      .filter((profile) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 247 | `        (profile.full_name || profile.email || "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 248 | `          .toLocaleLowerCase("pt-BR")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 249 | `          .includes(mentionQuery),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 250 | `      )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 251 | `      .slice(0, 6);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 252 | `  }, [mentionQuery, mentionableProfiles]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 253 | `  const mentionNames = mentionableProfiles` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 254 | `    .map((profile) => profile.full_name || profile.email)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 255 | `    .filter((name): name is string => Boolean(name));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 256 | `  const insertMention = (profile: { full_name: string | null; email: string | null }) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 257 | `    const name = profile.full_name || profile.email;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 258 | `    if (!name) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 259 | `    setMessage((current) => current.replace(/(^|\s)@[^\n@]*$/, \`$1@${name} \`));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 260 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 261 | `  const refresh = () =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 262 | `    [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 263 | `      "service_requests",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 264 | `      "service_request_messages",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 265 | `      "service_request_activity",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 266 | `      "service_request_participants",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 267 | `      "service_request_assignees",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 268 | `      "service_request_attachments",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 269 | `    ].forEach((key) => void qc.invalidateQueries({ queryKey: [key] }));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 270 | `  const addActivity = async (requestId: string, kind: string, details: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 271 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 272 | `    await (supabase.from("service_request_activity") as any).insert({` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 273 | `      request_id: requestId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 274 | `      actor_id: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 275 | `      kind,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 276 | `      details,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 277 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 278 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 279 | `  const createRequest = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 280 | `    mutationFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 281 | `      if (!user || !form.title.trim()) throw new Error("Informe o assunto da solicitação.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 282 | `      const { data: requestId, error } = await (supabase.rpc as any)("create_service_request", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 283 | `        p_title: form.title.trim(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 284 | `        p_description: form.description.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 285 | `        p_client_id: form.clientId || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 286 | `        p_priority: form.priority,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 287 | `        p_due_date: form.dueDate || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 288 | `        p_participant_ids: selectedParticipants,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 289 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 290 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 291 | `      if (!requestId) throw new Error("Não foi possível criar a solicitação.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 292 | `      return { id: requestId };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 293 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 294 | `    onSuccess: (request) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 295 | `      refresh();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 296 | `      setSelectedId(request.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 297 | `      setDialogOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 298 | `      setForm({ title: "", description: "", clientId: "", priority: "medium", dueDate: "" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 299 | `      setSelectedParticipants([]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 300 | `      toast.success("Solicitação criada.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 301 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 302 | `    onError: (error: Error) => toast.error(error.message),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 303 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 304 | `  const sendMessage = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 305 | `    mutationFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 306 | `      if (!selected || !user || !message.trim()) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 307 | `      const { error } = await (supabase.from("service_request_messages") as any).insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 308 | `        request_id: selected.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 309 | `        author_id: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 310 | `        body: message.trim(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 311 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 312 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 313 | `      await (supabase.from("service_requests") as any)` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 314 | `        .update({ updated_at: new Date().toISOString() })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 315 | `        .eq("id", selected.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 316 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 317 | `    onSuccess: () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 318 | `      setMessage("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 319 | `      refresh();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 320 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 321 | `    onError: (error: Error) => toast.error(error.message),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 322 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 323 | `  const updateRequest = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 324 | `    mutationFn: async ({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 325 | `      field,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 326 | `      value,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 327 | `      kind,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 328 | `      label,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 329 | `    }: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 330 | `      field: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 331 | `      value: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 332 | `      kind: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 333 | `      label: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 334 | `    }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 335 | `      if (!selected) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 336 | `      const { error } = await (supabase.from("service_requests") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 337 | `        .update({ [field]: value })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 338 | `        .eq("id", selected.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 339 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 340 | `      await addActivity(selected.id, kind, label);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 341 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 342 | `    onSuccess: refresh,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 343 | `    onError: (error: Error) => toast.error(error.message),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 344 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 345 | `  const addMember = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 346 | `    mutationFn: async ({ userId, kind }: { userId: string; kind: "assignee" | "participant" }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 347 | `      if (!selected || !user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 348 | `      const table =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 349 | `        kind === "assignee" ? "service_request_assignees" : "service_request_participants";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 350 | `      const personColumn = kind === "assignee" ? "assigned_by" : "added_by";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 351 | `      const { error } = await (supabase.from(table) as any).insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 352 | `        request_id: selected.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 353 | `        user_id: userId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 354 | `        [personColumn]: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 355 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 356 | `      if (error && error.code !== "23505") throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 357 | `      await addActivity(` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 358 | `        selected.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 359 | `        kind === "assignee" ? "assignee_added" : "participant_added",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 360 | `        \`${nameOf(userId)} ${kind === "assignee" ? "atribuído como responsável" : "adicionado como participante"}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 361 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 362 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 363 | `    onSuccess: refresh,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 364 | `    onError: (error: Error) => toast.error(error.message),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 365 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 366 | `  const cancelRequest = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 367 | `    mutationFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 368 | `      if (!selected) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 369 | `      const { error } = await (supabase.from("service_requests") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 370 | `        .delete()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 371 | `        .eq("id", selected.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 372 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 373 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 374 | `    onSuccess: () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 375 | `      setSelectedId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 376 | `      refresh();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 377 | `      toast.success("Solicitação cancelada e removida.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 378 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 379 | `    onError: (error: Error) => toast.error(error.message),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 380 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 381 | `  const uploadFiles = async (files: FileList) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 382 | `    if (!selected || !user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 383 | `    const chosen = Array.from(files);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 384 | `    const invalid = chosen.find((file) => file.size > MAX_TASK_ATTACHMENT_BYTES);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 385 | `    if (invalid) return toast.error(\`${invalid.name} ultrapassa 50 MB.\`);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 386 | `    setIsUploading(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 387 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 388 | `      for (const file of chosen) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 389 | `        const path = \`service-requests/${selected.id}/${crypto.randomUUID()}-${file.name}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 390 | `        const { error: uploadError } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 391 | `          .from("service-request-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 392 | `          .upload(path, file);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 393 | `        if (uploadError) throw uploadError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 394 | `        const { error } = await (supabase.from("service_request_attachments") as any).insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 395 | `          request_id: selected.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 396 | `          file_name: file.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 397 | `          storage_path: path,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 398 | `          mime_type: file.type || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 399 | `          size_bytes: file.size,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 400 | `          uploaded_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 401 | `        });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 402 | `        if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 403 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 404 | `      await addActivity(selected.id, "attachment_added", \`${chosen.length} anexo(s) adicionado(s)\`);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 405 | `      refresh();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 406 | `      toast.success("Anexo(s) incluído(s).");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 407 | `    } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 408 | `      toast.error(error instanceof Error ? error.message : "Não foi possível anexar.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 409 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 410 | `      setIsUploading(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 411 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 412 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 413 | `  const filtered = requests.filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 414 | `    (request) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 415 | `      (statusFilters.length === 0 || statusFilters.includes(request.status)) &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 416 | `      (clientFilter === "all" || request.client_id === clientFilter) &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 417 | `      (assigneeFilter === "all" ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 418 | `        allAssignees.some(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 419 | `          (assignee) => assignee.request_id === request.id && assignee.user_id === assigneeFilter,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 420 | `        )) &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 421 | `      \`${request.title} ${clients.find((client) => client.id === request.client_id)?.name || ""}\`` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 422 | `        .toLocaleLowerCase()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 423 | `        .includes(search.trim().toLocaleLowerCase()),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 424 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 425 | `  const toggleStatusFilter = (status: Status) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 426 | `    setStatusFilters((current) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 427 | `      current.includes(status) ? current.filter((item) => item !== status) : [...current, status],` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 428 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 429 | `  const timeline = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 430 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 431 | `      [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 432 | `        ...messages.map((item) => ({ type: "message" as const, date: item.created_at, item })),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 433 | `        ...activity.map((item) => ({ type: "activity" as const, date: item.created_at, item })),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 434 | `      ].sort((a, b) => a.date.localeCompare(b.date)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 435 | `    [activity, messages],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 436 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 437 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 438 | `    <div className="flex h-full min-h-0 flex-col bg-background p-5 md:p-7">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 439 | `      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 440 | `        <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 441 | `          <h1 className="text-lg font-semibold tracking-tight">Gestão das solicitações</h1>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 442 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 443 | `        <Button className="h-9 rounded-full px-4 shadow-sm" onClick={() => setDialogOpen(true)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 444 | `          <Plus className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 445 | `          Nova solicitação` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 446 | `        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 447 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 448 | `      {!selected && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 449 | `        <div className="mb-5 space-y-3 border-b border-border/70 pb-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 450 | `          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 451 | `            <div className="relative w-full max-w-md min-w-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 452 | `              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 453 | `              <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 454 | `                value={search}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 455 | `                onChange={(event) => setSearch(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 456 | `                className="h-9 rounded-full border-0 bg-muted/55 pl-9 shadow-none focus-visible:ring-1"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 457 | `                placeholder="Buscar por ID, cliente ou assunto…"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 458 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 459 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 460 | `            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 461 | `              {(["new", "in_progress", "resolved"] as Status[]).map((status) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 462 | `                const checked = statusFilters.includes(status);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 463 | `                return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 464 | `                  <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 465 | `                    key={status}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 466 | `                    type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 467 | `                    className={\`flex items-center gap-1.5 transition-colors ${checked ? "text-foreground" : "hover:text-foreground"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 468 | `                    onClick={() => toggleStatusFilter(status)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 469 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 470 | `                    <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 471 | `                      className={\`grid h-4 w-4 place-items-center rounded-[4px] border ${` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 472 | `                        checked` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 473 | `                          ? "border-primary bg-primary text-primary-foreground"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 474 | `                          : "border-muted-foreground/55 bg-transparent"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 475 | `                      }\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 476 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 477 | `                      {checked && <Check className="h-3 w-3" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 478 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 479 | `                    {statusLabel[status]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 480 | `                  </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 481 | `                );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 482 | `              })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 483 | `              {statusFilters.length > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 484 | `                <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 485 | `                  type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 486 | `                  className="text-primary hover:underline"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 487 | `                  onClick={() => setStatusFilters([])}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 488 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 489 | `                  Limpar status` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 490 | `                </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 491 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 492 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 493 | `            <span className="ml-auto text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 494 | `              {filtered.length} solicitação(ões)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 495 | `            </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 496 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 497 | `          <div className="flex flex-wrap items-center gap-2 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 498 | `            <Select value={clientFilter} onValueChange={setClientFilter}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 499 | `              <SelectTrigger className="h-8 w-auto min-w-44 border-0 bg-transparent px-2 shadow-none hover:bg-muted/50 focus:ring-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 500 | `                <SelectValue placeholder="Todos os clientes" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 501 | `              </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 502 | `              <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 503 | `                <SelectItem value="all">Todos os clientes</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 504 | `                {clients.map((client) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 505 | `                  <SelectItem key={client.id} value={client.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 506 | `                    {client.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 507 | `                  </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 508 | `                ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 509 | `              </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 510 | `            </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 511 | `            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 512 | `              <SelectTrigger className="h-8 w-auto min-w-52 border-0 bg-transparent px-2 shadow-none hover:bg-muted/50 focus:ring-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 513 | `                <SelectValue placeholder="Todos os colaboradores" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 514 | `              </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 515 | `              <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 516 | `                <SelectItem value="all">Todos os colaboradores</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 517 | `                {mentionProfiles.map((profile) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 518 | `                  <SelectItem key={profile.id} value={profile.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 519 | `                    {profile.full_name || profile.email}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 520 | `                  </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 521 | `                ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 522 | `              </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 523 | `            </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 524 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 525 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 526 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 527 | `      <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 528 | `        className={\`grid overflow-hidden ${selected ? "min-h-0 flex-1 rounded-xl border bg-card shadow-sm lg:grid-cols-[minmax(0,1fr)_310px]" : "shrink-0"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 529 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 530 | `        <ScrollArea className={selected ? "hidden" : "min-h-0"}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 531 | `          <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 532 | `            {isLoading ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 533 | `              <p className="p-4 text-sm text-muted-foreground">Carregando…</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 534 | `            ) : filtered.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 535 | `              <div className="grid min-h-72 place-items-center p-6 text-center text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 536 | `                <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 537 | `                  <MessageCircle className="mx-auto mb-2 h-8 w-8" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 538 | `                  <p>Nenhuma solicitação neste filtro.</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 539 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 540 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 541 | `            ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 542 | `              <div className="divide-y divide-border/70">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 543 | `                <div className="hidden grid-cols-[minmax(0,1fr)_270px_210px_120px] gap-4 px-4 pb-2 text-[10px] font-bold uppercase tracking-[.08em] text-muted-foreground md:grid">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 544 | `                  <span>Assunto · cliente</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 545 | `                  <span>Status · prioridade · prazo</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 546 | `                  <span>Pessoas envolvidas</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 547 | `                  <span>Última atualização</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 548 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 549 | `                {filtered.map((request) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 550 | `                  <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 551 | `                    key={request.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 552 | `                    onClick={() => setSelectedId(request.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 553 | `                    className="grid w-full gap-3 px-4 py-3 text-left transition odd:bg-emerald-500/[0.035] hover:bg-muted/55 md:grid-cols-[minmax(0,1fr)_270px_210px_120px] md:items-center"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 554 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 555 | `                    <div className="min-w-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 556 | `                      <p className="truncate text-sm font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 557 | `                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 align-middle" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 558 | `                        {request.title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 559 | `                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 560 | `                      <p className="mt-1 truncate text-xs text-primary/80">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 561 | `                        {clients.find((client) => client.id === request.client_id)?.name ||` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 562 | `                          "Sem cliente vinculado"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 563 | `                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 564 | `                      {request.description && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 565 | `                        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 566 | `                          {request.description}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 567 | `                        </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 568 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 569 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 570 | `                    <div className="flex flex-wrap items-center gap-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 571 | `                      <StatusBadge status={request.status} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 572 | `                      <PriorityBadge priority={request.priority} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 573 | `                      {request.due_date && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 574 | `                        <span className="text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 575 | `                          {format(new Date(\`${request.due_date}T12:00:00\`), "dd/MM/yyyy")}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 576 | `                        </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 577 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 578 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 579 | `                    <RequestMembers` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 580 | `                      assigneeIds={allAssignees` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 581 | `                        .filter((assignee) => assignee.request_id === request.id)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 582 | `                        .map((assignee) => assignee.user_id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 583 | `                      participantIds={allParticipants` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 584 | `                        .filter((participant) => participant.request_id === request.id)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 585 | `                        .map((participant) => participant.user_id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 586 | `                      nameOf={nameOf}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 587 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 588 | `                    <span className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 589 | `                      {format(new Date(request.updated_at), "dd/MM/yyyy")}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 590 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 591 | `                  </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 592 | `                ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 593 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 594 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 595 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 596 | `        </ScrollArea>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 597 | `        {selected ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 598 | `          <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 599 | `            <div className="flex min-h-0 flex-col">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 600 | `              <div className="border-b bg-card p-4 md:px-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 601 | `                <div className="flex flex-wrap items-start justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 602 | `                  <div className="min-w-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 603 | `                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 604 | `                      variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 605 | `                      size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 606 | `                      className="-ml-2 mb-2"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 607 | `                      onClick={() => setSelectedId(null)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 608 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 609 | `                      <ArrowLeft className="mr-1 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 610 | `                      Voltar para a lista` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 611 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 612 | `                    <h2 className="max-w-3xl text-lg font-semibold leading-tight">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 613 | `                      {selected.title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 614 | `                    </h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 615 | `                    <div className="mt-2 flex flex-wrap items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 616 | `                      <StatusBadge status={selected.status} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 617 | `                      <PriorityBadge priority={selected.priority} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 618 | `                      <span className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 619 | `                        Aberta em {format(new Date(selected.created_at), "dd/MM/yyyy 'às' HH:mm")}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 620 | `                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 621 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 622 | `                    <p className="mt-3 max-w-3xl text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 623 | `                      {selected.description || "Sem descrição."}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 624 | `                    </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 625 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 626 | `                  <div className="flex flex-wrap gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 627 | `                    {selected.status !== "in_progress" && selected.status !== "resolved" && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 628 | `                      <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 629 | `                        size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 630 | `                        variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 631 | `                        onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 632 | `                          void updateRequest.mutateAsync({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 633 | `                            field: "status",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 634 | `                            value: "in_progress",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 635 | `                            kind: "status_changed",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 636 | `                            label: "Status alterado para Resolvendo",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 637 | `                          })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 638 | `                        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 639 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 640 | `                        Em andamento` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 641 | `                      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 642 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 643 | `                    {selected.status !== "resolved" && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 644 | `                      <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 645 | `                        size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 646 | `                        onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 647 | `                          void updateRequest.mutateAsync({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 648 | `                            field: "status",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 649 | `                            value: "resolved",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 650 | `                            kind: "status_changed",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 651 | `                            label: "Solicitação finalizada",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 652 | `                          })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 653 | `                        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 654 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 655 | `                        <Check className="mr-1 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 656 | `                        Resolver` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 657 | `                      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 658 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 659 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 660 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 661 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 662 | `              <ScrollArea className="min-h-0 flex-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 663 | `                <div className="space-y-3 p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 664 | `                  {timeline.map((entry) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 665 | `                    entry.type === "activity" ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 666 | `                      <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 667 | `                        key={entry.item.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 668 | `                        className="flex items-center gap-2 text-xs text-muted-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 669 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 670 | `                        <Clock3 className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 671 | `                        <span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 672 | `                          {nameOf(entry.item.actor_id)} · {entry.item.details}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 673 | `                        </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 674 | `                        <span className="ml-auto">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 675 | `                          {format(new Date(entry.date), "dd/MM HH:mm")}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 676 | `                        </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 677 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 678 | `                    ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 679 | `                      <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 680 | `                        key={entry.item.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 681 | `                        className={\`flex gap-2 ${entry.item.author_id === user?.id ? "justify-end" : ""}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 682 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 683 | `                        <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 684 | `                          className={\`max-w-[85%] rounded-xl px-3 py-2 text-sm ${entry.item.author_id === user?.id ? "bg-primary text-primary-foreground" : "bg-muted"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 685 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 686 | `                          <p className="mb-1 text-[11px] font-semibold opacity-70">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 687 | `                            {entry.item.author_id === user?.id` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 688 | `                              ? "Você"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 689 | `                              : nameOf(entry.item.author_id)}{" "}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 690 | `                            · {format(new Date(entry.date), "dd/MM HH:mm")}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 691 | `                          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 692 | `                          <p className="whitespace-pre-wrap break-words">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 693 | `                            {mentionNames.length` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 694 | `                              ? entry.item.body` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 695 | `                                  .split(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 696 | `                                    new RegExp(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 697 | `                                      \`(${mentionNames.map((name) => \`@${escapeRegExp(name)}\`).join("|")})\`,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 698 | `                                      "gi",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 699 | `                                    ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 700 | `                                  )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 701 | `                                  .map((part, index) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 702 | `                                    part.startsWith("@") ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 703 | `                                      <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 704 | `                                        key={index}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 705 | `                                        className={` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 706 | `                                          entry.item.author_id === user?.id` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 707 | `                                            ? "font-semibold underline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 708 | `                                            : "font-semibold text-primary"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 709 | `                                        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 710 | `                                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 711 | `                                        {part}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 712 | `                                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 713 | `                                    ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 714 | `                                      part` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 715 | `                                    ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 716 | `                                  )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 717 | `                              : entry.item.body}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 718 | `                          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 719 | `                        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 720 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 721 | `                    ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 722 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 723 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 724 | `              </ScrollArea>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 725 | `              <div className="relative border-t bg-card p-3 md:p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 726 | `                <div className="flex gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 727 | `                  <div className="relative min-w-0 flex-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 728 | `                    <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 729 | `                      value={message}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 730 | `                      onChange={(event) => setMessage(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 731 | `                      onKeyDown={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 732 | `                        if (event.key === "Enter" && !event.shiftKey) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 733 | `                          event.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 734 | `                          void sendMessage.mutateAsync();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 735 | `                        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 736 | `                      }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 737 | `                      placeholder="Adicione uma mensagem… Use @ para mencionar usuários."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 738 | `                      rows={2}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 739 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 740 | `                    {mentionCandidates.length > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 741 | `                      <div className="absolute bottom-[calc(100%+6px)] left-0 z-20 w-full max-w-sm overflow-hidden rounded-lg border bg-popover p-1 shadow-lg">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 742 | `                        <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 743 | `                          Mencionar alguém` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 744 | `                        </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 745 | `                        {mentionCandidates.map((profile) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 746 | `                          <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 747 | `                            key={profile.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 748 | `                            type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 749 | `                            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 750 | `                            onMouseDown={(event) => event.preventDefault()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 751 | `                            onClick={() => insertMention(profile)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 752 | `                          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 753 | `                            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-[9px] font-semibold text-primary">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 754 | `                              {(profile.full_name || profile.email || "U")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 755 | `                                .slice(0, 2)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 756 | `                                .toUpperCase()}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 757 | `                            </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 758 | `                            <span className="truncate">{profile.full_name || profile.email}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 759 | `                          </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 760 | `                        ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 761 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 762 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 763 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 764 | `                  <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 765 | `                    size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 766 | `                    disabled={!message.trim() || sendMessage.isPending}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 767 | `                    onClick={() => void sendMessage.mutateAsync()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 768 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 769 | `                    <Send className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 770 | `                  </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 771 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 772 | `                <p className="mt-2 text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 773 | `                  Use @ para mencionar alguém · Enter envia · Shift + Enter quebra linha` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 774 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 775 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 776 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 777 | `            <ScrollArea className="min-w-0 border-t bg-muted/20 lg:border-l lg:border-t-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 778 | `              <div className="space-y-3 p-3 md:p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 779 | `                <Section title="Situação" className="rounded-xl border bg-card p-3 shadow-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 780 | `                  <Label className="text-[10px]">Status</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 781 | `                  <div className="mt-2 grid grid-cols-3 rounded-full bg-muted p-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 782 | `                    {(["new", "in_progress", "resolved"] as Status[]).map((status) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 783 | `                      <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 784 | `                        key={status}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 785 | `                        onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 786 | `                          void updateRequest.mutateAsync({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 787 | `                            field: "status",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 788 | `                            value: status,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 789 | `                            kind: "status_changed",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 790 | `                            label: \`Status alterado para ${statusLabel[status]}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 791 | `                          })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 792 | `                        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 793 | `                        className={\`rounded-full px-2 py-1.5 text-[11px] font-medium transition ${selected.status === status ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 794 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 795 | `                        {statusLabel[status]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 796 | `                      </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 797 | `                    ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 798 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 799 | `                  <Label className="mt-3 block text-xs">Prioridade</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 800 | `                  <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 801 | `                    value={selected.priority}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 802 | `                    onValueChange={(value) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 803 | `                      void updateRequest.mutateAsync({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 804 | `                        field: "priority",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 805 | `                        value,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 806 | `                        kind: "priority_changed",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 807 | `                        label: \`Prioridade alterada para ${priorityLabel[value]}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 808 | `                      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 809 | `                    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 810 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 811 | `                    <SelectTrigger className="mt-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 812 | `                      <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 813 | `                    </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 814 | `                    <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 815 | `                      {Object.entries(priorityLabel).map(([value, label]) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 816 | `                        <SelectItem key={value} value={value}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 817 | `                          {label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 818 | `                        </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 819 | `                      ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 820 | `                    </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 821 | `                  </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 822 | `                </Section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 823 | `                <Section` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 824 | `                  title={\`Responsáveis (${assignees.length})\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 825 | `                  className="rounded-xl border bg-card p-3 shadow-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 826 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 827 | `                  <ProfileChips ids={assignees.map((item) => item.user_id)} nameOf={nameOf} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 828 | `                  <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 829 | `                    onValueChange={(userId) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 830 | `                      void addMember.mutateAsync({ userId, kind: "assignee" })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 831 | `                    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 832 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 833 | `                    <SelectTrigger className="mt-3 h-8 text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 834 | `                      <UserPlus className="mr-1 h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 835 | `                      <SelectValue placeholder="Atribuir responsável" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 836 | `                    </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 837 | `                    <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 838 | `                      {profiles` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 839 | `                        .filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 840 | `                          (profile) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 841 | `                            profile.is_active !== false &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 842 | `                            !assignees.some((item) => item.user_id === profile.id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 843 | `                        )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 844 | `                        .map((profile) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 845 | `                          <SelectItem key={profile.id} value={profile.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 846 | `                            {profile.full_name || profile.email}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 847 | `                          </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 848 | `                        ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 849 | `                    </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 850 | `                  </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 851 | `                </Section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 852 | `                <Section` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 853 | `                  title={\`Participantes (${participants.length})\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 854 | `                  className="rounded-xl border bg-card p-3 shadow-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 855 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 856 | `                  <ProfileChips ids={participants.map((item) => item.user_id)} nameOf={nameOf} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 857 | `                  <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 858 | `                    onValueChange={(userId) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 859 | `                      void addMember.mutateAsync({ userId, kind: "participant" })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 860 | `                    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 861 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 862 | `                    <SelectTrigger className="mt-3 h-8 text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 863 | `                      <UserPlus className="mr-1 h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 864 | `                      <SelectValue placeholder="Adicionar participante" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 865 | `                    </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 866 | `                    <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 867 | `                      {profiles` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 868 | `                        .filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 869 | `                          (profile) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 870 | `                            profile.is_active !== false &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 871 | `                            !participants.some((item) => item.user_id === profile.id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 872 | `                        )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 873 | `                        .map((profile) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 874 | `                          <SelectItem key={profile.id} value={profile.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 875 | `                            {profile.full_name || profile.email}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 876 | `                          </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 877 | `                        ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 878 | `                    </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 879 | `                  </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 880 | `                </Section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 881 | `                <Section` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 882 | `                  title={\`Anexos (${attachments.length})\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 883 | `                  className="rounded-xl border bg-card p-3 shadow-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 884 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 885 | `                  <input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 886 | `                    id="request-files"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 887 | `                    type="file"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 888 | `                    multiple` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 889 | `                    className="hidden"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 890 | `                    onChange={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 891 | `                      if (event.target.files) void uploadFiles(event.target.files);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 892 | `                      event.currentTarget.value = "";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 893 | `                    }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 894 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 895 | `                  <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 896 | `                    size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 897 | `                    variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 898 | `                    className="w-full min-w-0"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 899 | `                    disabled={isUploading}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 900 | `                    onClick={() => document.getElementById("request-files")?.click()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 901 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 902 | `                    <Paperclip className="mr-2 h-4 w-4 shrink-0" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 903 | `                    <span className="truncate">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 904 | `                      {isUploading ? "Enviando arquivo…" : "Adicionar anexo"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 905 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 906 | `                  </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 907 | `                  <div className="mt-2 space-y-1 overflow-hidden">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 908 | `                    {attachments.map((attachment) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 909 | `                      <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 910 | `                        key={attachment.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 911 | `                        title={\`Abrir ${attachment.file_name}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 912 | `                        className="flex w-full min-w-0 items-center gap-2 rounded-md border bg-muted/30 p-2 text-left text-xs transition-colors hover:bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 913 | `                        onClick={async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 914 | `                          const { data } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 915 | `                            .from("service-request-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 916 | `                            .createSignedUrl(attachment.storage_path, 60);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 917 | `                          if (data?.signedUrl)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 918 | `                            window.open(data.signedUrl, "_blank", "noopener,noreferrer");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 919 | `                        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 920 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 921 | `                        <FileText className="h-3.5 w-3.5 shrink-0" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 922 | `                        <span className="min-w-0 flex-1 truncate">{attachment.file_name}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 923 | `                      </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 924 | `                    ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 925 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 926 | `                </Section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 927 | `                {(isAdmin || selected.created_by === user?.id) && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 928 | `                  <AlertDialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 929 | `                    <AlertDialogTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 930 | `                      <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 931 | `                        variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 932 | `                        className="w-full border-destructive/40 text-destructive hover:bg-destructive hover:text-destructive-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 933 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 934 | `                        <Trash2 className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 935 | `                        Cancelar solicitação` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 936 | `                      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 937 | `                    </AlertDialogTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 938 | `                    <AlertDialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 939 | `                      <AlertDialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 940 | `                        <AlertDialogTitle>Cancelar esta solicitação?</AlertDialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 941 | `                        <AlertDialogDescription>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 942 | `                          Ela será removida, juntamente com o histórico e os vínculos desta` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 943 | `                          solicitação. Esta ação não pode ser desfeita.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 944 | `                        </AlertDialogDescription>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 945 | `                      </AlertDialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 946 | `                      <AlertDialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 947 | `                        <AlertDialogCancel>Voltar</AlertDialogCancel>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 948 | `                        <AlertDialogAction` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 949 | `                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 950 | `                          onClick={() => void cancelRequest.mutateAsync()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 951 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 952 | `                          Cancelar solicitação` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 953 | `                        </AlertDialogAction>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 954 | `                      </AlertDialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 955 | `                    </AlertDialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 956 | `                  </AlertDialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 957 | `                )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 958 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 959 | `            </ScrollArea>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 960 | `          </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 961 | `        ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 962 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 963 | `      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 964 | `        <DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 965 | `          <DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 966 | `            <DialogTitle>Nova solicitação</DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 967 | `          </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 968 | `          <div className="space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 969 | `            <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 970 | `              <Label>Assunto</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 971 | `              <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 972 | `                value={form.title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 973 | `                onChange={(event) => setForm({ ...form, title: event.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 974 | `                placeholder="Ex.: Documentos para cadastro"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 975 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 976 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 977 | `            <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 978 | `              <Label>Descrição</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 979 | `              <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 980 | `                value={form.description}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 981 | `                onChange={(event) => setForm({ ...form, description: event.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 982 | `                placeholder="Explique o que precisa ser resolvido."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 983 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 984 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 985 | `            <div className="grid grid-cols-2 gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 986 | `              <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 987 | `                <Label>Cliente</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 988 | `                <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 989 | `                  value={form.clientId || "none"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 990 | `                  onValueChange={(value) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 991 | `                    setForm({ ...form, clientId: value === "none" ? "" : value })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 992 | `                  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 993 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 994 | `                  <SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 995 | `                    <SelectValue placeholder="Sem cliente" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 996 | `                  </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 997 | `                  <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 998 | `                    <SelectItem value="none">Sem cliente</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 999 | `                    {clients.map((client) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1000 | `                      <SelectItem key={client.id} value={client.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1001 | `                        {client.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1002 | `                      </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1003 | `                    ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1004 | `                  </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1005 | `                </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1006 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1007 | `              <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1008 | `                <Label>Prioridade</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1009 | `                <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1010 | `                  value={form.priority}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1011 | `                  onValueChange={(value) => setForm({ ...form, priority: value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1012 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1013 | `                  <SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1014 | `                    <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1015 | `                  </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1016 | `                  <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1017 | `                    {Object.entries(priorityLabel).map(([value, label]) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1018 | `                      <SelectItem key={value} value={value}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1019 | `                        {label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1020 | `                      </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1021 | `                    ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1022 | `                  </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1023 | `                </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1024 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1025 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1026 | `            <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1027 | `              <Label>Participantes</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1028 | `              <div className="mt-2 max-h-32 space-y-2 overflow-y-auto rounded-md border p-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1029 | `                {profiles` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1030 | `                  .filter((profile) => profile.id !== user?.id && profile.is_active !== false)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1031 | `                  .map((profile) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1032 | `                    <label` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1033 | `                      key={profile.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1034 | `                      className="flex cursor-pointer items-center gap-2 text-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1035 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1036 | `                      <Checkbox` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1037 | `                        checked={selectedParticipants.includes(profile.id)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1038 | `                        onCheckedChange={(checked) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1039 | `                          setSelectedParticipants((current) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1040 | `                            checked` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1041 | `                              ? [...current, profile.id]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1042 | `                              : current.filter((id) => id !== profile.id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1043 | `                          )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1044 | `                        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1045 | `                      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1046 | `                      {profile.full_name || profile.email}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1047 | `                    </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1048 | `                  ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1049 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1050 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1051 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1052 | `          <DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1053 | `            <Button variant="outline" onClick={() => setDialogOpen(false)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1054 | `              Cancelar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1055 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1056 | `            <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1057 | `              disabled={createRequest.isPending}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1058 | `              onClick={() => void createRequest.mutateAsync()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1059 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1060 | `              Criar solicitação` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1061 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1062 | `          </DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1063 | `        </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1064 | `      </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1065 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1066 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1067 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1068 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1069 | `function Section({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1070 | `  title,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1071 | `  children,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1072 | `  className = "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1073 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1074 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1075 | `  children: React.ReactNode;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1076 | `  className?: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1077 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1078 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1079 | `    <section className={className}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1080 | `      <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1081 | `        {title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1082 | `      </h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1083 | `      {children}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1084 | `    </section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1085 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1086 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1087 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1088 | `function RequestMembers({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1089 | `  assigneeIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1090 | `  participantIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1091 | `  nameOf,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1092 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1093 | `  assigneeIds: string[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1094 | `  participantIds: string[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1095 | `  nameOf: (id: string | null) => string;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1096 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1097 | `  const people = [...new Set([...assigneeIds, ...participantIds])];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1098 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1099 | `    <div className="min-w-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1100 | `      {people.length > 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1101 | `        <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1102 | `          <div className="flex -space-x-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1103 | `            {people.slice(0, 4).map((id) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1104 | `              <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1105 | `                key={id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1106 | `                title={nameOf(id)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1107 | `                className="grid h-6 w-6 place-items-center rounded-full border-2 border-card bg-primary/10 text-[8px] font-bold text-primary"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1108 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1109 | `                {nameOf(id).slice(0, 2).toUpperCase()}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1110 | `              </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1111 | `            ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1112 | `            {people.length > 4 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1113 | `              <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-card bg-muted text-[9px] font-semibold text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1114 | `                +{people.length - 4}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1115 | `              </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1116 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1117 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1118 | `          <p className="mt-1 truncate text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1119 | `            {assigneeIds.length > 0 ? "Responsável" : "Participante"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1120 | `            {people.length > 1 ? " + equipe" : \`: ${nameOf(people[0])}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1121 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1122 | `        </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1123 | `      ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1124 | `        <p className="text-xs text-muted-foreground">Sem responsável</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1125 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1126 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1127 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1128 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1129 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1130 | `function StatusBadge({ status }: { status: Status }) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1131 | `  const classes: Record<Status, string> = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1132 | `    new: "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1133 | `    in_progress:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1134 | `      "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/15 dark:text-violet-200",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1135 | `    resolved:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1136 | `      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-200",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1137 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1138 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1139 | `    <Badge` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1140 | `      variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1141 | `      className={\`border px-2 py-0.5 text-[10px] font-semibold ${classes[status]}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1142 | `    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1143 | `      {statusLabel[status]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1144 | `    </Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1145 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1146 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1147 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1148 | `function PriorityBadge({ priority }: { priority: string }) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1149 | `  const classes: Record<string, string> = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1150 | `    low: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/15 dark:text-sky-200",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1151 | `    medium:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1152 | `      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-200",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1153 | `    high: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/15 dark:text-orange-200",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1154 | `    urgent:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1155 | `      "border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/15 dark:text-red-200",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1156 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1157 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1158 | `    <Badge` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1159 | `      variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1160 | `      className={\`border px-2 py-0.5 text-[10px] font-semibold ${classes[priority] ?? classes.medium}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1161 | `    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1162 | `      {priorityLabel[priority] ?? priority}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1163 | `    </Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1164 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1165 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1166 | `function ProfileChips({ ids, nameOf }: { ids: string[]; nameOf: (id: string) => string }) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1167 | `  return ids.length ? (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1168 | `    <div className="space-y-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1169 | `      {ids.map((id) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1170 | `        <div key={id} className="flex items-center gap-2 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1171 | `          <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-[10px] font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1172 | `            {nameOf(id).slice(0, 2).toUpperCase()}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1173 | `          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1174 | `          {nameOf(id)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1175 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1176 | `      ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1177 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1178 | `  ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1179 | `    <p className="text-sm text-muted-foreground">Ninguém atribuído.</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1180 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1181 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1182 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
