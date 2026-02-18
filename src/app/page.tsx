import Link from "next/link";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SignalWave from "@/components/effects/SignalWave";
import Heatmap from "@/components/effects/Heatmap";
import { getAllPosts } from "@/lib/content";

const heatmapData = Array.from({ length: 28 }).map((_, index) => {
  const value = index % 6 === 0 ? 3 : index % 4 === 0 ? 2 : index % 3 === 0 ? 1 : 0;
  return {
    value,
    label: `注入能量: ${1200 + index * 40} 字 / 涉及领域: React`,
  };
});

export default function Home() {
  const posts = getAllPosts();
  return (
    <div className="relative min-h-screen bg-background">
      <SignalWave />
      <Header />
      <main className="py-16">
        <Container>
          <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.4em] text-muted">
                Project Parallel World
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-glow md:text-5xl">
                阿斯蒂芬的平行世界
              </h1>
              <p className="max-w-xl text-base leading-7 text-muted">
                在秩序中保持混沌的纹理。这里记录技术、灵感与心流的波形。
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link
                  href="/blog"
                  className="rounded-full border border-accent/50 px-4 py-2 text-accent transition hover:border-accent hover:text-foreground"
                >
                  进入时间流
                </Link>
                <Link
                  href="/blog/parallel-world"
                  className="rounded-full border border-white/10 px-4 py-2 text-muted transition hover:border-accent-secondary/60 hover:text-foreground"
                >
                  阅读最新信号
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-panel/90 p-6 shadow-[0_0_40px_rgba(212,168,83,0.08)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">生命体征</p>
                  <p className="text-lg font-semibold text-foreground">活动热力图</p>
                </div>
                <span className="text-xs text-accent">+3200 字</span>
              </div>
              <Heatmap data={heatmapData} className="mt-6" />
            </div>
          </section>

          <section className="mt-16 grid gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">时间流</h2>
              <span className="text-xs text-muted">YYYY-MM-DD → 标题 → 标签</span>
            </div>
            <div className="rounded-3xl border border-white/10 bg-panel/70 p-6">
              <ul className="space-y-4">
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
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
