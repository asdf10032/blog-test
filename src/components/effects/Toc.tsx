"use client";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

type TocProps = {
  items: TocItem[];
};

export default function Toc({ items }: TocProps) {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 w-56 rounded-2xl border border-white/10 bg-background/70 p-4 text-xs text-muted backdrop-blur">
        <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-foreground">
          目录
        </p>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className={item.level > 2 ? "ml-3" : ""}>
              <a
                href={`#${item.id}`}
                className="link-underline text-muted hover:text-foreground"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
