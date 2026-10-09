import { describe, expect, it } from "vitest";
import type { Subtask, Task } from "@/hooks/use-data";
import {
  calendarTaskEntriesForDay,
  completedPersonalSubtaskEntriesForDay,
} from "./calendar-task-entries";

const task = { id: "parent", due_date: "2026-10-09" } as Task;
const same = { id: "same", task_id: "parent", due_date: "2026-10-09" } as Subtask;
const different = { id: "different", task_id: "parent", due_date: "2026-10-12" } as Subtask;
const undated = { id: "undated", task_id: "parent", due_date: null } as Subtask;
const children = new Map([[task.id, [same, different, undated]]]);

describe("calendar task entries", () => {
  it("shows a child with its own deadline on that day, separately from the parent", () => {
    expect(calendarTaskEntriesForDay([task], children, "2026-10-09", true)).toEqual([
      { kind: "task", task, subtasks: [same, undated] },
    ]);
    expect(calendarTaskEntriesForDay([task], children, "2026-10-12", true)).toEqual([
      { kind: "subtask", task, subtask: different },
    ]);
  });

  it("shows a dated child even if the parent has no deadline", () => {
    const noDeadline = { ...task, due_date: null } as Task;
    expect(calendarTaskEntriesForDay([noDeadline], children, "2026-10-12", true)).toEqual([
      { kind: "subtask", task: noDeadline, subtask: different },
    ]);
  });

  it("keeps the original parent-only view when subtasks are hidden", () => {
    expect(calendarTaskEntriesForDay([task], children, "2026-10-09", false)).toEqual([
      { kind: "task", task, subtasks: [] },
    ]);
    expect(calendarTaskEntriesForDay([task], children, "2026-10-12", false)).toEqual([]);
  });

  it("keeps a completed personal subtask on its own day without restoring the parent card", () => {
    const completed = { ...different, done: true, completed_at: "2026-10-13T12:00:00Z" };
    const history = [{ subtask: completed, parent: task }];
    expect(completedPersonalSubtaskEntriesForDay(history, "2026-10-09")).toEqual([]);
    expect(completedPersonalSubtaskEntriesForDay(history, "2026-10-12")).toEqual([
      { kind: "subtask", task, subtask: completed },
    ]);
  });

  it("uses the completion day when neither the subtask nor its parent has a deadline", () => {
    const noDeadline = { ...task, due_date: null };
    const completed = { ...undated, done: true, completed_at: "2026-10-13T12:00:00Z" };
    expect(
      completedPersonalSubtaskEntriesForDay(
        [{ subtask: completed, parent: noDeadline }],
        "2026-10-13",
      ),
    ).toEqual([{ kind: "subtask", task: noDeadline, subtask: completed }]);
  });

  it("uses the completion day ahead of the parent's deadline when the subtask has no own deadline", () => {
    const completed = { ...undated, done: true, completed_at: "2026-10-13T12:00:00Z" };
    expect(
      completedPersonalSubtaskEntriesForDay([{ subtask: completed, parent: task }], "2026-10-09"),
    ).toEqual([]);
    expect(
      completedPersonalSubtaskEntriesForDay([{ subtask: completed, parent: task }], "2026-10-13"),
    ).toEqual([{ kind: "subtask", task, subtask: completed }]);
  });
});
