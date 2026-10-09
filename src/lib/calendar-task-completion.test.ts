import { describe, expect, it } from "vitest";
import type { Task } from "@/hooks/use-data";
import { calendarCompletionDecision } from "./calendar-task-completion";

const task = (overrides: Partial<Task> = {}) => ({
  is_draft: false,
  status: "todo" as const,
  completed_at: null,
  due_date: "2026-10-09",
  ...overrides,
});

describe("calendar quick completion", () => {
  const today = "2026-10-09";

  it("completes today's or future work directly", () => {
    expect(calendarCompletionDecision(task(), false, today)).toBe("complete");
    expect(calendarCompletionDecision(task({ due_date: "2026-10-10" }), false, today)).toBe("complete");
  });

  it("asks for the actual completion date when the task is overdue", () => {
    expect(calendarCompletionDecision(task({ due_date: "2026-10-08" }), false, today)).toBe("choose-date");
  });

  it("does not complete a draft or a task with pending subtasks", () => {
    expect(calendarCompletionDecision(task({ is_draft: true }), false, today)).toBe("draft");
    expect(calendarCompletionDecision(task(), true, today)).toBe("pending-subtasks");
  });

  it("does not repeat an already completed task", () => {
    expect(calendarCompletionDecision(task({ status: "done" }), false, today)).toBe("already-completed");
    expect(calendarCompletionDecision(task({ completed_at: "2026-10-09T12:00:00Z" }), false, today)).toBe("already-completed");
  });
});
