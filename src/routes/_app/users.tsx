import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useClients, useProfiles } from "@/hooks/use-data";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { Archive, Plus, ShieldCheck, User as UserIcon, UserCheck, UserX } from "lucide-react";

export const Route = createFileRoute("/_app/users")({ component: UsersPage });

const ACCESS_OPTIONS = [
  ["dashboard", "Dashboard"], ["tasks", "Tarefas"], ["notes", "Anotações"], ["import_ata", "Importar ata"],
  ["clients", "Clientes"], ["reports", "Relatórios"], ["portal", "Portal do cliente"], ["calendar", "Calendário"],
  ["trash", "Lixeira"], ["settings", "Personalizar"],
] as const;
type Role = "admin" | "collaborator" | "client";
type FormState = { fullName: string; email: string; password: string; role: Role; permissions: string[]; clientId: string };
const defaults: FormState = { fullName: "", email: "", password: "", role: "collaborator", permissions: ["dashboard", "tasks", "notes"], clientId: "" };
const roleLabel: Record<Role, string> = { admin: "Administrador", collaborator: "Colaboradores", client: "Cliente" };

function AccessForm({ value, onChange, includeCredentials = false }: { value: FormState; onChange: (next: FormState) => void; includeCredentials?: boolean }) {
  const { data: clients = [] } = useClients();
  const toggle = (permission: string) => onChange({ ...value, permissions: value.permissions.includes(permission) ? value.permissions.filter((item) => item !== permission) : [...value.permissions, permission] });
  return <div className="space-y-4">
    {includeCredentials && <><div className="space-y-2"><Label>Nome completo</Label><Input value={value.fullName} onChange={(e) => onChange({ ...value, fullName: e.target.value })} required /></div><div className="space-y-2"><Label>Login (e-mail)</Label><Input type="email" value={value.email} onChange={(e) => onChange({ ...value, email: e.target.value })} required /></div><div className="space-y-2"><Label>Senha provisória</Label><Input type="password" minLength={6} value={value.password} onChange={(e) => onChange({ ...value, password: e.target.value })} required /></div></>}
    <div className="space-y-2"><Label>Categoria</Label><select className="h-10 w-full rounded-md border bg-background px-3 text-sm" value={value.role} onChange={(e) => onChange({ ...value, role: e.target.value as Role, permissions: e.target.value === "client" ? ["portal"] : value.permissions })}><option value="collaborator">Colaboradores</option><option value="client">Cliente</option><option value="admin">Administrador</option></select></div>
    {value.role === "client" && <div className="space-y-2"><Label>Cliente vinculado</Label><select required className="h-10 w-full rounded-md border bg-background px-3 text-sm" value={value.clientId} onChange={(e) => onChange({ ...value, clientId: e.target.value })}><option value="">Selecione o cliente</option>{clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</select><p className="text-xs text-muted-foreground">Este usuário verá somente as tarefas e faturas deste cliente.</p></div>}
    <div className="space-y-2"><Label>Acessos do sistema</Label><p className="text-xs text-muted-foreground">Administradores possuem acesso completo automaticamente.</p><div className="grid grid-cols-2 gap-2 rounded-md border p-3">{ACCESS_OPTIONS.map(([key, label]) => <label key={key} className="flex cursor-pointer items-center gap-2 text-sm"><Checkbox checked={value.role === "admin" || value.permissions.includes(key)} disabled={value.role === "admin"} onCheckedChange={() => toggle(key)} />{label}</label>)}</div></div>
  </div>;
}

function UsersPage() {
  const { isAdmin, user, loading } = useAuth(); const qc = useQueryClient(); const { data: profiles = [] } = useProfiles();
  const [createOpen, setCreateOpen] = useState(false); const [editing, setEditing] = useState<string | null>(null); const [form, setForm] = useState<FormState>(defaults);
  const { data: roles = [] } = useQuery({ queryKey: ["roles"], queryFn: async () => (await supabase.from("user_roles").select("user_id, role")).data ?? [] });
  const { data: clientLinks = [] } = useQuery({ queryKey: ["client_user_links"], queryFn: async () => ((await (supabase.from("client_user_links" as any) as any).select("user_id, client_id")).data ?? []) as { user_id: string; client_id: string }[] });
  const { data: permissionRows = [] } = useQuery({ queryKey: ["user_permissions"], queryFn: async () => ((await (supabase.from("user_permissions") as any).select("user_id, permissions")).data ?? []) as { user_id: string; permissions: string[] }[] });
  const invokeAccessManager = async (action: "create" | "update", data: Record<string, unknown>) => {
    const { data: result, error } = await supabase.functions.invoke("admin-user-access", { body: { action, data } });
    if (error) throw error;
    if (result?.error) throw new Error(result.error);
    return result;
  };
  const refresh = () => { qc.invalidateQueries({ queryKey: ["profiles"] }); qc.invalidateQueries({ queryKey: ["roles"] }); qc.invalidateQueries({ queryKey: ["user_permissions"] }); qc.invalidateQueries({ queryKey: ["client_user_links"] }); };
  const createMutation = useMutation({ mutationFn: () => invokeAccessManager("create", form), onSuccess: () => { refresh(); setCreateOpen(false); setForm(defaults); toast.success("Acesso criado com sucesso."); }, onError: (e: any) => toast.error(e?.message ?? "Erro ao criar acesso") });
  const updateMutation = useMutation({ mutationFn: () => invokeAccessManager("update", { userId: editing!, role: form.role, permissions: form.permissions, clientId: form.clientId || null }), onSuccess: () => { refresh(); setEditing(null); toast.success("Acessos atualizados."); }, onError: (e: any) => toast.error(e?.message ?? "Erro ao atualizar acessos") });
  const setActive = useMutation({ mutationFn: async ({ userId, active }: { userId: string; active: boolean }) => { const { error } = await (supabase.from("profiles") as any).update({ is_active: active }).eq("id", userId); if (error) throw error; }, onSuccess: () => { qc.invalidateQueries({ queryKey: ["profiles"] }); toast.success("Status atualizado"); }, onError: (e: any) => toast.error(e.message) });
  const activeProfiles = useMemo(() => profiles.filter((p) => (p as any).is_active !== false), [profiles]); const inactiveProfiles = useMemo(() => profiles.filter((p) => (p as any).is_active === false), [profiles]);
  const openEdit = (id: string) => { const role = (roles.find((r: { user_id: string; role: string }) => r.user_id === id)?.role ?? "collaborator") as Role; setForm({ ...defaults, role, permissions: permissionRows.find((p) => p.user_id === id)?.permissions ?? [], clientId: clientLinks.find((link) => link.user_id === id)?.client_id ?? "" }); setEditing(id); };
  if (loading) return <div className="p-6 text-sm text-muted-foreground">Carregando…</div>; if (!isAdmin) return <Navigate to="/dashboard" />;
  const renderProfile = (p: any) => { const role = (roles.find((r: { user_id: string; role: string }) => r.user_id === p.id)?.role ?? "collaborator") as Role; const self = p.id === user?.id; return <Card key={p.id} className="p-4"><div className="flex items-center gap-3"><Avatar className="h-12 w-12"><AvatarImage src={p.avatar_url || undefined} alt={p.full_name || p.email || "Usuário"} /><AvatarFallback>{(p.full_name || p.email || "?").slice(0, 2).toUpperCase()}</AvatarFallback></Avatar><div className="min-w-0 flex-1"><h3 className="truncate font-semibold">{p.full_name || "Sem nome"}</h3><p className="truncate text-xs text-muted-foreground">{p.email}</p></div>{role === "admin" ? <ShieldCheck className="h-4 w-4 text-primary" /> : <UserIcon className="h-4 w-4 text-muted-foreground" />}</div><div className="mt-3 flex gap-1"><Badge variant={role === "admin" ? "default" : "secondary"}>{roleLabel[role]}</Badge>{self && <Badge variant="outline">Você</Badge>}</div><div className="mt-3 border-t pt-3"><Button size="sm" variant="outline" className="w-full" onClick={() => openEdit(p.id)}>Definir categoria e acessos</Button>{!self && <Button size="sm" variant="outline" className="mt-2 w-full" onClick={() => setActive.mutate({ userId: p.id, active: false })}><UserX className="mr-1 h-3 w-3" /> Desativar acesso</Button>}</div></Card>; };
  return <div className="space-y-6 p-6"><header className="flex flex-wrap items-start justify-between gap-3"><div><h1 className="text-2xl font-bold tracking-tight">Usuários</h1><p className="text-sm text-muted-foreground">Crie logins e defina os acessos de cada usuário.</p></div><Dialog open={createOpen} onOpenChange={setCreateOpen}><DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> Novo usuário</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Criar acesso</DialogTitle><DialogDescription>O login e a senha abaixo dão acesso ao sistema conforme as permissões escolhidas.</DialogDescription></DialogHeader><AccessForm value={form} onChange={setForm} includeCredentials /><DialogFooter><Button disabled={createMutation.isPending} onClick={() => createMutation.mutate()}>{createMutation.isPending ? "Criando…" : "Criar acesso"}</Button></DialogFooter></DialogContent></Dialog></header><div><h2 className="mb-3 text-sm font-semibold text-muted-foreground">Ativos ({activeProfiles.length})</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{activeProfiles.map(renderProfile)}</div></div>{inactiveProfiles.length > 0 && <div><h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground"><Archive className="h-4 w-4" /> Desativados ({inactiveProfiles.length})</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{inactiveProfiles.map((p: any) => <Card key={p.id} className="border-dashed p-4 opacity-75"><p className="font-medium">{p.full_name || p.email}</p><Button size="sm" className="mt-3 w-full" variant="outline" onClick={() => setActive.mutate({ userId: p.id, active: true })}><UserCheck className="mr-1 h-3 w-3" /> Reativar acesso</Button></Card>)}</div></div>}<Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}><DialogContent><DialogHeader><DialogTitle>Definir acessos</DialogTitle><DialogDescription>Escolha a categoria e as áreas disponíveis no menu para este usuário.</DialogDescription></DialogHeader><AccessForm value={form} onChange={setForm} /><DialogFooter><Button disabled={updateMutation.isPending} onClick={() => updateMutation.mutate()}>{updateMutation.isPending ? "Salvando…" : "Salvar acessos"}</Button></DialogFooter></DialogContent></Dialog></div>;
}
