import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  addDays,
  addMinutes,
  addWeeks,
  addYears,
  differenceInMinutes,
  endOfDay,
  format,
  isSameDay,
  isToday,
  startOfDay,
  startOfWeek,
  subMonths,
  subWeeks,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AgendaEventDialog } from "@/components/AgendaEventDialog";
import {
  useAgendaCalendarSources,
  useAgendaEvents,
  useGoogleCalendarConnection,
  type AgendaEvent,
  type AgendaCalendarSource,
} from "@/hooks/use-data";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/agenda")({ component: AgendaPage });

const DAY_START_HOUR = 0;
const DAY_END_HOUR = 24;
const HOUR_HEIGHT = 64;
const SNAP_MINUTES = 15;

type ScheduleChange = Pick<AgendaEvent, "starts_at" | "ends_at">;
type Gesture = {
  event: AgendaEvent;
  mode: "move" | "resize";
  startY: number;
  moved: boolean;
};
const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function AgendaPage() {
  const [cursor, setCursor] = useState(new Date());
  const weekStart = useMemo(() => startOfWeek(cursor, { weekStartsOn: 1 }), [cursor]);
  const agendaRangeStart = useMemo(() => startOfDay(weekStart).toISOString(), [weekStart]);
  const agendaRangeEnd = useMemo(() => endOfDay(addDays(weekStart, 6)).toISOString(), [weekStart]);
  const { data: events = [], isLoading, error } = useAgendaEvents(agendaRangeStart, agendaRangeEnd);
  const { data: calendarSources = [] } = useAgendaCalendarSources();
  const { user } = useAuth();
  const { data: googleConnection, isLoading: loadingGoogle } = useGoogleCalendarConnection();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AgendaEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [connectingGoogle, setConnectingGoogle] = useState(false);
  const [syncingGoogle, setSyncingGoogle] = useState(false);
  const [previewSchedule, setPreviewSchedule] = useState<Record<string, ScheduleChange>>({});
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [savingIds, setSavingIds] = useState<string[]>([]);
  const gestureRef = useRef<Gesture | null>(null);
  const skipClickRef = useRef(false);

  const days = useMemo(
    () => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)),
    [weekStart],
  );
  const totalHeight = (DAY_END_HOUR - DAY_START_HOUR) * HOUR_HEIGHT;
  const agendaEvents = events;
  const visibleCalendarIds = useMemo(
    () =>
      new Set(
        calendarSources
          .filter((source) => source.is_visible)
          .map((source) => source.google_calendar_id),
      ),
    [calendarSources],
  );
  const hasActiveCalendarFilter = calendarSources.some((source) => !source.is_visible);
  const visibleEvents = useMemo(
    () =>
      agendaEvents
        .filter(
          (event) =>
            !event.google_calendar_id ||
            calendarSources.length === 0 ||
            !hasActiveCalendarFilter ||
            visibleCalendarIds.has(event.google_calendar_id),
        )
        .map((event) => ({ ...event, ...previewSchedule[event.id] })),
    [
      agendaEvents,
      calendarSources.length,
      hasActiveCalendarFilter,
      previewSchedule,
      visibleCalendarIds,
    ],
  );
  const allDayEvents = visibleEvents.filter((event) => event.is_all_day);

  const openNew = (date: Date = new Date(), time: string | null = null) => {
    setEditing(null);
    setSelectedDate(date);
    setSelectedTime(time);
    setDialogOpen(true);
  };

  const setCalendarVisibility = async (source: AgendaCalendarSource, isVisible: boolean) => {
    if (!user) return;
    const queryKey = ["agenda_calendar_sources", user.id];
    // A sync running in the background (silent or manual) can resolve after
    // this optimistic write and overwrite it with the pre-toggle value from
    // the server, making the checkbox flip back on its own. Cancelling any
    // in-flight fetch for this key first prevents that race.
    await queryClient.cancelQueries({ queryKey });
    const previousSources = queryClient.getQueryData<AgendaCalendarSource[]>(queryKey);
    queryClient.setQueryData<AgendaCalendarSource[]>(queryKey, (current = []) =>
      current.map((item) =>
        item.google_calendar_id === source.google_calendar_id
          ? { ...item, is_visible: isVisible }
          : item,
      ),
    );
    const { data, error: preferenceError } = await supabase.functions.invoke(
      "google-calendar-sync",
      {
        body: {
          action: "set_calendar_visibility",
          googleCalendarId: source.google_calendar_id,
          isVisible,
        },
      },
    );
    if (preferenceError || !data?.ok) {
      queryClient.setQueryData(queryKey, previousSources);
      toast.error("Não foi possível atualizar o filtro da agenda.");
      return;
    }
  };

  const timedEventsForDay = (day: Date) =>
    visibleEvents.filter(
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

  const syncGoogle = async (options: { silent?: boolean; fullRange?: boolean } = {}) => {
    const { silent = false, fullRange = false } = options;
    if (syncingGoogle) return;
    setSyncingGoogle(true);
    // The explicit "Sincronizar agora" button backfills a wide, fixed window
    // instead of only the week currently on screen — otherwise events from
    // any other week never get pulled unless someone happens to sync while
    // looking at that exact week.
    const range = fullRange
      ? {
          start: subMonths(new Date(), 3).toISOString(),
          end: addYears(new Date(), 1).toISOString(),
        }
      : { start: agendaRangeStart, end: agendaRangeEnd };
    const { data, error: invokeError } = await supabase.functions.invoke("google-calendar-sync", {
      body: { rangeStart: range.start, rangeEnd: range.end },
    });
    setSyncingGoogle(false);
    if (invokeError || !data?.ok) {
      let errorMessage =
        data?.error || invokeError?.message || "Não foi possível sincronizar a Agenda.";
      if (invokeError && "context" in invokeError) {
        const detail = await (invokeError as any).context?.json().catch(() => null);
        errorMessage = detail?.error || errorMessage;
      }
      if (!silent) toast.error(errorMessage);
      return;
    }
    if (fullRange) {
      // The response covers a much wider window than the visible week's
      // query key, so refetch each range from the database instead of
      // stuffing the wide result into that one cache entry.
      await queryClient.invalidateQueries({ queryKey: ["agenda_events"] });
    } else {
      const returnedEvents = Array.isArray(data.events) ? (data.events as AgendaEvent[]) : null;
      if (returnedEvents) {
        // A grade recebe a resposta da sincronização imediatamente pelo cache único.
        queryClient.setQueryData(
          ["agenda_events", agendaRangeStart, agendaRangeEnd],
          returnedEvents,
        );
      } else {
        await queryClient.invalidateQueries({ queryKey: ["agenda_events"] });
      }
    }
    await queryClient.invalidateQueries({ queryKey: ["agenda_calendar_sources"] });
    if (!silent) {
      if (data.importErrors?.length) toast.error(data.importErrors[0]);
      else if (data.pushErrors?.length) toast.error(data.pushErrors[0]);
      else
        toast.success(
          `Agenda sincronizada: ${data.pushed} enviados, ${data.pulled} recebidos de ${data.remoteEvents} evento(s) no Google.`,
        );
    }
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

  const scheduleForGesture = (gesture: Gesture, clientY: number): ScheduleChange => {
    const rawDelta = ((clientY - gesture.startY) / HOUR_HEIGHT) * 60;
    const delta = Math.round(rawDelta / SNAP_MINUTES) * SNAP_MINUTES;
    const originalStart = new Date(gesture.event.starts_at);
    const originalEnd = new Date(gesture.event.ends_at);
    const dayStart = startOfDay(originalStart);
    const nextDay = addDays(dayStart, 1);
    if (gesture.mode === "resize") {
      const minEnd = addMinutes(originalStart, SNAP_MINUTES);
      const end = new Date(
        Math.min(
          Math.max(addMinutes(originalEnd, delta).getTime(), minEnd.getTime()),
          nextDay.getTime(),
        ),
      );
      return { starts_at: originalStart.toISOString(), ends_at: end.toISOString() };
    }
    const duration = originalEnd.getTime() - originalStart.getTime();
    const latestStart = new Date(nextDay.getTime() - duration);
    const start = new Date(
      Math.min(
        Math.max(addMinutes(originalStart, delta).getTime(), dayStart.getTime()),
        latestStart.getTime(),
      ),
    );
    return {
      starts_at: start.toISOString(),
      ends_at: new Date(start.getTime() + duration).toISOString(),
    };
  };

  const persistSchedule = async (event: AgendaEvent, schedule: ScheduleChange) => {
    if (!user) return;
    const agendaQueryKey = ["agenda_events", agendaRangeStart, agendaRangeEnd];
    const previousEvents = queryClient.getQueryData<AgendaEvent[]>(agendaQueryKey);
    setSavingIds((ids) => [...ids, event.id]);
    queryClient.setQueryData<AgendaEvent[]>(agendaQueryKey, (current = []) =>
      current.map((item) =>
        item.id === event.id ? { ...item, ...schedule, updated_by: user.id } : item,
      ),
    );
    setPreviewSchedule((current) => {
      const { [event.id]: _removed, ...remaining } = current;
      return remaining;
    });
    try {
      const { error: updateError } = await (supabase.from("calendar_events" as any) as any)
        .update({ ...schedule, updated_by: user.id, sync_status: "pending" })
        .eq("id", event.id);
      if (updateError) throw updateError;
      await queryClient.invalidateQueries({ queryKey: ["agenda_events"] });
      void syncGoogle({ silent: true });
    } catch (updateError) {
      queryClient.setQueryData(agendaQueryKey, previousEvents);
      toast.error("Não foi possível atualizar o evento. A alteração foi desfeita.");
    } finally {
      setSavingIds((ids) => ids.filter((id) => id !== event.id));
    }
  };

  const startGesture = (
    reactEvent: ReactPointerEvent<HTMLDivElement>,
    event: AgendaEvent,
    mode: Gesture["mode"],
  ) => {
    if (reactEvent.button !== 0) return;
    reactEvent.preventDefault();
    reactEvent.stopPropagation();
    gestureRef.current = { event, mode, startY: reactEvent.clientY, moved: false };
    setDraggingId(event.id);
  };

  useEffect(() => {
    const move = (pointerEvent: PointerEvent) => {
      const gesture = gestureRef.current;
      if (!gesture) return;
      if (Math.abs(pointerEvent.clientY - gesture.startY) > 3) gesture.moved = true;
      setPreviewSchedule({ [gesture.event.id]: scheduleForGesture(gesture, pointerEvent.clientY) });
    };
    const end = (pointerEvent: PointerEvent) => {
      const gesture = gestureRef.current;
      if (!gesture) return;
      gestureRef.current = null;
      setDraggingId(null);
      if (!gesture.moved) {
        setPreviewSchedule({});
        return;
      }
      skipClickRef.current = true;
      void persistSchedule(gesture.event, scheduleForGesture(gesture, pointerEvent.clientY));
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
    };
  });

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
        {!loadingGoogle && googleConnection && (
          <Button onClick={() => void syncGoogle({ fullRange: true })} disabled={syncingGoogle}>
            {syncingGoogle ? "Sincronizando…" : "Sincronizar agora"}
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
      {calendarSources.length > 0 && (
        <section className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">Minhas agendas</h2>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {calendarSources.map((source) => (
              <label
                key={source.google_calendar_id}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={source.is_visible}
                  onChange={(input) => void setCalendarVisibility(source, input.target.checked)}
                  className="h-4 w-4 rounded border-border"
                  style={{ accentColor: source.color }}
                />
                <span
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: source.color }}
                  aria-hidden="true"
                />
                <span>{source.name}</span>
              </label>
            ))}
          </div>
        </section>
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
                  const isActive = draggingId === event.id;
                  return (
                    <div
                      key={event.id}
                      role="button"
                      tabIndex={0}
                      onPointerDown={(pointerEvent) => startGesture(pointerEvent, event, "move")}
                      onClick={() => {
                        if (skipClickRef.current) {
                          skipClickRef.current = false;
                          return;
                        }
                        setEditing(event);
                        setDialogOpen(true);
                      }}
                      onKeyDown={(keyboardEvent) => {
                        if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
                          keyboardEvent.preventDefault();
                          setEditing(event);
                          setDialogOpen(true);
                        }
                      }}
                      className={`absolute z-10 overflow-hidden rounded-md px-1.5 py-1 text-left text-[11px] text-white shadow-sm outline-none transition-shadow hover:brightness-95 focus-visible:ring-2 focus-visible:ring-primary/70 ${isActive ? "z-20 cursor-grabbing opacity-85 shadow-lg" : "cursor-grab"} ${savingIds.includes(event.id) ? "animate-pulse" : ""}`}
                      style={{
                        ...style,
                        left: "3px",
                        width: "calc(100% - 6px)",
                        backgroundColor: event.color,
                        touchAction: "none",
                      }}
                      title={event.title}
                    >
                      <span className="block truncate font-semibold">{event.title}</span>
                      <span className="block truncate">
                        {format(new Date(event.starts_at), "HH:mm")} –{" "}
                        {format(new Date(event.ends_at), "HH:mm")}
                      </span>
                      <span
                        role="presentation"
                        aria-label="Resize event duration"
                        onPointerDown={(pointerEvent) =>
                          startGesture(pointerEvent, event, "resize")
                        }
                        className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize"
                      />
                    </div>
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
        // Saving must report a Google delivery error to the person who
        // created the event; silent failures make the two calendars diverge.
        onSaved={() => syncGoogle()}
      />
    </div>
  );
}
