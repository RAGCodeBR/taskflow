import { SESSION_PROBE_MESSAGE, siblingTaskflowOrigin } from "./shared-task-session";

/** A tiny same-site document: no app boot, token refresh, offline sync or token transfer. */
export function sessionProbeResponse(request: Request, supabaseUrl: string | undefined): Response {
  const url = new URL(request.url);
  const parent = url.searchParams.get("parent");
  const requestId = url.searchParams.get("request");
  const headers = { "cache-control": "private, no-store, max-age=0", "referrer-policy": "no-referrer", "x-content-type-options": "nosniff" };
  // The TLS proxy can pass an HTTP Request URL to the app. Match only the
  // known host; the browser still calls HTTPS and CSP only permits HTTPS parents.
  const publicOrigin = url.origin.replace(/^http:/, "https:");
  if (!parent || siblingTaskflowOrigin(publicOrigin) !== parent || !requestId || !/^[0-9a-f-]{36}$/i.test(requestId)) {
    return new Response("Solicitação inválida.", { status: 400, headers });
  }
  let projectRef: string;
  try {
    const project = new URL(supabaseUrl ?? "");
    if (project.protocol !== "https:" || !/^[a-z0-9]+\.supabase\.co$/.test(project.hostname)) throw new Error("Invalid project");
    projectRef = project.hostname.split(".")[0];
  } catch {
    return new Response("Verificação indisponível.", { status: 503, headers });
  }
  const nonce = crypto.randomUUID();
  const script = `
    (() => {
      if (window.parent === window) return;
      let hasSession = false;
      try {
        const session = JSON.parse(localStorage.getItem(${JSON.stringify(`sb-${projectRef}-auth-token`)}) || 'null');
        hasSession = !!(session && typeof session.access_token === 'string' && session.access_token &&
          typeof session.refresh_token === 'string' && session.refresh_token && session.user && typeof session.user.id === 'string');
      } catch {}
      window.parent.postMessage({type:${JSON.stringify(SESSION_PROBE_MESSAGE)}, request:${JSON.stringify(requestId)}, hasSession}, ${JSON.stringify(parent)});
    })();`;
  return new Response(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Verificar sessão</title></head><body><script nonce="${nonce}">${script}</script></body></html>`, {
    headers: { ...headers, "content-type": "text/html; charset=utf-8", "content-security-policy": `default-src 'none'; script-src 'nonce-${nonce}'; frame-ancestors https://taskfloww.com.br https://www.taskfloww.com.br; base-uri 'none'; form-action 'none'` },
  });
}
