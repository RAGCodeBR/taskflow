ALTER TABLE public.client_department_employee_attachments
  ADD COLUMN IF NOT EXISTS title text;

NOTIFY pgrst, 'reload schema';
