# supabase/migrations/20260810141000_add_mural_post_presentation.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `ALTER TABLE public.mural_posts` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 2 | `  ADD COLUMN IF NOT EXISTS is_pinned boolean NOT NULL DEFAULT false,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 3 | `  ADD COLUMN IF NOT EXISTS card_size text NOT NULL DEFAULT 'normal'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `    CHECK (card_size IN ('compact', 'normal', 'large')),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `  ADD COLUMN IF NOT EXISTS text_style text NOT NULL DEFAULT 'clean'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `    CHECK (text_style IN ('clean', 'handwritten', 'editorial', 'typewriter'));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 8 | `CREATE INDEX IF NOT EXISTS mural_posts_pinned_idx` | Cria indice para acelerar consultas frequentes. |
| 9 | `  ON public.mural_posts (is_pinned DESC, created_at DESC);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
