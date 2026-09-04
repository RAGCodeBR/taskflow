# supabase/migrations/20260830233000_add_mural_featured_and_expiry.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `ALTER TABLE public.mural_posts` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 2 | `  ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 3 | `  ADD COLUMN IF NOT EXISTS expires_at date;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `CREATE INDEX IF NOT EXISTS mural_posts_featured_idx` | Cria indice para acelerar consultas frequentes. |
| 6 | `  ON public.mural_posts (is_featured DESC, is_pinned DESC, created_at DESC);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
