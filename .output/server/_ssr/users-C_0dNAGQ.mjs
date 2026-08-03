import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, g as useProfiles, D as Dialog, l as DialogTrigger, B as Button, a as DialogContent, b as DialogHeader, c as DialogTitle, m as DialogDescription, d as DialogFooter, C as Card, e as useClients, L as Label, I as Input } from "./router-DXKzFnT6.mjs";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./avatar-Cs2p32WM.mjs";
import { B as Badge } from "./badge-BTBDGtvX.mjs";
import { C as Checkbox } from "./checkbox-D8t29Ars.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-Bh9iiLf9.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as Plus, ag as Archive, ah as UserCheck, ab as ShieldCheck, ac as User, ai as UserX } from "../_libs/lucide-react.mjs";

import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/unenv.mjs";


import "../_libs/seroval-plugins.mjs";


import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/tslib.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/radix-ui__react-checkbox.mjs";
const ACCESS_OPTIONS = [["dashboard", "Dashboard"], ["tasks", "Tarefas"], ["notes", "Anotações"], ["import_ata", "Importar ata"], ["clients", "Clientes"], ["reports", "Relatórios"], ["portal", "Portal do cliente"], ["calendar", "Calendário"], ["trash", "Lixeira"], ["settings", "Personalizar"]];
const defaults = {
  fullName: "",
  email: "",
  password: "",
  role: "collaborator",
  permissions: ["dashboard", "tasks", "notes"],
  clientId: ""
};
const roleLabel = {
  admin: "Administrador",
  collaborator: "Colaboradores",
  client: "Cliente"
};
function AccessForm({
  value,
  onChange,
  includeCredentials = false
}) {
  const {
    data: clients = []
  } = useClients();
  const toggle = (permission) => onChange({
    ...value,
    permissions: value.permissions.includes(permission) ? value.permissions.filter((item) => item !== permission) : [...value.permissions, permission]
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    includeCredentials && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nome completo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: value.fullName, onChange: (e) => onChange({
          ...value,
          fullName: e.target.value
        }), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Login (e-mail)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: value.email, onChange: (e) => onChange({
          ...value,
          email: e.target.value
        }), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Senha provisória" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", minLength: 6, value: value.password, onChange: (e) => onChange({
          ...value,
          password: e.target.value
        }), required: true })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Categoria" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 w-full rounded-md border bg-background px-3 text-sm", value: value.role, onChange: (e) => onChange({
        ...value,
        role: e.target.value,
        permissions: e.target.value === "client" ? ["portal"] : value.permissions
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "collaborator", children: "Colaboradores" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "client", children: "Cliente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "admin", children: "Administrador" })
      ] })
    ] }),
    value.role === "client" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cliente vinculado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { required: true, className: "h-10 w-full rounded-md border bg-background px-3 text-sm", value: value.clientId, onChange: (e) => onChange({
        ...value,
        clientId: e.target.value
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Selecione o cliente" }),
        clients.map((client) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: client.id, children: client.name }, client.id))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Este usuário verá somente as tarefas e faturas deste cliente." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Acessos do sistema" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Administradores possuem acesso completo automaticamente." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 rounded-md border p-3", children: ACCESS_OPTIONS.map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: value.role === "admin" || value.permissions.includes(key), disabled: value.role === "admin", onCheckedChange: () => toggle(key) }),
        label
      ] }, key)) })
    ] })
  ] });
}
function UsersPage() {
  const {
    isAdmin,
    user,
    loading
  } = useAuth();
  const qc = useQueryClient();
  const {
    data: profiles = []
  } = useProfiles();
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(defaults);
  const {
    data: roles = []
  } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => (await supabase.from("user_roles").select("user_id, role")).data ?? []
  });
  const {
    data: clientLinks = []
  } = useQuery({
    queryKey: ["client_user_links"],
    queryFn: async () => (await supabase.from("client_user_links").select("user_id, client_id")).data ?? []
  });
  const {
    data: permissionRows = []
  } = useQuery({
    queryKey: ["user_permissions"],
    queryFn: async () => (await supabase.from("user_permissions").select("user_id, permissions")).data ?? []
  });
  const invokeAccessManager = async (action, data) => {
    const {
      data: result,
      error
    } = await supabase.functions.invoke("admin-user-access", {
      body: {
        action,
        data
      }
    });
    if (error) throw error;
    if (result?.error) throw new Error(result.error);
    return result;
  };
  const refresh = () => {
    qc.invalidateQueries({
      queryKey: ["profiles"]
    });
    qc.invalidateQueries({
      queryKey: ["roles"]
    });
    qc.invalidateQueries({
      queryKey: ["user_permissions"]
    });
    qc.invalidateQueries({
      queryKey: ["client_user_links"]
    });
  };
  const createMutation = useMutation({
    mutationFn: () => invokeAccessManager("create", form),
    onSuccess: () => {
      refresh();
      setCreateOpen(false);
      setForm(defaults);
      toast.success("Acesso criado com sucesso.");
    },
    onError: (e) => toast.error(e?.message ?? "Erro ao criar acesso")
  });
  const updateMutation = useMutation({
    mutationFn: () => invokeAccessManager("update", {
      userId: editing,
      role: form.role,
      permissions: form.permissions,
      clientId: form.clientId || null
    }),
    onSuccess: () => {
      refresh();
      setEditing(null);
      toast.success("Acessos atualizados.");
    },
    onError: (e) => toast.error(e?.message ?? "Erro ao atualizar acessos")
  });
  const setActive = useMutation({
    mutationFn: async ({
      userId,
      active
    }) => {
      const {
        error
      } = await supabase.from("profiles").update({
        is_active: active
      }).eq("id", userId);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["profiles"]
      });
      toast.success("Status atualizado");
    },
    onError: (e) => toast.error(e.message)
  });
  const activeProfiles = reactExports.useMemo(() => profiles.filter((p) => p.is_active !== false), [profiles]);
  const inactiveProfiles = reactExports.useMemo(() => profiles.filter((p) => p.is_active === false), [profiles]);
  const openEdit = (id) => {
    const role = roles.find((r) => r.user_id === id)?.role ?? "collaborator";
    setForm({
      ...defaults,
      role,
      permissions: permissionRows.find((p) => p.user_id === id)?.permissions ?? [],
      clientId: clientLinks.find((link) => link.user_id === id)?.client_id ?? ""
    });
    setEditing(id);
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-sm text-muted-foreground", children: "Carregando…" });
  if (!isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/dashboard" });
  const renderProfile = (p) => {
    const role = roles.find((r) => r.user_id === p.id)?.role ?? "collaborator";
    const self = p.id === user?.id;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-12 w-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: p.avatar_url || void 0, alt: p.full_name || p.email || "Usuário" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: (p.full_name || p.email || "?").slice(0, 2).toUpperCase() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-semibold", children: p.full_name || "Sem nome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: p.email })
        ] }),
        role === "admin" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: role === "admin" ? "default" : "secondary", children: roleLabel[role] }),
        self && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "Você" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 border-t pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "w-full", onClick: () => openEdit(p.id), children: "Definir categoria e acessos" }),
        !self && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "mt-2 w-full", onClick: () => setActive.mutate({
          userId: p.id,
          active: false
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "mr-1 h-3 w-3" }),
          " Desativar acesso"
        ] })
      ] })
    ] }, p.id);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Usuários" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Crie logins e defina os acessos de cada usuário." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: createOpen, onOpenChange: setCreateOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
          " Novo usuário"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Criar acesso" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "O login e a senha abaixo dão acesso ao sistema conforme as permissões escolhidas." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccessForm, { value: form, onChange: setForm, includeCredentials: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: createMutation.isPending, onClick: () => createMutation.mutate(), children: createMutation.isPending ? "Criando…" : "Criar acesso" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-3 text-sm font-semibold text-muted-foreground", children: [
        "Ativos (",
        activeProfiles.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: activeProfiles.map(renderProfile) })
    ] }),
    inactiveProfiles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "h-4 w-4" }),
        " Desativados (",
        inactiveProfiles.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: inactiveProfiles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-dashed p-4 opacity-75", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: p.full_name || p.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "mt-3 w-full", variant: "outline", onClick: () => setActive.mutate({
          userId: p.id,
          active: true
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "mr-1 h-3 w-3" }),
          " Reativar acesso"
        ] })
      ] }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editing, onOpenChange: (open) => !open && setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Definir acessos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Escolha a categoria e as áreas disponíveis no menu para este usuário." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccessForm, { value: form, onChange: setForm }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: updateMutation.isPending, onClick: () => updateMutation.mutate(), children: updateMutation.isPending ? "Salvando…" : "Salvar acessos" }) })
    ] }) })
  ] });
}
export {
  UsersPage as component
};
