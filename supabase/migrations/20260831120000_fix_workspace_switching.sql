-- Switch the active workspace through a dedicated, authenticated operation.
-- A direct UPDATE on profiles can be filtered out by an existing profile RLS
-- rule without returning an error to the client, leaving the user in the
-- previous environment.  This function validates the membership explicitly
-- and performs the single profile update in a controlled context.

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
