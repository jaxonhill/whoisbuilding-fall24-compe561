import { Skeleton } from "@/components/ui/skeleton";

export default function GitHubChartSkeleton() {
  return (
    <div className="flex flex-col w-full gap-2">
      <Skeleton className="w-full aspect-video rounded-lg" />
    </div>
  );
}
