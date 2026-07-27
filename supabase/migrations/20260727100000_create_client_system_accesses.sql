CREATE TABLE public.client_system_accesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  title text NOT NULL,
  login text NOT NULL,
  password text NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX client_system_accesses_client_id_idx
  ON public.client_system_accesses(client_id);

ALTER TABLE public.client_system_accesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY client_system_accesses_select_admin
  ON public.client_system_accesses
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY client_system_accesses_insert_admin
  ON public.client_system_accesses
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY client_system_accesses_update_admin
  ON public.client_system_accesses
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY client_system_accesses_delete_admin
  ON public.client_system_accesses
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_client_system_accesses_updated_at
  BEFORE UPDATE ON public.client_system_accesses
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
