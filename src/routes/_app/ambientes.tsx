import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
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
  const navigate = useNavigate();
  const [switchingId, setSwitchingId] = useState<string | null>(null);

  if (!workspaces.length) {
    return <Navigate to="/dashboard" replace />;
  }

  const switchWorkspace = async (workspaceId: string) => {
    if (workspaceId === activeWorkspace?.id) return;
    setSwitchingId(workspaceId);
    try {
      await setActiveWorkspace(workspaceId);
      await navigate({ to: "/dashboard" });
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
    <div className="mx-auto max-w-5xl space-y-3 px-4 py-4 md:space-y-8 md:p-6">
      <header className="text-center">
        <Badge variant="secondary">Ambientes</Badge>
        <h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight md:mt-3 md:text-3xl">Escolha onde trabalhar</h1>
        <p className="mx-auto mt-1 max-w-2xl text-sm leading-snug text-muted-foreground md:mt-2 md:text-base md:leading-normal">
          Cada ambiente usa o mesmo TaskFlow, mas mantém usuários, permissões e dados separados.
        </p>
      </header>

      <section className="grid gap-3 md:grid-cols-2 md:gap-5">
        {workspaces.map((workspace) => {
          const marketing = workspace.slug === "marketing";
          const current = workspace.id === activeWorkspace?.id;
          const Icon = marketing ? Megaphone : ShieldCheck;
          return (
            <Card key={workspace.id} className={`p-4 md:p-6 ${current ? "border-primary/45 bg-primary/[0.025] shadow-md" : ""}`}>
              <div className="flex items-center gap-3 md:block">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground md:h-12 md:w-12">
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </span>
                <div className="flex min-w-0 flex-wrap items-center gap-2 md:mt-5">
                  <h2 className="text-xl font-bold md:text-2xl">{workspace.name}</h2>
                  {current && <Badge>Em uso</Badge>}
                </div>
              </div>
              <p className="mt-2 text-sm leading-snug text-muted-foreground md:leading-normal">
                {marketing
                  ? "Marketing usa a mesma carteira de clientes, mas começa sem tarefas ou registros da Consultoria."
                  : "Todos os registros já existentes do TaskFlow permanecem neste ambiente."}
              </p>
              <div className="mt-3 flex items-center justify-between gap-2 border-t pt-3 text-xs text-muted-foreground md:mt-6 md:pt-4 md:text-sm">
                {current ? "Ambiente ativo" : "Acesso autorizado"}
                {current ? (
                  <Button asChild variant="outline" className="h-9 shrink-0 rounded-full px-3 md:px-4">
                    <Link to="/dashboard">Abrir painel <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                ) : (
                  <Button className="h-9 shrink-0 rounded-full px-3 md:px-4" disabled={switchingId === workspace.id} onClick={() => void switchWorkspace(workspace.id)}>
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
        A mudança de ambiente atualiza o painel sem manter dados do outro ambiente em tela.
      </p>
    </div>
  );
}
