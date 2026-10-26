import { useAuth } from "@/hooks/use-auth";
import { teamTaskVisibilityWorkspace } from "@/lib/team-task-visibility";

export function useTeamTaskVisibility() {
  const { isAdmin, isCollaborator, isClient, activeWorkspace } = useAuth();
  return teamTaskVisibilityWorkspace({ isAdmin, isCollaborator, isClient, workspace: activeWorkspace });
}
