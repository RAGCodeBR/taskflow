# supabase/migrations/20260729102000_add_mural_post_attachments.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `CREATE TABLE IF NOT EXISTS public.mural_post_attachments (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 2 | `  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 3 | `  post_id uuid NOT NULL REFERENCES public.mural_posts(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 4 | `  file_name text NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `  storage_path text NOT NULL UNIQUE,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  mime_type text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  size_bytes bigint,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  uploaded_by uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 9 | `  created_at timestamptz NOT NULL DEFAULT now()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 12 | `CREATE INDEX IF NOT EXISTS mural_post_attachments_post_idx` | Cria indice para acelerar consultas frequentes. |
| 13 | `  ON public.mural_post_attachments(post_id);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 15 | `ALTER TABLE public.mural_post_attachments ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 16 | `GRANT SELECT, INSERT, DELETE ON public.mural_post_attachments TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `GRANT ALL ON public.mural_post_attachments TO service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 19 | `CREATE POLICY mural_post_attachments_select ON public.mural_post_attachments` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 20 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `    EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `      SELECT 1 FROM public.mural_posts post` | Consulta dados ou valida uma condicao no banco. |
| 24 | `      WHERE post.id = post_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `        AND NOT public.has_role(auth.uid(), 'client'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 29 | `CREATE POLICY mural_post_attachments_insert ON public.mural_post_attachments` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 30 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `    uploaded_by = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `    AND EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `      SELECT 1 FROM public.mural_posts post` | Consulta dados ou valida uma condicao no banco. |
| 35 | `      WHERE post.id = post_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `        AND (post.created_by = auth.uid() OR public.has_role(auth.uid(), 'admin'::public.app_role))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 40 | `CREATE POLICY mural_post_attachments_delete ON public.mural_post_attachments` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 41 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `    EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `      SELECT 1 FROM public.mural_posts post` | Consulta dados ou valida uma condicao no banco. |
| 45 | `      WHERE post.id = post_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `        AND (post.created_by = auth.uid() OR public.has_role(auth.uid(), 'admin'::public.app_role))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 50 | `INSERT INTO storage.buckets (id, name, public, file_size_limit)` | Insere dados iniciais ou registros de apoio. |
| 51 | `VALUES ('mural-attachments', 'mural-attachments', false, 10485760)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `ON CONFLICT (id) DO NOTHING;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 54 | `CREATE POLICY mural_attachments_read ON storage.objects` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 55 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `    bucket_id = 'mural-attachments'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `    AND EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `      SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 60 | `      FROM public.mural_post_attachments attachment` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `      JOIN public.mural_posts post ON post.id = attachment.post_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `      WHERE attachment.storage_path = storage.objects.name` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `        AND NOT public.has_role(auth.uid(), 'client'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 64 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 67 | `CREATE POLICY mural_attachments_upload ON storage.objects` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 68 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 69 | `  WITH CHECK (bucket_id = 'mural-attachments' AND owner = auth.uid());` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 70 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 71 | `CREATE POLICY mural_attachments_delete ON storage.objects` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 72 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 74 | `    bucket_id = 'mural-attachments'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `    AND EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 76 | `      SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 77 | `      FROM public.mural_post_attachments attachment` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 78 | `      JOIN public.mural_posts post ON post.id = attachment.post_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 79 | `      WHERE attachment.storage_path = storage.objects.name` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 80 | `        AND (post.created_by = auth.uid() OR public.has_role(auth.uid(), 'admin'::public.app_role))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 81 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 82 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 83 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
