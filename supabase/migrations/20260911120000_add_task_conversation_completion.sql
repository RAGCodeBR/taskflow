ALTER TABLE public.tasks
  ADD COLUMN IF NOT EXISTS conversation_closed_at TIMESTAMPTZ;

COMMENT ON COLUMN public.tasks.conversation_closed_at IS
  'When set, hides the task conversation from the Conversations inbox without deleting its history.';
