# supabase/migrations/20260728170000_backfill_task_status_ids.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Assign the default configured status to legacy tasks that only have the old status value.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `UPDATE public.tasks AS task` | Atualiza registros existentes no banco. |
| 3 | `SET status_id = CASE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `  WHEN task.status = 'done' THEN (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `    SELECT id FROM public.task_statuses WHERE is_completed ORDER BY position LIMIT 1` | Consulta dados ou valida uma condicao no banco. |
| 6 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  ELSE (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `    SELECT id FROM public.task_statuses WHERE NOT is_completed ORDER BY position LIMIT 1` | Consulta dados ou valida uma condicao no banco. |
| 9 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `END` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `WHERE task.status_id IS NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
