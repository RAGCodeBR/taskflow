-- Independent recurring meetings module.
-- Generated as a separate domain: it does not read or mutate obligations/obligation_* data.

-- Client recurring_meetings are permanent recurrence templates. Individual due dates
-- are materialized as occurrences and, near their deadline, as normal tasks.
-- Existing tasks remain untouched and do not depend on this module.

CREATE TABLE IF NOT EXISTS public.recurring_meetings (
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

CREATE TABLE IF NOT EXISTS public.recurring_meeting_occurrences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  recurring_meeting_id uuid NOT NULL REFERENCES public.recurring_meetings(id) ON DELETE CASCADE,
  due_date date NOT NULL,
  due_time time without time zone,
  status text NOT NULL DEFAULT 'scheduled'
    CHECK (status IN ('scheduled', 'open', 'completed', 'skipped')),
  task_id uuid UNIQUE REFERENCES public.tasks(id) ON DELETE SET NULL,
  completed_at timestamptz,
  completed_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (recurring_meeting_id, due_date)
);

CREATE INDEX IF NOT EXISTS recurring_meetings_workspace_active_idx
  ON public.recurring_meetings(workspace_id, is_active);
CREATE INDEX IF NOT EXISTS recurring_meetings_client_idx ON public.recurring_meetings(client_id);
CREATE INDEX IF NOT EXISTS recurring_meeting_occurrences_workspace_due_idx
  ON public.recurring_meeting_occurrences(workspace_id, due_date);
CREATE INDEX IF NOT EXISTS recurring_meeting_occurrences_recurring_meeting_due_idx
  ON public.recurring_meeting_occurrences(recurring_meeting_id, due_date);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.recurring_meetings TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.recurring_meeting_occurrences TO authenticated;
GRANT ALL ON public.recurring_meetings, public.recurring_meeting_occurrences TO service_role;

ALTER TABLE public.recurring_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recurring_meeting_occurrences ENABLE ROW LEVEL SECURITY;

CREATE POLICY recurring_meetings_workspace_access ON public.recurring_meetings
  FOR ALL TO authenticated
  USING (public.has_workspace_access(workspace_id))
  WITH CHECK (public.has_workspace_access(workspace_id));

CREATE POLICY recurring_meeting_occurrences_workspace_access ON public.recurring_meeting_occurrences
  FOR ALL TO authenticated
  USING (public.has_workspace_access(workspace_id))
  WITH CHECK (public.has_workspace_access(workspace_id));

DROP TRIGGER IF EXISTS trg_recurring_meetings_assign_workspace ON public.recurring_meetings;
CREATE TRIGGER trg_recurring_meetings_assign_workspace
  BEFORE INSERT OR UPDATE OF workspace_id ON public.recurring_meetings
  FOR EACH ROW EXECUTE FUNCTION public.assign_current_workspace();

DROP TRIGGER IF EXISTS trg_recurring_meeting_occurrences_assign_workspace ON public.recurring_meeting_occurrences;
CREATE TRIGGER trg_recurring_meeting_occurrences_assign_workspace
  BEFORE INSERT OR UPDATE OF workspace_id ON public.recurring_meeting_occurrences
  FOR EACH ROW EXECUTE FUNCTION public.assign_current_workspace();

DROP TRIGGER IF EXISTS trg_recurring_meetings_updated_at ON public.recurring_meetings;
CREATE TRIGGER trg_recurring_meetings_updated_at
  BEFORE UPDATE ON public.recurring_meetings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_recurring_meeting_occurrences_updated_at ON public.recurring_meeting_occurrences;
CREATE TRIGGER trg_recurring_meeting_occurrences_updated_at
  BEFORE UPDATE ON public.recurring_meeting_occurrences
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.prepare_recurring_meeting()
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

DROP TRIGGER IF EXISTS trg_prepare_recurring_meeting ON public.recurring_meetings;
CREATE TRIGGER trg_prepare_recurring_meeting
  BEFORE INSERT OR UPDATE ON public.recurring_meetings
  FOR EACH ROW EXECUTE FUNCTION public.prepare_recurring_meeting();

CREATE OR REPLACE FUNCTION public.recurring_meeting_matches_date(
  recurring_meeting public.recurring_meetings,
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
  IF candidate < recurring_meeting.start_date
     OR (recurring_meeting.end_date IS NOT NULL AND candidate > recurring_meeting.end_date) THEN
    RETURN false;
  END IF;

  IF recurring_meeting.frequency = 'daily' THEN
    IF mod(candidate - recurring_meeting.start_date, recurring_meeting.interval_count) <> 0 THEN
      RETURN false;
    END IF;
    RETURN NOT recurring_meeting.business_days_only
      OR extract(isodow FROM candidate)::integer BETWEEN 1 AND 5;
  END IF;

  IF recurring_meeting.frequency = 'weekly' THEN
    weeks_since := (
      date_trunc('week', candidate)::date - date_trunc('week', recurring_meeting.start_date)::date
    ) / 7;
    RETURN mod(weeks_since, recurring_meeting.interval_count) = 0
      AND extract(isodow FROM candidate)::smallint = ANY(recurring_meeting.days_of_week);
  END IF;

  month_start := date_trunc('month', candidate)::date;
  month_end := (month_start + interval '1 month - 1 day')::date;
  months_since :=
    (extract(year FROM candidate)::integer - extract(year FROM recurring_meeting.start_date)::integer) * 12
    + extract(month FROM candidate)::integer - extract(month FROM recurring_meeting.start_date)::integer;
  IF mod(months_since, recurring_meeting.interval_count) <> 0 THEN RETURN false; END IF;

  IF recurring_meeting.month_rule = 'last_day' THEN
    RETURN candidate = month_end;
  END IF;

  IF recurring_meeting.month_rule = 'last_business_day' THEN
    target_date := month_end;
    IF extract(isodow FROM target_date)::integer = 6 THEN target_date := target_date - 1; END IF;
    IF extract(isodow FROM target_date)::integer = 7 THEN target_date := target_date - 2; END IF;
    RETURN candidate = target_date;
  END IF;

  RETURN EXISTS (
    SELECT 1
    FROM unnest(recurring_meeting.days_of_month) configured_day
    WHERE candidate = make_date(
      extract(year FROM candidate)::integer,
      extract(month FROM candidate)::integer,
      least(configured_day::integer, extract(day FROM month_end)::integer)
    )
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.create_recurring_meeting_task(target_occurrence_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  occurrence_record record;
  recurring_meeting_record public.recurring_meetings%ROWTYPE;
  selected_status_id uuid;
  selected_column_id uuid;
  new_task_id uuid;
  next_position integer;
BEGIN
  SELECT * INTO occurrence_record
  FROM public.recurring_meeting_occurrences
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

  SELECT * INTO recurring_meeting_record
  FROM public.recurring_meetings
  WHERE id = occurrence_record.recurring_meeting_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Reunião não encontrada'; END IF;

  selected_status_id := recurring_meeting_record.status_id;
  IF selected_status_id IS NULL THEN
    SELECT id INTO selected_status_id
    FROM public.task_statuses
    WHERE workspace_id = recurring_meeting_record.workspace_id AND NOT is_completed
    ORDER BY position, created_at
    LIMIT 1;
  END IF;

  selected_column_id := recurring_meeting_record.column_id;
  IF selected_column_id IS NULL THEN
    SELECT id INTO selected_column_id
    FROM public.kanban_columns
    WHERE workspace_id = recurring_meeting_record.workspace_id
    ORDER BY position, created_at
    LIMIT 1;
  END IF;

  SELECT coalesce(max(position), -1) + 1 INTO next_position
  FROM public.tasks
  WHERE workspace_id = recurring_meeting_record.workspace_id
    AND column_id IS NOT DISTINCT FROM selected_column_id
    AND deleted_at IS NULL;

  INSERT INTO public.tasks (
    title, description, status, status_id, priority, due_date, due_time,
    assignee_id, client_id, column_id, position, created_by, workspace_id
  ) VALUES (
    recurring_meeting_record.title,
    recurring_meeting_record.description,
    'todo'::public.task_status,
    selected_status_id,
    recurring_meeting_record.priority,
    (
      occurrence_record.due_date
      + coalesce(occurrence_record.due_time, time '12:00')
    ) AT TIME ZONE 'America/Sao_Paulo',
    occurrence_record.due_time,
    recurring_meeting_record.assignee_id,
    recurring_meeting_record.client_id,
    selected_column_id,
    next_position,
    recurring_meeting_record.created_by,
    recurring_meeting_record.workspace_id
  )
  RETURNING id INTO new_task_id;

  UPDATE public.recurring_meeting_occurrences
  SET task_id = new_task_id, status = 'open'
  WHERE id = occurrence_record.id;

  RETURN new_task_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.materialize_recurring_meetings(p_horizon_days integer DEFAULT 180)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recurring_meeting_record public.recurring_meetings%ROWTYPE;
  candidate date;
  generated_count integer := 0;
  inserted_count integer;
  occurrence_record record;
BEGIN
  p_horizon_days := greatest(30, least(coalesce(p_horizon_days, 180), 730));

  FOR recurring_meeting_record IN
    SELECT * FROM public.recurring_meetings recurring_meeting
    WHERE recurring_meeting.is_active
      AND (
        auth.uid() IS NULL
        OR recurring_meeting.workspace_id = public.current_workspace_id()
      )
  LOOP
    FOR candidate IN
      SELECT day_value::date
      FROM generate_series(
        greatest(CURRENT_DATE, recurring_meeting_record.start_date)::timestamp,
        least(
          CURRENT_DATE + p_horizon_days,
          coalesce(recurring_meeting_record.end_date, CURRENT_DATE + p_horizon_days)
        )::timestamp,
        interval '1 day'
      ) day_value
    LOOP
      IF public.recurring_meeting_matches_date(recurring_meeting_record, candidate) THEN
        INSERT INTO public.recurring_meeting_occurrences (
          workspace_id, recurring_meeting_id, due_date, due_time
        ) VALUES (
          recurring_meeting_record.workspace_id,
          recurring_meeting_record.id,
          candidate,
          recurring_meeting_record.due_time
        )
        ON CONFLICT (recurring_meeting_id, due_date) DO NOTHING;
        GET DIAGNOSTICS inserted_count = ROW_COUNT;
        generated_count := generated_count + inserted_count;
      END IF;
    END LOOP;
  END LOOP;

  FOR occurrence_record IN
    SELECT occurrence.id
    FROM public.recurring_meeting_occurrences occurrence
    JOIN public.recurring_meetings recurring_meeting ON recurring_meeting.id = occurrence.recurring_meeting_id
    WHERE occurrence.task_id IS NULL
      AND occurrence.status = 'scheduled'
      AND recurring_meeting.is_active
      AND occurrence.due_date - recurring_meeting.create_before_days <= CURRENT_DATE
      AND (auth.uid() IS NULL OR occurrence.workspace_id = public.current_workspace_id())
    ORDER BY occurrence.due_date
  LOOP
    PERFORM public.create_recurring_meeting_task(occurrence_record.id);
  END LOOP;

  RETURN generated_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.refresh_recurring_meeting(target_recurring_meeting_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE target_workspace uuid;
BEGIN
  SELECT workspace_id INTO target_workspace FROM public.recurring_meetings WHERE id = target_recurring_meeting_id;
  IF target_workspace IS NULL THEN RAISE EXCEPTION 'Reunião não encontrada'; END IF;
  IF auth.uid() IS NOT NULL AND NOT public.has_workspace_access(target_workspace) THEN
    RAISE EXCEPTION 'Você não pode atualizar esta reunião';
  END IF;

  DELETE FROM public.recurring_meeting_occurrences
  WHERE recurring_meeting_id = target_recurring_meeting_id
    AND task_id IS NULL
    AND status = 'scheduled'
    AND due_date >= CURRENT_DATE;

  RETURN public.materialize_recurring_meetings(365);
END;
$$;

CREATE OR REPLACE FUNCTION public.complete_recurring_meeting_occurrence(target_occurrence_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE occurrence_record record; completed_status_id uuid;
BEGIN
  SELECT * INTO occurrence_record FROM public.recurring_meeting_occurrences
  WHERE id = target_occurrence_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Ocorrência não encontrada'; END IF;
  IF NOT public.has_workspace_access(occurrence_record.workspace_id) THEN
    RAISE EXCEPTION 'Você não pode concluir esta ocorrência';
  END IF;

  UPDATE public.recurring_meeting_occurrences
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

CREATE OR REPLACE FUNCTION public.sync_recurring_meeting_occurrence_from_task()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE is_task_completed boolean;
BEGIN
  is_task_completed := NEW.completed_at IS NOT NULL OR NEW.status = 'done'::public.task_status
    OR EXISTS (SELECT 1 FROM public.task_statuses status WHERE status.id = NEW.status_id AND status.is_completed);

  UPDATE public.recurring_meeting_occurrences
  SET status = CASE WHEN is_task_completed THEN 'completed' ELSE 'open' END,
      completed_at = CASE WHEN is_task_completed THEN coalesce(completed_at, NEW.completed_at, now()) ELSE NULL END,
      completed_by = CASE WHEN is_task_completed THEN coalesce(completed_by, auth.uid()) ELSE NULL END
  WHERE task_id = NEW.id AND status <> 'skipped';
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_recurring_meeting_occurrence_from_task ON public.tasks;
CREATE TRIGGER trg_sync_recurring_meeting_occurrence_from_task
  AFTER INSERT OR UPDATE OF status, status_id, completed_at ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.sync_recurring_meeting_occurrence_from_task();

REVOKE ALL ON FUNCTION public.create_recurring_meeting_task(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.materialize_recurring_meetings(integer) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.refresh_recurring_meeting(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.complete_recurring_meeting_occurrence(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.create_recurring_meeting_task(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.materialize_recurring_meetings(integer) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.refresh_recurring_meeting(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.complete_recurring_meeting_occurrence(uuid) TO authenticated, service_role;

-- Existing task users receive the new page permission. Administrators also
-- receive it through the application-level permission list.
UPDATE public.workspace_memberships
SET permissions = array_append(permissions, 'meetings'), updated_at = now()
WHERE 'tasks' = ANY(permissions) AND NOT ('meetings' = ANY(permissions));

UPDATE public.user_permissions
SET permissions = array_append(permissions, 'meetings')
WHERE 'tasks' = ANY(permissions) AND NOT ('meetings' = ANY(permissions));

DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.recurring_meetings;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.recurring_meeting_occurrences;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
END;
$$;

NOTIFY pgrst, 'reload schema';
-- Evolui Reuniões para rotinas de reunião por departamento.
-- Uma ocorrência passa a representar uma reunião e pode possuir várias tarefas/pautas.
-- Os campos legados são preservados para que nenhum histórico seja perdido.

CREATE TABLE IF NOT EXISTS public.recurring_meeting_departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name text NOT NULL CHECK (char_length(trim(name)) > 0),
  description text,
  color text NOT NULL DEFAULT '#64748b',
  position integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS recurring_meeting_departments_workspace_name_idx
  ON public.recurring_meeting_departments (workspace_id, lower(trim(name)));
CREATE INDEX IF NOT EXISTS recurring_meeting_departments_workspace_position_idx
  ON public.recurring_meeting_departments (workspace_id, position, name);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.recurring_meeting_departments TO authenticated;
GRANT ALL ON public.recurring_meeting_departments TO service_role;

ALTER TABLE public.recurring_meeting_departments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS recurring_meeting_departments_workspace_access ON public.recurring_meeting_departments;
CREATE POLICY recurring_meeting_departments_workspace_access ON public.recurring_meeting_departments
  FOR ALL TO authenticated
  USING (public.has_workspace_access(workspace_id))
  WITH CHECK (public.has_workspace_access(workspace_id));

DROP TRIGGER IF EXISTS trg_recurring_meeting_departments_assign_workspace ON public.recurring_meeting_departments;
CREATE TRIGGER trg_recurring_meeting_departments_assign_workspace
  BEFORE INSERT OR UPDATE OF workspace_id ON public.recurring_meeting_departments
  FOR EACH ROW EXECUTE FUNCTION public.assign_current_workspace();

DROP TRIGGER IF EXISTS trg_recurring_meeting_departments_updated_at ON public.recurring_meeting_departments;
CREATE TRIGGER trg_recurring_meeting_departments_updated_at
  BEFORE UPDATE ON public.recurring_meeting_departments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.recurring_meetings
  ADD COLUMN IF NOT EXISTS department_id uuid
    REFERENCES public.recurring_meeting_departments(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS meeting_mode boolean NOT NULL DEFAULT true;

CREATE INDEX IF NOT EXISTS recurring_meetings_department_idx
  ON public.recurring_meetings (department_id, is_active);

ALTER TABLE public.tasks
  ADD COLUMN IF NOT EXISTS recurring_meeting_occurrence_id uuid
    REFERENCES public.recurring_meeting_occurrences(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS tasks_recurring_meeting_occurrence_idx
  ON public.tasks (recurring_meeting_occurrence_id)
  WHERE recurring_meeting_occurrence_id IS NOT NULL;

-- A tarefa única criada pelo modelo antigo passa a ser a primeira pauta da reunião.
UPDATE public.tasks task
SET recurring_meeting_occurrence_id = occurrence.id
FROM public.recurring_meeting_occurrences occurrence
WHERE occurrence.task_id = task.id
  AND task.recurring_meeting_occurrence_id IS NULL;

CREATE OR REPLACE FUNCTION public.prepare_recurring_meeting_department()
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
  NEW.name := trim(NEW.name);
  NEW.description := nullif(trim(coalesce(NEW.description, '')), '');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prepare_recurring_meeting_department ON public.recurring_meeting_departments;
CREATE TRIGGER trg_prepare_recurring_meeting_department
  BEFORE INSERT OR UPDATE ON public.recurring_meeting_departments
  FOR EACH ROW EXECUTE FUNCTION public.prepare_recurring_meeting_department();

CREATE OR REPLACE FUNCTION public.validate_recurring_meeting_department()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.department_id IS NOT NULL AND NOT EXISTS (
    SELECT 1
    FROM public.recurring_meeting_departments department
    WHERE department.id = NEW.department_id
      AND department.workspace_id = NEW.workspace_id
      AND department.is_active
  ) THEN
    RAISE EXCEPTION 'O departamento não pertence ao ambiente atual ou está inativo';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_validate_recurring_meeting_department ON public.recurring_meetings;
CREATE TRIGGER trg_validate_recurring_meeting_department
  BEFORE INSERT OR UPDATE OF department_id, workspace_id ON public.recurring_meetings
  FOR EACH ROW EXECUTE FUNCTION public.validate_recurring_meeting_department();

-- A materialização continua calculando reuniões, mas não cria uma tarefa genérica
-- para rotinas no novo modo. As pautas são criadas dentro de cada reunião.
CREATE OR REPLACE FUNCTION public.materialize_recurring_meetings(p_horizon_days integer DEFAULT 180)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recurring_meeting_record public.recurring_meetings%ROWTYPE;
  candidate date;
  generated_count integer := 0;
  inserted_count integer;
  occurrence_record record;
BEGIN
  p_horizon_days := greatest(30, least(coalesce(p_horizon_days, 180), 730));

  FOR recurring_meeting_record IN
    SELECT * FROM public.recurring_meetings recurring_meeting
    WHERE recurring_meeting.is_active
      AND (auth.uid() IS NULL OR recurring_meeting.workspace_id = public.current_workspace_id())
  LOOP
    FOR candidate IN
      SELECT day_value::date
      FROM generate_series(
        greatest(CURRENT_DATE, recurring_meeting_record.start_date)::timestamp,
        least(
          CURRENT_DATE + p_horizon_days,
          coalesce(recurring_meeting_record.end_date, CURRENT_DATE + p_horizon_days)
        )::timestamp,
        interval '1 day'
      ) day_value
    LOOP
      IF public.recurring_meeting_matches_date(recurring_meeting_record, candidate) THEN
        INSERT INTO public.recurring_meeting_occurrences (
          workspace_id, recurring_meeting_id, due_date, due_time
        ) VALUES (
          recurring_meeting_record.workspace_id,
          recurring_meeting_record.id,
          candidate,
          recurring_meeting_record.due_time
        )
        ON CONFLICT (recurring_meeting_id, due_date) DO NOTHING;
        GET DIAGNOSTICS inserted_count = ROW_COUNT;
        generated_count := generated_count + inserted_count;
      END IF;
    END LOOP;
  END LOOP;

  FOR occurrence_record IN
    SELECT occurrence.id
    FROM public.recurring_meeting_occurrences occurrence
    JOIN public.recurring_meetings recurring_meeting ON recurring_meeting.id = occurrence.recurring_meeting_id
    WHERE occurrence.task_id IS NULL
      AND occurrence.status = 'scheduled'
      AND recurring_meeting.is_active
      AND NOT recurring_meeting.meeting_mode
      AND occurrence.due_date - recurring_meeting.create_before_days <= CURRENT_DATE
      AND (auth.uid() IS NULL OR occurrence.workspace_id = public.current_workspace_id())
    ORDER BY occurrence.due_date
  LOOP
    PERFORM public.create_recurring_meeting_task(occurrence_record.id);
  END LOOP;

  RETURN generated_count;
END;
$$;

-- Toda tarefa criada como pauta abre a reunião. A reunião é concluída
-- automaticamente apenas quando possui pautas e todas elas estão concluídas.
CREATE OR REPLACE FUNCTION public.sync_recurring_meeting_from_task()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_occurrence uuid := coalesce(NEW.recurring_meeting_occurrence_id, OLD.recurring_meeting_occurrence_id);
  task_count integer;
  pending_count integer;
BEGIN
  IF target_occurrence IS NULL THEN RETURN NEW; END IF;

  SELECT count(*) FILTER (
    WHERE task.deleted_at IS NULL AND task.archived_at IS NULL
  ), count(*) FILTER (
    WHERE task.deleted_at IS NULL
      AND task.archived_at IS NULL
      AND NOT (
        task.completed_at IS NOT NULL
        OR task.status = 'done'::public.task_status
        OR EXISTS (
          SELECT 1 FROM public.task_statuses status
          WHERE status.id = task.status_id AND status.is_completed
        )
      )
  )
  INTO task_count, pending_count
  FROM public.tasks task
  WHERE task.recurring_meeting_occurrence_id = target_occurrence;

  UPDATE public.recurring_meeting_occurrences
  SET status = CASE
        WHEN task_count > 0 AND pending_count = 0 THEN 'completed'
        ELSE 'open'
      END,
      completed_at = CASE
        WHEN task_count > 0 AND pending_count = 0 THEN coalesce(completed_at, now())
        ELSE NULL
      END,
      completed_by = CASE
        WHEN task_count > 0 AND pending_count = 0 THEN coalesce(completed_by, auth.uid())
        ELSE NULL
      END
  WHERE id = target_occurrence AND status <> 'skipped';

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_recurring_meeting_from_task ON public.tasks;
CREATE TRIGGER trg_sync_recurring_meeting_from_task
  AFTER INSERT OR UPDATE OF status, status_id, completed_at, deleted_at, archived_at,
    recurring_meeting_occurrence_id
  ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.sync_recurring_meeting_from_task();

CREATE OR REPLACE FUNCTION public.complete_recurring_meeting_occurrence(target_occurrence_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE occurrence_record record; completed_status_id uuid;
BEGIN
  SELECT occurrence.*, recurring_meeting.meeting_mode
  INTO occurrence_record
  FROM public.recurring_meeting_occurrences occurrence
  JOIN public.recurring_meetings recurring_meeting ON recurring_meeting.id = occurrence.recurring_meeting_id
  WHERE occurrence.id = target_occurrence_id
  FOR UPDATE OF occurrence;

  IF NOT FOUND THEN RAISE EXCEPTION 'Ocorrência não encontrada'; END IF;
  IF NOT public.has_workspace_access(occurrence_record.workspace_id) THEN
    RAISE EXCEPTION 'Você não pode concluir esta ocorrência';
  END IF;

  IF occurrence_record.meeting_mode AND EXISTS (
    SELECT 1
    FROM public.tasks task
    WHERE task.recurring_meeting_occurrence_id = target_occurrence_id
      AND task.deleted_at IS NULL
      AND task.archived_at IS NULL
      AND NOT (
        task.completed_at IS NOT NULL
        OR task.status = 'done'::public.task_status
        OR EXISTS (
          SELECT 1 FROM public.task_statuses status
          WHERE status.id = task.status_id AND status.is_completed
        )
      )
  ) THEN
    RAISE EXCEPTION 'Conclua ou remova as pautas pendentes antes de encerrar a reunião';
  END IF;

  UPDATE public.recurring_meeting_occurrences
  SET status = 'completed', completed_at = coalesce(completed_at, now()), completed_by = auth.uid()
  WHERE id = target_occurrence_id;

  IF NOT occurrence_record.meeting_mode AND occurrence_record.task_id IS NOT NULL THEN
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

REVOKE ALL ON FUNCTION public.prepare_recurring_meeting_department() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.validate_recurring_meeting_department() FROM PUBLIC, anon, authenticated;

DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.recurring_meeting_departments;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
END;
$$;

NOTIFY pgrst, 'reload schema';
-- Pautas padrão das reuniões de departamento.
-- Cada reunião recorrente pode ter uma lista de tarefas que toda ocorrência recebe
-- automaticamente, sem precisar criá-las uma a uma em cada ocorrência.

CREATE TABLE IF NOT EXISTS public.recurring_meeting_agenda_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recurring_meeting_id uuid NOT NULL REFERENCES public.recurring_meetings(id) ON DELETE CASCADE,
  title text NOT NULL CHECK (char_length(trim(title)) > 0),
  description text,
  assignee_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  priority text CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  position integer NOT NULL DEFAULT 0,
  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS recurring_meeting_agenda_templates_recurring_meeting_idx
  ON public.recurring_meeting_agenda_templates (recurring_meeting_id, position);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.recurring_meeting_agenda_templates TO authenticated;
GRANT ALL ON public.recurring_meeting_agenda_templates TO service_role;

ALTER TABLE public.recurring_meeting_agenda_templates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS recurring_meeting_agenda_templates_workspace_access ON public.recurring_meeting_agenda_templates;
CREATE POLICY recurring_meeting_agenda_templates_workspace_access ON public.recurring_meeting_agenda_templates
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.recurring_meetings recurring_meeting
    WHERE recurring_meeting.id = recurring_meeting_id
      AND public.has_workspace_access(recurring_meeting.workspace_id)
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.recurring_meetings recurring_meeting
    WHERE recurring_meeting.id = recurring_meeting_id
      AND public.has_workspace_access(recurring_meeting.workspace_id)
  ));

DROP TRIGGER IF EXISTS trg_recurring_meeting_agenda_templates_updated_at ON public.recurring_meeting_agenda_templates;
CREATE TRIGGER trg_recurring_meeting_agenda_templates_updated_at
  BEFORE UPDATE ON public.recurring_meeting_agenda_templates
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.prepare_recurring_meeting_agenda_template()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' AND auth.uid() IS NOT NULL THEN NEW.created_by := auth.uid(); END IF;
  NEW.title := trim(NEW.title);
  NEW.description := nullif(trim(coalesce(NEW.description, '')), '');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prepare_recurring_meeting_agenda_template ON public.recurring_meeting_agenda_templates;
CREATE TRIGGER trg_prepare_recurring_meeting_agenda_template
  BEFORE INSERT OR UPDATE ON public.recurring_meeting_agenda_templates
  FOR EACH ROW EXECUTE FUNCTION public.prepare_recurring_meeting_agenda_template();

-- Liga a tarefa à pauta padrão que a originou. Remover a pauta padrão mantém
-- as tarefas já criadas nas reuniões.
ALTER TABLE public.tasks
  ADD COLUMN IF NOT EXISTS recurring_meeting_agenda_template_id uuid
    REFERENCES public.recurring_meeting_agenda_templates(id) ON DELETE SET NULL;

-- Uma pauta padrão gera no máximo uma tarefa por reunião, mesmo com execuções
-- simultâneas. Tarefas excluídas (lixeira) também contam: não são recriadas.
CREATE UNIQUE INDEX IF NOT EXISTS tasks_recurring_meeting_template_occurrence_idx
  ON public.tasks (recurring_meeting_occurrence_id, recurring_meeting_agenda_template_id)
  WHERE recurring_meeting_occurrence_id IS NOT NULL AND recurring_meeting_agenda_template_id IS NOT NULL;

CREATE OR REPLACE FUNCTION public.create_recurring_meeting_agenda_tasks(target_occurrence_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  occurrence_record record;
  recurring_meeting_record public.recurring_meetings%ROWTYPE;
  template_record record;
  selected_status_id uuid;
  selected_column_id uuid;
  next_position integer;
  created_count integer := 0;
  inserted_count integer;
BEGIN
  SELECT * INTO occurrence_record
  FROM public.recurring_meeting_occurrences
  WHERE id = target_occurrence_id
  FOR UPDATE;

  IF NOT FOUND THEN RAISE EXCEPTION 'Ocorrência não encontrada'; END IF;
  IF auth.uid() IS NOT NULL AND NOT public.has_workspace_access(occurrence_record.workspace_id) THEN
    RAISE EXCEPTION 'Você não pode criar tarefas neste ambiente';
  END IF;
  IF occurrence_record.status IN ('completed', 'skipped') THEN RETURN 0; END IF;

  SELECT * INTO recurring_meeting_record
  FROM public.recurring_meetings
  WHERE id = occurrence_record.recurring_meeting_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Reunião não encontrada'; END IF;

  -- Mesmas regras de create_recurring_meeting_task para status, coluna e prazo.
  selected_status_id := recurring_meeting_record.status_id;
  IF selected_status_id IS NULL THEN
    SELECT id INTO selected_status_id
    FROM public.task_statuses
    WHERE workspace_id = recurring_meeting_record.workspace_id AND NOT is_completed
    ORDER BY position, created_at
    LIMIT 1;
  END IF;

  selected_column_id := recurring_meeting_record.column_id;
  IF selected_column_id IS NULL THEN
    SELECT id INTO selected_column_id
    FROM public.kanban_columns
    WHERE workspace_id = recurring_meeting_record.workspace_id
    ORDER BY position, created_at
    LIMIT 1;
  END IF;

  SELECT coalesce(max(position), -1) + 1 INTO next_position
  FROM public.tasks
  WHERE workspace_id = recurring_meeting_record.workspace_id
    AND column_id IS NOT DISTINCT FROM selected_column_id
    AND deleted_at IS NULL;

  FOR template_record IN
    SELECT template.*
    FROM public.recurring_meeting_agenda_templates template
    WHERE template.recurring_meeting_id = recurring_meeting_record.id
      AND NOT EXISTS (
        SELECT 1 FROM public.tasks task
        WHERE task.recurring_meeting_occurrence_id = occurrence_record.id
          AND task.recurring_meeting_agenda_template_id = template.id
      )
    ORDER BY template.position, template.created_at
  LOOP
    INSERT INTO public.tasks (
      title, description, status, status_id, priority, due_date, due_time,
      assignee_id, client_id, column_id, position, created_by, workspace_id,
      recurring_meeting_occurrence_id, recurring_meeting_agenda_template_id
    ) VALUES (
      template_record.title,
      template_record.description,
      'todo'::public.task_status,
      selected_status_id,
      coalesce(template_record.priority, recurring_meeting_record.priority),
      (
        occurrence_record.due_date
        + coalesce(occurrence_record.due_time, time '12:00')
      ) AT TIME ZONE 'America/Sao_Paulo',
      occurrence_record.due_time,
      coalesce(template_record.assignee_id, recurring_meeting_record.assignee_id),
      recurring_meeting_record.client_id,
      selected_column_id,
      next_position,
      recurring_meeting_record.created_by,
      recurring_meeting_record.workspace_id,
      occurrence_record.id,
      template_record.id
    )
    ON CONFLICT (recurring_meeting_occurrence_id, recurring_meeting_agenda_template_id)
      WHERE recurring_meeting_occurrence_id IS NOT NULL AND recurring_meeting_agenda_template_id IS NOT NULL
      DO NOTHING;
    GET DIAGNOSTICS inserted_count = ROW_COUNT;
    created_count := created_count + inserted_count;
    next_position := next_position + inserted_count;
  END LOOP;

  RETURN created_count;
END;
$$;

REVOKE ALL ON FUNCTION public.create_recurring_meeting_agenda_tasks(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.create_recurring_meeting_agenda_tasks(uuid) TO authenticated, service_role;

-- Mesma geração de reuniões da migration anterior, acrescida das pautas padrão.
CREATE OR REPLACE FUNCTION public.materialize_recurring_meetings(p_horizon_days integer DEFAULT 180)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recurring_meeting_record public.recurring_meetings%ROWTYPE;
  candidate date;
  generated_count integer := 0;
  inserted_count integer;
  occurrence_record record;
  local_today date := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
BEGIN
  p_horizon_days := greatest(30, least(coalesce(p_horizon_days, 180), 730));

  FOR recurring_meeting_record IN
    SELECT * FROM public.recurring_meetings recurring_meeting
    WHERE recurring_meeting.is_active
      AND (auth.uid() IS NULL OR recurring_meeting.workspace_id = public.current_workspace_id())
  LOOP
    FOR candidate IN
      SELECT day_value::date
      FROM generate_series(
        greatest(CURRENT_DATE, recurring_meeting_record.start_date)::timestamp,
        least(
          CURRENT_DATE + p_horizon_days,
          coalesce(recurring_meeting_record.end_date, CURRENT_DATE + p_horizon_days)
        )::timestamp,
        interval '1 day'
      ) day_value
    LOOP
      IF public.recurring_meeting_matches_date(recurring_meeting_record, candidate) THEN
        INSERT INTO public.recurring_meeting_occurrences (
          workspace_id, recurring_meeting_id, due_date, due_time
        ) VALUES (
          recurring_meeting_record.workspace_id,
          recurring_meeting_record.id,
          candidate,
          recurring_meeting_record.due_time
        )
        ON CONFLICT (recurring_meeting_id, due_date) DO NOTHING;
        GET DIAGNOSTICS inserted_count = ROW_COUNT;
        generated_count := generated_count + inserted_count;
      END IF;
    END LOOP;
  END LOOP;

  FOR occurrence_record IN
    SELECT occurrence.id
    FROM public.recurring_meeting_occurrences occurrence
    JOIN public.recurring_meetings recurring_meeting ON recurring_meeting.id = occurrence.recurring_meeting_id
    WHERE occurrence.task_id IS NULL
      AND occurrence.status = 'scheduled'
      AND recurring_meeting.is_active
      AND NOT recurring_meeting.meeting_mode
      AND occurrence.due_date - recurring_meeting.create_before_days <= CURRENT_DATE
      AND (auth.uid() IS NULL OR occurrence.workspace_id = public.current_workspace_id())
    ORDER BY occurrence.due_date
  LOOP
    PERFORM public.create_recurring_meeting_task(occurrence_record.id);
  END LOOP;

  -- Reuniões recebem as pautas padrão quando entram na janela de antecedência.
  -- Só reuniões de hoje em diante: incluir uma pauta nova não altera o histórico.
  FOR occurrence_record IN
    SELECT occurrence.id
    FROM public.recurring_meeting_occurrences occurrence
    JOIN public.recurring_meetings recurring_meeting ON recurring_meeting.id = occurrence.recurring_meeting_id
    WHERE occurrence.status IN ('scheduled', 'open')
      AND recurring_meeting.is_active
      AND recurring_meeting.meeting_mode
      AND occurrence.due_date >= local_today
      AND occurrence.due_date - recurring_meeting.create_before_days <= local_today
      AND EXISTS (
        SELECT 1 FROM public.recurring_meeting_agenda_templates template
        WHERE template.recurring_meeting_id = recurring_meeting.id
      )
      AND (auth.uid() IS NULL OR occurrence.workspace_id = public.current_workspace_id())
    ORDER BY occurrence.due_date
  LOOP
    PERFORM public.create_recurring_meeting_agenda_tasks(occurrence_record.id);
  END LOOP;

  RETURN generated_count;
END;
$$;

NOTIFY pgrst, 'reload schema';
-- Corrige a criação das pautas padrão: a prioridade da pauta é texto e a da
-- tarefa é public.task_priority. O COALESCE sem conversão falhava e
-- interrompia materialize_recurring_meetings (tela de Reuniões).

CREATE OR REPLACE FUNCTION public.create_recurring_meeting_agenda_tasks(target_occurrence_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  occurrence_record record;
  recurring_meeting_record public.recurring_meetings%ROWTYPE;
  template_record record;
  selected_status_id uuid;
  selected_column_id uuid;
  next_position integer;
  created_count integer := 0;
  inserted_count integer;
BEGIN
  SELECT * INTO occurrence_record
  FROM public.recurring_meeting_occurrences
  WHERE id = target_occurrence_id
  FOR UPDATE;

  IF NOT FOUND THEN RAISE EXCEPTION 'Ocorrência não encontrada'; END IF;
  IF auth.uid() IS NOT NULL AND NOT public.has_workspace_access(occurrence_record.workspace_id) THEN
    RAISE EXCEPTION 'Você não pode criar tarefas neste ambiente';
  END IF;
  IF occurrence_record.status IN ('completed', 'skipped') THEN RETURN 0; END IF;

  SELECT * INTO recurring_meeting_record
  FROM public.recurring_meetings
  WHERE id = occurrence_record.recurring_meeting_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Reunião não encontrada'; END IF;

  -- Mesmas regras de create_recurring_meeting_task para status, coluna e prazo.
  selected_status_id := recurring_meeting_record.status_id;
  IF selected_status_id IS NULL THEN
    SELECT id INTO selected_status_id
    FROM public.task_statuses
    WHERE workspace_id = recurring_meeting_record.workspace_id AND NOT is_completed
    ORDER BY position, created_at
    LIMIT 1;
  END IF;

  selected_column_id := recurring_meeting_record.column_id;
  IF selected_column_id IS NULL THEN
    SELECT id INTO selected_column_id
    FROM public.kanban_columns
    WHERE workspace_id = recurring_meeting_record.workspace_id
    ORDER BY position, created_at
    LIMIT 1;
  END IF;

  SELECT coalesce(max(position), -1) + 1 INTO next_position
  FROM public.tasks
  WHERE workspace_id = recurring_meeting_record.workspace_id
    AND column_id IS NOT DISTINCT FROM selected_column_id
    AND deleted_at IS NULL;

  FOR template_record IN
    SELECT template.*
    FROM public.recurring_meeting_agenda_templates template
    WHERE template.recurring_meeting_id = recurring_meeting_record.id
      AND NOT EXISTS (
        SELECT 1 FROM public.tasks task
        WHERE task.recurring_meeting_occurrence_id = occurrence_record.id
          AND task.recurring_meeting_agenda_template_id = template.id
      )
    ORDER BY template.position, template.created_at
  LOOP
    INSERT INTO public.tasks (
      title, description, status, status_id, priority, due_date, due_time,
      assignee_id, client_id, column_id, position, created_by, workspace_id,
      recurring_meeting_occurrence_id, recurring_meeting_agenda_template_id
    ) VALUES (
      template_record.title,
      template_record.description,
      'todo'::public.task_status,
      selected_status_id,
      coalesce(template_record.priority::public.task_priority, recurring_meeting_record.priority),
      (
        occurrence_record.due_date
        + coalesce(occurrence_record.due_time, time '12:00')
      ) AT TIME ZONE 'America/Sao_Paulo',
      occurrence_record.due_time,
      coalesce(template_record.assignee_id, recurring_meeting_record.assignee_id),
      recurring_meeting_record.client_id,
      selected_column_id,
      next_position,
      recurring_meeting_record.created_by,
      recurring_meeting_record.workspace_id,
      occurrence_record.id,
      template_record.id
    )
    ON CONFLICT (recurring_meeting_occurrence_id, recurring_meeting_agenda_template_id)
      WHERE recurring_meeting_occurrence_id IS NOT NULL AND recurring_meeting_agenda_template_id IS NOT NULL
      DO NOTHING;
    GET DIAGNOSTICS inserted_count = ROW_COUNT;
    created_count := created_count + inserted_count;
    next_position := next_position + inserted_count;
  END LOOP;

  RETURN created_count;
END;
$$;

NOTIFY pgrst, 'reload schema';
-- Reuniões recorrentes com pauta por reunião (decisão de 25/09/2026).
-- Cada reunião recebe uma cópia da pauta padrão (respeitando a periodicidade
-- de cada item) e cada item recebe um resultado: "Concluído" ou "Gerar
-- tarefa". Os participantes são avisados antes da reunião (sininho + pop-up).
-- Substitui o modelo em que toda pauta virava tarefa automaticamente.

-- 1. Membros dos departamentos -------------------------------------------------
CREATE TABLE IF NOT EXISTS public.recurring_meeting_department_members (
  department_id uuid NOT NULL REFERENCES public.recurring_meeting_departments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (department_id, user_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.recurring_meeting_department_members TO authenticated;
GRANT ALL ON public.recurring_meeting_department_members TO service_role;
ALTER TABLE public.recurring_meeting_department_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS recurring_meeting_department_members_access ON public.recurring_meeting_department_members;
CREATE POLICY recurring_meeting_department_members_access ON public.recurring_meeting_department_members
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.recurring_meeting_departments department
    WHERE department.id = department_id
      AND public.has_workspace_access(department.workspace_id)
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.recurring_meeting_departments department
    WHERE department.id = department_id
      AND public.has_workspace_access(department.workspace_id)
  ));

CREATE OR REPLACE FUNCTION public.validate_recurring_meeting_department_member()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM public.recurring_meeting_departments department
    JOIN public.workspace_memberships membership
      ON membership.workspace_id = department.workspace_id
     AND membership.user_id = NEW.user_id
    WHERE department.id = NEW.department_id
      AND public.has_workspace_access(department.workspace_id)
  ) THEN
    RAISE EXCEPTION 'O membro precisa pertencer ao ambiente do departamento';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validate_recurring_meeting_department_member
  BEFORE INSERT OR UPDATE ON public.recurring_meeting_department_members
  FOR EACH ROW EXECUTE FUNCTION public.validate_recurring_meeting_department_member();

-- 2. Participantes de cada reunião recorrente ------------------------------------
CREATE TABLE IF NOT EXISTS public.recurring_meeting_participants (
  recurring_meeting_id uuid NOT NULL REFERENCES public.recurring_meetings(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (recurring_meeting_id, user_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.recurring_meeting_participants TO authenticated;
GRANT ALL ON public.recurring_meeting_participants TO service_role;
ALTER TABLE public.recurring_meeting_participants ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS recurring_meeting_participants_access ON public.recurring_meeting_participants;
CREATE POLICY recurring_meeting_participants_access ON public.recurring_meeting_participants
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.recurring_meetings recurring_meeting
    WHERE recurring_meeting.id = recurring_meeting_id
      AND public.has_workspace_access(recurring_meeting.workspace_id)
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.recurring_meetings recurring_meeting
    WHERE recurring_meeting.id = recurring_meeting_id
      AND public.has_workspace_access(recurring_meeting.workspace_id)
  ));

CREATE OR REPLACE FUNCTION public.validate_recurring_meeting_participant()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM public.recurring_meetings meeting
    JOIN public.workspace_memberships membership
      ON membership.workspace_id = meeting.workspace_id
     AND membership.user_id = NEW.user_id
    WHERE meeting.id = NEW.recurring_meeting_id
      AND public.has_workspace_access(meeting.workspace_id)
  ) THEN
    RAISE EXCEPTION 'O participante precisa pertencer ao ambiente da reunião';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validate_recurring_meeting_participant
  BEFORE INSERT OR UPDATE ON public.recurring_meeting_participants
  FOR EACH ROW EXECUTE FUNCTION public.validate_recurring_meeting_participant();

REVOKE ALL ON FUNCTION public.validate_recurring_meeting_department_member()
  FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.validate_recurring_meeting_participant()
  FROM PUBLIC, anon, authenticated;

-- 3. Configurações novas ----------------------------------------------------------
ALTER TABLE public.recurring_meetings
  ADD COLUMN IF NOT EXISTS reminder_days_before integer NOT NULL DEFAULT 2
    CHECK (reminder_days_before BETWEEN 0 AND 30);

-- Periodicidade de cada item da pauta padrão dentro das reuniões.
ALTER TABLE public.recurring_meeting_agenda_templates
  ADD COLUMN IF NOT EXISTS cadence text NOT NULL DEFAULT 'every'
    CHECK (cadence IN ('every', 'biweekly', 'first_of_month', 'last_of_month', 'until_day')),
  ADD COLUMN IF NOT EXISTS cadence_day smallint CHECK (cadence_day BETWEEN 1 AND 31);

ALTER TABLE public.recurring_meeting_agenda_templates
  DROP CONSTRAINT IF EXISTS recurring_meeting_agenda_templates_until_day_check;
ALTER TABLE public.recurring_meeting_agenda_templates
  ADD CONSTRAINT recurring_meeting_agenda_templates_until_day_check
    CHECK (cadence <> 'until_day' OR cadence_day IS NOT NULL);

-- agenda_prepared_at: a pauta da reunião foi copiada (a partir daí não segue
-- mais a pauta padrão). reminded_at: os participantes já foram avisados.
ALTER TABLE public.recurring_meeting_occurrences
  ADD COLUMN IF NOT EXISTS agenda_prepared_at timestamptz,
  ADD COLUMN IF NOT EXISTS reminded_at timestamptz,
  ADD COLUMN IF NOT EXISTS rescheduled_at timestamptz;

-- 4. Itens da pauta de cada reunião ------------------------------------------------
CREATE TABLE IF NOT EXISTS public.recurring_meeting_agenda_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  occurrence_id uuid NOT NULL REFERENCES public.recurring_meeting_occurrences(id) ON DELETE CASCADE,
  template_id uuid REFERENCES public.recurring_meeting_agenda_templates(id) ON DELETE SET NULL,
  title text NOT NULL CHECK (char_length(trim(title)) > 0),
  position integer NOT NULL DEFAULT 0,
  result text CHECK (result IN ('done', 'task')),
  resolved_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  resolved_at timestamptz,
  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS recurring_meeting_agenda_items_occurrence_idx
  ON public.recurring_meeting_agenda_items (occurrence_id, position);
CREATE UNIQUE INDEX IF NOT EXISTS recurring_meeting_agenda_items_template_idx
  ON public.recurring_meeting_agenda_items (occurrence_id, template_id)
  WHERE template_id IS NOT NULL;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.recurring_meeting_agenda_items TO authenticated;
GRANT ALL ON public.recurring_meeting_agenda_items TO service_role;
ALTER TABLE public.recurring_meeting_agenda_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS recurring_meeting_agenda_items_access ON public.recurring_meeting_agenda_items;
CREATE POLICY recurring_meeting_agenda_items_access ON public.recurring_meeting_agenda_items
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.recurring_meeting_occurrences occurrence
    WHERE occurrence.id = occurrence_id
      AND public.has_workspace_access(occurrence.workspace_id)
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.recurring_meeting_occurrences occurrence
    WHERE occurrence.id = occurrence_id
      AND public.has_workspace_access(occurrence.workspace_id)
  ));

DROP TRIGGER IF EXISTS trg_recurring_meeting_agenda_items_updated_at ON public.recurring_meeting_agenda_items;
CREATE TRIGGER trg_recurring_meeting_agenda_items_updated_at
  BEFORE UPDATE ON public.recurring_meeting_agenda_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.prepare_recurring_meeting_agenda_item()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' AND auth.uid() IS NOT NULL THEN NEW.created_by := auth.uid(); END IF;
  NEW.title := trim(NEW.title);
  IF NEW.result IS NULL THEN
    NEW.resolved_by := NULL;
    NEW.resolved_at := NULL;
  ELSIF TG_OP = 'INSERT' OR NEW.result IS DISTINCT FROM OLD.result THEN
    NEW.resolved_by := coalesce(auth.uid(), NEW.resolved_by);
    NEW.resolved_at := now();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prepare_recurring_meeting_agenda_item ON public.recurring_meeting_agenda_items;
CREATE TRIGGER trg_prepare_recurring_meeting_agenda_item
  BEFORE INSERT OR UPDATE ON public.recurring_meeting_agenda_items
  FOR EACH ROW EXECUTE FUNCTION public.prepare_recurring_meeting_agenda_item();

-- Tarefas criadas a partir de um item (um item pode gerar várias).
ALTER TABLE public.tasks
  ADD COLUMN IF NOT EXISTS recurring_meeting_agenda_item_id uuid
    REFERENCES public.recurring_meeting_agenda_items(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS tasks_recurring_meeting_agenda_item_idx
  ON public.tasks (recurring_meeting_agenda_item_id)
  WHERE recurring_meeting_agenda_item_id IS NOT NULL;

-- Criar uma tarefa pelo item já marca o resultado como "Gerar tarefa".
CREATE OR REPLACE FUNCTION public.mark_recurring_meeting_agenda_item_with_task()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.recurring_meeting_agenda_item_id IS NOT NULL THEN
    UPDATE public.recurring_meeting_agenda_items
    SET result = 'task'
    WHERE id = NEW.recurring_meeting_agenda_item_id
      AND result IS DISTINCT FROM 'task';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_mark_recurring_meeting_agenda_item_with_task ON public.tasks;
CREATE TRIGGER trg_mark_recurring_meeting_agenda_item_with_task
  AFTER INSERT OR UPDATE OF recurring_meeting_agenda_item_id ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.mark_recurring_meeting_agenda_item_with_task();

-- Avisos de reunião apontam para a reunião.
ALTER TABLE public.notifications
  ADD COLUMN IF NOT EXISTS recurring_meeting_occurrence_id uuid
    REFERENCES public.recurring_meeting_occurrences(id) ON DELETE CASCADE;
CREATE UNIQUE INDEX IF NOT EXISTS notifications_recurring_meeting_recipient_idx
  ON public.notifications (user_id, recurring_meeting_occurrence_id, type)
  WHERE recurring_meeting_occurrence_id IS NOT NULL;

-- 5. Qual item da pauta padrão entra em cada reunião --------------------------------
CREATE OR REPLACE FUNCTION public.recurring_meeting_agenda_template_applies(
  recurring_meeting public.recurring_meetings,
  template public.recurring_meeting_agenda_templates,
  meeting_date date
)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
DECLARE
  month_start date := date_trunc('month', meeting_date)::date;
  month_end date := (date_trunc('month', meeting_date) + interval '1 month - 1 day')::date;
  limit_date date;
BEGIN
  IF template.cadence = 'every' THEN RETURN true; END IF;

  IF template.cadence = 'biweekly' THEN
    RETURN mod(
      (date_trunc('week', meeting_date)::date - date_trunc('week', recurring_meeting.start_date)::date) / 7,
      2
    ) = 0;
  END IF;

  IF template.cadence = 'first_of_month' THEN
    RETURN NOT EXISTS (
      SELECT 1 FROM generate_series(month_start, meeting_date - 1, interval '1 day') day_value
      WHERE public.recurring_meeting_matches_date(recurring_meeting, day_value::date)
    );
  END IF;

  IF template.cadence = 'last_of_month' THEN
    RETURN NOT EXISTS (
      SELECT 1 FROM generate_series(meeting_date + 1, month_end, interval '1 day') day_value
      WHERE public.recurring_meeting_matches_date(recurring_meeting, day_value::date)
    );
  END IF;

  -- until_day: a última reunião que acontece até o dia X do mês.
  limit_date := make_date(
    extract(year FROM meeting_date)::integer,
    extract(month FROM meeting_date)::integer,
    least(template.cadence_day, extract(day FROM month_end)::integer)
  );
  RETURN meeting_date <= limit_date AND NOT EXISTS (
    SELECT 1 FROM generate_series(meeting_date + 1, limit_date, interval '1 day') day_value
    WHERE public.recurring_meeting_matches_date(recurring_meeting, day_value::date)
  );
END;
$$;

-- Pauta que a reunião terá, calculada a partir da pauta padrão (antes de ser copiada).
CREATE OR REPLACE FUNCTION public.recurring_meeting_agenda_preview(target_occurrence_id uuid)
RETURNS TABLE (template_id uuid, title text, "position" integer)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  occurrence_record public.recurring_meeting_occurrences%ROWTYPE;
  recurring_meeting_record public.recurring_meetings%ROWTYPE;
BEGIN
  SELECT * INTO occurrence_record FROM public.recurring_meeting_occurrences WHERE id = target_occurrence_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Reunião não encontrada'; END IF;
  IF auth.uid() IS NOT NULL AND NOT public.has_workspace_access(occurrence_record.workspace_id) THEN
    RAISE EXCEPTION 'Você não pode acessar esta reunião';
  END IF;
  SELECT * INTO recurring_meeting_record FROM public.recurring_meetings WHERE id = occurrence_record.recurring_meeting_id;

  RETURN QUERY
  SELECT template.id, template.title, (row_number() OVER (
    ORDER BY template.position, template.created_at
  ) - 1)::integer
  FROM public.recurring_meeting_agenda_templates template
  WHERE template.recurring_meeting_id = recurring_meeting_record.id
    AND public.recurring_meeting_agenda_template_applies(recurring_meeting_record, template, occurrence_record.due_date)
  ORDER BY template.position, template.created_at;
END;
$$;

-- Copia a pauta padrão para a reunião. Depois disso a reunião tem pauta própria.
CREATE OR REPLACE FUNCTION public.prepare_recurring_meeting_agenda(target_occurrence_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  occurrence_record public.recurring_meeting_occurrences%ROWTYPE;
  inserted_count integer;
BEGIN
  SELECT * INTO occurrence_record
  FROM public.recurring_meeting_occurrences
  WHERE id = target_occurrence_id
  FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Reunião não encontrada'; END IF;
  IF auth.uid() IS NOT NULL AND NOT public.has_workspace_access(occurrence_record.workspace_id) THEN
    RAISE EXCEPTION 'Você não pode alterar esta reunião';
  END IF;
  IF occurrence_record.agenda_prepared_at IS NOT NULL THEN RETURN 0; END IF;

  INSERT INTO public.recurring_meeting_agenda_items (occurrence_id, template_id, title, position)
  SELECT target_occurrence_id, preview.template_id, preview.title, preview.position
  FROM public.recurring_meeting_agenda_preview(target_occurrence_id) preview
  ON CONFLICT (occurrence_id, template_id) WHERE template_id IS NOT NULL DO NOTHING;
  GET DIAGNOSTICS inserted_count = ROW_COUNT;

  UPDATE public.recurring_meeting_occurrences
  SET agenda_prepared_at = now()
  WHERE id = target_occurrence_id;
  RETURN inserted_count;
END;
$$;

-- 6. Geração das reuniões: volta a versão de 23/09 (sem criar tarefas pelas pautas).
CREATE OR REPLACE FUNCTION public.materialize_recurring_meetings(p_horizon_days integer DEFAULT 180)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recurring_meeting_record public.recurring_meetings%ROWTYPE;
  candidate date;
  generated_count integer := 0;
  inserted_count integer;
  occurrence_record record;
  local_today date := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
BEGIN
  p_horizon_days := greatest(30, least(coalesce(p_horizon_days, 180), 730));

  FOR recurring_meeting_record IN
    SELECT * FROM public.recurring_meetings recurring_meeting
    WHERE recurring_meeting.is_active
      AND (auth.uid() IS NULL OR recurring_meeting.workspace_id = public.current_workspace_id())
  LOOP
    FOR candidate IN
      SELECT day_value::date
      FROM generate_series(
        greatest(local_today, recurring_meeting_record.start_date)::timestamp,
        least(
          local_today + p_horizon_days,
          coalesce(recurring_meeting_record.end_date, local_today + p_horizon_days)
        )::timestamp,
        interval '1 day'
      ) day_value
    LOOP
      IF public.recurring_meeting_matches_date(recurring_meeting_record, candidate) THEN
        INSERT INTO public.recurring_meeting_occurrences (
          workspace_id, recurring_meeting_id, due_date, due_time
        ) VALUES (
          recurring_meeting_record.workspace_id,
          recurring_meeting_record.id,
          candidate,
          recurring_meeting_record.due_time
        )
        ON CONFLICT (recurring_meeting_id, due_date) DO NOTHING;
        GET DIAGNOSTICS inserted_count = ROW_COUNT;
        generated_count := generated_count + inserted_count;
      END IF;
    END LOOP;
  END LOOP;

  FOR occurrence_record IN
    SELECT occurrence.id
    FROM public.recurring_meeting_occurrences occurrence
    JOIN public.recurring_meetings recurring_meeting ON recurring_meeting.id = occurrence.recurring_meeting_id
    WHERE occurrence.task_id IS NULL
      AND occurrence.status = 'scheduled'
      AND recurring_meeting.is_active
      AND NOT recurring_meeting.meeting_mode
      AND occurrence.due_date - recurring_meeting.create_before_days <= local_today
      AND (auth.uid() IS NULL OR occurrence.workspace_id = public.current_workspace_id())
    ORDER BY occurrence.due_date
  LOOP
    PERFORM public.create_recurring_meeting_task(occurrence_record.id);
  END LOOP;

  RETURN generated_count;
END;
$$;

-- Reuniões com pauta já copiada ou editada não são descartadas ao editar a recorrência.
CREATE OR REPLACE FUNCTION public.refresh_recurring_meeting(target_recurring_meeting_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE target_workspace uuid;
BEGIN
  SELECT workspace_id INTO target_workspace FROM public.recurring_meetings WHERE id = target_recurring_meeting_id;
  IF target_workspace IS NULL THEN RAISE EXCEPTION 'Reunião não encontrada'; END IF;
  IF auth.uid() IS NOT NULL AND NOT public.has_workspace_access(target_workspace) THEN
    RAISE EXCEPTION 'Você não pode atualizar esta reunião';
  END IF;

  DELETE FROM public.recurring_meeting_occurrences
  WHERE recurring_meeting_id = target_recurring_meeting_id
    AND task_id IS NULL
    AND status = 'scheduled'
    AND agenda_prepared_at IS NULL
    AND rescheduled_at IS NULL
    AND due_date >= (now() AT TIME ZONE 'America/Sao_Paulo')::date;

  RETURN public.run_recurring_meeting_cycle();
END;
$$;

-- 7. Rotina diária: gera reuniões, copia pautas e avisa os participantes ------------
CREATE OR REPLACE FUNCTION public.run_recurring_meeting_cycle()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  local_today date := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  meeting record;
  reminded_count integer := 0;
BEGIN
  PERFORM public.materialize_recurring_meetings(180);

  FOR meeting IN
    SELECT occurrence.id, occurrence.due_date, occurrence.reminded_at,
           recurring_meeting.id AS recurring_meeting_id, recurring_meeting.title, recurring_meeting.assignee_id
    FROM public.recurring_meeting_occurrences occurrence
    JOIN public.recurring_meetings recurring_meeting ON recurring_meeting.id = occurrence.recurring_meeting_id
    WHERE occurrence.status IN ('scheduled', 'open')
      AND recurring_meeting.is_active
      AND recurring_meeting.meeting_mode
      AND occurrence.due_date >= local_today
      AND occurrence.due_date - recurring_meeting.reminder_days_before <= local_today
      AND (auth.uid() IS NULL OR occurrence.workspace_id = public.current_workspace_id())
    ORDER BY occurrence.due_date
  LOOP
    PERFORM public.prepare_recurring_meeting_agenda(meeting.id);

    IF meeting.reminded_at IS NULL THEN
      INSERT INTO public.notifications (user_id, type, title, body, recurring_meeting_occurrence_id)
      SELECT recipient.user_id,
             'recurring_meeting_reminder',
             'Reunião em ' || to_char(meeting.due_date, 'DD/MM') || ': ' || meeting.title,
             'Revise a pauta e inclua novos assuntos antes da reunião.',
             meeting.id
      FROM (
        SELECT participant.user_id
        FROM public.recurring_meeting_participants participant
        WHERE participant.recurring_meeting_id = meeting.recurring_meeting_id
        UNION
        SELECT meeting.assignee_id WHERE meeting.assignee_id IS NOT NULL
      ) recipient
      ON CONFLICT (user_id, recurring_meeting_occurrence_id, type)
        WHERE recurring_meeting_occurrence_id IS NOT NULL
        DO NOTHING;

      UPDATE public.recurring_meeting_occurrences SET reminded_at = now() WHERE id = meeting.id;
      reminded_count := reminded_count + 1;
    END IF;
  END LOOP;

  RETURN reminded_count;
END;
$$;

-- 8. Encerrar exige resultado em todos os itens (as tarefas seguem à parte) ---------
CREATE OR REPLACE FUNCTION public.complete_recurring_meeting_occurrence(target_occurrence_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE occurrence_record record; completed_status_id uuid;
BEGIN
  SELECT occurrence.*, recurring_meeting.meeting_mode
  INTO occurrence_record
  FROM public.recurring_meeting_occurrences occurrence
  JOIN public.recurring_meetings recurring_meeting ON recurring_meeting.id = occurrence.recurring_meeting_id
  WHERE occurrence.id = target_occurrence_id
  FOR UPDATE OF occurrence;

  IF NOT FOUND THEN RAISE EXCEPTION 'Ocorrência não encontrada'; END IF;
  IF NOT public.has_workspace_access(occurrence_record.workspace_id) THEN
    RAISE EXCEPTION 'Você não pode concluir esta ocorrência';
  END IF;

  IF occurrence_record.meeting_mode THEN
    PERFORM public.prepare_recurring_meeting_agenda(target_occurrence_id);
    IF EXISTS (
      SELECT 1 FROM public.recurring_meeting_agenda_items item
      WHERE item.occurrence_id = target_occurrence_id AND item.result IS NULL
    ) THEN
      RAISE EXCEPTION 'Defina o resultado de todos os itens da pauta antes de encerrar a reunião';
    END IF;
  END IF;

  UPDATE public.recurring_meeting_occurrences
  SET status = 'completed', completed_at = coalesce(completed_at, now()), completed_by = auth.uid()
  WHERE id = target_occurrence_id;

  IF NOT occurrence_record.meeting_mode AND occurrence_record.task_id IS NOT NULL THEN
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

REVOKE ALL ON FUNCTION public.recurring_meeting_agenda_preview(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.recurring_meeting_agenda_preview(uuid) TO authenticated, service_role;
REVOKE ALL ON FUNCTION public.prepare_recurring_meeting_agenda(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.prepare_recurring_meeting_agenda(uuid) TO authenticated, service_role;
REVOKE ALL ON FUNCTION public.run_recurring_meeting_cycle() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.run_recurring_meeting_cycle() TO authenticated, service_role;
REVOKE ALL ON FUNCTION public.prepare_recurring_meeting_agenda_item() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.mark_recurring_meeting_agenda_item_with_task() FROM PUBLIC, anon, authenticated;

-- Atualização ao vivo da tela de Reuniões.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime')
     AND NOT EXISTS (
       SELECT 1 FROM pg_publication_tables
       WHERE pubname = 'supabase_realtime' AND schemaname = 'public'
         AND tablename = 'recurring_meeting_agenda_items'
     ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.recurring_meeting_agenda_items;
  END IF;
END $$;

-- 10. Agendamento diário às 07:00 de Brasília (10:00 UTC) ------------------------------
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
GRANT USAGE ON SCHEMA cron TO postgres;

SELECT cron.unschedule(jobid) FROM cron.job WHERE jobname = 'taskflow-recurring_meeting-cycle';
SELECT cron.schedule(
  'taskflow-recurring_meeting-cycle',
  '0 10 * * *',
  'SELECT public.run_recurring_meeting_cycle()'
);

SELECT public.run_recurring_meeting_cycle();

NOTIFY pgrst, 'reload schema';
