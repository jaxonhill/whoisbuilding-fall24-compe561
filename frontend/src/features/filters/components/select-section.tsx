import { Badge } from "@/components/ui/badge";
import { Option } from "@/types/common-types";

interface SelectSectionProps {
	headingText: string;
	options: Option[];
	onToggleTag: (tag: Option) => void;
}

export default function SelectSection({
	headingText,
	options,
	onToggleTag,
}: SelectSectionProps) {
	return (
		<section className="flex flex-col gap-3 w-full">
			<div className="flex justify-between items-center">
				<h2 className="font-medium text-base">{headingText}</h2>
			</div>
			<div className="flex flex-wrap gap-x-2 gap-y-3">
				{options.map((option) => {
					return (
						<Badge 
							onClick={() => onToggleTag(option)} 
							variant={option.isSelected ? "selected" : "secondary"} 
							key={option.id}
						>
							{option.label}
						</Badge>
					);
				})}
				<Badge variant="default" onClick={() => {}}>Show All +</Badge>
			</div>
		</section>
	);
}
