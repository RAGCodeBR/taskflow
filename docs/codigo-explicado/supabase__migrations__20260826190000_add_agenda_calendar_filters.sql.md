# supabase/migrations/20260826190000_add_agenda_calendar_filters.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Calendar metadata comes from Google Calendar's "My calendars" list. Each` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- user can hide a calendar in TaskFlow without changing its Google visibility.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `CREATE TABLE IF NOT EXISTS public.calendar_sources (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 4 | `  google_calendar_id TEXT PRIMARY KEY,` | Define identificador unico principal do registro. |
| 5 | `  name TEXT NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  color TEXT NOT NULL DEFAULT '#2563eb' CHECK (color ~ '^#[0-9A-Fa-f]{6}$'),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  is_shared BOOLEAN NOT NULL DEFAULT false,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()` | Atualiza registros existentes no banco. |
| 9 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 11 | `CREATE TABLE IF NOT EXISTS public.calendar_source_preferences (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 12 | `  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 13 | `  google_calendar_id TEXT NOT NULL REFERENCES public.calendar_sources(google_calendar_id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 14 | `  is_visible BOOLEAN NOT NULL DEFAULT true,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),` | Atualiza registros existentes no banco. |
| 16 | `  PRIMARY KEY (user_id, google_calendar_id)` | Define identificador unico principal do registro. |
| 17 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 19 | `ALTER TABLE public.calendar_sources ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 20 | `ALTER TABLE public.calendar_source_preferences ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 21 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 22 | `CREATE POLICY calendar_sources_team_select` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 23 | `  ON public.calendar_sources FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 29 | `CREATE POLICY calendar_source_preferences_own` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 30 | `  ON public.calendar_source_preferences FOR ALL TO authenticated` | Define relacionamento entre tabelas por chave estrangeira. |
| 31 | `  USING (user_id = auth.uid())` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `  WITH CHECK (user_id = auth.uid());` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 34 | `GRANT SELECT ON public.calendar_sources TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `GRANT SELECT, INSERT, UPDATE, DELETE ON public.calendar_source_preferences TO authenticated;` | Define relacionamento entre tabelas por chave estrangeira. |
| 36 | `GRANT ALL ON public.calendar_sources, public.calendar_source_preferences TO service_role;` | Define relacionamento entre tabelas por chave estrangeira. |
| 37 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 38 | `CREATE OR REPLACE FUNCTION public.set_calendar_source_updated_at()` | Define uma funcao no banco para reutilizar logica SQL. |
| 39 | `RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `  NEW.updated_at = now();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 46 | `CREATE TRIGGER trg_calendar_sources_updated_at` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 47 | `  BEFORE UPDATE ON public.calendar_sources` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `  FOR EACH ROW EXECUTE FUNCTION public.set_calendar_source_updated_at();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 50 | `CREATE TRIGGER trg_calendar_source_preferences_updated_at` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 51 | `  BEFORE UPDATE ON public.calendar_source_preferences` | Define relacionamento entre tabelas por chave estrangeira. |
| 52 | `  FOR EACH ROW EXECUTE FUNCTION public.set_calendar_source_updated_at();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
