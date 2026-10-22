import type { Plugin } from "vite";
import { loadEnv } from "vite";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { readFileSync } from "node:fs";
import { createLocalChatBridge, verifyTaskflowOwner } from "./whatsapp-local-server";

// Development only: no bridge, secret, or endpoint is included in a deployment.
export function whatsappLocalPlugin(): Plugin {
  return {
    name: "taskflow-whatsapp-private-local", apply: "serve",
    async configureServer(vite) {
      if (process.env.VITEST) return;
      const env = loadEnv(vite.config.mode, vite.config.root, "");
      if (env.VITE_WHATSAPP_LOCAL_ENABLED !== "true") return;
      const root = env.TASKFLOW_WHATSAPP_LOCAL_ROOT;
      if (!root || !env.SUPABASE_URL || !env.SUPABASE_PUBLISHABLE_KEY)
        throw new Error("Configure o serviço local do WhatsApp e o Supabase para testar o chat.");
      const wa = loadEnv("production", root, "");
      if (!wa.AUTH_SECRET || !wa.DATABASE_URL || !env.TASKFLOW_WHATSAPP_LOCAL_USER_ID)
        throw new Error("Configuração do WhatsApp local incompleta.");
      const jwtPath = pathToFileURL(path.join(root, "node_modules/next-auth/jwt.js")).href;
      const prismaPath = pathToFileURL(path.join(root, "node_modules/@prisma/client/default.js")).href;
      const { encode } = await import(/* @vite-ignore */ jwtPath);
      const { PrismaClient } = await import(/* @vite-ignore */ prismaPath);
      const database = new PrismaClient({ datasources: { db: { url: wa.DATABASE_URL } } });
      const owner = await database.user.findUnique({
        where: { id: env.TASKFLOW_WHATSAPP_LOCAL_USER_ID }, select: { id: true, email: true, name: true, role: true },
      });
      await database.$disconnect();
      if (!owner || owner.role !== "SUPERADMIN") throw new Error("Administrador do chat local não encontrado.");
      const bridge = createLocalChatBridge({
        themeCss: readFileSync(path.join(vite.config.root, "src/styles/whatsapp-embed.css"), "utf8"),
        themeScript: readFileSync(path.join(vite.config.root, "src/styles/whatsapp-embed.js"), "utf8"),
        origin: "http://localhost:5173", upstream: new URL("http://127.0.0.1:3039"),
        verifyAccess: token => verifyTaskflowOwner(token, {
          url: env.SUPABASE_URL, key: env.SUPABASE_PUBLISHABLE_KEY,
        }),
        mintUpstreamCookie: async () => {
          const token = await encode({
            token: { id: owner.id, sub: owner.id, email: owner.email, name: owner.name, role: owner.role },
            secret: wa.AUTH_SECRET, salt: "authjs.session-token", maxAge: 15 * 60,
          });
          return `authjs.session-token=${token}`;
        },
      });
      await new Promise<void>((resolve, reject) => {
        bridge.once("error", reject);
        bridge.listen(3040, "127.0.0.1", () => { bridge.off("error", reject); resolve(); });
      });
      vite.httpServer?.once("close", () => { bridge.closeAllConnections(); bridge.close(); });
      vite.config.logger.info("WhatsApp local privado disponível para o administrador autorizado.");
    },
  };
}
