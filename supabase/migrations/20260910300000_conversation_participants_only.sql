-- A conversa de uma tarefa passa a ser dos participantes da demanda, não do
-- ambiente inteiro.
--
-- Até aqui a policy de comments aceitava has_workspace_access(workspace_id) —
-- qualquer membro do ambiente via e escrevia em toda conversa daquele ambiente.
-- Isso vira bagunça quando há muitas demandas em paralelo. Agora só quem
-- participa da tarefa: responsável, criador ou colaborador. Menção já promove a
-- colaborador (trigger add_mentioned_as_collaborator), então "fui mencionado"
-- continua dando acesso.
--
-- participates_in_task() deixa has_role(admin) de fora de propósito: o
-- administrador vê a conversa das demandas em que participa de fato, não de
-- todas. O administrador que lança uma tarefa no outro ambiente entra como
-- created_by, então esse ramo também o cobre — sem precisar de can_create.

-- Limpa qualquer política histórica de comments antes de recriar a única.
DROP POLICY IF EXISTS workspace_comments_parent ON public.comments;
DROP POLICY IF EXISTS comments_select ON public.comments;
DROP POLICY IF EXISTS comments_select_all ON public.comments;
DROP POLICY IF EXISTS comments_insert_self ON public.comments;
DROP POLICY IF EXISTS comments_modify_own ON public.comments;
DROP POLICY IF EXISTS comments_delete_own ON public.comments;
CREATE POLICY workspace_comments_parent ON public.comments
  FOR ALL TO authenticated
  USING (public.participates_in_task(task_id))
  WITH CHECK (public.participates_in_task(task_id));

-- Filhos do comentário seguem o mesmo escopo. Antes iam por
-- can_access_workspace_task (ambiente inteiro); agora, pelo participante da
-- tarefa dona do comentário.
DROP POLICY IF EXISTS workspace_comment_mentions_parent ON public.comment_mentions;
CREATE POLICY workspace_comment_mentions_parent ON public.comment_mentions
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.comments c
      WHERE c.id = comment_id AND public.participates_in_task(c.task_id)
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.comments c
      WHERE c.id = comment_id AND public.participates_in_task(c.task_id)
    )
  );

DROP POLICY IF EXISTS workspace_comment_attachments_parent ON public.comment_attachments;
CREATE POLICY workspace_comment_attachments_parent ON public.comment_attachments
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.comments c
      WHERE c.id = comment_id AND public.participates_in_task(c.task_id)
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.comments c
      WHERE c.id = comment_id AND public.participates_in_task(c.task_id)
    )
  );

NOTIFY pgrst, 'reload schema';
