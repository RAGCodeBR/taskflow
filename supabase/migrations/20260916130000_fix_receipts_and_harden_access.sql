-- Avoid racing task deletion and offline task creation when saving read receipts.
-- SECURITY INVOKER preserves the existing task/receipt RLS and column grants.
CREATE OR REPLACE FUNCTION public.set_task_conversation_read(
  target_task_id uuid,
  mark_unread boolean DEFAULT false
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $function$
DECLARE
  actor uuid := auth.uid();
BEGIN
  IF actor IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;
  IF target_task_id IS NULL OR mark_unread IS NULL THEN
    RETURN false;
  END IF;

  -- Lock the parent until the receipt is saved. If the task disappeared or is
  -- not visible under RLS, leave the receipt untouched instead of violating FK.
  PERFORM t.id FROM public.tasks t
  WHERE t.id = target_task_id AND t.deleted_at IS NULL
  FOR KEY SHARE;
  IF NOT FOUND THEN
    RETURN false;
  END IF;

  INSERT INTO public.task_conversation_reads AS existing
    (user_id, task_id, last_read_at, manual_unread)
  VALUES (actor, target_task_id, CASE WHEN mark_unread THEN '1970-01-01 00:00:00+00'::timestamptz ELSE clock_timestamp() END, mark_unread)
  ON CONFLICT (user_id, task_id) DO UPDATE
    SET last_read_at = CASE WHEN mark_unread THEN existing.last_read_at
                           ELSE GREATEST(existing.last_read_at, EXCLUDED.last_read_at) END,
        manual_unread = EXCLUDED.manual_unread;
  RETURN true;
END;
$function$;
REVOKE ALL ON FUNCTION public.set_task_conversation_read(uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_task_conversation_read(uuid, boolean) TO authenticated;

-- Built-in string conversion only; no mutable relation search path is needed.
ALTER FUNCTION public.fix_ptbr_mojibake(text) SET search_path = '';

-- These functions belong to the signed-in application. Preserve authenticated
-- execution for RPC/RLS helpers; trigger functions execute via their triggers.
GRANT EXECUTE ON FUNCTION public.can_access_task_conversation(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.can_access_task_conversation(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_get_profile_emails() TO authenticated;
REVOKE EXECUTE ON FUNCTION public.admin_get_profile_emails() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.prevent_inactive_client_obligation() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.prevent_inactive_client_service_request() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.archive_inactive_client_operations() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.prevent_inactive_client_task_assignment() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid,app_role) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid,app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.notify_task_assignment() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.notify_task_attachment() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.notify_task_comment() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.can_manage_task_collaborators(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.can_manage_task_collaborators(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.notify_subtask_assignment() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.current_client_id() TO authenticated;
REVOKE EXECUTE ON FUNCTION public.current_client_id() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.notify_task_collaborator_added() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.add_profile_to_consultoria() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.notify_subtask_completion() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.notify_task_completion() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.can_access_service_request(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.can_access_service_request(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.notify_comment_mention() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.can_access_workspace_employee(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.can_access_workspace_employee(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_access_workspace_mural_post(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.can_access_workspace_mural_post(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_access_workspace_request(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.can_access_workspace_request(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_access_workspace_note(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.can_access_workspace_note(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.touch_service_request() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_service_request_creator() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.can_change_active_workspace() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.current_workspace_id() TO authenticated;
REVOKE EXECUTE ON FUNCTION public.current_workspace_id() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.create_service_request(text,text,uuid,text,date,uuid[]) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.create_service_request(text,text,uuid,text,date,uuid[]) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.notify_service_request_member() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.can_access_workspace_client(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.can_access_workspace_client(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_access_workspace_department(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.can_access_workspace_department(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_access_workspace_task(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.can_access_workspace_task(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_workspace_access(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.has_workspace_access(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.select_active_workspace(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.select_active_workspace(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.sync_consultoria_client_to_marketing() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.set_marketing_user_access(uuid,boolean) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.set_marketing_user_access(uuid,boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_taskflow_access_manager(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.is_taskflow_access_manager(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.assign_current_workspace() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.prepare_obligation() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_obligation_occurrence_from_task() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.participates_in_task(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.participates_in_task(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_create_in_workspace(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.can_create_in_workspace(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.guard_cross_workspace_task_update() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.list_task_assignees(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.list_task_assignees(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.assign_task_workspace() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.list_related_client_names() TO authenticated;
REVOKE EXECUTE ON FUNCTION public.list_related_client_names() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_sync_client_file_from_task(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.can_sync_client_file_from_task(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.notify_mural_post_activity() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.add_mentioned_as_collaborator() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.guard_comment_edit() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.can_oversee_task_conversation(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.can_oversee_task_conversation(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.list_workspace_member_ids(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.list_workspace_member_ids(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_manage_workspace_user(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.can_manage_workspace_user(uuid) FROM PUBLIC, anon;

-- Notifications are written by SECURITY DEFINER triggers/server services.
-- The browser only reads, marks as read and deletes its own notifications.
DROP POLICY IF EXISTS notifs_insert_any ON public.notifications;

-- Public avatar URLs still work. Restrict Storage object listing to the owner.
ALTER POLICY profile_avatars_select ON storage.objects TO authenticated
  USING (bucket_id = 'profile-avatars' AND (storage.foldername(name))[1] = (SELECT auth.uid())::text);

-- Evaluate identity once per statement, preserving every existing predicate.
ALTER POLICY "task_conversation_reads_delete" ON public."task_conversation_reads" USING ((user_id = (SELECT auth.uid())));
ALTER POLICY "task_conversation_reads_select" ON public."task_conversation_reads" USING (((user_id = (SELECT auth.uid())) OR can_access_task_conversation(task_id) OR can_oversee_task_conversation(task_id)));
ALTER POLICY "task_conversation_reads_update" ON public."task_conversation_reads" USING ((user_id = (SELECT auth.uid()))) WITH CHECK ((user_id = (SELECT auth.uid())));
ALTER POLICY "task_conversation_reads_write" ON public."task_conversation_reads" WITH CHECK ((user_id = (SELECT auth.uid())));
ALTER POLICY "roles_select_own" ON public."user_roles" USING (((user_id = (SELECT auth.uid())) OR has_role((SELECT auth.uid()), 'admin'::app_role)));
ALTER POLICY "calendar_sources_team_select" ON public."calendar_sources" USING ((has_role((SELECT auth.uid()), 'admin'::app_role) OR has_role((SELECT auth.uid()), 'collaborator'::app_role)));
ALTER POLICY "calendar_source_preferences_own" ON public."calendar_source_preferences" USING ((user_id = (SELECT auth.uid()))) WITH CHECK ((user_id = (SELECT auth.uid())));
ALTER POLICY "workspace_access_settings_admin_read" ON public."workspace_access_settings" USING (has_role((SELECT auth.uid()), 'admin'::app_role));
ALTER POLICY "workspace_tasks_select" ON public."tasks" USING ((has_workspace_access(workspace_id) OR participates_in_task(id) OR ((origin_workspace_id IS DISTINCT FROM workspace_id) AND (created_by = (SELECT auth.uid())) AND has_workspace_access(origin_workspace_id))));
ALTER POLICY "task_interruptions_delete" ON public."task_interruptions" USING ((((SELECT auth.uid()) = user_id) OR has_role((SELECT auth.uid()), 'admin'::app_role)));
ALTER POLICY "task_interruptions_update" ON public."task_interruptions" USING (((SELECT auth.uid()) = user_id)) WITH CHECK (((SELECT auth.uid()) = user_id));
ALTER POLICY "task_interruptions_write" ON public."task_interruptions" WITH CHECK ((((SELECT auth.uid()) = user_id) AND can_view_task(task_id)));
ALTER POLICY "workspace_board_preferences_own" ON public."board_preferences" USING (((user_id = (SELECT auth.uid())) AND has_workspace_access(workspace_id))) WITH CHECK (((user_id = (SELECT auth.uid())) AND has_workspace_access(workspace_id)));
ALTER POLICY "workspace_user_column_order_own" ON public."user_column_order" USING (((user_id = (SELECT auth.uid())) AND has_workspace_access(workspace_id))) WITH CHECK (((user_id = (SELECT auth.uid())) AND has_workspace_access(workspace_id)));
ALTER POLICY "workspace_user_task_order_own" ON public."user_task_order" USING (((user_id = (SELECT auth.uid())) AND has_workspace_access(workspace_id))) WITH CHECK (((user_id = (SELECT auth.uid())) AND has_workspace_access(workspace_id)));
ALTER POLICY "profiles_insert_own" ON public."profiles" WITH CHECK (((SELECT auth.uid()) = id));
ALTER POLICY "profiles_update_own_or_workspace_admin" ON public."profiles" USING ((((SELECT auth.uid()) = id) OR can_manage_workspace_user(id))) WITH CHECK ((((SELECT auth.uid()) = id) OR can_manage_workspace_user(id)));
ALTER POLICY "own_notifs_delete" ON public."notifications" USING (((SELECT auth.uid()) = user_id));
ALTER POLICY "own_notifs_select" ON public."notifications" USING (((SELECT auth.uid()) = user_id));
ALTER POLICY "own_notifs_update" ON public."notifications" USING (((SELECT auth.uid()) = user_id)) WITH CHECK (((SELECT auth.uid()) = user_id));
ALTER POLICY "meeting_minutes_team_select" ON public."meeting_minutes" USING ((has_role((SELECT auth.uid()), 'admin'::app_role) OR has_role((SELECT auth.uid()), 'collaborator'::app_role)));
ALTER POLICY "user_permissions_select_own_or_admin" ON public."user_permissions" USING (((user_id = (SELECT auth.uid())) OR has_role((SELECT auth.uid()), 'admin'::app_role)));
ALTER POLICY "client_user_links_select" ON public."client_user_links" USING (((user_id = (SELECT auth.uid())) OR has_role((SELECT auth.uid()), 'admin'::app_role)));
ALTER POLICY "memberships_select_own_or_admin" ON public."workspace_memberships" USING (((user_id = (SELECT auth.uid())) OR has_role((SELECT auth.uid()), 'admin'::app_role)));
ALTER POLICY "workspaces_select_member" ON public."workspaces" USING ((EXISTS ( SELECT 1
   FROM workspace_memberships m
  WHERE ((m.workspace_id = workspaces.id) AND (m.user_id = (SELECT auth.uid()))))));
ALTER POLICY "calendar_events_team_insert" ON public."calendar_events" WITH CHECK (((has_role((SELECT auth.uid()), 'admin'::app_role) OR has_role((SELECT auth.uid()), 'collaborator'::app_role)) AND (created_by = (SELECT auth.uid())) AND ((updated_by IS NULL) OR (updated_by = (SELECT auth.uid())))));
ALTER POLICY "calendar_events_team_select" ON public."calendar_events" USING ((has_role((SELECT auth.uid()), 'admin'::app_role) OR has_role((SELECT auth.uid()), 'collaborator'::app_role)));
ALTER POLICY "calendar_events_team_update" ON public."calendar_events" USING ((has_role((SELECT auth.uid()), 'admin'::app_role) OR has_role((SELECT auth.uid()), 'collaborator'::app_role))) WITH CHECK ((has_role((SELECT auth.uid()), 'admin'::app_role) OR has_role((SELECT auth.uid()), 'collaborator'::app_role)));
ALTER POLICY "calendar_google_connections_select_own" ON public."calendar_google_connections" USING ((user_id = (SELECT auth.uid())));

NOTIFY pgrst, 'reload schema';
