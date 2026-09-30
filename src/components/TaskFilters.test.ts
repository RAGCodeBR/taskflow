import { describe, expect, it } from "vitest";
import { applyTaskFilters } from "./TaskFilters";

const USER = "user-1";
const OTHER = "user-2";

const task = (id: string, assignee_id: string | null = null) => ({
  id,
  client_id: null,
  assignee_id,
  priority: null,
  column_id: null,
  status_id: null,
  due_date: null,
  status: null,
  completed_at: null,
});

describe("applyTaskFilters: tarefas da pessoa", () => {
  it("inclui a tarefa em que a pessoa é responsável", () => {
    const result = applyTaskFilters([task("mine", USER), task("other", OTHER)], {}, {
      userId: USER,
      restrictToCurrentUserParticipation: true,
    });
    expect(result.map((item) => item.id)).toEqual(["mine"]);
  });

  it("inclui tarefas em que a pessoa é colaboradora ou responsável por subtarefa", () => {
    const result = applyTaskFilters([task("collaboration"), task("subtask"), task("other")], { scope: "mine" }, {
      userId: USER,
      collaboratorTaskIds: new Set(["collaboration"]),
      subtaskAssigneeTaskIds: new Set(["subtask"]),
    });
    expect(result.map((item) => item.id)).toEqual(["collaboration", "subtask"]);
  });
});
