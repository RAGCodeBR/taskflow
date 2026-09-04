# supabase/migrations/20260727120000_list_task_assignees.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Return only users that may be assigned to tasks, without exposing user_roles.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `CREATE OR REPLACE FUNCTION public.list_task_assignees()` | Define uma funcao no banco para reutilizar logica SQL. |
| 3 | `RETURNS TABLE (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `  id uuid,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `  full_name text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  email text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  avatar_url text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  is_active boolean` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `LANGUAGE sql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `STABLE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `  SELECT` | Consulta dados ou valida uma condicao no banco. |
| 16 | `    p.id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `    p.full_name,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `    p.email,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `    p.avatar_url,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `    COALESCE(p.is_active, true)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `  FROM public.profiles p` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `  INNER JOIN public.user_roles ur ON ur.user_id = p.id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `  WHERE ur.role IN ('admin', 'collaborator')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `    AND COALESCE(p.is_active, true);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 27 | `REVOKE ALL ON FUNCTION public.list_task_assignees() FROM PUBLIC;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `GRANT EXECUTE ON FUNCTION public.list_task_assignees() TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
