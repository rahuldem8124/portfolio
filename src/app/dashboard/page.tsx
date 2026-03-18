import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Shield, MessageSquare, Inbox, Users, LogOut } from "lucide-react";
import AdminResponseForm from "@/components/AdminResponseForm";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Verify Admin Status from DB
  const dbUser = await prisma.user.findUnique({ 
    where: { clerkId: userId },
    select: { role: true, email: true }
  });

  // Security Guard: Ensure only you can access the frontier controls
  if (dbUser?.role !== "ADMIN") redirect("/members");

  // Fetch all project requests with client details
  const allRequests = await prisma.projectRequest.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  // Quick Stats for the Agency Overview
  const pendingCount = allRequests.filter(r => r.status === "PENDING").length;
  const totalUsers = await prisma.user.count();

  return (
    <main className="min-h-screen bg-[#1a120b] text-[#e5d3b3] font-serif p-8 relative overflow-hidden">
      {/* PERFORMANCE: Optimized local background texture */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{ backgroundImage: "url('/patterns/natural-paper.webp')" }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER SECTION: Agency Branding */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-[#2b1d15] pb-8 mb-10 gap-6">
          <div>
            <h1 className="text-5xl font-black text-[#b85c38] flex items-center gap-3 tracking-tighter italic uppercase">
              <Shield className="w-10 h-10" aria-hidden="true" /> Command Center
            </h1>
            <p className="text-[#e5d3b3]/40 mt-2 font-mono text-xs uppercase tracking-[0.3em]">
              Log: {dbUser.email} • System Online
            </p>
          </div>
          
          <div className="flex gap-4">
            {/* Stats Cards: Styled as rugged wood panels */}
            <div className="bg-[#2b1d15] border-2 border-[#b85c38]/30 p-4 rounded-none min-w-[120px] text-center shadow-[6px_6px_0px_rgba(0,0,0,0.3)]">
              <p className="text-[10px] text-[#e5d3b3]/60 font-bold uppercase tracking-widest mb-1">Pending</p>
              <p className="text-3xl font-black text-[#f1c40f]">{pendingCount}</p>
            </div>
            <div className="bg-[#2b1d15] border-2 border-[#b85c38]/30 p-4 rounded-none min-w-[120px] text-center shadow-[6px_6px_0px_rgba(0,0,0,0.3)]">
              <p className="text-[10px] text-[#e5d3b3]/60 font-bold uppercase tracking-widest mb-1">Posse Size</p>
              <p className="text-3xl font-black text-[#e5d3b3]">{totalUsers}</p>
            </div>
            <Link 
              href="/" 
              aria-label="Exit to home"
              className="flex items-center text-xs font-black text-[#1a120b] bg-[#e5d3b3] hover:bg-[#b85c38] transition-all uppercase tracking-widest px-6 py-2 rounded-none h-fit self-end"
            >
              <LogOut className="w-4 h-4 mr-2" /> Exit
            </Link>
          </div>
        </header>

        {/* REQUESTS SECTION: The Bounty List */}
        <section className="grid gap-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black uppercase italic flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-[#b85c38]" /> Incoming Dispatches
            </h2>
            <div className="h-1 flex-1 bg-[#2b1d15]" />
          </div>
          
          {allRequests.length === 0 ? (
            <div className="p-20 text-center border-4 border-dashed border-[#2b1d15] text-[#e5d3b3]/20">
              <Inbox className="w-16 h-16 mx-auto mb-4 opacity-10" />
              <p className="uppercase tracking-[0.4em] text-sm">No dispatches in the chamber.</p>
            </div>
          ) : (
            <div className="grid gap-10">
              {allRequests.map((req) => (
                <div 
                  key={req.id} 
                  className="bg-[#2b1d15]/80 border-2 border-[#3d2b1f] rounded-none p-8 md:p-10 shadow-[10px_10px_0px_rgba(0,0,0,0.4)] relative overflow-hidden group transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                  style={{ backgroundImage: "url('/patterns/paper-fibers.webp')" }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                         <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border-2 ${
                            req.status === 'PENDING' ? 'bg-[#f1c40f]/10 text-[#f1c40f] border-[#f1c40f]/50' : 
                            req.status === 'IN_PROGRESS' ? 'bg-[#b85c38]/10 text-[#b85c38] border-[#b85c38]/50' :
                            'bg-green-900/10 text-green-500 border-green-500/50'
                          }`}>
                            {req.status}
                          </span>
                          <span className="text-[10px] font-mono text-[#e5d3b3]/30">
                            REF: {req.id.slice(-8).toUpperCase()}
                          </span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black uppercase italic text-[#e5d3b3] leading-none group-hover:text-[#b85c38] transition-colors">
                        {req.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-4">
                        <Users className="w-4 h-4 text-[#b85c38]" />
                        <span className="text-xs font-bold text-[#e5d3b3]/60 uppercase tracking-widest">
                          {req.user.name || "Anonymous Outlaw"} • {req.user.email}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-left md:text-right">
                       <p className="text-[10px] font-black text-[#b85c38] uppercase tracking-tighter">Dispatch Received</p>
                       <p className="text-sm font-mono text-[#e5d3b3]/80">{new Date(req.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <p className="text-[#e5d3b3]/90 text-lg leading-relaxed max-w-4xl italic border-l-4 border-[#b85c38]/30 pl-6 mb-8">
                    "{req.description}"
                  </p>
                  
                  {/* Response Form: Ensure this component is themed with the same espresso/rust colors */}
                  <div className="mt-8 border-t-2 border-[#1a120b] pt-8">
                    <AdminResponseForm 
                      requestId={req.id} 
                      currentStatus={req.status} 
                      currentNotes={req.adminNotes} 
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}