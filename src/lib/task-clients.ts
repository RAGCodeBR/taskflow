/** One task can be displayed under several Marketing clients without copying it. */
export function taskClientIds(task: {
  client_id: string | null;
  secondary_client_id?: string | null;
  additional_client_ids?: string[] | null;
}): string[] {
  return [...new Set([task.client_id, ...(task.additional_client_ids ?? []), task.secondary_client_id].filter((id): id is string => Boolean(id)))];
}
