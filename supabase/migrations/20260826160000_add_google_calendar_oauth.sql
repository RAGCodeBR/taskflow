CREATE TABLE IF NOT EXISTS public.calendar_google_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  google_email TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  access_token TEXT,
  access_token_expires_at TIMESTAMPTZ,
  granted_scopes TEXT NOT NULL,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.calendar_google_connections ENABLE ROW LEVEL SECURITY;

-- Tokens are never exposed to the browser, including to administrators.
CREATE POLICY calendar_google_connections_select_own
  ON public.calendar_google_connections FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.set_calendar_google_connection_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_calendar_google_connections_updated_at
  BEFORE UPDATE ON public.calendar_google_connections
  FOR EACH ROW EXECUTE FUNCTION public.set_calendar_google_connection_updated_at();

-- Short-lived, single-use OAuth state values protect the redirect callback.
CREATE TABLE IF NOT EXISTS public.calendar_google_oauth_states (
  state UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS calendar_google_oauth_states_expiry_idx
  ON public.calendar_google_oauth_states (expires_at);

ALTER TABLE public.calendar_google_oauth_states ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.calendar_google_connections;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END;
$$;
