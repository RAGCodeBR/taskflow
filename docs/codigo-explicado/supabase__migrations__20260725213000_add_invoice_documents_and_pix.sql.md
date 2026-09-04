# supabase/migrations/20260725213000_add_invoice_documents_and_pix.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Payment instructions and documents uploaded by the finance team.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `ALTER TABLE public.client_invoices` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 3 | `  ADD COLUMN IF NOT EXISTS pix_key TEXT,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `  ADD COLUMN IF NOT EXISTS boleto_file_name TEXT,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `  ADD COLUMN IF NOT EXISTS boleto_storage_path TEXT,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  ADD COLUMN IF NOT EXISTS boleto_mime_type TEXT,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  ADD COLUMN IF NOT EXISTS invoice_file_name TEXT,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  ADD COLUMN IF NOT EXISTS invoice_storage_path TEXT,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  ADD COLUMN IF NOT EXISTS invoice_mime_type TEXT;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 11 | `-- Keep financial documents private. They are available only to the finance` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 12 | `-- team or to the client connected to the invoice.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 13 | `INSERT INTO storage.buckets (id, name, public, file_size_limit)` | Insere dados iniciais ou registros de apoio. |
| 14 | `VALUES ('invoice-documents', 'invoice-documents', false, 10485760)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `ON CONFLICT (id) DO NOTHING;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 17 | `DROP POLICY IF EXISTS invoice_documents_read ON storage.objects;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 18 | `CREATE POLICY invoice_documents_read ON storage.objects` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 19 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `    bucket_id = 'invoice-documents'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `    AND EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `      SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 24 | `      FROM public.client_invoices invoice` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `      WHERE invoice.id::text = (storage.foldername(name))[1]` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `        AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `          public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `          OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `          OR (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `            public.has_role(auth.uid(), 'client'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `            AND invoice.client_id = public.current_client_id()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `          )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `        )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 37 | `DROP POLICY IF EXISTS invoice_documents_upload ON storage.objects;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 38 | `CREATE POLICY invoice_documents_upload ON storage.objects` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 39 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `    bucket_id = 'invoice-documents'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `    AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `      public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `      OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 48 | `DROP POLICY IF EXISTS invoice_documents_delete ON storage.objects;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 49 | `CREATE POLICY invoice_documents_delete ON storage.objects` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 50 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `    bucket_id = 'invoice-documents'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `    AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `      public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `      OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
