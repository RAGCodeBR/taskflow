# supabase/migrations/20260722103000_create_task_attachments_bucket.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Creates the private bucket used by task attachments and client logos.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- Existing projects may already have this bucket; the conflict clause keeps this safe to run.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `INSERT INTO storage.buckets (id, name, public, file_size_limit)` | Insere dados iniciais ou registros de apoio. |
| 4 | `VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `  'task-attachments',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  'task-attachments',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  false,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  10485760` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `ON CONFLICT (id) DO NOTHING;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
