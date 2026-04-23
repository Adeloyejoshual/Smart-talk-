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

/* ===================== API ===================== */
app.use("/api/download", downloadRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

/* ===================== START ===================== */
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});