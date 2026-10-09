import { describe, expect, it, vi, afterEach } from "vitest";
import {
  calendarSubtasksDefault,
  calendarSubtasksPreferenceKey,
  readCalendarSubtasksPreference,
} from "./calendar-subtask-preference";

afterEach(() => vi.unstubAllGlobals());
describe("calendar subtask preferences", () => {
  const luiz = "b64c44c4-4bf1-41f0-92cb-9a06d0905f03";
  const isabella = "7b0fccc4-3008-4983-b435-37af85edcd85";
  it("starts enabled for exactly the two requested accounts", () => {
    expect(calendarSubtasksDefault(luiz)).toBe(true);
    expect(calendarSubtasksDefault(isabella)).toBe(true);
    expect(calendarSubtasksDefault("another-user")).toBe(false);
    expect(calendarSubtasksDefault(null)).toBe(false);
  });
  it("keeps each account and workspace preference separate", () => {
    expect(calendarSubtasksPreferenceKey(luiz, "marketing")).not.toBe(
      calendarSubtasksPreferenceKey(isabella, "marketing"),
    );
    expect(calendarSubtasksPreferenceKey(luiz, "marketing")).not.toBe(
      calendarSubtasksPreferenceKey(luiz, "consultoria"),
    );
  });
  it("remembers a deliberate override instead of forcing the default every visit", () => {
    const values = new Map([
      [calendarSubtasksPreferenceKey(luiz, "marketing"), "false"],
      [calendarSubtasksPreferenceKey("another-user", "marketing"), "true"],
    ]);
    vi.stubGlobal("localStorage", { getItem: (key: string) => values.get(key) ?? null });
    expect(readCalendarSubtasksPreference(luiz, "marketing")).toBe(false);
    expect(readCalendarSubtasksPreference(luiz, "consultoria")).toBe(true);
    expect(readCalendarSubtasksPreference("another-user", "marketing")).toBe(true);
  });
  it("preserves defaults if browser storage is unavailable", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("denied");
      },
    });
    expect(readCalendarSubtasksPreference(isabella, "marketing")).toBe(true);
    expect(readCalendarSubtasksPreference("another-user", "marketing")).toBe(false);
  });
});
