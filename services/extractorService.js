import ytDlp from "yt-dlp-exec";

/* ===================== MAIN FUNCTION ===================== */
export const extractMedia = async (url) => {
  try {
    const data = await ytDlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificates: true,
      addHeader: [
        "user-agent: Mozilla/5.0",
        "referer: https://www.tiktok.com/"
      ]
    });

    if (!data) {
      throw new Error("No data returned from extractor");
    }

    const formats = cleanFormats(data.formats || []);

    return {
      title: data.title || "Untitled",
      thumbnail: data.thumbnail || "",
      duration: data.duration || null,

      // best available download (top quality)
      best: getBestFormat(formats),

      // all cleaned formats
      formats
    };

  } catch (err) {
    console.error("Extractor error:", err.message);

    return {
      title: "Failed to process media",
      thumbnail: "",
      formats: [],
      best: null,
      error: err.message
    };
  }
};

/* ===================== CLEAN FORMATS ===================== */
function cleanFormats(formats) {
  const seen = new Set();

  return formats
    .filter(f => f.url && (f.height || f.format_note))
    .map(f => ({
      quality: f.format_note || `${f.height || "unknown"}p`,
      height: f.height || 0,
      url: f.url
    }))
    .filter(f => {
      if (seen.has(f.url)) return false;
      seen.add(f.url);
      return true;
    })
    .sort((a, b) => b.height - a.height);
}

/* ===================== BEST QUALITY PICKER ===================== */
function getBestFormat(formats) {
  if (!formats.length) return null;

  return formats.reduce((best, current) => {
    return (current.height || 0) > (best.height || 0) ? current : best;
  }, formats[0]);
}