import { Skeleton } from "@/components/ui/skeleton";
import GithubSkeleton from "@/features/github/components/github-skeleton";
import ProjectCardSkeleton from "@/features/project-card/components/project-card-skeleton";

export default async function LoadingPage() {
  return (
    <div className="grid gap-8 grid-cols-12 mt-8 mb-16">
      <aside className="col-span-3 w-full">
        <section className="w-full flex flex-col gap-4">
            <Skeleton className="w-full aspect-square rounded-lg" />
            <div className="w-full flex flex-col gap-2">
                <Skeleton className="w-1/3 h-8 rounded-lg" />
                <Skeleton className="w-1/3 h-8 rounded-lg" />
            </div>
            <div className="w-full flex flex-col gap-1">
                <Skeleton className="w-7/8 h-5 rounded-lg" />
                <Skeleton className="w-6/8 h-5 rounded-lg" />
                <Skeleton className="w-5/8 h-5 rounded-lg" />
            </div>
            <div className="w-full flex flex-col gap-2">
                <Skeleton className="w-1/3 h-6 rounded-lg" />
                <Skeleton className="w-1/3 h-6 rounded-lg" />
            <Skeleton className="w-1/3 h-6 rounded-lg" />
            </div>
        </section>
      </aside>
      <div className="col-span-9">
        <GithubSkeleton />
        <div className="pt-8 w-full flex flex-col gap-6">
          <h1 className="text-2xl">Projects</h1>
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      </div>
    </div>
  );
}
