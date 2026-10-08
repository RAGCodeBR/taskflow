import { useState } from "react";
import { Eye, Pin, PinOff } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useProfiles, useTaskCollaborators, type Task } from "@/hooks/use-data";
import { usePersonalTaskPins, useTaskCardOpens } from "@/hooks/use-task-card-activity";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { taskEditError } from "@/lib/task-edit";
import { isOffline } from "@/lib/offline-sync";

export function TaskPinButton({
  task,
  compact = false,
}: {
  task: Pick<Task, "id" | "status" | "completed_at">;
  compact?: boolean;
}) {
  const { pins, setPinned, canPin } = usePersonalTaskPins();
  const [saving, setSaving] = useState(false);
  const pinned = pins.some((pin) => pin.task_id === task.id && pin.is_pinned);
  if (!canPin) return null;
  const label = pinned ? "Desfixar prioridade pessoal" : "Fixar como prioridade pessoal";
  return (
    <Button
      type="button"
      size={compact ? "icon" : "sm"}
      variant="ghost"
      className={`${compact ? "h-6 w-6 shrink-0" : "gap-1.5"} ${pinned ? "text-amber-700 dark:text-amber-400" : ""}`}
      title={label}
      aria-label={label}
      aria-pressed={pinned}
      disabled={saving || (!pinned && (task.status === "done" || !!task.completed_at))}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={async (event) => {
        event.stopPropagation();
        setSaving(true);
        try {
          await setPinned(task.id, !pinned);
        } catch (error) {
          toast.error(taskEditError(error, "Não foi possível fixar a tarefa."));
        } finally {
          setSaving(false);
        }
      }}
    >
      {pinned ? <PinOff className="h-3.5 w-3.5" /> : <Pin className="h-3.5 w-3.5" />}
      {!compact && (pinned ? "Prioridade fixada" : "Fixar prioridade")}
    </Button>
  );
}

export function TaskCardOpenings({ task }: { task: Task }) {
  const { isClient } = useAuth();
  const [open, setOpen] = useState(false);
  const reads = useTaskCardOpens(task.id, open);
  const { data: profiles = [] } = useProfiles();
  const { data: collaborators = [] } = useTaskCollaborators();
  if (isClient) return null;
  const ids = new Set(
    [
      task.created_by,
      task.assignee_id,
      ...collaborators.filter((row) => row.task_id === task.id).map((row) => row.collaborator_id),
      ...(reads.data ?? []).map((row) => row.user_id),
    ].filter((id): id is string => !!id),
  );
  const timestamp = (value: string) =>
    new Date(value).toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="gap-1.5"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => event.stopPropagation()}
        >
          <Eye className="h-3.5 w-3.5" />
          Aberturas do card
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[min(24rem,calc(100vw-2rem))]"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-sm font-semibold">Aberturas do card</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Primeira e última abertura · horário de Brasília
        </p>
        {reads.isLoading ? (
          <p className="mt-3 text-xs">Carregando aberturas…</p>
        ) : reads.isError ? (
          <p className="mt-3 text-xs text-destructive">Não foi possível consultar as aberturas.</p>
        ) : (
          <div className="mt-3 max-h-72 space-y-3 overflow-y-auto">
            {[...ids].map((id) => {
              const profile = profiles.find((person) => person.id === id);
              const row = reads.data?.find((item) => item.user_id === id);
              return (
                <div key={id} className="border-t pt-2 text-xs">
                  <p className="font-medium">
                    {profile?.full_name || profile?.email || "Pessoa da equipe"}
                  </p>
                  {row ? (
                    <div className="mt-1 space-y-0.5 text-muted-foreground">
                      <p>Primeira: {timestamp(row.first_opened_at)}</p>
                      <p>Última: {timestamp(row.last_opened_at)}</p>
                    </div>
                  ) : (
                    <p className="mt-1 text-muted-foreground">
                      {isOffline() ? "Sem registro neste aparelho" : "Ainda não abriu"}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <p className="mt-3 border-t pt-2 text-[10px] text-muted-foreground">
          Registra a abertura da janela da tarefa a partir desta atualização. Não mede tempo
          trabalhado; aberturas offline aparecem após sincronizar.
        </p>
      </PopoverContent>
    </Popover>
  );
}
