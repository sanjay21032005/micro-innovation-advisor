import { GoogleGenAI, Type } from "@google/genai";
import { MicroInnovation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const innovationSchema = {
  type: Type.OBJECT,
  properties: {
    suggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "Short and clear title.",
          },
          explanation: {
            type: Type.STRING,
            description: "1-2 lines explaining why it helps.",
          },
          nextStep: {
            type: Type.STRING,
            description: "A concrete action the user can take immediately.",
          },
          category: {
            type: Type.STRING,
            description: "Category of improvement (e.g., UX, Quick Win, Workflow).",
          },
        },
        required: ["title", "explanation", "nextStep", "category"],
      },
    },
  },
  required: ["suggestions"],
};

export const generateInnovations = async (description: string): Promise<MicroInnovation[]> => {
  try {
    const prompt = `
      You are an AI-powered Micro-Innovation Advisor.
      Your job is to help early-stage builders and students find small, high-impact improvements for their product or process.

      The user will provide a 2–5 sentence description of a web page, product, or workflow.

      User Input: "${description}"

      Your response must:
      * Generate 3–5 micro-innovation suggestions
      * Focus on small, realistic, actionable improvements (not big redesigns or long-term plans)
      * Keep a friendly, encouraging, mentor-like tone
      * Be concise and practical

      For each suggestion, include:
      1. Title – short and clear
      2. Explanation – 1–2 lines explaining why it helps
      3. Next Step – a concrete action the user can take immediately

      Constraints:
      * No market research, roadmaps, or business strategy
      * No analytics, monetization, or growth plans
      * Avoid vague advice like “improve UX” without specifics

      Style & Personality Constraints:
      * Assume the product is playful, modern, and colorful
      * Favor ideas that improve visual delight, clarity, and small moments of joy
      * Suggest micro-innovations that involve color, layout, motion, or interaction when appropriate
      * Avoid corporate or dull design patterns
      * Encourage light experimentation with gradients, highlights, and visual feedback

      When relevant, suggest:
      * Subtle animations
      * Color-coded feedback
      * Visual emphasis for key actions
      * Small “wow” moments that feel unique but simple to build

      If the input is vague, still generate ideas but label them as “Early Idea” and keep assumptions minimal.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: innovationSchema,
        systemInstruction: "You are an AI-powered Micro-Innovation Advisor that favors playful, modern, and delightful improvements.",
        temperature: 0.7, 
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from AI.");
    }

    const data = JSON.parse(text);
    return data.suggestions || [];

  } catch (error) {
    console.error("Error generating innovations:", error);
    throw error;
  }
};