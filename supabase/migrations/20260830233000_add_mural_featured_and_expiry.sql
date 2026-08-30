ALTER TABLE public.mural_posts
  ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS expires_at date;

CREATE INDEX IF NOT EXISTS mural_posts_featured_idx
  ON public.mural_posts (is_featured DESC, is_pinned DESC, created_at DESC);
