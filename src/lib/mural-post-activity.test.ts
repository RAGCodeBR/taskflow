import { describe, expect, it } from "vitest";
import { muralPostActivitySince, muralPostUpdateActivity } from "./mural-post-activity";

const post = {
  id: "post", title: "Avisos da equipe", content: "Texto", created_by: "igor",
  is_pinned: false, checklist: [{ text: "Revisar", done: false }], canvas_x: 0, canvas_y: 0,
  updated_at: "2026-10-29T18:00:00Z", last_activity_by: "igor", last_activity_at: "2026-10-29T18:00:00Z",
};
const pinned = { ...post, is_pinned: true, last_activity_by: "gabriel" };

describe("mural update activity", () => {
  it("identifies the authenticated editor instead of the original author", () => {
    expect(muralPostUpdateActivity(post, pinned, "reader")).toEqual({
      actorId: "gabriel", verb: "fixou", title: "Avisos da equipe",
    });
  });
  it("does not notify Gabriel about his own action on Igor's post", () => {
    expect(muralPostUpdateActivity(post, pinned, "gabriel")).toBeNull();
  });
  it("notifies the author when someone else edits their post", () => {
    expect(muralPostUpdateActivity(post, { ...post, content: "Revisado", last_activity_by: "gabriel" }, "igor")?.actorId).toBe("gabriel");
  });
  it("identifies unpinning", () => {
    expect(muralPostUpdateActivity(pinned, { ...pinned, is_pinned: false }, "reader")?.verb).toBe("desfixou");
  });
  it("uses a general update for several changes at once", () => {
    expect(muralPostUpdateActivity(post, { ...pinned, content: "Revisado" }, "reader")?.verb).toBe("atualizou");
  });
  it("ignores card movements, metadata and equal checklist copies", () => {
    expect(muralPostUpdateActivity(post, { ...post, canvas_x: 12, canvas_y: 25, updated_at: "later", checklist: structuredClone(post.checklist) }, "reader")).toBeNull();
  });
  it("still recognizes a checklist edit", () => {
    expect(muralPostUpdateActivity(post, { ...post, checklist: [{ text: "Revisar", done: true }], last_activity_by: "gabriel" }, "reader")?.actorId).toBe("gabriel");
  });
  it("never guesses the author for legacy rows or background jobs", () => {
    expect(muralPostUpdateActivity(post, { ...pinned, last_activity_by: null }, "reader")).toBeNull();
  });
  it("does not invent an edit if the previous row is missing or incomplete", () => {
    expect(muralPostUpdateActivity({}, pinned, "reader")).toBeNull();
    expect(muralPostUpdateActivity({ id: "post" }, pinned, "reader")).toBeNull();
  });
});

describe("mural activity since the last visit", () => {
  const historical = { created_at: "2026-10-28T10:00:00Z", last_activity_at: "2026-10-29T12:00:00Z", last_activity_by: "gabriel" };
  const lastSeen = Date.parse("2026-10-29T10:00:00Z");
  it("attributes a recent update to its editor", () => {
    expect(muralPostActivitySince(historical, lastSeen, "reader")).toBe("gabriel");
  });
  it("suppresses the viewer's own update", () => {
    expect(muralPostActivitySince(historical, lastSeen, "gabriel")).toBeNull();
  });
  it("ignores old updates and newly created posts", () => {
    expect(muralPostActivitySince(historical, Date.parse("2026-10-29T13:00:00Z"), "reader")).toBeNull();
    expect(muralPostActivitySince({ ...historical, created_at: historical.last_activity_at }, lastSeen, "reader")).toBeNull();
  });
  it("ignores unknown editors and invalid activity dates", () => {
    expect(muralPostActivitySince({ ...historical, last_activity_by: null }, lastSeen, "reader")).toBeNull();
    expect(muralPostActivitySince({ ...historical, last_activity_at: "invalid" }, lastSeen, "reader")).toBeNull();
  });
});
