ALTER TABLE public.calendar_events
  ADD COLUMN IF NOT EXISTS attendee_emails TEXT[] NOT NULL DEFAULT '{}';

COMMENT ON COLUMN public.calendar_events.attendee_emails IS
  'Guest email addresses invited to the Google Calendar event.';
