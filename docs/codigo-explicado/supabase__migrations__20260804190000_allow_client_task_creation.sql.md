# supabase/migrations/20260804190000_allow_client_task_creation.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Client portal users can create tasks only for the client account to which` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- they are linked. Internal users retain the existing ability to create tasks.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `DROP POLICY IF EXISTS tasks_insert ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `CREATE POLICY tasks_insert ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 6 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `    auth.uid() IS NOT NULL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `    AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `      NOT public.has_role(auth.uid(), 'client'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `      OR client_id = public.current_client_id()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
