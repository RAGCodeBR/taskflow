import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Sparkles, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useClients, useTasks, type Client } from "@/hooks/use-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/clients")({
  component: Outlet,
});

export function ClientsIndexPage() {
  const qc = useQueryClient();
  const { user } = useAuth();
  const { data: clients = [] } = useClients();
  const { data: tasks = [] } = useTasks();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Client | null>(null);
  const [color, setColor] = useState("#1e3a8a");
  const [desc, setDesc] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [legalName, setLegalName] = useState("");
  const [tradeName, setTradeName] = useState("");
  const [stateRegistration, setStateRegistration] = useState("");
  const [municipalRegistration, setMunicipalRegistration] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [responsible, setResponsible] = useState("");
  const [search, setSearch] = useState("");
  const [avatarUrls, setAvatarUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;

    const loadAvatarUrls = async () => {
      const urls = await Promise.all(
        clients
          .filter((client) => client.avatar_path)
          .map(async (client) => {
            const { data } = await supabase.storage
              .from("task-attachments")
              .createSignedUrl(client.avatar_path!, 3600);
            return [client.id, data?.signedUrl ?? ""] as const;
          }),
      );

      if (!cancelled) setAvatarUrls(Object.fromEntries(urls));
    };

    void loadAvatarUrls();
    return () => {
      cancelled = true;
    };
  }, [clients]);
  const filteredClients = clients.filter((client) => {
    const term = search.trim().toLocaleLowerCase("pt-BR");

    return (
      client.name.toLocaleLowerCase("pt-BR").includes(term) ||
      client.description?.toLocaleLowerCase("pt-BR").includes(term)
    );
  });

  const onOpen = (c: Client | null) => {
    setEdit(c);
    setColor(c?.color ?? "#1e3a8a");
    setDesc(c?.description ?? "");
    setOpen(true);
    setCnpj(c?.cnpj ?? "");
    setTradeName(c?.trade_name ?? "");
    setLegalName(c?.legal_name ?? "");
    setMunicipalRegistration(c?.municipal_registration ?? "");
    setStateRegistration(c?.state_registration ?? "");
    setPhone(c?.phone ?? "");
    setAddress(c?.address ?? "");
    setEmail(c?.email ?? "");
    setResponsible(c?.responsible ?? c?.name ?? "");
  };

  const save = async () => {
    const displayName = tradeName.trim() || legalName.trim();
    if (!displayName) {
      toast.error("Preencha o Nome fantasia ou a Razão social.");
      return;
    }
    const clientData = {
      name: displayName,
      color,
      description: desc || null,
      cnpj: cnpj || null,
      legal_name: legalName || null,
      trade_name: tradeName || null,
      state_registration: stateRegistration || null,
      municipal_registration: municipalRegistration || null,
      address: address || null,
      phone: phone || null,
      email: email || null,
      responsible: responsible || null,
    };
    if (edit) {
      await supabase
      .from("clients")
      .update(clientData)
      .eq("id", edit.id);
    } else {
      await supabase
      .from("clients")
      .insert({ ...clientData, created_by: user?.id });
    }
    qc.invalidateQueries({ queryKey: ["clients"] });
    setOpen(false);
    toast.success("Cliente salvo");
  };

  const remove = async (c: Client) => {
    if (!confirm(`Excluir cliente "${c.name}"?`)) return;
    await supabase.from("clients").delete().eq("id", c.id);
    qc.invalidateQueries({ queryKey: ["clients"] });
  };

  return (
    <div className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clientes</h1>
          <p className="text-sm text-muted-foreground">Organize tarefas por cliente</p>
        </div>
        <Button asChild><Link to="/clients/new"><Plus className="mr-2 h-4 w-4" />Novo cliente</Link></Button>
      </header>
      {/* CAMPO DE BUSCA DE CLIENTES */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Localizar cliente..."
          className="pl-9"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map(c => {
          const count = tasks.filter(t => t.client_id === c.id).length;
          return (
            <Card key={c.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {avatarUrls[c.id] ? (
                    <img
                      src={avatarUrls[c.id]}
                      alt={`Logo de ${c.name}`}
                      className="block h-14 w-14 shrink-0 rounded-lg border bg-muted object-contain p-0.5"
                    />
                  ) : (
                    <div className="h-14 w-14 shrink-0 rounded-lg" style={{ background: c.color || "#1e3a8a" }} />
                  )}
                  <div>
                    <h3 className="font-semibold">{c.name}</h3>
                    <p className="text-xs text-muted-foreground">{count} tarefa(s)</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button asChild size="icon" variant="ghost" title="Relatório IA">
                    <Link to="/client-report/$clientId" params={{ clientId: c.id }}>
                      <Sparkles className="h-4 w-4 text-primary" />
                    </Link>
                  </Button>
                  <Button asChild size="icon" variant="ghost" title="Editar cliente">
                    <Link to="/clients/$clientId/edit" params={{ clientId: c.id }}><Pencil className="h-4 w-4" /></Link>
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(c)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </div>
              {c.description && <p className="mt-3 text-sm text-muted-foreground">{c.description}</p>}
            </Card>
          );
        })}
        {clients.length === 0 && (
          <Card className="col-span-full p-10 text-center text-muted-foreground">
            Nenhum cliente cadastrado. Crie um para começar a organizar tarefas.
          </Card>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{edit ? "Editar" : "Novo"} cliente</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>CNPJ</Label>
              <Input value={cnpj} onChange={(e) => setCnpj(e.target.value)} /></div>
            <div className="space-y-2">
                <Label>Nome fantasia</Label>
                <Input value={tradeName} onChange={(e) => setTradeName(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>Razão social</Label>
                <Input value={legalName} onChange={(e) => setLegalName(e.target.value)} /></div>
            <div className="space-y-2">
                <Label>Inscrição Estadual</Label>
                <Input value={stateRegistration} onChange={(e) => setStateRegistration(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>Inscrição Municipal</Label>
                <Input value={municipalRegistration} onChange={(e) => setMunicipalRegistration(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>Telefone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>E-mail</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Endereço completo</Label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            </div>
            <div className="space-y-2"><Label>Responsável</Label><Input value={responsible} onChange={(e) => setResponsible(e.target.value)} /></div>
            <div className="space-y-2"><Label>Descrição</Label><Input value={desc} onChange={(e) => setDesc(e.target.value)} /></div>
            <div className="space-y-2"><Label>Cor</Label><Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10" /></div>
            <Button onClick={save} className="w-full">Salvar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
