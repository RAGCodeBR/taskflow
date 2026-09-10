-- Corrige 20260910300000. Aquela migration apontou as políticas de comments
-- para participates_in_task(), mas essa função tem uma cláusula
--   AND NOT EXISTS (workspace_memberships do usuário no ambiente da tarefa)
-- ou seja, só devolve true para quem é de FORA do ambiente (a ponte
-- cross-ambiente). Para qualquer membro do próprio ambiente ela dá false —
-- resultado: a conversa sumiu para todo mundo, até para responsáveis e
-- colaboradores.
--
-- can_access_task_conversation() é o vínculo real de participação na tarefa,
-- sem o teto de ambiente e sem o atalho de admin (admin só vê as conversas das
-- tarefas em que participa de fato — que é o que foi pedido).

CREATE OR REPLACE FUNCTION public.can_access_task_conversation(_task_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
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

REVOKE ALL ON FUNCTION public.can_access_task_conversation(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_access_task_conversation(uuid) TO authenticated;

DROP POLICY IF EXISTS workspace_comments_parent ON public.comments;
CREATE POLICY workspace_comments_parent ON public.comments
  FOR ALL TO authenticated
  USING (public.can_access_task_conversation(task_id))
  WITH CHECK (public.can_access_task_conversation(task_id));

DROP POLICY IF EXISTS workspace_comment_mentions_parent ON public.comment_mentions;
CREATE POLICY workspace_comment_mentions_parent ON public.comment_mentions
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.comments c
      WHERE c.id = comment_id AND public.can_access_task_conversation(c.task_id)
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.comments c
      WHERE c.id = comment_id AND public.can_access_task_conversation(c.task_id)
    )
  );

DROP POLICY IF EXISTS workspace_comment_attachments_parent ON public.comment_attachments;
CREATE POLICY workspace_comment_attachments_parent ON public.comment_attachments
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.comments c
      WHERE c.id = comment_id AND public.can_access_task_conversation(c.task_id)
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.comments c
      WHERE c.id = comment_id AND public.can_access_task_conversation(c.task_id)
    )
  );

NOTIFY pgrst, 'reload schema';
