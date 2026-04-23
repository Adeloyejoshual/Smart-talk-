import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import downloadRoutes from "./routes/downloadRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ===================== MIDDLEWARE ===================== */
app.use(cors());
app.use(express.json());

/* ===================== API ROUTES ===================== */
app.use("/api/download", downloadRoutes);

/* ===================== HEALTH CHECK ===================== */
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

/* ===================== SERVE FRONTEND (OPTIONAL) ===================== */
// Only use this if you're deploying frontend + backend together

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* ===================== START SERVER ===================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});