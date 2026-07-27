import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  X,
  Users,
  UserCheck,
  PenSquare,
  Filter as FilterIcon,
  RotateCcw,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { useClients, useProfiles, useTaskStatuses } from "@/hooks/use-data";

import { dateFilterLabels, matchDateFilter, type DateFilter } from "@/lib/task-utils";

export type TaskScope = "all" | "mine" | "created";
const COMPLETED_STATUS_FILTER = "completed";

interface Filters {
  scope?: TaskScope;
  date?: DateFilter;
  client?: string; // legacy single-select (still respected)
  clients?: string[]; // multi-select
  assignee?: string;
  priority?: string;
  status?: string;
}

const DATE_OPTIONS: DateFilter[] = [
  "all",
  "today",
  "due_today",
  "tomorrow",
  "this_week",
  "this_month",
  "overdue",
  "no_due",
  "pending",
  "completed",
];

export function TaskFilters({ filters, onChange, children }: { filters: Filters; onChange: (f: Filters) => void; children?: ReactNode }) {
  const { data: clients } = useClients();
  const { data: profiles } = useProfiles();
  const { data: statuses = [] } = useTaskStatuses();
  const [clientsOpen, setClientsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const scope: TaskScope = filters.scope ?? "all";
  const dateVal: DateFilter = filters.date ?? "all";

  const selectedClients = useMemo<string[]>(() => {
    if (filters.clients && filters.clients.length > 0) return filters.clients;
    if (filters.client) return [filters.client];
    return [];
  }, [filters.clients, filters.client]);

  const setSelectedClients = (ids: string[]) => {
    onChange({ ...filters, clients: ids.length > 0 ? ids : undefined, client: undefined });
  };

  const toggleClient = (id: string) => {
    setSelectedClients(
      selectedClients.includes(id)
        ? selectedClients.filter((c) => c !== id)
        : [...selectedClients, id],
    );
  };

  const filteredClients = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = clients ?? [];
    return q ? list.filter((c) => c.name.toLowerCase().includes(q)) : list;
  }, [clients, search]);

  const allSelected = (clients?.length ?? 0) > 0 && selectedClients.length === clients?.length;

  const clientsLabel =
    selectedClients.length === 0
      ? "Clientes"
      : selectedClients.length === 1
        ? (clients?.find((c) => c.id === selectedClients[0])?.name ?? "1 cliente")
        : `${selectedClients.length} clientes`;

  const activeCount = [
    scope !== "all",
    dateVal !== "all",
    selectedClients.length > 0,
    !!filters.assignee,
    !!filters.priority,
    !!filters.status,
  ].filter(Boolean).length;

  const clearAll = () => onChange({});

  return (
    <>
      <div className="flex flex-wrap items-center gap-1.5 rounded-lg border bg-card p-1.5">
          {/* Scope segmented */}
          <div>
            <div className="inline-flex rounded-md border bg-muted/40 p-0.5">
              <ScopeBtn active={scope === "all"} onClick={() => onChange({ ...filters, scope: undefined })} icon={<Users className="h-3.5 w-3.5" />}>Todas</ScopeBtn>
              <ScopeBtn active={scope === "mine"} onClick={() => onChange({ ...filters, scope: "mine" })} icon={<UserCheck className="h-3.5 w-3.5" />}>Atribuídas a mim</ScopeBtn>
              <ScopeBtn active={scope === "created"} onClick={() => onChange({ ...filters, scope: "created" })} icon={<PenSquare className="h-3.5 w-3.5" />}>Criadas por mim</ScopeBtn>
            </div>
          </div>

          <div>

          {/* Date compact select */}
          <Select
            value={dateVal}
            onValueChange={(v) => onChange({ ...filters, date: v as DateFilter })}
          >
            <SelectTrigger className="h-7 w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DATE_OPTIONS.map((d) => (
                <SelectItem key={d} value={d}>
                  {dateFilterLabels[d]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          </div>

          {/* Clients multi */}
          <Popover open={clientsOpen} onOpenChange={setClientsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 justify-between gap-1.5 font-normal">
                <span className="truncate max-w-40">{clientsLabel}</span>
                {selectedClients.length > 0 && (
                  <Badge variant="secondary" className="h-5 px-1.5">
                    {selectedClients.length}
                  </Badge>
                )}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 p-2">
              <div className="flex items-center gap-2 mb-2">
                <Input
                  placeholder="Buscar cliente..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8"
                />
                {selectedClients.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => setSelectedClients([])}
                    title="Limpar seleção"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex items-center justify-between px-2 py-1.5 border-b mb-1">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={(v) => {
                      if (v) setSelectedClients((clients ?? []).map((c) => c.id));
                      else setSelectedClients([]);
                    }}
                  />
                  <span>Selecionar todos</span>
                </label>
                <span className="text-xs text-muted-foreground">
                  {selectedClients.length}/{clients?.length ?? 0}
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {filteredClients.length === 0 ? (
                  <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                    Nenhum cliente
                  </div>
                ) : (
                  filteredClients.map((c) => (
                    <label
                      key={c.id}
                      className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent cursor-pointer text-sm"
                    >
                      <Checkbox
                        checked={selectedClients.includes(c.id)}
                        onCheckedChange={() => toggleClient(c.id)}
                      />
                      <span className="truncate">{c.name}</span>
                    </label>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* Assignee */}
          <Select
            value={filters.assignee ?? "all"}
            onValueChange={(v) => onChange({ ...filters, assignee: v === "all" ? undefined : v })}
          >
            <SelectTrigger className="h-7 w-48">
              <SelectValue placeholder="Responsável" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos responsáveis</SelectItem>
              {profiles?.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.full_name || p.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Priority */}
          <Select
            value={filters.priority ?? "all"}
            onValueChange={(v) => onChange({ ...filters, priority: v === "all" ? undefined : v })}
          >
            <SelectTrigger className="h-7 w-40">
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas prioridades</SelectItem>
              <SelectItem value="low">Baixa</SelectItem>
              <SelectItem value="medium">Média</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="urgent">Urgente</SelectItem>
            </SelectContent>
          </Select>
          {/* Status */}
          <Select
            value={filters.status ?? "all"}
            onValueChange={(v) => onChange({ ...filters, status: v === "all" ? undefined : v })}
          >
            <SelectTrigger className="h-7 w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              {statuses.filter((status) => !status.is_completed).map((status) => (
                <SelectItem key={status.id} value={status.id}>{status.name}</SelectItem>
              ))}
              <SelectItem value={COMPLETED_STATUS_FILTER}>Concluídos</SelectItem>
            </SelectContent>
          </Select>      {activeCount > 0 && (
        <Button size="sm" variant="ghost" className="h-7 ml-auto text-muted-foreground" onClick={clearAll}>
          <RotateCcw className="mr-1 h-3.5 w-3.5" />
          Limpar ({activeCount})
        </Button>
      )}
      {activeCount === 0 && (
        <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
          <FilterIcon className="h-3.5 w-3.5" />
          Nenhum filtro
        </div>
      )}
      {children}
      </div>
    </>
  );
}

function ScopeBtn({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium transition ${
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

export function applyTaskFilters<
  T extends {
    id: string;
    client_id: string | null;
    assignee_id: string | null;
    priority: string | null;
    column_id: string | null;
    status_id: string | null;
    created_by?: string | null;
    due_date: string | null;
    status: string | null;
    completed_at: string | null;
  },
>(
  tasks: T[],
  f: Filters,
  opts?: {
    userId?: string | null;
    subtaskAssigneeTaskIds?: Set<string> | null;
    collaboratorTaskIds?: Set<string> | null;
    subtaskAssigneeTaskIdsByUser?: Map<string, Set<string>> | null;
  },
) {
  const clientIds = f.clients && f.clients.length > 0 ? f.clients : f.client ? [f.client] : null;
  const uid = opts?.userId ?? null;
  const subIds = opts?.subtaskAssigneeTaskIds ?? null;
  const collaboratorIds = opts?.collaboratorTaskIds ?? null;
  return tasks.filter((t) => {
    if (f.scope === "mine") {
      if (!uid) return false;
      const mine =
        t.assignee_id === uid ||
        (subIds ? subIds.has(t.id) : false) ||
        (collaboratorIds ? collaboratorIds.has(t.id) : false);
      if (!mine) return false;
    }
    if (f.scope === "created" && (!uid || t.created_by !== uid)) return false;

    if (f.date && f.date !== "all" && !matchDateFilter(t, f.date)) return false;
    if (clientIds && (!t.client_id || !clientIds.includes(t.client_id))) return false;
    if (f.assignee) {
      const assigneeSubtasks = opts?.subtaskAssigneeTaskIdsByUser?.get(f.assignee);
      if (t.assignee_id !== f.assignee && !assigneeSubtasks?.has(t.id)) return false;
    }
    if (f.priority && t.priority !== f.priority) return false;
    if (f.status === COMPLETED_STATUS_FILTER && t.status !== "done" && !t.completed_at) return false;
    if (f.status && f.status !== COMPLETED_STATUS_FILTER && t.status_id !== f.status) return false;
    return true;
  });
}

export type { Filters as TaskFilterValue };
