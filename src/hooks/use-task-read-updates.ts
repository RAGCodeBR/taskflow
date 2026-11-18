import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { subscribeTaskReadUpdates } from "@/lib/task-read-updates";

export function useTaskReadUpdates() {
  const qc = useQueryClient();
  const { user, activeWorkspace } = useAuth();
  useEffect(() => {
    if (!user?.id) return;
    return subscribeTaskReadUpdates(qc, user.id, activeWorkspace?.id ?? null);
  }, [qc, user?.id, activeWorkspace?.id]);
}
