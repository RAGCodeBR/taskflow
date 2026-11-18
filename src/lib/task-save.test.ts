import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { persistTaskCollaborators, refreshTaskListsAfterSave } from "./task-save";

function fixture(current: string[], failure: unknown = null) {
  const select = vi.fn(() => ({ eq: vi.fn(async () => ({ data: current.map((collaborator_id) => ({ collaborator_id })), error: failure })) }));
  const remove = vi.fn(() => ({ eq: vi.fn(() => ({ in: vi.fn(async (_field, ids) => { deleted.push(...ids); return { error: failure }; }) })) }));
  const inserted: unknown[] = [], deleted: string[] = [];
  const insert = vi.fn(async (rows) => { inserted.push(...rows); return { error: failure }; });
  const client = { from: vi.fn(() => ({ select, delete: remove, insert })) };
  return { client: client as any, select, remove, insert, inserted, deleted };
}
describe("task save round trips", () => {
  it("skips reads and writes for unchanged collaborators, including empty new tasks", async () => {
    const f = fixture(["carol", "concurrent"]);
    expect(await persistTaskCollaborators(f.client, "task", "actor", ["carol"], ["carol"])).toBe(false);
    expect(await persistTaskCollaborators(f.client, "new", "actor", [], [])).toBe(false);
    expect(f.client.from).not.toHaveBeenCalled();
  });
  it("merges deliberate edits without removing people added concurrently", async () => {
    const f = fixture(["carol", "eloisa", "concurrent"]);
    expect(await persistTaskCollaborators(f.client, "task", "actor", ["carol", "eloisa"], ["eloisa", "luiz"])).toBe(true);
    expect(f.deleted).toEqual(["carol"]);
    expect(f.inserted).toEqual([{ task_id: "task", collaborator_id: "luiz", added_by: "actor" }]);
    expect(f.select).toHaveBeenCalledTimes(1);
  });
  it("supports removing collaborators already saved in a new draft", async () => {
    const f = fixture(["carol", "concurrent"]);
    await persistTaskCollaborators(f.client, "draft", "actor", ["carol"], []);
    expect(f.deleted).toEqual(["carol"]);
  });
  it("does not re-add unchanged links removed by someone else", async () => {
    const f = fixture([]);
    await persistTaskCollaborators(f.client, "task", "actor", ["carol"], ["carol"]);
    expect(f.insert).not.toHaveBeenCalled();
  });
  it("propagates a participant-read failure instead of announcing success", async () => {
    const failure = { message: "denied" }, f = fixture([], failure);
    await expect(persistTaskCollaborators(f.client, "task", "actor", [], ["carol"])).rejects.toBe(failure);
    expect(f.insert).not.toHaveBeenCalled();
  });
  it("does not wait for a list refresh after persistence or reject on its failure", async () => {
    const qc = new QueryClient();
    const invalidate = vi.spyOn(qc, "invalidateQueries").mockImplementationOnce(() => new Promise(() => {})).mockRejectedValue(new Error("network"));
    expect(refreshTaskListsAfterSave(qc)).toBeUndefined();
    expect(invalidate).toHaveBeenCalledTimes(3);
    await Promise.resolve(); await Promise.resolve();
  });
});
