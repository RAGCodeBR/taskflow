import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Building2, ChevronDown } from "lucide-react";
import { useClients } from "@/hooks/use-data";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ClientsNavGroup({
  expanded,
  active,
  onNavigate,
}: {
  expanded: boolean;
  active: boolean;
  onNavigate?: () => void;
}) {
  const { data: clients = [], isLoading, isError } = useClients();
  const [open, setOpen] = useState(active);
  const selectedId = useRouterState({
    select: (state) => (state.location.search as { client?: string }).client,
  });
  const links = clients.map((client) => (
    <Link
      key={client.id}
      to="/clients"
      search={{ client: client.id }}
      onClick={onNavigate}
      className={`block min-w-0 cursor-pointer rounded-lg px-3 py-2 text-xs transition hover:bg-sidebar-accent/15 ${active && selectedId === client.id ? "bg-sidebar-primary/10 font-semibold text-sidebar-primary" : "text-sidebar-foreground/80"}`}
    >
      <span className="block truncate" title={client.name}>
        {client.name}
      </span>
      {!client.is_active && <span className="text-[10px] text-muted-foreground">Inativo</span>}
    </Link>
  ));
  const status = isLoading
    ? "Carregando clientes…"
    : isError
      ? "Não foi possível carregar os clientes."
      : !clients.length
        ? "Nenhum cliente disponível."
        : null;

  if (!expanded)
    return (
      <div className="relative mx-auto h-11 w-11">
        <Link
          to="/clients"
          search={{}}
          onClick={onNavigate}
          title="Clientes · calendário geral"
          className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full ${active ? "bg-sidebar-primary/10 text-sidebar-primary" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10"}`}
        >
          <Building2 className="h-4 w-4" />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Abrir lista de clientes"
              className="absolute -right-1 bottom-0 grid h-5 w-5 cursor-pointer place-items-center rounded-full border bg-background shadow-sm"
            >
              <ChevronDown className="h-3 w-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            align="start"
            className="max-h-[65dvh] w-60 overflow-y-auto"
          >
            <DropdownMenuItem asChild>
              <Link to="/clients" search={{}} onClick={onNavigate}>
                Todos os clientes no calendário
              </Link>
            </DropdownMenuItem>
            {clients.map((client) => (
              <DropdownMenuItem key={client.id} asChild>
                <Link
                  to="/clients"
                  search={{ client: client.id }}
                  onClick={onNavigate}
                  className="truncate"
                >
                  {client.name}
                </Link>
              </DropdownMenuItem>
            ))}
            {status && <p className="p-2 text-xs text-muted-foreground">{status}</p>}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="space-y-1">
      <div
        className={`flex items-center rounded-full ${active ? "border border-sidebar-primary bg-sidebar/45 font-medium shadow-sm" : "hover:bg-sidebar-accent/10"}`}
      >
        <Link
          to="/clients"
          search={{}}
          onClick={onNavigate}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 py-2 pl-3 text-sm"
        >
          <span
            className={`grid h-7 w-7 shrink-0 place-items-center ${active ? "rounded-full bg-sidebar-primary text-sidebar-primary-foreground" : ""}`}
          >
            <Building2 className="h-4 w-4" />
          </span>
          Clientes
        </Link>
        <button
          type="button"
          aria-label={open ? "Recolher lista de clientes" : "Abrir lista de clientes"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="mr-1 grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full hover:bg-sidebar-accent/15"
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <CollapsibleContent className="ml-6 max-h-[45dvh] space-y-0.5 overflow-y-auto border-l border-sidebar-primary/20 pl-2">
        {links}
        {status && <p className="p-2 text-xs text-muted-foreground">{status}</p>}
      </CollapsibleContent>
    </Collapsible>
  );
}
