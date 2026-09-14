-- Conexão de conta de rede social por cliente (hoje só Instagram). O token
-- nunca é exposto ao papel authenticated: a policy de SELECT libera a linha
-- inteira para quem já enxerga o cliente, mas nenhum hook do frontend
-- seleciona a coluna access_token — só as edge functions (service_role) leem.

CREATE TABLE IF NOT EXISTS public.client_social_accounts (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id         uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  platform          text NOT NULL DEFAULT 'instagram',
  ig_business_id    text NOT NULL,
  page_id           text NOT NULL,
  page_name         text,
  access_token      text NOT NULL,
  token_expires_at  timestamptz,
  connected_by      uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  connected_at      timestamptz NOT NULL DEFAULT now(),
  last_sync_at      timestamptz,
  last_sync_error   text,
  UNIQUE (client_id, platform)
);

CREATE INDEX IF NOT EXISTS client_social_accounts_client_idx
  ON public.client_social_accounts (client_id);

ALTER TABLE public.client_social_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY client_social_accounts_select ON public.client_social_accounts
  FOR SELECT TO authenticated
  USING (public.can_access_workspace_client(client_id));

-- Só desconectar (apagar a própria linha) é permitido pelo navegador; criar
-- e atualizar (gravar token) é exclusivo das edge functions via service_role,
-- que ignora RLS.
CREATE POLICY client_social_accounts_delete ON public.client_social_accounts
  FOR DELETE TO authenticated
  USING (public.can_access_workspace_client(client_id));

-- Estado OAuth de curta duração, mesmo padrão de calendar_google_oauth_states:
-- protege o callback contra CSRF e replay.
CREATE TABLE IF NOT EXISTS public.instagram_oauth_states (
  state       uuid PRIMARY KEY,
  client_id   uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  expires_at  timestamptz NOT NULL,
  used_at     timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS instagram_oauth_states_expiry_idx
  ON public.instagram_oauth_states (expires_at);

ALTER TABLE public.instagram_oauth_states ENABLE ROW LEVEL SECURITY;
-- Nenhuma policy para authenticated: só a edge function (service_role) lê e
-- escreve aqui. É um detalhe de implementação do fluxo OAuth, não um dado que
-- alguém precisa consultar pela tela.

NOTIFY pgrst, 'reload schema';
