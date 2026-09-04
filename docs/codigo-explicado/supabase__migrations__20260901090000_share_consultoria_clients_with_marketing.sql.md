# supabase/migrations/20260901090000_share_consultoria_clients_with_marketing.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Marketing shares the client directory with Consultoria, but never its work.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- Only basic client information is mirrored. Tasks, notes, files, invoices,` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- departments and every activity record remain in their original workspace.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `ALTER TABLE public.clients` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 6 | `  ADD COLUMN IF NOT EXISTS source_client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL;` | Define relacionamento entre tabelas por chave estrangeira. |
| 7 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 8 | `CREATE UNIQUE INDEX IF NOT EXISTS clients_workspace_source_client_idx` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  ON public.clients (workspace_id, source_client_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  WHERE source_client_id IS NOT NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 12 | `CREATE OR REPLACE FUNCTION public.sync_consultoria_client_to_marketing()` | Define uma funcao no banco para reutilizar logica SQL. |
| 13 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `  consultoria_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  marketing_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `  SELECT id INTO consultoria_id FROM public.workspaces WHERE slug = 'consultoria';` | Consulta dados ou valida uma condicao no banco. |
| 23 | `  SELECT id INTO marketing_id FROM public.workspaces WHERE slug = 'marketing';` | Consulta dados ou valida uma condicao no banco. |
| 24 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 25 | `  IF NEW.workspace_id <> consultoria_id OR NEW.source_client_id IS NOT NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `    RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 29 | `  INSERT INTO public.clients (` | Insere dados iniciais ou registros de apoio. |
| 30 | `    workspace_id, source_client_id, name, color, description, created_by,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `    cnpj, legal_name, trade_name, state_registration, municipal_registration,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `    address, phone, email, responsible, avatar_path, is_active` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `  ) VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `    marketing_id, NEW.id, NEW.name, NEW.color, NEW.description, NEW.created_by,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `    NEW.cnpj, NEW.legal_name, NEW.trade_name, NEW.state_registration,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `    NEW.municipal_registration, NEW.address, NEW.phone, NEW.email,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `    NEW.responsible, NEW.avatar_path, NEW.is_active` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `  ON CONFLICT (workspace_id, source_client_id) WHERE source_client_id IS NOT NULL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `  DO UPDATE SET` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `    name = EXCLUDED.name,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `    color = EXCLUDED.color,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `    description = EXCLUDED.description,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `    cnpj = EXCLUDED.cnpj,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `    legal_name = EXCLUDED.legal_name,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `    trade_name = EXCLUDED.trade_name,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `    state_registration = EXCLUDED.state_registration,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `    municipal_registration = EXCLUDED.municipal_registration,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `    address = EXCLUDED.address,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `    phone = EXCLUDED.phone,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `    email = EXCLUDED.email,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `    responsible = EXCLUDED.responsible,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `    avatar_path = EXCLUDED.avatar_path,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `    is_active = EXCLUDED.is_active;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 56 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 60 | `-- The mirror is written by the trusted trigger above. A normal browser write` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 61 | `-- is still limited to its active environment.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 62 | `CREATE OR REPLACE FUNCTION public.assign_current_workspace()` | Define uma funcao no banco para reutilizar logica SQL. |
| 63 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 64 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 69 | `  marketing_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 70 | `  consultoria_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `  is_directory_mirror boolean := false;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `  IF auth.uid() IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 74 | `    RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 76 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 77 | `  IF NEW.workspace_id IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 78 | `    NEW.workspace_id := public.current_workspace_id();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 79 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 80 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 81 | `  IF TG_TABLE_NAME = 'clients'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 82 | `     AND pg_trigger_depth() > 1` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 83 | `     AND NEW.source_client_id IS NOT NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 84 | `    SELECT id INTO marketing_id FROM public.workspaces WHERE slug = 'marketing';` | Consulta dados ou valida uma condicao no banco. |
| 85 | `    SELECT id INTO consultoria_id FROM public.workspaces WHERE slug = 'consultoria';` | Consulta dados ou valida uma condicao no banco. |
| 86 | `    is_directory_mirror := NEW.workspace_id = marketing_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 87 | `      AND EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 88 | `        SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 89 | `        FROM public.clients AS source_client` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 90 | `        WHERE source_client.id = NEW.source_client_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 91 | `          AND source_client.workspace_id = consultoria_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 92 | `      );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 93 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 94 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 95 | `  IF NOT public.has_workspace_access(NEW.workspace_id) AND NOT is_directory_mirror THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 96 | `    RAISE EXCEPTION 'You cannot write records in this TaskFlow environment';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 97 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 98 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 99 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 100 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 101 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 102 | `DROP TRIGGER IF EXISTS trg_sync_consultoria_client_to_marketing ON public.clients;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 103 | `CREATE TRIGGER trg_sync_consultoria_client_to_marketing` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 104 | `  AFTER INSERT OR UPDATE OF name, color, description, cnpj, legal_name,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 105 | `  trade_name, state_registration, municipal_registration, address, phone,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 106 | `  email, responsible, avatar_path, is_active` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 107 | `  ON public.clients` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 108 | `  FOR EACH ROW EXECUTE FUNCTION public.sync_consultoria_client_to_marketing();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 109 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 110 | `-- Copy the current directory once. The linked source id prevents duplicates.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 111 | `INSERT INTO public.clients (` | Insere dados iniciais ou registros de apoio. |
| 112 | `  workspace_id, source_client_id, name, color, description, created_by,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 113 | `  cnpj, legal_name, trade_name, state_registration, municipal_registration,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 114 | `  address, phone, email, responsible, avatar_path, is_active` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 115 | `)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 116 | `SELECT` | Consulta dados ou valida uma condicao no banco. |
| 117 | `  (SELECT id FROM public.workspaces WHERE slug = 'marketing'),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 118 | `  client.id, client.name, client.color, client.description, client.created_by,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 119 | `  client.cnpj, client.legal_name, client.trade_name, client.state_registration,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 120 | `  client.municipal_registration, client.address, client.phone, client.email,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 121 | `  client.responsible, client.avatar_path, client.is_active` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 122 | `FROM public.clients AS client` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 123 | `WHERE client.workspace_id = (SELECT id FROM public.workspaces WHERE slug = 'consultoria')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 124 | `  AND client.source_client_id IS NULL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 125 | `ON CONFLICT (workspace_id, source_client_id) WHERE source_client_id IS NOT NULL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 126 | `DO UPDATE SET` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 127 | `  name = EXCLUDED.name,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 128 | `  color = EXCLUDED.color,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 129 | `  description = EXCLUDED.description,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 130 | `  cnpj = EXCLUDED.cnpj,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 131 | `  legal_name = EXCLUDED.legal_name,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 132 | `  trade_name = EXCLUDED.trade_name,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 133 | `  state_registration = EXCLUDED.state_registration,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 134 | `  municipal_registration = EXCLUDED.municipal_registration,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 135 | `  address = EXCLUDED.address,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 136 | `  phone = EXCLUDED.phone,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 137 | `  email = EXCLUDED.email,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 138 | `  responsible = EXCLUDED.responsible,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 139 | `  avatar_path = EXCLUDED.avatar_path,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 140 | `  is_active = EXCLUDED.is_active;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 141 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 142 | `-- Marketing is private for now: only Reinan keeps access. Before removing an` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 143 | `-- old membership, send that person back to Consultoria so nobody is stranded.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 144 | `UPDATE public.profiles` | Atualiza registros existentes no banco. |
| 145 | `SET active_workspace_id = (SELECT id FROM public.workspaces WHERE slug = 'consultoria')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 146 | `WHERE active_workspace_id = (SELECT id FROM public.workspaces WHERE slug = 'marketing')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 147 | `  AND lower(email) <> 'reinangrupoahouse@gmail.com';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 148 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 149 | `DELETE FROM public.workspace_memberships` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 150 | `WHERE workspace_id = (SELECT id FROM public.workspaces WHERE slug = 'marketing')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 151 | `  AND user_id <> (SELECT id FROM public.profiles WHERE lower(email) = 'reinangrupoahouse@gmail.com' LIMIT 1);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 152 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 153 | `INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions)` | Insere dados iniciais ou registros de apoio. |
| 154 | `SELECT` | Consulta dados ou valida uma condicao no banco. |
| 155 | `  (SELECT id FROM public.workspaces WHERE slug = 'marketing'),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 156 | `  id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 157 | `  'admin'::public.app_role,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 158 | `  ARRAY['dashboard','tasks','requests','import_ata','clients','reports','mural','agenda','portal_entregas','portal_financeiro','users','trash','settings']::text[]` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 159 | `FROM public.profiles` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 160 | `WHERE lower(email) = 'reinangrupoahouse@gmail.com'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 161 | `ON CONFLICT (workspace_id, user_id) DO UPDATE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 162 | `SET role = EXCLUDED.role, permissions = EXCLUDED.permissions, updated_at = now();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 163 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 164 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 165 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
