# supabase/migrations/20260901103000_manage_marketing_access.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Marketing access can be granted to one person at a time or to every` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- administrator. Policy-granted memberships are marked so disabling the` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- global option never removes a manual authorization.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `ALTER TABLE public.workspace_memberships` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 6 | `  ADD COLUMN IF NOT EXISTS access_grant text NOT NULL DEFAULT 'manual'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  CHECK (access_grant IN ('manual', 'admin_policy'));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 9 | `CREATE TABLE IF NOT EXISTS public.workspace_access_settings (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 10 | `  workspace_id uuid PRIMARY KEY REFERENCES public.workspaces(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 11 | `  allow_all_admins boolean NOT NULL DEFAULT false,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `  updated_at timestamptz NOT NULL DEFAULT now(),` | Atualiza registros existentes no banco. |
| 13 | `  updated_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL` | Atualiza registros existentes no banco. |
| 14 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 16 | `INSERT INTO public.workspace_access_settings (workspace_id)` | Insere dados iniciais ou registros de apoio. |
| 17 | `SELECT id FROM public.workspaces WHERE slug = 'marketing'` | Consulta dados ou valida uma condicao no banco. |
| 18 | `ON CONFLICT (workspace_id) DO NOTHING;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 20 | `ALTER TABLE public.workspace_access_settings ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 21 | `GRANT SELECT ON public.workspace_access_settings TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `GRANT ALL ON public.workspace_access_settings TO service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 24 | `DROP POLICY IF EXISTS workspace_access_settings_admin_read ON public.workspace_access_settings;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 25 | `CREATE POLICY workspace_access_settings_admin_read` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 26 | `  ON public.workspace_access_settings` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `  USING (public.has_role(auth.uid(), 'admin'::public.app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 30 | `CREATE OR REPLACE FUNCTION public.set_marketing_admin_visibility(enabled boolean)` | Define uma funcao no banco para reutilizar logica SQL. |
| 31 | `RETURNS boolean` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `  marketing_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `  IF NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `    RAISE EXCEPTION 'Somente administradores podem alterar o acesso ao Marketing';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 43 | `  SELECT id INTO marketing_id FROM public.workspaces WHERE slug = 'marketing';` | Consulta dados ou valida uma condicao no banco. |
| 44 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 45 | `  INSERT INTO public.workspace_access_settings (workspace_id, allow_all_admins, updated_at, updated_by)` | Insere dados iniciais ou registros de apoio. |
| 46 | `  VALUES (marketing_id, enabled, now(), auth.uid())` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `  ON CONFLICT (workspace_id) DO UPDATE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `  SET allow_all_admins = EXCLUDED.allow_all_admins,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `      updated_at = EXCLUDED.updated_at,` | Atualiza registros existentes no banco. |
| 50 | `      updated_by = EXCLUDED.updated_by;` | Atualiza registros existentes no banco. |
| 51 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 52 | `  IF enabled THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `    INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions, access_grant)` | Insere dados iniciais ou registros de apoio. |
| 54 | `    SELECT` | Consulta dados ou valida uma condicao no banco. |
| 55 | `      marketing_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `      roles.user_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `      'admin'::public.app_role,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `      ARRAY['dashboard','tasks','requests','import_ata','clients','reports','mural','agenda','portal_entregas','portal_financeiro','users','trash','settings']::text[],` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `      'admin_policy'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `    FROM public.user_roles roles` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `    WHERE roles.role = 'admin'::public.app_role` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `    ON CONFLICT (workspace_id, user_id) DO NOTHING;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `  ELSE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 64 | `    DELETE FROM public.workspace_memberships` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `    WHERE workspace_id = marketing_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `      AND access_grant = 'admin_policy';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 69 | `  RETURN enabled;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 70 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 73 | `CREATE OR REPLACE FUNCTION public.set_marketing_user_access(target_user_id uuid, enabled boolean)` | Define uma funcao no banco para reutilizar logica SQL. |
| 74 | `RETURNS boolean` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 76 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 77 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 78 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 79 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 80 | `  marketing_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 81 | `  target_role public.app_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 82 | `  target_permissions text[];` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 83 | `  target_email text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 84 | `  global_admin_access boolean;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 85 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 86 | `  IF NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 87 | `    RAISE EXCEPTION 'Somente administradores podem alterar o acesso ao Marketing';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 88 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 89 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 90 | `  SELECT id INTO marketing_id FROM public.workspaces WHERE slug = 'marketing';` | Consulta dados ou valida uma condicao no banco. |
| 91 | `  SELECT email INTO target_email FROM public.profiles WHERE id = target_user_id;` | Consulta dados ou valida uma condicao no banco. |
| 92 | `  IF target_email IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 93 | `    RAISE EXCEPTION 'Usuário não encontrado';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 94 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 95 | `  IF lower(target_email) = 'reinangrupoahouse@gmail.com' AND NOT enabled THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 96 | `    RAISE EXCEPTION 'O acesso do responsável pelo Marketing não pode ser removido';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 97 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 98 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 99 | `  SELECT role INTO target_role FROM public.user_roles WHERE user_id = target_user_id LIMIT 1;` | Consulta dados ou valida uma condicao no banco. |
| 100 | `  IF target_role IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 101 | `    RAISE EXCEPTION 'O usuário não possui uma categoria de acesso';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 102 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 103 | `  SELECT permissions INTO target_permissions FROM public.user_permissions WHERE user_id = target_user_id;` | Consulta dados ou valida uma condicao no banco. |
| 104 | `  target_permissions := COALESCE(target_permissions, ARRAY[]::text[]);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 105 | `  IF target_role = 'admin'::public.app_role THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 106 | `    target_permissions := ARRAY['dashboard','tasks','requests','import_ata','clients','reports','mural','agenda','portal_entregas','portal_financeiro','users','trash','settings']::text[];` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 107 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 108 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 109 | `  SELECT allow_all_admins INTO global_admin_access` | Consulta dados ou valida uma condicao no banco. |
| 110 | `  FROM public.workspace_access_settings WHERE workspace_id = marketing_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 111 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 112 | `  IF NOT enabled AND target_role = 'admin'::public.app_role AND COALESCE(global_admin_access, false) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 113 | `    RAISE EXCEPTION 'Desative primeiro a liberação para todos os administradores';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 114 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 115 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 116 | `  IF enabled THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 117 | `    INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions, access_grant)` | Insere dados iniciais ou registros de apoio. |
| 118 | `    VALUES (marketing_id, target_user_id, target_role, target_permissions, 'manual')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 119 | `    ON CONFLICT (workspace_id, user_id) DO UPDATE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 120 | `    SET role = EXCLUDED.role,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 121 | `        permissions = EXCLUDED.permissions,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 122 | `        access_grant = 'manual',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 123 | `        updated_at = now();` | Atualiza registros existentes no banco. |
| 124 | `  ELSE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 125 | `    DELETE FROM public.workspace_memberships` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 126 | `    WHERE workspace_id = marketing_id AND user_id = target_user_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 127 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 128 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 129 | `  RETURN enabled;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 130 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 131 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 132 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 133 | `GRANT EXECUTE ON FUNCTION public.set_marketing_admin_visibility(boolean) TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 134 | `GRANT EXECUTE ON FUNCTION public.set_marketing_user_access(uuid, boolean) TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 135 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 136 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 137 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
