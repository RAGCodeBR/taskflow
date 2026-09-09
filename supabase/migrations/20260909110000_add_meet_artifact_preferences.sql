ALTER TABLE public.calendar_events
  ADD COLUMN IF NOT EXISTS auto_smart_notes BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS auto_transcription BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN public.calendar_events.auto_smart_notes IS
  'Whether a Google Meet created by TaskFlow should automatically generate Gemini Smart Notes.';

COMMENT ON COLUMN public.calendar_events.auto_transcription IS
  'Whether a Google Meet created by TaskFlow should automatically generate a transcript.';
