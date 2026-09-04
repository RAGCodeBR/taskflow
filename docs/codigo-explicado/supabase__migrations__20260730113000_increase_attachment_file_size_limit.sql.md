# supabase/migrations/20260730113000_increase_attachment_file_size_limit.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- 20 MiB per file for all attachment buckets.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `UPDATE storage.buckets` | Atualiza registros existentes no banco. |
| 3 | `SET file_size_limit = 20971520` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `WHERE id IN ('task-attachments', 'invoice-documents', 'mural-attachments');` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
