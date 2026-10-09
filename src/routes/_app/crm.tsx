import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  CalendarDays,
  KanbanSquare,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { useClients } from "@/hooks/use-data";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/_app/crm")({ component: CrmPage });

type Opportunity = Database["public"]["Tables"]["crm_opportunities"]["Row"];
type StageSetting = Database["public"]["Tables"]["crm_pipeline_stages"]["Row"];
const EMPTY_OPPORTUNITIES: Opportunity[] = [];
type Stage = "atendendo" | "novo" | "qualificado" | "proposta" | "negociacao" | "finalizado";
const defaultStages: { id: Stage; label: string; color: string }[] = [
  { id: "atendendo", label: "Atendendo", color: "#16a77e" },
  { id: "novo", label: "Novos Leads", color: "#3278d4" },
  { id: "qualificado", label: "Qualificados", color: "#5b45ad" },
  { id: "proposta", label: "Proposta Enviada", color: "#f06e43" },
  { id: "negociacao", label: "Em Negociação", color: "#e9a400" },
  { id: "finalizado", label: "Finalizados", color: "#208b43" },
];
const initialForm = {
  title: "",
  company_mode: "name" as "name" | "registered",
  client_id: "",
  company_name: "",
  contact_email: "",
  contact_phone: "",
  source: "",
  stage: "novo" as Stage,
  amount: "",
  expected_close_date: "",
  notes: "",
};
const money = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

function CrmPage() {
  const { activeWorkspace, hasPermission, isClient } = useAuth();
  const clients = useClients();
  const queryClient = useQueryClient();
  const workspaceId = activeWorkspace?.id;
  const queryKey = ["crm-opportunities", workspaceId];
  const stagesQueryKey = ["crm-pipeline-stages", workspaceId];
  const [tab, setTab] = useState<"pipeline" | "origins">("pipeline");
  const [search, setSearch] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<Opportunity | null>(null);
  const [deleting, setDeleting] = useState<Opportunity | null>(null);
  const [form, setForm] = useState(initialForm);
  const [editingStage, setEditingStage] = useState<Stage | null>(null);
  const [stageForm, setStageForm] = useState({ label: "", color: "#3278d4" });

  const opportunities = useQuery({
    queryKey,
    enabled: !!workspaceId && hasPermission("crm") && !isClient,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("crm_opportunities")
        .select("*")
        .eq("workspace_id", workspaceId!)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Opportunity[];
    },
  });

  const stageSettings = useQuery({
    queryKey: stagesQueryKey,
    enabled: !!workspaceId && hasPermission("crm") && !isClient,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("crm_pipeline_stages")
        .select("*")
        .eq("workspace_id", workspaceId!);
      if (error) throw error;
      return (data ?? []) as StageSetting[];
    },
  });
  const stages = useMemo(
    () =>
      defaultStages.map((stage) => {
        const saved = stageSettings.data?.find((item) => item.stage_id === stage.id);
        return saved ? { ...stage, label: saved.label, color: saved.color } : stage;
      }),
    [stageSettings.data],
  );

  const saveStage = useMutation({
    mutationFn: async () => {
      if (!workspaceId || !editingStage) throw new Error("Coluna indisponível.");
      const label = stageForm.label.trim();
      if (!label || label.length > 60) throw new Error("O título deve ter de 1 a 60 caracteres.");
      if (!/^#[0-9a-fA-F]{6}$/.test(stageForm.color)) throw new Error("Escolha uma cor válida.");
      const { error } = await supabase.from("crm_pipeline_stages").upsert(
        {
          workspace_id: workspaceId,
          stage_id: editingStage,
          label,
          color: stageForm.color,
        },
        { onConflict: "workspace_id,stage_id" },
      );
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stagesQueryKey });
      setEditingStage(null);
      toast.success("Coluna atualizada.");
    },
    onError: (error) => toast.error(`Não foi possível atualizar a coluna: ${error.message}`),
  });

  const save = useMutation({
    mutationFn: async () => {
      if (!workspaceId) throw new Error("Selecione um ambiente antes de salvar.");
      const title = form.title.trim();
      if (!title) throw new Error("Informe o nome do lead.");
      const amount = form.amount.trim() ? Number(form.amount) : null;
      if (amount !== null && (!Number.isFinite(amount) || amount < 0))
        throw new Error("Informe um valor válido.");
      const selectedClient =
        form.company_mode === "registered"
          ? clients.data?.find((client) => client.id === form.client_id)
          : null;
      if (form.company_mode === "registered" && !selectedClient)
        throw new Error("Selecione uma empresa cadastrada neste ambiente.");
      const payload = {
        title,
        client_id: selectedClient?.id ?? null,
        company_name: (selectedClient?.name ?? form.company_name.trim()) || null,
        contact_email: form.contact_email.trim() || null,
        contact_phone: form.contact_phone.trim() || null,
        source: form.source.trim() || null,
        stage: form.stage,
        amount,
        expected_close_date: form.expected_close_date || null,
        notes: form.notes.trim() || null,
      };
      const result = editing
        ? await supabase
            .from("crm_opportunities")
            .update(payload)
            .eq("id", editing.id)
            .eq("workspace_id", workspaceId)
            .select("id")
            .single()
        : await supabase
            .from("crm_opportunities")
            .insert({ ...payload, workspace_id: workspaceId })
            .select("id")
            .single();
      if (result.error) throw result.error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setEditorOpen(false);
      toast.success(editing ? "Lead atualizado." : "Lead criado.");
    },
    onError: (error) => toast.error(`Não foi possível salvar o lead: ${error.message}`),
  });
  const move = useMutation({
    mutationFn: async ({ id, stage }: { id: string; stage: Stage }) => {
      if (!workspaceId) throw new Error("Ambiente indisponível.");
      const { data, error } = await supabase
        .from("crm_opportunities")
        .update({ stage })
        .eq("id", id)
        .eq("workspace_id", workspaceId)
        .select("id")
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: (error) => toast.error(`Não foi possível mover o lead: ${error.message}`),
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      if (!workspaceId) throw new Error("Ambiente indisponível.");
      const { data, error } = await supabase
        .from("crm_opportunities")
        .delete()
        .eq("id", id)
        .eq("workspace_id", workspaceId)
        .select("id")
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setDeleting(null);
      setEditorOpen(false);
      toast.success("Lead excluído.");
    },
    onError: (error) => toast.error(`Não foi possível excluir o lead: ${error.message}`),
  });

  const all: Opportunity[] = opportunities.data ?? EMPTY_OPPORTUNITIES;
  const clientNames = useMemo(
    () => new Map((clients.data ?? []).map((client) => [client.id, client.name])),
    [clients.data],
  );
  const filtered = useMemo(() => {
    const term = normalize(search.trim());
    return !term
      ? all
      : all.filter((lead) =>
          normalize(
            [
              lead.title,
              (lead.client_id && clientNames.get(lead.client_id)) || lead.company_name,
              lead.contact_email,
              lead.contact_phone,
            ]
              .filter(Boolean)
              .join(" "),
          ).includes(term),
        );
  }, [all, search, clientNames]);
  const activeValue = all
    .filter((lead) => lead.stage !== "finalizado")
    .reduce((sum, lead) => sum + (lead.amount ?? 0), 0);
  const finalized = all.filter((lead) => lead.stage === "finalizado").length;
  const completion = all.length ? Math.round((finalized / all.length) * 100) : 0;
  const origins = useMemo(() => {
    const counts = new Map<string, number>();
    for (const lead of filtered)
      counts.set(
        lead.source?.trim() || "Não informada",
        (counts.get(lead.source?.trim() || "Não informada") ?? 0) + 1,
      );
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [filtered]);

  function openNew(stage: Stage = "novo") {
    setEditing(null);
    setForm({ ...initialForm, stage });
    setEditorOpen(true);
  }
  function openEdit(lead: Opportunity) {
    setEditing(lead);
    setForm({
      title: lead.title,
      company_mode: lead.client_id ? "registered" : "name",
      client_id: lead.client_id ?? "",
      company_name: lead.company_name ?? "",
      contact_email: lead.contact_email ?? "",
      contact_phone: lead.contact_phone ?? "",
      source: lead.source ?? "",
      stage: lead.stage as Stage,
      amount: lead.amount === null ? "" : String(lead.amount),
      expected_close_date: lead.expected_close_date ?? "",
      notes: lead.notes ?? "",
    });
    setEditorOpen(true);
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    save.mutate();
  }
  function openStageEditor(stage: { id: Stage; label: string; color: string }) {
    setStageForm({ label: stage.label, color: stage.color });
    setEditingStage(stage.id);
  }

  if (isClient || !hasPermission("crm")) return <Navigate to="/dashboard" replace />;
  return (
    <div className="flex min-h-full flex-col gap-5 p-4 sm:p-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">CRM</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Acompanhe seus leads e negociações em {activeWorkspace?.name ?? "seu ambiente"}.
          </p>
        </div>
        <Button onClick={() => openNew()} className="gap-2">
          <Plus className="h-4 w-4" /> Novo Lead
        </Button>
      </header>
      <div className="flex gap-5 border-b text-sm font-medium">
        <button
          type="button"
          onClick={() => setTab("pipeline")}
          className={`flex items-center gap-2 border-b-2 px-1 pb-3 ${tab === "pipeline" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
        >
          <KanbanSquare className="h-4 w-4" /> Pipeline
        </button>
        <button
          type="button"
          onClick={() => setTab("origins")}
          className={`flex items-center gap-2 border-b-2 px-1 pb-3 ${tab === "origins" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
        >
          <MapPin className="h-4 w-4" /> Origem de Leads
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-lg border bg-card px-3 py-2">
            Total Leads: <strong>{all.length}</strong>
          </span>
          <span className="rounded-lg border bg-card px-3 py-2">
            Pipeline: <strong>{money(activeValue)}</strong>
          </span>
          <span className="rounded-lg border bg-card px-3 py-2">
            {stages.find((stage) => stage.id === "finalizado")?.label}:{" "}
            <strong>{completion}%</strong>
          </span>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label="Buscar leads"
            className="pl-9"
            placeholder="Buscar nome, e-mail, telefone…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
      {opportunities.isLoading || stageSettings.isLoading ? (
        <p className="py-12 text-center text-sm text-muted-foreground">Carregando leads…</p>
      ) : opportunities.isError || stageSettings.isError ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive">
          Não foi possível carregar o CRM:{" "}
          {opportunities.error?.message ?? stageSettings.error?.message}
          <Button
            variant="outline"
            size="sm"
            className="ml-3"
            onClick={() => {
              opportunities.refetch();
              stageSettings.refetch();
            }}
          >
            Tentar novamente
          </Button>
        </div>
      ) : tab === "pipeline" ? (
        <div
          className="flex min-h-[55vh] gap-3 overflow-x-auto pb-4"
          aria-label="Funil de oportunidades"
        >
          {stages.map((stage) => {
            const leads = filtered.filter((lead) => lead.stage === stage.id);
            const value = leads.reduce((sum, lead) => sum + (lead.amount ?? 0), 0);
            return (
              <section
                key={stage.id}
                className="flex w-[272px] min-w-[272px] flex-col rounded-xl border bg-muted/25"
                style={{ borderTop: `4px solid ${stage.color}` }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  const id = event.dataTransfer.getData("text/plain");
                  if (id && all.some((lead) => lead.id === id && lead.stage !== stage.id))
                    move.mutate({ id, stage: stage.id });
                }}
              >
                <div className="flex items-start justify-between gap-2 px-3 py-3">
                  <div>
                    <h2 className="text-sm font-semibold">
                      {stage.label}{" "}
                      <span className="ml-1 text-xs font-normal text-muted-foreground">
                        {leads.length}
                      </span>
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">{money(value)}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      title={`Editar título e cor de ${stage.label}`}
                      aria-label={`Editar título e cor de ${stage.label}`}
                      onClick={() => openStageEditor(stage)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      title={`Novo lead em ${stage.label}`}
                      onClick={() => openNew(stage.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 px-2 pb-3">
                  {leads.length ? (
                    leads.map((lead) => (
                      <article
                        key={lead.id}
                        draggable
                        onDragStart={(event) => event.dataTransfer.setData("text/plain", lead.id)}
                        className="rounded-xl border bg-card p-3 shadow-sm"
                        style={{ borderLeft: `3px solid ${stage.color}` }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex min-w-0 flex-1 items-center gap-3">
                            <span
                              aria-hidden="true"
                              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white"
                              style={{ backgroundColor: stage.color }}
                            >
                              {lead.title
                                .trim()
                                .split(/\s+/)
                                .slice(0, 2)
                                .map((part) => part[0])
                                .join("")
                                .toUpperCase()}
                            </span>
                            <div className="min-w-0">
                              <button
                                type="button"
                                className="text-left text-sm font-semibold hover:text-primary hover:underline"
                                onClick={() => openEdit(lead)}
                              >
                                {lead.title}
                              </button>
                              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                <Building2 className="mr-1 inline h-3 w-3" />
                                {(lead.client_id && clientNames.get(lead.client_id)) ||
                                  lead.company_name ||
                                  "Sem empresa"}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 shrink-0"
                            title="Editar lead"
                            onClick={() => openEdit(lead)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        {lead.contact_phone && (
                          <p className="mt-3 truncate text-xs text-muted-foreground">
                            <Phone className="mr-1 inline h-3 w-3" />
                            {lead.contact_phone}
                          </p>
                        )}
                        {lead.contact_email && (
                          <p className="mt-1 truncate text-xs text-muted-foreground">
                            <Mail className="mr-1 inline h-3 w-3" />
                            {lead.contact_email}
                          </p>
                        )}
                        <p className="mt-3 text-sm font-semibold">{money(lead.amount ?? 0)}</p>
                        {lead.expected_close_date && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            <CalendarDays className="mr-1 inline h-3 w-3" />
                            Previsão: {lead.expected_close_date.split("-").reverse().join("/")}
                          </p>
                        )}
                        {lead.source && (
                          <span className="mt-2 inline-block max-w-full truncate rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground">
                            {lead.source}
                          </span>
                        )}
                        <div className="mt-3 border-t pt-2">
                          <Select
                            value={lead.stage}
                            onValueChange={(stageValue) =>
                              move.mutate({ id: lead.id, stage: stageValue as Stage })
                            }
                            disabled={move.isPending}
                          >
                            <SelectTrigger
                              className="h-8 text-xs"
                              aria-label={`Etapa de ${lead.title}`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {stages.map((option) => (
                                <SelectItem key={option.id} value={option.id}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="grid flex-1 place-items-center py-12 text-center text-xs text-muted-foreground">
                      <div>
                        <Users className="mx-auto mb-2 h-5 w-5" />
                        Sem leads neste estágio
                      </div>
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-lg font-semibold">Origem de Leads</h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Quantidade de leads por origem no ambiente atual.
          </p>
          {origins.length ? (
            <div className="space-y-4">
              {origins.map(([source, count]) => (
                <div key={source}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{source}</span>
                    <strong>{count}</strong>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(count / filtered.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Nenhum lead encontrado.
            </p>
          )}
        </div>
      )}

      <Dialog
        open={!!editingStage}
        onOpenChange={(open) => {
          if (!open) setEditingStage(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Editar coluna</DialogTitle>
            <DialogDescription>
              O título e a cor serão atualizados para todos neste ambiente.
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              saveStage.mutate();
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="crm-stage-label">Título da coluna</Label>
              <Input
                id="crm-stage-label"
                value={stageForm.label}
                maxLength={60}
                required
                onChange={(event) => setStageForm({ ...stageForm, label: event.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crm-stage-color">Cor da coluna</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="crm-stage-color"
                  type="color"
                  className="h-11 w-16 cursor-pointer p-1"
                  value={stageForm.color}
                  onChange={(event) => setStageForm({ ...stageForm, color: event.target.value })}
                />
                <span className="text-sm text-muted-foreground">
                  {stageForm.color.toUpperCase()}
                </span>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingStage(null)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={saveStage.isPending}>
                {saveStage.isPending ? "Salvando…" : "Salvar coluna"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar lead" : "Novo lead"}</DialogTitle>
            <DialogDescription>
              Registre a oportunidade e acompanhe sua etapa no pipeline.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={submit}>
            <div className="space-y-1.5">
              <Label htmlFor="crm-title">Nome do lead *</Label>
              <Input
                id="crm-title"
                required
                maxLength={180}
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                placeholder="Ex.: Projeto de consultoria"
              />
            </div>
            <div className="space-y-2">
              <Label>Empresa</Label>
              <div
                role="group"
                aria-label="Forma de informar a empresa"
                className="flex flex-wrap gap-2"
              >
                <Button
                  type="button"
                  size="sm"
                  variant={form.company_mode === "registered" ? "default" : "outline"}
                  aria-pressed={form.company_mode === "registered"}
                  onClick={() => setForm({ ...form, company_mode: "registered", client_id: "" })}
                >
                  Empresa cadastrada
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={form.company_mode === "name" ? "default" : "outline"}
                  aria-pressed={form.company_mode === "name"}
                  onClick={() => setForm({ ...form, company_mode: "name", client_id: "" })}
                >
                  Sem cadastro
                </Button>
              </div>
              {form.company_mode === "registered" ? (
                <div className="space-y-1.5">
                  <Label htmlFor="crm-client">Selecionar cliente cadastrado</Label>
                  <Select
                    value={form.client_id}
                    onValueChange={(clientId) => {
                      const selected = clients.data?.find((client) => client.id === clientId);
                      setForm({
                        ...form,
                        client_id: clientId,
                        company_name: selected?.name ?? form.company_name,
                      });
                    }}
                    disabled={clients.isLoading || clients.isError}
                  >
                    <SelectTrigger id="crm-client">
                      <SelectValue placeholder="Selecione uma empresa cadastrada" />
                    </SelectTrigger>
                    <SelectContent>
                      {(clients.data ?? [])
                        .filter((client) => client.is_active || client.id === form.client_id)
                        .map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                            {client.is_active ? "" : " (inativa)"}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {clients.isLoading && (
                    <p className="text-xs text-muted-foreground">Carregando empresas…</p>
                  )}
                  {clients.isError && (
                    <p className="text-xs text-destructive">
                      Não foi possível carregar as empresas cadastradas. Tente novamente.
                    </p>
                  )}
                  {!clients.isLoading && !clients.isError && !clients.data?.length && (
                    <p className="text-xs text-muted-foreground">
                      Nenhuma empresa cadastrada neste ambiente. Use “Sem cadastro”.
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-1.5">
                  <Label htmlFor="crm-company">Nome da empresa</Label>
                  <Input
                    id="crm-company"
                    maxLength={180}
                    value={form.company_name}
                    onChange={(event) => setForm({ ...form, company_name: event.target.value })}
                    placeholder="Digite o nome, sem criar um cadastro"
                  />
                </div>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="crm-email">E-mail</Label>
                <Input
                  id="crm-email"
                  type="email"
                  value={form.contact_email}
                  onChange={(event) => setForm({ ...form, contact_email: event.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="crm-phone">Telefone</Label>
                <Input
                  id="crm-phone"
                  type="tel"
                  value={form.contact_phone}
                  onChange={(event) => setForm({ ...form, contact_phone: event.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="crm-source">Origem do lead</Label>
                <Input
                  id="crm-source"
                  value={form.source}
                  onChange={(event) => setForm({ ...form, source: event.target.value })}
                  placeholder="Ex.: Indicação"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="crm-stage">Etapa</Label>
                <Select
                  value={form.stage}
                  onValueChange={(value) => setForm({ ...form, stage: value as Stage })}
                >
                  <SelectTrigger id="crm-stage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        {stage.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="crm-amount">Valor previsto (R$)</Label>
                <Input
                  id="crm-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.amount}
                  onChange={(event) => setForm({ ...form, amount: event.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="crm-date">Previsão de fechamento</Label>
                <Input
                  id="crm-date"
                  type="date"
                  value={form.expected_close_date}
                  onChange={(event) =>
                    setForm({ ...form, expected_close_date: event.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crm-notes">Observações</Label>
              <Textarea
                id="crm-notes"
                rows={4}
                value={form.notes}
                onChange={(event) => setForm({ ...form, notes: event.target.value })}
              />
            </div>
            <DialogFooter className="flex-row justify-between sm:justify-between">
              {editing ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => setDeleting(editing)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Excluir
                </Button>
              ) : (
                <span />
              )}
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setEditorOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={save.isPending}>
                  {save.isPending ? "Salvando…" : "Salvar lead"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={!!deleting}
        onOpenChange={(open) => {
          if (!open) setDeleting(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir este lead?</AlertDialogTitle>
            <AlertDialogDescription>
              O lead “{deleting?.title}” será removido do CRM. Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              disabled={remove.isPending}
              onClick={(event) => {
                event.preventDefault();
                if (deleting) remove.mutate(deleting.id);
              }}
            >
              Excluir lead
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
