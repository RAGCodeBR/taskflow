# supabase/migrations/20260723161000_fix_task_returning_rls.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Task creation requests use \`INSERT ... RETURNING\` through Supabase's` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- \`.select().single()\`. The new row must be visible under the same verified` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- JWT context, even when the request role claim is not \`authenticated\`.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `DROP POLICY IF EXISTS tasks_select ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 5 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 6 | `CREATE POLICY tasks_select ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 7 | `  FOR SELECT TO public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  USING (auth.uid() IS NOT NULL AND public.can_view_task(id));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
