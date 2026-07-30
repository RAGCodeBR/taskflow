-- 20 MiB per file for all attachment buckets.
UPDATE storage.buckets
SET file_size_limit = 20971520
WHERE id IN ('task-attachments', 'invoice-documents', 'mural-attachments');
