-- Lançamento de tarefa em outro ambiente, na criação, só para administradores.
--
-- O administrador é o único que pertence aos dois ambientes e o único que alterna
-- entre eles. Na criação de uma tarefa ele passa a escolher em qual ambiente
-- lançá-la. Para todo o resto nada muda: continua valendo has_workspace_access,
-- ou seja, você só escreve no ambiente em que está.

CREATE OR REPLACE FUNCTION public.can_create_in_workspace(_workspace_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT _workspace_id IS NOT NULL
    -- Pertencer ao ambiente de destino é condição inegociável, inclusive para
    -- administradores: quem não é membro não cria nada lá.
    AND EXISTS (
      SELECT 1 FROM public.workspace_memberships
      WHERE workspace_id = _workspace_id AND user_id = auth.uid()
    )
    AND (
      public.has_workspace_access(_workspace_id)
      OR public.has_role(auth.uid(), 'admin'::public.app_role)
    )
$$;

REVOKE ALL ON FUNCTION public.can_create_in_workspace(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_create_in_workspace(uuid) TO authenticated;

DROP POLICY IF EXISTS workspace_tasks_insert ON public.tasks;
CREATE POLICY workspace_tasks_insert ON public.tasks
  FOR INSERT TO authenticated
  WITH CHECK (public.can_create_in_workspace(workspace_id));

-- tasks ganha o seu próprio gatilho de ambiente. A função compartilhada
-- assign_current_workspace() continua intacta nas outras 10 tabelas: afrouxá-la
-- ali abriria escrita entre ambientes para clientes, murais e agendas também.
--
-- Coluna, status e cliente pertencem a um ambiente. Quando a tarefa é lançada no
-- outro, os valores que vieram da tela do ambiente de origem não existem no
-- destino, então são resolvidos aqui — a tela não tem como oferecer os de lá,
-- que a RLS não deixa ela ler.
CREATE OR REPLACE FUNCTION public.assign_task_workspace()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  resolved_column uuid;
  resolved_status uuid;
  resolved_client uuid;
BEGIN
  -- Migrations e rotinas de servidor rodam sem JWT de usuário final.
  IF auth.uid() IS NULL THEN RETURN NEW; END IF;

  IF NEW.workspace_id IS NULL THEN
    NEW.workspace_id := public.current_workspace_id();
  END IF;

  IF NOT public.can_create_in_workspace(NEW.workspace_id) THEN
    RAISE EXCEPTION 'Você não pode lançar tarefas neste ambiente do TaskFlow';
  END IF;

  IF NEW.column_id IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.kanban_columns
    WHERE id = NEW.column_id AND workspace_id = NEW.workspace_id
  ) THEN
    SELECT id INTO resolved_column
    FROM public.kanban_columns
    WHERE workspace_id = NEW.workspace_id
    ORDER BY position, created_at
    LIMIT 1;
    NEW.column_id := resolved_column;
  END IF;

  IF NEW.status_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.task_statuses
    WHERE id = NEW.status_id AND workspace_id = NEW.workspace_id
  ) THEN
    SELECT id INTO resolved_status
    FROM public.task_statuses
    WHERE workspace_id = NEW.workspace_id AND is_active
    ORDER BY position
    LIMIT 1;
    NEW.status_id := resolved_status;
  END IF;

  -- Os clientes já são espelhados entre os ambientes (source_client_id), então
  -- o cliente escolhido tem um correspondente do outro lado. Sem espelho, a
  -- tarefa nasce sem cliente em vez de apontar para fora do ambiente.
  IF NEW.client_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.clients
    WHERE id = NEW.client_id AND workspace_id = NEW.workspace_id
  ) THEN
    SELECT c.id INTO resolved_client
    FROM public.clients c
    WHERE c.workspace_id = NEW.workspace_id
      AND (
        c.source_client_id = NEW.client_id
        OR c.id = (SELECT o.source_client_id FROM public.clients o WHERE o.id = NEW.client_id)
      )
    LIMIT 1;
    NEW.client_id := resolved_client;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_assign_workspace ON public.tasks;
CREATE TRIGGER trg_assign_workspace
  BEFORE INSERT OR UPDATE OF workspace_id ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.assign_task_workspace();

-- Seletor de pessoas: Consultoria e Marketing não se misturam.
--
-- A versão anterior lia user_roles sem nenhum filtro de ambiente, então todo
-- mundo via todo mundo. O padrão passa a ser o ambiente que a pessoa está
-- usando agora — inclusive para administradores, que só veem o outro lado
-- quando escolhem o outro lado explicitamente na criação da tarefa.
--
-- Isso corrige de uma vez os 9 lugares que selecionam pessoa (tarefa,
-- subtarefa, card, editor inline, obrigações, filtros, menções, dashboard e
-- relatório de cliente): todos chamam sem argumento.

DROP FUNCTION IF EXISTS public.list_task_assignees();
DROP FUNCTION IF EXISTS public.list_task_assignees(uuid);

CREATE FUNCTION public.list_task_assignees(target_workspace_id uuid DEFAULT NULL)
RETURNS TABLE (
  id uuid,
  full_name text,
  email text,
  avatar_url text,
  is_active boolean,
  workspace_slugs text[]
)
LANGUAGE sql
-- VOLATILE de propósito: o resultado depende do ambiente ativo, e a migration
-- 20260831124000 já marcou current_workspace_id() assim para que uma consulta
-- preparada não devolva o ambiente anterior logo após a troca.
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id,
    p.full_name,
    p.email,
    p.avatar_url,
    COALESCE(p.is_active, true),
    array_agg(DISTINCT w.slug ORDER BY w.slug)
  FROM public.profiles p
  -- O papel continua vindo de user_roles, como na função original. A coluna
  -- role da associação é uma cópia feita no backfill e pode estar defasada;
  -- alguém sumir do seletor por causa disso seria pior do que o vazamento que
  -- esta função fecha.
  JOIN public.user_roles ur ON ur.user_id = p.id
  JOIN public.workspace_memberships m ON m.user_id = p.id
  JOIN public.workspaces w ON w.id = m.workspace_id
  WHERE COALESCE(p.is_active, true)
    AND ur.role IN ('admin'::public.app_role, 'collaborator'::public.app_role)
    -- Sem argumento, o ambiente é o que quem chama está usando. Se não houver
    -- ambiente ativo, a lista degrada para todos os ambientes de quem chama em
    -- vez de vir vazia: tela sem nenhum nome é pior que uma lista ampla demais.
    AND (
      COALESCE(target_workspace_id, public.current_workspace_id()) IS NULL
      OR m.workspace_id = COALESCE(target_workspace_id, public.current_workspace_id())
    )
    -- Você só enxerga pessoas de ambientes a que você mesmo pertence.
    AND EXISTS (
      SELECT 1 FROM public.workspace_memberships own
      WHERE own.user_id = auth.uid() AND own.workspace_id = m.workspace_id
    )
  GROUP BY p.id, p.full_name, p.email, p.avatar_url, p.is_active
$$;

REVOKE ALL ON FUNCTION public.list_task_assignees(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.list_task_assignees(uuid) TO authenticated;

NOTIFY pgrst, 'reload schema';
