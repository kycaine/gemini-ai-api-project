import multer from "multer";
import fs from "fs";
import path from "path";
import genAI from "./gemini.js";

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

export const uploadMiddleware = multer({ storage }).single("image");

export const processImage = async (file, prompt = "Describe this image") => {
  const filePath = path.resolve(file.path);
  const imageBuffer = fs.readFileSync(filePath);

  const model = genAI.getGenerativeModel({
    model: process.env.AI_MODEL || "gemini-1.5-flash",
  });

  const result = await model.generateContent([
    {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: file.mimetype,
      },
    },
    { text: prompt },
  ]);

  return result.response.text();
};
