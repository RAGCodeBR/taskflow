import { generateGeminiContent } from "./src/lib/gemini.server.ts";

async function testGemini() {
  try {
    const response = await generateGeminiContent({
      systemInstruction: "Responda somente com a palavra solicitado.",
      parts: [{ text: "Responda: solicitado" }],
    });

    console.log("[Gemini] Conexão confirmada.");
    console.log(`[Gemini] Resposta: ${response}`);
  } catch (error) {
    console.error("[Gemini] Teste falhou:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

testGemini();
