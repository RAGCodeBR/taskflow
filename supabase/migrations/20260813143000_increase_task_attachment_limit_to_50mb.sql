-- 50 MiB per task attachment. This is enforced by Supabase Storage before
-- upload, keeping the limit consistent for Kanban and the task dialog.
UPDATE storage.buckets
SET file_size_limit = 52428800
WHERE id = 'task-attachments';
