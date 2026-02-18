import fs from "fs";
import path from "path";
import { getAllPosts, getPostBySlug } from "../src/lib/content";

const siteUrl = "https://asdfworld.dpdns.org";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const posts = getAllPosts();

const items = posts
  .map((post) => {
    const { content, meta } = getPostBySlug(post.slug);
    return `
    <item>
      <title>${escapeXml(meta.title)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(meta.date).toUTCString()}</pubDate>
      <description>${escapeXml(meta.excerpt ?? "")}</description>
      <content:encoded><![CDATA[${content}]]></content:encoded>
    </item>`;
  })
  .join("");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>阿斯蒂芬的平行世界</title>
    <link>${siteUrl}</link>
    <description>秩序中的混沌 · 个人数字花园</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

const outputPath = path.join(process.cwd(), "public", "feed.xml");
fs.writeFileSync(outputPath, rss);
console.log(`RSS generated: ${outputPath}`);
