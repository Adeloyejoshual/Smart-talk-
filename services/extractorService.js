import ytDlp from "yt-dlp-exec";

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
      throw new Error("No data returned from yt-dlp");
    }

    return {
      title: data.title,
      thumbnail: data.thumbnail,
      formats: (data.formats || [])
        .filter(f => f.url)
        .map(f => ({
          quality: f.format_note || "unknown",
          url: f.url
        }))
    };

  } catch (err) {
    console.error("TikTok extraction error:", err.message);

    throw new Error("Failed to process video");
  }
};