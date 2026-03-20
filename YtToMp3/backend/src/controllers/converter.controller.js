const ytdlp = require("yt-dlp-exec");
const fs = require("fs");

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

    const cookiesPath = "/tmp/cookie.txt";
    const hasCookies = !!process.env.YOUTUBE_COOKIES;

    if (hasCookies) {
      fs.writeFileSync(cookiesPath, process.env.YOUTUBE_COOKIES);
    }

    const info = await ytdlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCheckFormats: true,
      ...(hasCookies && { cookies: cookiesPath }),
      addHeader: [
        "referer:youtube.com",
        "user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      ],
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
    console.error("videoInfoController error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function converterController(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
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

    const cookiesPath = "/tmp/cookie.txt";
    const hasCookies =
      !!process.env.YOUTUBE_COOKIES && fs.existsSync(cookiesPath);

    const stream = ytdlp.exec(url, {
      extractAudio: true,
      audioFormat: "mp3",
      output: "-",
      ...(hasCookies && { cookies: cookiesPath }),
      addHeader: [
        "referer:youtube.com",
        "user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      ],
    });

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Disposition", 'attachment; filename="audio.mp3"');

    stream.stdout.pipe(res);
    
    stream.stderr.on("data", (d) => {
      const msg = d.toString();
      console.error("yt-dlp stderr:", msg);
    });

    stream.on("error", (e) => {
      console.error("stream error:", e);
      if (!res.headersSent) {
        res.status(500).json({ error: e.message });
      } else {
        res.end();
      }
    });

    res.on("close", () => {
       try { stream.kill(); } catch (err) {}
    });

  } catch (err) {
    console.error("converterController error:", err);
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    } else {
      res.end();
    }
  }
}

module.exports = {
  videoInfoController,
  converterController,
};