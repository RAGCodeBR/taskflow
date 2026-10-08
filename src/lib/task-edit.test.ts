import { describe, expect, it, vi } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import type { Task } from "@/hooks/use-data";
import { persistTaskEdit, taskEditError, taskEditPatch } from "./task-edit";

const task = {
  id: "task",
  title: "Campanha",
  description: "Texto original",
  status: "review",
  status_id: "review-status",
  due_date: "2026-10-13T15:00:00Z",
  due_time: "10:30:00",
  completed_at: null,
  created_by: "another-user",
} as Task;

describe("task edits by participants", () => {
  it("does not resend the loaded deadline or status when only the description changes", () => {
    expect(
      taskEditPatch(task, {
        title: task.title,
        description: "Novo texto",
        status: task.status,
        status_id: "first-open-status",
        due_date: "2026-10-13T15:00:00.000Z",
        due_time: "10:30",
        completed_at: null,
      }),
    ).toEqual({ description: "Novo texto" });
  });

  it("allows changing or clearing a deadline without resending a loaded description", () => {
    expect(
      taskEditPatch(task, { description: task.description, due_date: "2026-10-12T15:00:00Z" }),
    ).toEqual({ due_date: "2026-10-12T15:00:00Z" });
    expect(taskEditPatch(task, { due_date: null })).toEqual({ due_date: null });
    expect(taskEditPatch(task, { description: null })).toEqual({ description: null });
  });

  it("preserves completion time unless its date or completion status actually changes", () => {
    const completed = { ...task, status: "done", completed_at: "2026-10-12T13:00:00Z" } as Task;
    expect(
      taskEditPatch(completed, {
        status: "done",
        status_id: "first-completed",
        completed_at: "2026-10-12T15:00:00Z",
      }),
    ).toEqual({});
    expect(
      taskEditPatch(completed, { status: "todo", status_id: "open", completed_at: null }),
    ).toEqual({ status: "todo", status_id: "open", completed_at: null });
  });

  it("never produces an empty error notice", () => {
    for (const error of [null, {}, { message: "" }, { message: "  " }, new Error("")]) {
      expect(taskEditError(error).trim().length).toBeGreaterThan(0);
    }
    expect(taskEditError({ message: "Acesso negado" })).toBe("Acesso negado");
  });

  function client(data: Task | null, error: unknown = null) {
    const builder = {
      update: vi.fn(() => builder),
      eq: vi.fn(() => builder),
      select: vi.fn(() => builder),
      single: vi.fn(async () => ({ data, error })),
    };
    return { from: vi.fn(() => builder) } as unknown as Parameters<typeof persistTaskEdit>[0];
  }

  it("refreshes every existing scoped list with the confirmed row", async () => {
    const qc = new QueryClient();
    const key = ["tasks", "participant", "marketing", null];
    const other = { ...task, id: "unrelated" };
    qc.setQueryData(key, [task, other]);
    qc.setQueryData(["tasks", "another-scope"], [task]);
    const saved = { ...task, description: "Salvo", due_date: "2026-10-12T15:00:00Z" };
    await persistTaskEdit(client(saved), task.id, { description: "Salvo" }, qc);
    expect(qc.getQueryData(key)).toEqual([saved, other]);
    expect(qc.getQueryData(["tasks", "another-scope"])).toEqual([saved]);
    expect(qc.getQueryData(["tasks"])).toBeUndefined();
  });

  it.each([null, { ...task, id: "wrong-task" }])(
    "does not confirm a save without the expected row",
    async (data) => {
      const qc = new QueryClient();
      qc.setQueryData(["tasks", "participant"], [task]);
      await expect(
        persistTaskEdit(client(data), task.id, { description: "Não salvo" }, qc),
      ).rejects.toThrow("não foi confirmada");
      expect(qc.getQueryData(["tasks", "participant"])).toEqual([task]);
    },
  );
});
