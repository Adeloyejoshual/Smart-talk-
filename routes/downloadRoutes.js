import express from "express";
import { downloadMedia } from "../controllers/downloadController.js";

const router = express.Router();

router.post("/", downloadMedia);

export default router;