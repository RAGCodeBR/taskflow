import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Check,
  Clock3,
  FileText,
  MessageCircle,
  Paperclip,
  Plus,
  Search,
  Send,
  Trash2,
  UserPlus,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useAssignableProfiles, useClients, useProfiles } from "@/hooks/use-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { MAX_TASK_ATTACHMENT_BYTES } from "@/lib/attachment-limits";
import { requestUnreadKey } from "@/hooks/use-request-unread";

export const Route = createFileRoute("/_app/requests")({ component: RequestsPage });

type Status = "new" | "in_progress" | "resolved";
type Request = {
  id: string;
  title: string;
  description: string | null;
  status: Status;
  priority: string;
  client_id: string | null;
  due_date: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
};
type Message = {
  id: string;
  request_id: string;
  body: string;
  author_id: string;
  created_at: string;
};
type Activity = {
  id: string;
  request_id: string;
  actor_id: string | null;
  kind: string;
  details: string | null;
  created_at: string;
};
type Attachment = {
  id: string;
  request_id: string;
  file_name: string;
  storage_path: string;
  uploaded_by: string;
  created_at: string;
};

const statusLabel: Record<Status, string> = {
  new: "Nova",
  in_progress: "Resolvendo",
  resolved: "Finalizada",
};
const priorityLabel: Record<string, string> = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  urgent: "Urgente",
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function RequestsPage() {
  const { user, isAdmin } = useAuth();
  const { data: profiles = [] } = useProfiles();
  const { data: mentionProfiles = [] } = useAssignableProfiles();
  const { data: clients = [] } = useClients();
  const qc = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    clientId: "",
    priority: "medium",
    dueDate: "",
  });
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["service_requests"],
    queryFn: async () => {
      const { data, error } = await (supabase.from("service_requests") as any)
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Request[];
    },
  });
  useEffect(() => {
    if (!user) return;
    void (async () => {
      const { error } = await (supabase.from("notifications") as any)
        .update({ is_read: true })
        .eq("user_id", user.id)
        .eq("type", "service_request")
        .eq("is_read", false);
      if (!error) void qc.invalidateQueries({ queryKey: requestUnreadKey(user.id) });
    })();
  }, [qc, user?.id]);
  const selected = selectedId
    ? (requests.find((request) => request.id === selectedId) ?? null)
    : null;
  const { data: messages = [] } = useQuery({
    queryKey: ["service_request_messages", selected?.id],
    enabled: !!selected,
    queryFn: async () => {
      const { data, error } = await (supabase.from("service_request_messages") as any)
        .select("*")
        .eq("request_id", selected!.id)
        .order("created_at");
      if (error) throw error;
      return (data ?? []) as Message[];
    },
  });
  const { data: activity = [] } = useQuery({
    queryKey: ["service_request_activity", selected?.id],
    enabled: !!selected,
    queryFn: async () => {
      const { data, error } = await (supabase.from("service_request_activity") as any)
        .select("*")
        .eq("request_id", selected!.id)
        .order("created_at");
      if (error) throw error;
      return (data ?? []) as Activity[];
    },
  });
  const { data: participants = [] } = useQuery({
    queryKey: ["service_request_participants", selected?.id],
    enabled: !!selected,
    queryFn: async () => {
      const { data, error } = await (supabase.from("service_request_participants") as any)
        .select("user_id")
        .eq("request_id", selected!.id);
      if (error) throw error;
      return (data ?? []) as { user_id: string }[];
    },
  });
  const { data: assignees = [] } = useQuery({
    queryKey: ["service_request_assignees", selected?.id],
    enabled: !!selected,
    queryFn: async () => {
      const { data, error } = await (supabase.from("service_request_assignees") as any)
        .select("user_id")
        .eq("request_id", selected!.id);
      if (error) throw error;
      return (data ?? []) as { user_id: string }[];
    },
  });
  const { data: allAssignees = [] } = useQuery({
    queryKey: ["service_request_assignees", "all"],
    queryFn: async () => {
      const { data, error } = await (supabase.from("service_request_assignees") as any).select(
        "request_id, user_id",
      );
      if (error) throw error;
      return (data ?? []) as { request_id: string; user_id: string }[];
    },
  });
  const { data: allParticipants = [] } = useQuery({
    queryKey: ["service_request_participants", "all"],
    queryFn: async () => {
      const { data, error } = await (supabase.from("service_request_participants") as any).select(
        "request_id, user_id",
      );
      if (error) throw error;
      return (data ?? []) as { request_id: string; user_id: string }[];
    },
  });
  const { data: attachments = [] } = useQuery({
    queryKey: ["service_request_attachments", selected?.id],
    enabled: !!selected,
    queryFn: async () => {
      const { data, error } = await (supabase.from("service_request_attachments") as any)
        .select("*")
        .eq("request_id", selected!.id)
        .order("created_at");
      if (error) throw error;
      return (data ?? []) as Attachment[];
    },
  });
  const nameOf = (id: string | null) =>
    profiles.find((profile) => profile.id === id)?.full_name ||
    profiles.find((profile) => profile.id === id)?.email ||
    "Usuário";
  const mentionableProfiles = useMemo(() => mentionProfiles, [mentionProfiles]);
  const mentionQuery = useMemo(() => {
    const match = message.match(/(?:^|\s)@([^\n@]*)$/);
    return match ? match[1].trim().toLocaleLowerCase("pt-BR") : null;
  }, [message]);
  const mentionCandidates = useMemo(() => {
    if (mentionQuery === null) return [];
    return mentionableProfiles
      .filter((profile) =>
        (profile.full_name || profile.email || "")
          .toLocaleLowerCase("pt-BR")
          .includes(mentionQuery),
      )
      .slice(0, 6);
  }, [mentionQuery, mentionableProfiles]);
  const mentionNames = mentionableProfiles
    .map((profile) => profile.full_name || profile.email)
    .filter((name): name is string => Boolean(name));
  const insertMention = (profile: { full_name: string | null; email: string | null }) => {
    const name = profile.full_name || profile.email;
    if (!name) return;
    setMessage((current) => current.replace(/(^|\s)@[^\n@]*$/, `$1@${name} `));
  };
  const refresh = () =>
    [
      "service_requests",
      "service_request_messages",
      "service_request_activity",
      "service_request_participants",
      "service_request_assignees",
      "service_request_attachments",
    ].forEach((key) => void qc.invalidateQueries({ queryKey: [key] }));
  const addActivity = async (requestId: string, kind: string, details: string) => {
    if (!user) return;
    await (supabase.from("service_request_activity") as any).insert({
      request_id: requestId,
      actor_id: user.id,
      kind,
      details,
    });
  };
  const createRequest = useMutation({
    mutationFn: async () => {
      if (!user || !form.title.trim()) throw new Error("Informe o assunto da solicitação.");
      const { data: requestId, error } = await (supabase.rpc as any)("create_service_request", {
        p_title: form.title.trim(),
        p_description: form.description.trim() || null,
        p_client_id: form.clientId || null,
        p_priority: form.priority,
        p_due_date: form.dueDate || null,
        p_participant_ids: selectedParticipants,
      });
      if (error) throw error;
      if (!requestId) throw new Error("Não foi possível criar a solicitação.");
      return { id: requestId };
    },
    onSuccess: (request) => {
      refresh();
      setSelectedId(request.id);
      setDialogOpen(false);
      setForm({ title: "", description: "", clientId: "", priority: "medium", dueDate: "" });
      setSelectedParticipants([]);
      toast.success("Solicitação criada.");
    },
    onError: (error: Error) => toast.error(error.message),
  });
  const sendMessage = useMutation({
    mutationFn: async () => {
      if (!selected || !user || !message.trim()) return;
      const { error } = await (supabase.from("service_request_messages") as any).insert({
        request_id: selected.id,
        author_id: user.id,
        body: message.trim(),
      });
      if (error) throw error;
      await (supabase.from("service_requests") as any)
        .update({ updated_at: new Date().toISOString() })
        .eq("id", selected.id);
    },
    onSuccess: () => {
      setMessage("");
      refresh();
    },
    onError: (error: Error) => toast.error(error.message),
  });
  const updateRequest = useMutation({
    mutationFn: async ({
      field,
      value,
      kind,
      label,
    }: {
      field: string;
      value: string;
      kind: string;
      label: string;
    }) => {
      if (!selected) return;
      const { error } = await (supabase.from("service_requests") as any)
        .update({ [field]: value })
        .eq("id", selected.id);
      if (error) throw error;
      await addActivity(selected.id, kind, label);
    },
    onSuccess: refresh,
    onError: (error: Error) => toast.error(error.message),
  });
  const addMember = useMutation({
    mutationFn: async ({ userId, kind }: { userId: string; kind: "assignee" | "participant" }) => {
      if (!selected || !user) return;
      const table =
        kind === "assignee" ? "service_request_assignees" : "service_request_participants";
      const personColumn = kind === "assignee" ? "assigned_by" : "added_by";
      const { error } = await (supabase.from(table) as any).insert({
        request_id: selected.id,
        user_id: userId,
        [personColumn]: user.id,
      });
      if (error && error.code !== "23505") throw error;
      await addActivity(
        selected.id,
        kind === "assignee" ? "assignee_added" : "participant_added",
        `${nameOf(userId)} ${kind === "assignee" ? "atribuído como responsável" : "adicionado como participante"}`,
      );
    },
    onSuccess: refresh,
    onError: (error: Error) => toast.error(error.message),
  });
  const cancelRequest = useMutation({
    mutationFn: async () => {
      if (!selected) return;
      const { error } = await (supabase.from("service_requests") as any)
        .delete()
        .eq("id", selected.id);
      if (error) throw error;
    },
    onSuccess: () => {
      setSelectedId(null);
      refresh();
      toast.success("Solicitação cancelada e removida.");
    },
    onError: (error: Error) => toast.error(error.message),
  });
  const uploadFiles = async (files: FileList) => {
    if (!selected || !user) return;
    const chosen = Array.from(files);
    const invalid = chosen.find((file) => file.size > MAX_TASK_ATTACHMENT_BYTES);
    if (invalid) return toast.error(`${invalid.name} ultrapassa 50 MB.`);
    setIsUploading(true);
    try {
      for (const file of chosen) {
        const path = `service-requests/${selected.id}/${crypto.randomUUID()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("service-request-attachments")
          .upload(path, file);
        if (uploadError) throw uploadError;
        const { error } = await (supabase.from("service_request_attachments") as any).insert({
          request_id: selected.id,
          file_name: file.name,
          storage_path: path,
          mime_type: file.type || null,
          size_bytes: file.size,
          uploaded_by: user.id,
        });
        if (error) throw error;
      }
      await addActivity(selected.id, "attachment_added", `${chosen.length} anexo(s) adicionado(s)`);
      refresh();
      toast.success("Anexo(s) incluído(s).");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível anexar.");
    } finally {
      setIsUploading(false);
    }
  };
  const filtered = requests.filter(
    (request) =>
      (filter === "all" || request.status === filter) &&
      `${request.title} ${clients.find((client) => client.id === request.client_id)?.name || ""}`
        .toLocaleLowerCase()
        .includes(search.trim().toLocaleLowerCase()),
  );
  const timeline = useMemo(
    () =>
      [
        ...messages.map((item) => ({ type: "message" as const, date: item.created_at, item })),
        ...activity.map((item) => ({ type: "activity" as const, date: item.created_at, item })),
      ].sort((a, b) => a.date.localeCompare(b.date)),
    [activity, messages],
  );
  return (
    <div className="flex h-full min-h-0 flex-col bg-background p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-muted-foreground">
            Central da equipe
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Gestão das solicitações</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Acompanhe atendimentos, responsáveis, conversas e documentos.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova solicitação
        </Button>
      </div>
      {!selected && (
        <>
          <div className="mb-3 flex flex-col gap-3 rounded-xl border bg-card p-3 shadow-sm sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-9"
                placeholder="Buscar por assunto ou cliente…"
              />
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">
              {filtered.length} solicitação(ões)
            </span>
          </div>
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
            {(["all", "new", "in_progress", "resolved"] as const).map((item) => {
              const count =
                item === "all"
                  ? requests.length
                  : requests.filter((request) => request.status === item).length;
              return (
                <Button
                  key={item}
                  size="sm"
                  variant={filter === item ? "default" : "outline"}
                  onClick={() => setFilter(item)}
                >
                  {item === "all" ? "Todas" : statusLabel[item]}{" "}
                  <span className="ml-1 opacity-70">{count}</span>
                </Button>
              );
            })}
          </div>
        </>
      )}
      <div
        className={`grid overflow-hidden rounded-xl border bg-card shadow-sm ${selected ? "min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_310px]" : "shrink-0"}`}
      >
        <ScrollArea className={selected ? "hidden" : "min-h-0"}>
          <div className="p-2 md:p-3">
            {isLoading ? (
              <p className="p-4 text-sm text-muted-foreground">Carregando…</p>
            ) : filtered.length === 0 ? (
              <div className="grid min-h-72 place-items-center p-6 text-center text-muted-foreground">
                <div>
                  <MessageCircle className="mx-auto mb-2 h-8 w-8" />
                  <p>Nenhuma solicitação neste filtro.</p>
                </div>
              </div>
            ) : (
              <div className="divide-y rounded-lg border bg-card">
                <div className="hidden grid-cols-[minmax(0,1fr)_220px_170px_110px] gap-4 bg-muted/45 px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-muted-foreground md:grid">
                  <span>Assunto / cliente</span>
                  <span>Status · prioridade</span>
                  <span>Responsáveis</span>
                  <span>Atualizado</span>
                </div>
                {filtered.map((request) => (
                  <button
                    key={request.id}
                    onClick={() => setSelectedId(request.id)}
                    className="grid w-full gap-3 px-4 py-3 text-left transition hover:bg-muted/70 md:grid-cols-[minmax(0,1fr)_220px_170px_110px] md:items-center"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 align-middle" />
                        {request.title}
                      </p>
                  <p className="mt-1 truncate text-xs text-primary/80">
                    {clients.find((client) => client.id === request.client_id)?.name ||
                      "Sem cliente vinculado"}
                  </p>
                  {request.description && (
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                      {request.description}
                    </p>
                  )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <StatusBadge status={request.status} />
                      <PriorityBadge priority={request.priority} />
                    </div>
                    <RequestMembers
                      assigneeIds={allAssignees
                        .filter((assignee) => assignee.request_id === request.id)
                        .map((assignee) => assignee.user_id)}
                      participantIds={allParticipants
                        .filter((participant) => participant.request_id === request.id)
                        .map((participant) => participant.user_id)}
                      nameOf={nameOf}
                    />
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(request.updated_at), "dd/MM/yyyy")}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
        {selected ? (
          <>
            <div className="flex min-h-0 flex-col">
              <div className="border-b bg-card p-4 md:px-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="-ml-2 mb-2"
                      onClick={() => setSelectedId(null)}
                    >
                      <ArrowLeft className="mr-1 h-4 w-4" />
                      Voltar para a lista
                    </Button>
                    <h2 className="max-w-3xl text-lg font-semibold leading-tight">
                      {selected.title}
                    </h2>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <StatusBadge status={selected.status} />
                      <PriorityBadge priority={selected.priority} />
                      <span className="text-xs text-muted-foreground">
                        Aberta em {format(new Date(selected.created_at), "dd/MM/yyyy 'às' HH:mm")}
                      </span>
                    </div>
                    <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
                      {selected.description || "Sem descrição."}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selected.status !== "in_progress" && selected.status !== "resolved" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          void updateRequest.mutateAsync({
                            field: "status",
                            value: "in_progress",
                            kind: "status_changed",
                            label: "Status alterado para Resolvendo",
                          })
                        }
                      >
                        Em andamento
                      </Button>
                    )}
                    {selected.status !== "resolved" && (
                      <Button
                        size="sm"
                        onClick={() =>
                          void updateRequest.mutateAsync({
                            field: "status",
                            value: "resolved",
                            kind: "status_changed",
                            label: "Solicitação finalizada",
                          })
                        }
                      >
                        <Check className="mr-1 h-4 w-4" />
                        Resolver
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <ScrollArea className="min-h-0 flex-1">
                <div className="space-y-3 p-4">
                  {timeline.map((entry) =>
                    entry.type === "activity" ? (
                      <div
                        key={entry.item.id}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <Clock3 className="h-3.5 w-3.5" />
                        <span>
                          {nameOf(entry.item.actor_id)} · {entry.item.details}
                        </span>
                        <span className="ml-auto">
                          {format(new Date(entry.date), "dd/MM HH:mm")}
                        </span>
                      </div>
                    ) : (
                      <div
                        key={entry.item.id}
                        className={`flex gap-2 ${entry.item.author_id === user?.id ? "justify-end" : ""}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${entry.item.author_id === user?.id ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                        >
                          <p className="mb-1 text-[11px] font-semibold opacity-70">
                            {entry.item.author_id === user?.id
                              ? "Você"
                              : nameOf(entry.item.author_id)}{" "}
                            · {format(new Date(entry.date), "dd/MM HH:mm")}
                          </p>
                          <p className="whitespace-pre-wrap break-words">
                            {mentionNames.length
                              ? entry.item.body
                                  .split(
                                    new RegExp(
                                      `(${mentionNames.map((name) => `@${escapeRegExp(name)}`).join("|")})`,
                                      "gi",
                                    ),
                                  )
                                  .map((part, index) =>
                                    part.startsWith("@") ? (
                                      <span
                                        key={index}
                                        className={
                                          entry.item.author_id === user?.id
                                            ? "font-semibold underline"
                                            : "font-semibold text-primary"
                                        }
                                      >
                                        {part}
                                      </span>
                                    ) : (
                                      part
                                    ),
                                  )
                              : entry.item.body}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </ScrollArea>
              <div className="relative border-t bg-card p-3 md:p-4">
                <div className="flex gap-2">
                  <div className="relative min-w-0 flex-1">
                    <Textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          void sendMessage.mutateAsync();
                        }
                      }}
                      placeholder="Adicione uma mensagem… Use @ para mencionar usuários."
                      rows={2}
                    />
                    {mentionCandidates.length > 0 && (
                      <div className="absolute bottom-[calc(100%+6px)] left-0 z-20 w-full max-w-sm overflow-hidden rounded-lg border bg-popover p-1 shadow-lg">
                        <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                          Mencionar alguém
                        </p>
                        {mentionCandidates.map((profile) => (
                          <button
                            key={profile.id}
                            type="button"
                            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => insertMention(profile)}
                          >
                            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-[9px] font-semibold text-primary">
                              {(profile.full_name || profile.email || "U").slice(0, 2).toUpperCase()}
                            </span>
                            <span className="truncate">{profile.full_name || profile.email}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button
                    size="icon"
                    disabled={!message.trim() || sendMessage.isPending}
                    onClick={() => void sendMessage.mutateAsync()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Use @ para mencionar alguém · Enter envia · Shift + Enter quebra linha
                </p>
              </div>
            </div>
            <ScrollArea className="min-w-0 border-t bg-muted/20 lg:border-l lg:border-t-0">
              <div className="space-y-3 p-3 md:p-4">
                <Section title="Situação" className="rounded-xl border bg-card p-3 shadow-sm">
                  <Label className="text-[10px]">Status</Label>
                  <div className="mt-2 grid grid-cols-3 rounded-full bg-muted p-1">
                    {(["new", "in_progress", "resolved"] as Status[]).map((status) => (
                      <button
                        key={status}
                        onClick={() =>
                          void updateRequest.mutateAsync({
                            field: "status",
                            value: status,
                            kind: "status_changed",
                            label: `Status alterado para ${statusLabel[status]}`,
                          })
                        }
                        className={`rounded-full px-2 py-1.5 text-[11px] font-medium transition ${selected.status === status ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        {statusLabel[status]}
                      </button>
                    ))}
                  </div>
                  <Label className="mt-3 block text-xs">Prioridade</Label>
                  <Select
                    value={selected.priority}
                    onValueChange={(value) =>
                      void updateRequest.mutateAsync({
                        field: "priority",
                        value,
                        kind: "priority_changed",
                        label: `Prioridade alterada para ${priorityLabel[value]}`,
                      })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(priorityLabel).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Section>
                <Section
                  title={`Responsáveis (${assignees.length})`}
                  className="rounded-xl border bg-card p-3 shadow-sm"
                >
                  <ProfileChips ids={assignees.map((item) => item.user_id)} nameOf={nameOf} />
                  <Select
                    onValueChange={(userId) =>
                      void addMember.mutateAsync({ userId, kind: "assignee" })
                    }
                  >
                    <SelectTrigger className="mt-3 h-8 text-xs">
                      <UserPlus className="mr-1 h-3.5 w-3.5" />
                      <SelectValue placeholder="Atribuir responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      {profiles
                        .filter(
                          (profile) =>
                            profile.is_active !== false &&
                            !assignees.some((item) => item.user_id === profile.id),
                        )
                        .map((profile) => (
                          <SelectItem key={profile.id} value={profile.id}>
                            {profile.full_name || profile.email}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </Section>
                <Section
                  title={`Participantes (${participants.length})`}
                  className="rounded-xl border bg-card p-3 shadow-sm"
                >
                  <ProfileChips ids={participants.map((item) => item.user_id)} nameOf={nameOf} />
                  <Select
                    onValueChange={(userId) =>
                      void addMember.mutateAsync({ userId, kind: "participant" })
                    }
                  >
                    <SelectTrigger className="mt-3 h-8 text-xs">
                      <UserPlus className="mr-1 h-3.5 w-3.5" />
                      <SelectValue placeholder="Adicionar participante" />
                    </SelectTrigger>
                    <SelectContent>
                      {profiles
                        .filter(
                          (profile) =>
                            profile.is_active !== false &&
                            !participants.some((item) => item.user_id === profile.id),
                        )
                        .map((profile) => (
                          <SelectItem key={profile.id} value={profile.id}>
                            {profile.full_name || profile.email}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </Section>
                <Section
                  title={`Anexos (${attachments.length})`}
                  className="rounded-xl border bg-card p-3 shadow-sm"
                >
                  <input
                    id="request-files"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(event) => {
                      if (event.target.files) void uploadFiles(event.target.files);
                      event.currentTarget.value = "";
                    }}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full min-w-0"
                    disabled={isUploading}
                    onClick={() => document.getElementById("request-files")?.click()}
                  >
                    <Paperclip className="mr-2 h-4 w-4 shrink-0" />
                    <span className="truncate">
                      {isUploading ? "Enviando arquivo…" : "Adicionar anexo"}
                    </span>
                  </Button>
                  <div className="mt-2 space-y-1 overflow-hidden">
                    {attachments.map((attachment) => (
                      <button
                        key={attachment.id}
                        title={`Abrir ${attachment.file_name}`}
                        className="flex w-full min-w-0 items-center gap-2 rounded-md border bg-muted/30 p-2 text-left text-xs transition-colors hover:bg-muted"
                        onClick={async () => {
                          const { data } = await supabase.storage
                            .from("service-request-attachments")
                            .createSignedUrl(attachment.storage_path, 60);
                          if (data?.signedUrl)
                            window.open(data.signedUrl, "_blank", "noopener,noreferrer");
                        }}
                      >
                        <FileText className="h-3.5 w-3.5 shrink-0" />
                        <span className="min-w-0 flex-1 truncate">{attachment.file_name}</span>
                      </button>
                    ))}
                  </div>
                </Section>
                {(isAdmin || selected.created_by === user?.id) && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full border-destructive/40 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Cancelar solicitação
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancelar esta solicitação?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Ela será removida, juntamente com o histórico e os vínculos desta
                          solicitação. Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Voltar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={() => void cancelRequest.mutateAsync()}
                        >
                          Cancelar solicitação
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </ScrollArea>
          </>
        ) : null}
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova solicitação</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Assunto</Label>
              <Input
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                placeholder="Ex.: Documentos para cadastro"
              />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                placeholder="Explique o que precisa ser resolvido."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Cliente</Label>
                <Select
                  value={form.clientId || "none"}
                  onValueChange={(value) =>
                    setForm({ ...form, clientId: value === "none" ? "" : value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sem cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sem cliente</SelectItem>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Prioridade</Label>
                <Select
                  value={form.priority}
                  onValueChange={(value) => setForm({ ...form, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(priorityLabel).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Participantes</Label>
              <div className="mt-2 max-h-32 space-y-2 overflow-y-auto rounded-md border p-2">
                {profiles
                  .filter((profile) => profile.id !== user?.id && profile.is_active !== false)
                  .map((profile) => (
                    <label
                      key={profile.id}
                      className="flex cursor-pointer items-center gap-2 text-sm"
                    >
                      <Checkbox
                        checked={selectedParticipants.includes(profile.id)}
                        onCheckedChange={(checked) =>
                          setSelectedParticipants((current) =>
                            checked
                              ? [...current, profile.id]
                              : current.filter((id) => id !== profile.id),
                          )
                        }
                      />
                      {profile.full_name || profile.email}
                    </label>
                  ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              disabled={createRequest.isPending}
              onClick={() => void createRequest.mutateAsync()}
            >
              Criar solicitação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}

function RequestMembers({
  assigneeIds,
  participantIds,
  nameOf,
}: {
  assigneeIds: string[];
  participantIds: string[];
  nameOf: (id: string | null) => string;
}) {
  const people = [...new Set([...assigneeIds, ...participantIds])];
  return (
    <div className="min-w-0">
      {people.length > 0 ? (
        <>
          <div className="flex -space-x-1.5">
            {people.slice(0, 4).map((id) => (
              <span
                key={id}
                title={nameOf(id)}
                className="grid h-6 w-6 place-items-center rounded-full border-2 border-card bg-primary/10 text-[8px] font-bold text-primary"
              >
                {nameOf(id).slice(0, 2).toUpperCase()}
              </span>
            ))}
            {people.length > 4 && (
              <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-card bg-muted text-[9px] font-semibold text-muted-foreground">
                +{people.length - 4}
              </span>
            )}
          </div>
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {assigneeIds.length > 0 ? "Responsável" : "Participante"}
            {people.length > 1 ? " + equipe" : `: ${nameOf(people[0])}`}
          </p>
        </>
      ) : (
        <p className="text-xs text-muted-foreground">Sem responsável</p>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const classes: Record<Status, string> = {
    new: "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200",
    in_progress:
      "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/15 dark:text-violet-200",
    resolved:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-200",
  };
  return (
    <Badge
      variant="outline"
      className={`border px-2 py-0.5 text-[10px] font-semibold ${classes[status]}`}
    >
      {statusLabel[status]}
    </Badge>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const classes: Record<string, string> = {
    low: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/15 dark:text-sky-200",
    medium:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-200",
    high: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/15 dark:text-orange-200",
    urgent:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/15 dark:text-red-200",
  };
  return (
    <Badge
      variant="outline"
      className={`border px-2 py-0.5 text-[10px] font-semibold ${classes[priority] ?? classes.medium}`}
    >
      {priorityLabel[priority] ?? priority}
    </Badge>
  );
}
function ProfileChips({ ids, nameOf }: { ids: string[]; nameOf: (id: string) => string }) {
  return ids.length ? (
    <div className="space-y-1">
      {ids.map((id) => (
        <div key={id} className="flex items-center gap-2 text-sm">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-[10px] font-semibold">
            {nameOf(id).slice(0, 2).toUpperCase()}
          </span>
          {nameOf(id)}
        </div>
      ))}
    </div>
  ) : (
    <p className="text-sm text-muted-foreground">Ninguém atribuído.</p>
  );
}
