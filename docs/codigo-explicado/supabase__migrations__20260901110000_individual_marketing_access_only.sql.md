# supabase/migrations/20260901110000_individual_marketing_access_only.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Marketing access is always managed person by person.  Remove the former` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- administrator-wide rule and keep the interface/API restricted to admins and collaborators.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 4 | `UPDATE public.workspace_access_settings settings` | Atualiza registros existentes no banco. |
| 5 | `SET allow_all_admins = false,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `    updated_at = now(),` | Atualiza registros existentes no banco. |
| 7 | `    updated_by = auth.uid()` | Atualiza registros existentes no banco. |
| 8 | `FROM public.workspaces workspace` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `WHERE settings.workspace_id = workspace.id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  AND workspace.slug = 'marketing';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 12 | `DELETE FROM public.workspace_memberships membership` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `USING public.workspaces workspace` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `WHERE membership.workspace_id = workspace.id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `  AND workspace.slug = 'marketing'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `  AND membership.access_grant = 'admin_policy';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 18 | `DROP FUNCTION IF EXISTS public.set_marketing_admin_visibility(boolean);` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 19 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 20 | `CREATE OR REPLACE FUNCTION public.set_marketing_user_access(target_user_id uuid, enabled boolean)` | Define uma funcao no banco para reutilizar logica SQL. |
| 21 | `RETURNS boolean` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `  marketing_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `  target_role public.app_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `  target_permissions text[];` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `  target_email text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `  IF NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `    RAISE EXCEPTION 'Somente administradores podem alterar o acesso ao Marketing';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 36 | `  SELECT id INTO marketing_id FROM public.workspaces WHERE slug = 'marketing';` | Consulta dados ou valida uma condicao no banco. |
| 37 | `  SELECT email INTO target_email FROM public.profiles WHERE id = target_user_id;` | Consulta dados ou valida uma condicao no banco. |
| 38 | `  IF target_email IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `    RAISE EXCEPTION 'Usuário não encontrado';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `  IF lower(target_email) = 'reinangrupoahouse@gmail.com' AND NOT enabled THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `    RAISE EXCEPTION 'O acesso do responsável pelo Marketing não pode ser removido';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 45 | `  SELECT role INTO target_role FROM public.user_roles WHERE user_id = target_user_id LIMIT 1;` | Consulta dados ou valida uma condicao no banco. |
| 46 | `  IF target_role IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `    RAISE EXCEPTION 'O usuário não possui uma categoria de acesso';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `  IF target_role = 'client'::public.app_role THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `    RAISE EXCEPTION 'O Marketing pode ser liberado somente para administradores ou colaboradores';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 53 | `  SELECT permissions INTO target_permissions FROM public.user_permissions WHERE user_id = target_user_id;` | Consulta dados ou valida uma condicao no banco. |
| 54 | `  target_permissions := COALESCE(target_permissions, ARRAY[]::text[]);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `  IF target_role = 'admin'::public.app_role THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `    target_permissions := ARRAY['dashboard','tasks','requests','import_ata','clients','reports','mural','agenda','portal_entregas','portal_financeiro','users','trash','settings']::text[];` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 59 | `  IF enabled THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `    INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions, access_grant)` | Insere dados iniciais ou registros de apoio. |
| 61 | `    VALUES (marketing_id, target_user_id, target_role, target_permissions, 'manual')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `    ON CONFLICT (workspace_id, user_id) DO UPDATE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `    SET role = EXCLUDED.role,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 64 | `        permissions = EXCLUDED.permissions,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `        access_grant = 'manual',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `        updated_at = now();` | Atualiza registros existentes no banco. |
| 67 | `  ELSE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `    DELETE FROM public.workspace_memberships` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 69 | `    WHERE workspace_id = marketing_id AND user_id = target_user_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 70 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 72 | `  RETURN enabled;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 74 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 76 | `GRANT EXECUTE ON FUNCTION public.set_marketing_user_access(uuid, boolean) TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 77 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 78 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 79 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
