import { createFileRoute } from "@tanstack/react-router";
import { resolveWhatsAppPilotConfig } from "@/lib/whatsapp-pilot-config";
import { useCallback, useEffect, useRef, useState } from "react";
import { LoaderCircle, RotateCcw } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { canUseLocalWhatsApp } from "@/lib/whatsapp-local-access";
import { Button } from "@/components/ui/button";
import type { AuthChangeEvent } from "@supabase/supabase-js";
import { whatsappSection } from "@/lib/whatsapp-local-sections";

export const Route = createFileRoute("/_app/whatsapp")({
  validateSearch: (search: Record<string, unknown>) => ({ section: whatsappSection(search.section).key }),
  component: WhatsAppLocalPage,
});
const BRIDGE = resolveWhatsAppPilotConfig(import.meta.env).origin;

function WhatsAppLocalPage() {
  const { section } = Route.useSearch();
  const selectedSection = whatsappSection(section);
  const { user, isAdmin, loading } = useAuth();
  const allowed = canUseLocalWhatsApp(user, isAdmin,
    resolveWhatsAppPilotConfig(import.meta.env).enabled);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const frame = useRef<HTMLIFrameElement>(null);
  const syncTheme = useCallback(() => {
    const style = getComputedStyle(document.documentElement);
    const keys = ['background','foreground','card','card-foreground','popover','popover-foreground','primary','primary-foreground','secondary','secondary-foreground','muted','muted-foreground','accent','accent-foreground','border','input','ring'];
    frame.current?.contentWindow?.postMessage({ type: 'taskflow-whatsapp-theme',
      dark: document.documentElement.classList.contains('dark'),
      font: getComputedStyle(document.body).fontFamily,
      values: Object.fromEntries(keys.map(key => ['--'+key, style.getPropertyValue('--'+key).trim()])),
    }, BRIDGE);
  }, []);
  useEffect(() => {
    if (!allowed || !ready) return;
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class','style'] });
    const receive = (event: MessageEvent) => {
      if (event.origin === BRIDGE && event.source === frame.current?.contentWindow && event.data?.type === 'taskflow-whatsapp-theme-ready') syncTheme();
    };
    window.addEventListener('message', receive);
    return () => { observer.disconnect(); window.removeEventListener('message', receive); };
  }, [allowed, ready, syncTheme]);
  useEffect(() => {
    if (!allowed) return;
    let active = true;
    const controller = new AbortController();
    async function connect() {
      try {
        const { data } = await supabase.auth.getSession();
        if (!data.session?.access_token) throw new Error("Entre novamente no TaskFlow para abrir o WhatsApp.");
        const response = await fetch(`${BRIDGE}/__taskflow/auth`, {
          method: "POST", credentials: "include", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken: data.session.access_token }), signal: controller.signal,
        });
        if (!response.ok) throw new Error(response.status === 403
          ? "Este chat está reservado ao administrador autorizado."
          : "Não foi possível validar sua conexão. Tente novamente.");
        if (active) { setReady(true); setError(""); }
      } catch (failure) {
        if (active) {
          setReady(false);
          setError(failure instanceof TypeError
            ? "O serviço do WhatsApp está indisponível. Tente novamente em instantes."
            : (failure as Error).message);
        }
      }
    }
    const revoke = () => {
      void fetch(`${BRIDGE}/__taskflow/auth`, { method: "DELETE", credentials: "include", keepalive: true }).catch(() => {});
    };
    void connect();
    const renew = setInterval(() => void connect(), 5 * 60_000);
    const { data: listener } = supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
      if (event === "SIGNED_OUT") { setReady(false); revoke(); }
    });
    return () => { active = false; controller.abort(); clearInterval(renew); listener.subscription.unsubscribe(); revoke(); };
  }, [allowed, user?.id, attempt]);

  if (loading) return <div className="grid h-full place-items-center"><LoaderCircle className="animate-spin" /></div>;
  if (!allowed) return <div className="grid h-full place-items-center p-6"><p role="alert">Acesso não disponível para esta conta.</p></div>;
  return <section className="flex h-full min-h-0 flex-col" aria-label="WhatsApp privado">
    {error ? <div className="grid flex-1 place-content-center gap-4 p-6 text-center"><p role="alert">{error}</p><Button variant="outline" onClick={() => { setReady(false); setError(""); setAttempt(value => value + 1); }}><RotateCcw className="mr-2 h-4 w-4" />Tentar novamente</Button></div>
      : ready ? <iframe ref={frame} onLoad={syncTheme} title="Conversas e configurações do WhatsApp" src={`${BRIDGE}${selectedSection.path}`}
        className="min-h-0 w-full flex-1 border-0" allow="clipboard-write; fullscreen" referrerPolicy="no-referrer" />
      : <div className="flex flex-1 items-center justify-center gap-2 text-sm text-muted-foreground"><LoaderCircle className="h-4 w-4 animate-spin" />Validando seu acesso ao chat…</div>}
  </section>;
}
