import { Hammer } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Specify the font weights you need
});

export default function Logo() {
  return (
    <div className="flex gap-1 items-center">
        <Hammer className="h-8 w-8 stroke-[1.5px]" />
        <p className={`${poppins.className} font-medium text-xl`}>whoisbuilding</p>
    </div>
  )
}
