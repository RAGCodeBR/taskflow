-- Passa a permitir que um colaborador da Consultoria também tenha acesso ao
-- Marketing, concedido individualmente por um admin na tela de Usuários. Antes,
-- set_marketing_user_access() recusava qualquer colaborador que já fosse membro
-- da Consultoria ("crie uma conta própria"). O isolamento por ambiente das
-- tarefas/relatórios/conversas continua valendo — o que muda é que uma pessoa
-- pode, deliberadamente, pertencer aos dois.
--
-- Continua: só admin executa; ao ligar, entra com as permissões que já tem; ao
-- desligar, remove SÓ a associação do Marketing (a da Consultoria fica).

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
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Somente administradores podem definir acessos ao Marketing';
  END IF;

  SELECT id INTO marketing_id FROM public.workspaces WHERE slug = 'marketing';
  SELECT role INTO target_role FROM public.user_roles WHERE user_id = target_user_id LIMIT 1;
  IF target_role IS NULL THEN
    RAISE EXCEPTION 'Usuário não encontrado';
  END IF;

  IF target_role = 'admin'::public.app_role THEN
    IF NOT enabled THEN
      RAISE EXCEPTION 'Administradores sempre possuem acesso ao Marketing';
    END IF;
    INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions, access_grant)
    VALUES (
      marketing_id,
      target_user_id,
      'admin'::public.app_role,
      ARRAY['dashboard','tasks','requests','import_ata','clients','reports','mural','agenda','portal_entregas','portal_financeiro','users','trash','settings']::text[],
      'manual'
    )
    ON CONFLICT (workspace_id, user_id) DO UPDATE
    SET role = EXCLUDED.role, permissions = EXCLUDED.permissions, updated_at = now();
    RETURN true;
  END IF;

  IF target_role <> 'collaborator'::public.app_role THEN
    RAISE EXCEPTION 'O Marketing aceita somente administradores e colaboradores';
  END IF;

  SELECT permissions INTO target_permissions FROM public.user_permissions WHERE user_id = target_user_id;
  target_permissions := COALESCE(target_permissions, ARRAY[]::text[]);

  IF enabled THEN
    INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions, access_grant)
    VALUES (marketing_id, target_user_id, 'collaborator'::public.app_role, target_permissions, 'manual')
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
