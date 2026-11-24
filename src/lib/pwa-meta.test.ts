import { describe, expect, it } from "vitest";
import { installedAppMeta } from "./pwa-meta";

describe("installedAppMeta", () => {
  it("limits theme-color to phone widths so desktop Safari keeps its tab bar color", () => {
    const theme = installedAppMeta.find((meta) => meta.name === "theme-color");
    expect(theme).toMatchObject({ content: "#142e63", media: "(max-width: 767px)" });
  });
  it("declares the iPhone home-screen app tags", () => {
    expect(installedAppMeta.map((meta) => meta.name)).toEqual(
      expect.arrayContaining([
        "apple-mobile-web-app-capable",
        "apple-mobile-web-app-status-bar-style",
        "apple-mobile-web-app-title",
      ]),
    );
  });
});
