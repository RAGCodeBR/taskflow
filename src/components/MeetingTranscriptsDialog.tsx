/* eslint-disable @typescript-eslint/no-explicit-any -- Supabase types are regenerated after the transcript migration. */
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ExternalLink, FileText, Loader2, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import type { Client } from "@/hooks/use-data";
import type { RecurringMeeting, RecurringMeetingOccurrence } from "@/hooks/use-meetings";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type TranscriptRow = {
  id: string;
  content: string;
  entry_count: number;
  google_doc_url: string | null;
  imported_at: string;
  calendar_event: {
    id: string;
    title: string;
    starts_at: string;
    recurring_meeting_occurrence_id: string | null;
    deleted_at: string | null;
  } | null;
};

type DisplayTranscript = TranscriptRow & {
  clientId: string | null;
  clientName: string;
  meetingTitle: string;
  meetingStartedAt: string;
  occurrenceId: string | null;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clients: Client[];
  meetings: RecurringMeeting[];
  occurrences: RecurringMeetingOccurrence[];
  onOpenMeeting: (occurrenceId: string) => void;
};

async function fetchAllTranscripts(): Promise<TranscriptRow[]> {
  const rows: TranscriptRow[] = [];
  const pageSize = 200;
  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await (supabase.from("meeting_transcripts" as any) as any)
      .select(
        "id, content, entry_count, google_doc_url, imported_at, calendar_event:calendar_events(id, title, starts_at, recurring_meeting_occurrence_id, deleted_at)",
      )
      .order("imported_at", { ascending: false })
      .range(offset, offset + pageSize - 1);
    if (error) throw error;
    rows.push(...((data ?? []) as TranscriptRow[]));
    if ((data ?? []).length < pageSize) break;
  }
  return rows;
}

export function MeetingTranscriptsDialog({
  open,
  onOpenChange,
  clients,
  meetings,
  occurrences,
  onOpenMeeting,
}: Props) {
  const { user, activeWorkspace } = useAuth();
  const [search, setSearch] = useState("");
  const {
    data: transcripts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["meeting_transcripts", "library", user?.id, activeWorkspace?.id],
    queryFn: fetchAllTranscripts,
    enabled: open && !!user,
  });

  const grouped = useMemo(() => {
    const clientById = new Map(clients.map((client) => [client.id, client]));
    const meetingById = new Map(meetings.map((meeting) => [meeting.id, meeting]));
    const occurrenceById = new Map(occurrences.map((occurrence) => [occurrence.id, occurrence]));
    const term = search.trim().toLocaleLowerCase("pt-BR");
    const visible: DisplayTranscript[] = [];

    for (const transcript of transcripts) {
      const event = transcript.calendar_event;
      if (!event || event.deleted_at) continue;
      const occurrenceId = event.recurring_meeting_occurrence_id;
      const occurrence = occurrenceId ? occurrenceById.get(occurrenceId) : null;
      // Linked meetings from another workspace are not part of this page.
      if (occurrenceId && !occurrence) continue;
      const meeting = occurrence ? meetingById.get(occurrence.recurring_meeting_id) : null;
      if (occurrence && !meeting) continue;
      const client = meeting?.client_id ? clientById.get(meeting.client_id) : null;
      const row: DisplayTranscript = {
        ...transcript,
        clientId: client?.id ?? null,
        clientName: client?.name ?? "Sem cliente",
        meetingTitle: meeting?.title ?? event.title,
        meetingStartedAt: event.starts_at,
        occurrenceId,
      };
      if (
        term &&
        !`${row.clientName} ${row.meetingTitle} ${row.content}`
          .toLocaleLowerCase("pt-BR")
          .includes(term)
      )
        continue;
      visible.push(row);
    }

    const groups = new Map<
      string,
      { key: string; clientName: string; rows: DisplayTranscript[] }
    >();
    for (const row of visible) {
      const key = row.clientId ?? "none";
      const group = groups.get(key) ?? { key, clientName: row.clientName, rows: [] };
      group.rows.push(row);
      groups.set(key, group);
    }
    for (const group of groups.values()) {
      group.rows.sort((a, b) => b.meetingStartedAt.localeCompare(a.meetingStartedAt));
    }
    return [...groups.values()].sort((a, b) =>
      a.clientName.localeCompare(b.clientName, "pt-BR", { sensitivity: "base" }),
    );
  }, [clients, meetings, occurrences, search, transcripts]);

  const visibleCount = grouped.reduce((total, group) => total + group.rows.length, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] w-[calc(100vw-2rem)] max-w-5xl flex-col gap-4 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> Transcrições
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Transcrições importadas do Google Meet, organizadas por cliente.
          </p>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar cliente, reunião ou trecho da transcrição..."
            className="pl-9"
            aria-label="Buscar transcrições"
          />
        </div>
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto pr-1">
          {isLoading ? (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Carregando transcrições...
            </p>
          ) : error ? (
            <p className="text-sm text-destructive">
              Não foi possível carregar as transcrições: {(error as Error).message}
            </p>
          ) : visibleCount === 0 ? (
            <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              {search
                ? "Nenhuma transcrição encontrada para esta busca."
                : "Nenhuma transcrição importada ainda."}
            </p>
          ) : (
            grouped.map((group) => (
              <section key={group.key} className="space-y-2">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-semibold">{group.clientName}</h3>
                  <span className="text-xs text-muted-foreground">
                    {group.rows.length} {group.rows.length === 1 ? "transcrição" : "transcrições"}
                  </span>
                </div>
                {group.rows.map((transcript) => (
                  <div key={transcript.id} className="rounded-lg border p-3">
                    <details>
                      <summary className="cursor-pointer text-sm font-medium">
                        {transcript.meetingTitle} ·{" "}
                        {format(new Date(transcript.meetingStartedAt), "dd/MM/yyyy 'às' HH:mm")}
                      </summary>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {transcript.entry_count} falas
                      </p>
                      <div className="mt-3 max-h-80 overflow-y-auto whitespace-pre-wrap rounded-md bg-muted/40 p-3 text-sm">
                        {transcript.content || "A transcrição não contém falas disponíveis."}
                      </div>
                    </details>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {transcript.occurrenceId && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            onOpenChange(false);
                            onOpenMeeting(transcript.occurrenceId!);
                          }}
                        >
                          Abrir reunião
                        </Button>
                      )}
                      {transcript.google_doc_url && (
                        <Button asChild size="sm" variant="ghost">
                          <a href={transcript.google_doc_url} target="_blank" rel="noreferrer">
                            <ExternalLink className="mr-1 h-4 w-4" /> Abrir no Google
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </section>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
