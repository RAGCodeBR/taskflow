# supabase/migrations/20260901140000_fix_workspace_trigger_for_client_files.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- \`assign_current_workspace\` is shared by workspace-scoped tables.  Only` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- clients have \`source_client_id\`; accessing it directly from the trigger` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- record makes inserts on child tables (such as client_files) fail.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `CREATE OR REPLACE FUNCTION public.assign_current_workspace()` | Define uma funcao no banco para reutilizar logica SQL. |
| 5 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  marketing_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `  consultoria_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `  is_directory_mirror boolean := false;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `  IF auth.uid() IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `    RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 19 | `  IF NEW.workspace_id IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `    NEW.workspace_id := public.current_workspace_id();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 23 | `  -- Use JSON for this optional field because this function also serves` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 24 | `  -- tables whose row type does not include source_client_id.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 25 | `  IF TG_TABLE_NAME = 'clients'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `     AND pg_trigger_depth() > 1` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `     AND (to_jsonb(NEW) ->> 'source_client_id') IS NOT NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `    SELECT id INTO marketing_id FROM public.workspaces WHERE slug = 'marketing';` | Consulta dados ou valida uma condicao no banco. |
| 29 | `    SELECT id INTO consultoria_id FROM public.workspaces WHERE slug = 'consultoria';` | Consulta dados ou valida uma condicao no banco. |
| 30 | `    is_directory_mirror := NEW.workspace_id = marketing_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `      AND EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `        SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 33 | `        FROM public.clients AS source_client` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `        WHERE source_client.id = (to_jsonb(NEW) ->> 'source_client_id')::uuid` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `          AND source_client.workspace_id = consultoria_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `      );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 39 | `  IF NOT public.has_workspace_access(NEW.workspace_id) AND NOT is_directory_mirror THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `    RAISE EXCEPTION 'You cannot write records in this TaskFlow environment';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 46 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
