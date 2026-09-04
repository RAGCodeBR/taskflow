# supabase/migrations/20260831125000_allow_active_workspace_profile_read.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- The authenticated profile query also reads the active environment.  The` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- email privacy migration grants profile fields by column, so this new column` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- must be explicitly granted or the entire profile request fails (including` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `-- the name and avatar fields).` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 5 | `GRANT SELECT (active_workspace_id) ON public.profiles TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 7 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
