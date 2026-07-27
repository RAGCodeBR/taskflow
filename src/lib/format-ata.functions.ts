import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { generateGeminiContent } from "@/lib/gemini.server";

const InputSchema = z
  .object({
    pdfBase64: z.string().optional(),
    text: z.string().optional(),
    filename: z.string().optional(),
  })
  .refine((d) => !!(d.pdfBase64 || (d.text && d.text.trim())), {
    message: "Envie um PDF ou cole o texto da reunião",
  });

export const formatAtaWithGemini = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const today = new Date().toLocaleDateString("pt-BR");

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

    const userContent: Array<
      { text: string } | { inlineData: { mimeType: string; data: string } }
    > = [];
    if (data.pdfBase64) {
      userContent.push({
        inlineData: { mimeType: "application/pdf", data: data.pdfBase64 },
      });
    }
    userContent.push({
      text: data.text
        ? `Conteúdo bruto da reunião:\n\n${data.text}\n\nGere a ata formatada em HTML conforme as regras.`
        : `Gere a ata formatada da reunião anexa conforme as regras.`,
    });

    const raw = await generateGeminiContent({
      systemInstruction: systemPrompt,
      parts: userContent,
      responseMimeType: "text/html",
    });
    const html = raw
      .replace(/^```html\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    // Extract a plain-text version for the `content` column
    const text = html
      .replace(/<\/(h2|h3|p|li|tr)>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    return { html, text };
  });
