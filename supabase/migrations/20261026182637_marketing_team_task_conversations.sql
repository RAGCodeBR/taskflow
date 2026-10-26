-- Marketing collaborators with Tasks access may inspect the conversation and
-- files of any task in their active workspace, including completed tasks.
-- Existing participation policies still govern writing and notifications.
CREATE OR REPLACE FUNCTION public.can_view_marketing_task_conversation(target_task_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT (SELECT auth.uid()) IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.tasks t
      JOIN public.workspaces w ON w.id = t.workspace_id
      JOIN public.workspace_memberships m
        ON m.workspace_id = t.workspace_id AND m.user_id = (SELECT auth.uid())
      WHERE t.id = target_task_id
        AND t.deleted_at IS NULL
        AND w.slug = 'marketing'
        AND m.role = 'collaborator'::public.app_role
        AND 'tasks' = ANY(m.permissions)
        AND public.has_workspace_access(t.workspace_id)
    )
$$;

REVOKE ALL ON FUNCTION public.can_view_marketing_task_conversation(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_view_marketing_task_conversation(uuid) TO authenticated;

CREATE POLICY marketing_team_comments_read ON public.comments
  FOR SELECT TO authenticated
  USING (public.can_view_marketing_task_conversation(task_id));

CREATE POLICY marketing_team_comment_mentions_read ON public.comment_mentions
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.comments c
    WHERE c.id = comment_id
      AND public.can_view_marketing_task_conversation(c.task_id)
  ));

CREATE POLICY marketing_team_comment_attachments_read ON public.comment_attachments
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.comments c
    WHERE c.id = comment_id
      AND public.can_view_marketing_task_conversation(c.task_id)
  ));

NOTIFY pgrst, 'reload schema';
