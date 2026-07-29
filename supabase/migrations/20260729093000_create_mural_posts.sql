CREATE TABLE IF NOT EXISTS public.mural_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (char_length(title) <= 180),
  content text,
  color text NOT NULL DEFAULT 'sky' CHECK (color IN ('sky', 'amber', 'violet', 'green', 'rose', 'red', 'stone')),
  tag text,
  image_url text,
  checklist jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_by uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS mural_posts_created_at_idx ON public.mural_posts(created_at DESC);

ALTER TABLE public.mural_posts ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mural_posts TO authenticated;
GRANT ALL ON public.mural_posts TO service_role;

CREATE POLICY mural_posts_select ON public.mural_posts
  FOR SELECT TO authenticated
  USING (NOT public.has_role(auth.uid(), 'client'::public.app_role));

CREATE POLICY mural_posts_insert ON public.mural_posts
  FOR INSERT TO authenticated
  WITH CHECK (
    NOT public.has_role(auth.uid(), 'client'::public.app_role)
    AND created_by = auth.uid()
  );

CREATE POLICY mural_posts_update ON public.mural_posts
  FOR UPDATE TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR created_by = auth.uid()
  )
  WITH CHECK (
    NOT public.has_role(auth.uid(), 'client'::public.app_role)
    AND (public.has_role(auth.uid(), 'admin'::public.app_role) OR created_by = auth.uid())
  );

CREATE POLICY mural_posts_delete ON public.mural_posts
  FOR DELETE TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR created_by = auth.uid()
  );

DROP TRIGGER IF EXISTS trg_mural_posts_updated_at ON public.mural_posts;
CREATE TRIGGER trg_mural_posts_updated_at
  BEFORE UPDATE ON public.mural_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
