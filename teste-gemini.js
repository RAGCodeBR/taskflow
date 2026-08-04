import { generateGeminiContent } from './src/lib/gemini.server.ts';

async function testarGemini() {
  try {
    const resposta = await generateGeminiContent({
      systemInstruction: 'Responda em uma frase curta confirmando se está funcionando.',
      parts: [{ text: 'Olá, Gemini. Responda apenas com: funcionando.' }],
    });

    console.log('Resposta da IA:', resposta);
  } catch (error) {
    console.error('Erro ao chamar a API:', error);
  }
}

testarGemini();