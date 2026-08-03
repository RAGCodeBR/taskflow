import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Route$9, e as useClients, m as useServerFn, B as Button, C as Card, i as createSsrRpc } from "./router-ZM7179_C.mjs";
import { c as createServerFn } from "./server-DJ8sPH9h.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CTknNXUw.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/marked.mjs";
import "../_libs/seroval.mjs";
import { am as ArrowLeft, an as Printer, a as Sparkles } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "./client-Bh9iiLf9.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
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
import "../_libs/date-fns.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const generateClientReport = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => {
  if (!input?.clientId || typeof input.clientId !== "string") throw new Error("clientId requerido");
  return {
    clientId: input.clientId
  };
}).handler(createSsrRpc("396ec2195f8f36010d13cff4d86b957ebf305db024ad438ebf67ec411374b67c"));
function ClientReportPage() {
  const {
    clientId
  } = Route$9.useParams();
  const {
    data: clients = []
  } = useClients();
  const client = clients.find((c) => c.id === clientId);
  const generate = useServerFn(generateClientReport);
  const [loading, setLoading] = reactExports.useState(false);
  const [html, setHtml] = reactExports.useState("");
  const [stats, setStats] = reactExports.useState(null);
  const run = async () => {
    setLoading(true);
    try {
      const r = await generate({
        data: {
          clientId
        }
      });
      setHtml(r.html);
      setStats(r.stats);
    } catch (e) {
      toast.error(e.message || "Falha ao gerar relatório");
    } finally {
      setLoading(false);
    }
  };
  const print = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"/><title>Relatório — ${client?.name ?? ""}</title>
      <style>
        body{font-family:Arial,Helvetica,sans-serif;color:#0f172a;padding:32px;max-width:900px;margin:auto;line-height:1.5}
        h1{border-bottom:2px solid #0f172a;padding-bottom:8px}
        h2{margin-top:24px;color:#1e3a8a}
        table{border-collapse:collapse;width:100%;margin:12px 0}
        th,td{border:1px solid #cbd5e1;padding:6px 10px;text-align:left;font-size:13px}
        th{background:#f1f5f9}
        ul,ol{padding-left:22px}
      </style></head><body>
      <h1>Relatório — ${client?.name ?? ""}</h1>
      ${html}
      </body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 400);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl space-y-4 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/clients", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-1 h-4 w-4" }),
          "Clientes"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold tracking-tight", children: [
          "Relatório IA — ",
          client?.name ?? "…"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        html && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: print, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "mr-1 h-4 w-4" }),
          "Imprimir"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: run, disabled: loading, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mr-1 h-4 w-4" }),
          loading ? "Gerando…" : html ? "Regerar" : "Gerar relatório"
        ] })
      ] })
    ] }),
    stats && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold", children: stats.total })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Concluídas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-emerald-600", children: stats.done })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pendentes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-amber-600", children: stats.pending })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Analisando todas as tarefas, observações e subtarefas do cliente… isso pode levar alguns segundos." }) : html ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-sm max-w-none [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-primary [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:bg-muted [&_th]:p-2 [&_th]:text-left [&_td]:border [&_td]:p-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5", dangerouslySetInnerHTML: {
      __html: html
    } }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-10 text-center text-sm text-muted-foreground", children: [
      "Clique em ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Gerar relatório" }),
      " para uma transcrição inteligente de tudo que foi feito para este cliente."
    ] }) })
  ] });
}
export {
  ClientReportPage as component
};
