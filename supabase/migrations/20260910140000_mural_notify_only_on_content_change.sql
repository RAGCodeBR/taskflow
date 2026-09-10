-- Notificação de "recado atualizado no mural" só deve sair quando o conteúdo
-- muda — não quando alguém ajusta a apresentação.
--
-- O gatilho disparava em UPDATE OF de dez colunas, incluindo card_size,
-- is_pinned, text_style e completed_at. Diminuir um card, fixá-lo, trocar o
-- estilo do texto ou marcá-lo como concluído mandava um alerta em vermelho
-- para a equipe inteira, como se o recado tivesse mudado de fato.
--
-- Passa a disparar apenas quando muda o que a equipe precisa reler: título,
-- texto, itens de checklist, imagem ou categoria. color também sai — é ajuste
-- visual, não escrita.

DROP TRIGGER IF EXISTS trg_notify_mural_post_updated ON public.mural_posts;
CREATE TRIGGER trg_notify_mural_post_updated
  AFTER UPDATE OF title, content, checklist, image_url, tag ON public.mural_posts
  FOR EACH ROW
  WHEN (old.* IS DISTINCT FROM new.*)
  EXECUTE FUNCTION public.notify_mural_post_activity();
