-- Child rows inherit the workspace of their parent record. This closes the
-- direct-query paths used by reports, dialogs and attachments.

CREATE OR REPLACE FUNCTION public.can_access_workspace_task(_task_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.tasks WHERE id = _task_id AND public.has_workspace_access(workspace_id))
$$;

CREATE OR REPLACE FUNCTION public.can_access_workspace_client(_client_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.clients WHERE id = _client_id AND public.has_workspace_access(workspace_id))
$$;

CREATE OR REPLACE FUNCTION public.can_access_workspace_department(_department_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.client_departments d
    JOIN public.clients c ON c.id = d.client_id
    WHERE d.id = _department_id AND public.has_workspace_access(c.workspace_id)
  )
$$;

CREATE OR REPLACE FUNCTION public.can_access_workspace_employee(_employee_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.client_department_employees e
    JOIN public.client_departments d ON d.id = e.department_id
    JOIN public.clients c ON c.id = d.client_id
    WHERE e.id = _employee_id AND public.has_workspace_access(c.workspace_id)
  )
$$;

CREATE OR REPLACE FUNCTION public.can_access_workspace_mural_post(_post_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.mural_posts WHERE id = _post_id AND public.has_workspace_access(workspace_id))
$$;

CREATE OR REPLACE FUNCTION public.can_access_workspace_request(_request_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.service_requests WHERE id = _request_id AND public.has_workspace_access(workspace_id))
$$;

CREATE OR REPLACE FUNCTION public.can_access_workspace_note(_note_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.client_notes n
    JOIN public.clients c ON c.id = n.client_id
    WHERE n.id = _note_id AND public.has_workspace_access(c.workspace_id)
  )
$$;

DO $$
DECLARE p RECORD;
BEGIN
  FOR p IN SELECT tablename, policyname FROM pg_policies
    WHERE schemaname = 'public' AND tablename IN (
      'subtasks','comments','attachments','task_history','task_collaborators','task_tag_links',
      'task_due_date_changes','subtask_due_date_changes','subtask_attachments','comment_attachments','comment_mentions',
      'client_departments','client_department_employees','client_department_employee_notes','client_department_employee_attachments',
      'client_system_accesses','client_branches','client_notes','client_note_attachments','client_files','client_invoices',
      'mural_post_attachments','mural_post_reactions','mural_post_reads','mural_post_orders',
      'service_request_messages','service_request_participants','service_request_assignees','service_request_attachments','service_request_activity'
    )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', p.policyname, p.tablename);
  END LOOP;
END $$;

DO $$
DECLARE tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['subtasks','comments','attachments','task_history','task_collaborators','task_tag_links','task_due_date_changes'] LOOP
    EXECUTE format('CREATE POLICY workspace_%I_parent ON public.%I FOR ALL TO authenticated USING (public.can_access_workspace_task(task_id)) WITH CHECK (public.can_access_workspace_task(task_id))', tbl, tbl);
  END LOOP;
  FOREACH tbl IN ARRAY ARRAY['subtask_due_date_changes','subtask_attachments'] LOOP
    EXECUTE format('CREATE POLICY workspace_%I_parent ON public.%I FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.subtasks s WHERE s.id = subtask_id AND public.can_access_workspace_task(s.task_id))) WITH CHECK (EXISTS (SELECT 1 FROM public.subtasks s WHERE s.id = subtask_id AND public.can_access_workspace_task(s.task_id)))', tbl, tbl);
  END LOOP;
  FOREACH tbl IN ARRAY ARRAY['comment_attachments','comment_mentions'] LOOP
    EXECUTE format('CREATE POLICY workspace_%I_parent ON public.%I FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.comments c WHERE c.id = comment_id AND public.can_access_workspace_task(c.task_id))) WITH CHECK (EXISTS (SELECT 1 FROM public.comments c WHERE c.id = comment_id AND public.can_access_workspace_task(c.task_id)))', tbl, tbl);
  END LOOP;
  FOREACH tbl IN ARRAY ARRAY['client_departments','client_system_accesses','client_branches','client_notes','client_files','client_invoices'] LOOP
    EXECUTE format('CREATE POLICY workspace_%I_parent ON public.%I FOR ALL TO authenticated USING (public.can_access_workspace_client(client_id)) WITH CHECK (public.can_access_workspace_client(client_id))', tbl, tbl);
  END LOOP;
  EXECUTE 'CREATE POLICY workspace_client_department_employees_parent ON public.client_department_employees FOR ALL TO authenticated USING (public.can_access_workspace_department(department_id)) WITH CHECK (public.can_access_workspace_department(department_id))';
  FOREACH tbl IN ARRAY ARRAY['client_department_employee_notes','client_department_employee_attachments'] LOOP
    EXECUTE format('CREATE POLICY workspace_%I_parent ON public.%I FOR ALL TO authenticated USING (public.can_access_workspace_employee(employee_id)) WITH CHECK (public.can_access_workspace_employee(employee_id))', tbl, tbl);
  END LOOP;
  EXECUTE 'CREATE POLICY workspace_client_note_attachments_parent ON public.client_note_attachments FOR ALL TO authenticated USING (public.can_access_workspace_note(note_id)) WITH CHECK (public.can_access_workspace_note(note_id))';
  FOREACH tbl IN ARRAY ARRAY['mural_post_attachments','mural_post_reactions','mural_post_reads','mural_post_orders'] LOOP
    EXECUTE format('CREATE POLICY workspace_%I_parent ON public.%I FOR ALL TO authenticated USING (public.can_access_workspace_mural_post(post_id)) WITH CHECK (public.can_access_workspace_mural_post(post_id))', tbl, tbl);
  END LOOP;
  FOREACH tbl IN ARRAY ARRAY['service_request_messages','service_request_participants','service_request_assignees','service_request_attachments','service_request_activity'] LOOP
    EXECUTE format('CREATE POLICY workspace_%I_parent ON public.%I FOR ALL TO authenticated USING (public.can_access_workspace_request(request_id)) WITH CHECK (public.can_access_workspace_request(request_id))', tbl, tbl);
  END LOOP;
END $$;
