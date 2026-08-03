import { a as createMiddleware, b as getRequest } from "./server-DJ8sPH9h.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
function createFallbackSupabaseAuthClient() {
  const error = new Error("Supabase is not configured. Authentication will be unavailable until credentials are provided.");
  return {
    auth: {
      getClaims: () => Promise.resolve({ data: { claims: null }, error })
    }
  };
}
const requireSupabaseAuth = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
      console.warn("[Supabase] Missing credentials. Bypassing auth middleware for local development.");
      return next({
        context: {
          supabase: createFallbackSupabaseAuthClient(),
          userId: null,
          claims: null
        }
      });
    }
    const request = getRequest();
    if (!request?.headers) {
      throw new Error("Unauthorized: No request headers available");
    }
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      throw new Error("Unauthorized: No authorization header provided");
    }
    if (!authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized: Only Bearer tokens are supported");
    }
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }
    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        auth: {
          storage: void 0,
          persistSession: false,
          autoRefreshToken: false
        }
      }
    );
    const { data, error } = await supabase.auth.getClaims(token);
    if (error || !data?.claims) {
      throw new Error("Unauthorized: Invalid token");
    }
    if (!data.claims.sub) {
      throw new Error("Unauthorized: No user ID found in token");
    }
    return next({
      context: {
        supabase,
        userId: data.claims.sub,
        claims: data.claims
      }
    });
  }
);
export {
  requireSupabaseAuth as r
};
