# supabase/migrations/20260901130000_marketing_admins_only.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Marketing begins with the complete administrator team and no collaborators.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- Collaborators for Marketing are separate accounts and must never reuse a` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- Consultoria membership.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `DO $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  marketing_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  SELECT id INTO marketing_id FROM public.workspaces WHERE slug = 'marketing';` | Consulta dados ou valida uma condicao no banco. |
| 10 | `  IF marketing_id IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `    RAISE EXCEPTION 'Ambiente Marketing não encontrado';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 14 | `  INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions, access_grant)` | Insere dados iniciais ou registros de apoio. |
| 15 | `  SELECT` | Consulta dados ou valida uma condicao no banco. |
| 16 | `    marketing_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `    roles.user_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `    'admin'::public.app_role,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `    ARRAY['dashboard','tasks','requests','import_ata','clients','reports','mural','agenda','portal_entregas','portal_financeiro','users','trash','settings']::text[],` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `    'manual'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `  FROM public.user_roles roles` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `  WHERE roles.role = 'admin'::public.app_role` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `  ON CONFLICT (workspace_id, user_id) DO UPDATE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `  SET role = EXCLUDED.role,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `      permissions = EXCLUDED.permissions,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `      access_grant = 'manual',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `      updated_at = now();` | Atualiza registros existentes no banco. |
| 28 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 29 | `  DELETE FROM public.workspace_memberships membership` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `  WHERE membership.workspace_id = marketing_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `    AND membership.role <> 'admin'::public.app_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 35 | `CREATE OR REPLACE FUNCTION public.set_marketing_user_access(target_user_id uuid, enabled boolean)` | Define uma funcao no banco para reutilizar logica SQL. |
| 36 | `RETURNS boolean` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `  marketing_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `  consultoria_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `  target_role public.app_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `  target_permissions text[];` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `  IF NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `    RAISE EXCEPTION 'Somente administradores podem definir acessos ao Marketing';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 51 | `  SELECT id INTO marketing_id FROM public.workspaces WHERE slug = 'marketing';` | Consulta dados ou valida uma condicao no banco. |
| 52 | `  SELECT id INTO consultoria_id FROM public.workspaces WHERE slug = 'consultoria';` | Consulta dados ou valida uma condicao no banco. |
| 53 | `  SELECT role INTO target_role FROM public.user_roles WHERE user_id = target_user_id LIMIT 1;` | Consulta dados ou valida uma condicao no banco. |
| 54 | `  IF target_role IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `    RAISE EXCEPTION 'Usuário não encontrado';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 58 | `  IF target_role = 'admin'::public.app_role THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `    IF NOT enabled THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `      RAISE EXCEPTION 'Administradores sempre possuem acesso ao Marketing';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `    END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `    INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions, access_grant)` | Insere dados iniciais ou registros de apoio. |
| 63 | `    VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 64 | `      marketing_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `      target_user_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `      'admin'::public.app_role,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `      ARRAY['dashboard','tasks','requests','import_ata','clients','reports','mural','agenda','portal_entregas','portal_financeiro','users','trash','settings']::text[],` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `      'manual'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 69 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 70 | `    ON CONFLICT (workspace_id, user_id) DO UPDATE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `    SET role = EXCLUDED.role, permissions = EXCLUDED.permissions, updated_at = now();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `    RETURN true;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 74 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 75 | `  IF target_role <> 'collaborator'::public.app_role THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 76 | `    RAISE EXCEPTION 'O Marketing aceita somente administradores e colaboradores próprios';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 77 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 78 | `  IF EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 79 | `    SELECT 1 FROM public.workspace_memberships` | Consulta dados ou valida uma condicao no banco. |
| 80 | `    WHERE workspace_id = consultoria_id AND user_id = target_user_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 81 | `  ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 82 | `    RAISE EXCEPTION 'Colaboradores da Consultoria não podem acessar o Marketing. Crie uma conta própria para o Marketing.';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 83 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 84 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 85 | `  SELECT permissions INTO target_permissions FROM public.user_permissions WHERE user_id = target_user_id;` | Consulta dados ou valida uma condicao no banco. |
| 86 | `  target_permissions := COALESCE(target_permissions, ARRAY[]::text[]);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 87 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 88 | `  IF enabled THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 89 | `    INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions, access_grant)` | Insere dados iniciais ou registros de apoio. |
| 90 | `    VALUES (marketing_id, target_user_id, 'collaborator'::public.app_role, target_permissions, 'manual')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 91 | `    ON CONFLICT (workspace_id, user_id) DO UPDATE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 92 | `    SET role = EXCLUDED.role,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 93 | `        permissions = EXCLUDED.permissions,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 94 | `        access_grant = 'manual',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 95 | `        updated_at = now();` | Atualiza registros existentes no banco. |
| 96 | `  ELSE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 97 | `    DELETE FROM public.workspace_memberships` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 98 | `    WHERE workspace_id = marketing_id AND user_id = target_user_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 99 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 100 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 101 | `  RETURN enabled;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 102 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 103 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 104 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 105 | `GRANT EXECUTE ON FUNCTION public.set_marketing_user_access(uuid, boolean) TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 106 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 107 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
