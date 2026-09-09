CREATE TABLE IF NOT EXISTS public.meeting_minutes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  calendar_event_id UUID NOT NULL UNIQUE REFERENCES public.calendar_events(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'ready', 'unavailable', 'error')),
  conference_record_name TEXT,
  smart_note_name TEXT,
  google_doc_url TEXT,
  generated_at TIMESTAMPTZ,
  last_checked_at TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS meeting_minutes_pending_idx
  ON public.meeting_minutes (status, last_checked_at)
  WHERE status = 'pending';

ALTER TABLE public.meeting_minutes ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.meeting_minutes TO authenticated;
GRANT ALL ON public.meeting_minutes TO service_role;

CREATE POLICY meeting_minutes_team_select ON public.meeting_minutes
  FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );

CREATE OR REPLACE FUNCTION public.set_meeting_minutes_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_meeting_minutes_updated_at ON public.meeting_minutes;
CREATE TRIGGER trg_meeting_minutes_updated_at
  BEFORE UPDATE ON public.meeting_minutes
  FOR EACH ROW EXECUTE FUNCTION public.set_meeting_minutes_updated_at();

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.meeting_minutes;
EXCEPTION WHEN duplicate_object THEN
  NULL;
END;
$$;
