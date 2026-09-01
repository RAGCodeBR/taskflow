import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  theme_preferences: Record<string, unknown> | null;
  active_workspace_id?: string | null;
}

export interface WorkspaceMembership {
  id: string;
  slug: "consultoria" | "marketing";
  name: string;
  role: string;
  permissions: string[];
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
  workspaces: WorkspaceMembership[];
  activeWorkspace: WorkspaceMembership | null;
  setActiveWorkspace: (workspaceId: string) => Promise<void>;
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
  const [workspaces, setWorkspaces] = useState<WorkspaceMembership[]>([]);
  const [activeWorkspace, setActiveWorkspaceState] = useState<WorkspaceMembership | null>(null);
  const [loading, setLoading] = useState(true);
  const loadedUserIdRef = useRef<string | null>(null);

  const loadProfile = async (uid: string) => {
    // Profiles live in public.profiles, keyed by the Supabase auth user id.
    // The trigger in the migrations creates this row when a new user signs up.
    // Load independent access records together.  Previously the layout was
    // released as soon as the session was restored, while this sequence was
    // still running.  During that interval `permissions` was empty and the
    // entire sidebar was filtered out for client accounts.
    const [profileResult, activeWorkspaceResult, authResult, rolesResult, linkResult, permissionsResult, membershipsResult, workspaceResult] =
      await Promise.all([
        supabase
          .from("profiles")
          // `active_workspace_id` has its own database permission because it
          // was introduced after profile-field grants. Keep profile identity
          // independent of that field so a workspace permission issue can
          // never make a user's name and photo disappear from the UI.
          .select("id, full_name, avatar_url, theme_preferences")
          .eq("id", uid)
          .maybeSingle(),
        (supabase as any).rpc("current_workspace_id"),
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
        (supabase.from("workspace_memberships") as any)
          .select("workspace_id, role, permissions")
          .eq("user_id", uid),
        (supabase.from("workspaces") as any).select("id, slug, name"),
      ]);
    const profileWorkspaceId = activeWorkspaceResult.error ? null : activeWorkspaceResult.data ?? null;
    const prof = profileResult.data
      ? { ...profileResult.data, active_workspace_id: profileWorkspaceId }
      : null;
    const roles = rolesResult.data;
    const link = linkResult.data;
    const access = permissionsResult.data;
    // Fetch memberships and workspace metadata independently.  The nested
    // select can be cached by PostgREST under the relation name and, in that
    // case, made both cards point to the last workspace returned.  Joining in
    // memory by workspace_id keeps Consultoria and Marketing unambiguous.
    const workspaceById = new Map(
      ((workspaceResult.data ?? []) as Array<any>).map((workspace) => [workspace.id, workspace]),
    );
    const memberships = ((membershipsResult.data ?? []) as Array<any>)
      .map((membership) => {
        const workspace = workspaceById.get(membership.workspace_id);
        if (!workspace?.id || (workspace.slug !== "consultoria" && workspace.slug !== "marketing")) return null;
        return {
          id: workspace.id,
          slug: workspace.slug,
          name: workspace.name,
          role: membership.role,
          permissions: Array.isArray(membership.permissions) ? membership.permissions : [],
        } as WorkspaceMembership;
      })
      .filter(Boolean) as WorkspaceMembership[];
    setProfile(prof ? ({ ...prof, email: authResult.data.user?.email ?? null } as Profile) : null);
    // Admin-only pages are controlled by public.user_roles, not by hardcoded emails.
    const admin = !!roles?.some((r: { role: string }) => r.role === "admin");
    const collaborator = !!roles?.some((r: { role: string }) => r.role === "collaborator");
    const client = !!roles?.some((r: { role: string }) => r.role === "client");
    setIsAdmin(admin);
    setIsCollaborator(collaborator);
    setIsClient(client);
    setClientId(link?.client_id ?? null);
    const systemPermissions = [
            "dashboard",
            "tasks",
            "obligations",
            "requests",
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
          ];
    // Never silently fall back to the first membership if the server returned
    // an unknown active id. A fallback can label the UI "Consultoria" while
    // RLS still authorizes Marketing data. The next refresh will resolve it.
    const selectedWorkspace = prof?.active_workspace_id
      ? memberships.find((workspace) => workspace.id === prof.active_workspace_id) ?? null
      : memberships[0] ?? null;
    setWorkspaces(memberships);
    setActiveWorkspaceState(selectedWorkspace);
    setPermissions(admin ? systemPermissions : selectedWorkspace?.permissions ?? (Array.isArray(access?.permissions) ? access.permissions : []));
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
        setWorkspaces([]);
        setActiveWorkspaceState(null);
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
  const setActiveWorkspace = async (workspaceId: string) => {
    if (!user || !workspaces.some((workspace) => workspace.id === workspaceId)) {
      throw new Error("Você não tem acesso a este ambiente.");
    }
    // This RPC is deliberately used instead of a direct profile update:
    // profile RLS can silently affect zero rows, which made the old screen
    // reload into Consultoria even after the user chose Marketing.
    const { error } = await (supabase as any).rpc("select_active_workspace", {
      target_workspace_id: workspaceId,
    });
    if (error) throw error;
    // Confirm the database state before leaving this screen. This guards
    // against a stale RPC schema or a policy that acknowledged a call but
    // did not persist the profile preference.
    const { data: confirmedWorkspaceId, error: confirmError } = await (supabase as any).rpc("current_workspace_id");
    if (confirmError) throw confirmError;
    if (confirmedWorkspaceId !== workspaceId) {
      throw new Error("O ambiente não foi confirmado. Tente novamente.");
    }
    setProfile((current) => (current ? { ...current, active_workspace_id: workspaceId } : current));
    setActiveWorkspaceState(workspaces.find((workspace) => workspace.id === workspaceId) ?? null);
    // A full navigation drops every cached query from the other environment.
    // This prevents a previously rendered client or task from briefly appearing
    // during the environment transition.
    window.location.assign("/dashboard");
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
        workspaces,
        activeWorkspace,
        setActiveWorkspace,
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
