import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

/**
 * Supabase browser client.
 *
 * This clean GitHub Pages copy must point to its own Supabase project.
 * Do not paste credentials from the Lovable/original project here.
 *
 * In GitHub Pages, Vite replaces VITE_* values during build time. That means
 * changing the Supabase project later requires rebuilding and redeploying Pages.
 */
function createFallbackQueryBuilder(message: string) {
  const error = new Error(message);

  const builder = new Proxy(
    {
      data: null,
      error,
    },
    {
      get(target, prop, receiver) {
        if (prop === 'then') {
          return (resolve: (value: unknown) => void) => resolve({ data: null, error });
        }

        if (prop === 'catch') {
          return (callback: (error: Error) => unknown) => Promise.resolve({ data: null, error }).catch(callback);
        }

        if (prop === 'finally') {
          return (callback: () => void) => Promise.resolve({ data: null, error }).finally(callback);
        }

        if (
          prop === 'select' ||
          prop === 'insert' ||
          prop === 'update' ||
          prop === 'delete' ||
          prop === 'upsert' ||
          prop === 'eq' ||
          prop === 'in' ||
          prop === 'order' ||
          prop === 'limit' ||
          prop === 'range' ||
          prop === 'match' ||
          prop === 'or' ||
          prop === 'filter' ||
          prop === 'not' ||
          prop === 'is' ||
          prop === 'contains' ||
          prop === 'over'
        ) {
          return () => builder;
        }

        if (prop === 'single' || prop === 'maybeSingle') {
          return () => Promise.resolve({ data: null, error });
        }

        if (prop === 'rpc') {
          return () => Promise.resolve({ data: null, error });
        }

        if (prop in target) {
          return Reflect.get(target, prop, receiver);
        }

        return undefined;
      },
    },
  );

  return builder as any;
}

function createFallbackSupabaseClient() {
  const message = 'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to enable database features.';
  const error = new Error(message);

  return {
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error }),
      getSession: () => Promise.resolve({ data: { session: null }, error }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } }, error }),
      signOut: () => Promise.resolve({ error }),
      signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error }),
      signUp: () => Promise.resolve({ data: { user: null, session: null }, error }),
      signInWithOAuth: () => Promise.resolve({ data: { provider: '', url: '' }, error }),
      setSession: () => Promise.resolve({ error }),
      getClaims: () => Promise.resolve({ data: { claims: null }, error }),
    },
    from: () => createFallbackQueryBuilder(message),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error }),
        download: () => Promise.resolve({ data: null, error }),
        remove: () => Promise.resolve({ data: null, error }),
        getPublicUrl: () => ({ data: { publicUrl: '' }, error }),
      }),
    },
    functions: {
      invoke: () => Promise.resolve({ data: null, error }),
    },
    removeChannel: () => undefined,
  } as any;
}

function createSupabaseClient() {
  // Client-side static build: values come from GitHub Actions/local .env as VITE_*.
  // Local SSR/dev fallback: values can also come from process.env for compatibility.
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    console.warn('[Supabase] Missing credentials. Falling back to a local-safe client.');
    return createFallbackSupabaseClient();
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      // Persisting sessions in localStorage is what keeps the user logged in after reloads.
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    }
  });
}

let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

// Lazy proxy: importing this module does not crash immediately if env vars are missing.
// The clear error is raised only when some code actually calls supabase.from/auth/etc.
export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  },
});
