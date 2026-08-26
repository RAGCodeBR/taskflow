-- Google event IDs are only unique inside a calendar. A consolidated Agenda
-- must therefore identify remote events by the calendar + event pair.
ALTER TABLE public.calendar_events
  DROP CONSTRAINT IF EXISTS calendar_events_google_event_id_key;

ALTER TABLE public.calendar_events
  ADD CONSTRAINT calendar_events_google_calendar_event_key
  UNIQUE (google_calendar_id, google_event_id);
