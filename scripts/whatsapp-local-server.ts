import { createServer, request as httpRequest, type IncomingMessage } from "node:http";
import { randomBytes } from "node:crypto";
import type { Socket } from "node:net";
import { Transform } from "node:stream";
import { StringDecoder } from "node:string_decoder";
import { WHATSAPP_PILOT_OWNER } from "../src/lib/whatsapp-local-access";
import { embeddedNotifications } from "./whatsapp-notification-client";

const COOKIE = "taskflow_whatsapp_local";
const TTL = 15 * 60_000;

// Only the private local bridge adds this presentation. The standalone chat is unchanged.
const EMBED_STYLE = `<style id="taskflow-whatsapp-embedded">aside.sticky{display:none!important}header button:has(svg.lucide-menu){display:none!important}</style>`;
function embeddedHtml(presentation: string) {
  const decoder = new StringDecoder("utf8");
  let pending = "";
  let injected = false;
  return new Transform({
    transform(chunk, _encoding, next) {
      const text = decoder.write(chunk);
      if (injected) this.push(text);
      else {
        pending += text;
        if (pending.includes("</head>") || pending.length > 131072) {
          this.push(pending.replace("</head>", `${presentation}</head>`));
          pending = ""; injected = true;
        }
      }
      next();
    },
    flush(next) { this.push(pending + decoder.end()); next(); },
  });
}

export async function verifyTaskflowOwner(token: string, config: {
  url: string; key: string; fetcher?: typeof fetch;
}) {
  if (!token || token.length > 16_384) return false;
  const fetcher = config.fetcher ?? fetch;
  const headers = { apikey: config.key, Authorization: `Bearer ${token}` };
  const response = await fetcher(`${config.url}/auth/v1/user`, {
    headers, signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) return false;
  const user = await response.json();
  if (user.id !== WHATSAPP_PILOT_OWNER.id ||
    user.email?.toLowerCase() !== WHATSAPP_PILOT_OWNER.email || !user.email_confirmed_at) return false;
  const roles = await fetcher(`${config.url}/rest/v1/user_roles?select=role&user_id=eq.${WHATSAPP_PILOT_OWNER.id}`, {
    headers, signal: AbortSignal.timeout(8_000),
  });
  if (!roles.ok) return false;
  const rows = await roles.json();
  return Array.isArray(rows) && rows.some(row => row.role === "admin");
}

function readCookie(request: IncomingMessage) {
  return request.headers.cookie?.split(";").map(value => value.trim())
    .find(value => value.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
}

export function createLocalChatBridge(config: {
  origin: string;
  upstream: URL;
  verifyAccess: (token: string) => Promise<boolean>;
  mintUpstreamCookie: () => Promise<string>;
  now?: () => number;
  themeCss?: string;
  themeScript?: string;
  publicOrigin?: string;
  healthcheck?: () => Promise<boolean>;
  pilotActivation?: boolean;
}) {
  const publicUrl = config.publicOrigin ? new URL(config.publicOrigin) : null;
  if (publicUrl && publicUrl.protocol !== "https:") throw new Error("Public gateway requires HTTPS.");
  const cookieFlags = `HttpOnly; SameSite=Strict; Path=/${publicUrl ? "; Secure" : ""}`;
  const hostAllowed = (request: IncomingMessage) => publicUrl
    ? request.headers.host === publicUrl.host : /^localhost:\d+$/.test(request.headers.host ?? "");
  const presentation = EMBED_STYLE + `<style id="taskflow-whatsapp-theme">${config.themeCss ?? ""}</style>` + embeddedNotifications(config.origin) + `<script>(()=>{
    const origin=${JSON.stringify(config.origin)};
    const colors=['background','foreground','card','card-foreground','popover','popover-foreground','primary','primary-foreground','secondary','secondary-foreground','muted','muted-foreground','accent','accent-foreground','border','input','ring'];
    window.addEventListener('message',e=>{
      if(e.source!==window.parent||e.origin!==origin||e.data?.type!=='taskflow-whatsapp-theme')return;
      const root=document.documentElement;root.classList.toggle('dark',e.data.dark===true);
      for(const name of colors){const value=e.data.values?.['--'+name];if(typeof value==='string'&&value.length<200&&CSS.supports('color',value))root.style.setProperty('--'+name,value,'important');}
      if(typeof e.data.font==='string'&&e.data.font.length<300)root.style.setProperty('--taskflow-font',e.data.font,'important');
    });
    window.parent.postMessage({type:'taskflow-whatsapp-theme-ready'},origin);
  })();</script>` + (config.themeScript ? `<script id="taskflow-whatsapp-enhancements">${config.themeScript.replaceAll("</script", "<\\/script")}</script>` : "");
  const now = config.now ?? Date.now;
  const sessions = new Map<string, { expires: number; cookie: string; sockets: Set<Socket> }>();
  const expire = (key: string) => {
    for (const socket of sessions.get(key)?.sockets ?? []) socket.destroy();
    sessions.delete(key);
  };
  const sessionFor = (request: IncomingMessage) => {
    const key = readCookie(request);
    if (!key) return;
    const session = sessions.get(key);
    if (session && session.expires > now()) return session;
    expire(key);
  };
  const allowedOrigin = (request: IncomingMessage) => !request.headers.origin ||
    request.headers.origin === config.origin ||
    request.headers.origin === (publicUrl?.origin ?? `http://${request.headers.host}`);
  const upstreamHeaders = (request: IncomingMessage, cookie: string) => {
    const headers = { ...request.headers };
    delete headers.authorization;
    delete headers["x-api-key"];
    // The chat reads its selected WhatsApp account from this UI preference.
    // Authentication cookies always come from our verified server-side session.
    const selected = request.headers.cookie?.split(";").map(value => value.trim())
      .find(value => /^sessionId=[a-zA-Z0-9_%.-]{1,200}$/.test(value));
    return { ...headers, host: config.upstream.host, cookie: selected ? `${cookie}; ${selected}` : cookie,
      "accept-encoding": "identity",
      "x-forwarded-host": config.upstream.host, "x-forwarded-proto": "http",
      origin: config.upstream.origin };
  };
  const server = createServer(async (request, response) => {
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("Referrer-Policy", "no-referrer");
    response.setHeader("Content-Security-Policy", `frame-ancestors ${config.origin};`);
    if (request.url === "/healthz" && config.healthcheck) {
      try { response.writeHead(await config.healthcheck() ? 200 : 503).end("health"); }
      catch { response.writeHead(503).end("health"); }
      return;
    }
    if (!hostAllowed(request) || !allowedOrigin(request)) {
      response.writeHead(403).end("Acesso negado."); return;
    }
    if (request.url === "/__taskflow/auth" || request.url === "/__taskflow/activate") {
      const activation = request.url === "/__taskflow/activate";
      if (activation && (!config.pilotActivation || publicUrl?.origin !== "https://chat.taskfloww.com.br" || config.origin !== "https://www.taskfloww.com.br")) {
        response.writeHead(404).end(); return;
      }
      if (request.headers.origin !== config.origin) { response.writeHead(403).end(); return; }
      response.setHeader("Access-Control-Allow-Origin", config.origin);
      response.setHeader("Access-Control-Allow-Credentials", "true");
      response.setHeader("Access-Control-Allow-Headers", "Content-Type");
      response.setHeader("Access-Control-Allow-Methods", "POST, DELETE, OPTIONS");
      if (request.method === "OPTIONS") { response.writeHead(204).end(); return; }
      if (request.method === "DELETE") {
        const key = readCookie(request);
        if (key) expire(key);
        response.setHeader("Set-Cookie", `${COOKIE}=; ${cookieFlags}; Max-Age=0`);
        response.writeHead(204).end(); return;
      }
      if (request.method !== "POST") { response.writeHead(405).end(); return; }
      try {
        let body = "";
        for await (const chunk of request) {
          body += chunk.toString();
          if (body.length > 20_000) { response.writeHead(413).end(); return; }
        }
        const { accessToken } = JSON.parse(body);
        if (typeof accessToken !== "string" || !await config.verifyAccess(accessToken)) {
          const previous = readCookie(request);
          if (previous) expire(previous);
          response.setHeader("Set-Cookie", `${COOKIE}=; ${cookieFlags}; Max-Age=0`);
          response.writeHead(403).end("Chat reservado ao administrador autorizado."); return;
        }
        const cookie = await config.mintUpstreamCookie();
        const key = randomBytes(32).toString("hex");
        sessions.set(key, { expires: now() + TTL, cookie, sockets: new Set() });
        const cookies = [`${COOKIE}=${key}; ${cookieFlags}; Max-Age=${TTL / 1000}`];
        // This is only a presentation/version selector, never authentication.
        // All chat requests still require the verified, host-only gateway cookie.
        if (activation) cookies.push("taskflow_private_pilot=whatsapp-20261021; Domain=taskfloww.com.br; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=2592000");
        response.setHeader("Set-Cookie", cookies);
        response.writeHead(204).end();
      } catch {
        response.writeHead(503).end("Não foi possível validar o acesso ao chat local.");
      }
      return;
    }
    const session = sessionFor(request);
    if (!session) { response.writeHead(401).end("Entre pelo WhatsApp no TaskFlow local."); return; }
    // Authentication happens exclusively through the checked TaskFlow account.
    if (request.url?.startsWith("/api/auth/") && !request.url.startsWith("/api/auth/session")) {
      response.writeHead(403).end("Gerencie o acesso pelo TaskFlow."); return;
    }
    const upstream = httpRequest({
      hostname: config.upstream.hostname, port: config.upstream.port,
      path: request.url ?? "/", method: request.method, headers: upstreamHeaders(request, session.cookie),
    }, incoming => {
      const isHtml = incoming.headers["content-type"]?.includes("text/html");
      for (const [name, value] of Object.entries(incoming.headers)) {
        if (isHtml && ["content-length", "etag"].includes(name)) continue;
        if (value !== undefined && !["set-cookie", "content-security-policy", "x-frame-options", "cache-control", "referrer-policy"].includes(name))
          response.setHeader(name, value);
      }
      const location = incoming.headers.location;
      if (location?.startsWith(config.upstream.origin))
        response.setHeader("Location", location.replace(config.upstream.origin, publicUrl?.origin ?? `http://${request.headers.host}`));
      response.writeHead(incoming.statusCode ?? 502);
      if (isHtml) incoming.pipe(embeddedHtml(presentation)).pipe(response);
      else incoming.pipe(response);
    });
    upstream.on("error", () => {
      if (!response.headersSent) response.writeHead(502);
      response.end("O chat local não está disponível. Inicie o serviço do WhatsApp.");
    });
    request.on("aborted", () => upstream.destroy());
    request.pipe(upstream);
  });
  server.on("upgrade", (request, socket, head) => {
    const session = sessionFor(request);
    if (!session || !hostAllowed(request) || !allowedOrigin(request) ||
      !request.url?.startsWith("/api/socket/io")) {
      socket.end("HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n"); return;
    }
    const upstream = httpRequest({
      hostname: config.upstream.hostname, port: config.upstream.port, path: request.url,
      headers: upstreamHeaders(request, session.cookie),
    });
    upstream.on("upgrade", (incoming, remote, remoteHead) => {
      const local = socket as Socket;
      session.sockets.add(local);
      const timer = setTimeout(() => local.destroy(), Math.max(1, session.expires - now()));
      timer.unref();
      local.on("close", () => { clearTimeout(timer); session.sockets.delete(local); remote.destroy(); });
      local.on("error", () => remote.destroy());
      remote.on("error", () => local.destroy());
      socket.write(`HTTP/1.1 ${incoming.statusCode} ${incoming.statusMessage}\r\n` +
        Object.entries(incoming.headers).filter(([key]) => key !== "set-cookie")
          .map(([key, value]) => `${key}: ${value}\r\n`).join("") + "\r\n");
      if (remoteHead.length) socket.write(remoteHead);
      if (head.length) remote.write(head);
      remote.pipe(socket); socket.pipe(remote);
    });
    upstream.on("response", () => socket.destroy());
    upstream.on("error", () => socket.destroy());
    upstream.end();
  });
  const cleanup = setInterval(() => {
    for (const [key, session] of sessions) if (session.expires <= now()) expire(key);
  }, 30_000);
  cleanup.unref();
  server.on("close", () => {
    clearInterval(cleanup);
    for (const key of sessions.keys()) expire(key);
  });
  return server;
}
