# src/components/NotificationBell.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { useEffect, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { Bell, Check, Trash2 } from "lucide-react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { useNavigate } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { formatDistanceToNow } from "date-fns";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import { ptBR } from "date-fns/locale";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 8 | `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 9 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 12 | `interface Notification {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 13 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  user_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  task_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  type: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  body: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  is_read: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 22 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 23 | `const MURAL_NOTIFICATION_TYPES = new Set(["mural_post", "mural_reaction"]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 24 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 25 | `export function NotificationBell() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 26 | `  const { user } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 27 | `  const navigate = useNavigate();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 28 | `  const qc = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 29 | `  const [items, setItems] = useState<Notification[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 30 | `  const [open, setOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 31 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 32 | `  const refreshAssignedWork = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 33 | `    qc.invalidateQueries({ queryKey: ["tasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `    qc.invalidateQueries({ queryKey: ["subtasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 36 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 37 | `  const load = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 38 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 39 | `    const { data } = await (supabase.from("notifications") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 40 | `      .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `      .eq("user_id", user.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `      .order("created_at", { ascending: false })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `      .limit(30);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `    // Mural activity has its own per-user badge in the navigation. Keeping it` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 45 | `    // out of the global bell avoids two independent unread queues for the same event.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 46 | `    const next = ((data ?? []) as Notification[]).filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 47 | `      (notification) => !MURAL_NOTIFICATION_TYPES.has(notification.type),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 48 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 49 | `    if (next.some((n) => n.type === "assignment" || n.type === "subtask_assignment" || n.type === "collaborator_assignment")) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 50 | `      refreshAssignedWork();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 52 | `    setItems(next);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 54 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 55 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 56 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 57 | `    load();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 58 | `    const poll = window.setInterval(() => void load(), 15_000);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 59 | `    const channel = supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 60 | `      .channel(\`notifications-${user.id}-${Math.random().toString(36).slice(2)}\`)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `      .on(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `        "postgres_changes",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 63 | `        { event: "*", schema: "public", table: "notifications", filter: \`user_id=eq.${user.id}\` },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `        (payload: any) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 65 | `          const type = payload.new?.type ?? payload.old?.type;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 66 | `          if (type === "assignment" || type === "subtask_assignment" || type === "collaborator_assignment") refreshAssignedWork();` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 67 | `          void load();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `        },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 69 | `      )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `      .subscribe();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 72 | `      window.clearInterval(poll);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `      supabase.removeChannel(channel);` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 74 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 75 | `    // eslint-disable-next-line react-hooks/exhaustive-deps` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 76 | `  }, [user?.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 78 | `  const unread = items.filter((n) => !n.is_read).length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 79 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 80 | `  const markRead = async (id: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 81 | `    await (supabase.from("notifications") as any).update({ is_read: true }).eq("id", id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 82 | `    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 83 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 84 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 85 | `  const markAllRead = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 86 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 87 | `    await (supabase.from("notifications") as any)` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 88 | `      .update({ is_read: true })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `      .eq("user_id", user.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `      .eq("is_read", false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `    setItems((prev) => prev.map((n) => ({ ...n, is_read: true })));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 92 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 93 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 94 | `  const remove = async (id: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 95 | `    await (supabase.from("notifications") as any).delete().eq("id", id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 96 | `    setItems((prev) => prev.filter((n) => n.id !== id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 97 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 98 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 99 | `  const openNotification = async (n: Notification) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 100 | `    if (!n.is_read) await markRead(n.id);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 101 | `    setOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `    if (n.task_id) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 103 | `      navigate({ to: "/tasks/list", search: { task: n.task_id, mine: true } as any });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 104 | `    } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 105 | `      navigate({ to: "/tasks/list", search: { mine: true } as any });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 107 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 108 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 109 | `  if (!user) return null;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 110 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 111 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 112 | `    <Popover open={open} onOpenChange={setOpen}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 113 | `      <PopoverTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 114 | `        <Button size="icon" variant="ghost" className="relative h-9 w-9" title="Notificações">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 115 | `          <Bell className="h-5 w-5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 116 | `          {unread > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `            <span className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 118 | `              {unread > 99 ? "99+" : unread}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `            </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 120 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 122 | `      </PopoverTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 123 | `      <PopoverContent align="end" className="w-96 p-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 124 | `        <div className="flex items-center justify-between border-b px-4 py-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 125 | `          <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 126 | `            <p className="text-sm font-semibold">Notificações</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 127 | `            <p className="text-xs text-muted-foreground">{unread > 0 ? \`${unread} não lidas\` : "Tudo em dia"}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 128 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 129 | `          <Button size="sm" variant="ghost" disabled={unread === 0} onClick={markAllRead}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 130 | `            <Check className="mr-1 h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 131 | `            Marcar todas` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 133 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 134 | `        <div className="max-h-[420px] overflow-y-auto">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 135 | `          {items.length === 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 136 | `            <p className="px-4 py-8 text-center text-sm text-muted-foreground">Sem notificações</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 137 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `          {items.map((n) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 139 | `            <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 140 | `              key={n.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 141 | `              className={\`group relative flex cursor-pointer gap-3 border-b px-4 py-3 text-sm transition hover:bg-muted/50 ${` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 142 | `                !n.is_read ? "bg-primary/5" : ""` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 143 | `              }\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 144 | `              onClick={() => openNotification(n)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 145 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 146 | `              {!n.is_read && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 147 | `                <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-primary" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 148 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `              <div className="min-w-0 flex-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 150 | `                <p className="font-medium leading-tight">{n.title}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 151 | `                {n.body && <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{n.body}</p>}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 152 | `                <p className="mt-1 text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 153 | `                  {formatDistanceToNow(new Date(n.created_at), { addSuffix: true, locale: ptBR })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 155 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 156 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 157 | `                size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 158 | `                variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `                className="h-7 w-7 opacity-0 group-hover:opacity-100"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 160 | `                onClick={(e) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 161 | `                  e.stopPropagation();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `                  remove(n.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 163 | `                }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 164 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 165 | `                <Trash2 className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 166 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 167 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 168 | `          ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 169 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 170 | `      </PopoverContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 171 | `    </Popover>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 172 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 173 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 174 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
