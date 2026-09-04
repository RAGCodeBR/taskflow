# src/components/TaskFilters.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `  Select,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 3 | `  SelectContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 4 | `  SelectItem,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 5 | `  SelectTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 6 | `  SelectValue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `} from "@/components/ui/select";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 9 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `import { Checkbox } from "@/components/ui/checkbox";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `import { Badge } from "@/components/ui/badge";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 13 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 14 | `  ChevronDown,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  X,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  Users,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  UserCheck,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  PenSquare,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  Filter as FilterIcon,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  RotateCcw,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `} from "lucide-react";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `import { useMemo, useState, type ReactNode } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 23 | `import { useAssignableProfiles, useClients, useColumns } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 24 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 25 | `import { dateFilterLabels, matchDateFilter, type DateFilter } from "@/lib/task-utils";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 26 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 27 | `export type TaskScope = "all" | "mine" | "created";` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 28 | `const COMPLETED_STATUS_FILTER = "completed";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 29 | `const COLUMN_STATUS_PREFIX = "column:";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 30 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 31 | `interface Filters {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 32 | `  scope?: TaskScope;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  date?: DateFilter;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `  client?: string; // legacy single-select (still respected)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `  clients?: string[]; // multi-select` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `  assignee?: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `  priority?: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `  status?: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `  /** Id do ambiente. Só aparece para quem pertence a mais de um. */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 40 | `  workspace?: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 42 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 43 | `const DATE_OPTIONS: DateFilter[] = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 44 | `  "all",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  "due_today",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `  "tomorrow",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `  "this_week",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `  "this_month",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `  "overdue",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `  "no_due",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `  "pending",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `  "completed",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 55 | `export function TaskFilters({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 56 | `  filters,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 57 | `  onChange,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 58 | `  children,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 59 | `  hideAssignee = false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `  filters: Filters;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `  onChange: (f: Filters) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 63 | `  children?: ReactNode;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `  hideAssignee?: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `  const { data: clients } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 67 | `  // The assignee filter must only expose users who can receive tasks.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 68 | `  // This query is role-based in the database (admin and collaborator only),` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 69 | `  // so future client accounts are excluded automatically as well.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 70 | `  const { data: assignableProfiles } = useAssignableProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 71 | `  const { data: columns = [] } = useColumns();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 72 | `  const [clientsOpen, setClientsOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 73 | `  const [advancedOpen, setAdvancedOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 74 | `  const [search, setSearch] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 75 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 76 | `  const scope: TaskScope = filters.scope ?? "all";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 77 | `  const dateVal: DateFilter = filters.date ?? "all";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 78 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 79 | `  const selectedClients = useMemo<string[]>(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 80 | `    if (filters.clients && filters.clients.length > 0) return filters.clients;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 81 | `    if (filters.client) return [filters.client];` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 82 | `    return [];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 83 | `  }, [filters.clients, filters.client]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 85 | `  const setSelectedClients = (ids: string[]) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 86 | `    onChange({ ...filters, clients: ids.length > 0 ? ids : undefined, client: undefined });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 88 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 89 | `  const toggleClient = (id: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 90 | `    setSelectedClients(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `      selectedClients.includes(id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `        ? selectedClients.filter((c) => c !== id)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 93 | `        : [...selectedClients, id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 95 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 96 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 97 | `  const filteredClients = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 98 | `    const q = search.trim().toLowerCase();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 99 | `    const list = clients ?? [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 100 | `    return q ? list.filter((c) => c.name.toLowerCase().includes(q)) : list;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 101 | `  }, [clients, search]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 103 | `  const allSelected = (clients?.length ?? 0) > 0 && selectedClients.length === clients?.length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 104 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 105 | `  const clientsLabel =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 106 | `    selectedClients.length === 0` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `      ? "Clientes"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 108 | `      : selectedClients.length === 1` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `        ? (clients?.find((c) => c.id === selectedClients[0])?.name ?? "1 cliente")` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 110 | `        : \`${selectedClients.length} clientes\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 112 | `  const activeCount = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 113 | `    scope !== "all",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `    dateVal !== "all",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `    selectedClients.length > 0,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 116 | `    !hideAssignee && !!filters.assignee,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `    !!filters.priority,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `    !!filters.status,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `  ].filter(Boolean).length;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 120 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 121 | `  const clearAll = () => onChange({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 122 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 123 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 124 | `    <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 125 | `      <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border bg-card/80 p-1.5 shadow-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 126 | `        {/* Scope segmented */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `        <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 128 | `          <div className="inline-flex rounded-full border bg-muted/40 p-0.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 129 | `            <ScopeBtn` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 130 | `              active={scope === "all"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `              onClick={() => onChange({ ...filters, scope: undefined, assignee: undefined })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 132 | `              icon={<Users className="h-3.5 w-3.5" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 133 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `              Todas` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 135 | `            </ScopeBtn>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 136 | `            <ScopeBtn` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 137 | `              active={scope === "mine"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `              onClick={() => onChange({ ...filters, scope: "mine", assignee: undefined })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 139 | `              icon={<UserCheck className="h-3.5 w-3.5" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 140 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 141 | `              Atribuídas a mim` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 142 | `            </ScopeBtn>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 143 | `            <ScopeBtn` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 144 | `              active={scope === "created"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 145 | `              onClick={() => onChange({ ...filters, scope: "created", assignee: undefined })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 146 | `              icon={<PenSquare className="h-3.5 w-3.5" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 147 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 148 | `              Criadas por mim` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `            </ScopeBtn>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 150 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 151 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 152 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 153 | `        {/* Clients multi */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `        <Popover open={clientsOpen} onOpenChange={setClientsOpen}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 155 | `          <PopoverTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 156 | `            <Button variant="outline" size="sm" className="h-7 justify-between gap-1.5 rounded-full font-normal">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 157 | `              <span className="truncate max-w-40">{clientsLabel}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 158 | `              {selectedClients.length > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `                <Badge variant="secondary" className="h-5 px-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 160 | `                  {selectedClients.length}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `                </Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 162 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 163 | `              <ChevronDown className="h-4 w-4 opacity-50" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 164 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 165 | `          </PopoverTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 166 | `          <PopoverContent align="start" className="w-64 p-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 167 | `            <div className="flex items-center gap-2 mb-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 168 | `              <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 169 | `                placeholder="Buscar cliente..."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 170 | `                value={search}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 171 | `                onChange={(e) => setSearch(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 172 | `                className="h-8"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 173 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `              {selectedClients.length > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 175 | `                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 176 | `                  variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 177 | `                  size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `                  className="h-8 w-8 shrink-0"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 179 | `                  onClick={() => setSelectedClients([])}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 180 | `                  title="Limpar seleção"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 181 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 182 | `                  <X className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 183 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 184 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 185 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 186 | `            <div className="flex items-center justify-between px-2 py-1.5 border-b mb-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 187 | `              <label className="flex items-center gap-2 text-sm cursor-pointer">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 188 | `                <Checkbox` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 189 | `                  checked={allSelected}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 190 | `                  onCheckedChange={(v) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 191 | `                    if (v) setSelectedClients((clients ?? []).map((c) => c.id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 192 | `                    else setSelectedClients([]);` | Define o caminho alternativo da condicao anterior. |
| 193 | `                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 194 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 195 | `                <span>Selecionar todos</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 196 | `              </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 197 | `              <span className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 198 | `                {selectedClients.length}/{clients?.length ?? 0}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 199 | `              </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 200 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 201 | `            <div className="max-h-64 overflow-y-auto">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 202 | `              {filteredClients.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 203 | `                <div className="px-2 py-4 text-sm text-muted-foreground text-center">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 204 | `                  Nenhum cliente` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 205 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 206 | `              ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 207 | `                filteredClients.map((c) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 208 | `                  <label` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 209 | `                    key={c.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 210 | `                    className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent cursor-pointer text-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 211 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 212 | `                    <Checkbox` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 213 | `                      checked={selectedClients.includes(c.id)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 214 | `                      onCheckedChange={() => toggleClient(c.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 215 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 216 | `                    <span className="truncate">{c.name}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 217 | `                  </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 218 | `                ))` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 219 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 220 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 221 | `          </PopoverContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 222 | `        </Popover>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 223 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 224 | `        {!hideAssignee && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 225 | `          <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 226 | `            value={filters.assignee ?? "all"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 227 | `            onValueChange={(v) => onChange({ ...filters, assignee: v === "all" ? undefined : v })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 228 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 229 | `            <SelectTrigger className="h-7 w-48 rounded-full">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 230 | `              <SelectValue placeholder="Responsável" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 231 | `            </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 232 | `            <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 233 | `              <SelectItem value="all">Todos responsáveis</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 234 | `              {assignableProfiles?.map((p) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 235 | `                <SelectItem key={p.id} value={p.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 236 | `                  {p.full_name || p.email}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 237 | `                </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 238 | `              ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 239 | `            </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 240 | `          </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 241 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 242 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 243 | `        <Popover open={advancedOpen} onOpenChange={setAdvancedOpen}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 244 | `          <PopoverTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 245 | `            <Button variant="outline" size="sm" className="h-7 gap-1.5 rounded-full font-normal">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 246 | `              <FilterIcon className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 247 | `              Filtros` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 248 | `              {activeCount > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 249 | `                <Badge variant="secondary" className="h-5 min-w-5 px-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 250 | `                  {activeCount}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 251 | `                </Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 252 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 253 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 254 | `          </PopoverTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 255 | `          <PopoverContent align="start" className="w-64 space-y-3 p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 256 | `            <div className="space-y-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 257 | `              <span className="text-xs font-medium">Período</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 258 | `              <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 259 | `                value={dateVal}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 260 | `                onValueChange={(v) => onChange({ ...filters, date: v as DateFilter })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 261 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 262 | `                <SelectTrigger className="h-8 w-full">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 263 | `                  <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 264 | `                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 265 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 266 | `                  {DATE_OPTIONS.map((d) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 267 | `                    <SelectItem key={d} value={d}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 268 | `                      {dateFilterLabels[d]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 269 | `                    </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 270 | `                  ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 271 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 272 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 273 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 274 | `            <div className="space-y-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 275 | `              <span className="text-xs font-medium">Prioridade</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 276 | `              <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 277 | `                value={filters.priority ?? "all"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 278 | `                onValueChange={(v) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 279 | `                  onChange({ ...filters, priority: v === "all" ? undefined : v })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 280 | `                }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 281 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 282 | `                <SelectTrigger className="h-8 w-full">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 283 | `                  <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 284 | `                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 285 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 286 | `                  <SelectItem value="all">Todas prioridades</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 287 | `                  <SelectItem value="low">Baixa</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 288 | `                  <SelectItem value="medium">Média</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 289 | `                  <SelectItem value="high">Alta</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 290 | `                  <SelectItem value="urgent">Urgente</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 291 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 292 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 293 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 294 | `            <div className="space-y-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 295 | `              <span className="text-xs font-medium">Status</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 296 | `              <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 297 | `                value={filters.status ?? "all"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 298 | `                onValueChange={(v) => onChange({ ...filters, status: v === "all" ? undefined : v })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 299 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 300 | `                <SelectTrigger className="h-8 w-full">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 301 | `                  <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 302 | `                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 303 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 304 | `                  <SelectItem value="all">Todos status</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 305 | `                  {columns.map((column) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 306 | `                    <SelectItem key={column.id} value={\`${COLUMN_STATUS_PREFIX}${column.id}\`}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 307 | `                      {column.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 308 | `                    </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 309 | `                  ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 310 | `                  <SelectItem value={COMPLETED_STATUS_FILTER}>Concluídos</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 311 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 312 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 313 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 314 | `          </PopoverContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 315 | `        </Popover>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 316 | `        {activeCount > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 317 | `          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 318 | `            size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 319 | `            variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 320 | `            className="ml-auto h-7 rounded-full text-muted-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 321 | `            onClick={clearAll}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 322 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 323 | `            <RotateCcw className="mr-1 h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 324 | `            Limpar ({activeCount})` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 325 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 326 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 327 | `        {activeCount === 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 328 | `          <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 329 | `            <FilterIcon className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 330 | `            Nenhum filtro` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 331 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 332 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 333 | `        {children}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 334 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 335 | `    </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 336 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 337 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 338 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 339 | `function ScopeBtn({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 340 | `  active,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 341 | `  onClick,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 342 | `  icon,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 343 | `  children,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 344 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 345 | `  active: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 346 | `  onClick: () => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 347 | `  icon: React.ReactNode;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 348 | `  children: React.ReactNode;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 349 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 350 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 351 | `    <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 352 | `      type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 353 | `      onClick={onClick}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 354 | `      className={\`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium transition ${` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 355 | `        active` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 356 | `          ? "bg-background text-foreground shadow-sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 357 | `          : "text-muted-foreground hover:text-foreground"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 358 | `      }\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 359 | `    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 360 | `      {icon}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 361 | `      {children}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 362 | `    </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 363 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 364 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 365 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 366 | `export function applyTaskFilters<` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 367 | `  T extends {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 368 | `    id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 369 | `    client_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 370 | `    assignee_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 371 | `    priority: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 372 | `    column_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 373 | `    status_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 374 | `    created_by?: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 375 | `    due_date: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 376 | `    status: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 377 | `    completed_at: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 378 | `    workspace_id?: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 379 | `  },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 380 | `>(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 381 | `  tasks: T[],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 382 | `  f: Filters,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 383 | `  opts?: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 384 | `    userId?: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 385 | `    subtaskAssigneeTaskIds?: Set<string> | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 386 | `    collaboratorTaskIds?: Set<string> | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 387 | `    subtaskAssigneeTaskIdsByUser?: Map<string, Set<string>> | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 388 | `    /** Parent tasks that have a subtask matching the active due-date filter. */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 389 | `    subtaskDateFilterTaskIds?: Set<string> | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 390 | `    restrictToCurrentUserParticipation?: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 391 | `  },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 392 | `) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 393 | `  const clientIds = f.clients && f.clients.length > 0 ? f.clients : f.client ? [f.client] : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 394 | `  const uid = opts?.userId ?? null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 395 | `  const subIds = opts?.subtaskAssigneeTaskIds ?? null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 396 | `  const collaboratorIds = opts?.collaboratorTaskIds ?? null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 397 | `  return tasks.filter((t) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 398 | `    if (opts?.restrictToCurrentUserParticipation) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 399 | `      if (!uid) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 400 | `      const participatesInTask =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 401 | `        t.assignee_id === uid ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 402 | `        !!subIds?.has(t.id) ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 403 | `        !!collaboratorIds?.has(t.id) ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 404 | `        // Creating a task for another person is not participation. Keep it` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 405 | `        // available only through the explicit "Criadas por mim" filter.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 406 | `        (f.scope === "created" && t.created_by === uid);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 407 | `      if (!participatesInTask) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 408 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 409 | `    if (f.scope === "mine") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 410 | `      if (!uid) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 411 | `      const participatesInTask =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 412 | `        t.assignee_id === uid || !!subIds?.has(t.id) || !!collaboratorIds?.has(t.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 413 | `      if (!participatesInTask) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 414 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 415 | `    if (f.scope === "created" && (!uid || t.created_by !== uid)) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 416 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 417 | `    if (f.date && f.date !== "all" && !matchDateFilter(t, f.date)) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 418 | `      const supportsSubtaskDueDates = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 419 | `        "today",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 420 | `        "due_today",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 421 | `        "tomorrow",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 422 | `        "this_week",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 423 | `        "this_month",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 424 | `        "overdue",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 425 | `      ].includes(f.date);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 426 | `      if (!supportsSubtaskDueDates || !opts?.subtaskDateFilterTaskIds?.has(t.id)) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 427 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 428 | `    if (clientIds && (!t.client_id || !clientIds.includes(t.client_id))) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 429 | `    if (f.assignee) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 430 | `      const assigneeSubtasks = opts?.subtaskAssigneeTaskIdsByUser?.get(f.assignee);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 431 | `      // When filtering by the logged-in user, include direct assignments,` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 432 | `      // collaborations and subtasks. Merely creating a task for another` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 433 | `      // person does not make it part of that user's personal workload.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 434 | `      const isCurrentUserCollaborator = f.assignee === uid && collaboratorIds?.has(t.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 435 | `      if (` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 436 | `        t.assignee_id !== f.assignee &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 437 | `        !assigneeSubtasks?.has(t.id) &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 438 | `        !isCurrentUserCollaborator` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 439 | `      ) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 440 | `        return false;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 441 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 442 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 443 | `    if (f.workspace && t.workspace_id !== f.workspace) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 444 | `    if (f.priority && t.priority !== f.priority) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 445 | `    if (f.status === COMPLETED_STATUS_FILTER && t.status !== "done" && !t.completed_at)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 446 | `      return false;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 447 | `    if (f.status?.startsWith(COLUMN_STATUS_PREFIX)) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 448 | `      const columnId = f.status.slice(COLUMN_STATUS_PREFIX.length);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 449 | `      if (t.column_id !== columnId || t.status === "done" || !!t.completed_at) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 450 | `    } else if (f.status && f.status !== COMPLETED_STATUS_FILTER && t.status_id !== f.status) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 451 | `      // Keeps legacy saved filter values functional while the selector now uses Kanban columns.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 452 | `      return false;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 453 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 454 | `    return true;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 455 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 456 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 457 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 458 | `export type { Filters as TaskFilterValue };` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 459 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
