import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import ClickSound from "@/components/ClickSound";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

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
  description: "The digital frontier for high-end AI tools, NLP solutions, and Full-Stack Web Development. Wrangling code for the modern age.",
  keywords: [
    "Rahul", 
    "AI Developer India", 
    "Full Stack Web Developer", 
    "NLP Specialist", 
    "Next.js Portfolio", 
    "Software Engineer Portfolio",
    "Digital Bounty Hunter"
  ],
  authors: [{ name: "Rahul" }],
  creator: "Rahul",
  
  // Social Media Previews (Open Graph)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-rahul-an.vercel.app",
    title: "NOTHING | Digital Bounty Hunters",
    description: "Wrangling AI & Web Solutions for the modern frontier.",
    siteName: "NOTHING",
    images: [
      {
        url: "/og-image.png", // Ensure this exists in your public folder!
        width: 1200,
        height: 630,
        alt: "NOTHING Digital Bounty Hunters",
      },
    ],
  },

  // Twitter/X Card
  twitter: {
    card: "summary_large_image",
    title: "NOTHING | Digital Bounty Hunters",
    description: "Wrangling AI & Web Solutions for the modern frontier.",
    images: ["/og-image.png"],
  },

  // Search Engine Bot Instructions
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
        {/* Canonical URL helps prevent duplicate content issues in Google */}
        <link rel="canonical" href="https://portfolio-rahul-an.vercel.app" />
      </head>
      <body
        className="antialiased bg-[#f5f5f5] text-[#1a120b] font-serif"
        suppressHydrationWarning
      >
        <ClerkProvider>
          {/* Toast notifications for user feedback */}
          <Toaster position="bottom-right" reverseOrder={false} /> 
          
          <Preloader />
          <ClickSound />
          <Navbar />
          
          <main>{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}