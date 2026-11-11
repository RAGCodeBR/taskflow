import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useSharedTaskSession } from "@/hooks/use-shared-task-session";
import { loginErrorMessage } from "@/lib/login-error";

export const Route = createFileRoute("/auth")({ component: AuthPage });

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading: restoringSession } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const redirectingRef = useRef(false);
  const search = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const invitationFlow = search.get("invite") === "1";
  const sharedTaskId = search.get("task");
  let oauthReturn: string | null = null;
  try { oauthReturn = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("taskflow_oauth_return") : null; } catch { /* Storage can be blocked. */ }
  const checkingSharedSession = useSharedTaskSession({
    taskId: sharedTaskId,
    ready: !restoringSession,
    signedIn: !!user,
    skip: invitationFlow || !!oauthReturn || search.get("session_checked") === "1",
  });

  useEffect(() => {
    if (!user) { redirectingRef.current = false; return; }
    if (!restoringSession && !invitationFlow && !redirectingRef.current) {
      // Auth events can repeat while a lazy route loads. Keep the first task or
      // OAuth destination instead of replacing it with a second mural redirect.
      redirectingRef.current = true;
      if (oauthReturn?.startsWith("/oauth/consent?")) {
        try { sessionStorage.removeItem("taskflow_oauth_return"); } catch { /* Continue with consent. */ }
        window.location.assign(oauthReturn);
        return;
      }
      if (sharedTaskId) navigate({ to: "/tasks/list", search: { task: sharedTaskId, mine: undefined }, replace: true });
      else navigate({ to: "/mural", replace: true });
    }
  }, [user, restoringSession, invitationFlow, sharedTaskId, oauthReturn, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;
      toast.success("Bem-vindo de volta!");
    } catch (err) {
      toast.error(loginErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const setInvitationPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error("A senha deve ter pelo menos 8 caracteres.");
    if (password !== passwordConfirmation) return toast.error("As senhas não coincidem.");
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Senha definida com sucesso.");
      navigate({ to: "/mural", replace: true });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div
        className="relative hidden bg-sidebar text-sidebar-foreground lg:flex lg:flex-col lg:justify-between lg:p-12"
        style={{ background: "var(--gradient-sidebar)" }}
      >
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground font-bold">
            T
          </div>
          <span className="text-xl font-semibold tracking-tight">TaskFlow</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold leading-tight">
            Organize o trabalho da sua equipe.
            <br />
            Tudo em um só lugar.
          </h1>
          <p className="mt-4 max-w-md text-sidebar-foreground/70">
            Kanban, Lista e Calendário. Filtros inteligentes por prazo, cliente e responsável.
          </p>
          <div className="mt-8 space-y-3">
            {[
              "Kanban totalmente editável com drag and drop",
              "Filtros por prazo, cliente e responsável",
              "Dashboard com gráficos de produtividade",
              "Anexos, comentários e subtarefas",
            ].map((text) => (
              <div
                key={text}
                className="flex items-center gap-2 text-sm text-sidebar-foreground/85"
              >
                <CheckCircle2 className="h-4 w-4 text-sidebar-primary" />
                {text}
              </div>
            ))}
          </div>
        </motion.div>
        <p className="text-xs text-sidebar-foreground/50">© {new Date().getFullYear()} TaskFlow</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8 shadow-[var(--shadow-elegant)]">
          <h2 className="text-2xl font-bold">{invitationFlow ? "Definir senha" : "Entrar"}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {invitationFlow
              ? "Crie sua senha para ativar o acesso convidado."
              : "Acesse seu painel de tarefas"}
          </p>
          {!invitationFlow && (restoringSession || checkingSharedSession || user) ? (
            <p role="status" className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Verificando sua sessão…</p>
          ) : invitationFlow ? (
            <form onSubmit={setInvitationPassword} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nova senha</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passwordConfirmation">Confirme a senha</Label>
                <Input
                  id="passwordConfirmation"
                  type="password"
                  autoComplete="new-password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading || !user}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {user ? "Ativar acesso" : "Validando convite…"}
              </Button>
            </form>
          ) : (
            <>
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Entrar
                </Button>
              </form>
              {sharedTaskId && <p className="mt-4 text-sm text-muted-foreground">Após entrar, você voltará à tarefa do link. Se abriu pelo WhatsApp, use o mesmo navegador em que já acessa o TaskFlow.</p>}
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Não possui acesso? Solicite um convite ao administrador.
              </p>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
