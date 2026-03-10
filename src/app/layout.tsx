import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import ClickSound from "@/components/ClickSound";
import { ClerkProvider } from "@clerk/nextjs";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOTHING | Digital Bounty Hunters",
  description: "Wrangling AI & Web Solutions for the modern frontier.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable}`}>
      <body
        className="antialiased bg-[#f5f5f5] text-[#1a120b] font-serif"
        suppressHydrationWarning
      >
        <ClerkProvider>
          <Preloader />
          <ClickSound />
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}