import genAI from "./gemini.js";

import dotenv from "dotenv";
dotenv.config();

export const generateAIResponse = async (prompt) => {
  
  const model = genAI.getGenerativeModel({ model: process.env.AI_MODEL });

  const result = await model.generateContent(prompt);

  return result.response.text();
};
