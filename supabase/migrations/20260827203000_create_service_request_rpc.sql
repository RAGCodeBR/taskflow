-- Criação atômica de solicitações. Mantém a regra de autenticação no servidor
-- e evita que uma atualização tardia do perfil do navegador bloqueie o INSERT
-- pela política de linha da tabela.
CREATE OR REPLACE FUNCTION public.create_service_request(
  p_title text,
  p_description text DEFAULT NULL,
  p_client_id uuid DEFAULT NULL,
  p_priority text DEFAULT 'medium',
  p_due_date date DEFAULT NULL,
  p_participant_ids uuid[] DEFAULT ARRAY[]::uuid[]
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_actor_id uuid := auth.uid();
  v_request_id uuid;
BEGIN
  IF v_actor_id IS NULL THEN
    RAISE EXCEPTION 'Sessão inválida. Entre novamente para criar uma solicitação.' USING ERRCODE = '42501';
  END IF;

  IF char_length(trim(coalesce(p_title, ''))) = 0 THEN
    RAISE EXCEPTION 'Informe o assunto da solicitação.' USING ERRCODE = '23514';
  END IF;

  INSERT INTO public.service_requests (title, description, client_id, priority, due_date, created_by)
  VALUES (trim(p_title), nullif(trim(coalesce(p_description, '')), ''), p_client_id, p_priority, p_due_date, v_actor_id)
  RETURNING id INTO v_request_id;

  INSERT INTO public.service_request_participants (request_id, user_id, added_by)
  SELECT v_request_id, participant_id, v_actor_id
  FROM (
    SELECT v_actor_id AS participant_id
    UNION
    SELECT participant_id FROM unnest(coalesce(p_participant_ids, ARRAY[]::uuid[])) AS participant_id
  ) participants;

  INSERT INTO public.service_request_activity (request_id, actor_id, kind, details)
  VALUES (v_request_id, v_actor_id, 'created', 'Solicitação criada');

  RETURN v_request_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_service_request(text, text, uuid, text, date, uuid[]) TO authenticated;
