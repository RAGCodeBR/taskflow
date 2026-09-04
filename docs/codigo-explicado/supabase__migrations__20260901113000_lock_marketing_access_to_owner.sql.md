# supabase/migrations/20260901113000_lock_marketing_access_to_owner.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- The Marketing audience is defined only by the responsible account.  This is` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- enforced in the RPC and in RLS so another administrator cannot bypass the UI.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 4 | `CREATE OR REPLACE FUNCTION public.set_marketing_user_access(target_user_id uuid, enabled boolean)` | Define uma funcao no banco para reutilizar logica SQL. |
| 5 | `RETURNS boolean` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  marketing_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `  target_role public.app_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `  target_permissions text[];` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `  target_email text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `  IF NOT EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `    SELECT 1 FROM public.profiles` | Consulta dados ou valida uma condicao no banco. |
| 18 | `    WHERE id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `      AND lower(email) = 'reinangrupoahouse@gmail.com'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `    RAISE EXCEPTION 'Somente o responsável pode definir acessos ao Marketing';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 24 | `  SELECT id INTO marketing_id FROM public.workspaces WHERE slug = 'marketing';` | Consulta dados ou valida uma condicao no banco. |
| 25 | `  SELECT email INTO target_email FROM public.profiles WHERE id = target_user_id;` | Consulta dados ou valida uma condicao no banco. |
| 26 | `  IF target_email IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `    RAISE EXCEPTION 'Usuário não encontrado';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `  IF lower(target_email) = 'reinangrupoahouse@gmail.com' AND NOT enabled THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `    RAISE EXCEPTION 'O acesso do responsável pelo Marketing não pode ser removido';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 33 | `  SELECT role INTO target_role FROM public.user_roles WHERE user_id = target_user_id LIMIT 1;` | Consulta dados ou valida uma condicao no banco. |
| 34 | `  IF target_role IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `    RAISE EXCEPTION 'O usuário não possui uma categoria de acesso';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `  IF target_role = 'client'::public.app_role THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `    RAISE EXCEPTION 'O Marketing pode ser liberado somente para administradores ou colaboradores';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 41 | `  SELECT permissions INTO target_permissions FROM public.user_permissions WHERE user_id = target_user_id;` | Consulta dados ou valida uma condicao no banco. |
| 42 | `  target_permissions := COALESCE(target_permissions, ARRAY[]::text[]);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `  IF target_role = 'admin'::public.app_role THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `    target_permissions := ARRAY['dashboard','tasks','requests','import_ata','clients','reports','mural','agenda','portal_entregas','portal_financeiro','users','trash','settings']::text[];` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 47 | `  IF enabled THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `    INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions, access_grant)` | Insere dados iniciais ou registros de apoio. |
| 49 | `    VALUES (marketing_id, target_user_id, target_role, target_permissions, 'manual')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `    ON CONFLICT (workspace_id, user_id) DO UPDATE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `    SET role = EXCLUDED.role,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `        permissions = EXCLUDED.permissions,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `        access_grant = 'manual',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `        updated_at = now();` | Atualiza registros existentes no banco. |
| 55 | `  ELSE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `    DELETE FROM public.workspace_memberships` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `    WHERE workspace_id = marketing_id AND user_id = target_user_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 60 | `  RETURN enabled;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 64 | `DROP POLICY IF EXISTS memberships_admin_manage ON public.workspace_memberships;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 65 | `CREATE POLICY memberships_admin_manage` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 66 | `  ON public.workspace_memberships` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `  FOR ALL TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 69 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 70 | `    AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `      workspace_id <> (SELECT id FROM public.workspaces WHERE slug = 'marketing')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `      OR EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `        SELECT 1 FROM public.profiles` | Consulta dados ou valida uma condicao no banco. |
| 74 | `        WHERE id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `          AND lower(email) = 'reinangrupoahouse@gmail.com'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 76 | `      )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 77 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 78 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 79 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 80 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 81 | `    AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 82 | `      workspace_id <> (SELECT id FROM public.workspaces WHERE slug = 'marketing')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 83 | `      OR EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 84 | `        SELECT 1 FROM public.profiles` | Consulta dados ou valida uma condicao no banco. |
| 85 | `        WHERE id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 86 | `          AND lower(email) = 'reinangrupoahouse@gmail.com'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 87 | `      )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 88 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 89 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 90 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 91 | `GRANT EXECUTE ON FUNCTION public.set_marketing_user_access(uuid, boolean) TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 92 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 93 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
