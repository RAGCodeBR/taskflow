# docs/superpowers/specs/2026-09-03-participacao-de-tarefas-entre-ambientes-design.md

Tipo: Documento Markdown.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `# Participação de tarefas entre ambientes` | Titulo ou subtitulo usado para organizar a documentacao. |
| 2 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 3 | `Data: 2026-09-03` | Texto explicativo da documentacao. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `## Problema` | Titulo ou subtitulo usado para organizar a documentacao. |
| 6 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 7 | `O TaskFlow tem dois ambientes isolados, \`consultoria\` e \`marketing\`. Hoje uma` | Texto explicativo da documentacao. |
| 8 | `tarefa só existe para quem está no ambiente dela. Precisamos que uma tarefa da` | Texto explicativo da documentacao. |
| 9 | `Consultoria apareça também no Marketing quando alguém de lá for marcado nela —` | Texto explicativo da documentacao. |
| 10 | `**sem sair da Consultoria** e **sem virar uma segunda cópia**.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 11 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 12 | `## O que já existia` | Titulo ou subtitulo usado para organizar a documentacao. |
| 13 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 14 | `Três formas de vincular pessoas a uma tarefa, todas já implementadas:` | Texto explicativo da documentacao. |
| 15 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 16 | `| Vínculo | Onde mora |` | Texto explicativo da documentacao. |
| 17 | `|---|---|` | Texto explicativo da documentacao. |
| 18 | `| Detentor da tarefa principal | \`tasks.assignee_id\` |` | Texto explicativo da documentacao. |
| 19 | `| Colaborador da tarefa | \`task_collaborators\` |` | Texto explicativo da documentacao. |
| 20 | `| Participante só da subtarefa | \`subtasks.assignee_id\` |` | Texto explicativo da documentacao. |
| 21 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 22 | `As três já gravam e já disparam notificação (\`notify_task_assignment\`,` | Texto explicativo da documentacao. |
| 23 | `\`notify_task_collaborator_added\`, \`notify_subtask_assignment\`).` | Texto explicativo da documentacao. |
| 24 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 25 | `A função \`can_view_task()\` codificava exatamente esses níveis, mas ficou órfã: a` | Texto explicativo da documentacao. |
| 26 | `migration \`20260831110000_add_isolated_workspaces\` removeu todas as policies de` | Texto explicativo da documentacao. |
| 27 | `\`tasks\` para instalar a regra de ambiente. O modelo de participação não foi` | Texto explicativo da documentacao. |
| 28 | `descartado por decisão — foi desligado por substituição.` | Texto explicativo da documentacao. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 30 | `### O estado quebrado de hoje` | Titulo ou subtitulo usado para organizar a documentacao. |
| 31 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 32 | `\`notifications\` nunca foi escopada por ambiente (não tem \`workspace_id\`; a RLS é` | Texto explicativo da documentacao. |
| 33 | `por \`user_id\`). Então, hoje, marcar uma pessoa do Marketing numa tarefa da` | Texto explicativo da documentacao. |
| 34 | `Consultoria já dispara o popup para ela — mas o \`AssignmentPopup\` busca a tarefa` | Texto explicativo da documentacao. |
| 35 | `via \`supabase.from("tasks")\`, que passa pela RLS de ambiente e volta vazia. A` | Texto explicativo da documentacao. |
| 36 | `pessoa recebe o aviso de uma tarefa que não existe para ela.` | Texto explicativo da documentacao. |
| 37 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 38 | `## Decisão: compartilhar, não copiar` | Titulo ou subtitulo usado para organizar a documentacao. |
| 39 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 40 | `Descartamos o espelho (duas linhas em \`tasks\`, no modelo do` | Texto explicativo da documentacao. |
| 41 | `\`sync_consultoria_client_to_marketing\`). Cliente é dado parado; tarefa é dado` | Texto explicativo da documentacao. |
| 42 | `vivo. Comentários, subtarefas, anexos e histórico penduram em \`task_id\` — com` | Texto explicativo da documentacao. |
| 43 | `duas linhas viram duas conversas paralelas, e seria preciso sincronização` | Texto explicativo da documentacao. |
| 44 | `bidirecional para mantê-las coerentes.` | Texto explicativo da documentacao. |
| 45 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 46 | `A tarefa continua uma linha só, com o \`workspace_id\` do ambiente dono, e` | Texto explicativo da documentacao. |
| 47 | `*aparece* no outro ambiente para quem participa dela.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 48 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 49 | `## Modelo` | Titulo ou subtitulo usado para organizar a documentacao. |
| 50 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 51 | `A regra de isolamento continua sendo:` | Texto explicativo da documentacao. |
| 52 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 53 | `\`\`\`sql` | Marca inicio ou fim de um bloco de codigo. |
| 54 | `has_workspace_access(w) = (w = current_workspace_id()) AND existe membership` | Texto explicativo da documentacao. |
| 55 | `\`\`\`` | Marca inicio ou fim de um bloco de codigo. |
| 56 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 57 | `O acesso por participação é **aditivo** e nunca substitui isso:` | Texto explicativo da documentacao. |
| 58 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 59 | `\`\`\`sql` | Marca inicio ou fim de um bloco de codigo. |
| 60 | `SELECT em tasks: has_workspace_access(workspace_id) OR participates_in_task(id)` | Texto explicativo da documentacao. |
| 61 | `\`\`\`` | Marca inicio ou fim de um bloco de codigo. |
| 62 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 63 | `\`participates_in_task()\` deliberadamente **não** inclui \`has_role(admin)\`. A` | Texto explicativo da documentacao. |
| 64 | `\`can_view_task()\` original incluía, mas ali não havia ambientes; aqui isso` | Texto explicativo da documentacao. |
| 65 | `tornaria a Consultoria e o Marketing inteiros visíveis a qualquer administrador` | Texto explicativo da documentacao. |
| 66 | `de uma só vez, que é exatamente o isolamento que o sistema construiu.` | Texto explicativo da documentacao. |
| 67 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 68 | `### Divisão de direitos` | Titulo ou subtitulo usado para organizar a documentacao. |
| 69 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 70 | `| Operação | Quem pode |` | Texto explicativo da documentacao. |
| 71 | `|---|---|` | Texto explicativo da documentacao. |
| 72 | `| Ler a tarefa | Ambiente dono **ou** participante |` | Texto explicativo da documentacao. |
| 73 | `| Criar | Só o ambiente dono |` | Texto explicativo da documentacao. |
| 74 | `| Editar (status, descrição, prazo) | Ambiente dono **ou** participante |` | Texto explicativo da documentacao. |
| 75 | `| Mudar \`workspace_id\`, \`column_id\`, \`client_id\` | Só o ambiente dono |` | Texto explicativo da documentacao. |
| 76 | `| Excluir | Só o ambiente dono |` | Texto explicativo da documentacao. |
| 77 | `| Subtarefa, comentário, anexo, histórico | Ambiente dono **ou** participante |` | Texto explicativo da documentacao. |
| 78 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 79 | `O participante pode ser o detentor da tarefa principal, então precisa conseguir` | Texto explicativo da documentacao. |
| 80 | `concluí-la — por isso o UPDATE é liberado. O que o prende é o gatilho` | Texto explicativo da documentacao. |
| 81 | `\`guard_cross_workspace_task_update()\`, que rejeita mudança nos campos que` | Texto explicativo da documentacao. |
| 82 | `ancoram a tarefa no ambiente dono. A policy libera a edição; o gatilho protege` | Texto explicativo da documentacao. |
| 83 | `a âncora.` | Texto explicativo da documentacao. |
| 84 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 85 | `## Mudanças no banco` | Titulo ou subtitulo usado para organizar a documentacao. |
| 86 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 87 | `**\`20260903120000_cross_workspace_task_participation.sql\`**` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 88 | `- \`participates_in_task(uuid)\` — os três vínculos, sem o atalho de admin` | Item de lista com uma orientacao, decisao ou observacao. |
| 89 | `- \`workspace_tasks_access\` (FOR ALL) dividida em \`select\` / \`insert\` / \`update\` / \`delete\`` | Item de lista com uma orientacao, decisao ou observacao. |
| 90 | `- \`guard_cross_workspace_task_update()\` + gatilho em \`tasks\`` | Item de lista com uma orientacao, decisao ou observacao. |
| 91 | `- \`can_access_workspace_task()\` estendida, para as ~30 tabelas filhas seguirem junto` | Item de lista com uma orientacao, decisao ou observacao. |
| 92 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 93 | `**\`20260903122000_admin_task_creation_across_workspaces.sql\`**` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 94 | `- \`can_create_in_workspace()\` — só admin, e só em ambiente de que é membro` | Item de lista com uma orientacao, decisao ou observacao. |
| 95 | `- \`tasks\` ganha gatilho próprio, que resolve coluna, status e cliente do destino` | Item de lista com uma orientacao, decisao ou observacao. |
| 96 | `- \`list_task_assignees(target_workspace_id)\` — por padrão, as pessoas do` | Item de lista com uma orientacao, decisao ou observacao. |
| 97 | `  **ambiente ativo**; com argumento, as do ambiente escolhido na criação` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 98 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 99 | `A versão anterior lia \`user_roles\` sem nenhum filtro de ambiente: todo mundo via` | Texto explicativo da documentacao. |
| 100 | `todo mundo. Como os 9 lugares que selecionam pessoa (tarefa, subtarefa, card,` | Texto explicativo da documentacao. |
| 101 | `editor inline, obrigações, filtros, menções, dashboard e relatório de cliente)` | Texto explicativo da documentacao. |
| 102 | `chamam a função sem argumento, mudar o padrão corrige os 9 de uma vez.` | Texto explicativo da documentacao. |
| 103 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 104 | `### Verificação antes de aplicar` | Titulo ou subtitulo usado para organizar a documentacao. |
| 105 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 106 | `A função nova exige \`workspace_memberships\` para a pessoa aparecer. Quem tiver` | Texto explicativo da documentacao. |
| 107 | `papel mas nenhuma associação sumiria dos seletores. Rode antes:` | Texto explicativo da documentacao. |
| 108 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 109 | `\`\`\`sql` | Marca inicio ou fim de um bloco de codigo. |
| 110 | `SELECT p.email, ur.role` | Texto explicativo da documentacao. |
| 111 | `FROM public.profiles p` | Texto explicativo da documentacao. |
| 112 | `JOIN public.user_roles ur ON ur.user_id = p.id` | Texto explicativo da documentacao. |
| 113 | `WHERE ur.role IN ('admin','collaborator')` | Texto explicativo da documentacao. |
| 114 | `  AND COALESCE(p.is_active, true)` | Texto explicativo da documentacao. |
| 115 | `  AND NOT EXISTS (` | Texto explicativo da documentacao. |
| 116 | `    SELECT 1 FROM public.workspace_memberships m WHERE m.user_id = p.id` | Texto explicativo da documentacao. |
| 117 | `  );` | Texto explicativo da documentacao. |
| 118 | `\`\`\`` | Marca inicio ou fim de um bloco de codigo. |
| 119 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 120 | `Se voltar alguma linha, essas pessoas precisam de associação à Consultoria antes` | Texto explicativo da documentacao. |
| 121 | `de aplicar — senão desaparecem das listas de seleção.` | Texto explicativo da documentacao. |
| 122 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 123 | `## Mudanças na interface` | Titulo ou subtitulo usado para organizar a documentacao. |
| 124 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 125 | `- \`src/lib/workspace-tasks.ts\` — lógica pura, coberta por teste` | Item de lista com uma orientacao, decisao ou observacao. |
| 126 | `- \`TaskDialog\` — os quatro seletores de atribuição etiquetam quem vem de outro` | Item de lista com uma orientacao, decisao ou observacao. |
| 127 | `  ambiente; quem é de casa aparece sem etiqueta para não virar ruído` | Texto explicativo da documentacao. |
| 128 | `- \`tasks.kanban.tsx\` — faixa **"De outros ambientes"**, fora do arrasta-e-solta` | Item de lista com uma orientacao, decisao ou observacao. |
| 129 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 130 | `A faixa é necessária, não decorativa: \`tasksByCol\` joga na **primeira coluna**` | Texto explicativo da documentacao. |
| 131 | `toda tarefa cujo \`column_id\` não exista no quadro. Sem separar antes, a tarefa` | Texto explicativo da documentacao. |
| 132 | `da Consultoria apareceria misturada ao trabalho do Marketing e arrastável.` | Texto explicativo da documentacao. |
| 133 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 134 | `Lista, calendário e popup passam a funcionar sozinhos: filtram por pessoa e por` | Texto explicativo da documentacao. |
| 135 | `data, não por coluna.` | Texto explicativo da documentacao. |
| 136 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 137 | `## Fora do escopo` | Titulo ou subtitulo usado para organizar a documentacao. |
| 138 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 139 | `- Mover ou transferir tarefa entre ambientes` | Item de lista com uma orientacao, decisao ou observacao. |
| 140 | `- Cópia real da tarefa` | Item de lista com uma orientacao, decisao ou observacao. |
| 141 | `- Replicar tags e colunas entre ambientes` | Item de lista com uma orientacao, decisao ou observacao. |
| 142 | `- Escopar \`notifications\` por ambiente` | Item de lista com uma orientacao, decisao ou observacao. |
| 143 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 144 | `## Cenários de isolamento a validar` | Titulo ou subtitulo usado para organizar a documentacao. |
| 145 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 146 | `Estes precisam de banco e não estão cobertos por teste automatizado:` | Texto explicativo da documentacao. |
| 147 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 148 | `1. Colaborador da Consultoria **não** vê tarefa do Marketing em que não participa` | Texto explicativo da documentacao. |
| 149 | `2. Colaborador da Consultoria **não** vê pessoas do Marketing no seletor` | Texto explicativo da documentacao. |
| 150 | `3. Participante do Marketing vê **só** a tarefa da Consultoria em que participa` | Texto explicativo da documentacao. |
| 151 | `4. Participante do Marketing consegue concluir a subtarefa dele e comentar` | Texto explicativo da documentacao. |
| 152 | `5. Participante do Marketing **não** consegue mudar coluna, cliente nem excluir` | Texto explicativo da documentacao. |
| 153 | `6. Participante do Marketing **não** consegue mudar o \`workspace_id\` da tarefa` | Texto explicativo da documentacao. |
| 154 | `7. Admin continua vendo os dois ambientes só ao alternar, nunca simultaneamente` | Texto explicativo da documentacao. |
| 155 | `8. Retirar a pessoa da tarefa remove a visibilidade dela` | Texto explicativo da documentacao. |
| 156 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 157 | `## Pré-requisito operacional` | Titulo ou subtitulo usado para organizar a documentacao. |
| 158 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 159 | `O Marketing hoje tem **só administradores** — a migration` | Texto explicativo da documentacao. |
| 160 | `\`20260901130000_marketing_admins_only\` apagou toda associação que não fosse` | Texto explicativo da documentacao. |
| 161 | `admin. Enquanto não existirem contas de colaborador do Marketing, o seletor só` | Texto explicativo da documentacao. |
| 162 | `vai listar admins do lado de lá. Contas do Marketing precisam ser separadas: a` | Texto explicativo da documentacao. |
| 163 | `RPC \`set_marketing_user_access\` recusa quem já pertence à Consultoria.` | Texto explicativo da documentacao. |
| 164 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
