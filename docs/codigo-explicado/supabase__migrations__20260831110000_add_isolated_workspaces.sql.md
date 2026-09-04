# supabase/migrations/20260831110000_add_isolated_workspaces.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- TaskFlow workspaces: Consultoria keeps every existing record and Marketing` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- starts empty. The active workspace lives on the profile and is validated by` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- membership before it can be changed.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `CREATE TABLE IF NOT EXISTS public.workspaces (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 6 | `  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 7 | `  slug TEXT NOT NULL UNIQUE CHECK (slug IN ('consultoria', 'marketing')),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  name TEXT NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  created_at TIMESTAMPTZ NOT NULL DEFAULT now()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 12 | `INSERT INTO public.workspaces (slug, name)` | Insere dados iniciais ou registros de apoio. |
| 13 | `VALUES ('consultoria', 'Consultoria'), ('marketing', 'Marketing')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 16 | `CREATE TABLE IF NOT EXISTS public.workspace_memberships (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 17 | `  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 18 | `  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 19 | `  role public.app_role NOT NULL DEFAULT 'collaborator'::public.app_role,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  permissions TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),` | Atualiza registros existentes no banco. |
| 23 | `  PRIMARY KEY (workspace_id, user_id)` | Define identificador unico principal do registro. |
| 24 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 26 | `ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS active_workspace_id UUID REFERENCES public.workspaces(id);` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `-- Existing users and records remain in Consultoria. Admins can immediately` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 29 | `-- access both environments; the Users screen will manage future memberships.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 30 | `INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions)` | Insere dados iniciais ou registros de apoio. |
| 31 | `SELECT w.id, r.user_id, r.role, COALESCE(p.permissions, ARRAY[]::TEXT[])` | Consulta dados ou valida uma condicao no banco. |
| 32 | `FROM public.user_roles r` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `CROSS JOIN public.workspaces w` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `LEFT JOIN public.user_permissions p ON p.user_id = r.user_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `WHERE w.slug = 'consultoria'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `ON CONFLICT (workspace_id, user_id) DO NOTHING;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 38 | `INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions)` | Insere dados iniciais ou registros de apoio. |
| 39 | `SELECT w.id, r.user_id, r.role,` | Consulta dados ou valida uma condicao no banco. |
| 40 | `  ARRAY['dashboard','tasks','requests','import_ata','clients','reports','mural','agenda','portal_entregas','portal_financeiro','users','trash','settings']::TEXT[]` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `FROM public.user_roles r` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `CROSS JOIN public.workspaces w` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `WHERE w.slug = 'marketing' AND r.role = 'admin'::public.app_role` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `ON CONFLICT (workspace_id, user_id) DO NOTHING;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 46 | `UPDATE public.profiles p` | Atualiza registros existentes no banco. |
| 47 | `SET active_workspace_id = w.id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `FROM public.workspaces w` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `WHERE w.slug = 'consultoria' AND p.active_workspace_id IS NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 51 | `CREATE OR REPLACE FUNCTION public.current_workspace_id()` | Define uma funcao no banco para reutilizar logica SQL. |
| 52 | `RETURNS UUID` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `  SELECT active_workspace_id FROM public.profiles WHERE id = auth.uid()` | Consulta dados ou valida uma condicao no banco. |
| 56 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 58 | `CREATE OR REPLACE FUNCTION public.has_workspace_access(_workspace_id UUID)` | Define uma funcao no banco para reutilizar logica SQL. |
| 59 | `RETURNS BOOLEAN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `  SELECT _workspace_id IS NOT NULL` | Consulta dados ou valida uma condicao no banco. |
| 63 | `    AND _workspace_id = public.current_workspace_id()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 64 | `    AND EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `      SELECT 1 FROM public.workspace_memberships` | Consulta dados ou valida uma condicao no banco. |
| 66 | `      WHERE workspace_id = _workspace_id AND user_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 69 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 70 | `CREATE OR REPLACE FUNCTION public.can_change_active_workspace()` | Define uma funcao no banco para reutilizar logica SQL. |
| 71 | `RETURNS TRIGGER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `LANGUAGE plpgsql SECURITY DEFINER SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 74 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `  IF auth.uid() IS NULL THEN RETURN NEW; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 76 | `  IF NEW.active_workspace_id IS DISTINCT FROM OLD.active_workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 77 | `     AND NOT EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 78 | `       SELECT 1 FROM public.workspace_memberships` | Consulta dados ou valida uma condicao no banco. |
| 79 | `       WHERE workspace_id = NEW.active_workspace_id AND user_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 80 | `     ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 81 | `    RAISE EXCEPTION 'You do not have access to this TaskFlow environment';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 82 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 83 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 84 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 85 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 86 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 87 | `DROP TRIGGER IF EXISTS trg_profiles_active_workspace ON public.profiles;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 88 | `CREATE TRIGGER trg_profiles_active_workspace` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 89 | `  BEFORE UPDATE OF active_workspace_id ON public.profiles` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 90 | `  FOR EACH ROW EXECUTE FUNCTION public.can_change_active_workspace();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 91 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 92 | `CREATE OR REPLACE FUNCTION public.add_profile_to_consultoria()` | Define uma funcao no banco para reutilizar logica SQL. |
| 93 | `RETURNS TRIGGER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 94 | `LANGUAGE plpgsql SECURITY DEFINER SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 95 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 96 | `DECLARE consultoria_id UUID;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 97 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 98 | `  SELECT id INTO consultoria_id FROM public.workspaces WHERE slug = 'consultoria';` | Consulta dados ou valida uma condicao no banco. |
| 99 | `  INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions)` | Insere dados iniciais ou registros de apoio. |
| 100 | `  VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 101 | `    consultoria_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 102 | `    NEW.id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 103 | `    COALESCE((SELECT role FROM public.user_roles WHERE user_id = NEW.id LIMIT 1), 'collaborator'::public.app_role),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 104 | `    COALESCE((SELECT permissions FROM public.user_permissions WHERE user_id = NEW.id), ARRAY[]::TEXT[])` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 105 | `  ) ON CONFLICT DO NOTHING;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 106 | `  UPDATE public.profiles SET active_workspace_id = consultoria_id WHERE id = NEW.id;` | Atualiza registros existentes no banco. |
| 107 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 108 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 109 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 110 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 111 | `DROP TRIGGER IF EXISTS trg_profiles_default_workspace ON public.profiles;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 112 | `CREATE TRIGGER trg_profiles_default_workspace` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 113 | `  AFTER INSERT ON public.profiles` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 114 | `  FOR EACH ROW EXECUTE FUNCTION public.add_profile_to_consultoria();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 115 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 116 | `ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 117 | `ALTER TABLE public.workspace_memberships ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 118 | `GRANT SELECT ON public.workspaces, public.workspace_memberships TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 119 | `GRANT ALL ON public.workspaces, public.workspace_memberships TO service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 120 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 121 | `DROP POLICY IF EXISTS workspaces_select_member ON public.workspaces;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 122 | `DROP POLICY IF EXISTS memberships_select_own_or_admin ON public.workspace_memberships;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 123 | `DROP POLICY IF EXISTS memberships_admin_manage ON public.workspace_memberships;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 124 | `CREATE POLICY workspaces_select_member ON public.workspaces FOR SELECT TO authenticated` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 125 | `  USING (EXISTS (SELECT 1 FROM public.workspace_memberships m WHERE m.workspace_id = id AND m.user_id = auth.uid()));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 126 | `CREATE POLICY memberships_select_own_or_admin ON public.workspace_memberships FOR SELECT TO authenticated` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 127 | `  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'::public.app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 128 | `CREATE POLICY memberships_admin_manage ON public.workspace_memberships FOR ALL TO authenticated` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 129 | `  USING (public.has_role(auth.uid(), 'admin'::public.app_role))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 130 | `  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 131 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 132 | `-- Root records own their workspace. All former data is backfilled into` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 133 | `-- Consultoria. Child records stay protected through their parent RLS policy.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 134 | `ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 135 | `ALTER TABLE public.kanban_columns ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 136 | `ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 137 | `ALTER TABLE public.task_tags ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 138 | `ALTER TABLE public.task_statuses ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 139 | `ALTER TABLE public.mural_posts ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 140 | `ALTER TABLE public.calendar_events ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 141 | `ALTER TABLE public.service_requests ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 142 | `ALTER TABLE public.board_preferences ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 143 | `ALTER TABLE public.user_column_order ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 144 | `ALTER TABLE public.user_task_order ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 145 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 146 | `DO $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 147 | `DECLARE consultoria_id UUID;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 148 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 149 | `  SELECT id INTO consultoria_id FROM public.workspaces WHERE slug = 'consultoria';` | Consulta dados ou valida uma condicao no banco. |
| 150 | `  UPDATE public.clients SET workspace_id = consultoria_id WHERE workspace_id IS NULL;` | Atualiza registros existentes no banco. |
| 151 | `  UPDATE public.kanban_columns SET workspace_id = consultoria_id WHERE workspace_id IS NULL;` | Atualiza registros existentes no banco. |
| 152 | `  UPDATE public.tasks SET workspace_id = consultoria_id WHERE workspace_id IS NULL;` | Atualiza registros existentes no banco. |
| 153 | `  UPDATE public.task_tags SET workspace_id = consultoria_id WHERE workspace_id IS NULL;` | Atualiza registros existentes no banco. |
| 154 | `  UPDATE public.task_statuses SET workspace_id = consultoria_id WHERE workspace_id IS NULL;` | Atualiza registros existentes no banco. |
| 155 | `  UPDATE public.mural_posts SET workspace_id = consultoria_id WHERE workspace_id IS NULL;` | Atualiza registros existentes no banco. |
| 156 | `  UPDATE public.calendar_events SET workspace_id = consultoria_id WHERE workspace_id IS NULL;` | Atualiza registros existentes no banco. |
| 157 | `  UPDATE public.service_requests SET workspace_id = consultoria_id WHERE workspace_id IS NULL;` | Atualiza registros existentes no banco. |
| 158 | `  UPDATE public.board_preferences SET workspace_id = consultoria_id WHERE workspace_id IS NULL;` | Atualiza registros existentes no banco. |
| 159 | `  UPDATE public.user_column_order SET workspace_id = consultoria_id WHERE workspace_id IS NULL;` | Atualiza registros existentes no banco. |
| 160 | `  UPDATE public.user_task_order SET workspace_id = consultoria_id WHERE workspace_id IS NULL;` | Atualiza registros existentes no banco. |
| 161 | `END $$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 162 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 163 | `CREATE OR REPLACE FUNCTION public.assign_current_workspace()` | Define uma funcao no banco para reutilizar logica SQL. |
| 164 | `RETURNS TRIGGER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 165 | `LANGUAGE plpgsql SECURITY DEFINER SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 166 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 167 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 168 | `  -- Database migrations and trusted server jobs run without an end-user JWT.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 169 | `  IF auth.uid() IS NULL THEN RETURN NEW; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 170 | `  IF NEW.workspace_id IS NULL THEN NEW.workspace_id := public.current_workspace_id(); END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 171 | `  IF NOT public.has_workspace_access(NEW.workspace_id) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 172 | `    RAISE EXCEPTION 'You cannot write records in this TaskFlow environment';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 173 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 174 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 175 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 176 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 177 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 178 | `DO $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 179 | `DECLARE tbl TEXT;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 180 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 181 | `  FOREACH tbl IN ARRAY ARRAY['clients','kanban_columns','tasks','task_tags','task_statuses','mural_posts','calendar_events','service_requests','board_preferences','user_column_order','user_task_order'] LOOP` | Define relacionamento entre tabelas por chave estrangeira. |
| 182 | `    EXECUTE format('DROP TRIGGER IF EXISTS trg_assign_workspace ON public.%I', tbl);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 183 | `    EXECUTE format('CREATE TRIGGER trg_assign_workspace BEFORE INSERT OR UPDATE OF workspace_id ON public.%I FOR EACH ROW EXECUTE FUNCTION public.assign_current_workspace()', tbl);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 184 | `  END LOOP;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 185 | `END $$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 186 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 187 | `-- Existing policies were permissive and are replaced only for the workspace` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 188 | `-- root tables. A policy cannot tighten another permissive policy, so remove` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 189 | `-- every legacy policy on these tables before creating the scoped policy.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 190 | `DO $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 191 | `DECLARE p RECORD;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 192 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 193 | `  FOR p IN SELECT tablename, policyname FROM pg_policies` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 194 | `    WHERE schemaname = 'public'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 195 | `      AND tablename IN ('clients','kanban_columns','tasks','task_tags','task_statuses','mural_posts','calendar_events','service_requests','board_preferences','user_column_order','user_task_order')` | Define relacionamento entre tabelas por chave estrangeira. |
| 196 | `  LOOP` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 197 | `    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', p.policyname, p.tablename);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 198 | `  END LOOP;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 199 | `END $$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 200 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 201 | `DO $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 202 | `DECLARE tbl TEXT;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 203 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 204 | `  FOREACH tbl IN ARRAY ARRAY['clients','kanban_columns','tasks','task_tags','task_statuses','mural_posts','calendar_events','service_requests'] LOOP` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 205 | `    EXECUTE format('CREATE POLICY workspace_%I_access ON public.%I FOR ALL TO authenticated USING (public.has_workspace_access(workspace_id)) WITH CHECK (public.has_workspace_access(workspace_id))', tbl, tbl);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 206 | `  END LOOP;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 207 | `  FOREACH tbl IN ARRAY ARRAY['board_preferences','user_column_order','user_task_order'] LOOP` | Define relacionamento entre tabelas por chave estrangeira. |
| 208 | `    EXECUTE format('CREATE POLICY workspace_%I_own ON public.%I FOR ALL TO authenticated USING (user_id = auth.uid() AND public.has_workspace_access(workspace_id)) WITH CHECK (user_id = auth.uid() AND public.has_workspace_access(workspace_id))', tbl, tbl);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 209 | `  END LOOP;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 210 | `END $$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 211 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 212 | `CREATE INDEX IF NOT EXISTS clients_workspace_idx ON public.clients(workspace_id);` | Cria indice para acelerar consultas frequentes. |
| 213 | `CREATE INDEX IF NOT EXISTS tasks_workspace_idx ON public.tasks(workspace_id);` | Cria indice para acelerar consultas frequentes. |
| 214 | `CREATE INDEX IF NOT EXISTS kanban_columns_workspace_idx ON public.kanban_columns(workspace_id);` | Cria indice para acelerar consultas frequentes. |
| 215 | `CREATE INDEX IF NOT EXISTS mural_posts_workspace_idx ON public.mural_posts(workspace_id);` | Cria indice para acelerar consultas frequentes. |
| 216 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 217 | `-- A usable empty Kanban configuration for Marketing.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 218 | `INSERT INTO public.kanban_columns (workspace_id, name, color, position)` | Insere dados iniciais ou registros de apoio. |
| 219 | `SELECT w.id, v.name, v.color, v.position` | Consulta dados ou valida uma condicao no banco. |
| 220 | `FROM public.workspaces w` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 221 | `CROSS JOIN (VALUES` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 222 | `  ('A Fazer', '#1e3a8a', 0),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 223 | `  ('Em Andamento', '#2563eb', 1),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 224 | `  ('Em Revisão', '#7c3aed', 2),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 225 | `  ('Concluído', '#059669', 3)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 226 | `) AS v(name, color, position)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 227 | `WHERE w.slug = 'marketing'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 228 | `  AND NOT EXISTS (SELECT 1 FROM public.kanban_columns c WHERE c.workspace_id = w.id);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 229 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 230 | `INSERT INTO public.task_statuses (workspace_id, name, color, position, is_completed, is_active)` | Insere dados iniciais ou registros de apoio. |
| 231 | `SELECT w.id, v.name, v.color, v.position, v.is_completed, true` | Consulta dados ou valida uma condicao no banco. |
| 232 | `FROM public.workspaces w` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 233 | `CROSS JOIN (VALUES` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 234 | `  ('A Fazer', '#1e3a8a', 0, false),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 235 | `  ('Em andamento', '#2563eb', 1, false),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 236 | `  ('Concluído', '#059669', 2, true)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 237 | `) AS v(name, color, position, is_completed)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 238 | `WHERE w.slug = 'marketing'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 239 | `  AND NOT EXISTS (SELECT 1 FROM public.task_statuses s WHERE s.workspace_id = w.id);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 240 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
