import { c as createServerRpc, g as generateGeminiContent } from "./gemini.server-BRHWfzig.mjs";
import { c as createServerFn } from "./server-DJ8sPH9h.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CTknNXUw.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
const InputSchema = objectType({
  pdfBase64: stringType().optional(),
  text: stringType().optional(),
  filename: stringType().optional()
}).refine((d) => !!(d.pdfBase64 || d.text && d.text.trim()), {
  message: "Envie um PDF ou cole o texto da reunião"
});
const formatAtaWithGemini_createServerFn_handler = createServerRpc({
  id: "1ac0227fbe0dd79474df6631419249d0757766cdf1dcd6aeac31ad2535735f89",
  name: "formatAtaWithGemini",
  filename: "src/lib/format-ata.functions.ts"
}, (opts) => formatAtaWithGemini.__executeServer(opts));
const formatAtaWithGemini = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => InputSchema.parse(data)).handler(formatAtaWithGemini_createServerFn_handler, async ({
  data
}) => {
  const today = (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR");
  const systemPrompt = `Você organiza notas de reunião em uma ATA formal em português, no formato HTML estruturado abaixo. Use APENAS o conteúdo fornecido — não invente fatos. Se um campo não estiver claro, use "—".

FORMATO HTML (retorne SOMENTE o HTML, sem \`\`\`, sem comentários, sem <html>/<body>):

<h2>Ata de Reunião</h2>
<p><strong>TRR / Projeto:</strong> ...</p>
<table>
  <tr><td><strong>Data:</strong></td><td>...</td></tr>
  <tr><td><strong>Horário:</strong></td><td>...</td></tr>
  <tr><td><strong>Local:</strong></td><td>...</td></tr>
  <tr><td><strong>Participantes:</strong></td><td>...</td></tr>
  <tr><td><strong>Pauta:</strong></td><td>...</td></tr>
</table>

<h3>Resumo</h3>
<p>Parágrafos curtos resumindo os temas centrais. Pode usar <strong>destaques temáticos:</strong> seguidos da explicação.</p>

<h3>Pontos Discutidos</h3>
<ul>
  <li>Cada bullet objetivo e curto, com o ponto chave em evidência.</li>
</ul>

<h3>Próximas Etapas / Ações</h3>
<table>
  <thead><tr><th>Responsável</th><th>Ação</th></tr></thead>
  <tbody>
    <tr><td>Nome</td><td>Ação clara, no infinitivo.</td></tr>
  </tbody>
</table>

REGRAS:
- Preserve nomes próprios exatamente como aparecem.
- Se houver data/horário, use-os; caso ausente, use "${today}" para a data e "—" para horário.
- Não adicione introdução nem encerramento fora do HTML.
- Não use markdown. Apenas HTML simples (h2, h3, p, ul, li, table, tr, td, th, strong, em).`;
  const userContent = [];
  if (data.pdfBase64) {
    userContent.push({
      inlineData: {
        mimeType: "application/pdf",
        data: data.pdfBase64
      }
    });
  }
  userContent.push({
    text: data.text ? `Conteúdo bruto da reunião:

${data.text}

Gere a ata formatada em HTML conforme as regras.` : `Gere a ata formatada da reunião anexa conforme as regras.`
  });
  const raw = await generateGeminiContent({
    systemInstruction: systemPrompt,
    parts: userContent,
    responseMimeType: "text/plain"
  });
  const html = raw.replace(/^```html\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
  const text = html.replace(/<\/(h2|h3|p|li|tr)>/gi, "\n").replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").replace(/\n{3,}/g, "\n\n").trim();
  return {
    html,
    text
  };
});
export {
  formatAtaWithGemini_createServerFn_handler
};
