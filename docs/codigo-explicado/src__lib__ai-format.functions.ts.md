# src/lib/ai-format.functions.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createServerFn } from "@tanstack/react-start";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { generateGeminiContent } from "@/lib/gemini.server";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `export const formatNoteWithAI = createServerFn({ method: "POST" })` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 6 | `  .middleware([requireSupabaseAuth])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `  .inputValidator((input: { html: string; title?: string }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 8 | `    if (typeof input?.html !== "string") throw new Error("html requerido");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 9 | `    if (input.html.length > 50_000) throw new Error("Texto muito grande");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 10 | `    return { html: input.html, title: input.title ?? "" };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 11 | `  })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `  .handler(async ({ data }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 13 | `    const apiKey = process.env.LOVABLE_API_KEY;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 14 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 15 | `    const prompt = \`Você é um assistente que reformata anotações de reunião em HTML profissional, claro e bem estruturado em PORTUGUÊS do Brasil.` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 16 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 17 | `REGRAS:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `- Devolva APENAS HTML válido (sem markdown, sem \\`\\`\\`html).` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `- Use <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <u>.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `- PRESERVE qualquer <span style="background-color:..."> (grifos do usuário) exatamente como estão.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `- Não invente informações; apenas organize, agrupe em seções (ex: "Resumo", "Pontos discutidos", "Decisões", "Próximos passos") e melhore a redação.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `- Mantenha o idioma original.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 24 | `Título da anotação: ${data.title || "(sem título)"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 26 | `HTML original:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `${data.html}\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 29 | `    const geminiContent = await generateGeminiContent({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 30 | `      systemInstruction:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `        "Reformate anotações em HTML limpo e profissional, sem inventar informações.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `      parts: [{ text: prompt }],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `      responseMimeType: "text/plain",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 35 | `    const geminiHtml = geminiContent` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 36 | `      .replace(/^\`\`\`html\s*/i, "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `      .replace(/\`\`\`\s*$/i, "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `      .trim();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `    return { html: geminiHtml || data.html };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 41 | `    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 42 | `      method: "POST",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `      headers: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `        "Content-Type": "application/json",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `        Authorization: \`Bearer ${apiKey}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 47 | `      body: JSON.stringify({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `        model: "google/gemini-2.5-flash",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `        messages: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `          { role: "system", content: "Você reformata anotações em HTML limpo e profissional." },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `          { role: "user", content: prompt },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `        ],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `      }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 55 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 56 | `    if (!res.ok) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 57 | `      const t = await res.text();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 58 | `      throw new Error(\`AI Gateway: ${res.status} ${t.slice(0, 200)}\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 59 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 60 | `    const json = await res.json();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 61 | `    const content: string = json?.choices?.[0]?.message?.content ?? "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 62 | `    const cleaned = content` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 63 | `      .replace(/^\`\`\`html\s*/i, "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `      .replace(/\`\`\`\s*$/i, "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `      .trim();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `    return { html: cleaned || data.html };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 67 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 68 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
