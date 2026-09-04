# supabase/migrations/20260729095000_add_mural_post_order_and_completion.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `ALTER TABLE public.mural_posts` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 2 | `  ADD COLUMN IF NOT EXISTS completed_at timestamptz;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 3 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 4 | `CREATE TABLE IF NOT EXISTS public.mural_post_orders (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 5 | `  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 6 | `  post_id uuid NOT NULL REFERENCES public.mural_posts(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 7 | `  position integer NOT NULL DEFAULT 0,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  PRIMARY KEY (user_id, post_id)` | Define identificador unico principal do registro. |
| 9 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 11 | `CREATE INDEX IF NOT EXISTS mural_post_orders_user_position_idx` | Cria indice para acelerar consultas frequentes. |
| 12 | `  ON public.mural_post_orders(user_id, position);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 14 | `ALTER TABLE public.mural_post_orders ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 15 | `GRANT SELECT, INSERT, UPDATE, DELETE ON public.mural_post_orders TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `GRANT ALL ON public.mural_post_orders TO service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 18 | `CREATE POLICY mural_post_orders_own ON public.mural_post_orders` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 19 | `  FOR ALL TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  USING (user_id = auth.uid())` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `  WITH CHECK (user_id = auth.uid());` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
