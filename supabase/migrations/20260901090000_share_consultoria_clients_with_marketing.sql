-- Marketing shares the client directory with Consultoria, but never its work.
-- Only basic client information is mirrored. Tasks, notes, files, invoices,
-- departments and every activity record remain in their original workspace.

ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS source_client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL;

CREATE UNIQUE INDEX IF NOT EXISTS clients_workspace_source_client_idx
  ON public.clients (workspace_id, source_client_id)
  WHERE source_client_id IS NOT NULL;

CREATE OR REPLACE FUNCTION public.sync_consultoria_client_to_marketing()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  consultoria_id uuid;
  marketing_id uuid;
BEGIN
  SELECT id INTO consultoria_id FROM public.workspaces WHERE slug = 'consultoria';
  SELECT id INTO marketing_id FROM public.workspaces WHERE slug = 'marketing';

  IF NEW.workspace_id <> consultoria_id OR NEW.source_client_id IS NOT NULL THEN
    RETURN NEW;
  END IF;

  INSERT INTO public.clients (
    workspace_id, source_client_id, name, color, description, created_by,
    cnpj, legal_name, trade_name, state_registration, municipal_registration,
    address, phone, email, responsible, avatar_path, is_active
  ) VALUES (
    marketing_id, NEW.id, NEW.name, NEW.color, NEW.description, NEW.created_by,
    NEW.cnpj, NEW.legal_name, NEW.trade_name, NEW.state_registration,
    NEW.municipal_registration, NEW.address, NEW.phone, NEW.email,
    NEW.responsible, NEW.avatar_path, NEW.is_active
  )
  ON CONFLICT (workspace_id, source_client_id) WHERE source_client_id IS NOT NULL
  DO UPDATE SET
    name = EXCLUDED.name,
    color = EXCLUDED.color,
    description = EXCLUDED.description,
    cnpj = EXCLUDED.cnpj,
    legal_name = EXCLUDED.legal_name,
    trade_name = EXCLUDED.trade_name,
    state_registration = EXCLUDED.state_registration,
    municipal_registration = EXCLUDED.municipal_registration,
    address = EXCLUDED.address,
    phone = EXCLUDED.phone,
    email = EXCLUDED.email,
    responsible = EXCLUDED.responsible,
    avatar_path = EXCLUDED.avatar_path,
    is_active = EXCLUDED.is_active;

  RETURN NEW;
END;
$$;

-- The mirror is written by the trusted trigger above. A normal browser write
-- is still limited to its active environment.
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

  IF TG_TABLE_NAME = 'clients'
     AND pg_trigger_depth() > 1
     AND NEW.source_client_id IS NOT NULL THEN
    SELECT id INTO marketing_id FROM public.workspaces WHERE slug = 'marketing';
    SELECT id INTO consultoria_id FROM public.workspaces WHERE slug = 'consultoria';
    is_directory_mirror := NEW.workspace_id = marketing_id
      AND EXISTS (
        SELECT 1
        FROM public.clients AS source_client
        WHERE source_client.id = NEW.source_client_id
          AND source_client.workspace_id = consultoria_id
      );
  END IF;

  IF NOT public.has_workspace_access(NEW.workspace_id) AND NOT is_directory_mirror THEN
    RAISE EXCEPTION 'You cannot write records in this TaskFlow environment';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_consultoria_client_to_marketing ON public.clients;
CREATE TRIGGER trg_sync_consultoria_client_to_marketing
  AFTER INSERT OR UPDATE OF name, color, description, cnpj, legal_name,
  trade_name, state_registration, municipal_registration, address, phone,
  email, responsible, avatar_path, is_active
  ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.sync_consultoria_client_to_marketing();

-- Copy the current directory once. The linked source id prevents duplicates.
INSERT INTO public.clients (
  workspace_id, source_client_id, name, color, description, created_by,
  cnpj, legal_name, trade_name, state_registration, municipal_registration,
  address, phone, email, responsible, avatar_path, is_active
)
SELECT
  (SELECT id FROM public.workspaces WHERE slug = 'marketing'),
  client.id, client.name, client.color, client.description, client.created_by,
  client.cnpj, client.legal_name, client.trade_name, client.state_registration,
  client.municipal_registration, client.address, client.phone, client.email,
  client.responsible, client.avatar_path, client.is_active
FROM public.clients AS client
WHERE client.workspace_id = (SELECT id FROM public.workspaces WHERE slug = 'consultoria')
  AND client.source_client_id IS NULL
ON CONFLICT (workspace_id, source_client_id) WHERE source_client_id IS NOT NULL
DO UPDATE SET
  name = EXCLUDED.name,
  color = EXCLUDED.color,
  description = EXCLUDED.description,
  cnpj = EXCLUDED.cnpj,
  legal_name = EXCLUDED.legal_name,
  trade_name = EXCLUDED.trade_name,
  state_registration = EXCLUDED.state_registration,
  municipal_registration = EXCLUDED.municipal_registration,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  responsible = EXCLUDED.responsible,
  avatar_path = EXCLUDED.avatar_path,
  is_active = EXCLUDED.is_active;

-- Marketing is private for now: only Reinan keeps access. Before removing an
-- old membership, send that person back to Consultoria so nobody is stranded.
UPDATE public.profiles
SET active_workspace_id = (SELECT id FROM public.workspaces WHERE slug = 'consultoria')
WHERE active_workspace_id = (SELECT id FROM public.workspaces WHERE slug = 'marketing')
  AND lower(email) <> 'reinangrupoahouse@gmail.com';

DELETE FROM public.workspace_memberships
WHERE workspace_id = (SELECT id FROM public.workspaces WHERE slug = 'marketing')
  AND user_id <> (SELECT id FROM public.profiles WHERE lower(email) = 'reinangrupoahouse@gmail.com' LIMIT 1);

INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions)
SELECT
  (SELECT id FROM public.workspaces WHERE slug = 'marketing'),
  id,
  'admin'::public.app_role,
  ARRAY['dashboard','tasks','requests','import_ata','clients','reports','mural','agenda','portal_entregas','portal_financeiro','users','trash','settings']::text[]
FROM public.profiles
WHERE lower(email) = 'reinangrupoahouse@gmail.com'
ON CONFLICT (workspace_id, user_id) DO UPDATE
SET role = EXCLUDED.role, permissions = EXCLUDED.permissions, updated_at = now();

NOTIFY pgrst, 'reload schema';
