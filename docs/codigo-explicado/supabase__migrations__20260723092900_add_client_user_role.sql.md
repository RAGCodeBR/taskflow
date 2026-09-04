# supabase/migrations/20260723092900_add_client_user_role.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Keep this enum change in its own migration: PostgreSQL requires a commit before a` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- newly added enum value can be used by tables, functions, or policies.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'client';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
