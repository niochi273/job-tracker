"use client";
import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type WorkTypeData = { type: string; count: number; fill: string };

const chartConfig = {
  count: { label: "Applications" },
  remote: { label: "Remote", color: "var(--chart-2)" },
  hybrid: { label: "Hybrid", color: "var(--chart-3)" },
  onsite: { label: "Onsite", color: "var(--chart-4)" },
} satisfies ChartConfig;

export default function WorkTypeChart({ data }: { data: WorkTypeData[] }) {
  return (
    <ChartContainer config={chartConfig} className="min-h-62.5">
      <PieChart className="gap-1.5">
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie
          data={data}
          dataKey="count"
          nameKey="type"
          stroke="var(--background)"
          strokeWidth={5}
          innerRadius={20}
          cornerRadius={10}
        />
      </PieChart>
    </ChartContainer>
  );
}
