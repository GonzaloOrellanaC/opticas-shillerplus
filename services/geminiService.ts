import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the client once if the key is available
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getGeminiRecommendation = async (userPrompt: string): Promise<string> => {
  if (!ai) {
    return "Lo siento, el servicio de IA no está configurado actualmente (Falta API Key).";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `Eres un asistente experto de ventas para 'Schillerplus', una tienda exclusiva de Óptica y Perfumería.
        Tu objetivo es ayudar a los clientes a elegir:
        1. Monturas de lentes basadas en la forma de su rostro (redondo, cuadrado, ovalado, etc.).
        2. Perfumes basados en sus gustos olfativos (cítricos, amaderados, florales, etc.).
        
        Mantén un tono profesional, amable y sofisticado. Tus respuestas deben ser breves (máximo 80 palabras) y persuasivas.
        Si te preguntan por precios, invítalos a contactar por Instagram o visitar la tienda física.`,
      }
    });

    return response.text || "No pude generar una recomendación en este momento.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Hubo un error al conectar con el asistente. Por favor intenta más tarde.";
  }
};