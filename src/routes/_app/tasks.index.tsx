import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { preferredTaskView } from "@/lib/task-view-preference";

export const Route = createFileRoute("/_app/tasks/")({
  component: TasksIndex,
});

function TasksIndex() {
  const { user, activeWorkspace, loading } = useAuth();
  if (loading) return null;
  const view = preferredTaskView(user?.id, activeWorkspace?.id);
  return <Navigate to={`/tasks/${view}`} replace />;
}
