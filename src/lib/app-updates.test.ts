import { describe, expect, it } from "vitest";
import {
  APP_UPDATES,
  DASHBOARD_UPDATE_VERSION,
  formatAppUpdateDate,
  getVisibleAppUpdates,
} from "./app-updates";

describe("application release catalogue", () => {
  it("requires a unique version, date, explanation and preview for every release", () => {
    expect(APP_UPDATES.length).toBeGreaterThan(0);
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
      expect(updates[0].id).toBe("prazos-individuais-subtarefas-calendario-2026-10-09");
      expect(updates[0].preview).toBe("calendar-subtask-dates");
      expect(updates.every((update) => update.audience === "all")).toBe(true);
      expect(updates.some((update) => update.id === DASHBOARD_UPDATE_VERSION)).toBe(false);
      expect(
        getVisibleAppUpdates(true, workspace).some(
          (update) => update.id === DASHBOARD_UPDATE_VERSION,
        ),
      ).toBe(true);
    },
  );

  it("keeps past versions and their acknowledgement identifiers", () => {
    expect(APP_UPDATES.map((update) => update.id)).toContain(
      "links-clicaveis-calendario-tarefas-2026-10-06-r2",
    );
    expect(APP_UPDATES.map((update) => update.id)).toContain(
      "prints-organizados-em-arquivos-2026-10-02",
    );
    expect(APP_UPDATES.map((update) => update.id)).toContain(DASHBOARD_UPDATE_VERSION);
  });

  it("does not show notices outside a permitted workspace", () => {
    expect(getVisibleAppUpdates(true, "unknown")).toEqual([]);
    expect(getVisibleAppUpdates(true)).toEqual([]);
  });

  it("formats the published day in Portuguese without UTC date-only parsing", () => {
    expect(formatAppUpdateDate("2026-10-07")).toBe("07 de outubro de 2026");
  });
});
