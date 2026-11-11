import { createFileRoute } from "@tanstack/react-router";
import { sessionProbeResponse } from "@/lib/session-probe-response";

export const Route = createFileRoute("/api/auth-session")({
  server: {
    handlers: {
      GET: ({ request }) => sessionProbeResponse(request, import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL),
    },
  },
});
