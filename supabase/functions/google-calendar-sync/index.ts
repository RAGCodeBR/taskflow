import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const GOOGLE_TIME_ZONE = "America/Sao_Paulo";
const meetSettingsScope = "https://www.googleapis.com/auth/meetings.space.settings";
const meetCreatedScope = "https://www.googleapis.com/auth/meetings.space.created";
const meetingLinkMarker = "Google Meet: ";
// Fixed palette Google Calendar uses for per-event colors (colorId 1-11).
// TaskFlow never sets one of these itself (see localPayload below) — this
// table only decodes a colorId a person set directly in Google, so that
// genuine per-event override is preserved on pull.
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
  if (!response.ok) {
    const error = new Error(
      data?.error?.message ?? "Não foi possível sincronizar com o Google Agenda.",
    ) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }
  return data;
}

function googleMeetCode(meetingUrl: string) {
  const match = meetingUrl.match(/meet\.google\.com\/([a-z]{3,}-[a-z]{3,}-[a-z]{3,})/i);
  return match?.[1] ?? null;
}

function connectionHasScope(connection: any, scope: string) {
  return String(connection.granted_scopes ?? "")
    .split(/\s+/)
    .includes(scope);
}

async function configureMeetArtifacts(token: string, meetingUrl: string, event: any) {
  const meetingCode = googleMeetCode(meetingUrl);
  if (!meetingCode) throw new Error("O link criado pelo Google Meet não é válido.");

  // A meeting code is a short-lived alias, which is exactly what we need
  // here: configure the space immediately after Calendar creates it.
  const space = await googleRequest(
    token,
    `https://meet.googleapis.com/v2/spaces/${encodeURIComponent(meetingCode)}`,
  );
  const spaceId = String(space?.name ?? "").replace(/^spaces\//, "");
  if (!spaceId) throw new Error("O espaço do Google Meet ainda não está disponível.");

  const updateMask = [
    "config.artifactConfig.smartNotesConfig.autoSmartNotesGeneration",
    "config.artifactConfig.transcriptionConfig.autoTranscriptionGeneration",
  ].join(",");
  await googleRequest(
    token,
    `https://meet.googleapis.com/v2/spaces/${encodeURIComponent(spaceId)}?updateMask=${encodeURIComponent(updateMask)}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        name: `spaces/${spaceId}`,
        config: {
          artifactConfig: {
            smartNotesConfig: {
              autoSmartNotesGeneration: event.auto_smart_notes ? "ON" : "OFF",
            },
            transcriptionConfig: {
              autoTranscriptionGeneration: event.auto_transcription ? "ON" : "OFF",
            },
          },
        },
      }),
    },
  );
}

async function createMeetSpace(token: string) {
  const space = await googleRequest(token, "https://meet.googleapis.com/v2/spaces", {
    method: "POST",
    body: "{}",
  });
  if (typeof space?.meetingUri !== "string" || !space.meetingUri)
    throw new Error("O Google Meet não retornou o link da reunião.");
  return space;
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

function taskflowDescription(description: unknown, meetingUrl?: string | null) {
  const cleanDescription = String(description ?? "")
    .replace(
      new RegExp(
        `\\n*${meetingLinkMarker.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}https://meet\\.google\\.com/[^\\s]+`,
        "gi",
      ),
      "",
    )
    .trim();
  if (!meetingUrl) return cleanDescription || undefined;
  return [cleanDescription, `${meetingLinkMarker}${meetingUrl}`].filter(Boolean).join("\n\n");
}

function meetingUrlFromDescription(description: unknown) {
  const match = String(description ?? "").match(
    /Google Meet:\s*(https:\/\/meet\.google\.com\/[^\s]+)/i,
  );
  return match?.[1] ?? null;
}

function localPayload(event: any) {
  const payload: Record<string, unknown> = {
    summary: event.title,
    description: taskflowDescription(event.description, event.meeting_url),
    location: event.location ?? undefined,
    ...googleDate(event),
    // The color picked in TaskFlow is always the target calendar's own
    // color (there is no independent per-event color anymore), so this
    // explicitly clears any custom colorId instead of approximating one —
    // otherwise the event would carry a slightly-off "own color" that then
    // wins over the calendar's real color on the next pull.
    colorId: null,
    attendees: Array.isArray(event.attendee_emails)
      ? event.attendee_emails.map((email: string) => ({ email }))
      : [],
    extendedProperties: { private: { taskflowEventId: event.id } },
  };
  return payload;
}

function googleEventUrl(
  calendarId: string,
  eventId?: string,
  supportsConferenceData = false,
  sendUpdates = false,
) {
  const path = eventId
    ? `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`
    : `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`;
  const query = new URLSearchParams();
  if (supportsConferenceData) query.set("conferenceDataVersion", "1");
  if (sendUpdates) query.set("sendUpdates", "all");
  const suffix = query.toString();
  return suffix ? `${path}?${suffix}` : path;
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
    google_synced_calendar_id: calendar.id,
    google_event_id: event.id,
    google_etag: event.etag ?? null,
    google_updated_at: event.updated ?? null,
    title: event.summary || "Sem título",
    description: taskflowDescription(event.description) ?? null,
    location: event.location ?? null,
    meeting_url: event.hangoutLink ?? meetingUrlFromDescription(event.description),
    attendee_emails: (event.attendees ?? [])
      .map((attendee: any) => attendee.email)
      .filter((email: unknown): email is string => typeof email === "string")
      .map((email: string) => email.toLowerCase()),
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
      // Deleted events come back with status "cancelled" instead of being
      // omitted — the only way the sync can notice a deletion made directly
      // in Google and mirror it into TaskFlow.
      showDeleted: "true",
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
            // A cancelled event usually comes back without start/end, and it
            // still has to reach the caller so the local row gets removed.
            event.status === "cancelled" ||
            ((event.start?.date || event.start?.dateTime) &&
              (event.end?.date || event.end?.dateTime)),
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
  // The person can now target any registered calendar when creating an
  // event in TaskFlow (not just the shared one), so writability has to be
  // checked per target calendar instead of only for the shared calendar.
  const accessRoleByCalendarId = new Map(
    calendars.map((calendar) => [calendar.id, calendar.accessRole]),
  );
  const nameByCalendarId = new Map(
    calendars.map((calendar) => [calendar.id, calendar.summary || calendar.id]),
  );
  const canWriteCalendar = (id: string) => {
    const role = accessRoleByCalendarId.get(id);
    return role === "owner" || role === "writer";
  };
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

  // Local changes are flushed to Google BEFORE importing Google's state.
  // With the opposite order the import rewrote sync_status of every row it
  // touched, so an event deleted in TaskFlow was marked "synced" by the
  // import and its deletion never reached Google.
  const { data: localEvents, error: localError } = await admin
    .from("calendar_events")
    .select("*")
    .in("sync_status", ["pending", "not_configured", "error"])
    .or(`created_by.eq.${user.id},updated_by.eq.${user.id}`)
    .order("starts_at");
  if (localError) throw localError;
  let pushed = 0;
  const pushErrors: string[] = [];
  const pushFailures: { id: string; message: string }[] = [];
  for (const event of localEvents ?? []) {
    try {
      const targetCalendarId = event.google_calendar_id ?? calendarId;
      const remoteCalendarId = event.google_synced_calendar_id ?? targetCalendarId;
      const calendarNeedingWrite = event.deleted_at ? remoteCalendarId : targetCalendarId;
      if (
        !canWriteCalendar(calendarNeedingWrite) ||
        (event.google_event_id &&
          remoteCalendarId !== targetCalendarId &&
          !canWriteCalendar(remoteCalendarId))
      ) {
        const targetName = nameByCalendarId.get(calendarNeedingWrite) ?? "selecionada";
        const message = `Sua conta Google precisa ter a permissão 'Fazer alterações em eventos' na agenda ${targetName}.`;
        await admin
          .from("calendar_events")
          .update({
            sync_status: "error",
            sync_error: message,
          })
          .eq("id", event.id);
        pushErrors.push(message);
        pushFailures.push({ id: event.id, message });
        continue;
      }
      const writeToken = token;
      if (event.deleted_at) {
        if (event.google_event_id) {
          try {
            await googleRequest(
              writeToken,
              googleEventUrl(remoteCalendarId, event.google_event_id, false, true),
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
      let meetingUrl = event.meeting_url ?? null;
      if (event.create_google_meet) {
        if (
          !connectionHasScope(connection, meetCreatedScope) ||
          !connectionHasScope(connection, meetSettingsScope)
        )
          throw new Error(
            "Reconecte sua conta Google para autorizar a criação do Meet e a configuração automática de ata e transcrição.",
          );

        // Create the Meet with the employee's own Google identity first.
        // The shared calendar only receives the already-created meeting link,
        // so the creator remains the Meet organizer regardless of which
        // company calendar stores the compromisso.
        if (!meetingUrl) {
          const meetSpace = await createMeetSpace(writeToken);
          meetingUrl = meetSpace.meetingUri;
          // Persist before Calendar work so a retry never creates a second
          // meeting when Calendar is temporarily unavailable.
          await admin
            .from("calendar_events")
            .update({ meeting_url: meetingUrl, sync_status: "pending", sync_error: null })
            .eq("id", event.id);
        }
        await configureMeetArtifacts(writeToken, meetingUrl, event);
      }

      const payload = localPayload({
        ...event,
        meeting_url: meetingUrl,
        create_google_meet: false,
      });
      let googleEvent: any;
      if (event.google_event_id) {
        let remoteEventId = event.google_event_id;
        if (remoteCalendarId !== targetCalendarId) {
          const moveUrl = new URL(
            `${googleEventUrl(remoteCalendarId, event.google_event_id)}/move`,
          );
          moveUrl.searchParams.set("destination", targetCalendarId);
          moveUrl.searchParams.set("sendUpdates", "none");
          try {
            googleEvent = await googleRequest(writeToken, moveUrl.toString(), { method: "POST" });
          } catch (error) {
            if (!wasRemovedFromGoogle(error)) throw error;
            // A previous move may have succeeded before its local confirmation.
            // Never POST a second copy merely because the source ID is gone.
            googleEvent = await googleRequest(
              writeToken,
              googleEventUrl(targetCalendarId, event.google_event_id),
            );
          }
          remoteEventId = googleEvent.id;
          const { error: moveSaveError } = await admin
            .from("calendar_events")
            .update({
              google_calendar_id: targetCalendarId,
              google_synced_calendar_id: targetCalendarId,
              google_event_id: remoteEventId,
              sync_status: "pending",
            })
            .eq("id", event.id);
          if (moveSaveError) throw moveSaveError;
        }
        try {
          googleEvent = await googleRequest(
            writeToken,
            googleEventUrl(targetCalendarId, remoteEventId, false, true),
            { method: "PATCH", body: JSON.stringify(payload) },
          );
        } catch (error) {
          if (!wasRemovedFromGoogle(error)) throw error;
          if (event.recurring_meeting_occurrence_id) {
            throw new Error(
              "O evento da reunião não foi encontrado no Google. A sincronização foi interrompida para evitar uma cópia duplicada.",
            );
          }
          // The Google entry was removed outside Taskflow. Recreate it and
          // replace the stale remote ID so future edits remain synchronized.
          googleEvent = await googleRequest(
            writeToken,
            googleEventUrl(targetCalendarId, undefined, false, true),
            { method: "POST", body: JSON.stringify(payload) },
          );
        }
      } else {
        // O ID estável torna dois sincronizadores simultâneos idempotentes.
        // UUID usa apenas caracteres permitidos pelo base32hex do Google.
        const stableEventId = `tf${event.id.replaceAll("-", "")}`;
        try {
          googleEvent = await googleRequest(
            writeToken,
            googleEventUrl(targetCalendarId, undefined, false, true),
            { method: "POST", body: JSON.stringify({ ...payload, id: stableEventId }) },
          );
        } catch (error) {
          if ((error as Error & { status?: number }).status !== 409) throw error;
          googleEvent = await googleRequest(
            writeToken,
            googleEventUrl(targetCalendarId, stableEventId),
          );
          if (googleEvent?.extendedProperties?.private?.taskflowEventId !== event.id)
            throw new Error("O ID do evento já existe no Google para outro compromisso.");
        }
      }
      meetingUrl =
        googleEvent.hangoutLink ??
        meetingUrlFromDescription(googleEvent.description) ??
        meetingUrl ??
        null;
      await admin
        .from("calendar_events")
        .update({
          google_event_id: googleEvent.id,
          google_calendar_id: targetCalendarId,
          google_synced_calendar_id: targetCalendarId,
          google_etag: googleEvent.etag ?? null,
          google_updated_at: googleEvent.updated ?? null,
          meeting_url: meetingUrl,
          create_google_meet: false,
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
      pushFailures.push({ id: event.id, message });
    }
  }

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
  const cancelledByCalendar = new Map<string, string[]>();
  const activeGoogleEvents: any[] = [];
  for (const event of googleEvents) {
    if (event.status === "cancelled") {
      const ids = cancelledByCalendar.get(event.taskflowCalendar.id) ?? [];
      ids.push(event.id);
      cancelledByCalendar.set(event.taskflowCalendar.id, ids);
      continue;
    }
    activeGoogleEvents.push(event);
  }
  // Um POST antigo podia ser repetido por duas sincronizações simultâneas.
  // Se o evento remoto aponta para um registro TaskFlow já vinculado a outro
  // ID do Google, ele é a cópia excedente e não deve voltar à Agenda.
  const taskflowIds = [
    ...new Set(
      activeGoogleEvents
        .map((event) => event.extendedProperties?.private?.taskflowEventId)
        .filter(
          (id): id is string =>
            typeof id === "string" &&
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id),
        ),
    ),
  ];
  const linkedById = new Map<
    string,
    { google_event_id: string | null; google_calendar_id: string | null }
  >();
  for (let index = 0; index < taskflowIds.length; index += 100) {
    const { data: linked, error: linkedError } = await admin
      .from("calendar_events")
      .select("id,google_event_id,google_calendar_id")
      .in("id", taskflowIds.slice(index, index + 100));
    if (linkedError) throw linkedError;
    for (const row of linked ?? []) linkedById.set(row.id, row);
  }
  const duplicateEvents = activeGoogleEvents.filter((event) => {
    const taskflowId = event.extendedProperties?.private?.taskflowEventId;
    const linked = typeof taskflowId === "string" ? linkedById.get(taskflowId) : null;
    return (
      !!linked?.google_event_id &&
      linked.google_calendar_id === event.taskflowCalendar.id &&
      linked.google_event_id !== event.id
    );
  });
  for (const event of duplicateEvents) {
    const { error: hideError } = await admin
      .from("calendar_events")
      .update({ hidden_at: new Date().toISOString() })
      .eq("google_calendar_id", event.taskflowCalendar.id)
      .eq("google_event_id", event.id)
      .is("recurring_meeting_occurrence_id", null)
      .is("hidden_at", null);
    if (hideError) throw hideError;
  }
  const duplicateGoogleIds = new Set(
    duplicateEvents.map((event) => `${event.taskflowCalendar.id}:${event.id}`),
  );
  const remotePayloads = activeGoogleEvents
    .filter((event) => {
      return !duplicateGoogleIds.has(`${event.taskflowCalendar.id}:${event.id}`);
    })
    .map((event) => googleToLocal(event, user.id, event.taskflowCalendar));
  const { error: importError } = remotePayloads.length
    ? await admin
        .from("calendar_events")
        .upsert(remotePayloads, { onConflict: "google_calendar_id,google_event_id" })
    : { error: null };
  const pulled = importError ? 0 : remotePayloads.length;
  const importErrors = [...calendarErrors, ...(importError ? [importError.message] : [])];

  // Google reports a deleted event as "cancelled" instead of dropping it from
  // the list — that is how a deletion made directly in Google reaches
  // TaskFlow, which the import previously had no way of noticing.
  let removed = 0;
  for (const [cancelledCalendarId, cancelledIds] of cancelledByCalendar) {
    for (let index = 0; index < cancelledIds.length; index += 100) {
      const { data: removedRows, error: removeError } = await admin
        .from("calendar_events")
        .update({
          deleted_at: new Date().toISOString(),
          sync_status: "synced",
          sync_error: null,
        })
        .eq("google_calendar_id", cancelledCalendarId)
        .in("google_event_id", cancelledIds.slice(index, index + 100))
        .is("deleted_at", null)
        .select("id");
      if (removeError) importErrors.push(removeError.message);
      else removed += removedRows?.length ?? 0;
    }
  }

  // The import above rewrites sync_status on every row it touches, which
  // would erase the error just recorded for an event that failed to push.
  for (const failure of pushFailures) {
    await admin
      .from("calendar_events")
      .update({ sync_status: "error", sync_error: failure.message })
      .eq("id", failure.id);
  }

  const { data: activeEvents, error: activeEventsError } = await admin
    .from("calendar_events")
    .select("*")
    .is("deleted_at", null)
    .is("hidden_at", null)
    .lt("starts_at", range.end.toISOString())
    .gt("ends_at", range.start.toISOString())
    .order("starts_at", { ascending: true });
  if (activeEventsError) throw activeEventsError;
  return json({
    ok: true,
    pushed,
    pulled,
    removed,
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

async function meetingInviteDetails(request: Request, body: any) {
  const { user, admin } = await authenticatedTeamUser(request);
  if (typeof body?.eventId !== "string") throw new Error("Reunião inválida.");
  const { data: event, error: eventError } = await admin
    .from("calendar_events")
    .select("meeting_url")
    .eq("id", body.eventId)
    .is("deleted_at", null)
    .maybeSingle();
  if (eventError || !event?.meeting_url) throw new Error("Google Meet não encontrado.");
  const meetingCode = googleMeetCode(event.meeting_url);
  if (!meetingCode) return json({ ok: true, phoneAccess: [] });

  const { data: connection, error: connectionError } = await admin
    .from("calendar_google_connections")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
  if (connectionError || !connection) return json({ ok: true, phoneAccess: [] });
  const token = await tokenForConnection(admin, connection);
  const space = await googleRequest(
    token,
    `https://meet.googleapis.com/v2/spaces/${encodeURIComponent(meetingCode)}`,
  );
  return json({
    ok: true,
    phoneAccess: Array.isArray(space?.phoneAccess)
      ? space.phoneAccess.map((entry: any) => ({
          phoneNumber: entry.phoneNumber,
          pin: entry.pin,
          regionCode: entry.regionCode,
        }))
      : [],
  });
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
    if (body?.action === "meeting_invite") return await meetingInviteDetails(request, body);
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
