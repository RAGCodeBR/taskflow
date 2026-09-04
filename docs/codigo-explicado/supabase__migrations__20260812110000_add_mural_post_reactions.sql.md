# supabase/migrations/20260812110000_add_mural_post_reactions.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `CREATE TABLE IF NOT EXISTS public.mural_post_reactions (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 2 | `  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 3 | `  post_id uuid NOT NULL REFERENCES public.mural_posts(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 4 | `  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 5 | `  emoji text NOT NULL CHECK (char_length(emoji) BETWEEN 1 AND 16),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  created_at timestamptz NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  UNIQUE (post_id, user_id, emoji)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 10 | `CREATE INDEX IF NOT EXISTS mural_post_reactions_post_idx` | Cria indice para acelerar consultas frequentes. |
| 11 | `  ON public.mural_post_reactions (post_id, created_at);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 13 | `ALTER TABLE public.mural_post_reactions ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 14 | `GRANT SELECT, INSERT, DELETE ON public.mural_post_reactions TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `GRANT ALL ON public.mural_post_reactions TO service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 17 | `CREATE POLICY mural_post_reactions_select ON public.mural_post_reactions` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 18 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `  USING (NOT public.has_role(auth.uid(), 'client'::public.app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 21 | `CREATE POLICY mural_post_reactions_insert ON public.mural_post_reactions` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 22 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `    NOT public.has_role(auth.uid(), 'client'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `    AND user_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `CREATE POLICY mural_post_reactions_delete ON public.mural_post_reactions` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 29 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `  USING (user_id = auth.uid());` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 32 | `ALTER PUBLICATION supabase_realtime ADD TABLE public.mural_post_reactions;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
