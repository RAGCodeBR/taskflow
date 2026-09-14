-- A 20260914200000 deixou de fora o ramo de fiscalização: quem só acompanha
-- a conversa sem participar (aba "Outras", can_oversee_task_conversation)
-- não conseguia ler o last_read_at dos participantes — via 0 linhas e a tela
-- mostrava "Ainda não entrou" pra todo mundo, mesmo com o dado certo no banco.
-- Mesmo ajuste que já fizemos em comments/comment_mentions/comment_attachments.

DROP POLICY IF EXISTS task_conversation_reads_select ON public.task_conversation_reads;

CREATE POLICY task_conversation_reads_select ON public.task_conversation_reads
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    OR public.can_access_task_conversation(task_id)
    OR public.can_oversee_task_conversation(task_id)
  );

NOTIFY pgrst, 'reload schema';
