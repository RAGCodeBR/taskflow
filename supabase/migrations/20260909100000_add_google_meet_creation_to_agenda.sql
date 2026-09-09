ALTER TABLE public.calendar_events
  ADD COLUMN IF NOT EXISTS create_google_meet BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN public.calendar_events.create_google_meet IS
  'When true, the next Google Calendar sync creates an official Google Meet for the event.';
