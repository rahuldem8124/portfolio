"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Preloader from "@/components/Preloader";
import Hero from "@/components/hero/Hero";
import Services from "@/components/services/Services";
import { ArrowRight, MessageCircle, Users, CheckCircle } from "lucide-react";

import { SignInButton, useAuth } from "@clerk/nextjs";

const AmbientAtmosphere = () => {
  return (
    <div className="dust-particles">
      <div className="absolute left-[2%] top-[25%] opacity-10 hidden xl:block pointer-events-none">
        <div className="w-6 h-48 bg-[#2b1d15] rounded-full relative">
          <div className="absolute -left-6 top-10 w-8 h-12 bg-[#2b1d15] rounded-full border-b-4 border-[#b85c38]/20" />
          <div className="absolute -right-6 top-20 w-8 h-16 bg-[#2b1d15] rounded-full border-b-4 border-[#b85c38]/20" />
        </div>
      </div>

      <div className="absolute right-[5%] bottom-[15%] opacity-10 hidden xl:block pointer-events-none">
        <div className="w-5 h-32 bg-[#2b1d15] rounded-full relative">
          <div className="absolute -left-4 top-8 w-6 h-10 bg-[#2b1d15] rounded-full" />
        </div>
      </div>

      <motion.div
        animate={{ x: ["-10vw", "110vw"], rotate: [0, 720] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 w-20 h-20 border-2 border-dashed border-[#b85c38]/20 rounded-full"
      />
    </div>
  );
};

const benefits = [
  "Get clarity on your project's technical scope and feasibility.",
  "Receive a preliminary timeline and cost estimate.",
  "Explore innovative solutions tailored to your business goals.",
  "No-obligation discussion with senior engineers.",
];

const teamHighlights = [
  "Senior-level engineering & architecture expertise.",
  "Cross-functional design strategists.",
  "Proven track record in high-stakes environments.",
  "Remote-first trailblazers building globally.",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    const isVisited = window.sessionStorage.getItem("visited");

    if (isVisited) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => setLoading(false), 4500);
      window.sessionStorage.setItem("visited", "true");
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <Preloader />

      <main
        className={`relative min-h-screen bg-[#e5d3b3] transition-opacity duration-1000 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="old-film-overlay" />
        <AmbientAtmosphere />

        <div className="relative z-10">
          <Hero />

          <div className="h-6 w-full bg-gradient-to-r from-[#e74c3c] via-[#f1c40f] via-[#2ecc71] via-[#3498db] to-[#9b59b6] opacity-40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]" />

          <Services />

          <section className="relative py-24 bg-[#3d2b1f] border-t-8 border-[#2b1d15] overflow-hidden">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-4">
                    <Users className="w-6 h-6 text-[#b85c38]" />
                    <span className="text-[#b85c38] font-mono text-sm uppercase tracking-widest font-bold">
                      The Talent
                    </span>
                  </motion.div>

                  <motion.h2 variants={itemVariants} className="text-[#e5d3b3] font-serif text-5xl mb-6">
                    Meet The Posse
                  </motion.h2>

                  <motion.ul variants={itemVariants} className="space-y-4 mb-10">
                    {teamHighlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3 text-[#e5d3b3]/90 font-serif italic">
                        <CheckCircle className="w-5 h-5 text-[#b85c38] shrink-0 mt-1" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </motion.ul>
                </div>

                <motion.div variants={itemVariants} className="flex flex-col items-center justify-center p-10 bg-[#2b1d15]/60 border-2 border-[#b85c38]/30 rounded-lg shadow-xl">
                  <h3 className="text-[#e5d3b3] font-serif text-2xl uppercase tracking-widest mb-4">
                    Step Inside Headquarters
                  </h3>

                  <Link
                    href="/members"
                    className="inline-flex items-center gap-2 px-10 py-4 border-2 border-[#b85c38] text-[#e5d3b3] hover:bg-[#b85c38] hover:text-[#2b1d15] transition-all"
                  >
                    Enter the Office
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </section>

          <section className="relative py-24 bg-[#1a120b] border-t-8 border-[#2b1d15]">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={itemVariants} className="flex flex-col gap-6 p-10 bg-[#2b1d15]/50 border-2 border-[#b85c38]/30 rounded-lg">
                  <h3 className="text-[#e5d3b3] text-2xl uppercase tracking-widest">
                    Start Your Journey
                  </h3>

                  {isLoaded && !isSignedIn && (
                    <SignInButton mode="modal" fallbackRedirectUrl="/admin">
                      <button className="flex items-center justify-center gap-2 px-8 py-4 bg-[#b85c38] text-[#e5d3b3] font-bold uppercase hover:bg-[#a04a28] transition-all">
                        Book Free Consultation
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </SignInButton>
                  )}

                  {isLoaded && isSignedIn && (
                    <Link
                      href="/admin"
                      className="flex items-center justify-center gap-2 px-8 py-4 bg-[#b85c38] text-[#e5d3b3] font-bold uppercase hover:bg-[#a04a28] transition-all"
                    >
                      Go To Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  )}

                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#e5d3b3]/30 text-[#e5d3b3] hover:border-[#b85c38] hover:text-[#b85c38]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                </motion.div>

                <div>
                  <motion.h2 variants={itemVariants} className="text-[#e5d3b3] text-5xl mb-6">
                    Let's Build Something <span className="text-[#b85c38]">Intelligent.</span>
                  </motion.h2>

                  <motion.ul variants={itemVariants} className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3 text-[#e5d3b3]/90">
                        <ArrowRight className="w-5 h-5 text-[#b85c38]" />
                        {benefit}
                      </li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          </section>
        </div>

        <footer className="py-20 text-center border-t-8 border-[#2b1d15] bg-[#1a120b]">
          <p className="text-[#e5d3b3] text-xs uppercase tracking-[1.5em] font-serif">
            STOP • NOTHING • STOP
          </p>

          <p className="text-[#b85c38] text-[10px] uppercase mt-4 tracking-widest font-bold">
            Frontier Intelligence Agency
          </p>
        </footer>
      </main>
    </>
  );
}