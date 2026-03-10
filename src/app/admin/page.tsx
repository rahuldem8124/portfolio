import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { MessageSquare, Clock, CheckCircle, XCircle, User as UserIcon, Save } from "lucide-react";

export default async function AdminDashboard() {
  // 1. Authenticate and verify Admin status
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!dbUser || dbUser.role !== "ADMIN") {
    redirect("/members");
  }

  // 2. THE SERVER ACTION
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

  // 3. Fetch all requests
  const allRequests = await prisma.projectRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true }, 
  });

  // Calculate some quick stats for the header
  const pendingCount = allRequests.filter(r => r.status === "PENDING").length;

  return (
    <main className="min-h-screen bg-[#06080F] text-[#e5d3b3] font-serif overflow-x-hidden pb-20">
      
      {/* 4. The Header (Matching the screenshot) */}
      <header className="px-8 py-12 md:px-16 border-b border-[#1E293B] relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#3B82F6] tracking-wider mb-4 uppercase">
              Command Center
            </h1>
            <div className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-[#64748B]">
              Admin: {dbUser.email} • System Online
            </div>
          </div>
          
          {/* Optional Stats Display */}
          <div className="flex gap-4 font-mono text-center">
             <div className="bg-[#0B101E] border border-[#1E293B] rounded p-4 min-w-[100px]">
               <div className="text-[10px] uppercase tracking-widest text-[#64748B] mb-2">Pending</div>
               <div className="text-2xl font-bold text-[#F59E0B]">{pendingCount}</div>
             </div>
             <div className="bg-[#0B101E] border border-[#1E293B] rounded p-4 min-w-[100px]">
               <div className="text-[10px] uppercase tracking-widest text-[#64748B] mb-2">Total</div>
               <div className="text-2xl font-bold text-[#3B82F6]">{allRequests.length}</div>
             </div>
          </div>
        </div>
      </header>

      {/* 5. The Content */}
      <div className="px-8 py-12 md:px-16 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8 border-b border-[#1E293B] pb-4">
          <MessageSquare className="text-[#3B82F6] w-5 h-5" />
          <h2 className="text-xl font-bold text-white tracking-widest uppercase">Incoming Dispatches</h2>
        </div>

        <div className="space-y-8">
          {allRequests.length === 0 ? (
            <div className="py-20 border border-dashed border-[#1E293B] rounded-xl text-center">
              <p className="text-sm font-mono tracking-widest uppercase text-[#64748B]">No dispatches detected.</p>
            </div>
          ) : (
            allRequests.map((request) => (
              <div 
                key={request.id} 
                className="bg-[#0B101E] border border-[#1E293B] rounded-2xl p-6 md:p-8 shadow-2xl transition-all hover:border-[#3B82F6]/30"
              >
                {/* Card Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded border ${
                        request.status === "COMPLETED"
                          ? "bg-green-950/40 text-green-400 border-green-500/30"
                          : request.status === "IN_PROGRESS"
                          ? "bg-blue-950/40 text-blue-400 border-blue-500/30"
                          : request.status === "REJECTED"
                          ? "bg-red-950/40 text-red-400 border-red-500/30"
                          : "bg-yellow-950/40 text-yellow-400 border-yellow-500/30"
                      }`}
                    >
                      {request.status.replace("_", " ")}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">
                      ID: {request.id.slice(0, 8)}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] text-left md:text-right">
                    <div className="mb-1">Received</div>
                    <div className="text-white/60">{new Date(request.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* Card Body */}
                <h3 className="text-2xl md:text-3xl font-bold text-[#3B82F6] mb-3">{request.title}</h3>
                
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#64748B] mb-8">
                  <UserIcon className="w-3 h-3" />
                  {request.user.name || "Outlaw"} • {request.user.email}
                </div>

                <p className="text-sm leading-relaxed text-[#94A3B8] mb-8 font-sans">
                  {request.description}
                </p>

                {/* The Action Form */}
                <form action={updateRequest} className="border-t border-[#1E293B] pt-6">
                  <input type="hidden" name="id" value={request.id} />
                  
                  <textarea 
                    name="adminNotes"
                    defaultValue={request.adminNotes || ""}
                    placeholder="Add frontier feedback..."
                    className="w-full bg-[#05060A] border border-[#1E293B] rounded-xl p-4 text-sm font-sans text-white focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all resize-none mb-6 min-h-[100px]"
                  />

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      name="status"
                      value={request.status}
                      className="flex items-center gap-2 px-4 py-2 bg-transparent text-[#94A3B8] border border-[#1E293B] text-[10px] font-black uppercase tracking-widest rounded hover:bg-[#1E293B] transition-colors"
                    >
                      <Save className="w-3 h-3" /> Save Note
                    </button>

                    {request.status !== "IN_PROGRESS" && request.status !== "COMPLETED" && (
                      <button
                        type="submit"
                        name="status"
                        value="IN_PROGRESS"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-950/30 text-blue-400 border border-blue-500/30 text-[10px] font-black uppercase tracking-widest rounded hover:bg-blue-900/50 transition-colors"
                      >
                        <Clock className="w-3 h-3" /> In Progress
                      </button>
                    )}

                    {request.status === "IN_PROGRESS" && (
                      <button
                        type="submit"
                        name="status"
                        value="COMPLETED"
                        className="flex items-center gap-2 px-4 py-2 bg-green-950/30 text-green-400 border border-green-500/30 text-[10px] font-black uppercase tracking-widest rounded hover:bg-green-900/50 transition-colors"
                      >
                        <CheckCircle className="w-3 h-3" /> Complete
                      </button>
                    )}
                    
                    {request.status !== "REJECTED" && (
                      <button
                        type="submit"
                        name="status"
                        value="REJECTED"
                        className="flex items-center gap-2 px-4 py-2 bg-red-950/30 text-red-400 border border-red-500/30 text-[10px] font-black uppercase tracking-widest rounded hover:bg-red-900/50 transition-colors"
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