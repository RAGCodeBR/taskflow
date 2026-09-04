# supabase/migrations/20260727133000_create_client_branches.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `CREATE TABLE IF NOT EXISTS public.client_branches (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 2 | `  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 3 | `  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 4 | `  name text NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `  cnpj text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  address text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  phone text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  email text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  created_at timestamptz NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  updated_at timestamptz NOT NULL DEFAULT now()` | Atualiza registros existentes no banco. |
| 11 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 13 | `CREATE INDEX IF NOT EXISTS client_branches_client_id_idx` | Cria indice para acelerar consultas frequentes. |
| 14 | `  ON public.client_branches(client_id);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 16 | `ALTER TABLE public.client_branches ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 17 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 18 | `CREATE POLICY client_branches_select_admin ON public.client_branches` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 19 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  USING (public.has_role(auth.uid(), 'admin'::app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `CREATE POLICY client_branches_insert_admin ON public.client_branches` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 22 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `CREATE POLICY client_branches_update_admin ON public.client_branches` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 25 | `  FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `  USING (public.has_role(auth.uid(), 'admin'::app_role))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `CREATE POLICY client_branches_delete_admin ON public.client_branches` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 29 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `  USING (public.has_role(auth.uid(), 'admin'::app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 32 | `CREATE TRIGGER trg_client_branches_updated_at` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 33 | `  BEFORE UPDATE ON public.client_branches` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
