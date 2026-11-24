export type PendingAppUpdate = { id: string; attempts: number; automatic?: boolean };

const MAX_AUTO_UPDATE_ATTEMPTS = 8;

/**
 * `alsoLoaded`: outras versões que o código carregado já contém. No celular a
 * novidade mais recente pode ser só do celular e não estar no índice público,
 * que é o que gerou o pedido de atualização.
 */
export function advancePendingAppUpdate(pending: PendingAppUpdate, loadedVersion: string, alsoLoaded: readonly string[] = []) {
  if (pending.id === loadedVersion || alsoLoaded.includes(pending.id)) return { status: "confirmed" as const };
  if (pending.attempts >= MAX_AUTO_UPDATE_ATTEMPTS) return { status: "exhausted" as const };
  return {
    status: "retry" as const,
    pending: { ...pending, attempts: pending.attempts + 1 },
  };
}
