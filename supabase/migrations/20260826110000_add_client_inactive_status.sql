-- Inactivation preserves all client-related records, including tasks and files.
ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

-- Existing clients remain active when this feature is introduced.
UPDATE public.clients
SET is_active = true
WHERE is_active IS DISTINCT FROM true;

CREATE INDEX IF NOT EXISTS clients_active_name_idx
  ON public.clients (is_active, name);
