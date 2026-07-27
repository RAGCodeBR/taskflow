CREATE TABLE IF NOT EXISTS public.client_branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  cnpj text,
  address text,
  phone text,
  email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS client_branches_client_id_idx
  ON public.client_branches(client_id);

ALTER TABLE public.client_branches ENABLE ROW LEVEL SECURITY;

CREATE POLICY client_branches_select_admin ON public.client_branches
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY client_branches_insert_admin ON public.client_branches
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY client_branches_update_admin ON public.client_branches
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY client_branches_delete_admin ON public.client_branches
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_client_branches_updated_at
  BEFORE UPDATE ON public.client_branches
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
