-- Return users to the same TaskFlow origin where Google reconnection began.
-- OAuth still uses a one-time UUID state; the origin is validated in the edge function.
ALTER TABLE public.calendar_google_oauth_states
  ADD COLUMN IF NOT EXISTS return_origin TEXT;
