import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";
import { sessionProbeResponse } from "./session-probe-response";

const project = "https://exampleproject.supabase.co";
const id = "00000000-0000-4000-8000-000000000001";
const url = `https://taskfloww.com.br/api/auth-session?parent=https%3A%2F%2Fwww.taskfloww.com.br&request=${id}`;
describe("same-site session presence document", () => {
  it("accepts the original allowed host when a TLS proxy supplies an HTTP request URL", () => {
    expect(sessionProbeResponse(new Request(url.replace(/^https:/, "http:")), project).status).toBe(200);
  });
  it("only replies to the exact sibling origin and never exports tokens", async () => {
    const response = sessionProbeResponse(new Request(url), project);
    const html = await response.text();
    const script = html.match(/<script nonce="[^"]+">([\s\S]*)<\/script>/)![1];
    const post = vi.fn(); const get = vi.fn(() => JSON.stringify({ access_token: "PRIVATE_ACCESS", refresh_token: "PRIVATE_REFRESH", user: { id: "viewer" } }));
    const set = vi.fn(); const fetch = vi.fn();
    runInNewContext(script, { window: { parent: { postMessage: post } }, localStorage: { getItem: get, setItem: set }, fetch });
    expect(get).toHaveBeenCalledWith("sb-exampleproject-auth-token");
    expect(post).toHaveBeenCalledWith({ type: "taskflow-session-probe", request: id, hasSession: true }, "https://www.taskfloww.com.br");
    expect(JSON.stringify(post.mock.calls)).not.toContain("PRIVATE_");
    expect(set).not.toHaveBeenCalled(); expect(fetch).not.toHaveBeenCalled();
    expect(response.headers.get("cache-control")).toContain("no-store");
    expect(response.headers.get("content-security-policy")).toContain("frame-ancestors https://taskfloww.com.br https://www.taskfloww.com.br;");
  });
  it.each([null, "not json", JSON.stringify({ access_token: "only" })])("reports absent or incomplete storage as signed out: %s", async (stored) => {
    const html = await sessionProbeResponse(new Request(url), project).text();
    const post = vi.fn();
    runInNewContext(html.match(/<script nonce="[^"]+">([\s\S]*)<\/script>/)![1], { window: { parent: { postMessage: post } }, localStorage: { getItem: () => stored } });
    expect(post.mock.calls[0][0].hasSession).toBe(false);
  });
  it("handles blocked storage without clearing any browser data", async () => {
    const html = await sessionProbeResponse(new Request(url), project).text(); const post = vi.fn();
    runInNewContext(html.match(/<script nonce="[^"]+">([\s\S]*)<\/script>/)![1], { window: { parent: { postMessage: post } }, localStorage: { getItem: () => { throw new Error("blocked"); } } });
    expect(post.mock.calls[0][0].hasSession).toBe(false);
  });
  it("rejects an arbitrary parent, unknown deployment, injected request and missing project", () => {
    expect(sessionProbeResponse(new Request(url.replace("www.taskfloww.com.br", "evil.test")), project).status).toBe(400);
    expect(sessionProbeResponse(new Request(url.replace("https://taskfloww.com.br/", "https://evil.test/")), project).status).toBe(400);
    expect(sessionProbeResponse(new Request(url.replace(id, "%3Cscript%3E")), project).status).toBe(400);
    expect(sessionProbeResponse(new Request(url), undefined).status).toBe(503);
  });
});
