/* eslint-disable @typescript-eslint/no-explicit-any -- Supabase types are regenerated after the migration is applied. */
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  CalendarClock,
  Check,
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
  Video,
  ExternalLink,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { enqueueOfflineOperation, isOffline } from "@/lib/offline-sync";
import {
  useAssignableProfiles,
  useClients,
  useGoogleCalendarConnection,
  useTaskStatuses,
  type Client,
  type Profile,
  type Task,
} from "@/hooks/use-data";
import { useWorkspaceTasks } from "@/hooks/use-workspace-tasks";
import {
  useAllRecurringMeetingTaskTemplates,
  useMeetingCalendarEvents,
  useRecurringMeetingAgendaItems,
  useRecurringMeetingAgendaPreview,
  useRecurringMeetingOccurrences,
  useRecurringMeetingParticipants,
  useRecurringMeetings,
  type AgendaItemResult,
  type RecurringMeeting,
  type RecurringMeetingAgendaItem,
  type RecurringMeetingOccurrence,
  type MeetingCalendarEvent,
} from "@/hooks/use-meetings";
import { RecurringMeetingDialog } from "@/components/RecurringMeetingDialog";
import { MeetingMinutesPanel } from "@/components/AgendaEventDialog";
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

/** Paleta visual independente para distinguir os clientes na agenda. */
const CLIENT_PALETTE = ["#5D6E3E", "#EC643F", "#B7821F", "#3E6E6A", "#7B5A7A", "#626161"];

function clientColor(client: Client | null, order: Map<string, number>) {
  if (!client) return "#9a9a93";
  return CLIENT_PALETTE[(order.get(client.id) ?? 0) % CLIENT_PALETTE.length];
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
  const { data: meetingCalendarEvents = [], isLoading: loadingCalendarEvents } =
    useMeetingCalendarEvents();
  const { data: googleConnection } = useGoogleCalendarConnection();
  const calendarEventByOccurrence = useMemo(
    () =>
      new Map(meetingCalendarEvents.map((event) => [event.recurring_meeting_occurrence_id, event])),
    [meetingCalendarEvents],
  );
  const { data: agendaItems = [] } = useRecurringMeetingAgendaItems();
  const { data: participants = [] } = useRecurringMeetingParticipants();
  const { data: taskTemplates = [] } = useAllRecurringMeetingTaskTemplates();
  const { data: profiles = [] } = useAssignableProfiles();
  const { data: clients = [] } = useClients();
  const { data: taskStatuses = [] } = useTaskStatuses();
  const { data: tasks = [] } = useWorkspaceTasks();
  const cycledWorkspace = useRef<string | null>(null);
  const googleSyncAttemptedFor = useRef<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRecurringMeeting, setEditingRecurringMeeting] = useState<RecurringMeeting | null>(
    null,
  );
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [clientFilter, setClientFilter] = useState("all");
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

  useEffect(() => {
    if (
      dialogOpen ||
      meetingId ||
      !user?.id ||
      !activeWorkspace?.id ||
      !googleConnection ||
      loadingCalendarEvents ||
      isOffline() ||
      !meetingCalendarEvents.some(
        (event) =>
          (event.created_by === user.id || event.updated_by === user.id) &&
          (event.sync_status === "pending" || event.sync_status === "error"),
      )
    )
      return;
    const key = `${user.id}:${activeWorkspace.id}`;
    if (googleSyncAttemptedFor.current === key) return;
    googleSyncAttemptedFor.current = key;
    void (async () => {
      const { data, error } = await supabase.functions.invoke("google-calendar-sync", { body: {} });
      if (error || !data?.ok) {
        return;
      }
      await queryClient.invalidateQueries({ queryKey: ["meeting-calendar-events"] });
    })();
  }, [
    user?.id,
    activeWorkspace?.id,
    googleConnection,
    dialogOpen,
    meetingId,
    loadingCalendarEvents,
    meetingCalendarEvents,
    queryClient,
  ]);

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
  const clientById = useMemo(
    () => new Map(clients.map((client) => [client.id, client])),
    [clients],
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
      const client = clientById.get(recurringMeeting.client_id ?? "");
      if (clientFilter !== "all" && recurringMeeting.client_id !== clientFilter) return false;
      if (
        participantFilter !== "all" &&
        recurringMeeting.assignee_id !== participantFilter &&
        !(participantsByRecurringMeeting.get(recurringMeeting.id) ?? []).includes(participantFilter)
      )
        return false;
      if (!term) return true;
      return `${recurringMeeting.title} ${client?.name ?? ""}`
        .toLocaleLowerCase("pt-BR")
        .includes(term);
    });
  }, [
    clientById,
    clientFilter,
    recurring_meetings,
    participantFilter,
    participantsByRecurringMeeting,
    search,
  ]);

  const clientOrder = useMemo(() => {
    const sorted = [...clients].sort((first, second) =>
      first.name.localeCompare(second.name, "pt-BR"),
    );
    return new Map(sorted.map((client, index) => [client.id, index]));
  }, [clients]);

  const routinesPerClient = useMemo(() => {
    const counts = new Map<string, number>();
    recurring_meetings.forEach((recurringMeeting) => {
      const key = recurringMeeting.client_id ?? "none";
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
          (clientOrder.get(first.recurringMeeting.client_id ?? "") ?? 99) -
            (clientOrder.get(second.recurringMeeting.client_id ?? "") ?? 99),
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
  }, [clientOrder, recurringMeetingById, occurrences, today, visibleRecurringMeetings]);

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
            Reuniões por cliente: pauta, resultado de cada item e tarefas geradas.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            className="h-9 rounded-full px-4 shadow-sm"
            onClick={() => {
              setEditingRecurringMeeting(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Nova reunião
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
            placeholder="Buscar reunião ou cliente..."
            className="pl-9"
          />
        </div>
        <Select value={clientFilter} onValueChange={setClientFilter}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Todos os clientes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os clientes</SelectItem>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
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
          <TabsTrigger value="settings">Configurações</TabsTrigger>
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
              description="Crie uma reunião para um cliente e monte a pauta dela."
            />
          ) : overdueMeetings.length === 0 && upcomingDates.length === 0 ? (
            <EmptyState
              title="Nenhuma reunião encontrada"
              description="Ajuste a busca ou os filtros, ou ative uma reunião pausada em Configurações."
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
                      client={clientById.get(recurringMeeting.client_id ?? "") ?? null}
                      color={clientColor(
                        clientById.get(recurringMeeting.client_id ?? "") ?? null,
                        clientOrder,
                      )}
                      showTitle={
                        (routinesPerClient.get(recurringMeeting.client_id ?? "none") ?? 0) > 1
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
                        client={clientById.get(recurringMeeting.client_id ?? "") ?? null}
                        color={clientColor(
                          clientById.get(recurringMeeting.client_id ?? "") ?? null,
                          clientOrder,
                        )}
                        showTitle={
                          (routinesPerClient.get(recurringMeeting.client_id ?? "none") ?? 0) > 1
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
              title="Nenhuma reunião configurada"
              description="Cadastre a primeira reunião de um cliente."
            />
          ) : (
            <div className="grid gap-3 lg:grid-cols-2">
              {visibleRecurringMeetings.map((recurringMeeting) => {
                const client = clientById.get(recurringMeeting.client_id ?? "");
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
                              backgroundColor: clientColor(client ?? null, clientOrder),
                            }}
                          />
                          <h3 className="truncate font-semibold">{recurringMeeting.title}</h3>
                          {!recurringMeeting.is_active && <Badge variant="outline">Pausada</Badge>}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {client?.name ?? "Sem cliente"} · {formatRecurrence(recurringMeeting)}
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
      {meeting && meetingRecurringMeeting ? (
        <MeetingDialog
          open
          onOpenChange={(open) => {
            if (!open) setMeetingId(null);
          }}
          occurrence={meeting}
          recurringMeeting={meetingRecurringMeeting}
          calendarEvent={calendarEventByOccurrence.get(meeting.id) ?? null}
          client={clientById.get(meetingRecurringMeeting.client_id ?? "") ?? null}
          items={itemsByOccurrence.get(meeting.id) ?? []}
          tasks={tasks}
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
  client,
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
  client: Client | null;
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
            {client?.name ?? recurringMeeting.title}
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
  calendarEvent,
  client,
  items,
  tasks,
  tasksByItem,
  participantIds,
  profileById,
  isTaskDone,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  occurrence: RecurringMeetingOccurrence;
  recurringMeeting: RecurringMeeting;
  calendarEvent: MeetingCalendarEvent | null;
  client: Client | null;
  items: RecurringMeetingAgendaItem[];
  tasks: Task[];
  tasksByItem: Map<string, Task[]>;
  participantIds: string[];
  profileById: Map<string, Profile>;
  isTaskDone: (task: Task) => boolean;
}) {
  const queryClient = useQueryClient();
  const prepared = Boolean(occurrence.agenda_prepared_at);
  const { data: importedNotes = [] } = useQuery({
    queryKey: ["meeting-ata-notes", recurringMeeting.id, occurrence.id],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await (supabase.from("client_notes" as any) as any)
        .select("id, title, content, created_at, recurring_meeting_occurrence_id")
        .eq("recurring_meeting_id", recurringMeeting.id)
        .or(
          `recurring_meeting_occurrence_id.eq.${occurrence.id},recurring_meeting_occurrence_id.is.null`,
        )
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Array<{
        id: string;
        title: string;
        content: string;
        created_at: string;
        recurring_meeting_occurrence_id: string | null;
      }>;
    },
  });
  const { data: preview = [], isLoading: loadingPreview } = useRecurringMeetingAgendaPreview(
    prepared ? null : occurrence.id,
  );
  const [busy, setBusy] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [taskSearch, setTaskSearch] = useState("");
  const [taskPickerOpen, setTaskPickerOpen] = useState(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [taskFor, setTaskFor] = useState<RecurringMeetingAgendaItem | null>(null);
  const [rescheduling, setRescheduling] = useState(false);
  const [newDate, setNewDate] = useState(occurrence.due_date);
  const closed = isClosed(occurrence);
  const eligibleTasks = tasks.filter(
    (task) =>
      task.client_id === recurringMeeting.client_id &&
      task.workspace_id === recurringMeeting.workspace_id &&
      task.deleted_at === null &&
      task.archived_at === null &&
      !isTaskDone(task) &&
      !task.recurring_meeting_agenda_item_id &&
      !task.recurring_meeting_occurrence_id &&
      !task.recurring_meeting_agenda_template_id,
  );
  const visibleTasks = eligibleTasks.filter((task) =>
    task.title.toLocaleLowerCase("pt-BR").includes(taskSearch.trim().toLocaleLowerCase("pt-BR")),
  );

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
      await Promise.all([refresh(), queryClient.invalidateQueries({ queryKey: ["tasks"] })]);
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

  const linkTasks = () =>
    run(async () => {
      if (selectedTaskIds.length === 0) return;
      const { error } = await (supabase as any).rpc("link_existing_tasks_to_meeting", {
        target_occurrence_id: occurrence.id,
        target_task_ids: selectedTaskIds,
      });
      if (error) throw error;
      setTaskPickerOpen(false);
      setTaskSearch("");
      setSelectedTaskIds([]);
      await Promise.all([refresh(), queryClient.invalidateQueries({ queryKey: ["tasks"] })]);
      toast.success("Tarefas adicionadas à pauta");
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
      if (recurringMeeting.add_to_calendar) {
        const { data, error: syncError } = await supabase.functions.invoke("google-calendar-sync", {
          body: {},
        });
        if (syncError || !data?.ok || data?.pushErrors?.length)
          toast.error(
            data?.pushErrors?.[0] ||
              data?.error ||
              syncError?.message ||
              "Não foi possível atualizar a Agenda.",
          );
        await queryClient.invalidateQueries({ queryKey: ["meeting-calendar-events"] });
      }
      toast.success(`Reunião remarcada para ${formatDate(newDate)}.`);
    });

  const syncMeet = () =>
    run(async () => {
      const { data, error } = await supabase.functions.invoke("google-calendar-sync", { body: {} });
      if (error || !data?.ok || data?.pushErrors?.length)
        throw new Error(
          data?.pushErrors?.[0] ||
            data?.error ||
            error?.message ||
            "Falha ao sincronizar o Google Meet.",
        );
      await queryClient.invalidateQueries({ queryKey: ["meeting-calendar-events"] });
      toast.success("Google Meet sincronizado");
    });

  const restoreCalendarEvent = () =>
    run(async () => {
      const { error } = await (supabase as any).rpc("restore_meeting_calendar_event", {
        target_occurrence_id: occurrence.id,
      });
      if (error) throw error;
      await Promise.all([
        refresh(),
        queryClient.invalidateQueries({ queryKey: ["meeting-calendar-events"] }),
        queryClient.invalidateQueries({ queryKey: ["agenda_events"] }),
      ]);
      if (!recurringMeeting.google_calendar_id) {
        toast.success("Compromisso restaurado na Agenda");
        return;
      }
      const { data, error: syncError } = await supabase.functions.invoke("google-calendar-sync", {
        body: {},
      });
      if (syncError || !data?.ok || data?.pushErrors?.length)
        toast.error(
          data?.pushErrors?.[0] ||
            data?.error ||
            syncError?.message ||
            "Não foi possível sincronizar a Agenda.",
        );
      else toast.success("Compromisso restaurado na Agenda");
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
                {client?.name ?? "Sem cliente"} ·{" "}
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

          {importedNotes.map((note) => (
            <details key={note.id} className="rounded-xl border bg-muted/20 p-3">
              <summary className="cursor-pointer text-sm font-medium">
                Ata importada: {note.title}
              </summary>
              <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
                {note.content}
              </p>
            </details>
          ))}

          {recurringMeeting.add_to_calendar && (
            <div className="space-y-3 rounded-xl border bg-muted/20 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-sm font-medium">
                  {recurringMeeting.create_google_meet ? (
                    <Video className="h-4 w-4" />
                  ) : (
                    <CalendarClock className="h-4 w-4" />
                  )}
                  {recurringMeeting.create_google_meet
                    ? "Google Meet desta reunião"
                    : "Compromisso na Agenda"}
                </span>
                {occurrence.calendar_event_disabled ? (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={busy}
                    onClick={() => void restoreCalendarEvent()}
                  >
                    Restaurar na Agenda
                  </Button>
                ) : calendarEvent?.meeting_url ? (
                  <div className="flex flex-wrap gap-2">
                    <Button asChild size="sm" variant="outline">
                      <a href={calendarEvent.meeting_url} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-1 h-3.5 w-3.5" /> Entrar
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        void navigator.clipboard
                          .writeText(calendarEvent.meeting_url!)
                          .then(() => toast.success("Link copiado"))
                          .catch(() => toast.error("Não foi possível copiar o link."))
                      }
                    >
                      <Copy className="mr-1 h-3.5 w-3.5" /> Copiar link
                    </Button>
                  </div>
                ) : calendarEvent && recurringMeeting.create_google_meet ? (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={busy}
                    onClick={() => void syncMeet()}
                  >
                    Sincronizar Google Meet
                  </Button>
                ) : null}
              </div>
              {!occurrence.calendar_event_disabled && !calendarEvent?.meeting_url && (
                <p className="text-xs text-muted-foreground">
                  {calendarEvent?.sync_error ||
                    (calendarEvent
                      ? recurringMeeting.create_google_meet
                        ? "O link ainda está sendo criado pelo Google."
                        : "Compromisso criado na Agenda."
                      : "O compromisso será preparado quando esta data entrar nos próximos 30 dias.")}
                </p>
              )}
              {!occurrence.calendar_event_disabled &&
                calendarEvent?.meeting_url &&
                recurringMeeting.create_google_meet &&
                recurringMeeting.auto_smart_notes && <MeetingMinutesPanel event={calendarEvent} />}
            </div>
          )}

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
              <div className="space-y-2 border-t bg-muted/20 px-3 py-2">
                <div className="flex gap-2">
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
                <Popover
                  open={taskPickerOpen}
                  onOpenChange={(open) => {
                    setTaskPickerOpen(open);
                    if (!open) setSelectedTaskIds([]);
                  }}
                >
                  <PopoverTrigger asChild>
                    <Button type="button" size="sm" variant="outline" disabled={busy}>
                      <Plus className="mr-1 h-3.5 w-3.5" /> Vincular tarefa existente
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-[min(24rem,calc(100vw-3rem))] p-2">
                    <Input
                      value={taskSearch}
                      onChange={(event) => setTaskSearch(event.target.value)}
                      placeholder="Buscar tarefa deste cliente..."
                      aria-label="Buscar tarefa para incluir na pauta"
                      className="mb-2 h-8"
                      autoFocus
                    />
                    <div className="max-h-60 overflow-y-auto">
                      {visibleTasks.length === 0 ? (
                        <p className="px-2 py-3 text-center text-sm text-muted-foreground">
                          {eligibleTasks.length === 0
                            ? "Nenhuma tarefa em aberto disponível para este cliente."
                            : "Nenhuma tarefa encontrada."}
                        </p>
                      ) : (
                        visibleTasks.map((task) => (
                          <button
                            key={task.id}
                            type="button"
                            aria-pressed={selectedTaskIds.includes(task.id)}
                            className="flex w-full items-start gap-2 rounded-md px-2 py-2 text-left hover:bg-accent"
                            disabled={busy}
                            onClick={() =>
                              setSelectedTaskIds((current) =>
                                current.includes(task.id)
                                  ? current.filter((id) => id !== task.id)
                                  : [...current, task.id],
                              )
                            }
                          >
                            <Check
                              className={`mt-0.5 h-4 w-4 shrink-0 ${selectedTaskIds.includes(task.id) ? "opacity-100" : "opacity-0"}`}
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-medium">
                                {task.title}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {task.due_date
                                  ? `Prazo: ${formatDate(task.due_date)}`
                                  : "Sem prazo"}
                                {task.assignee_id
                                  ? ` · ${profileById.get(task.assignee_id)?.full_name || profileById.get(task.assignee_id)?.email || "Responsável"}`
                                  : ""}
                              </span>
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      className="mt-2 w-full"
                      disabled={busy || selectedTaskIds.length === 0}
                      onClick={() => void linkTasks()}
                    >
                      Vincular{" "}
                      {selectedTaskIds.length > 0 ? `(${selectedTaskIds.length})` : "tarefas"}
                    </Button>
                  </PopoverContent>
                </Popover>
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
            disabled={disabled || (result === "done" && tasks.length > 0)}
            onClick={onDone}
            title={
              result === "done" && tasks.length > 0
                ? "Reabra a tarefa para reabrir esta pauta"
                : undefined
            }
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
  if (!recurringMeeting.is_recurring)
    return `Reunião única · ${formatDate(recurringMeeting.start_date)}`;
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
