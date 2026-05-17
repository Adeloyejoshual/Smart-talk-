import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

/* ================= PATH ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// IMPORTANT: this must point to your built frontend
const distPath = path.join(__dirname, "dist");

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= API ================= */
app.use("/api/download", (req, res) => {
  return res.json({ success: true, message: "API working" });
});

/* ================= STATIC FILES ================= */
// serve built assets (js, css, images)
app.use(express.static(distPath));

/* ================= SPA FALLBACK ================= */
// for any non-API route, send React index.html
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found" });
  }

  res.sendFile(path.resolve(distPath, "index.html"));
});

/* ================= START ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});