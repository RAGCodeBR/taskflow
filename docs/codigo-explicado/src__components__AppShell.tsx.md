# src/components/AppShell.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { Link, useRouterState } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `  LayoutDashboard,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `  ListChecks,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `  Users,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `  Building2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `  Settings,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `  LogOut,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `  Moon,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `  Sun,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  PanelLeft,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  PanelRight,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  BarChart3,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  Trash2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  FileUp,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  PanelsTopLeft,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  CalendarDays,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `  CalendarCog,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `  CircleDollarSign,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `  ChevronDown,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  MessageSquareText,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `  ClipboardList,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `  Layers3,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `} from "lucide-react";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `import { NotificationBell } from "@/components/NotificationBell";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 29 | `import { AssignmentPopup } from "@/components/AssignmentPopup";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 30 | `import { useEffect, useMemo, useState, type ReactNode } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 31 | `import businessMentoringLogo from "@/assets/la-business-mentoring.png";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 32 | `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 33 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 34 | `  DropdownMenu,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `  DropdownMenuContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `  DropdownMenuItem,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `  DropdownMenuTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `} from "@/components/ui/dropdown-menu";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `import { useMuralUnreadCount } from "@/hooks/use-mural-unread";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 40 | `import { useRequestUnreadCount } from "@/hooks/use-request-unread";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 41 | `import { canSwitchTaskFlowEnvironment } from "@/lib/environment-access";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 42 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 43 | `function useTheme() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 44 | `  const [theme, setTheme] = useState<"light" | "dark">(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 45 | `    if (typeof window === "undefined") return "light";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 46 | `    const stored = localStorage.getItem("theme");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 47 | `    if (stored === "dark" || stored === "light") return stored;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 48 | `    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 49 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 50 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 51 | `    document.documentElement.classList.toggle("dark", theme === "dark");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `    localStorage.setItem("theme", theme);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `  }, [theme]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 55 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 56 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 57 | `type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; adminOnly?: boolean };` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 58 | `const allNav: readonly NavItem[] = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 59 | `  { to: "/mural", label: "Mural LA", icon: MessageSquareText },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `  { to: "/tasks", label: "Minhas Tarefas", icon: ListChecks },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `  { to: "/obligations", label: "Obrigações", icon: CalendarCog },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 63 | `  { to: "/import-ata", label: "Importar Ata", icon: FileUp },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `  { to: "/clients", label: "Clientes", icon: Building2 },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `  { to: "/reports", label: "Relatórios", icon: BarChart3 },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `  { to: "/agenda", label: "Agenda", icon: CalendarDays },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `  { to: "/requests", label: "Solicitações", icon: ClipboardList },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `  { to: "/portal", label: "Portal do Cliente", icon: PanelsTopLeft },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `  { to: "/users", label: "Usuários", icon: Users, adminOnly: true },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `  { to: "/trash", label: "Lixeira", icon: Trash2 },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `  { to: "/settings", label: "Personalizar", icon: Settings },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 72 | `] as const;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 74 | `export function AppShell({ children }: { children: ReactNode }) {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 75 | `  const { profile, user, signOut, isAdmin, hasPermission, workspaces, activeWorkspace } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 76 | `  const muralUnreadCount = useMuralUnreadCount();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 77 | `  const requestUnreadCount = useRequestUnreadCount();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 78 | `  const canAccessDeliveries = hasPermission("portal_entregas") || hasPermission("portal");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 79 | `  const canAccessFinance = hasPermission("portal_financeiro") || hasPermission("portal");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 80 | `  const canSwitchEnvironments = canSwitchTaskFlowEnvironment(workspaces.length);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 81 | `  const nav = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 82 | `    const accessByPath: Record<string, string> = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 83 | `      "/dashboard": "dashboard",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `      "/tasks": "tasks",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `      "/obligations": "obligations",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `      "/requests": "requests",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `      "/import-ata": "import_ata",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `      "/clients": "clients",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `      "/reports": "reports",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `      "/mural": "mural",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `      "/agenda": "agenda",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `      "/users": "users",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 93 | `      "/trash": "trash",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `      "/settings": "settings",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 95 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 96 | `    return allNav.filter((item) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 97 | `      if (item.to === "/portal") return canAccessDeliveries || canAccessFinance;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 98 | `      return (!item.adminOnly || isAdmin) && hasPermission(accessByPath[item.to]);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 99 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 100 | `  }, [canAccessDeliveries, canAccessFinance, isAdmin, hasPermission]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 101 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 102 | `  const { theme, toggle } = useTheme();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 103 | `  const [sidebarOpen, setSidebarOpen] = useState(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 104 | `    if (typeof window === "undefined") return true;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 105 | `    const stored = localStorage.getItem("sidebar-open");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 106 | `    return stored === null ? true : stored === "true";` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 107 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 108 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 109 | `    localStorage.setItem("sidebar-open", String(sidebarOpen));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `  }, [sidebarOpen]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 112 | `  const pathname = useRouterState({ select: (s) => s.location.pathname });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 113 | `  const initials = (profile?.full_name || user?.email || "?").slice(0, 2).toUpperCase();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 114 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 115 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 116 | `    <div className="flex h-dvh overflow-hidden bg-background">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 117 | `      <aside` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 118 | `        className={\`hidden h-dvh shrink-0 flex-col text-sidebar-foreground transition-all duration-300 md:flex ${` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 119 | `          sidebarOpen ? "w-56" : "w-16 items-center"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 120 | `        }\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `        style={{ background: "var(--gradient-sidebar)" }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `        <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 124 | `          className={\`flex ${sidebarOpen ? "flex-col items-center gap-3 py-4 px-5" : "items-center justify-center py-5 px-2"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 125 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `          <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 127 | `            className={\`flex shrink-0 items-center justify-center ${sidebarOpen ? "h-16 w-40" : "h-9 w-9"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 128 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `            <img` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 130 | `              src={businessMentoringLogo}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `              alt="TaskFlow"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `              className="h-full w-full object-contain"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 133 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 135 | `          {sidebarOpen && <span className="text-lg font-semibold leading-none">TaskFlow</span>}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 136 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 137 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 138 | `        <div className={\`flex ${sidebarOpen ? "justify-end px-3" : "justify-center"} mb-2\`}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 139 | `          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 140 | `            size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 141 | `            variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 142 | `            className="h-7 w-7 text-sidebar-foreground/65 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 143 | `            onClick={() => setSidebarOpen((o) => !o)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 144 | `            title={sidebarOpen ? "Recolher menu" : "Expandir menu"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 145 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 146 | `            {sidebarOpen ? <PanelLeft className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 147 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 148 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 149 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 150 | `        <nav className="sidebar-nav min-h-0 flex-1 space-y-1 overflow-y-auto px-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 151 | `          {nav.map((n) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 152 | `            if (n.to === "/portal")` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 153 | `              return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 154 | `                <PortalNavGroup` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 155 | `                  key={n.to}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `                  expanded={sidebarOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 157 | `                  active={pathname.startsWith("/portal/")}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 158 | `                  pathname={pathname}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `                  canAccessDeliveries={canAccessDeliveries}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 160 | `                  canAccessFinance={canAccessFinance}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `              );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 163 | `            const Active = pathname === n.to || pathname.startsWith(n.to + "/");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 164 | `            const Icon = n.icon;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 165 | `            return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 166 | `              <Link` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 167 | `                key={n.to}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 168 | `                to={n.to}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 169 | `                className={\`flex items-center gap-3 rounded-full transition ${` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 170 | `                  sidebarOpen ? "px-3 py-2 text-sm" : "justify-center px-2 py-2 text-sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 171 | `                } ${` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 172 | `                  Active` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 173 | `                    ? "border border-sidebar-primary bg-sidebar/45 text-sidebar-foreground font-medium shadow-sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 175 | `                }\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 176 | `                title={sidebarOpen ? undefined : n.label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 177 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `                <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 179 | `                  className={\`grid shrink-0 place-items-center ${Active ? "h-7 w-7 rounded-full bg-sidebar-primary text-sidebar-primary-foreground" : "h-7 w-7"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 180 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 181 | `                  <Icon className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 182 | `                </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 183 | `                {sidebarOpen && <span className="truncate">{n.label}</span>}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 184 | `                {n.to === "/mural" && muralUnreadCount > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 185 | `                  <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 186 | `                    {muralUnreadCount > 99 ? "99+" : muralUnreadCount}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 187 | `                  </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 188 | `                )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 189 | `                {n.to === "/requests" && requestUnreadCount > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 190 | `                  <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 191 | `                    {requestUnreadCount > 99 ? "99+" : requestUnreadCount}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 192 | `                  </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 193 | `                )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 194 | `              </Link>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 195 | `            );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 196 | `          })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 197 | `        </nav>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 198 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 199 | `        <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 200 | `          className={\`border-t border-sidebar-border p-3 ${sidebarOpen ? "" : "flex flex-col items-center gap-2"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 201 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 202 | `          <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 203 | `            className={\`flex items-center gap-3 rounded-lg p-2 ${sidebarOpen ? "" : "flex-col"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 204 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 205 | `            <Avatar className="h-8 w-8">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 206 | `              <AvatarImage` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 207 | `                src={profile?.avatar_url || undefined}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 208 | `                alt={profile?.full_name || user?.email || "Usuário"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 209 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 210 | `              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 211 | `                {initials}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 212 | `              </AvatarFallback>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 213 | `            </Avatar>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 214 | `            {sidebarOpen && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 215 | `              <div className="min-w-0 flex-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 216 | `                <p className="truncate text-sm font-medium">{profile?.full_name || user?.email}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 217 | `                <p className="truncate text-xs text-sidebar-foreground/60">{user?.email}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 218 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 219 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 220 | `            <div className={\`flex ${sidebarOpen ? "gap-1" : "flex-col gap-2"}\`}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 221 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 222 | `                size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 223 | `                variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 224 | `                className="h-8 w-8 text-sidebar-foreground/75 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 225 | `                onClick={toggle}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 226 | `                title={theme === "dark" ? "Modo claro" : "Modo escuro"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 227 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 228 | `                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 229 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 230 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 231 | `                size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 232 | `                variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 233 | `                className="h-8 w-8 text-sidebar-foreground/75 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 234 | `                onClick={signOut}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 235 | `                title="Sair"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 236 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 237 | `                <LogOut className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 238 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 239 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 240 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 241 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 242 | `      </aside>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 243 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 244 | `      {/* Mobile sidebar toggle header */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 245 | `      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-background border-b px-3 py-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 246 | `        <Button size="icon" variant="ghost" onClick={() => setSidebarOpen((o) => !o)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 247 | `          <PanelLeft className="h-5 w-5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 248 | `        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 249 | `        <span className="font-semibold">TaskFlow</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 250 | `        <div className="flex items-center gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 251 | `          {canSwitchEnvironments && workspaces.length > 1 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 252 | `            <Button asChild variant="ghost" size="icon" title="Trocar ambiente">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 253 | `              <Link to="/ambientes"><Layers3 className="h-5 w-5" /></Link>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 254 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 255 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 256 | `          <NotificationBell />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 257 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 258 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 259 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 260 | `      {/* Mobile overlay sidebar */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 261 | `      {sidebarOpen && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 262 | `        <div className="md:hidden fixed inset-0 z-50 flex">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 263 | `          <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 264 | `            className="w-56 bg-background border-r flex flex-col"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 265 | `            style={{ background: "var(--gradient-sidebar)" }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 266 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 267 | `            <div className="flex items-center justify-between px-5 py-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 268 | `              <div className="flex flex-col items-center gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 269 | `                <div className="flex h-16 w-40 shrink-0 items-center justify-center">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 270 | `                  <img` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 271 | `                    src={businessMentoringLogo}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 272 | `                    alt="TaskFlow"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 273 | `                    className="h-full w-full object-contain"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 274 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 275 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 276 | `                <span className="text-lg font-semibold leading-none">TaskFlow</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 277 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 278 | `              <Button size="icon" variant="ghost" onClick={() => setSidebarOpen(false)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 279 | `                <PanelLeft className="h-5 w-5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 280 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 281 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 282 | `            <nav className="flex-1 space-y-1 px-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 283 | `              {nav.map((n) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 284 | `                if (n.to === "/portal")` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 285 | `                  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 286 | `                    <PortalNavGroup` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 287 | `                      key={n.to}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 288 | `                      expanded` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 289 | `                      active={pathname.startsWith("/portal/")}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 290 | `                      pathname={pathname}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 291 | `                      canAccessDeliveries={canAccessDeliveries}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 292 | `                      canAccessFinance={canAccessFinance}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 293 | `                      onNavigate={() => setSidebarOpen(false)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 294 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 295 | `                  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 296 | `                const Active = pathname === n.to || pathname.startsWith(n.to + "/");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 297 | `                const Icon = n.icon;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 298 | `                return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 299 | `                  <Link` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 300 | `                    key={n.to}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 301 | `                    to={n.to}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 302 | `                    onClick={() => setSidebarOpen(false)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 303 | `                    className={\`flex items-center gap-3 rounded-full px-3 py-2 text-sm transition ${` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 304 | `                      Active` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 305 | `                        ? "border border-sidebar-primary bg-sidebar/45 text-sidebar-foreground font-medium shadow-sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 306 | `                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 307 | `                    }\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 308 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 309 | `                    <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 310 | `                      className={\`grid h-7 w-7 shrink-0 place-items-center ${Active ? "rounded-full bg-sidebar-primary text-sidebar-primary-foreground" : ""}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 311 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 312 | `                      <Icon className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 313 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 314 | `                    {n.label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 315 | `                    {n.to === "/mural" && muralUnreadCount > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 316 | `                      <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 317 | `                        {muralUnreadCount > 99 ? "99+" : muralUnreadCount}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 318 | `                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 319 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 320 | `                    {n.to === "/requests" && requestUnreadCount > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 321 | `                      <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 322 | `                        {requestUnreadCount > 99 ? "99+" : requestUnreadCount}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 323 | `                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 324 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 325 | `                  </Link>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 326 | `                );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 327 | `              })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 328 | `            </nav>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 329 | `            <div className="border-t border-sidebar-border p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 330 | `              <div className="flex items-center gap-3 rounded-lg p-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 331 | `                <Avatar className="h-8 w-8">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 332 | `                  <AvatarImage` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 333 | `                    src={profile?.avatar_url || undefined}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 334 | `                    alt={profile?.full_name || user?.email || "Usuário"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 335 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 336 | `                  <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 337 | `                    {initials}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 338 | `                  </AvatarFallback>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 339 | `                </Avatar>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 340 | `                <div className="min-w-0 flex-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 341 | `                  <p className="truncate text-sm font-medium">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 342 | `                    {profile?.full_name || user?.email}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 343 | `                  </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 344 | `                  <p className="truncate text-xs text-sidebar-foreground/60">{user?.email}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 345 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 346 | `                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 347 | `                  size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 348 | `                  variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 349 | `                  className="h-8 w-8"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 350 | `                  onClick={toggle}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 351 | `                  title={theme === "dark" ? "Modo claro" : "Modo escuro"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 352 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 353 | `                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 354 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 355 | `                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 356 | `                  size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 357 | `                  variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 358 | `                  className="h-8 w-8"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 359 | `                  onClick={signOut}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 360 | `                  title="Sair"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 361 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 362 | `                  <LogOut className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 363 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 364 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 365 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 366 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 367 | `          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 368 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 369 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 370 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 371 | `      <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto md:pt-0 pt-12">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 372 | `        <div className="hidden md:flex sticky top-0 z-30 justify-end gap-2 px-4 py-2 bg-background/80 backdrop-blur border-b">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 373 | `          {canSwitchEnvironments && workspaces.length > 1 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 374 | `            <Button asChild variant="ghost" className="h-9 gap-2 rounded-full px-3 text-sm" title="Trocar ambiente">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 375 | `              <Link to="/ambientes">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 376 | `                <Layers3 className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 377 | `                <span>{activeWorkspace?.name ?? "Ambiente"}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 378 | `              </Link>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 379 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 380 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 381 | `          <NotificationBell />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 382 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 383 | `        {children}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 384 | `      </main>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 385 | `      <AssignmentPopup />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 386 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 387 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 388 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 389 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 390 | `function PortalNavGroup({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 391 | `  expanded,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 392 | `  active,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 393 | `  pathname,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 394 | `  canAccessDeliveries,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 395 | `  canAccessFinance,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 396 | `  onNavigate,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 397 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 398 | `  expanded: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 399 | `  active: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 400 | `  pathname: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 401 | `  canAccessDeliveries: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 402 | `  canAccessFinance: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 403 | `  onNavigate?: () => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 404 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 405 | `  const deliveriesActive = pathname.startsWith("/portal/entregas");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 406 | `  const financeActive = pathname.startsWith("/portal/financeiro");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 407 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 408 | `  if (!expanded)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 409 | `    return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 410 | `      <DropdownMenu>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 411 | `        <DropdownMenuTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 412 | `          <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 413 | `            type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 414 | `            title="Portal do Cliente"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 415 | `            className={\`flex w-full justify-center rounded-full px-2 py-2 transition ${active ? "bg-sidebar-primary/10 text-sidebar-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 416 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 417 | `            <span className={\`grid h-7 w-7 place-items-center ${active ? "rounded-full bg-sidebar-primary text-sidebar-primary-foreground" : ""}\`}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 418 | `              <PanelsTopLeft className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 419 | `            </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 420 | `          </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 421 | `        </DropdownMenuTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 422 | `        <DropdownMenuContent side="right" align="start" className="min-w-56 p-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 423 | `          {canAccessDeliveries && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 424 | `            <DropdownMenuItem asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 425 | `              <Link to="/portal/entregas" className={deliveriesActive ? "bg-sidebar-primary/10 text-sidebar-primary" : ""}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 426 | `                <CalendarCog className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 427 | `                Calendário de Entregas` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 428 | `              </Link>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 429 | `            </DropdownMenuItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 430 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 431 | `          {canAccessFinance && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 432 | `            <DropdownMenuItem asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 433 | `              <Link to="/portal/financeiro" className={financeActive ? "bg-sidebar-primary/10 text-sidebar-primary" : ""}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 434 | `                <CircleDollarSign className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 435 | `                Financeiro` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 436 | `              </Link>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 437 | `            </DropdownMenuItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 438 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 439 | `        </DropdownMenuContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 440 | `      </DropdownMenu>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 441 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 442 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 443 | `    <Collapsible defaultOpen={active} className="space-y-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 444 | `      <CollapsibleTrigger` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 445 | `        className={\`flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition ${active ? "bg-sidebar-primary/10 text-sidebar-primary font-medium" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 446 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 447 | `        <span className="grid h-7 w-7 shrink-0 place-items-center">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 448 | `          <PanelsTopLeft className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 449 | `        </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 450 | `        <span className="flex-1 text-left">Portal do Cliente</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 451 | `        <ChevronDown className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 452 | `      </CollapsibleTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 453 | `      <CollapsibleContent className="relative ml-6 space-y-1 border-l border-sidebar-primary/25 pl-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 454 | `        {canAccessDeliveries && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 455 | `          <Link` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 456 | `            to="/portal/entregas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 457 | `            onClick={onNavigate}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 458 | `            className={\`flex items-center gap-3 rounded-full px-3 py-2 text-sm transition ${deliveriesActive ? "border border-sidebar-primary bg-sidebar/45 text-sidebar-foreground font-medium shadow-sm" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 459 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 460 | `            <span className={\`grid h-7 w-7 shrink-0 place-items-center ${deliveriesActive ? "rounded-full bg-sidebar-primary text-sidebar-primary-foreground" : ""}\`}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 461 | `              <CalendarCog className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 462 | `            </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 463 | `            Calendário de Entregas` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 464 | `          </Link>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 465 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 466 | `        {canAccessFinance && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 467 | `          <Link` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 468 | `            to="/portal/financeiro"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 469 | `            onClick={onNavigate}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 470 | `            className={\`flex items-center gap-3 rounded-full px-3 py-2 text-sm transition ${financeActive ? "border border-sidebar-primary bg-sidebar/45 text-sidebar-foreground font-medium shadow-sm" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 471 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 472 | `            <span className={\`grid h-7 w-7 shrink-0 place-items-center ${financeActive ? "rounded-full bg-sidebar-primary text-sidebar-primary-foreground" : ""}\`}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 473 | `              <CircleDollarSign className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 474 | `            </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 475 | `            Financeiro` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 476 | `          </Link>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 477 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 478 | `      </CollapsibleContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 479 | `    </Collapsible>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 480 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 481 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 482 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
