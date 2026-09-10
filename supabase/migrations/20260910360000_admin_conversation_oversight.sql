-- Admin passa a LER (nunca escrever) as conversas de qualquer tarefa do próprio
-- ambiente, mesmo sem participar dela. Fiscalização, não participação.
--
-- has_workspace_access() já exige que a tarefa esteja no ambiente ativo do admin
-- e que ele seja membro — então o isolamento consultoria/marketing continua: um
-- admin do Marketing não enxerga conversa da Consultoria.
--
-- Só SELECT ganha o ramo de admin. A política FOR ALL (INSERT/UPDATE/DELETE)
-- continua exigindo can_access_task_conversation(), ou seja, participação real:
-- o admin não consegue mandar, editar nem apagar mensagem onde não participa.

CREATE OR REPLACE FUNCTION public.can_oversee_task_conversation(_task_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin'::public.app_role)
     AND EXISTS (
       SELECT 1 FROM public.tasks t
       WHERE t.id = _task_id AND public.has_workspace_access(t.workspace_id)
     )
$$;

REVOKE ALL ON FUNCTION public.can_oversee_task_conversation(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_oversee_task_conversation(uuid) TO authenticated;

-- comments: soma o ramo de fiscalização só na leitura.
DROP POLICY IF EXISTS comments_admin_oversight_select ON public.comments;
CREATE POLICY comments_admin_oversight_select ON public.comments
  FOR SELECT TO authenticated
  USING (
    public.can_access_task_conversation(task_id)
    OR public.can_oversee_task_conversation(task_id)
  );

DROP POLICY IF EXISTS comment_mentions_admin_oversight_select ON public.comment_mentions;
CREATE POLICY comment_mentions_admin_oversight_select ON public.comment_mentions
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.comments c
      WHERE c.id = comment_id
        AND (
          public.can_access_task_conversation(c.task_id)
          OR public.can_oversee_task_conversation(c.task_id)
        )
    )
  );

DROP POLICY IF EXISTS comment_attachments_admin_oversight_select ON public.comment_attachments;
CREATE POLICY comment_attachments_admin_oversight_select ON public.comment_attachments
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.comments c
      WHERE c.id = comment_id
        AND (
          public.can_access_task_conversation(c.task_id)
          OR public.can_oversee_task_conversation(c.task_id)
        )
    )
  );

NOTIFY pgrst, 'reload schema';
