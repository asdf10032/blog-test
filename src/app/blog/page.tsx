import Link from "next/link";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SignalWave from "@/components/effects/SignalWave";
import { getAllPosts } from "@/lib/content";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="relative min-h-screen bg-background">
      <SignalWave intensity={0.18} />
      <Header />
      <main className="py-16">
        <Container>
          <header className="mb-12 space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-muted">Archive</p>
            <h1 className="text-3xl font-semibold text-glow">时间流归档</h1>
            <p className="max-w-xl text-sm text-muted">
              以提交日志的方式排列记忆片段。
            </p>
          </header>

          <section className="rounded-3xl border border-white/10 bg-panel/80 p-6">
            <ul className="space-y-5">
              {posts.map((post) => (
                <li key={post.slug} className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-muted">{post.date}</span>
                  <span className="text-accent">»</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="link-underline text-foreground"
                  >
                    {post.title}
                  </Link>
                  <span className="text-muted">
                    {post.tags.join(" · ")}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
