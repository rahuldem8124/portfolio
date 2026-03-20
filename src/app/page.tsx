import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Outlaw Code | Freelance Web Dev & AI Specialist Coimbatore",
  description: "High-stakes Next.js applications, NLP solutions, and AI automation. Expert freelance software engineering for the global digital frontier.",
  keywords: [
    "Freelance Web Development Coimbatore", 
    "Hire Next.js Developer India", 
    "AI Automation Specialist", 
    "Python NLP Expert", 
    "Full Stack Developer Tamil Nadu",
    "Digital Bounty Hunter Portfolio"
  ],
  alternates: {
    // ✅ Updated to new URL
    canonical: "https://outlawcode.vercel.app/",
  },
  openGraph: {
    title: "Outlaw Code | High-Performance Web & AI Solutions",
    description: "Architecting high-stakes digital outposts and outperforming platforms.",
    // ✅ Updated to new URL
    url: "https://outlawcode.vercel.app/",
    siteName: "Outlaw Code",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Outlaw Code Agency Frontier",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "name": "Outlaw Code",
        // ✅ Updated to new URL
        "image": "https://outlawcode.vercel.app/og-image.png",
        "description": "Premium freelance software engineering specializing in Next.js, AI, and NLP automation.",
        // ✅ Updated to new URL
        "url": "https://outlawcode.vercel.app/",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Coimbatore",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "11.0168",
          "longitude": "76.9558"
        },
        "knowsAbout": ["Next.js", "React", "Natural Language Processing", "Computer Vision", "Python", "Prisma"]
      },
      {
        "@type": "Person",
        "name": "Rahul",
        // ✅ Updated to new URL
        "url": "https://outlawcode.vercel.app/",
        "jobTitle": "Lead Software Engineer",
        "sameAs": [
          "https://github.com/rahul-an",
          "https://linkedin.com/in/rahul-an"
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientPage />
    </>
  );
}