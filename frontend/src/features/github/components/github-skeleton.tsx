import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function GitHubChartSkeleton() {
  return (
    <div className="p-2 gap-2">
      <Skeleton className="h-[200px] w-auto rounded-xl mb-4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-auto" />
        <Skeleton className="h-4 w-auto" />
      </div>
    </div>
  );
}
