# supabase/functions/google-calendar-oauth/index.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createClient } from "https://esm.sh/@supabase/supabase-js@2";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 3 | `const corsHeaders = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 4 | `  "Access-Control-Allow-Origin": "*",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 5 | `  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 6 | `  "Access-Control-Allow-Methods": "POST, OPTIONS",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 8 | `// Full Calendar scope is required to list every calendar the connected account` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 9 | `// can access, then consolidate their events in the Taskflow Agenda.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 10 | `const calendarScope = "https://www.googleapis.com/auth/calendar";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 11 | `const identityScopes = "openid email";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 12 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 13 | `function json(body: Record<string, unknown>, status = 200) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 14 | `  return new Response(JSON.stringify(body), {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 15 | `    status,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `    headers: { ...corsHeaders, "Content-Type": "application/json" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 18 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 19 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 20 | `function appUrl(params: Record<string, string>) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 21 | `  const base = Deno.env.get("TASKFLOW_APP_URL");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 22 | `  if (!base) throw new Error("TASKFLOW_APP_URL não está configurada.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 23 | `  const url = new URL("/agenda", base.endsWith("/") ? base : \`${base}/\`);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 24 | `  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);` | Inicia uma repeticao sobre dados ou condicoes. |
| 25 | `  return url.toString();` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 26 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `function redirect(url: string) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 29 | `  return new Response(null, { status: 302, headers: { Location: url } });` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 30 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 31 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 32 | `async function authenticatedTeamUser(request: Request) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  const authorization = request.headers.get("Authorization");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 34 | `  if (!authorization) throw new Error("Sessão não encontrada.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 35 | `  const projectUrl = Deno.env.get("SUPABASE_URL")!;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 36 | `  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 37 | `  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 38 | `  const auth = createClient(projectUrl, anonKey, {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 39 | `    global: { headers: { Authorization: authorization } },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 41 | `  const { data, error } = await auth.auth.getUser();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 42 | `  if (error || !data.user) throw new Error("Sessão inválida.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 43 | `  const admin = createClient(projectUrl, serviceKey, {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 44 | `    auth: { persistSession: false, autoRefreshToken: false },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 46 | `  const { data: roles, error: roleError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 47 | `    .from("user_roles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `    .select("role")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `    .eq("user_id", data.user.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `  if (roleError) throw roleError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 51 | `  if (!roles?.some((item) => item.role === "admin" || item.role === "collaborator"))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 52 | `    throw new Error("Sua conta não possui acesso à Agenda.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `  return { user: data.user, admin, projectUrl };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 54 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 55 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 56 | `async function begin(request: Request) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 57 | `  const { user, admin, projectUrl } = await authenticatedTeamUser(request);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 58 | `  const clientId = Deno.env.get("GOOGLE_OAUTH_CLIENT_ID");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 59 | `  if (!clientId) throw new Error("A integração Google ainda não foi configurada.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 60 | `  const state = crypto.randomUUID();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 61 | `  const { error } = await admin.from("calendar_google_oauth_states").insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 62 | `    state,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 63 | `    user_id: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `    expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 66 | `  if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 67 | `  const authorizationUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 68 | `  authorizationUrl.search = new URLSearchParams({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `    client_id: clientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `    redirect_uri: \`${projectUrl}/functions/v1/google-calendar-oauth\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `    response_type: "code",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 72 | `    scope: \`${identityScopes} ${calendarScope}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `    access_type: "offline",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `    // Force the consent page so old identity-only connections also receive` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 75 | `    // the Calendar permission required by the Agenda.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 76 | `    include_granted_scopes: "false",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `    prompt: "select_account consent",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `    state,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `  }).toString();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `  return json({ authorizeUrl: authorizationUrl.toString() });` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 81 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 82 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 83 | `async function disconnect(request: Request) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `  const { user, admin } = await authenticatedTeamUser(request);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 85 | `  const { error } = await admin.from("calendar_google_connections").delete().eq("user_id", user.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 86 | `  if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 87 | `  await admin.from("calendar_google_oauth_states").delete().eq("user_id", user.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 88 | `  return json({ ok: true });` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 89 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 90 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 91 | `async function callback(request: Request) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `  const url = new URL(request.url);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 93 | `  const state = url.searchParams.get("state");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 94 | `  const code = url.searchParams.get("code");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 95 | `  if (url.searchParams.get("error")) return redirect(appUrl({ google: "cancelled" }));` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 96 | `  if (!state || !code) return redirect(appUrl({ google: "error" }));` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 97 | `  const projectUrl = Deno.env.get("SUPABASE_URL")!;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 98 | `  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 99 | `  const admin = createClient(projectUrl, serviceKey, {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 100 | `    auth: { persistSession: false, autoRefreshToken: false },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 101 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 102 | `  const { data: stateRow, error: stateError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 103 | `    .from("calendar_google_oauth_states")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 104 | `    .select("state, user_id, expires_at, used_at")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 105 | `    .eq("state", state)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `    .maybeSingle();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `  if (stateError || !stateRow || stateRow.used_at || new Date(stateRow.expires_at) < new Date())` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 108 | `    return redirect(appUrl({ google: "error" }));` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 109 | `  await admin` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 110 | `    .from("calendar_google_oauth_states")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `    .update({ used_at: new Date().toISOString() })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `    .eq("state", state);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `  const clientId = Deno.env.get("GOOGLE_OAUTH_CLIENT_ID");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 114 | `  const clientSecret = Deno.env.get("GOOGLE_OAUTH_CLIENT_SECRET");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 115 | `  if (!clientId || !clientSecret) throw new Error("As credenciais Google não estão configuradas.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 116 | `  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 117 | `    method: "POST",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `    headers: { "Content-Type": "application/x-www-form-urlencoded" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `    body: new URLSearchParams({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 120 | `      code,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `      client_id: clientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `      client_secret: clientSecret,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `      redirect_uri: \`${projectUrl}/functions/v1/google-calendar-oauth\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `      grant_type: "authorization_code",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `    }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 127 | `  const tokens = await tokenResponse.json();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 128 | `  if (!tokenResponse.ok || !tokens.access_token)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 129 | `    throw new Error("O Google não retornou uma autorização válida. Tente conectar novamente.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 130 | `  const profileResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 131 | `    headers: { Authorization: \`Bearer ${tokens.access_token}\` },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 133 | `  const profile = await profileResponse.json();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 134 | `  if (!profileResponse.ok || !profile.email)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 135 | `    throw new Error("Não foi possível identificar a conta Google.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 136 | `  const scopes = String(tokens.scope ?? "").split(/\s+/);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 137 | `  if (!scopes.includes(calendarScope))` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 138 | `    throw new Error(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 139 | `      "Calendar permission was not granted. Reconnect and approve the requested access.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 141 | `  const { data: previousConnection, error: previousConnectionError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 142 | `    .from("calendar_google_connections")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 143 | `    .select("refresh_token")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 144 | `    .eq("user_id", stateRow.user_id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 145 | `    .maybeSingle();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 146 | `  if (previousConnectionError) throw previousConnectionError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 147 | `  const refreshToken = tokens.refresh_token ?? previousConnection?.refresh_token;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 148 | `  if (!refreshToken) throw new Error("Google did not return persistent access. Reconnect again.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 149 | `  const { error: connectionError } = await admin.from("calendar_google_connections").upsert(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 150 | `    {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 151 | `      user_id: stateRow.user_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `      google_email: profile.email,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 153 | `      refresh_token: refreshToken,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `      access_token: tokens.access_token,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 155 | `      access_token_expires_at: new Date(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `        Date.now() + Number(tokens.expires_in ?? 3600) * 1000,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 157 | `      ).toISOString(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 158 | `      granted_scopes: tokens.scope,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 160 | `    { onConflict: "user_id" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 162 | `  if (connectionError) throw connectionError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 163 | `  return redirect(appUrl({ google: "connected" }));` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 164 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 165 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 166 | `Deno.serve(async (request) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 167 | `  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 168 | `  try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 169 | `    if (request.method === "GET") return await callback(request);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 170 | `    if (request.method === "POST") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 171 | `      const body = await request.json().catch(() => ({}));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 172 | `      if (body?.action === "disconnect") return await disconnect(request);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 173 | `      return await begin(request);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 174 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 175 | `    return json({ error: "Método não permitido." }, 405);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 176 | `  } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 177 | `    console.error(error);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `    return json(` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 179 | `      {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 180 | `        error:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 181 | `          error instanceof Error ? error.message : "Não foi possível conectar ao Google Agenda.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 182 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 183 | `      400,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 184 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 185 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 186 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 187 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
