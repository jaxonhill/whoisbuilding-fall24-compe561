import { Bar, BarChart } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export default function GitHubChart() {
  const chartData = [
    { date: "2024-04-01", contributions: 10 },
    { date: "2024-04-02", contributions: 15 },
    { date: "2024-04-03", contributions: 8 },
  ];

  const chartConfig = {
    contributions: {
      label: "Contributions",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="contributions" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
