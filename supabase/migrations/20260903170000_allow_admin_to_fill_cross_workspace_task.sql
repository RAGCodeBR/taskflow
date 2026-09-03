-- Quem pode lançar uma tarefa no outro ambiente precisa poder preenchê-la.
--
-- A migration 20260903150000 tirou os membros de participates_in_task() para
-- impedir que o quadro de um ambiente despejasse as tarefas do outro. Isso
-- estava certo para LEITURA, mas derrubou a ESCRITA no meio da criação: um
-- administrador na Consultoria lançando uma tarefa no Marketing conseguia
-- inserir a tarefa (can_create_in_workspace) e falhava ao gravar colaborador,
-- subtarefa, comentário ou anexo — todos passam por can_access_workspace_task(),
-- onde nem has_workspace_access nem participates_in_task valiam para ele.
--
-- Sintoma: "new row violates row-level security policy for table
-- task_collaborators".
--
-- A regra que faltava: quem pode CRIAR no ambiente pode TRABALHAR na tarefa que
-- criou lá. can_create_in_workspace() já exige associação ao ambiente de
-- destino, então isso não abre nada para quem é de fora.
--
-- A política de SELECT de tasks continua intocada de propósito: incluir
-- can_create_in_workspace ali traria de volta as tarefas de um ambiente no
-- quadro do outro, que é exatamente o que a 150000 resolveu.

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
      AND (
        public.has_workspace_access(workspace_id)
        -- Administrador associado ao ambiente de destino, preenchendo a tarefa
        -- que acabou de lançar lá sem precisar trocar de ambiente.
        OR public.can_create_in_workspace(workspace_id)
        -- Pessoa de outro ambiente marcada na tarefa.
        OR public.participates_in_task(id)
      )
  )
$$;

-- O mesmo vale para salvar a própria tarefa logo após criá-la.
DROP POLICY IF EXISTS workspace_tasks_update ON public.tasks;
CREATE POLICY workspace_tasks_update ON public.tasks
  FOR UPDATE TO authenticated
  USING (
    public.has_workspace_access(workspace_id)
    OR public.can_create_in_workspace(workspace_id)
    OR public.participates_in_task(id)
  )
  WITH CHECK (
    public.has_workspace_access(workspace_id)
    OR public.can_create_in_workspace(workspace_id)
    OR public.participates_in_task(id)
  );

DROP POLICY IF EXISTS workspace_tasks_delete ON public.tasks;
CREATE POLICY workspace_tasks_delete ON public.tasks
  FOR DELETE TO authenticated
  USING (
    public.has_workspace_access(workspace_id)
    OR public.can_create_in_workspace(workspace_id)
  );

-- O gatilho que protege coluna, cliente e exclusão passa a mirar somente quem é
-- realmente de fora. Um administrador associado ao ambiente da tarefa pode
-- trocar de ambiente e fazer a mesma coisa — bloqueá-lo aqui era só atrito.
CREATE OR REPLACE FUNCTION public.guard_cross_workspace_task_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RETURN NEW; END IF;

  IF public.has_workspace_access(OLD.workspace_id)
     OR public.can_create_in_workspace(OLD.workspace_id) THEN
    RETURN NEW;
  END IF;

  -- Daqui para baixo é quem entrou só por participação: trabalha na tarefa, mas
  -- não a reposiciona no quadro alheio nem a remove.
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

NOTIFY pgrst, 'reload schema';
