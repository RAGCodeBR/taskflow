-- Collaborators can maintain operational client data, while deleting clients
-- remains restricted to administrators.

DROP POLICY IF EXISTS clients_update_admin ON public.clients;
CREATE POLICY clients_update_staff ON public.clients
  FOR UPDATE TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );

DROP POLICY IF EXISTS client_departments_insert_admin ON public.client_departments;
DROP POLICY IF EXISTS client_departments_update_admin ON public.client_departments;
CREATE POLICY client_departments_insert_staff ON public.client_departments
  FOR INSERT TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );
CREATE POLICY client_departments_update_staff ON public.client_departments
  FOR UPDATE TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );

DROP POLICY IF EXISTS client_department_employees_insert_admin ON public.client_department_employees;
DROP POLICY IF EXISTS client_department_employees_update_admin ON public.client_department_employees;
CREATE POLICY client_department_employees_insert_staff ON public.client_department_employees
  FOR INSERT TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );
CREATE POLICY client_department_employees_update_staff ON public.client_department_employees
  FOR UPDATE TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );

DROP POLICY IF EXISTS client_system_accesses_select_admin ON public.client_system_accesses;
DROP POLICY IF EXISTS client_system_accesses_insert_admin ON public.client_system_accesses;
DROP POLICY IF EXISTS client_system_accesses_update_admin ON public.client_system_accesses;
CREATE POLICY client_system_accesses_select_staff ON public.client_system_accesses
  FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );
CREATE POLICY client_system_accesses_insert_staff ON public.client_system_accesses
  FOR INSERT TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );
CREATE POLICY client_system_accesses_update_staff ON public.client_system_accesses
  FOR UPDATE TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );

DROP POLICY IF EXISTS client_branches_select_admin ON public.client_branches;
DROP POLICY IF EXISTS client_branches_insert_admin ON public.client_branches;
DROP POLICY IF EXISTS client_branches_update_admin ON public.client_branches;
CREATE POLICY client_branches_select_staff ON public.client_branches
  FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );
CREATE POLICY client_branches_insert_staff ON public.client_branches
  FOR INSERT TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );
CREATE POLICY client_branches_update_staff ON public.client_branches
  FOR UPDATE TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );
