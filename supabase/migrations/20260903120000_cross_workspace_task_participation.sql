-- Participação de tarefas entre ambientes.
--
-- Consultoria e Marketing continuam isolados por associação: set_marketing_user_access
-- recusa um colaborador que já pertença à Consultoria, então uma pessoa vive em um
-- ambiente só (apenas administradores pertencem aos dois). Logo, não existe caminho
-- por membership para alguém do Marketing enxergar uma tarefa da Consultoria.
--
-- O único vínculo honesto é a participação, e ela já existia neste sistema: a função
-- can_view_task() codificava exatamente estes níveis, mas ficou órfã quando a migration
-- 20260831110000 removeu todas as policies de tasks para instalar a regra de workspace.
-- Aqui ela volta, agora convivendo com o workspace em vez de substituí-lo.
--
-- A tarefa NUNCA sai do ambiente dela. A participação concede visibilidade e o direito
-- de trabalhar na tarefa; reposicioná-la e excluí-la seguem sendo do ambiente dono.

CREATE OR REPLACE FUNCTION public.participates_in_task(_task_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  -- has_role(admin) fica deliberadamente de fora. A can_view_task() original o
  -- incluía, mas ali não havia ambientes: aqui isso tornaria a Consultoria e o
  -- Marketing inteiros visíveis a qualquer administrador de uma só vez, que é
  -- precisamente o isolamento que este sistema construiu.
  SELECT EXISTS (
    SELECT 1
    FROM public.tasks t
    WHERE t.id = _task_id
      AND (
        t.assignee_id = auth.uid()
        OR t.created_by = auth.uid()
        OR EXISTS (
          SELECT 1 FROM public.task_collaborators tc
          WHERE tc.task_id = t.id AND tc.collaborator_id = auth.uid()
        )
        OR EXISTS (
          SELECT 1 FROM public.subtasks s
          WHERE s.task_id = t.id AND s.assignee_id = auth.uid()
        )
      )
  )
$$;

REVOKE ALL ON FUNCTION public.participates_in_task(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.participates_in_task(uuid) TO authenticated;

-- A policy única FOR ALL não serve mais: leitura passa a aceitar participação,
-- criação e exclusão continuam exclusivas do ambiente dono.
DROP POLICY IF EXISTS workspace_tasks_access ON public.tasks;

CREATE POLICY workspace_tasks_select ON public.tasks
  FOR SELECT TO authenticated
  USING (public.has_workspace_access(workspace_id) OR public.participates_in_task(id));

CREATE POLICY workspace_tasks_insert ON public.tasks
  FOR INSERT TO authenticated
  WITH CHECK (public.has_workspace_access(workspace_id));

-- O participante pode ser o detentor da tarefa principal, então precisa conseguir
-- concluí-la e editá-la. O que ele não pode mudar é o que ancora a tarefa no
-- ambiente dono — garantido pelo gatilho abaixo, não por esta policy.
CREATE POLICY workspace_tasks_update ON public.tasks
  FOR UPDATE TO authenticated
  USING (public.has_workspace_access(workspace_id) OR public.participates_in_task(id))
  WITH CHECK (public.has_workspace_access(workspace_id) OR public.participates_in_task(id));

CREATE POLICY workspace_tasks_delete ON public.tasks
  FOR DELETE TO authenticated
  USING (public.has_workspace_access(workspace_id));

CREATE OR REPLACE FUNCTION public.guard_cross_workspace_task_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RETURN NEW; END IF;

  -- Quem está no ambiente da tarefa mantém exatamente os direitos de sempre.
  IF public.has_workspace_access(OLD.workspace_id) THEN RETURN NEW; END IF;

  -- Daqui para baixo é um participante de outro ambiente: ele trabalha na tarefa,
  -- mas não a reposiciona no quadro alheio nem a remove.
  IF NEW.workspace_id IS DISTINCT FROM OLD.workspace_id THEN
    RAISE EXCEPTION 'Uma tarefa não muda de ambiente';
  END IF;
  IF NEW.column_id IS DISTINCT FROM OLD.column_id THEN
    RAISE EXCEPTION 'Somente o ambiente dono da tarefa pode movê-la de coluna';
  END IF;
  IF NEW.client_id IS DISTINCT FROM OLD.client_id THEN
    RAISE EXCEPTION 'Somente o ambiente dono da tarefa pode trocar o cliente';
  END IF;
  IF NEW.deleted_at IS DISTINCT FROM OLD.deleted_at THEN
    RAISE EXCEPTION 'Somente o ambiente dono da tarefa pode excluí-la';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_cross_workspace_task_update ON public.tasks;
CREATE TRIGGER trg_guard_cross_workspace_task_update
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.guard_cross_workspace_task_update();

-- Sem isto o participante vê o card e não consegue abrir subtarefa, comentário,
-- anexo nem histórico: todas as tabelas filhas de tasks passam por esta função.
-- Ela concede ao participante externo os mesmos direitos sobre os registros da
-- tarefa que um colaborador do próprio ambiente já tem.
CREATE OR REPLACE FUNCTION public.can_access_workspace_task(_task_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.tasks
    WHERE id = _task_id
      AND (public.has_workspace_access(workspace_id) OR public.participates_in_task(id))
  )
$$;

NOTIFY pgrst, 'reload schema';
