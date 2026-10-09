import type { Plugin } from "vite";
import { publishedAppUpdates } from "../src/lib/published-app-updates";

export function appUpdatesPlugin(): Plugin {
  return {
    name: "taskflow-published-app-updates",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (request.url?.split("?")[0] !== "/app-release.json") return next();
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.setHeader("Cache-Control", "no-store");
        response.end(JSON.stringify(publishedAppUpdates()));
      });
    },
    generateBundle() {
      if (this.environment.name !== "client") return;
      this.emitFile({
        type: "asset",
        fileName: "app-release.json",
        source: JSON.stringify(publishedAppUpdates()),
      });
    },
  };
}
