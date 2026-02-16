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

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const filePath = path.join(POSTS_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: {
      title: data.title as string,
      date: data.date as string,
      tags: (data.tags as string[]) ?? [],
      excerpt: data.excerpt as string | undefined,
    },
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => {
    const { meta, slug: resolvedSlug } = getPostBySlug(slug);
    return {
      slug: resolvedSlug,
      title: meta.title,
      date: meta.date,
      tags: meta.tags,
      excerpt: meta.excerpt,
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}
