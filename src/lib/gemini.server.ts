type GeminiPart = { text: string } | { inlineData: { mimeType: string; data: string } };

type GenerateGeminiInput = {
  systemInstruction: string;
  parts: GeminiPart[];
  responseMimeType?: "text/plain" | "text/html" | "application/json";
};

export async function generateGeminiContent({
  systemInstruction,
  parts,
  responseMimeType = "text/plain",
}: GenerateGeminiInput) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey)
    throw new Error("A IA ainda não foi configurada. Defina GEMINI_API_KEY no servidor.");

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [{ role: "user", parts }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 4096, responseMimeType },
      }),
    },
  );

  if (!response.ok) {
    const details = await response.text();
    if (response.status === 429)
      throw new Error("Limite de uso da IA atingido. Tente novamente em instantes.");
    throw new Error(`Gemini API ${response.status}: ${details.slice(0, 240)}`);
  }

  const payload = await response.json();
  const text = (payload?.candidates?.[0]?.content?.parts ?? [])
    .map((part: { text?: string }) => part.text ?? "")
    .join("")
    .trim();
  if (!text) throw new Error("O Gemini não retornou conteúdo. Tente novamente.");
  return text;
}
