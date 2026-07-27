import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
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

  const loadProfile = async (uid: string) => {
    // Profiles live in public.profiles, keyed by the Supabase auth user id.
    // The trigger in the migrations creates this row when a new user signs up.
    const { data: prof } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url, theme_preferences")
      .eq("id", uid)
      .maybeSingle();
    const { data: authUser } = await supabase.auth.getUser();
    setProfile(prof ? ({ ...prof, email: authUser.user?.email ?? null } as Profile) : null);
    // Admin-only pages are controlled by public.user_roles, not by hardcoded emails.
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", uid);
    const admin = !!roles?.some((r: { role: string }) => r.role === "admin");
    const collaborator = !!roles?.some((r: { role: string }) => r.role === "collaborator");
    const client = !!roles?.some((r: { role: string }) => r.role === "client");
    setIsAdmin(admin);
    setIsCollaborator(collaborator);
    setIsClient(client);
    const { data: link } = await (supabase.from("client_user_links" as any) as any)
      .select("client_id")
      .eq("user_id", uid)
      .maybeSingle();
    setClientId(link?.client_id ?? null);
    const { data: access } = await (supabase.from("user_permissions") as any)
      .select("permissions")
      .eq("user_id", uid)
      .maybeSingle();
    setPermissions(
      admin
        ? [
            "dashboard",
            "tasks",
            "notes",
            "import_ata",
            "clients",
            "reports",
            "portal",
            "calendar",
            "users",
            "trash",
            "settings",
          ]
        : (access?.permissions ?? []),
    );
  };

  useEffect(() => {
    // Supabase emits auth state changes after sign-in, sign-out and token refresh.
    // The timeout avoids updating profile data inside the auth callback stack.
    const { data: sub } = supabase.auth.onAuthStateChange((_e: unknown, s: Session | null) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        setTimeout(() => loadProfile(s.user.id), 0);
      } else {
        setProfile(null);
        setIsAdmin(false);
        setIsCollaborator(false);
        setIsClient(false);
        setClientId(null);
        setPermissions([]);
      }
    });
    // Initial page load: restore any saved session from localStorage.
    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) loadProfile(data.session.user.id);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    // An administrator can change a person's access while that person is
    // already signed in. Refresh when the browser returns to this tab and
    // subscribe for an immediate update when Realtime is enabled.
    const refreshAccess = () => void loadProfile(user.id);
    window.addEventListener("focus", refreshAccess);
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
      window.removeEventListener("focus", refreshAccess);
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
