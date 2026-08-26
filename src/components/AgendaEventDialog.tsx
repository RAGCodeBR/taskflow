import { useEffect, useState } from "react";
import { format } from "date-fns";
import { LoaderCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import type { AgendaEvent } from "@/hooks/use-data";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: AgendaEvent | null;
  defaultDate?: Date | null;
};

const defaultStartTime = "09:00";
const defaultEndTime = "10:00";

const dateValue = (value: string) => format(new Date(value), "yyyy-MM-dd");
const timeValue = (value: string) => format(new Date(value), "HH:mm");

export function AgendaEventDialog({ open, onOpenChange, event, defaultDate }: Props) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState(defaultEndTime);
  const [allDay, setAllDay] = useState(false);
  const [location, setLocation] = useState("");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [color, setColor] = useState("#2563eb");
  const [saving, setSaving] = useState(false);

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
      setColor(event.color);
      return;
    }
    const date = format(defaultDate ?? new Date(), "yyyy-MM-dd");
    setTitle("");
    setDescription("");
    setStartDate(date);
    setStartTime(defaultStartTime);
    setEndDate(date);
    setEndTime(defaultEndTime);
    setAllDay(false);
    setLocation("");
    setMeetingUrl("");
    setColor("#2563eb");
  }, [open, event, defaultDate]);

  const toIso = (date: string, time: string) => new Date(`${date}T${time}:00`).toISOString();

  const save = async () => {
    if (!user) return;
    if (!title.trim()) return toast.error("Informe o título do compromisso.");
    if (!startDate || !endDate) return toast.error("Informe a data de início e término.");

    const startsAt = toIso(startDate, allDay ? "00:00" : startTime);
    const endsAt = toIso(endDate, allDay ? "23:59" : endTime);
    if (new Date(endsAt) <= new Date(startsAt))
      return toast.error("O término deve ser posterior ao início.");

    setSaving(true);
    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      starts_at: startsAt,
      ends_at: endsAt,
      is_all_day: allDay,
      location: location.trim() || null,
      meeting_url: meetingUrl.trim() || null,
      color,
      updated_by: user.id,
      source: event?.source ?? "taskflow",
      sync_status: event?.google_event_id ? "pending" : "not_configured",
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
  };

  const remove = async () => {
    if (!event || !user) return;
    if (!window.confirm(`Excluir “${event.title}”?`)) return;
    setSaving(true);
    const { error } = await (supabase.from("calendar_events" as any) as any)
      .update({ deleted_at: new Date().toISOString(), deleted_by: user.id, updated_by: user.id })
      .eq("id", event.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    await queryClient.invalidateQueries({ queryKey: ["agenda_events"] });
    toast.success("Compromisso excluído");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{event ? "Editar compromisso" : "Novo compromisso"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="agenda-title">Título</Label>
            <Input
              id="agenda-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="agenda-all-day"
              checked={allDay}
              onCheckedChange={(checked) => setAllDay(checked === true)}
            />
            <Label htmlFor="agenda-all-day" className="cursor-pointer">
              Dia inteiro
            </Label>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="agenda-start-date">Início</Label>
              <div className="flex gap-2">
                <Input
                  id="agenda-start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                {!allDay && (
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="agenda-end-date">Término</Label>
              <div className="flex gap-2">
                <Input
                  id="agenda-end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                {!allDay && (
                  <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="agenda-description">Descrição</Label>
            <Textarea
              id="agenda-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="agenda-location">Local</Label>
              <Input
                id="agenda-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agenda-meeting-url">Link da reunião</Label>
              <Input
                id="agenda-meeting-url"
                type="url"
                placeholder="https://"
                value={meetingUrl}
                onChange={(e) => setMeetingUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="agenda-color">Cor</Label>
            <Input
              id="agenda-color"
              type="color"
              className="h-9 w-14 p-1"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="gap-2 sm:justify-between">
          {event ? (
            <Button
              type="button"
              variant="destructive"
              onClick={() => void remove()}
              disabled={saving}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Excluir
            </Button>
          ) : (
            <span />
          )}
          <Button type="button" onClick={() => void save()} disabled={saving}>
            {saving && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Salvar compromisso
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
