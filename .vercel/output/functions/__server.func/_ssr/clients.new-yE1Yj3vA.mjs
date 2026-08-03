import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, B as Button, C as Card, L as Label, I as Input } from "./router-ZM7179_C.mjs";
import { s as supabase } from "./client-Bh9iiLf9.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/marked.mjs";
import "../_libs/seroval.mjs";
import { am as ArrowLeft, ah as ImageUp, j as Save } from "../_libs/lucide-react.mjs";
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
function NewClientPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    user
  } = useAuth();
  const [saving, setSaving] = reactExports.useState(false);
  const [cnpj, setCnpj] = reactExports.useState("");
  const [legalName, setLegalName] = reactExports.useState("");
  const [tradeName, setTradeName] = reactExports.useState("");
  const [stateRegistration, setStateRegistration] = reactExports.useState("");
  const [municipalRegistration, setMunicipalRegistration] = reactExports.useState("");
  const [address, setAddress] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [responsible, setResponsible] = reactExports.useState("");
  const [color, setColor] = reactExports.useState("#1e3a8a");
  const [avatarFile, setAvatarFile] = reactExports.useState(null);
  const [avatarPreview, setAvatarPreview] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview(null);
      return;
    }
    const previewUrl = URL.createObjectURL(avatarFile);
    setAvatarPreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [avatarFile]);
  const save = async () => {
    const name = tradeName.trim() || legalName.trim();
    if (!name) {
      toast.error("Preencha o Nome fantasia ou a Razão social.");
      return;
    }
    setSaving(true);
    const {
      data: newClient,
      error
    } = await supabase.from("clients").insert({
      name,
      cnpj: cnpj || null,
      legal_name: legalName || null,
      trade_name: tradeName || null,
      state_registration: stateRegistration || null,
      municipal_registration: municipalRegistration || null,
      address: address || null,
      phone: phone || null,
      email: email || null,
      responsible: responsible || null,
      color,
      created_by: user?.id
    }).select().single();
    if (error) {
      setSaving(false);
      toast.error(error.message);
      return;
    }
    if (avatarFile && newClient) {
      const extension = avatarFile.name.split(".").pop()?.toLowerCase() || "png";
      const avatarPath = `clients/${newClient.id}/avatar-${Date.now()}.${extension}`;
      const {
        error: uploadError
      } = await supabase.storage.from("task-attachments").upload(avatarPath, avatarFile, {
        contentType: avatarFile.type
      });
      if (uploadError) {
        setSaving(false);
        toast.error(`Cliente cadastrado, mas não foi possível enviar o logo: ${uploadError.message}`);
        queryClient.invalidateQueries({
          queryKey: ["clients"]
        });
        return;
      }
      const {
        error: avatarError
      } = await supabase.from("clients").update({
        avatar_path: avatarPath
      }).eq("id", newClient.id);
      if (avatarError) {
        setSaving(false);
        toast.error(`Cliente cadastrado, mas não foi possível vincular o logo: ${avatarError.message}`);
        queryClient.invalidateQueries({
          queryKey: ["clients"]
        });
        return;
      }
    }
    setSaving(false);
    queryClient.invalidateQueries({
      queryKey: ["clients"]
    });
    toast.success("Cliente cadastrado");
    navigate({
      to: "/clients"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl space-y-6 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "icon", variant: "ghost", title: "Voltar para clientes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/clients", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Novo cliente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Cadastre os dados comerciais e de contato do cliente." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Logo do cliente", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "new-client-avatar", className: "flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-primary/50 bg-primary/5 p-4 transition-colors hover:bg-primary/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUp, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Enviar logo do cliente" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "PNG, JPG ou WebP" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "new-client-avatar", type: "file", accept: "image/png,image/jpeg,image/webp", className: "sr-only", onChange: (event) => setAvatarFile(event.target.files?.[0] ?? null) }),
          avatarFile && avatarPreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-md border bg-muted/30 p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarPreview, alt: "Prévia do logo selecionado", className: "block h-14 w-14 shrink-0 rounded border bg-muted object-contain p-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Imagem selecionada" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", title: avatarFile.name, children: avatarFile.name })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Dados cadastrais" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "CNPJ", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: cnpj, onChange: (event) => setCnpj(event.target.value) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome fantasia", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: tradeName, onChange: (event) => setTradeName(event.target.value) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Razão social", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: legalName, onChange: (event) => setLegalName(event.target.value) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Responsável", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: responsible, onChange: (event) => setResponsible(event.target.value) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Inscrição Estadual", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: stateRegistration, onChange: (event) => setStateRegistration(event.target.value) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Inscrição Municipal", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: municipalRegistration, onChange: (event) => setMunicipalRegistration(event.target.value) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3 border-t pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Contato" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Telefone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: phone, onChange: (event) => setPhone(event.target.value) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "E-mail", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: email, onChange: (event) => setEmail(event.target.value) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Endereço completo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: address, onChange: (event) => setAddress(event.target.value) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Cor de identificação" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: color, onChange: (event) => setColor(event.target.value), className: "h-9 w-9 cursor-pointer appearance-none rounded-full border-0 bg-transparent p-0 shadow-sm ring-1 ring-border transition hover:ring-2 hover:ring-primary/50 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0 [&::-moz-color-swatch]:rounded-full [&::-moz-color-swatch]:border-0" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 border-t pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/clients", children: "Cancelar" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: save, disabled: saving, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
          saving ? "Salvando..." : "Salvar cliente"
        ] })
      ] })
    ] }) })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: label }),
    children
  ] });
}
export {
  NewClientPage as component
};
