import { uploadDocumentMiddleware, processDocument } from "../service/documentService.js";

export const uploadDocumentAndDescribe = [
  uploadDocumentMiddleware,
  async (req, res) => {
    try {
        const { prompt } = req.body;
        const description = await processDocument(req.file, prompt || "Summary this document");

      res.json({
        message: "Document processed successfully",
        description,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
];
