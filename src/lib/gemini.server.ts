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
  void systemInstruction;
  void parts;
  void responseMimeType;
  throw new Error("A geração por IA está temporariamente em atualização.");
}
