import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GoogleGenAI } from "@google/genai";

type GeminiPart = { text: string } | { inlineData: { mimeType: string; data: string } };

type GenerateGeminiInput = {
  systemInstruction: string;
  parts: GeminiPart[];
  responseMimeType?: "text/plain" | "application/json";
};

function loadEnvFile() {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const projectRoot = path.resolve(currentDir, "..", "..");
  const candidates = [path.join(projectRoot, ".env.local"), path.join(projectRoot, ".env")];

  for (const filePath of candidates) {
    if (!fs.existsSync(filePath)) continue;

    const contents = fs.readFileSync(filePath, "utf8");
    for (const line of contents.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) continue;

      const key = trimmed.slice(0, separatorIndex).trim();
      let value = trimmed.slice(separatorIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

function getApiKey() {
  loadEnvFile();
  return process.env.GEMINI_API_KEY;
}

function getModel() {
  loadEnvFile();
  return process.env.GEMINI_MODEL || "gemini-3.5-flash";
}

export async function generateGeminiContent({
  systemInstruction,
  parts,
  responseMimeType = "text/plain",
}: GenerateGeminiInput) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY não foi encontrada. Defina a variável no arquivo .env.local.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const contents = parts.map((part) => {
    if ("text" in part) {
      return { text: part.text };
    }
    return { inlineData: part.inlineData };
  });

  let response;
  try {
    response = await ai.models.generateContent({
      model: getModel(),
      contents: [{ role: "user", parts: contents }],
      config: {
        systemInstruction,
        responseMimeType,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/\b429\b|RESOURCE_EXHAUSTED|quota exceeded/i.test(message)) {
      throw new Error(
        "A cota do Gemini foi atingida. Verifique o plano e os limites do projeto no Google AI Studio.",
      );
    }
    throw error;
  }

  const text =
    typeof response?.text === "string"
      ? response.text
      : response?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text ?? "").join("") ?? "";

  if (!text) {
    throw new Error("A API do Gemini respondeu sem conteúdo.");
  }

  return text;
}
