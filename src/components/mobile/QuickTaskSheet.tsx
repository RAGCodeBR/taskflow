import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useAssignableProfiles, useClients, useColumns, useTaskStatuses } from "@/hooks/use-data";
import { dayKey } from "@/lib/mobile-task-groups";
import { createQuickTask } from "@/lib/quick-task";

export type QuickTaskValues = {
  title: string;
  clientId: string;
  assigneeId: string;
  dueDate: string;
};

type Props = {
  open: boolean;
  onOpenChange(open: boolean): void;
  workspaceId?: string | null;
  defaults?: { dueDate?: string; columnId?: string | null };
  /** Abre o formulário completo com o que já foi digitado. */
  onMoreDetails(values: QuickTaskValues): void;
};

const selectClass =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Criação rápida do celular: título, cliente, responsável e prazo. */
export function QuickTaskSheet({
  open,
  onOpenChange,
  workspaceId,
  defaults,
  onMoreDetails,
}: Props) {
  const { user, activeWorkspace } = useAuth();
  const queryClient = useQueryClient();
  const targetWorkspaceId = workspaceId || activeWorkspace?.id || null;
  const { data: clients = [] } = useClients(workspaceId ?? undefined);
  const { data: people = [] } = useAssignableProfiles(workspaceId ?? undefined);
  const { data: columns = [] } = useColumns(workspaceId ?? undefined);
  const { data: statuses = [] } = useTaskStatuses(workspaceId ?? undefined);
  const [values, setValues] = useState<QuickTaskValues>({
    title: "",
    clientId: "",
    assigneeId: "",
    dueDate: "",
  });
  const [saving, setSaving] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  const today = dayKey(new Date());
  const tomorrow = dayKey(new Date(Date.now() + 86_400_000));

  useEffect(() => {
    if (!open) return;
    setValues({
      title: "",
      clientId: "",
      assigneeId: user?.id ?? "",
      dueDate: defaults?.dueDate ?? today,
    });
    // iOS só abre o teclado se o foco vier logo após o toque.
    const timer = window.setTimeout(() => titleRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const set = (patch: Partial<QuickTaskValues>) =>
    setValues((current) => ({ ...current, ...patch }));

  const submit = async () => {
    if (!user || saving) return;
    if (!values.title.trim()) {
      titleRef.current?.focus();
      toast.error("Informe o título da tarefa.");
      return;
    }
    if (!values.dueDate) {
      toast.error("Defina um prazo antes de criar a tarefa.");
      return;
    }
    setSaving(true);
    try {
      const { queued } = await createQuickTask(
        {
          id: crypto.randomUUID(),
          title: values.title,
          clientId: values.clientId || null,
          assigneeId: values.assigneeId || null,
          dueDate: values.dueDate || null,
          columnId: defaults?.columnId ?? columns[0]?.id ?? null,
          statusId: statuses.find((status) => !status.is_completed)?.id ?? null,
          workspaceId: targetWorkspaceId,
          userId: user.id,
          now: new Date().toISOString(),
        },
        queryClient,
      );
      toast.success(
        queued ? "Tarefa salva neste aparelho. Será sincronizada ao reconectar." : "Tarefa criada",
      );
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível criar a tarefa.");
    } finally {
      setSaving(false);
    }
  };

  const chip = (label: string, value: string) => (
    <button
      type="button"
      aria-pressed={values.dueDate === value}
      className={`h-11 rounded-full border px-4 text-sm font-medium transition-colors ${
        values.dueDate === value
          ? "border-primary bg-primary text-primary-foreground"
          : "bg-background active:bg-muted"
      }`}
      onClick={() => set({ dueDate: value })}
    >
      {label}
    </button>
  );

  return (
    <Drawer open={open} onOpenChange={(next) => !saving && onOpenChange(next)}>
      <DrawerContent className="max-h-[92dvh] pb-[env(safe-area-inset-bottom)]">
        <DrawerHeader className="pb-2 text-left">
          <DrawerTitle>Nova tarefa</DrawerTitle>
          <DrawerDescription className="sr-only">Criação rápida de tarefa</DrawerDescription>
        </DrawerHeader>
        <form
          className="space-y-4 overflow-y-auto px-4 pb-4"
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}
        >
          <Input
            ref={titleRef}
            value={values.title}
            onChange={(event) => set({ title: event.target.value })}
            placeholder="O que precisa ser feito?"
            aria-label="Título"
            enterKeyHint="done"
            className="h-12 text-base"
          />
          <div className="space-y-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Prazo
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {chip("Hoje", today)}
              {chip("Amanhã", tomorrow)}
              <input
                type="date"
                aria-label="Escolher data"
                value={values.dueDate}
                required
                onChange={(event) => set({ dueDate: event.target.value })}
                className="h-11 min-w-0 flex-1 rounded-full border bg-background px-3 text-sm"
              />
            </div>
          </div>
          <label className="block space-y-1">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Cliente
            </span>
            <select
              className={selectClass}
              value={values.clientId}
              onChange={(event) => set({ clientId: event.target.value })}
            >
              <option value="">Sem cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Responsável
            </span>
            <select
              className={selectClass}
              value={values.assigneeId}
              onChange={(event) => set({ assigneeId: event.target.value })}
            >
              <option value="">Sem responsável</option>
              {people.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.id === user?.id ? "Eu" : person.full_name || person.email}
                </option>
              ))}
            </select>
          </label>
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              className="h-12 flex-1"
              disabled={saving}
              onClick={() => {
                onOpenChange(false);
                onMoreDetails(values);
              }}
            >
              Mais detalhes
            </Button>
            <Button type="submit" className="h-12 flex-1" disabled={saving}>
              {saving ? "Criando…" : "Criar"}
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
