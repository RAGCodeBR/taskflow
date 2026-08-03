import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-Bh9iiLf9.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, B as Button } from "./router-DXKzFnT6.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a9 as Download } from "../_libs/lucide-react.mjs";
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
export {
  AttachmentPreviewDialog as A
};
