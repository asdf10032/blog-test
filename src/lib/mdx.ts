import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

export const rehypePlugins = [
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: "wrap",
      properties: {
        className: ["link-underline"],
      },
    },
  ],
  [
    rehypePrettyCode,
    {
      theme: "one-dark-pro",
      keepBackground: false,
    },
  ],
];
