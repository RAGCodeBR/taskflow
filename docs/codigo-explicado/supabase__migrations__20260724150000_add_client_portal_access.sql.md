# supabase/migrations/20260724150000_add_client_portal_access.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Vincula cada login de cliente a um único cliente e aplica esse vínculo no RLS.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `CREATE TABLE IF NOT EXISTS public.client_user_links (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 3 | `  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 4 | `  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 5 | `  created_at timestamptz NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  updated_at timestamptz NOT NULL DEFAULT now()` | Atualiza registros existentes no banco. |
| 7 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `CREATE INDEX IF NOT EXISTS client_user_links_client_idx ON public.client_user_links (client_id);` | Cria indice para acelerar consultas frequentes. |
| 9 | `ALTER TABLE public.client_user_links ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 10 | `GRANT SELECT ON public.client_user_links TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `GRANT ALL ON public.client_user_links TO service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 13 | `CREATE OR REPLACE FUNCTION public.current_client_id()` | Define uma funcao no banco para reutilizar logica SQL. |
| 14 | `RETURNS uuid` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `LANGUAGE sql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `STABLE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  SELECT client_id FROM public.client_user_links WHERE user_id = auth.uid() LIMIT 1` | Consulta dados ou valida uma condicao no banco. |
| 21 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 23 | `DROP POLICY IF EXISTS client_user_links_select ON public.client_user_links;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 24 | `CREATE POLICY client_user_links_select ON public.client_user_links` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 25 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'::public.app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `DROP POLICY IF EXISTS client_user_links_admin_manage ON public.client_user_links;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 29 | `CREATE POLICY client_user_links_admin_manage ON public.client_user_links` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 30 | `  FOR ALL TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `  USING (public.has_role(auth.uid(), 'admin'::public.app_role))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 34 | `CREATE OR REPLACE FUNCTION public.set_client_user_links_updated_at()` | Define uma funcao no banco para reutilizar logica SQL. |
| 35 | `RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `BEGIN NEW.updated_at = now(); RETURN NEW; END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `DROP TRIGGER IF EXISTS trg_client_user_links_updated_at ON public.client_user_links;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 39 | `CREATE TRIGGER trg_client_user_links_updated_at BEFORE UPDATE ON public.client_user_links` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 40 | `  FOR EACH ROW EXECUTE FUNCTION public.set_client_user_links_updated_at();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 42 | `-- Client accounts can only see their own client record; internal users keep their` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 43 | `-- existing client directory access.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 44 | `DROP POLICY IF EXISTS clients_select_auth ON public.clients;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 45 | `CREATE POLICY clients_select_auth ON public.clients` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 46 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `    NOT public.has_role(auth.uid(), 'client'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `    OR id = public.current_client_id()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 52 | `-- Client accounts receive read-only access to their client's tasks. Internal` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 53 | `-- task visibility continues to use the existing collaborator rules.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 54 | `DROP POLICY IF EXISTS tasks_select ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 55 | `CREATE POLICY tasks_select ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 56 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `    (public.has_role(auth.uid(), 'client'::public.app_role) AND client_id = public.current_client_id())` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `    OR (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `      NOT public.has_role(auth.uid(), 'client'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `      AND public.can_view_task(id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 64 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 65 | `DROP POLICY IF EXISTS tasks_insert ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 66 | `CREATE POLICY tasks_insert ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 67 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `  WITH CHECK (NOT public.has_role(auth.uid(), 'client'::public.app_role) AND auth.uid() IS NOT NULL);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 69 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 70 | `DROP POLICY IF EXISTS tasks_update ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 71 | `CREATE POLICY tasks_update ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 72 | `  FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `  USING (NOT public.has_role(auth.uid(), 'client'::public.app_role) AND public.can_view_task(id))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 74 | `  WITH CHECK (NOT public.has_role(auth.uid(), 'client'::public.app_role) AND auth.uid() IS NOT NULL);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 76 | `DROP POLICY IF EXISTS tasks_delete ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 77 | `CREATE POLICY tasks_delete ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 78 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 79 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 80 | `    NOT public.has_role(auth.uid(), 'client'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 81 | `    AND (public.has_role(auth.uid(), 'admin'::public.app_role) OR created_by = auth.uid())` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 82 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 83 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 84 | `-- Invoice access is based on the live database link, rather than JWT metadata,` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 85 | `-- so a new client assignment takes effect immediately.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 86 | `DROP POLICY IF EXISTS client_invoices_read_admin_or_own_client ON public.client_invoices;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 87 | `CREATE POLICY client_invoices_read_admin_or_own_client ON public.client_invoices` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 88 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 89 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 90 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 91 | `    OR (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 92 | `      public.has_role(auth.uid(), 'client'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 93 | `      AND client_id = public.current_client_id()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 94 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 95 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
