import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, j as useProfiles, D as Dialog, v as DialogTrigger, B as Button, a as DialogContent, b as DialogHeader, c as DialogTitle, r as DialogDescription, d as DialogFooter, C as Card, e as useClients, L as Label, I as Input } from "./router-ZM7179_C.mjs";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./avatar-B30pnDzX.mjs";
import { B as Badge } from "./badge-D8s76cXv.mjs";
import { C as Checkbox } from "./checkbox-Bhd60i9o.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-Bh9iiLf9.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { C as Collapsible, a as CollapsibleTrigger, b as CollapsibleContent } from "./collapsible-DUtqt5i7.mjs";
import "../_libs/marked.mjs";
import "../_libs/seroval.mjs";
import { P as Plus, af as ShieldCheck, ag as User, C as ChevronDown, aj as Archive, ak as UserCheck, al as UserX, T as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
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
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "./server-DJ8sPH9h.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-CTknNXUw.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/date-fns.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/radix-ui__react-checkbox.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
const ACCESS_OPTIONS = [["dashboard", "Dashboard"], ["tasks", "Minhas tarefas"], ["import_ata", "Importar ata"], ["clients", "Clientes"], ["reports", "Relatórios"], ["mural", "Mural"], ["portal_entregas", "Calendário de entregas"], ["portal_financeiro", "Financeiro"], ["trash", "Lixeira"], ["settings", "Personalizar"]];
const defaults = {
  fullName: "",
  email: "",
  password: "",
  role: "collaborator",
  permissions: ["dashboard", "tasks", "import_ata", "clients", "reports", "mural", "portal_entregas", "portal_financeiro", "trash", "settings"],
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
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Categoria" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 w-full rounded-md border bg-background px-3 text-sm", value: value.role, onChange: (e) => onChange({
        ...value,
        role: e.target.value,
        permissions: e.target.value === "client" ? ["portal_entregas", "portal_financeiro"] : value.permissions
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
function UserDetailsForm({
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 border-b pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nome completo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: value.fullName, onChange: (event) => onChange({
        ...value,
        fullName: event.target.value
      }), required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nova senha" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", minLength: 6, value: value.password, onChange: (event) => onChange({
        ...value,
        password: event.target.value
      }), placeholder: "Deixe em branco para manter a senha atual" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "A nova senha deve ter ao menos 6 caracteres." })
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
  const {
    data: profileEmails = []
  } = useQuery({
    queryKey: ["admin_profile_emails"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.rpc("admin_get_profile_emails");
      if (error) throw error;
      return data ?? [];
    }
  });
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
    if (error) {
      const details = await error.context?.clone().json().catch(() => null);
      throw new Error(details?.error ?? error.message);
    }
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
      toast.success("Convite enviado com sucesso.");
    },
    onError: (e) => toast.error(e?.message ?? "Erro ao criar acesso")
  });
  const updateMutation = useMutation({
    mutationFn: () => invokeAccessManager("update", {
      userId: editing,
      fullName: form.fullName,
      password: form.password || void 0,
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
  const deleteAccess = useMutation({
    mutationFn: (userId) => invokeAccessManager("delete", {
      userId
    }),
    onSuccess: () => {
      refresh();
      toast.success("Acesso excluído permanentemente.");
    },
    onError: (e) => toast.error(e?.message ?? "Não foi possível excluir o acesso.")
  });
  const profilesWithEmails = reactExports.useMemo(() => {
    const emailsById = new Map(profileEmails.map((item) => [item.id, item.email]));
    return profiles.map((profile) => ({
      ...profile,
      email: emailsById.get(profile.id) ?? null
    }));
  }, [profiles, profileEmails]);
  const activeProfiles = reactExports.useMemo(() => profilesWithEmails.filter((p) => p.is_active !== false), [profilesWithEmails]);
  const inactiveProfiles = reactExports.useMemo(() => profilesWithEmails.filter((p) => p.is_active === false), [profilesWithEmails]);
  const activeProfilesByRole = reactExports.useMemo(() => {
    const byRole = {
      admin: [],
      collaborator: [],
      client: []
    };
    for (const profile of activeProfiles) {
      const role = roles.find((item) => item.user_id === profile.id)?.role ?? "collaborator";
      byRole[role].push(profile);
    }
    return Object.keys(byRole).map((role) => ({
      role,
      label: roleLabel[role],
      profiles: byRole[role].sort((a, b) => (a.full_name || a.email || "").localeCompare(b.full_name || b.email || "", "pt-BR", {
        sensitivity: "base"
      }))
    }));
  }, [activeProfiles, roles]);
  const openEdit = (id) => {
    const profile = profiles.find((item) => item.id === id);
    const role = roles.find((r) => r.user_id === id)?.role ?? "collaborator";
    setForm({
      ...defaults,
      fullName: profile?.full_name ?? "",
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
        !self && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "mt-2 w-full", onClick: () => setActive.mutate({
            userId: p.id,
            active: false
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "mr-1 h-3 w-3" }),
            " Desativar acesso"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "mt-2 w-full text-destructive hover:text-destructive", disabled: deleteAccess.isPending, onClick: () => {
            if (confirm(`Excluir permanentemente o acesso de "${p.full_name || p.email}"?`)) {
              deleteAccess.mutate(p.id);
            }
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-1 h-3 w-3" }),
            " Excluir acesso"
          ] })
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "O usuário receberá um convite por e-mail para criar a própria senha e ativar o acesso." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccessForm, { value: form, onChange: setForm, includeCredentials: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: createMutation.isPending, onClick: () => createMutation.mutate(), children: createMutation.isPending ? "Enviando…" : "Enviar convite" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: activeProfilesByRole.map(({
      role,
      label,
      profiles: roleProfiles
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Collapsible, { defaultOpen: false, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleTrigger, { className: "group flex w-full items-center gap-2 rounded-lg border bg-card px-4 py-3 text-left transition hover:bg-muted/50", children: [
        role === "admin" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 font-semibold", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: roleProfiles.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { className: "pt-3", children: roleProfiles.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: roleProfiles.map(renderProfile) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg border border-dashed px-4 py-5 text-sm text-muted-foreground", children: "Nenhum usuário nesta categoria." }) })
    ] }, role)) }),
    inactiveProfiles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "h-4 w-4" }),
        " Desativados (",
        inactiveProfiles.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: inactiveProfiles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-dashed p-4 opacity-75", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: p.full_name || p.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 truncate text-xs text-muted-foreground", children: p.email }),
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserDetailsForm, { value: form, onChange: setForm }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccessForm, { value: form, onChange: setForm }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: updateMutation.isPending, onClick: () => updateMutation.mutate(), children: updateMutation.isPending ? "Salvando…" : "Salvar acessos" }) })
    ] }) })
  ] });
}
export {
  UsersPage as component
};
