"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/lib/content";

type CommandAction = {
  label: string;
  description?: string;
  href?: string;
  action?: () => void;
};

type CommandPaletteProps = {
  posts: PostMeta[];
};

export default function CommandPalette({ posts }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const actions = useMemo<CommandAction[]>(
    () => [
      { label: "返回首页", href: "/" },
      { label: "打开归档", href: "/blog" },
      ...posts.map((post) => ({
        label: post.title,
        description: post.date,
        href: `/blog/${post.slug}`,
      })),
    ],
    [posts]
  );

  const filtered = actions.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isCmd = event.metaKey || event.ctrlKey;
      if (isCmd && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const onOpen = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("commandpalette:open", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("commandpalette:open", onOpen as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm">
      <div className="mt-32 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-background/90 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 text-sm text-muted">
          <Search size={16} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索文章、跳转页面"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-muted"
          >
            ESC
          </button>
        </div>
        <div className="max-h-[360px] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <div className="flex items-center gap-2 rounded-xl px-4 py-6 text-xs text-muted">
              <Sparkles size={14} />
              没有匹配的指令
            </div>
          )}
          {filtered.map((item) => (
            <Link
              key={item.href ?? item.label}
              href={item.href ?? "#"}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between rounded-xl px-4 py-3 text-sm text-foreground transition",
                "hover:bg-white/5"
              )}
            >
              <div>
                <p>{item.label}</p>
                {item.description && (
                  <p className="text-xs text-muted">{item.description}</p>
                )}
              </div>
              <span className="text-[10px] text-muted">↵</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
