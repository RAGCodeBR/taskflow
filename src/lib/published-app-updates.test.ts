import { describe, expect, it } from "vitest";
import { APP_UPDATES, getVisibleAppUpdates } from "./app-updates";
import {
  newerPublishedAppUpdate,
  publishedAppUpdates,
  readPublishedAppUpdates,
} from "./published-app-updates";

describe("independent published release catalogue", () => {
  it("derives metadata directly from the existing catalogue", () => {
    const releases = readPublishedAppUpdates(publishedAppUpdates());
    expect(releases.map((release) => release.id)).toEqual(APP_UPDATES.map((release) => release.id));
    expect(releases[0].title).toBe(APP_UPDATES[0].title);
  });
  it.each(["marketing", "consultoria"])("detects an old compiled catalogue in %s", (workspace) => {
    const installed = getVisibleAppUpdates(false, workspace).slice(1);
    expect(
      newerPublishedAppUpdate(publishedAppUpdates().releases, installed, false, workspace)?.id,
    ).toBe(APP_UPDATES[0].id);
    expect(
      newerPublishedAppUpdate(
        publishedAppUpdates().releases,
        getVisibleAppUpdates(false, workspace),
        false,
        workspace,
      ),
    ).toBeNull();
  });
  it("does not leak an admin-only or another workspace notice", () => {
    const installed = getVisibleAppUpdates(false, "marketing");
    const newer = {
      ...publishedAppUpdates().releases[0],
      id: "future",
      date: "2026-10-09",
      audience: "admin" as const,
    };
    expect(
      newerPublishedAppUpdate(
        [newer, ...publishedAppUpdates().releases],
        installed,
        false,
        "marketing",
      ),
    ).toBeNull();
    expect(newerPublishedAppUpdate([newer], installed, true, "marketing")?.id).toBe("future");
    expect(
      newerPublishedAppUpdate(
        [{ ...newer, workspaces: ["consultoria"] }],
        installed,
        true,
        "marketing",
      ),
    ).toBeNull();
    expect(newerPublishedAppUpdate([newer], installed, true, "unknown")).toBeNull();
  });
  it("does not advertise an older deployment as an upgrade", () => {
    const installed = getVisibleAppUpdates(false, "marketing");
    expect(
      newerPublishedAppUpdate(
        [{ ...publishedAppUpdates().releases[0], id: "old", date: "2026-10-01" }],
        installed,
        false,
        "marketing",
      ),
    ).toBeNull();
  });
  it.each([
    null,
    {},
    { releases: [] },
    { releases: [{ id: "invalid" }] },
    { releases: "html fallback" },
  ])("rejects malformed metadata without declaring the browser current", (value) => {
    expect(() => readPublishedAppUpdates(value)).toThrow("verificar a versão");
  });
});
