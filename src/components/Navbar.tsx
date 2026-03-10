"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Star, Skull, ShieldCheck, Users } from "lucide-react";

// ✅ ADD useUser TO IMPORTS
import { SignInButton, UserButton, useAuth, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const { isLoaded, isSignedIn } = useAuth();
  
  // ✅ GET USER DATA (TO CHECK ROLE)
  const { user } = useUser();

  // Define your Admin check
  // We check your primary email to ensure only you get the Admin link
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

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative p-2 bg-[#b85c38] rounded-full border-2 border-[#e5d3b3] group-hover:rotate-12 transition-transform duration-300">
              <Star className="w-6 h-6 text-[#1a120b] fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black font-serif italic text-[#e5d3b3] uppercase">
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
                <span className="absolute inset-0 bg-[#e5d3b3] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-0" />
              </Link>
            ))}

            {/* ✅ ROLE-BASED DASHBOARD LINKS */}
            {isLoaded && isSignedIn && (
              <div className="flex items-center gap-6">
                {isAdmin ? (
                  <Link 
                    href="/dashboard" 
                    className="flex items-center gap-2 text-[#b85c38] hover:text-[#e5d3b3] text-xs font-black uppercase tracking-tighter transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Admin Panel
                  </Link>
                ) : (
                  <Link 
                    href="/members" 
                    className="flex items-center gap-2 text-[#e5d3b3]/70 hover:text-[#e5d3b3] text-xs font-black uppercase tracking-tighter transition-colors"
                  >
                    <Users className="w-4 h-4" />
                    The Posse
                  </Link>
                )}
                <UserButton />
              </div>
            )}

            {/* AUTH BUTTON FOR LOGGED OUT USERS */}
            {isLoaded && !isSignedIn && (
              <SignInButton mode="modal" fallbackRedirectUrl="/members">
                <button className="px-6 py-2 bg-[#b85c38] text-[#1a120b] font-black uppercase tracking-widest text-xs border-2 border-[#e5d3b3] hover:bg-[#e5d3b3] hover:text-[#b85c38] transition-all">
                  Client Portal
                </button>
              </SignInButton>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#e5d3b3] p-2 border border-[#e5d3b3]/30 rounded-md"
          >
            {mobileOpen ? <X /> : <Menu />}
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
                className="text-3xl font-black font-serif italic text-[#e5d3b3] uppercase"
              >
                {link.name}
              </Link>
            ))}

            {/* ✅ MOBILE ROLE-BASED LINKS */}
            {isLoaded && isSignedIn && (
              <>
                <Link 
                  href={isAdmin ? "/dashboard" : "/members"} 
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-bold text-[#b85c38] uppercase flex items-center gap-2"
                >
                  {isAdmin ? <ShieldCheck /> : <Users />}
                  {isAdmin ? "Admin Console" : "Member Area"}
                </Link>
                <div className="mt-4">
                  <UserButton appearance={{ elements: { userButtonAvatarBox: "w-12 h-12" } }} />
                </div>
              </>
            )}

            {!isSignedIn && (
              <SignInButton mode="modal" fallbackRedirectUrl="/members">
                <button className="flex items-center gap-2 text-[#b85c38] font-bold uppercase border-2 border-[#b85c38] px-8 py-3">
                  <Skull className="w-4 h-4" />
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