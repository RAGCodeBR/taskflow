-- Card opens are independent from conversation reads. Pins belong to one person.
CREATE TABLE public.task_card_opens (
  task_id uuid NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_opened_at timestamptz NOT NULL,
  last_opened_at timestamptz NOT NULL,
  PRIMARY KEY (task_id, user_id),
  CHECK (first_opened_at <= last_opened_at)
);
CREATE TABLE public.task_personal_pins (
  task_id uuid NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_pinned boolean NOT NULL DEFAULT false,
  changed_at timestamptz NOT NULL,
  PRIMARY KEY (task_id, user_id)
);
CREATE INDEX task_personal_pins_user_idx ON public.task_personal_pins(user_id) WHERE is_pinned;
ALTER TABLE public.task_card_opens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_personal_pins ENABLE ROW LEVEL SECURITY;
CREATE POLICY task_card_opens_select ON public.task_card_opens FOR SELECT TO authenticated
  USING (NOT public.has_role(auth.uid(), 'client') AND public.can_access_workspace_task(task_id));
CREATE POLICY task_personal_pins_select ON public.task_personal_pins FOR SELECT TO authenticated
  USING (user_id = auth.uid() AND NOT public.has_role(auth.uid(), 'client') AND public.can_access_workspace_task(task_id));
-- Only the narrowly scoped RPCs write these records. Callers cannot edit another
-- person's timestamps or pins and cannot replace a first opening directly.
REVOKE ALL ON public.task_card_opens, public.task_personal_pins FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.task_card_opens, public.task_personal_pins TO authenticated;

CREATE FUNCTION public.record_task_card_open(target_task_id uuid, opened_at timestamptz DEFAULT now())
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE actor uuid := auth.uid(); observed timestamptz := LEAST(opened_at, clock_timestamp());
BEGIN
  IF actor IS NULL OR public.has_role(actor, 'client') THEN
    RAISE EXCEPTION 'Você não pode acessar esta tarefa' USING ERRCODE = '42501';
  END IF;
  IF opened_at IS NULL THEN RAISE EXCEPTION 'Horário de abertura inválido'; END IF;
  PERFORM id FROM public.tasks WHERE id = target_task_id AND deleted_at IS NULL FOR KEY SHARE;
  IF NOT FOUND THEN RETURN false; END IF;
  IF NOT public.can_access_workspace_task(target_task_id) THEN
    RAISE EXCEPTION 'Você não pode acessar esta tarefa' USING ERRCODE = '42501';
  END IF;
  INSERT INTO public.task_card_opens AS existing(task_id, user_id, first_opened_at, last_opened_at)
    VALUES (target_task_id, actor, observed, observed)
    ON CONFLICT (task_id, user_id) DO UPDATE SET
      first_opened_at = LEAST(existing.first_opened_at, EXCLUDED.first_opened_at),
      last_opened_at = GREATEST(existing.last_opened_at, EXCLUDED.last_opened_at);
  RETURN true;
END; $$;

CREATE FUNCTION public.set_task_personal_pin(target_task_id uuid, pinned boolean, changed_at timestamptz DEFAULT now())
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE actor uuid := auth.uid(); observed timestamptz := LEAST(changed_at, clock_timestamp());
BEGIN
  IF actor IS NULL OR public.has_role(actor, 'client') THEN
    RAISE EXCEPTION 'Você não pode acessar esta tarefa' USING ERRCODE = '42501';
  END IF;
  IF pinned IS NULL OR changed_at IS NULL THEN RAISE EXCEPTION 'Prioridade pessoal inválida'; END IF;
  PERFORM id FROM public.tasks WHERE id = target_task_id AND deleted_at IS NULL FOR KEY SHARE;
  IF NOT FOUND THEN RETURN false; END IF;
  IF NOT public.can_access_workspace_task(target_task_id) THEN
    RAISE EXCEPTION 'Você não pode acessar esta tarefa' USING ERRCODE = '42501';
  END IF;
  INSERT INTO public.task_personal_pins AS existing(task_id, user_id, is_pinned, changed_at)
    VALUES (target_task_id, actor, pinned, observed)
    ON CONFLICT (task_id, user_id) DO UPDATE SET
      is_pinned = EXCLUDED.is_pinned, changed_at = EXCLUDED.changed_at
    WHERE existing.changed_at <= EXCLUDED.changed_at;
  RETURN true;
END; $$;
REVOKE ALL ON FUNCTION public.record_task_card_open(uuid, timestamptz), public.set_task_personal_pin(uuid, boolean, timestamptz) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.record_task_card_open(uuid, timestamptz), public.set_task_personal_pin(uuid, boolean, timestamptz) TO authenticated;
NOTIFY pgrst, 'reload schema';
