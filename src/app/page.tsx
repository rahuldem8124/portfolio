import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Freelance Web Developer & AI Specialist | Outlaw Code",
  description: "High-end Next.js applications, NLP tools, and AI solutions. Hire a professional freelance developer for your digital frontier.",
  keywords: [
    "Freelance Web Development", 
    "Hire Next.js Developer", 
    "AI Solutions India", 
    "Python NLP Expert", 
    "Coimbatore Web Developer",
    "Digital Bounty Hunter"
  ],
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "name": "Outlaw Code",
        "image": "https://portfolio-rahul-an.vercel.app/og-image.png",
        "description": "Expert freelance software engineering specializing in AI, NLP, and Full-Stack Web Development.",
        "url": "https://portfolio-rahul-an.vercel.app/",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Coimbatore",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        },
        "knowsAbout": ["React", "Next.js", "Natural Language Processing", "Computer Vision", "Python"]
      },
      {
        "@type": "Person",
        "name": "Rahul",
        "url": "https://portfolio-rahul-an.vercel.app/",
        "jobTitle": "Freelance Software Engineer",
        "description": "Developer specializing in NLP, AI-powered applications, and modern web architecture.",
        "sameAs": [
          "https://github.com/rahul-an", // Double-check your GitHub username
          "https://linkedin.com/in/rahul-an" // Double-check your LinkedIn
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