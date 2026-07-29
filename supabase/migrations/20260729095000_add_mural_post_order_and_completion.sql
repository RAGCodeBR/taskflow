ALTER TABLE public.mural_posts
  ADD COLUMN IF NOT EXISTS completed_at timestamptz;

CREATE TABLE IF NOT EXISTS public.mural_post_orders (
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES public.mural_posts(id) ON DELETE CASCADE,
  position integer NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, post_id)
);

CREATE INDEX IF NOT EXISTS mural_post_orders_user_position_idx
  ON public.mural_post_orders(user_id, position);

ALTER TABLE public.mural_post_orders ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mural_post_orders TO authenticated;
GRANT ALL ON public.mural_post_orders TO service_role;

CREATE POLICY mural_post_orders_own ON public.mural_post_orders
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
