-- Os relatórios precisam saber quem pertence ao ambiente ativo para não
-- listar/pontuar gente de outro ambiente. A RLS de workspace_memberships só
-- deixa cada um ver a própria linha, então uma consulta direta devolveria só o
-- próprio usuário. Esta função (SECURITY DEFINER, mesmo padrão do
-- list_task_assignees) devolve os ids dos membros — inclusive inativos, que o
-- relatório ainda filtra por conta própria — mas só para quem já é membro do
-- ambiente consultado, para não virar um enumerador entre ambientes.

CREATE OR REPLACE FUNCTION public.list_workspace_member_ids(target_workspace_id uuid DEFAULT NULL)
RETURNS TABLE (user_id uuid)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT m.user_id
  FROM public.workspace_memberships m
  WHERE m.workspace_id = COALESCE(target_workspace_id, public.current_workspace_id())
    AND EXISTS (
      SELECT 1 FROM public.workspace_memberships me
      WHERE me.workspace_id = m.workspace_id
        AND me.user_id = auth.uid()
    );
$$;

REVOKE ALL ON FUNCTION public.list_workspace_member_ids(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.list_workspace_member_ids(uuid) TO authenticated;

NOTIFY pgrst, 'reload schema';
