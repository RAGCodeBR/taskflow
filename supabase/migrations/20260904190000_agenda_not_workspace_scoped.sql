-- The shared Agenda was deliberately built as a company-wide area (see
-- 20260826150000_create_shared_agenda.sql: "administrators and collaborators
-- have the same full access"). 20260831110000_add_isolated_workspaces folded
-- calendar_events into the same workspace-isolation loop used for
-- tasks/clients, which was never the intent for this table.
--
-- Effects of that mistake:
--   - Every event pulled by the Google Calendar sync (which runs with the
--     service-role key and no end-user session) got workspace_id = NULL,
--     because assign_current_workspace() only assigns a workspace when
--     auth.uid() is present.
--   - has_workspace_access(NULL) is always false, so the SELECT policy
--     hid every synced event from every user, admins included.
--   - Only events created directly in TaskFlow before the isolation
--     migration (or via the authenticated browser client) kept a real
--     workspace_id and stayed visible.
--
-- This migration restores the original team-wide behavior. It does not
-- touch any row's data or drop the now-unused workspace_id column, so it
-- is fully reversible and safe to run against existing data.

DROP TRIGGER IF EXISTS trg_assign_workspace ON public.calendar_events;

DROP POLICY IF EXISTS workspace_calendar_events_access ON public.calendar_events;

CREATE POLICY calendar_events_team_select
  ON public.calendar_events FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );

CREATE POLICY calendar_events_team_insert
  ON public.calendar_events FOR INSERT TO authenticated
  WITH CHECK (
    (public.has_role(auth.uid(), 'admin'::public.app_role)
      OR public.has_role(auth.uid(), 'collaborator'::public.app_role))
    AND created_by = auth.uid()
    AND (updated_by IS NULL OR updated_by = auth.uid())
  );

CREATE POLICY calendar_events_team_update
  ON public.calendar_events FOR UPDATE TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
  );
