import { useAuth } from "@/hooks/use-auth";
import { teamTaskVisibilityWorkspace } from "@/lib/team-task-visibility";

export function useTeamTaskVisibility() {
  const { isCollaborator, isClient, activeWorkspace } = useAuth();
  return teamTaskVisibilityWorkspace({ isCollaborator, isClient, workspace: activeWorkspace });
}
