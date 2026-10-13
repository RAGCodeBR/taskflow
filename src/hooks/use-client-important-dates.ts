import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { isNetworkFailure, isOffline, listOfflineOperations } from "@/lib/offline-sync";
import { withPendingClientDates } from "@/lib/client-important-dates";

export interface ClientImportantDate {
  id: string;
  client_id: string;
  title: string;
  event_date: string;
  recurrence: "annual" | "once";
  created_at: string;
  updated_at: string;
}

export function useClientImportantDates(targetWorkspaceId?: string | null) {
  const { user, activeWorkspace } = useAuth();
  const queryClient = useQueryClient();
  const workspaceId = targetWorkspaceId ?? activeWorkspace?.id ?? null;
  const isAdminPreview = Boolean(
    targetWorkspaceId && activeWorkspace?.id && targetWorkspaceId !== activeWorkspace.id,
  );
  const queryKey = ["client-important-dates", workspaceId, user?.id];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const pending =
        user && !isAdminPreview && typeof indexedDB !== "undefined"
          ? await listOfflineOperations(user.id)
          : [];
      const cached = () => {
        const rows = queryClient.getQueryData<ClientImportantDate[]>(queryKey) ?? [];
        return workspaceId && !isAdminPreview
          ? withPendingClientDates(rows, pending, workspaceId)
          : rows;
      };
      if (isOffline()) return cached();
      try {
        const result = isAdminPreview
          ? await supabase.rpc("list_workspace_client_important_dates_for_admin_preview", {
              target_workspace_id: targetWorkspaceId,
            })
          : await supabase
              .from("client_important_dates")
              .select("*")
              .order("event_date")
              .order("title");
        if (result.error) throw result.error;
        const rows = (result.data ?? []) as ClientImportantDate[];
        if (!workspaceId || isAdminPreview) return rows;
        return withPendingClientDates(rows, pending, workspaceId);
      } catch (error) {
        if (isNetworkFailure(error)) return cached();
        throw error;
      }
    },
    enabled: Boolean(user && workspaceId),
    refetchOnMount: "always",
  });
}
