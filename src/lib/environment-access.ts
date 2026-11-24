export const MARKETING_MANAGER_EMAIL = "reinangrupoahouse@gmail.com";

/** A person can switch only when they actually belong to both environments. */
export function canSwitchTaskFlowEnvironment(workspaceCount: number) {
  return workspaceCount > 1;
}

/** Marketing permissions are centrally managed by the responsible account. */
export function canManageMarketingAccess(email?: string | null) {
  return email?.trim().toLowerCase() === MARKETING_MANAGER_EMAIL;
}

/** Everyone in Marketing sees the new workflow; only Reinan sees it in Consultoria. */
export function hasMarketingTaskExperience(workspaceSlug?: string | null, email?: string | null) {
  return workspaceSlug === "marketing" ||
    (workspaceSlug === "consultoria" && canManageMarketingAccess(email));
}

/** New tasks open in the interface of the current environment, even when sent elsewhere. */
export function usesSidePanelForTaskEditor({
  activeWorkspace, targetWorkspace, editing, email,
}: {
  activeWorkspace?: string | null;
  targetWorkspace?: string | null;
  editing: boolean;
  email?: string | null;
}) {
  const workspace = editing ? targetWorkspace : activeWorkspace ?? targetWorkspace;
  return hasMarketingTaskExperience(workspace, email);
}
