# supabase/migrations/20260728120000_add_employee_extrafolha_salary.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Keeps the existing salary as the gross salary and stores the off-payroll amount separately.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `ALTER TABLE public.client_department_employees` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 3 | `  ADD COLUMN IF NOT EXISTS salary_extrafolha numeric(12, 2);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
