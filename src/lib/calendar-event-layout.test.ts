import { describe, expect, it } from "vitest";
import {
  buildEventLayouts,
  eventsOverlap,
  hasCollaboratorConflict,
  type SchedulableEvent,
} from "./calendar-event-layout";

const event = (
  id: string,
  starts_at: string,
  ends_at: string,
  created_by = "collaborator-a",
): SchedulableEvent => ({ id, starts_at, ends_at, created_by });

describe("calendar event collision layout", () => {
  it("does not treat adjacent events as overlapping", () => {
    const a = event("a", "2026-08-26T14:00:00-03:00", "2026-08-26T15:00:00-03:00");
    const b = event("b", "2026-08-26T15:00:00-03:00", "2026-08-26T16:00:00-03:00");
    expect(eventsOverlap(a, b)).toBe(false);
    expect(buildEventLayouts([a, b]).map((item) => item.columns)).toEqual([1, 1]);
  });

  it("places partially overlapping events in separate columns", () => {
    const a = event("a", "2026-08-26T14:00:00-03:00", "2026-08-26T15:00:00-03:00");
    const b = event("b", "2026-08-26T14:30:00-03:00", "2026-08-26T15:30:00-03:00");
    const layout = buildEventLayouts([a, b]);
    expect(eventsOverlap(a, b)).toBe(true);
    expect(layout.map((item) => item.columns)).toEqual([2, 2]);
    expect(layout.map((item) => item.column)).toEqual([0, 1]);
  });

  it("keeps linked long-event collisions in one group", () => {
    const a = event("a", "2026-08-26T14:00:00-03:00", "2026-08-26T16:00:00-03:00");
    const b = event("b", "2026-08-26T14:30:00-03:00", "2026-08-26T15:30:00-03:00");
    const c = event("c", "2026-08-26T15:00:00-03:00", "2026-08-26T16:00:00-03:00");
    const layout = buildEventLayouts([a, b, c]);
    expect(layout.map((item) => item.columns)).toEqual([3, 3, 3]);
    expect(new Set(layout.map((item) => item.column))).toEqual(new Set([0, 1, 2]));
  });

  it("renders simultaneous events in visible independent columns", () => {
    const events = [
      event("a", "2026-08-26T15:00:00-03:00", "2026-08-26T16:00:00-03:00"),
      event("b", "2026-08-26T15:00:00-03:00", "2026-08-26T16:00:00-03:00"),
      event("c", "2026-08-26T15:00:00-03:00", "2026-08-26T16:00:00-03:00"),
    ];
    const layout = buildEventLayouts(events);
    expect(layout.map((item) => item.columns)).toEqual([3, 3, 3]);
    expect(new Set(layout.map((item) => item.column))).toEqual(new Set([0, 1, 2]));
  });

  it("identifies a conflict only when the same collaborator overlaps", () => {
    const a = event("a", "2026-08-26T14:00:00-03:00", "2026-08-26T15:00:00-03:00", "jane");
    const same = event("b", "2026-08-26T14:30:00-03:00", "2026-08-26T15:30:00-03:00", "jane");
    const other = event("c", "2026-08-26T14:30:00-03:00", "2026-08-26T15:30:00-03:00", "mariana");
    expect(hasCollaboratorConflict(a, [a, same])).toBe(true);
    expect(hasCollaboratorConflict(a, [a, other])).toBe(false);
  });
});
