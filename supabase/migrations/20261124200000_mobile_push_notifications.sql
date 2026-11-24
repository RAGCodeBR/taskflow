-- Notificações push no celular (app instalado na Tela de Início / Dock).
-- 1. Assinaturas Web Push por aparelho.
-- 2. Aviso diário "Vence hoje / Vence amanhã" (type = 'due_soon').
-- 3. Disparo da Edge Function send-push para 'assignment' e 'due_soon'.
-- O disparo só acontece depois que os segredos `push_function_url` e
-- `cron_secret` forem criados no Vault; sem eles, nada muda.

SET LOCAL lock_timeout = '3s';

-- 1. Assinaturas -----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint text NOT NULL UNIQUE,
  p256dh text NOT NULL,
  auth text NOT NULL,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_used_at timestamptz
);

CREATE INDEX IF NOT EXISTS push_subscriptions_user_idx ON public.push_subscriptions(user_id);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.push_subscriptions TO authenticated;
GRANT ALL ON public.push_subscriptions TO service_role;

DROP POLICY IF EXISTS push_subscriptions_own_select ON public.push_subscriptions;
CREATE POLICY push_subscriptions_own_select ON public.push_subscriptions
  FOR SELECT TO authenticated USING (user_id = auth.uid());
DROP POLICY IF EXISTS push_subscriptions_own_insert ON public.push_subscriptions;
CREATE POLICY push_subscriptions_own_insert ON public.push_subscriptions
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS push_subscriptions_own_update ON public.push_subscriptions;
CREATE POLICY push_subscriptions_own_update ON public.push_subscriptions
  FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS push_subscriptions_own_delete ON public.push_subscriptions;
CREATE POLICY push_subscriptions_own_delete ON public.push_subscriptions
  FOR DELETE TO authenticated USING (user_id = auth.uid());

-- O mesmo aparelho pode trocar de usuário (logout/login). O upsert por
-- endpoint precisa poder reatribuir a linha sem violar o RLS de outro dono.
CREATE OR REPLACE FUNCTION public.save_push_subscription(
  p_endpoint text, p_p256dh text, p_auth text, p_user_agent text
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  INSERT INTO public.push_subscriptions (user_id, endpoint, p256dh, auth, user_agent)
  VALUES (auth.uid(), p_endpoint, p_p256dh, p_auth, p_user_agent)
  ON CONFLICT (endpoint) DO UPDATE
    SET user_id = EXCLUDED.user_id, p256dh = EXCLUDED.p256dh, auth = EXCLUDED.auth,
        user_agent = EXCLUDED.user_agent, created_at = now();
END; $$;
REVOKE ALL ON FUNCTION public.save_push_subscription(text, text, text, text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.save_push_subscription(text, text, text, text) TO authenticated;

-- 2. Aviso de prazo ----------------------------------------------------------------
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS notify_day date;

CREATE UNIQUE INDEX IF NOT EXISTS notifications_due_soon_once_per_day
  ON public.notifications (user_id, task_id, type, notify_day)
  WHERE type = 'due_soon';

CREATE OR REPLACE FUNCTION public.notify_due_soon_tasks()
RETURNS integer
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  today date := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  inserted integer;
BEGIN
  WITH due AS (
    SELECT t.id, t.title, t.assignee_id,
           (t.due_date AT TIME ZONE 'America/Sao_Paulo')::date AS due_day
    FROM public.tasks t
    LEFT JOIN public.task_statuses s ON s.id = t.status_id
    WHERE t.due_date IS NOT NULL
      AND (t.due_date AT TIME ZONE 'America/Sao_Paulo')::date IN (today, today + 1)
      AND t.completed_at IS NULL
      AND COALESCE(t.status::text, '') <> 'done'
      AND COALESCE(s.is_completed, false) = false
      AND t.deleted_at IS NULL
      AND t.archived_at IS NULL
      AND COALESCE(t.is_draft, false) = false
  ), recipients AS (
    SELECT id, title, due_day, assignee_id AS user_id FROM due WHERE assignee_id IS NOT NULL
    UNION
    SELECT due.id, due.title, due.due_day, c.collaborator_id
    FROM due JOIN public.task_collaborators c ON c.task_id = due.id
  ), ins AS (
    INSERT INTO public.notifications (user_id, task_id, type, title, body, notify_day)
    SELECT r.user_id, r.id, 'due_soon',
           CASE WHEN r.due_day = today THEN 'Vence hoje' ELSE U&'Vence amanh\00E3' END,
           r.title, today
    FROM recipients r
    -- Aviso de prazo é do celular: só para quem ativou o push em algum aparelho.
    WHERE EXISTS (SELECT 1 FROM public.push_subscriptions p WHERE p.user_id = r.user_id)
    ON CONFLICT (user_id, task_id, type, notify_day) WHERE type = 'due_soon' DO NOTHING
    RETURNING 1
  )
  SELECT count(*) INTO inserted FROM ins;
  RETURN inserted;
END; $$;
REVOKE ALL ON FUNCTION public.notify_due_soon_tasks() FROM public, anon, authenticated;

CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
SELECT cron.unschedule(jobid) FROM cron.job WHERE jobname = 'taskflow-due-soon';
-- 08:00 em Brasília (11:00 UTC).
SELECT cron.schedule('taskflow-due-soon', '0 11 * * *', 'SELECT public.notify_due_soon_tasks()');

-- 3. Disparo do push ---------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE OR REPLACE FUNCTION public.dispatch_push_notification()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  function_url text;
  secret text;
BEGIN
  -- Sem assinatura, não há o que enviar: evita chamadas desnecessárias.
  IF NOT EXISTS (SELECT 1 FROM public.push_subscriptions WHERE user_id = NEW.user_id) THEN
    RETURN NEW;
  END IF;
  SELECT decrypted_secret INTO function_url FROM vault.decrypted_secrets WHERE name = 'push_function_url';
  SELECT decrypted_secret INTO secret FROM vault.decrypted_secrets WHERE name = 'cron_secret';
  IF function_url IS NULL OR secret IS NULL THEN RETURN NEW; END IF;
  PERFORM net.http_post(
    url := function_url,
    body := jsonb_build_object('notification_id', NEW.id),
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-secret', secret)
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Push é complementar: nunca impedir a criação do aviso no app.
  RAISE WARNING 'dispatch_push_notification: %', SQLERRM;
  RETURN NEW;
END; $$;
REVOKE ALL ON FUNCTION public.dispatch_push_notification() FROM public, anon, authenticated;

DROP TRIGGER IF EXISTS trg_dispatch_push_notification ON public.notifications;
CREATE TRIGGER trg_dispatch_push_notification
AFTER INSERT ON public.notifications
FOR EACH ROW
WHEN (NEW.type IN ('assignment', 'due_soon'))
EXECUTE FUNCTION public.dispatch_push_notification();

NOTIFY pgrst, 'reload schema';
