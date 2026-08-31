const ENVIRONMENT_SWITCHER_EMAIL = "reinangrupoahouse@gmail.com";

/**
 * Environment switching is temporarily restricted while the Marketing area is
 * being configured. Keeping the check in one place prevents the selector from
 * appearing in one navigation surface while remaining reachable in another.
 */
export function canSwitchTaskFlowEnvironment(email?: string | null) {
  return email?.trim().toLowerCase() === ENVIRONMENT_SWITCHER_EMAIL;
}
