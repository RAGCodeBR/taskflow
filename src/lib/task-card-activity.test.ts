import { describe, expect, it, vi } from "vitest";
import {
  mergeCardOpen,
  overlayPersonalPins,
  pendingPersonalPriorities,
  syncTaskCardActivity,
} from "./task-card-activity";
import type { OfflineOperation } from "./offline-sync";
import type { Task } from "@/hooks/use-data";

const operation = (pinned = true): OfflineOperation => ({
  id: "op",
  entity: "task_pin",
  action: "update",
  entityId: "task",
  userId: "me",
  payload: { pinned, changed_at: "2026-10-08T12:00:00Z" },
  attempts: 0,
  createdAt: "now",
});
describe("task card activity", () => {
  it("compares opening instants across different timestamp formats", () => {
    const rows = mergeCardOpen([], "task", "me", "2026-10-08T09:00:00-03:00");
    const next = mergeCardOpen(rows, "task", "me", "2026-10-08T11:00:00Z");
    expect(next[0].first_opened_at).toBe("2026-10-08T11:00:00Z");
    expect(next[0].last_opened_at).toBe("2026-10-08T09:00:00-03:00");
  });
  it("keeps the first opening while advancing the last, including out-of-order offline receipts", () => {
    let rows = mergeCardOpen([], "task", "me", "2026-10-08T12:00:00Z");
    rows = mergeCardOpen(rows, "task", "me", "2026-10-08T09:00:00Z");
    rows = mergeCardOpen(rows, "task", "me", "2026-10-08T13:00:00Z");
    expect(rows).toEqual([
      {
        task_id: "task",
        user_id: "me",
        first_opened_at: "2026-10-08T09:00:00Z",
        last_opened_at: "2026-10-08T13:00:00Z",
      },
    ]);
  });
  it("does not expose another person's pins and overlays queued pin/unpin actions", () => {
    const foreign = { task_id: "foreign", user_id: "other", is_pinned: true, changed_at: "now" };
    expect(overlayPersonalPins([foreign], [operation(), operation(false)], "me")).toEqual([
      { task_id: "task", user_id: "me", is_pinned: false, changed_at: "2026-10-08T12:00:00Z" },
    ]);
  });
  it("keeps pending pinned tasks irrespective of deadline, excluding completed, archived and deleted", () => {
    const tasks = [
      { id: "task", due_date: null },
      { id: "late", due_date: "2020-01-01" },
      { id: "future", due_date: "2030-01-01" },
      { id: "done", status: "done" },
      { id: "completed", completed_at: "now" },
      { id: "deleted", deleted_at: "now" },
      { id: "archived", archived_at: "now" },
      { id: "unfixed" },
    ] as unknown as Task[];
    const pins = tasks
      .slice(0, -1)
      .map((task) => ({ task_id: task.id, user_id: "me", is_pinned: true, changed_at: "now" }));
    expect(pendingPersonalPriorities(tasks, pins).map((task) => task.id)).toEqual([
      "task",
      "late",
      "future",
    ]);
  });
  it("syncs only the caller's pin and never writes task fields or another user's identity", async () => {
    const rpc = vi.fn(async () => ({ error: null }));
    await syncTaskCardActivity({ rpc }, operation());
    expect(rpc).toHaveBeenCalledWith("set_task_personal_pin", {
      target_task_id: "task",
      pinned: true,
      changed_at: "2026-10-08T12:00:00Z",
    });
    await syncTaskCardActivity(
      { rpc },
      { ...operation(), entity: "task_open", payload: { opened_at: "2026-10-08T11:00:00Z" } },
    );
    expect(rpc).toHaveBeenLastCalledWith("record_task_card_open", {
      target_task_id: "task",
      opened_at: "2026-10-08T11:00:00Z",
    });
  });
  it("retains failed operations for retry and rejects invalid timestamps", async () => {
    const rpc = vi.fn(async () => ({ error: new Error("network failure") }));
    await expect(syncTaskCardActivity({ rpc }, operation())).rejects.toThrow("network failure");
    await expect(
      syncTaskCardActivity(
        { rpc },
        { ...operation(), payload: { pinned: true, changed_at: "invalid" } },
      ),
    ).rejects.toThrow("inválido");
    expect(rpc).toHaveBeenCalledTimes(1);
  });
});
