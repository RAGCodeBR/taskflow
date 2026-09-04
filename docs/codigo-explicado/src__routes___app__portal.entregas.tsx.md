# src/routes/_app/portal.entregas.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createFileRoute } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useEffect, useMemo, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameMonth, startOfMonth, startOfWeek, subMonths } from "date-fns";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { ptBR } from "date-fns/locale";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { ChevronLeft, ChevronRight } from "lucide-react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import { type Task, useClients } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `import { useWorkspaceTasks } from "@/hooks/use-workspace-tasks";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 8 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 9 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `import { Card } from "@/components/ui/card";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 13 | `import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 14 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 15 | `export const Route = createFileRoute("/_app/portal/entregas")({ component: ClientDeliveriesPage });` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 16 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 17 | `function ClientDeliveriesPage() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 18 | `  const { data: clients = [] } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 19 | `  const { isClient, clientId: linkedClientId } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 20 | `  const { data: tasks = [] } = useWorkspaceTasks();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 21 | `  const [clientId, setClientId] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 22 | `  const [month, setMonth] = useState(new Date());` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 23 | `  const [selectedDate, setSelectedDate] = useState(() => format(new Date(), "yyyy-MM-dd"));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 24 | `  const [selectedTask, setSelectedTask] = useState<Task | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 25 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 26 | `    if (isClient) setClientId(linkedClientId ?? "");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 27 | `    else if (!clientId && clients[0]) setClientId(clients[0].id);` | Define o caminho alternativo da condicao anterior. |
| 28 | `  }, [clientId, clients, isClient, linkedClientId]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 30 | `  const selectDate = (value: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 31 | `    setSelectedDate(value);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `    if (value) setMonth(new Date(\`${value}T12:00:00\`));` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 33 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 34 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 35 | `  const client = clients.find((item) => item.id === clientId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 36 | `  const deliveries = useMemo(() => tasks.filter((task) => task.client_id === clientId && task.due_date), [clientId, tasks]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 37 | `  const deliveriesByDay = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 38 | `    const map = new Map<string, typeof deliveries>();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 39 | `    deliveries.forEach((task) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 40 | `      const key = format(new Date(task.due_date!), "yyyy-MM-dd");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 41 | `      map.set(key, [...(map.get(key) ?? []), task]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 43 | `    return map;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 44 | `  }, [deliveries]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  const days = useMemo(() => eachDayOfInterval({ start: startOfWeek(startOfMonth(month), { weekStartsOn: 1 }), end: endOfWeek(endOfMonth(month), { weekStartsOn: 1 }) }), [month]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 46 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 47 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 48 | `    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 49 | `      <header><p className="text-sm font-medium text-primary">Portal do Cliente</p><h1 className="text-2xl font-bold">Calendário de Entregas</h1><p className="text-sm text-muted-foreground">Veja a quantidade de tarefas e os prazos de entrega por cliente.</p></header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 50 | `      {isClient ? <Card className="p-4"><p className="text-sm text-muted-foreground">Cliente vinculado</p><p className="mt-1 font-semibold">{client?.name ?? "Cliente não vinculado"}</p></Card> : <Card className="p-4"><p className="mb-2 text-sm font-medium">Cliente</p><Select value={clientId} onValueChange={setClientId}><SelectTrigger className="max-w-md"><SelectValue placeholder="Selecione o cliente" /></SelectTrigger><SelectContent>{clients.map((item) => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}</SelectContent></Select></Card>}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 51 | `      {!clientId ? <Empty text="Cadastre ou selecione um cliente para ver o calendário." /> : <Card className="overflow-hidden"><div className="flex flex-wrap items-center justify-between gap-3 border-b p-4"><div><h2 className="font-semibold">Entregas de {client?.name}</h2><p className="text-sm capitalize text-muted-foreground">{format(month, "MMMM 'de' yyyy", { locale: ptBR })}</p></div><div className="flex flex-wrap items-center gap-1"><label className="sr-only" htmlFor="delivery-date">Escolher data</label><Input id="delivery-date" type="date" value={selectedDate} onChange={(event) => selectDate(event.target.value)} className="h-9 w-[150px]" /><Button size="icon" variant="outline" aria-label="Mês anterior" onClick={() => setMonth((current) => subMonths(current, 1))}><ChevronLeft className="h-4 w-4" /></Button><Button size="sm" variant="outline" onClick={() => { const today = new Date(); setMonth(today); setSelectedDate(format(today, "yyyy-MM-dd")); }}>Hoje</Button><Button size="icon" variant="outline" aria-label="Próximo mês" onClick={() => setMonth((current) => addMonths(current, 1))}><ChevronRight className="h-4 w-4" /></Button></div></div><div className="grid grid-cols-7 border-b bg-muted/40 text-center text-[10px] font-semibold uppercase text-muted-foreground sm:text-xs">{["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((label) => <div key={label} className="p-2">{label}</div>)}</div><div className="grid grid-cols-7">{days.map((day) => { const key = format(day, "yyyy-MM-dd"); const items = deliveriesByDay.get(key) ?? []; return <div key={key} className={\`min-h-28 border-b border-r p-1.5 sm:min-h-36 sm:p-2 ${isSameMonth(day, month) ? "" : "bg-muted/20 text-muted-foreground"} ${key === selectedDate ? "bg-primary/5 ring-1 ring-inset ring-primary" : ""}\`}><div className="mb-1 flex items-center justify-between"><span className="text-xs font-medium">{format(day, "d")}</span>{items.length > 0 && <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">{items.length}</span>}</div><div className="space-y-1">{items.slice(0, 2).map((task) => <button key={task.id} type="button" onClick={() => setSelectedTask(task)} className="block w-full truncate rounded px-1 py-0.5 text-left text-[10px] text-foreground hover:bg-muted sm:text-xs" title={\`Ver ${task.title}\`}>{task.title}</button>)}{items.length > 2 && <div className="text-[10px] text-muted-foreground">+{items.length - 2} tarefas</div>}</div></div>; })}</div></Card>}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 52 | `      <Dialog open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}><DialogContent className="max-w-sm"><DialogHeader><DialogTitle>{selectedTask?.title}</DialogTitle></DialogHeader>{selectedTask?.due_date && <p className="text-sm text-muted-foreground">Prazo: {format(new Date(selectedTask.due_date), "dd/MM/yyyy")}</p>}</DialogContent></Dialog>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 53 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 54 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 55 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 56 | `function Empty({ text }: { text: string }) { return <Card className="p-10 text-center text-sm text-muted-foreground">{text}</Card>; }` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 57 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
