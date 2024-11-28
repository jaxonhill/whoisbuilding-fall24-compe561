import { Area, Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";
import { AreaChart } from "lucide-react";

export default function GitHubChart() {
  const chartData = [
    { date: "2024-08-21", contributions: 44 },
    { date: "2024-08-22", contributions: 36 },
    { date: "2024-08-23", contributions: 6 },
    { date: "2024-08-24", contributions: 8 },
    { date: "2024-08-25", contributions: 0 },
    { date: "2024-08-26", contributions: 40 },
    { date: "2024-08-27", contributions: 22 },
    { date: "2024-08-28", contributions: 41 },
    { date: "2024-08-29", contributions: 49 },
    { date: "2024-08-30", contributions: 6 },
    { date: "2024-08-31", contributions: 26 },
    { date: "2024-09-01", contributions: 7 },
    { date: "2024-09-02", contributions: 7 },
    { date: "2024-09-03", contributions: 22 },
    { date: "2024-09-04", contributions: 46 },
    { date: "2024-09-05", contributions: 44 },
    { date: "2024-09-06", contributions: 0 },
    { date: "2024-09-07", contributions: 16 },
    { date: "2024-09-08", contributions: 23 },
    { date: "2024-09-09", contributions: 38 },
    { date: "2024-09-10", contributions: 17 },
    { date: "2024-09-11", contributions: 2 },
    { date: "2024-09-12", contributions: 43 },
    { date: "2024-09-13", contributions: 12 },
    { date: "2024-09-14", contributions: 27 },
    { date: "2024-09-15", contributions: 18 },
    { date: "2024-09-16", contributions: 17 },
    { date: "2024-09-17", contributions: 50 },
    { date: "2024-09-18", contributions: 47 },
    { date: "2024-09-19", contributions: 33 },
    { date: "2024-09-20", contributions: 15 },
    { date: "2024-09-21", contributions: 39 },
    { date: "2024-09-22", contributions: 34 },
    { date: "2024-09-23", contributions: 1 },
    { date: "2024-09-24", contributions: 48 },
    { date: "2024-09-25", contributions: 38 },
    { date: "2024-09-26", contributions: 36 },
    { date: "2024-09-27", contributions: 50 },
    { date: "2024-09-28", contributions: 15 },
    { date: "2024-09-29", contributions: 38 },
    { date: "2024-09-30", contributions: 16 },
    { date: "2024-10-01", contributions: 46 },
    { date: "2024-10-02", contributions: 4 },
    { date: "2024-10-03", contributions: 22 },
    { date: "2024-10-04", contributions: 2 },
    { date: "2024-10-05", contributions: 28 },
    { date: "2024-10-06", contributions: 47 },
    { date: "2024-10-07", contributions: 16 },
    { date: "2024-10-08", contributions: 50 },
    { date: "2024-10-09", contributions: 48 },
    { date: "2024-10-10", contributions: 48 },
    { date: "2024-10-11", contributions: 0 },
    { date: "2024-10-12", contributions: 38 },
    { date: "2024-10-13", contributions: 38 },
    { date: "2024-10-14", contributions: 14 },
    { date: "2024-10-15", contributions: 44 },
    { date: "2024-10-16", contributions: 10 },
    { date: "2024-10-17", contributions: 36 },
    { date: "2024-10-18", contributions: 41 },
    { date: "2024-10-19", contributions: 7 },
    { date: "2024-10-20", contributions: 38 },
    { date: "2024-10-21", contributions: 24 },
    { date: "2024-10-22", contributions: 43 },
    { date: "2024-10-23", contributions: 50 },
    { date: "2024-10-24", contributions: 24 },
    { date: "2024-10-25", contributions: 4 },
    { date: "2024-10-26", contributions: 0 },
    { date: "2024-10-27", contributions: 48 },
    { date: "2024-10-28", contributions: 22 },
    { date: "2024-10-29", contributions: 41 },
    { date: "2024-10-30", contributions: 3 },
    { date: "2024-10-31", contributions: 7 },
    { date: "2024-11-01", contributions: 21 },
    { date: "2024-11-02", contributions: 35 },
    { date: "2024-11-03", contributions: 8 },
    { date: "2024-11-04", contributions: 11 },
    { date: "2024-11-05", contributions: 36 },
    { date: "2024-11-06", contributions: 25 },
    { date: "2024-11-07", contributions: 37 },
    { date: "2024-11-08", contributions: 45 },
    { date: "2024-11-09", contributions: 12 },
    { date: "2024-11-10", contributions: 2 },
    { date: "2024-11-11", contributions: 13 },
    { date: "2024-11-12", contributions: 5 },
    { date: "2024-11-13", contributions: 30 },
    { date: "2024-11-14", contributions: 49 },
    { date: "2024-11-15", contributions: 15 },
    { date: "2024-11-16", contributions: 19 },
    { date: "2024-11-17", contributions: 20 },
    { date: "2024-11-18", contributions: 46 },
    { date: "2024-11-19", contributions: 17 },
    { date: "2024-11-20", contributions: 31 },
    { date: "2024-11-21", contributions: 14 },
    { date: "2024-11-22", contributions: 32 },
    { date: "2024-11-23", contributions: 21 },
    { date: "2024-11-24", contributions: 50 },
    { date: "2024-11-25", contributions: 9 },
    { date: "2024-11-26", contributions: 28 },
    { date: "2024-11-27", contributions: 22 },
  ];

  const chartConfig = {
    contributions: {
      label: "Contributions",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator="line"
              nameKey="contributions"
              labelFormatter={(value, name) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
              }}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="contributions" fill="var(--color-primary)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
