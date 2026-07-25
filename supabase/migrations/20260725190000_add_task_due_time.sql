-- A hora fica separada da data para que seja realmente opcional e preserve
-- o comportamento das tarefas antigas que possuem somente prazo por dia.
ALTER TABLE public.tasks
  ADD COLUMN IF NOT EXISTS due_time TIME WITHOUT TIME ZONE;

COMMENT ON COLUMN public.tasks.due_time IS
  'Horário opcional do prazo da tarefa, exibido e usado nos alertas do Kanban.';
