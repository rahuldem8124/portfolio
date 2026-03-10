"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Login() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#e8e2d5] p-8 border-2 border-[#1a120b] shadow-[10px_10px_0px_#1a120b] relative"
      style={{
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
      }}
    >
      {/* Decorative Corner Rivets */}
      <div className="absolute top-3 left-3 w-2 h-2 bg-[#1a120b] rounded-full opacity-30" />
      <div className="absolute top-3 right-3 w-2 h-2 bg-[#1a120b] rounded-full opacity-30" />
      <div className="absolute bottom-3 left-3 w-2 h-2 bg-[#1a120b] rounded-full opacity-30" />
      <div className="absolute bottom-3 right-3 w-2 h-2 bg-[#1a120b] rounded-full opacity-30" />

      {/* Clerk Sign In Component */}
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/login"
        fallbackRedirectUrl="/admin"
        appearance={{
          elements: {
            card: "shadow-none bg-transparent",
          },
        }}
      />
    </motion.div>
  );
}