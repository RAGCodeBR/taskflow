FROM node:24-bookworm-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates openssl git ffmpeg python3 make g++ && rm -rf /var/lib/apt/lists/*
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN node -e "require('esbuild').buildSync({entryPoints:['deployment/bridge/scripts/whatsapp-local-server.ts'],bundle:true,platform:'node',format:'esm',outfile:'deployment/bridge.mjs'})" && node --input-type=module -e "import('./deployment/bridge.mjs').then(m=>{if(typeof m.createLocalChatBridge!=='function')process.exit(1)})"
RUN npx prisma generate
# Build without runtime credentials or any connection to a real database.
RUN DATABASE_URL=postgresql://build:build@127.0.0.1:9/build AUTH_SECRET=build-only-placeholder-not-for-runtime-000000000 npm run build
ENV NODE_ENV=production
CMD ["node", "node_modules/tsx/dist/cli.mjs", "deployment/start.mts"]
