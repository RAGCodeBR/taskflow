import { afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ from: vi.fn(), notify: vi.fn() }));
vi.mock("react", () => ({ useEffect: (run: () => void) => run() }));
vi.mock("@/hooks/use-auth", () => ({ useAuth: () => ({ user: { id: "viewer" } }) }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from: mocks.from } }));
vi.mock("@/lib/mural-activity-toast", () => ({ muralActivityToast: mocks.notify }));

afterEach(() => vi.unstubAllGlobals());

describe("mural launch digest", () => {
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
