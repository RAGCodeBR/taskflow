# supabase/migrations/20260728150000_add_employee_attachments.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `CREATE TABLE IF NOT EXISTS public.client_department_employee_attachments (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 2 | `  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 3 | `  employee_id uuid NOT NULL REFERENCES public.client_department_employees(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 4 | `  file_name text NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `  storage_path text NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  mime_type text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  size_bytes bigint,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,` | Define relacionamento entre tabelas por chave estrangeira. |
| 9 | `  created_at timestamptz NOT NULL DEFAULT now()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 12 | `CREATE INDEX IF NOT EXISTS client_department_employee_attachments_employee_id_idx` | Cria indice para acelerar consultas frequentes. |
| 13 | `  ON public.client_department_employee_attachments(employee_id);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 15 | `ALTER TABLE public.client_department_employee_attachments ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 16 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 17 | `CREATE POLICY client_department_employee_attachments_select_admin` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 18 | `  ON public.client_department_employee_attachments` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  USING (public.has_role(auth.uid(), 'admin'::app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `CREATE POLICY client_department_employee_attachments_insert_admin` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 22 | `  ON public.client_department_employee_attachments` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) AND uploaded_by = auth.uid());` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `CREATE POLICY client_department_employee_attachments_delete_admin` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 26 | `  ON public.client_department_employee_attachments` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `  USING (public.has_role(auth.uid(), 'admin'::app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
