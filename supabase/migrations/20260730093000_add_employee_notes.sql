CREATE TABLE IF NOT EXISTS public.client_department_employee_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES public.client_department_employees(id) ON DELETE CASCADE,
  content text NOT NULL CHECK (char_length(trim(content)) > 0),
  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS client_department_employee_notes_employee_idx
  ON public.client_department_employee_notes(employee_id, created_at DESC);

ALTER TABLE public.client_department_employee_notes ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.client_department_employee_notes TO authenticated;
GRANT ALL ON public.client_department_employee_notes TO service_role;

CREATE POLICY client_department_employee_notes_select_auth
  ON public.client_department_employee_notes FOR SELECT TO authenticated
  USING (true);

CREATE POLICY client_department_employee_notes_insert_admin
  ON public.client_department_employee_notes FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role) AND created_by = auth.uid());

CREATE POLICY client_department_employee_notes_update_admin
  ON public.client_department_employee_notes FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY client_department_employee_notes_delete_admin
  ON public.client_department_employee_notes FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP TRIGGER IF EXISTS trg_client_department_employee_notes_updated_at
  ON public.client_department_employee_notes;
CREATE TRIGGER trg_client_department_employee_notes_updated_at
  BEFORE UPDATE ON public.client_department_employee_notes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
