import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { useTaskReadUpdates } from "./use-task-read-updates";
import { readCardRelated } from "@/lib/task-card-reads";
import { isOffline } from "@/lib/offline-sync";

export function useTaskCardRelated(taskId: string) {
  const { user, activeWorkspace } = useAuth();
  useTaskReadUpdates();
  return useQuery({
    queryKey: ["task_card_related", user?.id ?? null, activeWorkspace?.id ?? null, taskId],
    enabled: !!user?.id,
    staleTime: 30_000,
    refetchInterval: () => isOffline() ? false : 60_000,
    queryFn: () => readCardRelated(`${user?.id}:${activeWorkspace?.id ?? ""}`, taskId),
  });
}
