-- Solicitações: tickets internos/clientes com conversa, responsáveis e anexos.
CREATE TABLE IF NOT EXISTS public.service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (char_length(trim(title)) > 0),
  description text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  due_date date,
  created_by uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  resolved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.service_request_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
  body text NOT NULL CHECK (char_length(trim(body)) > 0),
  author_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.service_request_participants (
  request_id uuid NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  added_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (request_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.service_request_assignees (
  request_id uuid NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  assigned_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (request_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.service_request_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  storage_path text NOT NULL UNIQUE,
  mime_type text,
  size_bytes bigint,
  uploaded_by uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.service_request_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
  actor_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  kind text NOT NULL CHECK (kind IN ('created', 'status_changed', 'priority_changed', 'participant_added', 'assignee_added', 'attachment_added')),
  details text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS service_requests_updated_at_idx ON public.service_requests(updated_at DESC);
CREATE INDEX IF NOT EXISTS service_request_messages_request_idx ON public.service_request_messages(request_id, created_at);
CREATE INDEX IF NOT EXISTS service_request_activity_request_idx ON public.service_request_activity(request_id, created_at);

CREATE OR REPLACE FUNCTION public.can_access_service_request(target_request_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.service_requests request
    WHERE request.id = target_request_id
      AND (
        NOT public.has_role(auth.uid(), 'client'::public.app_role)
        OR request.created_by = auth.uid()
        OR EXISTS (
          SELECT 1 FROM public.service_request_participants participant
          WHERE participant.request_id = request.id AND participant.user_id = auth.uid()
        )
        OR EXISTS (
          SELECT 1 FROM public.client_user_links link
          WHERE link.client_id = request.client_id AND link.user_id = auth.uid()
        )
      )
  );
$$;

CREATE OR REPLACE FUNCTION public.touch_service_request()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  IF NEW.status = 'resolved' AND OLD.status IS DISTINCT FROM 'resolved' THEN NEW.resolved_at = now(); END IF;
  IF NEW.status <> 'resolved' THEN NEW.resolved_at = NULL; END IF;
  RETURN NEW;
END;
$$;

-- The authenticated identity is the source of truth for the creator. This
-- avoids rejecting legitimate inserts when a client-side profile is stale.
CREATE OR REPLACE FUNCTION public.set_service_request_creator()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NOT NULL THEN
    NEW.created_by = auth.uid();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_service_requests_updated_at ON public.service_requests;
CREATE TRIGGER trg_service_requests_updated_at BEFORE UPDATE ON public.service_requests
FOR EACH ROW EXECUTE FUNCTION public.touch_service_request();
DROP TRIGGER IF EXISTS trg_service_requests_creator ON public.service_requests;
CREATE TRIGGER trg_service_requests_creator BEFORE INSERT ON public.service_requests
FOR EACH ROW EXECUTE FUNCTION public.set_service_request_creator();

ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_request_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_request_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_request_assignees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_request_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_request_activity ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_requests, public.service_request_messages, public.service_request_participants, public.service_request_assignees, public.service_request_attachments, public.service_request_activity TO authenticated;

DROP POLICY IF EXISTS service_requests_read ON public.service_requests;
DROP POLICY IF EXISTS service_requests_create ON public.service_requests;
DROP POLICY IF EXISTS service_requests_update ON public.service_requests;
DROP POLICY IF EXISTS service_requests_delete ON public.service_requests;
DROP POLICY IF EXISTS service_request_messages_read ON public.service_request_messages;
DROP POLICY IF EXISTS service_request_messages_create ON public.service_request_messages;
DROP POLICY IF EXISTS service_request_messages_delete ON public.service_request_messages;
DROP POLICY IF EXISTS service_request_participants_read ON public.service_request_participants;
DROP POLICY IF EXISTS service_request_participants_write ON public.service_request_participants;
DROP POLICY IF EXISTS service_request_assignees_read ON public.service_request_assignees;
DROP POLICY IF EXISTS service_request_assignees_write ON public.service_request_assignees;
DROP POLICY IF EXISTS service_request_attachments_read ON public.service_request_attachments;
DROP POLICY IF EXISTS service_request_attachments_create ON public.service_request_attachments;
DROP POLICY IF EXISTS service_request_attachments_delete ON public.service_request_attachments;
DROP POLICY IF EXISTS service_request_activity_read ON public.service_request_activity;
DROP POLICY IF EXISTS service_request_activity_create ON public.service_request_activity;

CREATE POLICY service_requests_read ON public.service_requests FOR SELECT TO authenticated USING (public.can_access_service_request(id));
-- `created_by` is assigned by trg_service_requests_creator.  The RLS check
-- only needs to assert that this is an authenticated application request;
-- checking a browser-provided creator before the trigger runs can reject a
-- valid ticket when the session/profile was refreshed out of sequence.
CREATE POLICY service_requests_create ON public.service_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY service_requests_update ON public.service_requests FOR UPDATE TO authenticated USING (public.can_access_service_request(id)) WITH CHECK (public.can_access_service_request(id));
CREATE POLICY service_requests_delete ON public.service_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role) OR created_by = auth.uid());

CREATE POLICY service_request_messages_read ON public.service_request_messages FOR SELECT TO authenticated USING (public.can_access_service_request(request_id));
CREATE POLICY service_request_messages_create ON public.service_request_messages FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid() AND public.can_access_service_request(request_id));
CREATE POLICY service_request_messages_delete ON public.service_request_messages FOR DELETE TO authenticated USING (author_id = auth.uid() OR public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY service_request_participants_read ON public.service_request_participants FOR SELECT TO authenticated USING (public.can_access_service_request(request_id));
CREATE POLICY service_request_participants_write ON public.service_request_participants FOR ALL TO authenticated USING (public.can_access_service_request(request_id)) WITH CHECK (public.can_access_service_request(request_id));
CREATE POLICY service_request_assignees_read ON public.service_request_assignees FOR SELECT TO authenticated USING (public.can_access_service_request(request_id));
CREATE POLICY service_request_assignees_write ON public.service_request_assignees FOR ALL TO authenticated USING (public.can_access_service_request(request_id)) WITH CHECK (public.can_access_service_request(request_id));
CREATE POLICY service_request_attachments_read ON public.service_request_attachments FOR SELECT TO authenticated USING (public.can_access_service_request(request_id));
CREATE POLICY service_request_attachments_create ON public.service_request_attachments FOR INSERT TO authenticated WITH CHECK (uploaded_by = auth.uid() AND public.can_access_service_request(request_id));
CREATE POLICY service_request_attachments_delete ON public.service_request_attachments FOR DELETE TO authenticated USING (uploaded_by = auth.uid() OR public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY service_request_activity_read ON public.service_request_activity FOR SELECT TO authenticated USING (public.can_access_service_request(request_id));
CREATE POLICY service_request_activity_create ON public.service_request_activity FOR INSERT TO authenticated WITH CHECK (actor_id = auth.uid() AND public.can_access_service_request(request_id));

INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('service-request-attachments', 'service-request-attachments', false, 52428800)
ON CONFLICT (id) DO UPDATE SET file_size_limit = EXCLUDED.file_size_limit;
DROP POLICY IF EXISTS service_request_files_read ON storage.objects;
DROP POLICY IF EXISTS service_request_files_upload ON storage.objects;
DROP POLICY IF EXISTS service_request_files_delete ON storage.objects;
CREATE POLICY service_request_files_read ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'service-request-attachments');
CREATE POLICY service_request_files_upload ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'service-request-attachments' AND owner = auth.uid());
CREATE POLICY service_request_files_delete ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'service-request-attachments' AND owner = auth.uid());

-- Existing accounts receive the menu permission immediately. New accounts keep
-- their role-specific defaults and administrators can still revoke it in Usuários.
UPDATE public.user_permissions
SET permissions = array_append(permissions, 'requests')
WHERE NOT ('requests' = ANY(permissions));
