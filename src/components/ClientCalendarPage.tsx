import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookImage, Building2, Eye, EyeOff, KeyRound, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useClients, type Client, type ClientSystemAccess } from "@/hooks/use-data";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { LinkedText } from "@/components/LinkedText";
import { ClientReferences } from "@/components/ClientReferences";
import { CalendarPage } from "@/components/TaskCalendar";

function ClientQuickPanel({ client }: { client: Client }) {
  const { user, activeWorkspace } = useAuth();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("client");
  const [visiblePassword, setVisiblePassword] = useState<string | null>(null);
  useEffect(() => {
    if (!open || tab !== "system") setVisiblePassword(null);
  }, [open, tab]);
  const systems = useQuery({
    queryKey: ["client-calendar-systems", activeWorkspace?.id, user?.id, client.id],
    enabled: open && tab === "system",
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_system_accesses")
        .select("*")
        .eq("client_id", client.id)
        .order("title");
      if (error) throw error;
      return (data ?? []) as ClientSystemAccess[];
    },
  });
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setTab("client");
            setOpen(true);
          }}
        >
          <Building2 className="mr-1 h-3.5 w-3.5" />
          Cadastro
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setTab("system");
            setOpen(true);
          }}
        >
          <KeyRound className="mr-1 h-3.5 w-3.5" />
          Sistemas e senhas
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setTab("references");
            setOpen(true);
          }}
        >
          <BookImage className="mr-1 h-3.5 w-3.5" />
          Referências
        </Button>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full overflow-y-auto p-4 sm:max-w-3xl sm:p-6">
          <SheetHeader className="pr-7">
            <SheetTitle>{client.name}</SheetTitle>
            <SheetDescription>Informações do cliente, ao lado do calendário.</SheetDescription>
          </SheetHeader>
          <Tabs value={tab} onValueChange={setTab} className="mt-5">
            <TabsList className="grid h-auto w-full grid-cols-3">
              <TabsTrigger value="client">Cadastro</TabsTrigger>
              <TabsTrigger value="system">Sistemas</TabsTrigger>
              <TabsTrigger value="references">Referências</TabsTrigger>
            </TabsList>
            <TabsContent value="client" className="space-y-4 pt-2">
              <dl className="grid gap-4 rounded-xl border p-4 text-sm sm:grid-cols-2">
                {[
                  ["Razão social", client.legal_name],
                  ["Nome fantasia", client.trade_name],
                  ["CNPJ", client.cnpj],
                  ["Responsável", client.responsible],
                  ["Telefone", client.phone],
                  ["E-mail", client.email],
                  ["Endereço", client.address],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd className="mt-1 break-words">
                      {value ? <LinkedText text={value} /> : "Não informado"}
                    </dd>
                  </div>
                ))}
              </dl>
              {client.description && (
                <p className="whitespace-pre-wrap break-words rounded-xl border p-4 text-sm">
                  <LinkedText text={client.description} />
                </p>
              )}
            </TabsContent>
            <TabsContent value="system" className="space-y-3 pt-2">
              {systems.isLoading && (
                <p className="text-sm text-muted-foreground">Carregando sistemas…</p>
              )}
              {systems.error && (
                <p role="alert" className="text-sm text-destructive">
                  Não foi possível carregar os sistemas. Verifique sua conexão e seu acesso.
                </p>
              )}
              {!systems.isLoading && !systems.error && !systems.data?.length && (
                <p className="rounded-lg border p-4 text-sm text-muted-foreground">
                  Nenhum sistema cadastrado para este cliente.
                </p>
              )}
              {systems.data?.map((system) => (
                <article key={system.id} className="space-y-2 rounded-xl border p-4 text-sm">
                  <h3 className="font-semibold">{system.title}</h3>
                  <p className="break-words">
                    <span className="text-muted-foreground">Login: </span>
                    {system.login || "Não informado"}
                  </p>
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="text-muted-foreground">Senha:</span>
                    <span className="min-w-0 break-all font-mono">
                      {visiblePassword === system.id
                        ? system.password || "Não informada"
                        : "••••••••"}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 shrink-0"
                      aria-label={visiblePassword === system.id ? "Ocultar senha" : "Mostrar senha"}
                      onClick={() =>
                        setVisiblePassword(visiblePassword === system.id ? null : system.id)
                      }
                    >
                      {visiblePassword === system.id ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                  {system.notes && (
                    <p className="whitespace-pre-wrap break-words text-xs text-muted-foreground">
                      <LinkedText text={system.notes} />
                    </p>
                  )}
                </article>
              ))}
            </TabsContent>
            <TabsContent value="references" className="pt-2">
              <ClientReferences clientId={client.id} />
            </TabsContent>
          </Tabs>
          <Button asChild variant="outline" className="mt-5">
            <Link to="/clients/$clientId/edit" params={{ clientId: client.id }} search={{ tab }}>
              Abrir ficha completa
            </Link>
          </Button>
        </SheetContent>
      </Sheet>
    </>
  );
}

export function ClientCalendarPage({ clientId }: { clientId?: string }) {
  const { activeWorkspace } = useAuth();
  const { data: clients = [], isLoading } = useClients();
  const navigate = useNavigate();
  const client = clients.find((row) => row.id === clientId);
  return (
    <div key={activeWorkspace?.id}>
      <header className="space-y-3 px-4 pt-5 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              {client?.name ?? "Calendário dos clientes"}
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Tarefas por data. Clique em um título para abrir o card completo.
            </p>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link to="/clients/directory">
              <Settings2 className="mr-1 h-3.5 w-3.5" />
              Gerenciar clientes
            </Link>
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            aria-label="Cliente do calendário"
            className="h-9 w-full min-w-0 rounded-md border bg-background px-3 text-sm sm:w-64"
            value={clientId ?? ""}
            disabled={isLoading}
            onChange={(event) =>
              void navigate({
                to: "/clients",
                search: event.target.value ? { client: event.target.value } : {},
              })
            }
          >
            <option value="">Todos os clientes</option>
            {clientId && !client && <option value={clientId}>Cliente indisponível</option>}
            {clients.map((row) => (
              <option key={row.id} value={row.id}>
                {row.name}
                {row.is_active ? "" : " (inativo)"}
              </option>
            ))}
          </select>
          {client && <ClientQuickPanel key={client.id} client={client} />}
        </div>
        {clientId && !client && !isLoading && (
          <p role="status" className="text-sm text-muted-foreground">
            Este cliente não está disponível no ambiente atual. Escolha outro cliente ou o
            calendário geral.
          </p>
        )}
      </header>
      <CalendarPage clientCalendar clientId={clientId} />
    </div>
  );
}
