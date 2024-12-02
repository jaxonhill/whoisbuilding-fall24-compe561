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
import Link from "next/link";

interface GitHubChartProps {
  gitHubUsername: string;
  chartData: {}[];
  from_date: string;
  to_date: string;
  total_contributions_in_date_range: number;
  yearly_contributions: number;
  active_repos: ActiveRepos[];
}

export default async function GitHubChart({
  gitHubUsername,
  chartData,
  from_date,
  to_date,
  total_contributions_in_date_range,
  yearly_contributions,
  active_repos,
}: GitHubChartProps) {
  const chartConfig = {
    contributions: {
      label: "Contributions",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <Card className="p-2">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">GitHub Contributions</CardTitle>
          <div className="flex flex-row items-center">
            <GitCommitHorizontal className="pr-1" />
            <CardDescription>
              {total_contributions_in_date_range} contributions
            </CardDescription>
          </div>
        </div>
        <CardDescription>
          {`${new Date(from_date).toLocaleDateString("en-US", {
            month: "long",
            timeZone: "UTC",
          })}
        - ${new Date(to_date).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })}
        `}
        </CardDescription>
      </div>
      <CardContent>
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
            <Bar
              dataKey="contributions"
              fill="var(--color-primary)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Active Repositories
        </div>
        <div className="flex flex-wrap gap-2 leading-none text-muted-foreground">
          {active_repos.map((repository, index) => (
            <>
              <a
                key={index}
                className="flex flex-row"
                target="_blank"
                href={repository.link}
              >
                <BookMarked className="h-4 w-4" />
                <span className="pl-1">{`${repository.name}${
                  index < active_repos.length - 1 && ", "
                }`}</span>
              </a>
            </>
          ))}
        </div>
      </CardFooter>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Year-To-Date Contributions
        </div>
        <div className="flex gap-2 leading-none text-muted-foreground items-center">
          <>
            <GitCommitHorizontal />
            {yearly_contributions}
          </>
        </div>
      </CardFooter>
    </Card>
  );
}
