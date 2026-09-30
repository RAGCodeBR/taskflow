-- Marketing categories reuse task_tags so each task can have one category in
-- tasks.tag_id. Members may read categories to classify work; only admins may
-- change the Marketing list itself. Other workspaces retain their current tag
-- management rules.
DROP POLICY IF EXISTS workspace_task_tags_access ON public.task_tags;
DROP POLICY IF EXISTS workspace_task_tags_select ON public.task_tags;
DROP POLICY IF EXISTS workspace_task_tags_insert ON public.task_tags;
DROP POLICY IF EXISTS workspace_task_tags_update ON public.task_tags;
DROP POLICY IF EXISTS workspace_task_tags_delete ON public.task_tags;

CREATE POLICY workspace_task_tags_select ON public.task_tags
  FOR SELECT TO authenticated
  USING (public.has_workspace_access(workspace_id));

CREATE POLICY workspace_task_tags_insert ON public.task_tags
  FOR INSERT TO authenticated
  WITH CHECK (
    public.has_workspace_access(workspace_id)
    AND (
      NOT EXISTS (
        SELECT 1 FROM public.workspaces
        WHERE id = workspace_id AND slug = 'marketing'
      )
      OR public.has_role(auth.uid(), 'admin'::public.app_role)
    )
  );

CREATE POLICY workspace_task_tags_update ON public.task_tags
  FOR UPDATE TO authenticated
  USING (
    public.has_workspace_access(workspace_id)
    AND (
      NOT EXISTS (
        SELECT 1 FROM public.workspaces
        WHERE id = workspace_id AND slug = 'marketing'
      )
      OR public.has_role(auth.uid(), 'admin'::public.app_role)
    )
  )
  WITH CHECK (
    public.has_workspace_access(workspace_id)
    AND (
      NOT EXISTS (
        SELECT 1 FROM public.workspaces
        WHERE id = workspace_id AND slug = 'marketing'
      )
      OR public.has_role(auth.uid(), 'admin'::public.app_role)
    )
  );

CREATE POLICY workspace_task_tags_delete ON public.task_tags
  FOR DELETE TO authenticated
  USING (
    public.has_workspace_access(workspace_id)
    AND (
      NOT EXISTS (
        SELECT 1 FROM public.workspaces
        WHERE id = workspace_id AND slug = 'marketing'
      )
      OR public.has_role(auth.uid(), 'admin'::public.app_role)
    )
  );
