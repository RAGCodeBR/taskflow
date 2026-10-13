import { describe, expect, it } from "vitest";
import { defaultsToOwnAssignee, defaultsToOwnScope, teamTaskVisibilityWorkspace, teamSubtaskAssigneeTaskIds } from "./team-task-visibility";

const access = {
  isCollaborator: true,
  isClient: false,
  workspace: { id: "marketing-id", slug: "marketing", canViewAllTasks: true },
};
describe("workspace team task visibility", () => {
  it("defaults Carol and Eloisa to their own assignee in Marketing, without changing team access", () => {
    expect(defaultsToOwnAssignee("3a93e438-1f3f-42f9-aea4-d22d227e1ea1", "marketing-id")).toBe(true);
    expect(defaultsToOwnAssignee("0463e2ec-c7fe-4ba3-8df1-1f1ee0093e79", "marketing-id")).toBe(true);
    expect(defaultsToOwnAssignee("3a93e438-1f3f-42f9-aea4-d22d227e1ea1", null)).toBe(false);
    expect(defaultsToOwnAssignee("0140bc01-2798-4616-9903-50bc191ce9ef", "marketing-id")).toBe(false);
    expect(defaultsToOwnAssignee(null, "marketing-id")).toBe(false);
    expect(defaultsToOwnScope("0140bc01-2798-4616-9903-50bc191ce9ef")).toBe(true);
    expect(defaultsToOwnScope("0463e2ec-c7fe-4ba3-8df1-1f1ee0093e79")).toBe(false);
  });
  it("allows filtering a completed child's parent only inside the team grant", () => {
    const subtasks = [
      { task_id: "team-parent", assignee_id: "luiz", done: true },
      { task_id: "foreign-parent", assignee_id: "luiz", done: true },
      { task_id: "open-parent", assignee_id: "luiz", done: false },
    ];
    const tasks = [
      { id: "team-parent", workspace_id: "marketing" },
      { id: "foreign-parent", workspace_id: "consultoria" },
    ];
    expect([...teamSubtaskAssigneeTaskIds(subtasks, tasks, "marketing").get("luiz")!]).toEqual([
      "open-parent",
      "team-parent",
    ]);
    expect([...teamSubtaskAssigneeTaskIds(subtasks, tasks, null).get("luiz")!]).toEqual([
      "open-parent",
    ]);
  });
  it("grants browsing only for the explicitly authorized Marketing workspace", () => {
    expect(teamTaskVisibilityWorkspace(access)).toBe("marketing-id");
    expect(
      teamTaskVisibilityWorkspace({
        ...access,
        workspace: { ...access.workspace, slug: "consultoria" },
      }),
    ).toBeNull();
  });
  it("keeps ordinary collaborators, clients and old offline snapshots unchanged", () => {
    expect(
      teamTaskVisibilityWorkspace({
        ...access,
        workspace: { ...access.workspace, canViewAllTasks: false },
      }),
    ).toBeNull();
    expect(
      teamTaskVisibilityWorkspace({
        ...access,
        workspace: { id: "marketing-id", slug: "marketing" },
      }),
    ).toBeNull();
    expect(teamTaskVisibilityWorkspace({ ...access, isClient: true })).toBeNull();
    expect(teamTaskVisibilityWorkspace({ ...access, isCollaborator: false })).toBeNull();
    expect(teamTaskVisibilityWorkspace({ ...access, workspace: null })).toBeNull();
  });
});
