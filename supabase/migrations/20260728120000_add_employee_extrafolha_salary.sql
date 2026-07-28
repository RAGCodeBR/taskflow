-- Keeps the existing salary as the gross salary and stores the off-payroll amount separately.
ALTER TABLE public.client_department_employees
  ADD COLUMN IF NOT EXISTS salary_extrafolha numeric(12, 2);

NOTIFY pgrst, 'reload schema';
