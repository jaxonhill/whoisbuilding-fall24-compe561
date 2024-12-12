import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Specify the font weights you need
});

export default function Logo() {
  return (
    <div className="flex flex-row gap-2 items-center">
      <img src="/whoisbuilding-blue.png" alt="logo" width={40} />
      <a href="/" className={`${poppins.className} font-normal text-xl`}>
        whoisbuilding
      </a>
    </div>
  );
}
