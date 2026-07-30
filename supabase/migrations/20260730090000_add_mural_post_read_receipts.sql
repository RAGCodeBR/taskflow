-- A post-it is unread for a person until they visit the Mural. Read receipts
-- are intentionally per user so one person's visit never clears another's badge.
CREATE TABLE IF NOT EXISTS public.mural_post_reads (
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES public.mural_posts(id) ON DELETE CASCADE,
  read_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, post_id)
);

CREATE INDEX IF NOT EXISTS mural_post_reads_user_idx
  ON public.mural_post_reads(user_id, read_at DESC);

ALTER TABLE public.mural_post_reads ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT ON public.mural_post_reads TO authenticated;
GRANT ALL ON public.mural_post_reads TO service_role;

CREATE POLICY mural_post_reads_own_select ON public.mural_post_reads
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY mural_post_reads_own_insert ON public.mural_post_reads
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

ALTER PUBLICATION supabase_realtime ADD TABLE public.mural_posts;
