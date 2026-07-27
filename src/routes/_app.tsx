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
  ];
  const clientCanAccessCurrentRoute =
    pathname.startsWith("/portal/") ||
    clientRoutePermissions.some(
      ([path, permission]) => pathname.startsWith(path) && hasPermission(permission),
    );
  if (isClient && !clientCanAccessCurrentRoute) return <Navigate to="/portal/entregas" replace />;
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
