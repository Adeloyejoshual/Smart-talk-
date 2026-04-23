import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import downloadRoutes from "./routes/download.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ===================== PATH ===================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ===================== MIDDLEWARE ===================== */
app.use(cors());
app.use(express.json());

/* ===================== API ===================== */
app.use("/api/download", downloadRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

/* ===================== FRONTEND (FROM /src) ===================== */
app.use(express.static(path.join(__dirname, "src")));

/* fallback UI */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

/* ===================== START SERVER ===================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});