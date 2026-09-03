import { describe, expect, it } from "vitest";
import { isTaskFromAnotherWorkspace, splitTasksByWorkspace } from "./workspace-tasks";

const CONSULTORIA = "11111111-1111-1111-1111-111111111111";
const MARKETING = "22222222-2222-2222-2222-222222222222";

const task = (id: string, workspace_id: string | null) => ({ id, workspace_id });

describe("isTaskFromAnotherWorkspace", () => {
  it("reconhece a tarefa que veio do outro ambiente", () => {
    expect(isTaskFromAnotherWorkspace(task("a", CONSULTORIA), MARKETING)).toBe(true);
  });

  it("não marca a tarefa do próprio ambiente", () => {
    expect(isTaskFromAnotherWorkspace(task("a", MARKETING), MARKETING)).toBe(false);
  });

  it("na dúvida trata como local: sem ambiente ativo", () => {
    expect(isTaskFromAnotherWorkspace(task("a", CONSULTORIA), null)).toBe(false);
  });

  it("na dúvida trata como local: linha antiga sem workspace_id", () => {
    expect(isTaskFromAnotherWorkspace(task("a", null), MARKETING)).toBe(false);
    // Linha vinda de um select que nem trouxe a coluna.
    const semCampo: { id: string; workspace_id?: string | null } = { id: "a" };
    expect(isTaskFromAnotherWorkspace(semCampo, MARKETING)).toBe(false);
  });
});

describe("splitTasksByWorkspace", () => {
  it("separa os dois lados preservando a ordem de cada um", () => {
    const tasks = [
      task("m1", MARKETING),
      task("c1", CONSULTORIA),
      task("m2", MARKETING),
      task("c2", CONSULTORIA),
    ];
    const { own, shared } = splitTasksByWorkspace(tasks, MARKETING);
    expect(own.map((t) => t.id)).toEqual(["m1", "m2"]);
    expect(shared.map((t) => t.id)).toEqual(["c1", "c2"]);
  });

  it("sem ambiente ativo, nada é tratado como compartilhado", () => {
    const tasks = [task("m1", MARKETING), task("c1", CONSULTORIA)];
    const { own, shared } = splitTasksByWorkspace(tasks, null);
    expect(own).toHaveLength(2);
    expect(shared).toEqual([]);
  });

  it("lista vazia não quebra", () => {
    expect(splitTasksByWorkspace([], MARKETING)).toEqual({ own: [], shared: [] });
  });
});
