# supabase/migrations/20260826150000_create_shared_agenda.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Shared company agenda.  Google Calendar identifiers are intentionally optional` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- until the OAuth/sync service is configured.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `CREATE TABLE IF NOT EXISTS public.calendar_events (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 4 | `  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 5 | `  title TEXT NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 240),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  description TEXT,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  starts_at TIMESTAMPTZ NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  ends_at TIMESTAMPTZ NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  is_all_day BOOLEAN NOT NULL DEFAULT false,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  location TEXT,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  meeting_url TEXT,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `  color TEXT NOT NULL DEFAULT '#2563eb' CHECK (color ~ '^#[0-9A-Fa-f]{6}$'),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,` | Define relacionamento entre tabelas por chave estrangeira. |
| 14 | `  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,` | Atualiza registros existentes no banco. |
| 15 | `  source TEXT NOT NULL DEFAULT 'taskflow' CHECK (source IN ('taskflow', 'google')),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `  google_event_id TEXT UNIQUE,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `  google_calendar_id TEXT,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `  google_etag TEXT,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `  google_updated_at TIMESTAMPTZ,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  sync_status TEXT NOT NULL DEFAULT 'not_configured'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `    CHECK (sync_status IN ('not_configured', 'pending', 'synced', 'error')),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `  sync_error TEXT,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `  deleted_at TIMESTAMPTZ,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `  deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,` | Define relacionamento entre tabelas por chave estrangeira. |
| 25 | `  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),` | Atualiza registros existentes no banco. |
| 27 | `  CONSTRAINT calendar_events_valid_interval CHECK (ends_at > starts_at)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 30 | `CREATE INDEX IF NOT EXISTS calendar_events_active_interval_idx` | Cria indice para acelerar consultas frequentes. |
| 31 | `  ON public.calendar_events (starts_at, ends_at)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `  WHERE deleted_at IS NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 34 | `CREATE INDEX IF NOT EXISTS calendar_events_google_lookup_idx` | Cria indice para acelerar consultas frequentes. |
| 35 | `  ON public.calendar_events (google_calendar_id, google_event_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `  WHERE google_event_id IS NOT NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 38 | `ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 39 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 40 | `-- The Agenda is deliberately a collaborative area: administrators and` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 41 | `-- collaborators have the same full access, while client accounts have none.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 42 | `CREATE POLICY calendar_events_team_select` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 43 | `  ON public.calendar_events FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 49 | `CREATE POLICY calendar_events_team_insert` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 50 | `  ON public.calendar_events FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `    (public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `      OR public.has_role(auth.uid(), 'collaborator'::public.app_role))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `    AND created_by = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `    AND (updated_by IS NULL OR updated_by = auth.uid())` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 58 | `CREATE POLICY calendar_events_team_update` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 59 | `  ON public.calendar_events FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 64 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 69 | `CREATE OR REPLACE FUNCTION public.set_calendar_event_updated_at()` | Define uma funcao no banco para reutilizar logica SQL. |
| 70 | `RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `  NEW.updated_at = now();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 74 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 76 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 77 | `DROP TRIGGER IF EXISTS trg_calendar_events_updated_at ON public.calendar_events;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 78 | `CREATE TRIGGER trg_calendar_events_updated_at` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 79 | `  BEFORE UPDATE ON public.calendar_events` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 80 | `  FOR EACH ROW EXECUTE FUNCTION public.set_calendar_event_updated_at();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 81 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 82 | `-- Existing team accounts receive the new module automatically.  Client portal` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 83 | `-- accounts remain excluded.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 84 | `UPDATE public.user_permissions AS permissions` | Atualiza registros existentes no banco. |
| 85 | `SET permissions = array_append(permissions.permissions, 'agenda'), updated_at = now()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 86 | `WHERE NOT ('agenda' = ANY(permissions.permissions))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 87 | `  AND EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 88 | `    SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 89 | `    FROM public.user_roles roles` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 90 | `    WHERE roles.user_id = permissions.user_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 91 | `      AND roles.role IN ('admin'::public.app_role, 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 92 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 93 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 94 | `-- The new shared calendar should update open Agenda screens in other tabs.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 95 | `DO $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 96 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 97 | `  ALTER PUBLICATION supabase_realtime ADD TABLE public.calendar_events;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 98 | `EXCEPTION` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 99 | `  WHEN duplicate_object THEN NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 100 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 101 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 102 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
