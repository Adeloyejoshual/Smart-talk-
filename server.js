import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ===================== MIDDLEWARE ===================== */
app.use(cors());
app.use(express.json());

/* ===================== HOME ROUTE ===================== */
app.get("/", (req, res) => {
  res.send(`
    <h1>🔥 AllDownloader Running</h1>
    <p>Backend is working correctly 🚀</p>
  `);
});

/* ===================== API ROUTE ===================== */
app.post("/api/download", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      error: "No URL provided"
    });
  }

  res.json({
    success: true,
    message: "Server is working",
    url
  });
});

/* ===================== START SERVER ===================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});