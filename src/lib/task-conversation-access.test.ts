import { describe, expect, it } from "vitest";
import { canWriteCachedTaskConversation } from "./task-conversation-access";

describe("offline task conversation access", () => {
  const task = { id: "task-a", assignee_id: "owner", created_by: "creator" };
  const snapshot = {
    taskId: task.id,
    task,
    collaboratorTaskId: task.id,
    collaboratorIds: ["collaborator"],
    subtasks: [{ task_id: task.id, assignee_id: "designer" }],
  };

  it("keeps known participants able to queue comments offline", () => {
    for (const userId of ["owner", "creator", "collaborator", "designer"]) {
      expect(canWriteCachedTaskConversation({ ...snapshot, userId })).toBe(true);
    }
  });

  it("keeps team viewers and stale records in read-only mode", () => {
    expect(canWriteCachedTaskConversation({ ...snapshot, userId: "viewer" })).toBe(false);
    expect(canWriteCachedTaskConversation({ ...snapshot, userId: "collaborator", collaboratorTaskId: "other" })).toBe(false);
    expect(canWriteCachedTaskConversation({ ...snapshot, userId: "designer", taskId: "other" })).toBe(false);
  });
});
