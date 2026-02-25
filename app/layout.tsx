import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { RegionProvider } from "@/lib/RegionContext";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unified Data Dashboard",
  description: "Network analysis dashboard for unified data infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrains.variable} antialiased`}>
        <Suspense>
          <RegionProvider>
            <Sidebar />
            <main className="main-content">{children}</main>
          </RegionProvider>
        </Suspense>
      </body>
    </html>
  );
}