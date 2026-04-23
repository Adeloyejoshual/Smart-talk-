import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import downloadRoutes from "./routes/downloadRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ===================== PATH SETUP ===================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ===================== MIDDLEWARE ===================== */
app.use(cors());
app.use(express.json());

/* ===================== API ROUTES ===================== */
app.use("/api/download", downloadRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is running"
  });
});

/* ===================== HOMEPAGE (FROM src/index.html) ===================== */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

/* ===================== 404 HANDLER ===================== */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    hint: "Check URL and HTTP method (GET/POST)"
  });
});

/* ===================== START SERVER ===================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});