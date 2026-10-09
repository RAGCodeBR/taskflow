import { describe, expect, it } from "vitest";
import { endOfDay, parseISO, startOfDay } from "date-fns";
import type { Subtask, Task } from "@/hooks/use-data";
import { reportSubtaskActivities, reportSubtasksInPeriod } from "./report-subtasks";

const tasks = [{ id: "marketing-parent", title: "Campanha", assignee_id: "renata" }] as Task[];
const subtask = (overrides: Partial<Subtask>): Subtask => ({
  id: "sub-1",
  task_id: "marketing-parent",
  title: "Arte",
  done: false,
  position: 0,
  assignee_id: "luiz",
  due_date: "2026-10-12",
  completed_at: null,
  ...overrides,
});
const start = startOfDay(parseISO("2026-10-01"));
const end = endOfDay(parseISO("2026-10-31"));

describe("report subtasks", () => {
  it("keeps the subtask owner and due date rather than the parent's", () => {
    expect(reportSubtasksInPeriod(tasks, [subtask({})], start, end)).toMatchObject([
      { assignee_id: "luiz", due_date: "2026-10-12", parentTitle: "Campanha" },
    ]);
  });

  it("counts completed work by completion date, not the original due date", () => {
    expect(
      reportSubtasksInPeriod(
        tasks,
        [subtask({ done: true, due_date: "2026-09-20", completed_at: "2026-10-04T23:00:00Z" })],
        start,
        end,
      ),
    ).toHaveLength(1);
    expect(
      reportSubtasksInPeriod(
        tasks,
        [subtask({ done: true, completed_at: "2026-11-01T12:00:00Z" })],
        start,
        end,
      ),
    ).toHaveLength(0);
  });

  it("does not count subtasks from another workspace or outside the period", () => {
    expect(
      reportSubtasksInPeriod(
        tasks,
        [subtask({ task_id: "consultoria-parent" }), subtask({ due_date: "2026-11-01" })],
        start,
        end,
      ),
    ).toEqual([]);
  });

  it("credits the subtask owner in the team and client metrics without borrowing the parent's completion", () => {
    const parents = [{ ...tasks[0], client_id: "client-1", tag_id: "format-1", status: "done" }] as Task[];
    const activities = reportSubtaskActivities(parents, [
      { ...subtask({ done: false, due_date: "2026-10-12" }), parentTitle: "Campanha" },
    ]);
    expect(activities).toMatchObject([{
      assignee_id: "luiz",
      client_id: "client-1",
      tag_id: "format-1",
      status: "todo",
      due_date: "2026-10-12",
    }]);
    expect(activities[0].assignee_id).not.toBe(parents[0].assignee_id);
  });

  it("counts a completed subtask even while its parent remains open", () => {
    const parents = [{ ...tasks[0], status: "todo", completed_at: null }] as Task[];
    const activities = reportSubtaskActivities(parents, [
      { ...subtask({ done: true, completed_at: "2026-10-13T12:00:00Z" }), parentTitle: "Campanha" },
    ]);
    expect(activities[0]).toMatchObject({
      assignee_id: "luiz",
      status: "done",
      completed_at: "2026-10-13T12:00:00Z",
    });
  });
});
