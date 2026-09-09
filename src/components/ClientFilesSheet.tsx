import { useEffect, useState } from "react";
import { Paperclip } from "lucide-react";
import { ClientFilesManager } from "@/components/ClientFilesManager";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useClients } from "@/hooks/use-data";

export function ClientFilesSheet({
  open,
  onOpenChange,
  initialClientId,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  initialClientId?: string | null;
}) {
  const { data: clients = [] } = useClients();
  const [clientId, setClientId] = useState<string | null>(initialClientId ?? null);

  useEffect(() => {
    if (initialClientId) setClientId(initialClientId);
  }, [initialClientId]);

  useEffect(() => {
    if (open && !clientId && clients[0]) setClientId(clients[0].id);
  }, [open, clients, clientId]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full max-w-2xl flex-col p-0 sm:max-w-2xl">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="flex items-center gap-2">
            <Paperclip className="h-4 w-4" /> Arquivos do cliente
          </SheetTitle>
          <SheetDescription>
            Consulte, envie, renomeie e ordene os arquivos vinculados ao cliente.
          </SheetDescription>
        </SheetHeader>

        <div className="border-b px-4 py-3">
          <Select value={clientId ?? undefined} onValueChange={setClientId}>
            <SelectTrigger className="w-full sm:w-[260px]">
              <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {clientId ? (
            <ClientFilesManager clientId={clientId} showHeader={false} />
          ) : (
            <p className="rounded border border-dashed p-6 text-center text-sm text-muted-foreground">
              Selecione um cliente para ver e gerenciar arquivos.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
