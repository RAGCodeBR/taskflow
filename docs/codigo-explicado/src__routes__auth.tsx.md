# src/routes/auth.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createFileRoute, useNavigate } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useEffect, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { motion } from "motion/react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import { Label } from "@/components/ui/label";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `import { Card } from "@/components/ui/card";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 8 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 9 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `import { CheckCircle2, Loader2 } from "lucide-react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 13 | `export const Route = createFileRoute("/auth")({ component: AuthPage });` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 14 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 15 | `function AuthPage() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 16 | `  const navigate = useNavigate();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 17 | `  const { user } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 18 | `  const [email, setEmail] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 19 | `  const [password, setPassword] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 20 | `  const [passwordConfirmation, setPasswordConfirmation] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 21 | `  const [loading, setLoading] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 22 | `  const invitationFlow = new URLSearchParams(window.location.search).get("invite") === "1";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 23 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 24 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 25 | `    if (user && !invitationFlow) navigate({ to: "/mural", replace: true });` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 26 | `  }, [user, invitationFlow, navigate]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `  const onSubmit = async (e: React.FormEvent) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 29 | `    e.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `    setLoading(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 32 | `      const { error } = await supabase.auth.signInWithPassword({ email, password });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 33 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 34 | `      toast.success("Bem-vindo de volta!");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `    } catch (err) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `      toast.error((err as Error).message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `      setLoading(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 40 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 41 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 42 | `  const setInvitationPassword = async (e: React.FormEvent) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 43 | `    e.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `    if (password.length < 8) return toast.error("A senha deve ter pelo menos 8 caracteres.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 45 | `    if (password !== passwordConfirmation) return toast.error("As senhas não coincidem.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 46 | `    setLoading(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 48 | `      const { error } = await supabase.auth.updateUser({ password });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 49 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 50 | `      toast.success("Senha definida com sucesso.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `      navigate({ to: "/mural", replace: true });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `    } catch (err) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `      toast.error((err as Error).message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 55 | `      setLoading(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 56 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 57 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 58 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 59 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 60 | `    <div className="grid min-h-screen lg:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 61 | `      <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 62 | `        className="relative hidden bg-sidebar text-sidebar-foreground lg:flex lg:flex-col lg:justify-between lg:p-12"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 63 | `        style={{ background: "var(--gradient-sidebar)" }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `        <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 66 | `          <div className="grid h-10 w-10 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground font-bold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 67 | `            T` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 69 | `          <span className="text-xl font-semibold tracking-tight">TaskFlow</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 70 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 71 | `        <motion.div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 72 | `          initial={{ opacity: 0, y: 20 }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `          animate={{ opacity: 1, y: 0 }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `          transition={{ duration: 0.6 }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 75 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `          <h1 className="text-4xl font-bold leading-tight">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 77 | `            Organize o trabalho da sua equipe.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `            <br />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 79 | `            Tudo em um só lugar.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `          </h1>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 81 | `          <p className="mt-4 max-w-md text-sidebar-foreground/70">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 82 | `            Kanban, Lista e Calendário. Filtros inteligentes por prazo, cliente e responsável.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 84 | `          <div className="mt-8 space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 85 | `            {[` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `              "Kanban totalmente editável com drag and drop",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `              "Filtros por prazo, cliente e responsável",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `              "Dashboard com gráficos de produtividade",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `              "Anexos, comentários e subtarefas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `            ].map((text) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 91 | `              <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 92 | `                key={text}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 93 | `                className="flex items-center gap-2 text-sm text-sidebar-foreground/85"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 94 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 95 | `                <CheckCircle2 className="h-4 w-4 text-sidebar-primary" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 96 | `                {text}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 97 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 98 | `            ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 100 | `        </motion.div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 101 | `        <p className="text-xs text-sidebar-foreground/50">© {new Date().getFullYear()} TaskFlow</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 102 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 103 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 104 | `      <div className="flex items-center justify-center p-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 105 | `        <Card className="w-full max-w-md p-8 shadow-[var(--shadow-elegant)]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 106 | `          <h2 className="text-2xl font-bold">{invitationFlow ? "Definir senha" : "Entrar"}</h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 107 | `          <p className="mt-1 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 108 | `            {invitationFlow` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `              ? "Crie sua senha para ativar o acesso convidado."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `              : "Acesse seu painel de tarefas"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 112 | `          {invitationFlow ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `            <form onSubmit={setInvitationPassword} className="mt-6 space-y-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 114 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 115 | `                <Label htmlFor="password">Nova senha</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 116 | `                <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 117 | `                  id="password"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `                  type="password"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `                  autoComplete="new-password"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 120 | `                  value={password}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `                  onChange={(e) => setPassword(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 122 | `                  required` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `                  minLength={8}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 126 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 127 | `                <Label htmlFor="passwordConfirmation">Confirme a senha</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 128 | `                <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 129 | `                  id="passwordConfirmation"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 130 | `                  type="password"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `                  autoComplete="new-password"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `                  value={passwordConfirmation}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 133 | `                  onChange={(e) => setPasswordConfirmation(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 134 | `                  required` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 135 | `                  minLength={8}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 136 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 138 | `              <Button type="submit" className="w-full" disabled={loading || !user}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 139 | `                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 140 | `                {user ? "Ativar acesso" : "Validando convite…"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 141 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 142 | `            </form>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 143 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 144 | `            <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 145 | `              <form onSubmit={onSubmit} className="mt-6 space-y-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 146 | `                <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 147 | `                  <Label htmlFor="email">E-mail</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 148 | `                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 149 | `                    id="email"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 150 | `                    type="email"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 151 | `                    autoComplete="email"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `                    value={email}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 153 | `                    onChange={(e) => setEmail(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 154 | `                    required` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 155 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 157 | `                <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 158 | `                  <Label htmlFor="password">Senha</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 159 | `                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 160 | `                    id="password"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `                    type="password"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `                    autoComplete="current-password"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 163 | `                    value={password}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 164 | `                    onChange={(e) => setPassword(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 165 | `                    required` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 166 | `                    minLength={8}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 167 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 168 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 169 | `                <Button type="submit" className="w-full" disabled={loading}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 170 | `                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Entrar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 171 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 172 | `              </form>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 173 | `              <p className="mt-4 text-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 174 | `                Não possui acesso? Solicite um convite ao administrador.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 175 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 176 | `            </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 177 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `        </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 179 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 180 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 181 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 182 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 183 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
