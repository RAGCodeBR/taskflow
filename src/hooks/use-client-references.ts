import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { supabase } from "@/integrations/supabase/client";
import {
  enqueueOfflineOperation,
  isNetworkFailure,
  isOffline,
  listOfflineOperations,
} from "@/lib/offline-sync";
import {
  overlayClientReferences,
  type ClientReference,
  type ClientReferenceTopic,
  type ReferenceTable,
} from "@/lib/client-references";

export function useClientReferences(clientId: string) {
  const { user, activeWorkspace } = useAuth();
  const qc = useQueryClient();
  const workspaceId = activeWorkspace?.id ?? "";
  const key = (table: ReferenceTable) => [table, workspaceId, user?.id, clientId];
  const pending = () =>
    user && typeof indexedDB !== "undefined" ? listOfflineOperations(user.id) : Promise.resolve([]);

  const load = async <T extends { id: string; client_id: string }>(
    table: ReferenceTable,
  ): Promise<T[]> => {
    const cached = qc.getQueryData<T[]>(key(table)) ?? [];
    let rows = cached;
    if (!isOffline()) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select("*")
          .eq("client_id", clientId)
          .order("created_at");
        if (error) throw error;
        rows = (data ?? []) as unknown as T[];
      } catch (error) {
        if (!isNetworkFailure(error)) throw error;
      }
    }
    return overlayClientReferences(rows, await pending(), table, clientId, workspaceId);
  };
  const topics = useQuery({
    queryKey: key("client_reference_topics"),
    queryFn: () => load<ClientReferenceTopic>("client_reference_topics"),
    enabled: Boolean(user && workspaceId && clientId),
    networkMode: "always",
  });
  const references = useQuery({
    queryKey: key("client_references"),
    queryFn: () => load<ClientReference>("client_references"),
    enabled: Boolean(user && workspaceId && clientId),
    networkMode: "always",
  });

  // Queue first: topic creation, image upload and dependent edits keep their order,
  // and the same IDs make retries safe if a response is lost.
  const mutate = async (
    table: ReferenceTable,
    action: "create" | "update" | "delete",
    id: string,
    record: Record<string, unknown>,
    image?: File,
  ) => {
    if (!user || !workspaceId) throw new Error("Entre novamente para salvar.");
    await enqueueOfflineOperation({
      userId: user.id,
      entity: image ? "attachment" : "record",
      action,
      entityId: id,
      payload: {
        table,
        workspaceId,
        clientId,
        ...(image
          ? { bucket: "client-references", blob: image, attachment: record }
          : action === "create"
            ? { record }
            : action === "update"
              ? { patch: record }
              : { storagePath: record.storage_path }),
      },
    });
    qc.setQueryData<Array<ClientReference | ClientReferenceTopic>>(key(table), (current) => {
      const rows = current ?? [];
      if (action === "delete") return rows.filter((row) => row.id !== id);
      if (action === "update")
        return rows.map((row) => (row.id === id ? { ...row, ...record } : row));
      return [...rows.filter((row) => row.id !== id), record as unknown as ClientReference];
    });
  };
  return { topics, references, mutate };
}
