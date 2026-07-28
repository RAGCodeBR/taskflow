ALTER TABLE public.client_branches
  ADD COLUMN IF NOT EXISTS notes text;

NOTIFY pgrst, 'reload schema';
