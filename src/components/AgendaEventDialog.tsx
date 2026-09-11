import { useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { format } from "date-fns";
import { Copy, ExternalLink, FileText, RefreshCw } from "lucide-react";
import {
  AlignLeft,
  CalendarDays,
  Clock,
  LoaderCircle,
  MapPin,
  Trash2,
  UserPlus,
  Video,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import {
  useAgendaCalendarSources,
  useAssignableProfiles,
  type AgendaEvent,
} from "@/hooks/use-data";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: AgendaEvent | null;
  defaultDate?: Date | null;
  defaultStartTime?: string | null;
  onSaved?: () => void | Promise<void>;
};

const defaultStartTimeValue = "09:00";
const defaultEndTime = "10:00";
const fallbackColor = "#2563eb";
// The browser's own calendar/clock icon sits flush against the text by
// default inside a rounded-full input, so give it room and tone it down
// to match the muted icons used everywhere else in this dialog.
const dateTimeInputClass =
  "[&::-webkit-calendar-picker-indicator]:ml-2 [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:cursor-pointer";

const dateValue = (value: string) => format(new Date(value), "yyyy-MM-dd");
const timeValue = (value: string) => format(new Date(value), "HH:mm");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizedEmail(value: string) {
  return value.trim().toLowerCase();
}

function CalendarDot({ color }: { color: string }) {
  return (
    <span
      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
}

async function edgeFunctionErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "context" in error) {
    const context = (error as { context?: unknown }).context;
    if (context instanceof Response) {
      const body = await context
        .clone()
        .json()
        .catch(() => null);
      if (body && typeof body === "object" && "error" in body && typeof body.error === "string")
        return body.error;
    }
  }
  return error instanceof Error ? error.message : "Não foi possível sincronizar a ata.";
}

function MeetingMinutesPanel({ event }: { event: AgendaEvent }) {
  const queryClient = useQueryClient();
  const [syncing, setSyncing] = useState(false);
  const isMeet = /meet\.google\.com\/[a-z]{3,}-[a-z]{3,}-[a-z]{3,}/i.test(event.meeting_url ?? "");
  const { data: minutes, isLoading } = useQuery({
    queryKey: ["meeting_minutes", event.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("meeting_minutes")
        .select("status, google_doc_url, generated_at, error_message")
        .eq("calendar_event_id", event.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: isMeet,
  });
  const ended = new Date(event.ends_at) <= new Date();
  const syncMinutes = async () => {
    setSyncing(true);
    const { data, error } = await supabase.functions.invoke("google-meet-minutes-sync", {
      body: { eventId: event.id },
    });
    setSyncing(false);
    if (error) return toast.error(await edgeFunctionErrorMessage(error));
    if (data?.error) return toast.error(data.error);
    await queryClient.invalidateQueries({ queryKey: ["meeting_minutes", event.id] });
    if (data.status === "ready") toast.success("Ata da reunião encontrada.");
    else toast.message(data.reason || "A ata ainda não está disponível.");
  };

  const statusText = !isMeet
    ? "Adicione um link do Google Meet para buscar a ata desta reunião."
    : !ended
      ? "A ata será procurada após o término da reunião."
      : minutes?.status === "ready"
        ? "Ata do Gemini disponível."
        : minutes?.status === "unavailable"
          ? "Nenhuma ata do Gemini foi encontrada para esta reunião."
          : minutes?.status === "error"
            ? minutes.error_message || "Não foi possível consultar a ata."
            : "Aguardando a ata do Gemini ser gerada.";

  return (
    <div className="flex gap-3 rounded-lg border bg-muted/30 p-3">
      <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
      <div className="min-w-0 flex-1 space-y-1">
        <div className="text-sm font-medium">Ata da reunião</div>
        <p className="text-xs text-muted-foreground">
          {isLoading ? "Consultando status…" : statusText}
        </p>
        {minutes?.generated_at && (
          <p className="text-[11px] text-muted-foreground">
            Gerada em {format(new Date(minutes.generated_at), "dd/MM/yyyy 'às' HH:mm")}
          </p>
        )}
        <div className="flex flex-wrap gap-2 pt-1">
          {minutes?.google_doc_url && (
            <Button asChild size="sm" variant="outline">
              <a href={minutes.google_doc_url} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Abrir ata
              </a>
            </Button>
          )}
          <Button
            size="sm"
            variant={minutes?.google_doc_url ? "ghost" : "outline"}
            onClick={() => void syncMinutes()}
            disabled={syncing || !ended || !isMeet}
          >
            {syncing ? (
              <LoaderCircle className="mr-1.5 h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
            )}
            {minutes?.google_doc_url ? "Atualizar" : "Buscar ata"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function AgendaEventDialog({
  open,
  onOpenChange,
  event,
  defaultDate,
  defaultStartTime,
  onSaved,
}: Props) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: calendarSources = [] } = useAgendaCalendarSources();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState(defaultStartTime ?? defaultStartTimeValue);
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState(defaultEndTime);
  const [allDay, setAllDay] = useState(false);
  const [location, setLocation] = useState("");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [createGoogleMeet, setCreateGoogleMeet] = useState(false);
  const [autoSmartNotes, setAutoSmartNotes] = useState(true);
  const [autoTranscription, setAutoTranscription] = useState(false);
  const [calendarId, setCalendarId] = useState("");
  const [attendeeEmails, setAttendeeEmails] = useState<string[]>([]);
  const [attendeeInput, setAttendeeInput] = useState("");
  const [attendeeFocused, setAttendeeFocused] = useState(false);
  const [activeAttendeeSuggestion, setActiveAttendeeSuggestion] = useState(-1);
  const [saving, setSaving] = useState(false);
  const [createdEvent, setCreatedEvent] = useState<AgendaEvent | null>(null);
  const [creatingMeetingLink, setCreatingMeetingLink] = useState(false);
  const activeEvent = event ?? createdEvent;
  // Profiles hide e-mail addresses at table level. This RPC deliberately exposes
  // the active collaborators of the current workspace, so the invite autocomplete
  // works without weakening that privacy rule.
  const { data: inviteProfiles = [] } = useAssignableProfiles();

  // The shared company calendar is the sensible default target for a
  // person creating a compromisso without picking whose agenda it belongs to.
  const defaultCalendarId = useMemo(
    () =>
      calendarSources.find((source) => source.is_shared)?.google_calendar_id ??
      calendarSources[0]?.google_calendar_id ??
      "",
    [calendarSources],
  );

  useEffect(() => {
    if (!open) return;
    if (event) {
      setCreatedEvent(null);
      setCreatingMeetingLink(false);
      setTitle(event.title);
      setDescription(event.description ?? "");
      setStartDate(dateValue(event.starts_at));
      setStartTime(timeValue(event.starts_at));
      setEndDate(dateValue(event.ends_at));
      setEndTime(timeValue(event.ends_at));
      setAllDay(event.is_all_day);
      setLocation(event.location ?? "");
      setAttendeeEmails(event.attendee_emails ?? []);
      setAttendeeInput("");
      setActiveAttendeeSuggestion(-1);
      setMeetingUrl(event.meeting_url ?? "");
      setCreateGoogleMeet(false);
      setAutoSmartNotes(event.auto_smart_notes ?? true);
      setAutoTranscription(event.auto_transcription ?? false);
      setCalendarId(event.google_calendar_id ?? defaultCalendarId);
      return;
    }
    const date = format(defaultDate ?? new Date(), "yyyy-MM-dd");
    setTitle("");
    setDescription("");
    setStartDate(date);
    setStartTime(defaultStartTime ?? defaultStartTimeValue);
    const [hours, minutes] = (defaultStartTime ?? "09:00").split(":").map(Number);
    const end = new Date(2000, 0, 1, hours + 1, minutes);
    setEndDate(date);
    setEndTime(format(end, "HH:mm"));
    setAllDay(false);
    setLocation("");
    setAttendeeEmails([]);
    setAttendeeInput("");
    setActiveAttendeeSuggestion(-1);
    setMeetingUrl("");
    setCreateGoogleMeet(Boolean(defaultCalendarId));
    setAutoSmartNotes(true);
    setAutoTranscription(false);
    setCalendarId(defaultCalendarId);
    setCreatedEvent(null);
    setCreatingMeetingLink(false);
  }, [open, event, defaultDate, defaultStartTime, defaultCalendarId]);

  const toIso = (date: string, time: string) => new Date(`${date}T${time}:00`).toISOString();

  const addAttendee = (email: string) => {
    const normalized = normalizedEmail(email);
    if (!emailPattern.test(normalized))
      return toast.error("Informe um e-mail válido para o convidado.");
    setAttendeeEmails((current) =>
      current.includes(normalized) ? current : [...current, normalized],
    );
    setAttendeeInput("");
    setActiveAttendeeSuggestion(-1);
  };

  const attendeeSuggestions = useMemo(() => {
    const query = normalizedEmail(attendeeInput);
    return inviteProfiles
      .filter(
        (profile) =>
          profile.email &&
          !attendeeEmails.includes(normalizedEmail(profile.email)) &&
          `${profile.full_name ?? ""} ${profile.email}`.toLowerCase().includes(query),
      )
      .slice(0, 5);
  }, [attendeeEmails, attendeeInput, inviteProfiles]);

  const save = async () => {
    if (!user) return;
    if (!title.trim()) return toast.error("Informe o título do compromisso.");
    if (!startDate || !endDate) return toast.error("Informe a data de início e término.");

    const startsAt = toIso(startDate, allDay ? "00:00" : (startTime ?? defaultStartTimeValue));
    const endsAt = toIso(endDate, allDay ? "23:59" : endTime);
    if (new Date(endsAt) <= new Date(startsAt))
      return toast.error("O término deve ser posterior ao início.");

    const selectedCalendar = calendarSources.find(
      (source) => source.google_calendar_id === calendarId,
    );

    setSaving(true);
    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      starts_at: startsAt,
      ends_at: endsAt,
      is_all_day: allDay,
      location: location.trim() || null,
      attendee_emails: attendeeEmails,
      meeting_url: createGoogleMeet ? null : meetingUrl.trim() || null,
      create_google_meet: createGoogleMeet && !meetingUrl.trim(),
      auto_smart_notes: autoSmartNotes,
      auto_transcription: autoTranscription,
      // The person picks whose agenda the compromisso belongs to; the color
      // follows that calendar automatically instead of being chosen by hand.
      google_calendar_id: calendarId || null,
      color: selectedCalendar?.color ?? fallbackColor,
      updated_by: user.id,
      source: activeEvent?.source ?? "taskflow",
      sync_status: "pending",
    };
    const table = supabase.from("calendar_events" as any) as any;
    const result = activeEvent
      ? await table.update(payload).eq("id", activeEvent.id)
      : await table
          .insert({ ...payload, created_by: user.id })
          .select()
          .single();
    if (result.error) {
      setSaving(false);
      return toast.error(result.error.message);
    }
    await queryClient.invalidateQueries({ queryKey: ["agenda_events"] });
    toast.success(activeEvent ? "Compromisso atualizado" : "Compromisso criado");
    if (!activeEvent) {
      const insertedEvent = result.data as AgendaEvent;
      const needsMeetingLink = createGoogleMeet && !meetingUrl.trim();
      // Render the waiting state before the network sync starts. Without this
      // flush, a very fast Calendar response can skip the visual feedback.
      flushSync(() => {
        setCreatedEvent(insertedEvent);
        setCreatingMeetingLink(needsMeetingLink);
      });
      await onSaved?.();
      const { data: syncedEvent } = await table
        .select("*")
        .eq("id", insertedEvent.id)
        .maybeSingle();
      if (syncedEvent) {
        setCreatedEvent(syncedEvent as AgendaEvent);
        setMeetingUrl(syncedEvent.meeting_url ?? "");
      }
      setCreatingMeetingLink(false);
      setSaving(false);
      return;
    }
    setSaving(false);
    onOpenChange(false);
    await onSaved?.();
  };

  const remove = async () => {
    if (!activeEvent || !user) return;
    if (!window.confirm(`Excluir “${activeEvent.title}”?`)) return;
    setSaving(true);
    const { error } = await (supabase.from("calendar_events" as any) as any)
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: user.id,
        updated_by: user.id,
        sync_status: "pending",
      })
      .eq("id", activeEvent.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    await queryClient.invalidateQueries({ queryKey: ["agenda_events"] });
    toast.success("Compromisso excluído");
    onOpenChange(false);
    await onSaved?.();
  };

  const copyMeetingLink = async () => {
    try {
      await navigator.clipboard.writeText(meetingUrl);
      toast.success("Link da reunião copiado.");
    } catch {
      toast.error("Não foi possível copiar o link da reunião.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
        <DialogTitle className="sr-only">
          {activeEvent ? "Editar compromisso" : "Novo compromisso"}
        </DialogTitle>
        <div className="space-y-5 pt-1">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Adicionar título"
            autoFocus
            className="h-auto rounded-none border-0 border-b px-0 pb-2 text-xl font-medium shadow-none focus-visible:ring-0 focus-visible:border-primary"
          />

          <div className="flex gap-3">
            <Clock className="mt-2 h-5 w-5 shrink-0 text-muted-foreground" />
            <div className="flex-1 space-y-2">
              {allDay ? (
                // An all-day compromisso can span several days (e.g. "Ausente"),
                // so both edges stay editable dates, same as Google's all-day view.
                <div className="flex flex-wrap items-center gap-2">
                  <Input
                    aria-label="Data de início"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={`w-auto min-w-[10.5rem] flex-1 ${dateTimeInputClass}`}
                  />
                  <span className="text-muted-foreground">–</span>
                  <Input
                    aria-label="Data de término"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={`w-auto min-w-[10.5rem] flex-1 ${dateTimeInputClass}`}
                  />
                </div>
              ) : (
                // A timed compromisso keeps a single date shared by start and
                // end, with the two times side by side — the same compact
                // layout Google uses for same-day events.
                <div className="flex flex-wrap items-center gap-2">
                  <Input
                    aria-label="Data"
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setEndDate(e.target.value);
                    }}
                    className={`w-auto min-w-[10.5rem] flex-1 ${dateTimeInputClass}`}
                  />
                  <Input
                    aria-label="Hora de início"
                    type="time"
                    value={startTime ?? defaultStartTimeValue}
                    onChange={(e) => setStartTime(e.target.value)}
                    className={`w-[132px] shrink-0 ${dateTimeInputClass}`}
                  />
                  <span className="text-muted-foreground">–</span>
                  <Input
                    aria-label="Hora de término"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className={`w-[132px] shrink-0 ${dateTimeInputClass}`}
                  />
                </div>
              )}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="agenda-all-day"
                  checked={allDay}
                  onCheckedChange={(checked) => setAllDay(checked === true)}
                />
                <Label
                  htmlFor="agenda-all-day"
                  className="cursor-pointer font-normal text-muted-foreground"
                >
                  Dia inteiro
                </Label>
              </div>
            </div>
          </div>

          {calendarSources.length > 0 && (
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 shrink-0 text-muted-foreground" />
              <Select value={calendarId} onValueChange={setCalendarId}>
                <SelectTrigger className="rounded-md">
                  <SelectValue placeholder="Selecionar agenda" />
                </SelectTrigger>
                <SelectContent>
                  {calendarSources.map((source) => (
                    <SelectItem key={source.google_calendar_id} value={source.google_calendar_id}>
                      <span className="flex items-center gap-2">
                        <CalendarDot color={source.color} />
                        {source.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-start gap-3">
            <UserPlus className="mt-2.5 h-5 w-5 shrink-0 text-muted-foreground" />
            <div className="relative min-w-0 flex-1">
              <div
                className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-md border bg-background px-2 py-1.5 shadow-sm transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
                onClick={() => setAttendeeFocused(true)}
              >
                {attendeeEmails.map((email) => (
                  <span
                    key={email}
                    className="inline-flex max-w-full items-center gap-1 rounded-sm bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                  >
                    <span className="truncate">{email}</span>
                    <button
                      type="button"
                      aria-label={`Remover ${email}`}
                      className="rounded-sm text-primary/70 transition-colors hover:text-primary"
                      onClick={(event) => {
                        event.stopPropagation();
                        setAttendeeEmails((current) => current.filter((item) => item !== email));
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                <Input
                  value={attendeeInput}
                  onFocus={() => setAttendeeFocused(true)}
                  onBlur={() => window.setTimeout(() => setAttendeeFocused(false), 150)}
                  onChange={(event) => {
                    setAttendeeInput(event.target.value);
                    setActiveAttendeeSuggestion(-1);
                  }}
                  onKeyDown={(event) => {
                    if (
                      (event.key === "ArrowDown" || event.key === "ArrowUp") &&
                      attendeeSuggestions.length
                    ) {
                      event.preventDefault();
                      setActiveAttendeeSuggestion((current) => {
                        if (event.key === "ArrowDown")
                          return current < attendeeSuggestions.length - 1 ? current + 1 : 0;
                        return current > 0 ? current - 1 : attendeeSuggestions.length - 1;
                      });
                      return;
                    }
                    if (event.key === "Enter" || event.key === "Tab" || event.key === ",") {
                      const selectedSuggestion = attendeeSuggestions[activeAttendeeSuggestion];
                      if (!selectedSuggestion && !attendeeInput.trim()) return;
                      event.preventDefault();
                      if (selectedSuggestion) addAttendee(selectedSuggestion.email!);
                      else addAttendee(attendeeInput);
                    }
                    if (event.key === "Backspace" && !attendeeInput && attendeeEmails.length) {
                      setAttendeeEmails((current) => current.slice(0, -1));
                    }
                  }}
                  className="h-6 min-w-36 flex-1 border-0 bg-transparent px-1 py-0 text-sm shadow-none focus-visible:ring-0"
                  role="combobox"
                  aria-expanded={attendeeFocused && attendeeSuggestions.length > 0}
                  aria-activedescendant={
                    activeAttendeeSuggestion >= 0
                      ? `attendee-suggestion-${attendeeSuggestions[activeAttendeeSuggestion]?.id}`
                      : undefined
                  }
                  placeholder={
                    attendeeEmails.length ? "Adicionar mais convidados" : "Adicionar convidados"
                  }
                />
              </div>
              {attendeeFocused && attendeeSuggestions.length > 0 && (
                <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border bg-popover p-1 shadow-md">
                  {attendeeSuggestions.map((profile) => (
                    <button
                      key={profile.id}
                      id={`attendee-suggestion-${profile.id}`}
                      type="button"
                      className={`flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm transition-colors hover:bg-muted ${
                        attendeeSuggestions[activeAttendeeSuggestion]?.id === profile.id
                          ? "bg-muted"
                          : ""
                      }`}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => addAttendee(profile.email!)}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                        {(profile.full_name || profile.email || "?").slice(0, 1).toUpperCase()}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-medium">
                          {profile.full_name || profile.email}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {profile.email}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Adicionar local"
            />
          </div>

          <div className="flex items-center gap-3">
            <Video className="h-5 w-5 shrink-0 text-muted-foreground" />
            <div className="flex-1 space-y-2">
              <div
                className={`rounded-md border px-3 py-2 transition-colors ${
                  createGoogleMeet ? "border-primary/35 bg-primary/5" : "bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="agenda-create-google-meet" className="cursor-pointer">
                    <span className="space-y-0.5">
                      <span className="block text-sm font-medium">Criar Google Meet</span>
                      <span className="block text-xs font-normal text-muted-foreground">
                        {createGoogleMeet
                          ? meetingUrl
                            ? "Link do Google Meet criado"
                            : creatingMeetingLink
                              ? "Criando link do Google Meet…"
                              : createdEvent
                                ? "O link ainda não está disponível"
                                : "O link será criado ao salvar"
                          : "Use um link manual ou ative a criação automática"}
                      </span>
                    </span>
                  </Label>
                  <Switch
                    id="agenda-create-google-meet"
                    checked={createGoogleMeet}
                    disabled={!calendarId || Boolean(createdEvent) || creatingMeetingLink}
                    onCheckedChange={(enabled) => {
                      setCreateGoogleMeet(enabled);
                      if (enabled) setMeetingUrl("");
                    }}
                  />
                </div>
                {createGoogleMeet && (
                  <div className="mt-3 space-y-2 border-t border-primary/15 pt-2.5">
                    <div className="flex items-center justify-between gap-3">
                      <Label htmlFor="agenda-auto-smart-notes" className="cursor-pointer">
                        <span className="block text-sm font-medium">Gerar ata com Gemini</span>
                        <span className="block text-xs font-normal text-muted-foreground">
                          Cria as anotações inteligentes da reunião
                        </span>
                      </Label>
                      <Switch
                        id="agenda-auto-smart-notes"
                        checked={autoSmartNotes}
                        onCheckedChange={setAutoSmartNotes}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <Label htmlFor="agenda-auto-transcription" className="cursor-pointer">
                        <span className="block text-sm font-medium">Gerar transcrição</span>
                        <span className="block text-xs font-normal text-muted-foreground">
                          Salva o texto falado durante a reunião
                        </span>
                      </Label>
                      <Switch
                        id="agenda-auto-transcription"
                        checked={autoTranscription}
                        onCheckedChange={setAutoTranscription}
                      />
                    </div>
                  </div>
                )}
                {meetingUrl && (
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-primary/15 pt-2.5">
                    <Button asChild size="sm" className="h-8">
                      <a href={meetingUrl} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Entrar na reunião
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8"
                      onClick={() => void copyMeetingLink()}
                    >
                      <Copy className="mr-1.5 h-3.5 w-3.5" /> Copiar link
                    </Button>
                  </div>
                )}
              </div>
              {!createGoogleMeet && (
                <Input
                  type="url"
                  placeholder="Adicionar link da reunião"
                  value={meetingUrl}
                  onChange={(e) => setMeetingUrl(e.target.value)}
                />
              )}
            </div>
          </div>

          {activeEvent && (
            <MeetingMinutesPanel event={{ ...activeEvent, meeting_url: meetingUrl }} />
          )}

          <div className="flex gap-3">
            <AlignLeft className="mt-2 h-5 w-5 shrink-0 text-muted-foreground" />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Adicionar descrição"
              rows={3}
              className="flex-1"
            />
          </div>
        </div>
        <DialogFooter className="mt-2 gap-3 border-t pt-4 sm:justify-end">
          {activeEvent ? (
            <Button
              type="button"
              variant="destructive"
              onClick={() => void remove()}
              disabled={saving || creatingMeetingLink}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Excluir
            </Button>
          ) : null}
          <Button
            type="button"
            onClick={() => void save()}
            disabled={saving || creatingMeetingLink}
          >
            {(saving || creatingMeetingLink) && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            {creatingMeetingLink ? "Criando link…" : activeEvent ? "Salvar alterações" : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
