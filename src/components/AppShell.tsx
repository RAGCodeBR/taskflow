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
  PanelsTopLeft,
  CalendarDays,
  CalendarCog,
  CircleDollarSign,
  ChevronDown,
  MessageSquareText,
  MessagesSquare,
  Layers3,
  Handshake,
  ContactRound,
} from "lucide-react";
import { NotificationBell } from "@/components/NotificationBell";
import { UpdateCenter } from "@/components/UpdateCenter";
import { RecurringMeetingReminderPopup } from "@/components/RecurringMeetingReminderPopup";
import { AssignmentPopup } from "@/components/AssignmentPopup";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import businessMentoringLogo from "@/assets/la-business-mentoring.png";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMuralUnreadCount } from "@/hooks/use-mural-unread";
import { useMuralLaunchDigest } from "@/hooks/use-mural-launch-digest";
import { useMuralRealtime } from "@/hooks/use-mural-realtime";
import {
  useTaskConversationsUnread,
  useTaskConversationRealtime,
} from "@/hooks/use-task-conversations";
import { canSwitchTaskFlowEnvironment } from "@/lib/environment-access";
import { WorkspaceLoadingScreen } from "@/components/WorkspaceLoadingScreen";
import { useHasInvitedMeeting } from "@/hooks/use-meetings";
import { ClientsNavGroup } from "@/components/ClientsNavGroup";

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
  { to: "/conversations", label: "Conversas", icon: MessagesSquare },
  { to: "/obligations", label: "Obrigações", icon: CalendarCog },
  { to: "/meetings", label: "Reuniões", icon: Handshake },
  { to: "/clients", label: "Clientes", icon: Building2 },
  { to: "/crm", label: "CRM", icon: ContactRound },
  { to: "/reports", label: "Relatórios", icon: BarChart3 },
  { to: "/agenda", label: "Agenda", icon: CalendarDays },
  { to: "/portal", label: "Portal do Cliente", icon: PanelsTopLeft },
  { to: "/users", label: "Usuários", icon: Users, adminOnly: true },
  { to: "/trash", label: "Lixeira", icon: Trash2 },
  { to: "/settings", label: "Personalizar", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const {
    profile,
    user,
    signOut,
    isAdmin,
    hasPermission,
    workspaces,
    activeWorkspace,
    isWorkspaceTransitioning,
  } = useAuth();
  const muralUnreadCount = useMuralUnreadCount();
  // Resumo da atividade leve do mural desde a última visita — em qualquer
  // tela, uma vez por carregamento do sistema.
  useMuralLaunchDigest();
  // Atividade do mural ao vivo em qualquer tela (avisos + cache fresco).
  useMuralRealtime();
  const conversationsUnread = useTaskConversationsUnread();
  useTaskConversationRealtime();
  const canAccessDeliveries = hasPermission("portal_entregas") || hasPermission("portal");
  const canAccessFinance = hasPermission("portal_financeiro") || hasPermission("portal");
  const { data: hasInvitedMeeting = false } = useHasInvitedMeeting();
  const canSwitchEnvironments = canSwitchTaskFlowEnvironment(workspaces.length);
  const nav = useMemo(() => {
    const accessByPath: Record<string, string> = {
      "/dashboard": "dashboard",
      "/tasks": "tasks",
      "/conversations": "conversations",
      "/obligations": "obligations",
      "/meetings": "meetings",
      "/import-ata": "import_ata",
      "/clients": "clients",
      "/crm": "crm",
      "/reports": "reports",
      "/mural": "mural",
      "/agenda": "agenda",
      "/users": "users",
      "/trash": "trash",
      "/settings": "settings",
    };
    return allNav.filter((item) => {
      if (item.to === "/portal") return canAccessDeliveries || canAccessFinance;
      if (item.to === "/meetings" && hasInvitedMeeting) return true;
      return (!item.adminOnly || isAdmin) && hasPermission(accessByPath[item.to]);
    });
  }, [canAccessDeliveries, canAccessFinance, hasInvitedMeeting, isAdmin, hasPermission]);

  const { theme, toggle } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("sidebar-open");
    return stored === null ? true : stored === "true";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem("sidebar-open", String(sidebarOpen));
  }, [sidebarOpen]);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const initials = (profile?.full_name || user?.email || "?").slice(0, 2).toUpperCase();

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <aside
        className={`hidden h-dvh shrink-0 flex-col overflow-hidden text-sidebar-foreground transition-[width] duration-300 ease-in-out motion-reduce:transition-none md:flex ${
          sidebarOpen ? "w-56" : "w-16 items-center"
        }`}
        style={{
          background: "var(--gradient-sidebar)",
          borderRight: "1px solid var(--sidebar-hairline)",
        }}
      >
        <div className="flex h-32 w-full shrink-0 flex-col items-center justify-center gap-3 overflow-hidden px-2">
          <div className="relative flex h-16 w-40 shrink-0 items-center justify-center">
            <img
              src={businessMentoringLogo}
              alt="LA Business Mentoring"
              className={`absolute h-full w-full object-contain transition-opacity duration-200 motion-reduce:transition-none ${sidebarOpen ? "opacity-100" : "opacity-0"}`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-12 w-11 overflow-hidden transition-opacity duration-200 motion-reduce:transition-none ${sidebarOpen ? "opacity-0" : "opacity-100"}`}
            >
              <img
                src={businessMentoringLogo}
                alt=""
                className="absolute -left-[5px] top-0 h-auto w-[220px] max-w-none"
              />
            </span>
          </div>
          <span
            aria-hidden={!sidebarOpen}
            className={`overflow-hidden whitespace-nowrap text-lg font-semibold leading-none transition-[max-height,opacity] duration-300 motion-reduce:transition-none ${sidebarOpen ? "max-h-6 opacity-100" : "max-h-0 opacity-0"}`}
          >
            TaskFlow
          </span>
        </div>

        <nav className="sidebar-nav min-h-0 w-full flex-1 space-y-1 overflow-y-auto px-3">
          {nav.map((n) => {
            if (n.to === "/clients") return <ClientsNavGroup key={`${activeWorkspace?.id}:clients`} expanded={sidebarOpen} active={pathname.startsWith('/clients')} />;
            if (n.to === "/portal")
              return (
                <PortalNavGroup
                  key={n.to}
                  expanded={sidebarOpen}
                  active={pathname.startsWith("/portal/")}
                  pathname={pathname}
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
                className={`flex items-center rounded-full transition-[width,gap,padding,background-color,color] duration-300 motion-reduce:transition-none ${
                  sidebarOpen ? "w-full gap-3 px-3 py-2 text-sm" : "mx-auto h-10 w-10 justify-center gap-0 p-1 text-sm"
                } ${
                  Active
                    ? "border border-sidebar-primary bg-sidebar/45 text-sidebar-foreground font-medium shadow-sm"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"
                }`}
                title={sidebarOpen ? undefined : n.label}
              >
                <span
                  className={`grid shrink-0 place-items-center ${Active ? "h-7 w-7 rounded-full bg-sidebar-primary text-sidebar-primary-foreground" : "h-7 w-7"}`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span
                  aria-hidden={!sidebarOpen}
                  className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 motion-reduce:transition-none ${sidebarOpen ? "max-w-40 opacity-100" : "max-w-0 opacity-0"}`}
                >
                  {n.label}
                </span>
                {n.to === "/mural" && muralUnreadCount > 0 && (
                  <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {muralUnreadCount > 99 ? "99+" : muralUnreadCount}
                  </span>
                )}
                {n.to === "/conversations" && conversationsUnread > 0 && (
                  <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-[#142e63] px-1 text-[10px] font-bold text-white shadow-sm">
                    {conversationsUnread > 99 ? "99+" : conversationsUnread}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div
          className={`border-t border-sidebar-border ${sidebarOpen ? "p-3" : "flex flex-col items-center gap-2 p-1"}`}
        >
          <div
            className={`flex items-center gap-3 rounded-lg ${sidebarOpen ? "flex-wrap p-2" : "flex-col p-1"}`}
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
            <div className={`flex ${sidebarOpen ? "w-full justify-end gap-1" : "flex-col gap-2"}`}>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-sidebar-foreground/75 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"
                onClick={toggle}
                title={theme === "dark" ? "Modo claro" : "Modo escuro"}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-sidebar-foreground/75 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"
                onClick={() => setSidebarOpen((open) => !open)}
                aria-label={sidebarOpen ? "Recolher menu" : "Expandir menu"}
                title={sidebarOpen ? "Recolher menu" : "Expandir menu"}
              >
                {sidebarOpen ? <PanelLeft className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-sidebar-foreground/75 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"
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
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between gap-2 border-b bg-background px-3 md:hidden">
        <Button
          size="icon"
          variant="ghost"
          aria-label="Abrir menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(true)}
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
        <span className="min-w-0 truncate font-semibold">TaskFlow</span>
        <div className="flex shrink-0 items-center gap-1">
          <UpdateCenter />
          {canSwitchEnvironments && workspaces.length > 1 && (
            <Button asChild variant="ghost" size="icon" title="Trocar ambiente">
              <Link to="/ambientes">
                <Layers3 className="h-5 w-5" />
              </Link>
            </Button>
          )}
          <NotificationBell />
        </div>
      </div>

      {/* Mobile overlay sidebar */}
      <div
        className={`fixed inset-0 z-50 flex md:hidden ${mobileMenuOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
      >
          <div
            className={`flex w-[min(18rem,calc(100vw-3rem))] min-w-0 flex-col border-r bg-background transition-transform duration-300 ease-in-out motion-reduce:transition-none ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
            style={{ background: "var(--gradient-sidebar)" }}
          >
            <div className="px-5 py-4">
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
            </div>
            <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 pb-3">
              {nav.map((n) => {
                if (n.to === "/clients") return <ClientsNavGroup key={`${activeWorkspace?.id}:clients-mobile`} expanded active={pathname.startsWith('/clients')} onNavigate={() => setMobileMenuOpen(false)} />;
                if (n.to === "/portal")
                  return (
                    <PortalNavGroup
                      key={n.to}
                      expanded
                      active={pathname.startsWith("/portal/")}
                      pathname={pathname}
                      canAccessDeliveries={canAccessDeliveries}
                      canAccessFinance={canAccessFinance}
                      onNavigate={() => setMobileMenuOpen(false)}
                    />
                  );
                const Active = pathname === n.to || pathname.startsWith(n.to + "/");
                const Icon = n.icon;
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-full px-3 py-2 text-sm transition ${
                      Active
                        ? "border border-sidebar-primary bg-sidebar/45 text-sidebar-foreground font-medium shadow-sm"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"
                    }`}
                  >
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center ${Active ? "rounded-full bg-sidebar-primary text-sidebar-primary-foreground" : ""}`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    {n.label}
                    {n.to === "/mural" && muralUnreadCount > 0 && (
                      <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                        {muralUnreadCount > 99 ? "99+" : muralUnreadCount}
                      </span>
                    )}
                    {n.to === "/conversations" && conversationsUnread > 0 && (
                      <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-[#142e63] px-1 text-[10px] font-bold text-white shadow-sm">
                        {conversationsUnread > 99 ? "99+" : conversationsUnread}
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
                  className="h-8 w-8 shrink-0"
                  onClick={toggle}
                  title={theme === "dark" ? "Modo claro" : "Modo escuro"}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 shrink-0"
                  aria-label="Fechar menu"
                  title="Fechar menu"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PanelLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 shrink-0"
                  onClick={signOut}
                  title="Sair"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div
            className={`min-w-0 flex-1 bg-black/50 transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>

      <RecurringMeetingReminderPopup />
      <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto pt-14 md:pt-0">
        <div className="hidden md:flex sticky top-0 z-40 justify-end gap-2 px-4 py-2 bg-background/80 backdrop-blur border-b">
          <UpdateCenter />
          {canSwitchEnvironments && workspaces.length > 1 && (
            <Button
              asChild
              variant="ghost"
              className="h-9 gap-2 rounded-full px-3 text-sm"
              title="Trocar ambiente"
            >
              <Link to="/ambientes">
                <Layers3 className="h-4 w-4" />
                <span>{activeWorkspace?.name ?? "Ambiente"}</span>
              </Link>
            </Button>
          )}
          <NotificationBell />
        </div>
        {children}
      </main>
      <AssignmentPopup />
      {isWorkspaceTransitioning && <WorkspaceLoadingScreen workspaceName={activeWorkspace?.name} />}
    </div>
  );
}

function PortalNavGroup({
  expanded,
  active,
  pathname,
  canAccessDeliveries,
  canAccessFinance,
  onNavigate,
}: {
  expanded: boolean;
  active: boolean;
  pathname: string;
  canAccessDeliveries: boolean;
  canAccessFinance: boolean;
  onNavigate?: () => void;
}) {
  const deliveriesActive = pathname.startsWith("/portal/entregas");
  const financeActive = pathname.startsWith("/portal/financeiro");

  if (!expanded)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            title="Portal do Cliente"
            className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full p-1 transition ${active ? "bg-sidebar-primary/10 text-sidebar-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"}`}
          >
            <span
              className={`grid h-7 w-7 place-items-center ${active ? "rounded-full bg-sidebar-primary text-sidebar-primary-foreground" : ""}`}
            >
              <PanelsTopLeft className="h-4 w-4" />
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" className="min-w-56 p-1.5">
          {canAccessDeliveries && (
            <DropdownMenuItem asChild>
              <Link
                to="/portal/entregas"
                className={deliveriesActive ? "bg-sidebar-primary/10 text-sidebar-primary" : ""}
              >
                <CalendarCog className="h-4 w-4" />
                Calendário de Entregas
              </Link>
            </DropdownMenuItem>
          )}
          {canAccessFinance && (
            <DropdownMenuItem asChild>
              <Link
                to="/portal/financeiro"
                className={financeActive ? "bg-sidebar-primary/10 text-sidebar-primary" : ""}
              >
                <CircleDollarSign className="h-4 w-4" />
                Financeiro
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  return (
    <Collapsible defaultOpen={active} className="space-y-1">
      <CollapsibleTrigger
        className={`flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition ${active ? "bg-sidebar-primary/10 text-sidebar-primary font-medium" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"}`}
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center">
          <PanelsTopLeft className="h-4 w-4" />
        </span>
        <span className="flex-1 text-left">Portal do Cliente</span>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="relative ml-6 space-y-1 border-l border-sidebar-primary/25 pl-3">
        {canAccessDeliveries && (
          <Link
            to="/portal/entregas"
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-full px-3 py-2 text-sm transition ${deliveriesActive ? "border border-sidebar-primary bg-sidebar/45 text-sidebar-foreground font-medium shadow-sm" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"}`}
          >
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center ${deliveriesActive ? "rounded-full bg-sidebar-primary text-sidebar-primary-foreground" : ""}`}
            >
              <CalendarCog className="h-4 w-4" />
            </span>
            Calendário de Entregas
          </Link>
        )}
        {canAccessFinance && (
          <Link
            to="/portal/financeiro"
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-full px-3 py-2 text-sm transition ${financeActive ? "border border-sidebar-primary bg-sidebar/45 text-sidebar-foreground font-medium shadow-sm" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"}`}
          >
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center ${financeActive ? "rounded-full bg-sidebar-primary text-sidebar-primary-foreground" : ""}`}
            >
              <CircleDollarSign className="h-4 w-4" />
            </span>
            Financeiro
          </Link>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
