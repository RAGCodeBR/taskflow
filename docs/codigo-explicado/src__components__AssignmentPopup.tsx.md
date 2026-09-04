# src/components/AssignmentPopup.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { useEffect, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useNavigate } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { Bell, ExternalLink, Calendar, AlertCircle } from "lucide-react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { format, formatDistanceToNow } from "date-fns";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import { ptBR } from "date-fns/locale";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 8 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 9 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `import { priorityLabels, priorityColors } from "@/lib/task-utils";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `import { RichTextView } from "@/components/RichTextEditor";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 13 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 14 | `interface AssignmentNotification {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 15 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  task_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  type: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  body: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 22 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 23 | `interface TaskPreview {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 24 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `  description: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `  due_date: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `  priority: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 30 | `const ASSIGN_TYPES = new Set(["assignment", "subtask_assignment", "collaborator_assignment"]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 31 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 32 | `export function AssignmentPopup() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 33 | `  const { user } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 34 | `  const navigate = useNavigate();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 35 | `  const qc = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 36 | `  const [queue, setQueue] = useState<AssignmentNotification[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 37 | `  const [preview, setPreview] = useState<TaskPreview | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 38 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 39 | `  const storageKey = user ? \`assign-popup-seen:${user.id}\` : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 41 | `  const getSeen = (): Set<string> => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 42 | `    if (!storageKey || typeof window === "undefined") return new Set();` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 43 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 44 | `      const raw = localStorage.getItem(storageKey);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 45 | `      if (!raw) return new Set();` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 46 | `      const arr = JSON.parse(raw);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 47 | `      return new Set(Array.isArray(arr) ? arr : []);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 48 | `    } catch {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `      return new Set();` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 50 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 51 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 52 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 53 | `  const refreshAssignedWork = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 54 | `    void qc.invalidateQueries({ queryKey: ["tasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 55 | `    void qc.invalidateQueries({ queryKey: ["subtasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 56 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 57 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 58 | `  const markSeen = (ids: string[]) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 59 | `    if (!storageKey || typeof window === "undefined" || ids.length === 0) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 60 | `    const seen = getSeen();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 61 | `    ids.forEach((id) => seen.add(id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 62 | `    const arr = Array.from(seen).slice(-500);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 63 | `    try { localStorage.setItem(storageKey, JSON.stringify(arr)); } catch { /* noop */ }` | Inicia bloco protegido para capturar erros durante a execucao. |
| 64 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 65 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 66 | `  const enqueueFromRow = (row: AssignmentNotification) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 67 | `    const seen = getSeen();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 68 | `    if (seen.has(row.id)) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 69 | `    refreshAssignedWork();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `    setQueue((prev) => (prev.some((n) => n.id === row.id) ? prev : [...prev, row]));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 71 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 72 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 73 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 74 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 75 | `    let cancelled = false;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 76 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 77 | `    const loadFreshAssignments = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 78 | `      const { data } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 79 | `        .from("notifications")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `        .select("id, task_id, title, body, created_at, type")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 81 | `        .eq("user_id", user.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `        .eq("is_read", false)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `        .in("type", ["assignment", "subtask_assignment", "collaborator_assignment"])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `        .order("created_at", { ascending: false })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `        .limit(20);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `      if (cancelled || !data) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 87 | `      const seen = getSeen();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 88 | `      const fresh = (data as any[])` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 89 | `        .filter((n) => !seen.has(n.id))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 90 | `        .map((n) => ({ id: n.id, task_id: n.task_id, type: n.type, title: n.title, body: n.body, created_at: n.created_at }))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 91 | `        .reverse();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `      if (fresh.length > 0) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 93 | `        refreshAssignedWork();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `        setQueue((prev) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 95 | `          const existing = new Set(prev.map((n) => n.id));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 96 | `          return [...prev, ...fresh.filter((n) => !existing.has(n.id))];` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 97 | `        });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 98 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 99 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 100 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 101 | `    void loadFreshAssignments();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `    const poll = window.setInterval(() => void loadFreshAssignments(), 12_000);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 103 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 104 | `    const channel = supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 105 | `      .channel(\`assign-popup-${user.id}-${Math.random().toString(36).slice(2)}\`)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `      .on(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `        "postgres_changes",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 108 | `        { event: "INSERT", schema: "public", table: "notifications", filter: \`user_id=eq.${user.id}\` },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `        (payload: any) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 110 | `          const n = payload.new;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 111 | `          if (!n || !ASSIGN_TYPES.has(n.type)) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 112 | `          enqueueFromRow({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `            id: n.id, task_id: n.task_id ?? null, type: n.type,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `            title: n.title, body: n.body ?? null, created_at: n.created_at,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `          });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 116 | `        },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 117 | `      )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `      .subscribe();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 120 | `    return () => { cancelled = true; window.clearInterval(poll); supabase.removeChannel(channel); };` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 121 | `    // eslint-disable-next-line react-hooks/exhaustive-deps` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 122 | `  }, [user?.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 124 | `  const current = queue[0] ?? null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 125 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 126 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 127 | `    setPreview(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `    if (!current?.task_id) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 129 | `    let cancelled = false;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 130 | `    (async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 131 | `      const { data } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 132 | `        .from("tasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 133 | `        .select("title, description, due_date, priority")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `        .eq("id", current.task_id!)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 135 | `        .maybeSingle();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 136 | `      if (!cancelled && data) setPreview(data as TaskPreview);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 137 | `    })();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `    return () => { cancelled = true; };` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 139 | `  }, [current?.task_id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 141 | `  const dismiss = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 142 | `    if (!current) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 143 | `    markSeen([current.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 144 | `    setQueue((prev) => prev.slice(1));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 145 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 146 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 147 | `  const openTask = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 148 | `    if (!current) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 149 | `    const target = current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 150 | `    markSeen([target.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 151 | `    setQueue((prev) => prev.slice(1));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 152 | `    if (target.task_id) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 153 | `      navigate({ to: "/tasks/list", search: { task: target.task_id, mine: true } as any });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `    } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 155 | `      navigate({ to: "/tasks/list", search: { mine: true } as any });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 157 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 158 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 159 | `  if (!user || !current) return null;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 160 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 161 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 162 | `    <Dialog open onOpenChange={(o) => { if (!o) dismiss(); }}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 163 | `      <DialogContent className="max-w-md">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 164 | `        <DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 165 | `          <DialogTitle className="flex items-center gap-2 text-base">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 166 | `            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 167 | `              <Bell className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 168 | `            </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 169 | `            {current.title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 170 | `          </DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 171 | `        </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 172 | `        {current.body && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 173 | `          <p className="text-sm text-muted-foreground">{current.body}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 174 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 175 | `        {preview && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 176 | `          <div className="space-y-2 rounded-md border bg-muted/30 p-3 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 177 | `            <p className="font-medium">{preview.title}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 178 | `            {preview.description && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 179 | `              <RichTextView html={preview.description} className="line-clamp-3 text-xs text-muted-foreground" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 180 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 181 | `            <div className="flex flex-wrap items-center gap-2 text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 182 | `              {preview.due_date && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 183 | `                <span className="inline-flex items-center gap-1 rounded bg-background px-2 py-1 font-medium">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 184 | `                  <Calendar className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 185 | `                  Prazo: {format(new Date(preview.due_date), "dd/MM/yyyy", { locale: ptBR })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 186 | `                </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 187 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 188 | `              {preview.priority && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 189 | `                <span className="inline-flex items-center gap-1 rounded bg-background px-2 py-1 font-medium"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 190 | `                  style={{ color: priorityColors[preview.priority] }}>` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 191 | `                  <AlertCircle className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 192 | `                  {priorityLabels[preview.priority as keyof typeof priorityLabels] ?? preview.priority}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 193 | `                </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 194 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 195 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 196 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 197 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `        <p className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 199 | `          {formatDistanceToNow(new Date(current.created_at), { addSuffix: true, locale: ptBR })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 200 | `          {queue.length > 1 && <span className="ml-2">• {queue.length - 1} outra(s) na fila</span>}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 201 | `        </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 202 | `        <DialogFooter className="gap-2 sm:gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 203 | `          <Button variant="ghost" onClick={dismiss}>Depois</Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 204 | `          <Button onClick={openTask}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 205 | `            <ExternalLink className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 206 | `            Ver tarefa` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 207 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 208 | `        </DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 209 | `      </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 210 | `    </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 211 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 212 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 213 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 214 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
