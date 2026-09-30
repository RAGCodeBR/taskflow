/* eslint-disable @typescript-eslint/no-explicit-any -- Supabase types are regenerated after the migration is applied. */
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  CalendarClock,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  ClipboardList,
  Loader2,
  Pause,
  Pencil,
  Play,
  Plus,
  RotateCcw,
  Search,
  Settings2,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { enqueueOfflineOperation, isOffline } from "@/lib/offline-sync";
import { useAssignableProfiles, useTaskStatuses, type Profile, type Task } from "@/hooks/use-data";
import { useWorkspaceTasks } from "@/hooks/use-workspace-tasks";
import {
  useAllRecurringMeetingTaskTemplates,
  useRecurringMeetingDepartmentMembers,
  useRecurringMeetingAgendaItems,
  useRecurringMeetingAgendaPreview,
  useRecurringMeetingDepartments,
  useRecurringMeetingOccurrences,
  useRecurringMeetingParticipants,
  useRecurringMeetings,
  type AgendaItemResult,
  type DepartmentMember,
  type RecurringMeeting,
  type RecurringMeetingAgendaItem,
  type RecurringMeetingDepartment,
  type RecurringMeetingOccurrence,
} from "@/hooks/use-meetings";
import { RecurringMeetingDialog } from "@/components/RecurringMeetingDialog";
import { TaskDialog } from "@/components/TaskDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_app/meetings")({
  // ?meeting=<id> abre a reunião direto (usado pelos avisos do sininho e do pop-up).
  validateSearch: (search: Record<string, unknown>): { meeting?: string } => ({
    meeting: typeof search.meeting === "string" ? search.meeting : undefined,
  }),
  component: RecurringMeetingsPage,
});

const todayKey = () => format(new Date(), "yyyy-MM-dd");

/** Quantas datas de reunião aparecem antes de "Mostrar mais semanas". */
const DATES_PER_PAGE = 4;

/** Paleta visual independente para distinguir os departamentos. */
const DEPARTMENT_PALETTE = ["#5D6E3E", "#EC643F", "#B7821F", "#3E6E6A", "#7B5A7A", "#626161"];
const DEFAULT_DEPARTMENT_COLOR = "#64748b";

/** Usa a cor do departamento; sem cor definida, distribui a paleta pela ordem. */
function departmentColor(
  department: RecurringMeetingDepartment | null,
  order: Map<string, number>,
) {
  if (!department) return "#9a9a93";
  if (department.color && department.color.toLowerCase() !== DEFAULT_DEPARTMENT_COLOR)
    return department.color;
  return DEPARTMENT_PALETTE[(order.get(department.id) ?? 0) % DEPARTMENT_PALETTE.length];
}

function relativeDay(dateKey: string) {
  const days = differenceInCalendarDays(new Date(`${dateKey}T12:00:00`), new Date());
  if (days === 0) return "hoje";
  if (days === 1) return "amanhã";
  if (days === -1) return "ontem";
  return days > 1 ? `em ${days} dias` : `há ${-days} dias`;
}

const isClosed = (occurrence: RecurringMeetingOccurrence) =>
  occurrence.status === "completed" || occurrence.status === "skipped";

type AgendaRow = {
  /** Item já copiado para a reunião; ausente enquanto a pauta ainda é prevista. */
  item: RecurringMeetingAgendaItem | null;
  templateId: string | null;
  title: string;
};

function RecurringMeetingsPage() {
  const { hasPermission, loading, activeWorkspace, user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { meeting: meetingFromLink } = Route.useSearch();
  const {
    data: recurring_meetings = [],
    isLoading,
    error: recurring_meetingsError,
  } = useRecurringMeetings();
  const { data: occurrences = [], isLoading: loadingOccurrences } =
    useRecurringMeetingOccurrences();
  const { data: agendaItems = [] } = useRecurringMeetingAgendaItems();
  const { data: participants = [] } = useRecurringMeetingParticipants();
  const { data: departmentMembers = [] } = useRecurringMeetingDepartmentMembers();
  const { data: taskTemplates = [] } = useAllRecurringMeetingTaskTemplates();
  const { data: profiles = [] } = useAssignableProfiles();
  const { data: taskStatuses = [] } = useTaskStatuses();
  const { data: tasks = [] } = useWorkspaceTasks();
  const { data: departments = [] } = useRecurringMeetingDepartments();
  const cycledWorkspace = useRef<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRecurringMeeting, setEditingRecurringMeeting] = useState<RecurringMeeting | null>(
    null,
  );
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [participantFilter, setParticipantFilter] = useState("all");
  const [datesShown, setDatesShown] = useState(DATES_PER_PAGE);
  const [deleteTarget, setDeleteTarget] = useState<RecurringMeeting | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Gera reuniões, copia pautas e dispara avisos pendentes (também roda todo dia às 7h).
  useEffect(() => {
    if (isOffline() || !activeWorkspace?.id || cycledWorkspace.current === activeWorkspace.id)
      return;
    cycledWorkspace.current = activeWorkspace.id;
    void (async () => {
      const { error } = await (supabase as any).rpc("run_recurring_meeting_cycle");
      if (error) {
        cycledWorkspace.current = null;
        if (/failed to fetch/i.test(error.message ?? "")) return;
        toast.error(`Não foi possível atualizar as próximas reuniões: ${error.message}`);
        return;
      }
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["recurringMeeting-occurrences"] }),
        queryClient.invalidateQueries({ queryKey: ["recurringMeeting-agenda-items"] }),
      ]);
    })();
  }, [activeWorkspace?.id, queryClient]);

  // Aviso do sininho ou do pop-up: abre a reunião indicada no link.
  useEffect(() => {
    if (!meetingFromLink || loadingOccurrences) return;
    if (occurrences.some((occurrence) => occurrence.id === meetingFromLink)) {
      setMeetingId(meetingFromLink);
    } else {
      toast.error("Esta reunião não está mais disponível.");
    }
    void navigate({ to: "/meetings", search: {}, replace: true });
  }, [loadingOccurrences, meetingFromLink, navigate, occurrences]);

  const recurringMeetingById = useMemo(
    () =>
      new Map(
        recurring_meetings.map((recurringMeeting) => [recurringMeeting.id, recurringMeeting]),
      ),
    [recurring_meetings],
  );
  const departmentById = useMemo(
    () => new Map(departments.map((department) => [department.id, department])),
    [departments],
  );
  const profileById = useMemo(
    () => new Map(profiles.map((profile) => [profile.id, profile])),
    [profiles],
  );
  const participantsByRecurringMeeting = useMemo(() => {
    const grouped = new Map<string, string[]>();
    participants.forEach(({ recurring_meeting_id, user_id }) => {
      grouped.set(recurring_meeting_id, [...(grouped.get(recurring_meeting_id) ?? []), user_id]);
    });
    return grouped;
  }, [participants]);
  const templateCountByRecurringMeeting = useMemo(() => {
    const counts = new Map<string, number>();
    taskTemplates.forEach((template) =>
      counts.set(
        template.recurring_meeting_id,
        (counts.get(template.recurring_meeting_id) ?? 0) + 1,
      ),
    );
    return counts;
  }, [taskTemplates]);
  const itemsByOccurrence = useMemo(() => {
    const grouped = new Map<string, RecurringMeetingAgendaItem[]>();
    agendaItems.forEach((item) => {
      grouped.set(item.occurrence_id, [...(grouped.get(item.occurrence_id) ?? []), item]);
    });
    return grouped;
  }, [agendaItems]);
  const tasksByItem = useMemo(() => {
    const grouped = new Map<string, Task[]>();
    tasks.forEach((task) => {
      if (!task.recurring_meeting_agenda_item_id) return;
      const key = task.recurring_meeting_agenda_item_id;
      grouped.set(key, [...(grouped.get(key) ?? []), task]);
    });
    return grouped;
  }, [tasks]);
  const completedStatusIds = useMemo(
    () => new Set(taskStatuses.filter((status) => status.is_completed).map((status) => status.id)),
    [taskStatuses],
  );
  const isTaskDone = (task: Task) =>
    task.status === "done" ||
    Boolean(task.completed_at) ||
    (!!task.status_id && completedStatusIds.has(task.status_id));

  const today = todayKey();
  const visibleRecurringMeetings = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("pt-BR");
    return recurring_meetings.filter((recurringMeeting) => {
      const department = departmentById.get(recurringMeeting.department_id ?? "");
      if (departmentFilter !== "all" && recurringMeeting.department_id !== departmentFilter)
        return false;
      if (
        participantFilter !== "all" &&
        recurringMeeting.assignee_id !== participantFilter &&
        !(participantsByRecurringMeeting.get(recurringMeeting.id) ?? []).includes(participantFilter)
      )
        return false;
      if (!term) return true;
      return `${recurringMeeting.title} ${department?.name ?? ""}`
        .toLocaleLowerCase("pt-BR")
        .includes(term);
    });
  }, [
    departmentById,
    departmentFilter,
    recurring_meetings,
    participantFilter,
    participantsByRecurringMeeting,
    search,
  ]);

  const departmentOrder = useMemo(() => {
    const sorted = [...departments].sort(
      (first, second) =>
        first.position - second.position || first.name.localeCompare(second.name, "pt-BR"),
    );
    return new Map(sorted.map((department, index) => [department.id, index]));
  }, [departments]);

  const routinesPerDepartment = useMemo(() => {
    const counts = new Map<string, number>();
    recurring_meetings.forEach((recurringMeeting) => {
      const key = recurringMeeting.department_id ?? "none";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });
    return counts;
  }, [recurring_meetings]);

  // Reuniões em aberto agrupadas por data: cada data é uma "rodada" de reuniões.
  const { overdueMeetings, upcomingDates } = useMemo(() => {
    const visibleIds = new Set(
      visibleRecurringMeetings.map((recurringMeeting) => recurringMeeting.id),
    );
    const open = occurrences
      .filter(
        (occurrence) => visibleIds.has(occurrence.recurring_meeting_id) && !isClosed(occurrence),
      )
      .map((occurrence) => ({
        occurrence,
        recurringMeeting: recurringMeetingById.get(occurrence.recurring_meeting_id)!,
      }))
      .filter(({ recurringMeeting }) => recurringMeeting.is_active)
      .sort(
        (first, second) =>
          first.occurrence.due_date.localeCompare(second.occurrence.due_date) ||
          (departmentOrder.get(first.recurringMeeting.department_id ?? "") ?? 99) -
            (departmentOrder.get(second.recurringMeeting.department_id ?? "") ?? 99),
      );
    const byDate = new Map<string, typeof open>();
    open
      .filter(({ occurrence }) => occurrence.due_date >= today)
      .forEach((entry) => {
        const key = entry.occurrence.due_date;
        byDate.set(key, [...(byDate.get(key) ?? []), entry]);
      });
    return {
      overdueMeetings: open.filter(({ occurrence }) => occurrence.due_date < today),
      upcomingDates: [...byDate.entries()].map(([date, meetings]) => ({ date, meetings })),
    };
  }, [departmentOrder, recurringMeetingById, occurrences, today, visibleRecurringMeetings]);

  const pendingOccurrencesOf = (recurringMeetingId: string) =>
    occurrences.filter(
      (occurrence) =>
        occurrence.recurring_meeting_id === recurringMeetingId && !isClosed(occurrence),
    );

  const setRecurringMeetingActive = async (
    recurringMeeting: RecurringMeeting,
    isActive: boolean,
  ) => {
    if (user && activeWorkspace?.id && isOffline()) {
      await enqueueOfflineOperation({
        userId: user.id,
        entity: "record",
        action: "update",
        entityId: recurringMeeting.id,
        payload: { table: "recurring_meetings", patch: { is_active: isActive } },
      });
      queryClient.setQueryData<RecurringMeeting[]>(
        ["recurring_meetings", activeWorkspace.id],
        (current = []) =>
          current.map((item) =>
            item.id === recurringMeeting.id ? { ...item, is_active: isActive } : item,
          ),
      );
      toast.success("Alteração salva neste aparelho. Será sincronizada ao reconectar.");
      return;
    }
    const { error } = await (supabase.from("recurring_meetings" as any) as any)
      .update({ is_active: isActive })
      .eq("id", recurringMeeting.id);
    if (error) return toast.error(error.message);
    if (isActive) {
      const { error: refreshError } = await (supabase as any).rpc("refresh_recurring_meeting", {
        target_recurring_meeting_id: recurringMeeting.id,
      });
      if (refreshError) toast.error(`Reunião ativada, mas as próximas datas não foram geradas.`);
    }
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["recurring_meetings"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-occurrences"] }),
    ]);
    toast.success(isActive ? "Reunião ativada" : "Reunião pausada");
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    if (isOffline()) return toast.error("Conecte-se à internet para excluir a reunião.");
    setDeleting(true);
    const { error } = await (supabase.from("recurring_meetings" as any) as any)
      .delete()
      .eq("id", deleteTarget.id);
    setDeleting(false);
    if (error) return toast.error(error.message);
    setDeleteTarget(null);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["recurring_meetings"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-occurrences"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-agenda-items"] }),
    ]);
    toast.success("Reunião excluída");
  };

  if (loading) return <div className="p-6 text-sm text-muted-foreground">Carregando...</div>;
  if (!hasPermission("meetings")) return <Navigate to="/dashboard" />;

  const meeting = meetingId ? occurrences.find((occurrence) => occurrence.id === meetingId) : null;
  const meetingRecurringMeeting = meeting
    ? (recurringMeetingById.get(meeting.recurring_meeting_id) ?? null)
    : null;

  return (
    <div className="space-y-5 p-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarClock className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold tracking-tight">Reuniões</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Reuniões recorrentes por departamento: pauta, resultado de cada item e tarefas geradas.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="h-9 rounded-full px-4"
            onClick={() => setDepartmentsOpen(true)}
          >
            <Users className="mr-2 h-4 w-4" /> Departamentos
          </Button>
          <Button
            className="h-9 rounded-full px-4 shadow-sm"
            onClick={() => {
              setEditingRecurringMeeting(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Nova reunião recorrente
          </Button>
        </div>
      </header>

      {recurring_meetingsError ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Não foi possível carregar as reuniões: {(recurring_meetingsError as Error).message}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2 rounded-xl border bg-card p-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar reunião ou departamento..."
            className="pl-9"
          />
        </div>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Todos os departamentos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os departamentos</SelectItem>
            {departments.map((department) => (
              <SelectItem key={department.id} value={department.id}>
                {department.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={participantFilter} onValueChange={setParticipantFilter}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Todos os participantes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os participantes</SelectItem>
            {profiles.map((profile) => (
              <SelectItem key={profile.id} value={profile.id}>
                {profile.full_name || profile.email || "Usuário"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="meetings">
        <TabsList>
          <TabsTrigger value="meetings">Reuniões</TabsTrigger>
          <TabsTrigger value="settings">Rotinas</TabsTrigger>
        </TabsList>

        <TabsContent value="meetings" className="mt-5">
          {isLoading || loadingOccurrences ? (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Carregando reuniões...
            </div>
          ) : recurring_meetings.length === 0 ? (
            <EmptyState
              title="Nenhuma reunião cadastrada"
              description="Crie a reunião recorrente de um departamento e monte a pauta padrão dela."
            />
          ) : overdueMeetings.length === 0 && upcomingDates.length === 0 ? (
            <EmptyState
              title="Nenhuma reunião encontrada"
              description="Ajuste a busca ou os filtros, ou ative uma rotina pausada em Rotinas."
            />
          ) : (
            <div className="space-y-8">
              {overdueMeetings.length > 0 && (
                <MeetingDateGroup
                  tone="overdue"
                  numeral={String(overdueMeetings.length)}
                  caption={overdueMeetings.length === 1 ? "atrasada" : "atrasadas"}
                  heading="Sem encerramento"
                  hint="Reuniões que já passaram e ainda têm itens sem resultado."
                >
                  {overdueMeetings.map(({ occurrence, recurringMeeting }) => (
                    <MeetingRow
                      key={occurrence.id}
                      occurrence={occurrence}
                      dateLabel={format(new Date(`${occurrence.due_date}T12:00:00`), "dd/MM")}
                      recurringMeeting={recurringMeeting}
                      department={departmentById.get(recurringMeeting.department_id ?? "") ?? null}
                      color={departmentColor(
                        departmentById.get(recurringMeeting.department_id ?? "") ?? null,
                        departmentOrder,
                      )}
                      showTitle={
                        (routinesPerDepartment.get(recurringMeeting.department_id ?? "none") ?? 0) >
                        1
                      }
                      assignee={profileById.get(recurringMeeting.assignee_id ?? "") ?? null}
                      items={itemsByOccurrence.get(occurrence.id) ?? []}
                      templateCount={templateCountByRecurringMeeting.get(recurringMeeting.id) ?? 0}
                      tasksByItem={tasksByItem}
                      onOpen={() => setMeetingId(occurrence.id)}
                    />
                  ))}
                </MeetingDateGroup>
              )}
              {upcomingDates.slice(0, datesShown).map(({ date, meetings }) => {
                const day = new Date(`${date}T12:00:00`);
                return (
                  <MeetingDateGroup
                    key={date}
                    tone={date === today ? "today" : "default"}
                    numeral={format(day, "dd")}
                    caption={format(day, "MMM", { locale: ptBR }).replace(".", "")}
                    heading={format(day, "EEEE, d 'de' MMMM", { locale: ptBR })}
                    hint={relativeDay(date)}
                  >
                    {meetings.map(({ occurrence, recurringMeeting }) => (
                      <MeetingRow
                        key={occurrence.id}
                        occurrence={occurrence}
                        recurringMeeting={recurringMeeting}
                        department={
                          departmentById.get(recurringMeeting.department_id ?? "") ?? null
                        }
                        color={departmentColor(
                          departmentById.get(recurringMeeting.department_id ?? "") ?? null,
                          departmentOrder,
                        )}
                        showTitle={
                          (routinesPerDepartment.get(recurringMeeting.department_id ?? "none") ??
                            0) > 1
                        }
                        assignee={profileById.get(recurringMeeting.assignee_id ?? "") ?? null}
                        items={itemsByOccurrence.get(occurrence.id) ?? []}
                        templateCount={
                          templateCountByRecurringMeeting.get(recurringMeeting.id) ?? 0
                        }
                        tasksByItem={tasksByItem}
                        onOpen={() => setMeetingId(occurrence.id)}
                      />
                    ))}
                  </MeetingDateGroup>
                );
              })}
              {upcomingDates.length > datesShown && (
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    className="text-primary"
                    onClick={() => setDatesShown((current) => current + DATES_PER_PAGE)}
                  >
                    <ChevronDown className="mr-1.5 h-4 w-4" /> Mostrar mais semanas
                  </Button>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          {recurring_meetings.length === 0 ? (
            <EmptyState
              title="Nenhuma reunião recorrente configurada"
              description="Cadastre a primeira reunião de um departamento."
            />
          ) : (
            <div className="grid gap-3 lg:grid-cols-2">
              {visibleRecurringMeetings.map((recurringMeeting) => {
                const department = departmentById.get(recurringMeeting.department_id ?? "");
                const assignee = profileById.get(recurringMeeting.assignee_id ?? "");
                const next = pendingOccurrencesOf(recurringMeeting.id).find(
                  (occurrence) => occurrence.due_date >= today,
                );
                const people = (participantsByRecurringMeeting.get(recurringMeeting.id) ?? [])
                  .map((id) => profileById.get(id)?.full_name || profileById.get(id)?.email)
                  .filter(Boolean);
                return (
                  <Card key={recurringMeeting.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3 w-3 shrink-0 rounded-sm"
                            style={{
                              backgroundColor: departmentColor(department ?? null, departmentOrder),
                            }}
                          />
                          <h3 className="truncate font-semibold">{recurringMeeting.title}</h3>
                          {!recurringMeeting.is_active && <Badge variant="outline">Pausada</Badge>}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {department?.name ?? "Sem departamento"} ·{" "}
                          {formatRecurrence(recurringMeeting)}
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Editar"
                          aria-label="Editar reunião"
                          onClick={() => {
                            setEditingRecurringMeeting(recurringMeeting);
                            setDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title={recurringMeeting.is_active ? "Pausar" : "Ativar"}
                          aria-label={
                            recurringMeeting.is_active ? "Pausar reunião" : "Ativar reunião"
                          }
                          onClick={() =>
                            void setRecurringMeetingActive(
                              recurringMeeting,
                              !recurringMeeting.is_active,
                            )
                          }
                        >
                          {recurringMeeting.is_active ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          title="Excluir"
                          aria-label="Excluir reunião"
                          onClick={() => setDeleteTarget(recurringMeeting)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <dl className="mt-4 grid grid-cols-2 gap-3 border-t pt-3 text-xs">
                      <div>
                        <dt className="text-muted-foreground">Responsável</dt>
                        <dd className="mt-1 font-medium">
                          {assignee?.full_name || assignee?.email || "Sem responsável"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Próxima reunião</dt>
                        <dd className="mt-1 font-medium">
                          {next ? formatDate(next.due_date) : "Sem data futura"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Pauta padrão</dt>
                        <dd className="mt-1 font-medium">
                          {templateCountByRecurringMeeting.get(recurringMeeting.id) ?? 0} itens
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Aviso</dt>
                        <dd className="mt-1 font-medium">
                          {recurringMeeting.reminder_days_before} dia(s) antes
                        </dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="text-muted-foreground">Participantes</dt>
                        <dd className="mt-1 font-medium">
                          {people.length > 0
                            ? people.join(", ")
                            : "Nenhum (aviso só ao responsável)"}
                        </dd>
                      </div>
                    </dl>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <RecurringMeetingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        recurringMeeting={editingRecurringMeeting}
      />
      <DepartmentsDialog
        open={departmentsOpen}
        onOpenChange={setDepartmentsOpen}
        departments={departments}
        members={departmentMembers}
        profiles={profiles}
        recurring_meetings={recurring_meetings}
      />
      {meeting && meetingRecurringMeeting ? (
        <MeetingDialog
          open
          onOpenChange={(open) => {
            if (!open) setMeetingId(null);
          }}
          occurrence={meeting}
          recurringMeeting={meetingRecurringMeeting}
          department={departmentById.get(meetingRecurringMeeting.department_id ?? "") ?? null}
          items={itemsByOccurrence.get(meeting.id) ?? []}
          tasksByItem={tasksByItem}
          participantIds={participantsByRecurringMeeting.get(meetingRecurringMeeting.id) ?? []}
          profileById={profileById}
          isTaskDone={isTaskDone}
        />
      ) : null}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open && !deleting) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir esta reunião recorrente?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `“${deleteTarget.title}”, as reuniões agendadas e as pautas delas serão excluídas. As tarefas já geradas continuam existindo.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(event) => {
                event.preventDefault();
                void confirmDelete();
              }}
            >
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {deleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/** Uma data de reunião: a data em destaque à esquerda e as reuniões do dia à direita. */
function MeetingDateGroup({
  tone,
  numeral,
  caption,
  heading,
  hint,
  children,
}: {
  tone: "default" | "today" | "overdue";
  numeral: string;
  caption: string;
  heading: string;
  hint: string;
  children: ReactNode;
}) {
  const numeralColor =
    tone === "overdue" ? "text-[#EC643F]" : tone === "today" ? "text-primary" : "text-foreground";
  return (
    <section className="grid gap-3 sm:grid-cols-[4.5rem_1fr] sm:gap-5">
      <div className="flex items-baseline gap-2 sm:block sm:pt-1 sm:text-right">
        <span
          className={`block text-4xl font-semibold leading-none tracking-tight tabular-nums ${numeralColor}`}
        >
          {numeral}
        </span>
        <span className="block text-sm text-muted-foreground sm:mt-1">{caption}</span>
      </div>
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <h2
            className={`text-base font-semibold first-letter:uppercase ${tone === "overdue" ? "text-[#C24E2C]" : ""}`}
          >
            {heading}
          </h2>
          <span className="text-sm text-muted-foreground">{hint}</span>
        </div>
        <ul className="divide-y overflow-hidden rounded-2xl border bg-card">{children}</ul>
      </div>
    </section>
  );
}

function MeetingRow({
  occurrence,
  recurringMeeting,
  department,
  color,
  showTitle,
  assignee,
  items,
  templateCount,
  tasksByItem,
  dateLabel,
  onOpen,
}: {
  occurrence: RecurringMeetingOccurrence;
  recurringMeeting: RecurringMeeting;
  department: RecurringMeetingDepartment | null;
  color: string;
  showTitle: boolean;
  assignee: Profile | null;
  items: RecurringMeetingAgendaItem[];
  templateCount: number;
  tasksByItem: Map<string, Task[]>;
  /** Mostra a data na linha (usado na lista de atrasadas, que mistura datas). */
  dateLabel?: string;
  onOpen: () => void;
}) {
  const prepared = Boolean(occurrence.agenda_prepared_at);
  const resolved = items.filter((item) => item.result).length;
  const taskCount = items.reduce(
    (count, item) => count + (tasksByItem.get(item.id)?.length ?? 0),
    0,
  );
  const ready = prepared && items.length > 0 && resolved === items.length;
  const progress = prepared && items.length > 0 ? Math.round((resolved / items.length) * 100) : 0;

  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="grid w-full grid-cols-[4px_1fr_auto] items-center gap-x-4 gap-y-1 px-4 py-3 text-left transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none sm:grid-cols-[4px_minmax(0,1.3fr)_minmax(0,1fr)_auto]"
      >
        <span className="h-9 w-1 rounded-full" style={{ backgroundColor: color }} aria-hidden />
        <span className="min-w-0">
          <span className="block truncate font-medium">
            {department?.name ?? recurringMeeting.title}
            {dateLabel ? (
              <span className="ml-2 text-sm font-normal text-[#C24E2C]">{dateLabel}</span>
            ) : null}
          </span>
          <span className="block truncate text-sm text-muted-foreground">
            {showTitle
              ? recurringMeeting.title
              : assignee?.full_name || assignee?.email || "Sem responsável"}
            {occurrence.due_time ? `, ${occurrence.due_time.slice(0, 5)}` : ""}
          </span>
        </span>
        <span className="col-start-2 min-w-0 sm:col-start-auto">
          {prepared ? (
            <span className="block">
              <span className={`text-sm ${ready ? "font-medium text-primary" : ""}`}>
                {ready
                  ? "Pronta para encerrar"
                  : `${resolved} de ${items.length} itens com resultado`}
              </span>
              <span className="mt-1 block h-1 w-full max-w-40 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-primary transition-[width]"
                  style={{ width: `${progress}%` }}
                />
              </span>
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">
              {templateCount} {templateCount === 1 ? "item previsto" : "itens previstos"}
            </span>
          )}
          {taskCount > 0 && (
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {taskCount} {taskCount === 1 ? "tarefa gerada" : "tarefas geradas"}
            </span>
          )}
        </span>
        <ChevronRight
          className="row-span-2 h-4 w-4 text-muted-foreground sm:row-span-1"
          aria-hidden
        />
      </button>
    </li>
  );
}

/** A reunião: pauta própria, resultado de cada item e tarefas geradas por item. */
function MeetingDialog({
  open,
  onOpenChange,
  occurrence,
  recurringMeeting,
  department,
  items,
  tasksByItem,
  participantIds,
  profileById,
  isTaskDone,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  occurrence: RecurringMeetingOccurrence;
  recurringMeeting: RecurringMeeting;
  department: RecurringMeetingDepartment | null;
  items: RecurringMeetingAgendaItem[];
  tasksByItem: Map<string, Task[]>;
  participantIds: string[];
  profileById: Map<string, Profile>;
  isTaskDone: (task: Task) => boolean;
}) {
  const queryClient = useQueryClient();
  const prepared = Boolean(occurrence.agenda_prepared_at);
  const { data: preview = [], isLoading: loadingPreview } = useRecurringMeetingAgendaPreview(
    prepared ? null : occurrence.id,
  );
  const [busy, setBusy] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [taskFor, setTaskFor] = useState<RecurringMeetingAgendaItem | null>(null);
  const [rescheduling, setRescheduling] = useState(false);
  const [newDate, setNewDate] = useState(occurrence.due_date);
  const closed = isClosed(occurrence);

  const rows: AgendaRow[] = prepared
    ? items.map((item) => ({ item, templateId: item.template_id, title: item.title }))
    : preview.map((entry) => ({ item: null, templateId: entry.template_id, title: entry.title }));
  const resolvedCount = rows.filter((row) => row.item?.result).length;
  const allResolved = rows.length > 0 && resolvedCount === rows.length;
  const people = participantIds
    .map((id) => profileById.get(id)?.full_name || profileById.get(id)?.email)
    .filter(Boolean);
  const reminderDate = format(
    addDays(new Date(`${occurrence.due_date}T12:00:00`), -recurringMeeting.reminder_days_before),
    "dd/MM",
  );

  const refresh = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-agenda-items"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-occurrences"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-agenda-preview"] }),
    ]);

  /**
   * Antes de editar, a pauta prevista é copiada para a reunião. A partir daí ela
   * deixa de acompanhar a pauta padrão.
   */
  const ensurePrepared = async () => {
    if (prepared) return items;
    const { error } = await (supabase as any).rpc("prepare_recurring_meeting_agenda", {
      target_occurrence_id: occurrence.id,
    });
    if (error) throw error;
    const { data, error: loadError } = await (
      supabase.from("recurring_meeting_agenda_items" as any) as any
    )
      .select("*")
      .eq("occurrence_id", occurrence.id)
      .order("position");
    if (loadError) throw loadError;
    await refresh();
    return (data ?? []) as RecurringMeetingAgendaItem[];
  };

  const run = async (action: () => Promise<void>) => {
    if (isOffline()) return toast.error("Conecte-se à internet para alterar a reunião.");
    setBusy(true);
    try {
      await action();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : String((error as any)?.message ?? error),
      );
    } finally {
      setBusy(false);
    }
  };

  const resolveRow = (row: AgendaRow) => async () => {
    const current = await ensurePrepared();
    const item =
      current.find((candidate) => candidate.id === row.item?.id) ??
      current.find((candidate) => row.templateId && candidate.template_id === row.templateId);
    if (!item) throw new Error("Item da pauta não encontrado.");
    return item;
  };

  const setResult = (row: AgendaRow, result: AgendaItemResult | null) =>
    run(async () => {
      const item = await resolveRow(row)();
      const { error } = await (supabase.from("recurring_meeting_agenda_items" as any) as any)
        .update({ result })
        .eq("id", item.id);
      if (error) throw error;
      await refresh();
    });

  const generateTask = (row: AgendaRow) =>
    run(async () => {
      const item = await resolveRow(row)();
      setTaskFor(item);
    });

  const removeRow = (row: AgendaRow) =>
    run(async () => {
      const item = await resolveRow(row)();
      const { error } = await (supabase.from("recurring_meeting_agenda_items" as any) as any)
        .delete()
        .eq("id", item.id);
      if (error) throw error;
      await refresh();
    });

  const addItem = () =>
    run(async () => {
      const title = newItem.trim();
      if (!title) return;
      const current = await ensurePrepared();
      const position = current.reduce((max, item) => Math.max(max, item.position), -1) + 1;
      const { error } = await (
        supabase.from("recurring_meeting_agenda_items" as any) as any
      ).insert({
        occurrence_id: occurrence.id,
        title,
        position,
      });
      if (error) throw error;
      setNewItem("");
      await refresh();
    });

  const reschedule = () =>
    run(async () => {
      if (!newDate || newDate === occurrence.due_date) return setRescheduling(false);
      const { error } = await (supabase.from("recurring_meeting_occurrences" as any) as any)
        .update({ due_date: newDate, rescheduled_at: new Date().toISOString() })
        .eq("id", occurrence.id);
      if (error) {
        throw new Error(
          /duplicate|unique/i.test(error.message)
            ? "Já existe uma reunião desta rotina nessa data."
            : error.message,
        );
      }
      setRescheduling(false);
      await refresh();
      toast.success(`Reunião remarcada para ${formatDate(newDate)}.`);
    });

  const complete = () =>
    run(async () => {
      const { error } = await (supabase as any).rpc("complete_recurring_meeting_occurrence", {
        target_occurrence_id: occurrence.id,
      });
      if (error) throw error;
      await refresh();
      toast.success("Reunião encerrada");
      onOpenChange(false);
    });

  const reopen = () =>
    run(async () => {
      const { error } = await (supabase.from("recurring_meeting_occurrences" as any) as any)
        .update({ status: "open", completed_at: null, completed_by: null })
        .eq("id", occurrence.id);
      if (error) throw error;
      await refresh();
    });

  return (
    <>
      <Dialog open={open && !taskFor} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex flex-wrap items-center gap-2">
              {recurringMeeting.title}
              {closed && <Badge variant="secondary">Encerrada</Badge>}
            </DialogTitle>
            <DialogDescription className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>
                {department?.name ?? "Sem departamento"} ·{" "}
                {format(new Date(`${occurrence.due_date}T12:00:00`), "EEEE, dd/MM/yyyy", {
                  locale: ptBR,
                })}
                {occurrence.due_time ? ` às ${occurrence.due_time.slice(0, 5)}` : ""}
              </span>
              {!closed &&
                (rescheduling ? (
                  <span className="flex items-center gap-1">
                    <Input
                      type="date"
                      value={newDate}
                      onChange={(event) => setNewDate(event.target.value)}
                      className="h-7 w-36 text-xs"
                      aria-label="Nova data da reunião"
                    />
                    <Button
                      size="sm"
                      className="h-7"
                      disabled={busy}
                      onClick={() => void reschedule()}
                    >
                      Salvar
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7"
                      onClick={() => setRescheduling(false)}
                    >
                      Cancelar
                    </Button>
                  </span>
                ) : (
                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:underline"
                    onClick={() => {
                      setNewDate(occurrence.due_date);
                      setRescheduling(true);
                    }}
                  >
                    Remarcar
                  </button>
                ))}
            </DialogDescription>
          </DialogHeader>

          <p className="text-xs text-muted-foreground">
            <Users className="mr-1 inline h-3.5 w-3.5 align-text-bottom" />
            {people.length > 0 ? people.join(", ") : "Sem participantes definidos"}
          </p>

          {!prepared && !closed && (
            <div className="rounded-lg border border-dashed bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
              Pauta prevista a partir da pauta padrão. Ela é confirmada em {reminderDate}, quando os
              participantes são avisados. Ao incluir ou alterar um item agora, a pauta desta reunião
              passa a ser própria.
            </div>
          )}

          <section className="overflow-hidden rounded-xl border">
            <div className="flex items-center justify-between gap-2 border-b bg-muted/30 px-3 py-2">
              <h3 className="text-sm font-semibold">Pauta</h3>
              {rows.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  {resolvedCount} de {rows.length} com resultado
                </span>
              )}
            </div>
            {loadingPreview ? (
              <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Carregando pauta...
              </div>
            ) : rows.length === 0 ? (
              <p className="flex items-center justify-center gap-2 px-3 py-8 text-sm text-muted-foreground">
                <ClipboardList className="h-4 w-4" /> Nenhum item na pauta desta reunião.
              </p>
            ) : (
              <ul className="divide-y">
                {rows.map((row, index) => (
                  <AgendaItemRow
                    key={row.item?.id ?? row.templateId ?? index}
                    number={index + 1}
                    row={row}
                    tasks={row.item ? (tasksByItem.get(row.item.id) ?? []) : []}
                    profileById={profileById}
                    isTaskDone={isTaskDone}
                    disabled={busy || closed}
                    onDone={() => void setResult(row, row.item?.result === "done" ? null : "done")}
                    onGenerateTask={() => void generateTask(row)}
                    onRemove={() => void removeRow(row)}
                  />
                ))}
              </ul>
            )}
            {!closed && (
              <div className="flex gap-2 border-t bg-muted/20 px-3 py-2">
                <Input
                  value={newItem}
                  onChange={(event) => setNewItem(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter") return;
                    event.preventDefault();
                    void addItem();
                  }}
                  placeholder="Incluir assunto nesta reunião..."
                  className="h-8 bg-background text-sm"
                  aria-label="Novo item da pauta"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 bg-background"
                  disabled={busy || !newItem.trim()}
                  onClick={() => void addItem()}
                >
                  <Plus className="mr-1 h-3.5 w-3.5" /> Incluir
                </Button>
              </div>
            )}
          </section>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
            {closed ? (
              <Button variant="outline" disabled={busy} onClick={() => void reopen()}>
                <RotateCcw className="mr-1.5 h-4 w-4" /> Reabrir reunião
              </Button>
            ) : (
              <Button
                disabled={busy || !allResolved}
                title={allResolved ? undefined : "Defina o resultado de todos os itens"}
                onClick={() => void complete()}
              >
                <CheckCircle2 className="mr-1.5 h-4 w-4" />
                {allResolved
                  ? "Encerrar reunião"
                  : `${rows.length - resolvedCount} item(ns) sem resultado`}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <TaskDialog
        open={!!taskFor}
        onOpenChange={(next) => {
          if (next) return;
          setTaskFor(null);
          void refresh();
        }}
        recurringMeetingAgendaItemId={taskFor?.id ?? null}
        defaults={{
          title: taskFor?.title,
          dueDate: occurrence.due_date >= todayKey() ? occurrence.due_date : todayKey(),
          dueTime: recurringMeeting.due_time?.slice(0, 5) ?? undefined,
          assigneeId: recurringMeeting.assignee_id,
          priority: recurringMeeting.priority,
        }}
      />
    </>
  );
}

function AgendaItemRow({
  number,
  row,
  tasks,
  profileById,
  isTaskDone,
  disabled,
  onDone,
  onGenerateTask,
  onRemove,
}: {
  number: number;
  row: AgendaRow;
  tasks: Task[];
  profileById: Map<string, Profile>;
  isTaskDone: (task: Task) => boolean;
  disabled: boolean;
  onDone: () => void;
  onGenerateTask: () => void;
  onRemove: () => void;
}) {
  const result = row.item?.result ?? null;
  const resolver = row.item?.resolved_by ? profileById.get(row.item.resolved_by) : null;
  return (
    <li className={`px-3 py-2.5 ${result ? "bg-muted/10" : ""}`}>
      <div className="flex flex-wrap items-start gap-3">
        <span className="mt-0.5 w-5 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
          {number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm leading-snug">{row.title}</span>
          {!row.templateId && (
            <span className="text-[11px] text-muted-foreground">Incluído nesta reunião</span>
          )}
          {result === "done" && (
            <span className="block text-[11px] text-emerald-700 dark:text-emerald-400">
              Concluído{resolver ? ` por ${resolver.full_name || resolver.email}` : ""}
            </span>
          )}
        </span>
        <span className="flex shrink-0 flex-wrap items-center gap-1">
          <Button
            size="sm"
            variant={result === "done" ? "default" : "outline"}
            className="h-7 px-2 text-xs"
            disabled={disabled || result === "task"}
            onClick={onDone}
            title={result === "task" ? "Este item já gerou tarefa" : undefined}
          >
            <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Concluído
          </Button>
          <Button
            size="sm"
            variant={result === "task" ? "default" : "outline"}
            className="h-7 px-2 text-xs"
            disabled={disabled}
            onClick={onGenerateTask}
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            {result === "task" ? "Outra tarefa" : "Gerar tarefa"}
          </Button>
          {tasks.length === 0 && (
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              disabled={disabled}
              onClick={onRemove}
              title="Remover da pauta desta reunião"
              aria-label={`Remover o item ${number} desta reunião`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </span>
      </div>
      {tasks.length > 0 && (
        <ul className="ml-8 mt-2 space-y-1">
          {tasks.map((task) => {
            const done = isTaskDone(task);
            const assignee = profileById.get(task.assignee_id ?? "");
            return (
              <li
                key={task.id}
                className="flex items-center gap-2 rounded-lg bg-background px-2 py-1 text-xs shadow-sm"
              >
                {done ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                ) : (
                  <Clock3 className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                )}
                <span className={`min-w-0 flex-1 truncate ${done ? "line-through" : ""}`}>
                  {task.title}
                </span>
                <span className="shrink-0 text-muted-foreground">
                  {assignee?.full_name || assignee?.email || "Sem responsável"}
                  {task.due_date ? ` · ${format(new Date(task.due_date), "dd/MM")}` : ""}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

/** Membros de cada departamento: preenchem os participantes das reuniões novas. */
function DepartmentsDialog({
  open,
  onOpenChange,
  departments,
  members,
  profiles,
  recurring_meetings,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departments: RecurringMeetingDepartment[];
  members: DepartmentMember[];
  profiles: Profile[];
  recurring_meetings: RecurringMeeting[];
}) {
  const queryClient = useQueryClient();
  const { user, activeWorkspace } = useAuth();
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [renaming, setRenaming] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<RecurringMeetingDepartment | null>(null);
  const [deleting, setDeleting] = useState(false);
  const targetMeetings = deleteTarget
    ? recurring_meetings.filter(
        (recurringMeeting) => recurringMeeting.department_id === deleteTarget.id,
      )
    : [];

  const createDepartment = async () => {
    const name = newName.trim();
    if (!name) return;
    if (isOffline()) return toast.error("Conecte-se à internet para criar o departamento.");
    if (
      departments.some(
        (department) =>
          department.name.trim().toLocaleLowerCase("pt-BR") === name.toLocaleLowerCase("pt-BR"),
      )
    )
      return toast.error("Já existe um departamento com esse nome.");
    setCreating(true);
    const { error } = await (supabase.from("recurring_meeting_departments" as any) as any).insert({
      name,
      workspace_id: activeWorkspace?.id,
      created_by: user?.id,
      position: Math.max(0, ...departments.map((department) => department.position)) + 1,
    });
    setCreating(false);
    if (error) return toast.error(error.message);
    setNewName("");
    await queryClient.invalidateQueries({ queryKey: ["recurringMeeting-departments"] });
    toast.success("Departamento criado");
  };

  // Reuniões chamadas "Reunião — <nome antigo>" acompanham o novo nome.
  const renameDepartment = async (department: RecurringMeetingDepartment) => {
    const name = editName.trim();
    if (!name || name === department.name) return setEditingId(null);
    if (isOffline()) return toast.error("Conecte-se à internet para renomear o departamento.");
    if (
      departments.some(
        (other) =>
          other.id !== department.id &&
          other.name.trim().toLocaleLowerCase("pt-BR") === name.toLocaleLowerCase("pt-BR"),
      )
    )
      return toast.error("Já existe um departamento com esse nome.");
    setRenaming(true);
    const { error } = await (supabase.from("recurring_meeting_departments" as any) as any)
      .update({ name })
      .eq("id", department.id);
    if (error) {
      setRenaming(false);
      return toast.error(error.message);
    }
    const oldTitle = `Reunião — ${department.name}`;
    const meetingsToRename = recurring_meetings.filter(
      (recurringMeeting) =>
        recurringMeeting.department_id === department.id && recurringMeeting.title === oldTitle,
    );
    if (meetingsToRename.length > 0) {
      const { error: titleError } = await (supabase.from("recurring_meetings" as any) as any)
        .update({ title: `Reunião — ${name}` })
        .in(
          "id",
          meetingsToRename.map((recurringMeeting) => recurringMeeting.id),
        );
      if (titleError) toast.error(`Departamento renomeado, mas a reunião manteve o nome antigo.`);
    }
    setRenaming(false);
    setEditingId(null);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-departments"] }),
      queryClient.invalidateQueries({ queryKey: ["recurring_meetings"] }),
    ]);
    toast.success("Departamento renomeado");
  };

  // As reuniões do departamento saem junto; as tarefas já geradas continuam existindo.
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    if (isOffline()) return toast.error("Conecte-se à internet para excluir o departamento.");
    setDeleting(true);
    if (targetMeetings.length > 0) {
      const { error } = await (supabase.from("recurring_meetings" as any) as any).delete().in(
        "id",
        targetMeetings.map((recurringMeeting) => recurringMeeting.id),
      );
      if (error) {
        setDeleting(false);
        return toast.error(error.message);
      }
    }
    const { error } = await (supabase.from("recurring_meeting_departments" as any) as any)
      .delete()
      .eq("id", deleteTarget.id);
    setDeleting(false);
    if (error) return toast.error(error.message);
    setDeleteTarget(null);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-departments"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-department-members"] }),
      queryClient.invalidateQueries({ queryKey: ["recurring_meetings"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-occurrences"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-agenda-items"] }),
    ]);
    toast.success("Departamento excluído");
  };

  const toggleMember = async (departmentId: string, userId: string, isMember: boolean) => {
    if (isOffline()) return toast.error("Conecte-se à internet para alterar os membros.");
    setSavingKey(`${departmentId}:${userId}`);
    const table = supabase.from("recurring_meeting_department_members" as any) as any;
    const { error } = isMember
      ? await table.delete().eq("department_id", departmentId).eq("user_id", userId)
      : await table.insert({ department_id: departmentId, user_id: userId });
    setSavingKey(null);
    if (error) return toast.error(error.message);
    await queryClient.invalidateQueries({ queryKey: ["recurringMeeting-department-members"] });
  };

  const updateDepartmentColor = async (departmentId: string, color: string) => {
    if (isOffline()) return toast.error("Conecte-se à internet para alterar a cor.");
    setSavingKey(`${departmentId}:color`);
    const { error } = await (supabase.from("recurring_meeting_departments" as any) as any)
      .update({ color })
      .eq("id", departmentId);
    setSavingKey(null);
    if (error) return toast.error(error.message);
    await queryClient.invalidateQueries({ queryKey: ["recurringMeeting-departments"] });
  };

  const moveDepartment = async (index: number, direction: -1 | 1) => {
    const otherIndex = index + direction;
    if (otherIndex < 0 || otherIndex >= departments.length) return;
    if (isOffline()) return toast.error("Conecte-se à internet para reordenar.");
    const current = departments[index];
    const other = departments[otherIndex];
    setSavingKey(`${current.id}:position`);
    const table = supabase.from("recurring_meeting_departments" as any) as any;
    const [currentResult, otherResult] = await Promise.all([
      table.update({ position: other.position }).eq("id", current.id),
      table.update({ position: current.position }).eq("id", other.id),
    ]);
    setSavingKey(null);
    const error = currentResult.error ?? otherResult.error;
    if (error) return toast.error(error.message);
    await queryClient.invalidateQueries({ queryKey: ["recurringMeeting-departments"] });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Departamentos</DialogTitle>
          <DialogDescription>
            Os membros de cada departamento entram automaticamente como participantes ao criar uma
            reunião desse departamento. Você ainda pode ajustar os participantes de cada reunião.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            void createDepartment();
          }}
        >
          <Input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            placeholder="Nome do novo departamento"
            aria-label="Nome do novo departamento"
            disabled={creating}
          />
          <Button type="submit" disabled={creating || !newName.trim()} className="shrink-0">
            {creating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Criar
          </Button>
        </form>
        {departments.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Nenhum departamento ainda. Crie o primeiro acima.
          </p>
        ) : (
          <ul className="space-y-2">
            {departments.map((department, departmentIndex) => {
              const memberIds = members
                .filter((member) => member.department_id === department.id)
                .map((member) => member.user_id);
              return (
                <li key={department.id} className="rounded-xl border p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {editingId === department.id ? (
                      <form
                        className="flex min-w-0 flex-1 items-center gap-2"
                        onSubmit={(event) => {
                          event.preventDefault();
                          void renameDepartment(department);
                        }}
                      >
                        <Input
                          value={editName}
                          onChange={(event) => setEditName(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Escape") {
                              event.stopPropagation();
                              setEditingId(null);
                            }
                          }}
                          aria-label="Novo nome do departamento"
                          className="h-8"
                          disabled={renaming}
                          autoFocus
                        />
                        <Button
                          type="submit"
                          size="sm"
                          className="h-8 shrink-0"
                          disabled={renaming || !editName.trim()}
                        >
                          {renaming && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                          Salvar
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="h-8 shrink-0"
                          disabled={renaming}
                          onClick={() => setEditingId(null)}
                        >
                          Cancelar
                        </Button>
                      </form>
                    ) : (
                      <span className="flex min-w-0 items-center gap-2 font-medium">
                        <span
                          className="h-3 w-3 shrink-0 rounded-sm"
                          style={{ backgroundColor: department.color || "#64748b" }}
                        />
                        <span className="truncate">{department.name}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 shrink-0 text-muted-foreground"
                          aria-label={`Renomear o departamento ${department.name}`}
                          title="Renomear departamento"
                          onClick={() => {
                            setEditingId(department.id);
                            setEditName(department.name);
                          }}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </span>
                    )}
                    <div className="flex items-center gap-1">
                      <label
                        className="grid h-7 w-7 cursor-pointer place-items-center overflow-hidden rounded-md border"
                        title="Alterar cor do departamento"
                      >
                        <input
                          type="color"
                          value={department.color || "#64748b"}
                          className="h-9 w-9 cursor-pointer border-0 bg-transparent p-0"
                          disabled={savingKey === `${department.id}:color`}
                          onChange={(event) =>
                            void updateDepartmentColor(department.id, event.target.value)
                          }
                          aria-label={`Cor do departamento ${department.name}`}
                        />
                      </label>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        disabled={
                          departmentIndex === 0 || savingKey === `${department.id}:position`
                        }
                        onClick={() => void moveDepartment(departmentIndex, -1)}
                        title="Mover departamento para cima"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        disabled={
                          departmentIndex === departments.length - 1 ||
                          savingKey === `${department.id}:position`
                        }
                        onClick={() => void moveDepartment(departmentIndex, 1)}
                        title="Mover departamento para baixo"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button size="sm" variant="outline" className="h-7">
                            <Users className="mr-1.5 h-3.5 w-3.5" /> Membros ({memberIds.length})
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-72 p-1">
                          <div className="max-h-64 overflow-y-auto">
                            {profiles.map((profile) => {
                              const isMember = memberIds.includes(profile.id);
                              return (
                                <label
                                  key={profile.id}
                                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                                >
                                  <Checkbox
                                    checked={isMember}
                                    disabled={savingKey === `${department.id}:${profile.id}`}
                                    onCheckedChange={() =>
                                      void toggleMember(department.id, profile.id, isMember)
                                    }
                                  />
                                  <span className="truncate">
                                    {profile.full_name || profile.email}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </PopoverContent>
                      </Popover>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        aria-label={`Excluir o departamento ${department.name}`}
                        title="Excluir departamento"
                        onClick={() => setDeleteTarget(department)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {memberIds.length > 0
                      ? memberIds
                          .map((id) => {
                            const profile = profiles.find((item) => item.id === id);
                            return profile?.full_name || profile?.email;
                          })
                          .filter(Boolean)
                          .join(", ")
                      : "Sem membros."}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </DialogContent>
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open && !deleting) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir o departamento {deleteTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2">
                {targetMeetings.length > 0 ? (
                  <>
                    <p>
                      {targetMeetings.length === 1
                        ? "A reunião recorrente deste departamento também será excluída, com as reuniões agendadas e as pautas:"
                        : `As ${targetMeetings.length} reuniões recorrentes deste departamento também serão excluídas, com as reuniões agendadas e as pautas:`}
                    </p>
                    <ul className="list-disc pl-5 font-medium text-foreground">
                      {targetMeetings.map((recurringMeeting) => (
                        <li key={recurringMeeting.id}>{recurringMeeting.title}</li>
                      ))}
                    </ul>
                    <p>As tarefas já geradas continuam existindo.</p>
                  </>
                ) : (
                  <p>
                    O departamento não tem reuniões. Os membros cadastrados nele serão removidos.
                  </p>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(event) => {
                event.preventDefault();
                void confirmDelete();
              }}
            >
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {deleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="grid place-items-center px-6 py-16 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Settings2 className="h-6 w-6" />
      </span>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}

function formatDate(value: string) {
  return format(new Date(`${value.slice(0, 10)}T12:00:00`), "dd/MM/yyyy");
}

function formatRecurrence(recurringMeeting: RecurringMeeting) {
  if (recurringMeeting.frequency === "daily")
    return recurringMeeting.interval_count === 1
      ? recurringMeeting.business_days_only
        ? "Todos os dias úteis"
        : "Todos os dias"
      : `A cada ${recurringMeeting.interval_count} dias`;
  if (recurringMeeting.frequency === "weekly") {
    const labels = ["", "seg", "ter", "qua", "qui", "sex", "sáb", "dom"];
    return `${recurringMeeting.interval_count === 1 ? "Semanal" : `A cada ${recurringMeeting.interval_count} semanas`} · ${recurringMeeting.days_of_week.map((day) => labels[day]).join(", ")}`;
  }
  if (recurringMeeting.month_rule === "last_day")
    return recurringMeeting.interval_count === 1
      ? "Último dia do mês"
      : `Último dia a cada ${recurringMeeting.interval_count} meses`;
  if (recurringMeeting.month_rule === "last_business_day")
    return recurringMeeting.interval_count === 1
      ? "Último dia útil do mês"
      : `Último dia útil a cada ${recurringMeeting.interval_count} meses`;
  return `${recurringMeeting.interval_count === 1 ? "Mensal" : `A cada ${recurringMeeting.interval_count} meses`} · dia${recurringMeeting.days_of_month.length > 1 ? "s" : ""} ${recurringMeeting.days_of_month.join(" e ")}`;
}
