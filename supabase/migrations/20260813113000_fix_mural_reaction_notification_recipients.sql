-- Profiles are the source of truth for active internal accesses. Some legacy
-- accounts do not have a user_roles row, so joining only user_roles skipped
-- them when a reaction was created.
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
    AND NOT public.has_role(profile.id, 'client'::public.app_role);
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
  actor_name text;
BEGIN
  SELECT title INTO post_title FROM public.mural_posts WHERE id = NEW.post_id;
  SELECT COALESCE(full_name, email, 'Alguém') INTO actor_name FROM public.profiles WHERE id = NEW.user_id;

  INSERT INTO public.notifications (user_id, type, title, body)
  SELECT profile.id,
    'mural_reaction',
    'Nova reação no mural',
    COALESCE(actor_name, 'Alguém') || ' reagiu ' || NEW.emoji || ' em: ' || COALESCE(post_title, 'um post-it')
  FROM public.profiles profile
  WHERE profile.is_active = true
    AND profile.id <> NEW.user_id
    AND NOT public.has_role(profile.id, 'client'::public.app_role);

  RETURN NEW;
END;
$$;
