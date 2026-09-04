# supabase/migrations/20260729093000_create_mural_posts.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `CREATE TABLE IF NOT EXISTS public.mural_posts (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 2 | `  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 3 | `  title text NOT NULL CHECK (char_length(title) <= 180),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `  content text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `  color text NOT NULL DEFAULT 'sky' CHECK (color IN ('sky', 'amber', 'violet', 'green', 'rose', 'red', 'stone')),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  tag text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  image_url text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  checklist jsonb NOT NULL DEFAULT '[]'::jsonb,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  created_by uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 10 | `  created_at timestamptz NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  updated_at timestamptz NOT NULL DEFAULT now()` | Atualiza registros existentes no banco. |
| 12 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 14 | `CREATE INDEX IF NOT EXISTS mural_posts_created_at_idx ON public.mural_posts(created_at DESC);` | Cria indice para acelerar consultas frequentes. |
| 15 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 16 | `ALTER TABLE public.mural_posts ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 17 | `GRANT SELECT, INSERT, UPDATE, DELETE ON public.mural_posts TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `GRANT ALL ON public.mural_posts TO service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 20 | `CREATE POLICY mural_posts_select ON public.mural_posts` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 21 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `  USING (NOT public.has_role(auth.uid(), 'client'::public.app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 24 | `CREATE POLICY mural_posts_insert ON public.mural_posts` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 25 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `    NOT public.has_role(auth.uid(), 'client'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `    AND created_by = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 31 | `CREATE POLICY mural_posts_update ON public.mural_posts` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 32 | `  FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `    OR created_by = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `    NOT public.has_role(auth.uid(), 'client'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `    AND (public.has_role(auth.uid(), 'admin'::public.app_role) OR created_by = auth.uid())` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 42 | `CREATE POLICY mural_posts_delete ON public.mural_posts` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 43 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `    OR created_by = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 49 | `DROP TRIGGER IF EXISTS trg_mural_posts_updated_at ON public.mural_posts;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 50 | `CREATE TRIGGER trg_mural_posts_updated_at` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 51 | `  BEFORE UPDATE ON public.mural_posts` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
