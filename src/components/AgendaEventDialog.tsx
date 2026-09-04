import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { AlignLeft, CalendarDays, Clock, LoaderCircle, MapPin, Trash2, Video } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useAgendaCalendarSources, type AgendaEvent } from "@/hooks/use-data";

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

function CalendarDot({ color }: { color: string }) {
  return (
    <span
      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
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
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState(defaultEndTime);
  const [allDay, setAllDay] = useState(false);
  const [location, setLocation] = useState("");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [calendarId, setCalendarId] = useState("");
  const [saving, setSaving] = useState(false);

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
      setTitle(event.title);
      setDescription(event.description ?? "");
      setStartDate(dateValue(event.starts_at));
      setStartTime(timeValue(event.starts_at));
      setEndDate(dateValue(event.ends_at));
      setEndTime(timeValue(event.ends_at));
      setAllDay(event.is_all_day);
      setLocation(event.location ?? "");
      setMeetingUrl(event.meeting_url ?? "");
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
    setMeetingUrl("");
    setCalendarId(defaultCalendarId);
  }, [open, event, defaultDate, defaultStartTime, defaultCalendarId]);

  const toIso = (date: string, time: string) => new Date(`${date}T${time}:00`).toISOString();

  const save = async () => {
    if (!user) return;
    if (!title.trim()) return toast.error("Informe o título do compromisso.");
    if (!startDate || !endDate) return toast.error("Informe a data de início e término.");

    const startsAt = toIso(startDate, allDay ? "00:00" : startTime);
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
      meeting_url: meetingUrl.trim() || null,
      // The person picks whose agenda the compromisso belongs to; the color
      // follows that calendar automatically instead of being chosen by hand.
      google_calendar_id: calendarId || null,
      color: selectedCalendar?.color ?? fallbackColor,
      updated_by: user.id,
      source: event?.source ?? "taskflow",
      sync_status: "pending",
    };
    const table = supabase.from("calendar_events" as any) as any;
    const result = event
      ? await table.update(payload).eq("id", event.id)
      : await table.insert({ ...payload, created_by: user.id });
    setSaving(false);
    if (result.error) return toast.error(result.error.message);
    await queryClient.invalidateQueries({ queryKey: ["agenda_events"] });
    toast.success(event ? "Compromisso atualizado" : "Compromisso criado");
    onOpenChange(false);
    await onSaved?.();
  };

  const remove = async () => {
    if (!event || !user) return;
    if (!window.confirm(`Excluir “${event.title}”?`)) return;
    setSaving(true);
    const { error } = await (supabase.from("calendar_events" as any) as any)
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: user.id,
        updated_by: user.id,
        sync_status: "pending",
      })
      .eq("id", event.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    await queryClient.invalidateQueries({ queryKey: ["agenda_events"] });
    toast.success("Compromisso excluído");
    onOpenChange(false);
    await onSaved?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
        <DialogTitle className="sr-only">
          {event ? "Editar compromisso" : "Novo compromisso"}
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
                    value={startTime}
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
            <Input
              type="url"
              placeholder="Adicionar link da reunião"
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
            />
          </div>

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
          {event ? (
            <Button
              type="button"
              variant="destructive"
              onClick={() => void remove()}
              disabled={saving}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Excluir
            </Button>
          ) : null}
          <Button type="button" onClick={() => void save()} disabled={saving}>
            {saving && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
