import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ===================== PATH FIX ===================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ===================== MIDDLEWARE ===================== */
app.use(cors());
app.use(express.json());

/* ===================== ROUTES ===================== */
import downloadRoutes from "./routes/downloadRoutes.js";
app.use("/api/download", downloadRoutes);

/* ===================== HEALTH ===================== */
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

/* ===================== STATIC FRONTEND ===================== */
const distPath = path.join(__dirname, "dist");

app.use(express.static(distPath));

app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) return;

  res.sendFile(path.join(distPath, "index.html"));
});

/* ===================== START ===================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});