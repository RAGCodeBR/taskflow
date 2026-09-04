# supabase/migrations/20260830223000_expand_mural_text_styles.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `ALTER TABLE public.mural_posts` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 2 | `  DROP CONSTRAINT IF EXISTS mural_posts_text_style_check;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 3 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 4 | `ALTER TABLE public.mural_posts` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 5 | `  ADD CONSTRAINT mural_posts_text_style_check` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `    text_style IN (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `      'clean',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `      'handwritten',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `      'pen',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `      'marker',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `      'casual',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `      'scribble',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `      'architect',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `      'editorial',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `      'typewriter'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
