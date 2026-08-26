-- Shared company agenda.  Google Calendar identifiers are intentionally optional
-- until the OAuth/sync service is configured.
CREATE TABLE IF NOT EXISTS public.calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 240),
  description TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  is_all_day BOOLEAN NOT NULL DEFAULT false,
  location TEXT,
  meeting_url TEXT,
  color TEXT NOT NULL DEFAULT '#2563eb' CHECK (color ~ '^#[0-9A-Fa-f]{6}$'),
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  source TEXT NOT NULL DEFAULT 'taskflow' CHECK (source IN ('taskflow', 'google')),
  google_event_id TEXT UNIQUE,
  google_calendar_id TEXT,
  google_etag TEXT,
  google_updated_at TIMESTAMPTZ,
  sync_status TEXT NOT NULL DEFAULT 'not_configured'
    CHECK (sync_status IN ('not_configured', 'pending', 'synced', 'error')),
  sync_error TEXT,
  deleted_at TIMESTAMPTZ,
  deleted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT calendar_events_valid_interval CHECK (ends_at > starts_at)
);

CREATE INDEX IF NOT EXISTS calendar_events_active_interval_idx
  ON public.calendar_events (starts_at, ends_at)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS calendar_events_google_lookup_idx
  ON public.calendar_events (google_calendar_id, google_event_id)
  WHERE google_event_id IS NOT NULL;

ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

-- The Agenda is deliberately a collaborative area: administrators and
-- collaborators have the same full access, while client accounts have none.
CREATE POLICY calendar_events_team_select
  ON public.calendar_events FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );

CREATE POLICY calendar_events_team_insert
  ON public.calendar_events FOR INSERT TO authenticated
  WITH CHECK (
    (public.has_role(auth.uid(), 'admin'::public.app_role)
      OR public.has_role(auth.uid(), 'collaborator'::public.app_role))
    AND created_by = auth.uid()
    AND (updated_by IS NULL OR updated_by = auth.uid())
  );

CREATE POLICY calendar_events_team_update
  ON public.calendar_events FOR UPDATE TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );

CREATE OR REPLACE FUNCTION public.set_calendar_event_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_calendar_events_updated_at ON public.calendar_events;
CREATE TRIGGER trg_calendar_events_updated_at
  BEFORE UPDATE ON public.calendar_events
  FOR EACH ROW EXECUTE FUNCTION public.set_calendar_event_updated_at();

-- Existing team accounts receive the new module automatically.  Client portal
-- accounts remain excluded.
UPDATE public.user_permissions AS permissions
SET permissions = array_append(permissions.permissions, 'agenda'), updated_at = now()
WHERE NOT ('agenda' = ANY(permissions.permissions))
  AND EXISTS (
    SELECT 1
    FROM public.user_roles roles
    WHERE roles.user_id = permissions.user_id
      AND roles.role IN ('admin'::public.app_role, 'collaborator'::public.app_role)
  );

-- The new shared calendar should update open Agenda screens in other tabs.
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.calendar_events;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END;
$$;
