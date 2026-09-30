-- Um administrador pode usar mais de um ambiente. A orientação do Kanban é
-- uma preferência por ambiente, portanto user_id isolado não pode ser único.
ALTER TABLE public.board_preferences
  DROP CONSTRAINT IF EXISTS board_preferences_user_id_key;

CREATE UNIQUE INDEX IF NOT EXISTS board_preferences_user_workspace_key
  ON public.board_preferences (user_id, workspace_id);
