# Arquitetura da copia limpa

Estado revisado em **09/09/2026**, incluindo ambientes isolados, participacao
entre ambientes, obrigacoes, sincronizacao de anexos, Agenda, Google Calendar e
Google Meet.

Esta versao e uma copia React/Supabase para estudo e evolucao, sem tocar no Lovable.

Stack: React 19 + TanStack Router/Start (roteamento por arquivo) + Vite 7 +
Tailwind 4 + Radix/shadcn (`src/components/ui`) + TanStack Query + Supabase
(Postgres, Auth, Realtime, RLS). IA (Gemini) e Google Calendar entram como
integracoes externas via funcoes de servidor, nunca direto do navegador.

## Camadas

- `src/routes`: telas e rotas do app (arquivo = rota; ver `src/routes/README.md` para a convencao do TanStack Router).
- `src/components`: componentes reutilizaveis (dialogs, popovers, cards de tarefa etc.).
- `src/components/ClientFilesManager.tsx`: implementacao unica para consultar,
  filtrar, enviar, renomear, ordenar, visualizar e excluir arquivos do cliente.
  E reutilizada pelo painel lateral e pela aba de anexos do cadastro do cliente.
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

| Rota                                                   | Proposito                                           |
| ------------------------------------------------------ | --------------------------------------------------- |
| `dashboard`                                            | Visao inicial pos-login.                            |
| `tasks` (`.kanban` / `.list` / `.calendar` / `.index`) | Tarefas em tres visualizacoes.                      |
| `agenda`                                               | Agenda/compromissos, integra com Google Calendar.   |
| `ambientes`                                            | Selecao do ambiente/workspace de trabalho.          |
| `clients` (`.index` / `.new` / `.$clientId.edit`)      | Cadastro e gestao de clientes.                      |
| `client-report.$clientId`                              | Relatorio exportavel de um cliente.                 |
| `import-ata`                                           | Importacao/formatacao de ata de reuniao via Gemini. |
| `mural`                                                | Mural/avisos internos.                              |
| `notes`                                                | Notas pessoais/da equipe.                           |
| `obligations`                                          | Obrigacoes recorrentes (prazos fixos).              |
| `portal.entregas`                                      | Portal do cliente: calendario de entregas.          |
| `portal.financeiro`                                    | Portal do cliente: faturas e pagamentos.            |
| `reports`                                              | Relatorios internos.                                |
| `requests`                                             | Solicitacoes (fila de pedidos).                     |
| `settings`                                             | Personalizacao da conta.                            |
| `trash`                                                | Lixeira (soft delete).                              |
| `users`                                                | Gestao de usuarios/permissoes.                      |

## Funcionalidades que dependem do Supabase

- Login e cadastro (convite apenas — ver `docs/SUPABASE-NOVO.md`).
- Perfis, papeis (`user_roles`) e permissao admin.
- Ambientes/workspaces e participacao entre ambientes.
- Clientes, filiais, departamentos, funcionarios, acessos, anotacoes e arquivos.
- Tarefas, subtarefas, status, tags, colunas de kanban, historico de mudancas e
  justificativas de alteracao de prazo.
- Comentarios, anexos, mencoes e atualizacoes realtime.
- Notificacoes (ainda nao escopadas por ambiente — ver spec de participacao).
- Obrigacoes recorrentes e suas ocorrencias, mural, solicitacoes e Agenda.
- Conexoes individuais com o Google Calendar e preferencias de calendarios.
- Metadados e atas inteligentes de reunioes do Google Meet.
- Lixeira por soft delete.
- Atualizacoes realtime em algumas telas.

## Tarefas, subtarefas e conclusao

As tarefas podem ser exibidas em Kanban, lista ou calendario e possuem status,
prioridade, cliente, responsavel, colaboradores, prazo, tags, anexos, comentarios
e historico. Status personalizados coexistem com o estado semantico de conclusao.

Subtarefas possuem titulo editavel, responsavel, prazo, anotacoes, anexos e
status proprio. Uma tarefa principal nao deve ser concluida enquanto houver
subtarefas abertas. A leitura das tarefas tambem normaliza registros legados que
estejam concluidos apesar de ainda possuirem subtarefas pendentes.

Tarefas compartilhadas com participantes de outro ambiente continuam ancoradas
no ambiente de origem. Cliente, coluna e ambiente pertencem ao ambiente
proprietario; a participacao concede acesso operacional sem duplicar o registro.

## Arquivos do cliente e anexos de tarefas

Arquivos diretamente vinculados ao cliente sao gerenciados por
`ClientFilesManager`, tanto em `ClientFilesSheet` quanto na aba **Anexos** do
cadastro do cliente. Assim, as duas entradas da interface seguem as mesmas regras:

- administradores iniciam vendo os proprios arquivos e podem selecionar outros
  usuarios ou todos;
- demais usuarios permanecem limitados aos proprios arquivos;
- titulo, ordem, visualizacao, upload e exclusao usam a mesma implementacao;
- anexos de funcionarios continuam em fluxo separado, pois pertencem a
  `client_department_employee_attachments`.

O preview de anexos e processado localmente no navegador. Alem de imagens, PDF,
audio, video e texto, `AttachmentPreviewDialog` renderiza documentos `.docx` e
planilhas `.xlsx`, `.xlsm` e `.csv`. Planilhas muito grandes sao limitadas no
preview a 500 linhas e 50 colunas, mas o download sempre preserva o arquivo
original. Formatos legados como `.doc` e `.xls`, apresentacoes e formatos sem um
renderizador seguro continuam disponiveis para download.

Quando uma tarefa vinculada a um cliente recebe um anexo, ele tambem e registrado
em `client_files`. O vinculo usa `source_attachment_id` e reaproveita o mesmo
objeto do bucket `task-attachments`; nao ha copia fisica do arquivo. A migration
de sincronizacao mais recente tambem preenche anexos historicos de tarefas abertas
e concluidas. A exclusao de um arquivo sincronizado remove de forma coordenada o
anexo da tarefa e sua referencia nos arquivos do cliente.

## Obrigacoes recorrentes

Obrigacoes descrevem regras recorrentes e materializam ocorrencias como tarefas.
Ha recorrencia diaria, semanal e mensal, intervalos de repeticao, dias da semana,
dias do mes, ultimo dia, ultimo dia util, somente dias uteis, vigencia e geracao
antecipada. Cliente, responsavel, coluna, status, prioridade e horario podem ser
propagados para a tarefa gerada.

A materializacao e idempotente e pode ser executada diariamente por `pg_cron`.
Quando o cron nao estiver disponivel, a pagina de obrigacoes aciona o mesmo fluxo
de forma segura. Ocorrencias ligadas a tarefas enviadas para a lixeira possuem
fluxo de restauracao.

## Integracoes externas

- **Gemini** (`@google/genai`, `src/lib/gemini.server.ts`): formatacao e importacao de ata (`ai-format.functions.ts`, `import-ata.functions.ts`). Chave apenas no servidor (`GEMINI_API_KEY`, sem prefixo `VITE_`).
- **Google Calendar**: OAuth server-side por usuario, calendario corporativo
  compartilhado (`GOOGLE_OAUTH_*`, `GOOGLE_SHARED_CALENDAR_ID`), selecao de
  calendarios, cores, filtros e sincronizacao bidirecional na rota `agenda`.
- **Google Meet**: eventos podem solicitar a criacao de uma conferencia oficial
  ao serem salvos. Depois do encerramento, a Agenda pode consultar a ata
  inteligente disponivel para a conta Google conectada e armazenar status, link
  do Google Docs e informacoes da reuniao em `meeting_minutes`. A consulta da ata
  e iniciada manualmente por **Buscar ata** ou **Atualizar**; nao existe busca
  periodica automatica no estado atual.
- **Ideia futura (nao implementada)**: canal de WhatsApp Business — ver `IDEIAS_FUTURAS.md`.

## Realtime e cache

TanStack Query concentra o cache do navegador. Tarefas, anexos e outros dominios
com maior necessidade de atualizacao usam canais Realtime para invalidar ou
atualizar consultas. A tabela de anexos de tarefas participa da publicacao
Realtime e usa identidade completa para que exclusoes carreguem os campos
necessarios a filtragem e sincronizacao da interface.

A troca de ambiente atualiza o workspace ativo por RPC e recarrega a aplicacao
para impedir que dados do ambiente anterior permaneçam no cache.

## Administracao de usuarios

A interface ativa de usuarios chama a Edge Function `admin-user-access`, que usa
a service role apenas no servidor. O administrador central controla os acessos
mais amplos; administradores do Marketing ficam limitados aos colaboradores
proprios desse ambiente. `src/lib/admin-users.functions.ts` e uma implementacao
legada e nao deve ser conectada a novas telas sem antes alinhar suas regras com a
Edge Function.

## Funcionalidades que ainda podem precisar de backend depois

- IA/importacao avancada de ata.
- Relatorios gerados por funcoes server-side.
- Uploads com politicas de storage mais rigorosas.

## Qualidade e testes

Cobertura de teste automatizado ainda e baixa: apenas
`calendar-event-layout.test.ts`, `subtask-status.test.ts` e
`workspace-tasks.test.ts` em `src/lib`. Priorize testar regras de
permissao/RLS e logica de participacao entre ambientes ao evoluir essas areas.

Os tipos gerados em `src/integrations/supabase/types.ts` ainda nao representam
todo o schema acrescentado pelas migrations mais recentes. Ate uma nova geracao,
alguns modulos usam conversoes temporarias para `any`; ao alterar banco ou tipos,
validar especialmente workspaces, obrigacoes, Agenda, solicitacoes e mural.

Os arquivos em `docs/codigo-explicado` sao gerados por
`npm run docs:codigo`. Eles podem ficar atrasados em relacao ao codigo entre duas
execucoes do gerador; este documento e as migrations devem ser usados como mapa
arquitetural do estado atual.

## Regra de seguranca

Toda evolucao deve acontecer neste repositorio e no Supabase novo. O projeto Lovable/original fica como referencia, nao como ambiente de teste.
