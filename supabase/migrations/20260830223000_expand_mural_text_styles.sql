ALTER TABLE public.mural_posts
  DROP CONSTRAINT IF EXISTS mural_posts_text_style_check;

ALTER TABLE public.mural_posts
  ADD CONSTRAINT mural_posts_text_style_check
  CHECK (
    text_style IN (
      'clean',
      'handwritten',
      'pen',
      'marker',
      'casual',
      'scribble',
      'architect',
      'editorial',
      'typewriter'
    )
  );
