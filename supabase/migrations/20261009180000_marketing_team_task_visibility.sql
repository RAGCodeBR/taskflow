-- This capability changes task browsing only. It does not promote anyone,
-- change task participants, open conversations or grant another workspace.
ALTER TABLE public.workspace_memberships
  ADD COLUMN IF NOT EXISTS can_view_all_tasks boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN public.workspace_memberships.can_view_all_tasks IS
  'Permite navegar pelas tarefas da equipe no Marketing. Não altera categoria, participação ou permissões de conversas.';

DO $$
DECLARE granted integer;
BEGIN
  UPDATE public.workspace_memberships m
  SET can_view_all_tasks = true, updated_at = now()
  FROM public.workspaces w
  WHERE w.id = m.workspace_id AND w.slug = 'marketing'
    AND m.role = 'collaborator'::public.app_role
    AND m.user_id IN (
      '3a93e438-1f3f-42f9-aea4-d22d227e1ea1'::uuid, -- Carol
      '0463e2ec-c7fe-4ba3-8df1-1f1ee0093e79'::uuid  -- Eloisa Luz
    );
  GET DIAGNOSTICS granted = ROW_COUNT;
  IF granted <> 2 THEN
    RAISE EXCEPTION 'Esperadas as associações de Carol e Eloisa como colaboradoras no Marketing; nenhuma concessão parcial será aplicada.';
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';
