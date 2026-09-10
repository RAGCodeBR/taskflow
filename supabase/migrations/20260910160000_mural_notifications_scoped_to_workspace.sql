-- Notificação de mural só faz sentido para quem participa daquele mural.
--
-- notify_mural_post_activity e notify_mural_reaction_activity notificavam TODO
-- perfil ativo não-cliente do sistema, sem olhar workspace. Um recado postado
-- no Marketing acendia o badge "Mural LA" para a Consultoria inteira — gente
-- que nem enxerga aquele mural (a RLS de mural_posts é estrita por ambiente).
--
-- Passa a notificar apenas quem tem workspace_membership no ambiente do post.

CREATE OR REPLACE FUNCTION public.notify_mural_post_activity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  actor_id uuid := COALESCE(auth.uid(), NEW.created_by);
  actor_name text;
  notification_title text;
  notification_body text;
BEGIN
  SELECT COALESCE(full_name, email, 'Alguém') INTO actor_name FROM public.profiles WHERE id = actor_id;
  IF TG_OP = 'INSERT' THEN
    notification_title := 'Novo post-it no mural';
    notification_body := COALESCE(actor_name, 'Alguém') || ' publicou: ' || NEW.title;
  ELSE
    notification_title := 'Post-it atualizado no mural';
    notification_body := COALESCE(actor_name, 'Alguém') || ' atualizou: ' || NEW.title;
  END IF;

  INSERT INTO public.notifications (user_id, type, title, body)
  SELECT profile.id, 'mural_post', notification_title, notification_body
  FROM public.profiles profile
  WHERE profile.is_active = true
    AND profile.id <> actor_id
    AND NOT public.has_role(profile.id, 'client'::public.app_role)
    AND EXISTS (
      SELECT 1 FROM public.workspace_memberships m
      WHERE m.user_id = profile.id AND m.workspace_id = NEW.workspace_id
    );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_mural_reaction_activity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  post_title text;
  post_workspace uuid;
  actor_name text;
BEGIN
  SELECT title, workspace_id INTO post_title, post_workspace
  FROM public.mural_posts WHERE id = NEW.post_id;
  SELECT COALESCE(full_name, email, 'Alguém') INTO actor_name FROM public.profiles WHERE id = NEW.user_id;

  INSERT INTO public.notifications (user_id, type, title, body)
  SELECT profile.id, 'mural_reaction', 'Nova reação no mural',
    COALESCE(actor_name, 'Alguém') || ' reagiu ' || NEW.emoji || ' em: ' || COALESCE(post_title, 'um post-it')
  FROM public.profiles profile
  WHERE profile.is_active = true
    AND profile.id <> NEW.user_id
    AND NOT public.has_role(profile.id, 'client'::public.app_role)
    AND EXISTS (
      SELECT 1 FROM public.workspace_memberships m
      WHERE m.user_id = profile.id AND m.workspace_id = post_workspace
    );
  RETURN NEW;
END;
$$;

-- As notificações de mural já acumuladas são majoritariamente ruído dos testes
-- (mudança de tamanho de card, antes de 20260910140000 restringir o gatilho) e
-- foram entregues a gente que não devia recebê-las. Zera o histórico para os
-- badges "Mural LA" partirem limpos.
DELETE FROM public.notifications WHERE type IN ('mural_post', 'mural_reaction');
