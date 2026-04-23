import { exec } from "child_process";

export const extractMedia = (url) => {
  return new Promise((resolve, reject) => {
    exec(`yt-dlp -j "${url}"`, (error, stdout) => {
      if (error) return reject(error);

      try {
        const data = JSON.parse(stdout);

        resolve({
          title: data.title,
          thumbnail: data.thumbnail,
          formats: data.formats?.map(f => ({
            quality: f.format_note,
            url: f.url
          }))
        });

      } catch (err) {
        reject(err);
      }
    });
  });
};