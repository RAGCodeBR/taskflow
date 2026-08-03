import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, C as Card, L as Label, I as Input, B as Button } from "./router-DXKzFnT6.mjs";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./avatar-Cs2p32WM.mjs";
import { s as supabase } from "./client-Bh9iiLf9.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { ad as ImageUp, T as Trash2, D as LoaderCircle } from "../_libs/lucide-react.mjs";

import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/unenv.mjs";


import "../_libs/seroval-plugins.mjs";


import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
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
const MAX_AVATAR_SIZE = 5 * 1024 * 1024;
const ACCEPTED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];
function Settings() {
  const {
    profile,
    user,
    refreshProfile
  } = useAuth();
  const queryClient = useQueryClient();
  const [name, setName] = reactExports.useState(profile?.full_name ?? "");
  const [avatarFile, setAvatarFile] = reactExports.useState(null);
  const [avatarPreview, setAvatarPreview] = reactExports.useState(profile?.avatar_url ?? null);
  const [removeAvatar, setRemoveAvatar] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setName(profile?.full_name ?? "");
    if (!avatarFile) setAvatarPreview(profile?.avatar_url ?? null);
  }, [profile, avatarFile]);
  reactExports.useEffect(() => {
    if (!avatarFile) return;
    const preview = URL.createObjectURL(avatarFile);
    setAvatarPreview(preview);
    return () => URL.revokeObjectURL(preview);
  }, [avatarFile]);
  const selectAvatar = (file) => {
    if (!file) return;
    if (!ACCEPTED_AVATAR_TYPES.includes(file.type)) {
      toast.error("Use uma imagem PNG, JPG ou WebP.");
      return;
    }
    if (file.size > MAX_AVATAR_SIZE) {
      toast.error("A foto deve ter no máximo 5 MB.");
      return;
    }
    setRemoveAvatar(false);
    setAvatarFile(file);
  };
  const save = async () => {
    if (!user) return;
    const fullName = name.trim();
    if (!fullName) {
      toast.error("Informe seu nome completo.");
      return;
    }
    setSaving(true);
    try {
      let avatarUrl = removeAvatar ? null : profile?.avatar_url ?? null;
      if (avatarFile) {
        const extension = avatarFile.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `${user.id}/avatar-${Date.now()}.${extension}`;
        const {
          error: uploadError
        } = await supabase.storage.from("profile-avatars").upload(path, avatarFile, {
          contentType: avatarFile.type,
          upsert: false
        });
        if (uploadError) throw uploadError;
        avatarUrl = supabase.storage.from("profile-avatars").getPublicUrl(path).data.publicUrl;
      }
      const {
        error
      } = await supabase.from("profiles").update({
        full_name: fullName,
        avatar_url: avatarUrl
      }).eq("id", user.id);
      if (error) throw error;
      setAvatarFile(null);
      setRemoveAvatar(false);
      await refreshProfile();
      await queryClient.invalidateQueries({
        queryKey: ["profiles"]
      });
      toast.success("Perfil atualizado");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };
  const initials = (name || user?.email || "U").slice(0, 2).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl space-y-6 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Personalização" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Edite seu perfil e escolha a foto usada no Kanban." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "space-y-5 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-20 w-20 border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: removeAvatar ? void 0 : avatarPreview || void 0, alt: "Sua foto de perfil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-lg", children: initials })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "profile-avatar", className: "inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUp, { className: "h-4 w-4" }),
            " Escolher foto"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "profile-avatar", type: "file", accept: "image/png,image/jpeg,image/webp", className: "sr-only", onChange: (event) => selectAvatar(event.target.files?.[0] ?? null) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "PNG, JPG ou WebP, até 5 MB." }),
          (avatarPreview || profile?.avatar_url) && !removeAvatar && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", className: "h-auto px-0 text-destructive hover:text-destructive", onClick: () => {
            setAvatarFile(null);
            setRemoveAvatar(true);
            setAvatarPreview(null);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-1 h-3.5 w-3.5" }),
            " Remover foto"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-name", children: "Nome completo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "profile-name", value: name, onChange: (event) => setName(event.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "E-mail" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: user?.email ?? "", disabled: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, disabled: saving, children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
        " Salvando..."
      ] }) : "Salvar perfil" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Como a foto é usada" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Sua foto aparece nos cards do Kanban quando você for responsável ou colaborador de uma tarefa." })
    ] })
  ] });
}
export {
  Settings as component
};
