import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameMonth, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Task, useClients, useTasks } from "@/hooks/use-data";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/_app/portal/entregas")({ component: ClientDeliveriesPage });

function ClientDeliveriesPage() {
  const { data: clients = [] } = useClients();
  const { isClient, clientId: linkedClientId } = useAuth();
  const { data: tasks = [] } = useTasks();
  const [clientId, setClientId] = useState("");
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(() => format(new Date(), "yyyy-MM-dd"));
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  useEffect(() => {
    if (isClient) setClientId(linkedClientId ?? "");
    else if (!clientId && clients[0]) setClientId(clients[0].id);
  }, [clientId, clients, isClient, linkedClientId]);

  const selectDate = (value: string) => {
    setSelectedDate(value);
    if (value) setMonth(new Date(`${value}T12:00:00`));
  };

  const client = clients.find((item) => item.id === clientId);
  const deliveries = useMemo(() => tasks.filter((task) => task.client_id === clientId && task.due_date), [clientId, tasks]);
  const deliveriesByDay = useMemo(() => {
    const map = new Map<string, typeof deliveries>();
    deliveries.forEach((task) => {
      const key = format(new Date(task.due_date!), "yyyy-MM-dd");
      map.set(key, [...(map.get(key) ?? []), task]);
    });
    return map;
  }, [deliveries]);
  const days = useMemo(() => eachDayOfInterval({ start: startOfWeek(startOfMonth(month), { weekStartsOn: 1 }), end: endOfWeek(endOfMonth(month), { weekStartsOn: 1 }) }), [month]);

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
      <header><p className="text-sm font-medium text-primary">Portal do Cliente</p><h1 className="text-2xl font-bold">Calendário de Entregas</h1><p className="text-sm text-muted-foreground">Veja a quantidade de tarefas e os prazos de entrega por cliente.</p></header>
      {isClient ? <Card className="p-4"><p className="text-sm text-muted-foreground">Cliente vinculado</p><p className="mt-1 font-semibold">{client?.name ?? "Cliente não vinculado"}</p></Card> : <Card className="p-4"><p className="mb-2 text-sm font-medium">Cliente</p><Select value={clientId} onValueChange={setClientId}><SelectTrigger className="max-w-md"><SelectValue placeholder="Selecione o cliente" /></SelectTrigger><SelectContent>{clients.map((item) => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}</SelectContent></Select></Card>}
      {!clientId ? <Empty text="Cadastre ou selecione um cliente para ver o calendário." /> : <Card className="overflow-hidden"><div className="flex flex-wrap items-center justify-between gap-3 border-b p-4"><div><h2 className="font-semibold">Entregas de {client?.name}</h2><p className="text-sm capitalize text-muted-foreground">{format(month, "MMMM 'de' yyyy", { locale: ptBR })}</p></div><div className="flex flex-wrap items-center gap-1"><label className="sr-only" htmlFor="delivery-date">Escolher data</label><Input id="delivery-date" type="date" value={selectedDate} onChange={(event) => selectDate(event.target.value)} className="h-9 w-[150px]" /><Button size="icon" variant="outline" aria-label="Mês anterior" onClick={() => setMonth((current) => subMonths(current, 1))}><ChevronLeft className="h-4 w-4" /></Button><Button size="sm" variant="outline" onClick={() => { const today = new Date(); setMonth(today); setSelectedDate(format(today, "yyyy-MM-dd")); }}>Hoje</Button><Button size="icon" variant="outline" aria-label="Próximo mês" onClick={() => setMonth((current) => addMonths(current, 1))}><ChevronRight className="h-4 w-4" /></Button></div></div><div className="grid grid-cols-7 border-b bg-muted/40 text-center text-[10px] font-semibold uppercase text-muted-foreground sm:text-xs">{["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((label) => <div key={label} className="p-2">{label}</div>)}</div><div className="grid grid-cols-7">{days.map((day) => { const key = format(day, "yyyy-MM-dd"); const items = deliveriesByDay.get(key) ?? []; return <div key={key} className={`min-h-28 border-b border-r p-1.5 sm:min-h-36 sm:p-2 ${isSameMonth(day, month) ? "" : "bg-muted/20 text-muted-foreground"} ${key === selectedDate ? "bg-primary/5 ring-1 ring-inset ring-primary" : ""}`}><div className="mb-1 flex items-center justify-between"><span className="text-xs font-medium">{format(day, "d")}</span>{items.length > 0 && <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">{items.length}</span>}</div><div className="space-y-1">{items.slice(0, 2).map((task) => <button key={task.id} type="button" onClick={() => setSelectedTask(task)} className="block w-full truncate rounded px-1 py-0.5 text-left text-[10px] text-foreground hover:bg-muted sm:text-xs" title={`Ver ${task.title}`}>{task.title}</button>)}{items.length > 2 && <div className="text-[10px] text-muted-foreground">+{items.length - 2} tarefas</div>}</div></div>; })}</div></Card>}
      <Dialog open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}><DialogContent className="max-w-sm"><DialogHeader><DialogTitle>{selectedTask?.title}</DialogTitle></DialogHeader>{selectedTask?.due_date && <p className="text-sm text-muted-foreground">Prazo: {format(new Date(selectedTask.due_date), "dd/MM/yyyy")}</p>}</DialogContent></Dialog>
    </div>
  );
}
function Empty({ text }: { text: string }) { return <Card className="p-10 text-center text-sm text-muted-foreground">{text}</Card>; }
