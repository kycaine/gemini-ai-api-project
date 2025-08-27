import { uploadMiddleware, processImage } from "../service/imageService.js";

export const uploadImageAndDescribe = [
  uploadMiddleware, 
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image uploaded" });
      }

      const { prompt } = req.body;
      const description = await processImage(req.file, prompt);

      res.json({
        message: "Image processed successfully",
        description,
      });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Something went wrong", details: err.message });
    }
  },
];
