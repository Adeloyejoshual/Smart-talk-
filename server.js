import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

/* ================= PATH SETUP ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, "dist");

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= API ROUTES ================= */
app.get("/api/status", (req, res) => {
  res.json({ success: true, message: "API is working" });
});

/* ================= STATIC FRONTEND ================= */
app.use(express.static(distPath));

/* ================= SPA ROUTE FIX ================= */
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API not found" });
  }

  res.sendFile(path.join(distPath, "index.html"));
});

/* ================= START SERVER ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});