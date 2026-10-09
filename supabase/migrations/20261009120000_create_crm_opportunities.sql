-- Oportunidades comerciais isoladas por ambiente. O acesso é concedido
-- explicitamente aos colaboradores pela permissão "crm".
CREATE TABLE public.crm_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 180),
  company_name text CHECK (company_name IS NULL OR char_length(btrim(company_name)) BETWEEN 1 AND 180),
  contact_name text,
  contact_email text,
  contact_phone text,
  stage text NOT NULL DEFAULT 'novo' CHECK (stage IN ('atendendo', 'novo', 'qualificado', 'proposta', 'negociacao', 'finalizado')),
  source text,
  amount numeric(14,2) CHECK (amount IS NULL OR amount >= 0),
  expected_close_date date,
  notes text,
  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX crm_opportunities_workspace_stage_idx ON public.crm_opportunities (workspace_id, stage, updated_at DESC);

CREATE OR REPLACE FUNCTION public.crm_opportunities_touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER crm_opportunities_updated_at
  BEFORE UPDATE ON public.crm_opportunities
  FOR EACH ROW EXECUTE FUNCTION public.crm_opportunities_touch_updated_at();

CREATE OR REPLACE FUNCTION public.can_access_crm(target_workspace_id uuid)
RETURNS boolean LANGUAGE sql VOLATILE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_workspace_access(target_workspace_id)
    AND (
      public.has_role(auth.uid(), 'admin'::public.app_role)
      OR (public.has_role(auth.uid(), 'collaborator'::public.app_role) AND EXISTS (
        SELECT 1 FROM public.workspace_memberships m
        WHERE m.workspace_id = target_workspace_id
          AND m.user_id = auth.uid()
          AND 'crm' = ANY(m.permissions)
      ))
    );
$$;

REVOKE ALL ON FUNCTION public.can_access_crm(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_access_crm(uuid) TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_opportunities TO authenticated;
ALTER TABLE public.crm_opportunities ENABLE ROW LEVEL SECURITY;

CREATE POLICY crm_opportunities_select ON public.crm_opportunities
  FOR SELECT TO authenticated USING (public.can_access_crm(workspace_id));
CREATE POLICY crm_opportunities_insert ON public.crm_opportunities
  FOR INSERT TO authenticated WITH CHECK (public.can_access_crm(workspace_id));
CREATE POLICY crm_opportunities_update ON public.crm_opportunities
  FOR UPDATE TO authenticated USING (public.can_access_crm(workspace_id))
  WITH CHECK (public.can_access_crm(workspace_id));
CREATE POLICY crm_opportunities_delete ON public.crm_opportunities
  FOR DELETE TO authenticated USING (public.can_access_crm(workspace_id));

NOTIFY pgrst, 'reload schema';
