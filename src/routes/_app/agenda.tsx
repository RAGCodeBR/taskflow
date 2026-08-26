import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Link as LinkIcon,
  MapPin,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AgendaEventDialog } from "@/components/AgendaEventDialog";
import {
  useAgendaEvents,
  useGoogleCalendarConnection,
  useProfiles,
  type AgendaEvent,
} from "@/hooks/use-data";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/agenda")({ component: AgendaPage });

function AgendaPage() {
  const { data: events = [], isLoading, error } = useAgendaEvents();
  const { data: googleConnection, isLoading: loadingGoogle } = useGoogleCalendarConnection();
  const { data: profiles = [] } = useProfiles();
  const [cursor, setCursor] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AgendaEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [connectingGoogle, setConnectingGoogle] = useState(false);
  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [cursor]);

  const eventsForDay = (day: Date) =>
    events.filter((event) => isSameDay(new Date(event.starts_at), day));
  const creatorLabel = (event: AgendaEvent) =>
    profiles.find((profile) => profile.id === event.created_by)?.full_name || "Colaborador";
  const openNew = (date: Date | null = null) => {
    setEditing(null);
    setSelectedDate(date);
    setDialogOpen(true);
  };

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

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">Agenda</h1>
            <Badge variant="outline">Compartilhada</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Compromissos e reuniões de toda a equipe.
          </p>
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
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-card p-3">
        <span className="text-sm font-medium capitalize">
          {format(cursor, "MMMM yyyy", { locale: ptBR })}
        </span>
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="outline"
            aria-label="Mês anterior"
            onClick={() => setCursor(subMonths(cursor, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" onClick={() => setCursor(new Date())}>
            Hoje
          </Button>
          <Button
            size="icon"
            variant="outline"
            aria-label="Próximo mês"
            onClick={() => setCursor(addMonths(cursor, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          Não foi possível carregar a Agenda: {(error as Error).message}
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border bg-card">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-7 border-b bg-muted/40 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (
              <div key={day} className="p-2 text-center">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day) => {
              const dayEvents = eventsForDay(day);
              const isToday = isSameDay(day, new Date());
              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-32 border-b border-r p-2 ${isSameMonth(day, cursor) ? "" : "bg-muted/20 text-muted-foreground"}`}
                >
                  <button
                    onClick={() => openNew(day)}
                    className={`mb-1 grid h-6 min-w-6 place-items-center rounded-full text-xs hover:bg-muted ${isToday ? "bg-primary font-semibold text-primary-foreground hover:bg-primary" : ""}`}
                  >
                    {format(day, "d")}
                  </button>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <button
                        key={event.id}
                        onClick={() => {
                          setEditing(event);
                          setDialogOpen(true);
                        }}
                        className="block w-full rounded px-1.5 py-1 text-left text-[11px] hover:opacity-80"
                        style={{ backgroundColor: `${event.color}22`, color: event.color }}
                        title={event.title}
                      >
                        <span className="block truncate font-medium">
                          {event.is_all_day
                            ? "Dia inteiro · "
                            : `${format(new Date(event.starts_at), "HH:mm")} · `}
                          {event.title}
                        </span>
                      </button>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="px-1 text-[10px] text-muted-foreground">
                        +{dayEvents.length - 3} compromissos
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {!isLoading && events.length === 0 && (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          Ainda não há compromissos. Crie o primeiro evento da Agenda compartilhada.
        </div>
      )}
      <section className="rounded-lg border bg-card p-4">
        <h2 className="text-sm font-semibold">Próximos compromissos</h2>
        <div className="mt-3 space-y-2">
          {events
            .filter((event) => new Date(event.ends_at) >= new Date())
            .slice(0, 5)
            .map((event) => (
              <button
                key={event.id}
                onClick={() => {
                  setEditing(event);
                  setDialogOpen(true);
                }}
                className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-muted/50"
              >
                <span className="h-8 w-1 rounded-full" style={{ backgroundColor: event.color }} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{event.title}</span>
                  <span className="block text-xs text-muted-foreground">
                    {event.is_all_day
                      ? format(new Date(event.starts_at), "dd MMM", { locale: ptBR })
                      : format(new Date(event.starts_at), "dd MMM · HH:mm", { locale: ptBR })}{" "}
                    · {creatorLabel(event)}
                  </span>
                </span>
                {event.location && <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />}
                {event.meeting_url && (
                  <LinkIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </button>
            ))}
          {events.filter((event) => new Date(event.ends_at) >= new Date()).length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhum próximo compromisso.</p>
          )}
        </div>
      </section>
      <AgendaEventDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        event={editing}
        defaultDate={selectedDate}
      />
    </div>
  );
}
