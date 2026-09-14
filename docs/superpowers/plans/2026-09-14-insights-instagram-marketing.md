# Insights de Instagram por cliente (Marketing) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Um painel por cliente, só no ambiente Marketing, que mostra métricas
de conta e de post do Instagram, sincronizadas uma vez por dia.

**Architecture:** Três tabelas novas (conexão, snapshot diário de conta,
posts+métricas) protegidas pela mesma RLS de escopo por cliente já usada em
`client_notes`/`client_files`. Duas edge functions em Deno espelhando o padrão
já existente do Google Calendar (`google-calendar-oauth` /
`google-calendar-sync`): uma faz o fluxo OAuth da Meta, a outra roda via
`pg_cron` + `pg_net` uma vez por noite e sincroniza todas as contas
conectadas. O token de acesso nunca é lido pelo papel `authenticated` — só
`service_role` grava/lê.

**Tech Stack:** Supabase (Postgres + RLS + Edge Functions em Deno + pg_cron/pg_net),
React + TanStack Router + React Query, Vitest.

**Spec:** `docs/superpowers/specs/2026-09-14-insights-instagram-marketing-design.md`

## Global Constraints

- Só ambiente Marketing usa isto — a trava é a mesma RLS de sempre
  (`can_access_workspace_client(client_id)`), nenhum código condicional por
  ambiente.
- `access_token` de `client_social_accounts` nunca é selecionado pelo
  frontend — todo hook usa lista explícita de colunas, nunca `select("*")`
  nessa tabela.
- Escrita nas 3 tabelas novas é só `service_role` (edge functions), exceto
  "desconectar" (o usuário pode apagar a própria conexão).
- Nenhuma permissão nova — reaproveita a permissão `clients` já existente.
- Migrations vão para produção quando aplicadas (mesmo fluxo já usado nesta
  sessão: `npx supabase migration up --linked`, exige a CLI logada na conta
  certa).
- `META_APP_ID` e `META_APP_SECRET` são segredos das edge functions
  (`Deno.env.get`), nunca hardcoded nem commitados.

---

## Task 1: Tabela de conexão + estado OAuth

**Files:**
- Create: `supabase/migrations/20260914100000_client_social_accounts.sql`

**Interfaces:**
- Produces: tabela `public.client_social_accounts` (colunas: `id, client_id,
  platform, ig_business_id, page_id, page_name, access_token,
  token_expires_at, connected_by, connected_at, last_sync_at,
  last_sync_error`); tabela `public.instagram_oauth_states` (`state, client_id,
  user_id, expires_at, used_at, created_at`); função
  `public.can_access_workspace_client(uuid)` (já existe, só reaproveitada).

- [ ] **Step 1: Escrever a migration**

```sql
-- supabase/migrations/20260914100000_client_social_accounts.sql
-- Conexão de conta de rede social por cliente (hoje só Instagram). O token
-- nunca é exposto ao papel authenticated: a policy de SELECT libera a linha
-- inteira para quem já enxerga o cliente, mas nenhum hook do frontend
-- seleciona a coluna access_token — só as edge functions (service_role) leem.

CREATE TABLE IF NOT EXISTS public.client_social_accounts (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id         uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  platform          text NOT NULL DEFAULT 'instagram',
  ig_business_id    text NOT NULL,
  page_id           text NOT NULL,
  page_name         text,
  access_token      text NOT NULL,
  token_expires_at  timestamptz,
  connected_by      uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  connected_at      timestamptz NOT NULL DEFAULT now(),
  last_sync_at      timestamptz,
  last_sync_error   text,
  UNIQUE (client_id, platform)
);

CREATE INDEX IF NOT EXISTS client_social_accounts_client_idx
  ON public.client_social_accounts (client_id);

ALTER TABLE public.client_social_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY client_social_accounts_select ON public.client_social_accounts
  FOR SELECT TO authenticated
  USING (public.can_access_workspace_client(client_id));

-- Só desconectar (apagar a própria linha) é permitido pelo navegador; criar
-- e atualizar (gravar token) é exclusivo das edge functions via service_role,
-- que ignora RLS.
CREATE POLICY client_social_accounts_delete ON public.client_social_accounts
  FOR DELETE TO authenticated
  USING (public.can_access_workspace_client(client_id));

-- Estado OAuth de curta duração, mesmo padrão de calendar_google_oauth_states:
-- protege o callback contra CSRF e replay.
CREATE TABLE IF NOT EXISTS public.instagram_oauth_states (
  state       uuid PRIMARY KEY,
  client_id   uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  expires_at  timestamptz NOT NULL,
  used_at     timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS instagram_oauth_states_expiry_idx
  ON public.instagram_oauth_states (expires_at);

ALTER TABLE public.instagram_oauth_states ENABLE ROW LEVEL SECURITY;
-- Nenhuma policy para authenticated: só a edge function (service_role) lê e
-- escreve aqui. É um detalhe de implementação do fluxo OAuth, não um dado que
-- alguém precisa consultar pela tela.

NOTIFY pgrst, 'reload schema';
```

- [ ] **Step 2: Aplicar a migration**

Run: `npx supabase migration up --linked`
Expected: `{"applied":["...20260914100000_client_social_accounts.sql"],"message":"Migrations applied"}`
(Se a CLI ainda estiver logada na conta errada, `npx supabase login` antes —
ver Global Constraints.)

- [ ] **Step 3: Verificar a policy na prática**

Run (com a service key, um `.mjs` descartável em `scripts/__verify-t1.mjs`
igual aos probes já usados nesta sessão): insira uma linha de teste em
`client_social_accounts` para um `client_id` real de Marketing, leia como uma
sessão real de colaborador de Marketing (`generateLink` + `createClient` com
o token), confirme que a linha aparece; leia como colaborador de Consultoria
sem acesso a esse cliente, confirme 0 linhas. Apague a linha de teste e o
script (`rm scripts/__verify-t1.mjs`).
Expected: colaborador de Marketing vê 1 linha; colaborador sem acesso vê 0.

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/20260914100000_client_social_accounts.sql
git commit -m "feat: tabelas de conexão de rede social por cliente

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 2: Tabelas de métricas (conta e posts)

**Files:**
- Create: `supabase/migrations/20260914110000_client_social_stats.sql`

**Interfaces:**
- Consumes: `public.client_social_accounts(id)` (Task 1).
- Produces: tabelas `public.client_social_account_stats`,
  `public.client_social_posts`.

- [ ] **Step 1: Escrever a migration**

```sql
-- supabase/migrations/20260914110000_client_social_stats.sql
-- Métricas puxadas da API: snapshot diário de conta e posts com suas
-- métricas. Escritas só por service_role (o job de sync); leitura segue o
-- cliente dono da conta.

CREATE TABLE IF NOT EXISTS public.client_social_account_stats (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id      uuid NOT NULL REFERENCES public.client_social_accounts(id) ON DELETE CASCADE,
  snapshot_date   date NOT NULL,
  followers_count integer,
  reach           integer,
  impressions     integer,
  created_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (account_id, snapshot_date)
);

CREATE INDEX IF NOT EXISTS client_social_account_stats_account_idx
  ON public.client_social_account_stats (account_id, snapshot_date DESC);

ALTER TABLE public.client_social_account_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY client_social_account_stats_select ON public.client_social_account_stats
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.client_social_accounts a
      WHERE a.id = account_id AND public.can_access_workspace_client(a.client_id)
    )
  );

CREATE TABLE IF NOT EXISTS public.client_social_posts (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id        uuid NOT NULL REFERENCES public.client_social_accounts(id) ON DELETE CASCADE,
  platform_post_id  text NOT NULL,
  permalink         text,
  caption           text,
  media_type        text,
  thumbnail_url     text,
  posted_at         timestamptz,
  reach             integer,
  likes             integer,
  comments           integer,
  saved             integer,
  shares            integer,
  synced_at         timestamptz NOT NULL DEFAULT now(),
  UNIQUE (account_id, platform_post_id)
);

CREATE INDEX IF NOT EXISTS client_social_posts_account_idx
  ON public.client_social_posts (account_id, posted_at DESC);

ALTER TABLE public.client_social_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY client_social_posts_select ON public.client_social_posts
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.client_social_accounts a
      WHERE a.id = account_id AND public.can_access_workspace_client(a.client_id)
    )
  );

NOTIFY pgrst, 'reload schema';
```

- [ ] **Step 2: Aplicar a migration**

Run: `npx supabase migration up --linked`
Expected: `{"applied":["...20260914110000_client_social_stats.sql"],...}`

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/20260914110000_client_social_stats.sql
git commit -m "feat: tabelas de métricas de conta e post do Instagram

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 3: Lógica pura (cálculo de variação, ordenação, formatação)

TDD real — escreve o teste, vê falhar, implementa, vê passar. Nenhuma
dependência de Supabase/React aqui, é só a lógica que a tela usa.

**Files:**
- Create: `src/lib/instagram-insights.ts`
- Create: `src/lib/instagram-insights.test.ts`

**Interfaces:**
- Produces: `followerDelta(stats: AccountStat[]): number | null`,
  `sortPostsByDate<T extends { posted_at: string | null }>(posts: T[]): T[]`,
  `formatLastSync(lastSyncAt: string | null, now?: Date): string`.

- [ ] **Step 1: Escrever os testes (falhando)**

```typescript
// src/lib/instagram-insights.test.ts
import { describe, expect, it } from "vitest";
import { followerDelta, formatLastSync, sortPostsByDate } from "./instagram-insights";

describe("followerDelta", () => {
  it("é a diferença entre o snapshot mais recente e o anterior", () => {
    const stats = [
      { snapshot_date: "2026-09-12", followers_count: 100 },
      { snapshot_date: "2026-09-13", followers_count: 108 },
      { snapshot_date: "2026-09-14", followers_count: 112 },
    ];
    expect(followerDelta(stats)).toBe(4);
  });

  it("com um snapshot só, não dá pra calcular variação", () => {
    expect(followerDelta([{ snapshot_date: "2026-09-14", followers_count: 100 }])).toBeNull();
  });

  it("sem snapshot nenhum, null", () => {
    expect(followerDelta([])).toBeNull();
  });

  it("ignora a ordem de entrada — sempre pelos dois mais recentes por data", () => {
    const stats = [
      { snapshot_date: "2026-09-14", followers_count: 112 },
      { snapshot_date: "2026-09-12", followers_count: 100 },
      { snapshot_date: "2026-09-13", followers_count: 108 },
    ];
    expect(followerDelta(stats)).toBe(4);
  });
});

describe("sortPostsByDate", () => {
  it("mais recente primeiro", () => {
    const posts = [
      { id: "a", posted_at: "2026-09-10T10:00:00Z" },
      { id: "b", posted_at: "2026-09-14T10:00:00Z" },
      { id: "c", posted_at: "2026-09-12T10:00:00Z" },
    ];
    expect(sortPostsByDate(posts).map((p) => p.id)).toEqual(["b", "c", "a"]);
  });

  it("post sem data vai pro fim", () => {
    const posts = [
      { id: "a", posted_at: null },
      { id: "b", posted_at: "2026-09-14T10:00:00Z" },
    ];
    expect(sortPostsByDate(posts).map((p) => p.id)).toEqual(["b", "a"]);
  });
});

describe("formatLastSync", () => {
  const now = new Date("2026-09-14T12:00:00Z");

  it("nunca sincronizado", () => {
    expect(formatLastSync(null, now)).toBe("Ainda não sincronizado");
  });

  it("há poucas horas", () => {
    expect(formatLastSync("2026-09-14T09:00:00Z", now)).toBe("Atualizado há 3h");
  });

  it("menos de 1h, arredonda pra baixo mas nunca mostra 0h", () => {
    expect(formatLastSync("2026-09-14T11:40:00Z", now)).toBe("Atualizado há menos de 1h");
  });

  it("mais de 24h", () => {
    expect(formatLastSync("2026-09-12T12:00:00Z", now)).toBe("Atualizado há 2 dias");
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx vitest run src/lib/instagram-insights.test.ts`
Expected: FAIL — `Cannot find module './instagram-insights'`

- [ ] **Step 3: Implementar**

```typescript
// src/lib/instagram-insights.ts
/**
 * Lógica pura do painel de Insights de Instagram — sem Supabase, sem React,
 * só as contas que a tela precisa fazer. Fica fácil de testar isolado.
 */

export interface AccountStatLike {
  snapshot_date: string;
  followers_count: number | null;
}

export interface PostLike {
  posted_at: string | null;
}

/** Variação de seguidores entre o snapshot mais recente e o anterior. */
export function followerDelta(stats: AccountStatLike[]): number | null {
  if (stats.length < 2) return null;
  const sorted = [...stats].sort((a, b) => a.snapshot_date.localeCompare(b.snapshot_date));
  const latest = sorted[sorted.length - 1];
  const previous = sorted[sorted.length - 2];
  if (latest.followers_count == null || previous.followers_count == null) return null;
  return latest.followers_count - previous.followers_count;
}

/** Posts mais recentes primeiro; sem data conhecida vai pro fim. */
export function sortPostsByDate<T extends PostLike>(posts: T[]): T[] {
  return [...posts].sort((a, b) => {
    if (!a.posted_at && !b.posted_at) return 0;
    if (!a.posted_at) return 1;
    if (!b.posted_at) return -1;
    return b.posted_at.localeCompare(a.posted_at);
  });
}

/** "Atualizado há Xh" / "há N dias" — mostrado no topo do painel. */
export function formatLastSync(lastSyncAt: string | null, now: Date = new Date()): string {
  if (!lastSyncAt) return "Ainda não sincronizado";
  const diffMs = now.getTime() - new Date(lastSyncAt).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "Atualizado há menos de 1h";
  if (hours < 24) return `Atualizado há ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Atualizado há ${days} ${days === 1 ? "dia" : "dias"}`;
}
```

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `npx vitest run src/lib/instagram-insights.test.ts`
Expected: PASS — todos os testes verdes.

- [ ] **Step 5: Commit**

```bash
git add src/lib/instagram-insights.ts src/lib/instagram-insights.test.ts
git commit -m "feat: lógica pura do painel de insights de Instagram

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 4: Edge function `instagram-oauth-callback`

**Files:**
- Create: `supabase/functions/instagram-oauth-callback/index.ts`

**Interfaces:**
- Consumes: `client_social_accounts`, `instagram_oauth_states` (Task 1).
- Produces: `POST { action: "begin", client_id }` → `{ authorizeUrl }`;
  `POST { action: "disconnect", client_id }` → `{ ok: true }`;
  `GET` (callback da Meta) → redirect 302 para
  `${TASKFLOW_APP_URL}/clients/{client_id}/insights?instagram=connected|error|cancelled`.

- [ ] **Step 1: Escrever a function**

```typescript
// supabase/functions/instagram-oauth-callback/index.ts
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
```

- [ ] **Step 2: Deploy (exige CLI logada na conta certa)**

Run: `npx supabase functions deploy instagram-oauth-callback`
Expected: deploy sem erro.

- [ ] **Step 3: Configurar os segredos (uma vez, manual — não commita)**

Run:
```bash
npx supabase secrets set META_APP_ID=<app id do painel da Meta>
npx supabase secrets set META_APP_SECRET=<app secret do painel da Meta>
```
(`TASKFLOW_APP_URL` já existe — reaproveitada do Google Calendar.)

- [ ] **Step 4: Commit**

```bash
git add supabase/functions/instagram-oauth-callback/index.ts
git commit -m "feat: edge function de conexão OAuth com o Instagram

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 5: Edge function `instagram-insights-sync`

**Files:**
- Create: `supabase/functions/instagram-insights-sync/index.ts`

**Interfaces:**
- Consumes: `client_social_accounts`, escreve em
  `client_social_account_stats` e `client_social_posts` (Tasks 1-2).
- Produces: `POST` (chamada pelo cron com o header
  `Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>`) →
  `{ synced: number, errors: Array<{ client_id: string; message: string }> }`.

- [ ] **Step 1: Escrever a function**

```typescript
// supabase/functions/instagram-insights-sync/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

interface Account {
  id: string;
  client_id: string;
  ig_business_id: string;
  access_token: string;
}

// A Graph API rejeita métricas que não fazem sentido pro tipo de mídia (ex.:
// "plays" só existe em vídeo/reels). Em vez de mapear cada combinação, pede o
// conjunto cheio e, se a Meta recusar, tenta de novo com um conjunto menor —
// isso é tratamento de erro esperado da API, não um TODO.
const POST_METRIC_SETS = ["reach,likes,comments,saved,shares", "reach,likes,comments,saved", "reach"];

async function fetchPostInsights(mediaId: string, token: string) {
  for (const metrics of POST_METRIC_SETS) {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${mediaId}/insights?metric=${metrics}&access_token=${token}`,
    );
    const body = await response.json();
    if (response.ok) {
      const values: Record<string, number> = {};
      for (const entry of body.data ?? []) {
        values[entry.name] = entry.values?.[0]?.value ?? 0;
      }
      return values;
    }
  }
  return {};
}

async function syncAccount(admin: ReturnType<typeof createClient>, account: Account) {
  const token = account.access_token;

  // Conta: seguidores + alcance/impressões do dia
  const accountResponse = await fetch(
    `https://graph.facebook.com/v21.0/${account.ig_business_id}?fields=followers_count&access_token=${token}`,
  );
  const accountData = await accountResponse.json();
  if (!accountResponse.ok) throw new Error(accountData?.error?.message ?? "Falha ao ler a conta.");

  const insightsResponse = await fetch(
    `https://graph.facebook.com/v21.0/${account.ig_business_id}/insights?metric=reach,impressions&period=day&access_token=${token}`,
  );
  const insightsData = await insightsResponse.json();
  const accountInsights: Record<string, number> = {};
  if (insightsResponse.ok) {
    for (const entry of insightsData.data ?? []) {
      accountInsights[entry.name] = entry.values?.[0]?.value ?? 0;
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  await admin.from("client_social_account_stats").upsert(
    {
      account_id: account.id,
      snapshot_date: today,
      followers_count: accountData.followers_count ?? null,
      reach: accountInsights.reach ?? null,
      impressions: accountInsights.impressions ?? null,
    },
    { onConflict: "account_id,snapshot_date" },
  );

  // Posts recentes + métricas de cada um
  const mediaResponse = await fetch(
    `https://graph.facebook.com/v21.0/${account.ig_business_id}/media?fields=id,caption,media_type,thumbnail_url,media_url,permalink,timestamp&limit=25&access_token=${token}`,
  );
  const mediaData = await mediaResponse.json();
  if (!mediaResponse.ok) throw new Error(mediaData?.error?.message ?? "Falha ao listar os posts.");

  for (const media of mediaData.data ?? []) {
    const metrics = await fetchPostInsights(media.id, token);
    await admin.from("client_social_posts").upsert(
      {
        account_id: account.id,
        platform_post_id: media.id,
        permalink: media.permalink ?? null,
        caption: media.caption ?? null,
        media_type: media.media_type ?? null,
        thumbnail_url: media.thumbnail_url ?? media.media_url ?? null,
        posted_at: media.timestamp ?? null,
        reach: metrics.reach ?? null,
        likes: metrics.likes ?? null,
        comments: metrics.comments ?? null,
        saved: metrics.saved ?? null,
        shares: metrics.shares ?? null,
        synced_at: new Date().toISOString(),
      },
      { onConflict: "account_id,platform_post_id" },
    );
  }

  await admin
    .from("client_social_accounts")
    .update({ last_sync_at: new Date().toISOString(), last_sync_error: null })
    .eq("id", account.id);
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);

  // Chamada só pelo cron (com a service key) ou por um admin testando na mão
  // — nunca pelo navegador de um usuário comum.
  const authorization = request.headers.get("Authorization") ?? "";
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  if (authorization !== `Bearer ${serviceKey}`) return json({ error: "Não autorizado." }, 401);

  const projectUrl = Deno.env.get("SUPABASE_URL")!;
  const admin = createClient(projectUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: accounts, error } = await admin
    .from("client_social_accounts")
    .select("id, client_id, ig_business_id, access_token")
    .eq("platform", "instagram");
  if (error) return json({ error: error.message }, 500);

  const errors: Array<{ client_id: string; message: string }> = [];
  let synced = 0;
  for (const account of (accounts ?? []) as Account[]) {
    try {
      await syncAccount(admin, account);
      synced += 1;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido.";
      errors.push({ client_id: account.client_id, message });
      await admin
        .from("client_social_accounts")
        .update({ last_sync_error: message })
        .eq("id", account.id);
    }
  }

  return json({ synced, errors });
});
```

- [ ] **Step 2: Deploy**

Run: `npx supabase functions deploy instagram-insights-sync`
Expected: deploy sem erro.

- [ ] **Step 3: Testar na mão com a conta de teste da Meta**

Run (substitua `<service-role-key>` e a URL do projeto):
```bash
curl -X POST "https://xlcurhbxexyunpkcswwo.supabase.co/functions/v1/instagram-insights-sync" \
  -H "Authorization: Bearer <service-role-key>"
```
Expected: `{"synced":0,"errors":[]}` antes de qualquer conta conectada;
`{"synced":1,"errors":[]}` depois de conectar uma (Task 4 concluída na prática).

- [ ] **Step 4: Commit**

```bash
git add supabase/functions/instagram-insights-sync/index.ts
git commit -m "feat: edge function de sincronização diária de insights

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 6: Agendamento diário (pg_cron)

**Files:**
- Create: `supabase/migrations/20260914120000_schedule_instagram_sync.sql`

**Interfaces:**
- Consumes: edge function `instagram-insights-sync` (Task 5), via HTTP.
- Produces: job `taskflow-instagram-insights-sync` no `pg_cron`, best-effort
  (não quebra a migration se `pg_cron`/`pg_net` não estiverem disponíveis no
  projeto).

- [ ] **Step 1: Escrever a migration**

```sql
-- supabase/migrations/20260914120000_schedule_instagram_sync.sql
-- Chama a edge function de sync todo dia às 3h (horário de Brasília = 6h UTC)
-- via pg_net. Segue o mesmo "melhor esforço" da 20260901160000 (obrigações):
-- se pg_cron/pg_net não estiverem habilitados no projeto, não derruba a
-- migration.
--
-- current_setting('app.settings.supabase_url'/'app.settings.service_role_key')
-- precisam ser configurados uma vez, manualmente, fora desta migration (é
-- segredo, não pode ir pro git) — ver o passo manual abaixo.

DO $$
DECLARE existing_job bigint;
BEGIN
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'cron')
     AND EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'net') THEN
    SELECT jobid INTO existing_job FROM cron.job WHERE jobname = 'taskflow-instagram-insights-sync';
    IF existing_job IS NOT NULL THEN PERFORM cron.unschedule(existing_job); END IF;
    PERFORM cron.schedule(
      'taskflow-instagram-insights-sync',
      '0 6 * * *',
      $cron$
      SELECT net.http_post(
        url := current_setting('app.settings.supabase_url') || '/functions/v1/instagram-insights-sync',
        headers := jsonb_build_object(
          'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key'),
          'Content-Type', 'application/json'
        ),
        body := '{}'::jsonb
      );
      $cron$
    );
  END IF;
EXCEPTION WHEN insufficient_privilege OR undefined_table OR undefined_function OR undefined_object THEN
  RAISE NOTICE 'pg_cron/pg_net não disponível ou app.settings não configurado; agende manualmente.';
END;
$$;
```

- [ ] **Step 2: Configurar os GUCs (uma vez, manual — segredo real, não vai pro git)**

Run (via `npx supabase db query --linked -f <arquivo temporário>`, apagado
depois de rodar, com a service role key real no lugar):
```sql
ALTER DATABASE postgres SET app.settings.supabase_url = 'https://xlcurhbxexyunpkcswwo.supabase.co';
ALTER DATABASE postgres SET app.settings.service_role_key = '<service role key real>';
```
Se pg_cron/pg_net não estiverem habilitados no projeto (plano/addon), a
sincronização segue funcionando manualmente — chamando o endpoint direto,
como no Step 3 da Task 5 — só não roda sozinha à noite.

- [ ] **Step 3: Aplicar a migration**

Run: `npx supabase migration up --linked`
Expected: aplica sem erro (mesmo que o `DO` block caia no `EXCEPTION` e só
avise no log — a migration em si não falha).

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/20260914120000_schedule_instagram_sync.sql
git commit -m "feat: agenda a sincronização diária de insights via pg_cron

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 7: Hooks de dados no frontend

**Files:**
- Create: `src/hooks/use-instagram-insights.ts`

**Interfaces:**
- Consumes: `src/integrations/supabase/client`, `src/hooks/use-auth`.
- Produces: `useClientSocialAccount(clientId: string)` (React Query, sem
  `access_token`), `useClientAccountStats(clientId: string, accountId?:
  string)`, `useClientSocialPosts(accountId?: string)`,
  `useConnectInstagram()` (retorna `(clientId: string) => Promise<void>`,
  já redireciona via `window.location.assign`),
  `useDisconnectInstagram()` (retorna `(clientId: string) => Promise<void>`).

- [ ] **Step 1: Implementar**

```typescript
// src/hooks/use-instagram-insights.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ClientSocialAccount {
  id: string;
  client_id: string;
  platform: string;
  page_name: string | null;
  connected_at: string;
  last_sync_at: string | null;
  last_sync_error: string | null;
}
export interface ClientAccountStat {
  snapshot_date: string;
  followers_count: number | null;
  reach: number | null;
  impressions: number | null;
}
export interface ClientSocialPost {
  id: string;
  permalink: string | null;
  caption: string | null;
  media_type: string | null;
  thumbnail_url: string | null;
  posted_at: string | null;
  reach: number | null;
  likes: number | null;
  comments: number | null;
  saved: number | null;
  shares: number | null;
}

// Nunca inclui access_token aqui — a coluna existe na tabela, mas nenhum
// hook do frontend a seleciona.
const ACCOUNT_COLUMNS =
  "id, client_id, platform, page_name, connected_at, last_sync_at, last_sync_error";

export function useClientSocialAccount(clientId: string) {
  return useQuery({
    queryKey: ["client_social_account", clientId],
    enabled: !!clientId,
    queryFn: async () => {
      const { data, error } = await (supabase.from("client_social_accounts") as any)
        .select(ACCOUNT_COLUMNS)
        .eq("client_id", clientId)
        .eq("platform", "instagram")
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as ClientSocialAccount | null;
    },
  });
}

export function useClientAccountStats(accountId: string | undefined) {
  return useQuery({
    queryKey: ["client_social_account_stats", accountId],
    enabled: !!accountId,
    queryFn: async () => {
      const { data, error } = await (supabase.from("client_social_account_stats") as any)
        .select("snapshot_date, followers_count, reach, impressions")
        .eq("account_id", accountId)
        .order("snapshot_date", { ascending: false })
        .limit(30);
      if (error) throw error;
      return (data ?? []) as ClientAccountStat[];
    },
  });
}

export function useClientSocialPosts(accountId: string | undefined) {
  return useQuery({
    queryKey: ["client_social_posts", accountId],
    enabled: !!accountId,
    queryFn: async () => {
      const { data, error } = await (supabase.from("client_social_posts") as any)
        .select(
          "id, permalink, caption, media_type, thumbnail_url, posted_at, reach, likes, comments, saved, shares",
        )
        .eq("account_id", accountId)
        .order("posted_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ClientSocialPost[];
    },
  });
}

export function useConnectInstagram() {
  return async (clientId: string) => {
    const { data, error } = await supabase.functions.invoke("instagram-oauth-callback", {
      body: { action: "begin", client_id: clientId },
    });
    if (error || !data?.authorizeUrl) {
      throw new Error(error?.message ?? "Não foi possível iniciar a conexão com o Instagram.");
    }
    window.location.assign(data.authorizeUrl);
  };
}

export function useDisconnectInstagram() {
  const qc = useQueryClient();
  return async (clientId: string) => {
    const { error } = await supabase.functions.invoke("instagram-oauth-callback", {
      body: { action: "disconnect", client_id: clientId },
    });
    if (error) throw new Error(error.message);
    await qc.invalidateQueries({ queryKey: ["client_social_account", clientId] });
  };
}
```

- [ ] **Step 2: Checar tipos**

Run: `npx tsc --noEmit 2>&1 | grep use-instagram-insights`
Expected: nenhuma linha (sem erro no arquivo novo).

- [ ] **Step 3: Commit**

```bash
git add src/hooks/use-instagram-insights.ts
git commit -m "feat: hooks de dados do painel de insights de Instagram

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 8: Tela do painel

**Files:**
- Create: `src/routes/_app/clients.$clientId.insights.tsx`

**Interfaces:**
- Consumes: `useClientSocialAccount`, `useClientAccountStats`,
  `useClientSocialPosts`, `useConnectInstagram`, `useDisconnectInstagram`
  (Task 7); `followerDelta`, `sortPostsByDate`, `formatLastSync` (Task 3);
  `useClients` (`@/hooks/use-data`).

- [ ] **Step 1: Implementar a rota**

```tsx
// src/routes/_app/clients.$clientId.insights.tsx
import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Instagram, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useClients } from "@/hooks/use-data";
import {
  useClientAccountStats,
  useClientSocialAccount,
  useClientSocialPosts,
  useConnectInstagram,
  useDisconnectInstagram,
} from "@/hooks/use-instagram-insights";
import { followerDelta, formatLastSync, sortPostsByDate } from "@/lib/instagram-insights";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/clients/$clientId/insights")({
  validateSearch: (search: Record<string, unknown>): { instagram?: string } => ({
    instagram: typeof search.instagram === "string" ? search.instagram : undefined,
  }),
  component: ClientInsightsPage,
});

const CONNECT_FEEDBACK: Record<string, { tone: "success" | "error"; message: string }> = {
  connected: { tone: "success", message: "Instagram conectado com sucesso." },
  error: { tone: "error", message: "Não foi possível conectar o Instagram. Tente novamente." },
  cancelled: { tone: "error", message: "Conexão cancelada." },
  "no-instagram-account": {
    tone: "error",
    message: "Essa Página do Facebook não tem uma conta Instagram Business vinculada.",
  },
};

function ClientInsightsPage() {
  const { clientId } = Route.useParams();
  const { instagram: feedbackKey } = Route.useSearch();
  const { data: clients = [] } = useClients();
  const client = clients.find((item) => item.id === clientId);
  const { data: account, isLoading: loadingAccount } = useClientSocialAccount(clientId);
  const { data: stats = [] } = useClientAccountStats(account?.id);
  const { data: posts = [] } = useClientSocialPosts(account?.id);
  const connectInstagram = useConnectInstagram();
  const disconnectInstagram = useDisconnectInstagram();
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (!feedbackKey) return;
    const feedback = CONNECT_FEEDBACK[feedbackKey];
    if (!feedback) return;
    if (feedback.tone === "success") toast.success(feedback.message);
    else toast.error(feedback.message);
  }, [feedbackKey]);

  const latest = stats[0];
  const delta = followerDelta(stats);
  const orderedPosts = sortPostsByDate(posts);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      await connectInstagram(clientId);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao conectar.");
      setConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectInstagram(clientId);
      toast.success("Instagram desconectado.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao desconectar.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <header className="flex items-center gap-3">
        <Link to="/clients" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <p className="text-sm font-medium text-primary">Insights</p>
          <h1 className="text-2xl font-bold">{client?.name ?? "Cliente"}</h1>
        </div>
      </header>

      {loadingAccount ? (
        <Card className="p-10 text-center text-sm text-muted-foreground">
          <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" /> Carregando…
        </Card>
      ) : !account ? (
        <Card className="space-y-3 p-10 text-center">
          <Instagram className="mx-auto h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            Nenhuma conta do Instagram conectada pra este cliente ainda.
          </p>
          <Button onClick={handleConnect} disabled={connecting}>
            {connecting ? "Redirecionando…" : "Conectar Instagram"}
          </Button>
        </Card>
      ) : (
        <>
          <Card className="flex flex-wrap items-center justify-between gap-4 p-4">
            <div>
              <p className="font-semibold">{account.page_name ?? "Conta conectada"}</p>
              <p className="text-xs text-muted-foreground">
                {formatLastSync(account.last_sync_at)}
                {account.last_sync_error ? ` — última sincronização falhou: ${account.last_sync_error}` : ""}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleDisconnect}>
              Desconectar
            </Button>
          </Card>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Seguidores</p>
              <p className="text-2xl font-bold">{latest?.followers_count ?? "—"}</p>
              {delta != null && (
                <p className={`text-xs ${delta >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {delta >= 0 ? "+" : ""}
                  {delta} desde ontem
                </p>
              )}
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Alcance (hoje)</p>
              <p className="text-2xl font-bold">{latest?.reach ?? "—"}</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Impressões (hoje)</p>
              <p className="text-2xl font-bold">{latest?.impressions ?? "—"}</p>
            </Card>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold">Posts recentes</h2>
            {orderedPosts.length === 0 ? (
              <Card className="p-6 text-center text-sm text-muted-foreground">
                Nenhum post sincronizado ainda.
              </Card>
            ) : (
              orderedPosts.map((post) => (
                <Card key={post.id} className="flex gap-3 p-3">
                  {post.thumbnail_url && (
                    <img
                      src={post.thumbnail_url}
                      alt=""
                      className="h-16 w-16 shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{post.caption ?? "(sem legenda)"}</p>
                    <p className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span>Alcance: {post.reach ?? "—"}</span>
                      <span>Curtidas: {post.likes ?? "—"}</span>
                      <span>Comentários: {post.comments ?? "—"}</span>
                      <span>Salvos: {post.saved ?? "—"}</span>
                    </p>
                  </div>
                  {post.permalink && (
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 self-center text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </Card>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Regenerar o route tree e checar tipos**

Run: `npm run build 2>&1 | tail -5`
Expected: build sem erro (o `routeTree.gen.ts` é regenerado automaticamente).

- [ ] **Step 3: Commit**

```bash
git add src/routes/_app/clients.\$clientId.insights.tsx src/routeTree.gen.ts
git commit -m "feat: tela do painel de insights de Instagram por cliente

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 9: Link a partir da lista de clientes (só Marketing)

**Files:**
- Modify: `src/routes/_app/clients.tsx` (perto da action "Ver relatório" /
  "Editar" de cada linha, já mapeada no plano de contexto —
  `src/routes/_app/clients.tsx:689-696`)

**Interfaces:**
- Consumes: `activeWorkspace` de `useAuth()` (já usado em `users.tsx` e
  `reports.tsx` nesta sessão), rota `/clients/$clientId/insights` (Task 8).

- [ ] **Step 1: Adicionar o link condicional**

Ler `src/routes/_app/clients.tsx` em torno da linha 689 antes de editar (o
número pode ter mudado desde este plano). Adicionar, ao lado do `<Link
to="/client-report/$clientId">`:

```tsx
{activeWorkspace?.slug === "marketing" && (
  <Link to="/clients/$clientId/insights" params={{ clientId: c.id }}>
    Insights
  </Link>
)}
```

(usar a mesma classe/estilo dos links vizinhos, copiando do `<Link
to="/client-report/$clientId">` existente). Garantir que `activeWorkspace`
está desestruturado de `useAuth()` no topo do componente (senão adicionar).

- [ ] **Step 2: Build**

Run: `npm run build 2>&1 | tail -5`
Expected: build sem erro.

- [ ] **Step 3: Verificação manual**

Abrir o app em Marketing, ir em Clientes, confirmar que a ação "Insights"
aparece em cada linha; trocar pra Consultoria, confirmar que ela some.

- [ ] **Step 4: Commit**

```bash
git add src/routes/_app/clients.tsx
git commit -m "feat: link para o painel de insights na lista de clientes (Marketing)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 10: Checklist de implantação (manual, fora do código)

Nenhum arquivo — passos que só você faz, na ordem, pra testar uma conexão de
verdade hoje.

- [ ] Criar o app em developers.facebook.com (tipo "Business"), anotar **App
      ID** e **App Secret**.
- [ ] No app, adicionar o produto "Facebook Login" e configurar o Redirect
      URI: `https://xlcurhbxexyunpkcswwo.supabase.co/functions/v1/instagram-oauth-callback`.
- [ ] Adicionar como Administrador/Testador do app a conta do Facebook que já
      administra as Páginas dos clientes (modo Desenvolvimento funciona sem
      App Review pra essas contas).
- [ ] `npx supabase login` com a conta certa da organização Task Flow.
- [ ] Rodar as Tasks 1-9 deste plano, na ordem.
- [ ] Configurar `META_APP_ID` / `META_APP_SECRET` (Task 4, Step 3).
- [ ] Abrir a tela de um cliente de Marketing → Insights → Conectar
      Instagram, autorizar, confirmar que a conta aparece conectada.
- [ ] Chamar `instagram-insights-sync` manualmente uma vez (Task 5, Step 3)
      pra ver os primeiros dados sem esperar a meia-noite.

---

## Self-Review

**Cobertura do spec:** conexão (Tasks 1, 4), sync diário (Tasks 2, 5, 6),
painel (Tasks 3, 7, 8), escopo por ambiente (Task 9, RLS em todas as
migrations), segredos nunca commitados (Tasks 4, 6, 10), abordagem de piloto
(Task 10 — conecta um cliente por vez, na mão, antes de generalizar).

**Consistência:** `ACCOUNT_COLUMNS` (Task 7) nunca inclui `access_token`;
`client_social_accounts` (Task 1) é a única tabela com essa coluna, e nenhuma
outra task a seleciona. Nomes de função (`followerDelta`, `sortPostsByDate`,
`formatLastSync`) idênticos entre Task 3 (implementação) e Task 8 (uso).
`onConflict: "client_id,platform"` (Task 4) bate com o `UNIQUE (client_id,
platform)` da Task 1; `onConflict: "account_id,snapshot_date"` e
`"account_id,platform_post_id"` (Task 5) batem com os `UNIQUE` da Task 2.

**Fora do escopo (do spec, mantido):** TikTok/LinkedIn/Facebook, vincular post
a tarefa, tempo real, alertas, portal do cliente — nenhuma task toca nisso.
