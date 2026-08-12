ALTER TABLE public.mural_posts
  ADD COLUMN IF NOT EXISTS canvas_x integer NOT NULL DEFAULT 520 CHECK (canvas_x >= 0),
  ADD COLUMN IF NOT EXISTS canvas_y integer NOT NULL DEFAULT 180 CHECK (canvas_y >= 0);

WITH positioned_posts AS (
  SELECT id, row_number() OVER (ORDER BY created_at, id) - 1 AS position
  FROM public.mural_posts
)
UPDATE public.mural_posts AS post
SET
  canvas_x = 520 + ((positioned_posts.position % 5) * 340),
  canvas_y = 180 + ((positioned_posts.position / 5) * 280)
FROM positioned_posts
WHERE post.id = positioned_posts.id
  AND post.canvas_x = 520
  AND post.canvas_y = 180;

CREATE INDEX IF NOT EXISTS mural_posts_canvas_position_idx
  ON public.mural_posts (canvas_y, canvas_x);
