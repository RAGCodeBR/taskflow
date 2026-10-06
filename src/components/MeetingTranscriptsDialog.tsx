/* eslint-disable @typescript-eslint/no-explicit-any -- Supabase types are regenerated after the transcript migration. */
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Download, Eye, FileText, Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { downloadMeetingArtifact, downloadTranscriptText } from "@/lib/meeting-artifacts";
import { useAuth } from "@/hooks/use-auth";
import type { Client } from "@/hooks/use-data";
import type { RecurringMeeting, RecurringMeetingOccurrence } from "@/hooks/use-meetings";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  AttachmentPreviewDialog,
  type PreviewableAttachment,
} from "@/components/AttachmentPreviewDialog";

type TranscriptRow = {
  id: string;
  content: string;
  entry_count: number;
  google_doc_url: string | null;
  file_path: string | null;
  file_name: string | null;
  imported_at: string;
  calendar_event: {
    id: string;
    title: string;
    starts_at: string;
    recurring_meeting_occurrence_id: string | null;
    deleted_at: string | null;
  } | null;
};

type GeminiFileRow = {
  id: string;
  file_path: string;
  file_name: string | null;
  generated_at: string | null;
  calendar_event: TranscriptRow["calendar_event"];
};

type DisplayTranscript = {
  id: string;
  kind: "transcript" | "gemini";
  content: string;
  entryCount: number;
  filePath: string | null;
  fileName: string | null;
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
        "id, content, entry_count, google_doc_url, file_path, file_name, imported_at, calendar_event:calendar_events(id, title, starts_at, recurring_meeting_occurrence_id, deleted_at)",
      )
      .order("imported_at", { ascending: false })
      .range(offset, offset + pageSize - 1);
    if (error) throw error;
    rows.push(...((data ?? []) as TranscriptRow[]));
    if ((data ?? []).length < pageSize) break;
  }
  return rows;
}

async function fetchAllGeminiFiles(): Promise<GeminiFileRow[]> {
  const rows: GeminiFileRow[] = [];
  const pageSize = 200;
  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await (supabase.from("meeting_minutes" as any) as any)
      .select(
        "id, file_path, file_name, generated_at, calendar_event:calendar_events(id, title, starts_at, recurring_meeting_occurrence_id, deleted_at)",
      )
      .not("file_path", "is", null)
      .order("generated_at", { ascending: false })
      .range(offset, offset + pageSize - 1);
    if (error) throw error;
    rows.push(...((data ?? []) as GeminiFileRow[]));
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
  const [previewFile, setPreviewFile] = useState<PreviewableAttachment | null>(null);
  const {
    data: transcripts = [],
    isLoading: loadingTranscripts,
    error: transcriptError,
  } = useQuery({
    queryKey: ["meeting_transcripts", "library", user?.id, activeWorkspace?.id],
    queryFn: fetchAllTranscripts,
    enabled: open && !!user,
  });
  const {
    data: geminiFiles = [],
    isLoading: loadingGeminiFiles,
    error: geminiError,
  } = useQuery({
    queryKey: ["meeting_minutes", "library", user?.id, activeWorkspace?.id],
    queryFn: fetchAllGeminiFiles,
    enabled: open && !!user,
  });
  const isLoading = loadingTranscripts || loadingGeminiFiles;
  const error = transcriptError || geminiError;

  const grouped = useMemo(() => {
    const clientById = new Map(clients.map((client) => [client.id, client]));
    const meetingById = new Map(meetings.map((meeting) => [meeting.id, meeting]));
    const occurrenceById = new Map(occurrences.map((occurrence) => [occurrence.id, occurrence]));
    const term = search.trim().toLocaleLowerCase("pt-BR");
    const visible: DisplayTranscript[] = [];

    for (const artifact of [
      ...transcripts.map((transcript) => ({
        id: transcript.id,
        kind: "transcript" as const,
        content: transcript.content,
        entryCount: transcript.entry_count,
        filePath: transcript.file_path,
        fileName: transcript.file_name,
        calendar_event: transcript.calendar_event,
      })),
      ...geminiFiles.map((file) => ({
        id: file.id,
        kind: "gemini" as const,
        content: "",
        entryCount: 0,
        filePath: file.file_path,
        fileName: file.file_name,
        calendar_event: file.calendar_event,
      })),
    ]) {
      const event = artifact.calendar_event;
      if (!event || event.deleted_at) continue;
      const occurrenceId = event.recurring_meeting_occurrence_id;
      const occurrence = occurrenceId ? occurrenceById.get(occurrenceId) : null;
      // Linked meetings from another workspace are not part of this page.
      if (occurrenceId && !occurrence) continue;
      const meeting = occurrence ? meetingById.get(occurrence.recurring_meeting_id) : null;
      if (occurrence && !meeting) continue;
      const client = meeting?.client_id ? clientById.get(meeting.client_id) : null;
      const row: DisplayTranscript = {
        id: artifact.id,
        kind: artifact.kind,
        content: artifact.content,
        entryCount: artifact.entryCount,
        filePath: artifact.filePath,
        fileName: artifact.fileName,
        clientId: client?.id ?? null,
        clientName: client?.name ?? "Sem cliente",
        meetingTitle: meeting?.title ?? event.title,
        meetingStartedAt: event.starts_at,
        occurrenceId,
      };
      if (
        term &&
        !`${row.clientName} ${row.meetingTitle} ${row.content} ${row.fileName ?? ""}`
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
  }, [clients, geminiFiles, meetings, occurrences, search, transcripts]);

  const visibleCount = grouped.reduce((total, group) => total + group.rows.length, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] w-[calc(100vw-2rem)] max-w-5xl flex-col gap-4 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> Transcrições
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Transcrições e atas do Gemini guardadas como arquivos no TaskFlow, por cliente.
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
                ? "Nenhum arquivo encontrado para esta busca."
                : "Nenhuma transcrição ou ata importada ainda."}
            </p>
          ) : (
            grouped.map((group) => (
              <section key={group.key} className="space-y-2">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-semibold">{group.clientName}</h3>
                  <span className="text-xs text-muted-foreground">
                    {group.rows.length} {group.rows.length === 1 ? "arquivo" : "arquivos"}
                  </span>
                </div>
                {group.rows.map((transcript) => (
                  <div
                    key={`${transcript.kind}-${transcript.id}`}
                    className="rounded-lg border p-3"
                  >
                    {transcript.kind === "gemini" ? (
                      <p className="text-sm font-medium">
                        Ata do Gemini (PDF) · {transcript.meetingTitle} ·{" "}
                        {format(new Date(transcript.meetingStartedAt), "dd/MM/yyyy 'às' HH:mm")}
                      </p>
                    ) : (
                      <details>
                        <summary className="cursor-pointer text-sm font-medium">
                          Transcrição
                          {transcript.filePath
                            ? transcript.filePath.endsWith(".txt")
                              ? " (TXT)"
                              : " (PDF)"
                            : ""}{" "}
                          · {transcript.meetingTitle} ·{" "}
                          {format(new Date(transcript.meetingStartedAt), "dd/MM/yyyy 'às' HH:mm")}
                        </summary>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {transcript.entryCount} falas
                        </p>
                        <div className="mt-3 max-h-80 overflow-y-auto whitespace-pre-wrap rounded-md bg-muted/40 p-3 text-sm">
                          {transcript.content || "A transcrição não contém falas disponíveis."}
                        </div>
                      </details>
                    )}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {transcript.filePath && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setPreviewFile({
                                storage_path: transcript.filePath!,
                                file_name:
                                  transcript.fileName ||
                                  (transcript.kind === "gemini"
                                    ? "Ata do Gemini.pdf"
                                    : `Transcrição do Meet.${transcript.filePath?.endsWith(".txt") ? "txt" : "pdf"}`),
                                mime_type: transcript.filePath.endsWith(".txt")
                                  ? "text/plain"
                                  : "application/pdf",
                              })
                            }
                          >
                            <Eye className="mr-1 h-4 w-4" /> Visualizar
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              void downloadMeetingArtifact(
                                transcript.filePath!,
                                transcript.fileName ||
                                  (transcript.kind === "gemini"
                                    ? "Ata do Gemini.pdf"
                                    : `Transcrição do Meet.${transcript.filePath?.endsWith(".txt") ? "txt" : "pdf"}`),
                              ).catch((error) => toast.error(error.message))
                            }
                          >
                            <Download className="mr-1 h-4 w-4" /> Baixar{" "}
                            {transcript.filePath.endsWith(".txt") ? "TXT" : "PDF"}
                          </Button>
                        </>
                      )}
                      {transcript.kind === "transcript" &&
                        transcript.content &&
                        !transcript.filePath && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              downloadTranscriptText(
                                transcript.content,
                                `Transcrição - ${transcript.meetingTitle}.txt`,
                              )
                            }
                          >
                            <Download className="mr-1 h-4 w-4" /> Baixar TXT
                          </Button>
                        )}
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
                    </div>
                  </div>
                ))}
              </section>
            ))
          )}
        </div>
        <AttachmentPreviewDialog
          open={Boolean(previewFile)}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) setPreviewFile(null);
          }}
          attachment={previewFile}
          bucket="meeting-artifacts"
        />
      </DialogContent>
    </Dialog>
  );
}
