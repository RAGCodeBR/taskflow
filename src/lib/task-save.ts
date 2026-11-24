import type { QueryClient } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { taskCollaboratorChanges } from "./task-collaborator-changes";

/** Untouched selections need no extra round trip; edited ones still merge against live links. */
export async function persistTaskCollaborators(
  client: Pick<SupabaseClient<Database>, "rpc">,
  taskId: string,
  loadedIds: readonly string[],
  selectedIds: readonly string[],
) {
  const intent = taskCollaboratorChanges(loadedIds, loadedIds, selectedIds);
  if (!intent.addedIds.length && !intent.removedIds.length) return false;
  const { data, error } = await client.rpc("apply_task_collaborator_changes", {
    p_task_id: taskId,
    p_add: intent.addedIds,
    p_remove: intent.removedIds,
  });
  if (error) throw error;
  return data === true;
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
