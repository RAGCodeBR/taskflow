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
  "origin_workspace_id",
  "conversation_closed_at",
  "interruptions",
  // Campos acrescentados depois da fila offline. Sem eles, uma tarefa criada
  // sem internet chegava ao servidor sem formato, objetivo, outros clientes,
  // vínculo com a pauta da reunião ou marcação de rascunho.
  "is_draft",
  "objective_id",
  "secondary_client_id",
  "additional_client_ids",
  "recurring_meeting_agenda_item_id",
  "recurring_meeting_agenda_template_id",
] as const;

/** Envia somente colunas que existem atualmente em public.tasks. */
export function taskCreatePayloadForSync(task: Record<string, unknown>) {
  return Object.fromEntries(
    TASK_CREATE_COLUMNS.filter((column) => column in task).map((column) => [column, task[column]]),
  );
}
