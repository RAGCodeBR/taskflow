-- Keep a private PDF copy of each Meet transcript, independent of Drive access.
ALTER TABLE public.meeting_transcripts
  ADD COLUMN IF NOT EXISTS file_path text,
  ADD COLUMN IF NOT EXISTS file_name text,
  ADD COLUMN IF NOT EXISTS file_size integer,
  ADD COLUMN IF NOT EXISTS file_error text;

DROP POLICY IF EXISTS meeting_artifacts_team_download ON storage.objects;
CREATE POLICY meeting_artifacts_team_download ON storage.objects
  FOR SELECT TO authenticated USING (
    bucket_id = 'meeting-artifacts'
    AND (
      public.has_role(auth.uid(), 'admin'::public.app_role)
      OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
    )
    AND (
      EXISTS (
        SELECT 1 FROM public.meeting_minutes minutes
        WHERE minutes.file_path = storage.objects.name
      )
      OR EXISTS (
        SELECT 1 FROM public.meeting_transcripts transcript
        WHERE transcript.file_path = storage.objects.name
      )
    )
  );

NOTIFY pgrst, 'reload schema';
