-- The set-returning access helper is for RLS only, not a public RPC endpoint.
CREATE SCHEMA IF NOT EXISTS taskflow_private;
REVOKE ALL ON SCHEMA taskflow_private FROM PUBLIC, anon;
GRANT USAGE ON SCHEMA taskflow_private TO authenticated;
ALTER FUNCTION public.readable_workspace_task_ids() SET SCHEMA taskflow_private;
REVOKE ALL ON FUNCTION taskflow_private.readable_workspace_task_ids() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION taskflow_private.readable_workspace_task_ids() TO authenticated;
-- Existing policy dependencies follow the function OID when its schema changes.
