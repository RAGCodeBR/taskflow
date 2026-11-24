import { describe, expect, it } from "vitest";
import { buildQuickTask } from "./quick-task";
import { tasksOnDay } from "./mobile-task-groups";

const input = {
  id: "task-1",
  title: "  Ligar para o cliente  ",
  clientId: "client-1",
  assigneeId: "user-2",
  dueDate: "2026-11-24",
  columnId: "col-1",
  statusId: "status-open",
  workspaceId: "ws-1",
  userId: "user-1",
  now: "2026-11-24T15:00:00.000Z",
};

describe("buildQuickTask", () => {
  it("trims the title and carries the chosen fields", () => {
    const task = buildQuickTask(input);
    expect(task).toMatchObject({
      id: "task-1",
      title: "Ligar para o cliente",
      client_id: "client-1",
      assignee_id: "user-2",
      column_id: "col-1",
      status_id: "status-open",
      workspace_id: "ws-1",
      created_by: "user-1",
      status: "todo",
      priority: "medium",
      is_draft: false,
      completed_at: null,
      deleted_at: null,
    });
  });

  it("rejects an empty title", () => {
    expect(() => buildQuickTask({ ...input, title: "   " })).toThrow("Informe o título");
  });

  it("stores the due date at the default deadline time so the calendar shows it on that day", () => {
    const task = buildQuickTask(input);
    expect(tasksOnDay([task], new Date("2026-11-24T12:00:00-03:00"))).toHaveLength(1);
  });

  it("requires a due date, like the full task form", () => {
    expect(() => buildQuickTask({ ...input, dueDate: null })).toThrow("Defina um prazo");
    expect(() => buildQuickTask({ ...input, dueDate: "" })).toThrow("Defina um prazo");
  });
});
