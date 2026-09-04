# supabase/migrations/20260826160000_add_google_calendar_oauth.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `CREATE TABLE IF NOT EXISTS public.calendar_google_connections (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 2 | `  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 3 | `  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 4 | `  google_email TEXT NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `  refresh_token TEXT NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  access_token TEXT,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  access_token_expires_at TIMESTAMPTZ,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  granted_scopes TEXT NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  connected_at TIMESTAMPTZ NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()` | Atualiza registros existentes no banco. |
| 11 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 13 | `ALTER TABLE public.calendar_google_connections ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 14 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 15 | `-- Tokens are never exposed to the browser, including to administrators.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 16 | `CREATE POLICY calendar_google_connections_select_own` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 17 | `  ON public.calendar_google_connections FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `  USING (user_id = auth.uid());` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 20 | `CREATE OR REPLACE FUNCTION public.set_calendar_google_connection_updated_at()` | Define uma funcao no banco para reutilizar logica SQL. |
| 21 | `RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `  NEW.updated_at = now();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `CREATE TRIGGER trg_calendar_google_connections_updated_at` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 29 | `  BEFORE UPDATE ON public.calendar_google_connections` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `  FOR EACH ROW EXECUTE FUNCTION public.set_calendar_google_connection_updated_at();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 32 | `-- Short-lived, single-use OAuth state values protect the redirect callback.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 33 | `CREATE TABLE IF NOT EXISTS public.calendar_google_oauth_states (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 34 | `  state UUID PRIMARY KEY,` | Define identificador unico principal do registro. |
| 35 | `  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 36 | `  expires_at TIMESTAMPTZ NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `  used_at TIMESTAMPTZ,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `  created_at TIMESTAMPTZ NOT NULL DEFAULT now()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 41 | `CREATE INDEX IF NOT EXISTS calendar_google_oauth_states_expiry_idx` | Cria indice para acelerar consultas frequentes. |
| 42 | `  ON public.calendar_google_oauth_states (expires_at);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 44 | `ALTER TABLE public.calendar_google_oauth_states ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 45 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 46 | `DO $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `  ALTER PUBLICATION supabase_realtime ADD TABLE public.calendar_google_connections;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `EXCEPTION` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `  WHEN duplicate_object THEN NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
