# Insights de Instagram por cliente (Marketing)

Data: 2026-09-14

## Problema

A equipe de Marketing posta pelos clientes, mas não tem como ver o desempenho
desses posts dentro do TaskFlow — precisa abrir o Instagram de cada cliente à
parte. Queremos um painel, só no ambiente Marketing, que mostre métricas de
conta e de post recentes por cliente, atualizado uma vez por dia.

## Precondição — fora do controle deste projeto

Puxar insights de contas de terceiros exige que o app do TaskFlow passe pela
**revisão da Meta** para os escopos `instagram_manage_insights` e
`pages_read_engagement` (política de privacidade pública, verificação de
negócio, vídeo de uso). Isso é um processo no Meta for Developers, conduzido
por alguém com acesso ao Business Manager da agência — não é código. O sistema
inteiro pode ser construído e testado com uma conta de desenvolvedor/teste
antes da aprovação sair; só não sincroniza dado real de cliente até lá.

Pré-requisitos também fora do código:
- Cada conta de cliente precisa ser **Instagram Business ou Creator**, ligada
  a uma Página do Facebook. Conta pessoal não expõe insights pela API.
- Um app registrado no Meta for Developers, com `META_APP_ID` e
  `META_APP_SECRET`.

## Abordagem: piloto

Antes de sair conectando todo mundo: sobe pra 1-2 clientes primeiro, usa por
um tempo, vê o que os dados realmente rendem (se o time olha, se muda alguma
decisão) antes de estender pros demais clientes de Marketing. A arquitetura
abaixo já nasce pronta pra qualquer número de contas — "piloto" é só por
quantos clientes conectar no começo, não uma versão mais simples do sistema.

## Decisões (confirmadas com o usuário)

| Pergunta | Resposta |
|---|---|
| Rede social | Só Instagram por agora |
| Onde aparece | Painel por cliente (não vinculado a tarefa/entrega) |
| Quem conecta a conta | A equipe de Marketing, uma vez por cliente (não o cliente final) |
| Métricas | Por post **e** de conta/perfil |
| Frequência | Sincronização automática, uma vez por dia (não ao vivo) |

## Arquitetura

### Fluxo de conexão (uma vez por cliente)

1. Na tela do cliente (Marketing), botão **"Conectar Instagram"**.
2. Redireciona para o OAuth da Meta (`dialog/oauth`, escopos
   `instagram_basic`, `instagram_manage_insights`, `pages_show_list`,
   `pages_read_engagement`), `state` carregando o `client_id` do TaskFlow
   assinado (mesmo padrão de `google-calendar-oauth`).
3. Callback (`instagram-oauth-callback`, edge function): troca o `code` por um
   token de curta duração, troca esse token por um **token de longa duração**
   (~60 dias), busca as Páginas do Facebook que a pessoa administra, identifica
   a conta Instagram Business ligada a cada uma, deixa a pessoa escolher qual
   página/conta é a deste cliente (se houver mais de uma), grava em
   `client_social_accounts` com `service_role` — nunca passa o token pelo
   navegador do usuário nem pela tabela que o frontend lê.
4. Token perto de expirar: o job de sincronização diário já renova (a API da
   Meta permite estender um token de longa duração ainda válido); se um token
   expirar antes de renovar, o cliente aparece como "reconectar" no painel.

### Sincronização diária

Edge function `instagram-insights-sync`, agendada via `pg_cron` (mesmo
mecanismo já usado nas obrigações — `cron.schedule` chamando a function via
`net.http_post`), uma vez por noite:

1. Para cada linha ativa em `client_social_accounts`:
   - `GET /{ig-business-id}?fields=followers_count,media_count` e
     `GET /{ig-business-id}/insights?metric=reach,impressions&period=day` →
     grava um snapshot do dia em `client_social_account_stats`.
   - `GET /{ig-business-id}/media` (últimos ~25 posts) + `GET
     /{media-id}/insights?metric=reach,likes,comments,saved,shares` para cada
     um → `upsert` em `client_social_posts` por `platform_post_id`.
2. Erros por cliente (token revogado, conta desconectada no Instagram) não
   derrubam os outros — grava `last_sync_error` na conta e segue.
3. Idempotente: rodar de novo no mesmo dia sobrescreve o snapshot do dia e
   atualiza os posts, não duplica.

### Painel — nova rota `/clients/$clientId/insights`

Linkado a partir da linha do cliente em `clients.tsx` (ação nova, ao lado de
"Ver relatório" / "Editar"), só quando o ambiente ativo é Marketing. Nenhuma
permissão nova: quem já vê a linha do cliente (permissão `clients`) vê a ação
"Insights".

- Sem conta conectada: estado vazio + botão "Conectar Instagram".
- Conectado: cards de conta no topo (seguidores, variação desde ontem, alcance
  e impressões dos últimos 7/30 dias — soma dos snapshots) e, abaixo, lista dos
  posts recentes ordenados por data, cada um com miniatura, legenda truncada e
  as métricas do último sync. "Atualizado há Xh" com o horário do último sync
  bem-sucedido.

### Escopo por ambiente

`client_social_accounts.client_id` referencia `clients.id`, que já é
workspace-scoped. RLS das três tabelas novas usa o mesmo
`can_access_workspace_client(client_id)` que já protege `client_notes`,
`client_files` etc. — nenhuma trava nova, reaproveita a existente. Como só
clientes do ambiente Marketing terão conta conectada (decisão do usuário), o
painel simplesmente não aparece pra quem está em Consultoria — mas a RLS não
depende disso, é a mesma trava de sempre.

## Dados novos

```
client_social_accounts
  id                uuid pk
  client_id         uuid -> clients(id) on delete cascade
  platform          text default 'instagram'
  ig_business_id    text not null
  page_id           text not null
  page_name         text
  access_token      text not null        -- só service_role lê/escreve
  token_expires_at  timestamptz
  connected_by      uuid -> auth.users(id)
  connected_at      timestamptz default now()
  last_sync_at      timestamptz
  last_sync_error   text
  unique (client_id, platform)

client_social_account_stats
  id              uuid pk
  account_id      uuid -> client_social_accounts(id) on delete cascade
  snapshot_date   date not null
  followers_count int
  reach           int
  impressions     int
  unique (account_id, snapshot_date)

client_social_posts
  id                uuid pk
  account_id        uuid -> client_social_accounts(id) on delete cascade
  platform_post_id  text not null
  permalink         text
  caption           text
  media_type        text
  thumbnail_url     text
  posted_at         timestamptz
  reach             int
  likes             int
  comments          int
  saved             int
  shares            int
  synced_at         timestamptz default now()
  unique (account_id, platform_post_id)
```

RLS (as três): `FOR SELECT` via
`can_access_workspace_client(client_id)` (a de `client_social_accounts`
direta pela coluna; as outras duas via `EXISTS` até `client_social_accounts`).
`access_token` de `client_social_accounts`: coluna nunca exposta ao papel
`authenticated` — a policy de SELECT cobre a linha inteira, então o frontend
não deve fazer `select("*")` nela; o hook usa uma lista explícita de colunas
sem `access_token`. Escrita (INSERT/UPDATE/DELETE) só por `service_role`
(edge functions) — nenhuma policy de escrita para `authenticated`, exceto
"desconectar" (DELETE da própria linha, permitido a quem já a vê).

## Edge functions novas

- `instagram-oauth-callback` — troca code → token, resolve página/conta,
  grava a conexão. Espelha `google-calendar-oauth`.
- `instagram-insights-sync` — roda pelo cron, sincroniza todas as contas
  ativas. Espelha `google-calendar-sync`.

Segredos: `META_APP_ID`, `META_APP_SECRET` como variáveis de ambiente das
functions (mesmo padrão de `GOOGLE_OAUTH_CLIENT_ID/SECRET`).

## Testes

- `src/lib/instagram-insights.ts` (lógica pura, vitest): cálculo de variação
  de seguidores entre snapshots, ordenação de posts por data, formatação de
  "atualizado há Xh".
- Sync e OAuth: verificação manual com a conta de teste da Meta, como os
  fluxos do Google Calendar hoje.

## Fora do escopo

- Outras redes (TikTok, LinkedIn, Facebook) — só Instagram por agora.
- Vincular um post específico a uma tarefa/entrega.
- Métricas em tempo real (o painel sempre mostra o snapshot da última
  sincronização, não ao vivo).
- Alertas/notificação por queda de métrica.
- O cliente final (portal) ver esse painel — é uso interno da equipe de
  Marketing.
