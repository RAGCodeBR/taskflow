# src/lib/gemini.server.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import fs from "node:fs";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import path from "node:path";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { fileURLToPath } from "node:url";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { GoogleGenAI } from "@google/genai";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 6 | `type GeminiPart = { text: string } | { inlineData: { mimeType: string; data: string } };` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 7 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 8 | `type GenerateGeminiInput = {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 9 | `  systemInstruction: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `  parts: GeminiPart[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `  responseMimeType?: "text/plain" | "application/json";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `  maxOutputTokens?: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 14 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 15 | `function loadEnvFile() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 16 | `  const currentDir = path.dirname(fileURLToPath(import.meta.url));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 17 | `  const projectRoot = path.resolve(currentDir, "..", "..");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 18 | `  const candidates = [path.join(projectRoot, ".env.local"), path.join(projectRoot, ".env")];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 19 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 20 | `  for (const filePath of candidates) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 21 | `    if (!fs.existsSync(filePath)) continue;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 22 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 23 | `    const contents = fs.readFileSync(filePath, "utf8");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 24 | `    for (const line of contents.split(/\r?\n/)) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 25 | `      const trimmed = line.trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 26 | `      if (!trimmed || trimmed.startsWith("#")) continue;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `      const separatorIndex = trimmed.indexOf("=");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 29 | `      if (separatorIndex === -1) continue;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 30 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 31 | `      const key = trimmed.slice(0, separatorIndex).trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 32 | `      let value = trimmed.slice(separatorIndex + 1).trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 33 | `      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 34 | `        value = value.slice(1, -1);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 36 | `      if (!process.env[key]) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 37 | `        process.env[key] = value;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 39 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 40 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 41 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 42 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 43 | `function getApiKey() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 44 | `  loadEnvFile();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  return process.env.GEMINI_API_KEY;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 46 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 47 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 48 | `function getModel() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 49 | `  loadEnvFile();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `  return process.env.GEMINI_MODEL || "gemini-3.5-flash";` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 51 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 52 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 53 | `export async function generateGeminiContent({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 54 | `  systemInstruction,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 55 | `  parts,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 56 | `  responseMimeType = "text/plain",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 57 | `  maxOutputTokens,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 58 | `}: GenerateGeminiInput) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 59 | `  const apiKey = getApiKey();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 60 | `  if (!apiKey) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 61 | `    throw new Error("GEMINI_API_KEY não foi encontrada. Defina a variável no arquivo .env.local.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 63 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 64 | `  const ai = new GoogleGenAI({ apiKey });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 65 | `  const contents = parts.map((part) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 66 | `    if ("text" in part) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 67 | `      return { text: part.text };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 68 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 69 | `    return { inlineData: part.inlineData };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 70 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 71 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 72 | `  let response;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 73 | `  const maxAttempts = 3;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 74 | `  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 75 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 76 | `      response = await ai.models.generateContent({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `        model: getModel(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `        contents: [{ role: "user", parts: contents }],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `        config: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `          systemInstruction,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 81 | `          responseMimeType,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `          ...(maxOutputTokens ? { maxOutputTokens } : {}),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `        },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 84 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 85 | `      break;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `    } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `      const message = error instanceof Error ? error.message : String(error);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 88 | `      if (/\b429\b|RESOURCE_EXHAUSTED|quota exceeded/i.test(message)) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 89 | `        throw new Error(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `          "A cota do Gemini foi atingida. Verifique o plano e os limites do projeto no Google AI Studio.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 92 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 93 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 94 | `      const isTemporaryOverload = /\b503\b|UNAVAILABLE|high demand|try again later|temporar/i.test(message);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 95 | `      if (isTemporaryOverload && attempt < maxAttempts) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 96 | `        // Backoff curto: o Gemini normalmente libera capacidade em poucos segundos.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 97 | `        await new Promise((resolve) => setTimeout(resolve, attempt * 1_500));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 98 | `        continue;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 100 | `      if (isTemporaryOverload) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 101 | `        throw new Error("O Gemini está temporariamente sobrecarregado. Aguarde alguns segundos e tente novamente.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 103 | `      throw error;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 104 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 105 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 106 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 107 | `  const text =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 108 | `    typeof response?.text === "string"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `      ? response.text` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `      : response?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text ?? "").join("") ?? "";` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 111 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 112 | `  if (!text) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 113 | `    throw new Error("A API do Gemini respondeu sem conteúdo.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 115 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 116 | `  return text;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 117 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 118 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
