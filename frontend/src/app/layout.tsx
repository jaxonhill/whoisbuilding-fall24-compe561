import Navbar from "@/features/navbar/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider, useAuth } from "@/features/auth/context/auth-context";

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
        <AuthProvider>
          <div className="mx-64">
            <Navbar />
            <div>{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
