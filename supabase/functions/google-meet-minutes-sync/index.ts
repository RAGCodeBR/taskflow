import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const meetScope = "https://www.googleapis.com/auth/meetings.space.readonly";

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
  return { user: data.user, admin };
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

function meetingCode(url: string | null) {
  const match = url?.match(/meet\.google\.com\/([a-z]{3,}-[a-z]{3,}-[a-z]{3,})/i);
  return match?.[1]?.toLowerCase() ?? null;
}

async function syncEvent(admin: any, userId: string, eventId: string) {
  const { data: event, error: eventError } = await admin
    .from("calendar_events")
    .select("id, title, ends_at, meeting_url, deleted_at")
    .eq("id", eventId)
    .maybeSingle();
  if (eventError) throw eventError;
  if (!event || event.deleted_at) throw new Error("Reunião não encontrada.");
  const code = meetingCode(event.meeting_url);
  if (!code)
    return { status: "unavailable", reason: "Esta reunião não possui um link do Google Meet." };
  if (new Date(event.ends_at) > new Date())
    return { status: "pending", reason: "A ata será consultada após o término da reunião." };

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
  const filter = `space.meeting_code = "${code}"`;
  const records = await meetRequest(
    token,
    `https://meet.googleapis.com/v2/conferenceRecords?filter=${encodeURIComponent(filter)}&pageSize=10`,
  );
  const record =
    (records.conferenceRecords ?? []).find((item: any) => item.endTime) ??
    records.conferenceRecords?.[0];
  if (!record)
    return { status: "pending", reason: "A conferência ainda não está disponível no Google Meet." };

  const notes = await meetRequest(
    token,
    `https://meet.googleapis.com/v2/${record.name}/smartNotes?pageSize=10`,
  );
  const note = (notes.smartNotes ?? []).find((item: any) => item.state === "FILE_GENERATED");
  if (!note)
    return {
      status: "pending",
      conferenceRecordName: record.name,
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
      reason: "A ata ainda não tem um documento disponível.",
    };
  return {
    status: "ready",
    conferenceRecordName: record.name,
    smartNoteName: note.name,
    googleDocUrl,
    generatedAt: note.endTime ?? new Date().toISOString(),
  };
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);
    const { user, admin } = await authenticatedTeamUser(request);
    const body = await request.json().catch(() => ({}));
    const eventId = typeof body?.eventId === "string" ? body.eventId : "";
    if (!eventId) throw new Error("Informe a reunião a sincronizar.");
    const result = await syncEvent(admin, user.id, eventId);
    const payload = {
      calendar_event_id: eventId,
      status: result.status,
      conference_record_name: result.conferenceRecordName ?? null,
      smart_note_name: result.smartNoteName ?? null,
      google_doc_url: result.googleDocUrl ?? null,
      generated_at: result.generatedAt ?? null,
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
