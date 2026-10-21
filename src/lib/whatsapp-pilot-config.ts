export function resolveWhatsAppPilotConfig(env: {
  DEV?: boolean; VITE_WHATSAPP_LOCAL_ENABLED?: string;
  VITE_WHATSAPP_ENABLED?: string; VITE_WHATSAPP_BRIDGE_URL?: string;
}) {
  if (env.DEV && env.VITE_WHATSAPP_LOCAL_ENABLED === "true")
    return { enabled: true, origin: "http://localhost:3040" };
  if (env.VITE_WHATSAPP_ENABLED !== "true" || !env.VITE_WHATSAPP_BRIDGE_URL)
    return { enabled: false, origin: "" };
  try {
    const url = new URL(env.VITE_WHATSAPP_BRIDGE_URL);
    // Same-site HTTPS is required for an authenticated embedded chat.
    if (url.protocol !== "https:" || url.hostname !== "chat.taskfloww.com.br" ||
      url.username || url.password || url.port || url.pathname !== "/" || url.search || url.hash)
      return { enabled: false, origin: "" };
    return { enabled: true, origin: url.origin };
  } catch { return { enabled: false, origin: "" }; }
}
