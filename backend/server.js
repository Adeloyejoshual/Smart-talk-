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
    endpoints: ["/api/download", "/api/health"]
  });
});

/* ===================== API ROUTES ===================== */
app.use("/api/download", downloadRoutes);

/* ===================== HEALTH CHECK ===================== */
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

/* ===================== START SERVER ===================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});