# supabase/migrations/20260730090000_add_mural_post_read_receipts.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- A post-it is unread for a person until they visit the Mural. Read receipts` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- are intentionally per user so one person's visit never clears another's badge.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `CREATE TABLE IF NOT EXISTS public.mural_post_reads (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 4 | `  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 5 | `  post_id uuid NOT NULL REFERENCES public.mural_posts(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 6 | `  read_at timestamptz NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  PRIMARY KEY (user_id, post_id)` | Define identificador unico principal do registro. |
| 8 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 10 | `CREATE INDEX IF NOT EXISTS mural_post_reads_user_idx` | Cria indice para acelerar consultas frequentes. |
| 11 | `  ON public.mural_post_reads(user_id, read_at DESC);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 13 | `ALTER TABLE public.mural_post_reads ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 14 | `GRANT SELECT, INSERT ON public.mural_post_reads TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `GRANT ALL ON public.mural_post_reads TO service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 17 | `CREATE POLICY mural_post_reads_own_select ON public.mural_post_reads` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 18 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `  USING (user_id = auth.uid());` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 21 | `CREATE POLICY mural_post_reads_own_insert ON public.mural_post_reads` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 22 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `  WITH CHECK (user_id = auth.uid());` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 25 | `ALTER PUBLICATION supabase_realtime ADD TABLE public.mural_posts;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
