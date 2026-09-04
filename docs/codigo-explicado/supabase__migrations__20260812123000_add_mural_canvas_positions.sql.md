# supabase/migrations/20260812123000_add_mural_canvas_positions.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `ALTER TABLE public.mural_posts` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 2 | `  ADD COLUMN IF NOT EXISTS canvas_x integer NOT NULL DEFAULT 520 CHECK (canvas_x >= 0),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 3 | `  ADD COLUMN IF NOT EXISTS canvas_y integer NOT NULL DEFAULT 180 CHECK (canvas_y >= 0);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `WITH positioned_posts AS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  SELECT id, row_number() OVER (ORDER BY created_at, id) - 1 AS position` | Consulta dados ou valida uma condicao no banco. |
| 7 | `  FROM public.mural_posts` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `UPDATE public.mural_posts AS post` | Atualiza registros existentes no banco. |
| 10 | `SET` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  canvas_x = 520 + ((positioned_posts.position % 5) * 340),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `  canvas_y = 180 + ((positioned_posts.position / 5) * 280)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `FROM positioned_posts` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `WHERE post.id = positioned_posts.id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `  AND post.canvas_x = 520` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `  AND post.canvas_y = 180;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 18 | `CREATE INDEX IF NOT EXISTS mural_posts_canvas_position_idx` | Cria indice para acelerar consultas frequentes. |
| 19 | `  ON public.mural_posts (canvas_y, canvas_x);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
