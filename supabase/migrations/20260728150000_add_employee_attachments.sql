CREATE TABLE IF NOT EXISTS public.client_department_employee_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES public.client_department_employees(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  storage_path text NOT NULL,
  mime_type text,
  size_bytes bigint,
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS client_department_employee_attachments_employee_id_idx
  ON public.client_department_employee_attachments(employee_id);

ALTER TABLE public.client_department_employee_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY client_department_employee_attachments_select_admin
  ON public.client_department_employee_attachments
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY client_department_employee_attachments_insert_admin
  ON public.client_department_employee_attachments
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) AND uploaded_by = auth.uid());
CREATE POLICY client_department_employee_attachments_delete_admin
  ON public.client_department_employee_attachments
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
