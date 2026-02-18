import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SignalWave from "@/components/effects/SignalWave";
import Toc from "@/components/effects/Toc";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import Giscus from "@/components/core/Giscus";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { buildPostMetadata } from "@/lib/metadata";
import { rehypePlugins } from "@/lib/mdx";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps) {
  const { meta } = getPostBySlug(params.slug);
  return buildPostMetadata(meta.title, meta.excerpt ?? "");
}

export default function PostPage({ params }: PageProps) {
  const posts = getAllPosts();
  const current = posts.find((post) => post.slug === params.slug);

  if (!current) {
    notFound();
  }

  const { content, meta } = getPostBySlug(params.slug);

  const toc = content
    .split("\n")
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^###?\s/, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[\s]+/g, "-")
        .replace(/[^\w\u4e00-\u9fa5-]/g, "");
      return { id, text, level };
    });

  return (
    <div className="relative min-h-screen bg-background">
      <SignalWave intensity={0.08} />
      <Header />
      <main className="py-16">
        <Container className="grid gap-10 xl:grid-cols-[1fr_220px]">
          <article className="rounded-3xl border border-white/10 bg-panel/90 px-6 py-10 md:px-12">
            <header className="mb-10 space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-muted">Reading Pod</p>
              <h1 className="text-3xl font-semibold text-glow md:text-4xl">
                {meta.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                <span>{meta.date}</span>
                <span className="text-accent">•</span>
                <span>{meta.tags.join(" · ")}</span>
              </div>
            </header>
            <div className="content-prose font-serif max-w-none">
              <MDXRemote
                source={content}
                options={{ mdxOptions: { rehypePlugins } }}
                components={mdxComponents}
              />
            </div>
            <Giscus
              repo="asdf10032/blog-test"
              repoId="R_kgDORRW6dg"
              category="Announcements"
              categoryId="DIC_kwDORRW6ds4C2ig4"
              mapping="pathname"
              strict="0"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="bottom"
              theme="preferred_color_scheme"
              lang="zh-CN"
            />
          </article>
          <Toc items={toc} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
