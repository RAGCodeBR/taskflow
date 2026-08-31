import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  CheckSquare,
  FileText,
  LayoutDashboard,
  Megaphone,
  MessageSquareText,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/_app/ambientes")({
  component: EnvironmentsPreview,
});

const marketingMenu = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Minhas tarefas", icon: CheckSquare },
  { label: "Clientes", icon: Building2 },
  { label: "Relatórios", icon: BarChart3 },
  { label: "Agenda", icon: CalendarDays },
  { label: "Mural", icon: MessageSquareText },
  { label: "Solicitações", icon: FileText },
  { label: "Usuários", icon: Users },
];

function EnvironmentsPreview() {
  const { isAdmin } = useAuth();
  const [area, setArea] = useState<"chooser" | "marketing">("chooser");

  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  if (area === "marketing") {
    return (
      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                <Megaphone className="h-4 w-4" />
              </span>
              Ambiente ativo
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Marketing</h1>
            <p className="mt-1 text-muted-foreground">
              Um novo TaskFlow, com a mesma estrutura da Consultoria e dados iniciando do zero.
            </p>
          </div>
          <Button variant="outline" className="rounded-full" onClick={() => setArea("chooser")}>
            Alternar ambiente
          </Button>
        </header>

        <nav className="flex flex-wrap gap-2 border-y py-4" aria-label="Navegação do Marketing">
          {marketingMenu.map(({ label, icon: Icon }, index) => (
            <button
              key={label}
              type="button"
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition ${
                index === 0
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Minhas tarefas", CheckSquare],
            ["Clientes", Building2],
            ["Agenda", CalendarDays],
            ["Solicitações", FileText],
          ].map(([label, Icon]) => {
            const MetricIcon = Icon as typeof CheckSquare;
            return (
              <Card key={label as string} className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{label as string}</p>
                    <p className="mt-1 text-3xl font-bold">0</p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
                    <MetricIcon className="h-5 w-5" />
                  </span>
                </div>
              </Card>
            );
          })}
        </section>

        <Card className="border-dashed p-8 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
            <Megaphone className="h-5 w-5" />
          </span>
          <h2 className="mt-4 text-lg font-semibold">O Marketing começa limpo</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Tarefas, clientes, relatórios, agenda, mural e permissões serão independentes da
            Consultoria. Esta tela é uma prévia visual: nenhum dado atual foi movido ou alterado.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      <header className="text-center">
        <Badge variant="secondary">Administração</Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Escolha um ambiente</h1>
        <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
          Cada ambiente tem o mesmo TaskFlow, com seus próprios usuários, permissões e dados.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        <Card className="p-6">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <h2 className="mt-5 text-2xl font-bold">Consultoria</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Ambiente atual do TaskFlow. Todos os registros existentes permanecem aqui.
          </p>
          <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
            Dashboard, tarefas, clientes, relatórios e mais
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/dashboard">
                Acessar <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>

        <Card className="border-primary/35 bg-primary/[0.025] p-6 shadow-md">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
            <Megaphone className="h-6 w-6" />
          </span>
          <div className="mt-5 flex items-center gap-2">
            <h2 className="text-2xl font-bold">Marketing</h2>
            <Badge>Prévia</Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Mesmo painel e mesmas ferramentas, iniciando sem tarefas, clientes ou usuários da
            Consultoria.
          </p>
          <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
            Estrutura visual do novo ambiente
            <Button className="rounded-full" onClick={() => setArea("marketing")}>
              Ver painel <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </section>

      <p className="text-center text-xs text-muted-foreground">
        Prévia segura: a separação real de dados e permissões será criada somente na próxima etapa.
      </p>
    </div>
  );
}
