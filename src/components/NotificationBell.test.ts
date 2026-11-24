import { describe, expect, it } from "vitest";
import { excludedNotificationTypes } from "./NotificationBell";

describe("excludedNotificationTypes", () => {
  it("hides due-date reminders from the desktop bell", () => {
    expect(excludedNotificationTypes(false)).toContain("due_soon");
  });
  it("shows due-date reminders on the phone bell", () => {
    expect(excludedNotificationTypes(true)).not.toContain("due_soon");
  });
  it("keeps hiding Mural/Conversas types in both", () => {
    for (const mobile of [true, false])
      expect(excludedNotificationTypes(mobile)).toEqual(
        expect.arrayContaining(["mural_post", "comment", "mention"]),
      );
  });
});
