# supabase/migrations/20260831120000_fix_workspace_switching.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Switch the active workspace through a dedicated, authenticated operation.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- A direct UPDATE on profiles can be filtered out by an existing profile RLS` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- rule without returning an error to the client, leaving the user in the` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `-- previous environment.  This function validates the membership explicitly` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 5 | `-- and performs the single profile update in a controlled context.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 6 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 7 | `CREATE OR REPLACE FUNCTION public.select_active_workspace(target_workspace_id UUID)` | Define uma funcao no banco para reutilizar logica SQL. |
| 8 | `RETURNS UUID` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `  current_user_id UUID := auth.uid();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `  IF current_user_id IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `    RAISE EXCEPTION 'You must be signed in to select a TaskFlow environment';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 20 | `  IF NOT EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `    SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 22 | `    FROM public.workspace_memberships` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `    WHERE workspace_id = target_workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `      AND user_id = current_user_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `  ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `    RAISE EXCEPTION 'You do not have access to this TaskFlow environment';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 29 | `  UPDATE public.profiles` | Atualiza registros existentes no banco. |
| 30 | `  SET active_workspace_id = target_workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `  WHERE id = current_user_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 33 | `  IF NOT FOUND THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `    RAISE EXCEPTION 'TaskFlow profile was not found';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 37 | `  RETURN target_workspace_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 41 | `REVOKE ALL ON FUNCTION public.select_active_workspace(UUID) FROM PUBLIC;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `GRANT EXECUTE ON FUNCTION public.select_active_workspace(UUID) TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 44 | `-- The REST API keeps a schema cache for RPC discovery. Reload it explicitly` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 45 | `-- so the switch is available immediately after this migration is applied.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 46 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
