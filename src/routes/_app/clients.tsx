import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Archive,
  ArchiveRestore,
  ChevronDown,
  FileDown,
  Plus,
  Pencil,
  Trash2,
  Sparkles,
  Search,
  LoaderCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useClients, useProfiles, useSubtasks, type Client } from "@/hooks/use-data";
import { useWorkspaceTasks } from "@/hooks/use-workspace-tasks";
import { toast } from "sonner";

type ReportPeriod =
  "all" | "current_month" | "last_3_months" | "last_6_months" | "last_12_months" | "custom";

const reportPeriodLabels: Record<ReportPeriod, string> = {
  all: "Todo o período",
  current_month: "Mês atual",
  last_3_months: "Últimos 3 meses",
  last_6_months: "Últimos 6 meses",
  last_12_months: "Últimos 12 meses",
  custom: "Período personalizado",
};

const toInputDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const formatReportDate = (value: string | null | undefined) => {
  if (!value) return "Sem data informada";
  const date = value.length === 10 ? new Date(`${value}T12:00:00`) : new Date(value);
  return Number.isNaN(date.getTime()) ? "Sem data informada" : date.toLocaleDateString("pt-BR");
};

const getPeriodBounds = (period: ReportPeriod, customStart: string, customEnd: string) => {
  if (period === "all") return { start: "", end: "" };
  if (period === "custom") return { start: customStart, end: customEnd };

  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  if (period === "last_3_months") start.setMonth(start.getMonth() - 2);
  if (period === "last_6_months") start.setMonth(start.getMonth() - 5);
  if (period === "last_12_months") start.setMonth(start.getMonth() - 11);
  return { start: toInputDate(start), end: toInputDate(today) };
};

const stripHtml = (value: string | null) => {
  if (!value) return "";
  const element = document.createElement("div");
  element.innerHTML = value;
  return (element.textContent || element.innerText || "").replace(/\s+/g, " ").trim();
};

const filenamePart = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

const preloadImage = (src: string) =>
  new Promise<boolean>((resolve) => {
    const image = new Image();
    const timeout = window.setTimeout(() => finish(false), 8000);
    let settled = false;

    const finish = (loaded: boolean) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      resolve(loaded);
    };

    image.onload = () => finish(true);
    image.onerror = () => finish(false);
    image.src = src;
  });

const CLIENT_AVATAR_CACHE_KEY = "taskflow-client-avatar-urls";
const CLIENT_AVATAR_CACHE_TTL = 50 * 60 * 1000;

type CachedAvatar = { url: string; expiresAt: number; path?: string };

const getCachedAvatarUrls = (paths: Record<string, string> = {}): Record<string, string> => {
  if (typeof window === "undefined") return {};

  try {
    const cached = JSON.parse(
      window.sessionStorage.getItem(CLIENT_AVATAR_CACHE_KEY) ?? "{}",
    ) as Record<string, CachedAvatar>;
    const now = Date.now();
    const valid = Object.fromEntries(
      Object.entries(cached)
        .filter(
          ([clientId, entry]) =>
            entry?.url && entry.expiresAt > now && entry.path === paths[clientId],
        )
        .map(([clientId, entry]) => [clientId, entry.url]),
    );
    window.sessionStorage.setItem(
      CLIENT_AVATAR_CACHE_KEY,
      JSON.stringify(
        Object.fromEntries(
          Object.entries(cached).filter(([, entry]) => entry?.url && entry.expiresAt > now),
        ),
      ),
    );
    return valid;
  } catch {
    return {};
  }
};

const cacheAvatarUrls = (urls: Record<string, string>, paths: Record<string, string>) => {
  if (typeof window === "undefined" || Object.keys(urls).length === 0) return;

  try {
    const cached = JSON.parse(
      window.sessionStorage.getItem(CLIENT_AVATAR_CACHE_KEY) ?? "{}",
    ) as Record<string, CachedAvatar>;
    const expiresAt = Date.now() + CLIENT_AVATAR_CACHE_TTL;
    Object.entries(urls).forEach(([clientId, url]) => {
      cached[clientId] = { url, expiresAt, path: paths[clientId] };
    });
    window.sessionStorage.setItem(CLIENT_AVATAR_CACHE_KEY, JSON.stringify(cached));
  } catch {
    // A lista segue funcional se o navegador bloquear o armazenamento local.
  }
};

export const Route = createFileRoute("/_app/clients")({
  component: Outlet,
});

export function ClientsIndexPage() {
  const qc = useQueryClient();
  const { user } = useAuth();
  const { data: clients = [] } = useClients();
  const { data: tasks = [] } = useWorkspaceTasks();
  const { data: subtasks = [] } = useSubtasks();
  const { data: profiles = [] } = useProfiles();
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
  const [statusFilter, setStatusFilter] = useState<"active" | "inactive" | "all">("active");
  const [avatarUrls, setAvatarUrls] = useState<Record<string, string>>({});
  const [avatarsReady, setAvatarsReady] = useState(false);
  const [avatarBatchKey, setAvatarBatchKey] = useState("");
  const [reportClient, setReportClient] = useState<Client | null>(null);
  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>("all");
  const [reportScope, setReportScope] = useState<"completed" | "all">("completed");
  const [reportStart, setReportStart] = useState("");
  const [reportEnd, setReportEnd] = useState("");
  const [reportIncludeDescription, setReportIncludeDescription] = useState(false);
  const [reportIncludeSubtasks, setReportIncludeSubtasks] = useState(false);
  const [reportShowAssignee, setReportShowAssignee] = useState(false);
  const [reportAssigneeIds, setReportAssigneeIds] = useState<string[]>([]);
  const [generatingReport, setGeneratingReport] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadAvatarUrls = async () => {
      const clientsWithAvatar = clients.filter((client) => client.avatar_path);
      const clientAvatarPaths = Object.fromEntries(
        clientsWithAvatar.map((client) => [client.id, client.avatar_path!]),
      );
      const currentBatchKey = clientsWithAvatar
        .map((client) => `${client.id}:${client.avatar_path}`)
        .sort()
        .join("|");
      const cachedUrls = getCachedAvatarUrls(clientAvatarPaths);
      const visibleCachedUrls = Object.fromEntries(
        clientsWithAvatar
          .filter((client) => cachedUrls[client.id])
          .map((client) => [client.id, cachedUrls[client.id]]),
      );
      const clientsToLoad = clientsWithAvatar.filter((client) => !visibleCachedUrls[client.id]);

      setAvatarUrls(visibleCachedUrls);

      if (clientsWithAvatar.length === 0) {
        if (!cancelled) {
          setAvatarUrls({});
          setAvatarsReady(true);
          setAvatarBatchKey(currentBatchKey);
        }
        return;
      }

      if (clientsToLoad.length === 0) {
        if (!cancelled) {
          setAvatarsReady(true);
          setAvatarBatchKey(currentBatchKey);
        }
        return;
      }

      setAvatarsReady(false);

      const { data } = await supabase.storage.from("task-attachments").createSignedUrls(
        clientsToLoad.map((client) => client.avatar_path!),
        3600,
      );

      const urlByPath = new Map((data ?? []).map((item) => [item.path, item.signedUrl] as const));
      const candidates = clientsToLoad
        .map((client) => [client.id, urlByPath.get(client.avatar_path!)] as const)
        .filter((entry): entry is readonly [string, string] => Boolean(entry[1]));
      const verified = await Promise.all(
        candidates.map(async ([clientId, url]) =>
          (await preloadImage(url)) ? ([clientId, url] as const) : null,
        ),
      );

      if (!cancelled) {
        const loadedUrls = Object.fromEntries(
          verified.filter((entry): entry is readonly [string, string] => entry !== null),
        );
        cacheAvatarUrls(loadedUrls, clientAvatarPaths);
        setAvatarUrls({ ...visibleCachedUrls, ...loadedUrls });
        setAvatarsReady(true);
        setAvatarBatchKey(currentBatchKey);
      }
    };

    void loadAvatarUrls();
    return () => {
      cancelled = true;
    };
  }, [clients]);
  const filteredClients = clients.filter((client) => {
    const term = search.trim().toLocaleLowerCase("pt-BR");
    // Treat clients created before the migration as active until the database update runs.
    const isActive = client.is_active !== false;
    const matchesStatus =
      statusFilter === "all" || (statusFilter === "active" ? isActive : !isActive);

    return (
      matchesStatus &&
      (client.name.toLocaleLowerCase("pt-BR").includes(term) ||
        client.description?.toLocaleLowerCase("pt-BR").includes(term))
    );
  });
  const currentAvatarBatchKey = clients
    .filter((client) => client.avatar_path)
    .map((client) => `${client.id}:${client.avatar_path}`)
    .sort()
    .join("|");
  const shouldWaitForLogos =
    Boolean(currentAvatarBatchKey) && (!avatarsReady || avatarBatchKey !== currentAvatarBatchKey);

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
      await supabase.from("clients").update(clientData).eq("id", edit.id);
    } else {
      await supabase.from("clients").insert({ ...clientData, created_by: user?.id });
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

  const setClientActive = async (client: Client, isActive: boolean) => {
    const action = isActive ? "reativar" : "inativar";
    const description = isActive
      ? `Reativar o cliente "${client.name}"? Ele voltará a aparecer nas listas de clientes ativos.`
      : `Inativar o cliente "${client.name}"? Nenhuma tarefa, histórico, dado ou anexo será excluído.`;
    if (!confirm(description)) return;
    const { error } = await supabase
      .from("clients")
      .update({ is_active: isActive })
      .eq("id", client.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    await qc.invalidateQueries({ queryKey: ["clients"] });
    toast.success(isActive ? "Cliente reativado" : "Cliente inativado");
  };

  const openReport = (client: Client) => {
    setReportClient(client);
    setReportPeriod("all");
    setReportScope("completed");
    setReportStart("");
    setReportEnd("");
    setReportIncludeDescription(false);
    setReportIncludeSubtasks(false);
    setReportShowAssignee(false);
    setReportAssigneeIds([]);
  };

  const generateReport = async () => {
    if (!reportClient) return;
    const { start, end } = getPeriodBounds(reportPeriod, reportStart, reportEnd);
    if (start && end && start > end) {
      toast.error("A data inicial não pode ser posterior à data final.");
      return;
    }
    if (reportShowAssignee && !reportAssigneeIds.length) {
      toast.error("Selecione ao menos um colaborador para o relatório.");
      return;
    }

    setGeneratingReport(true);
    try {
      const isCompleted = (task: (typeof tasks)[number]) =>
        task.status === "done" || !!task.completed_at;
      const taskDate = (task: (typeof tasks)[number]) =>
        (isCompleted(task) ? task.completed_at : task.due_date || task.created_at)?.slice(0, 10) ??
        "";
      const inPeriod = (task: (typeof tasks)[number]) => {
        const date = taskDate(task);
        return (!start || date >= start) && (!end || date <= end);
      };
      const reportTasks = tasks
        .filter((task) => task.client_id === reportClient.id)
        .filter((task) => reportScope === "all" || isCompleted(task))
        .filter(
          (task) =>
            !reportShowAssignee ||
            (!!task.assignee_id && reportAssigneeIds.includes(task.assignee_id)),
        )
        .filter(inPeriod)
        .sort(
          (a, b) =>
            taskDate(a).localeCompare(taskDate(b)) || a.title.localeCompare(b.title, "pt-BR"),
        );
      const assignees = new Map(
        profiles.map((profile) => [
          profile.id,
          profile.full_name || profile.email || "Colaborador sem nome",
        ]),
      );
      const subtasksByTask = new Map<string, typeof subtasks>();
      subtasks.forEach((subtask) => {
        const current = subtasksByTask.get(subtask.task_id) ?? [];
        current.push(subtask);
        subtasksByTask.set(subtask.task_id, current);
      });

      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      let y = 18;
      const ensureSpace = (height: number) => {
        if (y + height <= pageHeight - 16) return;
        pdf.addPage();
        y = 18;
      };
      const text = (
        value: string,
        size = 10,
        style: "normal" | "bold" = "normal",
        color: [number, number, number] = [35, 45, 65],
      ) => {
        pdf.setFont("helvetica", style);
        pdf.setFontSize(size);
        pdf.setTextColor(...color);
        const lines = pdf.splitTextToSize(value, contentWidth);
        const height = Math.max(5, lines.length * (size * 0.42 + 0.8));
        ensureSpace(height);
        pdf.text(lines, margin, y);
        y += height;
      };
      const gap = (height = 3) => {
        ensureSpace(height);
        y += height;
      };
      const section = (title: string) => {
        gap(3);
        ensureSpace(9);
        pdf.setDrawColor(210, 218, 230);
        pdf.line(margin, y, pageWidth - margin, y);
        y += 5;
        text(title, 12, "bold", [20, 54, 103]);
        gap(1);
      };

      const completedCount = reportTasks.filter(isCompleted).length;
      const pendingCount = reportTasks.length - completedCount;
      text("Relatório de entregas", 19, "bold", [20, 54, 103]);
      text(reportClient.name, 13, "bold");
      text(
        `Gerado em ${new Date().toLocaleDateString("pt-BR")} · ${reportPeriodLabels[reportPeriod]}`,
        9,
        "normal",
        [90, 100, 120],
      );
      gap(3);
      section("Resumo");
      text(
        `Entregas concluídas: ${completedCount} | Pendências: ${pendingCount} | Total listado: ${reportTasks.length}`,
      );
      text(
        `Escopo: ${reportScope === "completed" ? "somente entregas concluídas" : "entregas concluídas e pendências"}.`,
      );
      if (start || end)
        text(
          `Período: ${start ? formatReportDate(start) : "início"} a ${end ? formatReportDate(end) : "hoje"}.`,
        );

      const completedTasks = reportTasks.filter(isCompleted);
      section("Entregas realizadas");
      if (!completedTasks.length) {
        text(
          "Nenhuma entrega concluída foi encontrada para os filtros selecionados.",
          10,
          "normal",
          [90, 100, 120],
        );
      }
      completedTasks.forEach((task, index) => {
        ensureSpace(18);
        text(`${index + 1}. ${task.title}`, 11, "bold");
        text(`Concluída em: ${formatReportDate(task.completed_at)}`, 9, "normal", [70, 80, 100]);
        if (reportShowAssignee)
          text(
            `Responsável: ${task.assignee_id ? (assignees.get(task.assignee_id) ?? "Colaborador não localizado") : "Não atribuído"}`,
            9,
            "normal",
            [70, 80, 100],
          );
        const description = reportIncludeDescription ? stripHtml(task.description) : "";
        if (description) text(description, 9);
        const taskSubtasks = reportIncludeSubtasks
          ? (subtasksByTask.get(task.id) ?? []).filter((subtask) => subtask.done)
          : [];
        if (taskSubtasks.length) {
          text("Subtarefas concluídas:", 9, "bold");
          taskSubtasks.forEach((subtask) =>
            text(
              `• ${subtask.title}${subtask.completed_at ? ` — ${formatReportDate(subtask.completed_at)}` : ""}`,
              9,
            ),
          );
        }
        gap(3);
      });

      if (reportScope === "all") {
        const pendingTasks = reportTasks.filter((task) => !isCompleted(task));
        section("Pendências");
        if (!pendingTasks.length)
          text("Não há pendências para os filtros selecionados.", 10, "normal", [90, 100, 120]);
        pendingTasks.forEach((task, index) => {
          ensureSpace(15);
          text(`${index + 1}. ${task.title}`, 11, "bold");
          text(`Prazo: ${formatReportDate(task.due_date)}`, 9, "normal", [70, 80, 100]);
          if (reportShowAssignee)
            text(
              `Responsável: ${task.assignee_id ? (assignees.get(task.assignee_id) ?? "Colaborador não localizado") : "Não atribuído"}`,
              9,
              "normal",
              [70, 80, 100],
            );
          const description = reportIncludeDescription ? stripHtml(task.description) : "";
          if (description) text(description, 9);
          gap(3);
        });
      }

      pdf.save(`relatorio-entregas-${filenamePart(reportClient.name) || "cliente"}.pdf`);
      setReportClient(null);
      toast.success("Relatório PDF gerado.");
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível gerar o relatório PDF.");
    } finally {
      setGeneratingReport(false);
    }
  };

  const selectedReportAssignees = profiles.filter((profile) =>
    reportAssigneeIds.includes(profile.id),
  );
  const toggleReportAssignee = (profileId: string) => {
    setReportAssigneeIds((current) =>
      current.includes(profileId)
        ? current.filter((id) => id !== profileId)
        : [...current, profileId],
    );
  };

  return (
    <div className="min-h-full bg-background px-5 py-6 md:px-8 md:py-7">
      <div className="mx-auto max-w-[1280px]">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border/70 pb-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Base de relacionamento
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Clientes</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {clients.length} cliente{clients.length === 1 ? "" : "s"} cadastrado
              {clients.length === 1 ? "" : "s"} no TaskFlow.
            </p>
          </div>
          <Button asChild className="rounded-full px-4">
            <Link to="/clients/new">
              <Plus className="mr-2 h-4 w-4" />
              Novo cliente
            </Link>
          </Button>
        </header>

        <section className="flex flex-wrap items-center gap-x-5 gap-y-3 py-5">
          <div className="relative min-w-[240px] flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome ou informação do cliente..."
              className="h-10 rounded-full border-0 bg-muted/55 pl-10 shadow-none focus-visible:ring-1"
            />
          </div>
          <div className="flex items-center gap-1 text-sm" aria-label="Filtrar clientes por status">
            {(
              [
                ["all", "Todos"],
                ["active", "Ativos"],
                ["inactive", "Inativos"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setStatusFilter(value)}
                className={`rounded-full px-3 py-1.5 transition-colors ${statusFilter === value ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="ml-auto text-xs text-muted-foreground">
            {filteredClients.length} resultado{filteredClients.length === 1 ? "" : "s"}
          </p>
        </section>

        <section className="border-t border-border/70">
          <div className="hidden grid-cols-[minmax(280px,1.4fr)_minmax(140px,.7fr)_minmax(250px,1fr)_auto] gap-6 border-b border-border/70 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground md:grid">
            <span>Cliente</span>
            <span>Atividades</span>
            <span>Informações</span>
            <span className="text-right">Ações</span>
          </div>
          {shouldWaitForLogos ? (
            <div className="grid min-h-72 place-items-center border-b border-border/60 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <LoaderCircle className="h-4 w-4 animate-spin" /> Carregando clientes…
              </div>
            </div>
          ) : (
            filteredClients.map((c) => {
              const count = tasks.filter((t) => t.client_id === c.id).length;
              const isActive = c.is_active !== false;
              return (
                <article
                  key={c.id}
                  className={`grid gap-4 border-b border-border/60 px-2 py-4 transition-colors hover:bg-muted/35 md:grid-cols-[minmax(280px,1.4fr)_minmax(140px,.7fr)_minmax(250px,1fr)_auto] md:items-center md:gap-6 md:px-4 ${isActive ? "" : "opacity-65"}`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {avatarUrls[c.id] ? (
                      <img
                        src={avatarUrls[c.id]}
                        alt={`Logo de ${c.name}`}
                        className="block h-11 w-11 shrink-0 rounded-xl border border-border bg-muted object-contain p-0.5"
                      />
                    ) : (
                      <div
                        className="h-11 w-11 shrink-0 rounded-xl shadow-sm"
                        style={{ background: c.color || "#1e3a8a" }}
                      />
                    )}
                    <div className="min-w-0">
                      <h2 className="truncate font-semibold">{c.name}</h2>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {isActive ? "Cliente ativo" : "Cliente inativo"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="text-lg font-semibold tabular-nums">{count}</span>
                    <span className="ml-1 text-xs text-muted-foreground">
                      tarefa{count === 1 ? "" : "s"}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {c.description || c.responsible || c.email || "Sem informações adicionais."}
                  </p>
                  <div className="flex items-center gap-0.5 md:justify-end">
                    <Button
                      size="icon"
                      variant="ghost"
                      title="Gerar relatório PDF"
                      onClick={() => openReport(c)}
                    >
                      <FileDown className="h-4 w-4 text-primary" />
                    </Button>
                    <Button asChild size="icon" variant="ghost" title="Relatório IA">
                      <Link to="/client-report/$clientId" params={{ clientId: c.id }}>
                        <Sparkles className="h-4 w-4 text-primary" />
                      </Link>
                    </Button>
                    <Button asChild size="icon" variant="ghost" title="Editar cliente">
                      <Link to="/clients/$clientId/edit" params={{ clientId: c.id }}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => void setClientActive(c, !isActive)}
                      title={isActive ? "Inativar cliente" : "Reativar cliente"}
                    >
                      {isActive ? (
                        <Archive className="h-4 w-4" />
                      ) : (
                        <ArchiveRestore className="h-4 w-4 text-primary" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      title="Excluir cliente"
                      onClick={() => remove(c)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </article>
              );
            })
          )}
          {clients.length === 0 && (
            <div className="py-16 text-center text-sm text-muted-foreground">
              Nenhum cliente cadastrado. Crie um para começar a organizar tarefas.
            </div>
          )}
          {clients.length > 0 && filteredClients.length === 0 && (
            <div className="py-16 text-center text-sm text-muted-foreground">
              Nenhum cliente encontrado neste filtro.
            </div>
          )}
        </section>
      </div>

      <Dialog open={!!reportClient} onOpenChange={(nextOpen) => !nextOpen && setReportClient(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Gerar relatório de entregas</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              O relatório de{" "}
              <span className="font-medium text-foreground">{reportClient?.name}</span> usa a data
              de conclusão das tarefas como data da entrega.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="report-period">Período</Label>
                <Select
                  value={reportPeriod}
                  onValueChange={(value) => setReportPeriod(value as ReportPeriod)}
                >
                  <SelectTrigger id="report-period">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(reportPeriodLabels) as [ReportPeriod, string][]).map(
                      ([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-scope">Conteúdo</Label>
                <Select
                  value={reportScope}
                  onValueChange={(value) => setReportScope(value as "completed" | "all")}
                >
                  <SelectTrigger id="report-scope">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Somente entregas concluídas</SelectItem>
                    <SelectItem value="all">Entregas e pendências</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {reportPeriod === "custom" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="report-start">Data inicial</Label>
                  <Input
                    id="report-start"
                    type="date"
                    value={reportStart}
                    onChange={(event) => setReportStart(event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="report-end">Data final</Label>
                  <Input
                    id="report-end"
                    type="date"
                    value={reportEnd}
                    onChange={(event) => setReportEnd(event.target.value)}
                  />
                </div>
              </div>
            )}
            <div className="space-y-3 rounded-md border p-3">
              <p className="text-sm font-medium">Detalhes no relatório</p>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <Checkbox
                  checked={reportShowAssignee}
                  onCheckedChange={(checked) => setReportShowAssignee(checked === true)}
                />
                Mostrar responsável (colaborador)
              </label>
              {reportShowAssignee && (
                <div className="space-y-2 pl-6">
                  <Label className="text-xs text-muted-foreground">
                    Colaboradores com tarefas no relatório
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-between font-normal"
                      >
                        <span className="truncate text-left">
                          {!profiles.length
                            ? "Carregando colaboradores..."
                            : selectedReportAssignees.length === 1
                              ? selectedReportAssignees[0].full_name ||
                                selectedReportAssignees[0].email ||
                                "Colaborador sem nome"
                              : `${selectedReportAssignees.length} colaboradores selecionados`}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-[var(--radix-popover-trigger-width)] p-2"
                    >
                      <p className="px-2 pb-2 pt-1 text-xs text-muted-foreground">
                        Selecione os colaboradores cujas tarefas devem aparecer.
                      </p>
                      <div
                        className="max-h-64 space-y-1 overflow-y-auto overscroll-contain pr-1"
                        onWheel={(event) => event.stopPropagation()}
                      >
                        {!!profiles.length && (
                          <label className="flex cursor-pointer items-center gap-2 rounded-sm border-b px-2 py-2 text-sm font-medium hover:bg-muted">
                            <Checkbox
                              checked={
                                selectedReportAssignees.length === profiles.length
                                  ? true
                                  : selectedReportAssignees.length
                                    ? "indeterminate"
                                    : false
                              }
                              onCheckedChange={() =>
                                setReportAssigneeIds(
                                  selectedReportAssignees.length === profiles.length
                                    ? []
                                    : profiles.map((profile) => profile.id),
                                )
                              }
                            />
                            <span>Selecionar todos</span>
                          </label>
                        )}
                        {profiles.map((profile) => (
                          <label
                            key={profile.id}
                            className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-muted"
                          >
                            <Checkbox
                              checked={reportAssigneeIds.includes(profile.id)}
                              onCheckedChange={() => toggleReportAssignee(profile.id)}
                            />
                            <span>
                              {profile.full_name || profile.email || "Colaborador sem nome"}
                            </span>
                          </label>
                        ))}
                        {!profiles.length && (
                          <p className="px-2 py-2 text-sm text-muted-foreground">
                            Nenhum colaborador disponível.
                          </p>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <Checkbox
                  checked={reportIncludeDescription}
                  onCheckedChange={(checked) => setReportIncludeDescription(checked === true)}
                />
                Mostrar descrição das tarefas
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <Checkbox
                  checked={reportIncludeSubtasks}
                  onCheckedChange={(checked) => setReportIncludeSubtasks(checked === true)}
                />
                Mostrar subtarefas concluídas
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setReportClient(null)}
              disabled={generatingReport}
            >
              Cancelar
            </Button>
            <Button type="button" onClick={() => void generateReport()} disabled={generatingReport}>
              <FileDown className="mr-2 h-4 w-4" />
              {generatingReport ? "Gerando..." : "Baixar PDF"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{edit ? "Editar" : "Novo"} cliente</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>CNPJ</Label>
                <Input value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Nome fantasia</Label>
                <Input value={tradeName} onChange={(e) => setTradeName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Razão social</Label>
                <Input value={legalName} onChange={(e) => setLegalName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Inscrição Estadual</Label>
                <Input
                  value={stateRegistration}
                  onChange={(e) => setStateRegistration(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Inscrição Municipal</Label>
                <Input
                  value={municipalRegistration}
                  onChange={(e) => setMunicipalRegistration(e.target.value)}
                />
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
            <div className="space-y-2">
              <Label>Responsável</Label>
              <Input value={responsible} onChange={(e) => setResponsible(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Input value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Cor</Label>
              <Input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10"
              />
            </div>
            <Button onClick={save} className="w-full">
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
