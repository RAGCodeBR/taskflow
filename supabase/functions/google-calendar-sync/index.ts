import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const GOOGLE_TIME_ZONE = "America/Sao_Paulo";
// Fixed palette Google Calendar uses for per-event colors (colorId 1-11).
// TaskFlow stores free-form hex, so pushing/pulling colors means mapping
// through this table instead of relying only on the calendar's own color.
const GOOGLE_EVENT_COLORS: Record<string, string> = {
  "1": "#7986cb",
  "2": "#33b679",
  "3": "#8e24aa",
  "4": "#e67c73",
  "5": "#f6bf26",
  "6": "#f4511e",
  "7": "#039be5",
  "8": "#616161",
  "9": "#3f51b5",
  "10": "#0b8043",
  "11": "#d50000",
};

function hexDistance(a: string, b: string) {
  const channel = (hex: string, offset: number) => parseInt(hex.slice(offset, offset + 2), 16);
  return [1, 3, 5]
    .map((offset) => channel(a, offset) - channel(b, offset))
    .reduce((total, diff) => total + diff * diff, 0);
}

function nearestGoogleColorId(hex: string | null | undefined): string | undefined {
  if (!hex || !/^#[0-9A-Fa-f]{6}$/.test(hex)) return undefined;
  let bestId: string | undefined;
  let bestDistance = Infinity;
  for (const [id, paletteHex] of Object.entries(GOOGLE_EVENT_COLORS)) {
    const distance = hexDistance(hex, paletteHex);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestId = id;
    }
  }
  return bestId;
}

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

async function tokenForConnection(admin: any, connection: any) {
  const result = await accessToken(connection);
  const token = typeof result === "string" ? result : result.token;
  if (typeof result !== "string")
    await admin
      .from("calendar_google_connections")
      .update({ access_token: token, access_token_expires_at: result.expiresAt })
      .eq("id", connection.id);
  return token;
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

function wasRemovedFromGoogle(error: unknown) {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  return message.includes("resource has been deleted") || message.includes("not found");
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
    // Best-effort mapping: Google only accepts one of its 11 fixed colorIds
    // for an event, so the closest match to the hex chosen in TaskFlow is
    // sent instead of the calendar's default color.
    colorId: nearestGoogleColorId(event.color),
    extendedProperties: { private: { taskflowEventId: event.id } },
  };
}

function googleToLocal(
  event: any,
  createdBy: string,
  calendar: { id: string; backgroundColor?: string | null },
) {
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
  // An event's own colorId (set by the person directly in Google) takes
  // priority over the calendar's default color; otherwise fall back to it.
  const ownColor = event.colorId ? GOOGLE_EVENT_COLORS[event.colorId] : undefined;
  const calendarColor = /^#[0-9A-Fa-f]{6}$/.test(calendar.backgroundColor ?? "")
    ? calendar.backgroundColor
    : "#2563eb";
  return {
    starts_at: startsAt,
    ends_at: endsAt,
    is_all_day: allDay,
    created_by: createdBy,
    updated_by: createdBy,
    google_calendar_id: calendar.id,
    google_event_id: event.id,
    google_etag: event.etag ?? null,
    google_updated_at: event.updated ?? null,
    title: event.summary || "Sem título",
    description: event.description ?? null,
    location: event.location ?? null,
    meeting_url: event.hangoutLink ?? null,
    color: ownColor ?? calendarColor,
    source: "google",
    sync_status: "synced",
  };
}

function requestedRange(body: any) {
  const start = typeof body?.rangeStart === "string" ? new Date(body.rangeStart) : null;
  const end = typeof body?.rangeEnd === "string" ? new Date(body.rangeEnd) : null;
  if (start && end && !Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime()) && end > start)
    return { start, end };
  const startDefault = new Date();
  startDefault.setMonth(startDefault.getMonth() - 3);
  const endDefault = new Date();
  endDefault.setFullYear(endDefault.getFullYear() + 1);
  return { start: startDefault, end: endDefault };
}

async function listGoogleEvents(
  token: string,
  calendarId: string,
  range: { start: Date; end: Date },
) {
  const events: any[] = [];
  let pageToken = "";
  do {
    const query = new URLSearchParams({
      // Expand recurring events into their real occurrences. With this set
      // to "false" the API returns one row per recurring series (its first
      // occurrence only), so weekly/daily meetings would never repeat in
      // the Agenda grid or appear on other weeks.
      singleEvents: "true",
      showDeleted: "false",
      maxResults: "2500",
      timeMin: range.start.toISOString(),
      timeMax: range.end.toISOString(),
      orderBy: "startTime",
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
    const query = new URLSearchParams({
      maxResults: "250",
      // Without this, a calendar the connected account toggled off in its
      // own Google Calendar sidebar ("Other calendars") silently drops out
      // of this list entirely — and with it, every event from that person.
      showHidden: "true",
    });
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

async function sync(request: Request, body: any = {}) {
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
  const token = await tokenForConnection(admin, connection);
  const range = requestedRange(body);
  const calendars = await listAccessibleCalendars(token);
  const sharedCalendar = calendars.find((calendar) => calendar.id === calendarId);
  const canWriteSharedCalendar =
    sharedCalendar?.accessRole === "owner" || sharedCalendar?.accessRole === "writer";
  // Keep the shared calendar in the local filter list, but do not request it
  // with a collaborator's token when Google has not shared it with that user.
  const calendarsForSources = calendars.some((calendar) => calendar.id === calendarId)
    ? calendars
    : [
        {
          id: calendarId,
          summary: "Agenda compartilhada",
          backgroundColor: "#2563eb",
        },
        ...calendars,
      ];

  const { error: sourceError } = await admin.from("calendar_sources").upsert(
    calendarsForSources.map((calendar) => ({
      google_calendar_id: calendar.id,
      name: calendar.summary || calendar.summaryOverride || calendar.id,
      color: /^#[0-9A-Fa-f]{6}$/.test(calendar.backgroundColor ?? "")
        ? calendar.backgroundColor
        : "#2563eb",
      is_shared: calendar.id === calendarId,
    })),
    { onConflict: "google_calendar_id" },
  );
  if (sourceError) throw sourceError;

  const eventPages = await Promise.allSettled(
    calendars.map(async (calendar) => ({
      calendar,
      events: await listGoogleEvents(token, calendar.id, range),
    })),
  );
  const importedCalendars = eventPages
    .filter(
      (
        result,
      ): result is PromiseFulfilledResult<{
        calendar: { id: string; backgroundColor?: string | null };
        events: any[];
      }> => result.status === "fulfilled",
    )
    .map((result) => result.value);
  const calendarErrors = eventPages
    .filter((result): result is PromiseRejectedResult => result.status === "rejected")
    .map((result) =>
      result.reason instanceof Error ? result.reason.message : "Calendário inacessível.",
    );
  const googleEvents = importedCalendars.flatMap(({ calendar, events }) =>
    events.map((event) => ({ ...event, taskflowCalendar: calendar })),
  );
  const remoteIds = new Set(
    googleEvents
      .filter((event) => event.taskflowCalendar.id === calendarId)
      .map((event) => event.id),
  );
  const remotePayloads = googleEvents.map((event) =>
    googleToLocal(event, user.id, event.taskflowCalendar),
  );
  const { error: importError } = remotePayloads.length
    ? await admin
        .from("calendar_events")
        .upsert(remotePayloads, { onConflict: "google_calendar_id,google_event_id" })
    : { error: null };
  const pulled = importError ? 0 : remotePayloads.length;
  const importErrors = [...calendarErrors, ...(importError ? [importError.message] : [])];

  const { data: localEvents, error: localError } = await admin
    .from("calendar_events")
    .select("*")
    .in("sync_status", ["pending", "not_configured", "error"])
    .or(`created_by.eq.${user.id},updated_by.eq.${user.id}`)
    .order("starts_at");
  if (localError) throw localError;
  let pushed = 0;
  const pushErrors: string[] = [];
  for (const event of localEvents ?? []) {
    try {
      const targetCalendarId = event.google_calendar_id ?? calendarId;
      if (targetCalendarId === calendarId && !canWriteSharedCalendar) {
        const message =
          "Sua conta Google precisa ter a permissão 'Fazer alterações em eventos' na agenda compartilhada.";
        await admin
          .from("calendar_events")
          .update({
            sync_status: "error",
            sync_error: message,
          })
          .eq("id", event.id);
        pushErrors.push(message);
        continue;
      }
      const writeToken = token;
      if (event.deleted_at) {
        if (event.google_event_id) {
          try {
            await googleRequest(
              writeToken,
              `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(targetCalendarId)}/events/${encodeURIComponent(event.google_event_id)}`,
              { method: "DELETE" },
            );
          } catch (error) {
            if (!wasRemovedFromGoogle(error)) throw error;
          }
        }
        await admin
          .from("calendar_events")
          .update({ sync_status: "synced", sync_error: null })
          .eq("id", event.id);
        continue;
      }
      const payload = localPayload(event);
      let googleEvent: any;
      if (event.google_event_id) {
        try {
          googleEvent = await googleRequest(
            writeToken,
            `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(targetCalendarId)}/events/${encodeURIComponent(event.google_event_id)}`,
            { method: "PATCH", body: JSON.stringify(payload) },
          );
        } catch (error) {
          if (!wasRemovedFromGoogle(error)) throw error;
          // The Google entry was removed outside Taskflow. Recreate it and
          // replace the stale remote ID so future edits remain synchronized.
          googleEvent = await googleRequest(
            writeToken,
            `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(targetCalendarId)}/events`,
            { method: "POST", body: JSON.stringify(payload) },
          );
        }
      } else {
        googleEvent = await googleRequest(
          writeToken,
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(targetCalendarId)}/events`,
          { method: "POST", body: JSON.stringify(payload) },
        );
      }
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
      const message = error instanceof Error ? error.message : "Erro ao enviar ao Google.";
      await admin
        .from("calendar_events")
        .update({
          sync_status: "error",
          sync_error: message,
        })
        .eq("id", event.id);
      pushErrors.push(message);
    }
  }
  const { data: activeEvents, error: activeEventsError } = await admin
    .from("calendar_events")
    .select("*")
    .is("deleted_at", null)
    .lt("starts_at", range.end.toISOString())
    .gt("ends_at", range.start.toISOString())
    .order("starts_at", { ascending: true });
  if (activeEventsError) throw activeEventsError;
  return json({
    ok: true,
    pushed,
    pulled,
    remoteEvents: remoteIds.size,
    importErrors: [...new Set(importErrors)].slice(0, 3),
    pushErrors: [...new Set(pushErrors)].slice(0, 3),
    events: activeEvents ?? [],
  });
}

async function savedSourcesForUser(admin: any, userId: string) {
  const [sourcesResult, preferencesResult] = await Promise.all([
    admin
      .from("calendar_sources")
      .select("google_calendar_id, name, color, is_shared")
      .order("is_shared", { ascending: false })
      .order("name", { ascending: true }),
    admin
      .from("calendar_source_preferences")
      .select("google_calendar_id, is_visible")
      .eq("user_id", userId),
  ]);
  if (sourcesResult.error) throw sourcesResult.error;
  if (preferencesResult.error) throw preferencesResult.error;
  const visibility = new Map(
    (preferencesResult.data ?? []).map((item: any) => [item.google_calendar_id, item.is_visible]),
  );
  return (sourcesResult.data ?? []).map((source: any) => ({
    ...source,
    is_visible: visibility.get(source.google_calendar_id) ?? true,
  }));
}

async function listSavedSources(request: Request) {
  const { user, admin } = await authenticatedTeamUser(request);
  const sources = await savedSourcesForUser(admin, user.id);
  return json({ ok: true, sources });
}

async function listSavedEvents(request: Request, body: any = {}) {
  const { user, admin } = await authenticatedTeamUser(request);
  const range = requestedRange(body);
  const [eventsResult, sources] = await Promise.all([
    admin
      .from("calendar_events")
      .select("*")
      .is("deleted_at", null)
      .lt("starts_at", range.end.toISOString())
      .gt("ends_at", range.start.toISOString())
      .order("starts_at", { ascending: true }),
    savedSourcesForUser(admin, user.id),
  ]);
  if (eventsResult.error) throw eventsResult.error;
  return json({ ok: true, events: eventsResult.data ?? [], sources });
}

async function setCalendarVisibility(request: Request, body: any) {
  const { user, admin } = await authenticatedTeamUser(request);
  if (typeof body?.googleCalendarId !== "string" || typeof body?.isVisible !== "boolean")
    throw new Error("Filtro de agenda inválido.");
  const { error } = await admin.from("calendar_source_preferences").upsert(
    {
      user_id: user.id,
      google_calendar_id: body.googleCalendarId,
      is_visible: body.isVisible,
    },
    { onConflict: "user_id,google_calendar_id" },
  );
  if (error) throw error;
  return json({ ok: true });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);
  try {
    const body = await request.json().catch(() => ({}));
    if (body?.action === "list_events") return await listSavedEvents(request, body);
    if (body?.action === "list_sources") return await listSavedSources(request);
    if (body?.action === "set_calendar_visibility")
      return await setCalendarVisibility(request, body);
    return await sync(request, body);
  } catch (error) {
    console.error(error);
    return json({
      ok: false,
      error: error instanceof Error ? error.message : "Não foi possível sincronizar.",
    });
  }
});
