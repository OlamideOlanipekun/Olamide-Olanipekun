
import { GoogleGenAI } from "@google/genai";
import { BIO_PROMPT } from "../constants.ts";

export class GeminiService {
  async chat(message: string): Promise<string> {
    try {
      // Use the API_KEY directly from process.env as defined in vite.config.ts
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: message,
        config: {
          systemInstruction: BIO_PROMPT,
          temperature: 0.7,
        },
      });

      return response.text || "I'm sorry, I couldn't process that request right now.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I seem to be having trouble connecting. Please try again later!";
    }
  }
}

export const geminiService = new GeminiService();
