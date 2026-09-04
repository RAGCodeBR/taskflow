# supabase/migrations/20260725190000_add_task_due_time.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- A hora fica separada da data para que seja realmente opcional e preserve` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- o comportamento das tarefas antigas que possuem somente prazo por dia.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `ALTER TABLE public.tasks` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 4 | `  ADD COLUMN IF NOT EXISTS due_time TIME WITHOUT TIME ZONE;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 6 | `COMMENT ON COLUMN public.tasks.due_time IS` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  'Horário opcional do prazo da tarefa, exibido e usado nos alertas do Kanban.';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
