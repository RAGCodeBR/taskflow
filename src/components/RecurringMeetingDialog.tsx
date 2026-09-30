/* eslint-disable @typescript-eslint/no-explicit-any -- Supabase types are regenerated after the migration is applied. */
import { useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Check, ChevronDown, Loader2, Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAssignableProfiles, useColumns, useTaskStatuses } from "@/hooks/use-data";
import {
  useRecurringMeetingDepartmentMembers,
  useRecurringMeetingDepartments,
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { enqueueOfflineOperation, isOffline } from "@/lib/offline-sync";

interface RecurringMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
  recurringMeeting,
}: RecurringMeetingDialogProps) {
  const queryClient = useQueryClient();
  const { user, activeWorkspace } = useAuth();
  const { data: profiles = [] } = useAssignableProfiles();
  const { data: columns = [] } = useColumns();
  const { data: statuses = [] } = useTaskStatuses();
  const { data: departments = [] } = useRecurringMeetingDepartments();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [agendaItems, setAgendaItems] = useState<AgendaDraft[]>([]);
  const [focusAgendaKey, setFocusAgendaKey] = useState<string | null>(null);
  const agendaLoadedFor = useRef<string | null>(null);
  const { data: savedTemplates } = useRecurringMeetingTaskTemplates(
    open ? recurringMeeting?.id : null,
  );
  const [assigneeId, setAssigneeId] = useState("");
  const [frequency, setFrequency] = useState<RecurringMeetingFrequency>("weekly");
  const [intervalCount, setIntervalCount] = useState(1);
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([1]);
  const [monthRule, setMonthRule] = useState<RecurringMeetingMonthRule>("specific_days");
  const [daysOfMonth, setDaysOfMonth] = useState("1");
  const [businessDaysOnly, setBusinessDaysOnly] = useState(false);
  const [startDate, setStartDate] = useState(todayValue());
  const [endDate, setEndDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [reminderDays, setReminderDays] = useState(2);
  const { data: allParticipants } = useRecurringMeetingParticipants();
  const { data: departmentMembers = [] } = useRecurringMeetingDepartmentMembers();
  const [participantIds, setParticipantIds] = useState<string[]>([]);
  const [participantsTouched, setParticipantsTouched] = useState(false);
  const participantsLoadedFor = useRef<string | null>(null);
  const [priority, setPriority] = useState<RecurringMeeting["priority"]>("medium");
  const [columnId, setColumnId] = useState("");
  const [statusId, setStatusId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTitle(recurringMeeting?.title ?? "");
    setDescription(recurringMeeting?.description ?? "");
    setDepartmentId(recurringMeeting?.department_id ?? "");
    setAssigneeId(recurringMeeting?.assignee_id ?? "");
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
    setDueTime(recurringMeeting?.due_time?.slice(0, 5) ?? "");
    setReminderDays(recurringMeeting?.reminder_days_before ?? 2);
    setParticipantIds([]);
    setParticipantsTouched(false);
    participantsLoadedFor.current = null;
    setPriority(recurringMeeting?.priority ?? "medium");
    setColumnId(recurringMeeting?.column_id ?? "");
    setStatusId(recurringMeeting?.status_id ?? "");
    setIsActive(recurringMeeting?.is_active ?? true);
    setAgendaItems([]);
    setFocusAgendaKey(null);
    agendaLoadedFor.current = null;
  }, [open, recurringMeeting]);

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

  const membersOf = (id: string) =>
    departmentMembers
      .filter((member) => member.department_id === id)
      .map((member) => member.user_id);

  const toggleParticipant = (userId: string) => {
    setParticipantsTouched(true);
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
        cadence: item.cadence,
        cadence_day: item.cadence === "until_day" ? (item.cadenceDay ?? 25) : null,
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

  const departmentSearchTerm = departmentSearch.trim();
  const normalizedDepartmentSearch = departmentSearchTerm.toLocaleLowerCase("pt-BR");
  const filteredDepartments = departments.filter((department) =>
    department.name.toLocaleLowerCase("pt-BR").includes(normalizedDepartmentSearch),
  );
  const exactDepartment = departments.find(
    (department) => department.name.toLocaleLowerCase("pt-BR") === normalizedDepartmentSearch,
  );
  const selectedDepartmentName =
    departments.find((department) => department.id === departmentId)?.name ?? "";

  const chooseDepartment = (id: string) => {
    setDepartmentId(id);
    // Numa reunião nova, os participantes vêm dos membros do departamento.
    if (!recurringMeeting && !participantsTouched) setParticipantIds(membersOf(id));
    setDepartmentOpen(false);
  };

  const save = async () => {
    if (!title.trim()) return toast.error("Informe o nome da reunião.");
    if (!selectedDepartmentName) return toast.error("Selecione um departamento.");
    if (!startDate) return toast.error("Informe a data de início.");
    if (frequency === "weekly" && daysOfWeek.length === 0)
      return toast.error("Selecione ao menos um dia da semana.");
    if (frequency === "monthly" && monthRule === "specific_days" && parsedMonthDays.length === 0)
      return toast.error("Informe ao menos um dia válido do mês.");
    if (endDate && endDate < startDate)
      return toast.error("A data final não pode ser anterior ao início.");
    const participantsChanged =
      participantIds.length !== savedParticipantIds.length ||
      participantIds.some((id) => !savedParticipantIds.includes(id));
    if (isOffline() && participantsChanged)
      return toast.error("Conecte-se à internet para alterar os participantes.");

    setSaving(true);
    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      assignee_id: assigneeId || null,
      frequency,
      interval_count: Math.max(1, intervalCount),
      days_of_week: frequency === "weekly" ? daysOfWeek : [],
      days_of_month:
        frequency === "monthly" && monthRule === "specific_days" ? parsedMonthDays : [],
      month_rule: frequency === "monthly" ? monthRule : "specific_days",
      business_days_only: frequency === "daily" && businessDaysOnly,
      start_date: startDate,
      end_date: endDate || null,
      create_before_days: 0,
      reminder_days_before: Math.max(0, reminderDays),
      due_time: dueTime || null,
      priority,
      column_id: columnId || null,
      status_id: statusId || null,
      department_id: departmentId,
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
              client_id: null,
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
    const refreshResults = await Promise.all(
      savedRecurringMeetings.map(({ id }) =>
        (supabase as any).rpc("refresh_recurring_meeting", { target_recurring_meeting_id: id }),
      ),
    );
    const refreshError = refreshResults.find((result) => result.error)?.error;
    setSaving(false);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["recurring_meetings"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-task-templates"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-participants"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-occurrences"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-agenda-items"] }),
      queryClient.invalidateQueries({ queryKey: ["recurringMeeting-agenda-preview"] }),
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
    toast.success(recurringMeeting ? "Reunião atualizada" : "Reunião criada");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle>{recurringMeeting ? "Editar reunião" : "Nova reunião"}</DialogTitle>
        </DialogHeader>

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
                <Label>Departamento *</Label>
                <Popover
                  open={departmentOpen}
                  onOpenChange={(open) => {
                    setDepartmentOpen(open);
                    if (open) setDepartmentSearch("");
                  }}
                >
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-between font-normal"
                    >
                      {selectedDepartmentName ? (
                        <span className="truncate">{selectedDepartmentName}</span>
                      ) : (
                        <span className="truncate text-muted-foreground">
                          Selecione um departamento
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
                      value={departmentSearch}
                      onChange={(event) => setDepartmentSearch(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key !== "Enter") return;
                        event.preventDefault();
                        if (exactDepartment) chooseDepartment(exactDepartment.id);
                        else if (filteredDepartments.length === 1)
                          chooseDepartment(filteredDepartments[0].id);
                      }}
                      placeholder="Buscar departamento..."
                      className="mb-2 h-8"
                      autoFocus
                    />
                    <div className="max-h-56 overflow-y-auto">
                      {filteredDepartments.map((department) => (
                        <DepartmentOption
                          key={department.id}
                          label={department.name}
                          selected={department.id === departmentId}
                          onSelect={() => chooseDepartment(department.id)}
                        />
                      ))}
                      {filteredDepartments.length === 0 && (
                        <p className="px-2 py-3 text-center text-sm text-muted-foreground">
                          {departments.length === 0
                            ? "Nenhum departamento. Crie em Reuniões › Departamentos."
                            : "Nenhum departamento encontrado."}
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
          </section>

          <section className="space-y-3 rounded-xl border bg-muted/20 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-medium">Participantes</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Recebem o aviso antes de cada reunião para revisar a pauta.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {departmentId && membersOf(departmentId).length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setParticipantsTouched(true);
                      setParticipantIds((current) => [
                        ...new Set([...current, ...membersOf(departmentId)]),
                      ]);
                    }}
                  >
                    <Users className="mr-1.5 h-3.5 w-3.5" />
                    Incluir membros do departamento ({membersOf(departmentId).length})
                  </Button>
                )}
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
            <div>
              <h3 className="font-medium">Recorrência</h3>
              <p className="mt-1 text-xs text-muted-foreground">{recurrencePreview}</p>
            </div>
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
                    onValueChange={(value) => setMonthRule(value as RecurringMeetingMonthRule)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="specific_days">Dia(s) específico(s)</SelectItem>
                      <SelectItem value="last_day">Último dia do mês</SelectItem>
                      <SelectItem value="last_business_day">Último dia útil do mês</SelectItem>
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
                      Separe por vírgulas. Se o dia não existir, será usado o último dia do mês.
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="recurringMeeting-start">Início</Label>
                <Input
                  id="recurringMeeting-start"
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                />
              </div>
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
              <div className="space-y-2">
                <Label htmlFor="recurringMeeting-time">Horário da reunião</Label>
                <Input
                  id="recurringMeeting-time"
                  type="time"
                  value={dueTime}
                  onChange={(event) => setDueTime(event.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="space-y-3 rounded-xl border bg-muted/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-medium">Pauta padrão</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Cada reunião recebe estes itens conforme a periodicidade escolhida. Mudanças valem
                  para as reuniões que ainda não tiveram a pauta confirmada.
                </p>
              </div>
              {agendaItems.length > 0 && (
                <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  {agendaItems.length} {agendaItems.length === 1 ? "item" : "itens"}
                </span>
              )}
            </div>
            {agendaItems.length === 0 ? (
              <p className="rounded-lg border border-dashed px-3 py-4 text-center text-sm text-muted-foreground">
                Nenhum item na pauta padrão. Adicione os assuntos que esta reunião trata.
              </p>
            ) : (
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
                      {item.cadence === "until_day" && (
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
            )}
            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed"
              onClick={addAgendaItem}
            >
              <Plus className="mr-1.5 h-4 w-4" /> Adicionar item
            </Button>
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
              <Select
                value={columnId || "auto"}
                onValueChange={(value) => setColumnId(value === "auto" ? "" : value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Primeira coluna</SelectItem>
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
              <Select
                value={statusId || "auto"}
                onValueChange={(value) => setStatusId(value === "auto" ? "" : value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Primeiro status aberto</SelectItem>
                  {statuses
                    .filter((status) => !status.is_completed)
                    .map((status) => (
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

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={() => void save()} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {saving ? "Salvando..." : "Salvar reunião"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DepartmentOption({
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
