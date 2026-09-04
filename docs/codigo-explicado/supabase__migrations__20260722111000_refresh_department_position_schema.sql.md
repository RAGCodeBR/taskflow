# supabase/migrations/20260722111000_refresh_department_position_schema.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Repair migration for projects where the department ordering migration was applied late.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `ALTER TABLE public.client_departments` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 3 | `  ADD COLUMN IF NOT EXISTS position integer;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `WITH ordered_departments AS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  SELECT id, row_number() OVER (PARTITION BY client_id ORDER BY created_at, id) - 1 AS new_position` | Consulta dados ou valida uma condicao no banco. |
| 7 | `  FROM public.client_departments` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `UPDATE public.client_departments AS department` | Atualiza registros existentes no banco. |
| 10 | `SET position = ordered_departments.new_position` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `FROM ordered_departments` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `WHERE department.id = ordered_departments.id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `  AND department.position IS NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 15 | `ALTER TABLE public.client_departments` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 16 | `  ALTER COLUMN position SET DEFAULT 0,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `  ALTER COLUMN position SET NOT NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 19 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
