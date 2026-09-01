export const MARKETING_MANAGER_EMAIL = "reinangrupoahouse@gmail.com";

/** A person can switch only when they actually belong to both environments. */
export function canSwitchTaskFlowEnvironment(workspaceCount: number) {
  return workspaceCount > 1;
}

/** Marketing permissions are centrally managed by the responsible account. */
export function canManageMarketingAccess(email?: string | null) {
  return email?.trim().toLowerCase() === MARKETING_MANAGER_EMAIL;
}
