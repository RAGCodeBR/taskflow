# Participação de tarefas entre ambientes

Data: 2026-09-03

## Problema

O TaskFlow tem dois ambientes isolados, `consultoria` e `marketing`. Hoje uma
tarefa só existe para quem está no ambiente dela. Precisamos que uma tarefa da
Consultoria apareça também no Marketing quando alguém de lá for marcado nela —
**sem sair da Consultoria** e **sem virar uma segunda cópia**.

## O que já existia

Três formas de vincular pessoas a uma tarefa, todas já implementadas:

| Vínculo | Onde mora |
|---|---|
| Detentor da tarefa principal | `tasks.assignee_id` |
| Colaborador da tarefa | `task_collaborators` |
| Participante só da subtarefa | `subtasks.assignee_id` |

As três já gravam e já disparam notificação (`notify_task_assignment`,
`notify_task_collaborator_added`, `notify_subtask_assignment`).

A função `can_view_task()` codificava exatamente esses níveis, mas ficou órfã: a
migration `20260831110000_add_isolated_workspaces` removeu todas as policies de
`tasks` para instalar a regra de ambiente. O modelo de participação não foi
descartado por decisão — foi desligado por substituição.

### O estado quebrado de hoje

`notifications` nunca foi escopada por ambiente (não tem `workspace_id`; a RLS é
por `user_id`). Então, hoje, marcar uma pessoa do Marketing numa tarefa da
Consultoria já dispara o popup para ela — mas o `AssignmentPopup` busca a tarefa
via `supabase.from("tasks")`, que passa pela RLS de ambiente e volta vazia. A
pessoa recebe o aviso de uma tarefa que não existe para ela.

## Decisão: compartilhar, não copiar

Descartamos o espelho (duas linhas em `tasks`, no modelo do
`sync_consultoria_client_to_marketing`). Cliente é dado parado; tarefa é dado
vivo. Comentários, subtarefas, anexos e histórico penduram em `task_id` — com
duas linhas viram duas conversas paralelas, e seria preciso sincronização
bidirecional para mantê-las coerentes.

A tarefa continua uma linha só, com o `workspace_id` do ambiente dono, e
*aparece* no outro ambiente para quem participa dela.

## Modelo

A regra de isolamento continua sendo:

```sql
has_workspace_access(w) = (w = current_workspace_id()) AND existe membership
```

O acesso por participação é **aditivo** e nunca substitui isso:

```sql
SELECT em tasks: has_workspace_access(workspace_id) OR participates_in_task(id)
```

`participates_in_task()` deliberadamente **não** inclui `has_role(admin)`. A
`can_view_task()` original incluía, mas ali não havia ambientes; aqui isso
tornaria a Consultoria e o Marketing inteiros visíveis a qualquer administrador
de uma só vez, que é exatamente o isolamento que o sistema construiu.

### Divisão de direitos

| Operação | Quem pode |
|---|---|
| Ler a tarefa | Ambiente dono **ou** participante |
| Criar | Só o ambiente dono |
| Editar (status, descrição, prazo) | Ambiente dono **ou** participante |
| Mudar `workspace_id`, `column_id`, `client_id` | Só o ambiente dono |
| Excluir | Só o ambiente dono |
| Subtarefa, comentário, anexo, histórico | Ambiente dono **ou** participante |

O participante pode ser o detentor da tarefa principal, então precisa conseguir
concluí-la — por isso o UPDATE é liberado. O que o prende é o gatilho
`guard_cross_workspace_task_update()`, que rejeita mudança nos campos que
ancoram a tarefa no ambiente dono. A policy libera a edição; o gatilho protege
a âncora.

## Mudanças no banco

**`20260903120000_cross_workspace_task_participation.sql`**
- `participates_in_task(uuid)` — os três vínculos, sem o atalho de admin
- `workspace_tasks_access` (FOR ALL) dividida em `select` / `insert` / `update` / `delete`
- `guard_cross_workspace_task_update()` + gatilho em `tasks`
- `can_access_workspace_task()` estendida, para as ~30 tabelas filhas seguirem junto

**`20260903122000_admin_task_creation_across_workspaces.sql`**
- `can_create_in_workspace()` — só admin, e só em ambiente de que é membro
- `tasks` ganha gatilho próprio, que resolve coluna, status e cliente do destino
- `list_task_assignees(target_workspace_id)` — por padrão, as pessoas do
  **ambiente ativo**; com argumento, as do ambiente escolhido na criação

A versão anterior lia `user_roles` sem nenhum filtro de ambiente: todo mundo via
todo mundo. Como os 9 lugares que selecionam pessoa (tarefa, subtarefa, card,
editor inline, obrigações, filtros, menções, dashboard e relatório de cliente)
chamam a função sem argumento, mudar o padrão corrige os 9 de uma vez.

### Verificação antes de aplicar

A função nova exige `workspace_memberships` para a pessoa aparecer. Quem tiver
papel mas nenhuma associação sumiria dos seletores. Rode antes:

```sql
SELECT p.email, ur.role
FROM public.profiles p
JOIN public.user_roles ur ON ur.user_id = p.id
WHERE ur.role IN ('admin','collaborator')
  AND COALESCE(p.is_active, true)
  AND NOT EXISTS (
    SELECT 1 FROM public.workspace_memberships m WHERE m.user_id = p.id
  );
```

Se voltar alguma linha, essas pessoas precisam de associação à Consultoria antes
de aplicar — senão desaparecem das listas de seleção.

## Mudanças na interface

- `src/lib/workspace-tasks.ts` — lógica pura, coberta por teste
- `TaskDialog` — os quatro seletores de atribuição etiquetam quem vem de outro
  ambiente; quem é de casa aparece sem etiqueta para não virar ruído
- `tasks.kanban.tsx` — faixa **"De outros ambientes"**, fora do arrasta-e-solta

A faixa é necessária, não decorativa: `tasksByCol` joga na **primeira coluna**
toda tarefa cujo `column_id` não exista no quadro. Sem separar antes, a tarefa
da Consultoria apareceria misturada ao trabalho do Marketing e arrastável.

Lista, calendário e popup passam a funcionar sozinhos: filtram por pessoa e por
data, não por coluna.

## Fora do escopo

- Mover ou transferir tarefa entre ambientes
- Cópia real da tarefa
- Replicar tags e colunas entre ambientes
- Escopar `notifications` por ambiente

## Cenários de isolamento a validar

Estes precisam de banco e não estão cobertos por teste automatizado:

1. Colaborador da Consultoria **não** vê tarefa do Marketing em que não participa
2. Colaborador da Consultoria **não** vê pessoas do Marketing no seletor
3. Participante do Marketing vê **só** a tarefa da Consultoria em que participa
4. Participante do Marketing consegue concluir a subtarefa dele e comentar
5. Participante do Marketing **não** consegue mudar coluna, cliente nem excluir
6. Participante do Marketing **não** consegue mudar o `workspace_id` da tarefa
7. Admin continua vendo os dois ambientes só ao alternar, nunca simultaneamente
8. Retirar a pessoa da tarefa remove a visibilidade dela

## Pré-requisito operacional

O Marketing hoje tem **só administradores** — a migration
`20260901130000_marketing_admins_only` apagou toda associação que não fosse
admin. Enquanto não existirem contas de colaborador do Marketing, o seletor só
vai listar admins do lado de lá. Contas do Marketing precisam ser separadas: a
RPC `set_marketing_user_access` recusa quem já pertence à Consultoria.
