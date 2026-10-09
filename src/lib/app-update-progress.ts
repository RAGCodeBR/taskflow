export type PendingAppUpdate = { id: string; attempts: number };

const MAX_AUTO_UPDATE_ATTEMPTS = 8;

export function advancePendingAppUpdate(pending: PendingAppUpdate, loadedVersion: string) {
  if (pending.id === loadedVersion) return { status: "confirmed" as const };
  if (pending.attempts >= MAX_AUTO_UPDATE_ATTEMPTS) return { status: "exhausted" as const };
  return {
    status: "retry" as const,
    pending: { ...pending, attempts: pending.attempts + 1 },
  };
}
