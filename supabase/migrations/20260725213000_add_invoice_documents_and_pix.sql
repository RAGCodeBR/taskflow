-- Payment instructions and documents uploaded by the finance team.
ALTER TABLE public.client_invoices
  ADD COLUMN IF NOT EXISTS pix_key TEXT,
  ADD COLUMN IF NOT EXISTS boleto_file_name TEXT,
  ADD COLUMN IF NOT EXISTS boleto_storage_path TEXT,
  ADD COLUMN IF NOT EXISTS boleto_mime_type TEXT,
  ADD COLUMN IF NOT EXISTS invoice_file_name TEXT,
  ADD COLUMN IF NOT EXISTS invoice_storage_path TEXT,
  ADD COLUMN IF NOT EXISTS invoice_mime_type TEXT;

-- Keep financial documents private. They are available only to the finance
-- team or to the client connected to the invoice.
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('invoice-documents', 'invoice-documents', false, 10485760)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS invoice_documents_read ON storage.objects;
CREATE POLICY invoice_documents_read ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'invoice-documents'
    AND EXISTS (
      SELECT 1
      FROM public.client_invoices invoice
      WHERE invoice.id::text = (storage.foldername(name))[1]
        AND (
          public.has_role(auth.uid(), 'admin'::public.app_role)
          OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
          OR (
            public.has_role(auth.uid(), 'client'::public.app_role)
            AND invoice.client_id = public.current_client_id()
          )
        )
    )
  );

DROP POLICY IF EXISTS invoice_documents_upload ON storage.objects;
CREATE POLICY invoice_documents_upload ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'invoice-documents'
    AND (
      public.has_role(auth.uid(), 'admin'::public.app_role)
      OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
    )
  );

DROP POLICY IF EXISTS invoice_documents_delete ON storage.objects;
CREATE POLICY invoice_documents_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'invoice-documents'
    AND (
      public.has_role(auth.uid(), 'admin'::public.app_role)
      OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
    )
  );
