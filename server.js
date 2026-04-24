import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

/* ================= PATH ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, "dist");

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= API ================= */
app.use("/api/download", (req, res) => {
  res.json({ success: true, message: "API working" });
});

/* ================= STATIC REACT ================= */
app.use(express.static(distPath));

/* ================= HOMEPAGE (REAL REACT UI) ================= */
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) return;

  res.sendFile(path.join(distPath, "index.html"));
});

/* ================= START ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});