import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectCardSkeleton() {
	return (
		<section className="p-8 flex flex-col gap-6 border border-slate-300 rounded-lg">
			<Skeleton className="w-full aspect-video rounded-lg" />
			<Skeleton className="w-1/3 h-10" />
		</section>
	);
}