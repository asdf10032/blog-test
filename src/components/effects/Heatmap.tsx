import { cn } from "@/lib/utils";

type HeatmapCell = {
  value: number;
  label: string;
};

type HeatmapProps = {
  data: HeatmapCell[];
  className?: string;
};

export default function Heatmap({ data, className }: HeatmapProps) {
  return (
    <div className={cn("grid grid-cols-7 gap-2", className)}>
      {data.map((cell, index) => (
        <div
          key={`${cell.label}-${index}`}
          className="group relative h-6 w-6 rounded-md border border-white/10 bg-panel/80"
          style={{
            boxShadow:
              cell.value > 2
                ? "0 0 12px rgba(212,168,83,0.35)"
                : cell.value > 0
                ? "0 0 10px rgba(78,205,196,0.25)"
                : undefined,
            backgroundColor:
              cell.value > 2
                ? "rgba(212,168,83,0.55)"
                : cell.value > 0
                ? "rgba(78,205,196,0.35)"
                : "rgba(18,18,18,0.9)",
          }}
        >
          <span className="pointer-events-none absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full border border-white/10 bg-background/90 px-2 py-1 text-[10px] text-muted shadow-lg group-hover:block">
            {cell.label}
          </span>
        </div>
      ))}
    </div>
  );
}
