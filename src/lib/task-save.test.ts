import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { persistTaskCollaborators, refreshTaskListsAfterSave } from "./task-save";

describe("task save round trips", () => {
  it("sends only deliberate membership changes in one request", async () => {
    const rpc = vi.fn().mockResolvedValue({ data: true, error: null });
    expect(await persistTaskCollaborators({ rpc } as any, "task", ["carol", "elo"], ["elo", "luiz"])).toBe(true);
    expect(rpc).toHaveBeenCalledExactlyOnceWith("apply_task_collaborator_changes", {
      p_task_id: "task", p_add: ["luiz"], p_remove: ["carol"],
    });
  });
  it("does not restore a concurrently removed unchanged collaborator", async () => {
    const rpc = vi.fn();
    expect(await persistTaskCollaborators({ rpc } as any, "task", ["carol"], ["carol"])).toBe(false);
    expect(rpc).not.toHaveBeenCalled();
  });
  it("propagates a failed transaction and accepts an already applied retry", async () => {
    const error = { message: "failed" };
    const rpc = vi.fn().mockResolvedValueOnce({ error }).mockResolvedValueOnce({ data: false });
    await expect(persistTaskCollaborators({ rpc } as any, "task", [], ["elo"])).rejects.toBe(error);
    expect(await persistTaskCollaborators({ rpc } as any, "task", [], ["elo"])).toBe(false);
  });
  it("does not wait for a list refresh after persistence or reject on its failure", async () => {
    const qc = new QueryClient();
    const invalidate = vi.spyOn(qc, "invalidateQueries").mockImplementationOnce(() => new Promise(() => {})).mockRejectedValue(new Error("network"));
    expect(refreshTaskListsAfterSave(qc)).toBeUndefined();
    expect(invalidate).toHaveBeenCalledTimes(3);
    await Promise.resolve(); await Promise.resolve();
  });
});
