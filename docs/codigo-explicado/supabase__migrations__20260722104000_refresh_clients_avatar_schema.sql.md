# supabase/migrations/20260722104000_refresh_clients_avatar_schema.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Guarantees that client logos work even if the previous migration was not applied.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `ALTER TABLE public.clients` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 3 | `  ADD COLUMN IF NOT EXISTS avatar_path text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `-- Refreshes Supabase's REST schema cache so avatar_path is available immediately.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 6 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
