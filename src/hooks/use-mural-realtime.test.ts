import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  viewer: "reader",
  handlers: {} as Record<string, (payload: unknown) => void>,
  notify: vi.fn(), invalidate: vi.fn(),
}));
vi.mock("react", () => ({ useEffect: (run: () => void) => run(), useRef: (value: unknown) => ({ current: value }) }));
vi.mock("@/hooks/use-auth", () => ({ useAuth: () => ({ user: { id: mocks.viewer } }) }));
vi.mock("@tanstack/react-query", () => ({ useQueryClient: () => ({
  invalidateQueries: mocks.invalidate,
  getQueryData: () => [{ id: "gabriel", full_name: "Gabriel" }, { id: "igor", full_name: "Igor" }],
  getQueriesData: () => [[["mural_posts", "workspace"], [{ id: "post", title: "Avisos" }]]],
}) }));
vi.mock("@/lib/mural-activity-toast", () => ({ muralActivityToast: mocks.notify }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: {
  channel: () => {
    const channel = {
      on: (_event: unknown, filter: { table: string }, handler: (payload: unknown) => void) => { mocks.handlers[filter.table] = handler; return channel; },
      subscribe: () => channel,
    };
    return channel;
  }, removeChannel: vi.fn(),
} }));
import { useMuralRealtime } from "./use-mural-realtime";

const original = { id: "post", title: "Avisos", created_by: "igor", is_pinned: false, checklist: [] };
beforeEach(() => { mocks.viewer = "reader"; mocks.notify.mockClear(); mocks.invalidate.mockClear(); });
function sendPin(pinned = true) {
  useMuralRealtime();
  mocks.handlers.mural_posts({ eventType: "UPDATE", old: { ...original, is_pinned: !pinned }, new: { ...original, is_pinned: pinned, last_activity_by: "gabriel" } });
}
describe("mural realtime notices", () => {
  it.each([[true, "fixou"], [false, "desfixou"]] as const)("attributes pin=%s to Gabriel", (pinned, verb) => {
    sendPin(pinned);
    expect(mocks.notify).toHaveBeenCalledWith(`Gabriel ${verb} "Avisos"`);
  });
  it("refreshes the post without showing an activity notice to the person acting", () => {
    mocks.viewer = "gabriel";
    sendPin();
    expect(mocks.invalidate).toHaveBeenCalledWith({ queryKey: ["mural_posts"] });
    expect(mocks.notify).not.toHaveBeenCalled();
  });
  it("lets the post creator see who changed it", () => {
    mocks.viewer = "igor";
    sendPin();
    expect(mocks.notify).toHaveBeenCalledWith('Gabriel fixou "Avisos"');
  });
  it("keeps attachment and reaction attribution", () => {
    useMuralRealtime();
    mocks.handlers.mural_post_attachments({ eventType: "INSERT", new: { uploaded_by: "gabriel", post_id: "post", file_name: "briefing.pdf" } });
    mocks.handlers.mural_post_reactions({ eventType: "INSERT", new: { user_id: "igor", post_id: "post", emoji: "👍" } });
    expect(mocks.notify).toHaveBeenCalledWith('Gabriel anexou briefing.pdf em "Avisos"');
    expect(mocks.notify).toHaveBeenCalledWith('Igor reagiu 👍 em "Avisos"');
  });
});
