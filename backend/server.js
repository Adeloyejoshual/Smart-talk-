import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import downloadRoutes from "./routes/downloadRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ===================== MIDDLEWARE ===================== */
app.use(cors());
app.use(express.json());

/* ===================== HOME ROUTE ===================== */
app.get("/", (req, res) => {
  res.json({
    app: "Smart Talk Backend",
    status: "running",
    endpoints: {
      health: "/api/health",
      download: "/api/download (POST)"
    }
  });
});

/* ===================== HEALTH CHECK ===================== */
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is running"
  });
});

/* ===================== DOWNLOAD ROUTES ===================== */
// IMPORTANT: this must handle POST /api/download
app.use("/api/download", downloadRoutes);

/* ===================== 404 HANDLER (IMPORTANT FIX) ===================== */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    hint: "Check API endpoint and method (GET/POST)"
  });
});

/* ===================== START SERVER ===================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});