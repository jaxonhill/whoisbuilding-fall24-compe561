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
  CardFooter,
} from "@/components/ui/card";
import { GitCommitHorizontal, BookMarked, CalendarDays } from "lucide-react";

interface GitHubChartProps {
  chartData: {}[];
  from_date: string;
  to_date: string;
  total_contributions_in_date_range: number;
  yearly_contributions: number;
  active_repos: ActiveRepos[];
}

function createDateRangeString(from_date: string, to_date: string): string {
  const fromDate = new Date(from_date);
  const toDate = new Date(to_date);

  const fromDateString = fromDate.toLocaleDateString("en-US", {
    month: "long",
    timeZone: "UTC",
  });

  const toDateString = toDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  
  return (
    `${fromDateString} - ${toDateString}`
  )
}

const chartConfig = {
  contributions: {
    label: "Contributions",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default function GitHubChart({
  chartData,
  from_date,
  to_date,
  total_contributions_in_date_range,
}: GitHubChartProps) {
  return (
    <GithubChartLayout>
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">Last Month's Github Contributions</h1>
          <p className="text-slate-600">{createDateRangeString(from_date, to_date)}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <GitCommitHorizontal className="w-6 h-6 stroke-slate-800" />
          <p className="text-slate-800">
            {total_contributions_in_date_range} monthly contributions
          </p>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="w-full">
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
            <Bar
              dataKey="contributions"
              fill="var(--color-primary)"
              radius={4}
            />
        </BarChart>
      </ChartContainer>
    </GithubChartLayout>
  );
}

export function GithubChartLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="p-8 flex flex-col gap-6 border border-slate-300 rounded-lg">
      {children}
    </section>
  );
}