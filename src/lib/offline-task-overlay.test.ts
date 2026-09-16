import { describe, expect, it } from "vitest";
import type { Task } from "@/hooks/use-data";
import type { OfflineOperation } from "./offline-sync";
import { overlayPendingTaskOperations } from "./offline-task-overlay";

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
});
