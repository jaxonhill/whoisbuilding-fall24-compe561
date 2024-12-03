import Pill from "@/components/pill-select";

interface TagsContainerProps {
	tags: string[];
}

export default function TagsContainer({ tags }: TagsContainerProps) {
	return (
		<div className="pt-2 flex flex-wrap gap-2">
			{tags.map((tag) => {
				return <Pill key={tag} option={{ id: tag, label: tag, isSelected: true }} />
			})}
		</div>
	)
}