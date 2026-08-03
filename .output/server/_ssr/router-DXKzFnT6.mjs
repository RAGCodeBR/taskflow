import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, L as Link } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-Bh9iiLf9.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { P as Provider, a as Portal, C as Content2 } from "../_libs/radix-ui__react-tooltip.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { g as Dialog$1, D as DialogPortal$1, a as DialogContent$1, d as DialogClose, b as DialogTitle$1, f as DialogOverlay$1, c as DialogDescription$1, h as DialogTrigger$1 } from "../_libs/radix-ui__react-dialog.mjs";
import { P as Plus, S as Search, a as Sparkles, b as Pencil, T as Trash2, X } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/unenv.mjs";



import "../_libs/seroval-plugins.mjs";


import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
const appCss = "/assets/styles-R0XJZbBL.css";
const AuthContext = reactExports.createContext(void 0);
function AuthProvider({ children }) {
  const [session, setSession] = reactExports.useState(null);
  const [user, setUser] = reactExports.useState(null);
  const [profile, setProfile] = reactExports.useState(null);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const [isCollaborator, setIsCollaborator] = reactExports.useState(false);
  const [isClient, setIsClient] = reactExports.useState(false);
  const [clientId, setClientId] = reactExports.useState(null);
  const [permissions, setPermissions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const loadProfile = async (uid) => {
    const { data: prof } = await supabase.from("profiles").select("id, full_name, avatar_url, theme_preferences").eq("id", uid).maybeSingle();
    const { data: authUser } = await supabase.auth.getUser();
    setProfile(prof ? { ...prof, email: authUser.user?.email ?? null } : null);
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", uid);
    const admin = !!roles?.some((r) => r.role === "admin");
    const collaborator = !!roles?.some((r) => r.role === "collaborator");
    const client = !!roles?.some((r) => r.role === "client");
    setIsAdmin(admin);
    setIsCollaborator(collaborator);
    setIsClient(client);
    const { data: link } = await supabase.from("client_user_links").select("client_id").eq("user_id", uid).maybeSingle();
    setClientId(link?.client_id ?? null);
    const { data: access } = await supabase.from("user_permissions").select("permissions").eq("user_id", uid).maybeSingle();
    setPermissions(admin ? ["dashboard", "tasks", "notes", "import_ata", "clients", "reports", "portal", "calendar", "users", "trash", "settings"] : access?.permissions ?? []);
  };
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        setTimeout(() => loadProfile(s.user.id), 0);
      } else {
        setProfile(null);
        setIsAdmin(false);
        setIsCollaborator(false);
        setIsClient(false);
        setClientId(null);
        setPermissions([]);
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) loadProfile(data.session.user.id);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  const refreshProfile = async () => {
    if (user) await loadProfile(user.id);
  };
  const hasPermission = (permission) => isAdmin || permissions.includes(permission);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value: { session, user, profile, isAdmin, isCollaborator, isClient, clientId, permissions, hasPermission, loading, signOut, refreshProfile }, children });
}
function useAuth() {
  const ctx = reactExports.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const TooltipProvider = Provider;
const TooltipContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = Content2.displayName;
const Route$n = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TaskFlow — Gestão de Tarefas" },
      { name: "description", content: "Gerenciador de tarefas moderno com Kanban, Lista e Calendário." },
      { property: "og:title", content: "TaskFlow — Gestão de Tarefas" },
      { name: "twitter:title", content: "TaskFlow — Gestão de Tarefas" },
      { property: "og:description", content: "Gerenciador de tarefas moderno com Kanban, Lista e Calendário." },
      { name: "twitter:description", content: "Gerenciador de tarefas moderno com Kanban, Lista e Calendário." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/tLagbeX8d1c8AGKu15ndhxeLhHq2/social-images/social-1781773355411-ChatGPT_Image_18_de_jun._de_2026,_05_58_29.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/tLagbeX8d1c8AGKu15ndhxeLhHq2/social-images/social-1781773355411-ChatGPT_Image_18_de_jun._de_2026,_05_58_29.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-6xl font-bold", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Página não encontrada" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "mt-4 inline-block text-primary underline", children: "Voltar ao início" })
  ] }) }),
  errorComponent: ({ error }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Algo deu errado" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message })
  ] }) })
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$n.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TooltipProvider, { children: [
    null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) }) });
}
const $$splitComponentImporter$m = () => import("./index-BDGuf63a.mjs");
const Route$m = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("../_app-DgdHeQ-c.mjs");
const Route$l = createFileRoute("/_app")({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./auth-Cg-vnFJ7.mjs");
const Route$k = createFileRoute("/auth")({
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./calendario-Dryg4nIn.mjs");
const Route$j = createFileRoute("/_app/calendario")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root.displayName;
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const Dialog = Dialog$1;
const DialogTrigger = DialogTrigger$1;
const DialogPortal = DialogPortal$1;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogOverlay$1,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogOverlay$1.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent$1,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogContent$1.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogTitle$1,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogTitle$1.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogDescription$1,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogDescription$1.displayName;
function useClientInvoices() {
  return useQuery({
    queryKey: ["client_invoices"],
    queryFn: async () => {
      const { data, error } = await supabase.from("client_invoices").select("*").order("due_date", { ascending: true });
      if (error) throw error;
      return data ?? [];
    }
  });
}
function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tasks").select("*").is("deleted_at", null).order("position", { ascending: true }).order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    }
  });
}
function useDeletedTasks() {
  return useQuery({
    queryKey: ["tasks", "deleted"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tasks").select("*").not("deleted_at", "is", null).order("deleted_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    }
  });
}
function useColumns() {
  return useQuery({
    queryKey: ["columns"],
    queryFn: async () => {
      const { data, error } = await supabase.from("kanban_columns").select("*").order("position");
      if (error) throw error;
      return data ?? [];
    }
  });
}
function useUserColumnOrder() {
  return useQuery({
    queryKey: ["user_column_order"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id;
      if (!uid) return [];
      const { data, error } = await supabase.from("user_column_order").select("column_id, position").eq("user_id", uid);
      if (error) throw error;
      return data ?? [];
    }
  });
}
function useUserTaskOrder() {
  return useQuery({
    queryKey: ["user_task_order"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id;
      if (!uid) return [];
      const { data, error } = await supabase.from("user_task_order").select("task_id, position").eq("user_id", uid);
      if (error) throw error;
      return data ?? [];
    }
  });
}
function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data, error } = await supabase.from("clients").select("*").order("name");
      if (error) throw error;
      return data ?? [];
    }
  });
}
function useProfiles() {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("id, full_name, avatar_url, is_active");
      if (error) throw error;
      return data ?? [];
    }
  });
}
function useTaskCollaborators() {
  return useQuery({
    queryKey: ["task_collaborators"],
    queryFn: async () => {
      const { data, error } = await supabase.from("task_collaborators").select("task_id, collaborator_id, added_by, created_at");
      if (error) throw error;
      return data ?? [];
    }
  });
}
function useTaskTags() {
  return useQuery({
    queryKey: ["task_tags"],
    queryFn: async () => {
      const { data, error } = await supabase.from("task_tags").select("*").order("position", { ascending: true }).order("name", { ascending: true });
      if (error) throw error;
      return data ?? [];
    }
  });
}
function useTaskTagLinks() {
  return useQuery({
    queryKey: ["task_tag_links"],
    queryFn: async () => {
      const { data, error } = await supabase.from("task_tag_links").select("task_id, tag_id");
      if (error) throw error;
      return data ?? [];
    }
  });
}
function useSubtasks() {
  const qc = useQueryClient();
  reactExports.useEffect(() => {
    const channel = supabase.channel(`subtasks-cache-${Math.random().toString(36).slice(2)}`).on(
      "postgres_changes",
      { event: "*", schema: "public", table: "subtasks" },
      () => {
        void qc.invalidateQueries({ queryKey: ["subtasks"] });
        void qc.invalidateQueries({ queryKey: ["tasks"] });
      }
    ).subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [qc]);
  return useQuery({
    queryKey: ["subtasks"],
    queryFn: async () => {
      const { data, error } = await supabase.from("subtasks").select("id, task_id, title, done, position, assignee_id, due_date, completed_at").order("position");
      if (error) throw error;
      return data ?? [];
    }
  });
}
function useTaskStatuses() {
  return useQuery({
    queryKey: ["task_statuses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("task_statuses").select("*").order("position");
      if (error) throw error;
      return data ?? [];
    }
  });
}
const $$splitComponentImporter$i = () => import("./clients-1IvhWLWU.mjs");
const Route$i = createFileRoute("/_app/clients")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
function ClientsIndexPage() {
  const qc = useQueryClient();
  const {
    user
  } = useAuth();
  const {
    data: clients = []
  } = useClients();
  const {
    data: tasks = []
  } = useTasks();
  const [open, setOpen] = reactExports.useState(false);
  const [edit, setEdit] = reactExports.useState(null);
  const [color, setColor] = reactExports.useState("#1e3a8a");
  const [desc, setDesc] = reactExports.useState("");
  const [cnpj, setCnpj] = reactExports.useState("");
  const [legalName, setLegalName] = reactExports.useState("");
  const [tradeName, setTradeName] = reactExports.useState("");
  const [stateRegistration, setStateRegistration] = reactExports.useState("");
  const [municipalRegistration, setMunicipalRegistration] = reactExports.useState("");
  const [address, setAddress] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [responsible, setResponsible] = reactExports.useState("");
  const [search, setSearch] = reactExports.useState("");
  const [avatarUrls, setAvatarUrls] = reactExports.useState({});
  reactExports.useEffect(() => {
    let cancelled = false;
    const loadAvatarUrls = async () => {
      const urls = await Promise.all(clients.filter((client) => client.avatar_path).map(async (client) => {
        const {
          data
        } = await supabase.storage.from("task-attachments").createSignedUrl(client.avatar_path, 3600);
        return [client.id, data?.signedUrl ?? ""];
      }));
      if (!cancelled) setAvatarUrls(Object.fromEntries(urls));
    };
    void loadAvatarUrls();
    return () => {
      cancelled = true;
    };
  }, [clients]);
  const filteredClients = clients.filter((client) => {
    const term = search.trim().toLocaleLowerCase("pt-BR");
    return client.name.toLocaleLowerCase("pt-BR").includes(term) || client.description?.toLocaleLowerCase("pt-BR").includes(term);
  });
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
      responsible: responsible || null
    };
    if (edit) {
      await supabase.from("clients").update(clientData).eq("id", edit.id);
    } else {
      await supabase.from("clients").insert({
        ...clientData,
        created_by: user?.id
      });
    }
    qc.invalidateQueries({
      queryKey: ["clients"]
    });
    setOpen(false);
    toast.success("Cliente salvo");
  };
  const remove = async (c) => {
    if (!confirm(`Excluir cliente "${c.name}"?`)) return;
    await supabase.from("clients").delete().eq("id", c.id);
    qc.invalidateQueries({
      queryKey: ["clients"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Clientes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Organize tarefas por cliente" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/clients/new", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
        "Novo cliente"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Localizar cliente...", className: "pl-9" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: [
      filteredClients.map((c) => {
        const count = tasks.filter((t) => t.client_id === c.id).length;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              avatarUrls[c.id] ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarUrls[c.id], alt: `Logo de ${c.name}`, className: "h-10 w-10 rounded-lg object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg", style: {
                background: c.color || "#1e3a8a"
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: c.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  count,
                  " tarefa(s)"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "icon", variant: "ghost", title: "Relatório IA", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/client-report/$clientId", params: {
                clientId: c.id
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "icon", variant: "ghost", title: "Editar cliente", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/clients/$clientId/edit", params: {
                clientId: c.id
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => remove(c), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
            ] })
          ] }),
          c.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: c.description })
        ] }, c.id);
      }),
      clients.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "col-span-full p-10 text-center text-muted-foreground", children: "Nenhum cliente cadastrado. Crie um para começar a organizar tarefas." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        edit ? "Editar" : "Novo",
        " cliente"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "CNPJ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: cnpj, onChange: (e) => setCnpj(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nome fantasia" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: tradeName, onChange: (e) => setTradeName(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Razão social" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: legalName, onChange: (e) => setLegalName(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Inscrição Estadual" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: stateRegistration, onChange: (e) => setStateRegistration(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Inscrição Municipal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: municipalRegistration, onChange: (e) => setMunicipalRegistration(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Telefone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: phone, onChange: (e) => setPhone(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "E-mail" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Endereço completo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: address, onChange: (e) => setAddress(e.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Responsável" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: responsible, onChange: (e) => setResponsible(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Descrição" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: desc, onChange: (e) => setDesc(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "color", value: color, onChange: (e) => setColor(e.target.value), className: "h-10" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, className: "w-full", children: "Salvar" })
      ] })
    ] }) })
  ] });
}
const $$splitComponentImporter$h = () => import("./dashboard-CwTSXaSR.mjs");
const Route$h = createFileRoute("/_app/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./import-ata-Brb5rSuk.mjs");
const Route$g = createFileRoute("/_app/import-ata")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./notes-BAUCayC3.mjs");
const Route$f = createFileRoute("/_app/notes")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./reports-BMma1Fpm.mjs");
const Route$e = createFileRoute("/_app/reports")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./settings-_NKOJvPY.mjs");
const Route$d = createFileRoute("/_app/settings")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./tasks-cVzyxFPE.mjs");
const Route$c = createFileRoute("/_app/tasks")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./trash-J9-jHLUk.mjs");
const Route$b = createFileRoute("/_app/trash")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./users-C_0dNAGQ.mjs");
const Route$a = createFileRoute("/_app/users")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./client-report._clientId-CUWCo_SV.mjs");
const Route$9 = createFileRoute("/_app/client-report/$clientId")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./clients.index-iM6umFOY.mjs");
const Route$8 = createFileRoute("/_app/clients/")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./clients.new-miNlTUvE.mjs");
const Route$7 = createFileRoute("/_app/clients/new")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./portal.entregas-DDoo_9Qx.mjs");
const Route$6 = createFileRoute("/_app/portal/entregas")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./portal.financeiro-DGX7nOk1.mjs");
const Route$5 = createFileRoute("/_app/portal/financeiro")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./tasks.index-Bpq4LZou.mjs");
const Route$4 = createFileRoute("/_app/tasks/")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./tasks.calendar-BOvhHlao.mjs");
const Route$3 = createFileRoute("/_app/tasks/calendar")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./tasks.kanban-DQ13fQS1.mjs");
const Route$2 = createFileRoute("/_app/tasks/kanban")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./tasks.list-CJtdnWTa.mjs");
const Route$1 = createFileRoute("/_app/tasks/list")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  validateSearch: (s) => ({
    task: typeof s.task === "string" ? s.task : void 0,
    mine: s.mine === "1" || s.mine === true || s.mine === "true" ? true : void 0
  })
});
const $$splitComponentImporter = () => import("./clients._clientId.edit-B3wQzL5r.mjs");
const Route = createFileRoute("/_app/clients/$clientId/edit")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$m.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$n
});
const AppRoute = Route$l.update({
  id: "/_app",
  getParentRoute: () => Route$n
});
const AuthRoute = Route$k.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$n
});
const AppCalendarioRoute = Route$j.update({
  id: "/calendario",
  path: "/calendario",
  getParentRoute: () => AppRoute
});
const AppClientsRoute = Route$i.update({
  id: "/clients",
  path: "/clients",
  getParentRoute: () => AppRoute
});
const AppDashboardRoute = Route$h.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AppRoute
});
const AppImportAtaRoute = Route$g.update({
  id: "/import-ata",
  path: "/import-ata",
  getParentRoute: () => AppRoute
});
const AppNotesRoute = Route$f.update({
  id: "/notes",
  path: "/notes",
  getParentRoute: () => AppRoute
});
const AppReportsRoute = Route$e.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => AppRoute
});
const AppSettingsRoute = Route$d.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AppRoute
});
const AppTasksRoute = Route$c.update({
  id: "/tasks",
  path: "/tasks",
  getParentRoute: () => AppRoute
});
const AppTrashRoute = Route$b.update({
  id: "/trash",
  path: "/trash",
  getParentRoute: () => AppRoute
});
const AppUsersRoute = Route$a.update({
  id: "/users",
  path: "/users",
  getParentRoute: () => AppRoute
});
const AppClientReportClientIdRoute = Route$9.update({
  id: "/client-report/$clientId",
  path: "/client-report/$clientId",
  getParentRoute: () => AppRoute
});
const AppClientsIndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppClientsRoute
});
const AppClientsNewRoute = Route$7.update({
  id: "/new",
  path: "/new",
  getParentRoute: () => AppClientsRoute
});
const AppPortalEntregasRoute = Route$6.update({
  id: "/portal/entregas",
  path: "/portal/entregas",
  getParentRoute: () => AppRoute
});
const AppPortalFinanceiroRoute = Route$5.update({
  id: "/portal/financeiro",
  path: "/portal/financeiro",
  getParentRoute: () => AppRoute
});
const AppTasksIndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppTasksRoute
});
const AppTasksCalendarRoute = Route$3.update({
  id: "/calendar",
  path: "/calendar",
  getParentRoute: () => AppTasksRoute
});
const AppTasksKanbanRoute = Route$2.update({
  id: "/kanban",
  path: "/kanban",
  getParentRoute: () => AppTasksRoute
});
const AppTasksListRoute = Route$1.update({
  id: "/list",
  path: "/list",
  getParentRoute: () => AppTasksRoute
});
const AppClientsClientIdEditRoute = Route.update({
  id: "/$clientId/edit",
  path: "/$clientId/edit",
  getParentRoute: () => AppClientsRoute
});
const AppClientsRouteChildren = {
  AppClientsNewRoute,
  AppClientsIndexRoute,
  AppClientsClientIdEditRoute
};
const AppClientsRouteWithChildren = AppClientsRoute._addFileChildren(
  AppClientsRouteChildren
);
const AppTasksRouteChildren = {
  AppTasksCalendarRoute,
  AppTasksKanbanRoute,
  AppTasksListRoute,
  AppTasksIndexRoute
};
const AppTasksRouteWithChildren = AppTasksRoute._addFileChildren(
  AppTasksRouteChildren
);
const AppRouteChildren = {
  AppCalendarioRoute,
  AppClientsRoute: AppClientsRouteWithChildren,
  AppDashboardRoute,
  AppImportAtaRoute,
  AppNotesRoute,
  AppReportsRoute,
  AppSettingsRoute,
  AppTasksRoute: AppTasksRouteWithChildren,
  AppTrashRoute,
  AppUsersRoute,
  AppClientReportClientIdRoute,
  AppPortalEntregasRoute,
  AppPortalFinanceiroRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren,
  AuthRoute
};
const routeTree = Route$n._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = (basepath) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 3e4,
        gcTime: 5 * 6e4,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 1
      }
    }
  });
  const router2 = createRouter({
    routeTree,
    ...basepath ? { basepath } : {},
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPreload: "intent"
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  Card as C,
  Dialog as D,
  Input as I,
  Label as L,
  Route$9 as R,
  DialogContent as a,
  DialogHeader as b,
  DialogTitle as c,
  DialogFooter as d,
  useClients as e,
  useTasks as f,
  useProfiles as g,
  useColumns as h,
  useTaskTags as i,
  useTaskStatuses as j,
  useDeletedTasks as k,
  DialogTrigger as l,
  DialogDescription as m,
  ClientsIndexPage as n,
  cn as o,
  buttonVariants as p,
  useClientInvoices as q,
  useSubtasks as r,
  useTaskCollaborators as s,
  useUserColumnOrder as t,
  useAuth as u,
  useUserTaskOrder as v,
  useTaskTagLinks as w,
  Route$1 as x,
  Route as y,
  router as z
};
