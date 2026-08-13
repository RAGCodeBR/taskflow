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
  SELECT COALESCE(full_name, email, 'Alguém')
  INTO actor_name
  FROM public.profiles
  WHERE id = actor_id;

  IF TG_OP = 'INSERT' THEN
    notification_title := 'Novo post-it no mural';
    notification_body := COALESCE(actor_name, 'Alguém') || ' publicou: ' || NEW.title;
  ELSE
    notification_title := 'Post-it atualizado no mural';
    notification_body := COALESCE(actor_name, 'Alguém') || ' atualizou: ' || NEW.title;
  END IF;

  INSERT INTO public.notifications (user_id, type, title, body)
  SELECT DISTINCT role.user_id, 'mural_post', notification_title, notification_body
  FROM public.user_roles role
  JOIN public.profiles profile ON profile.id = role.user_id
  WHERE role.role <> 'client'::public.app_role
    AND profile.is_active = true
    AND role.user_id <> actor_id;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_mural_post_created ON public.mural_posts;
CREATE TRIGGER trg_notify_mural_post_created
  AFTER INSERT ON public.mural_posts
  FOR EACH ROW EXECUTE FUNCTION public.notify_mural_post_activity();

DROP TRIGGER IF EXISTS trg_notify_mural_post_updated ON public.mural_posts;
CREATE TRIGGER trg_notify_mural_post_updated
  AFTER UPDATE OF title, content, color, tag, image_url, checklist, is_pinned, card_size, text_style, completed_at ON public.mural_posts
  FOR EACH ROW
  WHEN (OLD.* IS DISTINCT FROM NEW.*)
  EXECUTE FUNCTION public.notify_mural_post_activity();

CREATE OR REPLACE FUNCTION public.notify_mural_reaction_activity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  post_title text;
  actor_name text;
BEGIN
  SELECT title INTO post_title FROM public.mural_posts WHERE id = NEW.post_id;
  SELECT COALESCE(full_name, email, 'Alguém') INTO actor_name FROM public.profiles WHERE id = NEW.user_id;

  INSERT INTO public.notifications (user_id, type, title, body)
  SELECT DISTINCT role.user_id,
    'mural_reaction',
    'Nova reação no mural',
    COALESCE(actor_name, 'Alguém') || ' reagiu ' || NEW.emoji || ' em: ' || COALESCE(post_title, 'um post-it')
  FROM public.user_roles role
  JOIN public.profiles profile ON profile.id = role.user_id
  WHERE role.role <> 'client'::public.app_role
    AND profile.is_active = true
    AND role.user_id <> NEW.user_id;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_mural_reaction ON public.mural_post_reactions;
CREATE TRIGGER trg_notify_mural_reaction
  AFTER INSERT ON public.mural_post_reactions
  FOR EACH ROW EXECUTE FUNCTION public.notify_mural_reaction_activity();
