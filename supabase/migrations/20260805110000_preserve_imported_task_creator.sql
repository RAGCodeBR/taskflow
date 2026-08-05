-- Server-side imports use service_role to avoid restricting the Importar Ata
-- flow to a specific RLS policy. Preserve the authenticated creator supplied
-- by that trusted server flow, while browser inserts always use auth.uid().
CREATE OR REPLACE FUNCTION public.set_task_created_by()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF auth.uid() IS NOT NULL THEN
      NEW.created_by := auth.uid();
    ELSIF NEW.created_by IS NULL THEN
      RAISE EXCEPTION 'created_by is required for server-side task creation';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
