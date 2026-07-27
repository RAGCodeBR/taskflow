-- Return only users that may be assigned to tasks, without exposing user_roles.
CREATE OR REPLACE FUNCTION public.list_task_assignees()
RETURNS TABLE (
  id uuid,
  full_name text,
  email text,
  avatar_url text,
  is_active boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id,
    p.full_name,
    p.email,
    p.avatar_url,
    COALESCE(p.is_active, true)
  FROM public.profiles p
  INNER JOIN public.user_roles ur ON ur.user_id = p.id
  WHERE ur.role IN ('admin', 'collaborator')
    AND COALESCE(p.is_active, true);
$$;

REVOKE ALL ON FUNCTION public.list_task_assignees() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.list_task_assignees() TO authenticated;
