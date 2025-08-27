import { uploadAudioMiddleware, processAudio } from "../service/audioService.js";

export const uploadAndGenerateFromAudio = [
  uploadAudioMiddleware,
  async (req, res) => {
    try {
      const output = await processAudio(req.file);

      res.json({output});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
];
