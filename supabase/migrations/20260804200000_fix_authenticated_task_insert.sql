-- The import flow already uses the authenticated browser session. Keep task
-- creation available to every signed-in workspace user; read, update and
-- delete permissions remain governed by their dedicated RLS policies.
DROP POLICY IF EXISTS tasks_insert ON public.tasks;

CREATE POLICY tasks_insert ON public.tasks
  FOR INSERT TO authenticated
  WITH CHECK (true);
