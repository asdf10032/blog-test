import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt?: string;
};

const POSTS_PATH = path.join(process.cwd(), "src", "content", "posts");

export function getPostSlugs() {
  if (!fs.existsSync(POSTS_PATH)) {
    return [];
  }

  return fs.readdirSync(POSTS_PATH).filter((file) => file.endsWith(".mdx"));
}

export function getPostBySlug(slug?: string) {
  if (!slug) {
    return null;
  }

  const realSlug = slug.replace(/\.mdx$/, "");
  const filePath = path.join(POSTS_PATH, `${realSlug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: {
      title: (data.title as string) ?? "未命名",
      date: (data.date as string) ?? "1970-01-01",
      tags: (data.tags as string[]) ?? [],
      excerpt: (data.excerpt as string) ?? "",
    },
    content: content ?? "",
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is NonNullable<ReturnType<typeof getPostBySlug>> =>
      Boolean(post)
    )
    .map((post) => ({
      slug: post.slug,
      title: post.meta.title,
      date: post.meta.date,
      tags: post.meta.tags,
      excerpt: post.meta.excerpt,
    }));

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}
