import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, L as Link, u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { m as isRedirect } from "../_libs/tanstack__router-core.mjs";
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
import { S as Select$1, a as SelectValue$1, b as SelectTrigger$1, c as SelectIcon, d as SelectPortal, e as SelectContent$1, f as SelectViewport, g as SelectItem$1, h as SelectItemIndicator, i as SelectItemText, j as SelectScrollUpButton$1, k as SelectScrollDownButton$1, l as SelectLabel$1, m as SelectSeparator$1 } from "../_libs/radix-ui__react-select.mjs";
import { g } from "../_libs/marked.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-DJ8sPH9h.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CTknNXUw.mjs";
import { P as Plus, S as Search, a as Sparkles, b as Pencil, T as Trash2, C as ChevronDown, c as Check, X, N as NotebookPen, A as ArrowUp, d as ArrowDown, D as Download, e as ChevronUp, f as Paperclip, F as FileText, E as ExternalLink, B as Bold, I as Italic, U as Underline, H as Highlighter, g as Eraser, L as LoaderCircle, h as FileDown, M as Minimize2, i as Maximize2, j as Save } from "../_libs/lucide-react.mjs";
import { f as format, p as ptBR, a as parseISO } from "../_libs/date-fns.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
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
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function useServerFn(serverFn) {
  const router2 = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router2.stores.location.get();
        return router2.navigate(router2.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router2, serverFn]);
}
const appCss = "/assets/styles-vi9uyY6h.css";
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
  const loadedUserIdRef = reactExports.useRef(null);
  const loadProfile = async (uid) => {
    const [profileResult, authResult, rolesResult, linkResult, permissionsResult] = await Promise.all([
      supabase.from("profiles").select("id, full_name, avatar_url, theme_preferences").eq("id", uid).maybeSingle(),
      supabase.auth.getUser(),
      supabase.from("user_roles").select("role").eq("user_id", uid),
      supabase.from("client_user_links").select("client_id").eq("user_id", uid).maybeSingle(),
      supabase.from("user_permissions").select("permissions").eq("user_id", uid).maybeSingle()
    ]);
    const prof = profileResult.data;
    const roles = rolesResult.data;
    const link = linkResult.data;
    const access = permissionsResult.data;
    setProfile(prof ? { ...prof, email: authResult.data.user?.email ?? null } : null);
    const admin = !!roles?.some((r) => r.role === "admin");
    const collaborator = !!roles?.some((r) => r.role === "collaborator");
    const client = !!roles?.some((r) => r.role === "client");
    setIsAdmin(admin);
    setIsCollaborator(collaborator);
    setIsClient(client);
    setClientId(link?.client_id ?? null);
    setPermissions(
      admin ? [
        "dashboard",
        "tasks",
        "import_ata",
        "clients",
        "reports",
        "mural",
        "portal_entregas",
        "portal_financeiro",
        "users",
        "trash",
        "settings"
      ] : Array.isArray(access?.permissions) ? access.permissions : []
    );
  };
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        if (loadedUserIdRef.current !== s.user.id) {
          loadedUserIdRef.current = s.user.id;
          setLoading(true);
          setTimeout(() => {
            void loadProfile(s.user.id).finally(() => setLoading(false));
          }, 0);
        }
      } else {
        loadedUserIdRef.current = null;
        setProfile(null);
        setIsAdmin(false);
        setIsCollaborator(false);
        setIsClient(false);
        setClientId(null);
        setPermissions([]);
      }
    });
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        loadedUserIdRef.current = data.session.user.id;
        await loadProfile(data.session.user.id);
      }
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  reactExports.useEffect(() => {
    if (!user) return;
    const refreshAccess = () => void loadProfile(user.id);
    const channel = supabase.channel(`user-access-${user.id}`).on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "user_permissions",
        filter: `user_id=eq.${user.id}`
      },
      refreshAccess
    ).on(
      "postgres_changes",
      { event: "*", schema: "public", table: "user_roles", filter: `user_id=eq.${user.id}` },
      refreshAccess
    ).subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [user?.id]);
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  const refreshProfile = async () => {
    if (user) await loadProfile(user.id);
  };
  const hasPermission = (permission) => isAdmin || permissions.includes(permission);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AuthContext.Provider,
    {
      value: {
        session,
        user,
        profile,
        isAdmin,
        isCollaborator,
        isClient,
        clientId,
        permissions,
        hasPermission,
        loading,
        signOut,
        refreshProfile
      },
      children
    }
  );
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
const $$splitComponentImporter$m = () => import("./index-CUW5j4Lf.mjs");
const Route$m = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("../_app-DOOzz86T.mjs");
const Route$l = createFileRoute("/_app")({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./auth-B91EA6wz.mjs");
const Route$k = createFileRoute("/auth")({
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
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
      const { data, error } = await supabase.from("profiles").select(
        "id, full_name, avatar_url, is_active"
      );
      if (error) throw error;
      return [...data ?? []].sort(
        (a, b) => (a.full_name ?? "").localeCompare(b.full_name ?? "", "pt-BR", {
          sensitivity: "base"
        })
      );
    }
  });
}
function useAssignableProfiles() {
  return useQuery({
    queryKey: ["assignable-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("list_task_assignees");
      if (error) throw error;
      return [...data ?? []].sort(
        (a, b) => (a.full_name ?? "").localeCompare(b.full_name ?? "", "pt-BR", {
          sensitivity: "base"
        })
      );
    }
  });
}
function useTaskCollaborators() {
  return useQuery({
    queryKey: ["task_collaborators"],
    queryFn: async () => {
      const { data, error } = await supabase.from("task_collaborators").select(
        "task_id, collaborator_id, added_by, created_at"
      );
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
    const channel = supabase.channel(`subtasks-cache-${Math.random().toString(36).slice(2)}`).on("postgres_changes", { event: "*", schema: "public", table: "subtasks" }, () => {
      void qc.invalidateQueries({ queryKey: ["subtasks"] });
      void qc.invalidateQueries({ queryKey: ["tasks"] });
    }).subscribe();
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
const $$splitComponentImporter$j = () => import("./clients-uf_UxtMI.mjs");
const Route$j = createFileRoute("/_app/clients")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
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
              avatarUrls[c.id] ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarUrls[c.id], alt: `Logo de ${c.name}`, className: "block h-14 w-14 shrink-0 rounded-lg border bg-muted object-contain p-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 shrink-0 rounded-lg", style: {
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
const $$splitComponentImporter$i = () => import("./dashboard-D-FzIvDZ.mjs");
const Route$i = createFileRoute("/_app/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./import-ata-B2h9WmB2.mjs");
const Route$h = createFileRoute("/_app/import-ata")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./mural-CdW6CrhU.mjs");
const Route$g = createFileRoute("/_app/mural")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const Select = Select$1;
const SelectValue = SelectValue$1;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectTrigger$1,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectIcon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectTrigger$1.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollUpButton$1,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollDownButton$1,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPortal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectContent$1,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectViewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectContent$1.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectLabel$1,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectLabel$1.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectItem$1,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectItem$1.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectSeparator$1,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectSeparator$1.displayName;
function FileDropZone({
  children,
  onFiles,
  disabled = false,
  className = ""
}) {
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const dragDepth = reactExports.useRef(0);
  const hasFiles = (event) => event.dataTransfer.types.includes("Files");
  function onDragEnter(event) {
    if (disabled || !hasFiles(event)) return;
    event.preventDefault();
    dragDepth.current += 1;
    setIsDragging(true);
  }
  function onDragOver(event) {
    if (disabled || !hasFiles(event)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }
  function onDragLeave(event) {
    if (!hasFiles(event)) return;
    dragDepth.current -= 1;
    if (dragDepth.current <= 0) {
      dragDepth.current = 0;
      setIsDragging(false);
    }
  }
  async function onDrop(event) {
    if (disabled || !hasFiles(event)) return;
    event.preventDefault();
    event.stopPropagation();
    dragDepth.current = 0;
    setIsDragging(false);
    if (event.dataTransfer.files.length > 0) {
      await onFiles(event.dataTransfer.files);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: [
        "relative rounded-md transition",
        isDragging && "ring-2 ring-primary bg-primary/10",
        disabled && "opacity-50",
        className
      ].filter(Boolean).join(" "),
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDrop,
      children: [
        children,
        isDragging && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 z-10 grid place-items-center rounded-md border-2 border-dashed border-primary bg-primary/10 text-sm font-medium text-primary", children: "Solte os arquivos aqui" })
      ]
    }
  );
}
function AttachmentPreviewDialog({ open, onOpenChange, attachment }) {
  const [blobUrl, setBlobUrl] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!open || !attachment) return;
    let active = true;
    let nextBlobUrl = null;
    setLoading(true);
    setError(null);
    (async () => {
      const { data, error: error2 } = await supabase.storage.from("task-attachments").download(attachment.storage_path);
      if (!active) return;
      if (error2) {
        setError(error2.message);
        setBlobUrl(null);
        setLoading(false);
        return;
      }
      nextBlobUrl = URL.createObjectURL(data);
      setBlobUrl(nextBlobUrl);
      setLoading(false);
    })();
    return () => {
      active = false;
      if (nextBlobUrl) URL.revokeObjectURL(nextBlobUrl);
    };
  }, [open, attachment]);
  const downloadCurrent = async () => {
    if (!attachment) return;
    try {
      const { data, error: error2 } = await supabase.storage.from("task-attachments").download(attachment.storage_path);
      if (error2) throw error2;
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = attachment.file_name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 3e4);
    } catch (err) {
      toast.error(err.message);
    }
  };
  const mime = attachment?.mime_type ?? "";
  const isImage = mime.startsWith("image/");
  const isVideo = mime.startsWith("video/");
  const isAudio = mime.startsWith("audio/");
  const isPdf = mime === "application/pdf" || mime.includes("pdf");
  const isText = mime.startsWith("text/") || mime.includes("json");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] max-w-5xl overflow-hidden p-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "border-b px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "truncate text-sm", children: attachment?.file_name ?? "Visualizar arquivo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: downloadCurrent, disabled: !attachment, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
        "Baixar"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[60vh] items-center justify-center bg-muted/20 p-4", children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando arquivo…" }),
      !loading && error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error }),
      !loading && !error && blobUrl && isImage && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: blobUrl, alt: attachment?.file_name ?? "Arquivo", className: "max-h-[78vh] w-auto max-w-full rounded-md object-contain" }),
      !loading && !error && blobUrl && isPdf && /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { src: blobUrl, title: attachment?.file_name ?? "PDF", className: "h-[78vh] w-full rounded-md border bg-background" }),
      !loading && !error && blobUrl && isVideo && /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: blobUrl, controls: true, className: "max-h-[78vh] w-full rounded-md bg-black" }),
      !loading && !error && blobUrl && isAudio && /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { src: blobUrl, controls: true, className: "w-full max-w-2xl" }),
      !loading && !error && blobUrl && isText && /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { src: blobUrl, title: attachment?.file_name ?? "Arquivo de texto", className: "h-[78vh] w-full rounded-md border bg-background" }),
      !loading && !error && blobUrl && !isImage && !isPdf && !isVideo && !isAudio && !isText && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Esse tipo de arquivo não tem preview embutido aqui." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", onClick: downloadCurrent, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
          "Baixar arquivo"
        ] })
      ] })
    ] })
  ] }) });
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const formatNoteWithAI = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => {
  if (typeof input?.html !== "string") throw new Error("html requerido");
  if (input.html.length > 5e4) throw new Error("Texto muito grande");
  return {
    html: input.html,
    title: input.title ?? ""
  };
}).handler(createSsrRpc("a787921ee7885a89f18e20f917552f25a52930cebb5359dea24b533512759549"));
const $$splitComponentImporter$f = () => import("./notes-DPZ2hRe9.mjs");
const Route$f = createFileRoute("/_app/notes")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const sb = supabase;
const PREVIEWABLE_MIME_RE = /^(image\/|video\/|audio\/|text\/)|application\/pdf|json/i;
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function normalizeNoteHtmlForPdf(rawHtml) {
  if (typeof window === "undefined") return rawHtml;
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml || "", "text/html");
  const root = doc.body;
  root.querySelectorAll("script, style, meta, link, title, noscript, iframe, object").forEach((node) => node.remove());
  root.querySelectorAll("*").forEach((el) => {
    const tag = el.tagName.toLowerCase();
    const keepBackground = el.style.backgroundColor;
    const keepColor = el.style.color;
    const keepTextAlign = el.style.textAlign;
    const keepFontWeight = el.style.fontWeight;
    const keepFontStyle = el.style.fontStyle;
    const keepTextDecoration = el.style.textDecoration;
    el.removeAttribute("class");
    el.removeAttribute("id");
    el.removeAttribute("width");
    el.removeAttribute("height");
    el.removeAttribute("face");
    el.removeAttribute("size");
    el.removeAttribute("dir");
    el.removeAttribute("data-start");
    el.removeAttribute("data-end");
    if (tag !== "a") {
      el.removeAttribute("href");
      el.removeAttribute("target");
      el.removeAttribute("rel");
    }
    const nextStyle = [keepBackground ? `background-color: ${keepBackground}` : "", keepColor ? `color: ${keepColor}` : "", keepTextAlign ? `text-align: ${keepTextAlign}` : "", keepFontWeight && keepFontWeight !== "400" && keepFontWeight !== "normal" ? `font-weight: ${keepFontWeight}` : "", keepFontStyle && keepFontStyle !== "normal" ? `font-style: ${keepFontStyle}` : "", keepTextDecoration && keepTextDecoration !== "none" ? `text-decoration: ${keepTextDecoration}` : ""].filter(Boolean).join("; ");
    if (nextStyle) el.setAttribute("style", nextStyle);
    else el.removeAttribute("style");
    if (tag === "font") {
      const fragment = doc.createDocumentFragment();
      while (el.firstChild) fragment.appendChild(el.firstChild);
      el.replaceWith(fragment);
    }
  });
  return root.innerHTML;
}
function syncEditorDom(target, html) {
  if (!target || target.innerHTML === html) return;
  target.innerHTML = html;
}
function extractTextFromHtml(rawHtml) {
  if (typeof window === "undefined") return rawHtml;
  const doc = new DOMParser().parseFromString(rawHtml || "", "text/html");
  return doc.body.textContent ?? "";
}
function openNotePrintPreview({
  title,
  dateLabel,
  html
}) {
  const popup = window.open("", "_blank");
  if (!popup) throw new Error("Não foi possível abrir a nova aba do PDF.");
  const previewCss = `
    :root {
      color-scheme: light;
      --page-width: 210mm;
      --page-padding-y: 20mm;
      --page-padding-x: 18mm;
      --surface: #eef1f5;
      --paper: #ffffff;
      --ink: #1f2937;
      --muted: #6b7280;
      --rule: #d1d5db;
      --accent: #0f172a;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: var(--surface); color: var(--ink); }
    body { font-family: Arial, Helvetica, sans-serif; }
    .preview-shell { min-height: 100vh; padding: 24px; }
    .preview-toolbar {
      position: sticky; top: 0; z-index: 5; display: flex; justify-content: center;
      padding-bottom: 16px;
    }
    .preview-toolbar-inner {
      display: flex; align-items: center; gap: 12px; padding: 10px 14px; border: 1px solid var(--rule);
      background: rgba(255,255,255,0.96); backdrop-filter: blur(8px); box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
    }
    .toolbar-button {
      border: 1px solid var(--rule); background: #fff; color: var(--accent); padding: 10px 14px; cursor: pointer;
      font-size: 13px; font-weight: 600;
    }
    .toolbar-note { font-size: 12px; color: var(--muted); }
    .paper {
      width: min(100%, calc(var(--page-width) + 36mm)); margin: 0 auto; background: var(--paper);
      box-shadow: 0 18px 48px rgba(15, 23, 42, 0.12);
    }
    .paper-inner {
      padding: var(--page-padding-y) var(--page-padding-x) calc(var(--page-padding-y) + 2mm);
      min-height: 297mm;
    }
    .doc-title {
      margin: 0 0 10px; font-size: 28px; line-height: 1.1; font-weight: 700; color: var(--accent);
    }
    .doc-date {
      margin: 0 0 22px; padding-bottom: 14px; border-bottom: 1px solid var(--rule); font-size: 13px; color: var(--muted);
    }
    .doc-body, .doc-body * {
      max-width: 100%; letter-spacing: 0; word-break: normal; overflow-wrap: break-word;
    }
    .doc-body {
      font-family: Georgia, 'Times New Roman', serif; font-size: 13.5pt; line-height: 1.7; color: var(--ink);
    }
    .doc-body h1, .doc-body h2, .doc-body h3, .doc-body h4 {
      font-family: Arial, Helvetica, sans-serif; color: var(--accent); line-height: 1.25; break-after: avoid;
      margin: 22px 0 10px;
    }
    .doc-body h1 { font-size: 22px; }
    .doc-body h2 { font-size: 18px; }
    .doc-body h3 { font-size: 16px; }
    .doc-body p, .doc-body div { margin: 0 0 12px; }
    .doc-body ul, .doc-body ol { margin: 0 0 14px; padding-left: 24px; }
    .doc-body li { margin-bottom: 6px; }
    .doc-body blockquote {
      margin: 16px 0; padding: 0 0 0 14px; border-left: 3px solid #cbd5e1; color: #475569;
    }
    .doc-body table { width: 100%; border-collapse: collapse; margin: 14px 0; }
    .doc-body th, .doc-body td { border: 1px solid var(--rule); padding: 7px 8px; text-align: left; }
    .doc-body img { max-width: 100%; height: auto; }
    .doc-body pre, .doc-body code {
      font-family: Consolas, Monaco, monospace; white-space: pre-wrap; word-break: break-word; font-size: 11.5pt;
    }
    .doc-body span[style*="background"] { padding: 0 2px; }
    @page {
      size: A4;
      margin: 18mm 16mm 20mm;
    }
    @media print {
      html, body { background: #fff; }
      .preview-shell { padding: 0; }
      .preview-toolbar { display: none; }
      .paper {
        width: auto; margin: 0; box-shadow: none;
      }
      .paper-inner {
        min-height: auto; padding: 0;
      }
      .doc-title, .doc-date, .doc-body h1, .doc-body h2, .doc-body h3, .doc-body h4,
      .doc-body p, .doc-body div, .doc-body ul, .doc-body ol, .doc-body table, .doc-body blockquote, .doc-body pre {
        break-inside: avoid-page;
      }
    }
  `;
  popup.document.open();
  popup.document.write(`<!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(title)}</title>
        <style>${previewCss}</style>
      </head>
      <body>
        <div class="preview-shell">
          <div class="preview-toolbar">
            <div class="preview-toolbar-inner">
              <button class="toolbar-button" onclick="window.print()">Imprimir / Salvar em PDF</button>
              <button class="toolbar-button" onclick="window.close()">Fechar</button>
              <span class="toolbar-note">Pré-visualização limpa para impressão profissional.</span>
            </div>
          </div>
          <article class="paper">
            <div class="paper-inner">
              <h1 class="doc-title">${escapeHtml(title)}</h1>
              <p class="doc-date">${escapeHtml(dateLabel)}</p>
              <div class="doc-body">${html}</div>
            </div>
          </article>
        </div>
        <script>
          window.addEventListener('load', () => {
            setTimeout(() => window.print(), 250);
          });
        <\/script>
      </body>
    </html>`);
  popup.document.close();
}
function NotesWorkspace({
  fixedClientId,
  embedded = false
}) {
  const {
    user,
    isAdmin
  } = useAuth();
  const {
    data: clients = []
  } = useClients();
  const {
    data: profiles = []
  } = useProfiles();
  const [clientId, setClientId] = reactExports.useState(fixedClientId ?? null);
  const [notes, setNotes] = reactExports.useState([]);
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const autoCreatedFor = reactExports.useRef(null);
  const [search, setSearch] = reactExports.useState("");
  const [createdBy, setCreatedBy] = reactExports.useState("all");
  const [sortMode, setSortMode] = reactExports.useState(() => {
    if (typeof window === "undefined") return "manual";
    return localStorage.getItem("notes_sort_mode") || "manual";
  });
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("notes_sort_mode", sortMode);
  }, [sortMode]);
  reactExports.useEffect(() => {
    if (!user?.id) return;
    setCreatedBy((current) => current === "all" ? user.id : current);
  }, [user?.id]);
  reactExports.useEffect(() => {
    if (fixedClientId) {
      setClientId(fixedClientId);
    } else if (!clientId && clients[0]) {
      setClientId(clients[0].id);
    }
  }, [clients, clientId, fixedClientId]);
  const load = async (cid) => {
    setLoading(true);
    const {
      data,
      error
    } = await sb.from("client_notes").select("*").eq("client_id", cid).order("position", {
      ascending: true
    }).order("created_at", {
      ascending: false
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    const list = data ?? [];
    setNotes(list);
    if (list.length && !list.find((n) => n.id === selectedId)) {
      setSelectedId(list[0].id);
    }
  };
  reactExports.useEffect(() => {
    if (clientId) void load(clientId);
  }, [clientId]);
  const addNote = async () => {
    if (!clientId || !user) return;
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const minPos = notes.reduce((m, n) => Math.min(m, n.position), 0);
    const {
      data,
      error
    } = await sb.from("client_notes").insert({
      client_id: clientId,
      title: "Nova anotação",
      content: "",
      content_html: "",
      note_date: today,
      created_by: user.id,
      position: minPos - 1
    }).select().single();
    if (error) {
      toast.error(error.message);
      return;
    }
    const created = data;
    setNotes((n) => [created, ...n]);
    setSelectedId(created.id);
  };
  const deleteNote = async (id) => {
    if (!confirm("Excluir esta anotação?")) return;
    setNotes((n) => n.filter((x) => x.id !== id));
    if (selectedId === id) setSelectedId(null);
    const {
      error
    } = await sb.from("client_notes").delete().eq("id", id);
    if (error) toast.error(error.message);
  };
  const patchNote = (id, patch) => {
    setNotes((n) => n.map((x) => x.id === id ? {
      ...x,
      ...patch
    } : x));
  };
  const persistNote = async (id, patch) => {
    const {
      error
    } = await sb.from("client_notes").update(patch).eq("id", id);
    if (error) toast.error(error.message);
  };
  const sortedNotes = reactExports.useMemo(() => {
    const arr = [...notes];
    switch (sortMode) {
      case "date_desc":
        arr.sort((a, b) => (b.note_date || "").localeCompare(a.note_date || ""));
        break;
      case "date_asc":
        arr.sort((a, b) => (a.note_date || "").localeCompare(b.note_date || ""));
        break;
      case "updated_desc":
        arr.sort((a, b) => (b.updated_at || "").localeCompare(a.updated_at || ""));
        break;
      case "title_asc":
        arr.sort((a, b) => (a.title || "").localeCompare(b.title || "", "pt-BR"));
        break;
      case "manual":
      default:
        arr.sort((a, b) => a.position - b.position || b.created_at.localeCompare(a.created_at));
    }
    return arr;
  }, [notes, sortMode]);
  const authorNameById = reactExports.useMemo(() => new Map(profiles.map((profile) => [profile.id, profile.full_name || "Usuário sem nome"])), [profiles]);
  const noteAuthors = reactExports.useMemo(() => [...new Set(notes.map((note) => note.created_by).filter((id) => !!id))].map((id) => ({
    id,
    name: authorNameById.get(id) ?? "Usuário removido"
  })).sort((a, b) => a.name.localeCompare(b.name, "pt-BR")), [authorNameById, notes]);
  const selectableNoteAuthors = reactExports.useMemo(() => {
    if (!user?.id || noteAuthors.some((author) => author.id === user.id)) return noteAuthors;
    return [{
      id: user.id,
      name: authorNameById.get(user.id) ?? "Meu usuário"
    }, ...noteAuthors].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }, [authorNameById, noteAuthors, user?.id]);
  const filteredNotes = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    return sortedNotes.filter((note) => {
      const matchesAuthor = createdBy === "all" || note.created_by === createdBy;
      const matchesSearch = !q || note.title.toLowerCase().includes(q) || (note.content ?? "").toLowerCase().includes(q);
      return matchesAuthor && matchesSearch;
    });
  }, [createdBy, sortedNotes, search]);
  reactExports.useEffect(() => {
    if (loading) return;
    if (selectedId && filteredNotes.some((note) => note.id === selectedId)) return;
    setSelectedId(filteredNotes[0]?.id ?? null);
  }, [filteredNotes, loading, selectedId]);
  reactExports.useEffect(() => {
    const hasOwnNote = notes.some((note) => note.created_by === user?.id);
    if (!clientId || !user?.id || loading || createdBy !== user.id || hasOwnNote) return;
    const key = `${clientId}:${user.id}`;
    if (autoCreatedFor.current === key) return;
    autoCreatedFor.current = key;
    void addNote();
  }, [clientId, createdBy, loading, notes, user?.id]);
  const move = async (id, dir) => {
    const ordered = [...sortedNotes];
    const idx = ordered.findIndex((n) => n.id === id);
    const swap = idx + dir;
    if (idx < 0 || swap < 0 || swap >= ordered.length) return;
    [ordered[idx], ordered[swap]] = [ordered[swap], ordered[idx]];
    const reIndexed = ordered.map((n, i) => ({
      ...n,
      position: i
    }));
    setNotes(reIndexed);
    await Promise.all(reIndexed.map((n) => sb.from("client_notes").update({
      position: n.position
    }).eq("id", n.id)));
  };
  const selected = reactExports.useMemo(() => notes.find((n) => n.id === selectedId) ?? null, [notes, selectedId]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: embedded ? "flex min-h-[720px] flex-col" : "flex h-[calc(100vh-0px)] flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b bg-background p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "flex items-center gap-2 text-2xl font-bold tracking-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(NotebookPen, { className: "h-6 w-6" }),
          " Anotações"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Anotações dedicadas por cliente, com data, grifos e anexos." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        !fixedClientId && /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: clientId ?? void 0, onValueChange: (v) => setClientId(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[260px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecione um cliente" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: clients.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: addNote, disabled: !clientId, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
          " Nova anotação"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-0 flex-1 grid-cols-1 gap-0 md:grid-cols-[340px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "flex min-h-0 flex-col border-r bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 border-b p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar anotação…", value: search, onChange: (e) => setSearch(e.target.value), className: "h-8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "Ordenar:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sortMode, onValueChange: (v) => setSortMode(v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-7 flex-1 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "manual", children: "Manual (arrastar)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "date_desc", children: "Data ↓ (mais recente)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "date_asc", children: "Data ↑ (mais antiga)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "updated_desc", children: "Atualizado recente" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "title_asc", children: "Título A→Z" })
              ] })
            ] })
          ] }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-[11px] text-muted-foreground", children: "Criado por:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: createdBy, onValueChange: setCreatedBy, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-7 flex-1 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Todos os usuários" }),
                selectableNoteAuthors.map((author) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: author.id, children: author.name }, author.id))
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-2", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-4 text-sm text-muted-foreground", children: "Carregando…" }) : filteredNotes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded border border-dashed p-6 text-center text-xs text-muted-foreground", children: clientId ? "Nenhuma anotação ainda." : "Selecione um cliente." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: filteredNotes.map((n, i) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-stretch gap-1", children: [
            sortMode === "manual" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-5 w-5", onClick: (e) => {
                e.stopPropagation();
                void move(n.id, -1);
              }, disabled: i === 0, title: "Mover para cima", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-5 w-5", onClick: (e) => {
                e.stopPropagation();
                void move(n.id, 1);
              }, disabled: i === filteredNotes.length - 1, title: "Mover para baixo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3 w-3" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setSelectedId(n.id), className: `flex-1 rounded-md border px-3 py-2 text-left transition ${selectedId === n.id ? "border-primary bg-primary/10" : "border-transparent hover:bg-muted"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-1 text-sm font-medium", children: n.title || "(sem título)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-[10px] text-muted-foreground", children: n.note_date ? format(parseISO(n.note_date), "dd/MM", {
                  locale: ptBR
                }) : "" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-[11px] text-muted-foreground", dangerouslySetInnerHTML: {
                __html: (n.content_html || n.content || "").replace(/<[^>]+>/g, " ")
              } }),
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[10px] text-muted-foreground", children: [
                "Criada por: ",
                n.created_by ? authorNameById.get(n.created_by) ?? "Usuário removido" : "Não identificado"
              ] })
            ] })
          ] }, n.id);
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "min-h-0 overflow-y-auto p-4", children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(NoteEditor, { note: selected, onPatch: (p) => patchNote(selected.id, p), onSave: (p) => persistNote(selected.id, p), onDelete: () => deleteNote(selected.id) }, selected.id) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "grid h-full place-items-center p-10 text-center text-sm text-muted-foreground", children: "Selecione ou crie uma anotação." }) })
    ] })
  ] });
}
function NoteEditor({
  note,
  onPatch,
  onSave,
  onDelete
}) {
  const {
    user
  } = useAuth();
  const aiFormat = useServerFn(formatNoteWithAI);
  const [title, setTitle] = reactExports.useState(note.title);
  const [noteDate, setNoteDate] = reactExports.useState(note.note_date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const editorRef = reactExports.useRef(null);
  const fsEditorRef = reactExports.useRef(null);
  const pendingPatch = reactExports.useRef({});
  const syncingRef = reactExports.useRef(false);
  const selectedTextRangeRef = reactExports.useRef(null);
  const [saveState, setSaveState] = reactExports.useState("idle");
  const [fullscreen, setFullscreen] = reactExports.useState(false);
  const [aiLoading, setAiLoading] = reactExports.useState(false);
  const [editorHtml, setEditorHtml] = reactExports.useState(note.content_html ?? note.content ?? "");
  const [highlightColor, setHighlightColor] = reactExports.useState(null);
  const [attachments, setAttachments] = reactExports.useState([]);
  const [attUrls, setAttUrls] = reactExports.useState({});
  const [uploading, setUploading] = reactExports.useState(false);
  const [preview, setPreview] = reactExports.useState(null);
  const setEditorsHTML = reactExports.useCallback((html) => {
    syncingRef.current = true;
    setEditorHtml(html);
    syncEditorDom(editorRef.current, html);
    syncEditorDom(fsEditorRef.current, html);
    requestAnimationFrame(() => {
      syncingRef.current = false;
    });
  }, []);
  reactExports.useEffect(() => {
    setEditorsHTML(note.content_html ?? note.content ?? "");
    setTitle(note.title);
    setNoteDate(note.note_date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
    setHighlightColor(null);
    pendingPatch.current = {};
    setSaveState("idle");
  }, [note.id]);
  reactExports.useEffect(() => {
    if (fullscreen) {
      const html = editorHtml || editorRef.current?.innerHTML || note.content_html || note.content || "";
      requestAnimationFrame(() => {
        syncEditorDom(fsEditorRef.current, html);
      });
    } else {
      syncEditorDom(editorRef.current, editorHtml || fsEditorRef.current?.innerHTML || "");
    }
  }, [fullscreen, editorHtml]);
  const loadAttachments = async () => {
    const {
      data,
      error
    } = await sb.from("client_note_attachments").select("*").eq("note_id", note.id).order("created_at", {
      ascending: true
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    const list = data ?? [];
    setAttachments(list);
    const next = {};
    await Promise.all(list.map(async (a) => {
      const {
        data: signed
      } = await supabase.storage.from("task-attachments").createSignedUrl(a.storage_path, 3600);
      if (signed) next[a.id] = signed.signedUrl;
    }));
    setAttUrls(next);
  };
  reactExports.useEffect(() => {
    void loadAttachments();
  }, [note.id]);
  const doSave = reactExports.useCallback(async () => {
    const patch = pendingPatch.current;
    if (!Object.keys(patch).length) return;
    pendingPatch.current = {};
    setSaveState("saving");
    try {
      await onSave(patch);
      setSaveState("saved");
      setTimeout(() => setSaveState((s) => s === "saved" ? "idle" : s), 1500);
    } catch (e) {
      setSaveState("dirty");
      toast.error(e?.message ?? "Falha ao salvar");
    }
  }, [onSave]);
  const stageChange = reactExports.useCallback((patch) => {
    onPatch(patch);
    pendingPatch.current = {
      ...pendingPatch.current,
      ...patch
    };
    setSaveState("dirty");
  }, [onPatch]);
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (saveState === "dirty" || saveState === "saving" || Object.keys(pendingPatch.current).length) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [saveState]);
  const getActiveEditor = () => fullscreen ? fsEditorRef.current : editorRef.current;
  const applyEditorChange = reactExports.useCallback((html) => {
    setEditorsHTML(html);
    stageChange({
      content_html: html,
      content: extractTextFromHtml(html)
    });
  }, [setEditorsHTML, stageChange]);
  const exec = (cmd, value) => {
    const ed = getActiveEditor();
    ed?.focus();
    document.execCommand(cmd, false, value);
    const html = ed?.innerHTML ?? "";
    applyEditorChange(html);
  };
  const applyHighlightColor = (color) => {
    setHighlightColor(color);
    exec("hiliteColor", color);
  };
  const preserveSelectedText = () => {
    const ed = getActiveEditor();
    const selection = window.getSelection();
    if (!ed || !selection?.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (ed.contains(range.commonAncestorContainer)) {
      selectedTextRangeRef.current = range.cloneRange();
    }
  };
  const clearHighlight = () => {
    const ed = getActiveEditor();
    const savedRange = selectedTextRangeRef.current;
    ed?.focus();
    if (savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedRange);
    }
    document.execCommand("hiliteColor", false, "transparent");
    document.execCommand("backColor", false, "transparent");
    selectedTextRangeRef.current = null;
    applyEditorChange(ed?.innerHTML ?? "");
  };
  const onEditorInput = (which) => {
    if (syncingRef.current) return;
    const ed = which === "fs" ? fsEditorRef.current : editorRef.current;
    const html = ed?.innerHTML ?? "";
    applyEditorChange(html);
  };
  const onPaste = (e) => {
    const cd = e.clipboardData;
    const html = cd.getData("text/html");
    const text = cd.getData("text/plain");
    if (html && html.trim()) return;
    if (!text) return;
    const looksLikeMarkdown = /(^|\n)\s*(#{1,6}\s|[-*+]\s|\d+\.\s|>\s|```)|\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(/.test(text);
    if (!looksLikeMarkdown) return;
    e.preventDefault();
    const converted = String(g.parse(text, {
      breaks: true,
      async: false
    }));
    document.execCommand("insertHTML", false, converted);
    const ed = getActiveEditor();
    if (ed) applyEditorChange(ed.innerHTML);
  };
  const runAIFormat = async () => {
    const ed = getActiveEditor();
    const html = ed?.innerHTML ?? "";
    if (!html.trim()) {
      toast.info("Escreva algo primeiro.");
      return;
    }
    setAiLoading(true);
    try {
      const res = await aiFormat({
        data: {
          html,
          title
        }
      });
      applyEditorChange(res.html);
      toast.success("Texto reformatado pela IA.");
    } catch (e) {
      toast.error(e?.message ?? "Falha ao reformatar.");
    } finally {
      setAiLoading(false);
    }
  };
  const exportPDF = () => {
    const html = normalizeNoteHtmlForPdf(editorHtml || getActiveEditor()?.innerHTML || "");
    const dateLabel = noteDate ? format(parseISO(noteDate), "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR
    }) : "";
    Promise.resolve().then(() => openNotePrintPreview({
      title: title || "Sem título",
      dateLabel,
      html
    })).catch((error) => {
      toast.error(error?.message ?? "Falha ao gerar PDF.");
    });
  };
  const onUpload = async (fl) => {
    if (!fl || !fl.length || !user) return;
    setUploading(true);
    for (const file of Array.from(fl)) {
      const safe = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_");
      const path = `notes/${note.id}/${Date.now()}_${safe}`;
      const {
        error: upErr
      } = await supabase.storage.from("task-attachments").upload(path, file);
      if (upErr) {
        toast.error(upErr.message);
        continue;
      }
      const {
        error: insErr
      } = await sb.from("client_note_attachments").insert({
        note_id: note.id,
        file_name: file.name,
        storage_path: path,
        mime_type: file.type,
        size_bytes: file.size,
        uploaded_by: user.id
      });
      if (insErr) toast.error(insErr.message);
    }
    setUploading(false);
    void loadAttachments();
  };
  const removeAttachment = async (a) => {
    if (!confirm(`Excluir "${a.file_name}"?`)) return;
    await supabase.storage.from("task-attachments").remove([a.storage_path]);
    await sb.from("client_note_attachments").delete().eq("id", a.id);
    void loadAttachments();
  };
  const openAttachment = (a) => {
    const canPreview = PREVIEWABLE_MIME_RE.test(a.mime_type ?? "");
    if (canPreview) {
      setPreview({
        file_name: a.file_name,
        storage_path: a.storage_path,
        mime_type: a.mime_type
      });
      return;
    }
    const u = attUrls[a.id];
    if (u) window.open(u, "_blank", "noopener,noreferrer");
  };
  const SaveBadge = /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${saveState === "saved" ? "bg-green-500/15 text-green-600 dark:text-green-400" : saveState === "saving" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400" : saveState === "dirty" ? "bg-amber-500/15 text-amber-700 dark:text-amber-400" : "bg-muted text-muted-foreground"}`, title: "Estado do salvamento", children: [
    saveState === "saving" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : saveState === "saved" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : saveState === "dirty" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-amber-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 opacity-60" }),
    saveState === "saving" ? "Salvando…" : saveState === "saved" ? "Salvo" : saveState === "dirty" ? "Não salvo" : "Salvo"
  ] });
  const Toolbar = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1 rounded-md border bg-muted/30 p-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => exec("bold"), title: "Negrito (Ctrl+B)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bold, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => exec("italic"), title: "Itálico (Ctrl+I)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Italic, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => exec("underline"), title: "Sublinhado", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Underline, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-1 h-5 w-px bg-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => applyHighlightColor("#fde047"), title: "Grifar amarelo", className: highlightColor === "#fde047" ? "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400" : "text-yellow-700 dark:text-yellow-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Highlighter, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: "Amarelo" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => applyHighlightColor("#86efac"), title: "Grifar verde", className: highlightColor === "#86efac" ? "bg-green-500/15 text-green-700 dark:text-green-400" : "text-green-700 dark:text-green-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Highlighter, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: "Verde" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => applyHighlightColor("#fca5a5"), title: "Grifar vermelho", className: highlightColor === "#fca5a5" ? "bg-red-500/15 text-red-700 dark:text-red-400" : "text-red-700 dark:text-red-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Highlighter, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: "Vermelho" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => applyHighlightColor("#93c5fd"), title: "Grifar azul", className: highlightColor === "#93c5fd" ? "bg-blue-500/15 text-blue-700 dark:text-blue-400" : "text-blue-700 dark:text-blue-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Highlighter, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: "Azul" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onPointerDown: (e) => {
      preserveSelectedText();
      e.preventDefault();
    }, onClick: clearHighlight, title: "Remover grifo do texto selecionado", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eraser, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: "Remover grifo" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-1 h-5 w-px bg-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: runAIFormat, disabled: aiLoading, title: "Reformatar texto com IA", children: [
      aiLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: "Auto-ajuste" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: exportPDF, title: "Gerar PDF em nova aba", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: "PDF" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => setFullscreen((v) => !v), title: "Modo foco (tela cheia)", children: [
      fullscreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: fullscreen ? "Sair" : "Foco" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2 pr-1", children: [
      SaveBadge,
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", size: "sm", onClick: () => void doSave(), disabled: saveState === "saving", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-1 h-4 w-4" }),
        " Salvar"
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mx-auto flex h-full max-w-4xl flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 border-b p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "note-title", className: "block px-1 text-[11px] font-bold uppercase tracking-widest text-primary", children: "Título da anotação" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "note-title", value: title, onChange: (e) => {
              setTitle(e.target.value);
              stageChange({
                title: e.target.value
              });
            }, onBlur: () => stageChange({
              title
            }), placeholder: "Título da anotação", className: "h-12 flex-1 rounded-lg border-primary/25 bg-primary/5 px-3 text-xl font-bold shadow-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "mt-1 text-destructive", onClick: onDelete, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-2 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Data:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: noteDate, onChange: (e) => {
            setNoteDate(e.target.value);
            stageChange({
              note_date: e.target.value
            });
          }, className: "h-8 w-[160px]" })
        ] }) }),
        Toolbar
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: editorRef, contentEditable: true, suppressContentEditableWarning: true, onInput: () => onEditorInput("main"), onPaste, onBlur: () => stageChange({
          content_html: editorRef.current?.innerHTML ?? "",
          content: editorRef.current?.innerText ?? ""
        }), className: "prose prose-sm dark:prose-invert min-h-[360px] max-w-none rounded-md border border-dashed bg-background p-5 text-base leading-relaxed outline-none transition focus:border-primary focus:bg-card focus:shadow-lg focus:ring-2 focus:ring-primary/30", "data-placeholder": "Escreva sua anotação aqui… (use o botão Salvar para registrar as alterações)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(FileDropZone, { onFiles: (files) => void onUpload(files), disabled: uploading, className: "mt-6 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2 text-sm font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-4 w-4" }),
              " Anexos",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-normal text-muted-foreground", children: [
                "(",
                attachments.length,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", multiple: true, accept: "*/*", className: "hidden", onChange: (e) => {
                void onUpload(e.target.files);
                e.currentTarget.value = "";
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-md border bg-background px-3 py-1 text-xs hover:bg-muted", children: uploading ? "Enviando…" : "+ Adicionar arquivo" })
            ] })
          ] }),
          attachments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded border border-dashed p-4 text-center text-xs text-muted-foreground", children: "Nenhum anexo. Aceita qualquer tipo (imagens, PDF, Word, Excel, etc.)." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: attachments.map((a) => {
            const isImage = a.mime_type?.startsWith("image/");
            const canPreview = PREVIEWABLE_MIME_RE.test(a.mime_type ?? "");
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 rounded-md border bg-card p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => openAttachment(a), className: "h-10 w-10 shrink-0 overflow-hidden rounded border bg-muted", title: a.file_name, children: isImage && attUrls[a.id] ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: attUrls[a.id], alt: a.file_name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-muted-foreground", children: canPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => openAttachment(a), className: "flex min-w-0 flex-1 flex-col text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-sm", children: a.file_name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
                  a.mime_type || "arquivo",
                  a.size_bytes ? ` · ${Math.round(a.size_bytes / 1024)} KB` : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => openAttachment(a), children: "Abrir" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 text-destructive", onClick: () => void removeAttachment(a), title: "Excluir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] }, a.id);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-[11px] text-muted-foreground", children: [
          "Atualizado em ",
          format(new Date(note.updated_at), "dd MMM yyyy 'às' HH:mm", {
            locale: ptBR
          }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AttachmentPreviewDialog, { open: !!preview, onOpenChange: (o) => {
        if (!o) setPreview(null);
      }, attachment: preview })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: fullscreen, onOpenChange: setFullscreen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "flex h-[96vh] max-h-[96vh] w-[96vw] max-w-[1100px] flex-col gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => {
          setTitle(e.target.value);
          stageChange({
            title: e.target.value
          });
        }, placeholder: "Título da anotação", className: "h-11 flex-1 border-0 px-1 text-2xl font-bold shadow-none focus-visible:ring-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: noteDate ? format(parseISO(noteDate), "dd 'de' MMM yyyy", {
          locale: ptBR
        }) : "" })
      ] }),
      Toolbar,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: fsEditorRef, contentEditable: true, suppressContentEditableWarning: true, onInput: () => onEditorInput("fs"), onPaste, onBlur: () => stageChange({
        content_html: fsEditorRef.current?.innerHTML ?? "",
        content: fsEditorRef.current?.innerText ?? ""
      }), className: "prose dark:prose-invert min-h-0 flex-1 max-w-none overflow-y-auto rounded-md border bg-background p-8 text-lg leading-relaxed outline-none focus:ring-2 focus:ring-primary/30", "data-placeholder": "Modo foco — escreva à vontade…" })
    ] }) })
  ] });
}
const $$splitComponentImporter$e = () => import("./reports-DCGUbHcU.mjs");
const Route$e = createFileRoute("/_app/reports")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./settings-C9Zba1mV.mjs");
const Route$d = createFileRoute("/_app/settings")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./tasks-cVzyxFPE.mjs");
const Route$c = createFileRoute("/_app/tasks")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./trash-BQdN91RY.mjs");
const Route$b = createFileRoute("/_app/trash")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./users-BAMMthF9.mjs");
const Route$a = createFileRoute("/_app/users")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./client-report._clientId-DXd5Ka6J.mjs");
const Route$9 = createFileRoute("/_app/client-report/$clientId")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./clients.index-Du4mjxdb.mjs");
const Route$8 = createFileRoute("/_app/clients/")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./clients.new-yE1Yj3vA.mjs");
const Route$7 = createFileRoute("/_app/clients/new")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./portal.entregas-C7ZXWrjU.mjs");
const Route$6 = createFileRoute("/_app/portal/entregas")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./portal.financeiro-bIXyjSJo.mjs");
const Route$5 = createFileRoute("/_app/portal/financeiro")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./tasks.index-Bpq4LZou.mjs");
const Route$4 = createFileRoute("/_app/tasks/")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./tasks.calendar-DDjPsUtS.mjs");
const Route$3 = createFileRoute("/_app/tasks/calendar")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./tasks.kanban-r5KeG-u1.mjs");
const Route$2 = createFileRoute("/_app/tasks/kanban")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./tasks.list-BlGNh7dB.mjs");
const Route$1 = createFileRoute("/_app/tasks/list")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  validateSearch: (s) => ({
    task: typeof s.task === "string" ? s.task : void 0,
    mine: s.mine === "1" || s.mine === true || s.mine === "true" ? true : void 0
  })
});
const $$splitComponentImporter = () => import("./clients._clientId.edit-5fDMbnbm.mjs");
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
const AppClientsRoute = Route$j.update({
  id: "/clients",
  path: "/clients",
  getParentRoute: () => AppRoute
});
const AppDashboardRoute = Route$i.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AppRoute
});
const AppImportAtaRoute = Route$h.update({
  id: "/import-ata",
  path: "/import-ata",
  getParentRoute: () => AppRoute
});
const AppMuralRoute = Route$g.update({
  id: "/mural",
  path: "/mural",
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
  AppClientsRoute: AppClientsRouteWithChildren,
  AppDashboardRoute,
  AppImportAtaRoute,
  AppMuralRoute,
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
  AttachmentPreviewDialog as A,
  Button as B,
  Card as C,
  Dialog as D,
  useSubtasks as E,
  FileDropZone as F,
  useTaskCollaborators as G,
  useUserColumnOrder as H,
  Input as I,
  useUserTaskOrder as J,
  useTaskTagLinks as K,
  Label as L,
  Route$1 as M,
  Route as N,
  NotesWorkspace as O,
  router as P,
  Route$9 as R,
  Select as S,
  DialogContent as a,
  DialogHeader as b,
  DialogTitle as c,
  DialogFooter as d,
  useClients as e,
  useTasks as f,
  useAssignableProfiles as g,
  useColumns as h,
  createSsrRpc as i,
  useProfiles as j,
  useTaskTags as k,
  useTaskStatuses as l,
  useServerFn as m,
  SelectTrigger as n,
  SelectValue as o,
  SelectContent as p,
  SelectItem as q,
  DialogDescription as r,
  formatNoteWithAI as s,
  useDeletedTasks as t,
  useAuth as u,
  DialogTrigger as v,
  ClientsIndexPage as w,
  cn as x,
  buttonVariants as y,
  useClientInvoices as z
};
