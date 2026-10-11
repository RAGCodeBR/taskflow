import { describe, expect, it } from "vitest";
import type { Client, Profile, Subtask, Task } from "@/hooks/use-data";
import { dashboardTaskOpenMode, getClientDemand, getMemberDashboard, getTeamSummaryActivities } from "./member-dashboard";

const task = (id: string, assignee: string | null, completedAt: string | null = null): Task => ({
  id,
  title: `Tarefa ${id}`,
  description: null,
  status: completedAt ? "done" : "todo",
  status_id: null,
  priority: null,
  due_date: null,
  due_time: null,
  assignee_id: assignee,
  assigned_by: null,
  assigned_at: null,
  client_id: null,
  column_id: null,
  position: 0,
  color: null,
  completed_at: completedAt,
  created_by: null,
  tag_id: null,
  objective_id: null,
  deleted_at: null,
  deleted_by: null,
  archived_at: null,
  archived_reason: null,
  created_at: "2026-10-01T00:00:00Z",
  updated_at: "2026-10-01T00:00:00Z",
  card_width: null,
});
const subtask = (
  id: string,
  taskId: string,
  assignee: string,
  done: boolean,
  completedAt: string | null = null,
): Subtask => ({
  id,
  task_id: taskId,
  title: `Subtarefa ${id}`,
  done,
  position: 0,
  assignee_id: assignee,
  due_date: null,
  completed_at: completedAt,
});
const profile = (id: string, name: string): Profile => ({
  id,
  full_name: name,
  email: null,
  avatar_url: null,
});
const client = { id: "client-a", name: "Cliente A" } as Client;

describe("collaborator dashboard overview", () => {
  it("opens a local preview only for visible Marketing collaborator tasks", () => {
    const visibleIds = new Set(["marketing-task"]);
    const marketing = { isAdmin: false, isCollaborator: true, isClient: false, workspaceSlug: "marketing" };
    expect(dashboardTaskOpenMode("marketing-task", visibleIds, marketing)).toBe("preview");
    expect(dashboardTaskOpenMode("other-workspace", visibleIds, marketing)).toBe("ignore");
    expect(dashboardTaskOpenMode("marketing-task", visibleIds, { ...marketing, workspaceSlug: "consultoria" })).toBe("navigate");
    expect(dashboardTaskOpenMode("marketing-task", visibleIds, { ...marketing, isAdmin: true })).toBe("navigate");
  });

  it("credits main tasks and subtasks to their respective assignees", () => {
    const overview = getMemberDashboard(
      [task("a", "ana", "2026-10-10T15:00:00Z"), task("b", "ana")],
      [subtask("one", "a", "bia", true, "2026-10-11T09:00:00Z"), subtask("two", "b", "bia", false)],
      [profile("ana", "Ana"), profile("bia", "Bia")],
    );
    expect(overview.members).toEqual([
      { id: "ana", name: "Ana", tasksOpen: 1, tasksDone: 1, subtasksOpen: 0, subtasksDone: 0 },
      { id: "bia", name: "Bia", tasksOpen: 0, tasksDone: 0, subtasksOpen: 1, subtasksDone: 1 },
    ]);
    expect(
      overview.recentCompletions.map((item) => [item.kind, item.personName, item.taskId]),
    ).toEqual([
      ["subtask", "Bia", "a"],
      ["task", "Ana", "a"],
    ]);
  });

  it("ignores subtasks whose parent is outside the visible workspace", () => {
    const overview = getMemberDashboard(
      [task("visible", null)],
      [subtask("hidden", "other-workspace", "ana", true, "2026-10-11T09:00:00Z")],
      [profile("ana", "Ana")],
    );
    expect(overview.subtasksDone).toBe(0);
    expect(overview.members).toEqual([]);
    expect(overview.recentCompletions).toEqual([]);
  });

  it("groups parent cards and children by client while attributing each to its own assignee", () => {
    const parent = { ...task("a", "ana"), client_id: client.id };
    const second = { ...task("b", "bia"), client_id: client.id };
    const children = [
      subtask("one", "a", "bia", false),
      subtask("two", "a", "ana", true),
      subtask("hidden", "other-workspace", "bia", true),
    ];
    const everyone = getClientDemand([parent, second], children, [client]);
    expect(everyone).toMatchObject([{ id: client.id, taskCount: 2, subtaskCount: 2 }]);
    expect(getClientDemand([parent, second], children, [client], "ana")).toMatchObject([
      { id: client.id, taskCount: 1, subtaskCount: 1 },
    ]);
    expect(getClientDemand([parent, second], children, [client], "bia")).toMatchObject([
      { id: client.id, taskCount: 1, subtaskCount: 1 },
    ]);
    expect(
      getClientDemand([parent, second], children, [client], "bia")[0].items.map((item) => item.id),
    ).toEqual(["task-b", "subtask-one"]);
    expect(getClientDemand([parent, second], children, [client], "ana", "open")).toMatchObject([
      { taskCount: 1, subtaskCount: 0 },
    ]);
    expect(getClientDemand([parent, second], children, [client], "ana", "done")).toMatchObject([
      { taskCount: 0, subtaskCount: 1 },
    ]);
  });

  it("opens exactly the activities counted by each team summary tile", () => {
    const tasks = [
      { ...task("open", "ana"), client_id: client.id },
      { ...task("done", "bia", "2026-10-10T15:00:00Z"), client_id: client.id },
    ];
    const children = [
      subtask("open-child", "done", "ana", false),
      subtask("done-child", "open", "bia", true, "2026-10-11T09:00:00Z"),
      subtask("other-workspace", "not-visible", "bia", false),
    ];
    expect(
      getTeamSummaryActivities(tasks, children, [client], "tasks-open").map((item) => item.id),
    ).toEqual(["task-open"]);
    expect(
      getTeamSummaryActivities(tasks, children, [client], "tasks-done").map((item) => item.id),
    ).toEqual(["task-done"]);
    expect(
      getTeamSummaryActivities(tasks, children, [client], "subtasks-open").map((item) => item.id),
    ).toEqual(["subtask-open-child"]);
    expect(
      getTeamSummaryActivities(tasks, children, [client], "subtasks-done").map((item) => item.id),
    ).toEqual(["subtask-done-child"]);
    expect(getTeamSummaryActivities(tasks, children, [client], "subtasks-open")[0]).toMatchObject({
      parentTitle: "Tarefa done",
      clientName: "Cliente A",
      assigneeId: "ana",
    });
  });
});
