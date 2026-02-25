import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unified Data Dashboard",
  description: "Dashboard for visualizing data from multiple pipelines",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1 p-4 md:p-6">{children}</main>
          <footer className="bg-white border-t p-4 text-center text-gray-600">
            <p>Unified Data Dashboard © {new Date().getFullYear()}</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
