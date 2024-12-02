import { Hammer } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Specify the font weights you need
});

export default function Logo() {
	return (
		<a href="/" className={`${poppins.className} font-normal text-2xl`}>
			whoisbuilding
		</a>
	);
}
