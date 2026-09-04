# supabase/migrations/20260903150000_participation_only_for_outsiders.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Participação passa a valer somente para quem está FORA do ambiente da tarefa.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- A versão anterior concedia acesso por participação a qualquer pessoa ligada à` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `-- tarefa, sem olhar se ela já pertencia ao ambiente dela. Consequência para um` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 5 | `-- administrador, que é membro dos dois ambientes: toda tarefa da Consultoria em` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 6 | `-- que ele fosse responsável ou criador virava "participação" quando ele estava` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 7 | `-- no Marketing, e o quadro do Marketing passava a despejar o histórico inteiro` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 8 | `-- da Consultoria. Não era um caso de borda — era o volume normal de trabalho.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 9 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 10 | `-- E, por tabela, o gatilho guard_cross_workspace_task_update() tratava esse` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 11 | `-- mesmo administrador como forasteiro na própria tarefa, bloqueando trocar` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 12 | `-- cliente, mover de coluna e excluir.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 13 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 14 | `-- Regra correta: quem é membro do ambiente da tarefa a alcança trocando de` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 15 | `-- ambiente, com todos os direitos. Participação existe para o caso que a` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 16 | `-- associação não cobre — alguém do Marketing marcado numa tarefa da Consultoria,` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 17 | `-- que nunca vai ser membro da Consultoria (set_marketing_user_access recusa).` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 18 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 19 | `CREATE OR REPLACE FUNCTION public.participates_in_task(_task_id uuid)` | Define uma funcao no banco para reutilizar logica SQL. |
| 20 | `RETURNS boolean` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `LANGUAGE sql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `STABLE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `  SELECT EXISTS (` | Consulta dados ou valida uma condicao no banco. |
| 27 | `    SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 28 | `    FROM public.tasks t` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `    WHERE t.id = _task_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `      -- Membro do ambiente da tarefa não entra por aqui: ele já tem o caminho` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 31 | `      -- normal, e conceder acesso extra faria um quadro derramar no outro.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 32 | `      AND NOT EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `        SELECT 1 FROM public.workspace_memberships m` | Consulta dados ou valida uma condicao no banco. |
| 34 | `        WHERE m.workspace_id = t.workspace_id AND m.user_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `      )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `      -- Os três vínculos de atribuição do sistema. created_by saiu de propósito:` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 37 | `      -- criar uma tarefa para o outro ambiente não é participar do trabalho` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 38 | `      -- dela, e era o que mais poluía o quadro de destino.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 39 | `      AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `        t.assignee_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `        OR EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `          SELECT 1 FROM public.task_collaborators tc` | Consulta dados ou valida uma condicao no banco. |
| 43 | `          WHERE tc.task_id = t.id AND tc.collaborator_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `        )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `        OR EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `          SELECT 1 FROM public.subtasks s` | Consulta dados ou valida uma condicao no banco. |
| 47 | `          WHERE s.task_id = t.id AND s.assignee_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `        )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `      )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 53 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
