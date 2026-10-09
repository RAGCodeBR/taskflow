-- Títulos e cores do funil são compartilhados por quem acessa o CRM no mesmo ambiente.
CREATE TABLE public.crm_pipeline_stages (
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  stage_id text NOT NULL CHECK (stage_id IN ('atendendo', 'novo', 'qualificado', 'proposta', 'negociacao', 'finalizado')),
  label text NOT NULL CHECK (char_length(btrim(label)) BETWEEN 1 AND 60),
  color text NOT NULL CHECK (color ~ '^#[0-9A-Fa-f]{6}$'),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (workspace_id, stage_id)
);

INSERT INTO public.crm_pipeline_stages (workspace_id, stage_id, label, color)
SELECT w.id, stage.stage_id, stage.label, stage.color
FROM public.workspaces w
CROSS JOIN (VALUES
  ('atendendo', 'Atendendo', '#16a77e'),
  ('novo', 'Novos Leads', '#3278d4'),
  ('qualificado', 'Qualificados', '#5b45ad'),
  ('proposta', 'Proposta Enviada', '#f06e43'),
  ('negociacao', 'Em Negociação', '#e9a400'),
  ('finalizado', 'Finalizados', '#208b43')
) AS stage(stage_id, label, color)
ON CONFLICT (workspace_id, stage_id) DO NOTHING;

CREATE TRIGGER crm_pipeline_stages_updated_at
  BEFORE UPDATE ON public.crm_pipeline_stages
  FOR EACH ROW EXECUTE FUNCTION public.crm_opportunities_touch_updated_at();

GRANT SELECT, INSERT, UPDATE ON public.crm_pipeline_stages TO authenticated;
ALTER TABLE public.crm_pipeline_stages ENABLE ROW LEVEL SECURITY;

CREATE POLICY crm_pipeline_stages_select ON public.crm_pipeline_stages
  FOR SELECT TO authenticated USING (public.can_access_crm(workspace_id));
CREATE POLICY crm_pipeline_stages_insert ON public.crm_pipeline_stages
  FOR INSERT TO authenticated WITH CHECK (public.can_access_crm(workspace_id));
CREATE POLICY crm_pipeline_stages_update ON public.crm_pipeline_stages
  FOR UPDATE TO authenticated USING (public.can_access_crm(workspace_id))
  WITH CHECK (public.can_access_crm(workspace_id));

NOTIFY pgrst, 'reload schema';
