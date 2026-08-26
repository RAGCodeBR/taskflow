-- Calendar metadata comes from Google Calendar's "My calendars" list. Each
-- user can hide a calendar in TaskFlow without changing its Google visibility.
CREATE TABLE IF NOT EXISTS public.calendar_sources (
  google_calendar_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#2563eb' CHECK (color ~ '^#[0-9A-Fa-f]{6}$'),
  is_shared BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.calendar_source_preferences (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  google_calendar_id TEXT NOT NULL REFERENCES public.calendar_sources(google_calendar_id) ON DELETE CASCADE,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, google_calendar_id)
);

ALTER TABLE public.calendar_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_source_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY calendar_sources_team_select
  ON public.calendar_sources FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );

CREATE POLICY calendar_source_preferences_own
  ON public.calendar_source_preferences FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

GRANT SELECT ON public.calendar_sources TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.calendar_source_preferences TO authenticated;
GRANT ALL ON public.calendar_sources, public.calendar_source_preferences TO service_role;

CREATE OR REPLACE FUNCTION public.set_calendar_source_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_calendar_sources_updated_at
  BEFORE UPDATE ON public.calendar_sources
  FOR EACH ROW EXECUTE FUNCTION public.set_calendar_source_updated_at();

CREATE TRIGGER trg_calendar_source_preferences_updated_at
  BEFORE UPDATE ON public.calendar_source_preferences
  FOR EACH ROW EXECUTE FUNCTION public.set_calendar_source_updated_at();
