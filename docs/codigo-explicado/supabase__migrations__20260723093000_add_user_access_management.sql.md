# supabase/migrations/20260723093000_add_user_access_management.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- User categories and per-user application access managed by administrators.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `ALTER TYPE public.app_role RENAME VALUE 'member' TO 'collaborator';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 3 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 4 | `CREATE TABLE IF NOT EXISTS public.user_permissions (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 5 | `  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 6 | `  permissions TEXT[] NOT NULL DEFAULT ARRAY['dashboard', 'tasks', 'notes']::TEXT[],` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),` | Atualiza registros existentes no banco. |
| 8 | `  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL` | Atualiza registros existentes no banco. |
| 9 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 11 | `GRANT SELECT ON public.user_permissions TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `GRANT ALL ON public.user_permissions TO service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `ALTER TABLE public.user_permissions ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 14 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 15 | `CREATE POLICY user_permissions_select_own_or_admin` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 16 | `  ON public.user_permissions FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'::public.app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 19 | `CREATE POLICY user_permissions_admin_manage` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 20 | `  ON public.user_permissions FOR ALL TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `  USING (public.has_role(auth.uid(), 'admin'::public.app_role))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 24 | `CREATE OR REPLACE FUNCTION public.set_user_permissions_updated_at()` | Define uma funcao no banco para reutilizar logica SQL. |
| 25 | `RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `  NEW.updated_at = now();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 32 | `CREATE TRIGGER trg_user_permissions_updated_at` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 33 | `  BEFORE UPDATE ON public.user_permissions` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `  FOR EACH ROW EXECUTE FUNCTION public.set_user_permissions_updated_at();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 36 | `-- Existing collaborators keep the complete operational access they had before this feature.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 37 | `INSERT INTO public.user_permissions (user_id, permissions)` | Insere dados iniciais ou registros de apoio. |
| 38 | `SELECT user_id, ARRAY['dashboard', 'tasks', 'notes', 'import_ata', 'clients', 'portal', 'calendar', 'trash', 'settings']::TEXT[]` | Consulta dados ou valida uma condicao no banco. |
| 39 | `FROM public.user_roles` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `WHERE role = 'collaborator'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `ON CONFLICT (user_id) DO NOTHING;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 43 | `CREATE OR REPLACE FUNCTION public.handle_new_user()` | Define uma funcao no banco para reutilizar logica SQL. |
| 44 | `RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `  user_count INT;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `  assigned_role public.app_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `  INSERT INTO public.profiles (id, full_name, email)` | Insere dados iniciais ou registros de apoio. |
| 50 | `  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)), NEW.email);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 52 | `  SELECT COUNT(*) INTO user_count FROM public.profiles;` | Consulta dados ou valida uma condicao no banco. |
| 53 | `  assigned_role := CASE WHEN user_count = 1 THEN 'admin'::public.app_role ELSE COALESCE((NEW.raw_user_meta_data->>'role')::public.app_role, 'collaborator'::public.app_role) END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, assigned_role);` | Insere dados iniciais ou registros de apoio. |
| 55 | `  INSERT INTO public.user_permissions (user_id, permissions)` | Insere dados iniciais ou registros de apoio. |
| 56 | `  VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `    NEW.id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `    CASE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `      WHEN assigned_role = 'admin' THEN ARRAY['dashboard', 'tasks', 'notes', 'import_ata', 'clients', 'reports', 'portal', 'calendar', 'users', 'trash', 'settings']::TEXT[]` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `      WHEN assigned_role = 'client' THEN ARRAY['portal']::TEXT[]` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `      ELSE ARRAY['dashboard', 'tasks', 'notes']::TEXT[]` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `    END` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 64 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
