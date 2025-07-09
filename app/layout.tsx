import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/layout/Header";
import "./globals.css";
import ProgressBar from "@/components/ui/ProgressBar";
import Footer from "@/components/layout/Footer";


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
  <html lang="en" className="dark">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-grid text-foreground relative overflow-auto`}
    >
        <ProgressBar />
      {/* 🔥 Glow Overlay */}
      <div className="pointer-events-none absolute  inset-0 z-0 bg-black/60">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-500 blur-3xl opacity-30 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green-500 blur-3xl opacity-20 rounded-full" />
      </div>
     
      <main className="relative z-10 min-h-[calc(100vh-4rem)]"> 
         <Header/>
       {children}
        <Footer />
       </main>
    </body>
  </html>
</ClerkProvider>
  );
}
