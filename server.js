const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* ===================== MIDDLEWARE ===================== */
app.use(cors({
  origin: process.env.FRONTEND_URL || "*"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===================== API ROUTES ===================== */

// Example route (replace with your real ones)
app.use("/api/download", require("./routes/downloadRoutes"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server running successfully"
  });
});

/* ===================== STATIC FRONTEND ===================== */
/*
  React build folder (Vite/CRA output)
*/
const frontendPath = path.join(__dirname, "dist");

app.use(express.static(frontendPath));

/* ===================== REACT ROUTING ===================== */
/*
  This makes React Router work properly
*/
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ message: "API route not found" });
  }

  res.sendFile(path.join(frontendPath, "index.html"));
});

/* ===================== 404 FALLBACK ===================== */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ===================== START SERVER ===================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Full Stack App running on port ${PORT}`);
});