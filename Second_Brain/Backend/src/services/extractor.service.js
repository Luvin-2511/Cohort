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
    default:
      break;
  }
}

async function extractArticle(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const html = await page.content();
  const dom = new JSDOM(html, { url });
  const article = new Readability(dom.window.document).parse();
  return {
    title:article.title,
    content:article.content
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
    thumbnailUrl: uploaded.url
  }
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
  return {
    title: oembed.data.title,
    thumbnailUrl: oembed.data.thumbnail_url,
  };
}

export function detectType(url) {
  const lower = url.toLowerCase()

  if (lower.includes("youtube.com/watch") || lower.includes("youtu.be")) 
    return "youtube"
  
  if (lower.includes("twitter.com") || lower.includes("x.com")) 
    return "tweet"
  
  if (/\.(jpg|jpeg|png|webp|gif)(\?.*)?$/.test(lower)) 
    return "image"
  
  if (/\.pdf(\?.*)?$/.test(lower)) 
    return "pdf"

  return "article"
}