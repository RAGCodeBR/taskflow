-- Keep the requested calendar separate from the calendar that currently owns
-- the remote Google event. Changing the former must not make a PATCH on the
-- wrong calendar look like a deleted event and create a duplicate.
ALTER TABLE public.calendar_events
  ADD COLUMN IF NOT EXISTS google_synced_calendar_id text;

UPDATE public.calendar_events
SET google_synced_calendar_id = google_calendar_id
WHERE google_event_id IS NOT NULL
  AND google_synced_calendar_id IS NULL;
