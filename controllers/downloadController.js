import { extractMedia } from "../services/extractorService.js";

export const downloadMedia = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      error: "URL is required"
    });
  }

  try {
    const data = await extractMedia(url);

    res.json({
      success: true,
      data
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Failed to process video"
    });
  }
};