# supabase/migrations/20260721150000_add_client_registration_data.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `ALTER TABLE public.clients` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 2 | `  ADD COLUMN cnpj text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 3 | `  ADD COLUMN legal_name text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `  ADD COLUMN trade_name text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `  ADD COLUMN state_registration text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  ADD COLUMN municipal_registration text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  ADD COLUMN address text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  ADD COLUMN phone text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  ADD COLUMN email text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  ADD COLUMN responsible text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
