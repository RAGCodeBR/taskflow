import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { enqueueOfflineOperation, isOffline } from "@/lib/offline-sync";

export const ALL_FIELDS = ["tags", "description", "subtasks", "attachments", "priority", "due", "createdAt", "meta"] as const;
export type CardField = (typeof ALL_FIELDS)[number];

export const FIELD_LABELS: Record<CardField, string> = {
  tags: "Etiquetas", description: "Descrição", subtasks: "Subtarefas", attachments: "Arquivos externos",
  priority: "Prioridade", due: "Prazo", createdAt: "Data de criação", meta: "Responsável e ações rápidas",
};

const DEFAULT_ORDER: CardField[] = ["tags", "description", "subtasks", "attachments", "priority", "due", "createdAt", "meta"];
export type KanbanOrientation = "vertical" | "horizontal";
export interface BoardPreferences { field_order: CardField[]; hidden_fields: CardField[]; kanban_orientation: KanbanOrientation; }
const DEFAULT_PREFS: BoardPreferences = { field_order: DEFAULT_ORDER, hidden_fields: [], kanban_orientation: "vertical" };

function migrateFields(fields: string[]): CardField[] {
  const out: CardField[] = [];
  for (const field of fields) {
    const next = field === "chips" ? ["priority", "due", "createdAt"] : field === "due" ? ["due", "createdAt"] : [field];
    for (const value of next) if ((ALL_FIELDS as readonly string[]).includes(value) && !out.includes(value as CardField)) out.push(value as CardField);
  }
  return out;
}

function normalize(prefs: Partial<BoardPreferences> | null | undefined): BoardPreferences {
  const order = migrateFields(Array.isArray(prefs?.field_order) ? prefs.field_order as string[] : []);
  return {
    field_order: [...order, ...DEFAULT_ORDER.filter((field) => !order.includes(field))],
    hidden_fields: migrateFields(Array.isArray(prefs?.hidden_fields) ? prefs.hidden_fields as string[] : []),
    kanban_orientation: prefs?.kanban_orientation === "horizontal" ? "horizontal" : "vertical",
  };
}

export function useBoardPreferences() {
  const { user, activeWorkspace } = useAuth();
  const qc = useQueryClient();
  return useQuery({
    queryKey: ["board_preferences", user?.id, activeWorkspace?.id],
    enabled: !!user && !!activeWorkspace?.id,
    queryFn: async (): Promise<BoardPreferences> => {
      if (!user || !activeWorkspace?.id) return DEFAULT_PREFS;
      const { data, error } = await supabase
        .from("board_preferences")
        .select("field_order, hidden_fields, kanban_orientation")
        .eq("user_id", user.id)
        .eq("workspace_id", activeWorkspace.id)
        .maybeSingle();
      if (error) throw error;
      const raw = data as Partial<BoardPreferences> | null;
      const normalized = normalize(raw);
      const rawOrder = Array.isArray(raw?.field_order) ? raw.field_order as string[] : [];
      const rawHidden = Array.isArray(raw?.hidden_fields) ? raw.hidden_fields as string[] : [];
      if (raw && (rawOrder.join("|") !== normalized.field_order.join("|") || rawHidden.join("|") !== normalized.hidden_fields.join("|"))) {
        void supabase
          .from("board_preferences")
          .update(normalized)
          .eq("user_id", user.id)
          .eq("workspace_id", activeWorkspace.id)
          .then(() => qc.setQueryData(["board_preferences", user.id, activeWorkspace.id], normalized));
      }
      return normalized;
    },
  });
}

export function useUpdateBoardPreferences() {
  const qc = useQueryClient(); const { user, activeWorkspace } = useAuth();
  return useMutation({
    mutationFn: async (patch: Partial<BoardPreferences>) => {
      if (!user || !activeWorkspace?.id) throw new Error("workspace not selected");
      const queryKey = ["board_preferences", user.id, activeWorkspace.id];
      const next = { ...(qc.getQueryData<BoardPreferences>(queryKey) ?? DEFAULT_PREFS), ...patch };
      if (isOffline()) {
        await enqueueOfflineOperation({ userId: user.id, entity: "record", action: "create", entityId: `${user.id}:${activeWorkspace.id}`, payload: { table: "board_preferences", record: { user_id: user.id, workspace_id: activeWorkspace.id, ...next }, upsert: true, onConflict: "user_id,workspace_id" } });
        return next;
      }
      const { data: existing, error: findError } = await supabase
        .from("board_preferences")
        .select("id")
        .eq("user_id", user.id)
        .eq("workspace_id", activeWorkspace.id)
        .maybeSingle();
      if (findError) throw findError;
      const { error } = existing
        ? await supabase.from("board_preferences").update(next).eq("id", existing.id)
        : await supabase.from("board_preferences").insert({ user_id: user.id, workspace_id: activeWorkspace.id, ...next });
      if (error) throw error;
      return next;
    },
    onMutate: async (patch) => {
      if (user && activeWorkspace?.id) {
        qc.setQueryData(["board_preferences", user.id, activeWorkspace.id], (current: BoardPreferences | undefined) => ({ ...(current ?? DEFAULT_PREFS), ...patch }));
      }
    },
    onSettled: () => {
      if (user && activeWorkspace?.id) {
        qc.invalidateQueries({ queryKey: ["board_preferences", user.id, activeWorkspace.id] });
      }
    },
  });
}
