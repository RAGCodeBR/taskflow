import { describe, expect, it } from "vitest";
import { advancePendingAppUpdate } from "./app-update-progress";

describe("one click update progress", () => {
  it("continues through seven older shells and confirms only the requested latest version", () => {
    let pending = { id: "latest", attempts: 0 };
    for (let version = 1; version <= 7; version += 1) {
      const result = advancePendingAppUpdate(pending, `older-${version}`);
      expect(result.status).toBe("retry");
      if (result.status === "retry") pending = result.pending;
    }
    expect(pending.attempts).toBe(7);
    expect(advancePendingAppUpdate(pending, "latest")).toEqual({ status: "confirmed" });
  });

  it("bounds retries if the browser cannot load the published version", () => {
    expect(advancePendingAppUpdate({ id: "latest", attempts: 8 }, "older")).toEqual({
      status: "exhausted",
    });
  });
});
