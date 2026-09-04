# Arquitetura da copia limpa

Esta versao e uma copia React/Supabase para estudo e evolucao, sem tocar no Lovable.

Stack: React 19 + TanStack Router/Start (roteamento por arquivo) + Vite 7 +
Tailwind 4 + Radix/shadcn (`src/components/ui`) + TanStack Query + Supabase
(Postgres, Auth, Realtime, RLS). IA (Gemini) e Google Calendar entram como
integracoes externas via funcoes de servidor, nunca direto do navegador.

## Camadas

- `src/routes`: telas e rotas do app (arquivo = rota; ver `src/routes/README.md` para a convencao do TanStack Router).
- `src/components`: componentes reutilizaveis (dialogs, popovers, cards de tarefa etc.).
- `src/components/ui`: componentes base de interface (botoes, dialogs, inputs, menus).
- `src/hooks/use-auth.tsx`: sessao, perfil e permissao admin.
- `src/hooks/use-data.ts`: consultas e mutations principais ao Supabase (tarefas, subtarefas, status, tags, clientes).
- `src/hooks/use-workspace-tasks.ts` + `src/lib/workspace-tasks.ts`: leitura/filtragem de tarefas considerando o ambiente atual e participacao entre ambientes.
- `src/hooks/use-obligations.ts`, `use-mural-unread.ts`, `use-request-unread.ts`, `use-board-preferences.ts`: hooks de dominio para obrigacoes recorrentes, mural, solicitacoes e preferencias de quadro.
- `src/integrations/supabase/client.ts` (navegador) e `client.server.ts` (servidor): clientes Supabase.
- `src/lib/*.functions.ts`: funcoes de servidor do TanStack Start (admin de usuarios, formatacao/importacao de ata via IA, relatorio de cliente).
- `supabase/migrations`: schema que deve ser aplicado no banco novo (evolui por migrations incrementais, sem baseline unico — ver contagem crescente ao longo do tempo).
- `vite.pages.config.ts`: build estatico alternativo para GitHub Pages. O deploy principal e Vercel (`vercel.json`).

## Modelo de ambientes (workspaces)

O sistema e multi-tenant por **ambiente isolado** (hoje: `consultoria` e
`marketing`). Cada usuario pertence a um ou mais ambientes; a tela
`src/routes/_app/ambientes.tsx` deixa escolher onde trabalhar quando ha mais
de um. A regra de isolamento roda via RLS no banco:

```
has_workspace_access(w) = (w = current_workspace_id()) AND existe membership
```

Desde 09/2026 essa regra ganhou uma camada aditiva de **participacao entre
ambientes**: uma tarefa continua pertencendo a um unico ambiente
(`tasks.workspace_id`), mas fica visivel tambem para quem foi
atribuido/colaborador/participante de subtarefa em outro ambiente, sem criar
copia. Detalhe de decisao e das policies em
`docs/superpowers/specs/2026-09-03-participacao-de-tarefas-entre-ambientes-design.md`.

## Mapa de rotas (`src/routes/_app`)

| Rota | Proposito |
| --- | --- |
| `dashboard` | Visao inicial pos-login. |
| `tasks` (`.kanban` / `.list` / `.calendar` / `.index`) | Tarefas em tres visualizacoes. |
| `agenda` | Agenda/compromissos, integra com Google Calendar. |
| `ambientes` | Selecao do ambiente/workspace de trabalho. |
| `clients` (`.index` / `.new` / `.$clientId.edit`) | Cadastro e gestao de clientes. |
| `client-report.$clientId` | Relatorio exportavel de um cliente. |
| `import-ata` | Importacao/formatacao de ata de reuniao via Gemini. |
| `mural` | Mural/avisos internos. |
| `notes` | Notas pessoais/da equipe. |
| `obligations` | Obrigacoes recorrentes (prazos fixos). |
| `portal.entregas` | Portal do cliente: calendario de entregas. |
| `portal.financeiro` | Portal do cliente: faturas e pagamentos. |
| `reports` | Relatorios internos. |
| `requests` | Solicitacoes (fila de pedidos). |
| `settings` | Personalizacao da conta. |
| `trash` | Lixeira (soft delete). |
| `users` | Gestao de usuarios/permissoes. |

## Funcionalidades que dependem do Supabase

- Login e cadastro (convite apenas — ver `docs/SUPABASE-NOVO.md`).
- Perfis, papeis (`user_roles`) e permissao admin.
- Ambientes/workspaces e participacao entre ambientes.
- Clientes, departamentos e acessos de cliente.
- Tarefas, subtarefas, status, tags, colunas de kanban, historico de mudancas.
- Comentarios, anexos e mencoes.
- Notificacoes (ainda nao escopadas por ambiente — ver spec de participacao).
- Obrigacoes recorrentes, mural, solicitacoes.
- Lixeira por soft delete.
- Atualizacoes realtime em algumas telas.

## Integracoes externas

- **Gemini** (`@google/genai`, `src/lib/gemini.server.ts`): formatacao e importacao de ata (`ai-format.functions.ts`, `import-ata.functions.ts`). Chave apenas no servidor (`GEMINI_API_KEY`, sem prefixo `VITE_`).
- **Google Calendar**: OAuth server-side, calendario corporativo compartilhado (`GOOGLE_OAUTH_*`, `GOOGLE_SHARED_CALENDAR_ID`), usado pela rota `agenda`.
- **Ideia futura (nao implementada)**: canal de WhatsApp Business — ver `IDEIAS_FUTURAS.md`.

## Funcionalidades que ainda podem precisar de backend depois

- IA/importacao avancada de ata.
- Relatorios gerados por funcoes server-side.
- Uploads com politicas de storage mais rigorosas.

## Qualidade e testes

Cobertura de teste automatizado ainda e baixa: apenas
`calendar-event-layout.test.ts`, `subtask-status.test.ts` e
`workspace-tasks.test.ts` em `src/lib`. Priorize testar regras de
permissao/RLS e logica de participacao entre ambientes ao evoluir essas areas.

## Regra de seguranca

Toda evolucao deve acontecer neste repositorio e no Supabase novo. O projeto Lovable/original fica como referencia, nao como ambiente de teste.
