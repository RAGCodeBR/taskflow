# src/routes/_app/clients.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createFileRoute, Link, Outlet } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useEffect, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import { Label } from "@/components/ui/label";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 8 | `  Dialog,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `  DialogContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `  DialogFooter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `  DialogHeader,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `  DialogTitle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `} from "@/components/ui/dialog";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `import { Checkbox } from "@/components/ui/checkbox";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 15 | `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 16 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 17 | `  Select,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  SelectContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  SelectItem,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  SelectTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `  SelectValue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `} from "@/components/ui/select";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 24 | `  Archive,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `  ArchiveRestore,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `  ChevronDown,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `  FileDown,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `  Plus,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `  Pencil,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  Trash2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `  Sparkles,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `  Search,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  LoaderCircle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `} from "lucide-react";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 36 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 37 | `import { useClients, useProfiles, useSubtasks, type Client } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 38 | `import { useWorkspaceTasks } from "@/hooks/use-workspace-tasks";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 39 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 41 | `type ReportPeriod =` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 42 | `  "all" | "current_month" | "last_3_months" | "last_6_months" | "last_12_months" | "custom";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 44 | `const reportPeriodLabels: Record<ReportPeriod, string> = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 45 | `  all: "Todo o período",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `  current_month: "Mês atual",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `  last_3_months: "Últimos 3 meses",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `  last_6_months: "Últimos 6 meses",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `  last_12_months: "Últimos 12 meses",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `  custom: "Período personalizado",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 52 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 53 | `const toInputDate = (date: Date) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 54 | `  \`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 55 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 56 | `const formatReportDate = (value: string | null | undefined) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 57 | `  if (!value) return "Sem data informada";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 58 | `  const date = value.length === 10 ? new Date(\`${value}T12:00:00\`) : new Date(value);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 59 | `  return Number.isNaN(date.getTime()) ? "Sem data informada" : date.toLocaleDateString("pt-BR");` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 60 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 61 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 62 | `const getPeriodBounds = (period: ReportPeriod, customStart: string, customEnd: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 63 | `  if (period === "all") return { start: "", end: "" };` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 64 | `  if (period === "custom") return { start: customStart, end: customEnd };` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 65 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 66 | `  const today = new Date();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 67 | `  const start = new Date(today.getFullYear(), today.getMonth(), 1);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 68 | `  if (period === "last_3_months") start.setMonth(start.getMonth() - 2);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 69 | `  if (period === "last_6_months") start.setMonth(start.getMonth() - 5);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 70 | `  if (period === "last_12_months") start.setMonth(start.getMonth() - 11);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 71 | `  return { start: toInputDate(start), end: toInputDate(today) };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 72 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 73 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 74 | `const stripHtml = (value: string | null) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 75 | `  if (!value) return "";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 76 | `  const element = document.createElement("div");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 77 | `  element.innerHTML = value;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `  return (element.textContent || element.innerText || "").replace(/\s+/g, " ").trim();` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 79 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 80 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 81 | `const filenamePart = (value: string) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 82 | `  value` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `    .normalize("NFD")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `    .replace(/[\u0300-\u036f]/g, "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `    .replace(/[^a-zA-Z0-9]+/g, "-")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `    .replace(/^-|-$/g, "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `    .toLowerCase();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 89 | `const preloadImage = (src: string) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 90 | `  new Promise<boolean>((resolve) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 91 | `    const image = new Image();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 92 | `    const timeout = window.setTimeout(() => finish(false), 8000);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 93 | `    let settled = false;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 94 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 95 | `    const finish = (loaded: boolean) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 96 | `      if (settled) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 97 | `      settled = true;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 98 | `      window.clearTimeout(timeout);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `      resolve(loaded);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 100 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 101 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 102 | `    image.onload = () => finish(true);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 103 | `    image.onerror = () => finish(false);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 104 | `    image.src = src;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 105 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 106 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 107 | `const CLIENT_AVATAR_CACHE_KEY = "taskflow-client-avatar-urls";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 108 | `const CLIENT_AVATAR_CACHE_TTL = 50 * 60 * 1000;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 109 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 110 | `type CachedAvatar = { url: string; expiresAt: number; path?: string };` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 111 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 112 | `const getCachedAvatarUrls = (paths: Record<string, string> = {}): Record<string, string> => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 113 | `  if (typeof window === "undefined") return {};` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 114 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 115 | `  try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 116 | `    const cached = JSON.parse(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 117 | `      window.sessionStorage.getItem(CLIENT_AVATAR_CACHE_KEY) ?? "{}",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `    ) as Record<string, CachedAvatar>;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `    const now = Date.now();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 120 | `    const valid = Object.fromEntries(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 121 | `      Object.entries(cached)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `        .filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `          ([clientId, entry]) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 124 | `            entry?.url && entry.expiresAt > now && entry.path === paths[clientId],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `        )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `        .map(([clientId, entry]) => [clientId, entry.url]),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 127 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 128 | `    window.sessionStorage.setItem(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `      CLIENT_AVATAR_CACHE_KEY,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 130 | `      JSON.stringify(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `        Object.fromEntries(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `          Object.entries(cached).filter(([, entry]) => entry?.url && entry.expiresAt > now),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 133 | `        ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 135 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 136 | `    return valid;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 137 | `  } catch {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `    return {};` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 139 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 140 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 141 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 142 | `const cacheAvatarUrls = (urls: Record<string, string>, paths: Record<string, string>) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 143 | `  if (typeof window === "undefined" || Object.keys(urls).length === 0) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 144 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 145 | `  try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 146 | `    const cached = JSON.parse(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 147 | `      window.sessionStorage.getItem(CLIENT_AVATAR_CACHE_KEY) ?? "{}",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 148 | `    ) as Record<string, CachedAvatar>;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `    const expiresAt = Date.now() + CLIENT_AVATAR_CACHE_TTL;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 150 | `    Object.entries(urls).forEach(([clientId, url]) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 151 | `      cached[clientId] = { url, expiresAt, path: paths[clientId] };` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 153 | `    window.sessionStorage.setItem(CLIENT_AVATAR_CACHE_KEY, JSON.stringify(cached));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `  } catch {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 155 | `    // A lista segue funcional se o navegador bloquear o armazenamento local.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 156 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 157 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 158 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 159 | `export const Route = createFileRoute("/_app/clients")({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 160 | `  component: Outlet,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 162 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 163 | `export function ClientsIndexPage() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 164 | `  const qc = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 165 | `  const { user } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 166 | `  const { data: clients = [] } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 167 | `  const { data: tasks = [] } = useWorkspaceTasks();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 168 | `  const { data: subtasks = [] } = useSubtasks();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 169 | `  const { data: profiles = [] } = useProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 170 | `  const [open, setOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 171 | `  const [edit, setEdit] = useState<Client | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 172 | `  const [color, setColor] = useState("#1e3a8a");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 173 | `  const [desc, setDesc] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 174 | `  const [cnpj, setCnpj] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 175 | `  const [legalName, setLegalName] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 176 | `  const [tradeName, setTradeName] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 177 | `  const [stateRegistration, setStateRegistration] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 178 | `  const [municipalRegistration, setMunicipalRegistration] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 179 | `  const [address, setAddress] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 180 | `  const [phone, setPhone] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 181 | `  const [email, setEmail] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 182 | `  const [responsible, setResponsible] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 183 | `  const [search, setSearch] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 184 | `  const [statusFilter, setStatusFilter] = useState<"active" | "inactive" | "all">("active");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 185 | `  const [avatarUrls, setAvatarUrls] = useState<Record<string, string>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 186 | `  const [avatarsReady, setAvatarsReady] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 187 | `  const [avatarBatchKey, setAvatarBatchKey] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 188 | `  const [reportClient, setReportClient] = useState<Client | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 189 | `  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>("all");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 190 | `  const [reportScope, setReportScope] = useState<"completed" | "all">("completed");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 191 | `  const [reportStart, setReportStart] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 192 | `  const [reportEnd, setReportEnd] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 193 | `  const [reportIncludeDescription, setReportIncludeDescription] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 194 | `  const [reportIncludeSubtasks, setReportIncludeSubtasks] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 195 | `  const [reportShowAssignee, setReportShowAssignee] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 196 | `  const [reportAssigneeIds, setReportAssigneeIds] = useState<string[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 197 | `  const [generatingReport, setGeneratingReport] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 198 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 199 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 200 | `    let cancelled = false;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 201 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 202 | `    const loadAvatarUrls = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 203 | `      const clientsWithAvatar = clients.filter((client) => client.avatar_path);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 204 | `      const clientAvatarPaths = Object.fromEntries(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 205 | `        clientsWithAvatar.map((client) => [client.id, client.avatar_path!]),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 206 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 207 | `      const currentBatchKey = clientsWithAvatar` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 208 | `        .map((client) => \`${client.id}:${client.avatar_path}\`)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 209 | `        .sort()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 210 | `        .join("|");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 211 | `      const cachedUrls = getCachedAvatarUrls(clientAvatarPaths);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 212 | `      const visibleCachedUrls = Object.fromEntries(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 213 | `        clientsWithAvatar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 214 | `          .filter((client) => cachedUrls[client.id])` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 215 | `          .map((client) => [client.id, cachedUrls[client.id]]),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 216 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 217 | `      const clientsToLoad = clientsWithAvatar.filter((client) => !visibleCachedUrls[client.id]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 218 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 219 | `      setAvatarUrls(visibleCachedUrls);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 220 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 221 | `      if (clientsWithAvatar.length === 0) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 222 | `        if (!cancelled) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 223 | `          setAvatarUrls({});` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 224 | `          setAvatarsReady(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 225 | `          setAvatarBatchKey(currentBatchKey);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 226 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 227 | `        return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 228 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 229 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 230 | `      if (clientsToLoad.length === 0) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 231 | `        if (!cancelled) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 232 | `          setAvatarsReady(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 233 | `          setAvatarBatchKey(currentBatchKey);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 234 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 235 | `        return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 236 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 237 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 238 | `      setAvatarsReady(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 239 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 240 | `      const { data } = await supabase.storage.from("task-attachments").createSignedUrls(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 241 | `        clientsToLoad.map((client) => client.avatar_path!),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 242 | `        3600,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 243 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 244 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 245 | `      const urlByPath = new Map((data ?? []).map((item) => [item.path, item.signedUrl] as const));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 246 | `      const candidates = clientsToLoad` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 247 | `        .map((client) => [client.id, urlByPath.get(client.avatar_path!)] as const)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 248 | `        .filter((entry): entry is readonly [string, string] => Boolean(entry[1]));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 249 | `      const verified = await Promise.all(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 250 | `        candidates.map(async ([clientId, url]) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 251 | `          (await preloadImage(url)) ? ([clientId, url] as const) : null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 252 | `        ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 253 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 254 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 255 | `      if (!cancelled) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 256 | `        const loadedUrls = Object.fromEntries(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 257 | `          verified.filter((entry): entry is readonly [string, string] => entry !== null),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 258 | `        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 259 | `        cacheAvatarUrls(loadedUrls, clientAvatarPaths);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 260 | `        setAvatarUrls({ ...visibleCachedUrls, ...loadedUrls });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 261 | `        setAvatarsReady(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 262 | `        setAvatarBatchKey(currentBatchKey);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 263 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 264 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 265 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 266 | `    void loadAvatarUrls();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 267 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 268 | `      cancelled = true;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 269 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 270 | `  }, [clients]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 271 | `  const filteredClients = clients.filter((client) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 272 | `    const term = search.trim().toLocaleLowerCase("pt-BR");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 273 | `    // Treat clients created before the migration as active until the database update runs.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 274 | `    const isActive = client.is_active !== false;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 275 | `    const matchesStatus =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 276 | `      statusFilter === "all" || (statusFilter === "active" ? isActive : !isActive);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 277 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 278 | `    return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 279 | `      matchesStatus &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 280 | `      (client.name.toLocaleLowerCase("pt-BR").includes(term) ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 281 | `        client.description?.toLocaleLowerCase("pt-BR").includes(term))` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 282 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 283 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 284 | `  const currentAvatarBatchKey = clients` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 285 | `    .filter((client) => client.avatar_path)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 286 | `    .map((client) => \`${client.id}:${client.avatar_path}\`)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 287 | `    .sort()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 288 | `    .join("|");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 289 | `  const shouldWaitForLogos =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 290 | `    Boolean(currentAvatarBatchKey) && (!avatarsReady || avatarBatchKey !== currentAvatarBatchKey);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 291 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 292 | `  const onOpen = (c: Client | null) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 293 | `    setEdit(c);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 294 | `    setColor(c?.color ?? "#1e3a8a");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 295 | `    setDesc(c?.description ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 296 | `    setOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 297 | `    setCnpj(c?.cnpj ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 298 | `    setTradeName(c?.trade_name ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 299 | `    setLegalName(c?.legal_name ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 300 | `    setMunicipalRegistration(c?.municipal_registration ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 301 | `    setStateRegistration(c?.state_registration ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 302 | `    setPhone(c?.phone ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 303 | `    setAddress(c?.address ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 304 | `    setEmail(c?.email ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 305 | `    setResponsible(c?.responsible ?? c?.name ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 306 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 307 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 308 | `  const save = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 309 | `    const displayName = tradeName.trim() || legalName.trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 310 | `    if (!displayName) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 311 | `      toast.error("Preencha o Nome fantasia ou a Razão social.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 312 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 313 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 314 | `    const clientData = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 315 | `      name: displayName,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 316 | `      color,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 317 | `      description: desc || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 318 | `      cnpj: cnpj || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 319 | `      legal_name: legalName || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 320 | `      trade_name: tradeName || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 321 | `      state_registration: stateRegistration || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 322 | `      municipal_registration: municipalRegistration || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 323 | `      address: address || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 324 | `      phone: phone || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 325 | `      email: email || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 326 | `      responsible: responsible || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 327 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 328 | `    if (edit) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 329 | `      await supabase.from("clients").update(clientData).eq("id", edit.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 330 | `    } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 331 | `      await supabase.from("clients").insert({ ...clientData, created_by: user?.id });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 332 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 333 | `    qc.invalidateQueries({ queryKey: ["clients"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 334 | `    setOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 335 | `    toast.success("Cliente salvo");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 336 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 337 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 338 | `  const remove = async (c: Client) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 339 | `    if (!confirm(\`Excluir cliente "${c.name}"?\`)) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 340 | `    await supabase.from("clients").delete().eq("id", c.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 341 | `    qc.invalidateQueries({ queryKey: ["clients"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 342 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 343 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 344 | `  const setClientActive = async (client: Client, isActive: boolean) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 345 | `    const action = isActive ? "reativar" : "inativar";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 346 | `    const description = isActive` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 347 | `      ? \`Reativar o cliente "${client.name}"? Ele voltará a aparecer nas listas de clientes ativos.\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 348 | `      : \`Inativar o cliente "${client.name}"? Nenhuma tarefa, histórico, dado ou anexo será excluído.\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 349 | `    if (!confirm(description)) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 350 | `    const { error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 351 | `      .from("clients")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 352 | `      .update({ is_active: isActive })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 353 | `      .eq("id", client.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 354 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 355 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 356 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 357 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 358 | `    await qc.invalidateQueries({ queryKey: ["clients"] });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 359 | `    toast.success(isActive ? "Cliente reativado" : "Cliente inativado");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 360 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 361 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 362 | `  const openReport = (client: Client) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 363 | `    setReportClient(client);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 364 | `    setReportPeriod("all");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 365 | `    setReportScope("completed");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 366 | `    setReportStart("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 367 | `    setReportEnd("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 368 | `    setReportIncludeDescription(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 369 | `    setReportIncludeSubtasks(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 370 | `    setReportShowAssignee(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 371 | `    setReportAssigneeIds([]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 372 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 373 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 374 | `  const generateReport = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 375 | `    if (!reportClient) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 376 | `    const { start, end } = getPeriodBounds(reportPeriod, reportStart, reportEnd);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 377 | `    if (start && end && start > end) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 378 | `      toast.error("A data inicial não pode ser posterior à data final.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 379 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 380 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 381 | `    if (reportShowAssignee && !reportAssigneeIds.length) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 382 | `      toast.error("Selecione ao menos um colaborador para o relatório.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 383 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 384 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 385 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 386 | `    setGeneratingReport(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 387 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 388 | `      const isCompleted = (task: (typeof tasks)[number]) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 389 | `        task.status === "done" || !!task.completed_at;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 390 | `      const taskDate = (task: (typeof tasks)[number]) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 391 | `        (isCompleted(task) ? task.completed_at : task.due_date || task.created_at)?.slice(0, 10) ??` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 392 | `        "";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 393 | `      const inPeriod = (task: (typeof tasks)[number]) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 394 | `        const date = taskDate(task);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 395 | `        return (!start || date >= start) && (!end || date <= end);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 396 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 397 | `      const reportTasks = tasks` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 398 | `        .filter((task) => task.client_id === reportClient.id)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 399 | `        .filter((task) => reportScope === "all" || isCompleted(task))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 400 | `        .filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 401 | `          (task) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 402 | `            !reportShowAssignee ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 403 | `            (!!task.assignee_id && reportAssigneeIds.includes(task.assignee_id)),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 404 | `        )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 405 | `        .filter(inPeriod)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 406 | `        .sort(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 407 | `          (a, b) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 408 | `            taskDate(a).localeCompare(taskDate(b)) || a.title.localeCompare(b.title, "pt-BR"),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 409 | `        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 410 | `      const assignees = new Map(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 411 | `        profiles.map((profile) => [` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 412 | `          profile.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 413 | `          profile.full_name || profile.email || "Colaborador sem nome",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 414 | `        ]),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 415 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 416 | `      const subtasksByTask = new Map<string, typeof subtasks>();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 417 | `      subtasks.forEach((subtask) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 418 | `        const current = subtasksByTask.get(subtask.task_id) ?? [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 419 | `        current.push(subtask);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 420 | `        subtasksByTask.set(subtask.task_id, current);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 421 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 422 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 423 | `      const { jsPDF } = await import("jspdf");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 424 | `      const pdf = new jsPDF("p", "mm", "a4");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 425 | `      const pageWidth = pdf.internal.pageSize.getWidth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 426 | `      const pageHeight = pdf.internal.pageSize.getHeight();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 427 | `      const margin = 15;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 428 | `      const contentWidth = pageWidth - margin * 2;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 429 | `      let y = 18;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 430 | `      const ensureSpace = (height: number) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 431 | `        if (y + height <= pageHeight - 16) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 432 | `        pdf.addPage();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 433 | `        y = 18;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 434 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 435 | `      const text = (` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 436 | `        value: string,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 437 | `        size = 10,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 438 | `        style: "normal" | "bold" = "normal",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 439 | `        color: [number, number, number] = [35, 45, 65],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 440 | `      ) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 441 | `        pdf.setFont("helvetica", style);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 442 | `        pdf.setFontSize(size);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 443 | `        pdf.setTextColor(...color);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 444 | `        const lines = pdf.splitTextToSize(value, contentWidth);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 445 | `        const height = Math.max(5, lines.length * (size * 0.42 + 0.8));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 446 | `        ensureSpace(height);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 447 | `        pdf.text(lines, margin, y);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 448 | `        y += height;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 449 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 450 | `      const gap = (height = 3) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 451 | `        ensureSpace(height);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 452 | `        y += height;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 453 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 454 | `      const section = (title: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 455 | `        gap(3);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 456 | `        ensureSpace(9);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 457 | `        pdf.setDrawColor(210, 218, 230);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 458 | `        pdf.line(margin, y, pageWidth - margin, y);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 459 | `        y += 5;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 460 | `        text(title, 12, "bold", [20, 54, 103]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 461 | `        gap(1);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 462 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 463 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 464 | `      const completedCount = reportTasks.filter(isCompleted).length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 465 | `      const pendingCount = reportTasks.length - completedCount;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 466 | `      text("Relatório de entregas", 19, "bold", [20, 54, 103]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 467 | `      text(reportClient.name, 13, "bold");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 468 | `      text(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 469 | `        \`Gerado em ${new Date().toLocaleDateString("pt-BR")} · ${reportPeriodLabels[reportPeriod]}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 470 | `        9,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 471 | `        "normal",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 472 | `        [90, 100, 120],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 473 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 474 | `      gap(3);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 475 | `      section("Resumo");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 476 | `      text(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 477 | `        \`Entregas concluídas: ${completedCount} | Pendências: ${pendingCount} | Total listado: ${reportTasks.length}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 478 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 479 | `      text(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 480 | `        \`Escopo: ${reportScope === "completed" ? "somente entregas concluídas" : "entregas concluídas e pendências"}.\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 481 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 482 | `      if (start || end)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 483 | `        text(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 484 | `          \`Período: ${start ? formatReportDate(start) : "início"} a ${end ? formatReportDate(end) : "hoje"}.\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 485 | `        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 486 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 487 | `      const completedTasks = reportTasks.filter(isCompleted);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 488 | `      section("Entregas realizadas");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 489 | `      if (!completedTasks.length) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 490 | `        text(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 491 | `          "Nenhuma entrega concluída foi encontrada para os filtros selecionados.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 492 | `          10,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 493 | `          "normal",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 494 | `          [90, 100, 120],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 495 | `        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 496 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 497 | `      completedTasks.forEach((task, index) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 498 | `        ensureSpace(18);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 499 | `        text(\`${index + 1}. ${task.title}\`, 11, "bold");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 500 | `        text(\`Concluída em: ${formatReportDate(task.completed_at)}\`, 9, "normal", [70, 80, 100]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 501 | `        if (reportShowAssignee)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 502 | `          text(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 503 | `            \`Responsável: ${task.assignee_id ? (assignees.get(task.assignee_id) ?? "Colaborador não localizado") : "Não atribuído"}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 504 | `            9,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 505 | `            "normal",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 506 | `            [70, 80, 100],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 507 | `          );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 508 | `        const description = reportIncludeDescription ? stripHtml(task.description) : "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 509 | `        if (description) text(description, 9);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 510 | `        const taskSubtasks = reportIncludeSubtasks` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 511 | `          ? (subtasksByTask.get(task.id) ?? []).filter((subtask) => subtask.done)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 512 | `          : [];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 513 | `        if (taskSubtasks.length) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 514 | `          text("Subtarefas concluídas:", 9, "bold");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 515 | `          taskSubtasks.forEach((subtask) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 516 | `            text(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 517 | `              \`• ${subtask.title}${subtask.completed_at ? \` — ${formatReportDate(subtask.completed_at)}\` : ""}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 518 | `              9,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 519 | `            ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 520 | `          );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 521 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 522 | `        gap(3);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 523 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 524 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 525 | `      if (reportScope === "all") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 526 | `        const pendingTasks = reportTasks.filter((task) => !isCompleted(task));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 527 | `        section("Pendências");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 528 | `        if (!pendingTasks.length)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 529 | `          text("Não há pendências para os filtros selecionados.", 10, "normal", [90, 100, 120]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 530 | `        pendingTasks.forEach((task, index) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 531 | `          ensureSpace(15);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 532 | `          text(\`${index + 1}. ${task.title}\`, 11, "bold");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 533 | `          text(\`Prazo: ${formatReportDate(task.due_date)}\`, 9, "normal", [70, 80, 100]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 534 | `          if (reportShowAssignee)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 535 | `            text(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 536 | `              \`Responsável: ${task.assignee_id ? (assignees.get(task.assignee_id) ?? "Colaborador não localizado") : "Não atribuído"}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 537 | `              9,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 538 | `              "normal",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 539 | `              [70, 80, 100],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 540 | `            );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 541 | `          const description = reportIncludeDescription ? stripHtml(task.description) : "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 542 | `          if (description) text(description, 9);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 543 | `          gap(3);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 544 | `        });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 545 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 546 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 547 | `      pdf.save(\`relatorio-entregas-${filenamePart(reportClient.name) || "cliente"}.pdf\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 548 | `      setReportClient(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 549 | `      toast.success("Relatório PDF gerado.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 550 | `    } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 551 | `      console.error(error);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 552 | `      toast.error("Não foi possível gerar o relatório PDF.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 553 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 554 | `      setGeneratingReport(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 555 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 556 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 557 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 558 | `  const selectedReportAssignees = profiles.filter((profile) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 559 | `    reportAssigneeIds.includes(profile.id),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 560 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 561 | `  const toggleReportAssignee = (profileId: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 562 | `    setReportAssigneeIds((current) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 563 | `      current.includes(profileId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 564 | `        ? current.filter((id) => id !== profileId)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 565 | `        : [...current, profileId],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 566 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 567 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 568 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 569 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 570 | `    <div className="min-h-full bg-background px-5 py-6 md:px-8 md:py-7">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 571 | `      <div className="mx-auto max-w-[1280px]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 572 | `        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border/70 pb-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 573 | `          <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 574 | `            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 575 | `              Base de relacionamento` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 576 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 577 | `            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Clientes</h1>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 578 | `            <p className="mt-1 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 579 | `              {clients.length} cliente{clients.length === 1 ? "" : "s"} cadastrado` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 580 | `              {clients.length === 1 ? "" : "s"} no TaskFlow.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 581 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 582 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 583 | `          <Button asChild className="rounded-full px-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 584 | `            <Link to="/clients/new">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 585 | `              <Plus className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 586 | `              Novo cliente` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 587 | `            </Link>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 588 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 589 | `        </header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 590 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 591 | `        <section className="flex flex-wrap items-center gap-x-5 gap-y-3 py-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 592 | `          <div className="relative min-w-[240px] flex-1 sm:max-w-md">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 593 | `            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 594 | `            <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 595 | `              value={search}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 596 | `              onChange={(e) => setSearch(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 597 | `              placeholder="Buscar por nome ou informação do cliente..."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 598 | `              className="h-10 rounded-full border-0 bg-muted/55 pl-10 shadow-none focus-visible:ring-1"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 599 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 600 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 601 | `          <div className="flex items-center gap-1 text-sm" aria-label="Filtrar clientes por status">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 602 | `            {(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 603 | `              [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 604 | `                ["all", "Todos"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 605 | `                ["active", "Ativos"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 606 | `                ["inactive", "Inativos"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 607 | `              ] as const` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 608 | `            ).map(([value, label]) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 609 | `              <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 610 | `                key={value}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 611 | `                type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 612 | `                onClick={() => setStatusFilter(value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 613 | `                className={\`rounded-full px-3 py-1.5 transition-colors ${statusFilter === value ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 614 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 615 | `                {label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 616 | `              </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 617 | `            ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 618 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 619 | `          <p className="ml-auto text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 620 | `            {filteredClients.length} resultado{filteredClients.length === 1 ? "" : "s"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 621 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 622 | `        </section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 623 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 624 | `        <section className="border-t border-border/70">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 625 | `          <div className="hidden grid-cols-[minmax(280px,1.4fr)_minmax(140px,.7fr)_minmax(250px,1fr)_auto] gap-6 border-b border-border/70 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground md:grid">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 626 | `            <span>Cliente</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 627 | `            <span>Atividades</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 628 | `            <span>Informações</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 629 | `            <span className="text-right">Ações</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 630 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 631 | `          {shouldWaitForLogos ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 632 | `            <div className="grid min-h-72 place-items-center border-b border-border/60 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 633 | `              <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 634 | `                <LoaderCircle className="h-4 w-4 animate-spin" /> Carregando clientes…` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 635 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 636 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 637 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 638 | `            filteredClients.map((c) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 639 | `              const count = tasks.filter((t) => t.client_id === c.id).length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 640 | `              const isActive = c.is_active !== false;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 641 | `              return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 642 | `                <article` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 643 | `                  key={c.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 644 | `                  className={\`grid gap-4 border-b border-border/60 px-2 py-4 transition-colors hover:bg-muted/35 md:grid-cols-[minmax(280px,1.4fr)_minmax(140px,.7fr)_minmax(250px,1fr)_auto] md:items-center md:gap-6 md:px-4 ${isActive ? "" : "opacity-65"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 645 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 646 | `                  <div className="flex min-w-0 items-center gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 647 | `                    {avatarUrls[c.id] ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 648 | `                      <img` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 649 | `                        src={avatarUrls[c.id]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 650 | `                        alt={\`Logo de ${c.name}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 651 | `                        className="block h-11 w-11 shrink-0 rounded-xl border border-border bg-muted object-contain p-0.5"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 652 | `                      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 653 | `                    ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 654 | `                      <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 655 | `                        className="h-11 w-11 shrink-0 rounded-xl shadow-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 656 | `                        style={{ background: c.color || "#1e3a8a" }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 657 | `                      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 658 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 659 | `                    <div className="min-w-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 660 | `                      <h2 className="truncate font-semibold">{c.name}</h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 661 | `                      <p className="mt-0.5 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 662 | `                        {isActive ? "Cliente ativo" : "Cliente inativo"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 663 | `                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 664 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 665 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 666 | `                  <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 667 | `                    <span className="text-lg font-semibold tabular-nums">{count}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 668 | `                    <span className="ml-1 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 669 | `                      tarefa{count === 1 ? "" : "s"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 670 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 671 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 672 | `                  <p className="line-clamp-2 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 673 | `                    {c.description || c.responsible || c.email || "Sem informações adicionais."}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 674 | `                  </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 675 | `                  <div className="flex items-center gap-0.5 md:justify-end">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 676 | `                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 677 | `                      size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 678 | `                      variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 679 | `                      title="Gerar relatório PDF"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 680 | `                      onClick={() => openReport(c)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 681 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 682 | `                      <FileDown className="h-4 w-4 text-primary" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 683 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 684 | `                    <Button asChild size="icon" variant="ghost" title="Relatório IA">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 685 | `                      <Link to="/client-report/$clientId" params={{ clientId: c.id }}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 686 | `                        <Sparkles className="h-4 w-4 text-primary" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 687 | `                      </Link>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 688 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 689 | `                    <Button asChild size="icon" variant="ghost" title="Editar cliente">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 690 | `                      <Link to="/clients/$clientId/edit" params={{ clientId: c.id }}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 691 | `                        <Pencil className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 692 | `                      </Link>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 693 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 694 | `                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 695 | `                      size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 696 | `                      variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 697 | `                      onClick={() => void setClientActive(c, !isActive)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 698 | `                      title={isActive ? "Inativar cliente" : "Reativar cliente"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 699 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 700 | `                      {isActive ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 701 | `                        <Archive className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 702 | `                      ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 703 | `                        <ArchiveRestore className="h-4 w-4 text-primary" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 704 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 705 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 706 | `                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 707 | `                      size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 708 | `                      variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 709 | `                      title="Excluir cliente"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 710 | `                      onClick={() => remove(c)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 711 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 712 | `                      <Trash2 className="h-4 w-4 text-destructive" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 713 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 714 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 715 | `                </article>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 716 | `              );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 717 | `            })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 718 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 719 | `          {clients.length === 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 720 | `            <div className="py-16 text-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 721 | `              Nenhum cliente cadastrado. Crie um para começar a organizar tarefas.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 722 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 723 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 724 | `          {clients.length > 0 && filteredClients.length === 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 725 | `            <div className="py-16 text-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 726 | `              Nenhum cliente encontrado neste filtro.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 727 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 728 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 729 | `        </section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 730 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 731 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 732 | `      <Dialog open={!!reportClient} onOpenChange={(nextOpen) => !nextOpen && setReportClient(null)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 733 | `        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 734 | `          <DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 735 | `            <DialogTitle>Gerar relatório de entregas</DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 736 | `          </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 737 | `          <div className="space-y-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 738 | `            <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 739 | `              O relatório de{" "}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 740 | `              <span className="font-medium text-foreground">{reportClient?.name}</span> usa a data` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 741 | `              de conclusão das tarefas como data da entrega.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 742 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 743 | `            <div className="grid gap-4 sm:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 744 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 745 | `                <Label htmlFor="report-period">Período</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 746 | `                <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 747 | `                  value={reportPeriod}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 748 | `                  onValueChange={(value) => setReportPeriod(value as ReportPeriod)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 749 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 750 | `                  <SelectTrigger id="report-period">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 751 | `                    <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 752 | `                  </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 753 | `                  <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 754 | `                    {(Object.entries(reportPeriodLabels) as [ReportPeriod, string][]).map(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 755 | `                      ([value, label]) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 756 | `                        <SelectItem key={value} value={value}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 757 | `                          {label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 758 | `                        </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 759 | `                      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 760 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 761 | `                  </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 762 | `                </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 763 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 764 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 765 | `                <Label htmlFor="report-scope">Conteúdo</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 766 | `                <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 767 | `                  value={reportScope}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 768 | `                  onValueChange={(value) => setReportScope(value as "completed" | "all")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 769 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 770 | `                  <SelectTrigger id="report-scope">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 771 | `                    <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 772 | `                  </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 773 | `                  <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 774 | `                    <SelectItem value="completed">Somente entregas concluídas</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 775 | `                    <SelectItem value="all">Entregas e pendências</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 776 | `                  </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 777 | `                </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 778 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 779 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 780 | `            {reportPeriod === "custom" && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 781 | `              <div className="grid gap-4 sm:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 782 | `                <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 783 | `                  <Label htmlFor="report-start">Data inicial</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 784 | `                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 785 | `                    id="report-start"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 786 | `                    type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 787 | `                    value={reportStart}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 788 | `                    onChange={(event) => setReportStart(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 789 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 790 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 791 | `                <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 792 | `                  <Label htmlFor="report-end">Data final</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 793 | `                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 794 | `                    id="report-end"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 795 | `                    type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 796 | `                    value={reportEnd}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 797 | `                    onChange={(event) => setReportEnd(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 798 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 799 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 800 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 801 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 802 | `            <div className="space-y-3 rounded-md border p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 803 | `              <p className="text-sm font-medium">Detalhes no relatório</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 804 | `              <label className="flex cursor-pointer items-center gap-2 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 805 | `                <Checkbox` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 806 | `                  checked={reportShowAssignee}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 807 | `                  onCheckedChange={(checked) => setReportShowAssignee(checked === true)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 808 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 809 | `                Mostrar responsável (colaborador)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 810 | `              </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 811 | `              {reportShowAssignee && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 812 | `                <div className="space-y-2 pl-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 813 | `                  <Label className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 814 | `                    Colaboradores com tarefas no relatório` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 815 | `                  </Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 816 | `                  <Popover>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 817 | `                    <PopoverTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 818 | `                      <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 819 | `                        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 820 | `                        variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 821 | `                        className="w-full justify-between font-normal"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 822 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 823 | `                        <span className="truncate text-left">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 824 | `                          {!profiles.length` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 825 | `                            ? "Carregando colaboradores..."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 826 | `                            : selectedReportAssignees.length === 1` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 827 | `                              ? selectedReportAssignees[0].full_name ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 828 | `                                selectedReportAssignees[0].email ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 829 | `                                "Colaborador sem nome"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 830 | `                              : \`${selectedReportAssignees.length} colaboradores selecionados\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 831 | `                        </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 832 | `                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 833 | `                      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 834 | `                    </PopoverTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 835 | `                    <PopoverContent` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 836 | `                      align="start"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 837 | `                      className="w-[var(--radix-popover-trigger-width)] p-2"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 838 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 839 | `                      <p className="px-2 pb-2 pt-1 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 840 | `                        Selecione os colaboradores cujas tarefas devem aparecer.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 841 | `                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 842 | `                      <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 843 | `                        className="max-h-64 space-y-1 overflow-y-auto overscroll-contain pr-1"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 844 | `                        onWheel={(event) => event.stopPropagation()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 845 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 846 | `                        {!!profiles.length && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 847 | `                          <label className="flex cursor-pointer items-center gap-2 rounded-sm border-b px-2 py-2 text-sm font-medium hover:bg-muted">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 848 | `                            <Checkbox` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 849 | `                              checked={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 850 | `                                selectedReportAssignees.length === profiles.length` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 851 | `                                  ? true` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 852 | `                                  : selectedReportAssignees.length` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 853 | `                                    ? "indeterminate"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 854 | `                                    : false` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 855 | `                              }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 856 | `                              onCheckedChange={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 857 | `                                setReportAssigneeIds(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 858 | `                                  selectedReportAssignees.length === profiles.length` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 859 | `                                    ? []` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 860 | `                                    : profiles.map((profile) => profile.id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 861 | `                                )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 862 | `                              }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 863 | `                            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 864 | `                            <span>Selecionar todos</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 865 | `                          </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 866 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 867 | `                        {profiles.map((profile) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 868 | `                          <label` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 869 | `                            key={profile.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 870 | `                            className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 871 | `                          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 872 | `                            <Checkbox` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 873 | `                              checked={reportAssigneeIds.includes(profile.id)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 874 | `                              onCheckedChange={() => toggleReportAssignee(profile.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 875 | `                            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 876 | `                            <span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 877 | `                              {profile.full_name || profile.email || "Colaborador sem nome"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 878 | `                            </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 879 | `                          </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 880 | `                        ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 881 | `                        {!profiles.length && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 882 | `                          <p className="px-2 py-2 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 883 | `                            Nenhum colaborador disponível.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 884 | `                          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 885 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 886 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 887 | `                    </PopoverContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 888 | `                  </Popover>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 889 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 890 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 891 | `              <label className="flex cursor-pointer items-center gap-2 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 892 | `                <Checkbox` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 893 | `                  checked={reportIncludeDescription}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 894 | `                  onCheckedChange={(checked) => setReportIncludeDescription(checked === true)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 895 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 896 | `                Mostrar descrição das tarefas` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 897 | `              </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 898 | `              <label className="flex cursor-pointer items-center gap-2 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 899 | `                <Checkbox` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 900 | `                  checked={reportIncludeSubtasks}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 901 | `                  onCheckedChange={(checked) => setReportIncludeSubtasks(checked === true)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 902 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 903 | `                Mostrar subtarefas concluídas` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 904 | `              </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 905 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 906 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 907 | `          <DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 908 | `            <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 909 | `              type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 910 | `              variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 911 | `              onClick={() => setReportClient(null)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 912 | `              disabled={generatingReport}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 913 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 914 | `              Cancelar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 915 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 916 | `            <Button type="button" onClick={() => void generateReport()} disabled={generatingReport}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 917 | `              <FileDown className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 918 | `              {generatingReport ? "Gerando..." : "Baixar PDF"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 919 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 920 | `          </DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 921 | `        </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 922 | `      </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 923 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 924 | `      <Dialog open={open} onOpenChange={setOpen}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 925 | `        <DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 926 | `          <DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 927 | `            <DialogTitle>{edit ? "Editar" : "Novo"} cliente</DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 928 | `          </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 929 | `          <div className="space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 930 | `            <div className="grid gap-3 sm:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 931 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 932 | `                <Label>CNPJ</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 933 | `                <Input value={cnpj} onChange={(e) => setCnpj(e.target.value)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 934 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 935 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 936 | `                <Label>Nome fantasia</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 937 | `                <Input value={tradeName} onChange={(e) => setTradeName(e.target.value)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 938 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 939 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 940 | `                <Label>Razão social</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 941 | `                <Input value={legalName} onChange={(e) => setLegalName(e.target.value)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 942 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 943 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 944 | `                <Label>Inscrição Estadual</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 945 | `                <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 946 | `                  value={stateRegistration}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 947 | `                  onChange={(e) => setStateRegistration(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 948 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 949 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 950 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 951 | `                <Label>Inscrição Municipal</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 952 | `                <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 953 | `                  value={municipalRegistration}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 954 | `                  onChange={(e) => setMunicipalRegistration(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 955 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 956 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 957 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 958 | `                <Label>Telefone</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 959 | `                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 960 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 961 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 962 | `                <Label>E-mail</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 963 | `                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 964 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 965 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 966 | `                <Label>Endereço completo</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 967 | `                <Input value={address} onChange={(e) => setAddress(e.target.value)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 968 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 969 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 970 | `            <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 971 | `              <Label>Responsável</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 972 | `              <Input value={responsible} onChange={(e) => setResponsible(e.target.value)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 973 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 974 | `            <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 975 | `              <Label>Descrição</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 976 | `              <Input value={desc} onChange={(e) => setDesc(e.target.value)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 977 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 978 | `            <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 979 | `              <Label>Cor</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 980 | `              <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 981 | `                type="color"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 982 | `                value={color}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 983 | `                onChange={(e) => setColor(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 984 | `                className="h-10"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 985 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 986 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 987 | `            <Button onClick={save} className="w-full">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 988 | `              Salvar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 989 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 990 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 991 | `        </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 992 | `      </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 993 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 994 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 995 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 996 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
