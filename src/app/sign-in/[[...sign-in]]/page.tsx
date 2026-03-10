"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1a120b]">
      <SignIn 
        fallbackRedirectUrl="/admin"
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "#b85c38",
            colorBackground: "#1a120b",
            colorText: "#e5d3b3",
            fontFamily: "serif",
          },
          elements: {
            card: "border-2 border-[#b85c38] shadow-2xl",
            headerTitle: "font-serif italic uppercase tracking-widest",
            formButtonPrimary: "bg-[#b85c38] hover:bg-[#a04a28] text-[#1a120b] font-bold uppercase",
            socialButtonsBlockButton: "border-[#e5d3b3]/20 hover:bg-[#b85c38]/10",
            footerActionLink: "text-[#b85c38] hover:text-[#e5d3b3]",
          }
        }}
      />
    </div>
  );
}