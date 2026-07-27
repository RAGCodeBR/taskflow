import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { generateGeminiContent } from "@/lib/gemini.server";

export const formatNoteWithAI = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { html: string; title?: string }) => {
    if (typeof input?.html !== "string") throw new Error("html requerido");
    if (input.html.length > 50_000) throw new Error("Texto muito grande");
    return { html: input.html, title: input.title ?? "" };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;

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
      systemInstruction:
        "Reformate anotações em HTML limpo e profissional, sem inventar informações.",
      parts: [{ text: prompt }],
      responseMimeType: "text/plain",
    });
    const geminiHtml = geminiContent
      .replace(/^```html\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();
    return { html: geminiHtml || data.html };

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "Você reformata anotações em HTML limpo e profissional." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      throw new Error(`AI Gateway: ${res.status} ${t.slice(0, 200)}`);
    }
    const json = await res.json();
    const content: string = json?.choices?.[0]?.message?.content ?? "";
    const cleaned = content
      .replace(/^```html\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();
    return { html: cleaned || data.html };
  });
