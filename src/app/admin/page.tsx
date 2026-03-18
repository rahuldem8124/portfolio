import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { MessageSquare, Clock, CheckCircle, XCircle, User as UserIcon, Save } from "lucide-react";

export default async function AdminDashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!dbUser || dbUser.role !== "ADMIN") {
    redirect("/members");
  }

  async function updateRequest(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const newStatus = formData.get("status") as "PENDING" | "IN_PROGRESS" | "COMPLETED" | "REJECTED";
    const notes = formData.get("adminNotes") as string;

    await prisma.projectRequest.update({
      where: { id },
      data: { 
        status: newStatus,
        adminNotes: notes !== "" ? notes : null,
      },
    });

    revalidatePath("/admin"); 
  }

  const allRequests = await prisma.projectRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true }, 
  });

  const pendingCount = allRequests.filter(r => r.status === "PENDING").length;

  return (
    // ✅ CHANGED: Background to Espresso and added paper texture
    <main className="min-h-screen bg-[#1a120b] text-[#e5d3b3] font-serif overflow-x-hidden pb-20 relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('/patterns/natural-paper.webp')" }} />

      {/* 1. The Header: Rugged Gold & Espresso */}
      <header className="px-8 py-12 md:px-16 border-b-4 border-[#2b1d15] relative z-10 bg-[#2b1d15]/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {/* ✅ CHANGED: Blue to Rust Orange */}
            <h1 className="text-5xl md:text-6xl font-black text-[#b85c38] tracking-tighter mb-4 uppercase italic">
              Command Center
            </h1>
            <div className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-[#e5d3b3]/40">
              Admin: {dbUser.email} • Frontier Secure
            </div>
          </div>
          
          <div className="flex gap-4 font-mono text-center">
             <div className="bg-[#1a120b] border-2 border-[#b85c38]/30 rounded-none p-4 min-w-[120px] shadow-xl">
               <div className="text-[10px] uppercase tracking-widest text-[#e5d3b3]/60 mb-2">Pending</div>
               {/* ✅ CHANGED: Yellow to Bright Gold */}
               <div className="text-3xl font-black text-[#f1c40f]">{pendingCount}</div>
             </div>
             <div className="bg-[#1a120b] border-2 border-[#b85c38]/30 rounded-none p-4 min-w-[120px] shadow-xl">
               <div className="text-[10px] uppercase tracking-widest text-[#e5d3b3]/60 mb-2">Total</div>
               <div className="text-3xl font-black text-[#e5d3b3]">{allRequests.length}</div>
             </div>
          </div>
        </div>
      </header>

      {/* 2. Content: The Telegraph Style Cards */}
      <div className="px-8 py-12 md:px-16 max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-8 border-b-2 border-[#2b1d15] pb-4">
          <MessageSquare className="text-[#b85c38] w-5 h-5" />
          <h2 className="text-xl font-bold text-[#e5d3b3] tracking-widest uppercase italic">Incoming Dispatches</h2>
        </div>

        <div className="space-y-10">
          {allRequests.length === 0 ? (
            <div className="py-20 border-4 border-double border-[#2b1d15] text-center">
              <p className="text-sm font-mono tracking-widest uppercase text-[#e5d3b3]/40">No dispatches detected.</p>
            </div>
          ) : (
            allRequests.map((request) => (
              <div 
                key={request.id} 
                // ✅ CHANGED: Modern Blue-Black to Aged Wood/Paper style
                className="bg-[#2b1d15]/60 border-2 border-[#3d2b1f] rounded-none p-6 md:p-8 shadow-[10px_10px_0px_rgba(0,0,0,0.3)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                style={{ backgroundImage: "url('/patterns/paper-fibers.webp')" }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border-2 ${
                        request.status === "COMPLETED"
                          ? "bg-green-900/20 text-green-500 border-green-500/50"
                          : request.status === "IN_PROGRESS"
                          ? "bg-[#b85c38]/20 text-[#b85c38] border-[#b85c38]/50"
                          : request.status === "REJECTED"
                          ? "bg-red-900/20 text-red-500 border-red-500/50"
                          : "bg-gold-900/20 text-[#f1c40f] border-[#f1c40f]/50"
                      }`}
                    >
                      {request.status.replace("_", " ")}
                    </span>
                    <span className="text-[10px] font-mono text-[#e5d3b3]/40">
                      REF_NUM: {request.id.slice(0, 8)}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#e5d3b3]/40">
                    <div>TIMESTAMP</div>
                    <div className="text-[#e5d3b3]">{new Date(request.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>

                <h3 className="text-2xl md:text-4xl font-black text-[#e5d3b3] mb-3 uppercase italic leading-none">{request.title}</h3>
                
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#b85c38] mb-8">
                  <UserIcon className="w-3 h-3" />
                  {request.user.name || "Outlaw"} • {request.user.email}
                </div>

                <p className="text-lg leading-relaxed text-[#e5d3b3]/80 mb-8 font-serif italic border-l-4 border-[#b85c38]/30 pl-6">
                  "{request.description}"
                </p>

                <form action={updateRequest} className="border-t-2 border-[#3d2b1f] pt-6">
                  <input type="hidden" name="id" value={request.id} />
                  
                  <textarea 
                    name="adminNotes"
                    defaultValue={request.adminNotes || ""}
                    placeholder="SCRIBBLE FEEDBACK HERE..."
                    // ✅ CHANGED: Clean modern inputs to rugged document style
                    className="w-full bg-[#1a120b] border-2 border-[#3d2b1f] p-4 text-sm font-mono text-[#e5d3b3] focus:border-[#b85c38] outline-none transition-all resize-none mb-6 min-h-[100px] placeholder:opacity-20 uppercase"
                  />

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      name="status"
                      value={request.status}
                      className="flex items-center gap-2 px-6 py-3 bg-[#3d2b1f] text-[#e5d3b3] border-2 border-[#e5d3b3]/10 text-xs font-black uppercase tracking-widest hover:bg-[#b85c38] hover:text-[#1a120b] transition-all"
                    >
                      <Save className="w-3 h-3" /> File Note
                    </button>

                    {request.status !== "IN_PROGRESS" && request.status !== "COMPLETED" && (
                      <button
                        type="submit"
                        name="status"
                        value="IN_PROGRESS"
                        className="flex items-center gap-2 px-6 py-3 bg-transparent text-[#b85c38] border-2 border-[#b85c38] text-xs font-black uppercase tracking-widest hover:bg-[#b85c38] hover:text-[#1a120b] transition-all"
                      >
                        <Clock className="w-3 h-3" /> In Progress
                      </button>
                    )}

                    {request.status === "IN_PROGRESS" && (
                      <button
                        type="submit"
                        name="status"
                        value="COMPLETED"
                        className="flex items-center gap-2 px-6 py-3 bg-transparent text-green-500 border-2 border-green-500 text-xs font-black uppercase tracking-widest hover:bg-green-500 hover:text-[#1a120b] transition-all"
                      >
                        <CheckCircle className="w-3 h-3" /> Complete
                      </button>
                    )}
                    
                    {request.status !== "REJECTED" && (
                      <button
                        type="submit"
                        name="status"
                        value="REJECTED"
                        className="flex items-center gap-2 px-6 py-3 bg-transparent text-red-500 border-2 border-red-500 text-xs font-black uppercase tracking-widest hover:bg-red-500 hover:text-[#1a120b] transition-all"
                      >
                        <XCircle className="w-3 h-3" /> Reject
                      </button>
                    )}
                  </div>
                </form>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}