import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  theme_preferences: Record<string, unknown> | null;
}

interface AuthCtx {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  isCollaborator: boolean;
  isClient: boolean;
  clientId: string | null;
  permissions: string[];
  hasPermission: (permission: string) => boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCollaborator, setIsCollaborator] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const loadedUserIdRef = useRef<string | null>(null);

  const loadProfile = async (uid: string) => {
    // Profiles live in public.profiles, keyed by the Supabase auth user id.
    // The trigger in the migrations creates this row when a new user signs up.
    // Load independent access records together.  Previously the layout was
    // released as soon as the session was restored, while this sequence was
    // still running.  During that interval `permissions` was empty and the
    // entire sidebar was filtered out for client accounts.
    const [profileResult, authResult, rolesResult, linkResult, permissionsResult] =
      await Promise.all([
        supabase
          .from("profiles")
          .select("id, full_name, avatar_url, theme_preferences")
          .eq("id", uid)
          .maybeSingle(),
        supabase.auth.getUser(),
        supabase.from("user_roles").select("role").eq("user_id", uid),
        (supabase.from("client_user_links" as any) as any)
          .select("client_id")
          .eq("user_id", uid)
          .maybeSingle(),
        (supabase.from("user_permissions") as any)
          .select("permissions")
          .eq("user_id", uid)
          .maybeSingle(),
      ]);
    const prof = profileResult.data;
    const roles = rolesResult.data;
    const link = linkResult.data;
    const access = permissionsResult.data;
    setProfile(prof ? ({ ...prof, email: authResult.data.user?.email ?? null } as Profile) : null);
    // Admin-only pages are controlled by public.user_roles, not by hardcoded emails.
    const admin = !!roles?.some((r: { role: string }) => r.role === "admin");
    const collaborator = !!roles?.some((r: { role: string }) => r.role === "collaborator");
    const client = !!roles?.some((r: { role: string }) => r.role === "client");
    setIsAdmin(admin);
    setIsCollaborator(collaborator);
    setIsClient(client);
    setClientId(link?.client_id ?? null);
    setPermissions(
      admin
        ? [
            "dashboard",
            "tasks",
            "import_ata",
            "clients",
            "reports",
            "mural",
            "agenda",
            "portal_entregas",
            "portal_financeiro",
            "users",
            "trash",
            "settings",
          ]
        : Array.isArray(access?.permissions)
          ? access.permissions
          : [],
    );
  };

  useEffect(() => {
    // Supabase emits auth state changes after sign-in, sign-out and token refresh.
    // The timeout avoids updating profile data inside the auth callback stack.
    const { data: sub } = supabase.auth.onAuthStateChange((_e: unknown, s: Session | null) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        // Supabase may emit a session event again when the browser returns to
        // a tab. Reloading the authenticated layout then would discard open
        // task forms and unsaved input, so only load on an actual user change.
        if (loadedUserIdRef.current !== s.user.id) {
          loadedUserIdRef.current = s.user.id;
          setLoading(true);
          setTimeout(() => {
            void loadProfile(s.user.id).finally(() => setLoading(false));
          }, 0);
        }
      } else {
        loadedUserIdRef.current = null;
        setProfile(null);
        setIsAdmin(false);
        setIsCollaborator(false);
        setIsClient(false);
        setClientId(null);
        setPermissions([]);
      }
    });
    // Initial page load: restore any saved session from localStorage.
    supabase.auth.getSession().then(async ({ data }: { data: { session: Session | null } }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        loadedUserIdRef.current = data.session.user.id;
        await loadProfile(data.session.user.id);
      }
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    // Access changes are delivered in real time. Avoid refreshing on browser
    // focus so returning to a tab never interrupts a form being edited.
    const refreshAccess = () => void loadProfile(user.id);
    const channel = supabase
      .channel(`user-access-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_permissions",
          filter: `user_id=eq.${user.id}`,
        },
        refreshAccess,
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "user_roles", filter: `user_id=eq.${user.id}` },
        refreshAccess,
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const signOut = async () => {
    // Supabase clears the persisted browser session; the listener above resets local React state.
    await supabase.auth.signOut();
  };

  const refreshProfile = async () => {
    if (user) await loadProfile(user.id);
  };
  const hasPermission = (permission: string) => isAdmin || permissions.includes(permission);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isAdmin,
        isCollaborator,
        isClient,
        clientId,
        permissions,
        hasPermission,
        loading,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
