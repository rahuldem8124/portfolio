import { Metadata } from "next";
import ClientPage from "./ClientPage";

// ✅ ENHANCED SEO METADATA
export const metadata: Metadata = {
  title: "Freelance Web Developer & AI Specialist | Outlaw Code",
  description: "Hire a freelance web developer for high-end Next.js applications, NLP tools, and AI solutions. Wrangling code for the modern digital frontier.",
  keywords: ["Freelance Web Development", "Hire Next.js Developer", "AI Solutions India", "Python NLP Expert", "Coimbatore Web Developer"],
};

export default function Home() {
  // ✅ JSON-LD: Structured data to tell Google you are a Professional Service
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Outlaw Code - Freelance Web Development",
    "image": "https://portfolio-rahul-an.vercel.app/og-image.png",
    "description": "Freelance software engineering specializing in AI, Machine Learning, and Full-Stack Web Apps.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Coimbatore",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "url": "https://portfolio-rahul-an.vercel.app/",
    "priceRange": "$$",
    "knowsAbout": ["Web Development", "Artificial Intelligence", "Natural Language Processing", "React", "Next.js"]
  };

  return (
    <>
      {/* This script tells Google exactly what services you offer */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientPage />
    </>
  );
}