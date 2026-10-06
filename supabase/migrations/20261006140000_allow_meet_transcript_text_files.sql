-- Meet transcript entries can be retained as a private text file when the
-- connected Google account cannot export the organizer's Docs file.
UPDATE storage.buckets
SET allowed_mime_types = ARRAY['application/pdf', 'text/plain']
WHERE id = 'meeting-artifacts';
