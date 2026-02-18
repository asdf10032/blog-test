"use client";

import Link from "next/link";
import { Command } from "lucide-react";
import Container from "./Container";

export default function Header() {
  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("commandpalette:open"));
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-background/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-glow">
          阿斯蒂芬的平行世界
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link href="/blog" className="link-underline">
            归档
          </Link>
          <Link href="/" className="link-underline">
            关于
          </Link>
          <button
            type="button"
            onClick={openPalette}
            className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-muted transition hover:border-accent/40 hover:text-foreground"
          >
            <Command size={14} />
            Ctrl + K
          </button>
        </nav>
      </Container>
    </header>
  );
}
