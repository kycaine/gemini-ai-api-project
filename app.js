import express from "express";
import { generateText } from "./src/controller/textController.js";
import { uploadImageAndDescribe } from "./src/controller/imageController.js";
import {uploadDocumentAndDescribe} from "./src/controller/documentController.js";
import { uploadAndGenerateFromAudio } from "./src/controller/audioController.js";

const app = express();
app.use(express.json());

// Routes
app.post("/api/generate-text", generateText);
app.post("/api/generate-from-image", uploadImageAndDescribe); 
app.post("/api/generate-from-document", uploadDocumentAndDescribe); 
app.post("/api/generate-from-audio", uploadAndGenerateFromAudio);


export default app;
