# src/hooks/use-auth.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import type { Session, User } from "@supabase/supabase-js";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `interface Profile {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 6 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `  full_name: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `  email: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `  avatar_url: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `  theme_preferences: Record<string, unknown> | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `  active_workspace_id?: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 13 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 14 | `export interface WorkspaceMembership {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 15 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  slug: "consultoria" | "marketing";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  role: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  permissions: string[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 21 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 22 | `interface AuthCtx {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 23 | `  session: Session | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  user: User | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `  profile: Profile | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `  isAdmin: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `  isCollaborator: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `  isClient: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `  clientId: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  permissions: string[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `  workspaces: WorkspaceMembership[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `  activeWorkspace: WorkspaceMembership | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  setActiveWorkspace: (workspaceId: string) => Promise<void>;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 34 | `  hasPermission: (permission: string) => boolean;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 35 | `  loading: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `  signOut: () => Promise<void>;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 37 | `  refreshProfile: () => Promise<void>;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 38 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 39 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 40 | `const AuthContext = createContext<AuthCtx | undefined>(undefined);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 41 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 42 | `export function AuthProvider({ children }: { children: ReactNode }) {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 43 | `  const [session, setSession] = useState<Session | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 44 | `  const [user, setUser] = useState<User | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 45 | `  const [profile, setProfile] = useState<Profile | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 46 | `  const [isAdmin, setIsAdmin] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 47 | `  const [isCollaborator, setIsCollaborator] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 48 | `  const [isClient, setIsClient] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 49 | `  const [clientId, setClientId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 50 | `  const [permissions, setPermissions] = useState<string[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 51 | `  const [workspaces, setWorkspaces] = useState<WorkspaceMembership[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 52 | `  const [activeWorkspace, setActiveWorkspaceState] = useState<WorkspaceMembership | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 53 | `  const [loading, setLoading] = useState(true);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 54 | `  const loadedUserIdRef = useRef<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 55 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 56 | `  const loadProfile = async (uid: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 57 | `    // Profiles live in public.profiles, keyed by the Supabase auth user id.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 58 | `    // The trigger in the migrations creates this row when a new user signs up.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 59 | `    // Load independent access records together.  Previously the layout was` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 60 | `    // released as soon as the session was restored, while this sequence was` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 61 | `    // still running.  During that interval \`permissions\` was empty and the` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 62 | `    // entire sidebar was filtered out for client accounts.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 63 | `    const [profileResult, activeWorkspaceResult, authResult, rolesResult, linkResult, permissionsResult, membershipsResult, workspaceResult] =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 64 | `      await Promise.all([` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 65 | `        supabase` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 66 | `          .from("profiles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `          // \`active_workspace_id\` has its own database permission because it` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 68 | `          // was introduced after profile-field grants. Keep profile identity` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 69 | `          // independent of that field so a workspace permission issue can` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 70 | `          // never make a user's name and photo disappear from the UI.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 71 | `          .select("id, full_name, avatar_url, theme_preferences")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 72 | `          .eq("id", uid)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `          .maybeSingle(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `        (supabase as any).rpc("current_workspace_id"),` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 75 | `        supabase.auth.getUser(),` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 76 | `        supabase.from("user_roles").select("role").eq("user_id", uid),` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 77 | `        (supabase.from("client_user_links" as any) as any)` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 78 | `          .select("client_id")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `          .eq("user_id", uid)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `          .maybeSingle(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 81 | `        (supabase.from("user_permissions") as any)` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 82 | `          .select("permissions")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `          .eq("user_id", uid)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `          .maybeSingle(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `        (supabase.from("workspace_memberships") as any)` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 86 | `          .select("workspace_id, role, permissions")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `          .eq("user_id", uid),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `        (supabase.from("workspaces") as any).select("id, slug, name"),` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 89 | `      ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `    const profileWorkspaceId = activeWorkspaceResult.error ? null : activeWorkspaceResult.data ?? null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 91 | `    const prof = profileResult.data` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 92 | `      ? { ...profileResult.data, active_workspace_id: profileWorkspaceId }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 93 | `      : null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `    const roles = rolesResult.data;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 95 | `    const link = linkResult.data;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 96 | `    const access = permissionsResult.data;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 97 | `    // Fetch memberships and workspace metadata independently.  The nested` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 98 | `    // select can be cached by PostgREST under the relation name and, in that` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 99 | `    // case, made both cards point to the last workspace returned.  Joining in` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 100 | `    // memory by workspace_id keeps Consultoria and Marketing unambiguous.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 101 | `    const workspaceById = new Map(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 102 | `      ((workspaceResult.data ?? []) as Array<any>).map((workspace) => [workspace.id, workspace]),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 103 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 104 | `    const memberships = ((membershipsResult.data ?? []) as Array<any>)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 105 | `      .map((membership) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 106 | `        const workspace = workspaceById.get(membership.workspace_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 107 | `        if (!workspace?.id || (workspace.slug !== "consultoria" && workspace.slug !== "marketing")) return null;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 108 | `        return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 109 | `          id: workspace.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `          slug: workspace.slug,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `          name: workspace.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `          role: membership.role,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `          permissions: Array.isArray(membership.permissions) ? membership.permissions : [],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `        } as WorkspaceMembership;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 116 | `      .filter(Boolean) as WorkspaceMembership[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `    setProfile(prof ? ({ ...prof, email: authResult.data.user?.email ?? null } as Profile) : null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `    // Admin-only pages are controlled by public.user_roles, not by hardcoded emails.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 119 | `    const admin = !!roles?.some((r: { role: string }) => r.role === "admin");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 120 | `    const collaborator = !!roles?.some((r: { role: string }) => r.role === "collaborator");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 121 | `    const client = !!roles?.some((r: { role: string }) => r.role === "client");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 122 | `    setIsAdmin(admin);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `    setIsCollaborator(collaborator);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `    setIsClient(client);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `    setClientId(link?.client_id ?? null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `    const systemPermissions = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 127 | `            "dashboard",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `            "tasks",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `            "obligations",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 130 | `            "requests",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `            "import_ata",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `            "clients",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 133 | `            "reports",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `            "mural",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 135 | `            "agenda",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 136 | `            "portal_entregas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `            "portal_financeiro",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `            "users",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 139 | `            "trash",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `            "settings",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 141 | `          ];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 142 | `    // Never silently fall back to the first membership if the server returned` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 143 | `    // an unknown active id. A fallback can label the UI "Consultoria" while` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 144 | `    // RLS still authorizes Marketing data. The next refresh will resolve it.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 145 | `    const selectedWorkspace = prof?.active_workspace_id` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 146 | `      ? memberships.find((workspace) => workspace.id === prof.active_workspace_id) ?? null` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 147 | `      : memberships[0] ?? null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 148 | `    setWorkspaces(memberships);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `    setActiveWorkspaceState(selectedWorkspace);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 150 | `    setPermissions(admin ? systemPermissions : selectedWorkspace?.permissions ?? (Array.isArray(access?.permissions) ? access.permissions : []));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 151 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 152 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 153 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 154 | `    // Supabase emits auth state changes after sign-in, sign-out and token refresh.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 155 | `    // The timeout avoids updating profile data inside the auth callback stack.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 156 | `    const { data: sub } = supabase.auth.onAuthStateChange((_e: unknown, s: Session | null) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 157 | `      setSession(s);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 158 | `      setUser(s?.user ?? null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `      if (s?.user) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 160 | `        // Supabase may emit a session event again when the browser returns to` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 161 | `        // a tab. Reloading the authenticated layout then would discard open` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 162 | `        // task forms and unsaved input, so only load on an actual user change.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 163 | `        if (loadedUserIdRef.current !== s.user.id) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 164 | `          loadedUserIdRef.current = s.user.id;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 165 | `          setLoading(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 166 | `          setTimeout(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 167 | `            void loadProfile(s.user.id).finally(() => setLoading(false));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 168 | `          }, 0);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 169 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 170 | `      } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 171 | `        loadedUserIdRef.current = null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 172 | `        setProfile(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 173 | `        setIsAdmin(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `        setIsCollaborator(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 175 | `        setIsClient(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 176 | `        setClientId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 177 | `        setPermissions([]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `        setWorkspaces([]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 179 | `        setActiveWorkspaceState(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 180 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 181 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 182 | `    // Initial page load: restore any saved session from localStorage.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 183 | `    supabase.auth.getSession().then(async ({ data }: { data: { session: Session | null } }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 184 | `      setSession(data.session);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 185 | `      setUser(data.session?.user ?? null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 186 | `      if (data.session?.user) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 187 | `        loadedUserIdRef.current = data.session.user.id;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 188 | `        await loadProfile(data.session.user.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 189 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 190 | `      setLoading(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 191 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 192 | `    return () => sub.subscription.unsubscribe();` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 193 | `  }, []);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 194 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 195 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 196 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 197 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 198 | `    // Access changes are delivered in real time. Avoid refreshing on browser` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 199 | `    // focus so returning to a tab never interrupts a form being edited.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 200 | `    const refreshAccess = () => void loadProfile(user.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 201 | `    const channel = supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 202 | `      .channel(\`user-access-${user.id}\`)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 203 | `      .on(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 204 | `        "postgres_changes",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 205 | `        {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 206 | `          event: "*",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 207 | `          schema: "public",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 208 | `          table: "user_permissions",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 209 | `          filter: \`user_id=eq.${user.id}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 210 | `        },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 211 | `        refreshAccess,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 212 | `      )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 213 | `      .on(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 214 | `        "postgres_changes",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 215 | `        { event: "*", schema: "public", table: "user_roles", filter: \`user_id=eq.${user.id}\` },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 216 | `        refreshAccess,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 217 | `      )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 218 | `      .subscribe();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 219 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 220 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 221 | `      void supabase.removeChannel(channel);` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 222 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 223 | `  }, [user?.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 224 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 225 | `  const signOut = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 226 | `    // Supabase clears the persisted browser session; the listener above resets local React state.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 227 | `    await supabase.auth.signOut();` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 228 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 229 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 230 | `  const refreshProfile = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 231 | `    if (user) await loadProfile(user.id);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 232 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 233 | `  const setActiveWorkspace = async (workspaceId: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 234 | `    if (!user || !workspaces.some((workspace) => workspace.id === workspaceId)) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 235 | `      throw new Error("Você não tem acesso a este ambiente.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 236 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 237 | `    // This RPC is deliberately used instead of a direct profile update:` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 238 | `    // profile RLS can silently affect zero rows, which made the old screen` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 239 | `    // reload into Consultoria even after the user chose Marketing.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 240 | `    const { error } = await (supabase as any).rpc("select_active_workspace", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 241 | `      target_workspace_id: workspaceId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 242 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 243 | `    if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 244 | `    // Confirm the database state before leaving this screen. This guards` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 245 | `    // against a stale RPC schema or a policy that acknowledged a call but` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 246 | `    // did not persist the profile preference.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 247 | `    const { data: confirmedWorkspaceId, error: confirmError } = await (supabase as any).rpc("current_workspace_id");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 248 | `    if (confirmError) throw confirmError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 249 | `    if (confirmedWorkspaceId !== workspaceId) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 250 | `      throw new Error("O ambiente não foi confirmado. Tente novamente.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 251 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 252 | `    setProfile((current) => (current ? { ...current, active_workspace_id: workspaceId } : current));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 253 | `    setActiveWorkspaceState(workspaces.find((workspace) => workspace.id === workspaceId) ?? null);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 254 | `    // A full navigation drops every cached query from the other environment.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 255 | `    // This prevents a previously rendered client or task from briefly appearing` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 256 | `    // during the environment transition.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 257 | `    window.location.assign("/dashboard");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 258 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 259 | `  const hasPermission = (permission: string) => isAdmin || permissions.includes(permission);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 260 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 261 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 262 | `    <AuthContext.Provider` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 263 | `      value={{` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 264 | `        session,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 265 | `        user,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 266 | `        profile,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 267 | `        isAdmin,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 268 | `        isCollaborator,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 269 | `        isClient,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 270 | `        clientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 271 | `        permissions,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 272 | `        workspaces,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 273 | `        activeWorkspace,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 274 | `        setActiveWorkspace,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 275 | `        hasPermission,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 276 | `        loading,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 277 | `        signOut,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 278 | `        refreshProfile,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 279 | `      }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 280 | `    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 281 | `      {children}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 282 | `    </AuthContext.Provider>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 283 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 284 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 285 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 286 | `export function useAuth() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 287 | `  const ctx = useContext(AuthContext);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 288 | `  if (!ctx) throw new Error("useAuth must be used within AuthProvider");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 289 | `  return ctx;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 290 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 291 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
