import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Data access layer for the TaskFlow screens.
 *
 * Most pages should read data through these hooks instead of calling Supabase directly.
 * That keeps cache keys, filters and real-time invalidation in one place. When this clean
 * copy points to a new database, the table names must still match the migrations under
 * supabase/migrations.
 */
export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "todo" | "in_progress" | "review" | "done" | null;
  status_id: string | null;
  priority: "low" | "medium" | "high" | "urgent" | null;
  due_date: string | null;
  due_time: string | null;
  assignee_id: string | null;
  assigned_by: string | null;
  assigned_at: string | null;
  client_id: string | null;
  column_id: string | null;
  position: number;
  color: string | null;
  completed_at: string | null;
  created_by: string | null;
  tag_id: string | null;
  interruptions: number;
  deleted_at: string | null;
  deleted_by: string | null;
  created_at: string;
  updated_at: string;
  card_width: number | null;
}
export interface TaskStatus {
  id: string;
  name: string;
  color: string;
  position: number;
  is_completed: boolean;
  is_active: boolean;
}
export interface TaskTag {
  id: string;
  name: string;
  color: string;
  position: number;
}
export interface KanbanColumn {
  id: string;
  name: string;
  color: string | null;
  position: number;
  client_id: string | null;
}
export interface Client {
  id: string;
  name: string;
  color: string | null;
  description: string | null;
  cnpj: string | null;
  legal_name: string | null;
  trade_name: string | null;
  state_registration: string | null;
  municipal_registration: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  responsible: string | null;
  avatar_path: string | null;
}
export interface ClientDepartment {
  id: string;
  client_id: string;
  name: string;
  description: string | null;
  position: number;
  created_at: string;
}
export interface ClientDepartmentEmployee {
  id: string;
  department_id: string;
  full_name: string;
  cbo: string | null;
  role: string | null;
  salary: number | null;
  activities: string | null;
  avatar_path: string | null;
  created_at: string;
}
export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  is_active?: boolean;
}

export interface TaskCollaborator {
  task_id: string;
  collaborator_id: string;
  added_by: string | null;
  created_at: string;
}

export interface ClientInvoice {
  id: string;
  client_id: string;
  description: string;
  amount: number;
  due_date: string;
  status: "open" | "paid";
  paid_at: string | null;
  payment_method: "pix" | "boleto" | "link";
  payment_link: string | null;
  pix_key: string | null;
  boleto_file_name: string | null;
  boleto_storage_path: string | null;
  boleto_mime_type: string | null;
  invoice_file_name: string | null;
  invoice_storage_path: string | null;
  invoice_mime_type: string | null;
  created_at: string;
}

export function useClientInvoices() {
  return useQuery({
    queryKey: ["client_invoices"],
    queryFn: async () => {
      // The generated Supabase types are refreshed separately; this cast keeps the
      // new migration usable immediately in the application.
      const { data, error } = await (supabase.from("client_invoices") as any)
        .select("*")
        .order("due_date", { ascending: true });
      if (error) throw error;
      return (data ?? []) as ClientInvoice[];
    },
  });
}


export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      // Soft-delete strategy: deleted tasks stay in the database, but normal screens hide them.
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .is("deleted_at", null)
        .order("position", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Task[];
    },
  });
}

export function useDeletedTasks() {
  return useQuery({
    queryKey: ["tasks", "deleted"],
    queryFn: async () => {
      // Trash page uses the opposite filter so records can be restored later.
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .not("deleted_at", "is", null)
        .order("deleted_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Task[];
    },
  });
}

export function useColumns() {
  return useQuery({
    queryKey: ["columns"],
    queryFn: async () => {
      // Kanban columns are global unless client_id is filled for client-specific boards.
      const { data, error } = await supabase.from("kanban_columns").select("*").order("position");
      if (error) throw error;
      return (data ?? []) as KanbanColumn[];
    },
  });
}

export interface UserColumnOrder { column_id: string; position: number }
export function useUserColumnOrder() {
  return useQuery({
    queryKey: ["user_column_order"],
    queryFn: async () => {
      // Per-user layout preferences are optional; anonymous/non-loaded users get the default order.
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id;
      if (!uid) return [] as UserColumnOrder[];
      const { data, error } = await supabase
        .from("user_column_order")
        .select("column_id, position")
        .eq("user_id", uid);
      if (error) throw error;
      return (data ?? []) as UserColumnOrder[];
    },
  });
}

export interface UserTaskOrder { task_id: string; position: number }
export function useUserTaskOrder() {
  return useQuery({
    queryKey: ["user_task_order"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id;
      if (!uid) return [] as UserTaskOrder[];
      const { data, error } = await supabase
        .from("user_task_order")
        .select("task_id, position")
        .eq("user_id", uid);
      if (error) throw error;
      return (data ?? []) as UserTaskOrder[];
    },
  });
}

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data, error } = await supabase.from("clients").select("*").order("name");
      if (error) throw error;
      return (data ?? []) as Client[];
    },
  });
}

export function useProfiles() {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await (supabase.from("profiles") as any).select("id, full_name, avatar_url, is_active");
      if (error) throw error;
      return (data ?? []) as Profile[];
    },
  });
}

export function useTaskCollaborators() {
  return useQuery({
    queryKey: ["task_collaborators"],
    queryFn: async () => {
      const { data, error } = await (supabase.from("task_collaborators") as any)
        .select("task_id, collaborator_id, added_by, created_at");
      if (error) throw error;
      return (data ?? []) as TaskCollaborator[];
    },
  });
}



export function useTaskTags() {
  return useQuery({
    queryKey: ["task_tags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("task_tags")
        .select("*")
        .order("position", { ascending: true })
        .order("name", { ascending: true });
      if (error) throw error;
      return (data ?? []) as TaskTag[];
    },
  });
}

export interface TaskTagLink { task_id: string; tag_id: string }
export function useTaskTagLinks() {
  return useQuery({
    queryKey: ["task_tag_links"],
    queryFn: async () => {
      const { data, error } = await supabase.from("task_tag_links").select("task_id, tag_id");
      if (error) throw error;
      return (data ?? []) as TaskTagLink[];
    },
  });
}

export interface Subtask {
  id: string;
  task_id: string;
  title: string;
  done: boolean;
  position: number;
  assignee_id: string | null;
  due_date: string | null;
  completed_at: string | null;
}
export function useSubtasks() {
  const qc = useQueryClient();

  useEffect(() => {
    // Realtime updates keep task/subtask counters fresh across browser tabs and team members.
    const channel = supabase
      .channel(`subtasks-cache-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "subtasks" },
        () => {
          void qc.invalidateQueries({ queryKey: ["subtasks"] });
          void qc.invalidateQueries({ queryKey: ["tasks"] });
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [qc]);

  return useQuery({
    queryKey: ["subtasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subtasks")
        .select("id, task_id, title, done, position, assignee_id, due_date, completed_at")
        .order("position");
      if (error) throw error;
      return (data ?? []) as Subtask[];
    },
  });
}

export function useTaskStatuses() {
  return useQuery({
    queryKey: ["task_statuses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("task_statuses")
        .select("*")
        .order("position");
      if (error) throw error;
      return (data ?? []) as TaskStatus[];
    },
  });
}
