import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const calendarScope = "https://www.googleapis.com/auth/calendar.events";
const identityScopes = "openid email";

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function appUrl(params: Record<string, string>) {
  const base = Deno.env.get("TASKFLOW_APP_URL");
  if (!base) throw new Error("TASKFLOW_APP_URL não está configurada.");
  const url = new URL("/agenda", base.endsWith("/") ? base : `${base}/`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  return url.toString();
}

function redirect(url: string) {
  return new Response(null, { status: 302, headers: { Location: url } });
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
  return { user: data.user, admin, projectUrl };
}

async function begin(request: Request) {
  const { user, admin, projectUrl } = await authenticatedTeamUser(request);
  const clientId = Deno.env.get("GOOGLE_OAUTH_CLIENT_ID");
  if (!clientId) throw new Error("A integração Google ainda não foi configurada.");
  const state = crypto.randomUUID();
  const { error } = await admin.from("calendar_google_oauth_states").insert({
    state,
    user_id: user.id,
    expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
  });
  if (error) throw error;
  const authorizationUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authorizationUrl.search = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${projectUrl}/functions/v1/google-calendar-oauth`,
    response_type: "code",
    scope: `${identityScopes} ${calendarScope}`,
    access_type: "offline",
    include_granted_scopes: "true",
    prompt: "consent",
    state,
  }).toString();
  return json({ authorizeUrl: authorizationUrl.toString() });
}

async function callback(request: Request) {
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  if (url.searchParams.get("error")) return redirect(appUrl({ google: "cancelled" }));
  if (!state || !code) return redirect(appUrl({ google: "error" }));
  const projectUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(projectUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: stateRow, error: stateError } = await admin
    .from("calendar_google_oauth_states")
    .select("state, user_id, expires_at, used_at")
    .eq("state", state)
    .maybeSingle();
  if (stateError || !stateRow || stateRow.used_at || new Date(stateRow.expires_at) < new Date())
    return redirect(appUrl({ google: "error" }));
  await admin
    .from("calendar_google_oauth_states")
    .update({ used_at: new Date().toISOString() })
    .eq("state", state);
  const clientId = Deno.env.get("GOOGLE_OAUTH_CLIENT_ID");
  const clientSecret = Deno.env.get("GOOGLE_OAUTH_CLIENT_SECRET");
  if (!clientId || !clientSecret) throw new Error("As credenciais Google não estão configuradas.");
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: `${projectUrl}/functions/v1/google-calendar-oauth`,
      grant_type: "authorization_code",
    }),
  });
  const tokens = await tokenResponse.json();
  if (!tokenResponse.ok || !tokens.access_token || !tokens.refresh_token)
    throw new Error("O Google não retornou uma autorização válida. Tente conectar novamente.");
  const profileResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  const profile = await profileResponse.json();
  if (!profileResponse.ok || !profile.email)
    throw new Error("Não foi possível identificar a conta Google.");
  const { error: connectionError } = await admin.from("calendar_google_connections").upsert(
    {
      user_id: stateRow.user_id,
      google_email: profile.email,
      refresh_token: tokens.refresh_token,
      access_token: tokens.access_token,
      access_token_expires_at: new Date(
        Date.now() + Number(tokens.expires_in ?? 3600) * 1000,
      ).toISOString(),
      granted_scopes: tokens.scope ?? `${identityScopes} ${calendarScope}`,
    },
    { onConflict: "user_id" },
  );
  if (connectionError) throw connectionError;
  return redirect(appUrl({ google: "connected" }));
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    if (request.method === "GET") return await callback(request);
    if (request.method === "POST") return await begin(request);
    return json({ error: "Método não permitido." }, 405);
  } catch (error) {
    console.error(error);
    return json(
      {
        error:
          error instanceof Error ? error.message : "Não foi possível conectar ao Google Agenda.",
      },
      400,
    );
  }
});
