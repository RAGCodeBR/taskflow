import { spawn, execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { readFileSync, mkdirSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import { encode } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import { createLocalChatBridge, verifyTaskflowOwner } from "./bridge.mjs";

// This launcher is copied into a clean WA-AKG build, never into its live local build.
const required = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing configuration: ${key}`);
  return value;
};
const databaseUrl = new URL(required("DATABASE_URL"));
if (!['postgres:', 'postgresql:'].includes(databaseUrl.protocol) ||
    !databaseUrl.hostname.endsWith(".railway.internal"))
  throw new Error("A dedicated Railway PostgreSQL database is required.");
const secret = required("AUTH_SECRET");
if (secret.length < 40) throw new Error("A strong authentication secret is required.");
const origin = required("TASKFLOW_ORIGIN");
if (origin !== "https://www.taskfloww.com.br") throw new Error("Unexpected Taskflow origin.");
const publicOrigin = required("TASKFLOW_CHAT_PUBLIC_ORIGIN");
const publicUrl = new URL(publicOrigin);
if (publicUrl.protocol !== "https:" || publicUrl.origin !== publicOrigin ||
    !(publicUrl.hostname === "chat.taskfloww.com.br" || publicUrl.hostname.endsWith(".up.railway.app")))
  throw new Error("Unexpected public origin.");
const supabase = { url: required("SUPABASE_URL"), key: required("SUPABASE_PUBLISHABLE_KEY") };
if (supabase.url !== "https://xlcurhbxexyunpkcswwo.supabase.co") throw new Error("Unexpected identity provider.");
const port = Number(required("PORT"));
if (!Number.isInteger(port) || port < 1024 || port > 65535 || port === 3039) throw new Error("Invalid gateway port.");
const database = new PrismaClient();
const tables = await database.$queryRaw<Array<{ table_name: string }>>`
  SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'`;
if (tables.length && !tables.some(row => row.table_name === "User"))
  throw new Error("Refusing to initialize an unrelated database.");
if (!tables.length) {
  if (process.env.WHATSAPP_INITIALIZE_EMPTY_DB !== "true") throw new Error("Empty database initialization is disabled.");
  execFileSync(process.execPath, ["node_modules/prisma/build/index.js", "db", "push", "--skip-generate"], { stdio: "inherit" });
  await database.user.create({ data: {
    id: "taskflow-railway-private-pilot", name: "Administrador privado Taskfloww",
    email: "private-pilot@wa-akg.local", role: "SUPERADMIN",
    password: await bcrypt.hash(randomBytes(48).toString("base64url"), 12),
  } });
}
const owner = await database.user.findUnique({ where: { id: required("WHATSAPP_INTERNAL_USER_ID") },
  select: { id: true, email: true, name: true, role: true } });
if (!owner || owner.role !== "SUPERADMIN") throw new Error("Private internal user was not found.");
// The pilot must not start restored WhatsApp credentials or transmit real messages.
if (process.env.WHATSAPP_EMPTY_PILOT === "true" && await database.session.count())
  throw new Error("The empty pilot must contain no WhatsApp sessions.");
mkdirSync("data/media", { recursive: true });
const upstream = new URL("http://127.0.0.1:3039");
const child = spawn(process.execPath, ["node_modules/tsx/dist/cli.mjs", "src/server/index.ts"], {
  env: { ...process.env, NODE_ENV: "production", PORT: "3039", HOSTNAME: "127.0.0.1",
    BASE_URL: upstream.origin, NEXTAUTH_URL: upstream.origin, AUTH_URL: upstream.origin,
    AUTH_TRUST_HOST: "true", ENABLE_TELEMETRY: "false", DISABLE_TELEMETRY: "true" },
  stdio: "inherit",
});
const ready = async () => {
  if (child.exitCode !== null || child.signalCode) return false;
  try {
    await database.$queryRaw`SELECT 1`;
    const response = await fetch(`${upstream}/auth/login`, { signal: AbortSignal.timeout(3000), redirect: "manual" });
    return response.status >= 200 && response.status < 400;
  } catch { return false; }
};
const bridge = createLocalChatBridge({ origin, publicOrigin, upstream, healthcheck: ready,
  themeCss: readFileSync("deployment/whatsapp-embed.css", "utf8"),
  verifyAccess: token => verifyTaskflowOwner(token, supabase),
  mintUpstreamCookie: async () => `authjs.session-token=${await encode({
    token: { id: owner.id, sub: owner.id, name: owner.name, email: owner.email, role: owner.role },
    secret, salt: "authjs.session-token", maxAge: 900,
  })}`,
});
let stopping = false;
async function stop(code: number) {
  if (stopping) return;
  stopping = true;
  bridge.closeAllConnections(); bridge.close(); child.kill("SIGTERM");
  await database.$disconnect();
  setTimeout(() => process.exit(code), 1000).unref();
}
process.on("SIGTERM", () => void stop(0));
process.on("SIGINT", () => void stop(0));
child.on("error", () => void stop(1));
child.on("exit", () => void stop(stopping ? 0 : 1));
bridge.listen(port, "0.0.0.0", () => console.log("Private WhatsApp gateway started; owner authentication is required."));
