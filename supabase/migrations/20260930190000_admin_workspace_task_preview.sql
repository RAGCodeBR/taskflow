-- Administradores podem inspecionar o quadro de outro ambiente sem alterar o
-- ambiente ativo. A leitura continua restrita ao administrador que também é
-- membro do ambiente escolhido; colaboradores nunca recebem esse atalho.
CREATE OR REPLACE FUNCTION public.can_preview_workspace_tasks(target_workspace_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT target_workspace_id IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.user_roles role
      WHERE role.user_id = auth.uid()
        AND role.role = 'admin'::public.app_role
    )
    AND EXISTS (
      SELECT 1
      FROM public.workspace_memberships membership
      WHERE membership.workspace_id = target_workspace_id
        AND membership.user_id = auth.uid()
    )
$$;

CREATE OR REPLACE FUNCTION public.list_workspace_tasks_for_admin_preview(target_workspace_id uuid)
RETURNS SETOF public.tasks
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.can_preview_workspace_tasks(target_workspace_id) THEN
    RAISE EXCEPTION 'Você não pode visualizar as tarefas deste ambiente';
  END IF;

  RETURN QUERY
  SELECT task.*
  FROM public.tasks task
  WHERE task.workspace_id = target_workspace_id
    AND task.deleted_at IS NULL
  ORDER BY task.position, task.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.list_workspace_columns_for_admin_preview(target_workspace_id uuid)
RETURNS SETOF public.kanban_columns
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.can_preview_workspace_tasks(target_workspace_id) THEN
    RAISE EXCEPTION 'Você não pode visualizar as colunas deste ambiente';
  END IF;

  RETURN QUERY
  SELECT column_item.*
  FROM public.kanban_columns column_item
  WHERE column_item.workspace_id = target_workspace_id
  ORDER BY column_item.position;
END;
$$;

CREATE OR REPLACE FUNCTION public.list_workspace_clients_for_admin_preview(target_workspace_id uuid)
RETURNS SETOF public.clients
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.can_preview_workspace_tasks(target_workspace_id) THEN
    RAISE EXCEPTION 'Você não pode visualizar os clientes deste ambiente';
  END IF;

  RETURN QUERY
  SELECT client.*
  FROM public.clients client
  WHERE client.workspace_id = target_workspace_id
  ORDER BY client.name;
END;
$$;

CREATE OR REPLACE FUNCTION public.list_workspace_statuses_for_admin_preview(target_workspace_id uuid)
RETURNS SETOF public.task_statuses
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.can_preview_workspace_tasks(target_workspace_id) THEN
    RAISE EXCEPTION 'Você não pode visualizar os status deste ambiente';
  END IF;

  RETURN QUERY
  SELECT status_item.*
  FROM public.task_statuses status_item
  WHERE status_item.workspace_id = target_workspace_id
  ORDER BY status_item.position;
END;
$$;

CREATE OR REPLACE FUNCTION public.list_workspace_tags_for_admin_preview(target_workspace_id uuid)
RETURNS SETOF public.task_tags
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.can_preview_workspace_tasks(target_workspace_id) THEN
    RAISE EXCEPTION 'Você não pode visualizar as categorias deste ambiente';
  END IF;

  RETURN QUERY
  SELECT tag.*
  FROM public.task_tags tag
  WHERE tag.workspace_id = target_workspace_id
  ORDER BY tag.position, tag.name;
END;
$$;

GRANT EXECUTE ON FUNCTION public.list_workspace_tasks_for_admin_preview(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_workspace_columns_for_admin_preview(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_workspace_clients_for_admin_preview(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_workspace_statuses_for_admin_preview(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_workspace_tags_for_admin_preview(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.can_preview_workspace_tasks(uuid) FROM PUBLIC, anon;
