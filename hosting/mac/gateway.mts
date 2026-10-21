import { readFileSync } from "node:fs";
import { parseEnv } from "node:util";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { createLocalChatBridge, verifyTaskflowOwner } from "../../scripts/whatsapp-local-server";

// The installer bundles this file. Only paths and public settings go into runtime.json.
const config = JSON.parse(readFileSync(process.argv[2], "utf8"));
const wa = parseEnv(readFileSync(path.join(config.waRoot, ".env"), "utf8"));
const taskflow = parseEnv(readFileSync(path.join(config.taskflowRoot, ".env.local"), "utf8"));
const databaseUrl = new URL(wa.DATABASE_URL ?? "");
if (databaseUrl.hostname !== "127.0.0.1" || databaseUrl.port !== "55439" || databaseUrl.pathname !== "/wa_akg")
  throw new Error("Unexpected chat database. No changes were made.");
if (!wa.AUTH_SECRET || !taskflow.SUPABASE_PUBLISHABLE_KEY ||
  taskflow.SUPABASE_URL !== "https://xlcurhbxexyunpkcswwo.supabase.co")
  throw new Error("Incomplete private chat configuration.");
if (config.origin !== "https://www.taskfloww.com.br" || config.publicOrigin !== "https://chat.taskfloww.com.br" || config.gatewayPort !== 3041)
  throw new Error("Unexpected public gateway configuration.");
const { PrismaClient } = await import(pathToFileURL(path.join(config.waRoot, "node_modules/@prisma/client/default.js")).href);
const { encode } = await import(pathToFileURL(path.join(config.waRoot, "node_modules/next-auth/jwt.js")).href);
const database = new PrismaClient({ datasources: { db: { url: wa.DATABASE_URL } } });
const owner = await database.user.findUnique({
  where: { id: taskflow.TASKFLOW_WHATSAPP_LOCAL_USER_ID },
  select: { id: true, email: true, name: true, role: true },
});
if (!owner || owner.role !== "SUPERADMIN") throw new Error("Chat owner was not found.");
const upstream = new URL("http://127.0.0.1:3039");
const bridge = createLocalChatBridge({
  pilotActivation: true,
  origin: config.origin, publicOrigin: config.publicOrigin, upstream,
  themeCss: readFileSync(path.join(config.installRoot, "whatsapp-embed.css"), "utf8"),
  verifyAccess: token => verifyTaskflowOwner(token, {
    url: taskflow.SUPABASE_URL!, key: taskflow.SUPABASE_PUBLISHABLE_KEY!,
  }),
  mintUpstreamCookie: async () => `authjs.session-token=${await encode({
    token: { id: owner.id, sub: owner.id, email: owner.email, name: owner.name, role: owner.role },
    secret: wa.AUTH_SECRET, salt: "authjs.session-token", maxAge: 900,
  })}`,
  healthcheck: async () => {
    try {
      await database.$queryRaw`SELECT 1`;
      const response = await fetch(`${upstream}/auth/login`, { signal: AbortSignal.timeout(2000), redirect: "manual" });
      return response.status >= 200 && response.status < 400;
    } catch { return false; }
  },
});
bridge.listen(config.gatewayPort, "127.0.0.1", () => console.log("Private Taskfloww chat gateway is ready on loopback."));
async function stop() {
  bridge.closeAllConnections(); bridge.close();
  await database.$disconnect();
  process.exit(0);
}
process.once("SIGTERM", () => void stop());
process.once("SIGINT", () => void stop());
