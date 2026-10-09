/* eslint-disable @typescript-eslint/no-explicit-any -- Supabase types are regenerated after the migration is applied. */
import { useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Check, ChevronDown, FileUp, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  useAgendaCalendarSources,
  useAssignableProfiles,
  useClients,
  useColumns,
  useGoogleCalendarConnection,
  hasGoogleMeetPermissions,
  useTaskStatuses,
} from "@/hooks/use-data";
import { useWorkspaceTasks } from "@/hooks/use-workspace-tasks";
import {
  useRecurringMeetingParticipants,
  useRecurringMeetingTaskTemplates,
  type AgendaCadence,
  type RecurringMeeting,
  type RecurringMeetingFrequency,
  type RecurringMeetingMonthRule,
} from "@/hooks/use-meetings";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { enqueueOfflineOperation, isOffline } from "@/lib/offline-sync";
import { ImportAtaContent, type ImportedAtaDraft } from "@/components/ImportAtaContent";
import { meetingDurationMinutes, meetingEndTime } from "@/lib/meeting-time";

interface RecurringMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (meetingId: string, startDate: string) => void;
  recurringMeeting?: RecurringMeeting | null;
}

const weekDays = [
  { value: 1, label: "Seg" },
  { value: 2, label: "Ter" },
  { value: 3, label: "Qua" },
  { value: 4, label: "Qui" },
  { value: 5, label: "Sex" },
  { value: 6, label: "Sáb" },
  { value: 7, label: "Dom" },
];

const cadenceOptions: Array<{ value: AgendaCadence; label: string }> = [
  { value: "every", label: "Toda reunião" },
  { value: "biweekly", label: "A cada 2 semanas" },
  { value: "first_of_month", label: "1ª reunião do mês" },
  { value: "last_of_month", label: "Última reunião do mês" },
  { value: "until_day", label: "Até o dia… do mês" },
];

const todayValue = () => new Date().toISOString().slice(0, 10);

/** Pauta padrão em edição no formulário; `id` existe apenas para as já salvas. */
type AgendaDraft = {
  key: string;
  id?: string;
  title: string;
  cadence: AgendaCadence;
  cadenceDay: number | null;
};

export function RecurringMeetingDialog({
  open,
  onOpenChange,
  onCreated,
  recurringMeeting,
}: RecurringMeetingDialogProps) {
  const queryClient = useQueryClient();
  const { user, activeWorkspace } = useAuth();
  const { data: profiles = [] } = useAssignableProfiles();
  const { data: clients = [] } = useClients();
  const { data: columns = [] } = useColumns();
  const { data: statuses = [] } = useTaskStatuses();
  const { data: tasks = [] } = useWorkspaceTasks();
  const { data: calendarSources = [] } = useAgendaCalendarSources();
  const { data: googleConnection } = useGoogleCalendarConnection();
  const canCreateGoogleMeet = hasGoogleMeetPermissions(googleConnection);
  const defaultCalendarId =
    calendarSources.find((source) => source.is_shared)?.google_calendar_id ??
    calendarSources[0]?.google_calendar_id ??
    "";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientOpen, setClientOpen] = useState(false);
  const [clientSearch, setClientSearch] = useState("");
  const [agendaItems, setAgendaItems] = useState<AgendaDraft[]>([]);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [taskSearch, setTaskSearch] = useState("");
  const [taskPickerOpen, setTaskPickerOpen] = useState(false);
  const [focusAgendaKey, setFocusAgendaKey] = useState<string | null>(null);
  const agendaLoadedFor = useRef<string | null>(null);
  const { data: savedTemplates } = useRecurringMeetingTaskTemplates(
    open ? recurringMeeting?.id : null,
  );
  const [assigneeId, setAssigneeId] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState<RecurringMeetingFrequency>("weekly");
  const [intervalCount, setIntervalCount] = useState(1);
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([1]);
  const [monthRule, setMonthRule] = useState<RecurringMeetingMonthRule>("specific_days");
  const [daysOfMonth, setDaysOfMonth] = useState("1");
  const [businessDaysOnly, setBusinessDaysOnly] = useState(false);
  const [startDate, setStartDate] = useState(todayValue());
  const [endDate, setEndDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [addToCalendar, setAddToCalendar] = useState(false);
  const [createGoogleMeet, setCreateGoogleMeet] = useState(false);
  const [autoSmartNotes, setAutoSmartNotes] = useState(true);
  const [autoTranscription, setAutoTranscription] = useState(false);
  const [googleCalendarId, setGoogleCalendarId] = useState("");
  const [manualMeetingUrl, setManualMeetingUrl] = useState("");
  const [reminderDays, setReminderDays] = useState(2);
  const { data: allParticipants } = useRecurringMeetingParticipants();
  const [participantIds, setParticipantIds] = useState<string[]>([]);
  const participantsLoadedFor = useRef<string | null>(null);
  const [priority, setPriority] = useState<RecurringMeeting["priority"]>("medium");
  const [columnId, setColumnId] = useState("");
  const [statusId, setStatusId] = useState("");
  const openStatuses = statuses.filter((status) => !status.is_completed);
  const selectedColumnId = columnId || columns[0]?.id || "";
  const selectedStatusId = statusId || openStatuses[0]?.id || "";
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState<"meeting" | "import">("meeting");
  const [importedAta, setImportedAta] = useState<ImportedAtaDraft | null>(null);
  const [pendingImportMeetingId, setPendingImportMeetingId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setView("meeting");
    setImportedAta(null);
    setPendingImportMeetingId(null);
    setTitle(recurringMeeting?.title ?? "");
    setDescription(recurringMeeting?.description ?? "");
    setClientId(recurringMeeting?.client_id ?? "");
    setAssigneeId(recurringMeeting?.assignee_id ?? "");
    setIsRecurring(recurringMeeting?.is_recurring ?? false);
    setFrequency(recurringMeeting?.frequency ?? "weekly");
    setIntervalCount(recurringMeeting?.interval_count ?? 1);
    setDaysOfWeek(recurringMeeting?.days_of_week?.length ? recurringMeeting.days_of_week : [1]);
    setMonthRule(recurringMeeting?.month_rule ?? "specific_days");
    setDaysOfMonth(
      recurringMeeting?.days_of_month?.length ? recurringMeeting.days_of_month.join(", ") : "1",
    );
    setBusinessDaysOnly(recurringMeeting?.business_days_only ?? false);
    setStartDate(recurringMeeting?.start_date ?? todayValue());
    setEndDate(recurringMeeting?.end_date ?? "");
    const savedStartTime = recurringMeeting?.due_time?.slice(0, 5) ?? "";
    setDueTime(savedStartTime);
    setEndTime(
      savedStartTime
        ? meetingEndTime(savedStartTime, recurringMeeting?.duration_minutes ?? 60)
        : "",
    );
    setAddToCalendar(
      recurringMeeting?.add_to_calendar ?? recurringMeeting?.create_google_meet ?? false,
    );
    setCreateGoogleMeet(recurringMeeting?.create_google_meet ?? false);
    setAutoSmartNotes(recurringMeeting?.auto_smart_notes ?? true);
    setAutoTranscription(recurringMeeting?.auto_transcription ?? false);
    setGoogleCalendarId(recurringMeeting?.google_calendar_id ?? "");
    setManualMeetingUrl(recurringMeeting?.manual_meeting_url ?? "");
    setReminderDays(recurringMeeting?.reminder_days_before ?? 2);
    setParticipantIds([]);
    participantsLoadedFor.current = null;
    setPriority(recurringMeeting?.priority ?? "medium");
    setColumnId(recurringMeeting?.column_id ?? "");
    setStatusId(recurringMeeting?.status_id ?? "");
    setIsActive(recurringMeeting?.is_active ?? true);
    setAgendaItems([]);
    setSelectedTaskIds([]);
    setTaskSearch("");
    setTaskPickerOpen(false);
    setFocusAgendaKey(null);
    agendaLoadedFor.current = null;
  }, [open, recurringMeeting]);

  useEffect(() => {
    if (open && !googleCalendarId && defaultCalendarId) setGoogleCalendarId(defaultCalendarId);
  }, [open, googleCalendarId, defaultCalendarId]);

  // Carrega as pautas salvas uma única vez por abertura, sem sobrescrever edições.
  useEffect(() => {
    if (!open || !recurringMeeting || !savedTemplates) return;
    if (agendaLoadedFor.current === recurringMeeting.id) return;
    agendaLoadedFor.current = recurringMeeting.id;
    // As salvas vêm antes de qualquer tarefa já digitada enquanto carregavam.
    setAgendaItems((current) => [
      ...savedTemplates.map((template) => ({
        key: template.id,
        id: template.id,
        title: template.title,
        cadence: template.cadence ?? "every",
        cadenceDay: template.cadence_day ?? null,
      })),
      ...current,
    ]);
  }, [open, recurringMeeting, savedTemplates]);

  // Participantes salvos da reunião, carregados uma vez por abertura.
  useEffect(() => {
    if (!open || !recurringMeeting || !allParticipants) return;
    if (participantsLoadedFor.current === recurringMeeting.id) return;
    participantsLoadedFor.current = recurringMeeting.id;
    setParticipantIds(
      allParticipants
        .filter((participant) => participant.recurring_meeting_id === recurringMeeting.id)
        .map((participant) => participant.user_id),
    );
  }, [allParticipants, open, recurringMeeting]);

  const toggleParticipant = (userId: string) => {
    setParticipantIds((current) =>
      current.includes(userId) ? current.filter((id) => id !== userId) : [...current, userId],
    );
  };

  const savedParticipantIds = useMemo(
    () =>
      recurringMeeting
        ? (allParticipants ?? [])
            .filter((participant) => participant.recurring_meeting_id === recurringMeeting.id)
            .map((participant) => participant.user_id)
        : [],
    [allParticipants, recurringMeeting],
  );

  const saveParticipants = async (recurringMeetingId: string) => {
    const removed = savedParticipantIds.filter((id) => !participantIds.includes(id));
    const added = participantIds.filter((id) => !savedParticipantIds.includes(id));
    if (removed.length > 0) {
      const { error } = await (supabase.from("recurring_meeting_participants" as any) as any)
        .delete()
        .eq("recurring_meeting_id", recurringMeetingId)
        .in("user_id", removed);
      if (error) return error;
    }
    if (added.length > 0) {
      const { error } = await (
        supabase.from("recurring_meeting_participants" as any) as any
      ).upsert(
        added.map((userId) => ({ recurring_meeting_id: recurringMeetingId, user_id: userId })),
        { onConflict: "recurring_meeting_id,user_id", ignoreDuplicates: true },
      );
      if (error) return error;
    }
    return null;
  };

  const parsedMonthDays = useMemo(
    () =>
      [
        ...new Set(
          daysOfMonth
            .split(/[,;\s]+/)
            .map(Number)
            .filter((day) => day >= 1 && day <= 31),
        ),
      ].sort((a, b) => a - b),
    [daysOfMonth],
  );

  const recurrencePreview = useMemo(() => {
    const every = intervalCount > 1 ? `A cada ${intervalCount}` : "Todo";
    if (frequency === "daily") {
      return intervalCount === 1
        ? businessDaysOnly
          ? "Todos os dias úteis"
          : "Todos os dias"
        : `${every} dias${businessDaysOnly ? " úteis" : ""}`;
    }
    if (frequency === "weekly") {
      const selected = weekDays
        .filter((day) => daysOfWeek.includes(day.value))
        .map((day) => day.label);
      return `${intervalCount === 1 ? "Toda semana" : `${every} semanas`}: ${selected.join(", ") || "selecione os dias"}`;
    }
    if (monthRule === "last_day")
      return intervalCount === 1
        ? "Último dia de cada mês"
        : `Último dia a cada ${intervalCount} meses`;
    if (monthRule === "last_business_day")
      return intervalCount === 1
        ? "Último dia útil de cada mês"
        : `Último dia útil a cada ${intervalCount} meses`;
    return `${intervalCount === 1 ? "Todo mês" : `${every} meses`}: dia${parsedMonthDays.length > 1 ? "s" : ""} ${parsedMonthDays.join(" e ") || "—"}`;
  }, [businessDaysOnly, daysOfWeek, frequency, intervalCount, monthRule, parsedMonthDays]);

  const addAgendaItem = () => {
    const key = crypto.randomUUID();
    setAgendaItems((current) => [
      ...current,
      { key, title: "", cadence: "every", cadenceDay: null },
    ]);
    setFocusAgendaKey(key);
  };

  const updateAgendaItem = (key: string, patch: Partial<AgendaDraft>) => {
    setAgendaItems((current) =>
      current.map((item) => (item.key === key ? { ...item, ...patch } : item)),
    );
  };

  const removeAgendaItem = (key: string) => {
    setAgendaItems((current) => current.filter((item) => item.key !== key));
  };

  /** Linhas a gravar em recurring_meeting_agenda_templates, na ordem da lista. */
  const agendaRowsFor = (recurringMeetingId: string, reuseIds: boolean) =>
    agendaItems
      .filter((item) => item.title.trim())
      .map((item, position) => ({
        id: reuseIds && item.id ? item.id : crypto.randomUUID(),
        recurring_meeting_id: recurringMeetingId,
        title: item.title.trim(),
        cadence: isRecurring ? item.cadence : "every",
        cadence_day: isRecurring && item.cadence === "until_day" ? (item.cadenceDay ?? 25) : null,
        position,
      }));

  const removedTemplateIds = () => {
    const keptIds = new Set(agendaItems.filter((item) => item.title.trim()).map((item) => item.id));
    return (savedTemplates ?? []).map((template) => template.id).filter((id) => !keptIds.has(id));
  };

  const saveAgendaTemplates = async (recurringMeetingIds: string[]) => {
    const removed = recurringMeeting ? removedTemplateIds() : [];
    if (removed.length > 0) {
      const { error } = await (supabase.from("recurring_meeting_agenda_templates" as any) as any)
        .delete()
        .in("id", removed);
      if (error) return error;
    }
    const rows = recurringMeetingIds.flatMap((id) => agendaRowsFor(id, Boolean(recurringMeeting)));
    if (rows.length === 0) return null;
    const { error } = await (
      supabase.from("recurring_meeting_agenda_templates" as any) as any
    ).upsert(rows, {
      onConflict: "id",
    });
    return error;
  };

  const clientSearchTerm = clientSearch.trim();
  const normalizedClientSearch = clientSearchTerm.toLocaleLowerCase("pt-BR");
  const activeClients = clients.filter((client) => client.is_active !== false);
  const filteredClients = activeClients.filter((client) =>
    client.name.toLocaleLowerCase("pt-BR").includes(normalizedClientSearch),
  );
  const exactClient = activeClients.find(
    (client) => client.name.toLocaleLowerCase("pt-BR") === normalizedClientSearch,
  );
  const selectedClientName = clients.find((client) => client.id === clientId)?.name ?? "";
  const completedStatusIds = new Set(
    statuses.filter((status) => status.is_completed).map((status) => status.id),
  );
  const eligibleTasks = tasks.filter(
    (task) =>
      task.client_id === clientId &&
      task.workspace_id === activeWorkspace?.id &&
      task.deleted_at === null &&
      task.archived_at === null &&
      task.status !== "done" &&
      !task.completed_at &&
      (!task.status_id || !completedStatusIds.has(task.status_id)) &&
      !task.recurring_meeting_agenda_item_id &&
      !task.recurring_meeting_occurrence_id &&
      !task.recurring_meeting_agenda_template_id,
  );
  const filteredTasks = eligibleTasks.filter((task) =>
    task.title.toLocaleLowerCase("pt-BR").includes(taskSearch.trim().toLocaleLowerCase("pt-BR")),
  );
  const selectedTasks = selectedTaskIds
    .map((id) => tasks.find((task) => task.id === id))
    .filter((task): task is (typeof tasks)[number] => Boolean(task));

  const chooseClient = (id: string) => {
    if (id !== clientId && importedAta) {
      if (
        !window.confirm("Trocar o cliente descartará a ata preparada para esta reunião. Continuar?")
      )
        return;
      setImportedAta(null);
    }
    setClientId(id);
    setSelectedTaskIds([]);
    setClientOpen(false);
  };

  const attachImportedAta = (meetingId: string, draft: ImportedAtaDraft) =>
    (supabase as any).rpc("attach_imported_ata_to_meeting", {
      target_import_id: draft.id,
      target_meeting_id: meetingId,
      ata_title: draft.title,
      ata_text: draft.text,
      ata_html: draft.html,
      imported_tasks: draft.tasks.map((task) => ({
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        assignee_id: task.assignee_id,
        status_id: task.status_id,
        column_id: task.column_id,
        tag_id: task.tag_id,
        priority: task.priority,
      })),
    });

  const closeDialog = () => {
    if (
      pendingImportMeetingId &&
      !window.confirm(
        "A reunião já foi salva, mas a ata ainda não foi vinculada. Fechar agora descartará a ata em revisão. Deseja sair?",
      )
    )
      return;
    onOpenChange(false);
  };

  const save = async () => {
    if (pendingImportMeetingId && importedAta) {
      setSaving(true);
      const { error } = await attachImportedAta(pendingImportMeetingId, importedAta);
      setSaving(false);
      if (error)
        return toast.error(`Reunião salva, mas a ata ainda não foi vinculada: ${error.message}`);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["recurring_meetings"] }),
        queryClient.invalidateQueries({ queryKey: ["recurringMeeting-occurrences"] }),
        queryClient.invalidateQueries({ queryKey: ["recurringMeeting-task-templates"] }),
        queryClient.invalidateQueries({ queryKey: ["recurringMeeting-participants"] }),
        queryClient.invalidateQueries({ queryKey: ["tasks"] }),
        queryClient.invalidateQueries({ queryKey: ["client_notes"] }),
        queryClient.invalidateQueries({ queryKey: ["meeting-ata-notes"] }),
        queryClient.invalidateQueries({ queryKey: ["recurringMeeting-agenda-items"] }),
        queryClient.invalidateQueries({ queryKey: ["recurringMeeting-agenda-preview"] }),
      ]);
      toast.success("Reunião, ata e tarefas vinculadas");
      onOpenChange(false);
      return;
    }
    if (!title.trim()) return toast.error("Informe o nome da reunião.");
    if (!selectedClientName) return toast.error("Selecione um cliente.");
    if (!startDate) return toast.error("Informe a data de início.");
    if (isRecurring && frequency === "weekly" && daysOfWeek.length === 0)
      return toast.error("Selecione ao menos um dia da semana.");
    if (
      isRecurring &&
      frequency === "monthly" &&
      monthRule === "specific_days" &&
      parsedMonthDays.length === 0
    )
      return toast.error("Informe ao menos um dia válido do mês.");
    if (isRecurring && endDate && endDate < startDate)
      return toast.error("A data final não pode ser anterior ao início.");
    if (dueTime && !endTime) return toast.error("Informe o horário final da reunião.");
    if (endTime && !dueTime) return toast.error("Informe o horário inicial da reunião.");
    const durationMinutes = meetingDurationMinutes(dueTime, endTime);
    if (dueTime && (!durationMinutes || durationMinutes < 15))
      return toast.error("O horário final deve deixar ao menos 15 minutos para a reunião.");
    const participantsChanged =
      participantIds.length !== savedParticipantIds.length ||
      participantIds.some((id) => !savedParticipantIds.includes(id));
    if (isOffline() && participantsChanged)
      return toast.error("Conecte-se à internet para alterar os participantes.");
    if (selectedTaskIds.length > 0 && !isRecurring && isOffline())
      return toast.error("Conecte-se à internet para vincular uma tarefa existente.");
    if (selectedTaskIds.length > 0 && !isRecurring && !isActive)
      return toast.error("Ative a reunião para vincular uma tarefa existente.");
    if (addToCalendar && createGoogleMeet && !googleConnection)
      return toast.error("Conecte sua conta Google para criar um Meet.");
    if (addToCalendar && createGoogleMeet && !canCreateGoogleMeet)
      return toast.error("Reconecte sua conta na Agenda para autorizar a criação do Google Meet.");
    if (addToCalendar && createGoogleMeet && !googleCalendarId)
      return toast.error("Selecione uma agenda Google para criar um Meet.");
    if (addToCalendar && !dueTime)
      return toast.error("Informe os horários inicial e final para adicionar à Agenda.");
    if (addToCalendar && isOffline())
      return toast.error("Conecte-se à internet para adicionar a reunião à Agenda.");
    if (importedAta && isOffline())
      return toast.error("Conecte-se à internet para salvar a ata junto à reunião.");
    if (importedAta && !isActive)
      return toast.error("Ative a reunião para vincular as tarefas da ata.");

    setSaving(true);
    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      assignee_id: assigneeId || null,
      is_recurring: isRecurring,
      frequency: isRecurring ? frequency : "daily",
      interval_count: Math.max(1, intervalCount),
      days_of_week: isRecurring && frequency === "weekly" ? daysOfWeek : [],
      days_of_month:
        isRecurring && frequency === "monthly" && monthRule === "specific_days"
          ? parsedMonthDays
          : [],
      month_rule: isRecurring && frequency === "monthly" ? monthRule : "specific_days",
      business_days_only: isRecurring && frequency === "daily" && businessDaysOnly,
      start_date: startDate,
      end_date: isRecurring ? endDate || null : startDate,
      create_before_days: 0,
      reminder_days_before: Math.max(0, reminderDays),
      due_time: dueTime || null,
      add_to_calendar: addToCalendar,
      create_google_meet: addToCalendar && createGoogleMeet,
      auto_smart_notes: autoSmartNotes,
      auto_transcription: autoTranscription,
      google_calendar_id: addToCalendar ? googleCalendarId : null,
      duration_minutes: durationMinutes ?? recurringMeeting?.duration_minutes ?? 60,
      meeting_location: addToCalendar ? (recurringMeeting?.meeting_location ?? null) : null,
      meeting_attendee_emails: addToCalendar
        ? (recurringMeeting?.meeting_attendee_emails ?? [])
        : [],
      manual_meeting_url:
        addToCalendar && !createGoogleMeet ? manualMeetingUrl.trim() || null : null,
      priority,
      column_id: selectedColumnId || null,
      status_id: selectedStatusId || null,
      client_id: clientId,
      department_id: null,
      meeting_mode: true,
      is_active: isActive,
    };

    if (user && activeWorkspace && isOffline()) {
      const now = new Date().toISOString();
      const localItems: RecurringMeeting[] = recurringMeeting
        ? [{ ...recurringMeeting, ...payload, updated_at: now }]
        : [
            {
              id: crypto.randomUUID(),
              workspace_id: activeWorkspace.id,
              created_by: user.id,
              created_at: now,
              updated_at: now,
              archived_at: null,
              ...payload,
            },
          ];
      await Promise.all(
        localItems.map((item) =>
          enqueueOfflineOperation({
            userId: user.id,
            entity: "record",
            action: recurringMeeting ? "update" : "create",
            entityId: item.id,
            payload: recurringMeeting
              ? { table: "recurring_meetings", patch: payload }
              : { table: "recurring_meetings", record: item },
          }),
        ),
      );
      // A fila só envia a pauta depois que a reunião correspondente existir.
      for (const removedId of recurringMeeting ? removedTemplateIds() : []) {
        await enqueueOfflineOperation({
          userId: user.id,
          entity: "record",
          action: "delete",
          entityId: removedId,
          payload: { table: "recurring_meeting_agenda_templates" },
        });
      }
      for (const row of localItems.flatMap((item) =>
        agendaRowsFor(item.id, Boolean(recurringMeeting)),
      )) {
        await enqueueOfflineOperation({
          userId: user.id,
          entity: "record",
          action: "create",
          entityId: row.id,
          payload: { table: "recurring_meeting_agenda_templates", record: row, upsert: true },
        });
      }
      queryClient.setQueryData<RecurringMeeting[]>(
        ["recurring_meetings", activeWorkspace.id],
        (current = []) =>
          recurringMeeting
            ? current.map((item) => (item.id === recurringMeeting.id ? localItems[0] : item))
            : [...current, ...localItems],
      );
      setSaving(false);
      toast.success("Reunião salva neste aparelho. Será sincronizada ao reconectar.");
      onOpenChange(false);
      return;
    }

    const request = recurringMeeting
      ? (supabase.from("recurring_meetings" as any) as any)
          .update(payload)
          .eq("id", recurringMeeting.id)
          .select("id")
      : (supabase.from("recurring_meetings" as any) as any).insert(payload).select("id");
    const { data, error } = await request;
    if (error) {
      setSaving(false);
      toast.error(error.message);
      return;
    }

    const savedRecurringMeetings = (data ?? []) as Array<{ id: string }>;
    const agendaError = await saveAgendaTemplates(savedRecurringMeetings.map(({ id }) => id));
    const participantsError = savedRecurringMeetings[0]
      ? await saveParticipants(savedRecurringMeetings[0].id)
      : null;
    // Refaz as reuniões futuras ainda não preparadas com a nova recorrência e pauta.
    const scheduleChanged =
      !recurringMeeting ||
      recurringMeeting.is_recurring !== payload.is_recurring ||
      recurringMeeting.frequency !== payload.frequency ||
      recurringMeeting.interval_count !== payload.interval_count ||
      JSON.stringify(recurringMeeting.days_of_week) !== JSON.stringify(payload.days_of_week) ||
      JSON.stringify(recurringMeeting.days_of_month) !== JSON.stringify(payload.days_of_month) ||
      recurringMeeting.month_rule !== payload.month_rule ||
      recurringMeeting.business_days_only !== payload.business_days_only ||
      recurringMeeting.start_date !== payload.start_date ||
      recurringMeeting.end_date !== payload.end_date ||
      recurringMeeting.due_time?.slice(0, 5) !== payload.due_time ||
      recurringMeeting.is_active !== payload.is_active;
    const refreshResults = scheduleChanged
      ? await Promise.all(
          savedRecurringMeetings.map(({ id }) =>
            (supabase as any).rpc("refresh_recurring_meeting", {
              target_recurring_meeting_id: id,
            }),
          ),
        )
      : [];
    const refreshError = refreshResults.find((result) => result.error)?.error;
    let googleError: Error | null = null;
    if (!refreshError && savedRecurringMeetings[0]) {
      const { error: calendarError } = await (supabase as any).rpc(
        "prepare_meeting_calendar_events",
        { target_meeting_id: savedRecurringMeetings[0].id },
      );
      if (calendarError) googleError = new Error(calendarError.message);
      else if (googleConnection && (addToCalendar || recurringMeeting?.add_to_calendar)) {
        const { data: syncData, error: syncError } = await supabase.functions.invoke(
          "google-calendar-sync",
          { body: {} },
        );
        if (syncError || !syncData?.ok || syncData?.pushErrors?.length)
          googleError = new Error(
            syncData?.pushErrors?.[0] ||
              syncData?.error ||
              syncError?.message ||
              "Falha na sincronização com o Google.",
          );
      }
    }
    let linkError: Error | null = null;
    if (
      selectedTaskIds.length > 0 &&
      !isRecurring &&
      !agendaError &&
      !refreshError &&
      savedRecurringMeetings[0]
    ) {
      const { data: occurrence, error: occurrenceError } = await (
        supabase.from("recurring_meeting_occurrences" as any) as any
      )
        .select("id")
        .eq("recurring_meeting_id", savedRecurringMeetings[0].id)
        .eq("due_date", startDate)
        .maybeSingle();
      if (occurrenceError || !occurrence) {
        linkError = new Error(occurrenceError?.message ?? "A data da reunião não foi gerada.");
      } else {
        const { error: taskLinkError } = await (supabase as any).rpc(
          "link_existing_tasks_to_meeting",
          { target_occurrence_id: occurrence.id, target_task_ids: selectedTaskIds },
        );
        if (taskLinkError) linkError = new Error(taskLinkError.message);
      }
    }
    if (
      importedAta &&
      savedRecurringMeetings[0] &&
      !agendaError &&
      !participantsError &&
      !refreshError &&
      !linkError
    ) {
      setPendingImportMeetingId(savedRecurringMeetings[0].id);
      const { error: importError } = await attachImportedAta(
        savedRecurringMeetings[0].id,
        importedAta,
      );
      if (importError) {
        setSaving(false);
        toast.error(`Reunião salva, mas a ata ainda não foi vinculada: ${importError.message}`);
        return;
      }
      setPendingImportMeetingId(null);
    }
    setSaving(false);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["recurring_meetings"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-task-templates"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-participants"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-occurrences"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-agenda-items"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-agenda-preview"] }),
      queryClient.invalidateQueries({ queryKey: ["tasks"] }),
      queryClient.invalidateQueries({ queryKey: ["client_notes"] }),
      queryClient.invalidateQueries({ queryKey: ["meeting-ata-notes"] }),
      queryClient.invalidateQueries({ queryKey: ["meeting-calendar-events"] }),
      queryClient.invalidateQueries({ queryKey: ["agenda_events"] }),
    ]);
    if (agendaError) {
      toast.error(`Reunião salva, mas a pauta padrão não foi salva: ${agendaError.message}`);
      return;
    }
    if (participantsError) {
      toast.error(
        `Reunião salva, mas os participantes não foram salvos: ${participantsError.message}`,
      );
      return;
    }
    if (refreshError) {
      toast.error(
        `Reunião salva, mas as próximas reuniões não foram geradas: ${refreshError.message}`,
      );
      return;
    }
    if (linkError) {
      toast.error(`Reunião criada, mas as tarefas não foram vinculadas: ${linkError.message}`);
      onOpenChange(false);
      if (!recurringMeeting && savedRecurringMeetings[0])
        onCreated?.(savedRecurringMeetings[0].id, startDate);
      return;
    }
    if (googleError) {
      toast.error(`Reunião salva, mas a Agenda não foi sincronizada: ${googleError.message}`);
      onOpenChange(false);
      if (!recurringMeeting && savedRecurringMeetings[0])
        onCreated?.(savedRecurringMeetings[0].id, startDate);
      return;
    }
    toast.success(
      importedAta
        ? "Reunião, ata e tarefas vinculadas"
        : recurringMeeting
          ? "Reunião atualizada"
          : "Reunião criada",
    );
    onOpenChange(false);
    if (!recurringMeeting && savedRecurringMeetings[0])
      onCreated?.(savedRecurringMeetings[0].id, startDate);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) onOpenChange(true);
        else closeDialog();
      }}
    >
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle>
            {view === "import"
              ? "Importar Ata"
              : recurringMeeting
                ? "Editar reunião"
                : "Nova reunião"}
          </DialogTitle>
        </DialogHeader>
        <div className={view === "import" ? "hidden" : "contents"}>
          <div className="space-y-5">
            <section className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recurringMeeting-title">Nome da reunião *</Label>
                <Input
                  id="recurringMeeting-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Ex.: Reunião semanal do Financeiro"
                  autoFocus
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Cliente *</Label>
                  <Popover
                    open={clientOpen}
                    onOpenChange={(open) => {
                      setClientOpen(open);
                      if (open) setClientSearch("");
                    }}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-between font-normal"
                      >
                        {selectedClientName ? (
                          <span className="truncate">{selectedClientName}</span>
                        ) : (
                          <span className="truncate text-muted-foreground">
                            Selecione um cliente
                          </span>
                        )}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-[var(--radix-popover-trigger-width)] p-2"
                    >
                      <Input
                        value={clientSearch}
                        onChange={(event) => setClientSearch(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key !== "Enter") return;
                          event.preventDefault();
                          if (exactClient) chooseClient(exactClient.id);
                          else if (filteredClients.length === 1)
                            chooseClient(filteredClients[0].id);
                        }}
                        placeholder="Buscar cliente..."
                        className="mb-2 h-8"
                        autoFocus
                      />
                      <div className="max-h-56 overflow-y-auto">
                        {filteredClients.map((client) => (
                          <ClientOption
                            key={client.id}
                            label={client.name}
                            selected={client.id === clientId}
                            onSelect={() => chooseClient(client.id)}
                          />
                        ))}
                        {filteredClients.length === 0 && (
                          <p className="px-2 py-3 text-center text-sm text-muted-foreground">
                            {activeClients.length === 0
                              ? "Nenhum cliente ativo neste ambiente."
                              : "Nenhum cliente encontrado."}
                          </p>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Responsável</Label>
                  <Select
                    value={assigneeId || "none"}
                    onValueChange={(value) => setAssigneeId(value === "none" ? "" : value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sem responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sem responsável</SelectItem>
                      {profiles.map((profile) => (
                        <SelectItem key={profile.id} value={profile.id}>
                          {profile.full_name || profile.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="recurringMeeting-description">Descrição e orientações</Label>
                <Textarea
                  id="recurringMeeting-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={3}
                  placeholder="Documentos necessários, forma de entrega, conferências..."
                />
              </div>
              <div className="grid max-w-lg gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="recurringMeeting-time">Horário inicial</Label>
                  <Input
                    id="recurringMeeting-time"
                    type="time"
                    value={dueTime}
                    onChange={(event) => {
                      const nextStart = event.target.value;
                      setDueTime(nextStart);
                      if (!endTime && nextStart) setEndTime(meetingEndTime(nextStart, 60));
                      if (!nextStart) setEndTime("");
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recurringMeeting-end-time">Horário final</Label>
                  <Input
                    id="recurringMeeting-end-time"
                    type="time"
                    value={endTime}
                    onChange={(event) => setEndTime(event.target.value)}
                  />
                </div>
              </div>
              {dueTime && endTime && endTime <= dueTime && (
                <p className="text-xs text-muted-foreground">O horário final é no dia seguinte.</p>
              )}
            </section>

            <section className="space-y-3 rounded-xl border bg-muted/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-medium">Adicionar à Agenda</h3>
                  <p className="text-xs text-muted-foreground">
                    {isRecurring
                      ? "Cada data da reunião terá seu próprio compromisso na Agenda."
                      : "Cria um compromisso para esta reunião na Agenda."}
                  </p>
                </div>
                <Switch
                  checked={addToCalendar}
                  onCheckedChange={setAddToCalendar}
                  aria-label="Adicionar à Agenda"
                />
              </div>
              {addToCalendar && (
                <div className="space-y-3 border-t pt-3">
                  {calendarSources.length > 0 && (
                    <div className="space-y-1">
                      <Label>Agenda Google</Label>
                      <Select value={googleCalendarId} onValueChange={setGoogleCalendarId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a agenda" />
                        </SelectTrigger>
                        <SelectContent>
                          {calendarSources.map((source) => (
                            <SelectItem
                              key={source.google_calendar_id}
                              value={source.google_calendar_id}
                            >
                              {source.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">Criar Google Meet</p>
                      <p className="text-xs text-muted-foreground">
                        {isRecurring
                          ? "Cada data terá um link próprio, preparado com até 30 dias de antecedência."
                          : "O link será criado ao salvar a reunião."}
                      </p>
                    </div>
                    <Switch
                      checked={createGoogleMeet}
                      disabled={
                        (!canCreateGoogleMeet || calendarSources.length === 0) && !createGoogleMeet
                      }
                      onCheckedChange={setCreateGoogleMeet}
                      aria-label="Criar Google Meet"
                    />
                  </div>
                  {!canCreateGoogleMeet && (
                    <p className="text-xs text-muted-foreground">
                      {googleConnection
                        ? "Reconecte sua conta na Agenda e aprove as permissões do Google Meet."
                        : "Conecte sua conta Google na Agenda para habilitar o Meet."}
                    </p>
                  )}
                  {createGoogleMeet ? (
                    <div className="space-y-3 border-t pt-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium">Gerar ata com Gemini</p>
                          <p className="text-xs text-muted-foreground">
                            Cria as anotações inteligentes da reunião.
                          </p>
                        </div>
                        <Switch
                          checked={autoSmartNotes}
                          onCheckedChange={setAutoSmartNotes}
                          aria-label="Gerar ata com Gemini"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium">Gerar transcrição</p>
                          <p className="text-xs text-muted-foreground">
                            Salva o texto falado durante a reunião.
                          </p>
                        </div>
                        <Switch
                          checked={autoTranscription}
                          onCheckedChange={setAutoTranscription}
                          aria-label="Gerar transcrição"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Label htmlFor="meeting-url">Link da reunião (opcional)</Label>
                      <Input
                        id="meeting-url"
                        type="url"
                        value={manualMeetingUrl}
                        onChange={(event) => setManualMeetingUrl(event.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  )}
                </div>
              )}
            </section>

            <section className="space-y-3 rounded-xl border bg-muted/20 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium">Participantes</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Recebem um aviso antes da reunião para revisar a pauta.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button type="button" variant="outline" size="sm">
                        <Plus className="mr-1.5 h-3.5 w-3.5" /> Escolher pessoas
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-72 p-1">
                      <div className="max-h-64 overflow-y-auto">
                        {profiles.map((profile) => (
                          <label
                            key={profile.id}
                            className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                          >
                            <Checkbox
                              checked={participantIds.includes(profile.id)}
                              onCheckedChange={() => toggleParticipant(profile.id)}
                            />
                            <span className="truncate">{profile.full_name || profile.email}</span>
                          </label>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              {participantIds.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  Nenhum participante. O aviso irá só para o responsável.
                </p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {participantIds.map((id) => {
                    const profile = profiles.find((item) => item.id === id);
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-1 text-xs shadow-sm"
                      >
                        {profile?.full_name || profile?.email || "Usuário"}
                        <button
                          type="button"
                          onClick={() => toggleParticipant(id)}
                          className="text-muted-foreground hover:text-destructive"
                          aria-label={`Remover ${profile?.full_name || "participante"}`}
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </section>

            <section className="space-y-4 rounded-xl border bg-muted/20 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label htmlFor="recurringMeeting-recurrence" className="text-base font-medium">
                    Recorrência
                  </Label>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {isRecurring
                      ? recurrencePreview
                      : "Desativada: esta reunião acontecerá uma única vez."}
                  </p>
                </div>
                <Switch
                  id="recurringMeeting-recurrence"
                  checked={isRecurring}
                  onCheckedChange={(checked) => {
                    setIsRecurring(checked);
                    if (checked) setSelectedTaskIds([]);
                  }}
                  aria-label="Ativar recorrência"
                />
              </div>

              {isRecurring && (
                <>
                  <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
                    <div className="space-y-2">
                      <Label>Frequência</Label>
                      <Select
                        value={frequency}
                        onValueChange={(value) => setFrequency(value as RecurringMeetingFrequency)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Diária</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                          <SelectItem value="monthly">Mensal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recurringMeeting-interval">A cada</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="recurringMeeting-interval"
                          type="number"
                          min={1}
                          max={365}
                          value={intervalCount}
                          onChange={(event) =>
                            setIntervalCount(Math.max(1, Number(event.target.value) || 1))
                          }
                        />
                        <span className="text-xs text-muted-foreground">
                          {frequency === "daily"
                            ? "dia(s)"
                            : frequency === "weekly"
                              ? "semana(s)"
                              : "mês(es)"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {frequency === "daily" && (
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={businessDaysOnly}
                        onCheckedChange={(value) => setBusinessDaysOnly(value === true)}
                      />
                      Somente dias úteis
                    </label>
                  )}

                  {frequency === "weekly" && (
                    <div className="space-y-2">
                      <Label>Dias da semana</Label>
                      <div className="flex flex-wrap gap-2">
                        {weekDays.map((day) => {
                          const selected = daysOfWeek.includes(day.value);
                          return (
                            <button
                              key={day.value}
                              type="button"
                              onClick={() =>
                                setDaysOfWeek(
                                  selected
                                    ? daysOfWeek.filter((value) => value !== day.value)
                                    : [...daysOfWeek, day.value].sort(),
                                )
                              }
                              className={cn(
                                "rounded-full border px-3 py-1.5 text-xs transition",
                                selected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "bg-background hover:bg-muted",
                              )}
                            >
                              {day.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {frequency === "monthly" && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Regra mensal</Label>
                        <Select
                          value={monthRule}
                          onValueChange={(value) =>
                            setMonthRule(value as RecurringMeetingMonthRule)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="specific_days">Dia(s) específico(s)</SelectItem>
                            <SelectItem value="last_day">Último dia do mês</SelectItem>
                            <SelectItem value="last_business_day">
                              Último dia útil do mês
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {monthRule === "specific_days" && (
                        <div className="space-y-2">
                          <Label htmlFor="recurringMeeting-month-days">Dias do mês</Label>
                          <Input
                            id="recurringMeeting-month-days"
                            value={daysOfMonth}
                            onChange={(event) => setDaysOfMonth(event.target.value)}
                            placeholder="Ex.: 15, 30"
                          />
                          <p className="text-[11px] text-muted-foreground">
                            Separe por vírgulas. Se o dia não existir, será usado o último dia do
                            mês.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="recurringMeeting-start">
                    {isRecurring ? "Início" : "Data da reunião"}
                  </Label>
                  <Input
                    id="recurringMeeting-start"
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                  />
                </div>
                {isRecurring && (
                  <div className="space-y-2">
                    <Label htmlFor="recurringMeeting-end">Término opcional</Label>
                    <Input
                      id="recurringMeeting-end"
                      type="date"
                      value={endDate}
                      min={startDate}
                      onChange={(event) => setEndDate(event.target.value)}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="recurringMeeting-reminder">Avisar participantes</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="recurringMeeting-reminder"
                      type="number"
                      min={0}
                      max={30}
                      value={reminderDays}
                      onChange={(event) =>
                        setReminderDays(Math.min(30, Math.max(0, Number(event.target.value) || 0)))
                      }
                    />
                    <span className="text-xs text-muted-foreground">dias antes</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-3 rounded-xl border bg-muted/20 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium">
                    {isRecurring ? "Pauta padrão" : "Pauta da reunião"}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {isRecurring
                      ? "Cada reunião recebe estes itens conforme a periodicidade escolhida. Mudanças valem para as reuniões que ainda não tiveram a pauta confirmada."
                      : "Adicione os assuntos desta reunião."}
                  </p>
                </div>
                {agendaItems.length > 0 && (
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    {agendaItems.length} {agendaItems.length === 1 ? "item" : "itens"}
                  </span>
                )}
              </div>
              {agendaItems.length === 0 && !importedAta?.tasks.length ? (
                <p className="rounded-lg border border-dashed px-3 py-4 text-center text-sm text-muted-foreground">
                  Nenhum item na pauta. Adicione os assuntos que esta reunião trata.
                </p>
              ) : agendaItems.length > 0 ? (
                <ol className="space-y-2">
                  {agendaItems.map((item, index) => (
                    <li key={item.key} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <span className="hidden w-6 shrink-0 text-right text-sm text-muted-foreground sm:block">
                        {index + 1}.
                      </span>
                      <Input
                        value={item.title}
                        onChange={(event) =>
                          updateAgendaItem(item.key, { title: event.target.value })
                        }
                        onKeyDown={(event) => {
                          if (event.key !== "Enter") return;
                          event.preventDefault();
                          if (item.title.trim()) addAgendaItem();
                        }}
                        placeholder="Ex.: Conferir folha de pagamento"
                        aria-label={`Pauta ${index + 1}`}
                        autoFocus={item.key === focusAgendaKey}
                        className="flex-1"
                      />
                      <div className="flex gap-2">
                        {isRecurring && (
                          <Select
                            value={item.cadence}
                            onValueChange={(value) =>
                              updateAgendaItem(item.key, {
                                cadence: value as AgendaCadence,
                                cadenceDay:
                                  value === "until_day" ? (item.cadenceDay ?? 25) : item.cadenceDay,
                              })
                            }
                          >
                            <SelectTrigger
                              className="sm:w-48"
                              aria-label={`Periodicidade da pauta ${index + 1}`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {cadenceOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        {isRecurring && item.cadence === "until_day" && (
                          <Input
                            type="number"
                            min={1}
                            max={31}
                            value={item.cadenceDay ?? 25}
                            onChange={(event) =>
                              updateAgendaItem(item.key, {
                                cadenceDay: Math.min(
                                  31,
                                  Math.max(1, Number(event.target.value) || 1),
                                ),
                              })
                            }
                            className="w-16"
                            aria-label={`Dia limite da pauta ${index + 1}`}
                            title="Dia do mês"
                          />
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="shrink-0 text-muted-foreground hover:text-destructive"
                          onClick={() => removeAgendaItem(item.key)}
                          aria-label={`Remover pauta ${index + 1}`}
                          title="Remover pauta"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : null}
              {importedAta && importedAta.tasks.length > 0 && (
                <div className="space-y-2 rounded-lg border bg-background p-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    Tarefas extraídas da ata — entram na pauta{" "}
                    {isRecurring ? "da próxima reunião em aberto" : "desta reunião"} ao salvar
                  </p>
                  <ol className="list-inside list-decimal space-y-1 text-sm">
                    {importedAta.tasks.map((task) => (
                      <li key={task._id}>{task.title}</li>
                    ))}
                  </ol>
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                className="w-full border-dashed"
                onClick={addAgendaItem}
              >
                <Plus className="mr-1.5 h-4 w-4" /> Adicionar item
              </Button>
              {!isRecurring && !recurringMeeting && (
                <div className="space-y-2 border-t pt-3">
                  <Label>Tarefas existentes</Label>
                  <p className="text-xs text-muted-foreground">
                    Vincule tarefas deste cliente como pautas desta reunião, sem duplicá-las.
                  </p>
                  <Popover open={taskPickerOpen} onOpenChange={setTaskPickerOpen}>
                    <PopoverTrigger asChild>
                      <Button type="button" variant="outline" className="w-full justify-between">
                        <span className="truncate">
                          {selectedTaskIds.length > 0
                            ? `${selectedTaskIds.length} ${selectedTaskIds.length === 1 ? "tarefa selecionada" : "tarefas selecionadas"}`
                            : "Escolher tarefas existentes"}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-[var(--radix-popover-trigger-width)] p-2"
                    >
                      <Input
                        value={taskSearch}
                        onChange={(event) => setTaskSearch(event.target.value)}
                        placeholder="Buscar tarefa..."
                        aria-label="Buscar tarefa existente"
                        className="mb-2 h-8"
                        autoFocus
                      />
                      <div className="max-h-56 overflow-y-auto">
                        {filteredTasks.length === 0 ? (
                          <p className="px-2 py-3 text-center text-sm text-muted-foreground">
                            {clientId
                              ? "Nenhuma tarefa em aberto disponível deste cliente."
                              : "Selecione um cliente primeiro."}
                          </p>
                        ) : (
                          filteredTasks.map((task) => (
                            <button
                              key={task.id}
                              type="button"
                              aria-pressed={selectedTaskIds.includes(task.id)}
                              className="flex w-full items-start gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-accent"
                              onClick={() => {
                                setSelectedTaskIds((current) =>
                                  current.includes(task.id)
                                    ? current.filter((id) => id !== task.id)
                                    : [...current, task.id],
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mt-0.5 h-4 w-4 shrink-0",
                                  selectedTaskIds.includes(task.id) ? "opacity-100" : "opacity-0",
                                )}
                              />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate">{task.title}</span>
                                <span className="text-xs text-muted-foreground">
                                  {task.due_date
                                    ? `Prazo: ${new Date(task.due_date).toLocaleDateString("pt-BR")}`
                                    : "Sem prazo"}
                                </span>
                              </span>
                            </button>
                          ))
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                  {selectedTasks.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTasks.map((task) => (
                        <span
                          key={task.id}
                          className="inline-flex max-w-full items-center gap-1 rounded-full border bg-background px-2.5 py-1 text-xs"
                        >
                          <span className="truncate">{task.title}</span>
                          <button
                            type="button"
                            className="shrink-0 text-muted-foreground hover:text-destructive"
                            aria-label={`Remover ${task.title} das tarefas selecionadas`}
                            onClick={() =>
                              setSelectedTaskIds((current) =>
                                current.filter((id) => id !== task.id),
                              )
                            }
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>
            <section className="grid gap-4 rounded-xl border p-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Prioridade da tarefa</Label>
                <Select
                  value={priority}
                  onValueChange={(value) => setPriority(value as RecurringMeeting["priority"])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Coluna inicial</Label>
                <Select value={selectedColumnId} onValueChange={setColumnId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Nenhuma coluna cadastrada" />
                  </SelectTrigger>
                  <SelectContent>
                    {columns.map((column) => (
                      <SelectItem key={column.id} value={column.id}>
                        {column.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status inicial</Label>
                <Select value={selectedStatusId} onValueChange={setStatusId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Nenhum status aberto cadastrado" />
                  </SelectTrigger>
                  <SelectContent>
                    {openStatuses.map((status) => (
                      <SelectItem key={status.id} value={status.id}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <label className="flex items-center gap-2 text-sm sm:col-span-3">
                <Checkbox
                  checked={isActive}
                  onCheckedChange={(value) => setIsActive(value === true)}
                />
                Reunião ativa
              </label>
            </section>
          </div>
        </div>
        {view === "meeting" && importedAta && (
          <p className="rounded-lg border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
            Ata “{importedAta.title}” preparada com {importedAta.tasks.length} tarefa(s). Será
            vinculada ao salvar a reunião.
          </p>
        )}
        <div className={view === "import" ? "" : "hidden"}>
          <ImportAtaContent
            meetingClientId={clientId}
            meetingDate={startDate}
            onApply={(draft) => {
              setImportedAta(draft);
              setView("meeting");
              toast.success("Ata pronta para ser salva com a reunião");
            }}
          />
        </div>
        <DialogFooter>
          {view === "import" ? (
            <Button variant="outline" onClick={() => setView("meeting")}>
              Voltar à reunião
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={closeDialog} disabled={saving}>
                Cancelar
              </Button>
              <Button
                variant="outline"
                disabled={saving || Boolean(pendingImportMeetingId)}
                onClick={() => {
                  if (!clientId)
                    return toast.error("Selecione o cliente da reunião antes de importar a ata.");
                  setView("import");
                }}
              >
                <FileUp className="mr-2 h-4 w-4" /> {importedAta ? "Revisar Ata" : "Importar Ata"}
              </Button>
              <Button onClick={() => void save()} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {saving
                  ? "Salvando..."
                  : pendingImportMeetingId
                    ? "Tentar vincular ata"
                    : "Salvar reunião"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ClientOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-accent",
        selected && "bg-accent/60 font-medium",
      )}
    >
      <Check className={cn("h-4 w-4 shrink-0", selected ? "opacity-100" : "opacity-0")} />
      <span className="truncate">{label}</span>
    </button>
  );
}
