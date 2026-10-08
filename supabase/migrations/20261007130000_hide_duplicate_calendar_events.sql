-- Cópias geradas por sincronizações simultâneas podem ser ocultadas sem apagar
-- o evento local nem o evento no Google. O vínculo da reunião permanece intacto.
ALTER TABLE public.calendar_events
  ADD COLUMN IF NOT EXISTS hidden_at timestamptz;

CREATE INDEX IF NOT EXISTS calendar_events_visible_interval_idx
  ON public.calendar_events (starts_at, ends_at)
  WHERE deleted_at IS NULL AND hidden_at IS NULL;

CREATE POLICY calendar_events_hide_duplicate_copies
  ON public.calendar_events AS RESTRICTIVE FOR SELECT TO authenticated
  USING (hidden_at IS NULL);
