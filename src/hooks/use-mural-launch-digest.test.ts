import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ from: vi.fn(), notify: vi.fn() }));
vi.mock("react", () => ({ useEffect: (run: () => void) => run() }));
vi.mock("@/hooks/use-auth", () => ({ useAuth: () => ({ user: { id: "viewer" } }) }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from: mocks.from } }));
vi.mock("@/lib/mural-activity-toast", () => ({ muralActivityToast: mocks.notify }));

afterEach(() => vi.unstubAllGlobals());
beforeEach(() => { vi.resetModules(); mocks.notify.mockClear(); });

describe("mural launch digest", () => {
  it.each([
    ["igor", "gabriel", true],
    ["viewer", "gabriel", true],
    ["igor", "viewer", false],
    ["igor", null, false],
  ])("uses the last actor when the creator is %s and the editor is %s", async (creator, editor, notified) => {
    vi.stubGlobal("localStorage", { getItem: () => "1000", setItem: vi.fn() });
    mocks.from.mockImplementation((table: string) => ({
      select() {
        const data = table === "profiles" ? [{ id: "gabriel", full_name: "Gabriel" }]
          : table === "mural_posts" ? [{ id: "post", title: "Avisos", created_by: creator,
              created_at: new Date(0).toISOString(), updated_at: new Date(2000).toISOString(),
              last_activity_by: editor, last_activity_at: new Date(2000).toISOString() }]
          : [];
        const result = { data, error: null };
        return { ...result, gt: () => Promise.resolve(result) };
      },
    }));
    const { useMuralLaunchDigest } = await import("./use-mural-launch-digest");
    useMuralLaunchDigest();
    await new Promise((resolve) => setTimeout(resolve, 0));
    if (notified) expect(mocks.notify.mock.calls[0]?.[0]).toBe('Gabriel atualizou "Avisos"');
    else expect(mocks.notify).not.toHaveBeenCalled();
  });
  it("resolves actor names with the permitted profile columns, without requesting email", async () => {
    vi.stubGlobal("localStorage", { getItem: () => "1000", setItem: vi.fn() });
    const selected: Record<string, string> = {};
    mocks.from.mockImplementation((table: string) => ({
      select(columns: string) {
        selected[table] = columns;
        const data =
          table === "profiles"
            ? [{ id: "actor", full_name: "Ana" }]
            : table === "mural_posts"
              ? [{ id: "post", title: "Aviso", created_at: new Date(0).toISOString() }]
              : table === "mural_post_reactions"
                ? [{ post_id: "post", user_id: "actor", emoji: "👍" }]
                : [];
        // Match column-level security: any accidental email request is rejected.
        const result = columns.includes("email")
          ? { data: null, error: { code: "42501" } }
          : { data, error: null };
        return { ...result, gt: () => Promise.resolve(result) };
      },
    }));
    const { useMuralLaunchDigest } = await import("./use-mural-launch-digest");
    useMuralLaunchDigest();
    await vi.waitFor(() =>
      expect(mocks.notify.mock.calls[0]?.[0]).toBe('Ana reagiu 👍 em "Aviso"'),
    );
    expect(selected.profiles.split(",").map((column) => column.trim())).toEqual([
      "id",
      "full_name",
    ]);
  });
});
