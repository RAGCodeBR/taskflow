-- Métricas puxadas da API: snapshot diário de conta e posts com suas
-- métricas. Escritas só por service_role (o job de sync); leitura segue o
-- cliente dono da conta.

CREATE TABLE IF NOT EXISTS public.client_social_account_stats (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id      uuid NOT NULL REFERENCES public.client_social_accounts(id) ON DELETE CASCADE,
  snapshot_date   date NOT NULL,
  followers_count integer,
  reach           integer,
  impressions     integer,
  created_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (account_id, snapshot_date)
);

CREATE INDEX IF NOT EXISTS client_social_account_stats_account_idx
  ON public.client_social_account_stats (account_id, snapshot_date DESC);

ALTER TABLE public.client_social_account_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY client_social_account_stats_select ON public.client_social_account_stats
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.client_social_accounts a
      WHERE a.id = account_id AND public.can_access_workspace_client(a.client_id)
    )
  );

CREATE TABLE IF NOT EXISTS public.client_social_posts (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id        uuid NOT NULL REFERENCES public.client_social_accounts(id) ON DELETE CASCADE,
  platform_post_id  text NOT NULL,
  permalink         text,
  caption           text,
  media_type        text,
  thumbnail_url     text,
  posted_at         timestamptz,
  reach             integer,
  likes             integer,
  comments           integer,
  saved             integer,
  shares            integer,
  synced_at         timestamptz NOT NULL DEFAULT now(),
  UNIQUE (account_id, platform_post_id)
);

CREATE INDEX IF NOT EXISTS client_social_posts_account_idx
  ON public.client_social_posts (account_id, posted_at DESC);

ALTER TABLE public.client_social_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY client_social_posts_select ON public.client_social_posts
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.client_social_accounts a
      WHERE a.id = account_id AND public.can_access_workspace_client(a.client_id)
    )
  );

NOTIFY pgrst, 'reload schema';
