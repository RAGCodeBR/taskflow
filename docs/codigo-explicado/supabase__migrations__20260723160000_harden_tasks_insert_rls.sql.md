# supabase/migrations/20260723160000_harden_tasks_insert_rls.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Some clients can carry a valid Supabase user JWT while PostgREST receives a` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- role other than \`authenticated\`. Authorization must be tied to the verified` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- user id, not only to that role claim.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `DROP POLICY IF EXISTS tasks_insert ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 5 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 6 | `CREATE POLICY tasks_insert ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 7 | `  FOR INSERT TO public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  WITH CHECK (auth.uid() IS NOT NULL);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
