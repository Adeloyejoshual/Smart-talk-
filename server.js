const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

/* ===================== MIDDLEWARE ===================== */
app.use(cors());
app.use(express.json());

/* ===================== HOME PAGE ===================== */
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>AllDownloader</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>

    <body style="font-family:Arial;text-align:center;padding:40px">

      <h1>🔥 AllDownloader</h1>
      <p>Paste a video link and download</p>

      <input id="url" placeholder="Paste link..." style="padding:10px;width:300px" />
      <button onclick="download()" style="padding:10px 20px;margin-left:10px">
        Download
      </button>

      <pre id="result" style="margin-top:20px">Waiting...</pre>

      <script>
        async function download() {
          const url = document.getElementById("url").value;

          document.getElementById("result").innerText = "Processing...";

          const res = await fetch("/api/download", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ url })
          });

          const data = await res.json();

          document.getElementById("result").innerText =
            JSON.stringify(data, null, 2);
        }
      </script>

    </body>
    </html>
  `);
});

/* ===================== API EXAMPLE ===================== */
app.post("/api/download", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.json({
      success: false,
      error: "No URL provided"
    });
  }

  // placeholder response (replace with yt-dlp later)
  res.json({
    success: true,
    message: "Download processing started",
    url
  });
});

/* ===================== START ===================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});