import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
// Escopos mínimos pra ler insights de post e de conta de uma Página que a
// pessoa administra. Ver a precondição de App Review no spec.
const scopes = [
  "instagram_basic",
  "instagram_manage_insights",
  "pages_show_list",
  "pages_read_engagement",
].join(",");

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function appUrl(clientId: string, params: Record<string, string>) {
  const base = Deno.env.get("TASKFLOW_APP_URL");
  if (!base) throw new Error("TASKFLOW_APP_URL não está configurada.");
  const url = new URL(`/clients/${clientId}/insights`, base.endsWith("/") ? base : `${base}/`);
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
    throw new Error("Sua conta não possui acesso a esta conexão.");
  return { user: data.user, admin, projectUrl };
}

async function begin(request: Request, clientId: string) {
  const { user, admin, projectUrl } = await authenticatedTeamUser(request);
  const appId = Deno.env.get("META_APP_ID");
  if (!appId) throw new Error("A integração com a Meta ainda não foi configurada.");
  const state = crypto.randomUUID();
  const { error } = await admin.from("instagram_oauth_states").insert({
    state,
    client_id: clientId,
    user_id: user.id,
    expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
  });
  if (error) throw error;
  const authorizationUrl = new URL("https://www.facebook.com/v21.0/dialog/oauth");
  authorizationUrl.search = new URLSearchParams({
    client_id: appId,
    redirect_uri: `${projectUrl}/functions/v1/instagram-oauth-callback`,
    response_type: "code",
    scope: scopes,
    state,
  }).toString();
  return json({ authorizeUrl: authorizationUrl.toString() });
}

async function disconnect(request: Request, clientId: string) {
  const { admin } = await authenticatedTeamUser(request);
  const { error } = await admin
    .from("client_social_accounts")
    .delete()
    .eq("client_id", clientId)
    .eq("platform", "instagram");
  if (error) throw error;
  return json({ ok: true });
}

async function callback(request: Request) {
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  const projectUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(projectUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  if (!state) return redirect(appUrl("", { instagram: "error" }));
  const { data: stateRow } = await admin
    .from("instagram_oauth_states")
    .select("state, client_id, user_id, expires_at, used_at")
    .eq("state", state)
    .maybeSingle();
  if (!stateRow) return redirect(appUrl("", { instagram: "error" }));
  if (url.searchParams.get("error"))
    return redirect(appUrl(stateRow.client_id, { instagram: "cancelled" }));
  if (!code || stateRow.used_at || new Date(stateRow.expires_at) < new Date())
    return redirect(appUrl(stateRow.client_id, { instagram: "error" }));
  await admin
    .from("instagram_oauth_states")
    .update({ used_at: new Date().toISOString() })
    .eq("state", state);

  const appId = Deno.env.get("META_APP_ID");
  const appSecret = Deno.env.get("META_APP_SECRET");
  if (!appId || !appSecret) throw new Error("As credenciais da Meta não estão configuradas.");
  const redirectUri = `${projectUrl}/functions/v1/instagram-oauth-callback`;

  // 1) code -> token de curta duração
  const shortLivedUrl = new URL("https://graph.facebook.com/v21.0/oauth/access_token");
  shortLivedUrl.search = new URLSearchParams({
    client_id: appId,
    client_secret: appSecret,
    redirect_uri: redirectUri,
    code,
  }).toString();
  const shortLivedResponse = await fetch(shortLivedUrl.toString());
  const shortLived = await shortLivedResponse.json();
  if (!shortLivedResponse.ok || !shortLived.access_token)
    return redirect(appUrl(stateRow.client_id, { instagram: "error" }));

  // 2) token curto -> token de longa duração (~60 dias)
  const longLivedUrl = new URL("https://graph.facebook.com/v21.0/oauth/access_token");
  longLivedUrl.search = new URLSearchParams({
    grant_type: "fb_exchange_token",
    client_id: appId,
    client_secret: appSecret,
    fb_exchange_token: shortLived.access_token,
  }).toString();
  const longLivedResponse = await fetch(longLivedUrl.toString());
  const longLived = await longLivedResponse.json();
  if (!longLivedResponse.ok || !longLived.access_token)
    return redirect(appUrl(stateRow.client_id, { instagram: "error" }));
  const userToken = longLived.access_token as string;
  const expiresInSeconds = Number(longLived.expires_in ?? 60 * 24 * 60 * 60);

  // 3) Páginas que a pessoa administra, com a conta Instagram Business ligada
  const pagesResponse = await fetch(
    `https://graph.facebook.com/v21.0/me/accounts?fields=id,name,access_token,instagram_business_account&access_token=${userToken}`,
  );
  const pages = await pagesResponse.json();
  const pageWithInstagram = (pages.data ?? []).find(
    (page: { instagram_business_account?: { id: string } }) => page.instagram_business_account?.id,
  );
  if (!pageWithInstagram)
    return redirect(appUrl(stateRow.client_id, { instagram: "no-instagram-account" }));

  const { error: upsertError } = await admin.from("client_social_accounts").upsert(
    {
      client_id: stateRow.client_id,
      platform: "instagram",
      ig_business_id: pageWithInstagram.instagram_business_account.id,
      page_id: pageWithInstagram.id,
      page_name: pageWithInstagram.name,
      // O token da Página (não o do usuário) é o que chama os endpoints de
      // insights, e não expira enquanto a pessoa continuar administrando a
      // Página — por isso salvamos esse, não o userToken.
      access_token: pageWithInstagram.access_token,
      token_expires_at: new Date(Date.now() + expiresInSeconds * 1000).toISOString(),
      connected_by: stateRow.user_id,
      last_sync_error: null,
    },
    { onConflict: "client_id,platform" },
  );
  if (upsertError) return redirect(appUrl(stateRow.client_id, { instagram: "error" }));

  return redirect(appUrl(stateRow.client_id, { instagram: "connected" }));
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    if (request.method === "GET") return await callback(request);
    if (request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      if (!body?.client_id) return json({ error: "client_id é obrigatório." }, 400);
      if (body.action === "disconnect") return await disconnect(request, body.client_id);
      return await begin(request, body.client_id);
    }
    return json({ error: "Método não permitido." }, 405);
  } catch (error) {
    console.error(error);
    return json(
      { error: error instanceof Error ? error.message : "Não foi possível conectar ao Instagram." },
      400,
    );
  }
});
