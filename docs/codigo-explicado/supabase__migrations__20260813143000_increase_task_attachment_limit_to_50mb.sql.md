# supabase/migrations/20260813143000_increase_task_attachment_limit_to_50mb.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- 50 MiB per task attachment. This is enforced by Supabase Storage before` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- upload, keeping the limit consistent for Kanban and the task dialog.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `UPDATE storage.buckets` | Atualiza registros existentes no banco. |
| 4 | `SET file_size_limit = 52428800` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `WHERE id = 'task-attachments';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
