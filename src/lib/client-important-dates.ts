import type { ClientImportantDate } from "@/hooks/use-client-important-dates";
import type { OfflineOperation } from "@/lib/offline-sync";

export function isClientDatesSchemaMissing(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const { code, message } = error as { code?: unknown; message?: unknown };
  return (
    code === "PGRST205" ||
    code === "42P01" ||
    (typeof message === "string" &&
      /client_important_dates.*(schema cache|does not exist)|table 'public\.client_important_dates' not found/i.test(
        message,
      ))
  );
}

/** Keep unsynced local changes visible during offline reads and reconnection. */
export function withPendingClientDates(
  serverDates: ClientImportantDate[],
  operations: readonly OfflineOperation[],
  workspaceId: string,
): ClientImportantDate[] {
  const byId = new Map(serverDates.map((date) => [date.id, date]));
  for (const operation of operations) {
    if (
      operation.entity !== "record" ||
      operation.payload.table !== "client_important_dates" ||
      operation.payload.workspaceId !== workspaceId
    )
      continue;

    if (operation.action === "delete") {
      byId.delete(operation.entityId);
    } else if (operation.action === "create") {
      const record = operation.payload.record as ClientImportantDate;
      if (record?.id) byId.set(record.id, record);
    } else {
      const current = byId.get(operation.entityId);
      if (current)
        byId.set(operation.entityId, {
          ...current,
          ...(operation.payload.patch as Partial<ClientImportantDate>),
        });
    }
  }
  return [...byId.values()].sort(
    (a, b) => a.event_date.localeCompare(b.event_date) || a.title.localeCompare(b.title),
  );
}
