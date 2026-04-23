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
    message: "Smart Talk Backend running"
  });
});

/* ===================== ROOT ROUTE ===================== */
/*
  IMPORTANT:
  React (src/main.jsx) handles UI in development (Vite).
  So Express only returns API info here.
*/
app.get("/", (req, res) => {
  res.json({
    app: "AllDownloader API",
    status: "running",
    frontend: "handled by React (Vite)",
    endpoints: {
      health: "/api/health",
      download: "/api/download (POST)"
    }
  });
});

/* ===================== STATIC FRONTEND (OPTIONAL PROD) ===================== */
/*
  ONLY WORKS AFTER: npm run build
  If you deploy React build inside server
*/
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "dist");

  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    if (req.path.startsWith("/api/")) return;

    res.sendFile(path.join(distPath, "index.html"));
  });
}

/* ===================== 404 HANDLER ===================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    hint: "Check API endpoint (/api/...)"
  });
});

/* ===================== START SERVER ===================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});