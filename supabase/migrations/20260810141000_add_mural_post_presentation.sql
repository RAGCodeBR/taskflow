ALTER TABLE public.mural_posts
  ADD COLUMN IF NOT EXISTS is_pinned boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS card_size text NOT NULL DEFAULT 'normal'
    CHECK (card_size IN ('compact', 'normal', 'large')),
  ADD COLUMN IF NOT EXISTS text_style text NOT NULL DEFAULT 'clean'
    CHECK (text_style IN ('clean', 'handwritten', 'editorial', 'typewriter'));

CREATE INDEX IF NOT EXISTS mural_posts_pinned_idx
  ON public.mural_posts (is_pinned DESC, created_at DESC);
