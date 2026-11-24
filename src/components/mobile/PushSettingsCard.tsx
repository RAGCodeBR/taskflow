import { useEffect, useState } from "react";
import { Bell, BellOff, Share, SquarePlus } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  currentPushSubscription,
  pushSupport,
  sendTestPush,
  subscribeToPush,
  unsubscribeFromPush,
} from "@/lib/push-subscription";

type State = "loading" | "install-first" | "unsupported" | "denied" | "off" | "on";

/** Cartão "Notificações no celular" em Configurações. Renderizado só no celular. */
export function PushSettingsCard() {
  const [state, setState] = useState<State>("loading");
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    const support = pushSupport();
    if (support !== "ok") return setState(support);
    if (Notification.permission === "denied") return setState("denied");
    setState((await currentPushSubscription()) ? "on" : "off");
  };

  useEffect(() => {
    void refresh();
  }, []);

  const run = async (action: () => Promise<void>, success: string) => {
    setBusy(true);
    try {
      await action();
      toast.success(success);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível concluir.");
    } finally {
      setBusy(false);
      void refresh();
    }
  };

  return (
    <Card className="space-y-3 p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
          <Bell className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h2 className="font-semibold">Notificações no celular</h2>
          <p className="text-sm text-muted-foreground">
            Aviso quando te atribuírem uma tarefa e quando um prazo vence hoje ou amanhã.
          </p>
        </div>
      </div>

      {state === "install-first" && (
        <ol className="space-y-2 rounded-lg bg-muted/50 p-3 text-sm">
          <li className="flex items-center gap-2">
            1. No Safari, toque em <Share className="h-4 w-4" aria-label="Compartilhar" />{" "}
            Compartilhar
          </li>
          <li className="flex items-center gap-2">
            2. Escolha <SquarePlus className="h-4 w-4" aria-hidden="true" /> Adicionar à Tela de
            Início
          </li>
          <li>3. Abra o TaskFlow pelo ícone e volte aqui para ativar.</li>
        </ol>
      )}
      {state === "unsupported" && (
        <p className="text-sm text-muted-foreground">
          Este navegador não aceita notificações. No iPhone é preciso iOS 16.4 ou mais recente.
        </p>
      )}
      {state === "denied" && (
        <p className="text-sm text-muted-foreground">
          As notificações foram bloqueadas. Libere em Ajustes › Notificações › TaskFlow e volte
          aqui.
        </p>
      )}
      {state === "off" && (
        <Button
          className="h-11 w-full"
          disabled={busy}
          onClick={() => void run(subscribeToPush, "Notificações ativadas neste aparelho.")}
        >
          <Bell className="mr-2 h-4 w-4" /> Ativar notificações
        </Button>
      )}
      {state === "on" && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-11 flex-1"
            disabled={busy}
            onClick={() => void run(sendTestPush, "Teste enviado.")}
          >
            Enviar teste
          </Button>
          <Button
            variant="ghost"
            className="h-11 flex-1"
            disabled={busy}
            onClick={() =>
              void run(unsubscribeFromPush, "Notificações desativadas neste aparelho.")
            }
          >
            <BellOff className="mr-2 h-4 w-4" /> Desativar
          </Button>
        </div>
      )}
    </Card>
  );
}
