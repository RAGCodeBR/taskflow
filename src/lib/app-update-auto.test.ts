import { describe, expect, it } from "vitest";
import { canAutoInstallAppUpdate } from "./app-update-auto";

const idle = {
  online: true,
  visible: true,
  hasOpenEditor: false,
  hasPendingWrites: false,
  hasRecentInput: false,
};

describe("automatic app update safety", () => {
  it("allows installation only during an idle online session", () => {
    expect(canAutoInstallAppUpdate(idle)).toBe(true);
    for (const blocked of [
      { online: false },
      { visible: false },
      { hasOpenEditor: true },
      { hasPendingWrites: true },
      { hasRecentInput: true },
    ]) {
      expect(canAutoInstallAppUpdate({ ...idle, ...blocked })).toBe(false);
    }
  });
});
