-- Client obligations are permanent recurrence templates. Individual due dates
-- are materialized as occurrences and, near their deadline, as normal tasks.
-- Existing tasks remain untouched and do not depend on this module.

CREATE TABLE IF NOT EXISTS public.obligations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title text NOT NULL CHECK (char_length(trim(title)) > 0),
  description text,
  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  assignee_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  frequency text NOT NULL DEFAULT 'monthly'
    CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  interval_count integer NOT NULL DEFAULT 1 CHECK (interval_count BETWEEN 1 AND 365),
  days_of_week smallint[] NOT NULL DEFAULT ARRAY[]::smallint[],
  days_of_month smallint[] NOT NULL DEFAULT ARRAY[]::smallint[],
  month_rule text NOT NULL DEFAULT 'specific_days'
    CHECK (month_rule IN ('specific_days', 'last_day', 'last_business_day')),
  business_days_only boolean NOT NULL DEFAULT false,
  start_date date NOT NULL DEFAULT CURRENT_DATE,
  end_date date,
  create_before_days integer NOT NULL DEFAULT 7 CHECK (create_before_days BETWEEN 0 AND 365),
  due_time time without time zone,
  priority public.task_priority NOT NULL DEFAULT 'medium',
  column_id uuid REFERENCES public.kanban_columns(id) ON DELETE SET NULL,
  status_id uuid REFERENCES public.task_statuses(id) ON DELETE SET NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (end_date IS NULL OR end_date >= start_date)
);

CREATE TABLE IF NOT EXISTS public.obligation_occurrences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  obligation_id uuid NOT NULL REFERENCES public.obligations(id) ON DELETE CASCADE,
  due_date date NOT NULL,
  due_time time without time zone,
  status text NOT NULL DEFAULT 'scheduled'
    CHECK (status IN ('scheduled', 'open', 'completed', 'skipped')),
  task_id uuid UNIQUE REFERENCES public.tasks(id) ON DELETE SET NULL,
  completed_at timestamptz,
  completed_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (obligation_id, due_date)
);

CREATE INDEX IF NOT EXISTS obligations_workspace_active_idx
  ON public.obligations(workspace_id, is_active);
CREATE INDEX IF NOT EXISTS obligations_client_idx ON public.obligations(client_id);
CREATE INDEX IF NOT EXISTS obligation_occurrences_workspace_due_idx
  ON public.obligation_occurrences(workspace_id, due_date);
CREATE INDEX IF NOT EXISTS obligation_occurrences_obligation_due_idx
  ON public.obligation_occurrences(obligation_id, due_date);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.obligations TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.obligation_occurrences TO authenticated;
GRANT ALL ON public.obligations, public.obligation_occurrences TO service_role;

ALTER TABLE public.obligations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.obligation_occurrences ENABLE ROW LEVEL SECURITY;

CREATE POLICY obligations_workspace_access ON public.obligations
  FOR ALL TO authenticated
  USING (public.has_workspace_access(workspace_id))
  WITH CHECK (public.has_workspace_access(workspace_id));

CREATE POLICY obligation_occurrences_workspace_access ON public.obligation_occurrences
  FOR ALL TO authenticated
  USING (public.has_workspace_access(workspace_id))
  WITH CHECK (public.has_workspace_access(workspace_id));

DROP TRIGGER IF EXISTS trg_obligations_assign_workspace ON public.obligations;
CREATE TRIGGER trg_obligations_assign_workspace
  BEFORE INSERT OR UPDATE OF workspace_id ON public.obligations
  FOR EACH ROW EXECUTE FUNCTION public.assign_current_workspace();

DROP TRIGGER IF EXISTS trg_obligation_occurrences_assign_workspace ON public.obligation_occurrences;
CREATE TRIGGER trg_obligation_occurrences_assign_workspace
  BEFORE INSERT OR UPDATE OF workspace_id ON public.obligation_occurrences
  FOR EACH ROW EXECUTE FUNCTION public.assign_current_workspace();

DROP TRIGGER IF EXISTS trg_obligations_updated_at ON public.obligations;
CREATE TRIGGER trg_obligations_updated_at
  BEFORE UPDATE ON public.obligations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_obligation_occurrences_updated_at ON public.obligation_occurrences;
CREATE TRIGGER trg_obligation_occurrences_updated_at
  BEFORE UPDATE ON public.obligation_occurrences
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.prepare_obligation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NOT NULL THEN
    IF TG_OP = 'INSERT' THEN NEW.created_by := auth.uid(); END IF;
    IF NEW.workspace_id IS NULL THEN NEW.workspace_id := public.current_workspace_id(); END IF;
  END IF;

  NEW.title := trim(NEW.title);
  NEW.description := nullif(trim(coalesce(NEW.description, '')), '');
  NEW.days_of_week := ARRAY(
    SELECT DISTINCT day_value
    FROM unnest(NEW.days_of_week) AS day_value
    ORDER BY day_value
  );
  NEW.days_of_month := ARRAY(
    SELECT DISTINCT day_value
    FROM unnest(NEW.days_of_month) AS day_value
    ORDER BY day_value
  );

  IF EXISTS (
    SELECT 1 FROM unnest(NEW.days_of_week) AS day_value
    WHERE day_value < 1 OR day_value > 7
  ) THEN
    RAISE EXCEPTION 'Os dias da semana devem estar entre 1 e 7';
  END IF;
  IF EXISTS (
    SELECT 1 FROM unnest(NEW.days_of_month) AS day_value
    WHERE day_value < 1 OR day_value > 31
  ) THEN
    RAISE EXCEPTION 'Os dias do mês devem estar entre 1 e 31';
  END IF;
  IF NEW.frequency = 'weekly' AND cardinality(NEW.days_of_week) = 0 THEN
    RAISE EXCEPTION 'Selecione ao menos um dia da semana';
  END IF;
  IF NEW.frequency = 'monthly'
     AND NEW.month_rule = 'specific_days'
     AND cardinality(NEW.days_of_month) = 0 THEN
    RAISE EXCEPTION 'Informe ao menos um dia do mês';
  END IF;
  IF NEW.client_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.clients client
    WHERE client.id = NEW.client_id AND client.workspace_id = NEW.workspace_id
  ) THEN
    RAISE EXCEPTION 'O cliente não pertence ao ambiente atual';
  END IF;
  IF NEW.assignee_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.workspace_memberships membership
    WHERE membership.workspace_id = NEW.workspace_id
      AND membership.user_id = NEW.assignee_id
  ) THEN
    RAISE EXCEPTION 'O responsável não pertence ao ambiente atual';
  END IF;
  IF NEW.column_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.kanban_columns kanban_column
    WHERE kanban_column.id = NEW.column_id
      AND kanban_column.workspace_id = NEW.workspace_id
  ) THEN
    RAISE EXCEPTION 'A coluna não pertence ao ambiente atual';
  END IF;
  IF NEW.status_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.task_statuses task_status
    WHERE task_status.id = NEW.status_id
      AND task_status.workspace_id = NEW.workspace_id
      AND NOT task_status.is_completed
  ) THEN
    RAISE EXCEPTION 'O status inicial precisa ser um status aberto do ambiente atual';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prepare_obligation ON public.obligations;
CREATE TRIGGER trg_prepare_obligation
  BEFORE INSERT OR UPDATE ON public.obligations
  FOR EACH ROW EXECUTE FUNCTION public.prepare_obligation();

CREATE OR REPLACE FUNCTION public.obligation_matches_date(
  obligation public.obligations,
  candidate date
)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
DECLARE
  month_start date;
  month_end date;
  target_date date;
  months_since integer;
  weeks_since integer;
BEGIN
  IF candidate < obligation.start_date
     OR (obligation.end_date IS NOT NULL AND candidate > obligation.end_date) THEN
    RETURN false;
  END IF;

  IF obligation.frequency = 'daily' THEN
    IF mod(candidate - obligation.start_date, obligation.interval_count) <> 0 THEN
      RETURN false;
    END IF;
    RETURN NOT obligation.business_days_only
      OR extract(isodow FROM candidate)::integer BETWEEN 1 AND 5;
  END IF;

  IF obligation.frequency = 'weekly' THEN
    weeks_since := (
      date_trunc('week', candidate)::date - date_trunc('week', obligation.start_date)::date
    ) / 7;
    RETURN mod(weeks_since, obligation.interval_count) = 0
      AND extract(isodow FROM candidate)::smallint = ANY(obligation.days_of_week);
  END IF;

  month_start := date_trunc('month', candidate)::date;
  month_end := (month_start + interval '1 month - 1 day')::date;
  months_since :=
    (extract(year FROM candidate)::integer - extract(year FROM obligation.start_date)::integer) * 12
    + extract(month FROM candidate)::integer - extract(month FROM obligation.start_date)::integer;
  IF mod(months_since, obligation.interval_count) <> 0 THEN RETURN false; END IF;

  IF obligation.month_rule = 'last_day' THEN
    RETURN candidate = month_end;
  END IF;

  IF obligation.month_rule = 'last_business_day' THEN
    target_date := month_end;
    IF extract(isodow FROM target_date)::integer = 6 THEN target_date := target_date - 1; END IF;
    IF extract(isodow FROM target_date)::integer = 7 THEN target_date := target_date - 2; END IF;
    RETURN candidate = target_date;
  END IF;

  RETURN EXISTS (
    SELECT 1
    FROM unnest(obligation.days_of_month) configured_day
    WHERE candidate = make_date(
      extract(year FROM candidate)::integer,
      extract(month FROM candidate)::integer,
      least(configured_day::integer, extract(day FROM month_end)::integer)
    )
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.create_obligation_task(target_occurrence_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  occurrence_record record;
  obligation_record public.obligations%ROWTYPE;
  selected_status_id uuid;
  selected_column_id uuid;
  new_task_id uuid;
  next_position integer;
BEGIN
  SELECT * INTO occurrence_record
  FROM public.obligation_occurrences
  WHERE id = target_occurrence_id
  FOR UPDATE;

  IF NOT FOUND THEN RAISE EXCEPTION 'Ocorrência não encontrada'; END IF;
  IF auth.uid() IS NOT NULL AND NOT public.has_workspace_access(occurrence_record.workspace_id) THEN
    RAISE EXCEPTION 'Você não pode criar tarefas neste ambiente';
  END IF;
  IF occurrence_record.task_id IS NOT NULL THEN RETURN occurrence_record.task_id; END IF;
  IF occurrence_record.status IN ('completed', 'skipped') THEN
    RAISE EXCEPTION 'Esta ocorrência já foi encerrada';
  END IF;

  SELECT * INTO obligation_record
  FROM public.obligations
  WHERE id = occurrence_record.obligation_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Obrigação não encontrada'; END IF;

  selected_status_id := obligation_record.status_id;
  IF selected_status_id IS NULL THEN
    SELECT id INTO selected_status_id
    FROM public.task_statuses
    WHERE workspace_id = obligation_record.workspace_id AND NOT is_completed
    ORDER BY position, created_at
    LIMIT 1;
  END IF;

  selected_column_id := obligation_record.column_id;
  IF selected_column_id IS NULL THEN
    SELECT id INTO selected_column_id
    FROM public.kanban_columns
    WHERE workspace_id = obligation_record.workspace_id
    ORDER BY position, created_at
    LIMIT 1;
  END IF;

  SELECT coalesce(max(position), -1) + 1 INTO next_position
  FROM public.tasks
  WHERE workspace_id = obligation_record.workspace_id
    AND column_id IS NOT DISTINCT FROM selected_column_id
    AND deleted_at IS NULL;

  INSERT INTO public.tasks (
    title, description, status, status_id, priority, due_date, due_time,
    assignee_id, client_id, column_id, position, created_by, workspace_id
  ) VALUES (
    obligation_record.title,
    obligation_record.description,
    'todo'::public.task_status,
    selected_status_id,
    obligation_record.priority,
    (
      occurrence_record.due_date
      + coalesce(occurrence_record.due_time, time '12:00')
    ) AT TIME ZONE 'America/Sao_Paulo',
    occurrence_record.due_time,
    obligation_record.assignee_id,
    obligation_record.client_id,
    selected_column_id,
    next_position,
    obligation_record.created_by,
    obligation_record.workspace_id
  )
  RETURNING id INTO new_task_id;

  UPDATE public.obligation_occurrences
  SET task_id = new_task_id, status = 'open'
  WHERE id = occurrence_record.id;

  RETURN new_task_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.materialize_obligations(p_horizon_days integer DEFAULT 180)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  obligation_record public.obligations%ROWTYPE;
  candidate date;
  generated_count integer := 0;
  inserted_count integer;
  occurrence_record record;
BEGIN
  p_horizon_days := greatest(30, least(coalesce(p_horizon_days, 180), 730));

  FOR obligation_record IN
    SELECT * FROM public.obligations obligation
    WHERE obligation.is_active
      AND (
        auth.uid() IS NULL
        OR obligation.workspace_id = public.current_workspace_id()
      )
  LOOP
    FOR candidate IN
      SELECT day_value::date
      FROM generate_series(
        greatest(CURRENT_DATE, obligation_record.start_date)::timestamp,
        least(
          CURRENT_DATE + p_horizon_days,
          coalesce(obligation_record.end_date, CURRENT_DATE + p_horizon_days)
        )::timestamp,
        interval '1 day'
      ) day_value
    LOOP
      IF public.obligation_matches_date(obligation_record, candidate) THEN
        INSERT INTO public.obligation_occurrences (
          workspace_id, obligation_id, due_date, due_time
        ) VALUES (
          obligation_record.workspace_id,
          obligation_record.id,
          candidate,
          obligation_record.due_time
        )
        ON CONFLICT (obligation_id, due_date) DO NOTHING;
        GET DIAGNOSTICS inserted_count = ROW_COUNT;
        generated_count := generated_count + inserted_count;
      END IF;
    END LOOP;
  END LOOP;

  FOR occurrence_record IN
    SELECT occurrence.id
    FROM public.obligation_occurrences occurrence
    JOIN public.obligations obligation ON obligation.id = occurrence.obligation_id
    WHERE occurrence.task_id IS NULL
      AND occurrence.status = 'scheduled'
      AND obligation.is_active
      AND occurrence.due_date - obligation.create_before_days <= CURRENT_DATE
      AND (auth.uid() IS NULL OR occurrence.workspace_id = public.current_workspace_id())
    ORDER BY occurrence.due_date
  LOOP
    PERFORM public.create_obligation_task(occurrence_record.id);
  END LOOP;

  RETURN generated_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.refresh_obligation(target_obligation_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE target_workspace uuid;
BEGIN
  SELECT workspace_id INTO target_workspace FROM public.obligations WHERE id = target_obligation_id;
  IF target_workspace IS NULL THEN RAISE EXCEPTION 'Obrigação não encontrada'; END IF;
  IF auth.uid() IS NOT NULL AND NOT public.has_workspace_access(target_workspace) THEN
    RAISE EXCEPTION 'Você não pode atualizar esta obrigação';
  END IF;

  DELETE FROM public.obligation_occurrences
  WHERE obligation_id = target_obligation_id
    AND task_id IS NULL
    AND status = 'scheduled'
    AND due_date >= CURRENT_DATE;

  RETURN public.materialize_obligations(365);
END;
$$;

CREATE OR REPLACE FUNCTION public.complete_obligation_occurrence(target_occurrence_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE occurrence_record record; completed_status_id uuid;
BEGIN
  SELECT * INTO occurrence_record FROM public.obligation_occurrences
  WHERE id = target_occurrence_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Ocorrência não encontrada'; END IF;
  IF NOT public.has_workspace_access(occurrence_record.workspace_id) THEN
    RAISE EXCEPTION 'Você não pode concluir esta ocorrência';
  END IF;

  UPDATE public.obligation_occurrences
  SET status = 'completed', completed_at = coalesce(completed_at, now()), completed_by = auth.uid()
  WHERE id = target_occurrence_id;

  IF occurrence_record.task_id IS NOT NULL THEN
    SELECT id INTO completed_status_id FROM public.task_statuses
    WHERE workspace_id = occurrence_record.workspace_id AND is_completed
    ORDER BY position LIMIT 1;
    UPDATE public.tasks
    SET status = 'done'::public.task_status,
        status_id = coalesce(completed_status_id, status_id),
        completed_at = coalesce(completed_at, now())
    WHERE id = occurrence_record.task_id;
  END IF;
  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.sync_obligation_occurrence_from_task()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE is_task_completed boolean;
BEGIN
  is_task_completed := NEW.completed_at IS NOT NULL OR NEW.status = 'done'::public.task_status
    OR EXISTS (SELECT 1 FROM public.task_statuses status WHERE status.id = NEW.status_id AND status.is_completed);

  UPDATE public.obligation_occurrences
  SET status = CASE WHEN is_task_completed THEN 'completed' ELSE 'open' END,
      completed_at = CASE WHEN is_task_completed THEN coalesce(completed_at, NEW.completed_at, now()) ELSE NULL END,
      completed_by = CASE WHEN is_task_completed THEN coalesce(completed_by, auth.uid()) ELSE NULL END
  WHERE task_id = NEW.id AND status <> 'skipped';
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_obligation_occurrence_from_task ON public.tasks;
CREATE TRIGGER trg_sync_obligation_occurrence_from_task
  AFTER INSERT OR UPDATE OF status, status_id, completed_at ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.sync_obligation_occurrence_from_task();

REVOKE ALL ON FUNCTION public.create_obligation_task(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.materialize_obligations(integer) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.refresh_obligation(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.complete_obligation_occurrence(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.create_obligation_task(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.materialize_obligations(integer) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.refresh_obligation(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.complete_obligation_occurrence(uuid) TO authenticated, service_role;

-- Existing task users receive the new page permission. Administrators also
-- receive it through the application-level permission list.
UPDATE public.workspace_memberships
SET permissions = array_append(permissions, 'obligations'), updated_at = now()
WHERE 'tasks' = ANY(permissions) AND NOT ('obligations' = ANY(permissions));

UPDATE public.user_permissions
SET permissions = array_append(permissions, 'obligations')
WHERE 'tasks' = ANY(permissions) AND NOT ('obligations' = ANY(permissions));

DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.obligations;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.obligation_occurrences;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
END;
$$;

-- If pg_cron is enabled in the project, generate upcoming occurrences and
-- tasks every day. The page also calls the same idempotent function as a safe
-- fallback whenever the module is opened.
DO $$
DECLARE existing_job bigint;
BEGIN
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'cron') THEN
    SELECT jobid INTO existing_job FROM cron.job WHERE jobname = 'taskflow-obligations-daily';
    IF existing_job IS NOT NULL THEN PERFORM cron.unschedule(existing_job); END IF;
    PERFORM cron.schedule(
      'taskflow-obligations-daily',
      '10 3 * * *',
      'SELECT public.materialize_obligations(180);'
    );
  END IF;
EXCEPTION WHEN insufficient_privilege OR undefined_table OR undefined_function THEN
  RAISE NOTICE 'pg_cron não está disponível; a página fará a materialização idempotente.';
END;
$$;

NOTIFY pgrst, 'reload schema';
