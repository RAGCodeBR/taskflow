import { describe, expect, it } from "vitest";
import { defaultsToOwnScope, teamTaskVisibilityWorkspace, teamSubtaskAssigneeTaskIds } from "./team-task-visibility";

const access = {
  isCollaborator: true,
  isClient: false,
  workspace: { id: "marketing-id", slug: "marketing", canViewAllTasks: true },
};
describe("workspace team task visibility", () => {
  it("defaults every Marketing collaborator to their personal work queue", () => {
    expect(defaultsToOwnScope("designer", "marketing-id")).toBe(true);
    expect(defaultsToOwnScope("designer", null)).toBe(false);
    expect(defaultsToOwnScope(null, "marketing-id")).toBe(false);
    expect(defaultsToOwnScope("0140bc01-2798-4616-9903-50bc191ce9ef")).toBe(true);
  });
  it("keeps completed children out of the assignee's active parent filters", () => {
    const subtasks = [
      { task_id: "team-parent", assignee_id: "luiz", done: true },
      { task_id: "foreign-parent", assignee_id: "luiz", done: true },
      { task_id: "open-parent", assignee_id: "luiz", done: false },
    ];
    expect([...teamSubtaskAssigneeTaskIds(subtasks).get("luiz")!]).toEqual([
      "open-parent",
    ]);
  });
  it("grants team browsing to collaborators in Marketing", () => {
    expect(teamTaskVisibilityWorkspace(access)).toBe("marketing-id");
    expect(
      teamTaskVisibilityWorkspace({
        ...access,
        workspace: { ...access.workspace, slug: "consultoria" },
      }),
    ).toBeNull();
  });
  it("gives Marketing administrators the same personal start view and team browsing", () => {
    expect(teamTaskVisibilityWorkspace({ ...access, isCollaborator: false, isAdmin: true })).toBe("marketing-id");
    expect(defaultsToOwnScope("marketing-admin", "marketing-id")).toBe(true);
  });
  it("does not grant team browsing outside Marketing or to clients", () => {
    expect(
      teamTaskVisibilityWorkspace({
        ...access,
        workspace: { ...access.workspace, canViewAllTasks: false },
      }),
    ).toBe("marketing-id");
    expect(
      teamTaskVisibilityWorkspace({
        ...access,
        workspace: { id: "marketing-id", slug: "marketing" },
      }),
    ).toBe("marketing-id");
    expect(teamTaskVisibilityWorkspace({ ...access, isClient: true })).toBeNull();
    expect(teamTaskVisibilityWorkspace({ ...access, isCollaborator: false })).toBeNull();
    expect(teamTaskVisibilityWorkspace({ ...access, workspace: null })).toBeNull();
  });
});
