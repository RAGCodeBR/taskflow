import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Check, MessagesSquare, ChevronLeft, Filter, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import {
  useProfiles,
  useRelatedClients,
  useTaskCollaborators,
  useTasks,
  type Profile,
} from "@/hooks/use-data";
import { TaskConversationPanel } from "@/components/TaskConversationPanel";
import {
  useMarkConversationRead,
  useMarkConversationUnread,
  useCloseTaskConversation,
  useTaskConversations,
} from "@/hooks/use-task-conversations";
import { sortRoomsByLastMessage, unreadInRoom } from "@/lib/task-conversations";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export const Route = createFileRoute("/_app/conversations")({
  validateSearch: (search: Record<string, unknown>): { task?: string } => ({
    task: typeof search.task === "string" ? search.task : undefined,
  }),
  component: ConversationsPage,
});

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Avatares empilhados de quem já falou nesta demanda. */
function ParticipantStack({ people }: { people: Profile[] }) {
  if (people.length === 0) return null;
  const shown = people.slice(0, 3);
  const extra = people.length - shown.length;
  return (
    <div className="flex items-center -space-x-2">
      {shown.map((person) => {
        const label = person.full_name || person.email || "?";
        return (
          <Avatar key={person.id} className="h-6 w-6 ring-2 ring-card">
            <AvatarImage src={person.avatar_url || undefined} alt={label} />
            <AvatarFallback className="bg-primary/10 text-[9px] font-semibold text-primary">
              {initials(label)}
            </AvatarFallback>
          </Avatar>
        );
      })}
      {extra > 0 && (
        <span className="grid h-6 w-6 place-items-center rounded-full bg-muted text-[9px] font-semibold text-muted-foreground ring-2 ring-card">
          +{extra}
        </span>
      )}
    </div>
  );
}

function ConversationsPage() {
  const { user, isAdmin } = useAuth();
  const { data: profiles = [] } = useProfiles();
  const { data: relatedClients = [] } = useRelatedClients();
  const { data: allTasks = [] } = useTasks();
  const { data: myCollaborations = [] } = useTaskCollaborators();
  const { task: taskFromUrl } = Route.useSearch();
  const navigate = useNavigate();
  const {
    roomTasks,
    myRoomIds,
    messagesByTask,
    lastReadByTask,
    manuallyUnreadTaskIds,
    allMessages,
    isLoading,
  } = useTaskConversations();
  const [selectedId, setSelectedId] = useState<string | null>(taskFromUrl ?? null);
  const markRead = useMarkConversationRead();
  const markUnread = useMarkConversationUnread();
  const closeConversation = useCloseTaskConversation();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerQuery, setPickerQuery] = useState("");
  const [roomTab, setRoomTab] = useState<"mine" | "others">("mine");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [closingConversationId, setClosingConversationId] = useState<string | null>(null);

  const profileById = useMemo(() => {
    const map = new Map<string, Profile>();
    profiles.forEach((profile) => map.set(profile.id, profile));
    return map;
  }, [profiles]);

  const clientNameById = useMemo(
    () => new Map(relatedClients.map((client) => [client.id, client.name])),
    [relatedClients],
  );

  const lastMessageAtByTask = useMemo(() => {
    const map = new Map<string, string>();
    messagesByTask.forEach((list, taskId) => {
      const last = list[list.length - 1];
      if (last) map.set(taskId, last.created_at);
    });
    return map;
  }, [messagesByTask]);

  // Quem já falou em cada demanda — mais recentes primeiro.
  const participantsByTask = useMemo(() => {
    const map = new Map<string, Profile[]>();
    messagesByTask.forEach((list, taskId) => {
      const seen = new Set<string>();
      const people: Profile[] = [];
      for (let i = list.length - 1; i >= 0; i -= 1) {
        const id = list[i].author_id;
        if (!id || seen.has(id)) continue;
        seen.add(id);
        const profile = profileById.get(id);
        if (profile) people.push(profile);
      }
      map.set(taskId, people);
    });
    return map;
  }, [messagesByTask, profileById]);

  const orderedRooms = useMemo(
    () => sortRoomsByLastMessage(roomTasks, lastMessageAtByTask),
    [roomTasks, lastMessageAtByTask],
  );

  // "Minhas conversas": salas em que eu participo. "Outras conversas": as que eu
  // só enxergo por ser admin do ambiente — leitura, sem entrar na conversa.
  const myOrderedRooms = useMemo(
    () => orderedRooms.filter((room) => myRoomIds.has(room.id)),
    [orderedRooms, myRoomIds],
  );
  const otherOrderedRooms = useMemo(
    () => orderedRooms.filter((room) => !myRoomIds.has(room.id)),
    [orderedRooms, myRoomIds],
  );
  const isOversightRoom = (id: string | null) =>
    !!id && !myRoomIds.has(id) && otherOrderedRooms.some((room) => room.id === id);

  const hasOversight = otherOrderedRooms.length > 0;
  const shownTab = hasOversight ? roomTab : "mine";
  const isRoomUnread = (roomId: string) =>
    manuallyUnreadTaskIds.has(roomId) ||
    (!!user?.id &&
      myRoomIds.has(roomId) &&
      unreadInRoom(allMessages, roomId, user.id, lastReadByTask.get(roomId)) > 0);
  const roomsForTab = shownTab === "others" ? otherOrderedRooms : myOrderedRooms;
  const unreadRoomTotal = useMemo(
    () => roomsForTab.filter((room) => isRoomUnread(room.id)).length,
    [roomsForTab, manuallyUnreadTaskIds, user?.id, myRoomIds, allMessages, lastReadByTask],
  );
  const visibleRooms = unreadOnly
    ? roomsForTab.filter((room) => isRoomUnread(room.id))
    : roomsForTab;

  // Deep-link da tarefa (vindo do card / editor) tem prioridade.
  useEffect(() => {
    if (taskFromUrl) setSelectedId(taskFromUrl);
  }, [taskFromUrl]);

  // Sem deep-link, a seleção padrão é sempre a PRIMEIRA das minhas conversas —
  // nunca uma sala que eu só fiscalizo. Só troca se a atual ficou órfã. Uma
  // tarefa escolhida em "Nova conversa" ainda não é sala (sem mensagem), então
  // também vale como conhecida.
  useEffect(() => {
    if (taskFromUrl) return;
    if (!selectedId) {
      setSelectedId(myOrderedRooms[0]?.id ?? null);
      return;
    }
    const known =
      orderedRooms.some((room) => room.id === selectedId) ||
      allTasks.some((task) => task.id === selectedId);
    if (!known) setSelectedId(myOrderedRooms[0]?.id ?? null);
  }, [orderedRooms, myOrderedRooms, selectedId, taskFromUrl, allTasks]);

  // Abrir uma sala — e cada mensagem nova enquanto ela está aberta — marca como
  // lida e derruba o indicador na hora.
  useEffect(() => {
    if (!user?.id || !selectedId) return;
    void markRead(selectedId);
  }, [user?.id, selectedId, allMessages.length, markRead]);

  const selected =
    orderedRooms.find((room) => room.id === selectedId) ??
    (selectedId
      ? (() => {
          const t = allTasks.find((task) => task.id === selectedId);
          return t ? { id: t.id, title: t.title, client_id: t.client_id } : null;
        })()
      : null);

  const roomIds = useMemo(() => new Set(orderedRooms.map((room) => room.id)), [orderedRooms]);

  // Só dá pra abrir conversa de uma demanda em que você participa — responsável,
  // criador ou colaborador. É o mesmo escopo que a RLS de comments aplica; sem
  // isso o picker ofereceria tarefas onde a primeira mensagem seria recusada.
  const myTaskIds = useMemo(() => {
    const ids = new Set<string>();
    if (!user?.id) return ids;
    myCollaborations.forEach((row) => {
      if (row.collaborator_id === user.id) ids.add(row.task_id);
    });
    return ids;
  }, [myCollaborations, user?.id]);

  const startableTasks = useMemo(() => {
    const term = pickerQuery.trim().toLocaleLowerCase("pt-BR");
    return allTasks
      .filter(
        (task) =>
          !task.completed_at &&
          task.status !== "done" &&
          !task.deleted_at &&
          !roomIds.has(task.id) &&
          (task.assignee_id === user?.id ||
            task.created_by === user?.id ||
            myTaskIds.has(task.id)) &&
          (!term || task.title.toLocaleLowerCase("pt-BR").includes(term)),
      )
      .slice(0, 40);
  }, [allTasks, roomIds, pickerQuery, user?.id, myTaskIds]);

  const openRoom = (id: string) => {
    setSelectedId(id);
    setPickerOpen(false);
    setPickerQuery("");
  };

  const openTask = (taskId: string) => {
    void navigate({ to: "/tasks/list", search: { task: taskId } });
  };

  const finishConversation = async (taskId: string) => {
    if (closingConversationId) return;
    setClosingConversationId(taskId);
    try {
      await closeConversation(taskId);
      if (selectedId === taskId) setSelectedId(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível concluir a conversa.");
    } finally {
      setClosingConversationId(null);
    }
  };

  const selectedParticipants = selected ? (participantsByTask.get(selected.id) ?? []) : [];
  const selectedClientName = selected?.client_id ? clientNameById.get(selected.client_id) : null;
  const nameOf = (id: string | null) =>
    (id && profileById.get(id)?.full_name) || (id && profileById.get(id)?.email) || "Alguém";

  const renderRoom = (room: (typeof orderedRooms)[number]) => {
    const list = messagesByTask.get(room.id) ?? [];
    const last = list[list.length - 1];
    const unread = isRoomUnread(room.id);
    const active = selectedId === room.id;
    const clientName = room.client_id ? clientNameById.get(room.client_id) : null;
    return (
      <ContextMenu key={room.id}>
        <ContextMenuTrigger asChild>
          <li>
            <button
              type="button"
              onClick={() => setSelectedId(room.id)}
              className={cn(
                "relative flex w-full flex-col gap-1 px-5 py-4 text-left transition-colors",
                active ? "bg-accent/60" : "hover:bg-accent/30",
              )}
            >
              {active && (
                <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-primary" />
              )}
              <div className="flex items-start gap-2">
                <span
                  className={cn(
                    "min-w-0 flex-1 font-display text-[13px] font-semibold leading-snug",
                    active ? "text-primary" : "text-foreground",
                  )}
                >
                  {room.title}
                </span>
                {unread && (
                  <span
                    aria-label="Conversa não lida"
                    className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#142e63] shadow-sm"
                  />
                )}
                <span
                  role="button"
                  tabIndex={0}
                  aria-label="Concluir conversa"
                  title="Concluir conversa"
                  aria-disabled={closingConversationId === room.id}
                  className={cn(
                    "grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-full text-[#142e63] transition-colors hover:bg-[#142e63]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    closingConversationId === room.id && "pointer-events-none opacity-40",
                  )}
                  onClick={(event) => {
                    event.stopPropagation();
                    void finishConversation(room.id);
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    event.stopPropagation();
                    void finishConversation(room.id);
                  }}
                >
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </div>
              {clientName && (
                <p className="line-clamp-1 text-xs font-medium text-primary/80">{clientName}</p>
              )}
              {last && (
                <p className="line-clamp-1 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/70">{nameOf(last.author_id)}</span>{" "}
                  {last.body}
                </p>
              )}
              <div className="mt-1 flex items-center justify-between">
                {last ? (
                  <span className="text-[11px] text-muted-foreground/70">
                    {formatDistanceToNow(new Date(last.created_at), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </span>
                ) : (
                  <span />
                )}
                <ParticipantStack people={participantsByTask.get(room.id) ?? []} />
              </div>
            </button>
          </li>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => void (unread ? markRead(room.id) : markUnread(room.id))}>
            {unread ? "Marcar como lida" : "Marcar como não lida"}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col [&_button:not(:disabled)]:cursor-pointer">
      <header className="flex items-center gap-3 border-b px-6 py-4">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
          <MessagesSquare className="h-[1.15rem] w-[1.15rem]" />
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-lg font-semibold leading-tight">Conversas</h1>
          <p className="text-xs text-muted-foreground">
            Uma conversa por demanda. Quando a conversa é concluída, o histórico pode ser acessado
            clicando no card da tarefa.
          </p>
        </div>
        <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline" className="shrink-0">
              <Plus className="mr-1.5 h-4 w-4" /> Nova conversa
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="border-b p-2">
              <Input
                autoFocus
                placeholder="Buscar tarefa…"
                value={pickerQuery}
                onChange={(event) => setPickerQuery(event.target.value)}
                className="h-8"
              />
            </div>
            <div className="max-h-72 overflow-y-auto p-1">
              {startableTasks.length === 0 ? (
                <p className="px-2 py-6 text-center text-xs text-muted-foreground">
                  Nenhuma tarefa sem conversa encontrada.
                </p>
              ) : (
                startableTasks.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => openRoom(task.id)}
                    className="block w-full truncate rounded px-2 py-1.5 text-left text-sm hover:bg-accent/60"
                  >
                    {task.title}
                  </button>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Demandas */}
        <aside
          className={cn(
            "w-full shrink-0 overflow-y-auto border-r bg-card sm:w-[22rem]",
            selected && "hidden sm:block",
          )}
        >
          {isLoading && <p className="p-6 text-sm text-muted-foreground">Carregando conversas…</p>}
          {!isLoading && orderedRooms.length === 0 && (
            <div className="px-6 py-16 text-center">
              <MessagesSquare className="mx-auto h-8 w-8 text-muted-foreground/40" />
              <p className="mt-3 text-sm text-muted-foreground">
                Nenhuma conversa por aqui ainda. Comente numa tarefa, ou seja mencionado em uma, e
                ela aparece nesta lista.
              </p>
            </div>
          )}

          <div className="flex items-center gap-1 border-b bg-card p-2">
            {hasOversight && (
              <>
                <button
                  type="button"
                  onClick={() => setRoomTab("mine")}
                  className={cn(
                    "flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                    shownTab === "mine"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent/50",
                  )}
                >
                  Minhas
                </button>
                <button
                  type="button"
                  onClick={() => setRoomTab("others")}
                  className={cn(
                    "flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                    shownTab === "others"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent/50",
                  )}
                >
                  Outras
                  <span className="ml-1 opacity-70">{otherOrderedRooms.length}</span>
                </button>
              </>
            )}
            <Button
              type="button"
              size="sm"
              variant={unreadOnly ? "default" : "ghost"}
              className={cn("h-8 gap-1.5 px-2 text-xs", !hasOversight && "ml-auto")}
              onClick={() => setUnreadOnly((current) => !current)}
            >
              <Filter className="h-3.5 w-3.5" />
              Não lidas
              {unreadRoomTotal > 0 && (
                <span
                  className={cn(
                    "grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-bold",
                    unreadOnly
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-[#142e63] text-white",
                  )}
                >
                  {unreadRoomTotal > 99 ? "99+" : unreadRoomTotal}
                </span>
              )}
            </Button>
          </div>

          {shownTab === "others" && (
            <p className="px-5 pb-1 pt-3 text-[11px] text-muted-foreground/70">
              Conversas do seu ambiente em que você não participa — só leitura.
            </p>
          )}

          {visibleRooms.length > 0 ? (
            <ul className="divide-y divide-border/60">{visibleRooms.map(renderRoom)}</ul>
          ) : (
            !isLoading &&
            orderedRooms.length > 0 && (
              <p className="px-5 py-10 text-center text-xs text-muted-foreground">
                {shownTab === "others"
                  ? "Nenhuma outra conversa por aqui."
                  : "Você ainda não participa de nenhuma conversa."}
              </p>
            )
          )}
        </aside>

        {/* Conversa */}
        <section className={cn("flex min-h-0 flex-1 flex-col", !selected && "hidden sm:flex")}>
          {selected ? (
            <>
              <div className="flex items-center gap-3 border-b bg-card px-5 py-3.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="-ml-2 sm:hidden"
                  onClick={() => setSelectedId(null)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => openTask(selected.id)}
                    title="Abrir tarefa em Minhas Tarefas"
                    className="block max-w-full cursor-pointer truncate text-left font-display text-base font-semibold transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {selected.title}
                  </button>
                  {selectedClientName && (
                    <span className="block truncate text-xs font-medium text-primary/80">
                      Cliente: {selectedClientName}
                    </span>
                  )}
                </div>
                {isOversightRoom(selectedId) && (
                  <span className="shrink-0 rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    Só leitura
                  </span>
                )}
                {selectedParticipants.length > 0 && (
                  <div className="flex shrink-0 items-center gap-2">
                    <ParticipantStack people={selectedParticipants} />
                    <span className="hidden text-xs text-muted-foreground sm:inline">
                      {selectedParticipants.length} na conversa
                    </span>
                  </div>
                )}
              </div>
              <TaskConversationPanel
                key={selected.id}
                taskId={selected.id}
                readOnly={isOversightRoom(selectedId)}
                readOnlyReason={
                  isOversightRoom(selectedId)
                    ? "Somente leitura — você não participa desta tarefa."
                    : undefined
                }
              />
            </>
          ) : (
            <div className="grid flex-1 place-items-center px-8 text-center">
              <div>
                <MessagesSquare className="mx-auto h-10 w-10 text-muted-foreground/30" />
                <p className="mt-4 text-sm text-muted-foreground">
                  Escolha uma demanda à esquerda para acompanhar a conversa.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
