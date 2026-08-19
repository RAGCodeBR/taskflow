-- Link client files to their source task attachments. The Storage object is
-- shared by both records, so the client area does not need a physical copy.
ALTER TABLE public.client_files
  ADD COLUMN IF NOT EXISTS source_attachment_id uuid
  REFERENCES public.attachments(id) ON DELETE CASCADE;

CREATE UNIQUE INDEX IF NOT EXISTS client_files_source_attachment_id_idx
  ON public.client_files(source_attachment_id)
  WHERE source_attachment_id IS NOT NULL;

-- Preserve the link for files copied by the previous application flow.
UPDATE public.client_files AS client_file
SET source_attachment_id = attachment.id
FROM public.attachments AS attachment
WHERE client_file.source_attachment_id IS NULL
  AND client_file.storage_path LIKE '%/attachment-' || attachment.id::text || '/%';

-- Backfill attachments from every non-deleted task that has a client. This
-- intentionally includes both open and completed tasks.
WITH missing_attachments AS (
  SELECT
    attachment.id AS source_attachment_id,
    task.client_id,
    attachment.file_name,
    attachment.storage_path,
    attachment.mime_type,
    attachment.size_bytes,
    attachment.uploaded_by,
    attachment.created_at,
    ROW_NUMBER() OVER (
      PARTITION BY task.client_id
      ORDER BY attachment.created_at, attachment.id
    ) - 1 AS position_offset
  FROM public.attachments AS attachment
  JOIN public.tasks AS task ON task.id = attachment.task_id
  WHERE task.client_id IS NOT NULL
    AND task.deleted_at IS NULL
    AND attachment.mime_type IS DISTINCT FROM 'text/uri-list'
    AND NOT EXISTS (
      SELECT 1
      FROM public.client_files AS existing
      WHERE existing.source_attachment_id = attachment.id
         OR (
           existing.client_id = task.client_id
           AND existing.storage_path = attachment.storage_path
         )
    )
),
client_positions AS (
  SELECT client_id, COALESCE(MAX(position) + 1, 0) AS next_position
  FROM public.client_files
  GROUP BY client_id
)
INSERT INTO public.client_files (
  client_id,
  title,
  file_name,
  storage_path,
  mime_type,
  size_bytes,
  uploaded_by,
  position,
  created_at,
  source_attachment_id
)
SELECT
  missing.client_id,
  missing.file_name,
  missing.file_name,
  missing.storage_path,
  missing.mime_type,
  missing.size_bytes,
  missing.uploaded_by,
  COALESCE(client_positions.next_position, 0) + missing.position_offset,
  missing.created_at,
  missing.source_attachment_id
FROM missing_attachments AS missing
LEFT JOIN client_positions USING (client_id)
ON CONFLICT (source_attachment_id) WHERE source_attachment_id IS NOT NULL DO NOTHING;
