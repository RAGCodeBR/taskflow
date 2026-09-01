-- Marketing access can be granted to one person at a time or to every
-- administrator. Policy-granted memberships are marked so disabling the
-- global option never removes a manual authorization.

ALTER TABLE public.workspace_memberships
  ADD COLUMN IF NOT EXISTS access_grant text NOT NULL DEFAULT 'manual'
  CHECK (access_grant IN ('manual', 'admin_policy'));

CREATE TABLE IF NOT EXISTS public.workspace_access_settings (
  workspace_id uuid PRIMARY KEY REFERENCES public.workspaces(id) ON DELETE CASCADE,
  allow_all_admins boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL
);

INSERT INTO public.workspace_access_settings (workspace_id)
SELECT id FROM public.workspaces WHERE slug = 'marketing'
ON CONFLICT (workspace_id) DO NOTHING;

ALTER TABLE public.workspace_access_settings ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.workspace_access_settings TO authenticated;
GRANT ALL ON public.workspace_access_settings TO service_role;

DROP POLICY IF EXISTS workspace_access_settings_admin_read ON public.workspace_access_settings;
CREATE POLICY workspace_access_settings_admin_read
  ON public.workspace_access_settings
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE OR REPLACE FUNCTION public.set_marketing_admin_visibility(enabled boolean)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  marketing_id uuid;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Somente administradores podem alterar o acesso ao Marketing';
  END IF;

  SELECT id INTO marketing_id FROM public.workspaces WHERE slug = 'marketing';

  INSERT INTO public.workspace_access_settings (workspace_id, allow_all_admins, updated_at, updated_by)
  VALUES (marketing_id, enabled, now(), auth.uid())
  ON CONFLICT (workspace_id) DO UPDATE
  SET allow_all_admins = EXCLUDED.allow_all_admins,
      updated_at = EXCLUDED.updated_at,
      updated_by = EXCLUDED.updated_by;

  IF enabled THEN
    INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions, access_grant)
    SELECT
      marketing_id,
      roles.user_id,
      'admin'::public.app_role,
      ARRAY['dashboard','tasks','requests','import_ata','clients','reports','mural','agenda','portal_entregas','portal_financeiro','users','trash','settings']::text[],
      'admin_policy'
    FROM public.user_roles roles
    WHERE roles.role = 'admin'::public.app_role
    ON CONFLICT (workspace_id, user_id) DO NOTHING;
  ELSE
    DELETE FROM public.workspace_memberships
    WHERE workspace_id = marketing_id
      AND access_grant = 'admin_policy';
  END IF;

  RETURN enabled;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_marketing_user_access(target_user_id uuid, enabled boolean)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  marketing_id uuid;
  target_role public.app_role;
  target_permissions text[];
  target_email text;
  global_admin_access boolean;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Somente administradores podem alterar o acesso ao Marketing';
  END IF;

  SELECT id INTO marketing_id FROM public.workspaces WHERE slug = 'marketing';
  SELECT email INTO target_email FROM public.profiles WHERE id = target_user_id;
  IF target_email IS NULL THEN
    RAISE EXCEPTION 'Usuário não encontrado';
  END IF;
  IF lower(target_email) = 'reinangrupoahouse@gmail.com' AND NOT enabled THEN
    RAISE EXCEPTION 'O acesso do responsável pelo Marketing não pode ser removido';
  END IF;

  SELECT role INTO target_role FROM public.user_roles WHERE user_id = target_user_id LIMIT 1;
  IF target_role IS NULL THEN
    RAISE EXCEPTION 'O usuário não possui uma categoria de acesso';
  END IF;
  SELECT permissions INTO target_permissions FROM public.user_permissions WHERE user_id = target_user_id;
  target_permissions := COALESCE(target_permissions, ARRAY[]::text[]);
  IF target_role = 'admin'::public.app_role THEN
    target_permissions := ARRAY['dashboard','tasks','requests','import_ata','clients','reports','mural','agenda','portal_entregas','portal_financeiro','users','trash','settings']::text[];
  END IF;

  SELECT allow_all_admins INTO global_admin_access
  FROM public.workspace_access_settings WHERE workspace_id = marketing_id;

  IF NOT enabled AND target_role = 'admin'::public.app_role AND COALESCE(global_admin_access, false) THEN
    RAISE EXCEPTION 'Desative primeiro a liberação para todos os administradores';
  END IF;

  IF enabled THEN
    INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions, access_grant)
    VALUES (marketing_id, target_user_id, target_role, target_permissions, 'manual')
    ON CONFLICT (workspace_id, user_id) DO UPDATE
    SET role = EXCLUDED.role,
        permissions = EXCLUDED.permissions,
        access_grant = 'manual',
        updated_at = now();
  ELSE
    DELETE FROM public.workspace_memberships
    WHERE workspace_id = marketing_id AND user_id = target_user_id;
  END IF;

  RETURN enabled;
END;
$$;

GRANT EXECUTE ON FUNCTION public.set_marketing_admin_visibility(boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.set_marketing_user_access(uuid, boolean) TO authenticated;

NOTIFY pgrst, 'reload schema';
