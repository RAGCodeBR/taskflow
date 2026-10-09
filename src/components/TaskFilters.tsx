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
import { useAssignableProfiles, useClients, useColumns } from "@/hooks/use-data";
import { useAuth } from "@/hooks/use-auth";

import { dateFilterLabels, matchDateFilter, type DateFilter } from "@/lib/task-utils";

export type TaskScope = "all" | "mine" | "created";
const COMPLETED_STATUS_FILTER = "completed";
const COLUMN_STATUS_PREFIX = "column:";
const UNASSIGNED_FILTER = "unassigned";

interface Filters {
  scope?: TaskScope;
  date?: DateFilter;
  client?: string; // legacy single-select (still respected)
  clients?: string[]; // multi-select
  assignee?: string;
  priority?: string;
  status?: string;
  /** Id do ambiente. Só aparece para quem pertence a mais de um. */
  workspace?: string;
}

const DATE_OPTIONS: DateFilter[] = [
  "all",
  "due_today",
  "tomorrow",
  "this_week",
  "this_month",
  "overdue",
  "no_due",
  "pending",
  "completed",
];

export function TaskFilters({
  filters,
  onChange,
  sections,
  hideAssignee = false,
  extraActiveChips = [],
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  sections?: {
    category?: ReactNode;
    visualization?: ReactNode;
    organization?: ReactNode;
    completedPeriod?: ReactNode;
  };
  hideAssignee?: boolean;
  extraActiveChips?: Array<{ key: string; label: string; clear: () => void }>;
}) {
  const { workspaces } = useAuth();
  const { data: clients } = useClients(filters.workspace);
  // The assignee filter must only expose users who can receive tasks.
  // This query is role-based in the database (admin and collaborator only),
  // so future client accounts are excluded automatically as well.
  const { data: assignableProfiles } = useAssignableProfiles(filters.workspace);
  const { data: columns = [] } = useColumns(filters.workspace);
  const [clientsOpen, setClientsOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
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

  const activeClients = useMemo(
    () => (clients ?? []).filter((client) => client.is_active),
    [clients],
  );
  const filteredClients = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q
      ? activeClients.filter((client) => client.name.toLowerCase().includes(q))
      : activeClients;
  }, [activeClients, search]);

  const allSelected = activeClients.length > 0 && selectedClients.length === activeClients.length;

  const clientsLabel =
    selectedClients.length === 0
      ? "Clientes"
      : selectedClients.length === 1
        ? (clients?.find((c) => c.id === selectedClients[0])?.name ?? "1 cliente")
        : `${selectedClients.length} clientes`;

  const activeCount =
    [
      scope !== "all",
      dateVal !== "all",
      selectedClients.length > 0,
      !hideAssignee && !!filters.assignee,
      !!filters.priority,
      !!filters.status,
      !!filters.workspace,
    ].filter(Boolean).length + extraActiveChips.length;

  const clearAll = () => {
    onChange({});
    extraActiveChips.forEach((chip) => chip.clear());
  };

  const activeChips = [
    scope !== "all"
      ? {
          key: "scope",
          label: scope === "mine" ? "Atribuídas a mim" : "Criadas por mim",
          clear: () => onChange({ ...filters, scope: undefined }),
        }
      : null,
    selectedClients.length > 0
      ? { key: "clients", label: `Cliente: ${clientsLabel}`, clear: () => setSelectedClients([]) }
      : null,
    !hideAssignee && filters.assignee
      ? {
          key: "assignee",
          label: `Responsável: ${
            filters.assignee === UNASSIGNED_FILTER
              ? "Sem responsável"
              : (assignableProfiles?.find((profile) => profile.id === filters.assignee)
                  ?.full_name ?? "Selecionado")
          }`,
          clear: () => onChange({ ...filters, assignee: undefined }),
        }
      : null,
    dateVal !== "all"
      ? {
          key: "date",
          label: `Período: ${dateFilterLabels[dateVal]}`,
          clear: () => onChange({ ...filters, date: undefined }),
        }
      : null,
    filters.priority
      ? {
          key: "priority",
          label: `Prioridade: ${
            { low: "Baixa", medium: "Média", high: "Alta", urgent: "Urgente" }[
              filters.priority as "low" | "medium" | "high" | "urgent"
            ] ?? filters.priority
          }`,
          clear: () => onChange({ ...filters, priority: undefined }),
        }
      : null,
    filters.status
      ? {
          key: "status",
          label: `Status: ${
            filters.status === COMPLETED_STATUS_FILTER
              ? "Concluídos"
              : filters.status.startsWith(COLUMN_STATUS_PREFIX)
                ? (columns.find(
                    (column) => column.id === filters.status?.slice(COLUMN_STATUS_PREFIX.length),
                  )?.name ?? "Selecionado")
                : "Selecionado"
          }`,
          clear: () => onChange({ ...filters, status: undefined }),
        }
      : null,
    filters.workspace
      ? {
          key: "workspace",
          label: `Categoria: ${workspaces.find((workspace) => workspace.id === filters.workspace)?.name ?? "Selecionada"}`,
          clear: () => onChange({ ...filters, workspace: undefined }),
        }
      : null,
    ...extraActiveChips,
  ].filter((chip): chip is { key: string; label: string; clear: () => void } => chip !== null);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="inline-flex max-w-full flex-wrap rounded-full border bg-muted/40 p-0.5">
        <ScopeBtn
          active={scope === "all"}
          onClick={() => onChange({ ...filters, scope: undefined, assignee: undefined })}
          icon={<Users className="h-4 w-4" />}
        >
          Todas
        </ScopeBtn>
        <ScopeBtn
          active={scope === "mine"}
          onClick={() => onChange({ ...filters, scope: "mine", assignee: undefined })}
          icon={<UserCheck className="h-4 w-4" />}
        >
          Atribuídas a mim
        </ScopeBtn>
        <ScopeBtn
          active={scope === "created"}
          onClick={() => onChange({ ...filters, scope: "created", assignee: undefined })}
          icon={<PenSquare className="h-4 w-4" />}
        >
          Criadas por mim
        </ScopeBtn>
      </div>
      <Popover open={panelOpen} onOpenChange={setPanelOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 gap-2 rounded-full px-4 shadow-sm">
            <FilterIcon className="h-4 w-4" />
            Filtros
            {activeCount > 0 && (
              <Badge variant="secondary" className="ml-1 min-w-5 justify-center px-1.5">
                {activeCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={8}
          className="max-h-[80vh] w-[calc(100vw-2rem)] max-w-5xl overflow-y-auto rounded-2xl p-3 shadow-xl sm:p-4"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold">Filtros das tarefas</h3>
              <p className="text-xs text-muted-foreground">Ajuste a lista e a visualização.</p>
            </div>
            <Button variant="outline" size="sm" onClick={clearAll} disabled={activeCount === 0}>
              <RotateCcw className="mr-2 h-4 w-4" /> Limpar
            </Button>
          </div>

          <div className="space-y-4">
            {(sections?.category || sections?.visualization) && (
              <div className="grid items-start gap-3 lg:grid-cols-2">
                {sections.category && (
                  <div className="min-w-0 space-y-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Categoria</span>
                    <div className="flex min-h-8 flex-wrap items-center gap-1.5">
                      {sections.category}
                    </div>
                  </div>
                )}
                {sections.visualization && (
                  <div
                    className={`min-w-0 space-y-1.5 ${sections.category ? "" : "lg:col-start-2"}`}
                  >
                    <span className="text-xs font-medium text-muted-foreground">Visualização</span>
                    <div className="flex min-h-8 flex-wrap items-center gap-1.5">
                      {sections.visualization}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="grid items-end gap-3 lg:grid-cols-2">
              <div className={`min-w-0 space-y-1.5 ${hideAssignee ? "lg:col-span-2" : ""}`}>
                <span className="text-xs font-medium text-muted-foreground">Cliente</span>
                <Popover open={clientsOpen} onOpenChange={setClientsOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-8 w-full justify-between gap-2 font-normal"
                    >
                      <span className="truncate">{clientsLabel}</span>
                      <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-64 p-2">
                    <div className="mb-2 flex items-center gap-2">
                      <Input
                        placeholder="Buscar cliente..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="h-8"
                      />
                      {selectedClients.length > 0 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                          onClick={() => setSelectedClients([])}
                          aria-label="Limpar clientes"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <label className="mb-1 flex cursor-pointer items-center gap-2 border-b px-2 py-1.5 text-sm">
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={(checked) =>
                          setSelectedClients(
                            checked ? activeClients.map((client) => client.id) : [],
                          )
                        }
                      />
                      Selecionar todos
                    </label>
                    <div className="max-h-64 overflow-y-auto">
                      {filteredClients.length === 0 ? (
                        <p className="px-2 py-4 text-center text-sm text-muted-foreground">
                          Nenhum cliente
                        </p>
                      ) : (
                        filteredClients.map((client) => (
                          <label
                            key={client.id}
                            className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-accent"
                          >
                            <Checkbox
                              checked={selectedClients.includes(client.id)}
                              onCheckedChange={() => toggleClient(client.id)}
                            />
                            <span className="truncate">{client.name}</span>
                          </label>
                        ))
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              {!hideAssignee && (
                <div className="min-w-0 space-y-1.5">
                  <span className="text-xs font-medium text-muted-foreground">Responsável</span>
                  <Select
                    value={filters.assignee ?? "all"}
                    onValueChange={(value) =>
                      onChange({ ...filters, assignee: value === "all" ? undefined : value })
                    }
                  >
                    <SelectTrigger className="h-8 w-full">
                      <SelectValue placeholder="Responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos responsáveis</SelectItem>
                      <SelectItem value={UNASSIGNED_FILTER}>Sem responsável</SelectItem>
                      {assignableProfiles?.map((profile) => (
                        <SelectItem key={profile.id} value={profile.id}>
                          {profile.full_name || profile.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {(sections?.organization || sections?.completedPeriod) && (
              <div className="grid items-start gap-3 lg:grid-cols-2">
                {sections.organization && (
                  <div className="min-w-0 space-y-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Organização</span>
                    <div className="flex min-h-8 flex-wrap items-center gap-1.5">
                      {sections.organization}
                    </div>
                  </div>
                )}
                {sections.completedPeriod && (
                  <div className="min-w-0 space-y-1.5">
                    <span className="text-xs font-medium text-muted-foreground">
                      Concluídas no período
                    </span>
                    <div className="flex min-h-8 flex-wrap items-center gap-1.5">
                      {sections.completedPeriod}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">Período</span>
                <Select
                  value={dateVal}
                  onValueChange={(value) => onChange({ ...filters, date: value as DateFilter })}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DATE_OPTIONS.map((date) => (
                      <SelectItem key={date} value={date}>
                        {dateFilterLabels[date]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">Prioridade</span>
                <Select
                  value={filters.priority ?? "all"}
                  onValueChange={(value) =>
                    onChange({ ...filters, priority: value === "all" ? undefined : value })
                  }
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">Status</span>
                <Select
                  value={filters.status ?? "all"}
                  onValueChange={(value) =>
                    onChange({ ...filters, status: value === "all" ? undefined : value })
                  }
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {columns.map((column) => (
                      <SelectItem key={column.id} value={`${COLUMN_STATUS_PREFIX}${column.id}`}>
                        {column.name}
                      </SelectItem>
                    ))}
                    <SelectItem value={COMPLETED_STATUS_FILTER}>Concluídos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {activeChips.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-muted/50 p-2.5">
              <span className="mr-1 text-xs font-medium">Filtros ativos:</span>
              {activeChips.map((chip) => (
                <Button
                  key={chip.key}
                  variant="secondary"
                  size="sm"
                  className="h-7 gap-1 rounded-full text-xs"
                  onClick={chip.clear}
                >
                  {chip.label}
                  <X className="h-3 w-3" />
                </Button>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
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
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium transition ${
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
    workspace_id?: string | null;
  },
>(
  tasks: T[],
  f: Filters,
  opts?: {
    userId?: string | null;
    subtaskAssigneeTaskIds?: Set<string> | null;
    collaboratorTaskIds?: Set<string> | null;
    subtaskAssigneeTaskIdsByUser?: Map<string, Set<string>> | null;
    /** Parent tasks that have a subtask matching the active due-date filter. */
    subtaskDateFilterTaskIds?: Set<string> | null;
    restrictToCurrentUserParticipation?: boolean;
    /** Team browsing is granted for this exact workspace only. */
    teamVisibilityWorkspaceId?: string | null;
  },
) {
  const clientIds = f.clients && f.clients.length > 0 ? f.clients : f.client ? [f.client] : null;
  const uid = opts?.userId ?? null;
  const subIds = opts?.subtaskAssigneeTaskIds ?? null;
  const collaboratorIds = opts?.collaboratorTaskIds ?? null;
  return tasks.filter((t) => {
    const hasTeamVisibility = Boolean(
      opts?.teamVisibilityWorkspaceId && t.workspace_id === opts.teamVisibilityWorkspaceId,
    );
    if (opts?.restrictToCurrentUserParticipation && !hasTeamVisibility) {
      if (!uid) return false;
      const participatesInTask =
        t.assignee_id === uid ||
        !!subIds?.has(t.id) ||
        !!collaboratorIds?.has(t.id) ||
        // Creating a task for another person is not participation. Keep it
        // available only through the explicit "Criadas por mim" filter.
        (f.scope === "created" && t.created_by === uid);
      if (!participatesInTask) return false;
    }
    if (f.scope === "mine") {
      if (!uid) return false;
      const participatesInTask =
        t.assignee_id === uid || !!subIds?.has(t.id) || !!collaboratorIds?.has(t.id);
      if (!participatesInTask) return false;
    }
    if (f.scope === "created" && (!uid || t.created_by !== uid)) return false;

    if (f.date && f.date !== "all" && !matchDateFilter(t, f.date)) {
      const supportsSubtaskDueDates = [
        "today",
        "due_today",
        "tomorrow",
        "this_week",
        "this_month",
        "overdue",
      ].includes(f.date);
      if (!supportsSubtaskDueDates || !opts?.subtaskDateFilterTaskIds?.has(t.id)) return false;
    }
    if (clientIds && (!t.client_id || !clientIds.includes(t.client_id))) return false;
    if (f.assignee === UNASSIGNED_FILTER) {
      if (t.assignee_id !== null) return false;
    } else if (f.assignee) {
      const assigneeSubtasks = opts?.subtaskAssigneeTaskIdsByUser?.get(f.assignee);
      // When filtering by the logged-in user, include direct assignments,
      // collaborations and subtasks. Merely creating a task for another
      // person does not make it part of that user's personal workload.
      const isCurrentUserCollaborator = f.assignee === uid && collaboratorIds?.has(t.id);
      if (
        t.assignee_id !== f.assignee &&
        !assigneeSubtasks?.has(t.id) &&
        !isCurrentUserCollaborator
      ) {
        return false;
      }
    }
    if (f.workspace && t.workspace_id !== f.workspace) return false;
    if (f.priority && t.priority !== f.priority) return false;
    if (f.status === COMPLETED_STATUS_FILTER && t.status !== "done" && !t.completed_at)
      return false;
    if (f.status?.startsWith(COLUMN_STATUS_PREFIX)) {
      const columnId = f.status.slice(COLUMN_STATUS_PREFIX.length);
      if (t.column_id !== columnId || t.status === "done" || !!t.completed_at) return false;
    } else if (f.status && f.status !== COMPLETED_STATUS_FILTER && t.status_id !== f.status) {
      // Keeps legacy saved filter values functional while the selector now uses Kanban columns.
      return false;
    }
    return true;
  });
}

export type { Filters as TaskFilterValue };
