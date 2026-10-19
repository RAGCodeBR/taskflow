import { describe, expect, it } from "vitest";
import {
  APP_UPDATES,
  formatAppUpdateDate,
  getVisibleAppUpdates,
} from "./app-updates";

describe("application release catalogue", () => {
  it("requires a unique version, date, explanation and preview for every release", () => {
    expect(APP_UPDATES).toHaveLength(18);
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

  it.each(["marketing", "consultoria"])(
    "uses the latest visible release as the version in %s",
    (workspace) => {
      const updates = getVisibleAppUpdates(false, workspace);
      expect(updates).toHaveLength(5);
      expect(updates.map((update) => update.id)).toEqual([
        "anexos-visiveis-nas-subtarefas-recolhidas-2026-10-19",
        "miniaturas-dos-arquivos-das-subtarefas-2026-10-19",
        "imagens-arrastadas-para-subtarefas-2026-10-19",
        "atualizacao-automatica-segura-2026-10-19",
        "prints-colados-nas-subtarefas-2026-10-19",
      ]);
      expect(updates[0].preview).toBe("subtask-attachment-indicator");
      expect(getVisibleAppUpdates(true, workspace)[0].id).toBe(
        "anexos-visiveis-nas-subtarefas-recolhidas-2026-10-19",
      );
      expect(updates.every((update) => update.audience === "all")).toBe(true);
    },
  );

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
