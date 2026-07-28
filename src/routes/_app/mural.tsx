import { createFileRoute } from "@tanstack/react-router";
import { MessageSquareText } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/_app/mural")({
  component: MuralPage,
});

function MuralPage() {
  return (
    <div className="space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Mural</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Comunicados e informações compartilhadas pela equipe.
        </p>
      </header>

      <Card className="grid min-h-64 place-items-center p-6 text-center">
        <div className="max-w-sm">
          <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
            <MessageSquareText className="h-5 w-5" />
          </div>
          <h2 className="font-semibold">Nenhum comunicado publicado</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Os comunicados da equipe aparecerão neste espaço.
          </p>
        </div>
      </Card>
    </div>
  );
}
