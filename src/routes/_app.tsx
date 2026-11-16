import { useEffect } from "react";
import { createFileRoute, Outlet, Navigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { AppShell } from "@/components/AppShell";
import { decideRouteAccess } from "@/lib/route-access";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const {
    user,
    loading,
    isAdmin,
    isClient,
    permissions,
    hasPermission,
    isWorkspaceTransitioning,
    finishWorkspaceTransition,
  } = useAuth();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const taskLinkId = useRouterState({ select: (state) =>
    state.location.pathname === "/tasks/list" ? state.location.search.task : undefined,
  });
  // Equipe interna: a permissão que esconde o item do menu também vale para o
  // endereço aberto diretamente. Clientes seguem a regra do portal, abaixo.
  const staffAccess = decideRouteAccess(pathname, { isAdmin, permissions });
  const staffDenied = !loading && !!user && !isClient && !staffAccess.allowed;
  useEffect(() => {
    // A troca de ambiente termina no Dashboard. Se ele for negado, é este
    // redirecionamento que precisa encerrar a tela de carregamento.
    if (staffDenied && isWorkspaceTransitioning) finishWorkspaceTransition();
  }, [staffDenied, isWorkspaceTransitioning, finishWorkspaceTransition]);
  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">
        Carregando…
      </div>
    );
  }
  // The layout can render once more while the lazy auth route loads. Do not
  // issue a second redirect then: its pathname no longer contains the task,
  // which would replace /auth?task=... with /auth and lose the shared link.
  if (!user) return pathname === "/auth" ? null : <Navigate to="/auth" search={typeof taskLinkId === "string" ? { task: taskLinkId } : {}} replace />;
  const clientRoutePermissions: Array<[string, string]> = [
    ["/dashboard", "dashboard"],
    ["/tasks", "tasks"],
    ["/notes", "notes"],
    ["/import-ata", "import_ata"],
    ["/clients", "clients"],
    ["/reports", "reports"],
    ["/trash", "trash"],
    ["/settings", "settings"],
    ["/agenda", "agenda"],
  ];
  const clientCanAccessCurrentRoute =
    pathname.startsWith("/mural") ||
    (pathname.startsWith("/portal/entregas") &&
      (hasPermission("portal_entregas") || hasPermission("portal"))) ||
    (pathname.startsWith("/portal/financeiro") &&
      (hasPermission("portal_financeiro") || hasPermission("portal"))) ||
    clientRoutePermissions.some(
      ([path, permission]) => pathname.startsWith(path) && hasPermission(permission),
    );
  if (isClient && !clientCanAccessCurrentRoute) {
    return (
      <Navigate
        to={hasPermission("portal_financeiro") ? "/portal/financeiro" : "/portal/entregas"}
        replace
      />
    );
  }
  if (!isClient && !staffAccess.allowed) {
    if (staffAccess.redirectTo) return <Navigate to={staffAccess.redirectTo} replace />;
    return (
      <AppShell>
        <div className="grid min-h-[60vh] place-items-center p-6 text-center">
          <div className="max-w-sm space-y-2">
            <h1 className="text-lg font-semibold">Você não tem acesso a esta página</h1>
            <p className="text-sm text-muted-foreground">
              Peça a um administrador para liberar o acesso em Usuários.
            </p>
          </div>
        </div>
      </AppShell>
    );
  }
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
