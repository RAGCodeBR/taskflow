# supabase/migrations/20260831123000_recover_consultoria_records.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Intentionally empty.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- This migration was originally drafted as a recovery that reassigned every` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `-- record to Consultoria. That would violate the workspace boundary once` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 5 | `-- Marketing has real records, so it must never move data between workspaces.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 6 | `-- Existing records are already backfilled to Consultoria by the initial` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 7 | `-- workspace migration only when workspace_id is NULL.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 8 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
