const ytdlp = require("yt-dlp-exec");
/**
 * @route POST api/info
 * @description Fetches the yt video detail
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function videoInfoController(req, res) {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL is required !",
      });
    }
    const isValidURL = url.includes("youtube.com") || url.includes("youtu.be");
    if (!isValidURL) {
      return res.status(400).json({
        success: false,
        message: "Invalid URL",
      });
    }

    const info = await ytdlp(url, {
  dumpSingleJson: true,
  noWarnings: true,
  cookies: '/app/cookie.txt',
});

    return res.status(200).json({
      success: true,
      message: "Fetched successfully !",
      videoDetail: {
        title: info.title,
        thumbnail: info.thumbnail,
        description: info.description,
        duration: info.duration_string,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

/**
 * @route POST api/convert
 * @description Converts it into mp3
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function converterController(req, res) {
  const { url } = req.query;
  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Content-Disposition", 'attachment; filename="audio.mp3"');
  const stream = ytdlp.exec(url, {
    extractAudio: true,
    audioFormat: "mp3",
    output: "-",
    addHeader: [
      "referer:youtube.com",
      "user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    ],
  });

  stream.stdout.pipe(res);
  stream.on("error", (e) => res.status(500).json({ error: e.message }));
}

module.exports = {
  videoInfoController,
  converterController,
};
