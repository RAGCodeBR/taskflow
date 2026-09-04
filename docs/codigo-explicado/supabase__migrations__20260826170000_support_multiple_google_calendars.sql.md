# supabase/migrations/20260826170000_support_multiple_google_calendars.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Google event IDs are only unique inside a calendar. A consolidated Agenda` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- must therefore identify remote events by the calendar + event pair.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `ALTER TABLE public.calendar_events` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 4 | `  DROP CONSTRAINT IF EXISTS calendar_events_google_event_id_key;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 5 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 6 | `ALTER TABLE public.calendar_events` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 7 | `  ADD CONSTRAINT calendar_events_google_calendar_event_key` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  UNIQUE (google_calendar_id, google_event_id);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
