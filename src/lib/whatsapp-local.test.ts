import { afterEach, describe, expect, it, vi } from "vitest";
import { createServer, request as httpRequest, type Server } from "node:http";
import { createLocalChatBridge, verifyTaskflowOwner } from "../../scripts/whatsapp-local-server";
import { canUseLocalWhatsApp, WHATSAPP_PILOT_OWNER } from "./whatsapp-local-access";
import { getVisibleAppUpdates } from "./app-updates";
import { publishedAppUpdates } from "./published-app-updates";
import { resolveWhatsAppPilotConfig } from "./whatsapp-pilot-config";

const origin = "http://localhost:5173";
const servers: Server[] = [];
async function listen(server: Server) {
  servers.push(server);
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  return `http://localhost:${(server.address() as { port: number }).port}`;
}
afterEach(async () => {
  for (const server of servers.splice(0)) {
    server.closeAllConnections();
    await new Promise<void>(resolve => server.close(() => resolve()));
  }
});

describe("private local WhatsApp access", () => {
  it("activates only the verified owner and never treats the rollout cookie as authentication", async () => {
    const upstream = await listen(createServer((_req,res)=>res.end("private")));
    const bridge = await listen(createLocalChatBridge({origin:"https://www.taskfloww.com.br",
      publicOrigin:"https://chat.taskfloww.com.br",upstream:new URL(upstream),pilotActivation:true,
      verifyAccess:async token=>token==="owner-token",mintUpstreamCookie:async()=>"authjs.session-token=internal"}));
    const send=(path:string,token?:string,cookie?:string)=>new Promise<{status:number;cookies:string[]}>((resolve,reject)=>{
      const req=httpRequest(bridge+path,{method:token?'POST':'GET',headers:{
        Host:'chat.taskfloww.com.br',Origin:'https://www.taskfloww.com.br','Content-Type':'application/json',...(cookie?{Cookie:cookie}:{}),
      }},res=>{res.resume();resolve({status:res.statusCode!,cookies:res.headers['set-cookie']??[]});});
      req.on('error',reject);req.end(token?JSON.stringify({accessToken:token}):undefined);
    });
    const denied=await send('/__taskflow/activate','other-admin');
    expect(denied.status).toBe(403);
    expect(denied.cookies.join()).not.toContain('taskflow_private_pilot');
    const allowed=await send('/__taskflow/activate','owner-token');
    expect(allowed.status).toBe(204);
    expect(allowed.cookies[1]).toContain('Domain=taskfloww.com.br');
    expect(allowed.cookies[1]).toContain('Secure; HttpOnly; SameSite=Strict');
    expect((await send('/dashboard/chat',undefined,'taskflow_private_pilot=whatsapp-20261021')).status).toBe(401);
    expect((await send('/dashboard/chat',undefined,allowed.cookies[0].split(';')[0])).status).toBe(200);
  });
  it("keeps production disabled unless the explicit same-site HTTPS pilot is configured", () => {
    expect(resolveWhatsAppPilotConfig({ DEV: false, VITE_WHATSAPP_LOCAL_ENABLED: "true" }).enabled).toBe(false);
    for (const url of ["http://chat.taskfloww.com.br", "https://evil.example", "https://chat.taskfloww.com.br/other", "https://user:pass@chat.taskfloww.com.br"]) {
      expect(resolveWhatsAppPilotConfig({ VITE_WHATSAPP_ENABLED: "true", VITE_WHATSAPP_BRIDGE_URL: url }).enabled).toBe(false);
    }
    expect(resolveWhatsAppPilotConfig({ VITE_WHATSAPP_ENABLED: "true", VITE_WHATSAPP_BRIDGE_URL: "https://chat.taskfloww.com.br" }))
      .toEqual({ enabled: true, origin: "https://chat.taskfloww.com.br" });
  });
  it("protects the public gateway and issues Secure cookies without exposing upstream credentials", async () => {
    const productionOrigin = "https://www.taskfloww.com.br";
    const publicOrigin = "https://chat.taskfloww.com.br";
    const upstream = await listen(createServer((_req, res) => { res.setHeader("Location", "http://placeholder/login"); res.end("private"); }));
    let healthy = true;
    const bridge = await listen(createLocalChatBridge({ origin: productionOrigin, publicOrigin, upstream: new URL(upstream),
      healthcheck: async () => healthy, verifyAccess: async token => token === "owner-token",
      mintUpstreamCookie: async () => "authjs.session-token=server-only" }));
    expect((await fetch(bridge + "/healthz")).status).toBe(200);
    healthy = false;
    expect((await fetch(bridge + "/healthz")).status).toBe(503);
    expect((await fetch(bridge + "/dashboard/chat")).status).toBe(403);
    const publicRequest = (path: string, headers: Record<string, string>, body?: string) => new Promise<{ status: number; cookie: string }>((resolve, reject) => {
      const request = httpRequest(bridge + path, { method: body ? "POST" : "GET", headers }, response => {
        response.resume();
        resolve({ status: response.statusCode!, cookie: response.headers["set-cookie"]?.[0] ?? "" });
      });
      request.on("error", reject); request.end(body);
    });
    const headers = { Host: "chat.taskfloww.com.br", Origin: productionOrigin, "Content-Type": "application/json" };
    expect((await publicRequest("/__taskflow/auth", headers, JSON.stringify({ accessToken: "someone-else" }))).status).toBe(403);
    const authenticated = await publicRequest("/__taskflow/auth", headers, JSON.stringify({ accessToken: "owner-token" }));
    expect(authenticated.status).toBe(204);
    const setCookie = authenticated.cookie;
    expect(setCookie).toContain("; Secure");
    expect(setCookie).not.toContain("server-only");
    const cookie = setCookie.split(";")[0];
    expect((await publicRequest("/dashboard/chat", { Host: headers.Host, Origin: publicOrigin, Cookie: cookie })).status).toBe(200);
    expect((await publicRequest("/dashboard/chat", { Host: headers.Host, Origin: "https://evil.example", Cookie: cookie })).status).toBe(403);
  });
  it("requires the exact owner, admin role, and local mode together", () => {
    expect(canUseLocalWhatsApp(WHATSAPP_PILOT_OWNER, true, true)).toBe(true);
    for (const candidate of [null, { id: "igor", email: "igor@example.com" },
      { id: "arthuro", email: WHATSAPP_PILOT_OWNER.email },
      { id: WHATSAPP_PILOT_OWNER.id, email: "other@example.com" }])
      expect(canUseLocalWhatsApp(candidate, true, true)).toBe(false);
    expect(canUseLocalWhatsApp(WHATSAPP_PILOT_OWNER, false, true)).toBe(false);
    expect(canUseLocalWhatsApp(WHATSAPP_PILOT_OWNER, true, false)).toBe(false);
  });
  it.each(["marketing", "consultoria"])("never announces this private test in %s", workspace => {
    for (const admin of [true, false])
      expect(getVisibleAppUpdates(admin, workspace).some(row => row.id.includes("whatsapp"))).toBe(false);
    expect(publishedAppUpdates().releases.some(row => row.id.includes("whatsapp"))).toBe(false);
  });
  it("verifies the token with Supabase and separately checks the current admin role", async () => {
    const fetcher = vi.fn().mockResolvedValueOnce(Response.json({
      ...WHATSAPP_PILOT_OWNER, email_confirmed_at: "2026-01-01",
    })).mockResolvedValueOnce(Response.json([{ role: "admin" }]));
    expect(await verifyTaskflowOwner("valid", { url: "https://supabase.example", key: "public", fetcher })).toBe(true);
    expect(fetcher.mock.calls[0][0]).toBe("https://supabase.example/auth/v1/user");
    expect(fetcher.mock.calls[0][1].headers.Authorization).toBe("Bearer valid");
  });
  it.each([
    { id: "another-admin", email: WHATSAPP_PILOT_OWNER.email, email_confirmed_at: "yes" },
    { ...WHATSAPP_PILOT_OWNER, email: "other@example.com", email_confirmed_at: "yes" },
    { ...WHATSAPP_PILOT_OWNER },
  ])("refuses alternate identities without consulting their role", async candidate => {
    const fetcher = vi.fn().mockResolvedValue(Response.json(candidate));
    expect(await verifyTaskflowOwner("forged", { url: "https://supabase.example", key: "public", fetcher })).toBe(false);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
  it("refuses revoked tokens and removed admin roles", async () => {
    const config = { url: "https://supabase.example", key: "public" };
    expect(await verifyTaskflowOwner("revoked", { ...config, fetcher: vi.fn().mockResolvedValue(new Response(null, { status: 401 })) })).toBe(false);
    const fetcher = vi.fn().mockResolvedValueOnce(Response.json({ ...WHATSAPP_PILOT_OWNER, email_confirmed_at: "yes" }))
      .mockResolvedValueOnce(Response.json([{ role: "collaborator" }]));
    expect(await verifyTaskflowOwner("old-admin", { ...config, fetcher })).toBe(false);
  });
  it("guards HTML, media, actions and sockets, proxies only an authorized session, and revokes on exit", async () => {
    let clock = 1000;
    const upstream = await listen(createServer((req, res) => {
      expect(req.headers.cookie).toBe(req.url === "/selected-account"
        ? "authjs.session-token=server-only; sessionId=zap-rei" : "authjs.session-token=server-only");
      expect(req.headers["x-api-key"]).toBeUndefined();
      if (req.url === "/embedded") {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.setHeader("Content-Length", Buffer.byteLength("<html><head></head><body>Chat</body></html>"));
        res.end("<html><head></head><body>Chat</body></html>"); return;
      }
      res.setHeader("Set-Cookie", "authjs.session-token=do-not-expose");
      res.end("authorized chat");
    }));
    const verifyAccess = vi.fn(async token => token === "owner-token");
    const mintUpstreamCookie = vi.fn(async () => "authjs.session-token=server-only");
    const bridge = await listen(createLocalChatBridge({
      origin, upstream: new URL(upstream), verifyAccess, mintUpstreamCookie, now: () => clock,
      themeCss: ".tf-card{color:red}", themeScript: "window.taskflowChatEnhancements=true;",
    }));
    for (const path of ["/dashboard/chat", "/api/chat/rei_Pessoal/messages", "/api/media/photo", "/api/socket/io"])
      expect((await fetch(bridge + path)).status).toBe(401);
    const auth = (accessToken: string, source = origin) => fetch(bridge + "/__taskflow/auth", {
      method: "POST", headers: { Origin: source, "Content-Type": "application/json" }, body: JSON.stringify({ accessToken }),
    });
    expect((await auth("another-user")).status).toBe(403);
    expect((await auth("owner-token", "https://evil.example")).status).toBe(403);
    expect(mintUpstreamCookie).not.toHaveBeenCalled();
    const accepted = await auth("owner-token");
    expect(accepted.status).toBe(204);
    expect(accepted.headers.get("set-cookie")).toContain("HttpOnly; SameSite=Strict");
    const cookie = accepted.headers.get("set-cookie")!.split(";")[0];
    const response = await fetch(bridge + "/dashboard/chat", { headers: { Cookie: cookie, "x-api-key": "attacker" } });
    expect(await response.text()).toBe("authorized chat");
    expect(response.headers.get("set-cookie")).toBeNull();
    expect(response.headers.get("content-security-policy")).toContain(origin);
    const embedded = await fetch(bridge + "/embedded", { headers: { Cookie: cookie } });
    expect(embedded.headers.get("content-length")).toBeNull();
    const html = await embedded.text();
    expect(html).toContain('id="taskflow-whatsapp-embedded"');
    expect(html).toContain(".tf-card{color:red}");
    expect(html).toContain('id="taskflow-whatsapp-enhancements"');
    expect(html).toContain("window.taskflowChatEnhancements=true;");
    const selected = await fetch(bridge + "/selected-account", { headers: {
      Cookie: `${cookie}; sessionId=zap-rei; authjs.session-token=forged-browser-login`,
    } });
    expect(await selected.text()).toBe("authorized chat");
    expect((await fetch(bridge + "/api/auth/callback/credentials", { headers: { Cookie: cookie } })).status).toBe(403);
    expect((await fetch(bridge + "/dashboard/chat", { headers: { Cookie: cookie, Origin: "https://evil.example" } })).status).toBe(403);
    const deniedUpgrade = await new Promise<number>(resolve => {
      const req = httpRequest(bridge + "/api/socket/io", { headers: { Connection: "Upgrade", Upgrade: "websocket" } }, res => resolve(res.statusCode!)); req.end();
    });
    expect(deniedUpgrade).toBe(403);
    clock += 16 * 60_000;
    expect((await fetch(bridge + "/dashboard/chat", { headers: { Cookie: cookie } })).status).toBe(401);
    const renewed = await auth("owner-token");
    const renewedCookie = renewed.headers.get("set-cookie")!.split(";")[0];
    expect((await fetch(bridge + "/__taskflow/auth", { method: "DELETE", headers: { Cookie: renewedCookie, Origin: origin } })).status).toBe(204);
    expect((await fetch(bridge + "/dashboard/chat", { headers: { Cookie: renewedCookie } })).status).toBe(401);
  });
});
