ALTER TABLE public.client_department_employees
  ADD COLUMN IF NOT EXISTS person_type text NOT NULL DEFAULT 'individual',
  ADD COLUMN IF NOT EXISTS document text;

ALTER TABLE public.client_department_employees
  DROP CONSTRAINT IF EXISTS client_department_employees_person_type_check,
  ADD CONSTRAINT client_department_employees_person_type_check
    CHECK (person_type IN ('individual', 'company'));

NOTIFY pgrst, 'reload schema';
