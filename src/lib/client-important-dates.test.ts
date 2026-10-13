import { describe, expect, it } from "vitest";
import type { OfflineOperation } from "./offline-sync";
import type { ClientImportantDate } from "@/hooks/use-client-important-dates";
import { isClientDatesSchemaMissing, withPendingClientDates } from "./client-important-dates";

const record: ClientImportantDate = {
  id: "date-1",
  client_id: "client-1",
  title: "Aniversário",
  event_date: "2026-10-18",
  recurrence: "annual",
  created_at: "2026-10-13T00:00:00Z",
  updated_at: "2026-10-13T00:00:00Z",
};

function operation(
  action: OfflineOperation["action"],
  payload: Record<string, unknown>,
): OfflineOperation {
  return {
    id: crypto.randomUUID(),
    userId: "user-1",
    entity: "record",
    action,
    entityId: record.id,
    payload: { table: "client_important_dates", workspaceId: "marketing", ...payload },
    createdAt: "",
    attempts: 0,
  };
}

describe("pending client dates", () => {
  it("distinguishes a missing migration from a connection problem", () => {
    expect(
      isClientDatesSchemaMissing({
        code: "PGRST205",
        message: "Could not find the table 'public.client_important_dates' in the schema cache",
      }),
    ).toBe(true);
    expect(isClientDatesSchemaMissing(new TypeError("Failed to fetch"))).toBe(false);
  });
  it("retains an offline creation and edit while the server still has no row", () => {
    const pending = [
      operation("create", { record }),
      operation("update", { patch: { title: "Aniversário revisado" } }),
    ];
    expect(withPendingClientDates([], pending, "marketing")[0].title).toBe("Aniversário revisado");
    expect(withPendingClientDates([], pending, "consultoria")).toEqual([]);
  });

  it("keeps an offline deletion hidden until the server catches up", () => {
    expect(withPendingClientDates([record], [operation("delete", {})], "marketing")).toEqual([]);
  });
});
