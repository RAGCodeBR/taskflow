import { supabase } from "@/integrations/supabase/client";

/** O push só aparece depois que a chave pública VAPID existe no build. */
export function isPushConfigured(
  key: string | undefined = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined,
): boolean {
  return Boolean(key);
}

export type PushSupport = "ok" | "install-first" | "unsupported";

type Env = { isIOS: boolean; standalone: boolean; hasPush: boolean };

function currentEnv(): Env {
  if (typeof window === "undefined") return { isIOS: false, standalone: false, hasPush: false };
  const ua = navigator.userAgent;
  const isIOS =
    /iPhone|iPad|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
  const standalone =
    window.matchMedia?.("(display-mode: standalone)").matches ||
    (navigator as { standalone?: boolean }).standalone === true;
  const hasPush =
    "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
  return { isIOS, standalone, hasPush };
}

/** No iPhone o push só existe com o app instalado na Tela de Início (iOS 16.4+). */
export function pushSupport(env: Env = currentEnv()): PushSupport {
  if (env.isIOS && !env.standalone) return "install-first";
  return env.hasPush ? "ok" : "unsupported";
}

export function isStandaloneApp(): boolean {
  return currentEnv().standalone;
}

export function urlBase64ToUint8Array(value: string): Uint8Array {
  const padded = (value + "=".repeat((4 - (value.length % 4)) % 4))
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const raw = atob(padded);
  return Uint8Array.from(raw, (char) => char.charCodeAt(0));
}

async function registration() {
  const existing = await navigator.serviceWorker.getRegistration();
  if (!existing)
    throw new Error("O app ainda está terminando de instalar. Abra de novo em alguns segundos.");
  return existing;
}

export async function currentPushSubscription(): Promise<PushSubscription | null> {
  if (pushSupport() !== "ok") return null;
  const reg = await navigator.serviceWorker.getRegistration();
  return (await reg?.pushManager.getSubscription()) ?? null;
}

/** Deve ser chamada a partir de um toque do usuário (exigência do iOS). */
export async function subscribeToPush(): Promise<void> {
  const key = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;
  if (!key) throw new Error("As notificações ainda não foram configuradas no servidor.");
  const permission = await Notification.requestPermission();
  if (permission !== "granted") throw new Error("Permissão de notificações negada.");
  const reg = await registration();
  const subscription =
    (await reg.pushManager.getSubscription()) ??
    (await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(key) as BufferSource,
    }));
  const json = subscription.toJSON();
  const { error } = await (supabase.rpc as any)("save_push_subscription", {
    p_endpoint: subscription.endpoint,
    p_p256dh: json.keys?.p256dh,
    p_auth: json.keys?.auth,
    p_user_agent: navigator.userAgent.slice(0, 300),
  });
  if (error) throw error;
}

export async function unsubscribeFromPush(): Promise<void> {
  const subscription = await currentPushSubscription();
  if (!subscription) return;
  await (supabase.from as any)("push_subscriptions").delete().eq("endpoint", subscription.endpoint);
  await subscription.unsubscribe();
}

export async function sendTestPush(): Promise<void> {
  const { error } = await supabase.functions.invoke("send-push", { body: { test: true } });
  if (error) throw error;
}

/** Número no ícone do app instalado (iPhone/Android). Silencioso se indisponível. */
export function setAppBadge(count: number) {
  try {
    const nav = navigator as Navigator & {
      setAppBadge?(n: number): Promise<void>;
      clearAppBadge?(): Promise<void>;
    };
    if (count > 0) void nav.setAppBadge?.(count)?.catch(() => undefined);
    else void nav.clearAppBadge?.()?.catch(() => undefined);
  } catch {
    // sem suporte
  }
}

type ForgetDeps = {
  getSubscription(): Promise<{ endpoint: string; unsubscribe(): Promise<boolean> } | null>;
  deleteRow(endpoint: string): Promise<void>;
  clearBadge(): void;
};

/**
 * Ao sair da conta, este aparelho deixa de receber avisos da pessoa: apaga a
 * assinatura (com a sessão ainda válida), cancela no navegador e limpa o
 * número do ícone. Nunca lança erro, para não travar o logout.
 */
export async function forgetThisDeviceForPush(
  deps: ForgetDeps = {
    getSubscription: async () => (pushSupport() === "ok" ? currentPushSubscription() : null),
    deleteRow: async (endpoint) => {
      await (supabase.from as any)("push_subscriptions").delete().eq("endpoint", endpoint);
    },
    clearBadge: () => setAppBadge(0),
  },
): Promise<void> {
  try {
    const subscription = await deps.getSubscription();
    if (subscription) {
      await deps.deleteRow(subscription.endpoint);
      await subscription.unsubscribe();
    }
  } catch {
    // Sem service worker ou sem rede: o envio remove a assinatura quando expirar.
  }
  try {
    deps.clearBadge();
  } catch {
    // sem suporte
  }
}
