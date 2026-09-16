const TASK_CREATE_COLUMNS = [
  "id",
  "title",
  "description",
  "status",
  "status_id",
  "priority",
  "column_id",
  "client_id",
  "assignee_id",
  "due_date",
  "due_time",
  "completed_at",
  "position",
  "color",
  "created_by",
  "tag_id",
  "deleted_at",
  "deleted_by",
  "archived_at",
  "archived_reason",
  "created_at",
  "updated_at",
  "card_width",
  "workspace_id",
  "conversation_closed_at",
  "interruptions",
] as const;

/** Envia somente colunas que existem atualmente em public.tasks. */
export function taskCreatePayloadForSync(task: Record<string, unknown>) {
  return Object.fromEntries(
    TASK_CREATE_COLUMNS.filter((column) => column in task).map((column) => [column, task[column]]),
  );
}
