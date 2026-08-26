import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const GOOGLE_TIME_ZONE = "America/Sao_Paulo";

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

async function accessToken(connection: any) {
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
  return {
    token: payload.access_token as string,
    expiresAt: new Date(Date.now() + Number(payload.expires_in ?? 3600) * 1000).toISOString(),
  };
}

async function googleRequest(token: string, url: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (response.status === 204) return null;
  const data = await response.json();
  if (!response.ok)
    throw new Error(data?.error?.message ?? "Não foi possível sincronizar com o Google Agenda.");
  return data;
}

function googleDate(event: any) {
  if (event.is_all_day) {
    const start = new Date(event.starts_at).toLocaleDateString("en-CA", {
      timeZone: GOOGLE_TIME_ZONE,
    });
    const endDate = new Date(event.ends_at);
    endDate.setDate(endDate.getDate() + 1);
    const end = endDate.toLocaleDateString("en-CA", { timeZone: GOOGLE_TIME_ZONE });
    return { start: { date: start }, end: { date: end } };
  }
  return {
    start: { dateTime: event.starts_at, timeZone: GOOGLE_TIME_ZONE },
    end: { dateTime: event.ends_at, timeZone: GOOGLE_TIME_ZONE },
  };
}

function localPayload(event: any) {
  return {
    summary: event.title,
    description: event.description ?? undefined,
    location: event.location ?? undefined,
    ...googleDate(event),
    extendedProperties: { private: { taskflowEventId: event.id } },
  };
}

function googleToLocal(event: any, createdBy: string, calendarId: string) {
  const allDay = Boolean(event.start?.date);
  let startsAt = event.start?.dateTime;
  let endsAt = event.end?.dateTime;
  if (allDay) {
    const start = new Date(`${event.start.date}T00:00:00-03:00`);
    const end = new Date(`${event.end.date}T00:00:00-03:00`);
    end.setMinutes(end.getMinutes() - 1);
    startsAt = start.toISOString();
    endsAt = end.toISOString();
  }
  return {
    starts_at: startsAt,
    ends_at: endsAt,
    is_all_day: allDay,
    created_by: createdBy,
    updated_by: createdBy,
    google_calendar_id: calendarId,
    google_event_id: event.id,
    google_etag: event.etag ?? null,
    google_updated_at: event.updated ?? null,
    title: event.summary || "Sem título",
    description: event.description ?? null,
    location: event.location ?? null,
    meeting_url: event.hangoutLink ?? null,
    color: "#2563eb",
    source: "google",
    sync_status: "synced",
  };
}

async function listGoogleEvents(token: string, calendarId: string) {
  const events: any[] = [];
  const now = new Date();
  const timeMin = new Date(now);
  timeMin.setMonth(timeMin.getMonth() - 3);
  const timeMax = new Date(now);
  timeMax.setFullYear(timeMax.getFullYear() + 1);
  let pageToken = "";
  do {
    const query = new URLSearchParams({
      singleEvents: "false",
      showDeleted: "false",
      maxResults: "2500",
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
    });
    if (pageToken) query.set("pageToken", pageToken);
    const page = await googleRequest(
      token,
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${query}`,
    );
    events.push(
      ...(page.items ?? [])
        .filter(
          (event: any) =>
            (event.start?.date || event.start?.dateTime) &&
            (event.end?.date || event.end?.dateTime),
        )
        .map((event: any) => ({ ...event, taskflowCalendarId: calendarId })),
    );
    pageToken = page.nextPageToken ?? "";
  } while (pageToken);
  return events;
}

async function listAccessibleCalendars(token: string) {
  const calendars: any[] = [];
  let pageToken = "";
  do {
    const query = new URLSearchParams({ maxResults: "250" });
    if (pageToken) query.set("pageToken", pageToken);
    const page = await googleRequest(
      token,
      `https://www.googleapis.com/calendar/v3/users/me/calendarList?${query}`,
    );
    calendars.push(...(page.items ?? []));
    pageToken = page.nextPageToken ?? "";
  } while (pageToken);
  return calendars.filter(
    (calendar) =>
      calendar.id &&
      !calendar.id.includes("#holiday") &&
      !calendar.id.includes("#contacts") &&
      !calendar.id.includes("#birthday"),
  );
}

async function sync(request: Request) {
  const { user, admin } = await authenticatedTeamUser(request);
  const calendarId = Deno.env.get("GOOGLE_SHARED_CALENDAR_ID");
  if (!calendarId) throw new Error("GOOGLE_SHARED_CALENDAR_ID não está configurado.");
  const { data: connection, error: connectionError } = await admin
    .from("calendar_google_connections")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
  if (connectionError || !connection)
    throw new Error("Conecte sua conta Google antes de sincronizar.");
  const tokenResult = await accessToken(connection);
  const token = typeof tokenResult === "string" ? tokenResult : tokenResult.token;
  if (typeof tokenResult !== "string")
    await admin
      .from("calendar_google_connections")
      .update({ access_token: token, access_token_expires_at: tokenResult.expiresAt })
      .eq("id", connection.id);

  const calendars = await listAccessibleCalendars(token);
  const googleEvents = (
    await Promise.all(calendars.map((calendar) => listGoogleEvents(token, calendar.id)))
  ).flat();
  const remoteIds = new Set(
    googleEvents
      .filter((event) => event.taskflowCalendarId === calendarId)
      .map((event) => event.id),
  );
  const remoteEventKeys = new Set(
    googleEvents.map((event) => `${event.taskflowCalendarId}:${event.id}`),
  );
  const remotePayloads = googleEvents.map((event) =>
    googleToLocal(event, user.id, event.taskflowCalendarId),
  );
  const { error: importError } = remotePayloads.length
    ? await admin
        .from("calendar_events")
        .upsert(remotePayloads, { onConflict: "google_calendar_id,google_event_id" })
    : { error: null };
  const pulled = importError ? 0 : remotePayloads.length;
  const importErrors = importError ? [importError.message] : [];

  const { data: localEvents, error: localError } = await admin
    .from("calendar_events")
    .select("*")
    .in("sync_status", ["pending", "not_configured", "error"])
    .order("starts_at");
  if (localError) throw localError;
  let pushed = 0;
  for (const event of localEvents ?? []) {
    try {
      const targetCalendarId = event.google_calendar_id ?? calendarId;
      const remoteKey = `${targetCalendarId}:${event.google_event_id}`;
      if (event.deleted_at) {
        if (event.google_event_id && remoteEventKeys.has(remoteKey))
          await googleRequest(
            token,
            `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(targetCalendarId)}/events/${encodeURIComponent(event.google_event_id)}`,
            { method: "DELETE" },
          );
        continue;
      }
      const payload = localPayload(event);
      const googleEvent =
        event.google_event_id && remoteEventKeys.has(remoteKey)
          ? await googleRequest(
              token,
              `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(targetCalendarId)}/events/${encodeURIComponent(event.google_event_id)}`,
              { method: "PATCH", body: JSON.stringify(payload) },
            )
          : await googleRequest(
              token,
              `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(targetCalendarId)}/events`,
              { method: "POST", body: JSON.stringify(payload) },
            );
      await admin
        .from("calendar_events")
        .update({
          google_event_id: googleEvent.id,
          google_calendar_id: targetCalendarId,
          google_etag: googleEvent.etag ?? null,
          google_updated_at: googleEvent.updated ?? null,
          sync_status: "synced",
          sync_error: null,
        })
        .eq("id", event.id);
      pushed += 1;
    } catch (error) {
      await admin
        .from("calendar_events")
        .update({
          sync_status: "error",
          sync_error: error instanceof Error ? error.message : "Erro ao enviar ao Google.",
        })
        .eq("id", event.id);
    }
  }
  const { data: activeEvents, error: activeEventsError } = await admin
    .from("calendar_events")
    .select("*")
    .is("deleted_at", null)
    .order("starts_at", { ascending: true });
  if (activeEventsError) throw activeEventsError;
  return json({
    ok: true,
    pushed,
    pulled,
    remoteEvents: remoteIds.size,
    importErrors: [...new Set(importErrors)].slice(0, 3),
    events: activeEvents ?? [],
  });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);
  try {
    return await sync(request);
  } catch (error) {
    console.error(error);
    return json({
      ok: false,
      error: error instanceof Error ? error.message : "Não foi possível sincronizar.",
    });
  }
});
