import { Inter, JetBrains_Mono, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import CommandPalette from "@/components/core/CommandPalette";
import { getAllPosts } from "@/lib/content";
import { defaultMetadata } from "@/lib/metadata";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const notoSerif = Noto_Serif_SC({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPosts();

  return (
    <html lang="zh-CN" className="bg-grid">
      <body
        className={`${inter.variable} ${jetbrains.variable} ${notoSerif.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        {children}
        <CommandPalette posts={posts} />
      </body>
    </html>
  );
}
