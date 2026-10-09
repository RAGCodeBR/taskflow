import { describe, expect, it } from "vitest";
import { applyTaskFilters } from "./TaskFilters";
import { completedSubtaskFilterTask, openSubtaskTaskIdsForUser } from "@/lib/task-participation";
import type { Subtask, Task } from "@/hooks/use-data";

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
    const result = applyTaskFilters(
      [task("mine", USER), task("other", OTHER)],
      {},
      {
        userId: USER,
        restrictToCurrentUserParticipation: true,
      },
    );
    expect(result.map((item) => item.id)).toEqual(["mine"]);
  });

  it("inclui tarefas em que a pessoa é colaboradora ou responsável por subtarefa", () => {
    const result = applyTaskFilters(
      [task("collaboration"), task("subtask"), task("other")],
      { scope: "mine" },
      {
        userId: USER,
        collaboratorTaskIds: new Set(["collaboration"]),
        subtaskAssigneeTaskIds: new Set(["subtask"]),
      },
    );
    expect(result.map((item) => item.id)).toEqual(["collaboration", "subtask"]);
  });

  it("retira o card pai da visão pessoal quando a última subtarefa atribuída termina, mas preserva colaboradores", () => {
    const cards = [task("subtask-only"), task("collaborator"), task("direct", USER)];
    const parts = [
      { task_id: "subtask-only", assignee_id: USER, done: false },
      { task_id: "subtask-only", assignee_id: OTHER, done: false },
    ];
    const personal = (done: boolean) =>
      applyTaskFilters(
        cards,
        { scope: "mine" },
        {
          userId: USER,
          restrictToCurrentUserParticipation: true,
          collaboratorTaskIds: new Set(["collaborator"]),
          subtaskAssigneeTaskIds: openSubtaskTaskIdsForUser(
            parts.map((part) => (part.assignee_id === USER ? { ...part, done } : part)),
            USER,
          ),
        },
      ).map((item) => item.id);

    expect(personal(false)).toEqual(["subtask-only", "collaborator", "direct"]);
    expect(personal(true)).toEqual(["collaborator", "direct"]);
  });

  it("inclui somente a subtarefa finalizada na visão pessoal de concluídas", () => {
    const parent = {
      ...task("parent", OTHER),
      title: "Tarefa principal",
      updated_at: "2026-10-09T12:00:00Z",
    } as Task;
    const part = {
      id: "part",
      task_id: parent.id,
      title: "Minha parte",
      assignee_id: USER,
      done: true,
      due_date: "2026-10-09",
      completed_at: "2026-10-09T13:00:00Z",
    } as Subtask;
    const completedPart = completedSubtaskFilterTask(parent, part, USER);
    const result = applyTaskFilters(
      [parent, completedPart],
      { scope: "mine", status: "completed", assignee: USER },
      {
        userId: USER,
        restrictToCurrentUserParticipation: true,
      },
    );
    expect(result.map((item) => item.id)).toEqual(["part"]);
  });
});
