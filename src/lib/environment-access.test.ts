import { describe, expect, it } from "vitest";
import { hasMarketingTaskExperience } from "./environment-access";

describe("enhanced task editor access", () => {
  it("shows the new workflow to everyone in Marketing and only Reinan in Consultoria", () => {
    expect(hasMarketingTaskExperience("marketing", "reinangrupoahouse@gmail.com")).toBe(true);
    expect(hasMarketingTaskExperience("consultoria", "REINANGRUPOAHOUSE@gmail.com")).toBe(true);
    expect(hasMarketingTaskExperience("marketing", "colaboradora@example.com")).toBe(true);
    expect(hasMarketingTaskExperience("consultoria", "colaboradora@example.com")).toBe(false);
    expect(hasMarketingTaskExperience("other", "reinangrupoahouse@gmail.com")).toBe(false);
  });
});
