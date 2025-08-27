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

export const uploadDocumentMiddleware = multer({ storage }).single("document");

export const processDocument = async (file) => {
  if (!file) {
    throw new Error("No document uploaded");
  }

  const filePath = path.resolve(file.path);
  const buffer = fs.readFileSync(filePath);

  const model = genAI.getGenerativeModel({ model: process.env.AI_MODEL });

  // generate konten dari dokumen
  const result = await model.generateContent([
    { inlineData: { data: buffer.toString("base64"), mimeType: file.mimetype } },
    { text: "Summarize or describe this document" },
  ]);

  return result.response.text();
};
