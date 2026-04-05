import puppeteer from "puppeteer";
import { JSDOM } from "jsdom";
import axios from "axios";
import { Readability } from "@mozilla/readability";
import imagekit from "../config/imageKit.js";

export async function extractContent(url, type) {
  switch (type) {
    case "article":
      return extractArticle(url);
    case "image":
      return extractImage(url);
    case "tweet":
      return extractTweet(url);
    case "youtube":
      return extractYoutube(url);
    case "video":
      return extractVideo(url);
    case "pdf":
      return extractPdf(url);
    default:
      return { title: url, content: "" };
  }
}

// Called for file uploads — receives a Buffer directly instead of fetching a URL
export async function uploadFileToImageKit(buffer, fileName, mimeType, folder) {
  const uploaded = await imagekit.upload({
    file: buffer,
    fileName,
    folder: `/Memex/${folder}`,
    useUniqueFileName: true,
  });
  return uploaded;
}

async function extractArticle(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const html = await page.content();
  await browser.close();
  const dom = new JSDOM(html, { url });
  const article = new Readability(dom.window.document).parse();
  return {
    title: article?.title || url,
    content: article?.textContent?.slice(0, 4000) || "",
  };
}

async function extractImage(url) {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
    timeout: 10000,
  });

  const contentType = response.headers["content-type"] || "image/jpeg";
  const ext = contentType.split("/")[1] || "jpg";

  const uploaded = await imagekit.upload({
    file: Buffer.from(response.data),
    fileName: `Image-${Date.now()}.${ext}`,
    folder: "/Memex/images",
  });

  return {
    title: url,
    thumbnailUrl: uploaded.url,
  };
}

async function extractVideo(url) {
  // For plain video URLs, store the URL directly and use a generic thumbnail
  return {
    title: url.split("/").pop() || "Video",
    content: "",
    thumbnailUrl: "",
  };
}

async function extractPdf(url) {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
    timeout: 15000,
  });

  const fileName = url.split("/").pop()?.split("?")[0] || `Document-${Date.now()}.pdf`;

  const uploaded = await imagekit.upload({
    file: Buffer.from(response.data),
    fileName,
    folder: "/Memex/pdfs",
    useUniqueFileName: true,
  });

  return {
    title: fileName.replace(".pdf", "").replace(/-|_/g, " "),
    content: `PDF document: ${fileName}`,
    thumbnailUrl: uploaded.url,
  };
}

async function extractTweet(url) {
  const oembed = await axios.get(
    `https://publish.twitter.com/oembed?url=${url}`,
  );
  return {
    title: oembed.data.author_name,
    content: oembed.data.html,
  };
}

async function extractYoutube(url) {
  const oembed = await axios.get(
    `https://www.youtube.com/oembed?url=${url}&format=json`,
  );

  const videoIdMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );

  let thumbnailUrl = oembed.data.thumbnail_url;

  if (videoIdMatch?.[1]) {
    const videoId = videoIdMatch[1];
    const candidates = [
      `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    ];

    for (const candidate of candidates) {
      try {
        const check = await axios.head(candidate, { timeout: 4000 });
        if (check.status === 200) {
          thumbnailUrl = candidate;
          break;
        }
      } catch {
      
      }
    }
  }

  return {
    title: oembed.data.title,
    thumbnailUrl,
  };
}

export function detectType(url) {
  const lower = url.toLowerCase();

  if (lower.includes("youtube.com/watch") || lower.includes("youtu.be"))
    return "youtube";

  if (lower.includes("twitter.com") || lower.includes("x.com"))
    return "tweet";

  if (/\.(jpg|jpeg|png|webp|gif)(\?.*)?$/.test(lower))
    return "image";

  if (/\.pdf(\?.*)?$/.test(lower))
    return "pdf";

  if (/\.(mp4|mov|webm|mkv|avi)(\?.*)?$/.test(lower))
    return "video";

  return "article";
}

