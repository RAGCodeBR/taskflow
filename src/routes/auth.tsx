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

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const googleAuthEnabled = import.meta.env.VITE_ENABLE_GOOGLE_AUTH === "true";

  useEffect(() => {
    if (user) navigate({ to: "/dashboard", replace: true });
  }, [user, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            // New accounts are always provisioned as collaborators by the
            // database trigger. Keeping the source here makes the signup
            // intent explicit without allowing the browser to choose a role.
            data: { full_name: name, signup_source: "login" },
          },
        });
        if (error) throw error;
        toast.success("Conta criada! Verifique seu e-mail se necessário.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vindo de volta!");
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = async () => {
    // Google OAuth is intentionally disabled in the clean copy until the new
    // Supabase project has its own OAuth client configured. Email/password works now.
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) toast.error("Falha ao entrar com Google");
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
            Personalize cores e crie clientes como pastas de atividades.
          </p>
          <div className="mt-8 space-y-3">
            {[
              "Kanban totalmente editável com drag and drop",
              "Filtros: hoje, amanhã, semana, mês, atrasadas",
              "Dashboard com gráficos de produtividade",
              "Anexos, comentários e subtarefas",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2 text-sm text-sidebar-foreground/85">
                <CheckCircle2 className="h-4 w-4 text-sidebar-primary" />
                {t}
              </div>
            ))}
          </div>
        </motion.div>
        <p className="text-xs text-sidebar-foreground/50">© {new Date().getFullYear()} TaskFlow</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8 shadow-[var(--shadow-elegant)]">
          <h2 className="text-2xl font-bold">{mode === "signin" ? "Entrar" : "Criar conta"}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin" ? "Acesse seu painel de tarefas" : "Comece a organizar sua equipe"}
          </p>

          {googleAuthEnabled && (
            <>
              <Button
                type="button"
                variant="outline"
                className="mt-6 w-full"
                onClick={signInGoogle}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continuar com Google
              </Button>
              <div className="relative my-6 text-center text-xs text-muted-foreground">
                <span className="bg-card px-2 relative z-10">ou</span>
                <div className="absolute left-0 right-0 top-1/2 -z-0 border-t" />
              </div>
            </>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            )}
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
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === "signin" ? "Entrar" : "Criar conta"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "Não tem conta?" : "Já tem conta?"}{" "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="font-medium text-primary hover:underline"
            >
              {mode === "signin" ? "Cadastre-se" : "Entrar"}
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
}
