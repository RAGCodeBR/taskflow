import { describe, expect, it } from "vitest";
import { meetingDurationMinutes, meetingEndTime } from "./meeting-time";

describe("meeting time", () => {
  it("derives the end time from an existing meeting duration", () => {
    expect(meetingEndTime("14:30", 90)).toBe("16:00");
    expect(meetingDurationMinutes("14:30", "16:00")).toBe(90);
  });

  it("keeps meetings across midnight on the next calendar day", () => {
    expect(meetingEndTime("23:30", 60)).toBe("00:30");
    expect(meetingDurationMinutes("23:30", "00:30")).toBe(60);
  });

  it("preserves a full-day meeting and rejects incomplete times", () => {
    expect(meetingDurationMinutes("14:00", "14:00")).toBe(1440);
    expect(meetingDurationMinutes("14:00", "")).toBeNull();
  });
});
