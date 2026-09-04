# supabase/migrations/20260723150000_allow_task_assignment_with_collaborators.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- A política anterior avaliava a tarefa após trocar o responsável. Quando o` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- usuário que estava salvando deixava de ser o responsável, o UPDATE era` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- negado antes que os colaboradores fossem gravados.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `DROP POLICY IF EXISTS tasks_update ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 5 | `CREATE POLICY tasks_update ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 6 | `  FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  USING (public.can_view_task(id))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  WITH CHECK (auth.uid() IS NOT NULL);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 10 | `-- O gatilho set_task_created_by fixa o criador para auth.uid(); portanto a` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 11 | `-- inserção pode ser aceita para toda sessão autenticada sem depender do valor` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 12 | `-- enviado pelo formulário.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 13 | `DROP POLICY IF EXISTS tasks_insert ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 14 | `CREATE POLICY tasks_insert ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 15 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `  WITH CHECK (true);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
