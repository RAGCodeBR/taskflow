import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/")({
  component: HomeRedirect,
});

function HomeRedirect() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Carregando…</div>;
  }

  return <Navigate to={user ? "/mural" : "/auth"} replace />;
}
