-- A workspace decision is profile state, read on every request. Mark these
-- helpers VOLATILE so a prepared REST query never retains the previous
-- workspace after the profile was updated by select_active_workspace.

CREATE OR REPLACE FUNCTION public.current_workspace_id()
RETURNS UUID
LANGUAGE sql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT active_workspace_id
  FROM public.profiles
  WHERE id = auth.uid()
$$;

CREATE OR REPLACE FUNCTION public.has_workspace_access(_workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT _workspace_id IS NOT NULL
    AND _workspace_id = public.current_workspace_id()
    AND EXISTS (
      SELECT 1
      FROM public.workspace_memberships
      WHERE workspace_id = _workspace_id
        AND user_id = auth.uid()
    )
$$;

CREATE OR REPLACE FUNCTION public.select_active_workspace(target_workspace_id UUID)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_id UUID := auth.uid();
BEGIN
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'You must be signed in to select a TaskFlow environment';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.workspace_memberships
    WHERE workspace_id = target_workspace_id
      AND user_id = current_user_id
  ) THEN
    RAISE EXCEPTION 'You do not have access to this TaskFlow environment';
  END IF;

  UPDATE public.profiles
  SET active_workspace_id = target_workspace_id
  WHERE id = current_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'TaskFlow profile was not found';
  END IF;

  RETURN target_workspace_id;
END;
$$;

REVOKE ALL ON FUNCTION public.select_active_workspace(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.select_active_workspace(UUID) TO authenticated;
NOTIFY pgrst, 'reload schema';
