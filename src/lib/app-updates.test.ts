import { describe, expect, it } from "vitest";
import {
  APP_UPDATES,
  formatAppUpdateDate,
  getVisibleAppUpdates,
} from "./app-updates";

describe("application release catalogue", () => {
  it("requires a unique version, date, explanation and preview for every release", () => {
    expect(APP_UPDATES).toHaveLength(26);
    expect(new Set(APP_UPDATES.map((update) => update.id)).size).toBe(APP_UPDATES.length);
    for (const update of APP_UPDATES) {
      expect(update.id.trim()).not.toBe("");
      expect(update.title.trim()).not.toBe("");
      expect(update.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(`${update.date}T12:00:00`).toISOString().slice(0, 10)).toBe(update.date);
      expect(update.preview).toBeTruthy();
      expect(update.details.length).toBeGreaterThan(0);
      expect(update.details.every((detail) => detail.trim().length > 0)).toBe(true);
      expect(update.workspaces.length).toBeGreaterThan(0);
    }
    const dates = APP_UPDATES.map((update) => update.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("shows the new editor to Marketing users and Reinan in Consultoria", () => {
    const marketing = getVisibleAppUpdates(false, "marketing");
    const consultoria = getVisibleAppUpdates(false, "consultoria");
    const ownerMarketing = getVisibleAppUpdates(true, "marketing", "reinangrupoahouse@gmail.com");
    const ownerConsultoria = getVisibleAppUpdates(true, "consultoria", "reinangrupoahouse@gmail.com");
    expect(marketing).toHaveLength(5);
    expect(consultoria).toHaveLength(5);
    expect(marketing[0].id).toBe("titulos-legiveis-nos-cards-de-tarefas-2026-10-30");
    expect(consultoria[0].id).toBe(marketing[0].id);
    expect(marketing.some((update) => update.id === "painel-lateral-de-criacao-marketing-2026-10-22")).toBe(true);
    expect(consultoria.some((update) => update.id === "painel-lateral-de-criacao-marketing-2026-10-22")).toBe(false);
    expect(ownerMarketing.some((update) => update.id === "painel-lateral-de-criacao-marketing-2026-10-22")).toBe(true);
    expect(ownerConsultoria.some((update) => update.id === "painel-de-tarefas-consultoria-reinan-2026-10-22")).toBe(true);
  });

  it("removes older history entries from the release catalogue", () => {
    expect(APP_UPDATES.some((update) => update.date < "2026-10-14")).toBe(false);
  });

  it("does not show notices outside a permitted workspace", () => {
    expect(getVisibleAppUpdates(true, "unknown")).toEqual([]);
    expect(getVisibleAppUpdates(true)).toEqual([]);
  });

  it("formats the published day in Portuguese without UTC date-only parsing", () => {
    expect(formatAppUpdateDate("2026-10-07")).toBe("07 de outubro de 2026");
  });
});
