import type { MDXComponents } from "next-mdx-remote/rsc";
import Callout from "./Callout";
import Pre from "./Pre";

export const mdxComponents: MDXComponents = {
  pre: (props) => <Pre {...props} />,
  Callout,
};
