import Callout from "./Callout";
import Pre from "./Pre";

export const mdxComponents = {
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <Pre {...props} />,
  Callout,
};
