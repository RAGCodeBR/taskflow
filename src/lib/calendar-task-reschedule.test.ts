import { beforeEach, describe, expect, it, vi } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { OfflineOperation } from "./offline-sync";

const queue = vi.hoisted(() => ({
  enqueue: vi.fn(),
  replace: vi.fn(),
  conflict: vi.fn(),
}));
vi.mock("@/lib/offline-sync", () => ({
  enqueueOfflineOperation: queue.enqueue,
  replaceOfflineOperation: queue.replace,
  addOfflineConflict: queue.conflict,
}));
import {
  calendarDeadline,
  queueCalendarTaskReschedule,
  syncCalendarTaskReschedule,
} from "./calendar-task-reschedule";

const task = {
  id: "task-1",
  due_date: new Date("2026-10-07T12:00:00").toISOString(),
  updated_at: "version-1",
};
const next = calendarDeadline("2026-10-08");
const operation = (): OfflineOperation => ({
  id: "op-1",
  userId: "user-1",
  entity: "task",
  action: "update",
  entityId: task.id,
  payload: {
    patch: { due_date: next },
    calendarDueDateChange: {
      id: "history-1",
      task_id: task.id,
      user_id: "user-1",
      old_due_date: task.due_date,
      new_due_date: next,
      reason: "Novo briefing",
      created_at: "2026-10-07T15:00:00Z",
    },
  },
  createdAt: "2026-10-07T15:00:00Z",
  attempts: 0,
});

function mockClient({
  dueDate = task.due_date,
  historyError = null,
  updateError = null,
  deleted = false,
}: {
  dueDate?: string | null;
  historyError?: unknown;
  updateError?: unknown;
  deleted?: boolean;
} = {}) {
  const updates: unknown[] = [];
  const histories: unknown[] = [];
  const filters: unknown[] = [];
  const from = vi.fn((table: string) => {
    let writing = false;
    const builder = {
      select: () => builder,
      eq: (field: string, value: unknown) => {
        filters.push([field, value]);
        return builder;
      },
      is: (field: string, value: unknown) => {
        filters.push([field, value]);
        return builder;
      },
      update: (patch: unknown) => {
        writing = true;
        updates.push(patch);
        return builder;
      },
      single: async () =>
        writing
          ? { data: { id: task.id }, error: updateError }
          : {
              data: {
                due_date: dueDate,
                updated_at: "server-version",
                deleted_at: deleted ? "deleted" : null,
                archived_at: null,
              },
              error: null,
            },
      upsert: async (record: unknown, options: unknown) => {
        histories.push([table, record, options]);
        return { error: historyError };
      },
    };
    return builder;
  });
  return {
    client: { from } as unknown as Pick<SupabaseClient<Database>, "from">,
    updates,
    histories,
    filters,
    from,
  };
}

beforeEach(() => {
  vi.resetAllMocks();
});

describe("calendar deadline confirmation", () => {
  it.each(["2026-02-30", "2026-13-01", "08/10/2026", "2026-10-08<script>"])(
    "rejects an invalid target: %s",
    (date) => {
      expect(() => calendarDeadline(date)).toThrow();
    },
  );
  it("uses local noon through month/year boundaries", () => {
    expect(new Date(calendarDeadline("2027-01-01")).getHours()).toBe(12);
    expect(new Date(calendarDeadline("2027-01-01")).getDate()).toBe(1);
  });
  it("refuses blank reasons or unchanged days without queuing anything", async () => {
    const queryClient = new QueryClient();
    await expect(
      queueCalendarTaskReschedule({
        userId: "user-1",
        task,
        date: "2026-10-08",
        reason: "  ",
        queryClient,
      }),
    ).rejects.toThrow("justificativa");
    await expect(
      queueCalendarTaskReschedule({
        userId: "user-1",
        task,
        date: "2026-10-07",
        reason: "Motivo",
        queryClient,
      }),
    ).rejects.toThrow("diferente");
    expect(queue.enqueue).not.toHaveBeenCalled();
  });
  it("persists the date and trimmed reason together and only patches matching scoped tasks", async () => {
    const queryClient = new QueryClient();
    const firstKey = ["tasks", "user-1", "marketing", null];
    const secondKey = ["tasks", "user-1", "consultoria", null];
    const localTask = { ...task, due_time: "18:30", status: "todo", title: "Campanha" };
    queryClient.setQueryData(firstKey, [localTask]);
    queryClient.setQueryData(secondKey, [{ ...localTask, id: "task-2" }]);
    await queueCalendarTaskReschedule({
      userId: "user-1",
      task,
      date: "2026-10-08",
      reason: "  Novo briefing  ",
      queryClient,
    });
    expect(queue.enqueue).toHaveBeenCalledTimes(1);
    expect(queue.enqueue.mock.calls[0][0]).toMatchObject({
      entity: "task",
      entityId: task.id,
      baseValues: { due_date: task.due_date },
      payload: {
        patch: { due_date: next },
        calendarDueDateChange: { reason: "Novo briefing", new_due_date: next },
      },
    });
    expect(queryClient.getQueryData(firstKey)).toEqual([{ ...localTask, due_date: next }]);
    expect(queryClient.getQueryData(secondKey)).toEqual([{ ...localTask, id: "task-2" }]);
    expect(queryClient.getQueryData(["tasks"])).toBeUndefined();
  });
  it("does not move the local task when durable storage fails", async () => {
    const queryClient = new QueryClient();
    const key = ["tasks", "user-1"];
    queryClient.setQueryData(key, [task]);
    queue.enqueue.mockRejectedValueOnce(new Error("Storage failed"));
    await expect(
      queueCalendarTaskReschedule({
        userId: "user-1",
        task,
        date: "2026-10-08",
        reason: "Motivo",
        queryClient,
      }),
    ).rejects.toThrow();
    expect(queryClient.getQueryData(key)).toEqual([task]);
  });
  it("keeps the original reason and audit ID when resolving a cleared server deadline", async () => {
    await queueCalendarTaskReschedule({
      userId: "user-1",
      task: { ...task, due_date: null },
      date: "2026-10-08",
      reason: "Motivo original",
      queryClient: new QueryClient(),
      history: { id: "history-original", created_at: "2026-10-07T15:00:00Z" },
    });
    expect(queue.enqueue.mock.calls[0][0].payload.calendarDueDateChange).toMatchObject({
      id: "history-original",
      old_due_date: null,
      reason: "Motivo original",
      created_at: "2026-10-07T15:00:00Z",
    });
  });
});

describe("calendar deadline synchronization", () => {
  it("updates only the deadline and writes idempotent history with the reason", async () => {
    const mock = mockClient();
    expect(await syncCalendarTaskReschedule(mock.client, operation())).toBe(false);
    expect(mock.updates).toEqual([{ due_date: next }]);
    expect(mock.filters).toContainEqual(["due_date", task.due_date]);
    expect(queue.replace.mock.calls[0][0].payload.calendarDueDateApplied).toBe(true);
    expect(queue.replace.mock.calls[0][0].payload.patch).toEqual({});
    expect(mock.histories[0]).toEqual([
      "task_due_date_changes",
      operation().payload.calendarDueDateChange,
      { onConflict: "id", ignoreDuplicates: true },
    ]);
  });
  it("keeps the reason for conflict review instead of overwriting another deadline", async () => {
    const serverDate = calendarDeadline("2026-10-10");
    const mock = mockClient({ dueDate: serverDate });
    expect(await syncCalendarTaskReschedule(mock.client, operation())).toBe(true);
    expect(mock.updates).toEqual([]);
    expect(mock.histories).toEqual([]);
    expect(queue.conflict).toHaveBeenCalledWith(
      expect.objectContaining({
        field: "due_date",
        serverValue: serverDate,
        localValue: next,
        dueDateChange: {
          id: "history-1",
          reason: "Novo briefing",
          created_at: "2026-10-07T15:00:00Z",
        },
      }),
    );
  });
  it("retries missing history without resetting a subsequently changed task", async () => {
    const first = mockClient({ historyError: new Error("Network failed") });
    await expect(syncCalendarTaskReschedule(first.client, operation())).rejects.toThrow();
    const marked = queue.replace.mock.calls[0][0] as OfflineOperation;
    const retry = mockClient({ dueDate: calendarDeadline("2026-10-12") });
    expect(await syncCalendarTaskReschedule(retry.client, marked)).toBe(false);
    expect(retry.updates).toEqual([]);
    expect(retry.histories).toHaveLength(1);
    expect(queue.conflict).not.toHaveBeenCalled();
  });
  it("does not duplicate updates when the prior request was already applied", async () => {
    const mock = mockClient({ dueDate: next });
    await syncCalendarTaskReschedule(mock.client, operation());
    expect(mock.updates).toEqual([]);
    expect(mock.histories).toHaveLength(1);
  });
  it("does not claim success or write history if the conditional update fails", async () => {
    const mock = mockClient({ updateError: new Error("Concurrent update") });
    await expect(syncCalendarTaskReschedule(mock.client, operation())).rejects.toThrow(
      "Concurrent",
    );
    expect(mock.histories).toEqual([]);
    expect(queue.replace).not.toHaveBeenCalled();
  });
  it("rejects deleted tasks and missing reasons", async () => {
    await expect(
      syncCalendarTaskReschedule(mockClient({ deleted: true }).client, operation()),
    ).rejects.toThrow("excluída");
    const invalid = operation();
    (invalid.payload.calendarDueDateChange as { reason: string }).reason = " ";
    const mock = mockClient();
    await expect(syncCalendarTaskReschedule(mock.client, invalid)).rejects.toThrow("justificativa");
    expect(mock.from).not.toHaveBeenCalled();
  });
  it("handles a cleared deadline using a conditional null comparison", async () => {
    const resolved = operation();
    (resolved.payload.calendarDueDateChange as { old_due_date: string | null }).old_due_date = null;
    const mock = mockClient({ dueDate: null });
    await syncCalendarTaskReschedule(mock.client, resolved);
    expect(mock.filters).toContainEqual(["due_date", null]);
    expect(mock.updates).toEqual([{ due_date: next }]);
    expect(mock.histories).toHaveLength(1);
  });
});
