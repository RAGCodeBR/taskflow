import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({ component: AuthPage });

function AuthPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const invitationFlow = new URLSearchParams(window.location.search).get("invite") === "1";

  useEffect(() => {
    if (user && !invitationFlow) navigate({ to: "/dashboard", replace: true });
  }, [user, invitationFlow, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Bem-vindo de volta!");
    } catch (err) {
      toast.error((err as Error).message);
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
      navigate({ to: "/dashboard", replace: true });
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
          {invitationFlow ? (
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
                    minLength={8}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Entrar
                </Button>
              </form>
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
