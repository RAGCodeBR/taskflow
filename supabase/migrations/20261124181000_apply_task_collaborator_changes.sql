-- Apply only the editor's explicit additions/removals in one transaction.
-- Use the caller's permissions for every row and the existing notification trigger.
CREATE FUNCTION public.apply_task_collaborator_changes(p_task_id uuid, p_add uuid[], p_remove uuid[])
RETURNS boolean
LANGUAGE plpgsql SECURITY INVOKER SET search_path = ''
AS $$
DECLARE
  inserted_count integer;
  removed_count integer;
BEGIN
  IF auth.uid() IS NULL OR NOT public.can_manage_task_collaborators(p_task_id)
     OR NOT public.can_access_workspace_task(p_task_id) THEN
    RAISE insufficient_privilege USING MESSAGE = 'Sem permissão para alterar os colaboradores desta tarefa.';
  END IF;
  INSERT INTO public.task_collaborators (task_id, collaborator_id, added_by)
    SELECT p_task_id, id, auth.uid() FROM (SELECT DISTINCT unnest(p_add) AS id) additions
    ORDER BY id
    ON CONFLICT (task_id, collaborator_id) DO NOTHING;
  GET DIAGNOSTICS inserted_count = ROW_COUNT;
  DELETE FROM public.task_collaborators
    WHERE task_id = p_task_id AND collaborator_id = ANY(p_remove);
  GET DIAGNOSTICS removed_count = ROW_COUNT;
  RETURN inserted_count + removed_count > 0;
END;
$$;
REVOKE ALL ON FUNCTION public.apply_task_collaborator_changes(uuid, uuid[], uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.apply_task_collaborator_changes(uuid, uuid[], uuid[]) TO authenticated;
