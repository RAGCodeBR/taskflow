import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { ArrowRight, Megaphone, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/_app/ambientes")({ component: Environments });

function Environments() {
  const { workspaces, activeWorkspace, setActiveWorkspace } = useAuth();
  const [switchingId, setSwitchingId] = useState<string | null>(null);

  if (!workspaces.length) {
    return <Navigate to="/dashboard" replace />;
  }

  const switchWorkspace = async (workspaceId: string) => {
    if (workspaceId === activeWorkspace?.id) return;
    setSwitchingId(workspaceId);
    try {
      await setActiveWorkspace(workspaceId);
    } catch (error) {
      // PostgREST errors are plain objects, not instances of Error. Show the
      // database message so an access or migration problem is actionable.
      const message =
        error instanceof Error
          ? error.message
          : typeof error === "object" && error && "message" in error && typeof error.message === "string"
            ? error.message
            : "Não foi possível trocar o ambiente.";
      toast.error(message);
    } finally {
      setSwitchingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      <header className="text-center">
        <Badge variant="secondary">Ambientes</Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Escolha onde trabalhar</h1>
        <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
          Cada ambiente usa o mesmo TaskFlow, mas mantém usuários, permissões e dados separados.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        {workspaces.map((workspace) => {
          const marketing = workspace.slug === "marketing";
          const current = workspace.id === activeWorkspace?.id;
          const Icon = marketing ? Megaphone : ShieldCheck;
          return (
            <Card key={workspace.id} className={`p-6 ${current ? "border-primary/45 bg-primary/[0.025] shadow-md" : ""}`}>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <div className="mt-5 flex items-center gap-2">
                <h2 className="text-2xl font-bold">{workspace.name}</h2>
                {current && <Badge>Em uso</Badge>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {marketing
                  ? "Marketing usa a mesma carteira de clientes, mas começa sem tarefas ou registros da Consultoria."
                  : "Todos os registros já existentes do TaskFlow permanecem neste ambiente."}
              </p>
              <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
                {current ? "Ambiente ativo" : "Acesso autorizado"}
                {current ? (
                  <Button asChild variant="outline" className="rounded-full">
                    <Link to="/dashboard">Abrir painel <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                ) : (
                  <Button className="rounded-full" disabled={switchingId === workspace.id} onClick={() => void switchWorkspace(workspace.id)}>
                    {switchingId === workspace.id ? "Entrando…" : "Acessar"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </section>

      <p className="text-center text-xs text-muted-foreground">
        A mudança de ambiente recarrega o painel para não manter dados do outro ambiente em tela.
      </p>
    </div>
  );
}
