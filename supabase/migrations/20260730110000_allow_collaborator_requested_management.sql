-- Shared management requested for collaborators.

DROP POLICY IF EXISTS task_tags_admin_write ON public.task_tags;
CREATE POLICY task_tags_staff_write ON public.task_tags
  FOR ALL TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );

DROP POLICY IF EXISTS clients_insert_admin ON public.clients;
DROP POLICY IF EXISTS clients_delete_admin ON public.clients;
CREATE POLICY clients_insert_staff ON public.clients
  FOR INSERT TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );
CREATE POLICY clients_delete_staff ON public.clients
  FOR DELETE TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );

DROP POLICY IF EXISTS client_department_employees_delete_admin ON public.client_department_employees;
CREATE POLICY client_department_employees_delete_staff ON public.client_department_employees
  FOR DELETE TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );

DROP POLICY IF EXISTS client_department_employee_attachments_select_admin ON public.client_department_employee_attachments;
DROP POLICY IF EXISTS client_department_employee_attachments_insert_admin ON public.client_department_employee_attachments;
DROP POLICY IF EXISTS client_department_employee_attachments_delete_admin ON public.client_department_employee_attachments;
CREATE POLICY client_department_employee_attachments_select_staff ON public.client_department_employee_attachments
  FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );
CREATE POLICY client_department_employee_attachments_insert_staff ON public.client_department_employee_attachments
  FOR INSERT TO authenticated
  WITH CHECK (
    uploaded_by = auth.uid()
    AND (
      public.has_role(auth.uid(), 'admin'::public.app_role)
      OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
    )
  );
CREATE POLICY client_department_employee_attachments_delete_staff ON public.client_department_employee_attachments
  FOR DELETE TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );

DROP POLICY IF EXISTS client_department_employee_notes_insert_admin ON public.client_department_employee_notes;
DROP POLICY IF EXISTS client_department_employee_notes_update_admin ON public.client_department_employee_notes;
DROP POLICY IF EXISTS client_department_employee_notes_delete_admin ON public.client_department_employee_notes;
CREATE POLICY client_department_employee_notes_insert_staff ON public.client_department_employee_notes
  FOR INSERT TO authenticated
  WITH CHECK (
    created_by = auth.uid()
    AND (
      public.has_role(auth.uid(), 'admin'::public.app_role)
      OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
    )
  );
CREATE POLICY client_department_employee_notes_update_staff ON public.client_department_employee_notes
  FOR UPDATE TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );
CREATE POLICY client_department_employee_notes_delete_staff ON public.client_department_employee_notes
  FOR DELETE TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );

DROP POLICY IF EXISTS task_attachments_delete_own ON storage.objects;
CREATE POLICY task_attachments_delete_staff_or_owner ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'task-attachments'
    AND (
      owner = auth.uid()
      OR public.has_role(auth.uid(), 'admin'::public.app_role)
      OR EXISTS (
        SELECT 1 FROM public.attachments attachment
        WHERE attachment.storage_path = storage.objects.name
          AND attachment.uploaded_by = auth.uid()
      )
      OR EXISTS (
        SELECT 1 FROM public.comment_attachments attachment
        WHERE attachment.storage_path = storage.objects.name
          AND attachment.uploaded_by = auth.uid()
      )
      OR EXISTS (
        SELECT 1 FROM public.client_note_attachments attachment
        WHERE attachment.storage_path = storage.objects.name
          AND attachment.uploaded_by = auth.uid()
      )
      OR EXISTS (
        SELECT 1 FROM public.client_files file
        WHERE file.storage_path = storage.objects.name
          AND file.uploaded_by = auth.uid()
      )
      OR EXISTS (
        SELECT 1
        FROM public.client_department_employee_attachments attachment
        WHERE attachment.storage_path = storage.objects.name
          AND public.has_role(auth.uid(), 'collaborator'::public.app_role)
      )
    )
  );
