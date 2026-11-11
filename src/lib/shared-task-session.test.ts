import { describe, expect, it, vi } from "vitest";
import { isTaskLinkId, probeSiblingTaskSession, siblingTaskflowOrigin, siblingTaskLoginUrl } from "./shared-task-session";

const task = "4a0be135-45ee-4304-94ba-8bc90cb46247";
const requestId = "00000000-0000-4000-8000-000000000001";
function browserFixture(origin = "https://www.taskfloww.com.br") {
  let listener: ((event: MessageEvent) => void) | undefined;
  let timeout: (() => void) | undefined;
  const frame = { contentWindow: {}, setAttribute: vi.fn(), remove: vi.fn(), src: "", hidden: false };
  const append = vi.fn();
  const browser = {
    location: { origin }, navigator: { onLine: true }, crypto: { randomUUID: () => requestId },
    document: { createElement: () => frame, body: { appendChild: append } },
    addEventListener: (_: string, fn: (event: MessageEvent) => void) => { listener = fn; },
    removeEventListener: vi.fn(), clearTimeout: vi.fn(),
    setTimeout: (fn: () => void) => { timeout = fn; return 7; },
  } as unknown as Window;
  const receive = (patch: Record<string, unknown> = {}) => listener?.({
    origin: "https://taskfloww.com.br", source: frame.contentWindow,
    data: { type: "taskflow-session-probe", request: requestId, hasSession: true }, ...patch,
  } as MessageEvent);
  return { browser, frame, append, receive, expire: () => timeout?.() };
}
describe("shared task session detection", () => {
  it("recognizes only the two HTTPS application origins", () => {
    expect(siblingTaskflowOrigin("https://taskfloww.com.br")).toBe("https://www.taskfloww.com.br");
    expect(siblingTaskflowOrigin("https://www.taskfloww.com.br")).toBe("https://taskfloww.com.br");
    for (const origin of ["http://taskfloww.com.br", "https://chat.taskfloww.com.br", "https://taskfloww.com.br.evil.test", "http://localhost:5173"]) expect(siblingTaskflowOrigin(origin)).toBeNull();
  });
  it("keeps the exact task and limits a failed restore to one domain hop", () => {
    const url = new URL(siblingTaskLoginUrl("https://www.taskfloww.com.br", task)!);
    expect(url.origin).toBe("https://taskfloww.com.br");
    expect(url.pathname).toBe("/auth");
    expect(url.searchParams.get("task")).toBe(task);
    expect(url.searchParams.get("session_checked")).toBe("1");
    expect(isTaskLinkId(task)).toBe(true);
    expect(siblingTaskLoginUrl("https://www.taskfloww.com.br", "https://evil.test")).toBeNull();
  });
  it("accepts a response only from the requested sibling frame and request", () => {
    const f = browserFixture(); const done = vi.fn();
    probeSiblingTaskSession(task, done, f.browser);
    f.receive({ origin: "https://evil.test" });
    f.receive({ source: {} });
    f.receive({ data: { type: "taskflow-session-probe", request: "wrong", hasSession: true } });
    expect(done).not.toHaveBeenCalled();
    f.receive();
    expect(done).toHaveBeenCalledWith(siblingTaskLoginUrl(f.browser.location.origin, task));
    expect(f.frame.remove).toHaveBeenCalledOnce();
    expect(new URL(f.frame.src).searchParams.get("parent")).toBe(f.browser.location.origin);
  });
  it("releases login when no session exists or the other origin cannot reply", () => {
    const f = browserFixture(); const done = vi.fn();
    probeSiblingTaskSession(task, done, f.browser);
    f.receive({ data: { type: "taskflow-session-probe", request: requestId, hasSession: false } });
    expect(done).toHaveBeenCalledWith(null);
    const g = browserFixture(); const timedOut = vi.fn();
    probeSiblingTaskSession(task, timedOut, g.browser);
    g.expire(); g.receive();
    expect(timedOut).toHaveBeenCalledExactlyOnceWith(null);
  });
  it("cancels a pending lookup when a local session arrives or the page unmounts", () => {
    const f = browserFixture(); const done = vi.fn();
    const cancel = probeSiblingTaskSession(task, done, f.browser);
    cancel(); f.receive(); f.expire();
    expect(done).not.toHaveBeenCalled();
  });
  it("does not probe other deployments or wait for the internet while offline", () => {
    const f = browserFixture("http://localhost:5173"); const done = vi.fn();
    probeSiblingTaskSession(task, done, f.browser);
    expect(done).toHaveBeenCalledWith(null); expect(f.append).not.toHaveBeenCalled();
    const g = browserFixture(); Object.defineProperty(g.browser.navigator, "onLine", { value: false });
    probeSiblingTaskSession(task, done, g.browser);
    expect(g.append).not.toHaveBeenCalled();
  });
});
