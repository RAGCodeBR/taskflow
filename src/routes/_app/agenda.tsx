import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  addDays,
  addWeeks,
  differenceInMinutes,
  endOfDay,
  format,
  isSameDay,
  isToday,
  startOfDay,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AgendaEventDialog } from "@/components/AgendaEventDialog";
import { useAgendaEvents, useGoogleCalendarConnection, type AgendaEvent } from "@/hooks/use-data";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/agenda")({ component: AgendaPage });

const DAY_START_HOUR = 0;
const DAY_END_HOUR = 24;
const HOUR_HEIGHT = 64;
const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function AgendaPage() {
  const { data: events = [], isLoading, error } = useAgendaEvents();
  const { data: googleConnection, isLoading: loadingGoogle } = useGoogleCalendarConnection();
  const queryClient = useQueryClient();
  const [cursor, setCursor] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AgendaEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [connectingGoogle, setConnectingGoogle] = useState(false);

  const weekStart = useMemo(() => startOfWeek(cursor, { weekStartsOn: 1 }), [cursor]);
  const days = useMemo(
    () => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)),
    [weekStart],
  );
  const totalHeight = (DAY_END_HOUR - DAY_START_HOUR) * HOUR_HEIGHT;
  const allDayEvents = events.filter((event) => event.is_all_day);

  const openNew = (date: Date = new Date(), time: string | null = null) => {
    setEditing(null);
    setSelectedDate(date);
    setSelectedTime(time);
    setDialogOpen(true);
  };

  const timedEventsForDay = (day: Date) =>
    events.filter(
      (event) =>
        !event.is_all_day &&
        new Date(event.starts_at) < endOfDay(day) &&
        new Date(event.ends_at) > startOfDay(day),
    );
  const allDayEventsForDay = (day: Date) =>
    allDayEvents.filter((event) => isSameDay(new Date(event.starts_at), day));

  useEffect(() => {
    const result = new URLSearchParams(window.location.search).get("google");
    if (!result) return;
    if (result === "connected") toast.success("Conta Google conectada com sucesso.");
    if (result === "cancelled") toast.message("A conexão com o Google foi cancelada.");
    if (result === "error") toast.error("Não foi possível concluir a conexão com o Google.");
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  const connectGoogle = async () => {
    setConnectingGoogle(true);
    const { data, error: invokeError } = await supabase.functions.invoke("google-calendar-oauth", {
      body: { action: "start" },
    });
    setConnectingGoogle(false);
    if (invokeError || !data?.authorizeUrl) {
      toast.error(
        invokeError?.message || data?.error || "Não foi possível iniciar a conexão Google.",
      );
      return;
    }
    window.location.assign(data.authorizeUrl);
  };

  const disconnectGoogle = async () => {
    if (
      !googleConnection ||
      !window.confirm(`Desconectar a conta ${googleConnection.google_email}?`)
    )
      return;
    setConnectingGoogle(true);
    const { data, error: invokeError } = await supabase.functions.invoke("google-calendar-oauth", {
      body: { action: "disconnect" },
    });
    setConnectingGoogle(false);
    if (invokeError || !data?.ok) {
      toast.error(
        invokeError?.message || data?.error || "Não foi possível desconectar a conta Google.",
      );
      return;
    }
    await queryClient.invalidateQueries({ queryKey: ["google_calendar_connection"] });
    toast.success("Conta Google desconectada.");
  };

  const eventStyle = (event: AgendaEvent, day: Date) => {
    const dayStart = startOfDay(day);
    const dayEnd = endOfDay(day);
    const start = new Date(event.starts_at) < dayStart ? dayStart : new Date(event.starts_at);
    const end = new Date(event.ends_at) > dayEnd ? dayEnd : new Date(event.ends_at);
    const startMinutes = differenceInMinutes(start, dayStart) - DAY_START_HOUR * 60;
    const duration = Math.max(30, differenceInMinutes(end, start));
    return {
      top: Math.max(0, (startMinutes / 60) * HOUR_HEIGHT),
      height: Math.max(26, (duration / 60) * HOUR_HEIGHT),
    };
  };

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold">Agenda</h1>
          <Badge variant="outline">Compartilhada</Badge>
        </div>
        <Button onClick={() => openNew()}>
          <Plus className="mr-2 h-4 w-4" /> Novo compromisso
        </Button>
      </header>

      <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">Google Agenda</p>
          <p className="text-xs text-muted-foreground">
            {googleConnection
              ? `Conectado como ${googleConnection.google_email}`
              : "Conecte sua conta para autorizar a Agenda compartilhada."}
          </p>
        </div>
        {!loadingGoogle && !googleConnection && (
          <Button
            variant="outline"
            onClick={() => void connectGoogle()}
            disabled={connectingGoogle}
          >
            {connectingGoogle ? "Conectando…" : "Conectar Google Agenda"}
          </Button>
        )}
        {!loadingGoogle && googleConnection && (
          <Button
            variant="outline"
            onClick={() => void disconnectGoogle()}
            disabled={connectingGoogle}
          >
            {connectingGoogle ? "Desconectando…" : "Desconectar Google Agenda"}
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-card p-3">
        <Button variant="outline" onClick={() => setCursor(new Date())}>
          Hoje
        </Button>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Semana anterior"
          onClick={() => setCursor(subWeeks(cursor, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Próxima semana"
          onClick={() => setCursor(addWeeks(cursor, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <span className="ml-1 text-base font-semibold capitalize sm:text-lg">
          {format(weekStart, "MMMM 'de' yyyy", { locale: ptBR })}
        </span>
        <Badge variant="secondary" className="ml-auto">
          Semana
        </Badge>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          Não foi possível carregar a Agenda: {(error as Error).message}
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border bg-card">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-[64px_repeat(7,minmax(118px,1fr))] border-b">
            <div className="border-r" />
            {days.map((day, index) => (
              <div
                key={day.toISOString()}
                className="min-h-16 border-r px-2 py-2 text-center last:border-r-0"
              >
                <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  {DAYS[index]}
                </div>
                <button
                  onClick={() => openNew(day)}
                  className={`mx-auto mt-1 grid h-9 w-9 place-items-center rounded-full text-xl hover:bg-muted ${isToday(day) ? "bg-primary font-semibold text-primary-foreground hover:bg-primary" : ""}`}
                >
                  {format(day, "d")}
                </button>
                <div className="mt-1 space-y-1 text-left">
                  {allDayEventsForDay(day)
                    .slice(0, 2)
                    .map((event) => (
                      <button
                        key={event.id}
                        onClick={() => {
                          setEditing(event);
                          setDialogOpen(true);
                        }}
                        className="block w-full truncate rounded px-1 py-0.5 text-[10px] font-medium text-white"
                        style={{ backgroundColor: event.color }}
                      >
                        {event.title}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-[64px_repeat(7,minmax(118px,1fr))]">
            <div className="relative border-r" style={{ height: totalHeight }}>
              {Array.from({ length: DAY_END_HOUR - DAY_START_HOUR }, (_, index) => (
                <div
                  key={index}
                  className="absolute -top-2 right-2 text-[10px] text-muted-foreground"
                  style={{ top: index * HOUR_HEIGHT }}
                >
                  {String(DAY_START_HOUR + index).padStart(2, "0")}:00
                </div>
              ))}
            </div>
            {days.map((day) => (
              <div
                key={day.toISOString()}
                className="relative border-r last:border-r-0"
                style={{ height: totalHeight }}
              >
                {Array.from({ length: DAY_END_HOUR - DAY_START_HOUR }, (_, index) => (
                  <button
                    key={index}
                    aria-label={`Criar compromisso às ${DAY_START_HOUR + index}:00`}
                    onClick={() =>
                      openNew(day, `${String(DAY_START_HOUR + index).padStart(2, "0")}:00`)
                    }
                    className="absolute left-0 right-0 border-b border-border/70 hover:bg-primary/5"
                    style={{ top: index * HOUR_HEIGHT, height: HOUR_HEIGHT }}
                  />
                ))}
                {timedEventsForDay(day).map((event) => {
                  const style = eventStyle(event, day);
                  return (
                    <button
                      key={event.id}
                      onClick={() => {
                        setEditing(event);
                        setDialogOpen(true);
                      }}
                      className="absolute left-1 right-1 z-10 overflow-hidden rounded-md px-1.5 py-1 text-left text-[11px] text-white shadow-sm hover:brightness-95"
                      style={{ ...style, backgroundColor: event.color }}
                      title={event.title}
                    >
                      <span className="block truncate font-semibold">{event.title}</span>
                      <span className="block truncate">
                        {format(new Date(event.starts_at), "HH:mm")} –{" "}
                        {format(new Date(event.ends_at), "HH:mm")}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      {!isLoading && events.length === 0 && (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          Ainda não há compromissos. Clique em um horário da grade para criar o primeiro.
        </div>
      )}
      <AgendaEventDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        event={editing}
        defaultDate={selectedDate}
        defaultStartTime={selectedTime}
      />
    </div>
  );
}
