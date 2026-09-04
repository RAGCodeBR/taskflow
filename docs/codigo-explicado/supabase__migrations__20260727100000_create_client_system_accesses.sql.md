# supabase/migrations/20260727100000_create_client_system_accesses.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `CREATE TABLE public.client_system_accesses (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 2 | `  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 3 | `  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 4 | `  title text NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `  login text NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  password text NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  notes text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  created_at timestamptz NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  updated_at timestamptz NOT NULL DEFAULT now()` | Atualiza registros existentes no banco. |
| 10 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 12 | `CREATE INDEX client_system_accesses_client_id_idx` | Cria indice para acelerar consultas frequentes. |
| 13 | `  ON public.client_system_accesses(client_id);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 15 | `ALTER TABLE public.client_system_accesses ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 16 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 17 | `CREATE POLICY client_system_accesses_select_admin` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 18 | `  ON public.client_system_accesses` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  USING (public.has_role(auth.uid(), 'admin'::app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 22 | `CREATE POLICY client_system_accesses_insert_admin` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 23 | `  ON public.client_system_accesses` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 27 | `CREATE POLICY client_system_accesses_update_admin` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 28 | `  ON public.client_system_accesses` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `  FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `  USING (public.has_role(auth.uid(), 'admin'::app_role))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 33 | `CREATE POLICY client_system_accesses_delete_admin` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 34 | `  ON public.client_system_accesses` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `  USING (public.has_role(auth.uid(), 'admin'::app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 38 | `CREATE TRIGGER trg_client_system_accesses_updated_at` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 39 | `  BEFORE UPDATE ON public.client_system_accesses` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
