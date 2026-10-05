-- Keep a private PDF copy of the Gemini notes associated with each meeting.
ALTER TABLE public.meeting_minutes
  ADD COLUMN IF NOT EXISTS file_path text,
  ADD COLUMN IF NOT EXISTS file_name text,
  ADD COLUMN IF NOT EXISTS file_size integer,
  ADD COLUMN IF NOT EXISTS file_error text;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('meeting-artifacts', 'meeting-artifacts', false, 10485760, ARRAY['application/pdf'])
ON CONFLICT (id) DO UPDATE
  SET public = false,
      file_size_limit = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY meeting_artifacts_team_download ON storage.objects
  FOR SELECT TO authenticated USING (
    bucket_id = 'meeting-artifacts'
    AND (
      public.has_role(auth.uid(), 'admin'::public.app_role)
      OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
    )
    AND EXISTS (
      SELECT 1 FROM public.meeting_minutes minutes
      WHERE minutes.file_path = storage.objects.name
    )
  );

NOTIFY pgrst, 'reload schema';
