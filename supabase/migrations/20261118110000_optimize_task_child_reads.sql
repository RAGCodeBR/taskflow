-- Compute exactly the existing child-record access rule once per SELECT,
-- rather than running nested SECURITY DEFINER lookups for every child row.
-- Writes keep their existing checks and deletion-protection triggers.
SET lock_timeout = '2s';

CREATE FUNCTION public.readable_workspace_task_ids()
RETURNS uuid[]
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  WITH context AS MATERIALIZED (
    SELECT auth.uid() AS uid, public.current_workspace_id() AS workspace_id,
           public.has_role(auth.uid(), 'admin'::public.app_role) AS is_admin
  ), memberships AS MATERIALIZED (
    SELECT m.workspace_id FROM public.workspace_memberships m, context c
    WHERE m.user_id = c.uid
  ), assigned AS MATERIALIZED (
    SELECT tc.task_id FROM public.task_collaborators tc, context c WHERE tc.collaborator_id = c.uid
    UNION
    SELECT s.task_id FROM public.subtasks s, context c WHERE s.assignee_id = c.uid
  )
  SELECT coalesce(array_agg(t.id), '{}'::uuid[])
  FROM public.tasks t CROSS JOIN context c
  WHERE c.uid IS NOT NULL AND (
    EXISTS (SELECT 1 FROM memberships m WHERE m.workspace_id = t.workspace_id
            AND (c.workspace_id = t.workspace_id OR c.is_admin))
    OR (
      NOT EXISTS (SELECT 1 FROM memberships m WHERE m.workspace_id = t.workspace_id)
      AND (t.assignee_id = c.uid OR t.id IN (SELECT task_id FROM assigned))
    )
  );
$$;

REVOKE ALL ON FUNCTION public.readable_workspace_task_ids() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.readable_workspace_task_ids() TO authenticated;

DO $$
DECLARE tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['subtasks', 'task_collaborators'] LOOP
    EXECUTE format('DROP POLICY workspace_%I_parent ON public.%I', tbl, tbl);
    EXECUTE format('CREATE POLICY workspace_%I_read ON public.%I FOR SELECT TO authenticated USING (task_id = ANY ((SELECT public.readable_workspace_task_ids())::uuid[]))', tbl, tbl);
    EXECUTE format('CREATE POLICY workspace_%I_insert ON public.%I FOR INSERT TO authenticated WITH CHECK (public.can_access_workspace_task(task_id))', tbl, tbl);
    EXECUTE format('CREATE POLICY workspace_%I_update ON public.%I FOR UPDATE TO authenticated USING (public.can_access_workspace_task(task_id)) WITH CHECK (public.can_access_workspace_task(task_id))', tbl, tbl);
    EXECUTE format('CREATE POLICY workspace_%I_delete ON public.%I FOR DELETE TO authenticated USING (public.can_access_workspace_task(task_id))', tbl, tbl);
  END LOOP;
END $$;

RESET lock_timeout;
