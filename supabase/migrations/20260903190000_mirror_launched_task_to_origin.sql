-- Uma tarefa lançada para o outro ambiente continua visível no ambiente de onde
-- foi lançada, para quem a lançou.
--
-- Hoje a tarefa só sabe onde mora (workspace_id), não de onde veio. Sem essa
-- segunda informação não há como distinguir "tarefa normal do Marketing" de
-- "tarefa que o administrador lançou da Consultoria para o Marketing" — e é
-- exatamente essa distinção que permite espelhar uma sem vazar a outra.

ALTER TABLE public.tasks
  ADD COLUMN IF NOT EXISTS origin_workspace_id uuid REFERENCES public.workspaces(id);

-- Todo o histórico nasce com origem igual ao ambiente. Assim a regra de espelho
-- abaixo nunca dispara para tarefas antigas: nada muda para elas.
UPDATE public.tasks
SET origin_workspace_id = workspace_id
WHERE origin_workspace_id IS NULL;

CREATE INDEX IF NOT EXISTS tasks_origin_workspace_idx
  ON public.tasks(origin_workspace_id)
  WHERE origin_workspace_id IS DISTINCT FROM workspace_id;

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

  -- Ambiente de onde a tarefa saiu. Sem sessão de usuário, cai no próprio
  -- ambiente da tarefa, para o espelho nunca disparar por acidente.
  IF TG_OP = 'INSERT' AND NEW.origin_workspace_id IS NULL THEN
    NEW.origin_workspace_id := COALESCE(public.current_workspace_id(), NEW.workspace_id);
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

-- As três condições do espelho existem cada uma por um motivo:
--
--   origem <> ambiente   → só tarefas realmente lançadas para o outro lado.
--                          Sem isso, toda tarefa comum entraria na regra.
--   created_by = você    → só quem lançou. Sem isso, todo colaborador da
--                          Consultoria passaria a ver o quadro do Marketing —
--                          seria vazamento, não espelho.
--   acesso à origem      → você continua precisando estar no ambiente de onde
--                          a lançou para vê-la ali.
DROP POLICY IF EXISTS workspace_tasks_select ON public.tasks;
CREATE POLICY workspace_tasks_select ON public.tasks
  FOR SELECT TO authenticated
  USING (
    public.has_workspace_access(workspace_id)
    OR public.participates_in_task(id)
    OR (
      origin_workspace_id IS DISTINCT FROM workspace_id
      AND created_by = auth.uid()
      AND public.has_workspace_access(origin_workspace_id)
    )
  );

NOTIFY pgrst, 'reload schema';
