# supabase/migrations/20260826110000_add_client_inactive_status.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Inactivation preserves all client-related records, including tasks and files.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `ALTER TABLE public.clients` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 3 | `  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `-- Existing clients remain active when this feature is introduced.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 6 | `UPDATE public.clients` | Atualiza registros existentes no banco. |
| 7 | `SET is_active = true` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `WHERE is_active IS DISTINCT FROM true;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 10 | `CREATE INDEX IF NOT EXISTS clients_active_name_idx` | Cria indice para acelerar consultas frequentes. |
| 11 | `  ON public.clients (is_active, name);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
