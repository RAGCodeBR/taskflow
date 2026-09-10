-- Marca quando cada pessoa abriu a conversa de uma tarefa — base do "não lido"
-- da tela de Conversas e do badge no menu.
--
-- As mensagens em si continuam em `comments` (já com realtime, REPLICA IDENTITY
-- FULL e RLS por ambiente/participação). Aqui só guardamos o ponteiro de
-- leitura, uma linha por (pessoa, tarefa).

CREATE TABLE IF NOT EXISTS public.task_conversation_reads (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_id uuid NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  last_read_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, task_id)
);

CREATE INDEX IF NOT EXISTS task_conversation_reads_task_idx
  ON public.task_conversation_reads (task_id);

ALTER TABLE public.task_conversation_reads ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.task_conversation_reads TO authenticated;
GRANT ALL ON public.task_conversation_reads TO service_role;

DROP POLICY IF EXISTS task_conversation_reads_own ON public.task_conversation_reads;
CREATE POLICY task_conversation_reads_own ON public.task_conversation_reads
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
