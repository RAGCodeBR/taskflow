import { describe, expect, it } from "vitest";
import type { OfflineOperation } from "./offline-sync";
import { groupSubtaskAttachments } from "./subtask-attachment-groups";

const operation = (partial: Partial<OfflineOperation>): OfflineOperation => ({
  id: crypto.randomUUID(),
  userId: "person",
  entity: "attachment",
  action: "create",
  entityId: "local",
  payload: {},
  createdAt: "2026-10-19T12:00:00Z",
  attempts: 0,
  ...partial,
});

describe("subtask attachment counts", () => {
  it("includes local uploads, ignores duplicates and hides pending deletions", () => {
    const grouped = groupSubtaskAttachments(
      ["first", "second"],
      [{ id: "saved", subtask_id: "first" }, { id: "deleted", subtask_id: "first" }],
      [
        operation({ payload: { table: "subtask_attachments", attachment: { id: "local", subtask_id: "first" } } }),
        operation({ entityId: "saved", payload: { table: "subtask_attachments", attachment: { id: "saved", subtask_id: "first" } } }),
        operation({ entity: "record", action: "delete", entityId: "deleted", payload: { table: "subtask_attachments" } }),
      ],
    );
    expect(grouped.first.map((file) => file.id)).toEqual(["saved", "local"]);
    expect(grouped.second).toEqual([]);
  });
});
