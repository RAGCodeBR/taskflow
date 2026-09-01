-- Marketing access is always managed person by person.  Remove the former
-- administrator-wide rule and keep the interface/API restricted to admins and collaborators.

UPDATE public.workspace_access_settings settings
SET allow_all_admins = false,
    updated_at = now(),
    updated_by = auth.uid()
FROM public.workspaces workspace
WHERE settings.workspace_id = workspace.id
  AND workspace.slug = 'marketing';

DELETE FROM public.workspace_memberships membership
USING public.workspaces workspace
WHERE membership.workspace_id = workspace.id
  AND workspace.slug = 'marketing'
  AND membership.access_grant = 'admin_policy';

DROP FUNCTION IF EXISTS public.set_marketing_admin_visibility(boolean);

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
  IF target_role = 'client'::public.app_role THEN
    RAISE EXCEPTION 'O Marketing pode ser liberado somente para administradores ou colaboradores';
  END IF;

  SELECT permissions INTO target_permissions FROM public.user_permissions WHERE user_id = target_user_id;
  target_permissions := COALESCE(target_permissions, ARRAY[]::text[]);
  IF target_role = 'admin'::public.app_role THEN
    target_permissions := ARRAY['dashboard','tasks','requests','import_ata','clients','reports','mural','agenda','portal_entregas','portal_financeiro','users','trash','settings']::text[];
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

GRANT EXECUTE ON FUNCTION public.set_marketing_user_access(uuid, boolean) TO authenticated;

NOTIFY pgrst, 'reload schema';
