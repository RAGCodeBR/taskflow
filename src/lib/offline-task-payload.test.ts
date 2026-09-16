import { describe, expect, it } from "vitest";
import { taskCreatePayloadForSync } from "./offline-task-payload";

describe("offline task create payload", () => {
  it("removes client-only and unapplied schema fields before synchronization", () => {
    expect(
      taskCreatePayloadForSync({
        id: "task-1",
        title: "Nova tarefa",
        assigned_by: null,
        assigned_at: null,
        temporary_ui_state: true,
        workspace_id: "workspace-1",
      }),
    ).toEqual({
      id: "task-1",
      title: "Nova tarefa",
      workspace_id: "workspace-1",
    });
  });
});
