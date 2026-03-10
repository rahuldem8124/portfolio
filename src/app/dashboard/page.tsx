import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Shield, MessageSquare, Inbox, Activity, Users } from "lucide-react";
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

  if (dbUser?.role !== "ADMIN") redirect("/members");

  // Fetch all project requests with user details
  const allRequests = await prisma.projectRequest.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  // Calculate Quick Stats
  const pendingCount = allRequests.filter(r => r.status === "PENDING").length;
  const totalUsers = await prisma.user.count();

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-800 pb-8 mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-blue-500 flex items-center gap-3">
              <Shield className="w-8 h-8" /> COMMAND CENTER
            </h1>
            <p className="text-slate-500 mt-2 font-mono text-sm uppercase tracking-widest">
              Admin: {dbUser.email} • System Online
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl min-w-[100px] text-center">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Pending</p>
              <p className="text-xl font-black text-amber-500">{pendingCount}</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl min-w-[100px] text-center">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Posse Size</p>
              <p className="text-xl font-black text-blue-400">{totalUsers}</p>
            </div>
            <Link href="/" className="flex items-center text-xs font-bold text-slate-500 hover:text-white transition-all uppercase tracking-widest border border-slate-800 px-4 py-2 rounded h-fit">
              Exit
            </Link>
          </div>
        </header>

        {/* REQUESTS SECTION */}
        <section className="grid gap-8">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" /> Incoming Dispatches
            </h2>
            <div className="h-px flex-1 bg-slate-800" />
          </div>
          
          {allRequests.length === 0 ? (
            <div className="p-20 text-center border-2 border-dashed border-slate-800 rounded-3xl text-slate-600">
              <Inbox className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="uppercase tracking-widest text-sm">No requests in the chamber yet.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {allRequests.map((req) => (
                <div key={req.id} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-md hover:border-blue-500/30 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                         <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${
                            req.status === 'PENDING' ? 'bg-amber-900/20 text-amber-500 border-amber-500/30' : 
                            req.status === 'IN_PROGRESS' ? 'bg-blue-900/20 text-blue-400 border-blue-400/30' :
                            'bg-green-900/20 text-green-400 border-green-400/30'
                          }`}>
                            {req.status}
                          </span>
                          <span className="text-[10px] font-mono text-slate-600">ID: {req.id.slice(-6)}</span>
                      </div>
                      <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">{req.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="w-3 h-3 text-slate-500" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                          {req.user.name || "Outlaw"} • {req.user.email}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                       <p className="text-[10px] font-bold text-slate-600 uppercase">Received</p>
                       <p className="text-xs font-mono text-slate-400">{new Date(req.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed max-w-4xl">{req.description}</p>
                  
                  {/* ✅ THE FUNCTIONAL RESPONSE FORM */}
                  <AdminResponseForm 
                    requestId={req.id} 
                    currentStatus={req.status} 
                    currentNotes={req.adminNotes} 
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}