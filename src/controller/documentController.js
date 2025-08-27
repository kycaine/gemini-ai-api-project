import { uploadDocumentMiddleware, processDocument } from "../service/documentService.js";

export const uploadDocumentAndDescribe = [
  uploadDocumentMiddleware,
  async (req, res) => {
    try {
        const { prompt } = req.body;
        const output = await processDocument(req.file, prompt || "Summary this document");

      res.json({output});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
];
