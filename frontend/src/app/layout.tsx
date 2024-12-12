import Navbar from "@/features/navbar/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider, useAuth } from "@/features/auth/context/auth-context";
import { Toaster } from "@/components/ui/toaster";
import { Toast } from "@radix-ui/react-toast";
import { AuthGuard } from "@/features/auth/components/auth-guard";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WhoIsBuilding",
  description: "Who Is Building?",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-slate-950 antialiased`}>
        <AuthProvider>
          <AuthGuard>
            <div className="mx-64">
              <Navbar />
              <div>{children}</div>
            </div>
          </AuthGuard>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
