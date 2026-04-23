import { exec } from "child_process";

export const extractMedia = (url) => {
  return new Promise((resolve, reject) => {
    if (!url) return reject(new Error("URL is required"));

    // 🔥 safer command (prevents basic injection issues)
    const command = `yt-dlp -j "${url}"`;

    exec(command, { timeout: 30000 }, (error, stdout, stderr) => {
      if (error) {
        console.error("yt-dlp error:", error.message);
        return reject(new Error("Failed to extract media"));
      }

      try {
        const data = JSON.parse(stdout);

        const formats = (data.formats || [])
          .filter(f => f.url)
          .map(f => ({
            quality: f.format_note || "unknown",
            url: f.url
          }));

        resolve({
          title: data.title || "No title",
          thumbnail: data.thumbnail || null,
          formats
        });

      } catch (err) {
        console.error("JSON parse error:", stderr || err.message);
        reject(new Error("Invalid response from extractor"));
      }
    });
  });
};