import { describe, expect, it } from "vitest";
import type { Task } from "@/hooks/use-data";
import type { OfflineOperation } from "./offline-sync";
import { overlayPendingSubtasks, overlayPendingTaskOperations } from "./offline-task-overlay";

const task = (id: string, title: string) => ({ id, title }) as Task;
const operation = (
  entityId: string,
  action: OfflineOperation["action"],
  payload: OfflineOperation["payload"],
): OfflineOperation => ({
  id: `operation-${entityId}-${action}`,
  userId: "user-1",
  entity: "task",
  action,
  entityId,
  payload,
  createdAt: new Date().toISOString(),
  attempts: 0,
});

describe("pending task overlay", () => {
  it("keeps an offline creation visible before the server confirms it", () => {
    const pending = task("local-1", "Tarefa offline");

    expect(
      overlayPendingTaskOperations([], [operation(pending.id, "create", { task: pending })]),
    ).toEqual([pending]);
  });

  it("applies pending edits and removals over the server response", () => {
    const result = overlayPendingTaskOperations(
      [task("one", "Original"), task("two", "Excluir")],
      [
        operation("one", "update", { patch: { title: "Editada offline" } }),
        operation("two", "delete", { task: task("two", "Excluir") }),
      ],
    );

    expect(result).toEqual([task("one", "Editada offline")]);
  });

  it("hides a pending creation that was moved to trash before synchronization", () => {
    const pending = task("local-1", "Tarefa offline");
    const result = overlayPendingTaskOperations(
      [],
      [
        operation(pending.id, "create", { task: pending }),
        operation(pending.id, "update", {
          patch: { deleted_at: "2026-09-16T21:00:00.000Z" },
        }),
      ],
    );

    expect(result).toEqual([]);
  });
});

it("keeps offline tasks and subtasks scoped through a reconnect", () => {
  const card = { ...task("parent", "Rascunho"), workspace_id: "marketing" };
  const create = operation(card.id, "create", { task: card });
  expect(overlayPendingTaskOperations([], [create], "consultoria")).toEqual([]);
  expect(overlayPendingTaskOperations([], [create], "marketing")).toEqual([card]);
  const subtask = { id: "one", task_id: card.id, title: "Arte", done: false };
  const operations = [
    { ...operation("one", "create", { subtask, workspaceId: "marketing" }), entity: "subtask" as const },
    { ...operation("one", "update", { patch: { done: true } }), entity: "subtask" as const },
  ];
  expect(overlayPendingSubtasks([], operations, new Set(), "consultoria")).toEqual([]);
  expect(overlayPendingSubtasks([], operations, new Set(), "marketing")).toEqual([
    { ...subtask, done: true, completed_at: operations[1].createdAt },
  ]);
});

it("keeps another card's pending subtasks out of the open task", () => {
  const operations = ["first", "second"].map((parent) => ({
    ...operation(parent, "create", {
      subtask: { id: parent, task_id: parent, title: "Briefing" },
      workspaceId: "marketing",
    }),
    entity: "subtask" as const,
  }));
  expect(overlayPendingSubtasks([], operations, new Set(["first"])).map((row) => row.task_id)).toEqual(["first"]);
  expect(overlayPendingSubtasks([], operations, new Set(), "marketing")).toHaveLength(2);
});
