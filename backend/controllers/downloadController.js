import { extractMedia } from "../services/extractorService.js";

export const downloadMedia = async (req, res) => {
  const { url } = req.body;

  // ✅ Validate input
  if (!url || typeof url !== "string") {
    return res.status(400).json({
      success: false,
      error: "Valid URL is required"
    });
  }

  try {
    // 🔥 Extract media from service
    const data = await extractMedia(url);

    // ✅ Safety check (avoid empty response crash)
    if (!data) {
      return res.status(404).json({
        success: false,
        error: "No media found for this URL"
      });
    }

    return res.status(200).json({
      success: true,
      data
    });

  } catch (err) {
    console.error("Download Error:", err);

    return res.status(500).json({
      success: false,
      error: "Failed to process link",
      details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};