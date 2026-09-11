ALTER TABLE public.task_conversation_reads
  ADD COLUMN IF NOT EXISTS manual_unread BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN public.task_conversation_reads.manual_unread IS
  'Indicates a conversation the user explicitly marked as unread.';
