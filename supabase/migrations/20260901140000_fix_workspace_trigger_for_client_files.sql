-- `assign_current_workspace` is shared by workspace-scoped tables.  Only
-- clients have `source_client_id`; accessing it directly from the trigger
-- record makes inserts on child tables (such as client_files) fail.
CREATE OR REPLACE FUNCTION public.assign_current_workspace()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  marketing_id uuid;
  consultoria_id uuid;
  is_directory_mirror boolean := false;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN NEW;
  END IF;

  IF NEW.workspace_id IS NULL THEN
    NEW.workspace_id := public.current_workspace_id();
  END IF;

  -- Use JSON for this optional field because this function also serves
  -- tables whose row type does not include source_client_id.
  IF TG_TABLE_NAME = 'clients'
     AND pg_trigger_depth() > 1
     AND (to_jsonb(NEW) ->> 'source_client_id') IS NOT NULL THEN
    SELECT id INTO marketing_id FROM public.workspaces WHERE slug = 'marketing';
    SELECT id INTO consultoria_id FROM public.workspaces WHERE slug = 'consultoria';
    is_directory_mirror := NEW.workspace_id = marketing_id
      AND EXISTS (
        SELECT 1
        FROM public.clients AS source_client
        WHERE source_client.id = (to_jsonb(NEW) ->> 'source_client_id')::uuid
          AND source_client.workspace_id = consultoria_id
      );
  END IF;

  IF NOT public.has_workspace_access(NEW.workspace_id) AND NOT is_directory_mirror THEN
    RAISE EXCEPTION 'You cannot write records in this TaskFlow environment';
  END IF;
  RETURN NEW;
END;
$$;

NOTIFY pgrst, 'reload schema';
