import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#1a120b]">
      <aside className="w-64 border-r-2 border-[#1a120b]/20 flex flex-col p-6 bg-[#0d0905]">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-[#b85c38] text-4xl font-serif font-bold">Ω</span>
          <div>
            <h2 className="text-[#e5d3b3] font-serif italic text-xl font-bold uppercase tracking-tighter">
              Client Portal
            </h2>
            <p className="text-[10px] text-[#b85c38] uppercase tracking-[0.3em]">
              Active Session
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-4">
          <div className="space-y-1">
            <Link href="/dashboard" className="block px-4 py-2 text-[#e5d3b3] hover:bg-[#b85c38] hover:text-[#1a120b] transition-all rounded-lg font-serif font-bold tracking-widest text-sm uppercase">
              My Projects
            </Link>
            <Link href="/dashboard/settings" className="block px-4 py-2 text-[#e5d3b3] hover:bg-[#b85c38] hover:text-[#1a120b] transition-all rounded-lg font-serif font-bold tracking-widest text-sm uppercase">
              Account Settings
            </Link>
          </div>
        </nav>

        <div className="pt-6 border-t border-[#b85c38]/20 flex items-center gap-4">
          <UserButton />
          <span className="text-[#e5d3b3] text-xs font-mono uppercase">Manage Profile</span>
        </div>
      </aside>

      <main className="flex-1 p-10 bg-[#1a120b]">
        {children}
      </main>
    </div>
  );
}