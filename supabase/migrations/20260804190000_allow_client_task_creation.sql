-- Client portal users can create tasks only for the client account to which
-- they are linked. Internal users retain the existing ability to create tasks.
DROP POLICY IF EXISTS tasks_insert ON public.tasks;

CREATE POLICY tasks_insert ON public.tasks
  FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND (
      NOT public.has_role(auth.uid(), 'client'::public.app_role)
      OR client_id = public.current_client_id()
    )
  );
