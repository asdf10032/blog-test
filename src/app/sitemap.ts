import { getAllPosts } from "@/lib/content";

const siteUrl = "https://asdfworld.dpdns.org";

export default function sitemap() {
  const posts = getAllPosts();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];
}
