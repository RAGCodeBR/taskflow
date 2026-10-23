import { describe, expect, it } from "vitest";
import { hasMarketingTaskExperience } from "./environment-access";

describe("enhanced task editor access", () => {
  it("shows the new workflow only inside Marketing, regardless of account or role", () => {
    expect(hasMarketingTaskExperience("marketing", "reinangrupoahouse@gmail.com")).toBe(true);
    expect(hasMarketingTaskExperience("consultoria", "REINANGRUPOAHOUSE@gmail.com")).toBe(false);
    expect(hasMarketingTaskExperience("marketing", "colaboradora@example.com")).toBe(true);
    expect(hasMarketingTaskExperience("consultoria", "colaboradora@example.com")).toBe(false);
    expect(hasMarketingTaskExperience("other", "reinangrupoahouse@gmail.com")).toBe(false);
  });
});
