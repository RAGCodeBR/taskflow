import type { QueryClient } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { taskCollaboratorChanges } from "./task-collaborator-changes";

/** Untouched selections need no extra round trip; edited ones still merge against live links. */
export async function persistTaskCollaborators(
  client: Pick<SupabaseClient<Database>, "from">,
  taskId: string,
  actorId: string | null,
  loadedIds: readonly string[],
  selectedIds: readonly string[],
) {
  const intent = taskCollaboratorChanges(loadedIds, loadedIds, selectedIds);
  if (!intent.addedIds.length && !intent.removedIds.length) return false;
  // This existing table is not yet present in the generated Database schema.
  const collaborators = () => (client.from as (table: string) => any)("task_collaborators");
  const { data, error } = await collaborators()
    .select("collaborator_id").eq("task_id", taskId);
  if (error) throw error;
  const currentIds = (data ?? []).map((row: { collaborator_id: string }) => row.collaborator_id);
  const changes = taskCollaboratorChanges(loadedIds, currentIds, selectedIds);
  if (changes.removedIds.length) {
    const { error } = await collaborators().delete()
      .eq("task_id", taskId).in("collaborator_id", changes.removedIds);
    if (error) throw error;
  }
  if (changes.addedIds.length) {
    const { error } = await collaborators().insert(changes.addedIds.map((id) => ({
      task_id: taskId, collaborator_id: id, added_by: actorId,
    })));
    if (error) throw error;
  }
  return Boolean(changes.addedIds.length || changes.removedIds.length);
}

/** Persistence has finished; fetching new lists must not keep the save dialog open. */
export function refreshTaskListsAfterSave(queryClient: QueryClient) {
  void Promise.all([
    queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    queryClient.invalidateQueries({ queryKey: ["subtasks"] }),
    queryClient.invalidateQueries({ queryKey: ["task_collaborators"] }),
  ]).catch(() => {
    // A failed refresh does not undo confirmed writes. Focus/reconnect and the
    // periodic fallback retry the invalidated queries through the normal cache.
  });
}
