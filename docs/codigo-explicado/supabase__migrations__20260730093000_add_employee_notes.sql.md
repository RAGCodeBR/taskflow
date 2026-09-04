# supabase/migrations/20260730093000_add_employee_notes.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `CREATE TABLE IF NOT EXISTS public.client_department_employee_notes (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 2 | `  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 3 | `  employee_id uuid NOT NULL REFERENCES public.client_department_employees(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 4 | `  content text NOT NULL CHECK (char_length(trim(content)) > 0),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,` | Define relacionamento entre tabelas por chave estrangeira. |
| 6 | `  created_at timestamptz NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  updated_at timestamptz NOT NULL DEFAULT now()` | Atualiza registros existentes no banco. |
| 8 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 10 | `CREATE INDEX IF NOT EXISTS client_department_employee_notes_employee_idx` | Cria indice para acelerar consultas frequentes. |
| 11 | `  ON public.client_department_employee_notes(employee_id, created_at DESC);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 13 | `ALTER TABLE public.client_department_employee_notes ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 14 | `GRANT SELECT, INSERT, UPDATE, DELETE ON public.client_department_employee_notes TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `GRANT ALL ON public.client_department_employee_notes TO service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 17 | `CREATE POLICY client_department_employee_notes_select_auth` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 18 | `  ON public.client_department_employee_notes FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `  USING (true);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 21 | `CREATE POLICY client_department_employee_notes_insert_admin` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 22 | `  ON public.client_department_employee_notes FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role) AND created_by = auth.uid());` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 25 | `CREATE POLICY client_department_employee_notes_update_admin` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 26 | `  ON public.client_department_employee_notes FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `  USING (public.has_role(auth.uid(), 'admin'::public.app_role))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 30 | `CREATE POLICY client_department_employee_notes_delete_admin` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 31 | `  ON public.client_department_employee_notes FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `  USING (public.has_role(auth.uid(), 'admin'::public.app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 34 | `DROP TRIGGER IF EXISTS trg_client_department_employee_notes_updated_at` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 35 | `  ON public.client_department_employee_notes;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `CREATE TRIGGER trg_client_department_employee_notes_updated_at` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 37 | `  BEFORE UPDATE ON public.client_department_employee_notes` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
