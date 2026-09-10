-- Restringe ainda mais: a notificação de "recado atualizado no mural" sai só
-- quando muda o título ou o texto. Checklist, imagem e categoria também deixam
-- de notificar — o critério passa a ser exclusivamente edição de escrita.

DROP TRIGGER IF EXISTS trg_notify_mural_post_updated ON public.mural_posts;
CREATE TRIGGER trg_notify_mural_post_updated
  AFTER UPDATE OF title, content ON public.mural_posts
  FOR EACH ROW
  WHEN (old.* IS DISTINCT FROM new.*)
  EXECUTE FUNCTION public.notify_mural_post_activity();
