# supabase/migrations/20260722090000_create_client_departments.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `CREATE TABLE public.client_departments (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 2 | `    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 3 | `    client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 4 | `    name text NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `    description text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `    created_at timestamptz NOT NULL DEFAULT now()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 9 | `ALTER TABLE public.client_departments ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 10 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 11 | `CREATE POLICY client_departments_select_auth` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 12 | `    ON public.client_departments` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `    FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `    USING(true);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 16 | `CREATE POLICY client_departments_insert_admin` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 17 | `    ON public.client_departments` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `    FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `    WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
