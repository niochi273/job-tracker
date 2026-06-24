"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type StatusData = { status: string; count: number };

const chartConfig = {
  count: {
    label: "Applications",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function StatusChart({ data }: { data: StatusData[] }) {
  return (
    <ChartContainer config={chartConfig} className="min-h-62.5 w-full">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="status"
          tickLine={false}
          axisLine={false}
          className="capitalize"
        />
        <YAxis allowDecimals={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
