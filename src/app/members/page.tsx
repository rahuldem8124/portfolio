import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Team from "@/components/team/Team";
import RequestForm from "@/components/RequestForm";
import { Skull, Send, History } from "lucide-react";

export default async function MembersPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });

  // Fetch only THIS user's specific requests
  const myRequests = await prisma.projectRequest.findMany({
    where: { userId: userId as string },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="relative min-h-screen bg-[#1a120b] text-[#e5d3b3] overflow-x-hidden">
      {/* Old Film Visual Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/grain.png')] bg-repeat" />
      
      {/* Navigation */}
      <nav className="relative z-20 p-8 flex justify-between items-center">
        <Link href="/" className="text-sm font-bold tracking-[0.3em] text-[#b85c38] uppercase hover:text-[#e5d3b3] transition-all">
          ← Back to Frontier
        </Link>
        <div className="text-[10px] uppercase tracking-[0.5em] opacity-40">
           {dbUser?.name || "Outlaw"} • Verified {dbUser?.role || "Member"}
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-6xl md:text-8xl font-serif uppercase tracking-tighter text-[#b85c38] text-center mb-20">
          The Posse
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT: Project Request Form */}
          <div className="lg:col-span-1 bg-[#2d1e14] p-8 rounded-2xl border border-[#b85c38]/20 shadow-2xl h-fit sticky top-24">
            <h3 className="text-xl font-bold uppercase mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-[#b85c38]" /> Request a Project
            </h3>
            <p className="text-xs text-[#b85c38] mb-6 font-bold uppercase tracking-widest leading-relaxed">
              Submit your vision for AI tools or Web Development. The Outlaw will review your dispatch.
            </p>
            
            <RequestForm />
          </div>

          {/* RIGHT: Request History & Team */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h3 className="text-xl font-bold uppercase mb-8 flex items-center gap-2">
                <History className="w-5 h-5 text-[#b85c38]" /> Your Request Log
              </h3>
              
              <div className="space-y-6">
                {myRequests.length === 0 ? (
                  <div className="py-12 border border-dashed border-[#b85c38]/20 rounded-xl text-center">
                    <p className="text-sm italic opacity-40">No active dispatches found in the log.</p>
                  </div>
                ) : (
                  myRequests.map((req) => (
                    <div key={req.id} className="bg-black/40 border border-[#e5d3b3]/10 p-6 rounded-2xl backdrop-blur-sm transition-all hover:border-[#b85c38]/40">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-[#b85c38] text-lg tracking-tight">{req.title}</h4>
                        
                        {/* ✅ FIXED STATUS BADGE COLORS */}
                        <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                          req.status === 'PENDING' ? 'bg-[#b85c38]/20 text-[#b85c38] border border-[#b85c38]/30' : 
                          req.status === 'IN_PROGRESS' ? 'bg-blue-900/40 text-blue-400 border border-blue-400/30' :
                          req.status === 'REJECTED' ? 'bg-red-900/40 text-red-400 border border-red-400/30' :
                          'bg-green-900/40 text-green-400 border border-green-400/30' // COMPLETED
                        }`}>
                          {req.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-[#e5d3b3]/80">{req.description}</p>
                      
                      {/* Frontier Feedback (Admin Notes) */}
                      {req.adminNotes && (
                        <div className="mt-6 p-5 bg-[#b85c38]/5 border-l-4 border-[#b85c38] rounded-r-2xl">
                          <p className="text-[10px] font-black uppercase text-[#b85c38] mb-2 tracking-widest">Frontier Feedback:</p>
                          <p className="text-sm italic leading-relaxed text-[#e5d3b3]">"{req.adminNotes}"</p>
                        </div>
                      )}
                      
                      <div className="mt-4 text-[9px] uppercase tracking-widest opacity-30">
                        Logged on {new Date(req.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="pt-16 border-t border-[#b85c38]/20">
               <div className="flex items-center gap-4 mb-10">
                 <h3 className="text-2xl font-serif uppercase tracking-widest text-[#b85c38]">Internal Directory</h3>
                 <div className="h-px flex-1 bg-[#b85c38]/20" />
               </div>
               <Team />
            </section>
          </div>
        </div>
      </div>

      <footer className="relative z-10 py-12 text-center border-t border-[#2b1d15]/50 bg-[#1a120b]">
        <div className="mb-4 opacity-30 grayscale text-2xl">🌵</div>
        <p className="text-[#b85c38] text-[10px] uppercase tracking-[1.5em] font-bold">
          STOP • NOTHING • STOP
        </p>
      </footer>
    </main>
  );
}