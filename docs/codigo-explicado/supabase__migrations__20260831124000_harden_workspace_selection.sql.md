# supabase/migrations/20260831124000_harden_workspace_selection.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- A workspace decision is profile state, read on every request. Mark these` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- helpers VOLATILE so a prepared REST query never retains the previous` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- workspace after the profile was updated by select_active_workspace.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `CREATE OR REPLACE FUNCTION public.current_workspace_id()` | Define uma funcao no banco para reutilizar logica SQL. |
| 6 | `RETURNS UUID` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `LANGUAGE sql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `VOLATILE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `  SELECT active_workspace_id` | Consulta dados ou valida uma condicao no banco. |
| 13 | `  FROM public.profiles` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `  WHERE id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 17 | `CREATE OR REPLACE FUNCTION public.has_workspace_access(_workspace_id UUID)` | Define uma funcao no banco para reutilizar logica SQL. |
| 18 | `RETURNS BOOLEAN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `LANGUAGE sql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `VOLATILE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `  SELECT _workspace_id IS NOT NULL` | Consulta dados ou valida uma condicao no banco. |
| 25 | `    AND _workspace_id = public.current_workspace_id()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `    AND EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `      SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 28 | `      FROM public.workspace_memberships` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `      WHERE workspace_id = _workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `        AND user_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 34 | `CREATE OR REPLACE FUNCTION public.select_active_workspace(target_workspace_id UUID)` | Define uma funcao no banco para reutilizar logica SQL. |
| 35 | `RETURNS UUID` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `  current_user_id UUID := auth.uid();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `  IF current_user_id IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `    RAISE EXCEPTION 'You must be signed in to select a TaskFlow environment';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 47 | `  IF NOT EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `    SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 49 | `    FROM public.workspace_memberships` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `    WHERE workspace_id = target_workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `      AND user_id = current_user_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `  ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `    RAISE EXCEPTION 'You do not have access to this TaskFlow environment';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 56 | `  UPDATE public.profiles` | Atualiza registros existentes no banco. |
| 57 | `  SET active_workspace_id = target_workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `  WHERE id = current_user_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 60 | `  IF NOT FOUND THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `    RAISE EXCEPTION 'TaskFlow profile was not found';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 64 | `  RETURN target_workspace_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 68 | `REVOKE ALL ON FUNCTION public.select_active_workspace(UUID) FROM PUBLIC;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 69 | `GRANT EXECUTE ON FUNCTION public.select_active_workspace(UUID) TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 70 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
