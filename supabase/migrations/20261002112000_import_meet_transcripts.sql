-- Preserve the spoken transcript independently from a reviewed client note.
CREATE TABLE public.meeting_transcripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  calendar_event_id uuid NOT NULL REFERENCES public.calendar_events(id) ON DELETE CASCADE,
  conference_record_name text NOT NULL,
  transcript_name text NOT NULL UNIQUE,
  google_doc_url text,
  entries jsonb NOT NULL DEFAULT '[]'::jsonb,
  content text NOT NULL DEFAULT '',
  entry_count integer NOT NULL DEFAULT 0 CHECK (entry_count >= 0),
  imported_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX meeting_transcripts_event_idx
  ON public.meeting_transcripts(calendar_event_id);

ALTER TABLE public.meeting_transcripts ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.meeting_transcripts TO authenticated;
GRANT ALL ON public.meeting_transcripts TO service_role;

-- Agenda is shared with the whole team, including synced events without a
-- workspace_id. Match calendar_events access instead of hiding those rows.
CREATE POLICY meeting_transcripts_team_select ON public.meeting_transcripts
  FOR SELECT TO authenticated USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );

ALTER TABLE public.client_notes
  ADD COLUMN IF NOT EXISTS meet_transcript_id uuid UNIQUE
    REFERENCES public.meeting_transcripts(id) ON DELETE SET NULL;

NOTIFY pgrst, 'reload schema';
