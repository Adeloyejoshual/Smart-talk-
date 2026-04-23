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

/* ===================== API ROUTES ===================== */
app.use("/api/download", downloadRoutes);

/* ===================== HOME PAGE (PUT IT HERE 👇) ===================== */
app.get("/", (req, res) => {
  res.send(`<html>
    <body style="font-family:Arial;text-align:center;padding:40px">
      <h1>AllDownloader</h1>

      <input id="url" style="padding:10px;width:300px" />
      <button onclick="go()" style="padding:10px">Download</button>

      <pre id="out">Waiting...</pre>

      <script>
        async function go() {
          const url = document.getElementById("url").value;

          const res = await fetch("/api/download", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ url })
          });

          const data = await res.json();
          document.getElementById("out").innerText =
            JSON.stringify(data, null, 2);
        }
      </script>
    </body>
  </html>`);
});

/* ===================== HEALTH CHECK ===================== */
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is running"
  });
});

/* ===================== 404 HANDLER ===================== */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

/* ===================== START SERVER ===================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});