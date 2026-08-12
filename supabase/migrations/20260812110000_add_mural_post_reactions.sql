CREATE TABLE IF NOT EXISTS public.mural_post_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.mural_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  emoji text NOT NULL CHECK (char_length(emoji) BETWEEN 1 AND 16),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_id, user_id, emoji)
);

CREATE INDEX IF NOT EXISTS mural_post_reactions_post_idx
  ON public.mural_post_reactions (post_id, created_at);

ALTER TABLE public.mural_post_reactions ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, DELETE ON public.mural_post_reactions TO authenticated;
GRANT ALL ON public.mural_post_reactions TO service_role;

CREATE POLICY mural_post_reactions_select ON public.mural_post_reactions
  FOR SELECT TO authenticated
  USING (NOT public.has_role(auth.uid(), 'client'::public.app_role));

CREATE POLICY mural_post_reactions_insert ON public.mural_post_reactions
  FOR INSERT TO authenticated
  WITH CHECK (
    NOT public.has_role(auth.uid(), 'client'::public.app_role)
    AND user_id = auth.uid()
  );

CREATE POLICY mural_post_reactions_delete ON public.mural_post_reactions
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

ALTER PUBLICATION supabase_realtime ADD TABLE public.mural_post_reactions;
