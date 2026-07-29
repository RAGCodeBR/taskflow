CREATE TABLE IF NOT EXISTS public.mural_post_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.mural_posts(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  storage_path text NOT NULL UNIQUE,
  mime_type text,
  size_bytes bigint,
  uploaded_by uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS mural_post_attachments_post_idx
  ON public.mural_post_attachments(post_id);

ALTER TABLE public.mural_post_attachments ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, DELETE ON public.mural_post_attachments TO authenticated;
GRANT ALL ON public.mural_post_attachments TO service_role;

CREATE POLICY mural_post_attachments_select ON public.mural_post_attachments
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.mural_posts post
      WHERE post.id = post_id
        AND NOT public.has_role(auth.uid(), 'client'::public.app_role)
    )
  );

CREATE POLICY mural_post_attachments_insert ON public.mural_post_attachments
  FOR INSERT TO authenticated
  WITH CHECK (
    uploaded_by = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.mural_posts post
      WHERE post.id = post_id
        AND (post.created_by = auth.uid() OR public.has_role(auth.uid(), 'admin'::public.app_role))
    )
  );

CREATE POLICY mural_post_attachments_delete ON public.mural_post_attachments
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.mural_posts post
      WHERE post.id = post_id
        AND (post.created_by = auth.uid() OR public.has_role(auth.uid(), 'admin'::public.app_role))
    )
  );

INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('mural-attachments', 'mural-attachments', false, 10485760)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY mural_attachments_read ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'mural-attachments'
    AND EXISTS (
      SELECT 1
      FROM public.mural_post_attachments attachment
      JOIN public.mural_posts post ON post.id = attachment.post_id
      WHERE attachment.storage_path = storage.objects.name
        AND NOT public.has_role(auth.uid(), 'client'::public.app_role)
    )
  );

CREATE POLICY mural_attachments_upload ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'mural-attachments' AND owner = auth.uid());

CREATE POLICY mural_attachments_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'mural-attachments'
    AND EXISTS (
      SELECT 1
      FROM public.mural_post_attachments attachment
      JOIN public.mural_posts post ON post.id = attachment.post_id
      WHERE attachment.storage_path = storage.objects.name
        AND (post.created_by = auth.uid() OR public.has_role(auth.uid(), 'admin'::public.app_role))
    )
  );
