import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UpCyclica",
  description: "Smart Waste. Smarter World.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full bg-white text-black">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
        >
          <Header />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
