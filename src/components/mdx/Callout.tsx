import { cn } from "@/lib/utils";

type CalloutProps = {
  type?: "info" | "warning" | "tip";
  children: React.ReactNode;
};

export default function Callout({ type = "info", children }: CalloutProps) {
  return (
    <div className={cn("callout", `callout-${type}`)}>{children}</div>
  );
}
