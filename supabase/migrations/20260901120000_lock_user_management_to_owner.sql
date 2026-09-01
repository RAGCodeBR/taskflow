-- User management is centralized. Other administrators retain their own
-- profile editing through the regular profile policy, but cannot manage peers.

CREATE OR REPLACE FUNCTION public.is_taskflow_access_manager(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = _user_id
      AND lower(email) = 'reinangrupoahouse@gmail.com'
  )
$$;

REVOKE ALL ON FUNCTION public.is_taskflow_access_manager(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_taskflow_access_manager(uuid) TO authenticated;

DROP POLICY IF EXISTS profiles_update_own_or_admin ON public.profiles;
CREATE POLICY profiles_update_own_or_manager
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id OR public.is_taskflow_access_manager(auth.uid()))
  WITH CHECK (auth.uid() = id OR public.is_taskflow_access_manager(auth.uid()));

DROP POLICY IF EXISTS roles_admin_manage ON public.user_roles;
CREATE POLICY roles_manager_manage
  ON public.user_roles FOR ALL TO authenticated
  USING (public.is_taskflow_access_manager(auth.uid()))
  WITH CHECK (public.is_taskflow_access_manager(auth.uid()));

DROP POLICY IF EXISTS user_permissions_admin_manage ON public.user_permissions;
CREATE POLICY user_permissions_manager_manage
  ON public.user_permissions FOR ALL TO authenticated
  USING (public.is_taskflow_access_manager(auth.uid()))
  WITH CHECK (public.is_taskflow_access_manager(auth.uid()));

DROP POLICY IF EXISTS client_user_links_admin_manage ON public.client_user_links;
CREATE POLICY client_user_links_manager_manage
  ON public.client_user_links FOR ALL TO authenticated
  USING (public.is_taskflow_access_manager(auth.uid()))
  WITH CHECK (public.is_taskflow_access_manager(auth.uid()));

DROP POLICY IF EXISTS memberships_admin_manage ON public.workspace_memberships;
CREATE POLICY memberships_manager_manage
  ON public.workspace_memberships FOR ALL TO authenticated
  USING (public.is_taskflow_access_manager(auth.uid()))
  WITH CHECK (public.is_taskflow_access_manager(auth.uid()));

NOTIFY pgrst, 'reload schema';
