# Chat interno por tarefa

Data: 2026-09-10

## Problema

A conversa de uma tarefa hoje vive escondida numa aba dentro do card / editor.
Não há um lugar central para acompanhar as conversas em andamento nem aviso de
mensagem nova. Queremos uma tela dedicada de chat por tarefa, no menu abaixo de
"Minhas Tarefas", que suma quando a tarefa é concluída — seguindo o padrão de
realtime, escopo por ambiente e avisos que construímos no Mural.

## O que já existe (e será reutilizado)

- Tabela `comments` (`id, task_id, author_id, body, created_at, title, position`)
  — é o chat atual. Já está na publicação do Realtime, com `REPLICA IDENTITY
  FULL`, RLS `can_access_workspace_task(task_id)` (escopada por ambiente e
  participação, já corrigida nesta sprint).
- `comment_mentions` e `comment_attachments` — @menção e anexo em mensagem.
- `TaskConversationDialog` — já carrega mensagens, tem realtime por `task_id`,
  envia com menção, apaga. É a base do painel reutilizável.
- `participates_in_task(task_id)` — função que define "tarefa em que eu
  participo" (responsável, colaborador, dono de subtarefa, criador).

Nenhuma tabela de mensagem nova. Nenhuma migração de mensagens.

## Decisões (confirmadas com o usuário)

| Pergunta | Resposta |
|---|---|
| Quais tarefas na lista | Só as que eu participo, não concluídas, com ≥1 mensagem |
| Ao concluir a tarefa | Some da lista; histórico preservado; volta se reaberta |
| Aba Conversa no card | Continua nos dois lugares (card + tela nova) |
| Aviso de mensagem | Badge no menu + toast ao vivo, padrão do Mural |

## Arquitetura

### Nova tabela: `task_conversation_reads`

```
user_id      uuid  -> auth.users(id) on delete cascade
task_id      uuid  -> tasks(id)      on delete cascade
last_read_at timestamptz not null default now()
PRIMARY KEY (user_id, task_id)
```

RLS: `user_id = auth.uid()` (o próprio dono lê/escreve a sua linha).
Marca quando a pessoa abriu a conversa daquela tarefa — base do "não lido".

### Componente `TaskConversationPanel`

Extrai o miolo do antigo `TaskConversationDialog`: lista de mensagens, campo de
envio com autocompletar de @menção, realtime por `task_id`, apagar mensagem
própria. Props: `taskId`, `readOnly?` (true quando a tarefa está concluída).

**Conversa centralizada.** O chat (histórico + envio) existe em UM lugar só: a
tela `/conversations`. Fora dela não se conversa.

- `TaskDialog` — a aba "Conversa" deixa de ter histórico e campo de mensagem.
  Vira um atalho: "N mensagens" + botão **Abrir conversa** que navega para
  `/conversations?task=<id>`.
- `TaskCard` — o botão "Conversa" navega para `/conversations?task=<id>` em vez
  de abrir um diálogo.
- `TaskConversationDialog` é removido — ninguém mais o usa.
- A rota `/conversations` aceita `?task=<id>` (deep-link); abre a conversa
  daquela tarefa mesmo que ela não esteja na lista de salas (sem mensagem
  ainda, ou concluída).

### Tela `/conversations`

Arquivo `src/routes/_app/conversations.tsx`. Item em `allNav` do `AppShell`
logo após `/tasks`, ícone `MessagesSquare`, label "Conversas", com badge de
não-lidas. Permissão `conversations`.

Layout em duas colunas:
- **Esquerda** — "salas": tarefas onde `participates_in_task` é verdadeiro (ou
  ambiente + assignee/collaborator/creator), `completed_at IS NULL`,
  `deleted_at IS NULL`, com ao menos uma mensagem. Ordenadas pela `created_at`
  da última mensagem (desc). Item: título da tarefa, prévia da última mensagem,
  horário, badge de não-lidas da sala.
- **Direita** — `TaskConversationPanel` da tarefa selecionada. Sem seleção:
  estado vazio.
- Responsivo: em tela estreita mostra lista OU conversa (com voltar).

Abrir uma sala faz `upsert` em `task_conversation_reads` com `last_read_at =
now()`.

### Hooks globais no `AppShell` (espelham o Mural)

- `useTaskConversationsUnread` — conta tarefas (participo, não concluídas) com
  mensagem de OUTRA pessoa mais nova que o meu `last_read_at` daquela tarefa.
  Alimenta o badge. Realtime em `comments` invalida a contagem.
- `useTaskConversationRealtime` — subscription global em `comments`; mensagem de
  OUTRA pessoa numa tarefa que participo dispara um toast discreto ("Fulano
  comentou em «Tarefa»"). Nunca para as minhas mensagens. Reusa o helper de
  toast destacado (`activityToast`, generalização de `muralActivityToast`).

### Escopo por ambiente

Automático. `comments` já tem RLS `can_access_workspace_task` (ambiente +
participação); o Realtime do Supabase aplica essa RLS por conexão. A query da
lista filtra por participação. Igual ao Mural — nada específico por ambiente no
código.

### "Some ao concluir"

Filtro na query da lista: `tasks.completed_at IS NULL AND tasks.status <>
'done'`. Reaberta volta a aparecer (histórico nunca apagado). No card de uma
tarefa concluída, o painel abre em `readOnly`.

## Permissão `conversations`

- Adiciona a `ACCESS_OPTIONS` (tela Definir acessos), `validPermissions` e
  `allAdminPermissions` da edge function `admin-user-access`, `systemPermissions`
  em `use-auth`, e ao `accessByPath` do `AppShell`.
- Entra no `COLLABORATOR_DEFAULT_PERMISSIONS` (conversa sobre tarefa é uso do
  dia a dia).
- Retroativo: `UPDATE` nas permissões dos colaboradores existentes para incluir
  `conversations` (nas duas tabelas — `user_permissions` e
  `workspace_memberships`), como já foi feito para os ajustes anteriores.

## Migrations

1. `task_conversation_reads` — tabela, PK, FKs, RLS, índice
   `(task_id)` e `(user_id, last_read_at)`.
2. `conversations` — permissão válida na função + backfill dos colaboradores.

## Testes

`src/lib/task-conversations.ts` (lógica pura, vitest):
- `isConversationRoom(task, hasMessages)` — participo + não concluída + tem msg.
- `unreadCount(messages, lastReadByTask, myId)` — mensagens de outro mais novas
  que o `last_read_at` da tarefa.
- Ordenação das salas pela última mensagem.

Cenários de ambiente/realtime: verificação manual com sessão real, como no Mural.

## Fora do escopo

- Reações em mensagem de chat (o Mural tem; aqui não foi pedido).
- Busca dentro das conversas.
- Editar mensagem enviada (hoje só apaga; mantém assim).
- Notificação persistente no sininho por mensagem — continua só @menção, que já
  existe.
