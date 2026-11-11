const APP_ORIGINS = ["https://taskfloww.com.br", "https://www.taskfloww.com.br"] as const;
export const SESSION_PROBE_MESSAGE = "taskflow-session-probe";
export const SESSION_PROBE_PATH = "/api/auth-session";

export function siblingTaskflowOrigin(origin: string): string | null {
  return APP_ORIGINS.includes(origin as typeof APP_ORIGINS[number])
    ? APP_ORIGINS.find((candidate) => candidate !== origin) ?? null
    : null;
}

export function isTaskLinkId(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export function siblingTaskLoginUrl(origin: string, taskId: string): string | null {
  const sibling = siblingTaskflowOrigin(origin);
  if (!sibling || !isTaskLinkId(taskId)) return null;
  const url = new URL("/auth", sibling);
  url.searchParams.set("task", taskId);
  // A stale saved session may fail to refresh. Stop here rather than bouncing
  // between domains if that happens; the ordinary login keeps this task target.
  url.searchParams.set("session_checked", "1");
  return url.href;
}

/** Ask only whether the sibling has a saved session; never transfer credentials. */
export function probeSiblingTaskSession(
  taskId: string,
  onResult: (redirect: string | null) => void,
  browser: Window = window,
  timeoutMs = 2500,
): () => void {
  const target = siblingTaskLoginUrl(browser.location.origin, taskId);
  if (!target || browser.navigator.onLine === false || !browser.crypto?.randomUUID) {
    onResult(null);
    return () => undefined;
  }
  const origin = new URL(target).origin;
  const requestId = browser.crypto.randomUUID();
  const probeUrl = new URL(SESSION_PROBE_PATH, origin);
  probeUrl.searchParams.set("parent", browser.location.origin);
  probeUrl.searchParams.set("request", requestId);
  const frame = browser.document.createElement("iframe");
  frame.hidden = true;
  frame.title = "Verificar sessão do TaskFlow";
  frame.referrerPolicy = "no-referrer";
  frame.setAttribute("aria-hidden", "true");
  frame.setAttribute("sandbox", "allow-scripts allow-same-origin");
  let active = true;
  let timer: number | undefined;
  const stop = () => {
    active = false;
    browser.removeEventListener("message", receive);
    if (timer !== undefined) browser.clearTimeout(timer);
    frame.remove();
  };
  const finish = (redirect: string | null) => {
    if (!active) return;
    stop();
    onResult(redirect);
  };
  const receive = (event: MessageEvent) => {
    if (event.origin !== origin || !frame.contentWindow || event.source !== frame.contentWindow) return;
    const data = event.data;
    if (!data || data.type !== SESSION_PROBE_MESSAGE || data.request !== requestId || typeof data.hasSession !== "boolean") return;
    finish(data.hasSession ? target : null);
  };
  browser.addEventListener("message", receive);
  timer = browser.setTimeout(() => finish(null), timeoutMs);
  frame.src = probeUrl.href;
  try {
    browser.document.body.appendChild(frame);
  } catch {
    finish(null);
  }
  return stop;
}
