# supabase/migrations/20260722110000_add_client_department_employees.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `ALTER TABLE public.client_departments` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 2 | `  ADD COLUMN IF NOT EXISTS position integer;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 3 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 4 | `WITH ordered_departments AS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `  SELECT id, row_number() OVER (PARTITION BY client_id ORDER BY created_at, id) - 1 AS new_position` | Consulta dados ou valida uma condicao no banco. |
| 6 | `  FROM public.client_departments` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `UPDATE public.client_departments AS department` | Atualiza registros existentes no banco. |
| 9 | `SET position = ordered_departments.new_position` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `FROM ordered_departments` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `WHERE department.id = ordered_departments.id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `  AND department.position IS NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 14 | `ALTER TABLE public.client_departments` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 15 | `  ALTER COLUMN position SET DEFAULT 0,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `  ALTER COLUMN position SET NOT NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 18 | `DROP POLICY IF EXISTS client_departments_update_admin ON public.client_departments;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 19 | `CREATE POLICY client_departments_update_admin` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 20 | `  ON public.client_departments` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `  FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `  USING (public.has_role(auth.uid(), 'admin'::app_role))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 25 | `DROP POLICY IF EXISTS client_departments_delete_admin ON public.client_departments;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 26 | `CREATE POLICY client_departments_delete_admin` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 27 | `  ON public.client_departments` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `  USING (public.has_role(auth.uid(), 'admin'::app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 31 | `CREATE TABLE IF NOT EXISTS public.client_department_employees (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 32 | `  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 33 | `  department_id uuid NOT NULL REFERENCES public.client_departments(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 34 | `  full_name text NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `  registration text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `  cbo text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `  role text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `  salary numeric(12, 2),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `  activities text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `  created_at timestamptz NOT NULL DEFAULT now()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 43 | `CREATE INDEX IF NOT EXISTS client_department_employees_department_id_idx` | Cria indice para acelerar consultas frequentes. |
| 44 | `  ON public.client_department_employees(department_id);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 46 | `ALTER TABLE public.client_department_employees ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 47 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 48 | `CREATE POLICY client_department_employees_select_auth` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 49 | `  ON public.client_department_employees` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `  USING (true);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 53 | `CREATE POLICY client_department_employees_insert_admin` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 54 | `  ON public.client_department_employees` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 58 | `CREATE POLICY client_department_employees_update_admin` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 59 | `  ON public.client_department_employees` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `  FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `  USING (public.has_role(auth.uid(), 'admin'::app_role))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 64 | `CREATE POLICY client_department_employees_delete_admin` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 65 | `  ON public.client_department_employees` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `  USING (public.has_role(auth.uid(), 'admin'::app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
