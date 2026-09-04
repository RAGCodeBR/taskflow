# supabase/migrations/20260819153440_sync_task_attachments_to_client_files.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Link client files to their source task attachments. The Storage object is` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- shared by both records, so the client area does not need a physical copy.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `ALTER TABLE public.client_files` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 4 | `  ADD COLUMN IF NOT EXISTS source_attachment_id uuid` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `  REFERENCES public.attachments(id) ON DELETE CASCADE;` | Define relacionamento entre tabelas por chave estrangeira. |
| 6 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 7 | `CREATE UNIQUE INDEX IF NOT EXISTS client_files_source_attachment_id_idx` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  ON public.client_files(source_attachment_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  WHERE source_attachment_id IS NOT NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 11 | `-- Preserve the link for files copied by the previous application flow.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 12 | `UPDATE public.client_files AS client_file` | Atualiza registros existentes no banco. |
| 13 | `SET source_attachment_id = attachment.id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `FROM public.attachments AS attachment` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `WHERE client_file.source_attachment_id IS NULL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `  AND client_file.storage_path LIKE '%/attachment-' || attachment.id::text || '/%';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 18 | `-- Backfill attachments from every non-deleted task that has a client. This` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 19 | `-- intentionally includes both open and completed tasks.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 20 | `WITH missing_attachments AS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `  SELECT` | Consulta dados ou valida uma condicao no banco. |
| 22 | `    attachment.id AS source_attachment_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `    task.client_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `    attachment.file_name,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `    attachment.storage_path,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `    attachment.mime_type,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `    attachment.size_bytes,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `    attachment.uploaded_by,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `    attachment.created_at,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `    ROW_NUMBER() OVER (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `      PARTITION BY task.client_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `      ORDER BY attachment.created_at, attachment.id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `    ) - 1 AS position_offset` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `  FROM public.attachments AS attachment` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `  JOIN public.tasks AS task ON task.id = attachment.task_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `  WHERE task.client_id IS NOT NULL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `    AND task.deleted_at IS NULL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `    AND attachment.mime_type IS DISTINCT FROM 'text/uri-list'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `    AND NOT EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `      SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 41 | `      FROM public.client_files AS existing` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `      WHERE existing.source_attachment_id = attachment.id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `         OR (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `           existing.client_id = task.client_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `           AND existing.storage_path = attachment.storage_path` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `         )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `client_positions AS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `  SELECT client_id, COALESCE(MAX(position) + 1, 0) AS next_position` | Consulta dados ou valida uma condicao no banco. |
| 51 | `  FROM public.client_files` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `  GROUP BY client_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `INSERT INTO public.client_files (` | Insere dados iniciais ou registros de apoio. |
| 55 | `  client_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `  title,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `  file_name,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `  storage_path,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `  mime_type,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `  size_bytes,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `  uploaded_by,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `  position,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `  created_at,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 64 | `  source_attachment_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `SELECT` | Consulta dados ou valida uma condicao no banco. |
| 67 | `  missing.client_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `  missing.file_name,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 69 | `  missing.file_name,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 70 | `  missing.storage_path,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `  missing.mime_type,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `  missing.size_bytes,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `  missing.uploaded_by,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 74 | `  COALESCE(client_positions.next_position, 0) + missing.position_offset,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `  missing.created_at,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 76 | `  missing.source_attachment_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 77 | `FROM missing_attachments AS missing` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 78 | `LEFT JOIN client_positions USING (client_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 79 | `ON CONFLICT (source_attachment_id) WHERE source_attachment_id IS NOT NULL DO NOTHING;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 80 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
