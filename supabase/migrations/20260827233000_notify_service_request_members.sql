-- Notifica individualmente quem foi incluído em uma solicitação.
-- A mesma tabela de notificações já alimenta a bolinha vermelha da navegação.
CREATE OR REPLACE FUNCTION public.notify_service_request_member()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  request_title text;
  request_creator uuid;
  actor_name text;
  role_label text;
BEGIN
  SELECT title, created_by
    INTO request_title, request_creator
    FROM public.service_requests
   WHERE id = NEW.request_id;

  -- Não gera pendência para a própria pessoa que criou/adicionou a si mesma.
  IF NEW.user_id = auth.uid() OR NEW.user_id = request_creator THEN
    RETURN NEW;
  END IF;

  SELECT COALESCE(full_name, email)
    INTO actor_name
    FROM public.profiles
   WHERE id = auth.uid();

  role_label := CASE TG_TABLE_NAME
    WHEN 'service_request_assignees' THEN 'como responsável'
    ELSE 'como participante'
  END;

  INSERT INTO public.notifications (user_id, task_id, type, title, body)
  VALUES (
    NEW.user_id,
    NULL,
    'service_request',
    'Nova solicitação para você',
    COALESCE(actor_name, 'Alguém') || ' adicionou você ' || role_label || ': ' || COALESCE(request_title, 'Solicitação')
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_service_request_participant ON public.service_request_participants;
CREATE TRIGGER trg_notify_service_request_participant
AFTER INSERT ON public.service_request_participants
FOR EACH ROW EXECUTE FUNCTION public.notify_service_request_member();

DROP TRIGGER IF EXISTS trg_notify_service_request_assignee ON public.service_request_assignees;
CREATE TRIGGER trg_notify_service_request_assignee
AFTER INSERT ON public.service_request_assignees
FOR EACH ROW EXECUTE FUNCTION public.notify_service_request_member();
