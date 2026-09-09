-- Encerrar um cliente nao apaga seu historico. As tarefas saem das telas
-- operacionais e continuam disponiveis no cadastro do cliente.
ALTER TABLE public.tasks
  ADD COLUMN IF NOT EXISTS archived_at timestamptz,
  ADD COLUMN IF NOT EXISTS archived_reason text;

ALTER TABLE public.tasks
  DROP CONSTRAINT IF EXISTS tasks_archived_reason_check;
ALTER TABLE public.tasks
  ADD CONSTRAINT tasks_archived_reason_check
  CHECK (archived_reason IS NULL OR archived_reason IN ('client_inactive', 'manual'));

CREATE INDEX IF NOT EXISTS tasks_client_archived_idx
  ON public.tasks (client_id, archived_at DESC)
  WHERE archived_at IS NOT NULL AND deleted_at IS NULL;

-- Aplica a mesma regra aos clientes que ja estavam inativos antes desta
-- migration, sem tocar nas tarefas que ja estavam na lixeira.
UPDATE public.tasks task
SET archived_at = now(), archived_reason = 'client_inactive'
FROM public.clients client
WHERE task.client_id = client.id
  AND client.is_active = false
  AND task.archived_at IS NULL
  AND task.deleted_at IS NULL;

UPDATE public.obligations obligation
SET is_active = false
FROM public.clients client
WHERE obligation.client_id = client.id
  AND client.is_active = false
  AND obligation.is_active = true;

CREATE OR REPLACE FUNCTION public.archive_inactive_client_operations()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.is_active IS DISTINCT FROM false AND NEW.is_active = false THEN
    UPDATE public.tasks
    SET archived_at = now(), archived_reason = 'client_inactive'
    WHERE client_id = NEW.id
      AND archived_at IS NULL
      AND deleted_at IS NULL;

    -- Sem essa pausa, o materializador continuaria criando tarefas para um
    -- cliente cuja operacao ja foi encerrada.
    UPDATE public.obligations
    SET is_active = false
    WHERE client_id = NEW.id
      AND is_active = true;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_archive_inactive_client_operations ON public.clients;
CREATE TRIGGER trg_archive_inactive_client_operations
  AFTER UPDATE OF is_active ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.archive_inactive_client_operations();

-- Bloqueio no banco para que atalhos, importacoes ou clientes antigos da
-- aplicacao nao consigam criar trabalho novo para um cliente inativo.
CREATE OR REPLACE FUNCTION public.prevent_inactive_client_task_assignment()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.client_id IS NULL OR NEW.archived_at IS NOT NULL THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE'
     AND NEW.client_id IS NOT DISTINCT FROM OLD.client_id
     AND OLD.archived_at IS NULL THEN
    RETURN NEW;
  END IF;

  IF EXISTS (
       SELECT 1 FROM public.clients client
       WHERE client.id = NEW.client_id AND client.is_active = false
     ) THEN
    RAISE EXCEPTION 'Nao e possivel vincular uma tarefa ativa a um cliente inativo';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_zz_prevent_inactive_client_task_assignment ON public.tasks;
CREATE TRIGGER trg_zz_prevent_inactive_client_task_assignment
  BEFORE INSERT OR UPDATE OF client_id, archived_at ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.prevent_inactive_client_task_assignment();

CREATE OR REPLACE FUNCTION public.prevent_inactive_client_obligation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.client_id IS NULL OR NEW.is_active = false THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE'
     AND NEW.client_id IS NOT DISTINCT FROM OLD.client_id
     AND OLD.is_active = true THEN
    RETURN NEW;
  END IF;

  IF EXISTS (
       SELECT 1 FROM public.clients client
       WHERE client.id = NEW.client_id AND client.is_active = false
     ) THEN
    RAISE EXCEPTION 'Nao e possivel ativar uma obrigacao para um cliente inativo';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_inactive_client_obligation ON public.obligations;
CREATE TRIGGER trg_prevent_inactive_client_obligation
  BEFORE INSERT OR UPDATE OF client_id, is_active ON public.obligations
  FOR EACH ROW EXECUTE FUNCTION public.prevent_inactive_client_obligation();

CREATE OR REPLACE FUNCTION public.prevent_inactive_client_service_request()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.client_id IS NULL THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' AND NEW.client_id IS NOT DISTINCT FROM OLD.client_id THEN
    RETURN NEW;
  END IF;

  IF EXISTS (
       SELECT 1 FROM public.clients client
       WHERE client.id = NEW.client_id AND client.is_active = false
     ) THEN
    RAISE EXCEPTION 'Nao e possivel vincular uma solicitacao a um cliente inativo';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_inactive_client_service_request ON public.service_requests;
CREATE TRIGGER trg_prevent_inactive_client_service_request
  BEFORE INSERT OR UPDATE OF client_id ON public.service_requests
  FOR EACH ROW EXECUTE FUNCTION public.prevent_inactive_client_service_request();

NOTIFY pgrst, 'reload schema';
