# supabase/functions/google-calendar-sync/index.ts

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
| 8 | `const GOOGLE_TIME_ZONE = "America/Sao_Paulo";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 9 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 10 | `function json(body: Record<string, unknown>, status = 200) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 11 | `  return new Response(JSON.stringify(body), {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 12 | `    status,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `    headers: { ...corsHeaders, "Content-Type": "application/json" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 15 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 16 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 17 | `async function authenticatedTeamUser(request: Request) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  const authorization = request.headers.get("Authorization");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 19 | `  if (!authorization) throw new Error("Sessão não encontrada.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 20 | `  const projectUrl = Deno.env.get("SUPABASE_URL")!;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 21 | `  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 22 | `  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 23 | `  const auth = createClient(projectUrl, anonKey, {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 24 | `    global: { headers: { Authorization: authorization } },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 26 | `  const { data, error } = await auth.auth.getUser();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 27 | `  if (error || !data.user) throw new Error("Sessão inválida.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 28 | `  const admin = createClient(projectUrl, serviceKey, {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 29 | `    auth: { persistSession: false, autoRefreshToken: false },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 31 | `  const { data: roles, error: roleError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 32 | `    .from("user_roles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `    .select("role")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `    .eq("user_id", data.user.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `  if (roleError) throw roleError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 36 | `  if (!roles?.some((item) => item.role === "admin" || item.role === "collaborator"))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 37 | `    throw new Error("Sua conta não possui acesso à Agenda.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `  return { user: data.user, admin };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 39 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 41 | `async function accessToken(connection: any) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `  if (` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 43 | `    connection.access_token &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `    connection.access_token_expires_at &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `    new Date(connection.access_token_expires_at) > new Date(Date.now() + 60_000)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `  )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `    return connection.access_token as string;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 48 | `  const clientId = Deno.env.get("GOOGLE_OAUTH_CLIENT_ID");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 49 | `  const clientSecret = Deno.env.get("GOOGLE_OAUTH_CLIENT_SECRET");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 50 | `  if (!clientId || !clientSecret) throw new Error("As credenciais Google não estão configuradas.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 51 | `  const response = await fetch("https://oauth2.googleapis.com/token", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 52 | `    method: "POST",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `    headers: { "Content-Type": "application/x-www-form-urlencoded" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `    body: new URLSearchParams({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 55 | `      client_id: clientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 56 | `      client_secret: clientSecret,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 57 | `      refresh_token: connection.refresh_token,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 58 | `      grant_type: "refresh_token",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 59 | `    }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 61 | `  const payload = await response.json();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 62 | `  if (!response.ok || !payload.access_token)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 63 | `    throw new Error("A autorização Google expirou. Conecte a conta novamente.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `  return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 65 | `    token: payload.access_token as string,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `    expiresAt: new Date(Date.now() + Number(payload.expires_in ?? 3600) * 1000).toISOString(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 68 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 69 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 70 | `async function tokenForConnection(admin: any, connection: any) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `  const result = await accessToken(connection);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 72 | `  const token = typeof result === "string" ? result : result.token;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 73 | `  if (typeof result !== "string")` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 74 | `    await admin` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 75 | `      .from("calendar_google_connections")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `      .update({ access_token: token, access_token_expires_at: result.expiresAt })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `      .eq("id", connection.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `  return token;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 79 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 80 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 81 | `async function googleRequest(token: string, url: string, init?: RequestInit) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `  const response = await fetch(url, {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 83 | `    ...init,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `    headers: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `      Authorization: \`Bearer ${token}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `      "Content-Type": "application/json",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `      ...(init?.headers ?? {}),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 89 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 90 | `  if (response.status === 204) return null;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 91 | `  const data = await response.json();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 92 | `  if (!response.ok)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 93 | `    throw new Error(data?.error?.message ?? "Não foi possível sincronizar com o Google Agenda.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `  return data;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 95 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 96 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 97 | `function wasRemovedFromGoogle(error: unknown) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 98 | `  const message = error instanceof Error ? error.message.toLowerCase() : "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 99 | `  return message.includes("resource has been deleted") || message.includes("not found");` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 100 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 101 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 102 | `function googleDate(event: any) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 103 | `  if (event.is_all_day) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 104 | `    const start = new Date(event.starts_at).toLocaleDateString("en-CA", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 105 | `      timeZone: GOOGLE_TIME_ZONE,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 107 | `    const endDate = new Date(event.ends_at);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 108 | `    endDate.setDate(endDate.getDate() + 1);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `    const end = endDate.toLocaleDateString("en-CA", { timeZone: GOOGLE_TIME_ZONE });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 110 | `    return { start: { date: start }, end: { date: end } };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 111 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 112 | `  return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 113 | `    start: { dateTime: event.starts_at, timeZone: GOOGLE_TIME_ZONE },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `    end: { dateTime: event.ends_at, timeZone: GOOGLE_TIME_ZONE },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 116 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 117 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 118 | `function localPayload(event: any) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 119 | `  return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 120 | `    summary: event.title,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `    description: event.description ?? undefined,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `    location: event.location ?? undefined,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `    ...googleDate(event),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `    extendedProperties: { private: { taskflowEventId: event.id } },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 126 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 127 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 128 | `function googleToLocal(` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 129 | `  event: any,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 130 | `  createdBy: string,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `  calendar: { id: string; backgroundColor?: string | null },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 133 | `  const allDay = Boolean(event.start?.date);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 134 | `  let startsAt = event.start?.dateTime;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 135 | `  let endsAt = event.end?.dateTime;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 136 | `  if (allDay) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 137 | `    const start = new Date(\`${event.start.date}T00:00:00-03:00\`);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 138 | `    const end = new Date(\`${event.end.date}T00:00:00-03:00\`);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 139 | `    end.setMinutes(end.getMinutes() - 1);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `    startsAt = start.toISOString();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 141 | `    endsAt = end.toISOString();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 142 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 143 | `  return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 144 | `    starts_at: startsAt,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 145 | `    ends_at: endsAt,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 146 | `    is_all_day: allDay,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 147 | `    created_by: createdBy,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 148 | `    updated_by: createdBy,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `    google_calendar_id: calendar.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 150 | `    google_event_id: event.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 151 | `    google_etag: event.etag ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `    google_updated_at: event.updated ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 153 | `    title: event.summary || "Sem título",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `    description: event.description ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 155 | `    location: event.location ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `    meeting_url: event.hangoutLink ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 157 | `    color: /^#[0-9A-Fa-f]{6}$/.test(calendar.backgroundColor ?? "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 158 | `      ? calendar.backgroundColor` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `      : "#2563eb",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 160 | `    source: "google",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `    sync_status: "synced",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 163 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 164 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 165 | `function requestedRange(body: any) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 166 | `  const start = typeof body?.rangeStart === "string" ? new Date(body.rangeStart) : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 167 | `  const end = typeof body?.rangeEnd === "string" ? new Date(body.rangeEnd) : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 168 | `  if (start && end && !Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime()) && end > start)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 169 | `    return { start, end };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 170 | `  const startDefault = new Date();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 171 | `  startDefault.setMonth(startDefault.getMonth() - 3);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 172 | `  const endDefault = new Date();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 173 | `  endDefault.setFullYear(endDefault.getFullYear() + 1);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `  return { start: startDefault, end: endDefault };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 175 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 176 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 177 | `async function listGoogleEvents(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `  token: string,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 179 | `  calendarId: string,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 180 | `  range: { start: Date; end: Date },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 181 | `) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 182 | `  const events: any[] = [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 183 | `  let pageToken = "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 184 | `  do {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 185 | `    const query = new URLSearchParams({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 186 | `      singleEvents: "false",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 187 | `      showDeleted: "false",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 188 | `      maxResults: "2500",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 189 | `      timeMin: range.start.toISOString(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 190 | `      timeMax: range.end.toISOString(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 191 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 192 | `    if (pageToken) query.set("pageToken", pageToken);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 193 | `    const page = await googleRequest(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 194 | `      token,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 195 | `      \`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${query}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 196 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 197 | `    events.push(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `      ...(page.items ?? [])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 199 | `        .filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 200 | `          (event: any) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 201 | `            (event.start?.date || event.start?.dateTime) &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 202 | `            (event.end?.date || event.end?.dateTime),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 203 | `        )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 204 | `        .map((event: any) => ({ ...event, taskflowCalendarId: calendarId })),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 205 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 206 | `    pageToken = page.nextPageToken ?? "";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 207 | `  } while (pageToken);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 208 | `  return events;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 209 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 210 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 211 | `async function listAccessibleCalendars(token: string) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 212 | `  const calendars: any[] = [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 213 | `  let pageToken = "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 214 | `  do {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 215 | `    const query = new URLSearchParams({ maxResults: "250" });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 216 | `    if (pageToken) query.set("pageToken", pageToken);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 217 | `    const page = await googleRequest(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 218 | `      token,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 219 | `      \`https://www.googleapis.com/calendar/v3/users/me/calendarList?${query}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 220 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 221 | `    calendars.push(...(page.items ?? []));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 222 | `    pageToken = page.nextPageToken ?? "";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 223 | `  } while (pageToken);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 224 | `  return calendars.filter(` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 225 | `    (calendar) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 226 | `      calendar.id &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 227 | `      !calendar.id.includes("#holiday") &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 228 | `      !calendar.id.includes("#contacts") &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 229 | `      !calendar.id.includes("#birthday"),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 230 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 231 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 232 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 233 | `async function sync(request: Request, body: any = {}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 234 | `  const { user, admin } = await authenticatedTeamUser(request);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 235 | `  const calendarId = Deno.env.get("GOOGLE_SHARED_CALENDAR_ID");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 236 | `  if (!calendarId) throw new Error("GOOGLE_SHARED_CALENDAR_ID não está configurado.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 237 | `  const { data: connection, error: connectionError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 238 | `    .from("calendar_google_connections")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 239 | `    .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 240 | `    .eq("user_id", user.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 241 | `    .maybeSingle();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 242 | `  if (connectionError || !connection)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 243 | `    throw new Error("Conecte sua conta Google antes de sincronizar.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 244 | `  const token = await tokenForConnection(admin, connection);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 245 | `  const range = requestedRange(body);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 246 | `  const calendars = await listAccessibleCalendars(token);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 247 | `  const sharedCalendar = calendars.find((calendar) => calendar.id === calendarId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 248 | `  const canWriteSharedCalendar =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 249 | `    sharedCalendar?.accessRole === "owner" || sharedCalendar?.accessRole === "writer";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 250 | `  // Keep the shared calendar in the local filter list, but do not request it` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 251 | `  // with a collaborator's token when Google has not shared it with that user.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 252 | `  const calendarsForSources = calendars.some((calendar) => calendar.id === calendarId)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 253 | `    ? calendars` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 254 | `    : [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 255 | `        {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 256 | `          id: calendarId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 257 | `          summary: "Agenda compartilhada",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 258 | `          backgroundColor: "#2563eb",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 259 | `        },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 260 | `        ...calendars,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 261 | `      ];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 262 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 263 | `  const { error: sourceError } = await admin.from("calendar_sources").upsert(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 264 | `    calendarsForSources.map((calendar) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 265 | `      google_calendar_id: calendar.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 266 | `      name: calendar.summary || calendar.summaryOverride || calendar.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 267 | `      color: /^#[0-9A-Fa-f]{6}$/.test(calendar.backgroundColor ?? "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 268 | `        ? calendar.backgroundColor` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 269 | `        : "#2563eb",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 270 | `      is_shared: calendar.id === calendarId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 271 | `    })),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 272 | `    { onConflict: "google_calendar_id" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 273 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 274 | `  if (sourceError) throw sourceError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 275 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 276 | `  const eventPages = await Promise.allSettled(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 277 | `    calendars.map(async (calendar) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 278 | `      calendar,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 279 | `      events: await listGoogleEvents(token, calendar.id, range),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 280 | `    })),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 281 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 282 | `  const importedCalendars = eventPages` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 283 | `    .filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 284 | `      (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 285 | `        result,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 286 | `      ): result is PromiseFulfilledResult<{` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 287 | `        calendar: { id: string; backgroundColor?: string | null };` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 288 | `        events: any[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 289 | `      }> => result.status === "fulfilled",` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 290 | `    )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 291 | `    .map((result) => result.value);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 292 | `  const calendarErrors = eventPages` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 293 | `    .filter((result): result is PromiseRejectedResult => result.status === "rejected")` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 294 | `    .map((result) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 295 | `      result.reason instanceof Error ? result.reason.message : "Calendário inacessível.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 296 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 297 | `  const googleEvents = importedCalendars.flatMap(({ calendar, events }) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 298 | `    events.map((event) => ({ ...event, taskflowCalendar: calendar })),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 299 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 300 | `  const remoteIds = new Set(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 301 | `    googleEvents` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 302 | `      .filter((event) => event.taskflowCalendar.id === calendarId)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 303 | `      .map((event) => event.id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 304 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 305 | `  const remotePayloads = googleEvents.map((event) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 306 | `    googleToLocal(event, user.id, event.taskflowCalendar),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 307 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 308 | `  const { error: importError } = remotePayloads.length` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 309 | `    ? await admin` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 310 | `        .from("calendar_events")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 311 | `        .upsert(remotePayloads, { onConflict: "google_calendar_id,google_event_id" })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 312 | `    : { error: null };` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 313 | `  const pulled = importError ? 0 : remotePayloads.length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 314 | `  const importErrors = [...calendarErrors, ...(importError ? [importError.message] : [])];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 315 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 316 | `  const { data: localEvents, error: localError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 317 | `    .from("calendar_events")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 318 | `    .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 319 | `    .in("sync_status", ["pending", "not_configured", "error"])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 320 | `    .or(\`created_by.eq.${user.id},updated_by.eq.${user.id}\`)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 321 | `    .order("starts_at");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 322 | `  if (localError) throw localError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 323 | `  let pushed = 0;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 324 | `  const pushErrors: string[] = [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 325 | `  for (const event of localEvents ?? []) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 326 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 327 | `      const targetCalendarId = event.google_calendar_id ?? calendarId;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 328 | `      if (targetCalendarId === calendarId && !canWriteSharedCalendar) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 329 | `        const message =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 330 | `          "Sua conta Google precisa ter a permissÃ£o 'Fazer alteraÃ§Ãµes em eventos' na agenda compartilhada.";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 331 | `        await admin` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 332 | `          .from("calendar_events")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 333 | `          .update({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 334 | `            sync_status: "error",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 335 | `            sync_error: message,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 336 | `          })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 337 | `          .eq("id", event.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 338 | `        pushErrors.push(message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 339 | `        continue;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 340 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 341 | `      const writeToken = token;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 342 | `      if (event.deleted_at) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 343 | `        if (event.google_event_id) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 344 | `          try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 345 | `            await googleRequest(` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 346 | `              writeToken,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 347 | `              \`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(targetCalendarId)}/events/${encodeURIComponent(event.google_event_id)}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 348 | `              { method: "DELETE" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 349 | `            );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 350 | `          } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 351 | `            if (!wasRemovedFromGoogle(error)) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 352 | `          }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 353 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 354 | `        await admin` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 355 | `          .from("calendar_events")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 356 | `          .update({ sync_status: "synced", sync_error: null })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 357 | `          .eq("id", event.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 358 | `        continue;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 359 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 360 | `      const payload = localPayload(event);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 361 | `      let googleEvent: any;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 362 | `      if (event.google_event_id) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 363 | `        try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 364 | `          googleEvent = await googleRequest(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 365 | `            writeToken,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 366 | `            \`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(targetCalendarId)}/events/${encodeURIComponent(event.google_event_id)}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 367 | `            { method: "PATCH", body: JSON.stringify(payload) },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 368 | `          );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 369 | `        } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 370 | `          if (!wasRemovedFromGoogle(error)) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 371 | `          // The Google entry was removed outside Taskflow. Recreate it and` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 372 | `          // replace the stale remote ID so future edits remain synchronized.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 373 | `          googleEvent = await googleRequest(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 374 | `            writeToken,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 375 | `            \`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(targetCalendarId)}/events\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 376 | `            { method: "POST", body: JSON.stringify(payload) },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 377 | `          );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 378 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 379 | `      } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 380 | `        googleEvent = await googleRequest(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 381 | `          writeToken,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 382 | `          \`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(targetCalendarId)}/events\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 383 | `          { method: "POST", body: JSON.stringify(payload) },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 384 | `        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 385 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 386 | `      await admin` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 387 | `        .from("calendar_events")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 388 | `        .update({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 389 | `          google_event_id: googleEvent.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 390 | `          google_calendar_id: targetCalendarId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 391 | `          google_etag: googleEvent.etag ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 392 | `          google_updated_at: googleEvent.updated ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 393 | `          sync_status: "synced",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 394 | `          sync_error: null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 395 | `        })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 396 | `        .eq("id", event.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 397 | `      pushed += 1;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 398 | `    } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 399 | `      const message = error instanceof Error ? error.message : "Erro ao enviar ao Google.";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 400 | `      await admin` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 401 | `        .from("calendar_events")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 402 | `        .update({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 403 | `          sync_status: "error",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 404 | `          sync_error: message,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 405 | `        })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 406 | `        .eq("id", event.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 407 | `      pushErrors.push(message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 408 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 409 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 410 | `  const { data: activeEvents, error: activeEventsError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 411 | `    .from("calendar_events")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 412 | `    .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 413 | `    .is("deleted_at", null)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 414 | `    .lt("starts_at", range.end.toISOString())` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 415 | `    .gt("ends_at", range.start.toISOString())` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 416 | `    .order("starts_at", { ascending: true });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 417 | `  if (activeEventsError) throw activeEventsError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 418 | `  return json({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 419 | `    ok: true,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 420 | `    pushed,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 421 | `    pulled,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 422 | `    remoteEvents: remoteIds.size,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 423 | `    importErrors: [...new Set(importErrors)].slice(0, 3),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 424 | `    pushErrors: [...new Set(pushErrors)].slice(0, 3),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 425 | `    events: activeEvents ?? [],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 426 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 427 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 428 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 429 | `async function savedSourcesForUser(admin: any, userId: string) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 430 | `  const [sourcesResult, preferencesResult] = await Promise.all([` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 431 | `    admin` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 432 | `      .from("calendar_sources")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 433 | `      .select("google_calendar_id, name, color, is_shared")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 434 | `      .order("is_shared", { ascending: false })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 435 | `      .order("name", { ascending: true }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 436 | `    admin` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 437 | `      .from("calendar_source_preferences")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 438 | `      .select("google_calendar_id, is_visible")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 439 | `      .eq("user_id", userId),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 440 | `  ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 441 | `  if (sourcesResult.error) throw sourcesResult.error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 442 | `  if (preferencesResult.error) throw preferencesResult.error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 443 | `  const visibility = new Map(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 444 | `    (preferencesResult.data ?? []).map((item: any) => [item.google_calendar_id, item.is_visible]),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 445 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 446 | `  return (sourcesResult.data ?? []).map((source: any) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 447 | `    ...source,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 448 | `    is_visible: visibility.get(source.google_calendar_id) ?? true,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 449 | `  }));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 450 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 451 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 452 | `async function listSavedSources(request: Request) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 453 | `  const { user, admin } = await authenticatedTeamUser(request);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 454 | `  const sources = await savedSourcesForUser(admin, user.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 455 | `  return json({ ok: true, sources });` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 456 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 457 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 458 | `async function listSavedEvents(request: Request, body: any = {}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 459 | `  const { user, admin } = await authenticatedTeamUser(request);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 460 | `  const range = requestedRange(body);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 461 | `  const [eventsResult, sources] = await Promise.all([` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 462 | `    admin` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 463 | `      .from("calendar_events")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 464 | `      .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 465 | `      .is("deleted_at", null)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 466 | `      .lt("starts_at", range.end.toISOString())` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 467 | `      .gt("ends_at", range.start.toISOString())` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 468 | `      .order("starts_at", { ascending: true }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 469 | `    savedSourcesForUser(admin, user.id),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 470 | `  ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 471 | `  if (eventsResult.error) throw eventsResult.error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 472 | `  return json({ ok: true, events: eventsResult.data ?? [], sources });` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 473 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 474 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 475 | `async function setCalendarVisibility(request: Request, body: any) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 476 | `  const { user, admin } = await authenticatedTeamUser(request);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 477 | `  if (typeof body?.googleCalendarId !== "string" || typeof body?.isVisible !== "boolean")` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 478 | `    throw new Error("Filtro de agenda inválido.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 479 | `  const { error } = await admin.from("calendar_source_preferences").upsert(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 480 | `    {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 481 | `      user_id: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 482 | `      google_calendar_id: body.googleCalendarId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 483 | `      is_visible: body.isVisible,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 484 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 485 | `    { onConflict: "user_id,google_calendar_id" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 486 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 487 | `  if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 488 | `  return json({ ok: true });` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 489 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 490 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 491 | `Deno.serve(async (request) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 492 | `  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 493 | `  if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 494 | `  try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 495 | `    const body = await request.json().catch(() => ({}));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 496 | `    if (body?.action === "list_events") return await listSavedEvents(request, body);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 497 | `    if (body?.action === "list_sources") return await listSavedSources(request);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 498 | `    if (body?.action === "set_calendar_visibility")` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 499 | `      return await setCalendarVisibility(request, body);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 500 | `    return await sync(request, body);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 501 | `  } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 502 | `    console.error(error);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 503 | `    return json({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 504 | `      ok: false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 505 | `      error: error instanceof Error ? error.message : "Não foi possível sincronizar.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 506 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 507 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 508 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 509 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
