import { describe, expect, it } from "vitest";
import type { Subtask, Task } from "@/hooks/use-data";
import {
  completedSubtaskHistory,
  completedSubtaskFilterTask,
  completedSubtasksForUser,
  openSubtaskTaskIdsByUser,
  openSubtaskTaskIdsForUser,
} from "./task-participation";

describe("subtask-only participation", () => {
  const subtasks = [
    { task_id: "card-a", assignee_id: "ana", done: true },
    { task_id: "card-a", assignee_id: "ana", done: false },
    { task_id: "card-b", assignee_id: "ana", done: true },
    { task_id: "card-b", assignee_id: "bia", done: false },
  ];

  it("keeps the parent visible while the person still has another open subtask", () => {
    expect([...openSubtaskTaskIdsForUser(subtasks, "ana")]).toEqual(["card-a"]);
  });

  it("removes the parent from subtask-only participation after all of that person's parts are done", () => {
    expect([
      ...openSubtaskTaskIdsForUser(
        subtasks.map((part) => ({ ...part, done: part.assignee_id === "ana" ? true : part.done })),
        "ana",
      ),
    ]).toEqual([]);
    expect([...openSubtaskTaskIdsByUser(subtasks).get("ana")!]).toEqual(["card-a"]);
    expect([...openSubtaskTaskIdsByUser(subtasks).get("bia")!]).toEqual(["card-b"]);
  });

  it("keeps only personal completed subtasks in history, without a parent card", () => {
    const parents = [
      { id: "card-a", workspace_id: "marketing", assignee_id: "bia", created_by: "bia" },
      { id: "card-b", workspace_id: "consultoria", assignee_id: "bia", created_by: "bia" },
      { id: "card-c", workspace_id: "marketing", assignee_id: "ana", created_by: "bia" },
      { id: "card-d", workspace_id: "marketing", assignee_id: "bia", created_by: "bia" },
      { id: "card-e", workspace_id: "marketing", assignee_id: "bia", created_by: "ana" },
    ] as Task[];
    const parts = [
      {
        id: "done-a",
        task_id: "card-a",
        assignee_id: "ana",
        done: true,
        completed_at: "2026-10-09T12:00:00Z",
      },
      { id: "open-a", task_id: "card-a", assignee_id: "ana", done: false, completed_at: null },
      {
        id: "done-b",
        task_id: "card-b",
        assignee_id: "ana",
        done: true,
        completed_at: "2026-10-08T12:00:00Z",
      },
      {
        id: "done-c",
        task_id: "card-c",
        assignee_id: "ana",
        done: true,
        completed_at: "2026-10-07T12:00:00Z",
      },
      {
        id: "done-d",
        task_id: "card-d",
        assignee_id: "ana",
        done: true,
        completed_at: "2026-10-06T12:00:00Z",
      },
      {
        id: "done-e",
        task_id: "card-e",
        assignee_id: "ana",
        done: true,
        completed_at: "2026-10-05T12:00:00Z",
      },
    ] as Subtask[];
    const marketingHistory = (items: Subtask[]) =>
      completedSubtaskHistory(parents, items, "ana", new Set(["card-d"]), "marketing").map(
        ({ subtask }) => subtask.id,
      );
    expect(
      completedSubtasksForUser(parents, parts, "ana", "marketing").map(({ subtask }) => subtask.id),
    ).toEqual(["done-a", "done-c", "done-d", "done-e"]);
    expect(marketingHistory(parts)).toEqual(["done-e"]);
    expect(
      marketingHistory(
        parts.map((part) =>
          part.id === "open-a"
            ? { ...part, done: true, completed_at: "2026-10-09T13:00:00Z" }
            : part,
        ),
      ),
    ).toEqual(["open-a", "done-a", "done-e"]);
    expect(
      completedSubtaskHistory(parents, parts, "ana", undefined, "consultoria").map(
        ({ subtask }) => subtask.id,
      ),
    ).toEqual(["done-b"]);
  });

  it("filters a completed subtask by its own assignee and due date", () => {
    const parent = {
      id: "parent",
      title: "Card pai",
      assignee_id: "bia",
      due_date: "2026-10-24",
      updated_at: "2026-10-09T12:00:00Z",
    } as Task;
    const part = {
      id: "part",
      title: "Minha parte",
      task_id: "parent",
      assignee_id: "ana",
      due_date: "2026-10-09",
      completed_at: "2026-10-09T13:00:00Z",
      done: true,
    } as Subtask;
    const item = completedSubtaskFilterTask(parent, part, "ana");
    expect(item).toMatchObject({
      id: "part",
      title: "Minha parte",
      assignee_id: "ana",
      due_date: "2026-10-09",
      status: "done",
      completed_at: "2026-10-09T13:00:00Z",
    });
    expect(parent).toMatchObject({ id: "parent", assignee_id: "bia", due_date: "2026-10-24" });
  });
});
