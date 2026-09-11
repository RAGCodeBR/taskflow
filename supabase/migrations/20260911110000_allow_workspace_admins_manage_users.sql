-- Every administrator can manage users that belong to their active workspace.
-- The former policies singled out one email address, leaving the other users
-- labelled as administrators without the corresponding management access.

CREATE OR REPLACE FUNCTION public.can_manage_workspace_user(_target_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin'::public.app_role)
    AND EXISTS (
      SELECT 1
      FROM public.workspace_memberships caller
      JOIN public.workspace_memberships target
        ON target.workspace_id = caller.workspace_id
      WHERE caller.user_id = auth.uid()
        AND caller.workspace_id = public.current_workspace_id()
        AND target.user_id = _target_user_id
    )
$$;

REVOKE ALL ON FUNCTION public.can_manage_workspace_user(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_manage_workspace_user(uuid) TO authenticated;

DROP POLICY IF EXISTS profiles_update_own_or_manager ON public.profiles;
CREATE POLICY profiles_update_own_or_workspace_admin
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id OR public.can_manage_workspace_user(id))
  WITH CHECK (auth.uid() = id OR public.can_manage_workspace_user(id));

DROP POLICY IF EXISTS roles_manager_manage ON public.user_roles;
CREATE POLICY roles_workspace_admin_manage
  ON public.user_roles FOR ALL TO authenticated
  USING (public.can_manage_workspace_user(user_id))
  WITH CHECK (public.can_manage_workspace_user(user_id));

DROP POLICY IF EXISTS user_permissions_manager_manage ON public.user_permissions;
CREATE POLICY user_permissions_workspace_admin_manage
  ON public.user_permissions FOR ALL TO authenticated
  USING (public.can_manage_workspace_user(user_id))
  WITH CHECK (public.can_manage_workspace_user(user_id));

DROP POLICY IF EXISTS client_user_links_manager_manage ON public.client_user_links;
CREATE POLICY client_user_links_workspace_admin_manage
  ON public.client_user_links FOR ALL TO authenticated
  USING (public.can_manage_workspace_user(user_id))
  WITH CHECK (public.can_manage_workspace_user(user_id));

DROP POLICY IF EXISTS memberships_manager_manage ON public.workspace_memberships;
CREATE POLICY memberships_workspace_admin_manage
  ON public.workspace_memberships FOR ALL TO authenticated
  USING (public.can_manage_workspace_user(user_id))
  WITH CHECK (public.can_manage_workspace_user(user_id));

NOTIFY pgrst, 'reload schema';
