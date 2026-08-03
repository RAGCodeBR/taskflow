import { c as createServerRpc, g as generateGeminiContent } from "./gemini.server-BRHWfzig.mjs";
import { c as createServerFn } from "./server-DJ8sPH9h.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CTknNXUw.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const formatNoteWithAI_createServerFn_handler = createServerRpc({
  id: "a787921ee7885a89f18e20f917552f25a52930cebb5359dea24b533512759549",
  name: "formatNoteWithAI",
  filename: "src/lib/ai-format.functions.ts"
}, (opts) => formatNoteWithAI.__executeServer(opts));
const formatNoteWithAI = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => {
  if (typeof input?.html !== "string") throw new Error("html requerido");
  if (input.html.length > 5e4) throw new Error("Texto muito grande");
  return {
    html: input.html,
    title: input.title ?? ""
  };
}).handler(formatNoteWithAI_createServerFn_handler, async ({
  data
}) => {
  process.env.LOVABLE_API_KEY;
  const prompt = `Você é um assistente que reformata anotações de reunião em HTML profissional, claro e bem estruturado em PORTUGUÊS do Brasil.

REGRAS:
- Devolva APENAS HTML válido (sem markdown, sem \`\`\`html).
- Use <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <u>.
- PRESERVE qualquer <span style="background-color:..."> (grifos do usuário) exatamente como estão.
- Não invente informações; apenas organize, agrupe em seções (ex: "Resumo", "Pontos discutidos", "Decisões", "Próximos passos") e melhore a redação.
- Mantenha o idioma original.

Título da anotação: ${data.title || "(sem título)"}

HTML original:
${data.html}`;
  const geminiContent = await generateGeminiContent({
    systemInstruction: "Reformate anotações em HTML limpo e profissional, sem inventar informações.",
    parts: [{
      text: prompt
    }],
    responseMimeType: "text/plain"
  });
  const geminiHtml = geminiContent.replace(/^```html\s*/i, "").replace(/```\s*$/i, "").trim();
  return {
    html: geminiHtml || data.html
  };
});
export {
  formatNoteWithAI_createServerFn_handler
};
