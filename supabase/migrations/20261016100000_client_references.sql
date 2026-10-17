CREATE TABLE public.client_reference_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 120),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (id, client_id)
);

CREATE TABLE public.client_references (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  topic_id uuid NOT NULL,
  title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 160),
  url text CHECK (url IS NULL OR url ~ '^https?://'),
  notes text NOT NULL DEFAULT '',
  storage_path text,
  file_name text,
  mime_type text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (topic_id, client_id) REFERENCES public.client_reference_topics(id, client_id),
  CHECK (url IS NOT NULL OR storage_path IS NOT NULL OR char_length(btrim(notes)) > 0),
  CHECK (storage_path IS NULL OR split_part(storage_path, '/', 1) = client_id::text)
);
CREATE INDEX client_reference_topics_client_idx ON public.client_reference_topics(client_id);
CREATE INDEX client_references_topic_idx ON public.client_references(topic_id, client_id);

ALTER TABLE public.client_reference_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_references ENABLE ROW LEVEL SECURITY;

DO $$ DECLARE tbl text; BEGIN
  FOREACH tbl IN ARRAY ARRAY['client_reference_topics', 'client_references'] LOOP
    EXECUTE format('CREATE POLICY %I ON public.%I FOR SELECT TO authenticated USING (public.can_access_workspace_client(client_id))', tbl || '_read', tbl);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR ALL TO authenticated USING (public.can_access_workspace_client(client_id) AND (public.has_role(auth.uid(), ''admin''::public.app_role) OR public.has_role(auth.uid(), ''collaborator''::public.app_role))) WITH CHECK (public.can_access_workspace_client(client_id) AND (public.has_role(auth.uid(), ''admin''::public.app_role) OR public.has_role(auth.uid(), ''collaborator''::public.app_role)))', tbl || '_staff_write', tbl);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', tbl);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', tbl);
  END LOOP;
END $$;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('client-references', 'client-references', false, 10485760, ARRAY['image/jpeg','image/png','image/webp','image/gif']);

CREATE FUNCTION public.can_access_client_reference_file(object_name text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.clients c
    WHERE c.id::text = split_part(object_name, '/', 1)
      AND public.can_access_workspace_client(c.id));
$$;
REVOKE ALL ON FUNCTION public.can_access_client_reference_file(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_access_client_reference_file(text) TO authenticated;

CREATE POLICY client_reference_images_read ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'client-references' AND public.can_access_client_reference_file(name));
CREATE POLICY client_reference_images_insert ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'client-references' AND public.can_access_client_reference_file(name)
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'collaborator')));
CREATE POLICY client_reference_images_delete ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'client-references' AND public.can_access_client_reference_file(name)
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'collaborator')));

NOTIFY pgrst, 'reload schema';
