import { describe, expect, it } from "vitest";
import {
  APP_UPDATES,
  formatAppUpdateDate,
  getVisibleAppUpdates,
} from "./app-updates";

describe("application release catalogue", () => {
  it("requires a unique version, date, explanation and preview for every release", () => {
    expect(APP_UPDATES).toHaveLength(35);
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
    expect(marketing[0].id).toBe("subtarefa-salvar-e-voltar-para-a-tarefa-2026-11-19");
    // A volta para a tarefa fica no painel de subtarefas do Marketing.
    expect(consultoria[0].id).toBe("salvar-tarefas-com-menos-espera-2026-11-18");
    expect(consultoria.some((update) => update.id === marketing[0].id)).toBe(false);
    expect(APP_UPDATES.find((update) => update.id === "painel-lateral-de-criacao-marketing-2026-10-22")?.workspaces).toContain("marketing");
    expect(consultoria.some((update) => update.id === "painel-lateral-de-criacao-marketing-2026-10-22")).toBe(false);
    expect(ownerMarketing[0].id).toBe(marketing[0].id);
    // This older private release is now outside the five most recent updates.
    expect(ownerMarketing).toHaveLength(5);
    expect(marketing.some((update) => update.id === "whatsapp-varias-conversas-2026-11-10")).toBe(false);
    expect(ownerConsultoria).toHaveLength(5);
    expect(APP_UPDATES.find((update) => update.id === "whatsapp-varias-conversas-2026-11-10")?.audience).toBe("owner");
    expect(consultoria.some((update) => update.audience === "owner")).toBe(false);
    expect(APP_UPDATES.find((update) => update.id === "painel-de-tarefas-consultoria-reinan-2026-10-22")?.audience).toBe("owner");
  });

  it("shows a recent private release only to the owner in each permitted workspace", () => {
    const releases = APP_UPDATES as unknown as Array<(typeof APP_UPDATES)[number]>;
    const privateRelease = APP_UPDATES.find((update) => update.id === "whatsapp-varias-conversas-2026-11-10")!;
    releases.unshift(privateRelease);
    try {
      for (const workspace of ["marketing", "consultoria"]) {
        expect(getVisibleAppUpdates(true, workspace, "reinangrupoahouse@gmail.com")[0]).toBe(privateRelease);
        expect(getVisibleAppUpdates(true, workspace, "other@example.com").some((update) => update.id === privateRelease.id)).toBe(false);
        expect(getVisibleAppUpdates(false, workspace).some((update) => update.id === privateRelease.id)).toBe(false);
      }
    } finally { releases.shift(); }
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
