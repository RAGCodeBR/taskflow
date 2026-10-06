/* eslint-disable @typescript-eslint/no-explicit-any -- Google Meet and Supabase Edge responses are not generated as local types. */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const meetScope = "https://www.googleapis.com/auth/meetings.space.readonly";
const meetFilesScope = "https://www.googleapis.com/auth/drive.meet.readonly";
const driveReadScope = "https://www.googleapis.com/auth/drive.readonly";

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function authenticatedTeamUser(request: Request) {
  const authorization = request.headers.get("Authorization");
  if (!authorization) throw new Error("Sessão não encontrada.");
  const projectUrl = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const auth = createClient(projectUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
  });
  const { data, error } = await auth.auth.getUser();
  if (error || !data.user) throw new Error("Sessão inválida.");
  const admin = createClient(projectUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: roles, error: roleError } = await admin
    .from("user_roles")
    .select("role")
    .eq("user_id", data.user.id);
  if (roleError) throw roleError;
  if (!roles?.some((item) => item.role === "admin" || item.role === "collaborator"))
    throw new Error("Sua conta não possui acesso à Agenda.");
  return { user: data.user, admin, auth };
}

async function accessToken(admin: any, connection: any) {
  if (
    connection.access_token &&
    connection.access_token_expires_at &&
    new Date(connection.access_token_expires_at) > new Date(Date.now() + 60_000)
  )
    return connection.access_token as string;
  const clientId = Deno.env.get("GOOGLE_OAUTH_CLIENT_ID");
  const clientSecret = Deno.env.get("GOOGLE_OAUTH_CLIENT_SECRET");
  if (!clientId || !clientSecret) throw new Error("As credenciais Google não estão configuradas.");
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: connection.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  const payload = await response.json();
  if (!response.ok || !payload.access_token)
    throw new Error("A autorização Google expirou. Conecte a conta novamente.");
  const expiresAt = new Date(Date.now() + Number(payload.expires_in ?? 3600) * 1000).toISOString();
  await admin
    .from("calendar_google_connections")
    .update({ access_token: payload.access_token, access_token_expires_at: expiresAt })
    .eq("id", connection.id);
  return payload.access_token as string;
}

async function meetRequest(token: string, url: string) {
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data?.error?.message ?? "Não foi possível consultar a ata no Google Meet.");
  return data;
}

async function importGoogleDocPdf(admin: any, token: string, documentId: string, path: string) {
  const exportUrl = new URL(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(documentId)}/export`,
  );
  exportUrl.searchParams.set("mimeType", "application/pdf");
  const exported = await fetch(exportUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!exported.ok) {
    const failure = await exported.json().catch(() => null);
    if (failure?.error?.errors?.some((item: any) => item.reason === "appNotAuthorizedToFile"))
      throw new Error(
        "O Google não autorizou o TaskFlow a exportar este documento. Reconecte a conta na Agenda e aprove a permissão de leitura dos arquivos do Drive.",
      );
    throw new Error(failure?.error?.message ?? "O Google não permitiu exportar o PDF.");
  }
  const pdf = new Uint8Array(await exported.arrayBuffer());
  if (pdf.byteLength === 0 || pdf.byteLength > 10 * 1024 * 1024)
    throw new Error("O PDF está vazio ou excede o limite de 10 MB.");
  if (new TextDecoder().decode(pdf.slice(0, 5)) !== "%PDF-")
    throw new Error("O Google retornou um arquivo que não é PDF.");
  const { error } = await admin.storage
    .from("meeting-artifacts")
    .upload(path, pdf, { contentType: "application/pdf", upsert: true });
  if (error) throw error;
  return pdf.byteLength;
}

async function listMeetResources(token: string, url: string, field: string): Promise<any[]> {
  const items: any[] = [];
  let pageToken: string | undefined;
  do {
    const pageUrl = new URL(url);
    pageUrl.searchParams.set("pageSize", "100");
    if (pageToken) pageUrl.searchParams.set("pageToken", pageToken);
    const page = await meetRequest(token, pageUrl.toString());
    items.push(...(Array.isArray(page[field]) ? page[field] : []));
    pageToken = page.nextPageToken || undefined;
  } while (pageToken);
  return items;
}

function meetingCode(url: string | null) {
  const match = url?.match(/meet\.google\.com\/([a-z]{3,}-[a-z]{3,}-[a-z]{3,})/i);
  return match?.[1]?.toLowerCase() ?? null;
}

async function syncEvent(auth: any, admin: any, userId: string, eventId: string) {
  // Read with the caller's token first. The service client below must never
  // make an arbitrary eventId supplied by the browser sufficient authorization.
  const { data: event, error: eventError } = await auth
    .from("calendar_events")
    .select("id, title, starts_at, ends_at, meeting_url, deleted_at")
    .eq("id", eventId)
    .maybeSingle();
  if (eventError) throw eventError;
  if (!event || event.deleted_at) throw new Error("Reunião não encontrada.");
  const code = meetingCode(event.meeting_url);
  if (!code)
    return { status: "unavailable", reason: "Esta reunião não possui um link do Google Meet." };
  // The call may end before its scheduled calendar end. Ask Meet for an
  // actually ended conference as soon as the scheduled start has passed.
  if (new Date(event.starts_at) > new Date())
    return { status: "pending", reason: "A reunião ainda não começou." };

  const { data: connection, error: connectionError } = await admin
    .from("calendar_google_connections")
    .select("id, refresh_token, access_token, access_token_expires_at, granted_scopes")
    .eq("user_id", userId)
    .maybeSingle();
  if (connectionError) throw connectionError;
  if (!connection) throw new Error("Conecte a mesma conta Google usada na Agenda.");
  if (
    !String(connection.granted_scopes ?? "")
      .split(/\s+/)
      .includes(meetScope)
  )
    throw new Error("Reconecte sua conta Google para autorizar o acesso às atas do Google Meet.");

  const token = await accessToken(admin, connection);
  const eventStart = new Date(event.starts_at).getTime();
  const from = new Date(eventStart - 6 * 60 * 60 * 1000).toISOString();
  const until = new Date(eventStart + 6 * 60 * 60 * 1000).toISOString();
  const filter = `space.meeting_code = "${code}" AND start_time >= "${from}" AND start_time <= "${until}"`;
  const records = await listMeetResources(
    token,
    `https://meet.googleapis.com/v2/conferenceRecords?filter=${encodeURIComponent(filter)}`,
    "conferenceRecords",
  );
  // A Meet link can be reused. Match this occurrence by time and keep the
  // selected record stable after the first successful lookup.
  const { data: savedMinutes } = await admin
    .from("meeting_minutes")
    .select(
      "conference_record_name, smart_note_name, google_doc_url, generated_at, file_path, file_name, file_size",
    )
    .eq("calendar_event_id", eventId)
    .maybeSingle();
  const record = savedMinutes?.conference_record_name
    ? records.find((item: any) => item.name === savedMinutes.conference_record_name)
    : records
        .filter((item: any) => item.endTime)
        .sort(
          (a: any, b: any) =>
            Math.abs(new Date(a.startTime).getTime() - eventStart) -
            Math.abs(new Date(b.startTime).getTime() - eventStart),
        )[0];
  if (!record && savedMinutes?.google_doc_url)
    return {
      status: "ready",
      conferenceRecordName: savedMinutes.conference_record_name,
      smartNoteName: savedMinutes.smart_note_name,
      googleDocUrl: savedMinutes.google_doc_url,
      generatedAt: savedMinutes.generated_at,
      filePath: savedMinutes.file_path,
      fileName: savedMinutes.file_name,
      fileSize: savedMinutes.file_size,
      importedTranscripts: 0,
    };
  if (!record)
    return {
      status: "pending",
      conferenceRecordName: savedMinutes?.conference_record_name ?? null,
      reason: "A conferência ainda não está disponível no Google Meet.",
    };

  const transcripts = await listMeetResources(
    token,
    `https://meet.googleapis.com/v2/${record.name}/transcripts`,
    "transcripts",
  );
  let importedTranscripts = 0;
  let importedTranscriptFiles = 0;
  let transcriptFileError: string | null = null;
  const grantedScopes = new Set(String(connection.granted_scopes ?? "").split(/\s+/));
  const canReadMeetFiles = grantedScopes.has(meetFilesScope) || grantedScopes.has(driveReadScope);
  const readyTranscripts = transcripts.filter((item: any) => item.state === "FILE_GENERATED");
  if (readyTranscripts.length) {
    const participants = await listMeetResources(
      token,
      `https://meet.googleapis.com/v2/${record.name}/participants`,
      "participants",
    );
    const participantNames = new Map<string, string>(
      participants.map((participant: any) => [
        participant.name,
        participant.signedinUser?.displayName ??
          participant.anonymousUser?.displayName ??
          participant.phoneUser?.displayName ??
          "Participante",
      ]),
    );
    for (const transcript of readyTranscripts) {
      const { data: existing } = await admin
        .from("meeting_transcripts")
        .select("calendar_event_id, file_path, file_name, file_size, content, entry_count, entries")
        .eq("transcript_name", transcript.name)
        .maybeSingle();
      if (existing && existing.calendar_event_id !== eventId)
        throw new Error("Esta transcrição já está vinculada a outra reunião.");
      const entries = await listMeetResources(
        token,
        `https://meet.googleapis.com/v2/${transcript.name}/entries`,
        "transcriptEntries",
      );
      const normalizedEntries = entries.map((entry: any) => ({
        name: entry.name,
        participant: entry.participant,
        participant_name: participantNames.get(entry.participant) ?? "Participante",
        text: entry.text ?? "",
        start_time: entry.startTime,
        end_time: entry.endTime,
        language_code: entry.languageCode ?? null,
      }));
      const content = normalizedEntries
        .map((entry: any) => {
          const at = new Date(entry.start_time).toLocaleTimeString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            hour: "2-digit",
            minute: "2-digit",
          });
          return `[${at}] ${entry.participant_name}: ${entry.text}`;
        })
        .join("\n\n");
      let filePath = existing?.file_path ?? null;
      let fileName = existing?.file_name ?? null;
      let fileSize = existing?.file_size ?? null;
      let fileError: string | null = null;
      const transcriptId = String(transcript.name)
        .split("/")
        .pop()!
        .replace(/[^a-zA-Z0-9_-]/g, "_");
      if (!filePath) {
        const documentId = transcript.docsDestination?.document;
        if (!documentId) {
          fileError = "O Google ainda não forneceu o documento da transcrição.";
        } else if (!canReadMeetFiles) {
          fileError = "Reconecte o Google na Agenda para importar a transcrição em PDF.";
        } else {
          try {
            const path = `${eventId}/transcricao-${transcriptId}.pdf`;
            fileSize = await importGoogleDocPdf(admin, token, documentId, path);
            filePath = path;
            fileName = `Transcrição do Meet - ${new Date(event.starts_at).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }).replaceAll("/", "-")}.pdf`;
            importedTranscriptFiles += 1;
          } catch (error) {
            fileError = error instanceof Error ? error.message : "Não foi possível importar o PDF.";
          }
        }
        // The Meet API provides structured speech entries even when this user
        // cannot read the organizer's Google Docs file in Drive.
        const fileText = content || existing?.content || "";
        if (!filePath && fileText) {
          try {
            const textFile = new TextEncoder().encode(fileText);
            if (textFile.byteLength > 10 * 1024 * 1024)
              throw new Error("A transcrição excede o limite de 10 MB.");
            const path = `${eventId}/transcricao-${transcriptId}.txt`;
            const { error: uploadError } = await admin.storage
              .from("meeting-artifacts")
              .upload(path, textFile, { contentType: "text/plain", upsert: true });
            if (uploadError) throw uploadError;
            filePath = path;
            fileName = `Transcrição do Meet - ${new Date(event.starts_at).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }).replaceAll("/", "-")}.txt`;
            fileSize = textFile.byteLength;
            fileError = null;
            importedTranscriptFiles += 1;
          } catch (error) {
            fileError =
              error instanceof Error ? error.message : "Não foi possível guardar a transcrição.";
          }
        }
      }
      if (fileError && !transcriptFileError) transcriptFileError = fileError;
      const { error: transcriptError } = await admin.from("meeting_transcripts").upsert(
        {
          calendar_event_id: eventId,
          conference_record_name: record.name,
          transcript_name: transcript.name,
          google_doc_url: transcript.docsDestination?.exportUri ?? null,
          entries: normalizedEntries.length ? normalizedEntries : (existing?.entries ?? []),
          content: normalizedEntries.length ? content : (existing?.content ?? content),
          entry_count: normalizedEntries.length
            ? normalizedEntries.length
            : (existing?.entry_count ?? 0),
          file_path: filePath,
          file_name: fileName,
          file_size: fileSize,
          file_error: fileError,
          imported_at: new Date().toISOString(),
        },
        { onConflict: "transcript_name" },
      );
      if (transcriptError) throw transcriptError;
      importedTranscripts += 1;
    }
  }

  // Some meetings have transcription enabled without Gemini notes. Failure to
  // read notes must not discard a transcript that was already imported.
  let notes: any[] = [];
  try {
    notes = await listMeetResources(
      token,
      `https://meet.googleapis.com/v2/${record.name}/smartNotes`,
      "smartNotes",
    );
  } catch (error) {
    if (!readyTranscripts.length) throw error;
  }
  const note = notes.find((item: any) => item.state === "FILE_GENERATED");
  if (!note)
    return {
      status: "pending",
      conferenceRecordName: record.name,
      importedTranscripts,
      importedTranscriptFiles,
      transcriptFileError,
      transcriptStatus: readyTranscripts.length ? "ready" : "pending",
      reason: "A ata do Gemini ainda está sendo gerada.",
    };

  const documentId = note.docsDestination?.document ?? null;
  const googleDocUrl =
    note.docsDestination?.exportUri ??
    (documentId ? `https://docs.google.com/document/d/${documentId}/edit` : null);
  if (!googleDocUrl)
    return {
      status: "pending",
      conferenceRecordName: record.name,
      importedTranscripts,
      importedTranscriptFiles,
      transcriptFileError,
      transcriptStatus: readyTranscripts.length ? "ready" : "pending",
      reason: "A ata ainda não tem um documento disponível.",
    };

  let filePath = savedMinutes?.file_path ?? null;
  let fileName = savedMinutes?.file_name ?? null;
  let fileSize = savedMinutes?.file_size ?? null;
  let fileError: string | null = null;
  if (!filePath || savedMinutes?.smart_note_name !== note.name) {
    filePath = null;
    fileName = null;
    fileSize = null;
    const documentId = note.docsDestination?.document;
    if (!documentId) {
      fileError = "O Google ainda não forneceu o identificador do documento.";
    } else if (!canReadMeetFiles) {
      fileError = "Reconecte o Google na Agenda para autorizar a importação do PDF.";
    } else {
      try {
        const path = `${eventId}/ata-gemini.pdf`;
        fileSize = await importGoogleDocPdf(admin, token, documentId, path);
        filePath = path;
        fileName = `Ata do Gemini - ${new Date(event.starts_at).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }).replaceAll("/", "-")}.pdf`;
      } catch (error) {
        fileError = error instanceof Error ? error.message : "Não foi possível importar o PDF.";
      }
    }
  }
  return {
    status: "ready",
    conferenceRecordName: record.name,
    smartNoteName: note.name,
    googleDocUrl,
    generatedAt: note.endTime ?? new Date().toISOString(),
    filePath,
    fileName,
    fileSize,
    fileError,
    importedTranscripts,
    importedTranscriptFiles,
    transcriptFileError,
    transcriptStatus: readyTranscripts.length ? "ready" : "pending",
  };
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);
    const { user, admin, auth } = await authenticatedTeamUser(request);
    const body = await request.json().catch(() => ({}));
    const eventId = typeof body?.eventId === "string" ? body.eventId : "";
    if (!eventId) throw new Error("Informe a reunião a sincronizar.");
    const result = await syncEvent(auth, admin, user.id, eventId);
    const payload = {
      calendar_event_id: eventId,
      status: result.status,
      conference_record_name: result.conferenceRecordName ?? null,
      smart_note_name: result.smartNoteName ?? null,
      google_doc_url: result.googleDocUrl ?? null,
      generated_at: result.generatedAt ?? null,
      file_path: result.filePath ?? null,
      file_name: result.fileName ?? null,
      file_size: result.fileSize ?? null,
      file_error: result.fileError ?? null,
      last_checked_at: new Date().toISOString(),
      error_message: result.status === "error" ? (result.reason ?? null) : null,
    };
    const { error: saveError } = await admin
      .from("meeting_minutes")
      .upsert(payload, { onConflict: "calendar_event_id" });
    if (saveError) throw saveError;
    return json({ ...result, eventId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível sincronizar a ata.";
    return json({ error: message }, 400);
  }
});
