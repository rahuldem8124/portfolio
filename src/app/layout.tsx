import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import ClickSound from "@/components/ClickSound";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics } from '@next/third-parties/google';

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

// ✅ FULL SEO CONFIGURATION
export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-rahul-an.vercel.app"),
  title: {
    default: "NOTHING | Digital Bounty Hunters",
    template: "%s | NOTHING", 
  },
  description: "Freelance web development and AI solutions. Wrangling Next.js, NLP, and Computer Vision for the modern digital frontier.",
  keywords: [
    "Freelance Web Developer", 
    "AI Specialist", 
    "Next.js Portfolio", 
    "Rahul", 
    "Coimbatore Developer",
    "Digital Bounty Hunter"
  ],
  authors: [{ name: "Rahul" }],
  creator: "Rahul",
  
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-rahul-an.vercel.app",
    title: "NOTHING | Digital Bounty Hunters",
    description: "Wrangling AI & Web Solutions for the modern frontier.",
    siteName: "NOTHING",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NOTHING Digital Bounty Hunters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOTHING | Digital Bounty Hunters",
    description: "Wrangling AI & Web Solutions for the modern frontier.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable}`}>
      <head>
        <link rel="canonical" href="https://portfolio-rahul-an.vercel.app" />
      </head>
      <body
        className="antialiased bg-[#f5f5f5] text-[#1a120b] font-serif"
        suppressHydrationWarning
      >
        <ClerkProvider>
          <Toaster position="bottom-right" reverseOrder={false} /> 
          <Preloader />
          <ClickSound />
          <Navbar />
          <main>{children}</main>
        </ClerkProvider>

        {/* ✅ GOOGLE ANALYTICS - Replace G-XXXXXXXXXX with your real ID */}
        <GoogleAnalytics gaId="G-4FJ0D89RHC" /> 
      </body>
    </html>
  );
}