# src/routes/_app/obligations.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `/* eslint-disable @typescript-eslint/no-explicit-any -- Supabase types are regenerated after the migration is applied. */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 2 | `import { createFileRoute, Navigate } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `  addDays,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `  addMonths,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `  eachDayOfInterval,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `  endOfMonth,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `  endOfWeek,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `  format,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `  isSameDay,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `  isSameMonth,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  startOfMonth,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  startOfWeek,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  subMonths,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `} from "date-fns";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `import { ptBR } from "date-fns/locale";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 19 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 20 | `  AlertTriangle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `  CalendarCheck2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `  CalendarClock,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `  CheckCircle2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  ChevronDown,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `  ChevronLeft,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `  ChevronRight,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `  Clock3,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `  ExternalLink,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `  Loader2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  MoreHorizontal,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `  Pause,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `  Pencil,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  Play,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `  Plus,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `  Search,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `  Settings2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `  Trash2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `} from "lucide-react";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 40 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 41 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 42 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 43 | `  useClients,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `  useProfiles,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  type Client,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 46 | `  type Profile,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 47 | `  type Task,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 48 | `} from "@/hooks/use-data";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `import { useWorkspaceTasks } from "@/hooks/use-workspace-tasks";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 50 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 51 | `  useObligationOccurrences,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `  useObligations,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `  type Obligation,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 54 | `  type ObligationOccurrence,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 55 | `} from "@/hooks/use-obligations";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 56 | `import { ObligationDialog } from "@/components/ObligationDialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 57 | `import { TaskDialog } from "@/components/TaskDialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 58 | `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 59 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 60 | `  AlertDialog,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `  AlertDialogAction,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `  AlertDialogCancel,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 63 | `  AlertDialogContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `  AlertDialogDescription,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `  AlertDialogFooter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `  AlertDialogHeader,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `  AlertDialogTitle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `} from "@/components/ui/alert-dialog";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `import { Badge } from "@/components/ui/badge";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 70 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 71 | `import { Card } from "@/components/ui/card";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 72 | `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 73 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 74 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 75 | `  DropdownMenu,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `  DropdownMenuContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `  DropdownMenuItem,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `  DropdownMenuTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `} from "@/components/ui/dropdown-menu";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 81 | `  Select,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `  SelectContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `  SelectItem,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `  SelectTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `  SelectValue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `} from "@/components/ui/select";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 88 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 89 | `export const Route = createFileRoute("/_app/obligations")({ component: ObligationsPage });` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 90 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 91 | `const todayKey = () => format(new Date(), "yyyy-MM-dd");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 92 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 93 | `type DeleteTarget =` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 94 | `  | { scope: "occurrence"; occurrence: ObligationOccurrence; obligation: Obligation }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 95 | `  | { scope: "series"; obligation: Obligation }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 96 | `  | { scope: "all" };` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 97 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 98 | `function ObligationsPage() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 99 | `  const { hasPermission, loading, activeWorkspace } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 100 | `  const queryClient = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 101 | `  const {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 102 | `    data: obligations = [],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `    isLoading: loadingObligations,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 104 | `    error: obligationsError,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 105 | `  } = useObligations();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `  const {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 107 | `    data: occurrences = [],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 108 | `    isLoading: loadingOccurrences,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `    error: occurrencesError,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `  } = useObligationOccurrences();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `  const { data: clients = [] } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 112 | `  const { data: profiles = [] } = useProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 113 | `  const { data: tasks = [] } = useWorkspaceTasks();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 114 | `  const materializedWorkspace = useRef<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 115 | `  const [dialogOpen, setDialogOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 116 | `  const [editingObligation, setEditingObligation] = useState<Obligation | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 117 | `  const [taskDialogOpen, setTaskDialogOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 118 | `  const [editingTask, setEditingTask] = useState<Task | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 119 | `  const [search, setSearch] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 120 | `  const [clientFilter, setClientFilter] = useState("all");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 121 | `  const [assigneeFilter, setAssigneeFilter] = useState("all");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 122 | `  const [calendarCursor, setCalendarCursor] = useState(new Date());` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 123 | `  const [workingOccurrenceId, setWorkingOccurrenceId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 124 | `  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 125 | `  const [deleting, setDeleting] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 126 | `  const [clientLogoUrls, setClientLogoUrls] = useState<Record<string, string>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 127 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 128 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 129 | `    if (!activeWorkspace?.id || materializedWorkspace.current === activeWorkspace.id) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 130 | `    materializedWorkspace.current = activeWorkspace.id;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `    void (async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 132 | `      const { error } = await (supabase as any).rpc("materialize_obligations", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 133 | `        p_horizon_days: 365,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 135 | `      if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 136 | `        materializedWorkspace.current = null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `        toast.error(\`Não foi possível atualizar os próximos vencimentos: ${error.message}\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `        return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 139 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 140 | `      await Promise.all([` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 141 | `        queryClient.invalidateQueries({ queryKey: ["obligation-occurrences"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 142 | `        queryClient.invalidateQueries({ queryKey: ["tasks"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 143 | `      ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 144 | `    })();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 145 | `  }, [activeWorkspace?.id, queryClient]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 146 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 147 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 148 | `    let cancelled = false;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 149 | `    const clientsWithLogo = clients.filter((client) => client.avatar_path);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 150 | `    if (clientsWithLogo.length === 0) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 151 | `      setClientLogoUrls({});` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 153 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 154 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 155 | `    void (async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 156 | `      const paths = Object.fromEntries(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 157 | `        clientsWithLogo.map((client) => [client.id, client.avatar_path!]),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 158 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 159 | `      let cached: Record<string, { url: string; expiresAt: number; path?: string }> = {};` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 160 | `      try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 161 | `        cached = JSON.parse(window.sessionStorage.getItem("taskflow-client-avatar-urls") ?? "{}");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `      } catch {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 163 | `        cached = {};` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 164 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 165 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 166 | `      const now = Date.now();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 167 | `      const visibleCached = Object.fromEntries(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 168 | `        clientsWithLogo` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 169 | `          .filter((client) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 170 | `            const entry = cached[client.id];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 171 | `            return entry?.url && entry.expiresAt > now && entry.path === client.avatar_path;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 172 | `          })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 173 | `          .map((client) => [client.id, cached[client.id].url]),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 174 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 175 | `      const missing = clientsWithLogo.filter((client) => !visibleCached[client.id]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 176 | `      if (!cancelled) setClientLogoUrls(visibleCached);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 177 | `      if (missing.length === 0) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 178 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 179 | `      const { data } = await supabase.storage.from("task-attachments").createSignedUrls(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 180 | `        missing.map((client) => client.avatar_path!),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 181 | `        3600,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 182 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 183 | `      const urlByPath = new Map((data ?? []).map((item) => [item.path, item.signedUrl]));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 184 | `      const loaded = Object.fromEntries(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 185 | `        missing` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 186 | `          .map((client) => [client.id, urlByPath.get(client.avatar_path!)])` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 187 | `          .filter((entry): entry is [string, string] => Boolean(entry[1])),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 188 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 189 | `      if (cancelled) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 190 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 191 | `      const expiresAt = Date.now() + 50 * 60 * 1000;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 192 | `      Object.entries(loaded).forEach(([clientId, url]) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 193 | `        cached[clientId] = { url, expiresAt, path: paths[clientId] };` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 194 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 195 | `      try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 196 | `        window.sessionStorage.setItem("taskflow-client-avatar-urls", JSON.stringify(cached));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 197 | `      } catch {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `        // A lista continua funcional quando o armazenamento do navegador está bloqueado.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 199 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 200 | `      setClientLogoUrls({ ...visibleCached, ...loaded });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 201 | `    })();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 202 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 203 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 204 | `      cancelled = true;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 205 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 206 | `  }, [clients]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 207 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 208 | `  const obligationById = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 209 | `    () => new Map(obligations.map((obligation) => [obligation.id, obligation])),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 210 | `    [obligations],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 211 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 212 | `  const clientById = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 213 | `    () => new Map(clients.map((client) => [client.id, client])),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 214 | `    [clients],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 215 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 216 | `  const profileById = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 217 | `    () => new Map(profiles.map((profile) => [profile.id, profile])),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 218 | `    [profiles],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 219 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 220 | `  const taskById = useMemo(() => new Map(tasks.map((task) => [task.id, task])), [tasks]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 221 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 222 | `  const activeOccurrences = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 223 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 224 | `      occurrences.filter((occurrence) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 225 | `        if (occurrence.status === "skipped") return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 226 | `        const obligation = obligationById.get(occurrence.obligation_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 227 | `        if (!obligation) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 228 | `        if (clientFilter !== "all" && obligation.client_id !== clientFilter) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 229 | `        if (assigneeFilter !== "all" && obligation.assignee_id !== assigneeFilter) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 230 | `        const term = search.trim().toLocaleLowerCase("pt-BR");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 231 | `        if (!term) return true;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 232 | `        const client = clientById.get(obligation.client_id ?? "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 233 | `        return \`${obligation.title} ${client?.name ?? ""}\`` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 234 | `          .toLocaleLowerCase("pt-BR")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 235 | `          .includes(term);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 236 | `      }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 237 | `    [assigneeFilter, clientById, clientFilter, obligationById, occurrences, search],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 238 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 239 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 240 | `  const today = todayKey();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 241 | `  const nextWeek = format(addDays(new Date(), 7), "yyyy-MM-dd");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 242 | `  const pendingOccurrences = activeOccurrences.filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 243 | `    (occurrence) => occurrence.status !== "completed" && occurrence.status !== "skipped",` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 244 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 245 | `  const pendingGroups = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 246 | `    const groups = new Map<` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 247 | `      string,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 248 | `      Array<{ occurrence: ObligationOccurrence; obligation: Obligation }>` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 249 | `    >();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 250 | `    pendingOccurrences.forEach((occurrence) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 251 | `      const obligation = obligationById.get(occurrence.obligation_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 252 | `      if (!obligation) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 253 | `      const key = obligation.client_id ?? "without-client";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 254 | `      const group = groups.get(key) ?? [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 255 | `      group.push({ occurrence, obligation });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 256 | `      groups.set(key, group);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 257 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 258 | `    return [...groups.entries()]` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 259 | `      .map(([clientId, items]) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 260 | `        clientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 261 | `        client: clientById.get(clientId) ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 262 | `        items,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 263 | `      }))` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 264 | `      .sort((a, b) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 265 | `        (a.client?.name ?? "Sem cliente").localeCompare(b.client?.name ?? "Sem cliente", "pt-BR"),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 266 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 267 | `  }, [clientById, obligationById, pendingOccurrences]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 268 | `  const obligationGroups = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 269 | `    const groups = new Map<string, Obligation[]>();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 270 | `    obligations.forEach((obligation) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 271 | `      const key = obligation.client_id ?? "without-client";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 272 | `      const group = groups.get(key) ?? [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 273 | `      group.push(obligation);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 274 | `      groups.set(key, group);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 275 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 276 | `    return [...groups.entries()]` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 277 | `      .map(([clientId, items]) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 278 | `        clientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 279 | `        client: clientById.get(clientId) ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 280 | `        items,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 281 | `      }))` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 282 | `      .sort((a, b) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 283 | `        (a.client?.name ?? "Sem cliente").localeCompare(b.client?.name ?? "Sem cliente", "pt-BR"),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 284 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 285 | `  }, [clientById, obligations]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 286 | `  const overdueCount = pendingOccurrences.filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 287 | `    (occurrence) => occurrence.due_date < today,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 288 | `  ).length;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 289 | `  const todayCount = pendingOccurrences.filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 290 | `    (occurrence) => occurrence.due_date === today,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 291 | `  ).length;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 292 | `  const weekCount = pendingOccurrences.filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 293 | `    (occurrence) => occurrence.due_date > today && occurrence.due_date <= nextWeek,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 294 | `  ).length;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 295 | `  const completedMonthCount = activeOccurrences.filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 296 | `    (occurrence) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 297 | `      occurrence.status === "completed" &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 298 | `      occurrence.completed_at &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 299 | `      isSameMonth(new Date(occurrence.completed_at), new Date()),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 300 | `  ).length;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 301 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 302 | `  const openTask = (occurrence: ObligationOccurrence) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 303 | `    const task = occurrence.task_id ? taskById.get(occurrence.task_id) : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 304 | `    if (!task) return toast.error("A tarefa desta ocorrência ainda não foi criada.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 305 | `    setEditingTask(task);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 306 | `    setTaskDialogOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 307 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 308 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 309 | `  const createTaskNow = async (occurrence: ObligationOccurrence) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 310 | `    const restoringDeletedTask = Boolean(occurrence.task_id && !taskById.has(occurrence.task_id));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 311 | `    setWorkingOccurrenceId(occurrence.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 312 | `    const { data, error } = await (supabase as any).rpc("create_obligation_task", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 313 | `      target_occurrence_id: occurrence.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 314 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 315 | `    setWorkingOccurrenceId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 316 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 317 | `    await Promise.all([` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 318 | `      queryClient.invalidateQueries({ queryKey: ["obligation-occurrences"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 319 | `      queryClient.invalidateQueries({ queryKey: ["tasks"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 320 | `    ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 321 | `    toast.success(restoringDeletedTask ? "Tarefa restaurada" : "Tarefa criada");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 322 | `    const { data: refreshedTask } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 323 | `      .from("tasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 324 | `      .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 325 | `      .eq("id", data as string)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 326 | `      .maybeSingle();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 327 | `    if (refreshedTask) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 328 | `      setEditingTask(refreshedTask as Task);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 329 | `      setTaskDialogOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 330 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 331 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 332 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 333 | `  const completeOccurrence = async (occurrence: ObligationOccurrence) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 334 | `    setWorkingOccurrenceId(occurrence.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 335 | `    const { error } = await (supabase as any).rpc("complete_obligation_occurrence", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 336 | `      target_occurrence_id: occurrence.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 337 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 338 | `    setWorkingOccurrenceId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 339 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 340 | `    await Promise.all([` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 341 | `      queryClient.invalidateQueries({ queryKey: ["obligation-occurrences"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 342 | `      queryClient.invalidateQueries({ queryKey: ["tasks"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 343 | `    ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 344 | `    toast.success("Obrigação concluída neste período");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 345 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 346 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 347 | `  const setObligationActive = async (obligation: Obligation, isActive: boolean) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 348 | `    const { error } = await (supabase.from("obligations" as any) as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 349 | `      .update({ is_active: isActive })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 350 | `      .eq("id", obligation.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 351 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 352 | `    if (isActive) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 353 | `      const { error: refreshError } = await (supabase as any).rpc("refresh_obligation", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 354 | `        target_obligation_id: obligation.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 355 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 356 | `      if (refreshError) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 357 | `        return toast.error(` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 358 | `          \`Obrigação ativada, mas os próximos prazos não foram gerados: ${refreshError.message}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 359 | `        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 360 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 361 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 362 | `    await Promise.all([` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 363 | `      queryClient.invalidateQueries({ queryKey: ["obligations"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 364 | `      queryClient.invalidateQueries({ queryKey: ["obligation-occurrences"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 365 | `    ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 366 | `    toast.success(isActive ? "Obrigação ativada" : "Obrigação pausada");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 367 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 368 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 369 | `  const confirmDelete = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 370 | `    if (!deleteTarget) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 371 | `    setDeleting(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 372 | `    let error: { message: string } | null = null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 373 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 374 | `    if (deleteTarget.scope === "occurrence") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 375 | `      const result = await (supabase.from("obligation_occurrences" as any) as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 376 | `        .update({ status: "skipped" })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 377 | `        .eq("id", deleteTarget.occurrence.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 378 | `      error = result.error;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 379 | `    } else if (deleteTarget.scope === "series") {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 380 | `      const result = await (supabase.from("obligations" as any) as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 381 | `        .delete()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 382 | `        .eq("id", deleteTarget.obligation.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 383 | `      error = result.error;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 384 | `    } else if (activeWorkspace?.id) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 385 | `      const result = await (supabase.from("obligations" as any) as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 386 | `        .delete()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 387 | `        .eq("workspace_id", activeWorkspace.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 388 | `      error = result.error;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 389 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 390 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 391 | `    setDeleting(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 392 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 393 | `    const scope = deleteTarget.scope;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 394 | `    setDeleteTarget(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 395 | `    await Promise.all([` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 396 | `      queryClient.invalidateQueries({ queryKey: ["obligations"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 397 | `      queryClient.invalidateQueries({ queryKey: ["obligation-occurrences"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 398 | `    ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 399 | `    toast.success(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 400 | `      scope === "occurrence"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 401 | `        ? "Vencimento excluído"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 402 | `        : scope === "series"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 403 | `          ? "Obrigação e seus vencimentos foram excluídos"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 404 | `          : "Todas as obrigações foram excluídas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 405 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 406 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 407 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 408 | `  if (loading) return <div className="p-6 text-sm text-muted-foreground">Carregando...</div>;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 409 | `  if (!hasPermission("obligations")) return <Navigate to="/dashboard" />;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 410 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 411 | `  const pageError = obligationsError || occurrencesError;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 412 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 413 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 414 | `    <div className="space-y-5 p-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 415 | `      <header className="flex flex-wrap items-start justify-between gap-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 416 | `        <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 417 | `          <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 418 | `            <CalendarClock className="h-6 w-6 text-primary" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 419 | `            <h1 className="text-2xl font-semibold tracking-tight">Obrigações</h1>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 420 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 421 | `          <p className="mt-1 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 422 | `            Controle compromissos recorrentes dos clientes e gere tarefas no momento certo.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 423 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 424 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 425 | `        <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 426 | `          className="h-9 rounded-full px-4 shadow-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 427 | `          onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 428 | `            setEditingObligation(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 429 | `            setDialogOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 430 | `          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 431 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 432 | `          <Plus className="mr-2 h-4 w-4" /> Nova obrigação` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 433 | `        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 434 | `      </header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 435 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 436 | `      {pageError ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 437 | `        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 438 | `          Não foi possível carregar as obrigações: {(pageError as Error).message}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 439 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 440 | `      ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 441 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 442 | `      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 443 | `        <MetricCard` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 444 | `          label="Atrasadas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 445 | `          value={overdueCount}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 446 | `          icon={AlertTriangle}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 447 | `          tone="destructive"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 448 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 449 | `        <MetricCard label="Vencem hoje" value={todayCount} icon={Clock3} tone="warning" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 450 | `        <MetricCard` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 451 | `          label="Próximos 7 dias"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 452 | `          value={weekCount}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 453 | `          icon={CalendarCheck2}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 454 | `          tone="primary"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 455 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 456 | `        <MetricCard` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 457 | `          label="Concluídas no mês"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 458 | `          value={completedMonthCount}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 459 | `          icon={CheckCircle2}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 460 | `          tone="success"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 461 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 462 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 463 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 464 | `      <div className="flex flex-wrap gap-2 rounded-xl border bg-card p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 465 | `        <div className="relative min-w-[220px] flex-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 466 | `          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 467 | `          <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 468 | `            value={search}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 469 | `            onChange={(event) => setSearch(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 470 | `            placeholder="Buscar obrigação ou cliente..."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 471 | `            className="pl-9"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 472 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 473 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 474 | `        <Select value={clientFilter} onValueChange={setClientFilter}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 475 | `          <SelectTrigger className="w-52">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 476 | `            <SelectValue placeholder="Todos os clientes" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 477 | `          </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 478 | `          <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 479 | `            <SelectItem value="all">Todos os clientes</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 480 | `            {clients.map((client) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 481 | `              <SelectItem key={client.id} value={client.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 482 | `                {client.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 483 | `              </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 484 | `            ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 485 | `          </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 486 | `        </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 487 | `        <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 488 | `          <SelectTrigger className="w-52">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 489 | `            <SelectValue placeholder="Todos os responsáveis" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 490 | `          </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 491 | `          <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 492 | `            <SelectItem value="all">Todos os responsáveis</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 493 | `            {profiles.map((profile) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 494 | `              <SelectItem key={profile.id} value={profile.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 495 | `                {profile.full_name || profile.email || "Usuário"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 496 | `              </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 497 | `            ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 498 | `          </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 499 | `        </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 500 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 501 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 502 | `      <Tabs defaultValue="upcoming">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 503 | `        <TabsList>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 504 | `          <TabsTrigger value="upcoming">Próximas</TabsTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 505 | `          <TabsTrigger value="calendar">Calendário</TabsTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 506 | `          <TabsTrigger value="settings">Configurações</TabsTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 507 | `        </TabsList>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 508 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 509 | `        <TabsContent value="upcoming" className="mt-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 510 | `          {loadingObligations || loadingOccurrences ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 511 | `            <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 512 | `              <Loader2 className="h-4 w-4 animate-spin" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 513 | `              Carregando vencimentos...` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 514 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 515 | `          ) : pendingOccurrences.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 516 | `            <EmptyState` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 517 | `              title="Nenhum vencimento pendente"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 518 | `              description="Crie uma obrigação para começar a acompanhar os próximos prazos."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 519 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 520 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 521 | `            <div className="space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 522 | `              {pendingGroups.map(({ clientId, client, items }, index) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 523 | `                <ClientSection` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 524 | `                  key={clientId}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 525 | `                  client={client}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 526 | `                  logoUrl={client ? clientLogoUrls[client.id] : undefined}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 527 | `                  subtitle={\`${new Set(items.map((item) => item.obligation.id)).size} obrigação(ões) · ${items.length} vencimento(s)\`}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 528 | `                  defaultOpen={index === 0}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 529 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 530 | `                  {items.map(({ occurrence, obligation }) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 531 | `                    <OccurrenceRow` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 532 | `                      key={occurrence.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 533 | `                      occurrence={occurrence}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 534 | `                      obligation={obligation}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 535 | `                      client={client}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 536 | `                      assignee={profileById.get(obligation.assignee_id ?? "") ?? null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 537 | `                      taskAvailable={Boolean(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 538 | `                        occurrence.task_id && taskById.has(occurrence.task_id),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 539 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 540 | `                      working={workingOccurrenceId === occurrence.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 541 | `                      onOpenTask={() => openTask(occurrence)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 542 | `                      onCreateTask={() => void createTaskNow(occurrence)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 543 | `                      onComplete={() => void completeOccurrence(occurrence)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 544 | `                      onDeleteOccurrence={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 545 | `                        setDeleteTarget({ scope: "occurrence", occurrence, obligation })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 546 | `                      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 547 | `                      onDeleteSeries={() => setDeleteTarget({ scope: "series", obligation })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 548 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 549 | `                  ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 550 | `                </ClientSection>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 551 | `              ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 552 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 553 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 554 | `        </TabsContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 555 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 556 | `        <TabsContent value="calendar" className="mt-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 557 | `          <ObligationsCalendar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 558 | `            cursor={calendarCursor}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 559 | `            onCursorChange={setCalendarCursor}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 560 | `            occurrences={activeOccurrences}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 561 | `            obligationById={obligationById}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 562 | `            clientById={clientById}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 563 | `            onOccurrenceClick={(occurrence) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 564 | `              if (occurrence.task_id && taskById.has(occurrence.task_id)) openTask(occurrence);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 565 | `              else void createTaskNow(occurrence);` | Define o caminho alternativo da condicao anterior. |
| 566 | `            }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 567 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 568 | `        </TabsContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 569 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 570 | `        <TabsContent value="settings" className="mt-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 571 | `          {obligations.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 572 | `            <EmptyState` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 573 | `              title="Nenhuma obrigação configurada"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 574 | `              description="Cadastre a primeira regra recorrente de um cliente."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 575 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 576 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 577 | `            <div className="space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 578 | `              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 579 | `                <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 580 | `                  {obligations.length} obrigação(ões) configurada(s) neste ambiente` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 581 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 582 | `                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 583 | `                  variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 584 | `                  size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 585 | `                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 586 | `                  onClick={() => setDeleteTarget({ scope: "all" })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 587 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 588 | `                  <Trash2 className="mr-1.5 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 589 | `                  Excluir todas` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 590 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 591 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 592 | `              <div className="space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 593 | `                {obligationGroups.map(({ clientId, client, items }, index) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 594 | `                  <ClientSection` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 595 | `                    key={clientId}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 596 | `                    client={client}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 597 | `                    logoUrl={client ? clientLogoUrls[client.id] : undefined}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 598 | `                    subtitle={\`${items.length} obrigação(ões) configurada(s)\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 599 | `                    defaultOpen={index === 0}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 600 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 601 | `                    <div className="grid gap-3 lg:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 602 | `                      {items.map((obligation) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 603 | `                        const assignee = profileById.get(obligation.assignee_id ?? "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 604 | `                        const nextOccurrence = occurrences.find(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 605 | `                          (occurrence) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 606 | `                            occurrence.obligation_id === obligation.id &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 607 | `                            occurrence.status !== "completed" &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 608 | `                            occurrence.status !== "skipped" &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 609 | `                            occurrence.due_date >= today,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 610 | `                        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 611 | `                        return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 612 | `                          <Card key={obligation.id} className="p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 613 | `                            <div className="flex items-start justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 614 | `                              <div className="min-w-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 615 | `                                <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 616 | `                                  <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 617 | `                                    className="h-3 w-3 shrink-0 rounded-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 618 | `                                    style={{ backgroundColor: client?.color || "#64748b" }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 619 | `                                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 620 | `                                  <h3 className="truncate font-semibold">{obligation.title}</h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 621 | `                                  {!obligation.is_active && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 622 | `                                    <Badge variant="outline">Pausada</Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 623 | `                                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 624 | `                                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 625 | `                                <p className="mt-1 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 626 | `                                  {client?.name || "Sem cliente"} · {formatRecurrence(obligation)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 627 | `                                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 628 | `                              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 629 | `                              <div className="flex shrink-0 gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 630 | `                                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 631 | `                                  variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 632 | `                                  size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 633 | `                                  className="h-8 w-8"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 634 | `                                  title="Editar"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 635 | `                                  onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 636 | `                                    setEditingObligation(obligation);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 637 | `                                    setDialogOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 638 | `                                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 639 | `                                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 640 | `                                  <Pencil className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 641 | `                                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 642 | `                                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 643 | `                                  variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 644 | `                                  size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 645 | `                                  className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 646 | `                                  title="Excluir obrigação"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 647 | `                                  onClick={() => setDeleteTarget({ scope: "series", obligation })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 648 | `                                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 649 | `                                  <Trash2 className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 650 | `                                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 651 | `                                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 652 | `                                  variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 653 | `                                  size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 654 | `                                  className="h-8 w-8"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 655 | `                                  title={obligation.is_active ? "Pausar" : "Ativar"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 656 | `                                  onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 657 | `                                    void setObligationActive(obligation, !obligation.is_active)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 658 | `                                  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 659 | `                                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 660 | `                                  {obligation.is_active ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 661 | `                                    <Pause className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 662 | `                                  ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 663 | `                                    <Play className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 664 | `                                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 665 | `                                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 666 | `                              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 667 | `                            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 668 | `                            <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-3 text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 669 | `                              <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 670 | `                                <span className="block text-muted-foreground">Responsável</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 671 | `                                <span className="mt-1 block font-medium">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 672 | `                                  {assignee?.full_name || assignee?.email || "Sem responsável"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 673 | `                                </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 674 | `                              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 675 | `                              <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 676 | `                                <span className="block text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 677 | `                                  Próximo vencimento` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 678 | `                                </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 679 | `                                <span className="mt-1 block font-medium">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 680 | `                                  {nextOccurrence` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 681 | `                                    ? formatDate(nextOccurrence.due_date)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 682 | `                                    : "Sem data futura"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 683 | `                                </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 684 | `                              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 685 | `                              <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 686 | `                                <span className="block text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 687 | `                                  Criação da tarefa` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 688 | `                                </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 689 | `                                <span className="mt-1 block font-medium">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 690 | `                                  {obligation.create_before_days === 0` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 691 | `                                    ? "No vencimento"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 692 | `                                    : \`${obligation.create_before_days} dia(s) antes\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 693 | `                                </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 694 | `                              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 695 | `                              <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 696 | `                                <span className="block text-muted-foreground">Período</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 697 | `                                <span className="mt-1 block font-medium">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 698 | `                                  Desde {formatDate(obligation.start_date)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 699 | `                                  {obligation.end_date` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 700 | `                                    ? \` até ${formatDate(obligation.end_date)}\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 701 | `                                    : " · sem término"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 702 | `                                </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 703 | `                              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 704 | `                            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 705 | `                          </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 706 | `                        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 707 | `                      })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 708 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 709 | `                  </ClientSection>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 710 | `                ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 711 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 712 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 713 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 714 | `        </TabsContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 715 | `      </Tabs>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 716 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 717 | `      <ObligationDialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 718 | `        open={dialogOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 719 | `        onOpenChange={setDialogOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 720 | `        obligation={editingObligation}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 721 | `      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 722 | `      <TaskDialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen} task={editingTask} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 723 | `      <AlertDialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 724 | `        open={!!deleteTarget}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 725 | `        onOpenChange={(open) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 726 | `          if (!open && !deleting) setDeleteTarget(null);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 727 | `        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 728 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 729 | `        <AlertDialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 730 | `          <AlertDialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 731 | `            <AlertDialogTitle>{deleteDialogTitle(deleteTarget)}</AlertDialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 732 | `            <AlertDialogDescription>{deleteDialogDescription(deleteTarget)}</AlertDialogDescription>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 733 | `          </AlertDialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 734 | `          <AlertDialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 735 | `            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 736 | `            <AlertDialogAction` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 737 | `              disabled={deleting}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 738 | `              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 739 | `              onClick={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 740 | `                event.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 741 | `                void confirmDelete();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 742 | `              }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 743 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 744 | `              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 745 | `              {deleting ? "Excluindo..." : "Excluir"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 746 | `            </AlertDialogAction>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 747 | `          </AlertDialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 748 | `        </AlertDialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 749 | `      </AlertDialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 750 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 751 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 752 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 753 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 754 | `function MetricCard({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 755 | `  label,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 756 | `  value,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 757 | `  icon: Icon,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 758 | `  tone,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 759 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 760 | `  label: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 761 | `  value: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 762 | `  icon: typeof AlertTriangle;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 763 | `  tone: "destructive" | "warning" | "primary" | "success";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 764 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 765 | `  const colors = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 766 | `    destructive: "bg-destructive/10 text-destructive",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 767 | `    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 768 | `    primary: "bg-primary/10 text-primary",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 769 | `    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 770 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 771 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 772 | `    <Card className="flex items-center gap-3 p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 773 | `      <span className={\`grid h-10 w-10 place-items-center rounded-xl ${colors[tone]}\`}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 774 | `        <Icon className="h-5 w-5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 775 | `      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 776 | `      <span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 777 | `        <span className="block text-2xl font-semibold leading-none">{value}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 778 | `        <span className="mt-1 block text-xs text-muted-foreground">{label}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 779 | `      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 780 | `    </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 781 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 782 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 783 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 784 | `function ClientSection({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 785 | `  client,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 786 | `  logoUrl,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 787 | `  subtitle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 788 | `  defaultOpen,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 789 | `  children,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 790 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 791 | `  client: Client | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 792 | `  logoUrl?: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 793 | `  subtitle: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 794 | `  defaultOpen: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 795 | `  children: ReactNode;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 796 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 797 | `  const [open, setOpen] = useState(defaultOpen);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 798 | `  const clientName = client?.name ?? "Sem cliente";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 799 | `  const initials = clientName` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 800 | `    .split(/\s+/)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 801 | `    .slice(0, 2)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 802 | `    .map((part) => part[0])` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 803 | `    .join("")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 804 | `    .toUpperCase();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 805 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 806 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 807 | `    <Collapsible open={open} onOpenChange={setOpen}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 808 | `      <Card className="overflow-hidden">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 809 | `        <CollapsibleTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 810 | `          <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 811 | `            type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 812 | `            className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-muted/40"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 813 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 814 | `            <Avatar className="h-11 w-11 shrink-0 rounded-xl border bg-background">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 815 | `              <AvatarImage` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 816 | `                src={logoUrl}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 817 | `                alt={\`Logo ${clientName}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 818 | `                className="object-contain p-1"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 819 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 820 | `              <AvatarFallback` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 821 | `                className="rounded-xl text-xs font-semibold text-white"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 822 | `                style={{ backgroundColor: client?.color || "#64748b" }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 823 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 824 | `                {initials || "?"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 825 | `              </AvatarFallback>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 826 | `            </Avatar>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 827 | `            <div className="min-w-0 flex-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 828 | `              <h2 className="truncate font-semibold">{clientName}</h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 829 | `              <p className="text-xs text-muted-foreground">{subtitle}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 830 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 831 | `            <ChevronDown` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 832 | `              className={\`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 833 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 834 | `          </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 835 | `        </CollapsibleTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 836 | `        <CollapsibleContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 837 | `          <div className="space-y-2 border-t bg-muted/15 p-3">{children}</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 838 | `        </CollapsibleContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 839 | `      </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 840 | `    </Collapsible>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 841 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 842 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 843 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 844 | `function OccurrenceRow({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 845 | `  occurrence,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 846 | `  obligation,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 847 | `  client,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 848 | `  assignee,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 849 | `  taskAvailable,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 850 | `  working,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 851 | `  onOpenTask,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 852 | `  onCreateTask,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 853 | `  onComplete,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 854 | `  onDeleteOccurrence,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 855 | `  onDeleteSeries,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 856 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 857 | `  occurrence: ObligationOccurrence;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 858 | `  obligation: Obligation;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 859 | `  client: Client | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 860 | `  assignee: Profile | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 861 | `  taskAvailable: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 862 | `  working: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 863 | `  onOpenTask: () => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 864 | `  onCreateTask: () => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 865 | `  onComplete: () => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 866 | `  onDeleteOccurrence: () => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 867 | `  onDeleteSeries: () => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 868 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 869 | `  const today = todayKey();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 870 | `  const overdue = occurrence.due_date < today;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 871 | `  const dueToday = occurrence.due_date === today;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 872 | `  const assigneeName = assignee?.full_name || assignee?.email || "Sem responsável";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 873 | `  const initials = assignee` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 874 | `    ? assigneeName` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 875 | `        .split(/\s+/)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 876 | `        .slice(0, 2)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 877 | `        .map((part) => part[0])` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 878 | `        .join("")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 879 | `        .toUpperCase()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 880 | `    : "?";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 881 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 882 | `    <Card` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 883 | `      className={\`flex flex-wrap items-center gap-3 p-3 ${overdue ? "border-destructive/40" : dueToday ? "border-amber-500/50" : ""}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 884 | `    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 885 | `      <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 886 | `        className="grid h-12 w-14 shrink-0 place-items-center rounded-xl text-center text-white"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 887 | `        style={{ backgroundColor: client?.color || "#64748b" }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 888 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 889 | `        <span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 890 | `          <span className="block text-lg font-bold leading-none">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 891 | `            {format(new Date(\`${occurrence.due_date}T12:00:00\`), "dd")}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 892 | `          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 893 | `          <span className="text-[9px] font-semibold uppercase">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 894 | `            {format(new Date(\`${occurrence.due_date}T12:00:00\`), "MMM", { locale: ptBR })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 895 | `          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 896 | `        </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 897 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 898 | `      <Avatar className="h-9 w-9 shrink-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 899 | `        <AvatarImage src={assignee?.avatar_url || undefined} alt={assigneeName} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 900 | `        <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 901 | `      </Avatar>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 902 | `      <div className="min-w-[180px] flex-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 903 | `        <div className="flex flex-wrap items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 904 | `          <h3 className="font-medium">{obligation.title}</h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 905 | `          {overdue ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 906 | `            <Badge variant="destructive">Atrasada</Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 907 | `          ) : dueToday ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 908 | `            <Badge className="bg-amber-500 text-white">Hoje</Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 909 | `          ) : taskAvailable ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 910 | `            <Badge variant="secondary">Tarefa criada</Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 911 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 912 | `            <Badge variant="outline">Prevista</Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 913 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 914 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 915 | `        <p className="mt-0.5 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 916 | `          {client?.name || "Sem cliente"} · {assigneeName} · {formatRecurrence(obligation)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 917 | `          {occurrence.due_time ? \` · ${occurrence.due_time.slice(0, 5)}\` : ""}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 918 | `        </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 919 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 920 | `      <div className="flex shrink-0 gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 921 | `        {taskAvailable ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 922 | `          <Button variant="outline" size="sm" onClick={onOpenTask}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 923 | `            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 924 | `            Abrir tarefa` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 925 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 926 | `        ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 927 | `          <Button variant="outline" size="sm" disabled={working} onClick={onCreateTask}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 928 | `            {working ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 929 | `              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 930 | `            ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 931 | `              <Plus className="mr-1.5 h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 932 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 933 | `            Criar tarefa` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 934 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 935 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 936 | `        <Button size="sm" disabled={working} onClick={onComplete}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 937 | `          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 938 | `          Concluir` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 939 | `        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 940 | `        <DropdownMenu>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 941 | `          <DropdownMenuTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 942 | `            <Button variant="ghost" size="icon" className="h-8 w-8" title="Mais opções">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 943 | `              <MoreHorizontal className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 944 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 945 | `          </DropdownMenuTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 946 | `          <DropdownMenuContent align="end">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 947 | `            <DropdownMenuItem className="text-destructive" onClick={onDeleteOccurrence}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 948 | `              <Trash2 className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 949 | `              Excluir somente este vencimento` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 950 | `            </DropdownMenuItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 951 | `            <DropdownMenuItem className="text-destructive" onClick={onDeleteSeries}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 952 | `              <Trash2 className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 953 | `              Excluir toda a série` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 954 | `            </DropdownMenuItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 955 | `          </DropdownMenuContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 956 | `        </DropdownMenu>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 957 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 958 | `    </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 959 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 960 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 961 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 962 | `function ObligationsCalendar({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 963 | `  cursor,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 964 | `  onCursorChange,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 965 | `  occurrences,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 966 | `  obligationById,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 967 | `  clientById,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 968 | `  onOccurrenceClick,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 969 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 970 | `  cursor: Date;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 971 | `  onCursorChange: (date: Date) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 972 | `  occurrences: ObligationOccurrence[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 973 | `  obligationById: Map<string, Obligation>;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 974 | `  clientById: Map<string, Client>;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 975 | `  onOccurrenceClick: (occurrence: ObligationOccurrence) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 976 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 977 | `  const days = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 978 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 979 | `      eachDayOfInterval({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 980 | `        start: startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 981 | `        end: endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 982 | `      }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 983 | `    [cursor],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 984 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 985 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 986 | `    <Card className="overflow-hidden">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 987 | `      <div className="flex items-center justify-between border-b p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 988 | `        <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 989 | `          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 990 | `            variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 991 | `            size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 992 | `            className="h-8 w-8"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 993 | `            onClick={() => onCursorChange(subMonths(cursor, 1))}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 994 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 995 | `            <ChevronLeft className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 996 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 997 | `          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 998 | `            variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 999 | `            size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1000 | `            className="h-8 w-8"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1001 | `            onClick={() => onCursorChange(addMonths(cursor, 1))}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1002 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1003 | `            <ChevronRight className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1004 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1005 | `          <Button variant="ghost" size="sm" onClick={() => onCursorChange(new Date())}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1006 | `            Hoje` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1007 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1008 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1009 | `        <h3 className="font-semibold capitalize">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1010 | `          {format(cursor, "MMMM yyyy", { locale: ptBR })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1011 | `        </h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1012 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1013 | `      <div className="grid grid-cols-7 border-b bg-muted/40 text-center text-[10px] font-medium uppercase text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1014 | `        {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1015 | `          <div key={day} className="p-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1016 | `            {day}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1017 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1018 | `        ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1019 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1020 | `      <div className="grid grid-cols-7">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1021 | `        {days.map((day) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1022 | `          const items = occurrences.filter((occurrence) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1023 | `            isSameDay(new Date(\`${occurrence.due_date}T12:00:00\`), day),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1024 | `          );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1025 | `          return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1026 | `            <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1027 | `              key={day.toISOString()}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1028 | `              className={\`min-h-28 border-b border-r p-1.5 ${isSameMonth(day, cursor) ? "" : "bg-muted/20 text-muted-foreground"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1029 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1030 | `              <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1031 | `                className={\`inline-grid h-6 min-w-6 place-items-center rounded-full text-xs ${isSameDay(day, new Date()) ? "bg-primary font-semibold text-primary-foreground" : ""}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1032 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1033 | `                {format(day, "d")}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1034 | `              </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1035 | `              <div className="mt-1 space-y-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1036 | `                {items.slice(0, 4).map((occurrence) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1037 | `                  const obligation = obligationById.get(occurrence.obligation_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1038 | `                  if (!obligation) return null;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1039 | `                  const client = clientById.get(obligation.client_id ?? "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1040 | `                  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1041 | `                    <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1042 | `                      key={occurrence.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1043 | `                      type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1044 | `                      onClick={() => onOccurrenceClick(occurrence)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1045 | `                      className="block w-full truncate rounded px-1.5 py-1 text-left text-[10px] font-medium text-white shadow-sm hover:brightness-105"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1046 | `                      style={{ backgroundColor: client?.color || "#64748b" }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1047 | `                      title={obligation.title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1048 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1049 | `                      {obligation.title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1050 | `                    </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1051 | `                  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1052 | `                })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1053 | `                {items.length > 4 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1054 | `                  <span className="block text-[10px] font-medium text-primary">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1055 | `                    +{items.length - 4} mais` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1056 | `                  </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1057 | `                ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1058 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1059 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1060 | `          );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1061 | `        })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1062 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1063 | `    </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1064 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1065 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1066 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1067 | `function EmptyState({ title, description }: { title: string; description: string }) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1068 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1069 | `    <Card className="grid place-items-center px-6 py-16 text-center">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1070 | `      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1071 | `        <Settings2 className="h-6 w-6" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1072 | `      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1073 | `      <h3 className="mt-4 font-semibold">{title}</h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1074 | `      <p className="mt-1 max-w-md text-sm text-muted-foreground">{description}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1075 | `    </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1076 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1077 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1078 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1079 | `function formatDate(value: string) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1080 | `  return format(new Date(\`${value.slice(0, 10)}T12:00:00\`), "dd/MM/yyyy");` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1081 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1082 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1083 | `function formatRecurrence(obligation: Obligation) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1084 | `  if (obligation.frequency === "daily")` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1085 | `    return obligation.interval_count === 1` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1086 | `      ? obligation.business_days_only` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1087 | `        ? "Todos os dias úteis"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1088 | `        : "Todos os dias"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1089 | `      : \`A cada ${obligation.interval_count} dias\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1090 | `  if (obligation.frequency === "weekly") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1091 | `    const labels = ["", "seg", "ter", "qua", "qui", "sex", "sáb", "dom"];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1092 | `    return \`${obligation.interval_count === 1 ? "Semanal" : \`A cada ${obligation.interval_count} semanas\`} · ${obligation.days_of_week.map((day) => labels[day]).join(", ")}\`;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1093 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1094 | `  if (obligation.month_rule === "last_day")` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1095 | `    return obligation.interval_count === 1` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1096 | `      ? "Último dia do mês"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1097 | `      : \`Último dia a cada ${obligation.interval_count} meses\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1098 | `  if (obligation.month_rule === "last_business_day")` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1099 | `    return obligation.interval_count === 1` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1100 | `      ? "Último dia útil do mês"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1101 | `      : \`Último dia útil a cada ${obligation.interval_count} meses\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1102 | `  return \`${obligation.interval_count === 1 ? "Mensal" : \`A cada ${obligation.interval_count} meses\`} · dia${obligation.days_of_month.length > 1 ? "s" : ""} ${obligation.days_of_month.join(" e ")}\`;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1103 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1104 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1105 | `function deleteDialogTitle(target: DeleteTarget | null) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1106 | `  if (target?.scope === "occurrence") return "Excluir somente este vencimento?";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1107 | `  if (target?.scope === "series") return "Excluir toda esta obrigação?";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1108 | `  if (target?.scope === "all") return "Excluir todas as obrigações?";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1109 | `  return "Excluir obrigação?";` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1110 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1111 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1112 | `function deleteDialogDescription(target: DeleteTarget | null) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1113 | `  if (target?.scope === "occurrence") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1114 | `    return \`Somente o vencimento de ${formatDate(target.occurrence.due_date)} será removido. Os demais continuarão normalmente.\`;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1115 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1116 | `  if (target?.scope === "series") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1117 | `    return \`A obrigação “${target.obligation.title}” e todos os vencimentos dela serão excluídos. Tarefas que já foram geradas serão preservadas.\`;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1118 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1119 | `  return "Todas as obrigações e seus vencimentos serão excluídos deste ambiente. Tarefas que já foram geradas serão preservadas.";` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1120 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1121 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
