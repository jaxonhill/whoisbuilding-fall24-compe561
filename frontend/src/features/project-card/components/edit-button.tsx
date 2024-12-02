import { SquarePen } from "lucide-react";

export default function EditButton() {
	return (
		<button className="bg-slate-100 rounded-full h-10 w-10 flex justify-center items-center group hover:bg-slate-200">
			<SquarePen className="stroke-slate-800 group-hover:stroke-slate-700" />
		</button>
	);
}