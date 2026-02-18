import type { Metadata } from "next";

const siteName = "阿斯蒂芬的平行世界";
const description = "秩序中的混沌 · 个人数字花园";

export const defaultMetadata: Metadata = {
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description,
  metadataBase: new URL("https://asdfworld.online"),
  openGraph: {
    title: siteName,
    description,
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
  },
};

export function buildPostMetadata(title: string, summary: string): Metadata {
  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: "article",
    },
  };
}
