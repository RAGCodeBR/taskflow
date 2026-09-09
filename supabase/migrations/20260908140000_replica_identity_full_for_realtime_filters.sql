-- O DELETE de um anexo (ou comentário) não desaparecia da tela de quem estava
-- com a tarefa aberta em outra sessão — só sumia ao recarregar.
--
-- As subscriptions de attachments e comments filtram por task_id
-- (`filter: task_id=eq.${id}`). Com REPLICA IDENTITY no padrão (só a chave
-- primária), o registro "old" de um evento DELETE só carrega o id da linha
-- apagada — sem task_id, o Realtime não consegue avaliar esse filtro e
-- simplesmente não entrega o evento a ninguém. Isso não gera erro nem no
-- servidor nem no cliente: o evento só nunca chega.
--
-- subtasks já tinha sido configurada com FULL quando ganhou realtime;
-- attachments e comments ficaram no padrão desde sempre. Eventos de INSERT não
-- são afetados (o registro novo sempre vem completo), por isso um anexo
-- recém-criado já aparecia em tempo real — só a exclusão ficava presa.

ALTER TABLE public.attachments REPLICA IDENTITY FULL;
ALTER TABLE public.comments REPLICA IDENTITY FULL;
