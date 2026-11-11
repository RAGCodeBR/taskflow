import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ effect: undefined as (() => (() => void) | void) | undefined, probe: vi.fn(), state: vi.fn(), signedIn: { current: false } }));
vi.mock("react", () => ({ useEffect: (run: typeof mocks.effect) => { mocks.effect = run; }, useState: (value: () => boolean) => [value(), mocks.state], useRef: () => mocks.signedIn }));
vi.mock("@/lib/shared-task-session", () => ({ probeSiblingTaskSession: mocks.probe, siblingTaskflowOrigin: () => "https://taskfloww.com.br" }));
import { useSharedTaskSession } from "./use-shared-task-session";

describe("shared task session gate", () => {
  beforeEach(() => { vi.stubGlobal("window", { location: { origin: "https://www.taskfloww.com.br", replace: vi.fn() } }); mocks.probe.mockReset(); mocks.state.mockReset(); });
  afterEach(() => vi.unstubAllGlobals());
  const input = { taskId: "task", ready: true, signedIn: false, skip: false };
  it("waits for the ordinary local session restore before probing", () => {
    useSharedTaskSession({ ...input, ready: false }); mocks.effect?.();
    expect(mocks.probe).not.toHaveBeenCalled();
  });
  it.each([{ signedIn: true }, { skip: true }, { taskId: null }])("preserves existing login, invitation, OAuth and one-hop flows: %s", (patch) => {
    useSharedTaskSession({ ...input, ...patch }); mocks.effect?.();
    expect(mocks.probe).not.toHaveBeenCalled(); expect(mocks.state).toHaveBeenCalledWith(false);
  });
  it("redirects a shared link when a sibling session is present", () => {
    useSharedTaskSession(input); mocks.effect?.();
    mocks.probe.mock.calls[0][1]("https://taskfloww.com.br/auth?task=task&session_checked=1");
    expect(window.location.replace).toHaveBeenCalledWith("https://taskfloww.com.br/auth?task=task&session_checked=1");
  });
  it("uses login if none is found and lets a local session take precedence", () => {
    useSharedTaskSession(input); mocks.effect?.();
    const done = mocks.probe.mock.calls[0][1]; done(null);
    expect(mocks.state).toHaveBeenCalledWith(false);
    mocks.signedIn.current = true; done("https://taskfloww.com.br/auth");
    expect(window.location.replace).not.toHaveBeenCalled();
  });
});
