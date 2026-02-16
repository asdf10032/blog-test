"use client";

import { useState } from "react";

type PreProps = React.HTMLAttributes<HTMLPreElement> & {
  filename?: string;
  language?: string;
};

export default function Pre({ children, filename, language, ...rest }: PreProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const text = rest["data-raw"] as string | undefined;
      await navigator.clipboard.writeText(text ?? "");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-white/10 bg-panel/90">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-muted">
        <span>{filename ?? "代码片段"}</span>
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em]">
            {language ?? "mdx"}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border border-white/10 px-2 py-1 text-[10px] transition hover:border-accent/40 hover:text-foreground"
          >
            {copied ? "已复制" : "复制"}
          </button>
        </div>
      </div>
      <pre {...rest} className="m-0 overflow-x-auto p-5">
        {children}
      </pre>
    </div>
  );
}
