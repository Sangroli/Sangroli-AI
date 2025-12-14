import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { DiseaseAnalysis } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeOrchardImage = async (base64Image: string): Promise<DiseaseAnalysis> => {
  try {
    const ai = getClient();
    const prompt = `
      You are an expert apple pathologist in Himachal Pradesh. 
      Analyze this image of an apple leaf or fruit.
      1. Identify if there is any disease (like Apple Scab, Marssonina Blotch, Powdery Mildew, Root Rot) or pest (Mites, Scale).
      2. If detected, name it and give a confidence score (0-100).
      3. Suggest immediate treatment suitable for Kotkhai region (include both chemical and organic options).
      4. If healthy, say "Healthy".
      
      Return the response as strictly valid JSON with this schema:
      {
        "detected": boolean,
        "diseaseName": string,
        "confidence": number,
        "treatment": string,
        "organicOptions": string
      }
      Do not add markdown code blocks. Just the JSON.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text) as DiseaseAnalysis;
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
};

export const getHorticultureAdvice = async (
  message: string, 
  history: { role: string, parts: { text: string }[] }[]
) => {
  try {
    const ai = getClient();
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `
          You are "HimApple AI", a global horticulture expert specializing in apple farming in Himachal Pradesh (Kotkhai region).
          
          Your Context:
          - Location: Kotkhai, Shimla District. Altitude ~2000m.
          - Farm Size: 10 Bigha Pilot.
          - Goal: Export quality apples, reduced cost, climate resilience.
          
          Your Knowledge Base:
          - Speak in simple English (occasional Hindi terms like "Bigha", "Taulia", "Jiva-amrit" are okay).
          - Focus on: Integrated Pest Management (IPM), Pruning systems (Central Leader/Tall Spindle), Nutrition (Soil tests), Weather risks (Hail/Frost).
          - Be concise and practical. Don't give generic advice; give specific chemical/organic names available in India.
        `
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting to the orchard network. Please check your connection and try again.";
  }
};
