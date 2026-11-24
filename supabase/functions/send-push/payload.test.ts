import { describe, expect, it } from "vitest";
import { buildPushPayload, isExpiredSubscription } from "./payload";

describe("buildPushPayload", () => {
  it("links the push to the task in the list and groups by type+task", () => {
    expect(
      buildPushPayload(
        {
          id: "n1",
          task_id: "t1",
          type: "due_soon",
          title: "Vence hoje",
          body: "Protocolar petição",
        },
        3,
      ),
    ).toEqual({
      title: "Vence hoje",
      body: "Protocolar petição",
      url: "/tasks/list?task=t1",
      tag: "due_soon:t1",
      badge: 3,
    });
  });

  it("falls back to the notifications list when there is no task", () => {
    const payload = buildPushPayload(
      { id: "n2", task_id: null, type: "assignment", title: "Nova tarefa", body: null },
      0,
    );
    expect(payload.url).toBe("/tasks/list");
    expect(payload.tag).toBe("assignment:n2");
    expect(payload.body).toBe("");
  });
});

describe("isExpiredSubscription", () => {
  it("treats 404 and 410 as expired", () => {
    expect(isExpiredSubscription(404)).toBe(true);
    expect(isExpiredSubscription(410)).toBe(true);
    expect(isExpiredSubscription(500)).toBe(false);
  });
});
