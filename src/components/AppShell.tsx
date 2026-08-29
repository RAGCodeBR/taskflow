import { Link, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ListChecks,
  Users,
  Building2,
  Settings,
  LogOut,
  Moon,
  Sun,
  PanelLeft,
  PanelRight,
  BarChart3,
  Trash2,
  FileUp,
  PanelsTopLeft,
  CalendarDays,
  CalendarCog,
  CircleDollarSign,
  ChevronDown,
  MessageSquareText,
  ClipboardList,
} from "lucide-react";
import { NotificationBell } from "@/components/NotificationBell";
import { AssignmentPopup } from "@/components/AssignmentPopup";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import businessMentoringLogo from "@/assets/la-business-mentoring.png";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useMuralUnreadCount } from "@/hooks/use-mural-unread";
import { useRequestUnreadCount } from "@/hooks/use-request-unread";

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; adminOnly?: boolean };
const allNav: readonly NavItem[] = [
  { to: "/mural", label: "Mural LA", icon: MessageSquareText },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tasks", label: "Minhas Tarefas", icon: ListChecks },
  { to: "/import-ata", label: "Importar Ata", icon: FileUp },
  { to: "/clients", label: "Clientes", icon: Building2 },
  { to: "/reports", label: "Relatórios", icon: BarChart3 },
  { to: "/agenda", label: "Agenda", icon: CalendarDays },
  { to: "/requests", label: "Solicitações", icon: ClipboardList },
  { to: "/portal", label: "Portal do Cliente", icon: PanelsTopLeft },
  { to: "/users", label: "Usuários", icon: Users, adminOnly: true },
  { to: "/trash", label: "Lixeira", icon: Trash2 },
  { to: "/settings", label: "Personalizar", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { profile, user, signOut, isAdmin, hasPermission } = useAuth();
  const muralUnreadCount = useMuralUnreadCount();
  const requestUnreadCount = useRequestUnreadCount();
  const canAccessDeliveries = hasPermission("portal_entregas") || hasPermission("portal");
  const canAccessFinance = hasPermission("portal_financeiro") || hasPermission("portal");
  const nav = useMemo(() => {
    const accessByPath: Record<string, string> = {
      "/dashboard": "dashboard",
      "/tasks": "tasks",
      "/requests": "requests",
      "/import-ata": "import_ata",
      "/clients": "clients",
      "/reports": "reports",
      "/mural": "mural",
      "/agenda": "agenda",
      "/users": "users",
      "/trash": "trash",
      "/settings": "settings",
    };
    return allNav.filter((item) => {
      if (item.to === "/portal") return canAccessDeliveries || canAccessFinance;
      return (!item.adminOnly || isAdmin) && hasPermission(accessByPath[item.to]);
    });
  }, [canAccessDeliveries, canAccessFinance, isAdmin, hasPermission]);

  const { theme, toggle } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("sidebar-open");
    return stored === null ? true : stored === "true";
  });
  useEffect(() => {
    localStorage.setItem("sidebar-open", String(sidebarOpen));
  }, [sidebarOpen]);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const initials = (profile?.full_name || user?.email || "?").slice(0, 2).toUpperCase();

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <aside
        className={`hidden h-dvh shrink-0 flex-col text-sidebar-foreground transition-all duration-300 md:flex ${
          sidebarOpen ? "w-56" : "w-16 items-center"
        }`}
        style={{ background: "var(--gradient-sidebar)" }}
      >
        <div
          className={`flex ${sidebarOpen ? "flex-col items-center gap-3 py-4 px-5" : "items-center justify-center py-5 px-2"}`}
        >
          <div
            className={`flex shrink-0 items-center justify-center ${sidebarOpen ? "h-16 w-40" : "h-9 w-9"}`}
          >
            <img
              src={businessMentoringLogo}
              alt="TaskFlow"
              className="h-full w-full object-contain"
            />
          </div>
          {sidebarOpen && <span className="text-lg font-semibold leading-none">TaskFlow</span>}
        </div>

        <div className={`flex ${sidebarOpen ? "justify-end px-3" : "justify-center"} mb-2`}>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={() => setSidebarOpen((o) => !o)}
            title={sidebarOpen ? "Recolher menu" : "Expandir menu"}
          >
            {sidebarOpen ? <PanelLeft className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="sidebar-nav min-h-0 flex-1 space-y-1 overflow-y-auto px-3">
          {nav.map((n) => {
            if (n.to === "/portal")
              return (
                <PortalNavGroup
                  key={n.to}
                  expanded={sidebarOpen}
                  active={pathname.startsWith("/portal/")}
                  canAccessDeliveries={canAccessDeliveries}
                  canAccessFinance={canAccessFinance}
                />
              );
            const Active = pathname === n.to || pathname.startsWith(n.to + "/");
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 rounded-lg transition ${
                  sidebarOpen ? "px-3 py-2 text-sm" : "justify-center px-2 py-2 text-sm"
                } ${
                  Active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
                }`}
                title={sidebarOpen ? undefined : n.label}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {sidebarOpen && <span className="truncate">{n.label}</span>}
                {n.to === "/mural" && muralUnreadCount > 0 && (
                  <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {muralUnreadCount > 99 ? "99+" : muralUnreadCount}
                  </span>
                )}
                {n.to === "/requests" && requestUnreadCount > 0 && (
                  <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {requestUnreadCount > 99 ? "99+" : requestUnreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div
          className={`border-t border-sidebar-border p-3 ${sidebarOpen ? "" : "flex flex-col items-center gap-2"}`}
        >
          <div
            className={`flex items-center gap-3 rounded-lg p-2 ${sidebarOpen ? "" : "flex-col"}`}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={profile?.avatar_url || undefined}
                alt={profile?.full_name || user?.email || "Usuário"}
              />
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{profile?.full_name || user?.email}</p>
                <p className="truncate text-xs text-sidebar-foreground/60">{user?.email}</p>
              </div>
            )}
            <div className={`flex ${sidebarOpen ? "gap-1" : "flex-col gap-2"}`}>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                onClick={toggle}
                title={theme === "dark" ? "Modo claro" : "Modo escuro"}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                onClick={signOut}
                title="Sair"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar toggle header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-background border-b px-3 py-2">
        <Button size="icon" variant="ghost" onClick={() => setSidebarOpen((o) => !o)}>
          <PanelLeft className="h-5 w-5" />
        </Button>
        <span className="font-semibold">TaskFlow</span>
        <NotificationBell />
      </div>

      {/* Mobile overlay sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="w-56 bg-background border-r flex flex-col"
            style={{ background: "var(--gradient-sidebar)" }}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-16 w-40 shrink-0 items-center justify-center">
                  <img
                    src={businessMentoringLogo}
                    alt="TaskFlow"
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-lg font-semibold leading-none">TaskFlow</span>
              </div>
              <Button size="icon" variant="ghost" onClick={() => setSidebarOpen(false)}>
                <PanelLeft className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 space-y-1 px-3">
              {nav.map((n) => {
                if (n.to === "/portal")
                  return (
                    <PortalNavGroup
                      key={n.to}
                      expanded
                      active={pathname.startsWith("/portal/")}
                      canAccessDeliveries={canAccessDeliveries}
                      canAccessFinance={canAccessFinance}
                      onNavigate={() => setSidebarOpen(false)}
                    />
                  );
                const Active = pathname === n.to || pathname.startsWith(n.to + "/");
                const Icon = n.icon;
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                      Active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {n.label}
                    {n.to === "/mural" && muralUnreadCount > 0 && (
                      <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                        {muralUnreadCount > 99 ? "99+" : muralUnreadCount}
                      </span>
                    )}
                    {n.to === "/requests" && requestUnreadCount > 0 && (
                      <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                        {requestUnreadCount > 99 ? "99+" : requestUnreadCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-sidebar-border p-3">
              <div className="flex items-center gap-3 rounded-lg p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={profile?.avatar_url || undefined}
                    alt={profile?.full_name || user?.email || "Usuário"}
                  />
                  <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {profile?.full_name || user?.email}
                  </p>
                  <p className="truncate text-xs text-sidebar-foreground/60">{user?.email}</p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={toggle}
                  title={theme === "dark" ? "Modo claro" : "Modo escuro"}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={signOut}
                  title="Sair"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto md:pt-0 pt-12">
        <div className="hidden md:flex sticky top-0 z-30 justify-end gap-2 px-4 py-2 bg-background/80 backdrop-blur border-b">
          <NotificationBell />
        </div>
        {children}
      </main>
      <AssignmentPopup />
    </div>
  );
}

function PortalNavGroup({
  expanded,
  active,
  canAccessDeliveries,
  canAccessFinance,
  onNavigate,
}: {
  expanded: boolean;
  active: boolean;
  canAccessDeliveries: boolean;
  canAccessFinance: boolean;
  onNavigate?: () => void;
}) {
  if (!expanded)
    return (
      <div
        title="Portal do Cliente"
        className={`flex justify-center rounded-lg px-2 py-2 ${active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70"}`}
      >
        <PanelsTopLeft className="h-4 w-4" />
      </div>
    );
  return (
    <Collapsible defaultOpen={active} className="space-y-1">
      <CollapsibleTrigger
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"}`}
      >
        <PanelsTopLeft className="h-4 w-4" />
        <span className="flex-1 text-left">Portal do Cliente</span>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 pl-4">
        {canAccessDeliveries && (
          <Link
            to="/portal/entregas"
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
          >
            <CalendarCog className="h-4 w-4" />
            Calendário de Entregas
          </Link>
        )}
        {canAccessFinance && (
          <Link
            to="/portal/financeiro"
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
          >
            <CircleDollarSign className="h-4 w-4" />
            Financeiro
          </Link>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
