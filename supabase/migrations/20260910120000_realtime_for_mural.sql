-- O Mural nunca teve realtime: toda mutation só atualiza a própria sessão de
-- quem agiu (via invalidateQueries local). Quem está com o quadro aberto em
-- outra aba, ou é outra pessoa, só vê o card novo, editado ou excluído depois
-- de recarregar a página.
--
-- Duas peças faltavam, do mesmo jeito que faltavam para os anexos de tarefa:
--
--   1. mural_post_attachments nem estava na publicação — evento nenhum saía
--      do banco para essa tabela, independente de qualquer coisa no cliente.
--   2. As três tabelas têm REPLICA IDENTITY no padrão (só a chave primária).
--      Um evento DELETE filtrado por post_id precisa desse campo no payload
--      "old" para o Realtime avaliar o filtro — sem FULL, a exclusão nunca
--      chega a quem está filtrando por post_id (mesma causa raiz corrigida em
--      20260908140000 para attachments e comments).

ALTER PUBLICATION supabase_realtime ADD TABLE public.mural_post_attachments;

ALTER TABLE public.mural_posts REPLICA IDENTITY FULL;
ALTER TABLE public.mural_post_attachments REPLICA IDENTITY FULL;
ALTER TABLE public.mural_post_reactions REPLICA IDENTITY FULL;
