import { describe, expect, it } from "vitest";
import { applyTaskFilters } from "./TaskFilters";
import { completedSubtaskFilterTask, openSubtaskTaskIdsForUser } from "@/lib/task-participation";
import { defaultsToOwnScope } from "@/lib/team-task-visibility";
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
  it("shows one Marketing task under any linked client without duplicating it", () => {
    const tasks = [
      { ...task("shared"), client_id: "client-a", secondary_client_id: "client-b", additional_client_ids: ["client-b", "client-d", "client-e"] },
      { ...task("other"), client_id: "client-c" },
    ];
    expect(applyTaskFilters(tasks, { clients: ["client-a"] }).map((item) => item.id)).toEqual(["shared"]);
    expect(applyTaskFilters(tasks, { clients: ["client-b"] }).map((item) => item.id)).toEqual(["shared"]);
    expect(applyTaskFilters(tasks, { clients: ["client-d"] }).map((item) => item.id)).toEqual(["shared"]);
    expect(applyTaskFilters(tasks, { clients: ["client-e"] }).map((item) => item.id)).toEqual(["shared"]);
    expect(applyTaskFilters(tasks, { clients: ["client-a", "client-b"] }).map((item) => item.id)).toEqual(["shared"]);
  });
  it("starts Carol on her own Marketing work, including subtasks, without removing team access", () => {
    const carol = "3a93e438-1f3f-42f9-aea4-d22d227e1ea1";
    const tasks = [
      { ...task("own", carol), workspace_id: "marketing" },
      { ...task("own-subtask-parent", OTHER), workspace_id: "marketing" },
      { ...task("other", OTHER), workspace_id: "marketing" },
    ];
    const opts = {
      userId: carol,
      restrictToCurrentUserParticipation: true,
      teamVisibilityWorkspaceId: "marketing",
      subtaskAssigneeTaskIds: new Set(["own-subtask-parent"]),
      subtaskAssigneeTaskIdsByUser: new Map([[carol, new Set(["own-subtask-parent"])]]),
    };
    const initialFilters = defaultsToOwnScope(carol, opts.teamVisibilityWorkspaceId)
      ? { scope: "mine" as const }
      : {};
    expect(applyTaskFilters(tasks, initialFilters, opts).map((item) => item.id)).toEqual([
      "own", "own-subtask-parent",
    ]);
    expect(applyTaskFilters(tasks, {}, opts).map((item) => item.id)).toEqual([
      "own", "own-subtask-parent", "other",
    ]);
  });
  it("defaults Eloisa to her assignments while retaining team browsing on clear", () => {
    const eloisa = "0463e2ec-c7fe-4ba3-8df1-1f1ee0093e79";
    const tasks = [
      { ...task("own", eloisa), workspace_id: "marketing" },
      { ...task("other", OTHER), workspace_id: "marketing" },
    ];
    const opts = { userId: eloisa, restrictToCurrentUserParticipation: true, teamVisibilityWorkspaceId: "marketing" };
    expect(applyTaskFilters(tasks, defaultsToOwnScope(eloisa, "marketing") ? { scope: "mine" } : {}, opts).map((item) => item.id)).toEqual(["own"]);
    expect(applyTaskFilters(tasks, {}, opts).map((item) => item.id)).toEqual(["own", "other"]);
  });
  it("defaults Amanda to her personal scope without broadening or removing access", () => {
    const amanda = "0140bc01-2798-4616-9903-50bc191ce9ef";
    const tasks = [
      { ...task("own", amanda), workspace_id: "marketing" },
      { ...task("collaborating", OTHER), workspace_id: "marketing" },
      { ...task("other", OTHER), workspace_id: "marketing" },
    ];
    const opts = { userId: amanda, restrictToCurrentUserParticipation: true, collaboratorTaskIds: new Set(["collaborating"]) };
    expect(applyTaskFilters(tasks, defaultsToOwnScope(amanda) ? { scope: "mine" } : {}, opts).map((item) => item.id)).toEqual(["own", "collaborating"]);
    expect(applyTaskFilters(tasks, {}, opts).map((item) => item.id)).toEqual(["own", "collaborating"]);
  });
  it("unlocks another person's tasks only in the granted workspace, not shared external tasks", () => {
    const tasks = [
      { ...task("team", OTHER), workspace_id: "marketing" },
      { ...task("external", OTHER), workspace_id: "consultoria" },
      { ...task("own-external", USER), workspace_id: "consultoria" },
    ];
    const opts = {
      userId: USER,
      restrictToCurrentUserParticipation: true,
      teamVisibilityWorkspaceId: "marketing",
    };
    expect(applyTaskFilters(tasks, {}, opts).map((item) => item.id)).toEqual([
      "team",
      "own-external",
    ]);
    expect(applyTaskFilters(tasks, { scope: "mine" }, opts).map((item) => item.id)).toEqual([
      "own-external",
    ]);
    expect(applyTaskFilters(tasks, { assignee: OTHER }, opts).map((item) => item.id)).toEqual([
      "team",
    ]);
  });
  it("includes a collaborator-only Marketing task in the recipient's personal view", () => {
    const cards = [
      { ...task("collaboration", OTHER), workspace_id: "marketing" },
      { ...task("assigned", USER), workspace_id: "marketing" },
    ];
    const opts = {
      userId: USER,
      restrictToCurrentUserParticipation: true,
      teamVisibilityWorkspaceId: "marketing",
      collaboratorTaskIds: new Set(["collaboration"]),
    };
    expect(applyTaskFilters(cards, { scope: "mine" }, opts).map(({ id }) => id)).toEqual(["collaboration", "assigned"]);
    expect(applyTaskFilters(cards, {}, opts).map(({ id }) => id)).toEqual(["collaboration", "assigned"]);
  });
  it("shows administrators their own Marketing production without hiding the team view", () => {
    const cards = [
      { ...task("admin-task", USER), workspace_id: "marketing" },
      { ...task("teammate-task", OTHER), workspace_id: "marketing" },
    ];
    const opts = { userId: USER, teamVisibilityWorkspaceId: "marketing" };
    expect(applyTaskFilters(cards, { scope: "mine" }, opts).map(({ id }) => id)).toEqual(["admin-task"]);
    expect(applyTaskFilters(cards, {}, opts).map(({ id }) => id)).toEqual(["admin-task", "teammate-task"]);
  });
  it("lets a team viewer find the parent via another person's pending subtasks", () => {
    const parent = { ...task("parent", "someone-else"), workspace_id: "marketing" };
    const result = applyTaskFilters(
      [parent],
      { assignee: OTHER },
      {
        userId: USER,
        restrictToCurrentUserParticipation: true,
        teamVisibilityWorkspaceId: "marketing",
        subtaskAssigneeTaskIdsByUser: new Map([[OTHER, new Set(["parent"])]]),
      },
    );
    expect(result.map((item) => item.id)).toEqual(["parent"]);
  });
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

  it("shows assigned, subtask and collaborator work in the personal Marketing view", () => {
    const cards = [task("colleague"), task("subtask"), task("direct", USER)];
    const options = {
      userId: USER,
      restrictToCurrentUserParticipation: true,
      teamVisibilityWorkspaceId: "marketing",
      collaboratorTaskIds: new Set(["colleague"]),
      subtaskAssigneeTaskIds: new Set(["subtask"]),
    };
    const teamCards = cards.map((card) => ({ ...card, workspace_id: "marketing" }));
    expect(applyTaskFilters(teamCards, { scope: "mine" }, options).map((card) => card.id))
      .toEqual(["colleague", "subtask", "direct"]);
    expect(applyTaskFilters(teamCards, {}, options).map((card) => card.id))
      .toEqual(["colleague", "subtask", "direct"]);
    expect(applyTaskFilters(teamCards, { assignee: USER }, {
      ...options,
      subtaskAssigneeTaskIdsByUser: new Map([[USER, new Set(["subtask"])]]),
    }).map((card) => card.id)).toEqual(["subtask", "direct"]);
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
