import { createFileRoute, Outlet, Navigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const { user, loading, isClient, hasPermission } = useAuth();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">
        Carregando…
      </div>
    );
  }
  if (!user) return <Navigate to="/auth" />;
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
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
