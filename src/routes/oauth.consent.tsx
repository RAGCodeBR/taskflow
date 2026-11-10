import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, ShieldCheck } from "lucide-react";

// Tela de consentimento do OAuth 2.1 do Supabase (Authentication > OAuth Server > Authorization Path = /oauth/consent).
// Usada pelo conector do Claude "TaskFlow Consultoria". Só o titular autorizado pode aprovar.
const ALLOWED_EMAILS = ["reinangrupoahouse@gmail.com"];
export const OAUTH_RETURN_KEY = "taskflow_oauth_return";

export const Route = createFileRoute("/oauth/consent")({ component: OAuthConsentPage });

type Details = { authorization_id?: string; redirect_url?: string; redirect_uri?: string; scope?: string; client?: { name?: string } };

function OAuthConsentPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const authorizationId = new URLSearchParams(window.location.search).get("authorization_id") ?? "";
  const [details, setDetails] = useState<Details | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const allowed = !!user?.email && ALLOWED_EMAILS.includes(user.email.toLowerCase());

  useEffect(() => {
    if (loading) return;
    if (!authorizationId) { setError("Pedido de autorização inválido."); return; }
    if (!user) {
      sessionStorage.setItem(OAUTH_RETURN_KEY, window.location.pathname + window.location.search);
      navigate({ to: "/auth", replace: true });
      return;
    }
    if (!allowed) { setError("Esta conexão é exclusiva do administrador autorizado."); return; }
    (async () => {
      const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(authorizationId);
      if (error) { setError(error.message); return; }
      const d = data as Details;
      if (!d?.authorization_id && d?.redirect_url) { window.location.assign(d.redirect_url); return; }
      setDetails(d);
    })();
  }, [loading, user, allowed, authorizationId, navigate]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    const { data, error } = approve
      ? await supabase.auth.oauth.approveAuthorization(authorizationId)
      : await supabase.auth.oauth.denyAuthorization(authorizationId);
    if (error) { setError(error.message); setBusy(false); return; }
    window.location.assign((data as { redirect_url: string }).redirect_url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-md p-6 space-y-4">
        <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /><h1 className="text-lg font-semibold">Autorizar conexão</h1></div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {!error && !details && <p className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Carregando…</p>}
        {!error && details && (
          <>
            <p className="text-sm">
              <b>{details.client?.name ?? "Um aplicativo"}</b> quer acessar o TaskFlow da consultoria em seu nome
              para buscar clientes e anexar atas nas anotações deles.
            </p>
            <p className="text-xs text-muted-foreground break-all">Conta: {user?.email}<br />Retorno: {details.redirect_uri}</p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" disabled={busy} onClick={() => decide(false)}>Negar</Button>
              <Button disabled={busy} onClick={() => decide(true)}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Autorizar"}</Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
