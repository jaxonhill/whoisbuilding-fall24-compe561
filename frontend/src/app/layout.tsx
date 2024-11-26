import Navbar from "@/features/navbar/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} text-slate-950 antialiased`}>
				<div className="mx-64">
					<Navbar />
					<div>{children}</div>
				</div>
			</body>
		</html>
	);
}
