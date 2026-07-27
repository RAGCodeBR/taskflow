type GeminiPart = { text: string } | { inlineData: { mimeType: string; data: string } };

type GenerateGeminiInput = {
  systemInstruction: string;
  parts: GeminiPart[];
  responseMimeType?: "text/plain" | "application/json";
};

export async function generateGeminiContent({
  systemInstruction,
  parts,
  responseMimeType = "text/plain",
}: GenerateGeminiInput) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey)
    throw new Error("A IA ainda não foi configurada. Defina GEMINI_API_KEY no servidor.");

  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash";
  const request = () =>
    fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: [{ role: "user", parts }],
          generationConfig: { maxOutputTokens: 4096, responseMimeType },
        }),
      },
    );

  let response = await request();
  // Gemini can briefly return 429/503 during demand spikes. Retry these
  // transient statuses before reporting a failure to the person using the app.
  for (const delay of [800, 1_600, 3_200]) {
    if (response.status !== 429 && response.status !== 503) break;
    await new Promise((resolve) => setTimeout(resolve, delay));
    response = await request();
  }

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
