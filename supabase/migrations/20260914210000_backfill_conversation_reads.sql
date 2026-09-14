-- Retroativo: quem mandou uma mensagem obviamente tinha a janela aberta
-- naquele momento, mesmo antes de o envio passar a marcar leitura
-- automaticamente. Preenche task_conversation_reads com a última mensagem que
-- cada pessoa mandou em cada conversa, sem regredir uma leitura mais recente
-- que já exista (ex.: quem abriu a tela depois de mandar a última mensagem).

INSERT INTO public.task_conversation_reads (user_id, task_id, last_read_at, manual_unread)
SELECT c.author_id, c.task_id, max(c.created_at), false
FROM public.comments c
WHERE c.author_id IS NOT NULL
GROUP BY c.author_id, c.task_id
ON CONFLICT (user_id, task_id) DO UPDATE
SET last_read_at = GREATEST(
  public.task_conversation_reads.last_read_at,
  EXCLUDED.last_read_at
);
