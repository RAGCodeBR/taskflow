# supabase/migrations/20260827190000_create_service_requests.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Solicitações: tickets internos/clientes com conversa, responsáveis e anexos.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `CREATE TABLE IF NOT EXISTS public.service_requests (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 3 | `  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 4 | `  title text NOT NULL CHECK (char_length(trim(title)) > 0),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `  description text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,` | Define relacionamento entre tabelas por chave estrangeira. |
| 9 | `  due_date date,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  created_by uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,` | Define relacionamento entre tabelas por chave estrangeira. |
| 11 | `  resolved_at timestamptz,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `  created_at timestamptz NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `  updated_at timestamptz NOT NULL DEFAULT now()` | Atualiza registros existentes no banco. |
| 14 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 16 | `CREATE TABLE IF NOT EXISTS public.service_request_messages (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 17 | `  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 18 | `  request_id uuid NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 19 | `  body text NOT NULL CHECK (char_length(trim(body)) > 0),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  author_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,` | Define relacionamento entre tabelas por chave estrangeira. |
| 21 | `  created_at timestamptz NOT NULL DEFAULT now()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 24 | `CREATE TABLE IF NOT EXISTS public.service_request_participants (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 25 | `  request_id uuid NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 26 | `  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 27 | `  added_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,` | Define relacionamento entre tabelas por chave estrangeira. |
| 28 | `  created_at timestamptz NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `  PRIMARY KEY (request_id, user_id)` | Define identificador unico principal do registro. |
| 30 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 32 | `CREATE TABLE IF NOT EXISTS public.service_request_assignees (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 33 | `  request_id uuid NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 34 | `  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 35 | `  assigned_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,` | Define relacionamento entre tabelas por chave estrangeira. |
| 36 | `  created_at timestamptz NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `  PRIMARY KEY (request_id, user_id)` | Define identificador unico principal do registro. |
| 38 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 40 | `CREATE TABLE IF NOT EXISTS public.service_request_attachments (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 41 | `  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 42 | `  request_id uuid NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 43 | `  file_name text NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `  storage_path text NOT NULL UNIQUE,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `  mime_type text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `  size_bytes bigint,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `  uploaded_by uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,` | Define relacionamento entre tabelas por chave estrangeira. |
| 48 | `  created_at timestamptz NOT NULL DEFAULT now()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 51 | `CREATE TABLE IF NOT EXISTS public.service_request_activity (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 52 | `  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 53 | `  request_id uuid NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 54 | `  actor_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,` | Define relacionamento entre tabelas por chave estrangeira. |
| 55 | `  kind text NOT NULL CHECK (kind IN ('created', 'status_changed', 'priority_changed', 'participant_added', 'assignee_added', 'attachment_added')),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `  details text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `  created_at timestamptz NOT NULL DEFAULT now()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 60 | `CREATE INDEX IF NOT EXISTS service_requests_updated_at_idx ON public.service_requests(updated_at DESC);` | Cria indice para acelerar consultas frequentes. |
| 61 | `CREATE INDEX IF NOT EXISTS service_request_messages_request_idx ON public.service_request_messages(request_id, created_at);` | Cria indice para acelerar consultas frequentes. |
| 62 | `CREATE INDEX IF NOT EXISTS service_request_activity_request_idx ON public.service_request_activity(request_id, created_at);` | Cria indice para acelerar consultas frequentes. |
| 63 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 64 | `CREATE OR REPLACE FUNCTION public.can_access_service_request(target_request_id uuid)` | Define uma funcao no banco para reutilizar logica SQL. |
| 65 | `RETURNS boolean` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `  SELECT EXISTS (` | Consulta dados ou valida uma condicao no banco. |
| 68 | `    SELECT 1 FROM public.service_requests request` | Consulta dados ou valida uma condicao no banco. |
| 69 | `    WHERE request.id = target_request_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 70 | `      AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `        NOT public.has_role(auth.uid(), 'client'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `        OR request.created_by = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `        OR EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 74 | `          SELECT 1 FROM public.service_request_participants participant` | Consulta dados ou valida uma condicao no banco. |
| 75 | `          WHERE participant.request_id = request.id AND participant.user_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 76 | `        )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 77 | `        OR EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 78 | `          SELECT 1 FROM public.client_user_links link` | Consulta dados ou valida uma condicao no banco. |
| 79 | `          WHERE link.client_id = request.client_id AND link.user_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 80 | `        )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 81 | `      )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 82 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 83 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 84 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 85 | `CREATE OR REPLACE FUNCTION public.touch_service_request()` | Define uma funcao no banco para reutilizar logica SQL. |
| 86 | `RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 87 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 88 | `  NEW.updated_at = now();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 89 | `  IF NEW.status = 'resolved' AND OLD.status IS DISTINCT FROM 'resolved' THEN NEW.resolved_at = now(); END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 90 | `  IF NEW.status <> 'resolved' THEN NEW.resolved_at = NULL; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 91 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 92 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 93 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 94 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 95 | `-- The authenticated identity is the source of truth for the creator. This` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 96 | `-- avoids rejecting legitimate inserts when a client-side profile is stale.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 97 | `CREATE OR REPLACE FUNCTION public.set_service_request_creator()` | Define uma funcao no banco para reutilizar logica SQL. |
| 98 | `RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 99 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 100 | `  IF auth.uid() IS NOT NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 101 | `    NEW.created_by = auth.uid();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 102 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 103 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 104 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 105 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 106 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 107 | `DROP TRIGGER IF EXISTS trg_service_requests_updated_at ON public.service_requests;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 108 | `CREATE TRIGGER trg_service_requests_updated_at BEFORE UPDATE ON public.service_requests` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 109 | `FOR EACH ROW EXECUTE FUNCTION public.touch_service_request();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 110 | `DROP TRIGGER IF EXISTS trg_service_requests_creator ON public.service_requests;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 111 | `CREATE TRIGGER trg_service_requests_creator BEFORE INSERT ON public.service_requests` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 112 | `FOR EACH ROW EXECUTE FUNCTION public.set_service_request_creator();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 113 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 114 | `ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 115 | `ALTER TABLE public.service_request_messages ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 116 | `ALTER TABLE public.service_request_participants ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 117 | `ALTER TABLE public.service_request_assignees ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 118 | `ALTER TABLE public.service_request_attachments ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 119 | `ALTER TABLE public.service_request_activity ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 120 | `GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_requests, public.service_request_messages, public.service_request_participants, public.service_request_assignees, public.service_request_attachments, public.service_request_activity TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 121 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 122 | `DROP POLICY IF EXISTS service_requests_read ON public.service_requests;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 123 | `DROP POLICY IF EXISTS service_requests_create ON public.service_requests;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 124 | `DROP POLICY IF EXISTS service_requests_update ON public.service_requests;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 125 | `DROP POLICY IF EXISTS service_requests_delete ON public.service_requests;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 126 | `DROP POLICY IF EXISTS service_request_messages_read ON public.service_request_messages;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 127 | `DROP POLICY IF EXISTS service_request_messages_create ON public.service_request_messages;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 128 | `DROP POLICY IF EXISTS service_request_messages_delete ON public.service_request_messages;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 129 | `DROP POLICY IF EXISTS service_request_participants_read ON public.service_request_participants;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 130 | `DROP POLICY IF EXISTS service_request_participants_write ON public.service_request_participants;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 131 | `DROP POLICY IF EXISTS service_request_assignees_read ON public.service_request_assignees;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 132 | `DROP POLICY IF EXISTS service_request_assignees_write ON public.service_request_assignees;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 133 | `DROP POLICY IF EXISTS service_request_attachments_read ON public.service_request_attachments;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 134 | `DROP POLICY IF EXISTS service_request_attachments_create ON public.service_request_attachments;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 135 | `DROP POLICY IF EXISTS service_request_attachments_delete ON public.service_request_attachments;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 136 | `DROP POLICY IF EXISTS service_request_activity_read ON public.service_request_activity;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 137 | `DROP POLICY IF EXISTS service_request_activity_create ON public.service_request_activity;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 138 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 139 | `CREATE POLICY service_requests_read ON public.service_requests FOR SELECT TO authenticated USING (public.can_access_service_request(id));` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 140 | `-- \`created_by\` is assigned by trg_service_requests_creator.  The RLS check` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 141 | `-- only needs to assert that this is an authenticated application request;` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 142 | `-- checking a browser-provided creator before the trigger runs can reject a` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 143 | `-- valid ticket when the session/profile was refreshed out of sequence.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 144 | `CREATE POLICY service_requests_create ON public.service_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 145 | `CREATE POLICY service_requests_update ON public.service_requests FOR UPDATE TO authenticated USING (public.can_access_service_request(id)) WITH CHECK (public.can_access_service_request(id));` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 146 | `CREATE POLICY service_requests_delete ON public.service_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role) OR created_by = auth.uid());` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 147 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 148 | `CREATE POLICY service_request_messages_read ON public.service_request_messages FOR SELECT TO authenticated USING (public.can_access_service_request(request_id));` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 149 | `CREATE POLICY service_request_messages_create ON public.service_request_messages FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid() AND public.can_access_service_request(request_id));` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 150 | `CREATE POLICY service_request_messages_delete ON public.service_request_messages FOR DELETE TO authenticated USING (author_id = auth.uid() OR public.has_role(auth.uid(), 'admin'::public.app_role));` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 151 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 152 | `CREATE POLICY service_request_participants_read ON public.service_request_participants FOR SELECT TO authenticated USING (public.can_access_service_request(request_id));` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 153 | `CREATE POLICY service_request_participants_write ON public.service_request_participants FOR ALL TO authenticated USING (public.can_access_service_request(request_id)) WITH CHECK (public.can_access_service_request(request_id));` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 154 | `CREATE POLICY service_request_assignees_read ON public.service_request_assignees FOR SELECT TO authenticated USING (public.can_access_service_request(request_id));` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 155 | `CREATE POLICY service_request_assignees_write ON public.service_request_assignees FOR ALL TO authenticated USING (public.can_access_service_request(request_id)) WITH CHECK (public.can_access_service_request(request_id));` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 156 | `CREATE POLICY service_request_attachments_read ON public.service_request_attachments FOR SELECT TO authenticated USING (public.can_access_service_request(request_id));` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 157 | `CREATE POLICY service_request_attachments_create ON public.service_request_attachments FOR INSERT TO authenticated WITH CHECK (uploaded_by = auth.uid() AND public.can_access_service_request(request_id));` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 158 | `CREATE POLICY service_request_attachments_delete ON public.service_request_attachments FOR DELETE TO authenticated USING (uploaded_by = auth.uid() OR public.has_role(auth.uid(), 'admin'::public.app_role));` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 159 | `CREATE POLICY service_request_activity_read ON public.service_request_activity FOR SELECT TO authenticated USING (public.can_access_service_request(request_id));` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 160 | `CREATE POLICY service_request_activity_create ON public.service_request_activity FOR INSERT TO authenticated WITH CHECK (actor_id = auth.uid() AND public.can_access_service_request(request_id));` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 161 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 162 | `INSERT INTO storage.buckets (id, name, public, file_size_limit)` | Insere dados iniciais ou registros de apoio. |
| 163 | `VALUES ('service-request-attachments', 'service-request-attachments', false, 52428800)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 164 | `ON CONFLICT (id) DO UPDATE SET file_size_limit = EXCLUDED.file_size_limit;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 165 | `DROP POLICY IF EXISTS service_request_files_read ON storage.objects;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 166 | `DROP POLICY IF EXISTS service_request_files_upload ON storage.objects;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 167 | `DROP POLICY IF EXISTS service_request_files_delete ON storage.objects;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 168 | `CREATE POLICY service_request_files_read ON storage.objects FOR SELECT TO authenticated` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 169 | `USING (bucket_id = 'service-request-attachments');` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 170 | `CREATE POLICY service_request_files_upload ON storage.objects FOR INSERT TO authenticated` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 171 | `WITH CHECK (bucket_id = 'service-request-attachments' AND owner = auth.uid());` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 172 | `CREATE POLICY service_request_files_delete ON storage.objects FOR DELETE TO authenticated` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 173 | `USING (bucket_id = 'service-request-attachments' AND owner = auth.uid());` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 174 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 175 | `-- Existing accounts receive the menu permission immediately. New accounts keep` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 176 | `-- their role-specific defaults and administrators can still revoke it in Usuários.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 177 | `UPDATE public.user_permissions` | Atualiza registros existentes no banco. |
| 178 | `SET permissions = array_append(permissions, 'requests')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 179 | `WHERE NOT ('requests' = ANY(permissions));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 180 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
