-- The authenticated profile query also reads the active environment.  The
-- email privacy migration grants profile fields by column, so this new column
-- must be explicitly granted or the entire profile request fails (including
-- the name and avatar fields).
GRANT SELECT (active_workspace_id) ON public.profiles TO authenticated;

NOTIFY pgrst, 'reload schema';
