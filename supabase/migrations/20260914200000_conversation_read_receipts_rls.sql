-- "Visto por": pra mostrar quem já leu uma mensagem, cada participante da
-- conversa precisa enxergar o last_read_at DOS OUTROS na mesma tarefa — hoje
-- a policy só deixa cada um ler a própria linha. Adiciona o ramo de
-- participação (mesma função que já protege a conversa em si), sem tirar o
-- "só a própria linha" de quem não participa daquela tarefa.
--
-- NÃO aplicada automaticamente — falta rodar:
--   npx supabase migration up --linked

DROP POLICY IF EXISTS task_conversation_reads_own ON public.task_conversation_reads;

CREATE POLICY task_conversation_reads_select ON public.task_conversation_reads
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.can_access_task_conversation(task_id));

CREATE POLICY task_conversation_reads_write ON public.task_conversation_reads
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY task_conversation_reads_update ON public.task_conversation_reads
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY task_conversation_reads_delete ON public.task_conversation_reads
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

NOTIFY pgrst, 'reload schema';
