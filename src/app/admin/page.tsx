import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

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

  // 2. THE SERVER ACTION: Now handles both status AND adminNotes
  async function updateRequest(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;
    const newStatus = formData.get("status") as "PENDING" | "IN_PROGRESS" | "COMPLETED" | "REJECTED";
    const notes = formData.get("adminNotes") as string;

    await prisma.projectRequest.update({
      where: { id },
      data: { 
        status: newStatus,
        adminNotes: notes !== "" ? notes : null, // Saves the note, or null if left blank
      },
    });

    revalidatePath("/admin"); 
  }

  // 3. Fetch all requests, including the User data via the relation
  const allRequests = await prisma.projectRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true }, 
  });

  return (
    <div className="min-h-screen p-8 md:p-16 max-w-7xl mx-auto text-[#1a120b]">
      <header className="mb-10 border-b border-gray-300 pb-4">
        <h1 className="text-4xl font-bold font-serif mb-2">Command Center</h1>
        <p className="text-gray-600">
          Reviewing all incoming digital bounties and project requests.
        </p>
      </header>

      {/* 4. The Data Table */}
      <div className="overflow-x-auto bg-white border border-gray-300 shadow-sm rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="p-4 font-semibold text-sm uppercase tracking-wider">Date & User</th>
              <th className="p-4 font-semibold text-sm uppercase tracking-wider">Request Details</th>
              <th className="p-4 font-semibold text-sm uppercase tracking-wider">Status</th>
              <th className="p-4 font-semibold text-sm uppercase tracking-wider">Actions & Notes</th>
            </tr>
          </thead>
          <tbody>
            {allRequests.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500 italic">
                  No project requests found in the database.
                </td>
              </tr>
            ) : (
              allRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-4 whitespace-nowrap align-top">
                    <div className="text-sm font-bold">{new Date(request.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-500 mt-1">{request.user.email}</div>
                  </td>
                  <td className="p-4 align-top">
                    <div className="font-bold mb-1">{request.title}</div>
                    <div className="text-sm text-gray-600 line-clamp-3">
                      {request.description}
                    </div>
                  </td>
                  <td className="p-4 align-top">
                    <span
                      className={`px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full border inline-block ${
                        request.status === "COMPLETED"
                          ? "bg-green-100 text-green-800 border-green-300"
                          : request.status === "IN_PROGRESS"
                          ? "bg-blue-100 text-blue-800 border-blue-300"
                          : request.status === "REJECTED"
                          ? "bg-red-100 text-red-800 border-red-300"
                          : "bg-yellow-100 text-yellow-800 border-yellow-300"
                      }`}
                    >
                      {request.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-4 align-top w-64">
                    {/* The Action Buttons & Notes Form */}
                    <form action={updateRequest} className="flex flex-col gap-2">
                      <input type="hidden" name="id" value={request.id} />
                      
                      {/* Admin Notes Input */}
                      <textarea 
                        name="adminNotes"
                        defaultValue={request.adminNotes || ""}
                        placeholder="Add a reason or note..."
                        className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 bg-gray-50 resize-none"
                        rows={2}
                      />

                      <div className="flex flex-wrap gap-2 mt-1">
                        {/* Always allow saving notes without changing the actual status by submitting current status */}
                        <button
                          type="submit"
                          name="status"
                          value={request.status}
                          className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded hover:bg-gray-300 transition-colors"
                        >
                          Save Note
                        </button>

                        {request.status !== "IN_PROGRESS" && request.status !== "COMPLETED" && (
                          <button
                            type="submit"
                            name="status"
                            value="IN_PROGRESS"
                            className="px-3 py-1 bg-[#1a120b] text-[#f5f5f5] text-xs font-bold rounded hover:bg-blue-700 transition-colors"
                          >
                            Start
                          </button>
                        )}

                        {request.status === "IN_PROGRESS" && (
                          <button
                            type="submit"
                            name="status"
                            value="COMPLETED"
                            className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 transition-colors"
                          >
                            Complete
                          </button>
                        )}
                        
                        {request.status !== "REJECTED" && (
                          <button
                            type="submit"
                            name="status"
                            value="REJECTED"
                            className="px-3 py-1 bg-white text-[#1a120b] border border-gray-300 text-xs font-bold rounded hover:bg-red-50 hover:text-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}