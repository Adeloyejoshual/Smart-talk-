
import { extractMedia } from "../services/extractorService.js";

export const downloadMedia = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const data = await extractMedia(url);

    return res.json({
      success: true,
      data
    });

  } catch (err) {
    console.error("Download error:", err.message);

    return res.status(500).json({
      success: false,
      error: "Failed to process video",
      details: err.message
    });
  }
};