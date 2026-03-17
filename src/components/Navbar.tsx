"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Star, ShieldCheck, Users, Skull } from "lucide-react";

// Clerk Imports
import { SignInButton, UserButton, useAuth, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  // Admin Check
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "rahulan23aml@srishakthi.ac.in";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Web Dev", href: "/web-development" },
    { name: "AI Tools", href: "/ai-tools" },
    { name: "Video", href: "/video-editing" },
    { name: "Resume", href: "/resume-making" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-[3px] ${
          isScrolled
            ? "bg-[#1a120b] py-3 border-[#b85c38] shadow-2xl"
            : "bg-[#1a120b]/90 py-5 border-transparent backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

          {/* LOGO - Added aria-label for SEO/Accessibility */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Outlaw Code Home">
            <div className="relative p-2 bg-[#b85c38] rounded-full border-2 border-[#e5d3b3] group-hover:rotate-12 transition-transform duration-300">
              <Star className="w-6 h-6 text-[#1a120b] fill-current" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black font-serif italic text-[#e5d3b3] uppercase leading-none">
                Outlaw
              </span>
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#b85c38] uppercase">
                Code
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="relative text-[#e5d3b3] font-serif font-bold tracking-widest text-sm uppercase group overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-[#1a120b] transition-colors duration-300">
                  {link.name}
                </span>
                <span className="absolute inset-0 bg-[#e5d3b3] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-0" aria-hidden="true" />
              </Link>
            ))}

            {/* DASHBOARD LINKS */}
            {isLoaded && isSignedIn && (
              <div className="flex items-center gap-6">
                {isAdmin ? (
                  <Link 
                    href="/dashboard" 
                    className="flex items-center gap-2 text-[#b85c38] hover:text-[#e5d3b3] text-xs font-black uppercase tracking-tighter transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                    Admin Panel
                  </Link>
                ) : (
                  <Link 
                    href="/members" 
                    className="flex items-center gap-2 text-[#e5d3b3]/70 hover:text-[#e5d3b3] text-xs font-black uppercase tracking-tighter transition-colors"
                  >
                    <Users className="w-4 h-4" aria-hidden="true" />
                    The Posse
                  </Link>
                )}
                <UserButton />
              </div>
            )}

            {/* AUTH BUTTON */}
            {isLoaded && !isSignedIn && (
              <SignInButton mode="modal" fallbackRedirectUrl="/members">
                <button className="px-6 py-2 bg-[#b85c38] text-[#1a120b] font-black uppercase tracking-widest text-xs border-2 border-[#e5d3b3] hover:bg-[#e5d3b3] hover:text-[#b85c38] transition-all focus:ring-2 focus:ring-[#b85c38] outline-none">
                  Client Portal
                </button>
              </SignInButton>
            )}
          </div>

          {/* MOBILE MENU BUTTON - Optimized for Accessibility Score */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close main menu" : "Open main menu"}
            aria-expanded={mobileOpen}
            className="md:hidden text-[#e5d3b3] p-2 border border-[#e5d3b3]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b85c38] transition-colors"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#1a120b] pt-24 px-6 md:hidden flex flex-col items-center gap-8"
          >
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-black font-serif italic text-[#e5d3b3] uppercase hover:text-[#b85c38] transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {isLoaded && isSignedIn && (
              <>
                <Link 
                  href={isAdmin ? "/dashboard" : "/members"} 
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-bold text-[#b85c38] uppercase flex items-center gap-2"
                >
                  {isAdmin ? <ShieldCheck aria-hidden="true" /> : <Users aria-hidden="true" />}
                  {isAdmin ? "Admin Console" : "Member Area"}
                </Link>
                <div className="mt-4">
                  <UserButton appearance={{ elements: { userButtonAvatarBox: "w-14 h-14" } }} />
                </div>
              </>
            )}

            {!isSignedIn && (
              <SignInButton mode="modal" fallbackRedirectUrl="/members">
                <button 
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-[#b85c38] font-bold uppercase border-2 border-[#b85c38] px-10 py-4 hover:bg-[#b85c38] hover:text-[#1a120b] transition-all"
                >
                  <Skull className="w-5 h-5" aria-hidden="true" />
                  Client Portal
                </button>
              </SignInButton>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}