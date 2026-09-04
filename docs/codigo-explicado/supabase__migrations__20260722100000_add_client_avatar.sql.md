# supabase/migrations/20260722100000_add_client_avatar.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `ALTER TABLE public.clients` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 2 | `    ADD COLUMN IF NOT EXISTS avatar_path text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 3 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
