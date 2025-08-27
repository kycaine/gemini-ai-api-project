import fs from "fs";
import path from "path";
import genAI from "./gemini.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadAudioMiddleware = multer({ storage }).single("audio");

export const processAudio = async (file) => {
  if (!file) {
    throw new Error("No audio uploaded");
  }

  const filePath = path.resolve(file.path);
  const buffer = fs.readFileSync(filePath);

  const model = genAI.getGenerativeModel({ model: process.env.AI_MODEL });

  const result = await model.generateContent([
    { inlineData: { data: buffer.toString("base64"), mimeType: file.mimetype } },
    { text: "Transcribe this audio" },
  ]);

  return result.response.text();
};
