import { Option } from "@/types/common-types";

interface PillProps {
	option: Option;
}

export default function Pill({ option }: PillProps) {
	return (
		<button
			className={`${
				option.isSelected
					? "border-blue-700 bg-blue-700 text-white"
					: "border-slate-300 text-slate-500 hover:bg-slate-100"
			} border rounded-full text-sm px-4 py-1`}
		>
			{option.label}
		</button>
	);
}
