"use client";

import { Area, Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { AreaChart } from "lucide-react";

interface GitHubChartProps {
  gitHubUsername: string;
  chartData: {}[];
}

export default async function GitHubChart({
  gitHubUsername,
  chartData,
}: GitHubChartProps) {
  const chartConfig = {
    contributions: {
      label: "Contributions",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <Card className="p-2">
      <CardTitle className="p-4 text-2xl">Contributions from GitHub</CardTitle>
      <CardDescription></CardDescription>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart data={chartData}>
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
                timeZone: "UTC",
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
                    timeZone: "UTC",
                  });
                }}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="contributions" fill="var(--color-primary)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
